import { fetch as request, ResponseCodeError } from './fetch';
import { Modal } from 'antd';

async function fetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  try {
    return await request<T>(input, init);
  } catch (e) {
    if (e instanceof ResponseCodeError) {
      throw new ResponseError(e);
    } else {
      throw e;
    }
  }
}

interface ErrorHandler {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (err: any): boolean;
}

export type PromiseWithErrorHandler<T> = Promise<T> & ErrorHandlerReceiver<T>;

interface ErrorHandlerReceiver<T> {
  onError(handler: ErrorHandler): PromiseWithErrorHandler<T>;
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): Promise<TResult1 | TResult2>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function defaultErrorHandling(err: any): boolean {
  let rce: ResponseCodeError | undefined;
  let defaultMessage = '未知错误！ 请联系管理员。';

  if (err instanceof ResponseCodeError) {
    rce = err;
  } else if (err instanceof ResponseError) {
    rce = err.cause;
    defaultMessage = err.message || err.cause.errorMessage || defaultMessage;
  }
  if (rce) {
    switch (rce.status) {
      case 400:
        Modal.error({
          title: defaultMessage,
        });
        return true;
      case 500:
        Modal.error({
          title: defaultMessage,
        });
        return true;
      case 412:
        if (!/^\/select-staff/.test(window.location.pathname)) {
          window.location.assign(
            (window.SELECTSTAFFORIGIN ?? '') + '/select-staff?redirect=' + encodeURIComponent(window.location.href)
          );
        }
        return true;
    }
  }
  return false;
}

export class ResponseError extends Error {
  readonly cause: ResponseCodeError;
  readonly error?: string;
  readonly errorCode?: string;
  readonly message: string;
  readonly path?: string;
  readonly status?: string;
  readonly timestamp?: string;

  constructor(cause: ResponseCodeError) {
    super();
    this.cause = cause;
    this.error = cause?.body?.error;
    this.errorCode = cause?.body?.error_code;
    this.message = cause?.body?.message;
    this.path = cause?.body?.path;
    this.status = cause?.body?.status;
    this.timestamp = cause?.body?.timestamp;
  }
}

interface DefaultErrorHandler {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (err: any): boolean;
}

interface fetchConfigProps {
  handler: DefaultErrorHandler;
}

export const createFetchInstance = (defaultConfig?: fetchConfigProps) => {
  const { handler = defaultErrorHandling } = defaultConfig ?? {};

  return function fetchWithDefaultErrorHandling<T>(input: RequestInfo, init?: RequestInit): PromiseWithErrorHandler<T> {
    let errorHandler: ErrorHandler | undefined;
    let callThen = true;

    const result = fetch(input, init).catch(e => {
      if (errorHandler) {
        callThen = !errorHandler(e);
      } else {
        callThen = !handler(e);
      }
      if (callThen) {
        throw e;
      }
    });
    const mergedResult: PromiseWithErrorHandler<T> = result as PromiseWithErrorHandler<T>;

    mergedResult.onError = (handler: ErrorHandler) => {
      errorHandler = handler;
      return mergedResult;
    };

    const _then = mergedResult.then;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mergedResult.then = <T, nerver>(onfulfilled: any, onrejected: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fulfilled = (...args: any[]) => {
        if (callThen) {
          return onfulfilled(...args);
        }
      };
      return _then.apply(mergedResult, [fulfilled, onrejected]) as Promise<T>;
    };

    return mergedResult;
  };
};

const fetchInstance = /*#__PURE__*/ createFetchInstance();

export { fetchInstance as fetch };
