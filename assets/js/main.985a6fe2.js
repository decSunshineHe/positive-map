/*! For license information please see main.985a6fe2.js.LICENSE.txt */
(self.webpackChunkui_website = self.webpackChunkui_website || []).push([
  [179],
  {
    9075: (e, t, n) => {
      var r = n(5182);
      (e.exports = p),
        (e.exports.parse = o),
        (e.exports.compile = function (e, t) {
          return l(o(e, t), t);
        }),
        (e.exports.tokensToFunction = l),
        (e.exports.tokensToRegExp = f);
      var a = new RegExp(
        [
          '(\\\\.)',
          '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))',
        ].join('|'),
        'g'
      );
      function o(e, t) {
        for (var n, r = [], o = 0, i = 0, l = '', c = (t && t.delimiter) || '/'; null != (n = a.exec(e)); ) {
          var d = n[0],
            f = n[1],
            p = n.index;
          if (((l += e.slice(i, p)), (i = p + d.length), f)) l += f[1];
          else {
            var m = e[i],
              g = n[2],
              h = n[3],
              v = n[4],
              b = n[5],
              y = n[6],
              w = n[7];
            l && (r.push(l), (l = ''));
            var k = null != g && null != m && m !== g,
              E = '+' === y || '*' === y,
              S = '?' === y || '*' === y,
              x = n[2] || c,
              C = v || b;
            r.push({
              name: h || o++,
              prefix: g || '',
              delimiter: x,
              optional: S,
              repeat: E,
              partial: k,
              asterisk: !!w,
              pattern: C ? u(C) : w ? '.*' : '[^' + s(x) + ']+?',
            });
          }
        }
        return i < e.length && (l += e.substr(i)), l && r.push(l), r;
      }
      function i(e) {
        return encodeURI(e).replace(/[\/?#]/g, function (e) {
          return '%' + e.charCodeAt(0).toString(16).toUpperCase();
        });
      }
      function l(e, t) {
        for (var n = new Array(e.length), a = 0; a < e.length; a++)
          'object' == typeof e[a] && (n[a] = new RegExp('^(?:' + e[a].pattern + ')$', d(t)));
        return function (t, a) {
          for (var o = '', l = t || {}, s = (a || {}).pretty ? i : encodeURIComponent, u = 0; u < e.length; u++) {
            var c = e[u];
            if ('string' != typeof c) {
              var d,
                f = l[c.name];
              if (null == f) {
                if (c.optional) {
                  c.partial && (o += c.prefix);
                  continue;
                }
                throw new TypeError('Expected "' + c.name + '" to be defined');
              }
              if (r(f)) {
                if (!c.repeat)
                  throw new TypeError(
                    'Expected "' + c.name + '" to not repeat, but received `' + JSON.stringify(f) + '`'
                  );
                if (0 === f.length) {
                  if (c.optional) continue;
                  throw new TypeError('Expected "' + c.name + '" to not be empty');
                }
                for (var p = 0; p < f.length; p++) {
                  if (((d = s(f[p])), !n[u].test(d)))
                    throw new TypeError(
                      'Expected all "' +
                        c.name +
                        '" to match "' +
                        c.pattern +
                        '", but received `' +
                        JSON.stringify(d) +
                        '`'
                    );
                  o += (0 === p ? c.prefix : c.delimiter) + d;
                }
              } else {
                if (
                  ((d = c.asterisk
                    ? encodeURI(f).replace(/[?#]/g, function (e) {
                        return '%' + e.charCodeAt(0).toString(16).toUpperCase();
                      })
                    : s(f)),
                  !n[u].test(d))
                )
                  throw new TypeError(
                    'Expected "' + c.name + '" to match "' + c.pattern + '", but received "' + d + '"'
                  );
                o += c.prefix + d;
              }
            } else o += c;
          }
          return o;
        };
      }
      function s(e) {
        return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
      }
      function u(e) {
        return e.replace(/([=!:$\/()])/g, '\\$1');
      }
      function c(e, t) {
        return (e.keys = t), e;
      }
      function d(e) {
        return e && e.sensitive ? '' : 'i';
      }
      function f(e, t, n) {
        r(t) || ((n = t || n), (t = []));
        for (var a = (n = n || {}).strict, o = !1 !== n.end, i = '', l = 0; l < e.length; l++) {
          var u = e[l];
          if ('string' == typeof u) i += s(u);
          else {
            var f = s(u.prefix),
              p = '(?:' + u.pattern + ')';
            t.push(u),
              u.repeat && (p += '(?:' + f + p + ')*'),
              (i += p =
                u.optional ? (u.partial ? f + '(' + p + ')?' : '(?:' + f + '(' + p + '))?') : f + '(' + p + ')');
          }
        }
        var m = s(n.delimiter || '/'),
          g = i.slice(-m.length) === m;
        return (
          a || (i = (g ? i.slice(0, -m.length) : i) + '(?:' + m + '(?=$))?'),
          (i += o ? '$' : a && g ? '' : '(?=' + m + '|$)'),
          c(new RegExp('^' + i, d(n)), t)
        );
      }
      function p(e, t, n) {
        return (
          r(t) || ((n = t || n), (t = [])),
          (n = n || {}),
          e instanceof RegExp
            ? (function (e, t) {
                var n = e.source.match(/\((?!\?)/g);
                if (n)
                  for (var r = 0; r < n.length; r++)
                    t.push({
                      name: r,
                      prefix: null,
                      delimiter: null,
                      optional: !1,
                      repeat: !1,
                      partial: !1,
                      asterisk: !1,
                      pattern: null,
                    });
                return c(e, t);
              })(e, t)
            : r(e)
            ? (function (e, t, n) {
                for (var r = [], a = 0; a < e.length; a++) r.push(p(e[a], t, n).source);
                return c(new RegExp('(?:' + r.join('|') + ')', d(n)), t);
              })(e, t, n)
            : (function (e, t, n) {
                return f(o(e, n), t, n);
              })(e, t, n)
        );
      }
    },
    6695: (e, t) => {
      'use strict';
      var n = 'function' == typeof Symbol && Symbol.for,
        r = n ? Symbol.for('react.element') : 60103,
        a = n ? Symbol.for('react.portal') : 60106,
        o = n ? Symbol.for('react.fragment') : 60107,
        i = n ? Symbol.for('react.strict_mode') : 60108,
        l = n ? Symbol.for('react.profiler') : 60114,
        s = n ? Symbol.for('react.provider') : 60109,
        u = n ? Symbol.for('react.context') : 60110,
        c = n ? Symbol.for('react.async_mode') : 60111,
        d = n ? Symbol.for('react.concurrent_mode') : 60111,
        f = n ? Symbol.for('react.forward_ref') : 60112,
        p = n ? Symbol.for('react.suspense') : 60113,
        m = n ? Symbol.for('react.suspense_list') : 60120,
        g = n ? Symbol.for('react.memo') : 60115,
        h = n ? Symbol.for('react.lazy') : 60116,
        v = n ? Symbol.for('react.block') : 60121,
        b = n ? Symbol.for('react.fundamental') : 60117,
        y = n ? Symbol.for('react.responder') : 60118,
        w = n ? Symbol.for('react.scope') : 60119;
      function k(e) {
        if ('object' == typeof e && null !== e) {
          var t = e.$$typeof;
          switch (t) {
            case r:
              switch ((e = e.type)) {
                case c:
                case d:
                case o:
                case l:
                case i:
                case p:
                  return e;
                default:
                  switch ((e = e && e.$$typeof)) {
                    case u:
                    case f:
                    case h:
                    case g:
                    case s:
                      return e;
                    default:
                      return t;
                  }
              }
            case a:
              return t;
          }
        }
      }
      function E(e) {
        return k(e) === d;
      }
      (t.AsyncMode = c),
        (t.ConcurrentMode = d),
        (t.ContextConsumer = u),
        (t.ContextProvider = s),
        (t.Element = r),
        (t.ForwardRef = f),
        (t.Fragment = o),
        (t.Lazy = h),
        (t.Memo = g),
        (t.Portal = a),
        (t.Profiler = l),
        (t.StrictMode = i),
        (t.Suspense = p),
        (t.isAsyncMode = function (e) {
          return E(e) || k(e) === c;
        }),
        (t.isConcurrentMode = E),
        (t.isContextConsumer = function (e) {
          return k(e) === u;
        }),
        (t.isContextProvider = function (e) {
          return k(e) === s;
        }),
        (t.isElement = function (e) {
          return 'object' == typeof e && null !== e && e.$$typeof === r;
        }),
        (t.isForwardRef = function (e) {
          return k(e) === f;
        }),
        (t.isFragment = function (e) {
          return k(e) === o;
        }),
        (t.isLazy = function (e) {
          return k(e) === h;
        }),
        (t.isMemo = function (e) {
          return k(e) === g;
        }),
        (t.isPortal = function (e) {
          return k(e) === a;
        }),
        (t.isProfiler = function (e) {
          return k(e) === l;
        }),
        (t.isStrictMode = function (e) {
          return k(e) === i;
        }),
        (t.isSuspense = function (e) {
          return k(e) === p;
        }),
        (t.isValidElementType = function (e) {
          return (
            'string' == typeof e ||
            'function' == typeof e ||
            e === o ||
            e === d ||
            e === l ||
            e === i ||
            e === p ||
            e === m ||
            ('object' == typeof e &&
              null !== e &&
              (e.$$typeof === h ||
                e.$$typeof === g ||
                e.$$typeof === s ||
                e.$$typeof === u ||
                e.$$typeof === f ||
                e.$$typeof === b ||
                e.$$typeof === y ||
                e.$$typeof === w ||
                e.$$typeof === v))
          );
        }),
        (t.typeOf = k);
    },
    7354: (e, t, n) => {
      'use strict';
      e.exports = n(6695);
    },
    1896: (e, t, n) => {
      'use strict';
      n.d(t, { OL: () => y, VK: () => c, rU: () => h });
      var r = n(5582),
        a = n(3219),
        o = n(7378),
        i = n(5036),
        l = n(5773),
        s = n(808),
        u = n(2215),
        c = (function (e) {
          function t() {
            for (var t, n = arguments.length, r = new Array(n), a = 0; a < n; a++) r[a] = arguments[a];
            return ((t = e.call.apply(e, [this].concat(r)) || this).history = (0, i.lX)(t.props)), t;
          }
          return (
            (0, a.Z)(t, e),
            (t.prototype.render = function () {
              return o.createElement(r.F0, { history: this.history, children: this.props.children });
            }),
            t
          );
        })(o.Component);
      o.Component;
      var d = function (e, t) {
          return 'function' == typeof e ? e(t) : e;
        },
        f = function (e, t) {
          return 'string' == typeof e ? (0, i.ob)(e, null, null, t) : e;
        },
        p = function (e) {
          return e;
        },
        m = o.forwardRef;
      void 0 === m && (m = p);
      var g = m(function (e, t) {
        var n = e.innerRef,
          r = e.navigate,
          a = e.onClick,
          i = (0, s.Z)(e, ['innerRef', 'navigate', 'onClick']),
          u = i.target,
          c = (0, l.Z)({}, i, {
            onClick: function (e) {
              try {
                a && a(e);
              } catch (t) {
                throw (e.preventDefault(), t);
              }
              e.defaultPrevented ||
                0 !== e.button ||
                (u && '_self' !== u) ||
                (function (e) {
                  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
                })(e) ||
                (e.preventDefault(), r());
            },
          });
        return (c.ref = (p !== m && t) || n), o.createElement('a', c);
      });
      var h = m(function (e, t) {
          var n = e.component,
            a = void 0 === n ? g : n,
            c = e.replace,
            h = e.to,
            v = e.innerRef,
            b = (0, s.Z)(e, ['component', 'replace', 'to', 'innerRef']);
          return o.createElement(r.s6.Consumer, null, function (e) {
            e || (0, u.Z)(!1);
            var n = e.history,
              r = f(d(h, e.location), e.location),
              s = r ? n.createHref(r) : '',
              g = (0, l.Z)({}, b, {
                href: s,
                navigate: function () {
                  var t = d(h, e.location),
                    r = (0, i.Ep)(e.location) === (0, i.Ep)(f(t));
                  (c || r ? n.replace : n.push)(t);
                },
              });
            return p !== m ? (g.ref = t || v) : (g.innerRef = v), o.createElement(a, g);
          });
        }),
        v = function (e) {
          return e;
        },
        b = o.forwardRef;
      void 0 === b && (b = v);
      var y = b(function (e, t) {
        var n = e['aria-current'],
          a = void 0 === n ? 'page' : n,
          i = e.activeClassName,
          c = void 0 === i ? 'active' : i,
          p = e.activeStyle,
          m = e.className,
          g = e.exact,
          y = e.isActive,
          w = e.location,
          k = e.sensitive,
          E = e.strict,
          S = e.style,
          x = e.to,
          C = e.innerRef,
          T = (0, s.Z)(e, [
            'aria-current',
            'activeClassName',
            'activeStyle',
            'className',
            'exact',
            'isActive',
            'location',
            'sensitive',
            'strict',
            'style',
            'to',
            'innerRef',
          ]);
        return o.createElement(r.s6.Consumer, null, function (e) {
          e || (0, u.Z)(!1);
          var n = w || e.location,
            i = f(d(x, n), n),
            s = i.pathname,
            _ = s && s.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1'),
            L = _ ? (0, r.LX)(n.pathname, { path: _, exact: g, sensitive: k, strict: E }) : null,
            A = !!(y ? y(L, n) : L),
            N = 'function' == typeof m ? m(A) : m,
            R = 'function' == typeof S ? S(A) : S;
          A &&
            ((N = (function () {
              for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
              return t
                .filter(function (e) {
                  return e;
                })
                .join(' ');
            })(N, c)),
            (R = (0, l.Z)({}, R, p)));
          var P = (0, l.Z)({ 'aria-current': (A && a) || null, className: N, style: R, to: i }, T);
          return v !== b ? (P.ref = t || C) : (P.innerRef = C), o.createElement(h, P);
        });
      });
    },
    5582: (e, t, n) => {
      'use strict';
      n.d(t, { AW: () => x, F0: () => y, LX: () => S, TH: () => O, k6: () => P, rs: () => N, s6: () => b });
      var r = n(3219),
        a = n(7378),
        o = n(3615),
        i = n.n(o),
        l = n(5036),
        s = n(2215),
        u = n(5773),
        c = n(9075),
        d = n.n(c),
        f = (n(7354), n(808)),
        p = (n(5839), 1073741823),
        m =
          'undefined' != typeof globalThis
            ? globalThis
            : 'undefined' != typeof window
            ? window
            : void 0 !== n.g
            ? n.g
            : {};
      var g =
          a.createContext ||
          function (e, t) {
            var n,
              o,
              l =
                '__create-react-context-' +
                (function () {
                  var e = '__global_unique_id__';
                  return (m[e] = (m[e] || 0) + 1);
                })() +
                '__',
              s = (function (e) {
                function n() {
                  for (var t, n, r, a = arguments.length, o = new Array(a), i = 0; i < a; i++) o[i] = arguments[i];
                  return (
                    ((t = e.call.apply(e, [this].concat(o)) || this).emitter =
                      ((n = t.props.value),
                      (r = []),
                      {
                        on: function (e) {
                          r.push(e);
                        },
                        off: function (e) {
                          r = r.filter(function (t) {
                            return t !== e;
                          });
                        },
                        get: function () {
                          return n;
                        },
                        set: function (e, t) {
                          (n = e),
                            r.forEach(function (e) {
                              return e(n, t);
                            });
                        },
                      })),
                    t
                  );
                }
                (0, r.Z)(n, e);
                var a = n.prototype;
                return (
                  (a.getChildContext = function () {
                    var e;
                    return ((e = {})[l] = this.emitter), e;
                  }),
                  (a.componentWillReceiveProps = function (e) {
                    if (this.props.value !== e.value) {
                      var n,
                        r = this.props.value,
                        a = e.value;
                      ((o = r) === (i = a) ? 0 !== o || 1 / o == 1 / i : o != o && i != i)
                        ? (n = 0)
                        : ((n = 'function' == typeof t ? t(r, a) : p), 0 !== (n |= 0) && this.emitter.set(e.value, n));
                    }
                    var o, i;
                  }),
                  (a.render = function () {
                    return this.props.children;
                  }),
                  n
                );
              })(a.Component);
            s.childContextTypes = (((n = {})[l] = i().object.isRequired), n);
            var u = (function (t) {
              function n() {
                for (var e, n = arguments.length, r = new Array(n), a = 0; a < n; a++) r[a] = arguments[a];
                return (
                  ((e = t.call.apply(t, [this].concat(r)) || this).observedBits = void 0),
                  (e.state = { value: e.getValue() }),
                  (e.onUpdate = function (t, n) {
                    0 != ((0 | e.observedBits) & n) && e.setState({ value: e.getValue() });
                  }),
                  e
                );
              }
              (0, r.Z)(n, t);
              var a = n.prototype;
              return (
                (a.componentWillReceiveProps = function (e) {
                  var t = e.observedBits;
                  this.observedBits = null == t ? p : t;
                }),
                (a.componentDidMount = function () {
                  this.context[l] && this.context[l].on(this.onUpdate);
                  var e = this.props.observedBits;
                  this.observedBits = null == e ? p : e;
                }),
                (a.componentWillUnmount = function () {
                  this.context[l] && this.context[l].off(this.onUpdate);
                }),
                (a.getValue = function () {
                  return this.context[l] ? this.context[l].get() : e;
                }),
                (a.render = function () {
                  return ((e = this.props.children), Array.isArray(e) ? e[0] : e)(this.state.value);
                  var e;
                }),
                n
              );
            })(a.Component);
            return (u.contextTypes = (((o = {})[l] = i().object), o)), { Provider: s, Consumer: u };
          },
        h = function (e) {
          var t = g();
          return (t.displayName = e), t;
        },
        v = h('Router-History'),
        b = h('Router'),
        y = (function (e) {
          function t(t) {
            var n;
            return (
              ((n = e.call(this, t) || this).state = { location: t.history.location }),
              (n._isMounted = !1),
              (n._pendingLocation = null),
              t.staticContext ||
                (n.unlisten = t.history.listen(function (e) {
                  n._pendingLocation = e;
                })),
              n
            );
          }
          (0, r.Z)(t, e),
            (t.computeRootMatch = function (e) {
              return { path: '/', url: '/', params: {}, isExact: '/' === e };
            });
          var n = t.prototype;
          return (
            (n.componentDidMount = function () {
              var e = this;
              (this._isMounted = !0),
                this.unlisten && this.unlisten(),
                this.props.staticContext ||
                  (this.unlisten = this.props.history.listen(function (t) {
                    e._isMounted && e.setState({ location: t });
                  })),
                this._pendingLocation && this.setState({ location: this._pendingLocation });
            }),
            (n.componentWillUnmount = function () {
              this.unlisten && (this.unlisten(), (this._isMounted = !1), (this._pendingLocation = null));
            }),
            (n.render = function () {
              return a.createElement(
                b.Provider,
                {
                  value: {
                    history: this.props.history,
                    location: this.state.location,
                    match: t.computeRootMatch(this.state.location.pathname),
                    staticContext: this.props.staticContext,
                  },
                },
                a.createElement(v.Provider, { children: this.props.children || null, value: this.props.history })
              );
            }),
            t
          );
        })(a.Component);
      a.Component;
      a.Component;
      var w = {},
        k = 1e4,
        E = 0;
      function S(e, t) {
        void 0 === t && (t = {}), ('string' == typeof t || Array.isArray(t)) && (t = { path: t });
        var n = t,
          r = n.path,
          a = n.exact,
          o = void 0 !== a && a,
          i = n.strict,
          l = void 0 !== i && i,
          s = n.sensitive,
          u = void 0 !== s && s;
        return [].concat(r).reduce(function (t, n) {
          if (!n && '' !== n) return null;
          if (t) return t;
          var r = (function (e, t) {
              var n = '' + t.end + t.strict + t.sensitive,
                r = w[n] || (w[n] = {});
              if (r[e]) return r[e];
              var a = [],
                o = { regexp: d()(e, a, t), keys: a };
              return E < k && ((r[e] = o), E++), o;
            })(n, { end: o, strict: l, sensitive: u }),
            a = r.regexp,
            i = r.keys,
            s = a.exec(e);
          if (!s) return null;
          var c = s[0],
            f = s.slice(1),
            p = e === c;
          return o && !p
            ? null
            : {
                path: n,
                url: '/' === n && '' === c ? '/' : c,
                isExact: p,
                params: i.reduce(function (e, t, n) {
                  return (e[t.name] = f[n]), e;
                }, {}),
              };
        }, null);
      }
      var x = (function (e) {
        function t() {
          return e.apply(this, arguments) || this;
        }
        return (
          (0, r.Z)(t, e),
          (t.prototype.render = function () {
            var e = this;
            return a.createElement(b.Consumer, null, function (t) {
              t || (0, s.Z)(!1);
              var n = e.props.location || t.location,
                r = e.props.computedMatch ? e.props.computedMatch : e.props.path ? S(n.pathname, e.props) : t.match,
                o = (0, u.Z)({}, t, { location: n, match: r }),
                i = e.props,
                l = i.children,
                c = i.component,
                d = i.render;
              return (
                Array.isArray(l) &&
                  (function (e) {
                    return 0 === a.Children.count(e);
                  })(l) &&
                  (l = null),
                a.createElement(
                  b.Provider,
                  { value: o },
                  o.match
                    ? l
                      ? 'function' == typeof l
                        ? l(o)
                        : l
                      : c
                      ? a.createElement(c, o)
                      : d
                      ? d(o)
                      : null
                    : 'function' == typeof l
                    ? l(o)
                    : null
                )
              );
            });
          }),
          t
        );
      })(a.Component);
      function C(e) {
        return '/' === e.charAt(0) ? e : '/' + e;
      }
      function T(e, t) {
        if (!e) return t;
        var n = C(e);
        return 0 !== t.pathname.indexOf(n) ? t : (0, u.Z)({}, t, { pathname: t.pathname.substr(n.length) });
      }
      function _(e) {
        return 'string' == typeof e ? e : (0, l.Ep)(e);
      }
      function L(e) {
        return function () {
          (0, s.Z)(!1);
        };
      }
      function A() {}
      a.Component;
      var N = (function (e) {
        function t() {
          return e.apply(this, arguments) || this;
        }
        return (
          (0, r.Z)(t, e),
          (t.prototype.render = function () {
            var e = this;
            return a.createElement(b.Consumer, null, function (t) {
              t || (0, s.Z)(!1);
              var n,
                r,
                o = e.props.location || t.location;
              return (
                a.Children.forEach(e.props.children, function (e) {
                  if (null == r && a.isValidElement(e)) {
                    n = e;
                    var i = e.props.path || e.props.from;
                    r = i ? S(o.pathname, (0, u.Z)({}, e.props, { path: i })) : t.match;
                  }
                }),
                r ? a.cloneElement(n, { location: o, computedMatch: r }) : null
              );
            });
          }),
          t
        );
      })(a.Component);
      var R = a.useContext;
      function P() {
        return R(v);
      }
      function O() {
        return R(b).location;
      }
    },
    3427: (e, t, n) => {
      'use strict';
      n.d(t, { _: () => a, t: () => o });
      var r = n(7378);
      const a = r.createContext(!1);
      function o(e) {
        let { children: t } = e;
        const [n, o] = (0, r.useState)(!1);
        return (
          (0, r.useEffect)(() => {
            o(!0);
          }, []),
          r.createElement(a.Provider, { value: n }, t)
        );
      }
    },
    3375: (e, t, n) => {
      'use strict';
      var r = n(7378),
        a = n(1542),
        o = n(1896),
        i = n(2883),
        l = n(161);
      const s = [n(142), n(3815), n(4374), n(6222)];
      var u = n(6623),
        c = n(5582),
        d = n(5473);
      function f(e) {
        let { children: t } = e;
        return r.createElement(r.Fragment, null, t);
      }
      var p = n(5773),
        m = n(7092),
        g = n(353),
        h = n(8948),
        v = n(624),
        b = n(8831),
        y = n(3714),
        w = n(174),
        k = n(3149),
        E = n(505);
      function S() {
        const {
            i18n: { defaultLocale: e, localeConfigs: t },
          } = (0, g.Z)(),
          n = (0, y.l)();
        return r.createElement(
          m.Z,
          null,
          Object.entries(t).map(e => {
            let [t, { htmlLang: a }] = e;
            return r.createElement('link', {
              key: t,
              rel: 'alternate',
              href: n.createUrl({ locale: t, fullyQualified: !0 }),
              hrefLang: a,
            });
          }),
          r.createElement('link', {
            rel: 'alternate',
            href: n.createUrl({ locale: e, fullyQualified: !0 }),
            hrefLang: 'x-default',
          })
        );
      }
      function x(e) {
        let { permalink: t } = e;
        const {
            siteConfig: { url: n },
          } = (0, g.Z)(),
          a = (function () {
            const {
                siteConfig: { url: e },
              } = (0, g.Z)(),
              { pathname: t } = (0, c.TH)();
            return e + (0, h.Z)(t);
          })(),
          o = t ? `${n}${t}` : a;
        return r.createElement(
          m.Z,
          null,
          r.createElement('meta', { property: 'og:url', content: o }),
          r.createElement('link', { rel: 'canonical', href: o })
        );
      }
      function C() {
        const {
            i18n: { currentLocale: e },
          } = (0, g.Z)(),
          { metadata: t, image: n } = (0, v.L)();
        return r.createElement(
          r.Fragment,
          null,
          r.createElement(
            m.Z,
            null,
            r.createElement('meta', { name: 'twitter:card', content: 'summary_large_image' }),
            r.createElement('body', { className: w.h })
          ),
          n && r.createElement(b.d, { image: n }),
          r.createElement(x, null),
          r.createElement(S, null),
          r.createElement(E.Z, { tag: k.HX, locale: e }),
          r.createElement(
            m.Z,
            null,
            t.map((e, t) => r.createElement('meta', (0, p.Z)({ key: t }, e)))
          )
        );
      }
      const T = new Map();
      function _(e) {
        if (T.has(e.pathname)) return { ...e, pathname: T.get(e.pathname) };
        if (
          (0, d.f)(u.Z, e.pathname).some(e => {
            let { route: t } = e;
            return !0 === t.exact;
          })
        )
          return T.set(e.pathname, e.pathname), e;
        const t = e.pathname.trim().replace(/(?:\/index)?\.html$/, '') || '/';
        return T.set(e.pathname, t), { ...e, pathname: t };
      }
      var L = n(3427),
        A = n(3340);
      function N(e) {
        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
        const a = s.map(t => {
          const r = t.default?.[e] ?? t[e];
          return r?.(...n);
        });
        return () => a.forEach(e => e?.());
      }
      const R = function (e) {
        let { children: t, location: n, previousLocation: a } = e;
        return (
          (0, r.useLayoutEffect)(() => {
            a !== n &&
              (!(function (e) {
                let { location: t, previousLocation: n } = e;
                if (!n) return;
                const r = t.pathname === n.pathname,
                  a = t.hash === n.hash,
                  o = t.search === n.search;
                if (r && a && !o) return;
                const { hash: i } = t;
                if (i) {
                  const e = decodeURIComponent(i.substring(1)),
                    t = document.getElementById(e);
                  t?.scrollIntoView();
                } else window.scrollTo(0, 0);
              })({ location: n, previousLocation: a }),
              N('onRouteDidUpdate', { previousLocation: a, location: n }));
          }, [a, n]),
          t
        );
      };
      function P(e) {
        const t = Array.from(new Set([e, decodeURI(e)]))
          .map(e => (0, d.f)(u.Z, e))
          .flat();
        return Promise.all(t.map(e => e.route.component.preload?.()));
      }
      class O extends r.Component {
        previousLocation;
        routeUpdateCleanupCb;
        constructor(e) {
          super(e),
            (this.previousLocation = null),
            (this.routeUpdateCleanupCb = l.Z.canUseDOM
              ? N('onRouteUpdate', { previousLocation: null, location: this.props.location })
              : () => {}),
            (this.state = { nextRouteHasLoaded: !0 });
        }
        shouldComponentUpdate(e, t) {
          if (e.location === this.props.location) return t.nextRouteHasLoaded;
          const n = e.location;
          return (
            (this.previousLocation = this.props.location),
            this.setState({ nextRouteHasLoaded: !1 }),
            (this.routeUpdateCleanupCb = N('onRouteUpdate', { previousLocation: this.previousLocation, location: n })),
            P(n.pathname)
              .then(() => {
                this.routeUpdateCleanupCb(), this.setState({ nextRouteHasLoaded: !0 });
              })
              .catch(e => {
                console.warn(e), window.location.reload();
              }),
            !1
          );
        }
        render() {
          const { children: e, location: t } = this.props;
          return r.createElement(
            R,
            { previousLocation: this.previousLocation, location: t },
            r.createElement(c.AW, { location: t, render: () => e })
          );
        }
      }
      const D = O,
        I = 'docusaurus-base-url-issue-banner-container',
        M = 'docusaurus-base-url-issue-banner',
        F = 'docusaurus-base-url-issue-banner-suggestion-container',
        B = '__DOCUSAURUS_INSERT_BASEURL_BANNER';
      function z(e) {
        return `\nwindow['${B}'] = true;\n\ndocument.addEventListener('DOMContentLoaded', maybeInsertBanner);\n\nfunction maybeInsertBanner() {\n  var shouldInsert = window['${B}'];\n  shouldInsert && insertBanner();\n}\n\nfunction insertBanner() {\n  var bannerContainer = document.getElementById('${I}');\n  if (!bannerContainer) {\n    return;\n  }\n  var bannerHtml = ${JSON.stringify(
          (function (e) {
            return `\n<div id="${M}" style="border: thick solid red; background-color: rgb(255, 230, 179); margin: 20px; padding: 20px; font-size: 20px;">\n   <p style="font-weight: bold; font-size: 30px;">Your Docusaurus site did not load properly.</p>\n   <p>A very common reason is a wrong site <a href="https://docusaurus.io/docs/docusaurus.config.js/#baseUrl" style="font-weight: bold;">baseUrl configuration</a>.</p>\n   <p>Current configured baseUrl = <span style="font-weight: bold; color: red;">${e}</span> ${
              '/' === e ? ' (default value)' : ''
            }</p>\n   <p>We suggest trying baseUrl = <span id="${F}" style="font-weight: bold; color: green;"></span></p>\n</div>\n`;
          })(e)
        ).replace(
          /</g,
          '\\<'
        )};\n  bannerContainer.innerHTML = bannerHtml;\n  var suggestionContainer = document.getElementById('${F}');\n  var actualHomePagePath = window.location.pathname;\n  var suggestedBaseUrl = actualHomePagePath.substr(-1) === '/'\n        ? actualHomePagePath\n        : actualHomePagePath + '/';\n  suggestionContainer.innerHTML = suggestedBaseUrl;\n}\n`;
      }
      function j() {
        const {
          siteConfig: { baseUrl: e },
        } = (0, g.Z)();
        return (
          (0, r.useLayoutEffect)(() => {
            window[B] = !1;
          }, []),
          r.createElement(
            r.Fragment,
            null,
            !l.Z.canUseDOM && r.createElement(m.Z, null, r.createElement('script', null, z(e))),
            r.createElement('div', { id: I })
          )
        );
      }
      function U() {
        const {
            siteConfig: { baseUrl: e, baseUrlIssueBanner: t },
          } = (0, g.Z)(),
          { pathname: n } = (0, c.TH)();
        return t && n === e ? r.createElement(j, null) : null;
      }
      function $() {
        const {
            siteConfig: { favicon: e, title: t, noIndex: n },
            i18n: { currentLocale: a, localeConfigs: o },
          } = (0, g.Z)(),
          i = (0, h.Z)(e),
          { htmlLang: l, direction: s } = o[a];
        return r.createElement(
          m.Z,
          null,
          r.createElement('html', { lang: l, dir: s }),
          r.createElement('title', null, t),
          r.createElement('meta', { property: 'og:title', content: t }),
          r.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }),
          n && r.createElement('meta', { name: 'robots', content: 'noindex, nofollow' }),
          e && r.createElement('link', { rel: 'icon', href: i })
        );
      }
      var H = n(6293);
      function q() {
        const e = (0, d.H)(u.Z),
          t = (0, c.TH)();
        return r.createElement(
          H.Z,
          null,
          r.createElement(
            A.M,
            null,
            r.createElement(
              L.t,
              null,
              r.createElement(
                f,
                null,
                r.createElement($, null),
                r.createElement(C, null),
                r.createElement(U, null),
                r.createElement(D, { location: _(t) }, e)
              )
            )
          )
        );
      }
      var G = n(6887);
      const Z = (function (e) {
        try {
          return document.createElement('link').relList.supports(e);
        } catch {
          return !1;
        }
      })('prefetch')
        ? function (e) {
            return new Promise((t, n) => {
              if ('undefined' == typeof document) return void n();
              const r = document.createElement('link');
              r.setAttribute('rel', 'prefetch'),
                r.setAttribute('href', e),
                (r.onload = () => t()),
                (r.onerror = () => n());
              const a = document.getElementsByTagName('head')[0] ?? document.getElementsByName('script')[0]?.parentNode;
              a?.appendChild(r);
            });
          }
        : function (e) {
            return new Promise((t, n) => {
              const r = new XMLHttpRequest();
              r.open('GET', e, !0),
                (r.withCredentials = !0),
                (r.onload = () => {
                  200 === r.status ? t() : n();
                }),
                r.send(null);
            });
          };
      var V = n(3361);
      const W = new Set(),
        K = new Set(),
        Q = () => navigator.connection?.effectiveType.includes('2g') || navigator.connection?.saveData,
        Y = {
          prefetch(e) {
            if (!(e => !Q() && !K.has(e) && !W.has(e))(e)) return !1;
            W.add(e);
            const t = (0, d.f)(u.Z, e).flatMap(e => {
              return (
                (t = e.route.path),
                Object.entries(G)
                  .filter(e => {
                    let [n] = e;
                    return n.replace(/-[^-]+$/, '') === t;
                  })
                  .flatMap(e => {
                    let [, t] = e;
                    return Object.values((0, V.Z)(t));
                  })
              );
              var t;
            });
            return Promise.all(
              t.map(e => {
                const t = n.gca(e);
                return t && !t.includes('undefined') ? Z(t).catch(() => {}) : Promise.resolve();
              })
            );
          },
          preload: e => !!(e => !Q() && !K.has(e))(e) && (K.add(e), P(e)),
        },
        X = Object.freeze(Y);
      if (l.Z.canUseDOM) {
        window.docusaurus = X;
        const e = a.hydrate;
        P(window.location.pathname).then(() => {
          e(
            r.createElement(i.B6, null, r.createElement(o.VK, null, r.createElement(q, null))),
            document.getElementById('__docusaurus')
          );
        });
      }
    },
    3340: (e, t, n) => {
      'use strict';
      n.d(t, { _: () => c, M: () => d });
      var r = n(7378),
        a = n(6809);
      const o = JSON.parse(
          '{"docusaurus-plugin-content-docs":{"default":{"path":"/positive-map/components","versions":[{"name":"current","label":"Next","isLast":true,"path":"/positive-map/components","mainDocId":"intro","docs":[{"id":"intro","path":"/positive-map/components/intro","sidebar":"componentsSidebar"},{"id":"page-elements/AddressCascader","path":"/positive-map/components/page-elements/AddressCascader","sidebar":"componentsSidebar"},{"id":"page-elements/NumericKeyboard","path":"/positive-map/components/page-elements/NumericKeyboard","sidebar":"componentsSidebar"},{"id":"page-elements/SwitchStaff","path":"/positive-map/components/page-elements/SwitchStaff","sidebar":"componentsSidebar"},{"id":"/category/\u9875\u9762\u5143\u7d20","path":"/positive-map/components/category/\u9875\u9762\u5143\u7d20","sidebar":"componentsSidebar"}],"draftIds":[],"sidebars":{"componentsSidebar":{"link":{"path":"/positive-map/components/intro","label":"intro"}}}}],"breadcrumbs":true}}}'
        ),
        i = JSON.parse(
          '{"defaultLocale":"zh-Hans","locales":["zh-Hans"],"path":"i18n","currentLocale":"zh-Hans","localeConfigs":{"zh-Hans":{"label":"\u7b80\u4f53\u4e2d\u6587","direction":"ltr","htmlLang":"zh-Hans","calendar":"gregory","path":"zh-Hans"}}}'
        );
      var l = n(7529);
      const s = JSON.parse(
          '{"docusaurusVersion":"2.4.0","siteVersion":"1.0.9","pluginVersions":{"docusaurus-plugin-content-docs":{"type":"package","name":"@docusaurus/plugin-content-docs","version":"2.4.0"},"docusaurus-plugin-content-blog":{"type":"package","name":"@docusaurus/plugin-content-blog","version":"2.4.0"},"docusaurus-plugin-content-pages":{"type":"package","name":"@docusaurus/plugin-content-pages","version":"2.4.0"},"docusaurus-plugin-sitemap":{"type":"package","name":"@docusaurus/plugin-sitemap","version":"2.4.0"},"docusaurus-theme-classic":{"type":"package","name":"@docusaurus/theme-classic","version":"2.4.0"},"docusaurus-plugin-sass":{"type":"project"},"alias-docusaurus-plugin":{"type":"project"},"docusaurus-plugin-mdx":{"type":"project"},"docusaurus-plugin-tsdoc":{"type":"project"}}}'
        ),
        u = { siteConfig: a.default, siteMetadata: s, globalData: o, i18n: i, codeTranslations: l },
        c = r.createContext(u);
      function d(e) {
        let { children: t } = e;
        return r.createElement(c.Provider, { value: u }, t);
      }
    },
    6293: (e, t, n) => {
      'use strict';
      n.d(t, { Z: () => f });
      var r = n(7378),
        a = n(161),
        o = n(7092),
        i = n(1721),
        l = n(8788);
      function s(e) {
        let { error: t, tryAgain: n } = e;
        return r.createElement(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              minHeight: '100vh',
              width: '100%',
              maxWidth: '80ch',
              fontSize: '20px',
              margin: '0 auto',
              padding: '1rem',
            },
          },
          r.createElement('h1', { style: { fontSize: '3rem' } }, 'This page crashed'),
          r.createElement(
            'button',
            {
              type: 'button',
              onClick: n,
              style: { margin: '1rem 0', fontSize: '2rem', cursor: 'pointer', borderRadius: 20, padding: '1rem' },
            },
            'Try again'
          ),
          r.createElement(u, { error: t })
        );
      }
      function u(e) {
        let { error: t } = e;
        const n = (0, i.getErrorCausalChain)(t)
          .map(e => e.message)
          .join('\n\nCause:\n');
        return r.createElement('p', { style: { whiteSpace: 'pre-wrap' } }, n);
      }
      function c(e) {
        let { error: t, tryAgain: n } = e;
        return r.createElement(
          f,
          { fallback: () => r.createElement(s, { error: t, tryAgain: n }) },
          r.createElement(o.Z, null, r.createElement('title', null, 'Page Error')),
          r.createElement(l.Z, null, r.createElement(s, { error: t, tryAgain: n }))
        );
      }
      const d = e => r.createElement(c, e);
      class f extends r.Component {
        constructor(e) {
          super(e), (this.state = { error: null });
        }
        componentDidCatch(e) {
          a.Z.canUseDOM && this.setState({ error: e });
        }
        render() {
          const { children: e } = this.props,
            { error: t } = this.state;
          if (t) {
            const e = { error: t, tryAgain: () => this.setState({ error: null }) };
            return (this.props.fallback ?? d)(e);
          }
          return e ?? null;
        }
      }
    },
    161: (e, t, n) => {
      'use strict';
      n.d(t, { Z: () => a });
      const r = 'undefined' != typeof window && 'document' in window && 'createElement' in window.document,
        a = {
          canUseDOM: r,
          canUseEventListeners: r && ('addEventListener' in window || 'attachEvent' in window),
          canUseIntersectionObserver: r && 'IntersectionObserver' in window,
          canUseViewport: r && 'screen' in window,
        };
    },
    7092: (e, t, n) => {
      'use strict';
      n.d(t, { Z: () => o });
      var r = n(7378),
        a = n(2883);
      function o(e) {
        return r.createElement(a.ql, e);
      }
    },
    1884: (e, t, n) => {
      'use strict';
      n.d(t, { Z: () => p });
      var r = n(5773),
        a = n(7378),
        o = n(1896),
        i = n(1721),
        l = n(353),
        s = n(5626),
        u = n(161);
      const c = a.createContext({ collectLink: () => {} });
      var d = n(8948);
      function f(e, t) {
        let {
          isNavLink: n,
          to: f,
          href: p,
          activeClassName: m,
          isActive: g,
          'data-noBrokenLinkCheck': h,
          autoAddBaseUrl: v = !0,
          ...b
        } = e;
        const {
            siteConfig: { trailingSlash: y, baseUrl: w },
          } = (0, l.Z)(),
          { withBaseUrl: k } = (0, d.C)(),
          E = (0, a.useContext)(c),
          S = (0, a.useRef)(null);
        (0, a.useImperativeHandle)(t, () => S.current);
        const x = f || p;
        const C = (0, s.Z)(x),
          T = x?.replace('pathname://', '');
        let _ = void 0 !== T ? ((L = T), v && (e => e.startsWith('/'))(L) ? k(L) : L) : void 0;
        var L;
        _ && C && (_ = (0, i.applyTrailingSlash)(_, { trailingSlash: y, baseUrl: w }));
        const A = (0, a.useRef)(!1),
          N = n ? o.OL : o.rU,
          R = u.Z.canUseIntersectionObserver,
          P = (0, a.useRef)(),
          O = () => {
            A.current || null == _ || (window.docusaurus.preload(_), (A.current = !0));
          };
        (0, a.useEffect)(
          () => (
            !R && C && null != _ && window.docusaurus.prefetch(_),
            () => {
              R && P.current && P.current.disconnect();
            }
          ),
          [P, _, R, C]
        );
        const D = _?.startsWith('#') ?? !1,
          I = !_ || !C || D;
        return (
          I || h || E.collectLink(_),
          I
            ? a.createElement(
                'a',
                (0, r.Z)({ ref: S, href: _ }, x && !C && { target: '_blank', rel: 'noopener noreferrer' }, b)
              )
            : a.createElement(
                N,
                (0, r.Z)(
                  {},
                  b,
                  {
                    onMouseEnter: O,
                    onTouchStart: O,
                    innerRef: e => {
                      (S.current = e),
                        R &&
                          e &&
                          C &&
                          ((P.current = new window.IntersectionObserver(t => {
                            t.forEach(t => {
                              e === t.target &&
                                (t.isIntersecting || t.intersectionRatio > 0) &&
                                (P.current.unobserve(e),
                                P.current.disconnect(),
                                null != _ && window.docusaurus.prefetch(_));
                            });
                          })),
                          P.current.observe(e));
                    },
                    to: _,
                  },
                  n && { isActive: g, activeClassName: m }
                )
              )
        );
      }
      const p = a.forwardRef(f);
    },
    7406: (e, t, n) => {
      'use strict';
      n.d(t, { Z: () => r });
      const r = () => null;
    },
    9213: (e, t, n) => {
      'use strict';
      n.d(t, { Z: () => s, I: () => l });
      var r = n(7378);
      function a(e, t) {
        const n = e.split(/(\{\w+\})/).map((e, n) => {
          if (n % 2 == 1) {
            const n = t?.[e.slice(1, -1)];
            if (void 0 !== n) return n;
          }
          return e;
        });
        return n.some(e => (0, r.isValidElement)(e))
          ? n.map((e, t) => ((0, r.isValidElement)(e) ? r.cloneElement(e, { key: t }) : e)).filter(e => '' !== e)
          : n.join('');
      }
      var o = n(7529);
      function i(e) {
        let { id: t, message: n } = e;
        if (void 0 === t && void 0 === n)
          throw new Error(
            'Docusaurus translation declarations must have at least a translation id or a default translation message'
          );
        return o[t ?? n] ?? n ?? t;
      }
      function l(e, t) {
        let { message: n, id: r } = e;
        return a(i({ message: n, id: r }), t);
      }
      function s(e) {
        let { children: t, id: n, values: o } = e;
        if (t && 'string' != typeof t)
          throw (
            (console.warn('Illegal <Translate> children', t),
            new Error('The Docusaurus <Translate> component only accept simple string values'))
          );
        const l = i({ message: t, id: n });
        return r.createElement(r.Fragment, null, a(l, o));
      }
    },
    5688: (e, t, n) => {
      'use strict';
      n.d(t, { m: () => r });
      const r = 'default';
    },
    5626: (e, t, n) => {
      'use strict';
      function r(e) {
        return /^(?:\w*:|\/\/)/.test(e);
      }
      function a(e) {
        return void 0 !== e && !r(e);
      }
      n.d(t, { Z: () => a, b: () => r });
    },
    8948: (e, t, n) => {
      'use strict';
      n.d(t, { C: () => i, Z: () => l });
      var r = n(7378),
        a = n(353),
        o = n(5626);
      function i() {
        const {
            siteConfig: { baseUrl: e, url: t },
          } = (0, a.Z)(),
          n = (0, r.useCallback)(
            (n, r) =>
              (function (e, t, n, r) {
                let { forcePrependBaseUrl: a = !1, absolute: i = !1 } = void 0 === r ? {} : r;
                if (!n || n.startsWith('#') || (0, o.b)(n)) return n;
                if (a) return t + n.replace(/^\//, '');
                if (n === t.replace(/\/$/, '')) return t;
                const l = n.startsWith(t) ? n : t + n.replace(/^\//, '');
                return i ? e + l : l;
              })(t, e, n, r),
            [t, e]
          );
        return { withBaseUrl: n };
      }
      function l(e, t) {
        void 0 === t && (t = {});
        const { withBaseUrl: n } = i();
        return n(e, t);
      }
    },
    353: (e, t, n) => {
      'use strict';
      n.d(t, { Z: () => o });
      var r = n(7378),
        a = n(3340);
      function o() {
        return (0, r.useContext)(a._);
      }
    },
    6457: (e, t, n) => {
      'use strict';
      n.d(t, { Z: () => o });
      var r = n(7378),
        a = n(3427);
      function o() {
        return (0, r.useContext)(a._);
      }
    },
    3361: (e, t, n) => {
      'use strict';
      n.d(t, { Z: () => a });
      const r = e => 'object' == typeof e && !!e && Object.keys(e).length > 0;
      function a(e) {
        const t = {};
        return (
          (function e(n, a) {
            Object.entries(n).forEach(n => {
              let [o, i] = n;
              const l = a ? `${a}.${o}` : o;
              r(i) ? e(i, l) : (t[l] = i);
            });
          })(e),
          t
        );
      }
    },
    6881: (e, t, n) => {
      'use strict';
      n.d(t, { _: () => a, z: () => o });
      var r = n(7378);
      const a = r.createContext(null);
      function o(e) {
        let { children: t, value: n } = e;
        const o = r.useContext(a),
          i = (0, r.useMemo)(
            () =>
              (function (e) {
                let { parent: t, value: n } = e;
                if (!t) {
                  if (!n) throw new Error('Unexpected: no Docusaurus route context found');
                  if (!('plugin' in n))
                    throw new Error('Unexpected: Docusaurus topmost route context has no `plugin` attribute');
                  return n;
                }
                const r = { ...t.data, ...n?.data };
                return { plugin: t.plugin, data: r };
              })({ parent: o, value: n }),
            [o, n]
          );
        return r.createElement(a.Provider, { value: i }, t);
      }
    },
    2935: (e, t, n) => {
      'use strict';
      n.d(t, { Iw: () => g, gA: () => f, _r: () => c, Jo: () => h, zh: () => d, yW: () => m, gB: () => p });
      var r = n(5582),
        a = n(353),
        o = n(5688);
      function i(e, t) {
        void 0 === t && (t = {});
        const n = (function () {
          const { globalData: e } = (0, a.Z)();
          return e;
        })()[e];
        if (!n && t.failfast) throw new Error(`Docusaurus plugin global data not found for "${e}" plugin.`);
        return n;
      }
      const l = e => e.versions.find(e => e.isLast);
      function s(e, t) {
        const n = (function (e, t) {
            const n = l(e);
            return [...e.versions.filter(e => e !== n), n].find(
              e => !!(0, r.LX)(t, { path: e.path, exact: !1, strict: !1 })
            );
          })(e, t),
          a = n?.docs.find(e => !!(0, r.LX)(t, { path: e.path, exact: !0, strict: !1 }));
        return {
          activeVersion: n,
          activeDoc: a,
          alternateDocVersions: a
            ? (function (t) {
                const n = {};
                return (
                  e.versions.forEach(e => {
                    e.docs.forEach(r => {
                      r.id === t && (n[e.name] = r);
                    });
                  }),
                  n
                );
              })(a.id)
            : {},
        };
      }
      const u = {},
        c = () => i('docusaurus-plugin-content-docs') ?? u,
        d = e =>
          (function (e, t, n) {
            void 0 === t && (t = o.m), void 0 === n && (n = {});
            const r = i(e),
              a = r?.[t];
            if (!a && n.failfast)
              throw new Error(`Docusaurus plugin global data not found for "${e}" plugin with id "${t}".`);
            return a;
          })('docusaurus-plugin-content-docs', e, { failfast: !0 });
      function f(e) {
        void 0 === e && (e = {});
        const t = c(),
          { pathname: n } = (0, r.TH)();
        return (function (e, t, n) {
          void 0 === n && (n = {});
          const a = Object.entries(e)
              .sort((e, t) => t[1].path.localeCompare(e[1].path))
              .find(e => {
                let [, n] = e;
                return !!(0, r.LX)(t, { path: n.path, exact: !1, strict: !1 });
              }),
            o = a ? { pluginId: a[0], pluginData: a[1] } : void 0;
          if (!o && n.failfast)
            throw new Error(
              `Can't find active docs plugin for "${t}" pathname, while it was expected to be found. Maybe you tried to use a docs feature that can only be used on a docs-related page? Existing docs plugin paths are: ${Object.values(
                e
              )
                .map(e => e.path)
                .join(', ')}`
            );
          return o;
        })(t, n, e);
      }
      function p(e) {
        return d(e).versions;
      }
      function m(e) {
        const t = d(e);
        return l(t);
      }
      function g(e) {
        const t = d(e),
          { pathname: n } = (0, r.TH)();
        return s(t, n);
      }
      function h(e) {
        const t = d(e),
          { pathname: n } = (0, r.TH)();
        return (function (e, t) {
          const n = l(e);
          return { latestDocSuggestion: s(e, t).alternateDocVersions[n.name], latestVersionSuggestion: n };
        })(t, n);
      }
    },
    4374: (e, t, n) => {
      'use strict';
      n.r(t), n.d(t, { default: () => o });
      var r = n(8504),
        a = n.n(r);
      a().configure({ showSpinner: !1 });
      const o = {
        onRouteUpdate(e) {
          let { location: t, previousLocation: n } = e;
          if (n && t.pathname !== n.pathname) {
            const e = window.setTimeout(() => {
              a().start();
            }, 200);
            return () => window.clearTimeout(e);
          }
        },
        onRouteDidUpdate() {
          a().done();
        },
      };
    },
    3815: (e, t, n) => {
      'use strict';
      n.r(t);
      var r = n(2349),
        a = n(6809);
      !(function (e) {
        const {
            themeConfig: { prism: t },
          } = a.default,
          { additionalLanguages: r } = t;
        (globalThis.Prism = e),
          r.forEach(e => {
            n(3392)(`./prism-${e}`);
          }),
          delete globalThis.Prism;
      })(r.Z);
    },
    6125: (e, t, n) => {
      'use strict';
      n.d(t, { Z: () => o });
      var r = n(7378);
      const a = { iconExternalLink: 'iconExternalLink_nPrP' };
      function o(e) {
        let { width: t = 13.5, height: n = 13.5 } = e;
        return r.createElement(
          'svg',
          { width: t, height: n, 'aria-hidden': 'true', viewBox: '0 0 24 24', className: a.iconExternalLink },
          r.createElement('path', {
            fill: 'currentColor',
            d: 'M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z',
          })
        );
      }
    },
    8788: (e, t, n) => {
      'use strict';
      n.d(t, { Z: () => dt });
      var r = n(7378),
        a = n(8944),
        o = n(6293),
        i = n(8831),
        l = n(5773),
        s = n(5582),
        u = n(9213),
        c = n(4993);
      const d = 'docusaurus_skipToContent_fallback';
      function f(e) {
        e.setAttribute('tabindex', '-1'), e.focus(), e.removeAttribute('tabindex');
      }
      function p() {
        const e = (0, r.useRef)(null),
          { action: t } = (0, s.k6)(),
          n = (0, r.useCallback)(e => {
            e.preventDefault();
            const t = document.querySelector('main:first-of-type') ?? document.getElementById(d);
            t && f(t);
          }, []);
        return (
          (0, c.S)(n => {
            let { location: r } = n;
            e.current && !r.hash && 'PUSH' === t && f(e.current);
          }),
          { containerRef: e, onClick: n }
        );
      }
      const m = (0, u.I)({
        id: 'theme.common.skipToMainContent',
        description:
          'The skip to content label used for accessibility, allowing to rapidly navigate to main content with keyboard tab/enter navigation',
        message: 'Skip to main content',
      });
      function g(e) {
        const t = e.children ?? m,
          { containerRef: n, onClick: a } = p();
        return r.createElement(
          'div',
          { ref: n, role: 'region', 'aria-label': m },
          r.createElement('a', (0, l.Z)({}, e, { href: `#${d}`, onClick: a }), t)
        );
      }
      var h = n(5484),
        v = n(174);
      const b = { skipToContent: 'skipToContent_oPtH' };
      function y() {
        return r.createElement(g, { className: b.skipToContent });
      }
      var w = n(624),
        k = n(10);
      function E(e) {
        let { width: t = 21, height: n = 21, color: a = 'currentColor', strokeWidth: o = 1.2, className: i, ...s } = e;
        return r.createElement(
          'svg',
          (0, l.Z)({ viewBox: '0 0 15 15', width: t, height: n }, s),
          r.createElement(
            'g',
            { stroke: a, strokeWidth: o },
            r.createElement('path', { d: 'M.75.75l13.5 13.5M14.25.75L.75 14.25' })
          )
        );
      }
      const S = { closeButton: 'closeButton_J5rP' };
      function x(e) {
        return r.createElement(
          'button',
          (0, l.Z)(
            {
              type: 'button',
              'aria-label': (0, u.I)({
                id: 'theme.AnnouncementBar.closeButtonAriaLabel',
                message: 'Close',
                description: 'The ARIA label for close button of announcement bar',
              }),
            },
            e,
            { className: (0, a.default)('clean-btn close', S.closeButton, e.className) }
          ),
          r.createElement(E, { width: 14, height: 14, strokeWidth: 3.1 })
        );
      }
      const C = { content: 'content_bSb_' };
      function T(e) {
        const { announcementBar: t } = (0, w.L)(),
          { content: n } = t;
        return r.createElement(
          'div',
          (0, l.Z)({}, e, { className: (0, a.default)(C.content, e.className), dangerouslySetInnerHTML: { __html: n } })
        );
      }
      const _ = {
        announcementBar: 'announcementBar_zJRd',
        announcementBarPlaceholder: 'announcementBarPlaceholder_NpUd',
        announcementBarClose: 'announcementBarClose_Jjdj',
        announcementBarContent: 'announcementBarContent_t7IR',
      };
      function L() {
        const { announcementBar: e } = (0, w.L)(),
          { isActive: t, close: n } = (0, k.nT)();
        if (!t) return null;
        const { backgroundColor: a, textColor: o, isCloseable: i } = e;
        return r.createElement(
          'div',
          { className: _.announcementBar, style: { backgroundColor: a, color: o }, role: 'banner' },
          i && r.createElement('div', { className: _.announcementBarPlaceholder }),
          r.createElement(T, { className: _.announcementBarContent }),
          i && r.createElement(x, { onClick: n, className: _.announcementBarClose })
        );
      }
      var A = n(5536),
        N = n(3457);
      var R = n(1763),
        P = n(3471);
      const O = r.createContext(null);
      function D(e) {
        let { children: t } = e;
        const n = (function () {
          const e = (0, A.e)(),
            t = (0, P.HY)(),
            [n, a] = (0, r.useState)(!1),
            o = null !== t.component,
            i = (0, R.D9)(o);
          return (
            (0, r.useEffect)(() => {
              o && !i && a(!0);
            }, [o, i]),
            (0, r.useEffect)(() => {
              o ? e.shown || a(!0) : a(!1);
            }, [e.shown, o]),
            (0, r.useMemo)(() => [n, a], [n])
          );
        })();
        return r.createElement(O.Provider, { value: n }, t);
      }
      function I(e) {
        if (e.component) {
          const t = e.component;
          return r.createElement(t, e.props);
        }
      }
      function M() {
        const e = (0, r.useContext)(O);
        if (!e) throw new R.i6('NavbarSecondaryMenuDisplayProvider');
        const [t, n] = e,
          a = (0, r.useCallback)(() => n(!1), [n]),
          o = (0, P.HY)();
        return (0, r.useMemo)(() => ({ shown: t, hide: a, content: I(o) }), [a, o, t]);
      }
      function F(e) {
        let { header: t, primaryMenu: n, secondaryMenu: o } = e;
        const { shown: i } = M();
        return r.createElement(
          'div',
          { className: 'navbar-sidebar' },
          t,
          r.createElement(
            'div',
            { className: (0, a.default)('navbar-sidebar__items', { 'navbar-sidebar__items--show-secondary': i }) },
            r.createElement('div', { className: 'navbar-sidebar__item menu' }, n),
            r.createElement('div', { className: 'navbar-sidebar__item menu' }, o)
          )
        );
      }
      var B = n(5421),
        z = n(6457);
      function j(e) {
        return r.createElement(
          'svg',
          (0, l.Z)({ viewBox: '0 0 24 24', width: 24, height: 24 }, e),
          r.createElement('path', {
            fill: 'currentColor',
            d: 'M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z',
          })
        );
      }
      function U(e) {
        return r.createElement(
          'svg',
          (0, l.Z)({ viewBox: '0 0 24 24', width: 24, height: 24 }, e),
          r.createElement('path', {
            fill: 'currentColor',
            d: 'M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z',
          })
        );
      }
      const $ = {
        toggle: 'toggle_ki11',
        toggleButton: 'toggleButton_MMFG',
        darkToggleIcon: 'darkToggleIcon_U96C',
        lightToggleIcon: 'lightToggleIcon_lgto',
        toggleButtonDisabled: 'toggleButtonDisabled_Uw7m',
      };
      function H(e) {
        let { className: t, buttonClassName: n, value: o, onChange: i } = e;
        const l = (0, z.Z)(),
          s = (0, u.I)(
            {
              message: 'Switch between dark and light mode (currently {mode})',
              id: 'theme.colorToggle.ariaLabel',
              description: 'The ARIA label for the navbar color mode toggle',
            },
            {
              mode:
                'dark' === o
                  ? (0, u.I)({
                      message: 'dark mode',
                      id: 'theme.colorToggle.ariaLabel.mode.dark',
                      description: 'The name for the dark color mode',
                    })
                  : (0, u.I)({
                      message: 'light mode',
                      id: 'theme.colorToggle.ariaLabel.mode.light',
                      description: 'The name for the light color mode',
                    }),
            }
          );
        return r.createElement(
          'div',
          { className: (0, a.default)($.toggle, t) },
          r.createElement(
            'button',
            {
              className: (0, a.default)('clean-btn', $.toggleButton, !l && $.toggleButtonDisabled, n),
              type: 'button',
              onClick: () => i('dark' === o ? 'light' : 'dark'),
              disabled: !l,
              title: s,
              'aria-label': s,
              'aria-live': 'polite',
            },
            r.createElement(j, { className: (0, a.default)($.toggleIcon, $.lightToggleIcon) }),
            r.createElement(U, { className: (0, a.default)($.toggleIcon, $.darkToggleIcon) })
          )
        );
      }
      const q = r.memo(H),
        G = { darkNavbarColorModeToggle: 'darkNavbarColorModeToggle_m8pZ' };
      function Z(e) {
        let { className: t } = e;
        const n = (0, w.L)().navbar.style,
          a = (0, w.L)().colorMode.disableSwitch,
          { colorMode: o, setColorMode: i } = (0, B.I)();
        return a
          ? null
          : r.createElement(q, {
              className: t,
              buttonClassName: 'dark' === n ? G.darkNavbarColorModeToggle : void 0,
              value: o,
              onChange: i,
            });
      }
      var V = n(898);
      function W() {
        return r.createElement(V.Z, {
          className: 'navbar__brand',
          imageClassName: 'navbar__logo',
          titleClassName: 'navbar__title text--truncate',
        });
      }
      function K() {
        const e = (0, A.e)();
        return r.createElement(
          'button',
          {
            type: 'button',
            'aria-label': (0, u.I)({
              id: 'theme.docs.sidebar.closeSidebarButtonAriaLabel',
              message: 'Close navigation bar',
              description: 'The ARIA label for close button of mobile sidebar',
            }),
            className: 'clean-btn navbar-sidebar__close',
            onClick: () => e.toggle(),
          },
          r.createElement(E, { color: 'var(--ifm-color-emphasis-600)' })
        );
      }
      function Q() {
        return r.createElement(
          'div',
          { className: 'navbar-sidebar__brand' },
          r.createElement(W, null),
          r.createElement(Z, { className: 'margin-right--md' }),
          r.createElement(K, null)
        );
      }
      var Y = n(1884),
        X = n(8948),
        J = n(5626);
      function ee(e, t) {
        return void 0 !== e && void 0 !== t && new RegExp(e, 'gi').test(t);
      }
      var te = n(6125);
      function ne(e) {
        let {
          activeBasePath: t,
          activeBaseRegex: n,
          to: a,
          href: o,
          label: i,
          html: s,
          isDropdownLink: u,
          prependBaseUrlToHref: c,
          ...d
        } = e;
        const f = (0, X.Z)(a),
          p = (0, X.Z)(t),
          m = (0, X.Z)(o, { forcePrependBaseUrl: !0 }),
          g = i && o && !(0, J.Z)(o),
          h = s
            ? { dangerouslySetInnerHTML: { __html: s } }
            : {
                children: r.createElement(
                  r.Fragment,
                  null,
                  i,
                  g && r.createElement(te.Z, u && { width: 12, height: 12 })
                ),
              };
        return o
          ? r.createElement(Y.Z, (0, l.Z)({ href: c ? m : o }, d, h))
          : r.createElement(
              Y.Z,
              (0, l.Z)(
                { to: f, isNavLink: !0 },
                (t || n) && { isActive: (e, t) => (n ? ee(n, t.pathname) : t.pathname.startsWith(p)) },
                d,
                h
              )
            );
      }
      function re(e) {
        let { className: t, isDropdownItem: n = !1, ...o } = e;
        const i = r.createElement(
          ne,
          (0, l.Z)(
            { className: (0, a.default)(n ? 'dropdown__link' : 'navbar__item navbar__link', t), isDropdownLink: n },
            o
          )
        );
        return n ? r.createElement('li', null, i) : i;
      }
      function ae(e) {
        let { className: t, isDropdownItem: n, ...o } = e;
        return r.createElement(
          'li',
          { className: 'menu__list-item' },
          r.createElement(ne, (0, l.Z)({ className: (0, a.default)('menu__link', t) }, o))
        );
      }
      function oe(e) {
        let { mobile: t = !1, position: n, ...a } = e;
        const o = t ? ae : re;
        return r.createElement(
          o,
          (0, l.Z)({}, a, { activeClassName: a.activeClassName ?? (t ? 'menu__link--active' : 'navbar__link--active') })
        );
      }
      var ie = n(376),
        le = n(8862),
        se = n(353);
      function ue(e, t) {
        return e.some(e =>
          (function (e, t) {
            return (
              !!(0, le.Mg)(e.to, t) ||
              !!ee(e.activeBaseRegex, t) ||
              !(!e.activeBasePath || !t.startsWith(e.activeBasePath))
            );
          })(e, t)
        );
      }
      function ce(e) {
        let { items: t, position: n, className: o, onClick: i, ...s } = e;
        const u = (0, r.useRef)(null),
          [c, d] = (0, r.useState)(!1);
        return (
          (0, r.useEffect)(() => {
            const e = e => {
              u.current && !u.current.contains(e.target) && d(!1);
            };
            return (
              document.addEventListener('mousedown', e),
              document.addEventListener('touchstart', e),
              document.addEventListener('focusin', e),
              () => {
                document.removeEventListener('mousedown', e),
                  document.removeEventListener('touchstart', e),
                  document.removeEventListener('focusin', e);
              }
            );
          }, [u]),
          r.createElement(
            'div',
            {
              ref: u,
              className: (0, a.default)('navbar__item', 'dropdown', 'dropdown--hoverable', {
                'dropdown--right': 'right' === n,
                'dropdown--show': c,
              }),
            },
            r.createElement(
              ne,
              (0, l.Z)(
                {
                  'aria-haspopup': 'true',
                  'aria-expanded': c,
                  role: 'button',
                  href: s.to ? void 0 : '#',
                  className: (0, a.default)('navbar__link', o),
                },
                s,
                {
                  onClick: s.to ? void 0 : e => e.preventDefault(),
                  onKeyDown: e => {
                    'Enter' === e.key && (e.preventDefault(), d(!c));
                  },
                }
              ),
              s.children ?? s.label
            ),
            r.createElement(
              'ul',
              { className: 'dropdown__menu' },
              t.map((e, t) =>
                r.createElement(
                  xe,
                  (0, l.Z)({ isDropdownItem: !0, activeClassName: 'dropdown__link--active' }, e, { key: t })
                )
              )
            )
          )
        );
      }
      function de(e) {
        let { items: t, className: n, position: o, onClick: i, ...u } = e;
        const c = (function () {
            const {
                siteConfig: { baseUrl: e },
              } = (0, se.Z)(),
              { pathname: t } = (0, s.TH)();
            return t.replace(e, '/');
          })(),
          d = ue(t, c),
          { collapsed: f, toggleCollapsed: p, setCollapsed: m } = (0, ie.u)({ initialState: () => !d });
        return (
          (0, r.useEffect)(() => {
            d && m(!d);
          }, [c, d, m]),
          r.createElement(
            'li',
            { className: (0, a.default)('menu__list-item', { 'menu__list-item--collapsed': f }) },
            r.createElement(
              ne,
              (0, l.Z)(
                {
                  role: 'button',
                  className: (0, a.default)('menu__link menu__link--sublist menu__link--sublist-caret', n),
                },
                u,
                {
                  onClick: e => {
                    e.preventDefault(), p();
                  },
                }
              ),
              u.children ?? u.label
            ),
            r.createElement(
              ie.z,
              { lazy: !0, as: 'ul', className: 'menu__list', collapsed: f },
              t.map((e, t) =>
                r.createElement(
                  xe,
                  (0, l.Z)({ mobile: !0, isDropdownItem: !0, onClick: i, activeClassName: 'menu__link--active' }, e, {
                    key: t,
                  })
                )
              )
            )
          )
        );
      }
      function fe(e) {
        let { mobile: t = !1, ...n } = e;
        const a = t ? de : ce;
        return r.createElement(a, n);
      }
      var pe = n(3714);
      function me(e) {
        let { width: t = 20, height: n = 20, ...a } = e;
        return r.createElement(
          'svg',
          (0, l.Z)({ viewBox: '0 0 24 24', width: t, height: n, 'aria-hidden': !0 }, a),
          r.createElement('path', {
            fill: 'currentColor',
            d: 'M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z',
          })
        );
      }
      const ge = 'iconLanguage_kvP7';
      var he = n(7406);
      const ve = { searchBox: 'searchBox_WqAV' };
      function be(e) {
        let { children: t, className: n } = e;
        return r.createElement('div', { className: (0, a.default)(n, ve.searchBox) }, t);
      }
      var ye = n(2935),
        we = n(5161);
      var ke = n(4453);
      const Ee = e => e.docs.find(t => t.id === e.mainDocId);
      const Se = {
        default: oe,
        localeDropdown: function (e) {
          let { mobile: t, dropdownItemsBefore: n, dropdownItemsAfter: a, ...o } = e;
          const {
              i18n: { currentLocale: i, locales: c, localeConfigs: d },
            } = (0, se.Z)(),
            f = (0, pe.l)(),
            { search: p, hash: m } = (0, s.TH)(),
            g = [
              ...n,
              ...c.map(e => {
                const n = `${`pathname://${f.createUrl({ locale: e, fullyQualified: !1 })}`}${p}${m}`;
                return {
                  label: d[e].label,
                  lang: d[e].htmlLang,
                  to: n,
                  target: '_self',
                  autoAddBaseUrl: !1,
                  className: e === i ? (t ? 'menu__link--active' : 'dropdown__link--active') : '',
                };
              }),
              ...a,
            ],
            h = t
              ? (0, u.I)({
                  message: 'Languages',
                  id: 'theme.navbar.mobileLanguageDropdown.label',
                  description: 'The label for the mobile language switcher dropdown',
                })
              : d[i].label;
          return r.createElement(
            fe,
            (0, l.Z)({}, o, {
              mobile: t,
              label: r.createElement(r.Fragment, null, r.createElement(me, { className: ge }), h),
              items: g,
            })
          );
        },
        search: function (e) {
          let { mobile: t, className: n } = e;
          return t ? null : r.createElement(be, { className: n }, r.createElement(he.Z, null));
        },
        dropdown: fe,
        html: function (e) {
          let { value: t, className: n, mobile: o = !1, isDropdownItem: i = !1 } = e;
          const l = i ? 'li' : 'div';
          return r.createElement(l, {
            className: (0, a.default)({ navbar__item: !o && !i, 'menu__list-item': o }, n),
            dangerouslySetInnerHTML: { __html: t },
          });
        },
        doc: function (e) {
          let { docId: t, label: n, docsPluginId: a, ...o } = e;
          const { activeDoc: i } = (0, ye.Iw)(a),
            s = (0, we.vY)(t, a);
          return null === s
            ? null
            : r.createElement(
                oe,
                (0, l.Z)({ exact: !0 }, o, {
                  isActive: () => i?.path === s.path || (!!i?.sidebar && i.sidebar === s.sidebar),
                  label: n ?? s.id,
                  to: s.path,
                })
              );
        },
        docSidebar: function (e) {
          let { sidebarId: t, label: n, docsPluginId: a, ...o } = e;
          const { activeDoc: i } = (0, ye.Iw)(a),
            s = (0, we.oz)(t, a).link;
          if (!s)
            throw new Error(`DocSidebarNavbarItem: Sidebar with ID "${t}" doesn't have anything to be linked to.`);
          return r.createElement(
            oe,
            (0, l.Z)({ exact: !0 }, o, { isActive: () => i?.sidebar === t, label: n ?? s.label, to: s.path })
          );
        },
        docsVersion: function (e) {
          let { label: t, to: n, docsPluginId: a, ...o } = e;
          const i = (0, we.lO)(a)[0],
            s = t ?? i.label,
            u = n ?? (e => e.docs.find(t => t.id === e.mainDocId))(i).path;
          return r.createElement(oe, (0, l.Z)({}, o, { label: s, to: u }));
        },
        docsVersionDropdown: function (e) {
          let {
            mobile: t,
            docsPluginId: n,
            dropdownActiveClassDisabled: a,
            dropdownItemsBefore: o,
            dropdownItemsAfter: i,
            ...c
          } = e;
          const { search: d, hash: f } = (0, s.TH)(),
            p = (0, ye.Iw)(n),
            m = (0, ye.gB)(n),
            { savePreferredVersionName: g } = (0, ke.J)(n),
            h = [
              ...o,
              ...m.map(e => {
                const t = p.alternateDocVersions[e.name] ?? Ee(e);
                return {
                  label: e.label,
                  to: `${t.path}${d}${f}`,
                  isActive: () => e === p.activeVersion,
                  onClick: () => g(e.name),
                };
              }),
              ...i,
            ],
            v = (0, we.lO)(n)[0],
            b =
              t && h.length > 1
                ? (0, u.I)({
                    id: 'theme.navbar.mobileVersionsDropdown.label',
                    message: 'Versions',
                    description: 'The label for the navbar versions dropdown on mobile view',
                  })
                : v.label,
            y = t && h.length > 1 ? void 0 : Ee(v).path;
          return h.length <= 1
            ? r.createElement(oe, (0, l.Z)({}, c, { mobile: t, label: b, to: y, isActive: a ? () => !1 : void 0 }))
            : r.createElement(
                fe,
                (0, l.Z)({}, c, { mobile: t, label: b, to: y, items: h, isActive: a ? () => !1 : void 0 })
              );
        },
      };
      function xe(e) {
        let { type: t, ...n } = e;
        const a = (function (e, t) {
            return e && 'default' !== e ? e : 'items' in t ? 'dropdown' : 'default';
          })(t, n),
          o = Se[a];
        if (!o) throw new Error(`No NavbarItem component found for type "${t}".`);
        return r.createElement(o, n);
      }
      function Ce() {
        const e = (0, A.e)(),
          t = (0, w.L)().navbar.items;
        return r.createElement(
          'ul',
          { className: 'menu__list' },
          t.map((t, n) => r.createElement(xe, (0, l.Z)({ mobile: !0 }, t, { onClick: () => e.toggle(), key: n })))
        );
      }
      function Te(e) {
        return r.createElement(
          'button',
          (0, l.Z)({}, e, { type: 'button', className: 'clean-btn navbar-sidebar__back' }),
          r.createElement(
            u.Z,
            {
              id: 'theme.navbar.mobileSidebarSecondaryMenu.backButtonLabel',
              description:
                'The label of the back button to return to main menu, inside the mobile navbar sidebar secondary menu (notably used to display the docs sidebar)',
            },
            '\u2190 Back to main menu'
          )
        );
      }
      function _e() {
        const e = 0 === (0, w.L)().navbar.items.length,
          t = M();
        return r.createElement(r.Fragment, null, !e && r.createElement(Te, { onClick: () => t.hide() }), t.content);
      }
      function Le() {
        const e = (0, A.e)();
        var t;
        return (
          void 0 === (t = e.shown) && (t = !0),
          (0, r.useEffect)(
            () => (
              (document.body.style.overflow = t ? 'hidden' : 'visible'),
              () => {
                document.body.style.overflow = 'visible';
              }
            ),
            [t]
          ),
          e.shouldRender
            ? r.createElement(F, {
                header: r.createElement(Q, null),
                primaryMenu: r.createElement(Ce, null),
                secondaryMenu: r.createElement(_e, null),
              })
            : null
        );
      }
      const Ae = { navbarHideable: 'navbarHideable_hhpl', navbarHidden: 'navbarHidden_nmcs' };
      function Ne(e) {
        return r.createElement(
          'div',
          (0, l.Z)({ role: 'presentation' }, e, { className: (0, a.default)('navbar-sidebar__backdrop', e.className) })
        );
      }
      function Re(e) {
        let { children: t } = e;
        const {
            navbar: { hideOnScroll: n, style: o },
          } = (0, w.L)(),
          i = (0, A.e)(),
          { navbarRef: l, isNavbarVisible: s } = (function (e) {
            const [t, n] = (0, r.useState)(e),
              a = (0, r.useRef)(!1),
              o = (0, r.useRef)(0),
              i = (0, r.useCallback)(e => {
                null !== e && (o.current = e.getBoundingClientRect().height);
              }, []);
            return (
              (0, N.RF)((t, r) => {
                let { scrollY: i } = t;
                if (!e) return;
                if (i < o.current) return void n(!0);
                if (a.current) return void (a.current = !1);
                const l = r?.scrollY,
                  s = document.documentElement.scrollHeight - o.current,
                  u = window.innerHeight;
                l && i >= l ? n(!1) : i + u < s && n(!0);
              }),
              (0, c.S)(t => {
                if (!e) return;
                const r = t.location.hash;
                if (r ? document.getElementById(r.substring(1)) : void 0) return (a.current = !0), void n(!1);
                n(!0);
              }),
              { navbarRef: i, isNavbarVisible: t }
            );
          })(n);
        return r.createElement(
          'nav',
          {
            ref: l,
            'aria-label': (0, u.I)({
              id: 'theme.NavBar.navAriaLabel',
              message: 'Main',
              description: 'The ARIA label for the main navigation',
            }),
            className: (0, a.default)('navbar', 'navbar--fixed-top', n && [Ae.navbarHideable, !s && Ae.navbarHidden], {
              'navbar--dark': 'dark' === o,
              'navbar--primary': 'primary' === o,
              'navbar-sidebar--show': i.shown,
            }),
          },
          t,
          r.createElement(Ne, { onClick: i.toggle }),
          r.createElement(Le, null)
        );
      }
      var Pe = n(1721);
      const Oe = { errorBoundaryError: 'errorBoundaryError_WE6Q' };
      function De(e) {
        return r.createElement(
          'button',
          (0, l.Z)({ type: 'button' }, e),
          r.createElement(
            u.Z,
            {
              id: 'theme.ErrorPageContent.tryAgain',
              description:
                'The label of the button to try again rendering when the React error boundary captures an error',
            },
            'Try again'
          )
        );
      }
      function Ie(e) {
        let { error: t } = e;
        const n = (0, Pe.getErrorCausalChain)(t)
          .map(e => e.message)
          .join('\n\nCause:\n');
        return r.createElement('p', { className: Oe.errorBoundaryError }, n);
      }
      class Me extends r.Component {
        componentDidCatch(e, t) {
          throw this.props.onError(e, t);
        }
        render() {
          return this.props.children;
        }
      }
      const Fe = 'right';
      function Be(e) {
        let { width: t = 30, height: n = 30, className: a, ...o } = e;
        return r.createElement(
          'svg',
          (0, l.Z)({ className: a, width: t, height: n, viewBox: '0 0 30 30', 'aria-hidden': 'true' }, o),
          r.createElement('path', {
            stroke: 'currentColor',
            strokeLinecap: 'round',
            strokeMiterlimit: '10',
            strokeWidth: '2',
            d: 'M4 7h22M4 15h22M4 23h22',
          })
        );
      }
      function ze() {
        const { toggle: e, shown: t } = (0, A.e)();
        return r.createElement(
          'button',
          {
            onClick: e,
            'aria-label': (0, u.I)({
              id: 'theme.docs.sidebar.toggleSidebarButtonAriaLabel',
              message: 'Toggle navigation bar',
              description: 'The ARIA label for hamburger menu button of mobile navigation',
            }),
            'aria-expanded': t,
            className: 'navbar__toggle clean-btn',
            type: 'button',
          },
          r.createElement(Be, null)
        );
      }
      const je = { colorModeToggle: 'colorModeToggle_Hewu' };
      function Ue(e) {
        let { items: t } = e;
        return r.createElement(
          r.Fragment,
          null,
          t.map((e, t) =>
            r.createElement(
              Me,
              {
                key: t,
                onError: t =>
                  new Error(
                    `A theme navbar item failed to render.\nPlease double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:\n${JSON.stringify(
                      e,
                      null,
                      2
                    )}`,
                    { cause: t }
                  ),
              },
              r.createElement(xe, e)
            )
          )
        );
      }
      function $e(e) {
        let { left: t, right: n } = e;
        return r.createElement(
          'div',
          { className: 'navbar__inner' },
          r.createElement('div', { className: 'navbar__items' }, t),
          r.createElement('div', { className: 'navbar__items navbar__items--right' }, n)
        );
      }
      function He() {
        const e = (0, A.e)(),
          t = (0, w.L)().navbar.items,
          [n, a] = (function (e) {
            function t(e) {
              return 'left' === (e.position ?? Fe);
            }
            return [e.filter(t), e.filter(e => !t(e))];
          })(t),
          o = t.find(e => 'search' === e.type);
        return r.createElement($e, {
          left: r.createElement(
            r.Fragment,
            null,
            !e.disabled && r.createElement(ze, null),
            r.createElement(W, null),
            r.createElement(Ue, { items: n })
          ),
          right: r.createElement(
            r.Fragment,
            null,
            r.createElement(Ue, { items: a }),
            r.createElement(Z, { className: je.colorModeToggle }),
            !o && r.createElement(be, null, r.createElement(he.Z, null))
          ),
        });
      }
      function qe() {
        return r.createElement(Re, null, r.createElement(He, null));
      }
      function Ge(e) {
        let { item: t } = e;
        const { to: n, href: a, label: o, prependBaseUrlToHref: i, ...s } = t,
          u = (0, X.Z)(n),
          c = (0, X.Z)(a, { forcePrependBaseUrl: !0 });
        return r.createElement(
          Y.Z,
          (0, l.Z)({ className: 'footer__link-item' }, a ? { href: i ? c : a } : { to: u }, s),
          o,
          a && !(0, J.Z)(a) && r.createElement(te.Z, null)
        );
      }
      function Ze(e) {
        let { item: t } = e;
        return t.html
          ? r.createElement('li', { className: 'footer__item', dangerouslySetInnerHTML: { __html: t.html } })
          : r.createElement('li', { key: t.href ?? t.to, className: 'footer__item' }, r.createElement(Ge, { item: t }));
      }
      function Ve(e) {
        let { column: t } = e;
        return r.createElement(
          'div',
          { className: 'col footer__col' },
          r.createElement('div', { className: 'footer__title' }, t.title),
          r.createElement(
            'ul',
            { className: 'footer__items clean-list' },
            t.items.map((e, t) => r.createElement(Ze, { key: t, item: e }))
          )
        );
      }
      function We(e) {
        let { columns: t } = e;
        return r.createElement(
          'div',
          { className: 'row footer__links' },
          t.map((e, t) => r.createElement(Ve, { key: t, column: e }))
        );
      }
      function Ke() {
        return r.createElement('span', { className: 'footer__link-separator' }, '\xb7');
      }
      function Qe(e) {
        let { item: t } = e;
        return t.html
          ? r.createElement('span', { className: 'footer__link-item', dangerouslySetInnerHTML: { __html: t.html } })
          : r.createElement(Ge, { item: t });
      }
      function Ye(e) {
        let { links: t } = e;
        return r.createElement(
          'div',
          { className: 'footer__links text--center' },
          r.createElement(
            'div',
            { className: 'footer__links' },
            t.map((e, n) =>
              r.createElement(
                r.Fragment,
                { key: n },
                r.createElement(Qe, { item: e }),
                t.length !== n + 1 && r.createElement(Ke, null)
              )
            )
          )
        );
      }
      function Xe(e) {
        let { links: t } = e;
        return (function (e) {
          return 'title' in e[0];
        })(t)
          ? r.createElement(We, { columns: t })
          : r.createElement(Ye, { links: t });
      }
      var Je = n(4034);
      const et = { footerLogoLink: 'footerLogoLink_tutC' };
      function tt(e) {
        let { logo: t } = e;
        const { withBaseUrl: n } = (0, X.C)(),
          o = { light: n(t.src), dark: n(t.srcDark ?? t.src) };
        return r.createElement(Je.Z, {
          className: (0, a.default)('footer__logo', t.className),
          alt: t.alt,
          sources: o,
          width: t.width,
          height: t.height,
          style: t.style,
        });
      }
      function nt(e) {
        let { logo: t } = e;
        return t.href
          ? r.createElement(
              Y.Z,
              { href: t.href, className: et.footerLogoLink, target: t.target },
              r.createElement(tt, { logo: t })
            )
          : r.createElement(tt, { logo: t });
      }
      function rt(e) {
        let { copyright: t } = e;
        return r.createElement('div', { className: 'footer__copyright', dangerouslySetInnerHTML: { __html: t } });
      }
      function at(e) {
        let { style: t, links: n, logo: o, copyright: i } = e;
        return r.createElement(
          'footer',
          { className: (0, a.default)('footer', { 'footer--dark': 'dark' === t }) },
          r.createElement(
            'div',
            { className: 'container container-fluid' },
            n,
            (o || i) &&
              r.createElement(
                'div',
                { className: 'footer__bottom text--center' },
                o && r.createElement('div', { className: 'margin-bottom--sm' }, o),
                i
              )
          )
        );
      }
      function ot() {
        const { footer: e } = (0, w.L)();
        if (!e) return null;
        const { copyright: t, links: n, logo: a, style: o } = e;
        return r.createElement(at, {
          style: o,
          links: n && n.length > 0 && r.createElement(Xe, { links: n }),
          logo: a && r.createElement(nt, { logo: a }),
          copyright: t && r.createElement(rt, { copyright: t }),
        });
      }
      const it = r.memo(ot),
        lt = (0, R.Qc)([
          B.S,
          k.pl,
          N.OC,
          ke.L5,
          i.VC,
          function (e) {
            let { children: t } = e;
            return r.createElement(P.n2, null, r.createElement(A.M, null, r.createElement(D, null, t)));
          },
        ]);
      function st(e) {
        let { children: t } = e;
        return r.createElement(lt, null, t);
      }
      function ut(e) {
        let { error: t, tryAgain: n } = e;
        return r.createElement(
          'main',
          { className: 'container margin-vert--xl' },
          r.createElement(
            'div',
            { className: 'row' },
            r.createElement(
              'div',
              { className: 'col col--6 col--offset-3' },
              r.createElement(
                'h1',
                { className: 'hero__title' },
                r.createElement(
                  u.Z,
                  {
                    id: 'theme.ErrorPageContent.title',
                    description: 'The title of the fallback page when the page crashed',
                  },
                  'This page crashed.'
                )
              ),
              r.createElement(
                'div',
                { className: 'margin-vert--lg' },
                r.createElement(De, { onClick: n, className: 'button button--primary shadow--lw' })
              ),
              r.createElement('hr', null),
              r.createElement('div', { className: 'margin-vert--md' }, r.createElement(Ie, { error: t }))
            )
          )
        );
      }
      const ct = { mainWrapper: 'mainWrapper_MB5r' };
      function dt(e) {
        const { children: t, noFooter: n, wrapperClassName: l, title: s, description: u } = e;
        return (
          (0, v.t)(),
          r.createElement(
            st,
            null,
            r.createElement(i.d, { title: s, description: u }),
            r.createElement(y, null),
            r.createElement(L, null),
            r.createElement(qe, null),
            r.createElement(
              'div',
              { id: d, className: (0, a.default)(h.k.wrapper.main, ct.mainWrapper, l) },
              r.createElement(o.Z, { fallback: e => r.createElement(ut, e) }, t)
            ),
            !n && r.createElement(it, null)
          )
        );
      }
    },
    898: (e, t, n) => {
      'use strict';
      n.d(t, { Z: () => d });
      var r = n(5773),
        a = n(7378),
        o = n(1884),
        i = n(8948),
        l = n(353),
        s = n(624),
        u = n(4034);
      function c(e) {
        let { logo: t, alt: n, imageClassName: r } = e;
        const o = { light: (0, i.Z)(t.src), dark: (0, i.Z)(t.srcDark || t.src) },
          l = a.createElement(u.Z, {
            className: t.className,
            sources: o,
            height: t.height,
            width: t.width,
            alt: n,
            style: t.style,
          });
        return r ? a.createElement('div', { className: r }, l) : l;
      }
      function d(e) {
        const {
            siteConfig: { title: t },
          } = (0, l.Z)(),
          {
            navbar: { title: n, logo: u },
          } = (0, s.L)(),
          { imageClassName: d, titleClassName: f, ...p } = e,
          m = (0, i.Z)(u?.href || '/'),
          g = n ? '' : t,
          h = u?.alt ?? g;
        return a.createElement(
          o.Z,
          (0, r.Z)({ to: m }, p, u?.target && { target: u.target }),
          u && a.createElement(c, { logo: u, alt: h, imageClassName: d }),
          null != n && a.createElement('b', { className: f }, n)
        );
      }
    },
    505: (e, t, n) => {
      'use strict';
      n.d(t, { Z: () => o });
      var r = n(7378),
        a = n(7092);
      function o(e) {
        let { locale: t, version: n, tag: o } = e;
        const i = t;
        return r.createElement(
          a.Z,
          null,
          t && r.createElement('meta', { name: 'docusaurus_locale', content: t }),
          n && r.createElement('meta', { name: 'docusaurus_version', content: n }),
          o && r.createElement('meta', { name: 'docusaurus_tag', content: o }),
          i && r.createElement('meta', { name: 'docsearch:language', content: i }),
          n && r.createElement('meta', { name: 'docsearch:version', content: n }),
          o && r.createElement('meta', { name: 'docsearch:docusaurus_tag', content: o })
        );
      }
    },
    4034: (e, t, n) => {
      'use strict';
      n.d(t, { Z: () => u });
      var r = n(5773),
        a = n(7378),
        o = n(8944),
        i = n(6457),
        l = n(5421);
      const s = {
        themedImage: 'themedImage_BQGR',
        'themedImage--light': 'themedImage--light_HAxW',
        'themedImage--dark': 'themedImage--dark_bGx0',
      };
      function u(e) {
        const t = (0, i.Z)(),
          { colorMode: n } = (0, l.I)(),
          { sources: u, className: c, alt: d, ...f } = e,
          p = t ? ('dark' === n ? ['dark'] : ['light']) : ['light', 'dark'];
        return a.createElement(
          a.Fragment,
          null,
          p.map(e =>
            a.createElement(
              'img',
              (0, r.Z)(
                { key: e, src: u[e], alt: d, className: (0, o.default)(s.themedImage, s[`themedImage--${e}`], c) },
                f
              )
            )
          )
        );
      }
    },
    376: (e, t, n) => {
      'use strict';
      n.d(t, { u: () => l, z: () => h });
      var r = n(5773),
        a = n(7378),
        o = n(161);
      const i = 'ease-in-out';
      function l(e) {
        let { initialState: t } = e;
        const [n, r] = (0, a.useState)(t ?? !1),
          o = (0, a.useCallback)(() => {
            r(e => !e);
          }, []);
        return { collapsed: n, setCollapsed: r, toggleCollapsed: o };
      }
      const s = { display: 'none', overflow: 'hidden', height: '0px' },
        u = { display: 'block', overflow: 'visible', height: 'auto' };
      function c(e, t) {
        const n = t ? s : u;
        (e.style.display = n.display), (e.style.overflow = n.overflow), (e.style.height = n.height);
      }
      function d(e) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 0;
        const t = e / 36;
        return Math.round(10 * (4 + 15 * t ** 0.25 + t / 5));
      }
      function f(e) {
        let { collapsibleRef: t, collapsed: n, animation: r } = e;
        const o = (0, a.useRef)(!1);
        (0, a.useEffect)(() => {
          const e = t.current;
          function a() {
            const t = (function () {
              const t = e.scrollHeight;
              return { transition: `height ${r?.duration ?? d(t)}ms ${r?.easing ?? i}`, height: `${t}px` };
            })();
            (e.style.transition = t.transition), (e.style.height = t.height);
          }
          if (!o.current) return c(e, n), void (o.current = !0);
          return (
            (e.style.willChange = 'height'),
            (function () {
              const t = requestAnimationFrame(() => {
                n
                  ? (a(),
                    requestAnimationFrame(() => {
                      (e.style.height = s.height), (e.style.overflow = s.overflow);
                    }))
                  : ((e.style.display = 'block'),
                    requestAnimationFrame(() => {
                      a();
                    }));
              });
              return () => cancelAnimationFrame(t);
            })()
          );
        }, [t, n, r]);
      }
      function p(e) {
        if (!o.Z.canUseDOM) return e ? s : u;
      }
      function m(e) {
        let {
          as: t = 'div',
          collapsed: n,
          children: r,
          animation: o,
          onCollapseTransitionEnd: i,
          className: l,
          disableSSRStyle: s,
        } = e;
        const u = (0, a.useRef)(null);
        return (
          f({ collapsibleRef: u, collapsed: n, animation: o }),
          a.createElement(
            t,
            {
              ref: u,
              style: s ? void 0 : p(n),
              onTransitionEnd: e => {
                'height' === e.propertyName && (c(u.current, n), i?.(n));
              },
              className: l,
            },
            r
          )
        );
      }
      function g(e) {
        let { collapsed: t, ...n } = e;
        const [o, i] = (0, a.useState)(!t),
          [l, s] = (0, a.useState)(t);
        return (
          (0, a.useLayoutEffect)(() => {
            t || i(!0);
          }, [t]),
          (0, a.useLayoutEffect)(() => {
            o && s(t);
          }, [o, t]),
          o ? a.createElement(m, (0, r.Z)({}, n, { collapsed: l })) : null
        );
      }
      function h(e) {
        let { lazy: t, ...n } = e;
        const r = t ? g : m;
        return a.createElement(r, n);
      }
    },
    10: (e, t, n) => {
      'use strict';
      n.d(t, { nT: () => m, pl: () => p });
      var r = n(7378),
        a = n(6457),
        o = n(1819),
        i = n(1763),
        l = n(624);
      const s = (0, o.WA)('docusaurus.announcement.dismiss'),
        u = (0, o.WA)('docusaurus.announcement.id'),
        c = () => 'true' === s.get(),
        d = e => s.set(String(e)),
        f = r.createContext(null);
      function p(e) {
        let { children: t } = e;
        const n = (function () {
          const { announcementBar: e } = (0, l.L)(),
            t = (0, a.Z)(),
            [n, o] = (0, r.useState)(() => !!t && c());
          (0, r.useEffect)(() => {
            o(c());
          }, []);
          const i = (0, r.useCallback)(() => {
            d(!0), o(!0);
          }, []);
          return (
            (0, r.useEffect)(() => {
              if (!e) return;
              const { id: t } = e;
              let n = u.get();
              'annoucement-bar' === n && (n = 'announcement-bar');
              const r = t !== n;
              u.set(t), r && d(!1), (!r && c()) || o(!1);
            }, [e]),
            (0, r.useMemo)(() => ({ isActive: !!e && !n, close: i }), [e, n, i])
          );
        })();
        return r.createElement(f.Provider, { value: n }, t);
      }
      function m() {
        const e = (0, r.useContext)(f);
        if (!e) throw new i.i6('AnnouncementBarProvider');
        return e;
      }
    },
    5421: (e, t, n) => {
      'use strict';
      n.d(t, { I: () => h, S: () => g });
      var r = n(7378),
        a = n(161),
        o = n(1763),
        i = n(1819),
        l = n(624);
      const s = r.createContext(void 0),
        u = 'theme',
        c = (0, i.WA)(u),
        d = { light: 'light', dark: 'dark' },
        f = e => (e === d.dark ? d.dark : d.light),
        p = e => (a.Z.canUseDOM ? f(document.documentElement.getAttribute('data-theme')) : f(e)),
        m = e => {
          c.set(f(e));
        };
      function g(e) {
        let { children: t } = e;
        const n = (function () {
          const {
              colorMode: { defaultMode: e, disableSwitch: t, respectPrefersColorScheme: n },
            } = (0, l.L)(),
            [a, o] = (0, r.useState)(p(e));
          (0, r.useEffect)(() => {
            t && c.del();
          }, [t]);
          const i = (0, r.useCallback)(
            function (t, r) {
              void 0 === r && (r = {});
              const { persist: a = !0 } = r;
              t
                ? (o(t), a && m(t))
                : (o(n ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? d.dark : d.light) : e), c.del());
            },
            [n, e]
          );
          (0, r.useEffect)(() => {
            document.documentElement.setAttribute('data-theme', f(a));
          }, [a]),
            (0, r.useEffect)(() => {
              if (t) return;
              const e = e => {
                if (e.key !== u) return;
                const t = c.get();
                null !== t && i(f(t));
              };
              return window.addEventListener('storage', e), () => window.removeEventListener('storage', e);
            }, [t, i]);
          const s = (0, r.useRef)(!1);
          return (
            (0, r.useEffect)(() => {
              if (t && !n) return;
              const e = window.matchMedia('(prefers-color-scheme: dark)'),
                r = () => {
                  window.matchMedia('print').matches || s.current
                    ? (s.current = window.matchMedia('print').matches)
                    : i(null);
                };
              return e.addListener(r), () => e.removeListener(r);
            }, [i, t, n]),
            (0, r.useMemo)(
              () => ({
                colorMode: a,
                setColorMode: i,
                get isDarkTheme() {
                  return a === d.dark;
                },
                setLightTheme() {
                  i(d.light);
                },
                setDarkTheme() {
                  i(d.dark);
                },
              }),
              [a, i]
            )
          );
        })();
        return r.createElement(s.Provider, { value: n }, t);
      }
      function h() {
        const e = (0, r.useContext)(s);
        if (null == e)
          throw new o.i6(
            'ColorModeProvider',
            'Please see https://docusaurus.io/docs/api/themes/configuration#use-color-mode.'
          );
        return e;
      }
    },
    4453: (e, t, n) => {
      'use strict';
      n.d(t, { J: () => b, L5: () => h });
      var r = n(7378),
        a = n(2935),
        o = n(5688),
        i = n(624),
        l = n(5161),
        s = n(1763),
        u = n(1819);
      const c = e => `docs-preferred-version-${e}`,
        d = {
          save: (e, t, n) => {
            (0, u.WA)(c(e), { persistence: t }).set(n);
          },
          read: (e, t) => (0, u.WA)(c(e), { persistence: t }).get(),
          clear: (e, t) => {
            (0, u.WA)(c(e), { persistence: t }).del();
          },
        },
        f = e => Object.fromEntries(e.map(e => [e, { preferredVersionName: null }]));
      const p = r.createContext(null);
      function m() {
        const e = (0, a._r)(),
          t = (0, i.L)().docs.versionPersistence,
          n = (0, r.useMemo)(() => Object.keys(e), [e]),
          [o, l] = (0, r.useState)(() => f(n));
        (0, r.useEffect)(() => {
          l(
            (function (e) {
              let { pluginIds: t, versionPersistence: n, allDocsData: r } = e;
              function a(e) {
                const t = d.read(e, n);
                return r[e].versions.some(e => e.name === t)
                  ? { preferredVersionName: t }
                  : (d.clear(e, n), { preferredVersionName: null });
              }
              return Object.fromEntries(t.map(e => [e, a(e)]));
            })({ allDocsData: e, versionPersistence: t, pluginIds: n })
          );
        }, [e, t, n]);
        return [
          o,
          (0, r.useMemo)(
            () => ({
              savePreferredVersion: function (e, n) {
                d.save(e, t, n), l(t => ({ ...t, [e]: { preferredVersionName: n } }));
              },
            }),
            [t]
          ),
        ];
      }
      function g(e) {
        let { children: t } = e;
        const n = m();
        return r.createElement(p.Provider, { value: n }, t);
      }
      function h(e) {
        let { children: t } = e;
        return l.cE ? r.createElement(g, null, t) : r.createElement(r.Fragment, null, t);
      }
      function v() {
        const e = (0, r.useContext)(p);
        if (!e) throw new s.i6('DocsPreferredVersionContextProvider');
        return e;
      }
      function b(e) {
        void 0 === e && (e = o.m);
        const t = (0, a.zh)(e),
          [n, i] = v(),
          { preferredVersionName: l } = n[e];
        return {
          preferredVersion: t.versions.find(e => e.name === l) ?? null,
          savePreferredVersionName: (0, r.useCallback)(
            t => {
              i.savePreferredVersion(e, t);
            },
            [i, e]
          ),
        };
      }
    },
    2095: (e, t, n) => {
      'use strict';
      n.d(t, { V: () => s, b: () => l });
      var r = n(7378),
        a = n(1763);
      const o = Symbol('EmptyContext'),
        i = r.createContext(o);
      function l(e) {
        let { children: t, name: n, items: a } = e;
        const o = (0, r.useMemo)(() => (n && a ? { name: n, items: a } : null), [n, a]);
        return r.createElement(i.Provider, { value: o }, t);
      }
      function s() {
        const e = (0, r.useContext)(i);
        if (e === o) throw new a.i6('DocsSidebarProvider');
        return e;
      }
    },
    5611: (e, t, n) => {
      'use strict';
      n.d(t, { E: () => l, q: () => i });
      var r = n(7378),
        a = n(1763);
      const o = r.createContext(null);
      function i(e) {
        let { children: t, version: n } = e;
        return r.createElement(o.Provider, { value: n }, t);
      }
      function l() {
        const e = (0, r.useContext)(o);
        if (null === e) throw new a.i6('DocsVersionProvider');
        return e;
      }
    },
    5536: (e, t, n) => {
      'use strict';
      n.d(t, { M: () => d, e: () => f });
      var r = n(7378),
        a = n(3471),
        o = n(8357),
        i = n(654),
        l = n(624),
        s = n(1763);
      const u = r.createContext(void 0);
      function c() {
        const e = (function () {
            const e = (0, a.HY)(),
              { items: t } = (0, l.L)().navbar;
            return 0 === t.length && !e.component;
          })(),
          t = (0, o.i)(),
          n = !e && 'mobile' === t,
          [s, u] = (0, r.useState)(!1);
        (0, i.Rb)(() => {
          if (s) return u(!1), !1;
        });
        const c = (0, r.useCallback)(() => {
          u(e => !e);
        }, []);
        return (
          (0, r.useEffect)(() => {
            'desktop' === t && u(!1);
          }, [t]),
          (0, r.useMemo)(() => ({ disabled: e, shouldRender: n, toggle: c, shown: s }), [e, n, c, s])
        );
      }
      function d(e) {
        let { children: t } = e;
        const n = c();
        return r.createElement(u.Provider, { value: n }, t);
      }
      function f() {
        const e = r.useContext(u);
        if (void 0 === e) throw new s.i6('NavbarMobileSidebarProvider');
        return e;
      }
    },
    3471: (e, t, n) => {
      'use strict';
      n.d(t, { HY: () => l, Zo: () => s, n2: () => i });
      var r = n(7378),
        a = n(1763);
      const o = r.createContext(null);
      function i(e) {
        let { children: t } = e;
        const n = (0, r.useState)({ component: null, props: null });
        return r.createElement(o.Provider, { value: n }, t);
      }
      function l() {
        const e = (0, r.useContext)(o);
        if (!e) throw new a.i6('NavbarSecondaryMenuContentProvider');
        return e[0];
      }
      function s(e) {
        let { component: t, props: n } = e;
        const i = (0, r.useContext)(o);
        if (!i) throw new a.i6('NavbarSecondaryMenuContentProvider');
        const [, l] = i,
          s = (0, a.Ql)(n);
        return (
          (0, r.useEffect)(() => {
            l({ component: t, props: s });
          }, [l, t, s]),
          (0, r.useEffect)(() => () => l({ component: null, props: null }), [l]),
          null
        );
      }
    },
    174: (e, t, n) => {
      'use strict';
      n.d(t, { h: () => a, t: () => o });
      var r = n(7378);
      const a = 'navigation-with-keyboard';
      function o() {
        (0, r.useEffect)(() => {
          function e(e) {
            'keydown' === e.type && 'Tab' === e.key && document.body.classList.add(a),
              'mousedown' === e.type && document.body.classList.remove(a);
          }
          return (
            document.addEventListener('keydown', e),
            document.addEventListener('mousedown', e),
            () => {
              document.body.classList.remove(a),
                document.removeEventListener('keydown', e),
                document.removeEventListener('mousedown', e);
            }
          );
        }, []);
      }
    },
    8357: (e, t, n) => {
      'use strict';
      n.d(t, { i: () => u });
      var r = n(7378),
        a = n(161);
      const o = { desktop: 'desktop', mobile: 'mobile', ssr: 'ssr' },
        i = 996;
      function l() {
        return a.Z.canUseDOM ? (window.innerWidth > i ? o.desktop : o.mobile) : o.ssr;
      }
      const s = !1;
      function u() {
        const [e, t] = (0, r.useState)(() => (s ? 'ssr' : l()));
        return (
          (0, r.useEffect)(() => {
            function e() {
              t(l());
            }
            const n = s ? window.setTimeout(e, 1e3) : void 0;
            return (
              window.addEventListener('resize', e),
              () => {
                window.removeEventListener('resize', e), clearTimeout(n);
              }
            );
          }, []),
          e
        );
      }
    },
    5484: (e, t, n) => {
      'use strict';
      n.d(t, { k: () => r });
      const r = {
        page: {
          blogListPage: 'blog-list-page',
          blogPostPage: 'blog-post-page',
          blogTagsListPage: 'blog-tags-list-page',
          blogTagPostListPage: 'blog-tags-post-list-page',
          docsDocPage: 'docs-doc-page',
          docsTagsListPage: 'docs-tags-list-page',
          docsTagDocListPage: 'docs-tags-doc-list-page',
          mdxPage: 'mdx-page',
        },
        wrapper: {
          main: 'main-wrapper',
          blogPages: 'blog-wrapper',
          docsPages: 'docs-wrapper',
          mdxPages: 'mdx-wrapper',
        },
        common: {
          editThisPage: 'theme-edit-this-page',
          lastUpdated: 'theme-last-updated',
          backToTopButton: 'theme-back-to-top-button',
          codeBlock: 'theme-code-block',
          admonition: 'theme-admonition',
          admonitionType: e => `theme-admonition-${e}`,
        },
        layout: {},
        docs: {
          docVersionBanner: 'theme-doc-version-banner',
          docVersionBadge: 'theme-doc-version-badge',
          docBreadcrumbs: 'theme-doc-breadcrumbs',
          docMarkdown: 'theme-doc-markdown',
          docTocMobile: 'theme-doc-toc-mobile',
          docTocDesktop: 'theme-doc-toc-desktop',
          docFooter: 'theme-doc-footer',
          docFooterTagsRow: 'theme-doc-footer-tags-row',
          docFooterEditMetaRow: 'theme-doc-footer-edit-meta-row',
          docSidebarContainer: 'theme-doc-sidebar-container',
          docSidebarMenu: 'theme-doc-sidebar-menu',
          docSidebarItemCategory: 'theme-doc-sidebar-item-category',
          docSidebarItemLink: 'theme-doc-sidebar-item-link',
          docSidebarItemCategoryLevel: e => `theme-doc-sidebar-item-category-level-${e}`,
          docSidebarItemLinkLevel: e => `theme-doc-sidebar-item-link-level-${e}`,
        },
        blog: {},
      };
    },
    5161: (e, t, n) => {
      'use strict';
      n.d(t, {
        MN: () => C,
        Wl: () => m,
        _F: () => b,
        cE: () => f,
        hI: () => x,
        jA: () => g,
        lO: () => k,
        oz: () => E,
        s1: () => w,
        vY: () => S,
        xz: () => p,
      });
      var r = n(7378),
        a = n(5582),
        o = n(5473),
        i = n(2935),
        l = n(4453),
        s = n(5611),
        u = n(2095),
        c = n(784),
        d = n(8862);
      const f = !!i._r;
      function p(e) {
        const t = (0, s.E)();
        if (!e) return;
        const n = t.docs[e];
        if (!n) throw new Error(`no version doc found by id=${e}`);
        return n;
      }
      function m(e) {
        if (e.href) return e.href;
        for (const t of e.items) {
          if ('link' === t.type) return t.href;
          if ('category' === t.type) {
            const e = m(t);
            if (e) return e;
          }
        }
      }
      function g() {
        const { pathname: e } = (0, a.TH)(),
          t = (0, u.V)();
        if (!t) throw new Error('Unexpected: cant find current sidebar in context');
        const n = y({ sidebarItems: t.items, pathname: e, onlyCategories: !0 }).slice(-1)[0];
        if (!n)
          throw new Error(
            `${e} is not associated with a category. useCurrentSidebarCategory() should only be used on category index pages.`
          );
        return n;
      }
      const h = (e, t) => void 0 !== e && (0, d.Mg)(e, t),
        v = (e, t) => e.some(e => b(e, t));
      function b(e, t) {
        return 'link' === e.type ? h(e.href, t) : 'category' === e.type && (h(e.href, t) || v(e.items, t));
      }
      function y(e) {
        let { sidebarItems: t, pathname: n, onlyCategories: r = !1 } = e;
        const a = [];
        return (
          (function e(t) {
            for (const o of t)
              if (
                ('category' === o.type && ((0, d.Mg)(o.href, n) || e(o.items))) ||
                ('link' === o.type && (0, d.Mg)(o.href, n))
              ) {
                return (r && 'category' !== o.type) || a.unshift(o), !0;
              }
            return !1;
          })(t),
          a
        );
      }
      function w() {
        const e = (0, u.V)(),
          { pathname: t } = (0, a.TH)(),
          n = (0, i.gA)()?.pluginData.breadcrumbs;
        return !1 !== n && e ? y({ sidebarItems: e.items, pathname: t }) : null;
      }
      function k(e) {
        const { activeVersion: t } = (0, i.Iw)(e),
          { preferredVersion: n } = (0, l.J)(e),
          a = (0, i.yW)(e);
        return (0, r.useMemo)(() => (0, c.j)([t, n, a].filter(Boolean)), [t, n, a]);
      }
      function E(e, t) {
        const n = k(t);
        return (0, r.useMemo)(() => {
          const t = n.flatMap(e => (e.sidebars ? Object.entries(e.sidebars) : [])),
            r = t.find(t => t[0] === e);
          if (!r)
            throw new Error(
              `Can't find any sidebar with id "${e}" in version${n.length > 1 ? 's' : ''} ${n
                .map(e => e.name)
                .join(', ')}".\nAvailable sidebar ids are:\n- ${Object.keys(t).join('\n- ')}`
            );
          return r[1];
        }, [e, n]);
      }
      function S(e, t) {
        const n = k(t);
        return (0, r.useMemo)(() => {
          const t = n.flatMap(e => e.docs),
            r = t.find(t => t.id === e);
          if (!r) {
            if (n.flatMap(e => e.draftIds).includes(e)) return null;
            throw new Error(
              `Couldn't find any doc with id "${e}" in version${n.length > 1 ? 's' : ''} "${n
                .map(e => e.name)
                .join(', ')}".\nAvailable doc ids are:\n- ${(0, c.j)(t.map(e => e.id)).join('\n- ')}`
            );
          }
          return r;
        }, [e, n]);
      }
      function x(e) {
        let { route: t, versionMetadata: n } = e;
        const r = (0, a.TH)(),
          i = t.routes,
          l = i.find(e => (0, a.LX)(r.pathname, e));
        if (!l) return null;
        const s = l.sidebar,
          u = s ? n.docsSidebars[s] : void 0;
        return { docElement: (0, o.H)(i), sidebarName: s, sidebarItems: u };
      }
      function C(e) {
        return e.filter(e => 'category' !== e.type || !!m(e));
      }
    },
    654: (e, t, n) => {
      'use strict';
      n.d(t, { Rb: () => l, _X: () => s });
      var r = n(7378),
        a = n(5582),
        o = n(644),
        i = n(1763);
      function l(e) {
        !(function (e) {
          const t = (0, a.k6)(),
            n = (0, i.zX)(e);
          (0, r.useEffect)(() => t.block((e, t) => n(e, t)), [t, n]);
        })((t, n) => {
          if ('POP' === n) return e(t, n);
        });
      }
      function s(e) {
        return (function (e) {
          const t = (0, a.k6)();
          return (0, o.useSyncExternalStore)(
            t.listen,
            () => e(t),
            () => e(t)
          );
        })(t => (null === e ? null : new URLSearchParams(t.location.search).get(e)));
      }
    },
    784: (e, t, n) => {
      'use strict';
      function r(e, t) {
        return void 0 === t && (t = (e, t) => e === t), e.filter((n, r) => e.findIndex(e => t(e, n)) !== r);
      }
      function a(e) {
        return Array.from(new Set(e));
      }
      n.d(t, { j: () => a, l: () => r });
    },
    8831: (e, t, n) => {
      'use strict';
      n.d(t, { FG: () => f, d: () => c, VC: () => p });
      var r = n(7378),
        a = n(8944),
        o = n(7092),
        i = n(6881);
      function l() {
        const e = r.useContext(i._);
        if (!e) throw new Error('Unexpected: no Docusaurus route context found');
        return e;
      }
      var s = n(8948),
        u = n(353);
      function c(e) {
        let { title: t, description: n, keywords: a, image: i, children: l } = e;
        const c = (function (e) {
            const { siteConfig: t } = (0, u.Z)(),
              { title: n, titleDelimiter: r } = t;
            return e?.trim().length ? `${e.trim()} ${r} ${n}` : n;
          })(t),
          { withBaseUrl: d } = (0, s.C)(),
          f = i ? d(i, { absolute: !0 }) : void 0;
        return r.createElement(
          o.Z,
          null,
          t && r.createElement('title', null, c),
          t && r.createElement('meta', { property: 'og:title', content: c }),
          n && r.createElement('meta', { name: 'description', content: n }),
          n && r.createElement('meta', { property: 'og:description', content: n }),
          a && r.createElement('meta', { name: 'keywords', content: Array.isArray(a) ? a.join(',') : a }),
          f && r.createElement('meta', { property: 'og:image', content: f }),
          f && r.createElement('meta', { name: 'twitter:image', content: f }),
          l
        );
      }
      const d = r.createContext(void 0);
      function f(e) {
        let { className: t, children: n } = e;
        const i = r.useContext(d),
          l = (0, a.default)(i, t);
        return r.createElement(
          d.Provider,
          { value: l },
          r.createElement(o.Z, null, r.createElement('html', { className: l })),
          n
        );
      }
      function p(e) {
        let { children: t } = e;
        const n = l(),
          o = `plugin-${n.plugin.name.replace(/docusaurus-(?:plugin|theme)-(?:content-)?/gi, '')}`;
        const i = `plugin-id-${n.plugin.id}`;
        return r.createElement(f, { className: (0, a.default)(o, i) }, t);
      }
    },
    1763: (e, t, n) => {
      'use strict';
      n.d(t, { D9: () => i, Qc: () => u, Ql: () => s, i6: () => l, zX: () => o });
      var r = n(7378);
      const a = n(161).Z.canUseDOM ? r.useLayoutEffect : r.useEffect;
      function o(e) {
        const t = (0, r.useRef)(e);
        return (
          a(() => {
            t.current = e;
          }, [e]),
          (0, r.useCallback)(function () {
            return t.current(...arguments);
          }, [])
        );
      }
      function i(e) {
        const t = (0, r.useRef)();
        return (
          a(() => {
            t.current = e;
          }),
          t.current
        );
      }
      class l extends Error {
        constructor(e, t) {
          super(),
            (this.name = 'ReactContextError'),
            (this.message = `Hook ${
              this.stack?.split('\n')[1]?.match(/at (?:\w+\.)?(?<name>\w+)/)?.groups.name ?? ''
            } is called outside the <${e}>. ${t ?? ''}`);
        }
      }
      function s(e) {
        const t = Object.entries(e);
        return t.sort((e, t) => e[0].localeCompare(t[0])), (0, r.useMemo)(() => e, t.flat());
      }
      function u(e) {
        return t => {
          let { children: n } = t;
          return r.createElement(
            r.Fragment,
            null,
            e.reduceRight((e, t) => r.createElement(t, null, e), n)
          );
        };
      }
    },
    8862: (e, t, n) => {
      'use strict';
      n.d(t, { Mg: () => i, Ns: () => l });
      var r = n(7378),
        a = n(6623),
        o = n(353);
      function i(e, t) {
        const n = e => (!e || e.endsWith('/') ? e : `${e}/`)?.toLowerCase();
        return n(e) === n(t);
      }
      function l() {
        const { baseUrl: e } = (0, o.Z)().siteConfig;
        return (0, r.useMemo)(
          () =>
            (function (e) {
              let { baseUrl: t, routes: n } = e;
              function r(e) {
                return e.path === t && !0 === e.exact;
              }
              function a(e) {
                return e.path === t && !e.exact;
              }
              return (function e(t) {
                if (0 === t.length) return;
                return t.find(r) || e(t.filter(a).flatMap(e => e.routes ?? []));
              })(n);
            })({ routes: a.Z, baseUrl: e }),
          [e]
        );
      }
    },
    3457: (e, t, n) => {
      'use strict';
      n.d(t, { Ct: () => p, OC: () => s, RF: () => d, o5: () => f });
      var r = n(7378),
        a = n(161),
        o = n(6457),
        i = n(1763);
      const l = r.createContext(void 0);
      function s(e) {
        let { children: t } = e;
        const n = (function () {
          const e = (0, r.useRef)(!0);
          return (0, r.useMemo)(
            () => ({
              scrollEventsEnabledRef: e,
              enableScrollEvents: () => {
                e.current = !0;
              },
              disableScrollEvents: () => {
                e.current = !1;
              },
            }),
            []
          );
        })();
        return r.createElement(l.Provider, { value: n }, t);
      }
      function u() {
        const e = (0, r.useContext)(l);
        if (null == e) throw new i.i6('ScrollControllerProvider');
        return e;
      }
      const c = () => (a.Z.canUseDOM ? { scrollX: window.pageXOffset, scrollY: window.pageYOffset } : null);
      function d(e, t) {
        void 0 === t && (t = []);
        const { scrollEventsEnabledRef: n } = u(),
          a = (0, r.useRef)(c()),
          o = (0, i.zX)(e);
        (0, r.useEffect)(() => {
          const e = () => {
              if (!n.current) return;
              const e = c();
              o(e, a.current), (a.current = e);
            },
            t = { passive: !0 };
          return e(), window.addEventListener('scroll', e, t), () => window.removeEventListener('scroll', e, t);
        }, [o, n, ...t]);
      }
      function f() {
        const e = u(),
          t = (function () {
            const e = (0, r.useRef)({ elem: null, top: 0 }),
              t = (0, r.useCallback)(t => {
                e.current = { elem: t, top: t.getBoundingClientRect().top };
              }, []),
              n = (0, r.useCallback)(() => {
                const {
                  current: { elem: t, top: n },
                } = e;
                if (!t) return { restored: !1 };
                const r = t.getBoundingClientRect().top - n;
                return (
                  r && window.scrollBy({ left: 0, top: r }), (e.current = { elem: null, top: 0 }), { restored: 0 !== r }
                );
              }, []);
            return (0, r.useMemo)(() => ({ save: t, restore: n }), [n, t]);
          })(),
          n = (0, r.useRef)(void 0),
          a = (0, r.useCallback)(
            r => {
              t.save(r),
                e.disableScrollEvents(),
                (n.current = () => {
                  const { restored: r } = t.restore();
                  if (((n.current = void 0), r)) {
                    const t = () => {
                      e.enableScrollEvents(), window.removeEventListener('scroll', t);
                    };
                    window.addEventListener('scroll', t);
                  } else e.enableScrollEvents();
                });
            },
            [e, t]
          );
        return (
          (0, r.useLayoutEffect)(() => {
            queueMicrotask(() => n.current?.());
          }),
          { blockElementScrollPositionUntilNextRender: a }
        );
      }
      function p() {
        const e = (0, r.useRef)(null),
          t = (0, o.Z)() && 'smooth' === getComputedStyle(document.documentElement).scrollBehavior;
        return {
          startScroll: n => {
            e.current = t
              ? (function (e) {
                  return window.scrollTo({ top: e, behavior: 'smooth' }), () => {};
                })(n)
              : (function (e) {
                  let t = null;
                  const n = document.documentElement.scrollTop > e;
                  return (
                    (function r() {
                      const a = document.documentElement.scrollTop;
                      ((n && a > e) || (!n && a < e)) &&
                        ((t = requestAnimationFrame(r)), window.scrollTo(0, Math.floor(0.85 * (a - e)) + e));
                    })(),
                    () => t && cancelAnimationFrame(t)
                  );
                })(n);
          },
          cancelScroll: () => e.current?.(),
        };
      }
    },
    3149: (e, t, n) => {
      'use strict';
      n.d(t, { HX: () => r, os: () => a });
      n(353);
      const r = 'default';
      function a(e, t) {
        return `docs-${e}-${t}`;
      }
    },
    1819: (e, t, n) => {
      'use strict';
      n.d(t, { Nk: () => d, WA: () => c });
      var r = n(7378),
        a = n(644);
      const o = 'localStorage';
      function i(e) {
        let { key: t, oldValue: n, newValue: r, storage: a } = e;
        if (n === r) return;
        const o = document.createEvent('StorageEvent');
        o.initStorageEvent('storage', !1, !1, t, n, r, window.location.href, a), window.dispatchEvent(o);
      }
      function l(e) {
        if ((void 0 === e && (e = o), 'undefined' == typeof window))
          throw new Error('Browser storage is not available on Node.js/Docusaurus SSR process.');
        if ('none' === e) return null;
        try {
          return window[e];
        } catch (n) {
          return (
            (t = n),
            s ||
              (console.warn(
                'Docusaurus browser storage is not available.\nPossible reasons: running Docusaurus in an iframe, in an incognito browser session, or using too strict browser privacy settings.',
                t
              ),
              (s = !0)),
            null
          );
        }
        var t;
      }
      let s = !1;
      const u = { get: () => null, set: () => {}, del: () => {}, listen: () => () => {} };
      function c(e, t) {
        if ('undefined' == typeof window)
          return (function (e) {
            function t() {
              throw new Error(
                `Illegal storage API usage for storage key "${e}".\nDocusaurus storage APIs are not supposed to be called on the server-rendering process.\nPlease only call storage APIs in effects and event handlers.`
              );
            }
            return { get: t, set: t, del: t, listen: t };
          })(e);
        const n = l(t?.persistence);
        return null === n
          ? u
          : {
              get: () => {
                try {
                  return n.getItem(e);
                } catch (t) {
                  return console.error(`Docusaurus storage error, can't get key=${e}`, t), null;
                }
              },
              set: t => {
                try {
                  const r = n.getItem(e);
                  n.setItem(e, t), i({ key: e, oldValue: r, newValue: t, storage: n });
                } catch (r) {
                  console.error(`Docusaurus storage error, can't set ${e}=${t}`, r);
                }
              },
              del: () => {
                try {
                  const t = n.getItem(e);
                  n.removeItem(e), i({ key: e, oldValue: t, newValue: null, storage: n });
                } catch (t) {
                  console.error(`Docusaurus storage error, can't delete key=${e}`, t);
                }
              },
              listen: t => {
                try {
                  const r = r => {
                    r.storageArea === n && r.key === e && t(r);
                  };
                  return window.addEventListener('storage', r), () => window.removeEventListener('storage', r);
                } catch (r) {
                  return console.error(`Docusaurus storage error, can't listen for changes of key=${e}`, r), () => {};
                }
              },
            };
      }
      function d(e, t) {
        const n = (0, r.useRef)(() => (null === e ? u : c(e, t))).current(),
          o = (0, r.useCallback)(e => ('undefined' == typeof window ? () => {} : n.listen(e)), [n]);
        return [
          (0, a.useSyncExternalStore)(
            o,
            () => ('undefined' == typeof window ? null : n.get()),
            () => null
          ),
          n,
        ];
      }
    },
    3714: (e, t, n) => {
      'use strict';
      n.d(t, { l: () => o });
      var r = n(353),
        a = n(5582);
      function o() {
        const {
            siteConfig: { baseUrl: e, url: t },
            i18n: { defaultLocale: n, currentLocale: o },
          } = (0, r.Z)(),
          { pathname: i } = (0, a.TH)(),
          l = o === n ? e : e.replace(`/${o}/`, '/'),
          s = i.replace(e, '');
        return {
          createUrl: function (e) {
            let { locale: r, fullyQualified: a } = e;
            return `${a ? t : ''}${(function (e) {
              return e === n ? `${l}` : `${l}${e}/`;
            })(r)}${s}`;
          },
        };
      }
    },
    4993: (e, t, n) => {
      'use strict';
      n.d(t, { S: () => i });
      var r = n(7378),
        a = n(5582),
        o = n(1763);
      function i(e) {
        const t = (0, a.TH)(),
          n = (0, o.D9)(t),
          i = (0, o.zX)(e);
        (0, r.useEffect)(() => {
          n && t !== n && i({ location: t, previousLocation: n });
        }, [i, t, n]);
      }
    },
    624: (e, t, n) => {
      'use strict';
      n.d(t, { L: () => a });
      var r = n(353);
      function a() {
        return (0, r.Z)().siteConfig.themeConfig;
      }
    },
    2520: (e, t) => {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = function (e, t) {
          const { trailingSlash: n, baseUrl: r } = t;
          if (e.startsWith('#')) return e;
          if (void 0 === n) return e;
          const [a] = e.split(/[#?]/),
            o =
              '/' === a || a === r
                ? a
                : ((i = a),
                  n
                    ? (function (e) {
                        return e.endsWith('/') ? e : `${e}/`;
                      })(i)
                    : (function (e) {
                        return e.endsWith('/') ? e.slice(0, -1) : e;
                      })(i));
          var i;
          return e.replace(a, o);
        });
    },
    6102: (e, t) => {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.getErrorCausalChain = void 0),
        (t.getErrorCausalChain = function e(t) {
          return t.cause ? [t, ...e(t.cause)] : [t];
        });
    },
    1721: function (e, t, n) {
      'use strict';
      var r =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.getErrorCausalChain = t.applyTrailingSlash = t.blogPostContainerID = void 0),
        (t.blogPostContainerID = 'post-content');
      var a = n(2520);
      Object.defineProperty(t, 'applyTrailingSlash', {
        enumerable: !0,
        get: function () {
          return r(a).default;
        },
      });
      var o = n(6102);
      Object.defineProperty(t, 'getErrorCausalChain', {
        enumerable: !0,
        get: function () {
          return o.getErrorCausalChain;
        },
      });
    },
    6623: (e, t, n) => {
      'use strict';
      n.d(t, { Z: () => p });
      var r = n(7378),
        a = n(5773),
        o = n(1237),
        i = n.n(o),
        l = n(6887);
      const s = {
        '119fc729': [
          () => Promise.all([n.e(532), n.e(592), n.e(224), n.e(338)]).then(n.bind(n, 2822)),
          '@site/docs/components/page-elements/SwitchStaff.mdx',
          2822,
        ],
        '14eb3368': [
          () => Promise.all([n.e(532), n.e(592), n.e(817)]).then(n.bind(n, 777)),
          '@theme/DocCategoryGeneratedIndexPage',
          777,
        ],
        17896441: [() => Promise.all([n.e(532), n.e(592), n.e(918)]).then(n.bind(n, 3327)), '@theme/DocItem', 3327],
        '181152ac': [
          () => n.e(742).then(n.t.bind(n, 5745, 19)),
          '/Users/hewenjie/Documents/project/positive-map/website/.docusaurus/docusaurus-plugin-content-pages/default/plugin-route-context-module-100.json',
          5745,
        ],
        '1be78505': [() => Promise.all([n.e(532), n.e(514)]).then(n.bind(n, 5553)), '@theme/DocPage', 5553],
        '1df93b7f': [() => Promise.all([n.e(532), n.e(237)]).then(n.bind(n, 3513)), '@site/src/pages/index.tsx', 3513],
        '1f391b9e': [() => Promise.all([n.e(532), n.e(592), n.e(85)]).then(n.bind(n, 5432)), '@theme/MDXPage', 5432],
        '393be207': [
          () => Promise.all([n.e(592), n.e(414)]).then(n.bind(n, 7239)),
          '@site/src/pages/markdown-page.md',
          7239,
        ],
        '39c24051': [
          () => Promise.all([n.e(532), n.e(592), n.e(224), n.e(907), n.e(569)]).then(n.bind(n, 649)),
          '@site/docs/components/page-elements/NumericKeyboard.mdx',
          649,
        ],
        '3d95e484': [
          () => n.e(944).then(n.t.bind(n, 2434, 19)),
          '~docs/default/category-positive-mapcomponents-componentssidebar-category-\u9875\u9762\u5143\u7d20-2cf.json',
          2434,
        ],
        '5e9f5e1a': [() => Promise.resolve().then(n.bind(n, 6809)), '@generated/docusaurus.config', 6809],
        '935f2afb': [
          () => n.e(53).then(n.t.bind(n, 1109, 19)),
          '~docs/default/version-current-metadata-prop-751.json',
          1109,
        ],
        '9f8d80ef': [
          () => Promise.all([n.e(532), n.e(592), n.e(224), n.e(490)]).then(n.bind(n, 2071)),
          '@site/docs/components/page-elements/AddressCascader.mdx',
          2071,
        ],
        a8591d8d: [
          () => Promise.all([n.e(592), n.e(567)]).then(n.bind(n, 3460)),
          '@site/docs/components/intro.md',
          3460,
        ],
        ba8dffb3: [
          () => n.e(92).then(n.t.bind(n, 3769, 19)),
          '/Users/hewenjie/Documents/project/positive-map/website/.docusaurus/docusaurus-plugin-content-docs/default/plugin-route-context-module-100.json',
          3769,
        ],
      };
      function u(e) {
        let { error: t, retry: n, pastDelay: a } = e;
        return t
          ? r.createElement(
              'div',
              {
                style: {
                  textAlign: 'center',
                  color: '#fff',
                  backgroundColor: '#fa383e',
                  borderColor: '#fa383e',
                  borderStyle: 'solid',
                  borderRadius: '0.25rem',
                  borderWidth: '1px',
                  boxSizing: 'border-box',
                  display: 'block',
                  padding: '1rem',
                  flex: '0 0 50%',
                  marginLeft: '25%',
                  marginRight: '25%',
                  marginTop: '5rem',
                  maxWidth: '50%',
                  width: '100%',
                },
              },
              r.createElement('p', null, String(t)),
              r.createElement('div', null, r.createElement('button', { type: 'button', onClick: n }, 'Retry'))
            )
          : a
          ? r.createElement(
              'div',
              { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' } },
              r.createElement(
                'svg',
                {
                  id: 'loader',
                  style: { width: 128, height: 110, position: 'absolute', top: 'calc(100vh - 64%)' },
                  viewBox: '0 0 45 45',
                  xmlns: 'http://www.w3.org/2000/svg',
                  stroke: '#61dafb',
                },
                r.createElement(
                  'g',
                  { fill: 'none', fillRule: 'evenodd', transform: 'translate(1 1)', strokeWidth: '2' },
                  r.createElement(
                    'circle',
                    { cx: '22', cy: '22', r: '6', strokeOpacity: '0' },
                    r.createElement('animate', {
                      attributeName: 'r',
                      begin: '1.5s',
                      dur: '3s',
                      values: '6;22',
                      calcMode: 'linear',
                      repeatCount: 'indefinite',
                    }),
                    r.createElement('animate', {
                      attributeName: 'stroke-opacity',
                      begin: '1.5s',
                      dur: '3s',
                      values: '1;0',
                      calcMode: 'linear',
                      repeatCount: 'indefinite',
                    }),
                    r.createElement('animate', {
                      attributeName: 'stroke-width',
                      begin: '1.5s',
                      dur: '3s',
                      values: '2;0',
                      calcMode: 'linear',
                      repeatCount: 'indefinite',
                    })
                  ),
                  r.createElement(
                    'circle',
                    { cx: '22', cy: '22', r: '6', strokeOpacity: '0' },
                    r.createElement('animate', {
                      attributeName: 'r',
                      begin: '3s',
                      dur: '3s',
                      values: '6;22',
                      calcMode: 'linear',
                      repeatCount: 'indefinite',
                    }),
                    r.createElement('animate', {
                      attributeName: 'stroke-opacity',
                      begin: '3s',
                      dur: '3s',
                      values: '1;0',
                      calcMode: 'linear',
                      repeatCount: 'indefinite',
                    }),
                    r.createElement('animate', {
                      attributeName: 'stroke-width',
                      begin: '3s',
                      dur: '3s',
                      values: '2;0',
                      calcMode: 'linear',
                      repeatCount: 'indefinite',
                    })
                  ),
                  r.createElement(
                    'circle',
                    { cx: '22', cy: '22', r: '8' },
                    r.createElement('animate', {
                      attributeName: 'r',
                      begin: '0s',
                      dur: '1.5s',
                      values: '6;1;2;3;4;5;6',
                      calcMode: 'linear',
                      repeatCount: 'indefinite',
                    })
                  )
                )
              )
            )
          : null;
      }
      var c = n(3361),
        d = n(6881);
      function f(e, t) {
        if ('*' === e)
          return i()({
            loading: u,
            loader: () => n.e(893).then(n.bind(n, 3893)),
            modules: ['@theme/NotFound'],
            webpack: () => [3893],
            render(e, t) {
              const n = e.default;
              return r.createElement(
                d.z,
                { value: { plugin: { name: 'native', id: 'default' } } },
                r.createElement(n, t)
              );
            },
          });
        const o = l[`${e}-${t}`],
          f = {},
          p = [],
          m = [],
          g = (0, c.Z)(o);
        return (
          Object.entries(g).forEach(e => {
            let [t, n] = e;
            const r = s[n];
            r && ((f[t] = r[0]), p.push(r[1]), m.push(r[2]));
          }),
          i().Map({
            loading: u,
            loader: f,
            modules: p,
            webpack: () => m,
            render(t, n) {
              const i = JSON.parse(JSON.stringify(o));
              Object.entries(t).forEach(t => {
                let [n, r] = t;
                const a = r.default;
                if (!a)
                  throw new Error(
                    `The page component at ${e} doesn't have a default export. This makes it impossible to render anything. Consider default-exporting a React component.`
                  );
                ('object' != typeof a && 'function' != typeof a) ||
                  Object.keys(r)
                    .filter(e => 'default' !== e)
                    .forEach(e => {
                      a[e] = r[e];
                    });
                let o = i;
                const l = n.split('.');
                l.slice(0, -1).forEach(e => {
                  o = o[e];
                }),
                  (o[l[l.length - 1]] = a);
              });
              const l = i.__comp;
              delete i.__comp;
              const s = i.__context;
              return delete i.__context, r.createElement(d.z, { value: s }, r.createElement(l, (0, a.Z)({}, i, n)));
            },
          })
        );
      }
      const p = [
        { path: '/positive-map/markdown-page/', component: f('/positive-map/markdown-page/', '072'), exact: !0 },
        {
          path: '/positive-map/components/',
          component: f('/positive-map/components/', 'a6e'),
          routes: [
            {
              path: '/positive-map/components/category/\u9875\u9762\u5143\u7d20/',
              component: f('/positive-map/components/category/\u9875\u9762\u5143\u7d20/', 'aa2'),
              exact: !0,
              sidebar: 'componentsSidebar',
            },
            {
              path: '/positive-map/components/intro/',
              component: f('/positive-map/components/intro/', 'e79'),
              exact: !0,
              sidebar: 'componentsSidebar',
            },
            {
              path: '/positive-map/components/page-elements/AddressCascader/',
              component: f('/positive-map/components/page-elements/AddressCascader/', '958'),
              exact: !0,
              sidebar: 'componentsSidebar',
            },
            {
              path: '/positive-map/components/page-elements/NumericKeyboard/',
              component: f('/positive-map/components/page-elements/NumericKeyboard/', '31f'),
              exact: !0,
              sidebar: 'componentsSidebar',
            },
            {
              path: '/positive-map/components/page-elements/SwitchStaff/',
              component: f('/positive-map/components/page-elements/SwitchStaff/', '1d6'),
              exact: !0,
              sidebar: 'componentsSidebar',
            },
          ],
        },
        { path: '/positive-map/', component: f('/positive-map/', 'faf'), exact: !0 },
        { path: '*', component: f('*') },
      ];
    },
    8944: (e, t, n) => {
      'use strict';
      function r(e) {
        var t,
          n,
          a = '';
        if ('string' == typeof e || 'number' == typeof e) a += e;
        else if ('object' == typeof e)
          if (Array.isArray(e)) for (t = 0; t < e.length; t++) e[t] && (n = r(e[t])) && (a && (a += ' '), (a += n));
          else for (t in e) e[t] && (a && (a += ' '), (a += t));
        return a;
      }
      function a() {
        for (var e, t, n = 0, a = ''; n < arguments.length; )
          (e = arguments[n++]) && (t = r(e)) && (a && (a += ' '), (a += t));
        return a;
      }
      n.r(t), n.d(t, { clsx: () => a, default: () => o });
      const o = a;
    },
    5036: (e, t, n) => {
      'use strict';
      n.d(t, { lX: () => w, q_: () => T, ob: () => p, PP: () => L, Ep: () => f });
      var r = n(5773);
      function a(e) {
        return '/' === e.charAt(0);
      }
      function o(e, t) {
        for (var n = t, r = n + 1, a = e.length; r < a; n += 1, r += 1) e[n] = e[r];
        e.pop();
      }
      const i = function (e, t) {
        void 0 === t && (t = '');
        var n,
          r = (e && e.split('/')) || [],
          i = (t && t.split('/')) || [],
          l = e && a(e),
          s = t && a(t),
          u = l || s;
        if ((e && a(e) ? (i = r) : r.length && (i.pop(), (i = i.concat(r))), !i.length)) return '/';
        if (i.length) {
          var c = i[i.length - 1];
          n = '.' === c || '..' === c || '' === c;
        } else n = !1;
        for (var d = 0, f = i.length; f >= 0; f--) {
          var p = i[f];
          '.' === p ? o(i, f) : '..' === p ? (o(i, f), d++) : d && (o(i, f), d--);
        }
        if (!u) for (; d--; d) i.unshift('..');
        !u || '' === i[0] || (i[0] && a(i[0])) || i.unshift('');
        var m = i.join('/');
        return n && '/' !== m.substr(-1) && (m += '/'), m;
      };
      var l = n(2215);
      function s(e) {
        return '/' === e.charAt(0) ? e : '/' + e;
      }
      function u(e) {
        return '/' === e.charAt(0) ? e.substr(1) : e;
      }
      function c(e, t) {
        return (function (e, t) {
          return 0 === e.toLowerCase().indexOf(t.toLowerCase()) && -1 !== '/?#'.indexOf(e.charAt(t.length));
        })(e, t)
          ? e.substr(t.length)
          : e;
      }
      function d(e) {
        return '/' === e.charAt(e.length - 1) ? e.slice(0, -1) : e;
      }
      function f(e) {
        var t = e.pathname,
          n = e.search,
          r = e.hash,
          a = t || '/';
        return (
          n && '?' !== n && (a += '?' === n.charAt(0) ? n : '?' + n),
          r && '#' !== r && (a += '#' === r.charAt(0) ? r : '#' + r),
          a
        );
      }
      function p(e, t, n, a) {
        var o;
        'string' == typeof e
          ? ((o = (function (e) {
              var t = e || '/',
                n = '',
                r = '',
                a = t.indexOf('#');
              -1 !== a && ((r = t.substr(a)), (t = t.substr(0, a)));
              var o = t.indexOf('?');
              return (
                -1 !== o && ((n = t.substr(o)), (t = t.substr(0, o))),
                { pathname: t, search: '?' === n ? '' : n, hash: '#' === r ? '' : r }
              );
            })(e)),
            (o.state = t))
          : (void 0 === (o = (0, r.Z)({}, e)).pathname && (o.pathname = ''),
            o.search ? '?' !== o.search.charAt(0) && (o.search = '?' + o.search) : (o.search = ''),
            o.hash ? '#' !== o.hash.charAt(0) && (o.hash = '#' + o.hash) : (o.hash = ''),
            void 0 !== t && void 0 === o.state && (o.state = t));
        try {
          o.pathname = decodeURI(o.pathname);
        } catch (l) {
          throw l instanceof URIError
            ? new URIError(
                'Pathname "' +
                  o.pathname +
                  '" could not be decoded. This is likely caused by an invalid percent-encoding.'
              )
            : l;
        }
        return (
          n && (o.key = n),
          a
            ? o.pathname
              ? '/' !== o.pathname.charAt(0) && (o.pathname = i(o.pathname, a.pathname))
              : (o.pathname = a.pathname)
            : o.pathname || (o.pathname = '/'),
          o
        );
      }
      function m() {
        var e = null;
        var t = [];
        return {
          setPrompt: function (t) {
            return (
              (e = t),
              function () {
                e === t && (e = null);
              }
            );
          },
          confirmTransitionTo: function (t, n, r, a) {
            if (null != e) {
              var o = 'function' == typeof e ? e(t, n) : e;
              'string' == typeof o ? ('function' == typeof r ? r(o, a) : a(!0)) : a(!1 !== o);
            } else a(!0);
          },
          appendListener: function (e) {
            var n = !0;
            function r() {
              n && e.apply(void 0, arguments);
            }
            return (
              t.push(r),
              function () {
                (n = !1),
                  (t = t.filter(function (e) {
                    return e !== r;
                  }));
              }
            );
          },
          notifyListeners: function () {
            for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
            t.forEach(function (e) {
              return e.apply(void 0, n);
            });
          },
        };
      }
      var g = !('undefined' == typeof window || !window.document || !window.document.createElement);
      function h(e, t) {
        t(window.confirm(e));
      }
      var v = 'popstate',
        b = 'hashchange';
      function y() {
        try {
          return window.history.state || {};
        } catch (e) {
          return {};
        }
      }
      function w(e) {
        void 0 === e && (e = {}), g || (0, l.Z)(!1);
        var t,
          n = window.history,
          a =
            ((-1 === (t = window.navigator.userAgent).indexOf('Android 2.') && -1 === t.indexOf('Android 4.0')) ||
              -1 === t.indexOf('Mobile Safari') ||
              -1 !== t.indexOf('Chrome') ||
              -1 !== t.indexOf('Windows Phone')) &&
            window.history &&
            'pushState' in window.history,
          o = !(-1 === window.navigator.userAgent.indexOf('Trident')),
          i = e,
          u = i.forceRefresh,
          w = void 0 !== u && u,
          k = i.getUserConfirmation,
          E = void 0 === k ? h : k,
          S = i.keyLength,
          x = void 0 === S ? 6 : S,
          C = e.basename ? d(s(e.basename)) : '';
        function T(e) {
          var t = e || {},
            n = t.key,
            r = t.state,
            a = window.location,
            o = a.pathname + a.search + a.hash;
          return C && (o = c(o, C)), p(o, r, n);
        }
        function _() {
          return Math.random().toString(36).substr(2, x);
        }
        var L = m();
        function A(e) {
          (0, r.Z)(U, e), (U.length = n.length), L.notifyListeners(U.location, U.action);
        }
        function N(e) {
          (function (e) {
            return void 0 === e.state && -1 === navigator.userAgent.indexOf('CriOS');
          })(e) || O(T(e.state));
        }
        function R() {
          O(T(y()));
        }
        var P = !1;
        function O(e) {
          if (P) (P = !1), A();
          else {
            L.confirmTransitionTo(e, 'POP', E, function (t) {
              t
                ? A({ action: 'POP', location: e })
                : (function (e) {
                    var t = U.location,
                      n = I.indexOf(t.key);
                    -1 === n && (n = 0);
                    var r = I.indexOf(e.key);
                    -1 === r && (r = 0);
                    var a = n - r;
                    a && ((P = !0), F(a));
                  })(e);
            });
          }
        }
        var D = T(y()),
          I = [D.key];
        function M(e) {
          return C + f(e);
        }
        function F(e) {
          n.go(e);
        }
        var B = 0;
        function z(e) {
          1 === (B += e) && 1 === e
            ? (window.addEventListener(v, N), o && window.addEventListener(b, R))
            : 0 === B && (window.removeEventListener(v, N), o && window.removeEventListener(b, R));
        }
        var j = !1;
        var U = {
          length: n.length,
          action: 'POP',
          location: D,
          createHref: M,
          push: function (e, t) {
            var r = 'PUSH',
              o = p(e, t, _(), U.location);
            L.confirmTransitionTo(o, r, E, function (e) {
              if (e) {
                var t = M(o),
                  i = o.key,
                  l = o.state;
                if (a)
                  if ((n.pushState({ key: i, state: l }, null, t), w)) window.location.href = t;
                  else {
                    var s = I.indexOf(U.location.key),
                      u = I.slice(0, s + 1);
                    u.push(o.key), (I = u), A({ action: r, location: o });
                  }
                else window.location.href = t;
              }
            });
          },
          replace: function (e, t) {
            var r = 'REPLACE',
              o = p(e, t, _(), U.location);
            L.confirmTransitionTo(o, r, E, function (e) {
              if (e) {
                var t = M(o),
                  i = o.key,
                  l = o.state;
                if (a)
                  if ((n.replaceState({ key: i, state: l }, null, t), w)) window.location.replace(t);
                  else {
                    var s = I.indexOf(U.location.key);
                    -1 !== s && (I[s] = o.key), A({ action: r, location: o });
                  }
                else window.location.replace(t);
              }
            });
          },
          go: F,
          goBack: function () {
            F(-1);
          },
          goForward: function () {
            F(1);
          },
          block: function (e) {
            void 0 === e && (e = !1);
            var t = L.setPrompt(e);
            return (
              j || (z(1), (j = !0)),
              function () {
                return j && ((j = !1), z(-1)), t();
              }
            );
          },
          listen: function (e) {
            var t = L.appendListener(e);
            return (
              z(1),
              function () {
                z(-1), t();
              }
            );
          },
        };
        return U;
      }
      var k = 'hashchange',
        E = {
          hashbang: {
            encodePath: function (e) {
              return '!' === e.charAt(0) ? e : '!/' + u(e);
            },
            decodePath: function (e) {
              return '!' === e.charAt(0) ? e.substr(1) : e;
            },
          },
          noslash: { encodePath: u, decodePath: s },
          slash: { encodePath: s, decodePath: s },
        };
      function S(e) {
        var t = e.indexOf('#');
        return -1 === t ? e : e.slice(0, t);
      }
      function x() {
        var e = window.location.href,
          t = e.indexOf('#');
        return -1 === t ? '' : e.substring(t + 1);
      }
      function C(e) {
        window.location.replace(S(window.location.href) + '#' + e);
      }
      function T(e) {
        void 0 === e && (e = {}), g || (0, l.Z)(!1);
        var t = window.history,
          n = (window.navigator.userAgent.indexOf('Firefox'), e),
          a = n.getUserConfirmation,
          o = void 0 === a ? h : a,
          i = n.hashType,
          u = void 0 === i ? 'slash' : i,
          v = e.basename ? d(s(e.basename)) : '',
          b = E[u],
          y = b.encodePath,
          w = b.decodePath;
        function T() {
          var e = w(x());
          return v && (e = c(e, v)), p(e);
        }
        var _ = m();
        function L(e) {
          (0, r.Z)(j, e), (j.length = t.length), _.notifyListeners(j.location, j.action);
        }
        var A = !1,
          N = null;
        function R() {
          var e,
            t,
            n = x(),
            r = y(n);
          if (n !== r) C(r);
          else {
            var a = T(),
              i = j.location;
            if (!A && ((t = a), (e = i).pathname === t.pathname && e.search === t.search && e.hash === t.hash)) return;
            if (N === f(a)) return;
            (N = null),
              (function (e) {
                if (A) (A = !1), L();
                else {
                  var t = 'POP';
                  _.confirmTransitionTo(e, t, o, function (n) {
                    n
                      ? L({ action: t, location: e })
                      : (function (e) {
                          var t = j.location,
                            n = I.lastIndexOf(f(t));
                          -1 === n && (n = 0);
                          var r = I.lastIndexOf(f(e));
                          -1 === r && (r = 0);
                          var a = n - r;
                          a && ((A = !0), M(a));
                        })(e);
                  });
                }
              })(a);
          }
        }
        var P = x(),
          O = y(P);
        P !== O && C(O);
        var D = T(),
          I = [f(D)];
        function M(e) {
          t.go(e);
        }
        var F = 0;
        function B(e) {
          1 === (F += e) && 1 === e ? window.addEventListener(k, R) : 0 === F && window.removeEventListener(k, R);
        }
        var z = !1;
        var j = {
          length: t.length,
          action: 'POP',
          location: D,
          createHref: function (e) {
            var t = document.querySelector('base'),
              n = '';
            return t && t.getAttribute('href') && (n = S(window.location.href)), n + '#' + y(v + f(e));
          },
          push: function (e, t) {
            var n = 'PUSH',
              r = p(e, void 0, void 0, j.location);
            _.confirmTransitionTo(r, n, o, function (e) {
              if (e) {
                var t = f(r),
                  a = y(v + t);
                if (x() !== a) {
                  (N = t),
                    (function (e) {
                      window.location.hash = e;
                    })(a);
                  var o = I.lastIndexOf(f(j.location)),
                    i = I.slice(0, o + 1);
                  i.push(t), (I = i), L({ action: n, location: r });
                } else L();
              }
            });
          },
          replace: function (e, t) {
            var n = 'REPLACE',
              r = p(e, void 0, void 0, j.location);
            _.confirmTransitionTo(r, n, o, function (e) {
              if (e) {
                var t = f(r),
                  a = y(v + t);
                x() !== a && ((N = t), C(a));
                var o = I.indexOf(f(j.location));
                -1 !== o && (I[o] = t), L({ action: n, location: r });
              }
            });
          },
          go: M,
          goBack: function () {
            M(-1);
          },
          goForward: function () {
            M(1);
          },
          block: function (e) {
            void 0 === e && (e = !1);
            var t = _.setPrompt(e);
            return (
              z || (B(1), (z = !0)),
              function () {
                return z && ((z = !1), B(-1)), t();
              }
            );
          },
          listen: function (e) {
            var t = _.appendListener(e);
            return (
              B(1),
              function () {
                B(-1), t();
              }
            );
          },
        };
        return j;
      }
      function _(e, t, n) {
        return Math.min(Math.max(e, t), n);
      }
      function L(e) {
        void 0 === e && (e = {});
        var t = e,
          n = t.getUserConfirmation,
          a = t.initialEntries,
          o = void 0 === a ? ['/'] : a,
          i = t.initialIndex,
          l = void 0 === i ? 0 : i,
          s = t.keyLength,
          u = void 0 === s ? 6 : s,
          c = m();
        function d(e) {
          (0, r.Z)(w, e), (w.length = w.entries.length), c.notifyListeners(w.location, w.action);
        }
        function g() {
          return Math.random().toString(36).substr(2, u);
        }
        var h = _(l, 0, o.length - 1),
          v = o.map(function (e) {
            return p(e, void 0, 'string' == typeof e ? g() : e.key || g());
          }),
          b = f;
        function y(e) {
          var t = _(w.index + e, 0, w.entries.length - 1),
            r = w.entries[t];
          c.confirmTransitionTo(r, 'POP', n, function (e) {
            e ? d({ action: 'POP', location: r, index: t }) : d();
          });
        }
        var w = {
          length: v.length,
          action: 'POP',
          location: v[h],
          index: h,
          entries: v,
          createHref: b,
          push: function (e, t) {
            var r = 'PUSH',
              a = p(e, t, g(), w.location);
            c.confirmTransitionTo(a, r, n, function (e) {
              if (e) {
                var t = w.index + 1,
                  n = w.entries.slice(0);
                n.length > t ? n.splice(t, n.length - t, a) : n.push(a),
                  d({ action: r, location: a, index: t, entries: n });
              }
            });
          },
          replace: function (e, t) {
            var r = 'REPLACE',
              a = p(e, t, g(), w.location);
            c.confirmTransitionTo(a, r, n, function (e) {
              e && ((w.entries[w.index] = a), d({ action: r, location: a }));
            });
          },
          go: y,
          goBack: function () {
            y(-1);
          },
          goForward: function () {
            y(1);
          },
          canGo: function (e) {
            var t = w.index + e;
            return t >= 0 && t < w.entries.length;
          },
          block: function (e) {
            return void 0 === e && (e = !1), c.setPrompt(e);
          },
          listen: function (e) {
            return c.appendListener(e);
          },
        };
        return w;
      }
    },
    5839: (e, t, n) => {
      'use strict';
      var r = n(7354),
        a = {
          childContextTypes: !0,
          contextType: !0,
          contextTypes: !0,
          defaultProps: !0,
          displayName: !0,
          getDefaultProps: !0,
          getDerivedStateFromError: !0,
          getDerivedStateFromProps: !0,
          mixins: !0,
          propTypes: !0,
          type: !0,
        },
        o = { name: !0, length: !0, prototype: !0, caller: !0, callee: !0, arguments: !0, arity: !0 },
        i = { $$typeof: !0, compare: !0, defaultProps: !0, displayName: !0, propTypes: !0, type: !0 },
        l = {};
      function s(e) {
        return r.isMemo(e) ? i : l[e.$$typeof] || a;
      }
      (l[r.ForwardRef] = { $$typeof: !0, render: !0, defaultProps: !0, displayName: !0, propTypes: !0 }),
        (l[r.Memo] = i);
      var u = Object.defineProperty,
        c = Object.getOwnPropertyNames,
        d = Object.getOwnPropertySymbols,
        f = Object.getOwnPropertyDescriptor,
        p = Object.getPrototypeOf,
        m = Object.prototype;
      e.exports = function e(t, n, r) {
        if ('string' != typeof n) {
          if (m) {
            var a = p(n);
            a && a !== m && e(t, a, r);
          }
          var i = c(n);
          d && (i = i.concat(d(n)));
          for (var l = s(t), g = s(n), h = 0; h < i.length; ++h) {
            var v = i[h];
            if (!(o[v] || (r && r[v]) || (g && g[v]) || (l && l[v]))) {
              var b = f(n, v);
              try {
                u(t, v, b);
              } catch (y) {}
            }
          }
        }
        return t;
      };
    },
    3996: e => {
      'use strict';
      e.exports = function (e, t, n, r, a, o, i, l) {
        if (!e) {
          var s;
          if (void 0 === t)
            s = new Error(
              'Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.'
            );
          else {
            var u = [n, r, a, o, i, l],
              c = 0;
            (s = new Error(
              t.replace(/%s/g, function () {
                return u[c++];
              })
            )).name = 'Invariant Violation';
          }
          throw ((s.framesToPop = 1), s);
        }
      };
    },
    5182: e => {
      e.exports =
        Array.isArray ||
        function (e) {
          return '[object Array]' == Object.prototype.toString.call(e);
        };
    },
    142: (e, t, n) => {
      'use strict';
      n.r(t);
    },
    6222: (e, t, n) => {
      'use strict';
      n.r(t);
    },
    8504: function (e, t, n) {
      var r, a;
      (r = function () {
        var e,
          t,
          n = { version: '0.2.0' },
          r = (n.settings = {
            minimum: 0.08,
            easing: 'ease',
            positionUsing: '',
            speed: 200,
            trickle: !0,
            trickleRate: 0.02,
            trickleSpeed: 800,
            showSpinner: !0,
            barSelector: '[role="bar"]',
            spinnerSelector: '[role="spinner"]',
            parent: 'body',
            template:
              '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
          });
        function a(e, t, n) {
          return e < t ? t : e > n ? n : e;
        }
        function o(e) {
          return 100 * (-1 + e);
        }
        function i(e, t, n) {
          var a;
          return (
            ((a =
              'translate3d' === r.positionUsing
                ? { transform: 'translate3d(' + o(e) + '%,0,0)' }
                : 'translate' === r.positionUsing
                ? { transform: 'translate(' + o(e) + '%,0)' }
                : { 'margin-left': o(e) + '%' }).transition = 'all ' + t + 'ms ' + n),
            a
          );
        }
        (n.configure = function (e) {
          var t, n;
          for (t in e) void 0 !== (n = e[t]) && e.hasOwnProperty(t) && (r[t] = n);
          return this;
        }),
          (n.status = null),
          (n.set = function (e) {
            var t = n.isStarted();
            (e = a(e, r.minimum, 1)), (n.status = 1 === e ? null : e);
            var o = n.render(!t),
              u = o.querySelector(r.barSelector),
              c = r.speed,
              d = r.easing;
            return (
              o.offsetWidth,
              l(function (t) {
                '' === r.positionUsing && (r.positionUsing = n.getPositioningCSS()),
                  s(u, i(e, c, d)),
                  1 === e
                    ? (s(o, { transition: 'none', opacity: 1 }),
                      o.offsetWidth,
                      setTimeout(function () {
                        s(o, { transition: 'all ' + c + 'ms linear', opacity: 0 }),
                          setTimeout(function () {
                            n.remove(), t();
                          }, c);
                      }, c))
                    : setTimeout(t, c);
              }),
              this
            );
          }),
          (n.isStarted = function () {
            return 'number' == typeof n.status;
          }),
          (n.start = function () {
            n.status || n.set(0);
            var e = function () {
              setTimeout(function () {
                n.status && (n.trickle(), e());
              }, r.trickleSpeed);
            };
            return r.trickle && e(), this;
          }),
          (n.done = function (e) {
            return e || n.status ? n.inc(0.3 + 0.5 * Math.random()).set(1) : this;
          }),
          (n.inc = function (e) {
            var t = n.status;
            return t
              ? ('number' != typeof e && (e = (1 - t) * a(Math.random() * t, 0.1, 0.95)),
                (t = a(t + e, 0, 0.994)),
                n.set(t))
              : n.start();
          }),
          (n.trickle = function () {
            return n.inc(Math.random() * r.trickleRate);
          }),
          (e = 0),
          (t = 0),
          (n.promise = function (r) {
            return r && 'resolved' !== r.state()
              ? (0 === t && n.start(),
                e++,
                t++,
                r.always(function () {
                  0 == --t ? ((e = 0), n.done()) : n.set((e - t) / e);
                }),
                this)
              : this;
          }),
          (n.render = function (e) {
            if (n.isRendered()) return document.getElementById('nprogress');
            c(document.documentElement, 'nprogress-busy');
            var t = document.createElement('div');
            (t.id = 'nprogress'), (t.innerHTML = r.template);
            var a,
              i = t.querySelector(r.barSelector),
              l = e ? '-100' : o(n.status || 0),
              u = document.querySelector(r.parent);
            return (
              s(i, { transition: 'all 0 linear', transform: 'translate3d(' + l + '%,0,0)' }),
              r.showSpinner || ((a = t.querySelector(r.spinnerSelector)) && p(a)),
              u != document.body && c(u, 'nprogress-custom-parent'),
              u.appendChild(t),
              t
            );
          }),
          (n.remove = function () {
            d(document.documentElement, 'nprogress-busy'),
              d(document.querySelector(r.parent), 'nprogress-custom-parent');
            var e = document.getElementById('nprogress');
            e && p(e);
          }),
          (n.isRendered = function () {
            return !!document.getElementById('nprogress');
          }),
          (n.getPositioningCSS = function () {
            var e = document.body.style,
              t =
                'WebkitTransform' in e
                  ? 'Webkit'
                  : 'MozTransform' in e
                  ? 'Moz'
                  : 'msTransform' in e
                  ? 'ms'
                  : 'OTransform' in e
                  ? 'O'
                  : '';
            return t + 'Perspective' in e ? 'translate3d' : t + 'Transform' in e ? 'translate' : 'margin';
          });
        var l = (function () {
            var e = [];
            function t() {
              var n = e.shift();
              n && n(t);
            }
            return function (n) {
              e.push(n), 1 == e.length && t();
            };
          })(),
          s = (function () {
            var e = ['Webkit', 'O', 'Moz', 'ms'],
              t = {};
            function n(e) {
              return e.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function (e, t) {
                return t.toUpperCase();
              });
            }
            function r(t) {
              var n = document.body.style;
              if (t in n) return t;
              for (var r, a = e.length, o = t.charAt(0).toUpperCase() + t.slice(1); a--; )
                if ((r = e[a] + o) in n) return r;
              return t;
            }
            function a(e) {
              return (e = n(e)), t[e] || (t[e] = r(e));
            }
            function o(e, t, n) {
              (t = a(t)), (e.style[t] = n);
            }
            return function (e, t) {
              var n,
                r,
                a = arguments;
              if (2 == a.length) for (n in t) void 0 !== (r = t[n]) && t.hasOwnProperty(n) && o(e, n, r);
              else o(e, a[1], a[2]);
            };
          })();
        function u(e, t) {
          return ('string' == typeof e ? e : f(e)).indexOf(' ' + t + ' ') >= 0;
        }
        function c(e, t) {
          var n = f(e),
            r = n + t;
          u(n, t) || (e.className = r.substring(1));
        }
        function d(e, t) {
          var n,
            r = f(e);
          u(e, t) && ((n = r.replace(' ' + t + ' ', ' ')), (e.className = n.substring(1, n.length - 1)));
        }
        function f(e) {
          return (' ' + (e.className || '') + ' ').replace(/\s+/gi, ' ');
        }
        function p(e) {
          e && e.parentNode && e.parentNode.removeChild(e);
        }
        return n;
      }),
        void 0 === (a = 'function' == typeof r ? r.call(t, n, t, e) : r) || (e.exports = a);
    },
    2349: (e, t, n) => {
      'use strict';
      n.d(t, { Z: () => o });
      var r = (function () {
          var e = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,
            t = 0,
            n = {},
            r = {
              util: {
                encode: function e(t) {
                  return t instanceof a
                    ? new a(t.type, e(t.content), t.alias)
                    : Array.isArray(t)
                    ? t.map(e)
                    : t
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/\u00a0/g, ' ');
                },
                type: function (e) {
                  return Object.prototype.toString.call(e).slice(8, -1);
                },
                objId: function (e) {
                  return e.__id || Object.defineProperty(e, '__id', { value: ++t }), e.__id;
                },
                clone: function e(t, n) {
                  var a, o;
                  switch (((n = n || {}), r.util.type(t))) {
                    case 'Object':
                      if (((o = r.util.objId(t)), n[o])) return n[o];
                      for (var i in ((a = {}), (n[o] = a), t)) t.hasOwnProperty(i) && (a[i] = e(t[i], n));
                      return a;
                    case 'Array':
                      return (
                        (o = r.util.objId(t)),
                        n[o]
                          ? n[o]
                          : ((a = []),
                            (n[o] = a),
                            t.forEach(function (t, r) {
                              a[r] = e(t, n);
                            }),
                            a)
                      );
                    default:
                      return t;
                  }
                },
                getLanguage: function (t) {
                  for (; t; ) {
                    var n = e.exec(t.className);
                    if (n) return n[1].toLowerCase();
                    t = t.parentElement;
                  }
                  return 'none';
                },
                setLanguage: function (t, n) {
                  (t.className = t.className.replace(RegExp(e, 'gi'), '')), t.classList.add('language-' + n);
                },
                isActive: function (e, t, n) {
                  for (var r = 'no-' + t; e; ) {
                    var a = e.classList;
                    if (a.contains(t)) return !0;
                    if (a.contains(r)) return !1;
                    e = e.parentElement;
                  }
                  return !!n;
                },
              },
              languages: {
                plain: n,
                plaintext: n,
                text: n,
                txt: n,
                extend: function (e, t) {
                  var n = r.util.clone(r.languages[e]);
                  for (var a in t) n[a] = t[a];
                  return n;
                },
                insertBefore: function (e, t, n, a) {
                  var o = (a = a || r.languages)[e],
                    i = {};
                  for (var l in o)
                    if (o.hasOwnProperty(l)) {
                      if (l == t) for (var s in n) n.hasOwnProperty(s) && (i[s] = n[s]);
                      n.hasOwnProperty(l) || (i[l] = o[l]);
                    }
                  var u = a[e];
                  return (
                    (a[e] = i),
                    r.languages.DFS(r.languages, function (t, n) {
                      n === u && t != e && (this[t] = i);
                    }),
                    i
                  );
                },
                DFS: function e(t, n, a, o) {
                  o = o || {};
                  var i = r.util.objId;
                  for (var l in t)
                    if (t.hasOwnProperty(l)) {
                      n.call(t, l, t[l], a || l);
                      var s = t[l],
                        u = r.util.type(s);
                      'Object' !== u || o[i(s)]
                        ? 'Array' !== u || o[i(s)] || ((o[i(s)] = !0), e(s, n, l, o))
                        : ((o[i(s)] = !0), e(s, n, null, o));
                    }
                },
              },
              plugins: {},
              highlight: function (e, t, n) {
                var o = { code: e, grammar: t, language: n };
                return (
                  r.hooks.run('before-tokenize', o),
                  (o.tokens = r.tokenize(o.code, o.grammar)),
                  r.hooks.run('after-tokenize', o),
                  a.stringify(r.util.encode(o.tokens), o.language)
                );
              },
              tokenize: function (e, t) {
                var n = t.rest;
                if (n) {
                  for (var r in n) t[r] = n[r];
                  delete t.rest;
                }
                var a = new l();
                return (
                  s(a, a.head, e),
                  i(e, a, t, a.head, 0),
                  (function (e) {
                    var t = [],
                      n = e.head.next;
                    for (; n !== e.tail; ) t.push(n.value), (n = n.next);
                    return t;
                  })(a)
                );
              },
              hooks: {
                all: {},
                add: function (e, t) {
                  var n = r.hooks.all;
                  (n[e] = n[e] || []), n[e].push(t);
                },
                run: function (e, t) {
                  var n = r.hooks.all[e];
                  if (n && n.length) for (var a, o = 0; (a = n[o++]); ) a(t);
                },
              },
              Token: a,
            };
          function a(e, t, n, r) {
            (this.type = e), (this.content = t), (this.alias = n), (this.length = 0 | (r || '').length);
          }
          function o(e, t, n, r) {
            e.lastIndex = t;
            var a = e.exec(n);
            if (a && r && a[1]) {
              var o = a[1].length;
              (a.index += o), (a[0] = a[0].slice(o));
            }
            return a;
          }
          function i(e, t, n, l, c, d) {
            for (var f in n)
              if (n.hasOwnProperty(f) && n[f]) {
                var p = n[f];
                p = Array.isArray(p) ? p : [p];
                for (var m = 0; m < p.length; ++m) {
                  if (d && d.cause == f + ',' + m) return;
                  var g = p[m],
                    h = g.inside,
                    v = !!g.lookbehind,
                    b = !!g.greedy,
                    y = g.alias;
                  if (b && !g.pattern.global) {
                    var w = g.pattern.toString().match(/[imsuy]*$/)[0];
                    g.pattern = RegExp(g.pattern.source, w + 'g');
                  }
                  for (
                    var k = g.pattern || g, E = l.next, S = c;
                    E !== t.tail && !(d && S >= d.reach);
                    S += E.value.length, E = E.next
                  ) {
                    var x = E.value;
                    if (t.length > e.length) return;
                    if (!(x instanceof a)) {
                      var C,
                        T = 1;
                      if (b) {
                        if (!(C = o(k, S, e, v)) || C.index >= e.length) break;
                        var _ = C.index,
                          L = C.index + C[0].length,
                          A = S;
                        for (A += E.value.length; _ >= A; ) A += (E = E.next).value.length;
                        if (((S = A -= E.value.length), E.value instanceof a)) continue;
                        for (var N = E; N !== t.tail && (A < L || 'string' == typeof N.value); N = N.next)
                          T++, (A += N.value.length);
                        T--, (x = e.slice(S, A)), (C.index -= S);
                      } else if (!(C = o(k, 0, x, v))) continue;
                      _ = C.index;
                      var R = C[0],
                        P = x.slice(0, _),
                        O = x.slice(_ + R.length),
                        D = S + x.length;
                      d && D > d.reach && (d.reach = D);
                      var I = E.prev;
                      if (
                        (P && ((I = s(t, I, P)), (S += P.length)),
                        u(t, I, T),
                        (E = s(t, I, new a(f, h ? r.tokenize(R, h) : R, y, R))),
                        O && s(t, E, O),
                        T > 1)
                      ) {
                        var M = { cause: f + ',' + m, reach: D };
                        i(e, t, n, E.prev, S, M), d && M.reach > d.reach && (d.reach = M.reach);
                      }
                    }
                  }
                }
              }
          }
          function l() {
            var e = { value: null, prev: null, next: null },
              t = { value: null, prev: e, next: null };
            (e.next = t), (this.head = e), (this.tail = t), (this.length = 0);
          }
          function s(e, t, n) {
            var r = t.next,
              a = { value: n, prev: t, next: r };
            return (t.next = a), (r.prev = a), e.length++, a;
          }
          function u(e, t, n) {
            for (var r = t.next, a = 0; a < n && r !== e.tail; a++) r = r.next;
            (t.next = r), (r.prev = t), (e.length -= a);
          }
          return (
            (a.stringify = function e(t, n) {
              if ('string' == typeof t) return t;
              if (Array.isArray(t)) {
                var a = '';
                return (
                  t.forEach(function (t) {
                    a += e(t, n);
                  }),
                  a
                );
              }
              var o = {
                  type: t.type,
                  content: e(t.content, n),
                  tag: 'span',
                  classes: ['token', t.type],
                  attributes: {},
                  language: n,
                },
                i = t.alias;
              i && (Array.isArray(i) ? Array.prototype.push.apply(o.classes, i) : o.classes.push(i)),
                r.hooks.run('wrap', o);
              var l = '';
              for (var s in o.attributes) l += ' ' + s + '="' + (o.attributes[s] || '').replace(/"/g, '&quot;') + '"';
              return '<' + o.tag + ' class="' + o.classes.join(' ') + '"' + l + '>' + o.content + '</' + o.tag + '>';
            }),
            r
          );
        })(),
        a = r;
      (r.default = r),
        (a.languages.markup = {
          comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 },
          prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 },
          doctype: {
            pattern:
              /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
            greedy: !0,
            inside: {
              'internal-subset': { pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/, lookbehind: !0, greedy: !0, inside: null },
              string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
              punctuation: /^<!|>$|[[\]]/,
              'doctype-tag': /^DOCTYPE/i,
              name: /[^\s<>'"]+/,
            },
          },
          cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 },
          tag: {
            pattern:
              /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
            greedy: !0,
            inside: {
              tag: { pattern: /^<\/?[^\s>\/]+/, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } },
              'special-attr': [],
              'attr-value': {
                pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                inside: { punctuation: [{ pattern: /^=/, alias: 'attr-equals' }, /"|'/] },
              },
              punctuation: /\/?>/,
              'attr-name': { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } },
            },
          },
          entity: [{ pattern: /&[\da-z]{1,8};/i, alias: 'named-entity' }, /&#x?[\da-f]{1,8};/i],
        }),
        (a.languages.markup.tag.inside['attr-value'].inside.entity = a.languages.markup.entity),
        (a.languages.markup.doctype.inside['internal-subset'].inside = a.languages.markup),
        a.hooks.add('wrap', function (e) {
          'entity' === e.type && (e.attributes.title = e.content.replace(/&amp;/, '&'));
        }),
        Object.defineProperty(a.languages.markup.tag, 'addInlined', {
          value: function (e, t) {
            var n = {};
            (n['language-' + t] = {
              pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
              lookbehind: !0,
              inside: a.languages[t],
            }),
              (n.cdata = /^<!\[CDATA\[|\]\]>$/i);
            var r = { 'included-cdata': { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: n } };
            r['language-' + t] = { pattern: /[\s\S]+/, inside: a.languages[t] };
            var o = {};
            (o[e] = {
              pattern: RegExp(
                /(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(
                  /__/g,
                  function () {
                    return e;
                  }
                ),
                'i'
              ),
              lookbehind: !0,
              greedy: !0,
              inside: r,
            }),
              a.languages.insertBefore('markup', 'cdata', o);
          },
        }),
        Object.defineProperty(a.languages.markup.tag, 'addAttribute', {
          value: function (e, t) {
            a.languages.markup.tag.inside['special-attr'].push({
              pattern: RegExp(
                /(^|["'\s])/.source + '(?:' + e + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
                'i'
              ),
              lookbehind: !0,
              inside: {
                'attr-name': /^[^\s=]+/,
                'attr-value': {
                  pattern: /=[\s\S]+/,
                  inside: {
                    value: {
                      pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                      lookbehind: !0,
                      alias: [t, 'language-' + t],
                      inside: a.languages[t],
                    },
                    punctuation: [{ pattern: /^=/, alias: 'attr-equals' }, /"|'/],
                  },
                },
              },
            });
          },
        }),
        (a.languages.html = a.languages.markup),
        (a.languages.mathml = a.languages.markup),
        (a.languages.svg = a.languages.markup),
        (a.languages.xml = a.languages.extend('markup', {})),
        (a.languages.ssml = a.languages.xml),
        (a.languages.atom = a.languages.xml),
        (a.languages.rss = a.languages.xml),
        (function (e) {
          var t =
              '\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b',
            n = { pattern: /(^(["']?)\w+\2)[ \t]+\S.*/, lookbehind: !0, alias: 'punctuation', inside: null },
            r = {
              bash: n,
              environment: { pattern: RegExp('\\$' + t), alias: 'constant' },
              variable: [
                {
                  pattern: /\$?\(\([\s\S]+?\)\)/,
                  greedy: !0,
                  inside: {
                    variable: [{ pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 }, /^\$\(\(/],
                    number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
                    operator: /--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,
                    punctuation: /\(\(?|\)\)?|,|;/,
                  },
                },
                { pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/, greedy: !0, inside: { variable: /^\$\(|^`|\)$|`$/ } },
                {
                  pattern: /\$\{[^}]+\}/,
                  greedy: !0,
                  inside: {
                    operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
                    punctuation: /[\[\]]/,
                    environment: { pattern: RegExp('(\\{)' + t), lookbehind: !0, alias: 'constant' },
                  },
                },
                /\$(?:\w+|[#?*!@$])/,
              ],
              entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/,
            };
          (e.languages.bash = {
            shebang: { pattern: /^#!\s*\/.*/, alias: 'important' },
            comment: { pattern: /(^|[^"{\\$])#.*/, lookbehind: !0 },
            'function-name': [
              { pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/, lookbehind: !0, alias: 'function' },
              { pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/, alias: 'function' },
            ],
            'for-or-select': { pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/, alias: 'variable', lookbehind: !0 },
            'assign-left': {
              pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
              inside: {
                environment: { pattern: RegExp('(^|[\\s;|&]|[<>]\\()' + t), lookbehind: !0, alias: 'constant' },
              },
              alias: 'variable',
              lookbehind: !0,
            },
            string: [
              { pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/, lookbehind: !0, greedy: !0, inside: r },
              {
                pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
                lookbehind: !0,
                greedy: !0,
                inside: { bash: n },
              },
              {
                pattern: /(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,
                lookbehind: !0,
                greedy: !0,
                inside: r,
              },
              { pattern: /(^|[^$\\])'[^']*'/, lookbehind: !0, greedy: !0 },
              { pattern: /\$'(?:[^'\\]|\\[\s\S])*'/, greedy: !0, inside: { entity: r.entity } },
            ],
            environment: { pattern: RegExp('\\$?' + t), alias: 'constant' },
            variable: r.variable,
            function: {
              pattern:
                /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
              lookbehind: !0,
            },
            keyword: {
              pattern:
                /(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,
              lookbehind: !0,
            },
            builtin: {
              pattern:
                /(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,
              lookbehind: !0,
              alias: 'class-name',
            },
            boolean: { pattern: /(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/, lookbehind: !0 },
            'file-descriptor': { pattern: /\B&\d\b/, alias: 'important' },
            operator: {
              pattern: /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
              inside: { 'file-descriptor': { pattern: /^\d/, alias: 'important' } },
            },
            punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
            number: { pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/, lookbehind: !0 },
          }),
            (n.inside = e.languages.bash);
          for (
            var a = [
                'comment',
                'function-name',
                'for-or-select',
                'assign-left',
                'string',
                'environment',
                'function',
                'keyword',
                'builtin',
                'boolean',
                'file-descriptor',
                'operator',
                'punctuation',
                'number',
              ],
              o = r.variable[1].inside,
              i = 0;
            i < a.length;
            i++
          )
            o[a[i]] = e.languages.bash[a[i]];
          e.languages.shell = e.languages.bash;
        })(a),
        (a.languages.clike = {
          comment: [
            { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0 },
            { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
          ],
          string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
          'class-name': {
            pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
            lookbehind: !0,
            inside: { punctuation: /[.\\]/ },
          },
          keyword:
            /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
          boolean: /\b(?:false|true)\b/,
          function: /\b\w+(?=\()/,
          number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
          operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
          punctuation: /[{}[\];(),.:]/,
        }),
        (a.languages.c = a.languages.extend('clike', {
          comment: { pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
          string: { pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/, greedy: !0 },
          'class-name': {
            pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
            lookbehind: !0,
          },
          keyword:
            /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,
          function: /\b[a-z_]\w*(?=\s*\()/i,
          number:
            /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
          operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
        })),
        a.languages.insertBefore('c', 'string', {
          char: { pattern: /'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/, greedy: !0 },
        }),
        a.languages.insertBefore('c', 'string', {
          macro: {
            pattern: /(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
            lookbehind: !0,
            greedy: !0,
            alias: 'property',
            inside: {
              string: [{ pattern: /^(#\s*include\s*)<[^>]+>/, lookbehind: !0 }, a.languages.c.string],
              char: a.languages.c.char,
              comment: a.languages.c.comment,
              'macro-name': [
                { pattern: /(^#\s*define\s+)\w+\b(?!\()/i, lookbehind: !0 },
                { pattern: /(^#\s*define\s+)\w+\b(?=\()/i, lookbehind: !0, alias: 'function' },
              ],
              directive: { pattern: /^(#\s*)[a-z]+/, lookbehind: !0, alias: 'keyword' },
              'directive-hash': /^#/,
              punctuation: /##|\\(?=[\r\n])/,
              expression: { pattern: /\S[\s\S]*/, inside: a.languages.c },
            },
          },
        }),
        a.languages.insertBefore('c', 'function', {
          constant:
            /\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/,
        }),
        delete a.languages.c.boolean,
        (function (e) {
          var t =
              /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
            n = /\b(?!<keyword>)\w+(?:\s*\.\s*\w+)*\b/.source.replace(/<keyword>/g, function () {
              return t.source;
            });
          (e.languages.cpp = e.languages.extend('c', {
            'class-name': [
              {
                pattern: RegExp(
                  /(\b(?:class|concept|enum|struct|typename)\s+)(?!<keyword>)\w+/.source.replace(
                    /<keyword>/g,
                    function () {
                      return t.source;
                    }
                  )
                ),
                lookbehind: !0,
              },
              /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,
              /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,
              /\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/,
            ],
            keyword: t,
            number: {
              pattern:
                /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,
              greedy: !0,
            },
            operator:
              />>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
            boolean: /\b(?:false|true)\b/,
          })),
            e.languages.insertBefore('cpp', 'string', {
              module: {
                pattern: RegExp(
                  /(\b(?:import|module)\s+)/.source +
                    '(?:' +
                    /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|<[^<>\r\n]*>/.source +
                    '|' +
                    /<mod-name>(?:\s*:\s*<mod-name>)?|:\s*<mod-name>/.source.replace(/<mod-name>/g, function () {
                      return n;
                    }) +
                    ')'
                ),
                lookbehind: !0,
                greedy: !0,
                inside: { string: /^[<"][\s\S]+/, operator: /:/, punctuation: /\./ },
              },
              'raw-string': { pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/, alias: 'string', greedy: !0 },
            }),
            e.languages.insertBefore('cpp', 'keyword', {
              'generic-function': {
                pattern: /\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,
                inside: {
                  function: /^\w+/,
                  generic: { pattern: /<[\s\S]+/, alias: 'class-name', inside: e.languages.cpp },
                },
              },
            }),
            e.languages.insertBefore('cpp', 'operator', { 'double-colon': { pattern: /::/, alias: 'punctuation' } }),
            e.languages.insertBefore('cpp', 'class-name', {
              'base-clause': {
                pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
                lookbehind: !0,
                greedy: !0,
                inside: e.languages.extend('cpp', {}),
              },
            }),
            e.languages.insertBefore(
              'inside',
              'double-colon',
              { 'class-name': /\b[a-z_]\w*\b(?!\s*::)/i },
              e.languages.cpp['base-clause']
            );
        })(a),
        (function (e) {
          var t = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
          (e.languages.css = {
            comment: /\/\*[\s\S]*?\*\//,
            atrule: {
              pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
              inside: {
                rule: /^@[\w-]+/,
                'selector-function-argument': {
                  pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                  lookbehind: !0,
                  alias: 'selector',
                },
                keyword: { pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/, lookbehind: !0 },
              },
            },
            url: {
              pattern: RegExp('\\burl\\((?:' + t.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
              greedy: !0,
              inside: {
                function: /^url/i,
                punctuation: /^\(|\)$/,
                string: { pattern: RegExp('^' + t.source + '$'), alias: 'url' },
              },
            },
            selector: {
              pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + t.source + ')*(?=\\s*\\{)'),
              lookbehind: !0,
            },
            string: { pattern: t, greedy: !0 },
            property: {
              pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
              lookbehind: !0,
            },
            important: /!important\b/i,
            function: { pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i, lookbehind: !0 },
            punctuation: /[(){};:,]/,
          }),
            (e.languages.css.atrule.inside.rest = e.languages.css);
          var n = e.languages.markup;
          n && (n.tag.addInlined('style', 'css'), n.tag.addAttribute('style', 'css'));
        })(a),
        (function (e) {
          var t,
            n = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
          (e.languages.css.selector = {
            pattern: e.languages.css.selector.pattern,
            lookbehind: !0,
            inside: (t = {
              'pseudo-element': /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
              'pseudo-class': /:[-\w]+/,
              class: /\.[-\w]+/,
              id: /#[-\w]+/,
              attribute: {
                pattern: RegExp('\\[(?:[^[\\]"\']|' + n.source + ')*\\]'),
                greedy: !0,
                inside: {
                  punctuation: /^\[|\]$/,
                  'case-sensitivity': { pattern: /(\s)[si]$/i, lookbehind: !0, alias: 'keyword' },
                  namespace: {
                    pattern: /^(\s*)(?:(?!\s)[-*\w\xA0-\uFFFF])*\|(?!=)/,
                    lookbehind: !0,
                    inside: { punctuation: /\|$/ },
                  },
                  'attr-name': { pattern: /^(\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+/, lookbehind: !0 },
                  'attr-value': [n, { pattern: /(=\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+(?=\s*$)/, lookbehind: !0 }],
                  operator: /[|~*^$]?=/,
                },
              },
              'n-th': [
                {
                  pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
                  lookbehind: !0,
                  inside: { number: /[\dn]+/, operator: /[+-]/ },
                },
                { pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i, lookbehind: !0 },
              ],
              combinator: />|\+|~|\|\|/,
              punctuation: /[(),]/,
            }),
          }),
            (e.languages.css.atrule.inside['selector-function-argument'].inside = t),
            e.languages.insertBefore('css', 'property', {
              variable: {
                pattern: /(^|[^-\w\xA0-\uFFFF])--(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*/i,
                lookbehind: !0,
              },
            });
          var r = { pattern: /(\b\d+)(?:%|[a-z]+(?![\w-]))/, lookbehind: !0 },
            a = { pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/, lookbehind: !0 };
          e.languages.insertBefore('css', 'function', {
            operator: { pattern: /(\s)[+\-*\/](?=\s)/, lookbehind: !0 },
            hexcode: { pattern: /\B#[\da-f]{3,8}\b/i, alias: 'color' },
            color: [
              {
                pattern:
                  /(^|[^\w-])(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)(?![\w-])/i,
                lookbehind: !0,
              },
              {
                pattern:
                  /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
                inside: { unit: r, number: a, function: /[\w-]+(?=\()/, punctuation: /[(),]/ },
              },
            ],
            entity: /\\[\da-f]{1,8}/i,
            unit: r,
            number: a,
          });
        })(a),
        (a.languages.javascript = a.languages.extend('clike', {
          'class-name': [
            a.languages.clike['class-name'],
            {
              pattern:
                /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
              lookbehind: !0,
            },
          ],
          keyword: [
            { pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 },
            {
              pattern:
                /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
              lookbehind: !0,
            },
          ],
          function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
          number: {
            pattern: RegExp(
              /(^|[^\w$])/.source +
                '(?:' +
                /NaN|Infinity/.source +
                '|' +
                /0[bB][01]+(?:_[01]+)*n?/.source +
                '|' +
                /0[oO][0-7]+(?:_[0-7]+)*n?/.source +
                '|' +
                /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source +
                '|' +
                /\d+(?:_\d+)*n/.source +
                '|' +
                /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source +
                ')' +
                /(?![\w$])/.source
            ),
            lookbehind: !0,
          },
          operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
        })),
        (a.languages.javascript['class-name'][0].pattern =
          /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/),
        a.languages.insertBefore('javascript', 'keyword', {
          regex: {
            pattern:
              /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
            lookbehind: !0,
            greedy: !0,
            inside: {
              'regex-source': {
                pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                lookbehind: !0,
                alias: 'language-regex',
                inside: a.languages.regex,
              },
              'regex-delimiter': /^\/|\/$/,
              'regex-flags': /^[a-z]+$/,
            },
          },
          'function-variable': {
            pattern:
              /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
            alias: 'function',
          },
          parameter: [
            {
              pattern:
                /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
              lookbehind: !0,
              inside: a.languages.javascript,
            },
            {
              pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
              lookbehind: !0,
              inside: a.languages.javascript,
            },
            {
              pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
              lookbehind: !0,
              inside: a.languages.javascript,
            },
            {
              pattern:
                /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
              lookbehind: !0,
              inside: a.languages.javascript,
            },
          ],
          constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
        }),
        a.languages.insertBefore('javascript', 'string', {
          hashbang: { pattern: /^#!.*/, greedy: !0, alias: 'comment' },
          'template-string': {
            pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
            greedy: !0,
            inside: {
              'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
              interpolation: {
                pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
                lookbehind: !0,
                inside: {
                  'interpolation-punctuation': { pattern: /^\$\{|\}$/, alias: 'punctuation' },
                  rest: a.languages.javascript,
                },
              },
              string: /[\s\S]+/,
            },
          },
          'string-property': {
            pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
            lookbehind: !0,
            greedy: !0,
            alias: 'property',
          },
        }),
        a.languages.insertBefore('javascript', 'operator', {
          'literal-property': {
            pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
            lookbehind: !0,
            alias: 'property',
          },
        }),
        a.languages.markup &&
          (a.languages.markup.tag.addInlined('script', 'javascript'),
          a.languages.markup.tag.addAttribute(
            /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/
              .source,
            'javascript'
          )),
        (a.languages.js = a.languages.javascript),
        (function (e) {
          var t = /#(?!\{).+/,
            n = { pattern: /#\{[^}]+\}/, alias: 'variable' };
          (e.languages.coffeescript = e.languages.extend('javascript', {
            comment: t,
            string: [
              { pattern: /'(?:\\[\s\S]|[^\\'])*'/, greedy: !0 },
              { pattern: /"(?:\\[\s\S]|[^\\"])*"/, greedy: !0, inside: { interpolation: n } },
            ],
            keyword:
              /\b(?:and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
            'class-member': { pattern: /@(?!\d)\w+/, alias: 'variable' },
          })),
            e.languages.insertBefore('coffeescript', 'comment', {
              'multiline-comment': { pattern: /###[\s\S]+?###/, alias: 'comment' },
              'block-regex': {
                pattern: /\/{3}[\s\S]*?\/{3}/,
                alias: 'regex',
                inside: { comment: t, interpolation: n },
              },
            }),
            e.languages.insertBefore('coffeescript', 'string', {
              'inline-javascript': {
                pattern: /`(?:\\[\s\S]|[^\\`])*`/,
                inside: {
                  delimiter: { pattern: /^`|`$/, alias: 'punctuation' },
                  script: { pattern: /[\s\S]+/, alias: 'language-javascript', inside: e.languages.javascript },
                },
              },
              'multiline-string': [
                { pattern: /'''[\s\S]*?'''/, greedy: !0, alias: 'string' },
                { pattern: /"""[\s\S]*?"""/, greedy: !0, alias: 'string', inside: { interpolation: n } },
              ],
            }),
            e.languages.insertBefore('coffeescript', 'keyword', { property: /(?!\d)\w+(?=\s*:(?!:))/ }),
            delete e.languages.coffeescript['template-string'],
            (e.languages.coffee = e.languages.coffeescript);
        })(a),
        (function (e) {
          var t = /[*&][^\s[\]{},]+/,
            n = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/,
            r = '(?:' + n.source + '(?:[ \t]+' + t.source + ')?|' + t.source + '(?:[ \t]+' + n.source + ')?)',
            a =
              /(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(
                /<PLAIN>/g,
                function () {
                  return /[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source;
                }
              ),
            o = /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;
          function i(e, t) {
            t = (t || '').replace(/m/g, '') + 'm';
            var n = /([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source
              .replace(/<<prop>>/g, function () {
                return r;
              })
              .replace(/<<value>>/g, function () {
                return e;
              });
            return RegExp(n, t);
          }
          (e.languages.yaml = {
            scalar: {
              pattern: RegExp(
                /([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(
                  /<<prop>>/g,
                  function () {
                    return r;
                  }
                )
              ),
              lookbehind: !0,
              alias: 'string',
            },
            comment: /#.*/,
            key: {
              pattern: RegExp(
                /((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source
                  .replace(/<<prop>>/g, function () {
                    return r;
                  })
                  .replace(/<<key>>/g, function () {
                    return '(?:' + a + '|' + o + ')';
                  })
              ),
              lookbehind: !0,
              greedy: !0,
              alias: 'atrule',
            },
            directive: { pattern: /(^[ \t]*)%.+/m, lookbehind: !0, alias: 'important' },
            datetime: {
              pattern: i(
                /\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/
                  .source
              ),
              lookbehind: !0,
              alias: 'number',
            },
            boolean: { pattern: i(/false|true/.source, 'i'), lookbehind: !0, alias: 'important' },
            null: { pattern: i(/null|~/.source, 'i'), lookbehind: !0, alias: 'important' },
            string: { pattern: i(o), lookbehind: !0, greedy: !0 },
            number: {
              pattern: i(/[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source, 'i'),
              lookbehind: !0,
            },
            tag: n,
            important: t,
            punctuation: /---|[:[\]{}\-,|>?]|\.\.\./,
          }),
            (e.languages.yml = e.languages.yaml);
        })(a),
        (function (e) {
          var t = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;
          function n(e) {
            return (
              (e = e.replace(/<inner>/g, function () {
                return t;
              })),
              RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + '(?:' + e + ')')
            );
          }
          var r = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source,
            a = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(/__/g, function () {
              return r;
            }),
            o = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;
          (e.languages.markdown = e.languages.extend('markup', {})),
            e.languages.insertBefore('markdown', 'prolog', {
              'front-matter-block': {
                pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
                lookbehind: !0,
                greedy: !0,
                inside: {
                  punctuation: /^---|---$/,
                  'front-matter': {
                    pattern: /\S+(?:\s+\S+)*/,
                    alias: ['yaml', 'language-yaml'],
                    inside: e.languages.yaml,
                  },
                },
              },
              blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: 'punctuation' },
              table: {
                pattern: RegExp('^' + a + o + '(?:' + a + ')*', 'm'),
                inside: {
                  'table-data-rows': {
                    pattern: RegExp('^(' + a + o + ')(?:' + a + ')*$'),
                    lookbehind: !0,
                    inside: { 'table-data': { pattern: RegExp(r), inside: e.languages.markdown }, punctuation: /\|/ },
                  },
                  'table-line': {
                    pattern: RegExp('^(' + a + ')' + o + '$'),
                    lookbehind: !0,
                    inside: { punctuation: /\||:?-{3,}:?/ },
                  },
                  'table-header-row': {
                    pattern: RegExp('^' + a + '$'),
                    inside: {
                      'table-header': { pattern: RegExp(r), alias: 'important', inside: e.languages.markdown },
                      punctuation: /\|/,
                    },
                  },
                },
              },
              code: [
                {
                  pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
                  lookbehind: !0,
                  alias: 'keyword',
                },
                {
                  pattern: /^```[\s\S]*?^```$/m,
                  greedy: !0,
                  inside: {
                    'code-block': { pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m, lookbehind: !0 },
                    'code-language': { pattern: /^(```).+/, lookbehind: !0 },
                    punctuation: /```/,
                  },
                },
              ],
              title: [
                {
                  pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
                  alias: 'important',
                  inside: { punctuation: /==+$|--+$/ },
                },
                { pattern: /(^\s*)#.+/m, lookbehind: !0, alias: 'important', inside: { punctuation: /^#+|#+$/ } },
              ],
              hr: { pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m, lookbehind: !0, alias: 'punctuation' },
              list: { pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m, lookbehind: !0, alias: 'punctuation' },
              'url-reference': {
                pattern:
                  /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
                inside: {
                  variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
                  string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
                  punctuation: /^[\[\]!:]|[<>]/,
                },
                alias: 'url',
              },
              bold: {
                pattern: n(
                  /\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/
                    .source
                ),
                lookbehind: !0,
                greedy: !0,
                inside: {
                  content: { pattern: /(^..)[\s\S]+(?=..$)/, lookbehind: !0, inside: {} },
                  punctuation: /\*\*|__/,
                },
              },
              italic: {
                pattern: n(
                  /\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/
                    .source
                ),
                lookbehind: !0,
                greedy: !0,
                inside: { content: { pattern: /(^.)[\s\S]+(?=.$)/, lookbehind: !0, inside: {} }, punctuation: /[*_]/ },
              },
              strike: {
                pattern: n(/(~~?)(?:(?!~)<inner>)+\2/.source),
                lookbehind: !0,
                greedy: !0,
                inside: {
                  content: { pattern: /(^~~?)[\s\S]+(?=\1$)/, lookbehind: !0, inside: {} },
                  punctuation: /~~?/,
                },
              },
              'code-snippet': {
                pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
                lookbehind: !0,
                greedy: !0,
                alias: ['code', 'keyword'],
              },
              url: {
                pattern: n(
                  /!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/
                    .source
                ),
                lookbehind: !0,
                greedy: !0,
                inside: {
                  operator: /^!/,
                  content: { pattern: /(^\[)[^\]]+(?=\])/, lookbehind: !0, inside: {} },
                  variable: { pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/, lookbehind: !0 },
                  url: { pattern: /(^\]\()[^\s)]+/, lookbehind: !0 },
                  string: { pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/, lookbehind: !0 },
                },
              },
            }),
            ['url', 'bold', 'italic', 'strike'].forEach(function (t) {
              ['url', 'bold', 'italic', 'strike', 'code-snippet'].forEach(function (n) {
                t !== n && (e.languages.markdown[t].inside.content.inside[n] = e.languages.markdown[n]);
              });
            }),
            e.hooks.add('after-tokenize', function (e) {
              ('markdown' !== e.language && 'md' !== e.language) ||
                (function e(t) {
                  if (t && 'string' != typeof t)
                    for (var n = 0, r = t.length; n < r; n++) {
                      var a = t[n];
                      if ('code' === a.type) {
                        var o = a.content[1],
                          i = a.content[3];
                        if (
                          o &&
                          i &&
                          'code-language' === o.type &&
                          'code-block' === i.type &&
                          'string' == typeof o.content
                        ) {
                          var l = o.content.replace(/\b#/g, 'sharp').replace(/\b\+\+/g, 'pp'),
                            s = 'language-' + (l = (/[a-z][\w-]*/i.exec(l) || [''])[0].toLowerCase());
                          i.alias
                            ? 'string' == typeof i.alias
                              ? (i.alias = [i.alias, s])
                              : i.alias.push(s)
                            : (i.alias = [s]);
                        }
                      } else e(a.content);
                    }
                })(e.tokens);
            }),
            e.hooks.add('wrap', function (t) {
              if ('code-block' === t.type) {
                for (var n = '', r = 0, a = t.classes.length; r < a; r++) {
                  var o = t.classes[r],
                    u = /language-(.+)/.exec(o);
                  if (u) {
                    n = u[1];
                    break;
                  }
                }
                var c,
                  d = e.languages[n];
                if (d)
                  t.content = e.highlight(
                    ((c = t.content),
                    c.replace(i, '').replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function (e, t) {
                      var n;
                      if ('#' === (t = t.toLowerCase())[0])
                        return (n = 'x' === t[1] ? parseInt(t.slice(2), 16) : Number(t.slice(1))), s(n);
                      var r = l[t];
                      return r || e;
                    })),
                    d,
                    n
                  );
                else if (n && 'none' !== n && e.plugins.autoloader) {
                  var f = 'md-' + new Date().valueOf() + '-' + Math.floor(1e16 * Math.random());
                  (t.attributes.id = f),
                    e.plugins.autoloader.loadLanguages(n, function () {
                      var t = document.getElementById(f);
                      t && (t.innerHTML = e.highlight(t.textContent, e.languages[n], n));
                    });
                }
              }
            });
          var i = RegExp(e.languages.markup.tag.pattern.source, 'gi'),
            l = { amp: '&', lt: '<', gt: '>', quot: '"' },
            s = String.fromCodePoint || String.fromCharCode;
          e.languages.md = e.languages.markdown;
        })(a),
        (a.languages.graphql = {
          comment: /#.*/,
          description: {
            pattern: /(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i,
            greedy: !0,
            alias: 'string',
            inside: {
              'language-markdown': {
                pattern: /(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/,
                lookbehind: !0,
                inside: a.languages.markdown,
              },
            },
          },
          string: { pattern: /"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/, greedy: !0 },
          number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
          boolean: /\b(?:false|true)\b/,
          variable: /\$[a-z_]\w*/i,
          directive: { pattern: /@[a-z_]\w*/i, alias: 'function' },
          'attr-name': { pattern: /\b[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i, greedy: !0 },
          'atom-input': { pattern: /\b[A-Z]\w*Input\b/, alias: 'class-name' },
          scalar: /\b(?:Boolean|Float|ID|Int|String)\b/,
          constant: /\b[A-Z][A-Z_\d]*\b/,
          'class-name': {
            pattern: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*|:\s*|\[)[A-Z_]\w*/,
            lookbehind: !0,
          },
          fragment: { pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/, lookbehind: !0, alias: 'function' },
          'definition-mutation': { pattern: /(\bmutation\s+)[a-zA-Z_]\w*/, lookbehind: !0, alias: 'function' },
          'definition-query': { pattern: /(\bquery\s+)[a-zA-Z_]\w*/, lookbehind: !0, alias: 'function' },
          keyword:
            /\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/,
          operator: /[!=|&]|\.{3}/,
          'property-query': /\w+(?=\s*\()/,
          object: /\w+(?=\s*\{)/,
          punctuation: /[!(){}\[\]:=,]/,
          property: /\w+/,
        }),
        a.hooks.add('after-tokenize', function (e) {
          if ('graphql' === e.language)
            for (
              var t = e.tokens.filter(function (e) {
                  return 'string' != typeof e && 'comment' !== e.type && 'scalar' !== e.type;
                }),
                n = 0;
              n < t.length;

            ) {
              var r = t[n++];
              if ('keyword' === r.type && 'mutation' === r.content) {
                var a = [];
                if (d(['definition-mutation', 'punctuation']) && '(' === c(1).content) {
                  n += 2;
                  var o = f(/^\($/, /^\)$/);
                  if (-1 === o) continue;
                  for (; n < o; n++) {
                    var i = c(0);
                    'variable' === i.type && (p(i, 'variable-input'), a.push(i.content));
                  }
                  n = o + 1;
                }
                if (
                  d(['punctuation', 'property-query']) &&
                  '{' === c(0).content &&
                  (n++, p(c(0), 'property-mutation'), a.length > 0)
                ) {
                  var l = f(/^\{$/, /^\}$/);
                  if (-1 === l) continue;
                  for (var s = n; s < l; s++) {
                    var u = t[s];
                    'variable' === u.type && a.indexOf(u.content) >= 0 && p(u, 'variable-input');
                  }
                }
              }
            }
          function c(e) {
            return t[n + e];
          }
          function d(e, t) {
            t = t || 0;
            for (var n = 0; n < e.length; n++) {
              var r = c(n + t);
              if (!r || r.type !== e[n]) return !1;
            }
            return !0;
          }
          function f(e, r) {
            for (var a = 1, o = n; o < t.length; o++) {
              var i = t[o],
                l = i.content;
              if ('punctuation' === i.type && 'string' == typeof l)
                if (e.test(l)) a++;
                else if (r.test(l) && 0 === --a) return o;
            }
            return -1;
          }
          function p(e, t) {
            var n = e.alias;
            n ? Array.isArray(n) || (e.alias = n = [n]) : (e.alias = n = []), n.push(t);
          }
        }),
        (a.languages.sql = {
          comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/, lookbehind: !0 },
          variable: [{ pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/, greedy: !0 }, /@[\w.$]+/],
          string: { pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/, greedy: !0, lookbehind: !0 },
          identifier: {
            pattern: /(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/,
            greedy: !0,
            lookbehind: !0,
            inside: { punctuation: /^`|`$/ },
          },
          function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
          keyword:
            /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
          boolean: /\b(?:FALSE|NULL|TRUE)\b/i,
          number: /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
          operator:
            /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
          punctuation: /[;[\]()`,.]/,
        }),
        (function (e) {
          var t = e.languages.javascript['template-string'],
            n = t.pattern.source,
            r = t.inside.interpolation,
            a = r.inside['interpolation-punctuation'],
            o = r.pattern.source;
          function i(t, r) {
            if (e.languages[t])
              return {
                pattern: RegExp('((?:' + r + ')\\s*)' + n),
                lookbehind: !0,
                greedy: !0,
                inside: {
                  'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
                  'embedded-code': { pattern: /[\s\S]+/, alias: t },
                },
              };
          }
          function l(e, t) {
            return '___' + t.toUpperCase() + '_' + e + '___';
          }
          function s(t, n, r) {
            var a = { code: t, grammar: n, language: r };
            return (
              e.hooks.run('before-tokenize', a),
              (a.tokens = e.tokenize(a.code, a.grammar)),
              e.hooks.run('after-tokenize', a),
              a.tokens
            );
          }
          function u(t) {
            var n = {};
            n['interpolation-punctuation'] = a;
            var o = e.tokenize(t, n);
            if (3 === o.length) {
              var i = [1, 1];
              i.push.apply(i, s(o[1], e.languages.javascript, 'javascript')), o.splice.apply(o, i);
            }
            return new e.Token('interpolation', o, r.alias, t);
          }
          function c(t, n, r) {
            var a = e.tokenize(t, { interpolation: { pattern: RegExp(o), lookbehind: !0 } }),
              i = 0,
              c = {},
              d = s(
                a
                  .map(function (e) {
                    if ('string' == typeof e) return e;
                    for (var n, a = e.content; -1 !== t.indexOf((n = l(i++, r))); );
                    return (c[n] = a), n;
                  })
                  .join(''),
                n,
                r
              ),
              f = Object.keys(c);
            return (
              (i = 0),
              (function e(t) {
                for (var n = 0; n < t.length; n++) {
                  if (i >= f.length) return;
                  var r = t[n];
                  if ('string' == typeof r || 'string' == typeof r.content) {
                    var a = f[i],
                      o = 'string' == typeof r ? r : r.content,
                      l = o.indexOf(a);
                    if (-1 !== l) {
                      ++i;
                      var s = o.substring(0, l),
                        d = u(c[a]),
                        p = o.substring(l + a.length),
                        m = [];
                      if ((s && m.push(s), m.push(d), p)) {
                        var g = [p];
                        e(g), m.push.apply(m, g);
                      }
                      'string' == typeof r
                        ? (t.splice.apply(t, [n, 1].concat(m)), (n += m.length - 1))
                        : (r.content = m);
                    }
                  } else {
                    var h = r.content;
                    Array.isArray(h) ? e(h) : e([h]);
                  }
                }
              })(d),
              new e.Token(r, d, 'language-' + r, t)
            );
          }
          e.languages.javascript['template-string'] = [
            i(
              'css',
              /\b(?:styled(?:\([^)]*\))?(?:\s*\.\s*\w+(?:\([^)]*\))*)*|css(?:\s*\.\s*(?:global|resolve))?|createGlobalStyle|keyframes)/
                .source
            ),
            i('html', /\bhtml|\.\s*(?:inner|outer)HTML\s*\+?=/.source),
            i('svg', /\bsvg/.source),
            i('markdown', /\b(?:markdown|md)/.source),
            i('graphql', /\b(?:gql|graphql(?:\s*\.\s*experimental)?)/.source),
            i('sql', /\bsql/.source),
            t,
          ].filter(Boolean);
          var d = { javascript: !0, js: !0, typescript: !0, ts: !0, jsx: !0, tsx: !0 };
          function f(e) {
            return 'string' == typeof e ? e : Array.isArray(e) ? e.map(f).join('') : f(e.content);
          }
          e.hooks.add('after-tokenize', function (t) {
            t.language in d &&
              (function t(n) {
                for (var r = 0, a = n.length; r < a; r++) {
                  var o = n[r];
                  if ('string' != typeof o) {
                    var i = o.content;
                    if (Array.isArray(i))
                      if ('template-string' === o.type) {
                        var l = i[1];
                        if (3 === i.length && 'string' != typeof l && 'embedded-code' === l.type) {
                          var s = f(l),
                            u = l.alias,
                            d = Array.isArray(u) ? u[0] : u,
                            p = e.languages[d];
                          if (!p) continue;
                          i[1] = c(s, p, d);
                        }
                      } else t(i);
                    else 'string' != typeof i && t([i]);
                  }
                }
              })(t.tokens);
          });
        })(a),
        (function (e) {
          (e.languages.typescript = e.languages.extend('javascript', {
            'class-name': {
              pattern:
                /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
              lookbehind: !0,
              greedy: !0,
              inside: null,
            },
            builtin: /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/,
          })),
            e.languages.typescript.keyword.push(
              /\b(?:abstract|declare|is|keyof|readonly|require)\b/,
              /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
              /\btype\b(?=\s*(?:[\{*]|$))/
            ),
            delete e.languages.typescript.parameter,
            delete e.languages.typescript['literal-property'];
          var t = e.languages.extend('typescript', {});
          delete t['class-name'],
            (e.languages.typescript['class-name'].inside = t),
            e.languages.insertBefore('typescript', 'function', {
              decorator: {
                pattern: /@[$\w\xA0-\uFFFF]+/,
                inside: { at: { pattern: /^@/, alias: 'operator' }, function: /^[\s\S]+/ },
              },
              'generic-function': {
                pattern:
                  /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
                greedy: !0,
                inside: {
                  function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
                  generic: { pattern: /<[\s\S]+/, alias: 'class-name', inside: t },
                },
              },
            }),
            (e.languages.ts = e.languages.typescript);
        })(a),
        (function (e) {
          function t(e, t) {
            return RegExp(
              e.replace(/<ID>/g, function () {
                return /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/.source;
              }),
              t
            );
          }
          e.languages.insertBefore('javascript', 'function-variable', {
            'method-variable': {
              pattern: RegExp('(\\.\\s*)' + e.languages.javascript['function-variable'].pattern.source),
              lookbehind: !0,
              alias: ['function-variable', 'method', 'function', 'property-access'],
            },
          }),
            e.languages.insertBefore('javascript', 'function', {
              method: {
                pattern: RegExp('(\\.\\s*)' + e.languages.javascript.function.source),
                lookbehind: !0,
                alias: ['function', 'property-access'],
              },
            }),
            e.languages.insertBefore('javascript', 'constant', {
              'known-class-name': [
                {
                  pattern:
                    /\b(?:(?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)?Array|ArrayBuffer|BigInt|Boolean|DataView|Date|Error|Function|Intl|JSON|(?:Weak)?(?:Map|Set)|Math|Number|Object|Promise|Proxy|Reflect|RegExp|String|Symbol|WebAssembly)\b/,
                  alias: 'class-name',
                },
                { pattern: /\b(?:[A-Z]\w*)Error\b/, alias: 'class-name' },
              ],
            }),
            e.languages.insertBefore('javascript', 'keyword', {
              imports: {
                pattern: t(
                  /(\bimport\b\s*)(?:<ID>(?:\s*,\s*(?:\*\s*as\s+<ID>|\{[^{}]*\}))?|\*\s*as\s+<ID>|\{[^{}]*\})(?=\s*\bfrom\b)/
                    .source
                ),
                lookbehind: !0,
                inside: e.languages.javascript,
              },
              exports: {
                pattern: t(/(\bexport\b\s*)(?:\*(?:\s*as\s+<ID>)?(?=\s*\bfrom\b)|\{[^{}]*\})/.source),
                lookbehind: !0,
                inside: e.languages.javascript,
              },
            }),
            e.languages.javascript.keyword.unshift(
              { pattern: /\b(?:as|default|export|from|import)\b/, alias: 'module' },
              {
                pattern:
                  /\b(?:await|break|catch|continue|do|else|finally|for|if|return|switch|throw|try|while|yield)\b/,
                alias: 'control-flow',
              },
              { pattern: /\bnull\b/, alias: ['null', 'nil'] },
              { pattern: /\bundefined\b/, alias: 'nil' }
            ),
            e.languages.insertBefore('javascript', 'operator', {
              spread: { pattern: /\.{3}/, alias: 'operator' },
              arrow: { pattern: /=>/, alias: 'operator' },
            }),
            e.languages.insertBefore('javascript', 'punctuation', {
              'property-access': { pattern: t(/(\.\s*)#?<ID>/.source), lookbehind: !0 },
              'maybe-class-name': { pattern: /(^|[^$\w\xA0-\uFFFF])[A-Z][$\w\xA0-\uFFFF]+/, lookbehind: !0 },
              dom: {
                pattern: /\b(?:document|(?:local|session)Storage|location|navigator|performance|window)\b/,
                alias: 'variable',
              },
              console: { pattern: /\bconsole(?=\s*\.)/, alias: 'class-name' },
            });
          for (
            var n = ['function', 'function-variable', 'method', 'method-variable', 'property-access'], r = 0;
            r < n.length;
            r++
          ) {
            var a = n[r],
              o = e.languages.javascript[a];
            'RegExp' === e.util.type(o) && (o = e.languages.javascript[a] = { pattern: o });
            var i = o.inside || {};
            (o.inside = i), (i['maybe-class-name'] = /^[A-Z][\s\S]*/);
          }
        })(a),
        (function (e) {
          var t = e.util.clone(e.languages.javascript),
            n = /(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source,
            r = /(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source,
            a = /(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;
          function o(e, t) {
            return (
              (e = e
                .replace(/<S>/g, function () {
                  return n;
                })
                .replace(/<BRACES>/g, function () {
                  return r;
                })
                .replace(/<SPREAD>/g, function () {
                  return a;
                })),
              RegExp(e, t)
            );
          }
          (a = o(a).source),
            (e.languages.jsx = e.languages.extend('markup', t)),
            (e.languages.jsx.tag.pattern = o(
              /<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/
                .source
            )),
            (e.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/),
            (e.languages.jsx.tag.inside['attr-value'].pattern =
              /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/),
            (e.languages.jsx.tag.inside.tag.inside['class-name'] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/),
            (e.languages.jsx.tag.inside.comment = t.comment),
            e.languages.insertBefore(
              'inside',
              'attr-name',
              { spread: { pattern: o(/<SPREAD>/.source), inside: e.languages.jsx } },
              e.languages.jsx.tag
            ),
            e.languages.insertBefore(
              'inside',
              'special-attr',
              {
                script: {
                  pattern: o(/=<BRACES>/.source),
                  alias: 'language-javascript',
                  inside: {
                    'script-punctuation': { pattern: /^=(?=\{)/, alias: 'punctuation' },
                    rest: e.languages.jsx,
                  },
                },
              },
              e.languages.jsx.tag
            );
          var i = function (e) {
              return e
                ? 'string' == typeof e
                  ? e
                  : 'string' == typeof e.content
                  ? e.content
                  : e.content.map(i).join('')
                : '';
            },
            l = function (t) {
              for (var n = [], r = 0; r < t.length; r++) {
                var a = t[r],
                  o = !1;
                if (
                  ('string' != typeof a &&
                    ('tag' === a.type && a.content[0] && 'tag' === a.content[0].type
                      ? '</' === a.content[0].content[0].content
                        ? n.length > 0 && n[n.length - 1].tagName === i(a.content[0].content[1]) && n.pop()
                        : '/>' === a.content[a.content.length - 1].content ||
                          n.push({ tagName: i(a.content[0].content[1]), openedBraces: 0 })
                      : n.length > 0 && 'punctuation' === a.type && '{' === a.content
                      ? n[n.length - 1].openedBraces++
                      : n.length > 0 &&
                        n[n.length - 1].openedBraces > 0 &&
                        'punctuation' === a.type &&
                        '}' === a.content
                      ? n[n.length - 1].openedBraces--
                      : (o = !0)),
                  (o || 'string' == typeof a) && n.length > 0 && 0 === n[n.length - 1].openedBraces)
                ) {
                  var s = i(a);
                  r < t.length - 1 &&
                    ('string' == typeof t[r + 1] || 'plain-text' === t[r + 1].type) &&
                    ((s += i(t[r + 1])), t.splice(r + 1, 1)),
                    r > 0 &&
                      ('string' == typeof t[r - 1] || 'plain-text' === t[r - 1].type) &&
                      ((s = i(t[r - 1]) + s), t.splice(r - 1, 1), r--),
                    (t[r] = new e.Token('plain-text', s, null, s));
                }
                a.content && 'string' != typeof a.content && l(a.content);
              }
            };
          e.hooks.add('after-tokenize', function (e) {
            ('jsx' !== e.language && 'tsx' !== e.language) || l(e.tokens);
          });
        })(a),
        (function (e) {
          e.languages.diff = { coord: [/^(?:\*{3}|-{3}|\+{3}).*$/m, /^@@.*@@$/m, /^\d.*$/m] };
          var t = {
            'deleted-sign': '-',
            'deleted-arrow': '<',
            'inserted-sign': '+',
            'inserted-arrow': '>',
            unchanged: ' ',
            diff: '!',
          };
          Object.keys(t).forEach(function (n) {
            var r = t[n],
              a = [];
            /^\w+$/.test(n) || a.push(/\w+/.exec(n)[0]),
              'diff' === n && a.push('bold'),
              (e.languages.diff[n] = {
                pattern: RegExp('^(?:[' + r + '].*(?:\r\n?|\n|(?![\\s\\S])))+', 'm'),
                alias: a,
                inside: {
                  line: { pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/, lookbehind: !0 },
                  prefix: { pattern: /[\s\S]/, alias: /\w+/.exec(n)[0] },
                },
              });
          }),
            Object.defineProperty(e.languages.diff, 'PREFIXES', { value: t });
        })(a),
        (a.languages.git = {
          comment: /^#.*/m,
          deleted: /^[-\u2013].*/m,
          inserted: /^\+.*/m,
          string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
          command: { pattern: /^.*\$ git .*$/m, inside: { parameter: /\s--?\w+/ } },
          coord: /^@@.*@@$/m,
          'commit-sha1': /^commit \w{40}$/m,
        }),
        (a.languages.go = a.languages.extend('clike', {
          string: { pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"|`[^`]*`/, lookbehind: !0, greedy: !0 },
          keyword:
            /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
          boolean: /\b(?:_|false|iota|nil|true)\b/,
          number: [
            /\b0(?:b[01_]+|o[0-7_]+)i?\b/i,
            /\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,
            /(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i,
          ],
          operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
          builtin:
            /\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/,
        })),
        a.languages.insertBefore('go', 'string', { char: { pattern: /'(?:\\.|[^'\\\r\n]){0,10}'/, greedy: !0 } }),
        delete a.languages.go['class-name'],
        (function (e) {
          function t(e, t) {
            return '___' + e.toUpperCase() + t + '___';
          }
          Object.defineProperties((e.languages['markup-templating'] = {}), {
            buildPlaceholders: {
              value: function (n, r, a, o) {
                if (n.language === r) {
                  var i = (n.tokenStack = []);
                  (n.code = n.code.replace(a, function (e) {
                    if ('function' == typeof o && !o(e)) return e;
                    for (var a, l = i.length; -1 !== n.code.indexOf((a = t(r, l))); ) ++l;
                    return (i[l] = e), a;
                  })),
                    (n.grammar = e.languages.markup);
                }
              },
            },
            tokenizePlaceholders: {
              value: function (n, r) {
                if (n.language === r && n.tokenStack) {
                  n.grammar = e.languages[r];
                  var a = 0,
                    o = Object.keys(n.tokenStack);
                  !(function i(l) {
                    for (var s = 0; s < l.length && !(a >= o.length); s++) {
                      var u = l[s];
                      if ('string' == typeof u || (u.content && 'string' == typeof u.content)) {
                        var c = o[a],
                          d = n.tokenStack[c],
                          f = 'string' == typeof u ? u : u.content,
                          p = t(r, c),
                          m = f.indexOf(p);
                        if (m > -1) {
                          ++a;
                          var g = f.substring(0, m),
                            h = new e.Token(r, e.tokenize(d, n.grammar), 'language-' + r, d),
                            v = f.substring(m + p.length),
                            b = [];
                          g && b.push.apply(b, i([g])),
                            b.push(h),
                            v && b.push.apply(b, i([v])),
                            'string' == typeof u ? l.splice.apply(l, [s, 1].concat(b)) : (u.content = b);
                        }
                      } else u.content && i(u.content);
                    }
                    return l;
                  })(n.tokens);
                }
              },
            },
          });
        })(a),
        (function (e) {
          (e.languages.handlebars = {
            comment: /\{\{![\s\S]*?\}\}/,
            delimiter: { pattern: /^\{\{\{?|\}\}\}?$/, alias: 'punctuation' },
            string: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
            number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][+-]?\d+)?/,
            boolean: /\b(?:false|true)\b/,
            block: { pattern: /^(\s*(?:~\s*)?)[#\/]\S+?(?=\s*(?:~\s*)?$|\s)/, lookbehind: !0, alias: 'keyword' },
            brackets: { pattern: /\[[^\]]+\]/, inside: { punctuation: /\[|\]/, variable: /[\s\S]+/ } },
            punctuation: /[!"#%&':()*+,.\/;<=>@\[\\\]^`{|}~]/,
            variable: /[^!"#%&'()*+,\/;<=>@\[\\\]^`{|}~\s]+/,
          }),
            e.hooks.add('before-tokenize', function (t) {
              e.languages['markup-templating'].buildPlaceholders(
                t,
                'handlebars',
                /\{\{\{[\s\S]+?\}\}\}|\{\{[\s\S]+?\}\}/g
              );
            }),
            e.hooks.add('after-tokenize', function (t) {
              e.languages['markup-templating'].tokenizePlaceholders(t, 'handlebars');
            }),
            (e.languages.hbs = e.languages.handlebars);
        })(a),
        (a.languages.json = {
          property: { pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, lookbehind: !0, greedy: !0 },
          string: { pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, lookbehind: !0, greedy: !0 },
          comment: { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
          number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
          punctuation: /[{}[\],]/,
          operator: /:/,
          boolean: /\b(?:false|true)\b/,
          null: { pattern: /\bnull\b/, alias: 'keyword' },
        }),
        (a.languages.webmanifest = a.languages.json),
        (a.languages.less = a.languages.extend('css', {
          comment: [/\/\*[\s\S]*?\*\//, { pattern: /(^|[^\\])\/\/.*/, lookbehind: !0 }],
          atrule: {
            pattern: /@[\w-](?:\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};\s]|\s+(?!\s))*?(?=\s*\{)/,
            inside: { punctuation: /[:()]/ },
          },
          selector: {
            pattern:
              /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};@\s]|\s+(?!\s))*?(?=\s*\{)/,
            inside: { variable: /@+[\w-]+/ },
          },
          property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/,
          operator: /[+\-*\/]/,
        })),
        a.languages.insertBefore('less', 'property', {
          variable: [{ pattern: /@[\w-]+\s*:/, inside: { punctuation: /:/ } }, /@@?[\w-]+/],
          'mixin-usage': { pattern: /([{;]\s*)[.#](?!\d)[\w-].*?(?=[(;])/, lookbehind: !0, alias: 'function' },
        }),
        (a.languages.makefile = {
          comment: { pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/, lookbehind: !0 },
          string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
          'builtin-target': { pattern: /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/, alias: 'builtin' },
          target: {
            pattern: /^(?:[^:=\s]|[ \t]+(?![\s:]))+(?=\s*:(?!=))/m,
            alias: 'symbol',
            inside: { variable: /\$+(?:(?!\$)[^(){}:#=\s]+|(?=[({]))/ },
          },
          variable: /\$+(?:(?!\$)[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,
          keyword:
            /-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/,
          function: {
            pattern:
              /(\()(?:abspath|addsuffix|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:list|s)?)(?=[ \t])/,
            lookbehind: !0,
          },
          operator: /(?:::|[?:+!])?=|[|@]/,
          punctuation: /[:;(){}]/,
        }),
        (a.languages.objectivec = a.languages.extend('c', {
          string: { pattern: /@?"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/, greedy: !0 },
          keyword:
            /\b(?:asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|in|inline|int|long|register|return|self|short|signed|sizeof|static|struct|super|switch|typedef|typeof|union|unsigned|void|volatile|while)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
          operator: /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/,
        })),
        delete a.languages.objectivec['class-name'],
        (a.languages.objc = a.languages.objectivec),
        (a.languages.ocaml = {
          comment: { pattern: /\(\*[\s\S]*?\*\)/, greedy: !0 },
          char: { pattern: /'(?:[^\\\r\n']|\\(?:.|[ox]?[0-9a-f]{1,3}))'/i, greedy: !0 },
          string: [
            { pattern: /"(?:\\(?:[\s\S]|\r\n)|[^\\\r\n"])*"/, greedy: !0 },
            { pattern: /\{([a-z_]*)\|[\s\S]*?\|\1\}/, greedy: !0 },
          ],
          number: [
            /\b(?:0b[01][01_]*|0o[0-7][0-7_]*)\b/i,
            /\b0x[a-f0-9][a-f0-9_]*(?:\.[a-f0-9_]*)?(?:p[+-]?\d[\d_]*)?(?!\w)/i,
            /\b\d[\d_]*(?:\.[\d_]*)?(?:e[+-]?\d[\d_]*)?(?!\w)/i,
          ],
          directive: { pattern: /\B#\w+/, alias: 'property' },
          label: { pattern: /\B~\w+/, alias: 'property' },
          'type-variable': { pattern: /\B'\w+/, alias: 'function' },
          variant: { pattern: /`\w+/, alias: 'symbol' },
          keyword:
            /\b(?:as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|match|method|module|mutable|new|nonrec|object|of|open|private|rec|sig|struct|then|to|try|type|val|value|virtual|when|where|while|with)\b/,
          boolean: /\b(?:false|true)\b/,
          'operator-like-punctuation': { pattern: /\[[<>|]|[>|]\]|\{<|>\}/, alias: 'punctuation' },
          operator:
            /\.[.~]|:[=>]|[=<>@^|&+\-*\/$%!?~][!$%&*+\-.\/:<=>?@^|~]*|\b(?:and|asr|land|lor|lsl|lsr|lxor|mod|or)\b/,
          punctuation: /;;|::|[(){}\[\].,:;#]|\b_\b/,
        }),
        (a.languages.python = {
          comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0, greedy: !0 },
          'string-interpolation': {
            pattern: /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
            greedy: !0,
            inside: {
              interpolation: {
                pattern: /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
                lookbehind: !0,
                inside: {
                  'format-spec': { pattern: /(:)[^:(){}]+(?=\}$)/, lookbehind: !0 },
                  'conversion-option': { pattern: /![sra](?=[:}]$)/, alias: 'punctuation' },
                  rest: null,
                },
              },
              string: /[\s\S]+/,
            },
          },
          'triple-quoted-string': { pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i, greedy: !0, alias: 'string' },
          string: { pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i, greedy: !0 },
          function: { pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g, lookbehind: !0 },
          'class-name': { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
          decorator: {
            pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
            lookbehind: !0,
            alias: ['annotation', 'punctuation'],
            inside: { punctuation: /\./ },
          },
          keyword:
            /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
          builtin:
            /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
          boolean: /\b(?:False|None|True)\b/,
          number:
            /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
          operator: /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
          punctuation: /[{}[\];(),.:]/,
        }),
        (a.languages.python['string-interpolation'].inside.interpolation.inside.rest = a.languages.python),
        (a.languages.py = a.languages.python),
        (a.languages.reason = a.languages.extend('clike', {
          string: { pattern: /"(?:\\(?:\r\n|[\s\S])|[^\\\r\n"])*"/, greedy: !0 },
          'class-name': /\b[A-Z]\w*/,
          keyword:
            /\b(?:and|as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|method|module|mutable|new|nonrec|object|of|open|or|private|rec|sig|struct|switch|then|to|try|type|val|virtual|when|while|with)\b/,
          operator:
            /\.{3}|:[:=]|\|>|->|=(?:==?|>)?|<=?|>=?|[|^?'#!~`]|[+\-*\/]\.?|\b(?:asr|land|lor|lsl|lsr|lxor|mod)\b/,
        })),
        a.languages.insertBefore('reason', 'class-name', {
          char: { pattern: /'(?:\\x[\da-f]{2}|\\o[0-3][0-7][0-7]|\\\d{3}|\\.|[^'\\\r\n])'/, greedy: !0 },
          constructor: /\b[A-Z]\w*\b(?!\s*\.)/,
          label: { pattern: /\b[a-z]\w*(?=::)/, alias: 'symbol' },
        }),
        delete a.languages.reason.function,
        (function (e) {
          (e.languages.sass = e.languages.extend('css', {
            comment: { pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t].+)*/m, lookbehind: !0, greedy: !0 },
          })),
            e.languages.insertBefore('sass', 'atrule', {
              'atrule-line': { pattern: /^(?:[ \t]*)[@+=].+/m, greedy: !0, inside: { atrule: /(?:@[\w-]+|[+=])/ } },
            }),
            delete e.languages.sass.atrule;
          var t = /\$[-\w]+|#\{\$[-\w]+\}/,
            n = [/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|not|or)\b/, { pattern: /(\s)-(?=\s)/, lookbehind: !0 }];
          e.languages.insertBefore('sass', 'property', {
            'variable-line': {
              pattern: /^[ \t]*\$.+/m,
              greedy: !0,
              inside: { punctuation: /:/, variable: t, operator: n },
            },
            'property-line': {
              pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s].*)/m,
              greedy: !0,
              inside: {
                property: [/[^:\s]+(?=\s*:)/, { pattern: /(:)[^:\s]+/, lookbehind: !0 }],
                punctuation: /:/,
                variable: t,
                operator: n,
                important: e.languages.sass.important,
              },
            },
          }),
            delete e.languages.sass.property,
            delete e.languages.sass.important,
            e.languages.insertBefore('sass', 'punctuation', {
              selector: {
                pattern:
                  /^([ \t]*)\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*)*/m,
                lookbehind: !0,
                greedy: !0,
              },
            });
        })(a),
        (a.languages.scss = a.languages.extend('css', {
          comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/, lookbehind: !0 },
          atrule: { pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/, inside: { rule: /@[\w-]+/ } },
          url: /(?:[-a-z]+-)?url(?=\()/i,
          selector: {
            pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/,
            inside: {
              parent: { pattern: /&/, alias: 'important' },
              placeholder: /%[-\w]+/,
              variable: /\$[-\w]+|#\{\$[-\w]+\}/,
            },
          },
          property: {
            pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
            inside: { variable: /\$[-\w]+|#\{\$[-\w]+\}/ },
          },
        })),
        a.languages.insertBefore('scss', 'atrule', {
          keyword: [
            /@(?:content|debug|each|else(?: if)?|extend|for|forward|function|if|import|include|mixin|return|use|warn|while)\b/i,
            { pattern: /( )(?:from|through)(?= )/, lookbehind: !0 },
          ],
        }),
        a.languages.insertBefore('scss', 'important', { variable: /\$[-\w]+|#\{\$[-\w]+\}/ }),
        a.languages.insertBefore('scss', 'function', {
          'module-modifier': { pattern: /\b(?:as|hide|show|with)\b/i, alias: 'keyword' },
          placeholder: { pattern: /%[-\w]+/, alias: 'selector' },
          statement: { pattern: /\B!(?:default|optional)\b/i, alias: 'keyword' },
          boolean: /\b(?:false|true)\b/,
          null: { pattern: /\bnull\b/, alias: 'keyword' },
          operator: { pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|not|or)(?=\s)/, lookbehind: !0 },
        }),
        (a.languages.scss.atrule.inside.rest = a.languages.scss),
        (function (e) {
          var t = { pattern: /(\b\d+)(?:%|[a-z]+)/, lookbehind: !0 },
            n = { pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/, lookbehind: !0 },
            r = {
              comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/, lookbehind: !0 },
              url: { pattern: /\burl\((["']?).*?\1\)/i, greedy: !0 },
              string: { pattern: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/, greedy: !0 },
              interpolation: null,
              func: null,
              important: /\B!(?:important|optional)\b/i,
              keyword: { pattern: /(^|\s+)(?:(?:else|for|if|return|unless)(?=\s|$)|@[\w-]+)/, lookbehind: !0 },
              hexcode: /#[\da-f]{3,6}/i,
              color: [
                /\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i,
                {
                  pattern:
                    /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
                  inside: { unit: t, number: n, function: /[\w-]+(?=\()/, punctuation: /[(),]/ },
                },
              ],
              entity: /\\[\da-f]{1,8}/i,
              unit: t,
              boolean: /\b(?:false|true)\b/,
              operator: [
                /~|[+!\/%<>?=]=?|[-:]=|\*[*=]?|\.{2,3}|&&|\|\||\B-\B|\b(?:and|in|is(?: a| defined| not|nt)?|not|or)\b/,
              ],
              number: n,
              punctuation: /[{}()\[\];:,]/,
            };
          (r.interpolation = {
            pattern: /\{[^\r\n}:]+\}/,
            alias: 'variable',
            inside: { delimiter: { pattern: /^\{|\}$/, alias: 'punctuation' }, rest: r },
          }),
            (r.func = { pattern: /[\w-]+\([^)]*\).*/, inside: { function: /^[^(]+/, rest: r } }),
            (e.languages.stylus = {
              'atrule-declaration': {
                pattern: /(^[ \t]*)@.+/m,
                lookbehind: !0,
                inside: { atrule: /^@[\w-]+/, rest: r },
              },
              'variable-declaration': {
                pattern: /(^[ \t]*)[\w$-]+\s*.?=[ \t]*(?:\{[^{}]*\}|\S.*|$)/m,
                lookbehind: !0,
                inside: { variable: /^\S+/, rest: r },
              },
              statement: {
                pattern: /(^[ \t]*)(?:else|for|if|return|unless)[ \t].+/m,
                lookbehind: !0,
                inside: { keyword: /^\S+/, rest: r },
              },
              'property-declaration': {
                pattern:
                  /((?:^|\{)([ \t]*))(?:[\w-]|\{[^}\r\n]+\})+(?:\s*:\s*|[ \t]+)(?!\s)[^{\r\n]*(?:;|[^{\r\n,]$(?!(?:\r?\n|\r)(?:\{|\2[ \t])))/m,
                lookbehind: !0,
                inside: { property: { pattern: /^[^\s:]+/, inside: { interpolation: r.interpolation } }, rest: r },
              },
              selector: {
                pattern:
                  /(^[ \t]*)(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\)|(?![\w-]))|\{[^}\r\n]+\})+)(?:(?:\r?\n|\r)(?:\1(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\)|(?![\w-]))|\{[^}\r\n]+\})+)))*(?:,$|\{|(?=(?:\r?\n|\r)(?:\{|\1[ \t])))/m,
                lookbehind: !0,
                inside: { interpolation: r.interpolation, comment: r.comment, punctuation: /[{},]/ },
              },
              func: r.func,
              string: r.string,
              comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/, lookbehind: !0, greedy: !0 },
              interpolation: r.interpolation,
              punctuation: /[{}()\[\];:.]/,
            });
        })(a),
        (function (e) {
          var t = e.util.clone(e.languages.typescript);
          (e.languages.tsx = e.languages.extend('jsx', t)),
            delete e.languages.tsx.parameter,
            delete e.languages.tsx['literal-property'];
          var n = e.languages.tsx.tag;
          (n.pattern = RegExp(/(^|[^\w$]|(?=<\/))/.source + '(?:' + n.pattern.source + ')', n.pattern.flags)),
            (n.lookbehind = !0);
        })(a),
        (a.languages.wasm = {
          comment: [/\(;[\s\S]*?;\)/, { pattern: /;;.*/, greedy: !0 }],
          string: { pattern: /"(?:\\[\s\S]|[^"\\])*"/, greedy: !0 },
          keyword: [
            { pattern: /\b(?:align|offset)=/, inside: { operator: /=/ } },
            {
              pattern:
                /\b(?:(?:f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|neg?|nearest|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|sqrt|store(?:8|16|32)?|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))?|memory\.(?:grow|size))\b/,
              inside: { punctuation: /\./ },
            },
            /\b(?:anyfunc|block|br(?:_if|_table)?|call(?:_indirect)?|data|drop|elem|else|end|export|func|get_(?:global|local)|global|if|import|local|loop|memory|module|mut|nop|offset|param|result|return|select|set_(?:global|local)|start|table|tee_local|then|type|unreachable)\b/,
          ],
          variable: /\$[\w!#$%&'*+\-./:<=>?@\\^`|~]+/,
          number:
            /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/,
          punctuation: /[()]/,
        });
      const o = a;
    },
    9911: e => {
      e.exports &&
        (e.exports = {
          core: { meta: { path: 'components/prism-core.js', option: 'mandatory' }, core: 'Core' },
          themes: {
            meta: { path: 'themes/{id}.css', link: 'index.html?theme={id}', exclusive: !0 },
            prism: { title: 'Default', option: 'default' },
            'prism-dark': 'Dark',
            'prism-funky': 'Funky',
            'prism-okaidia': { title: 'Okaidia', owner: 'ocodia' },
            'prism-twilight': { title: 'Twilight', owner: 'remybach' },
            'prism-coy': { title: 'Coy', owner: 'tshedor' },
            'prism-solarizedlight': { title: 'Solarized Light', owner: 'hectormatos2011 ' },
            'prism-tomorrow': { title: 'Tomorrow Night', owner: 'Rosey' },
          },
          languages: {
            meta: { path: 'components/prism-{id}', noCSS: !0, examplesPath: 'examples/prism-{id}', addCheckAll: !0 },
            markup: {
              title: 'Markup',
              alias: ['html', 'xml', 'svg', 'mathml', 'ssml', 'atom', 'rss'],
              aliasTitles: {
                html: 'HTML',
                xml: 'XML',
                svg: 'SVG',
                mathml: 'MathML',
                ssml: 'SSML',
                atom: 'Atom',
                rss: 'RSS',
              },
              option: 'default',
            },
            css: { title: 'CSS', option: 'default', modify: 'markup' },
            clike: { title: 'C-like', option: 'default' },
            javascript: {
              title: 'JavaScript',
              require: 'clike',
              modify: 'markup',
              optional: 'regex',
              alias: 'js',
              option: 'default',
            },
            abap: { title: 'ABAP', owner: 'dellagustin' },
            abnf: { title: 'ABNF', owner: 'RunDevelopment' },
            actionscript: { title: 'ActionScript', require: 'javascript', modify: 'markup', owner: 'Golmote' },
            ada: { title: 'Ada', owner: 'Lucretia' },
            agda: { title: 'Agda', owner: 'xy-ren' },
            al: { title: 'AL', owner: 'RunDevelopment' },
            antlr4: { title: 'ANTLR4', alias: 'g4', owner: 'RunDevelopment' },
            apacheconf: { title: 'Apache Configuration', owner: 'GuiTeK' },
            apex: { title: 'Apex', require: ['clike', 'sql'], owner: 'RunDevelopment' },
            apl: { title: 'APL', owner: 'ngn' },
            applescript: { title: 'AppleScript', owner: 'Golmote' },
            aql: { title: 'AQL', owner: 'RunDevelopment' },
            arduino: { title: 'Arduino', require: 'cpp', alias: 'ino', owner: 'dkern' },
            arff: { title: 'ARFF', owner: 'Golmote' },
            armasm: { title: 'ARM Assembly', alias: 'arm-asm', owner: 'RunDevelopment' },
            arturo: {
              title: 'Arturo',
              alias: 'art',
              optional: ['bash', 'css', 'javascript', 'markup', 'markdown', 'sql'],
              owner: 'drkameleon',
            },
            asciidoc: { alias: 'adoc', title: 'AsciiDoc', owner: 'Golmote' },
            aspnet: { title: 'ASP.NET (C#)', require: ['markup', 'csharp'], owner: 'nauzilus' },
            asm6502: { title: '6502 Assembly', owner: 'kzurawel' },
            asmatmel: { title: 'Atmel AVR Assembly', owner: 'cerkit' },
            autohotkey: { title: 'AutoHotkey', owner: 'aviaryan' },
            autoit: { title: 'AutoIt', owner: 'Golmote' },
            avisynth: { title: 'AviSynth', alias: 'avs', owner: 'Zinfidel' },
            'avro-idl': { title: 'Avro IDL', alias: 'avdl', owner: 'RunDevelopment' },
            awk: { title: 'AWK', alias: 'gawk', aliasTitles: { gawk: 'GAWK' }, owner: 'RunDevelopment' },
            bash: {
              title: 'Bash',
              alias: ['sh', 'shell'],
              aliasTitles: { sh: 'Shell', shell: 'Shell' },
              owner: 'zeitgeist87',
            },
            basic: { title: 'BASIC', owner: 'Golmote' },
            batch: { title: 'Batch', owner: 'Golmote' },
            bbcode: {
              title: 'BBcode',
              alias: 'shortcode',
              aliasTitles: { shortcode: 'Shortcode' },
              owner: 'RunDevelopment',
            },
            bbj: { title: 'BBj', owner: 'hyyan' },
            bicep: { title: 'Bicep', owner: 'johnnyreilly' },
            birb: { title: 'Birb', require: 'clike', owner: 'Calamity210' },
            bison: { title: 'Bison', require: 'c', owner: 'Golmote' },
            bnf: { title: 'BNF', alias: 'rbnf', aliasTitles: { rbnf: 'RBNF' }, owner: 'RunDevelopment' },
            bqn: { title: 'BQN', owner: 'yewscion' },
            brainfuck: { title: 'Brainfuck', owner: 'Golmote' },
            brightscript: { title: 'BrightScript', owner: 'RunDevelopment' },
            bro: { title: 'Bro', owner: 'wayward710' },
            bsl: {
              title: 'BSL (1C:Enterprise)',
              alias: 'oscript',
              aliasTitles: { oscript: 'OneScript' },
              owner: 'Diversus23',
            },
            c: { title: 'C', require: 'clike', owner: 'zeitgeist87' },
            csharp: { title: 'C#', require: 'clike', alias: ['cs', 'dotnet'], owner: 'mvalipour' },
            cpp: { title: 'C++', require: 'c', owner: 'zeitgeist87' },
            cfscript: { title: 'CFScript', require: 'clike', alias: 'cfc', owner: 'mjclemente' },
            chaiscript: { title: 'ChaiScript', require: ['clike', 'cpp'], owner: 'RunDevelopment' },
            cil: { title: 'CIL', owner: 'sbrl' },
            cilkc: { title: 'Cilk/C', require: 'c', alias: 'cilk-c', owner: 'OpenCilk' },
            cilkcpp: { title: 'Cilk/C++', require: 'cpp', alias: ['cilk-cpp', 'cilk'], owner: 'OpenCilk' },
            clojure: { title: 'Clojure', owner: 'troglotit' },
            cmake: { title: 'CMake', owner: 'mjrogozinski' },
            cobol: { title: 'COBOL', owner: 'RunDevelopment' },
            coffeescript: { title: 'CoffeeScript', require: 'javascript', alias: 'coffee', owner: 'R-osey' },
            concurnas: { title: 'Concurnas', alias: 'conc', owner: 'jasontatton' },
            csp: { title: 'Content-Security-Policy', owner: 'ScottHelme' },
            cooklang: { title: 'Cooklang', owner: 'ahue' },
            coq: { title: 'Coq', owner: 'RunDevelopment' },
            crystal: { title: 'Crystal', require: 'ruby', owner: 'MakeNowJust' },
            'css-extras': { title: 'CSS Extras', require: 'css', modify: 'css', owner: 'milesj' },
            csv: { title: 'CSV', owner: 'RunDevelopment' },
            cue: { title: 'CUE', owner: 'RunDevelopment' },
            cypher: { title: 'Cypher', owner: 'RunDevelopment' },
            d: { title: 'D', require: 'clike', owner: 'Golmote' },
            dart: { title: 'Dart', require: 'clike', owner: 'Golmote' },
            dataweave: { title: 'DataWeave', owner: 'machaval' },
            dax: { title: 'DAX', owner: 'peterbud' },
            dhall: { title: 'Dhall', owner: 'RunDevelopment' },
            diff: { title: 'Diff', owner: 'uranusjr' },
            django: { title: 'Django/Jinja2', require: 'markup-templating', alias: 'jinja2', owner: 'romanvm' },
            'dns-zone-file': { title: 'DNS zone file', owner: 'RunDevelopment', alias: 'dns-zone' },
            docker: { title: 'Docker', alias: 'dockerfile', owner: 'JustinBeckwith' },
            dot: { title: 'DOT (Graphviz)', alias: 'gv', optional: 'markup', owner: 'RunDevelopment' },
            ebnf: { title: 'EBNF', owner: 'RunDevelopment' },
            editorconfig: { title: 'EditorConfig', owner: 'osipxd' },
            eiffel: { title: 'Eiffel', owner: 'Conaclos' },
            ejs: {
              title: 'EJS',
              require: ['javascript', 'markup-templating'],
              owner: 'RunDevelopment',
              alias: 'eta',
              aliasTitles: { eta: 'Eta' },
            },
            elixir: { title: 'Elixir', owner: 'Golmote' },
            elm: { title: 'Elm', owner: 'zwilias' },
            etlua: { title: 'Embedded Lua templating', require: ['lua', 'markup-templating'], owner: 'RunDevelopment' },
            erb: { title: 'ERB', require: ['ruby', 'markup-templating'], owner: 'Golmote' },
            erlang: { title: 'Erlang', owner: 'Golmote' },
            'excel-formula': { title: 'Excel Formula', alias: ['xlsx', 'xls'], owner: 'RunDevelopment' },
            fsharp: { title: 'F#', require: 'clike', owner: 'simonreynolds7' },
            factor: { title: 'Factor', owner: 'catb0t' },
            false: { title: 'False', owner: 'edukisto' },
            'firestore-security-rules': {
              title: 'Firestore security rules',
              require: 'clike',
              owner: 'RunDevelopment',
            },
            flow: { title: 'Flow', require: 'javascript', owner: 'Golmote' },
            fortran: { title: 'Fortran', owner: 'Golmote' },
            ftl: { title: 'FreeMarker Template Language', require: 'markup-templating', owner: 'RunDevelopment' },
            gml: { title: 'GameMaker Language', alias: 'gamemakerlanguage', require: 'clike', owner: 'LiarOnce' },
            gap: { title: 'GAP (CAS)', owner: 'RunDevelopment' },
            gcode: { title: 'G-code', owner: 'RunDevelopment' },
            gdscript: { title: 'GDScript', owner: 'RunDevelopment' },
            gedcom: { title: 'GEDCOM', owner: 'Golmote' },
            gettext: { title: 'gettext', alias: 'po', owner: 'RunDevelopment' },
            gherkin: { title: 'Gherkin', owner: 'hason' },
            git: { title: 'Git', owner: 'lgiraudel' },
            glsl: { title: 'GLSL', require: 'c', owner: 'Golmote' },
            gn: { title: 'GN', alias: 'gni', owner: 'RunDevelopment' },
            'linker-script': { title: 'GNU Linker Script', alias: 'ld', owner: 'RunDevelopment' },
            go: { title: 'Go', require: 'clike', owner: 'arnehormann' },
            'go-module': { title: 'Go module', alias: 'go-mod', owner: 'RunDevelopment' },
            gradle: { title: 'Gradle', require: 'clike', owner: 'zeabdelkhalek-badido18' },
            graphql: { title: 'GraphQL', optional: 'markdown', owner: 'Golmote' },
            groovy: { title: 'Groovy', require: 'clike', owner: 'robfletcher' },
            haml: {
              title: 'Haml',
              require: 'ruby',
              optional: [
                'css',
                'css-extras',
                'coffeescript',
                'erb',
                'javascript',
                'less',
                'markdown',
                'scss',
                'textile',
              ],
              owner: 'Golmote',
            },
            handlebars: {
              title: 'Handlebars',
              require: 'markup-templating',
              alias: ['hbs', 'mustache'],
              aliasTitles: { mustache: 'Mustache' },
              owner: 'Golmote',
            },
            haskell: { title: 'Haskell', alias: 'hs', owner: 'bholst' },
            haxe: { title: 'Haxe', require: 'clike', optional: 'regex', owner: 'Golmote' },
            hcl: { title: 'HCL', owner: 'outsideris' },
            hlsl: { title: 'HLSL', require: 'c', owner: 'RunDevelopment' },
            hoon: { title: 'Hoon', owner: 'matildepark' },
            http: {
              title: 'HTTP',
              optional: ['csp', 'css', 'hpkp', 'hsts', 'javascript', 'json', 'markup', 'uri'],
              owner: 'danielgtaylor',
            },
            hpkp: { title: 'HTTP Public-Key-Pins', owner: 'ScottHelme' },
            hsts: { title: 'HTTP Strict-Transport-Security', owner: 'ScottHelme' },
            ichigojam: { title: 'IchigoJam', owner: 'BlueCocoa' },
            icon: { title: 'Icon', owner: 'Golmote' },
            'icu-message-format': { title: 'ICU Message Format', owner: 'RunDevelopment' },
            idris: { title: 'Idris', alias: 'idr', owner: 'KeenS', require: 'haskell' },
            ignore: {
              title: '.ignore',
              owner: 'osipxd',
              alias: ['gitignore', 'hgignore', 'npmignore'],
              aliasTitles: { gitignore: '.gitignore', hgignore: '.hgignore', npmignore: '.npmignore' },
            },
            inform7: { title: 'Inform 7', owner: 'Golmote' },
            ini: { title: 'Ini', owner: 'aviaryan' },
            io: { title: 'Io', owner: 'AlesTsurko' },
            j: { title: 'J', owner: 'Golmote' },
            java: { title: 'Java', require: 'clike', owner: 'sherblot' },
            javadoc: {
              title: 'JavaDoc',
              require: ['markup', 'java', 'javadoclike'],
              modify: 'java',
              optional: 'scala',
              owner: 'RunDevelopment',
            },
            javadoclike: { title: 'JavaDoc-like', modify: ['java', 'javascript', 'php'], owner: 'RunDevelopment' },
            javastacktrace: { title: 'Java stack trace', owner: 'RunDevelopment' },
            jexl: { title: 'Jexl', owner: 'czosel' },
            jolie: { title: 'Jolie', require: 'clike', owner: 'thesave' },
            jq: { title: 'JQ', owner: 'RunDevelopment' },
            jsdoc: {
              title: 'JSDoc',
              require: ['javascript', 'javadoclike', 'typescript'],
              modify: 'javascript',
              optional: ['actionscript', 'coffeescript'],
              owner: 'RunDevelopment',
            },
            'js-extras': {
              title: 'JS Extras',
              require: 'javascript',
              modify: 'javascript',
              optional: ['actionscript', 'coffeescript', 'flow', 'n4js', 'typescript'],
              owner: 'RunDevelopment',
            },
            json: {
              title: 'JSON',
              alias: 'webmanifest',
              aliasTitles: { webmanifest: 'Web App Manifest' },
              owner: 'CupOfTea696',
            },
            json5: { title: 'JSON5', require: 'json', owner: 'RunDevelopment' },
            jsonp: { title: 'JSONP', require: 'json', owner: 'RunDevelopment' },
            jsstacktrace: { title: 'JS stack trace', owner: 'sbrl' },
            'js-templates': {
              title: 'JS Templates',
              require: 'javascript',
              modify: 'javascript',
              optional: ['css', 'css-extras', 'graphql', 'markdown', 'markup', 'sql'],
              owner: 'RunDevelopment',
            },
            julia: { title: 'Julia', owner: 'cdagnino' },
            keepalived: { title: 'Keepalived Configure', owner: 'dev-itsheng' },
            keyman: { title: 'Keyman', owner: 'mcdurdin' },
            kotlin: {
              title: 'Kotlin',
              alias: ['kt', 'kts'],
              aliasTitles: { kts: 'Kotlin Script' },
              require: 'clike',
              owner: 'Golmote',
            },
            kumir: { title: 'KuMir (\u041a\u0443\u041c\u0438\u0440)', alias: 'kum', owner: 'edukisto' },
            kusto: { title: 'Kusto', owner: 'RunDevelopment' },
            latex: {
              title: 'LaTeX',
              alias: ['tex', 'context'],
              aliasTitles: { tex: 'TeX', context: 'ConTeXt' },
              owner: 'japborst',
            },
            latte: { title: 'Latte', require: ['clike', 'markup-templating', 'php'], owner: 'nette' },
            less: { title: 'Less', require: 'css', optional: 'css-extras', owner: 'Golmote' },
            lilypond: { title: 'LilyPond', require: 'scheme', alias: 'ly', owner: 'RunDevelopment' },
            liquid: { title: 'Liquid', require: 'markup-templating', owner: 'cinhtau' },
            lisp: { title: 'Lisp', alias: ['emacs', 'elisp', 'emacs-lisp'], owner: 'JuanCaicedo' },
            livescript: { title: 'LiveScript', owner: 'Golmote' },
            llvm: { title: 'LLVM IR', owner: 'porglezomp' },
            log: { title: 'Log file', optional: 'javastacktrace', owner: 'RunDevelopment' },
            lolcode: { title: 'LOLCODE', owner: 'Golmote' },
            lua: { title: 'Lua', owner: 'Golmote' },
            magma: { title: 'Magma (CAS)', owner: 'RunDevelopment' },
            makefile: { title: 'Makefile', owner: 'Golmote' },
            markdown: { title: 'Markdown', require: 'markup', optional: 'yaml', alias: 'md', owner: 'Golmote' },
            'markup-templating': { title: 'Markup templating', require: 'markup', owner: 'Golmote' },
            mata: { title: 'Mata', owner: 'RunDevelopment' },
            matlab: { title: 'MATLAB', owner: 'Golmote' },
            maxscript: { title: 'MAXScript', owner: 'RunDevelopment' },
            mel: { title: 'MEL', owner: 'Golmote' },
            mermaid: { title: 'Mermaid', owner: 'RunDevelopment' },
            metafont: { title: 'METAFONT', owner: 'LaeriExNihilo' },
            mizar: { title: 'Mizar', owner: 'Golmote' },
            mongodb: { title: 'MongoDB', owner: 'airs0urce', require: 'javascript' },
            monkey: { title: 'Monkey', owner: 'Golmote' },
            moonscript: { title: 'MoonScript', alias: 'moon', owner: 'RunDevelopment' },
            n1ql: { title: 'N1QL', owner: 'TMWilds' },
            n4js: { title: 'N4JS', require: 'javascript', optional: 'jsdoc', alias: 'n4jsd', owner: 'bsmith-n4' },
            'nand2tetris-hdl': { title: 'Nand To Tetris HDL', owner: 'stephanmax' },
            naniscript: { title: 'Naninovel Script', owner: 'Elringus', alias: 'nani' },
            nasm: { title: 'NASM', owner: 'rbmj' },
            neon: { title: 'NEON', owner: 'nette' },
            nevod: { title: 'Nevod', owner: 'nezaboodka' },
            nginx: { title: 'nginx', owner: 'volado' },
            nim: { title: 'Nim', owner: 'Golmote' },
            nix: { title: 'Nix', owner: 'Golmote' },
            nsis: { title: 'NSIS', owner: 'idleberg' },
            objectivec: { title: 'Objective-C', require: 'c', alias: 'objc', owner: 'uranusjr' },
            ocaml: { title: 'OCaml', owner: 'Golmote' },
            odin: { title: 'Odin', owner: 'edukisto' },
            opencl: { title: 'OpenCL', require: 'c', modify: ['c', 'cpp'], owner: 'Milania1' },
            openqasm: { title: 'OpenQasm', alias: 'qasm', owner: 'RunDevelopment' },
            oz: { title: 'Oz', owner: 'Golmote' },
            parigp: { title: 'PARI/GP', owner: 'Golmote' },
            parser: { title: 'Parser', require: 'markup', owner: 'Golmote' },
            pascal: {
              title: 'Pascal',
              alias: 'objectpascal',
              aliasTitles: { objectpascal: 'Object Pascal' },
              owner: 'Golmote',
            },
            pascaligo: { title: 'Pascaligo', owner: 'DefinitelyNotAGoat' },
            psl: { title: 'PATROL Scripting Language', owner: 'bertysentry' },
            pcaxis: { title: 'PC-Axis', alias: 'px', owner: 'RunDevelopment' },
            peoplecode: { title: 'PeopleCode', alias: 'pcode', owner: 'RunDevelopment' },
            perl: { title: 'Perl', owner: 'Golmote' },
            php: { title: 'PHP', require: 'markup-templating', owner: 'milesj' },
            phpdoc: { title: 'PHPDoc', require: ['php', 'javadoclike'], modify: 'php', owner: 'RunDevelopment' },
            'php-extras': { title: 'PHP Extras', require: 'php', modify: 'php', owner: 'milesj' },
            'plant-uml': { title: 'PlantUML', alias: 'plantuml', owner: 'RunDevelopment' },
            plsql: { title: 'PL/SQL', require: 'sql', owner: 'Golmote' },
            powerquery: { title: 'PowerQuery', alias: ['pq', 'mscript'], owner: 'peterbud' },
            powershell: { title: 'PowerShell', owner: 'nauzilus' },
            processing: { title: 'Processing', require: 'clike', owner: 'Golmote' },
            prolog: { title: 'Prolog', owner: 'Golmote' },
            promql: { title: 'PromQL', owner: 'arendjr' },
            properties: { title: '.properties', owner: 'Golmote' },
            protobuf: { title: 'Protocol Buffers', require: 'clike', owner: 'just-boris' },
            pug: {
              title: 'Pug',
              require: ['markup', 'javascript'],
              optional: [
                'coffeescript',
                'ejs',
                'handlebars',
                'less',
                'livescript',
                'markdown',
                'scss',
                'stylus',
                'twig',
              ],
              owner: 'Golmote',
            },
            puppet: { title: 'Puppet', owner: 'Golmote' },
            pure: { title: 'Pure', optional: ['c', 'cpp', 'fortran'], owner: 'Golmote' },
            purebasic: { title: 'PureBasic', require: 'clike', alias: 'pbfasm', owner: 'HeX0R101' },
            purescript: { title: 'PureScript', require: 'haskell', alias: 'purs', owner: 'sriharshachilakapati' },
            python: { title: 'Python', alias: 'py', owner: 'multipetros' },
            qsharp: { title: 'Q#', require: 'clike', alias: 'qs', owner: 'fedonman' },
            q: { title: 'Q (kdb+ database)', owner: 'Golmote' },
            qml: { title: 'QML', require: 'javascript', owner: 'RunDevelopment' },
            qore: { title: 'Qore', require: 'clike', owner: 'temnroegg' },
            r: { title: 'R', owner: 'Golmote' },
            racket: { title: 'Racket', require: 'scheme', alias: 'rkt', owner: 'RunDevelopment' },
            cshtml: {
              title: 'Razor C#',
              alias: 'razor',
              require: ['markup', 'csharp'],
              optional: ['css', 'css-extras', 'javascript', 'js-extras'],
              owner: 'RunDevelopment',
            },
            jsx: {
              title: 'React JSX',
              require: ['markup', 'javascript'],
              optional: ['jsdoc', 'js-extras', 'js-templates'],
              owner: 'vkbansal',
            },
            tsx: { title: 'React TSX', require: ['jsx', 'typescript'] },
            reason: { title: 'Reason', require: 'clike', owner: 'Golmote' },
            regex: { title: 'Regex', owner: 'RunDevelopment' },
            rego: { title: 'Rego', owner: 'JordanSh' },
            renpy: { title: "Ren'py", alias: 'rpy', owner: 'HyuchiaDiego' },
            rescript: { title: 'ReScript', alias: 'res', owner: 'vmarcosp' },
            rest: { title: 'reST (reStructuredText)', owner: 'Golmote' },
            rip: { title: 'Rip', owner: 'ravinggenius' },
            roboconf: { title: 'Roboconf', owner: 'Golmote' },
            robotframework: { title: 'Robot Framework', alias: 'robot', owner: 'RunDevelopment' },
            ruby: { title: 'Ruby', require: 'clike', alias: 'rb', owner: 'samflores' },
            rust: { title: 'Rust', owner: 'Golmote' },
            sas: { title: 'SAS', optional: ['groovy', 'lua', 'sql'], owner: 'Golmote' },
            sass: { title: 'Sass (Sass)', require: 'css', optional: 'css-extras', owner: 'Golmote' },
            scss: { title: 'Sass (SCSS)', require: 'css', optional: 'css-extras', owner: 'MoOx' },
            scala: { title: 'Scala', require: 'java', owner: 'jozic' },
            scheme: { title: 'Scheme', owner: 'bacchus123' },
            'shell-session': {
              title: 'Shell session',
              require: 'bash',
              alias: ['sh-session', 'shellsession'],
              owner: 'RunDevelopment',
            },
            smali: { title: 'Smali', owner: 'RunDevelopment' },
            smalltalk: { title: 'Smalltalk', owner: 'Golmote' },
            smarty: { title: 'Smarty', require: 'markup-templating', optional: 'php', owner: 'Golmote' },
            sml: { title: 'SML', alias: 'smlnj', aliasTitles: { smlnj: 'SML/NJ' }, owner: 'RunDevelopment' },
            solidity: { title: 'Solidity (Ethereum)', alias: 'sol', require: 'clike', owner: 'glachaud' },
            'solution-file': { title: 'Solution file', alias: 'sln', owner: 'RunDevelopment' },
            soy: { title: 'Soy (Closure Template)', require: 'markup-templating', owner: 'Golmote' },
            sparql: { title: 'SPARQL', require: 'turtle', owner: 'Triply-Dev', alias: 'rq' },
            'splunk-spl': { title: 'Splunk SPL', owner: 'RunDevelopment' },
            sqf: { title: 'SQF: Status Quo Function (Arma 3)', require: 'clike', owner: 'RunDevelopment' },
            sql: { title: 'SQL', owner: 'multipetros' },
            squirrel: { title: 'Squirrel', require: 'clike', owner: 'RunDevelopment' },
            stan: { title: 'Stan', owner: 'RunDevelopment' },
            stata: { title: 'Stata Ado', require: ['mata', 'java', 'python'], owner: 'RunDevelopment' },
            iecst: { title: 'Structured Text (IEC 61131-3)', owner: 'serhioromano' },
            stylus: { title: 'Stylus', owner: 'vkbansal' },
            supercollider: { title: 'SuperCollider', alias: 'sclang', owner: 'RunDevelopment' },
            swift: { title: 'Swift', owner: 'chrischares' },
            systemd: { title: 'Systemd configuration file', owner: 'RunDevelopment' },
            't4-templating': { title: 'T4 templating', owner: 'RunDevelopment' },
            't4-cs': {
              title: 'T4 Text Templates (C#)',
              require: ['t4-templating', 'csharp'],
              alias: 't4',
              owner: 'RunDevelopment',
            },
            't4-vb': { title: 'T4 Text Templates (VB)', require: ['t4-templating', 'vbnet'], owner: 'RunDevelopment' },
            tap: { title: 'TAP', owner: 'isaacs', require: 'yaml' },
            tcl: { title: 'Tcl', owner: 'PeterChaplin' },
            tt2: { title: 'Template Toolkit 2', require: ['clike', 'markup-templating'], owner: 'gflohr' },
            textile: { title: 'Textile', require: 'markup', optional: 'css', owner: 'Golmote' },
            toml: { title: 'TOML', owner: 'RunDevelopment' },
            tremor: {
              title: 'Tremor',
              alias: ['trickle', 'troy'],
              owner: 'darach',
              aliasTitles: { trickle: 'trickle', troy: 'troy' },
            },
            turtle: { title: 'Turtle', alias: 'trig', aliasTitles: { trig: 'TriG' }, owner: 'jakubklimek' },
            twig: { title: 'Twig', require: 'markup-templating', owner: 'brandonkelly' },
            typescript: {
              title: 'TypeScript',
              require: 'javascript',
              optional: 'js-templates',
              alias: 'ts',
              owner: 'vkbansal',
            },
            typoscript: {
              title: 'TypoScript',
              alias: 'tsconfig',
              aliasTitles: { tsconfig: 'TSConfig' },
              owner: 'dkern',
            },
            unrealscript: { title: 'UnrealScript', alias: ['uscript', 'uc'], owner: 'RunDevelopment' },
            uorazor: { title: 'UO Razor Script', owner: 'jaseowns' },
            uri: { title: 'URI', alias: 'url', aliasTitles: { url: 'URL' }, owner: 'RunDevelopment' },
            v: { title: 'V', require: 'clike', owner: 'taggon' },
            vala: { title: 'Vala', require: 'clike', optional: 'regex', owner: 'TemplarVolk' },
            vbnet: { title: 'VB.Net', require: 'basic', owner: 'Bigsby' },
            velocity: { title: 'Velocity', require: 'markup', owner: 'Golmote' },
            verilog: { title: 'Verilog', owner: 'a-rey' },
            vhdl: { title: 'VHDL', owner: 'a-rey' },
            vim: { title: 'vim', owner: 'westonganger' },
            'visual-basic': {
              title: 'Visual Basic',
              alias: ['vb', 'vba'],
              aliasTitles: { vba: 'VBA' },
              owner: 'Golmote',
            },
            warpscript: { title: 'WarpScript', owner: 'RunDevelopment' },
            wasm: { title: 'WebAssembly', owner: 'Golmote' },
            'web-idl': { title: 'Web IDL', alias: 'webidl', owner: 'RunDevelopment' },
            wgsl: { title: 'WGSL', owner: 'Dr4gonthree' },
            wiki: { title: 'Wiki markup', require: 'markup', owner: 'Golmote' },
            wolfram: {
              title: 'Wolfram language',
              alias: ['mathematica', 'nb', 'wl'],
              aliasTitles: { mathematica: 'Mathematica', nb: 'Mathematica Notebook' },
              owner: 'msollami',
            },
            wren: { title: 'Wren', owner: 'clsource' },
            xeora: {
              title: 'Xeora',
              require: 'markup',
              alias: 'xeoracube',
              aliasTitles: { xeoracube: 'XeoraCube' },
              owner: 'freakmaxi',
            },
            'xml-doc': {
              title: 'XML doc (.net)',
              require: 'markup',
              modify: ['csharp', 'fsharp', 'vbnet'],
              owner: 'RunDevelopment',
            },
            xojo: { title: 'Xojo (REALbasic)', owner: 'Golmote' },
            xquery: { title: 'XQuery', require: 'markup', owner: 'Golmote' },
            yaml: { title: 'YAML', alias: 'yml', owner: 'hason' },
            yang: { title: 'YANG', owner: 'RunDevelopment' },
            zig: { title: 'Zig', owner: 'RunDevelopment' },
          },
          plugins: {
            meta: { path: 'plugins/{id}/prism-{id}', link: 'plugins/{id}/' },
            'line-highlight': { title: 'Line Highlight', description: 'Highlights specific lines and/or line ranges.' },
            'line-numbers': {
              title: 'Line Numbers',
              description: 'Line number at the beginning of code lines.',
              owner: 'kuba-kubula',
            },
            'show-invisibles': {
              title: 'Show Invisibles',
              description: 'Show hidden characters such as tabs and line breaks.',
              optional: ['autolinker', 'data-uri-highlight'],
            },
            autolinker: {
              title: 'Autolinker',
              description: 'Converts URLs and emails in code to clickable links. Parses Markdown links in comments.',
            },
            wpd: {
              title: 'WebPlatform Docs',
              description:
                'Makes tokens link to <a href="https://webplatform.github.io/docs/">WebPlatform.org documentation</a>. The links open in a new tab.',
            },
            'custom-class': {
              title: 'Custom Class',
              description:
                "This plugin allows you to prefix Prism's default classes (<code>.comment</code> can become <code>.namespace--comment</code>) or replace them with your defined ones (like <code>.editor__comment</code>). You can even add new classes.",
              owner: 'dvkndn',
              noCSS: !0,
            },
            'file-highlight': {
              title: 'File Highlight',
              description: 'Fetch external files and highlight them with Prism. Used on the Prism website itself.',
              noCSS: !0,
            },
            'show-language': {
              title: 'Show Language',
              description: 'Display the highlighted language in code blocks (inline code does not show the label).',
              owner: 'nauzilus',
              noCSS: !0,
              require: 'toolbar',
            },
            'jsonp-highlight': {
              title: 'JSONP Highlight',
              description:
                'Fetch content with JSONP and highlight some interesting content (e.g. GitHub/Gists or Bitbucket API).',
              noCSS: !0,
              owner: 'nauzilus',
            },
            'highlight-keywords': {
              title: 'Highlight Keywords',
              description: 'Adds special CSS classes for each keyword for fine-grained highlighting.',
              owner: 'vkbansal',
              noCSS: !0,
            },
            'remove-initial-line-feed': {
              title: 'Remove initial line feed',
              description: 'Removes the initial line feed in code blocks.',
              owner: 'Golmote',
              noCSS: !0,
            },
            'inline-color': {
              title: 'Inline color',
              description: 'Adds a small inline preview for colors in style sheets.',
              require: 'css-extras',
              owner: 'RunDevelopment',
            },
            previewers: {
              title: 'Previewers',
              description: 'Previewers for angles, colors, gradients, easing and time.',
              require: 'css-extras',
              owner: 'Golmote',
            },
            autoloader: {
              title: 'Autoloader',
              description: 'Automatically loads the needed languages to highlight the code blocks.',
              owner: 'Golmote',
              noCSS: !0,
            },
            'keep-markup': {
              title: 'Keep Markup',
              description: 'Prevents custom markup from being dropped out during highlighting.',
              owner: 'Golmote',
              optional: 'normalize-whitespace',
              noCSS: !0,
            },
            'command-line': {
              title: 'Command Line',
              description:
                'Display a command line with a prompt and, optionally, the output/response from the commands.',
              owner: 'chriswells0',
            },
            'unescaped-markup': {
              title: 'Unescaped Markup',
              description: 'Write markup without having to escape anything.',
            },
            'normalize-whitespace': {
              title: 'Normalize Whitespace',
              description: 'Supports multiple operations to normalize whitespace in code blocks.',
              owner: 'zeitgeist87',
              optional: 'unescaped-markup',
              noCSS: !0,
            },
            'data-uri-highlight': {
              title: 'Data-URI Highlight',
              description: 'Highlights data-URI contents.',
              owner: 'Golmote',
              noCSS: !0,
            },
            toolbar: {
              title: 'Toolbar',
              description: 'Attach a toolbar for plugins to easily register buttons on the top of a code block.',
              owner: 'mAAdhaTTah',
            },
            'copy-to-clipboard': {
              title: 'Copy to Clipboard Button',
              description: 'Add a button that copies the code block to the clipboard when clicked.',
              owner: 'mAAdhaTTah',
              require: 'toolbar',
              noCSS: !0,
            },
            'download-button': {
              title: 'Download Button',
              description: 'A button in the toolbar of a code block adding a convenient way to download a code file.',
              owner: 'Golmote',
              require: 'toolbar',
              noCSS: !0,
            },
            'match-braces': {
              title: 'Match braces',
              description: 'Highlights matching braces.',
              owner: 'RunDevelopment',
            },
            'diff-highlight': {
              title: 'Diff Highlight',
              description: 'Highlights the code inside diff blocks.',
              owner: 'RunDevelopment',
              require: 'diff',
            },
            'filter-highlight-all': {
              title: 'Filter highlightAll',
              description:
                'Filters the elements the <code>highlightAll</code> and <code>highlightAllUnder</code> methods actually highlight.',
              owner: 'RunDevelopment',
              noCSS: !0,
            },
            treeview: {
              title: 'Treeview',
              description: 'A language with special styles to highlight file system tree structures.',
              owner: 'Golmote',
            },
          },
        });
    },
    3916: (e, t, n) => {
      const r = n(9911),
        a = n(4587),
        o = new Set();
      function i(e) {
        void 0 === e ? (e = Object.keys(r.languages).filter(e => 'meta' != e)) : Array.isArray(e) || (e = [e]);
        const t = [...o, ...Object.keys(Prism.languages)];
        a(r, e, t).load(e => {
          if (!(e in r.languages)) return void (i.silent || console.warn('Language does not exist: ' + e));
          const t = './prism-' + e;
          delete n.c[n(3392).resolve(t)], delete Prism.languages[e], n(3392)(t), o.add(e);
        });
      }
      (i.silent = !1), (e.exports = i);
    },
    3392: (e, t, n) => {
      var r = { './': 3916 };
      function a(e) {
        var t = o(e);
        return n(t);
      }
      function o(e) {
        if (!n.o(r, e)) {
          var t = new Error("Cannot find module '" + e + "'");
          throw ((t.code = 'MODULE_NOT_FOUND'), t);
        }
        return r[e];
      }
      (a.keys = function () {
        return Object.keys(r);
      }),
        (a.resolve = o),
        (e.exports = a),
        (a.id = 3392);
    },
    4587: e => {
      'use strict';
      var t = (function () {
        var e = function () {};
        function t(e, t) {
          Array.isArray(e) ? e.forEach(t) : null != e && t(e, 0);
        }
        function n(e) {
          for (var t = {}, n = 0, r = e.length; n < r; n++) t[e[n]] = !0;
          return t;
        }
        function r(e) {
          var n = {},
            r = [];
          function a(r, o) {
            if (!(r in n)) {
              o.push(r);
              var i = o.indexOf(r);
              if (i < o.length - 1) throw new Error('Circular dependency: ' + o.slice(i).join(' -> '));
              var l = {},
                s = e[r];
              if (s) {
                function u(t) {
                  if (!(t in e)) throw new Error(r + ' depends on an unknown component ' + t);
                  if (!(t in l)) for (var i in (a(t, o), (l[t] = !0), n[t])) l[i] = !0;
                }
                t(s.require, u), t(s.optional, u), t(s.modify, u);
              }
              (n[r] = l), o.pop();
            }
          }
          return function (e) {
            var t = n[e];
            return t || (a(e, r), (t = n[e])), t;
          };
        }
        function a(e) {
          for (var t in e) return !0;
          return !1;
        }
        return function (o, i, l) {
          var s = (function (e) {
              var t = {};
              for (var n in e) {
                var r = e[n];
                for (var a in r)
                  if ('meta' != a) {
                    var o = r[a];
                    t[a] = 'string' == typeof o ? { title: o } : o;
                  }
              }
              return t;
            })(o),
            u = (function (e) {
              var n;
              return function (r) {
                if (r in e) return r;
                if (!n)
                  for (var a in ((n = {}), e)) {
                    var o = e[a];
                    t(o && o.alias, function (t) {
                      if (t in n) throw new Error(t + ' cannot be alias for both ' + a + ' and ' + n[t]);
                      if (t in e) throw new Error(t + ' cannot be alias of ' + a + ' because it is a component.');
                      n[t] = a;
                    });
                  }
                return n[r] || r;
              };
            })(s);
          (i = i.map(u)), (l = (l || []).map(u));
          var c = n(i),
            d = n(l);
          i.forEach(function e(n) {
            var r = s[n];
            t(r && r.require, function (t) {
              t in d || ((c[t] = !0), e(t));
            });
          });
          for (var f, p = r(s), m = c; a(m); ) {
            for (var g in ((f = {}), m)) {
              var h = s[g];
              t(h && h.modify, function (e) {
                e in d && (f[e] = !0);
              });
            }
            for (var v in d)
              if (!(v in c))
                for (var b in p(v))
                  if (b in c) {
                    f[v] = !0;
                    break;
                  }
            for (var y in (m = f)) c[y] = !0;
          }
          var w = {
            getIds: function () {
              var e = [];
              return (
                w.load(function (t) {
                  e.push(t);
                }),
                e
              );
            },
            load: function (t, n) {
              return (function (t, n, r, a) {
                var o = a ? a.series : void 0,
                  i = a ? a.parallel : e,
                  l = {},
                  s = {};
                function u(e) {
                  if (e in l) return l[e];
                  s[e] = !0;
                  var a,
                    c = [];
                  for (var d in t(e)) d in n && c.push(d);
                  if (0 === c.length) a = r(e);
                  else {
                    var f = i(
                      c.map(function (e) {
                        var t = u(e);
                        return delete s[e], t;
                      })
                    );
                    o
                      ? (a = o(f, function () {
                          return r(e);
                        }))
                      : r(e);
                  }
                  return (l[e] = a);
                }
                for (var c in n) u(c);
                var d = [];
                for (var f in s) d.push(l[f]);
                return i(d);
              })(p, c, t, n);
            },
          };
          return w;
        };
      })();
      e.exports = t;
    },
    8772: (e, t, n) => {
      'use strict';
      var r = n(331);
      function a() {}
      function o() {}
      (o.resetWarningCache = a),
        (e.exports = function () {
          function e(e, t, n, a, o, i) {
            if (i !== r) {
              var l = new Error(
                'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types'
              );
              throw ((l.name = 'Invariant Violation'), l);
            }
          }
          function t() {
            return e;
          }
          e.isRequired = e;
          var n = {
            array: e,
            bigint: e,
            bool: e,
            func: e,
            number: e,
            object: e,
            string: e,
            symbol: e,
            any: e,
            arrayOf: t,
            element: e,
            elementType: e,
            instanceOf: t,
            node: e,
            objectOf: t,
            oneOf: t,
            oneOfType: t,
            shape: t,
            exact: t,
            checkPropTypes: o,
            resetWarningCache: a,
          };
          return (n.PropTypes = n), n;
        });
    },
    3615: (e, t, n) => {
      e.exports = n(8772)();
    },
    331: e => {
      'use strict';
      e.exports = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
    },
    3577: (e, t, n) => {
      'use strict';
      var r = n(7378),
        a = n(1102);
      function o(e) {
        for (var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e, n = 1; n < arguments.length; n++)
          t += '&args[]=' + encodeURIComponent(arguments[n]);
        return (
          'Minified React error #' +
          e +
          '; visit ' +
          t +
          ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
        );
      }
      var i = new Set(),
        l = {};
      function s(e, t) {
        u(e, t), u(e + 'Capture', t);
      }
      function u(e, t) {
        for (l[e] = t, e = 0; e < t.length; e++) i.add(t[e]);
      }
      var c = !('undefined' == typeof window || void 0 === window.document || void 0 === window.document.createElement),
        d = Object.prototype.hasOwnProperty,
        f =
          /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
        p = {},
        m = {};
      function g(e, t, n, r, a, o, i) {
        (this.acceptsBooleans = 2 === t || 3 === t || 4 === t),
          (this.attributeName = r),
          (this.attributeNamespace = a),
          (this.mustUseProperty = n),
          (this.propertyName = e),
          (this.type = t),
          (this.sanitizeURL = o),
          (this.removeEmptyString = i);
      }
      var h = {};
      'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
        .split(' ')
        .forEach(function (e) {
          h[e] = new g(e, 0, !1, e, null, !1, !1);
        }),
        [
          ['acceptCharset', 'accept-charset'],
          ['className', 'class'],
          ['htmlFor', 'for'],
          ['httpEquiv', 'http-equiv'],
        ].forEach(function (e) {
          var t = e[0];
          h[t] = new g(t, 1, !1, e[1], null, !1, !1);
        }),
        ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (e) {
          h[e] = new g(e, 2, !1, e.toLowerCase(), null, !1, !1);
        }),
        ['autoReverse', 'externalResourcesRequired', 'focusable', 'preserveAlpha'].forEach(function (e) {
          h[e] = new g(e, 2, !1, e, null, !1, !1);
        }),
        'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
          .split(' ')
          .forEach(function (e) {
            h[e] = new g(e, 3, !1, e.toLowerCase(), null, !1, !1);
          }),
        ['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
          h[e] = new g(e, 3, !0, e, null, !1, !1);
        }),
        ['capture', 'download'].forEach(function (e) {
          h[e] = new g(e, 4, !1, e, null, !1, !1);
        }),
        ['cols', 'rows', 'size', 'span'].forEach(function (e) {
          h[e] = new g(e, 6, !1, e, null, !1, !1);
        }),
        ['rowSpan', 'start'].forEach(function (e) {
          h[e] = new g(e, 5, !1, e.toLowerCase(), null, !1, !1);
        });
      var v = /[\-:]([a-z])/g;
      function b(e) {
        return e[1].toUpperCase();
      }
      function y(e, t, n, r) {
        var a = h.hasOwnProperty(t) ? h[t] : null;
        (null !== a
          ? 0 !== a.type
          : r || !(2 < t.length) || ('o' !== t[0] && 'O' !== t[0]) || ('n' !== t[1] && 'N' !== t[1])) &&
          ((function (e, t, n, r) {
            if (
              null == t ||
              (function (e, t, n, r) {
                if (null !== n && 0 === n.type) return !1;
                switch (typeof t) {
                  case 'function':
                  case 'symbol':
                    return !0;
                  case 'boolean':
                    return (
                      !r &&
                      (null !== n ? !n.acceptsBooleans : 'data-' !== (e = e.toLowerCase().slice(0, 5)) && 'aria-' !== e)
                    );
                  default:
                    return !1;
                }
              })(e, t, n, r)
            )
              return !0;
            if (r) return !1;
            if (null !== n)
              switch (n.type) {
                case 3:
                  return !t;
                case 4:
                  return !1 === t;
                case 5:
                  return isNaN(t);
                case 6:
                  return isNaN(t) || 1 > t;
              }
            return !1;
          })(t, n, a, r) && (n = null),
          r || null === a
            ? (function (e) {
                return !!d.call(m, e) || (!d.call(p, e) && (f.test(e) ? (m[e] = !0) : ((p[e] = !0), !1)));
              })(t) && (null === n ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
            : a.mustUseProperty
            ? (e[a.propertyName] = null === n ? 3 !== a.type && '' : n)
            : ((t = a.attributeName),
              (r = a.attributeNamespace),
              null === n
                ? e.removeAttribute(t)
                : ((n = 3 === (a = a.type) || (4 === a && !0 === n) ? '' : '' + n),
                  r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
      }
      'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
        .split(' ')
        .forEach(function (e) {
          var t = e.replace(v, b);
          h[t] = new g(t, 1, !1, e, null, !1, !1);
        }),
        'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'.split(' ').forEach(function (e) {
          var t = e.replace(v, b);
          h[t] = new g(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
        }),
        ['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
          var t = e.replace(v, b);
          h[t] = new g(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1);
        }),
        ['tabIndex', 'crossOrigin'].forEach(function (e) {
          h[e] = new g(e, 1, !1, e.toLowerCase(), null, !1, !1);
        }),
        (h.xlinkHref = new g('xlinkHref', 1, !1, 'xlink:href', 'http://www.w3.org/1999/xlink', !0, !1)),
        ['src', 'href', 'action', 'formAction'].forEach(function (e) {
          h[e] = new g(e, 1, !1, e.toLowerCase(), null, !0, !0);
        });
      var w = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
        k = Symbol.for('react.element'),
        E = Symbol.for('react.portal'),
        S = Symbol.for('react.fragment'),
        x = Symbol.for('react.strict_mode'),
        C = Symbol.for('react.profiler'),
        T = Symbol.for('react.provider'),
        _ = Symbol.for('react.context'),
        L = Symbol.for('react.forward_ref'),
        A = Symbol.for('react.suspense'),
        N = Symbol.for('react.suspense_list'),
        R = Symbol.for('react.memo'),
        P = Symbol.for('react.lazy');
      Symbol.for('react.scope'), Symbol.for('react.debug_trace_mode');
      var O = Symbol.for('react.offscreen');
      Symbol.for('react.legacy_hidden'), Symbol.for('react.cache'), Symbol.for('react.tracing_marker');
      var D = Symbol.iterator;
      function I(e) {
        return null === e || 'object' != typeof e
          ? null
          : 'function' == typeof (e = (D && e[D]) || e['@@iterator'])
          ? e
          : null;
      }
      var M,
        F = Object.assign;
      function B(e) {
        if (void 0 === M)
          try {
            throw Error();
          } catch (n) {
            var t = n.stack.trim().match(/\n( *(at )?)/);
            M = (t && t[1]) || '';
          }
        return '\n' + M + e;
      }
      var z = !1;
      function j(e, t) {
        if (!e || z) return '';
        z = !0;
        var n = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
          if (t)
            if (
              ((t = function () {
                throw Error();
              }),
              Object.defineProperty(t.prototype, 'props', {
                set: function () {
                  throw Error();
                },
              }),
              'object' == typeof Reflect && Reflect.construct)
            ) {
              try {
                Reflect.construct(t, []);
              } catch (u) {
                var r = u;
              }
              Reflect.construct(e, [], t);
            } else {
              try {
                t.call();
              } catch (u) {
                r = u;
              }
              e.call(t.prototype);
            }
          else {
            try {
              throw Error();
            } catch (u) {
              r = u;
            }
            e();
          }
        } catch (u) {
          if (u && r && 'string' == typeof u.stack) {
            for (
              var a = u.stack.split('\n'), o = r.stack.split('\n'), i = a.length - 1, l = o.length - 1;
              1 <= i && 0 <= l && a[i] !== o[l];

            )
              l--;
            for (; 1 <= i && 0 <= l; i--, l--)
              if (a[i] !== o[l]) {
                if (1 !== i || 1 !== l)
                  do {
                    if ((i--, 0 > --l || a[i] !== o[l])) {
                      var s = '\n' + a[i].replace(' at new ', ' at ');
                      return (
                        e.displayName && s.includes('<anonymous>') && (s = s.replace('<anonymous>', e.displayName)), s
                      );
                    }
                  } while (1 <= i && 0 <= l);
                break;
              }
          }
        } finally {
          (z = !1), (Error.prepareStackTrace = n);
        }
        return (e = e ? e.displayName || e.name : '') ? B(e) : '';
      }
      function U(e) {
        switch (e.tag) {
          case 5:
            return B(e.type);
          case 16:
            return B('Lazy');
          case 13:
            return B('Suspense');
          case 19:
            return B('SuspenseList');
          case 0:
          case 2:
          case 15:
            return (e = j(e.type, !1));
          case 11:
            return (e = j(e.type.render, !1));
          case 1:
            return (e = j(e.type, !0));
          default:
            return '';
        }
      }
      function $(e) {
        if (null == e) return null;
        if ('function' == typeof e) return e.displayName || e.name || null;
        if ('string' == typeof e) return e;
        switch (e) {
          case S:
            return 'Fragment';
          case E:
            return 'Portal';
          case C:
            return 'Profiler';
          case x:
            return 'StrictMode';
          case A:
            return 'Suspense';
          case N:
            return 'SuspenseList';
        }
        if ('object' == typeof e)
          switch (e.$$typeof) {
            case _:
              return (e.displayName || 'Context') + '.Consumer';
            case T:
              return (e._context.displayName || 'Context') + '.Provider';
            case L:
              var t = e.render;
              return (
                (e = e.displayName) ||
                  (e = '' !== (e = t.displayName || t.name || '') ? 'ForwardRef(' + e + ')' : 'ForwardRef'),
                e
              );
            case R:
              return null !== (t = e.displayName || null) ? t : $(e.type) || 'Memo';
            case P:
              (t = e._payload), (e = e._init);
              try {
                return $(e(t));
              } catch (n) {}
          }
        return null;
      }
      function H(e) {
        var t = e.type;
        switch (e.tag) {
          case 24:
            return 'Cache';
          case 9:
            return (t.displayName || 'Context') + '.Consumer';
          case 10:
            return (t._context.displayName || 'Context') + '.Provider';
          case 18:
            return 'DehydratedFragment';
          case 11:
            return (
              (e = (e = t.render).displayName || e.name || ''),
              t.displayName || ('' !== e ? 'ForwardRef(' + e + ')' : 'ForwardRef')
            );
          case 7:
            return 'Fragment';
          case 5:
            return t;
          case 4:
            return 'Portal';
          case 3:
            return 'Root';
          case 6:
            return 'Text';
          case 16:
            return $(t);
          case 8:
            return t === x ? 'StrictMode' : 'Mode';
          case 22:
            return 'Offscreen';
          case 12:
            return 'Profiler';
          case 21:
            return 'Scope';
          case 13:
            return 'Suspense';
          case 19:
            return 'SuspenseList';
          case 25:
            return 'TracingMarker';
          case 1:
          case 0:
          case 17:
          case 2:
          case 14:
          case 15:
            if ('function' == typeof t) return t.displayName || t.name || null;
            if ('string' == typeof t) return t;
        }
        return null;
      }
      function q(e) {
        switch (typeof e) {
          case 'boolean':
          case 'number':
          case 'string':
          case 'undefined':
          case 'object':
            return e;
          default:
            return '';
        }
      }
      function G(e) {
        var t = e.type;
        return (e = e.nodeName) && 'input' === e.toLowerCase() && ('checkbox' === t || 'radio' === t);
      }
      function Z(e) {
        e._valueTracker ||
          (e._valueTracker = (function (e) {
            var t = G(e) ? 'checked' : 'value',
              n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
              r = '' + e[t];
            if (!e.hasOwnProperty(t) && void 0 !== n && 'function' == typeof n.get && 'function' == typeof n.set) {
              var a = n.get,
                o = n.set;
              return (
                Object.defineProperty(e, t, {
                  configurable: !0,
                  get: function () {
                    return a.call(this);
                  },
                  set: function (e) {
                    (r = '' + e), o.call(this, e);
                  },
                }),
                Object.defineProperty(e, t, { enumerable: n.enumerable }),
                {
                  getValue: function () {
                    return r;
                  },
                  setValue: function (e) {
                    r = '' + e;
                  },
                  stopTracking: function () {
                    (e._valueTracker = null), delete e[t];
                  },
                }
              );
            }
          })(e));
      }
      function V(e) {
        if (!e) return !1;
        var t = e._valueTracker;
        if (!t) return !0;
        var n = t.getValue(),
          r = '';
        return e && (r = G(e) ? (e.checked ? 'true' : 'false') : e.value), (e = r) !== n && (t.setValue(e), !0);
      }
      function W(e) {
        if (void 0 === (e = e || ('undefined' != typeof document ? document : void 0))) return null;
        try {
          return e.activeElement || e.body;
        } catch (t) {
          return e.body;
        }
      }
      function K(e, t) {
        var n = t.checked;
        return F({}, t, {
          defaultChecked: void 0,
          defaultValue: void 0,
          value: void 0,
          checked: null != n ? n : e._wrapperState.initialChecked,
        });
      }
      function Q(e, t) {
        var n = null == t.defaultValue ? '' : t.defaultValue,
          r = null != t.checked ? t.checked : t.defaultChecked;
        (n = q(null != t.value ? t.value : n)),
          (e._wrapperState = {
            initialChecked: r,
            initialValue: n,
            controlled: 'checkbox' === t.type || 'radio' === t.type ? null != t.checked : null != t.value,
          });
      }
      function Y(e, t) {
        null != (t = t.checked) && y(e, 'checked', t, !1);
      }
      function X(e, t) {
        Y(e, t);
        var n = q(t.value),
          r = t.type;
        if (null != n)
          'number' === r
            ? ((0 === n && '' === e.value) || e.value != n) && (e.value = '' + n)
            : e.value !== '' + n && (e.value = '' + n);
        else if ('submit' === r || 'reset' === r) return void e.removeAttribute('value');
        t.hasOwnProperty('value')
          ? ee(e, t.type, n)
          : t.hasOwnProperty('defaultValue') && ee(e, t.type, q(t.defaultValue)),
          null == t.checked && null != t.defaultChecked && (e.defaultChecked = !!t.defaultChecked);
      }
      function J(e, t, n) {
        if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
          var r = t.type;
          if (!(('submit' !== r && 'reset' !== r) || (void 0 !== t.value && null !== t.value))) return;
          (t = '' + e._wrapperState.initialValue), n || t === e.value || (e.value = t), (e.defaultValue = t);
        }
        '' !== (n = e.name) && (e.name = ''),
          (e.defaultChecked = !!e._wrapperState.initialChecked),
          '' !== n && (e.name = n);
      }
      function ee(e, t, n) {
        ('number' === t && W(e.ownerDocument) === e) ||
          (null == n
            ? (e.defaultValue = '' + e._wrapperState.initialValue)
            : e.defaultValue !== '' + n && (e.defaultValue = '' + n));
      }
      var te = Array.isArray;
      function ne(e, t, n, r) {
        if (((e = e.options), t)) {
          t = {};
          for (var a = 0; a < n.length; a++) t['$' + n[a]] = !0;
          for (n = 0; n < e.length; n++)
            (a = t.hasOwnProperty('$' + e[n].value)),
              e[n].selected !== a && (e[n].selected = a),
              a && r && (e[n].defaultSelected = !0);
        } else {
          for (n = '' + q(n), t = null, a = 0; a < e.length; a++) {
            if (e[a].value === n) return (e[a].selected = !0), void (r && (e[a].defaultSelected = !0));
            null !== t || e[a].disabled || (t = e[a]);
          }
          null !== t && (t.selected = !0);
        }
      }
      function re(e, t) {
        if (null != t.dangerouslySetInnerHTML) throw Error(o(91));
        return F({}, t, { value: void 0, defaultValue: void 0, children: '' + e._wrapperState.initialValue });
      }
      function ae(e, t) {
        var n = t.value;
        if (null == n) {
          if (((n = t.children), (t = t.defaultValue), null != n)) {
            if (null != t) throw Error(o(92));
            if (te(n)) {
              if (1 < n.length) throw Error(o(93));
              n = n[0];
            }
            t = n;
          }
          null == t && (t = ''), (n = t);
        }
        e._wrapperState = { initialValue: q(n) };
      }
      function oe(e, t) {
        var n = q(t.value),
          r = q(t.defaultValue);
        null != n &&
          ((n = '' + n) !== e.value && (e.value = n),
          null == t.defaultValue && e.defaultValue !== n && (e.defaultValue = n)),
          null != r && (e.defaultValue = '' + r);
      }
      function ie(e) {
        var t = e.textContent;
        t === e._wrapperState.initialValue && '' !== t && null !== t && (e.value = t);
      }
      function le(e) {
        switch (e) {
          case 'svg':
            return 'http://www.w3.org/2000/svg';
          case 'math':
            return 'http://www.w3.org/1998/Math/MathML';
          default:
            return 'http://www.w3.org/1999/xhtml';
        }
      }
      function se(e, t) {
        return null == e || 'http://www.w3.org/1999/xhtml' === e
          ? le(t)
          : 'http://www.w3.org/2000/svg' === e && 'foreignObject' === t
          ? 'http://www.w3.org/1999/xhtml'
          : e;
      }
      var ue,
        ce,
        de =
          ((ce = function (e, t) {
            if ('http://www.w3.org/2000/svg' !== e.namespaceURI || 'innerHTML' in e) e.innerHTML = t;
            else {
              for (
                (ue = ue || document.createElement('div')).innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
                  t = ue.firstChild;
                e.firstChild;

              )
                e.removeChild(e.firstChild);
              for (; t.firstChild; ) e.appendChild(t.firstChild);
            }
          }),
          'undefined' != typeof MSApp && MSApp.execUnsafeLocalFunction
            ? function (e, t, n, r) {
                MSApp.execUnsafeLocalFunction(function () {
                  return ce(e, t);
                });
              }
            : ce);
      function fe(e, t) {
        if (t) {
          var n = e.firstChild;
          if (n && n === e.lastChild && 3 === n.nodeType) return void (n.nodeValue = t);
        }
        e.textContent = t;
      }
      var pe = {
          animationIterationCount: !0,
          aspectRatio: !0,
          borderImageOutset: !0,
          borderImageSlice: !0,
          borderImageWidth: !0,
          boxFlex: !0,
          boxFlexGroup: !0,
          boxOrdinalGroup: !0,
          columnCount: !0,
          columns: !0,
          flex: !0,
          flexGrow: !0,
          flexPositive: !0,
          flexShrink: !0,
          flexNegative: !0,
          flexOrder: !0,
          gridArea: !0,
          gridRow: !0,
          gridRowEnd: !0,
          gridRowSpan: !0,
          gridRowStart: !0,
          gridColumn: !0,
          gridColumnEnd: !0,
          gridColumnSpan: !0,
          gridColumnStart: !0,
          fontWeight: !0,
          lineClamp: !0,
          lineHeight: !0,
          opacity: !0,
          order: !0,
          orphans: !0,
          tabSize: !0,
          widows: !0,
          zIndex: !0,
          zoom: !0,
          fillOpacity: !0,
          floodOpacity: !0,
          stopOpacity: !0,
          strokeDasharray: !0,
          strokeDashoffset: !0,
          strokeMiterlimit: !0,
          strokeOpacity: !0,
          strokeWidth: !0,
        },
        me = ['Webkit', 'ms', 'Moz', 'O'];
      function ge(e, t, n) {
        return null == t || 'boolean' == typeof t || '' === t
          ? ''
          : n || 'number' != typeof t || 0 === t || (pe.hasOwnProperty(e) && pe[e])
          ? ('' + t).trim()
          : t + 'px';
      }
      function he(e, t) {
        for (var n in ((e = e.style), t))
          if (t.hasOwnProperty(n)) {
            var r = 0 === n.indexOf('--'),
              a = ge(n, t[n], r);
            'float' === n && (n = 'cssFloat'), r ? e.setProperty(n, a) : (e[n] = a);
          }
      }
      Object.keys(pe).forEach(function (e) {
        me.forEach(function (t) {
          (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (pe[t] = pe[e]);
        });
      });
      var ve = F(
        { menuitem: !0 },
        {
          area: !0,
          base: !0,
          br: !0,
          col: !0,
          embed: !0,
          hr: !0,
          img: !0,
          input: !0,
          keygen: !0,
          link: !0,
          meta: !0,
          param: !0,
          source: !0,
          track: !0,
          wbr: !0,
        }
      );
      function be(e, t) {
        if (t) {
          if (ve[e] && (null != t.children || null != t.dangerouslySetInnerHTML)) throw Error(o(137, e));
          if (null != t.dangerouslySetInnerHTML) {
            if (null != t.children) throw Error(o(60));
            if ('object' != typeof t.dangerouslySetInnerHTML || !('__html' in t.dangerouslySetInnerHTML))
              throw Error(o(61));
          }
          if (null != t.style && 'object' != typeof t.style) throw Error(o(62));
        }
      }
      function ye(e, t) {
        if (-1 === e.indexOf('-')) return 'string' == typeof t.is;
        switch (e) {
          case 'annotation-xml':
          case 'color-profile':
          case 'font-face':
          case 'font-face-src':
          case 'font-face-uri':
          case 'font-face-format':
          case 'font-face-name':
          case 'missing-glyph':
            return !1;
          default:
            return !0;
        }
      }
      var we = null;
      function ke(e) {
        return (
          (e = e.target || e.srcElement || window).correspondingUseElement && (e = e.correspondingUseElement),
          3 === e.nodeType ? e.parentNode : e
        );
      }
      var Ee = null,
        Se = null,
        xe = null;
      function Ce(e) {
        if ((e = ya(e))) {
          if ('function' != typeof Ee) throw Error(o(280));
          var t = e.stateNode;
          t && ((t = ka(t)), Ee(e.stateNode, e.type, t));
        }
      }
      function Te(e) {
        Se ? (xe ? xe.push(e) : (xe = [e])) : (Se = e);
      }
      function _e() {
        if (Se) {
          var e = Se,
            t = xe;
          if (((xe = Se = null), Ce(e), t)) for (e = 0; e < t.length; e++) Ce(t[e]);
        }
      }
      function Le(e, t) {
        return e(t);
      }
      function Ae() {}
      var Ne = !1;
      function Re(e, t, n) {
        if (Ne) return e(t, n);
        Ne = !0;
        try {
          return Le(e, t, n);
        } finally {
          (Ne = !1), (null !== Se || null !== xe) && (Ae(), _e());
        }
      }
      function Pe(e, t) {
        var n = e.stateNode;
        if (null === n) return null;
        var r = ka(n);
        if (null === r) return null;
        n = r[t];
        e: switch (t) {
          case 'onClick':
          case 'onClickCapture':
          case 'onDoubleClick':
          case 'onDoubleClickCapture':
          case 'onMouseDown':
          case 'onMouseDownCapture':
          case 'onMouseMove':
          case 'onMouseMoveCapture':
          case 'onMouseUp':
          case 'onMouseUpCapture':
          case 'onMouseEnter':
            (r = !r.disabled) ||
              (r = !('button' === (e = e.type) || 'input' === e || 'select' === e || 'textarea' === e)),
              (e = !r);
            break e;
          default:
            e = !1;
        }
        if (e) return null;
        if (n && 'function' != typeof n) throw Error(o(231, t, typeof n));
        return n;
      }
      var Oe = !1;
      if (c)
        try {
          var De = {};
          Object.defineProperty(De, 'passive', {
            get: function () {
              Oe = !0;
            },
          }),
            window.addEventListener('test', De, De),
            window.removeEventListener('test', De, De);
        } catch (ce) {
          Oe = !1;
        }
      function Ie(e, t, n, r, a, o, i, l, s) {
        var u = Array.prototype.slice.call(arguments, 3);
        try {
          t.apply(n, u);
        } catch (c) {
          this.onError(c);
        }
      }
      var Me = !1,
        Fe = null,
        Be = !1,
        ze = null,
        je = {
          onError: function (e) {
            (Me = !0), (Fe = e);
          },
        };
      function Ue(e, t, n, r, a, o, i, l, s) {
        (Me = !1), (Fe = null), Ie.apply(je, arguments);
      }
      function $e(e) {
        var t = e,
          n = e;
        if (e.alternate) for (; t.return; ) t = t.return;
        else {
          e = t;
          do {
            0 != (4098 & (t = e).flags) && (n = t.return), (e = t.return);
          } while (e);
        }
        return 3 === t.tag ? n : null;
      }
      function He(e) {
        if (13 === e.tag) {
          var t = e.memoizedState;
          if ((null === t && null !== (e = e.alternate) && (t = e.memoizedState), null !== t)) return t.dehydrated;
        }
        return null;
      }
      function qe(e) {
        if ($e(e) !== e) throw Error(o(188));
      }
      function Ge(e) {
        return null !==
          (e = (function (e) {
            var t = e.alternate;
            if (!t) {
              if (null === (t = $e(e))) throw Error(o(188));
              return t !== e ? null : e;
            }
            for (var n = e, r = t; ; ) {
              var a = n.return;
              if (null === a) break;
              var i = a.alternate;
              if (null === i) {
                if (null !== (r = a.return)) {
                  n = r;
                  continue;
                }
                break;
              }
              if (a.child === i.child) {
                for (i = a.child; i; ) {
                  if (i === n) return qe(a), e;
                  if (i === r) return qe(a), t;
                  i = i.sibling;
                }
                throw Error(o(188));
              }
              if (n.return !== r.return) (n = a), (r = i);
              else {
                for (var l = !1, s = a.child; s; ) {
                  if (s === n) {
                    (l = !0), (n = a), (r = i);
                    break;
                  }
                  if (s === r) {
                    (l = !0), (r = a), (n = i);
                    break;
                  }
                  s = s.sibling;
                }
                if (!l) {
                  for (s = i.child; s; ) {
                    if (s === n) {
                      (l = !0), (n = i), (r = a);
                      break;
                    }
                    if (s === r) {
                      (l = !0), (r = i), (n = a);
                      break;
                    }
                    s = s.sibling;
                  }
                  if (!l) throw Error(o(189));
                }
              }
              if (n.alternate !== r) throw Error(o(190));
            }
            if (3 !== n.tag) throw Error(o(188));
            return n.stateNode.current === n ? e : t;
          })(e))
          ? Ze(e)
          : null;
      }
      function Ze(e) {
        if (5 === e.tag || 6 === e.tag) return e;
        for (e = e.child; null !== e; ) {
          var t = Ze(e);
          if (null !== t) return t;
          e = e.sibling;
        }
        return null;
      }
      var Ve = a.unstable_scheduleCallback,
        We = a.unstable_cancelCallback,
        Ke = a.unstable_shouldYield,
        Qe = a.unstable_requestPaint,
        Ye = a.unstable_now,
        Xe = a.unstable_getCurrentPriorityLevel,
        Je = a.unstable_ImmediatePriority,
        et = a.unstable_UserBlockingPriority,
        tt = a.unstable_NormalPriority,
        nt = a.unstable_LowPriority,
        rt = a.unstable_IdlePriority,
        at = null,
        ot = null;
      var it = Math.clz32
          ? Math.clz32
          : function (e) {
              return (e >>>= 0), 0 === e ? 32 : (31 - ((lt(e) / st) | 0)) | 0;
            },
        lt = Math.log,
        st = Math.LN2;
      var ut = 64,
        ct = 4194304;
      function dt(e) {
        switch (e & -e) {
          case 1:
            return 1;
          case 2:
            return 2;
          case 4:
            return 4;
          case 8:
            return 8;
          case 16:
            return 16;
          case 32:
            return 32;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return 4194240 & e;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return 130023424 & e;
          case 134217728:
            return 134217728;
          case 268435456:
            return 268435456;
          case 536870912:
            return 536870912;
          case 1073741824:
            return 1073741824;
          default:
            return e;
        }
      }
      function ft(e, t) {
        var n = e.pendingLanes;
        if (0 === n) return 0;
        var r = 0,
          a = e.suspendedLanes,
          o = e.pingedLanes,
          i = 268435455 & n;
        if (0 !== i) {
          var l = i & ~a;
          0 !== l ? (r = dt(l)) : 0 !== (o &= i) && (r = dt(o));
        } else 0 !== (i = n & ~a) ? (r = dt(i)) : 0 !== o && (r = dt(o));
        if (0 === r) return 0;
        if (0 !== t && t !== r && 0 == (t & a) && ((a = r & -r) >= (o = t & -t) || (16 === a && 0 != (4194240 & o))))
          return t;
        if ((0 != (4 & r) && (r |= 16 & n), 0 !== (t = e.entangledLanes)))
          for (e = e.entanglements, t &= r; 0 < t; ) (a = 1 << (n = 31 - it(t))), (r |= e[n]), (t &= ~a);
        return r;
      }
      function pt(e, t) {
        switch (e) {
          case 1:
          case 2:
          case 4:
            return t + 250;
          case 8:
          case 16:
          case 32:
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return t + 5e3;
          default:
            return -1;
        }
      }
      function mt(e) {
        return 0 !== (e = -1073741825 & e.pendingLanes) ? e : 1073741824 & e ? 1073741824 : 0;
      }
      function gt() {
        var e = ut;
        return 0 == (4194240 & (ut <<= 1)) && (ut = 64), e;
      }
      function ht(e) {
        for (var t = [], n = 0; 31 > n; n++) t.push(e);
        return t;
      }
      function vt(e, t, n) {
        (e.pendingLanes |= t),
          536870912 !== t && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
          ((e = e.eventTimes)[(t = 31 - it(t))] = n);
      }
      function bt(e, t) {
        var n = (e.entangledLanes |= t);
        for (e = e.entanglements; n; ) {
          var r = 31 - it(n),
            a = 1 << r;
          (a & t) | (e[r] & t) && (e[r] |= t), (n &= ~a);
        }
      }
      var yt = 0;
      function wt(e) {
        return 1 < (e &= -e) ? (4 < e ? (0 != (268435455 & e) ? 16 : 536870912) : 4) : 1;
      }
      var kt,
        Et,
        St,
        xt,
        Ct,
        Tt = !1,
        _t = [],
        Lt = null,
        At = null,
        Nt = null,
        Rt = new Map(),
        Pt = new Map(),
        Ot = [],
        Dt =
          'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
            ' '
          );
      function It(e, t) {
        switch (e) {
          case 'focusin':
          case 'focusout':
            Lt = null;
            break;
          case 'dragenter':
          case 'dragleave':
            At = null;
            break;
          case 'mouseover':
          case 'mouseout':
            Nt = null;
            break;
          case 'pointerover':
          case 'pointerout':
            Rt.delete(t.pointerId);
            break;
          case 'gotpointercapture':
          case 'lostpointercapture':
            Pt.delete(t.pointerId);
        }
      }
      function Mt(e, t, n, r, a, o) {
        return null === e || e.nativeEvent !== o
          ? ((e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [a] }),
            null !== t && null !== (t = ya(t)) && Et(t),
            e)
          : ((e.eventSystemFlags |= r), (t = e.targetContainers), null !== a && -1 === t.indexOf(a) && t.push(a), e);
      }
      function Ft(e) {
        var t = ba(e.target);
        if (null !== t) {
          var n = $e(t);
          if (null !== n)
            if (13 === (t = n.tag)) {
              if (null !== (t = He(n)))
                return (
                  (e.blockedOn = t),
                  void Ct(e.priority, function () {
                    St(n);
                  })
                );
            } else if (3 === t && n.stateNode.current.memoizedState.isDehydrated)
              return void (e.blockedOn = 3 === n.tag ? n.stateNode.containerInfo : null);
        }
        e.blockedOn = null;
      }
      function Bt(e) {
        if (null !== e.blockedOn) return !1;
        for (var t = e.targetContainers; 0 < t.length; ) {
          var n = Kt(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
          if (null !== n) return null !== (t = ya(n)) && Et(t), (e.blockedOn = n), !1;
          var r = new (n = e.nativeEvent).constructor(n.type, n);
          (we = r), n.target.dispatchEvent(r), (we = null), t.shift();
        }
        return !0;
      }
      function zt(e, t, n) {
        Bt(e) && n.delete(t);
      }
      function jt() {
        (Tt = !1),
          null !== Lt && Bt(Lt) && (Lt = null),
          null !== At && Bt(At) && (At = null),
          null !== Nt && Bt(Nt) && (Nt = null),
          Rt.forEach(zt),
          Pt.forEach(zt);
      }
      function Ut(e, t) {
        e.blockedOn === t &&
          ((e.blockedOn = null), Tt || ((Tt = !0), a.unstable_scheduleCallback(a.unstable_NormalPriority, jt)));
      }
      function $t(e) {
        function t(t) {
          return Ut(t, e);
        }
        if (0 < _t.length) {
          Ut(_t[0], e);
          for (var n = 1; n < _t.length; n++) {
            var r = _t[n];
            r.blockedOn === e && (r.blockedOn = null);
          }
        }
        for (
          null !== Lt && Ut(Lt, e),
            null !== At && Ut(At, e),
            null !== Nt && Ut(Nt, e),
            Rt.forEach(t),
            Pt.forEach(t),
            n = 0;
          n < Ot.length;
          n++
        )
          (r = Ot[n]).blockedOn === e && (r.blockedOn = null);
        for (; 0 < Ot.length && null === (n = Ot[0]).blockedOn; ) Ft(n), null === n.blockedOn && Ot.shift();
      }
      var Ht = w.ReactCurrentBatchConfig,
        qt = !0;
      function Gt(e, t, n, r) {
        var a = yt,
          o = Ht.transition;
        Ht.transition = null;
        try {
          (yt = 1), Vt(e, t, n, r);
        } finally {
          (yt = a), (Ht.transition = o);
        }
      }
      function Zt(e, t, n, r) {
        var a = yt,
          o = Ht.transition;
        Ht.transition = null;
        try {
          (yt = 4), Vt(e, t, n, r);
        } finally {
          (yt = a), (Ht.transition = o);
        }
      }
      function Vt(e, t, n, r) {
        if (qt) {
          var a = Kt(e, t, n, r);
          if (null === a) qr(e, t, r, Wt, n), It(e, r);
          else if (
            (function (e, t, n, r, a) {
              switch (t) {
                case 'focusin':
                  return (Lt = Mt(Lt, e, t, n, r, a)), !0;
                case 'dragenter':
                  return (At = Mt(At, e, t, n, r, a)), !0;
                case 'mouseover':
                  return (Nt = Mt(Nt, e, t, n, r, a)), !0;
                case 'pointerover':
                  var o = a.pointerId;
                  return Rt.set(o, Mt(Rt.get(o) || null, e, t, n, r, a)), !0;
                case 'gotpointercapture':
                  return (o = a.pointerId), Pt.set(o, Mt(Pt.get(o) || null, e, t, n, r, a)), !0;
              }
              return !1;
            })(a, e, t, n, r)
          )
            r.stopPropagation();
          else if ((It(e, r), 4 & t && -1 < Dt.indexOf(e))) {
            for (; null !== a; ) {
              var o = ya(a);
              if ((null !== o && kt(o), null === (o = Kt(e, t, n, r)) && qr(e, t, r, Wt, n), o === a)) break;
              a = o;
            }
            null !== a && r.stopPropagation();
          } else qr(e, t, r, null, n);
        }
      }
      var Wt = null;
      function Kt(e, t, n, r) {
        if (((Wt = null), null !== (e = ba((e = ke(r))))))
          if (null === (t = $e(e))) e = null;
          else if (13 === (n = t.tag)) {
            if (null !== (e = He(t))) return e;
            e = null;
          } else if (3 === n) {
            if (t.stateNode.current.memoizedState.isDehydrated) return 3 === t.tag ? t.stateNode.containerInfo : null;
            e = null;
          } else t !== e && (e = null);
        return (Wt = e), null;
      }
      function Qt(e) {
        switch (e) {
          case 'cancel':
          case 'click':
          case 'close':
          case 'contextmenu':
          case 'copy':
          case 'cut':
          case 'auxclick':
          case 'dblclick':
          case 'dragend':
          case 'dragstart':
          case 'drop':
          case 'focusin':
          case 'focusout':
          case 'input':
          case 'invalid':
          case 'keydown':
          case 'keypress':
          case 'keyup':
          case 'mousedown':
          case 'mouseup':
          case 'paste':
          case 'pause':
          case 'play':
          case 'pointercancel':
          case 'pointerdown':
          case 'pointerup':
          case 'ratechange':
          case 'reset':
          case 'resize':
          case 'seeked':
          case 'submit':
          case 'touchcancel':
          case 'touchend':
          case 'touchstart':
          case 'volumechange':
          case 'change':
          case 'selectionchange':
          case 'textInput':
          case 'compositionstart':
          case 'compositionend':
          case 'compositionupdate':
          case 'beforeblur':
          case 'afterblur':
          case 'beforeinput':
          case 'blur':
          case 'fullscreenchange':
          case 'focus':
          case 'hashchange':
          case 'popstate':
          case 'select':
          case 'selectstart':
            return 1;
          case 'drag':
          case 'dragenter':
          case 'dragexit':
          case 'dragleave':
          case 'dragover':
          case 'mousemove':
          case 'mouseout':
          case 'mouseover':
          case 'pointermove':
          case 'pointerout':
          case 'pointerover':
          case 'scroll':
          case 'toggle':
          case 'touchmove':
          case 'wheel':
          case 'mouseenter':
          case 'mouseleave':
          case 'pointerenter':
          case 'pointerleave':
            return 4;
          case 'message':
            switch (Xe()) {
              case Je:
                return 1;
              case et:
                return 4;
              case tt:
              case nt:
                return 16;
              case rt:
                return 536870912;
              default:
                return 16;
            }
          default:
            return 16;
        }
      }
      var Yt = null,
        Xt = null,
        Jt = null;
      function en() {
        if (Jt) return Jt;
        var e,
          t,
          n = Xt,
          r = n.length,
          a = 'value' in Yt ? Yt.value : Yt.textContent,
          o = a.length;
        for (e = 0; e < r && n[e] === a[e]; e++);
        var i = r - e;
        for (t = 1; t <= i && n[r - t] === a[o - t]; t++);
        return (Jt = a.slice(e, 1 < t ? 1 - t : void 0));
      }
      function tn(e) {
        var t = e.keyCode;
        return (
          'charCode' in e ? 0 === (e = e.charCode) && 13 === t && (e = 13) : (e = t),
          10 === e && (e = 13),
          32 <= e || 13 === e ? e : 0
        );
      }
      function nn() {
        return !0;
      }
      function rn() {
        return !1;
      }
      function an(e) {
        function t(t, n, r, a, o) {
          for (var i in ((this._reactName = t),
          (this._targetInst = r),
          (this.type = n),
          (this.nativeEvent = a),
          (this.target = o),
          (this.currentTarget = null),
          e))
            e.hasOwnProperty(i) && ((t = e[i]), (this[i] = t ? t(a) : a[i]));
          return (
            (this.isDefaultPrevented = (null != a.defaultPrevented ? a.defaultPrevented : !1 === a.returnValue)
              ? nn
              : rn),
            (this.isPropagationStopped = rn),
            this
          );
        }
        return (
          F(t.prototype, {
            preventDefault: function () {
              this.defaultPrevented = !0;
              var e = this.nativeEvent;
              e &&
                (e.preventDefault ? e.preventDefault() : 'unknown' != typeof e.returnValue && (e.returnValue = !1),
                (this.isDefaultPrevented = nn));
            },
            stopPropagation: function () {
              var e = this.nativeEvent;
              e &&
                (e.stopPropagation ? e.stopPropagation() : 'unknown' != typeof e.cancelBubble && (e.cancelBubble = !0),
                (this.isPropagationStopped = nn));
            },
            persist: function () {},
            isPersistent: nn,
          }),
          t
        );
      }
      var on,
        ln,
        sn,
        un = {
          eventPhase: 0,
          bubbles: 0,
          cancelable: 0,
          timeStamp: function (e) {
            return e.timeStamp || Date.now();
          },
          defaultPrevented: 0,
          isTrusted: 0,
        },
        cn = an(un),
        dn = F({}, un, { view: 0, detail: 0 }),
        fn = an(dn),
        pn = F({}, dn, {
          screenX: 0,
          screenY: 0,
          clientX: 0,
          clientY: 0,
          pageX: 0,
          pageY: 0,
          ctrlKey: 0,
          shiftKey: 0,
          altKey: 0,
          metaKey: 0,
          getModifierState: Cn,
          button: 0,
          buttons: 0,
          relatedTarget: function (e) {
            return void 0 === e.relatedTarget
              ? e.fromElement === e.srcElement
                ? e.toElement
                : e.fromElement
              : e.relatedTarget;
          },
          movementX: function (e) {
            return 'movementX' in e
              ? e.movementX
              : (e !== sn &&
                  (sn && 'mousemove' === e.type
                    ? ((on = e.screenX - sn.screenX), (ln = e.screenY - sn.screenY))
                    : (ln = on = 0),
                  (sn = e)),
                on);
          },
          movementY: function (e) {
            return 'movementY' in e ? e.movementY : ln;
          },
        }),
        mn = an(pn),
        gn = an(F({}, pn, { dataTransfer: 0 })),
        hn = an(F({}, dn, { relatedTarget: 0 })),
        vn = an(F({}, un, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
        bn = F({}, un, {
          clipboardData: function (e) {
            return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
          },
        }),
        yn = an(bn),
        wn = an(F({}, un, { data: 0 })),
        kn = {
          Esc: 'Escape',
          Spacebar: ' ',
          Left: 'ArrowLeft',
          Up: 'ArrowUp',
          Right: 'ArrowRight',
          Down: 'ArrowDown',
          Del: 'Delete',
          Win: 'OS',
          Menu: 'ContextMenu',
          Apps: 'ContextMenu',
          Scroll: 'ScrollLock',
          MozPrintableKey: 'Unidentified',
        },
        En = {
          8: 'Backspace',
          9: 'Tab',
          12: 'Clear',
          13: 'Enter',
          16: 'Shift',
          17: 'Control',
          18: 'Alt',
          19: 'Pause',
          20: 'CapsLock',
          27: 'Escape',
          32: ' ',
          33: 'PageUp',
          34: 'PageDown',
          35: 'End',
          36: 'Home',
          37: 'ArrowLeft',
          38: 'ArrowUp',
          39: 'ArrowRight',
          40: 'ArrowDown',
          45: 'Insert',
          46: 'Delete',
          112: 'F1',
          113: 'F2',
          114: 'F3',
          115: 'F4',
          116: 'F5',
          117: 'F6',
          118: 'F7',
          119: 'F8',
          120: 'F9',
          121: 'F10',
          122: 'F11',
          123: 'F12',
          144: 'NumLock',
          145: 'ScrollLock',
          224: 'Meta',
        },
        Sn = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
      function xn(e) {
        var t = this.nativeEvent;
        return t.getModifierState ? t.getModifierState(e) : !!(e = Sn[e]) && !!t[e];
      }
      function Cn() {
        return xn;
      }
      var Tn = F({}, dn, {
          key: function (e) {
            if (e.key) {
              var t = kn[e.key] || e.key;
              if ('Unidentified' !== t) return t;
            }
            return 'keypress' === e.type
              ? 13 === (e = tn(e))
                ? 'Enter'
                : String.fromCharCode(e)
              : 'keydown' === e.type || 'keyup' === e.type
              ? En[e.keyCode] || 'Unidentified'
              : '';
          },
          code: 0,
          location: 0,
          ctrlKey: 0,
          shiftKey: 0,
          altKey: 0,
          metaKey: 0,
          repeat: 0,
          locale: 0,
          getModifierState: Cn,
          charCode: function (e) {
            return 'keypress' === e.type ? tn(e) : 0;
          },
          keyCode: function (e) {
            return 'keydown' === e.type || 'keyup' === e.type ? e.keyCode : 0;
          },
          which: function (e) {
            return 'keypress' === e.type ? tn(e) : 'keydown' === e.type || 'keyup' === e.type ? e.keyCode : 0;
          },
        }),
        _n = an(Tn),
        Ln = an(
          F({}, pn, {
            pointerId: 0,
            width: 0,
            height: 0,
            pressure: 0,
            tangentialPressure: 0,
            tiltX: 0,
            tiltY: 0,
            twist: 0,
            pointerType: 0,
            isPrimary: 0,
          })
        ),
        An = an(
          F({}, dn, {
            touches: 0,
            targetTouches: 0,
            changedTouches: 0,
            altKey: 0,
            metaKey: 0,
            ctrlKey: 0,
            shiftKey: 0,
            getModifierState: Cn,
          })
        ),
        Nn = an(F({}, un, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
        Rn = F({}, pn, {
          deltaX: function (e) {
            return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0;
          },
          deltaY: function (e) {
            return 'deltaY' in e
              ? e.deltaY
              : 'wheelDeltaY' in e
              ? -e.wheelDeltaY
              : 'wheelDelta' in e
              ? -e.wheelDelta
              : 0;
          },
          deltaZ: 0,
          deltaMode: 0,
        }),
        Pn = an(Rn),
        On = [9, 13, 27, 32],
        Dn = c && 'CompositionEvent' in window,
        In = null;
      c && 'documentMode' in document && (In = document.documentMode);
      var Mn = c && 'TextEvent' in window && !In,
        Fn = c && (!Dn || (In && 8 < In && 11 >= In)),
        Bn = String.fromCharCode(32),
        zn = !1;
      function jn(e, t) {
        switch (e) {
          case 'keyup':
            return -1 !== On.indexOf(t.keyCode);
          case 'keydown':
            return 229 !== t.keyCode;
          case 'keypress':
          case 'mousedown':
          case 'focusout':
            return !0;
          default:
            return !1;
        }
      }
      function Un(e) {
        return 'object' == typeof (e = e.detail) && 'data' in e ? e.data : null;
      }
      var $n = !1;
      var Hn = {
        color: !0,
        date: !0,
        datetime: !0,
        'datetime-local': !0,
        email: !0,
        month: !0,
        number: !0,
        password: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0,
      };
      function qn(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return 'input' === t ? !!Hn[e.type] : 'textarea' === t;
      }
      function Gn(e, t, n, r) {
        Te(r),
          0 < (t = Zr(t, 'onChange')).length &&
            ((n = new cn('onChange', 'change', null, n, r)), e.push({ event: n, listeners: t }));
      }
      var Zn = null,
        Vn = null;
      function Wn(e) {
        Br(e, 0);
      }
      function Kn(e) {
        if (V(wa(e))) return e;
      }
      function Qn(e, t) {
        if ('change' === e) return t;
      }
      var Yn = !1;
      if (c) {
        var Xn;
        if (c) {
          var Jn = 'oninput' in document;
          if (!Jn) {
            var er = document.createElement('div');
            er.setAttribute('oninput', 'return;'), (Jn = 'function' == typeof er.oninput);
          }
          Xn = Jn;
        } else Xn = !1;
        Yn = Xn && (!document.documentMode || 9 < document.documentMode);
      }
      function tr() {
        Zn && (Zn.detachEvent('onpropertychange', nr), (Vn = Zn = null));
      }
      function nr(e) {
        if ('value' === e.propertyName && Kn(Vn)) {
          var t = [];
          Gn(t, Vn, e, ke(e)), Re(Wn, t);
        }
      }
      function rr(e, t, n) {
        'focusin' === e ? (tr(), (Vn = n), (Zn = t).attachEvent('onpropertychange', nr)) : 'focusout' === e && tr();
      }
      function ar(e) {
        if ('selectionchange' === e || 'keyup' === e || 'keydown' === e) return Kn(Vn);
      }
      function or(e, t) {
        if ('click' === e) return Kn(t);
      }
      function ir(e, t) {
        if ('input' === e || 'change' === e) return Kn(t);
      }
      var lr =
        'function' == typeof Object.is
          ? Object.is
          : function (e, t) {
              return (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t);
            };
      function sr(e, t) {
        if (lr(e, t)) return !0;
        if ('object' != typeof e || null === e || 'object' != typeof t || null === t) return !1;
        var n = Object.keys(e),
          r = Object.keys(t);
        if (n.length !== r.length) return !1;
        for (r = 0; r < n.length; r++) {
          var a = n[r];
          if (!d.call(t, a) || !lr(e[a], t[a])) return !1;
        }
        return !0;
      }
      function ur(e) {
        for (; e && e.firstChild; ) e = e.firstChild;
        return e;
      }
      function cr(e, t) {
        var n,
          r = ur(e);
        for (e = 0; r; ) {
          if (3 === r.nodeType) {
            if (((n = e + r.textContent.length), e <= t && n >= t)) return { node: r, offset: t - e };
            e = n;
          }
          e: {
            for (; r; ) {
              if (r.nextSibling) {
                r = r.nextSibling;
                break e;
              }
              r = r.parentNode;
            }
            r = void 0;
          }
          r = ur(r);
        }
      }
      function dr(e, t) {
        return (
          !(!e || !t) &&
          (e === t ||
            ((!e || 3 !== e.nodeType) &&
              (t && 3 === t.nodeType
                ? dr(e, t.parentNode)
                : 'contains' in e
                ? e.contains(t)
                : !!e.compareDocumentPosition && !!(16 & e.compareDocumentPosition(t)))))
        );
      }
      function fr() {
        for (var e = window, t = W(); t instanceof e.HTMLIFrameElement; ) {
          try {
            var n = 'string' == typeof t.contentWindow.location.href;
          } catch (r) {
            n = !1;
          }
          if (!n) break;
          t = W((e = t.contentWindow).document);
        }
        return t;
      }
      function pr(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return (
          t &&
          (('input' === t &&
            ('text' === e.type ||
              'search' === e.type ||
              'tel' === e.type ||
              'url' === e.type ||
              'password' === e.type)) ||
            'textarea' === t ||
            'true' === e.contentEditable)
        );
      }
      function mr(e) {
        var t = fr(),
          n = e.focusedElem,
          r = e.selectionRange;
        if (t !== n && n && n.ownerDocument && dr(n.ownerDocument.documentElement, n)) {
          if (null !== r && pr(n))
            if (((t = r.start), void 0 === (e = r.end) && (e = t), 'selectionStart' in n))
              (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
            else if ((e = ((t = n.ownerDocument || document) && t.defaultView) || window).getSelection) {
              e = e.getSelection();
              var a = n.textContent.length,
                o = Math.min(r.start, a);
              (r = void 0 === r.end ? o : Math.min(r.end, a)),
                !e.extend && o > r && ((a = r), (r = o), (o = a)),
                (a = cr(n, o));
              var i = cr(n, r);
              a &&
                i &&
                (1 !== e.rangeCount ||
                  e.anchorNode !== a.node ||
                  e.anchorOffset !== a.offset ||
                  e.focusNode !== i.node ||
                  e.focusOffset !== i.offset) &&
                ((t = t.createRange()).setStart(a.node, a.offset),
                e.removeAllRanges(),
                o > r ? (e.addRange(t), e.extend(i.node, i.offset)) : (t.setEnd(i.node, i.offset), e.addRange(t)));
            }
          for (t = [], e = n; (e = e.parentNode); )
            1 === e.nodeType && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
          for ('function' == typeof n.focus && n.focus(), n = 0; n < t.length; n++)
            ((e = t[n]).element.scrollLeft = e.left), (e.element.scrollTop = e.top);
        }
      }
      var gr = c && 'documentMode' in document && 11 >= document.documentMode,
        hr = null,
        vr = null,
        br = null,
        yr = !1;
      function wr(e, t, n) {
        var r = n.window === n ? n.document : 9 === n.nodeType ? n : n.ownerDocument;
        yr ||
          null == hr ||
          hr !== W(r) ||
          ('selectionStart' in (r = hr) && pr(r)
            ? (r = { start: r.selectionStart, end: r.selectionEnd })
            : (r = {
                anchorNode: (r = ((r.ownerDocument && r.ownerDocument.defaultView) || window).getSelection())
                  .anchorNode,
                anchorOffset: r.anchorOffset,
                focusNode: r.focusNode,
                focusOffset: r.focusOffset,
              }),
          (br && sr(br, r)) ||
            ((br = r),
            0 < (r = Zr(vr, 'onSelect')).length &&
              ((t = new cn('onSelect', 'select', null, t, n)), e.push({ event: t, listeners: r }), (t.target = hr))));
      }
      function kr(e, t) {
        var n = {};
        return (n[e.toLowerCase()] = t.toLowerCase()), (n['Webkit' + e] = 'webkit' + t), (n['Moz' + e] = 'moz' + t), n;
      }
      var Er = {
          animationend: kr('Animation', 'AnimationEnd'),
          animationiteration: kr('Animation', 'AnimationIteration'),
          animationstart: kr('Animation', 'AnimationStart'),
          transitionend: kr('Transition', 'TransitionEnd'),
        },
        Sr = {},
        xr = {};
      function Cr(e) {
        if (Sr[e]) return Sr[e];
        if (!Er[e]) return e;
        var t,
          n = Er[e];
        for (t in n) if (n.hasOwnProperty(t) && t in xr) return (Sr[e] = n[t]);
        return e;
      }
      c &&
        ((xr = document.createElement('div').style),
        'AnimationEvent' in window ||
          (delete Er.animationend.animation,
          delete Er.animationiteration.animation,
          delete Er.animationstart.animation),
        'TransitionEvent' in window || delete Er.transitionend.transition);
      var Tr = Cr('animationend'),
        _r = Cr('animationiteration'),
        Lr = Cr('animationstart'),
        Ar = Cr('transitionend'),
        Nr = new Map(),
        Rr =
          'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
            ' '
          );
      function Pr(e, t) {
        Nr.set(e, t), s(t, [e]);
      }
      for (var Or = 0; Or < Rr.length; Or++) {
        var Dr = Rr[Or];
        Pr(Dr.toLowerCase(), 'on' + (Dr[0].toUpperCase() + Dr.slice(1)));
      }
      Pr(Tr, 'onAnimationEnd'),
        Pr(_r, 'onAnimationIteration'),
        Pr(Lr, 'onAnimationStart'),
        Pr('dblclick', 'onDoubleClick'),
        Pr('focusin', 'onFocus'),
        Pr('focusout', 'onBlur'),
        Pr(Ar, 'onTransitionEnd'),
        u('onMouseEnter', ['mouseout', 'mouseover']),
        u('onMouseLeave', ['mouseout', 'mouseover']),
        u('onPointerEnter', ['pointerout', 'pointerover']),
        u('onPointerLeave', ['pointerout', 'pointerover']),
        s('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
        s(
          'onSelect',
          'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(' ')
        ),
        s('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
        s('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
        s('onCompositionStart', 'compositionstart focusout keydown keypress keyup mousedown'.split(' ')),
        s('onCompositionUpdate', 'compositionupdate focusout keydown keypress keyup mousedown'.split(' '));
      var Ir =
          'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
            ' '
          ),
        Mr = new Set('cancel close invalid load scroll toggle'.split(' ').concat(Ir));
      function Fr(e, t, n) {
        var r = e.type || 'unknown-event';
        (e.currentTarget = n),
          (function (e, t, n, r, a, i, l, s, u) {
            if ((Ue.apply(this, arguments), Me)) {
              if (!Me) throw Error(o(198));
              var c = Fe;
              (Me = !1), (Fe = null), Be || ((Be = !0), (ze = c));
            }
          })(r, t, void 0, e),
          (e.currentTarget = null);
      }
      function Br(e, t) {
        t = 0 != (4 & t);
        for (var n = 0; n < e.length; n++) {
          var r = e[n],
            a = r.event;
          r = r.listeners;
          e: {
            var o = void 0;
            if (t)
              for (var i = r.length - 1; 0 <= i; i--) {
                var l = r[i],
                  s = l.instance,
                  u = l.currentTarget;
                if (((l = l.listener), s !== o && a.isPropagationStopped())) break e;
                Fr(a, l, u), (o = s);
              }
            else
              for (i = 0; i < r.length; i++) {
                if (
                  ((s = (l = r[i]).instance),
                  (u = l.currentTarget),
                  (l = l.listener),
                  s !== o && a.isPropagationStopped())
                )
                  break e;
                Fr(a, l, u), (o = s);
              }
          }
        }
        if (Be) throw ((e = ze), (Be = !1), (ze = null), e);
      }
      function zr(e, t) {
        var n = t[ga];
        void 0 === n && (n = t[ga] = new Set());
        var r = e + '__bubble';
        n.has(r) || (Hr(t, e, 2, !1), n.add(r));
      }
      function jr(e, t, n) {
        var r = 0;
        t && (r |= 4), Hr(n, e, r, t);
      }
      var Ur = '_reactListening' + Math.random().toString(36).slice(2);
      function $r(e) {
        if (!e[Ur]) {
          (e[Ur] = !0),
            i.forEach(function (t) {
              'selectionchange' !== t && (Mr.has(t) || jr(t, !1, e), jr(t, !0, e));
            });
          var t = 9 === e.nodeType ? e : e.ownerDocument;
          null === t || t[Ur] || ((t[Ur] = !0), jr('selectionchange', !1, t));
        }
      }
      function Hr(e, t, n, r) {
        switch (Qt(t)) {
          case 1:
            var a = Gt;
            break;
          case 4:
            a = Zt;
            break;
          default:
            a = Vt;
        }
        (n = a.bind(null, t, n, e)),
          (a = void 0),
          !Oe || ('touchstart' !== t && 'touchmove' !== t && 'wheel' !== t) || (a = !0),
          r
            ? void 0 !== a
              ? e.addEventListener(t, n, { capture: !0, passive: a })
              : e.addEventListener(t, n, !0)
            : void 0 !== a
            ? e.addEventListener(t, n, { passive: a })
            : e.addEventListener(t, n, !1);
      }
      function qr(e, t, n, r, a) {
        var o = r;
        if (0 == (1 & t) && 0 == (2 & t) && null !== r)
          e: for (;;) {
            if (null === r) return;
            var i = r.tag;
            if (3 === i || 4 === i) {
              var l = r.stateNode.containerInfo;
              if (l === a || (8 === l.nodeType && l.parentNode === a)) break;
              if (4 === i)
                for (i = r.return; null !== i; ) {
                  var s = i.tag;
                  if (
                    (3 === s || 4 === s) &&
                    ((s = i.stateNode.containerInfo) === a || (8 === s.nodeType && s.parentNode === a))
                  )
                    return;
                  i = i.return;
                }
              for (; null !== l; ) {
                if (null === (i = ba(l))) return;
                if (5 === (s = i.tag) || 6 === s) {
                  r = o = i;
                  continue e;
                }
                l = l.parentNode;
              }
            }
            r = r.return;
          }
        Re(function () {
          var r = o,
            a = ke(n),
            i = [];
          e: {
            var l = Nr.get(e);
            if (void 0 !== l) {
              var s = cn,
                u = e;
              switch (e) {
                case 'keypress':
                  if (0 === tn(n)) break e;
                case 'keydown':
                case 'keyup':
                  s = _n;
                  break;
                case 'focusin':
                  (u = 'focus'), (s = hn);
                  break;
                case 'focusout':
                  (u = 'blur'), (s = hn);
                  break;
                case 'beforeblur':
                case 'afterblur':
                  s = hn;
                  break;
                case 'click':
                  if (2 === n.button) break e;
                case 'auxclick':
                case 'dblclick':
                case 'mousedown':
                case 'mousemove':
                case 'mouseup':
                case 'mouseout':
                case 'mouseover':
                case 'contextmenu':
                  s = mn;
                  break;
                case 'drag':
                case 'dragend':
                case 'dragenter':
                case 'dragexit':
                case 'dragleave':
                case 'dragover':
                case 'dragstart':
                case 'drop':
                  s = gn;
                  break;
                case 'touchcancel':
                case 'touchend':
                case 'touchmove':
                case 'touchstart':
                  s = An;
                  break;
                case Tr:
                case _r:
                case Lr:
                  s = vn;
                  break;
                case Ar:
                  s = Nn;
                  break;
                case 'scroll':
                  s = fn;
                  break;
                case 'wheel':
                  s = Pn;
                  break;
                case 'copy':
                case 'cut':
                case 'paste':
                  s = yn;
                  break;
                case 'gotpointercapture':
                case 'lostpointercapture':
                case 'pointercancel':
                case 'pointerdown':
                case 'pointermove':
                case 'pointerout':
                case 'pointerover':
                case 'pointerup':
                  s = Ln;
              }
              var c = 0 != (4 & t),
                d = !c && 'scroll' === e,
                f = c ? (null !== l ? l + 'Capture' : null) : l;
              c = [];
              for (var p, m = r; null !== m; ) {
                var g = (p = m).stateNode;
                if (
                  (5 === p.tag && null !== g && ((p = g), null !== f && null != (g = Pe(m, f)) && c.push(Gr(m, g, p))),
                  d)
                )
                  break;
                m = m.return;
              }
              0 < c.length && ((l = new s(l, u, null, n, a)), i.push({ event: l, listeners: c }));
            }
          }
          if (0 == (7 & t)) {
            if (
              ((s = 'mouseout' === e || 'pointerout' === e),
              (!(l = 'mouseover' === e || 'pointerover' === e) ||
                n === we ||
                !(u = n.relatedTarget || n.fromElement) ||
                (!ba(u) && !u[ma])) &&
                (s || l) &&
                ((l = a.window === a ? a : (l = a.ownerDocument) ? l.defaultView || l.parentWindow : window),
                s
                  ? ((s = r),
                    null !== (u = (u = n.relatedTarget || n.toElement) ? ba(u) : null) &&
                      (u !== (d = $e(u)) || (5 !== u.tag && 6 !== u.tag)) &&
                      (u = null))
                  : ((s = null), (u = r)),
                s !== u))
            ) {
              if (
                ((c = mn),
                (g = 'onMouseLeave'),
                (f = 'onMouseEnter'),
                (m = 'mouse'),
                ('pointerout' !== e && 'pointerover' !== e) ||
                  ((c = Ln), (g = 'onPointerLeave'), (f = 'onPointerEnter'), (m = 'pointer')),
                (d = null == s ? l : wa(s)),
                (p = null == u ? l : wa(u)),
                ((l = new c(g, m + 'leave', s, n, a)).target = d),
                (l.relatedTarget = p),
                (g = null),
                ba(a) === r && (((c = new c(f, m + 'enter', u, n, a)).target = p), (c.relatedTarget = d), (g = c)),
                (d = g),
                s && u)
              )
                e: {
                  for (f = u, m = 0, p = c = s; p; p = Vr(p)) m++;
                  for (p = 0, g = f; g; g = Vr(g)) p++;
                  for (; 0 < m - p; ) (c = Vr(c)), m--;
                  for (; 0 < p - m; ) (f = Vr(f)), p--;
                  for (; m--; ) {
                    if (c === f || (null !== f && c === f.alternate)) break e;
                    (c = Vr(c)), (f = Vr(f));
                  }
                  c = null;
                }
              else c = null;
              null !== s && Wr(i, l, s, c, !1), null !== u && null !== d && Wr(i, d, u, c, !0);
            }
            if (
              'select' === (s = (l = r ? wa(r) : window).nodeName && l.nodeName.toLowerCase()) ||
              ('input' === s && 'file' === l.type)
            )
              var h = Qn;
            else if (qn(l))
              if (Yn) h = ir;
              else {
                h = ar;
                var v = rr;
              }
            else
              (s = l.nodeName) &&
                'input' === s.toLowerCase() &&
                ('checkbox' === l.type || 'radio' === l.type) &&
                (h = or);
            switch (
              (h && (h = h(e, r))
                ? Gn(i, h, n, a)
                : (v && v(e, l, r),
                  'focusout' === e &&
                    (v = l._wrapperState) &&
                    v.controlled &&
                    'number' === l.type &&
                    ee(l, 'number', l.value)),
              (v = r ? wa(r) : window),
              e)
            ) {
              case 'focusin':
                (qn(v) || 'true' === v.contentEditable) && ((hr = v), (vr = r), (br = null));
                break;
              case 'focusout':
                br = vr = hr = null;
                break;
              case 'mousedown':
                yr = !0;
                break;
              case 'contextmenu':
              case 'mouseup':
              case 'dragend':
                (yr = !1), wr(i, n, a);
                break;
              case 'selectionchange':
                if (gr) break;
              case 'keydown':
              case 'keyup':
                wr(i, n, a);
            }
            var b;
            if (Dn)
              e: {
                switch (e) {
                  case 'compositionstart':
                    var y = 'onCompositionStart';
                    break e;
                  case 'compositionend':
                    y = 'onCompositionEnd';
                    break e;
                  case 'compositionupdate':
                    y = 'onCompositionUpdate';
                    break e;
                }
                y = void 0;
              }
            else
              $n
                ? jn(e, n) && (y = 'onCompositionEnd')
                : 'keydown' === e && 229 === n.keyCode && (y = 'onCompositionStart');
            y &&
              (Fn &&
                'ko' !== n.locale &&
                ($n || 'onCompositionStart' !== y
                  ? 'onCompositionEnd' === y && $n && (b = en())
                  : ((Xt = 'value' in (Yt = a) ? Yt.value : Yt.textContent), ($n = !0))),
              0 < (v = Zr(r, y)).length &&
                ((y = new wn(y, e, null, n, a)),
                i.push({ event: y, listeners: v }),
                b ? (y.data = b) : null !== (b = Un(n)) && (y.data = b))),
              (b = Mn
                ? (function (e, t) {
                    switch (e) {
                      case 'compositionend':
                        return Un(t);
                      case 'keypress':
                        return 32 !== t.which ? null : ((zn = !0), Bn);
                      case 'textInput':
                        return (e = t.data) === Bn && zn ? null : e;
                      default:
                        return null;
                    }
                  })(e, n)
                : (function (e, t) {
                    if ($n)
                      return 'compositionend' === e || (!Dn && jn(e, t))
                        ? ((e = en()), (Jt = Xt = Yt = null), ($n = !1), e)
                        : null;
                    switch (e) {
                      case 'paste':
                      default:
                        return null;
                      case 'keypress':
                        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
                          if (t.char && 1 < t.char.length) return t.char;
                          if (t.which) return String.fromCharCode(t.which);
                        }
                        return null;
                      case 'compositionend':
                        return Fn && 'ko' !== t.locale ? null : t.data;
                    }
                  })(e, n)) &&
                0 < (r = Zr(r, 'onBeforeInput')).length &&
                ((a = new wn('onBeforeInput', 'beforeinput', null, n, a)),
                i.push({ event: a, listeners: r }),
                (a.data = b));
          }
          Br(i, t);
        });
      }
      function Gr(e, t, n) {
        return { instance: e, listener: t, currentTarget: n };
      }
      function Zr(e, t) {
        for (var n = t + 'Capture', r = []; null !== e; ) {
          var a = e,
            o = a.stateNode;
          5 === a.tag &&
            null !== o &&
            ((a = o), null != (o = Pe(e, n)) && r.unshift(Gr(e, o, a)), null != (o = Pe(e, t)) && r.push(Gr(e, o, a))),
            (e = e.return);
        }
        return r;
      }
      function Vr(e) {
        if (null === e) return null;
        do {
          e = e.return;
        } while (e && 5 !== e.tag);
        return e || null;
      }
      function Wr(e, t, n, r, a) {
        for (var o = t._reactName, i = []; null !== n && n !== r; ) {
          var l = n,
            s = l.alternate,
            u = l.stateNode;
          if (null !== s && s === r) break;
          5 === l.tag &&
            null !== u &&
            ((l = u),
            a
              ? null != (s = Pe(n, o)) && i.unshift(Gr(n, s, l))
              : a || (null != (s = Pe(n, o)) && i.push(Gr(n, s, l)))),
            (n = n.return);
        }
        0 !== i.length && e.push({ event: t, listeners: i });
      }
      var Kr = /\r\n?/g,
        Qr = /\u0000|\uFFFD/g;
      function Yr(e) {
        return ('string' == typeof e ? e : '' + e).replace(Kr, '\n').replace(Qr, '');
      }
      function Xr(e, t, n) {
        if (((t = Yr(t)), Yr(e) !== t && n)) throw Error(o(425));
      }
      function Jr() {}
      var ea = null,
        ta = null;
      function na(e, t) {
        return (
          'textarea' === e ||
          'noscript' === e ||
          'string' == typeof t.children ||
          'number' == typeof t.children ||
          ('object' == typeof t.dangerouslySetInnerHTML &&
            null !== t.dangerouslySetInnerHTML &&
            null != t.dangerouslySetInnerHTML.__html)
        );
      }
      var ra = 'function' == typeof setTimeout ? setTimeout : void 0,
        aa = 'function' == typeof clearTimeout ? clearTimeout : void 0,
        oa = 'function' == typeof Promise ? Promise : void 0,
        ia =
          'function' == typeof queueMicrotask
            ? queueMicrotask
            : void 0 !== oa
            ? function (e) {
                return oa.resolve(null).then(e).catch(la);
              }
            : ra;
      function la(e) {
        setTimeout(function () {
          throw e;
        });
      }
      function sa(e, t) {
        var n = t,
          r = 0;
        do {
          var a = n.nextSibling;
          if ((e.removeChild(n), a && 8 === a.nodeType))
            if ('/$' === (n = a.data)) {
              if (0 === r) return e.removeChild(a), void $t(t);
              r--;
            } else ('$' !== n && '$?' !== n && '$!' !== n) || r++;
          n = a;
        } while (n);
        $t(t);
      }
      function ua(e) {
        for (; null != e; e = e.nextSibling) {
          var t = e.nodeType;
          if (1 === t || 3 === t) break;
          if (8 === t) {
            if ('$' === (t = e.data) || '$!' === t || '$?' === t) break;
            if ('/$' === t) return null;
          }
        }
        return e;
      }
      function ca(e) {
        e = e.previousSibling;
        for (var t = 0; e; ) {
          if (8 === e.nodeType) {
            var n = e.data;
            if ('$' === n || '$!' === n || '$?' === n) {
              if (0 === t) return e;
              t--;
            } else '/$' === n && t++;
          }
          e = e.previousSibling;
        }
        return null;
      }
      var da = Math.random().toString(36).slice(2),
        fa = '__reactFiber$' + da,
        pa = '__reactProps$' + da,
        ma = '__reactContainer$' + da,
        ga = '__reactEvents$' + da,
        ha = '__reactListeners$' + da,
        va = '__reactHandles$' + da;
      function ba(e) {
        var t = e[fa];
        if (t) return t;
        for (var n = e.parentNode; n; ) {
          if ((t = n[ma] || n[fa])) {
            if (((n = t.alternate), null !== t.child || (null !== n && null !== n.child)))
              for (e = ca(e); null !== e; ) {
                if ((n = e[fa])) return n;
                e = ca(e);
              }
            return t;
          }
          n = (e = n).parentNode;
        }
        return null;
      }
      function ya(e) {
        return !(e = e[fa] || e[ma]) || (5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag) ? null : e;
      }
      function wa(e) {
        if (5 === e.tag || 6 === e.tag) return e.stateNode;
        throw Error(o(33));
      }
      function ka(e) {
        return e[pa] || null;
      }
      var Ea = [],
        Sa = -1;
      function xa(e) {
        return { current: e };
      }
      function Ca(e) {
        0 > Sa || ((e.current = Ea[Sa]), (Ea[Sa] = null), Sa--);
      }
      function Ta(e, t) {
        Sa++, (Ea[Sa] = e.current), (e.current = t);
      }
      var _a = {},
        La = xa(_a),
        Aa = xa(!1),
        Na = _a;
      function Ra(e, t) {
        var n = e.type.contextTypes;
        if (!n) return _a;
        var r = e.stateNode;
        if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
          return r.__reactInternalMemoizedMaskedChildContext;
        var a,
          o = {};
        for (a in n) o[a] = t[a];
        return (
          r &&
            (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = t),
            (e.__reactInternalMemoizedMaskedChildContext = o)),
          o
        );
      }
      function Pa(e) {
        return null != (e = e.childContextTypes);
      }
      function Oa() {
        Ca(Aa), Ca(La);
      }
      function Da(e, t, n) {
        if (La.current !== _a) throw Error(o(168));
        Ta(La, t), Ta(Aa, n);
      }
      function Ia(e, t, n) {
        var r = e.stateNode;
        if (((t = t.childContextTypes), 'function' != typeof r.getChildContext)) return n;
        for (var a in (r = r.getChildContext())) if (!(a in t)) throw Error(o(108, H(e) || 'Unknown', a));
        return F({}, n, r);
      }
      function Ma(e) {
        return (
          (e = ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || _a),
          (Na = La.current),
          Ta(La, e),
          Ta(Aa, Aa.current),
          !0
        );
      }
      function Fa(e, t, n) {
        var r = e.stateNode;
        if (!r) throw Error(o(169));
        n ? ((e = Ia(e, t, Na)), (r.__reactInternalMemoizedMergedChildContext = e), Ca(Aa), Ca(La), Ta(La, e)) : Ca(Aa),
          Ta(Aa, n);
      }
      var Ba = null,
        za = !1,
        ja = !1;
      function Ua(e) {
        null === Ba ? (Ba = [e]) : Ba.push(e);
      }
      function $a() {
        if (!ja && null !== Ba) {
          ja = !0;
          var e = 0,
            t = yt;
          try {
            var n = Ba;
            for (yt = 1; e < n.length; e++) {
              var r = n[e];
              do {
                r = r(!0);
              } while (null !== r);
            }
            (Ba = null), (za = !1);
          } catch (a) {
            throw (null !== Ba && (Ba = Ba.slice(e + 1)), Ve(Je, $a), a);
          } finally {
            (yt = t), (ja = !1);
          }
        }
        return null;
      }
      var Ha = [],
        qa = 0,
        Ga = null,
        Za = 0,
        Va = [],
        Wa = 0,
        Ka = null,
        Qa = 1,
        Ya = '';
      function Xa(e, t) {
        (Ha[qa++] = Za), (Ha[qa++] = Ga), (Ga = e), (Za = t);
      }
      function Ja(e, t, n) {
        (Va[Wa++] = Qa), (Va[Wa++] = Ya), (Va[Wa++] = Ka), (Ka = e);
        var r = Qa;
        e = Ya;
        var a = 32 - it(r) - 1;
        (r &= ~(1 << a)), (n += 1);
        var o = 32 - it(t) + a;
        if (30 < o) {
          var i = a - (a % 5);
          (o = (r & ((1 << i) - 1)).toString(32)),
            (r >>= i),
            (a -= i),
            (Qa = (1 << (32 - it(t) + a)) | (n << a) | r),
            (Ya = o + e);
        } else (Qa = (1 << o) | (n << a) | r), (Ya = e);
      }
      function eo(e) {
        null !== e.return && (Xa(e, 1), Ja(e, 1, 0));
      }
      function to(e) {
        for (; e === Ga; ) (Ga = Ha[--qa]), (Ha[qa] = null), (Za = Ha[--qa]), (Ha[qa] = null);
        for (; e === Ka; )
          (Ka = Va[--Wa]), (Va[Wa] = null), (Ya = Va[--Wa]), (Va[Wa] = null), (Qa = Va[--Wa]), (Va[Wa] = null);
      }
      var no = null,
        ro = null,
        ao = !1,
        oo = null;
      function io(e, t) {
        var n = Pu(5, null, null, 0);
        (n.elementType = 'DELETED'),
          (n.stateNode = t),
          (n.return = e),
          null === (t = e.deletions) ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
      }
      function lo(e, t) {
        switch (e.tag) {
          case 5:
            var n = e.type;
            return (
              null !== (t = 1 !== t.nodeType || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t) &&
              ((e.stateNode = t), (no = e), (ro = ua(t.firstChild)), !0)
            );
          case 6:
            return (
              null !== (t = '' === e.pendingProps || 3 !== t.nodeType ? null : t) &&
              ((e.stateNode = t), (no = e), (ro = null), !0)
            );
          case 13:
            return (
              null !== (t = 8 !== t.nodeType ? null : t) &&
              ((n = null !== Ka ? { id: Qa, overflow: Ya } : null),
              (e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }),
              ((n = Pu(18, null, null, 0)).stateNode = t),
              (n.return = e),
              (e.child = n),
              (no = e),
              (ro = null),
              !0)
            );
          default:
            return !1;
        }
      }
      function so(e) {
        return 0 != (1 & e.mode) && 0 == (128 & e.flags);
      }
      function uo(e) {
        if (ao) {
          var t = ro;
          if (t) {
            var n = t;
            if (!lo(e, t)) {
              if (so(e)) throw Error(o(418));
              t = ua(n.nextSibling);
              var r = no;
              t && lo(e, t) ? io(r, n) : ((e.flags = (-4097 & e.flags) | 2), (ao = !1), (no = e));
            }
          } else {
            if (so(e)) throw Error(o(418));
            (e.flags = (-4097 & e.flags) | 2), (ao = !1), (no = e);
          }
        }
      }
      function co(e) {
        for (e = e.return; null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag; ) e = e.return;
        no = e;
      }
      function fo(e) {
        if (e !== no) return !1;
        if (!ao) return co(e), (ao = !0), !1;
        var t;
        if (
          ((t = 3 !== e.tag) &&
            !(t = 5 !== e.tag) &&
            (t = 'head' !== (t = e.type) && 'body' !== t && !na(e.type, e.memoizedProps)),
          t && (t = ro))
        ) {
          if (so(e)) throw (po(), Error(o(418)));
          for (; t; ) io(e, t), (t = ua(t.nextSibling));
        }
        if ((co(e), 13 === e.tag)) {
          if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null)) throw Error(o(317));
          e: {
            for (e = e.nextSibling, t = 0; e; ) {
              if (8 === e.nodeType) {
                var n = e.data;
                if ('/$' === n) {
                  if (0 === t) {
                    ro = ua(e.nextSibling);
                    break e;
                  }
                  t--;
                } else ('$' !== n && '$!' !== n && '$?' !== n) || t++;
              }
              e = e.nextSibling;
            }
            ro = null;
          }
        } else ro = no ? ua(e.stateNode.nextSibling) : null;
        return !0;
      }
      function po() {
        for (var e = ro; e; ) e = ua(e.nextSibling);
      }
      function mo() {
        (ro = no = null), (ao = !1);
      }
      function go(e) {
        null === oo ? (oo = [e]) : oo.push(e);
      }
      var ho = w.ReactCurrentBatchConfig;
      function vo(e, t) {
        if (e && e.defaultProps) {
          for (var n in ((t = F({}, t)), (e = e.defaultProps))) void 0 === t[n] && (t[n] = e[n]);
          return t;
        }
        return t;
      }
      var bo = xa(null),
        yo = null,
        wo = null,
        ko = null;
      function Eo() {
        ko = wo = yo = null;
      }
      function So(e) {
        var t = bo.current;
        Ca(bo), (e._currentValue = t);
      }
      function xo(e, t, n) {
        for (; null !== e; ) {
          var r = e.alternate;
          if (
            ((e.childLanes & t) !== t
              ? ((e.childLanes |= t), null !== r && (r.childLanes |= t))
              : null !== r && (r.childLanes & t) !== t && (r.childLanes |= t),
            e === n)
          )
            break;
          e = e.return;
        }
      }
      function Co(e, t) {
        (yo = e),
          (ko = wo = null),
          null !== (e = e.dependencies) &&
            null !== e.firstContext &&
            (0 != (e.lanes & t) && (wl = !0), (e.firstContext = null));
      }
      function To(e) {
        var t = e._currentValue;
        if (ko !== e)
          if (((e = { context: e, memoizedValue: t, next: null }), null === wo)) {
            if (null === yo) throw Error(o(308));
            (wo = e), (yo.dependencies = { lanes: 0, firstContext: e });
          } else wo = wo.next = e;
        return t;
      }
      var _o = null;
      function Lo(e) {
        null === _o ? (_o = [e]) : _o.push(e);
      }
      function Ao(e, t, n, r) {
        var a = t.interleaved;
        return null === a ? ((n.next = n), Lo(t)) : ((n.next = a.next), (a.next = n)), (t.interleaved = n), No(e, r);
      }
      function No(e, t) {
        e.lanes |= t;
        var n = e.alternate;
        for (null !== n && (n.lanes |= t), n = e, e = e.return; null !== e; )
          (e.childLanes |= t), null !== (n = e.alternate) && (n.childLanes |= t), (n = e), (e = e.return);
        return 3 === n.tag ? n.stateNode : null;
      }
      var Ro = !1;
      function Po(e) {
        e.updateQueue = {
          baseState: e.memoizedState,
          firstBaseUpdate: null,
          lastBaseUpdate: null,
          shared: { pending: null, interleaved: null, lanes: 0 },
          effects: null,
        };
      }
      function Oo(e, t) {
        (e = e.updateQueue),
          t.updateQueue === e &&
            (t.updateQueue = {
              baseState: e.baseState,
              firstBaseUpdate: e.firstBaseUpdate,
              lastBaseUpdate: e.lastBaseUpdate,
              shared: e.shared,
              effects: e.effects,
            });
      }
      function Do(e, t) {
        return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
      }
      function Io(e, t, n) {
        var r = e.updateQueue;
        if (null === r) return null;
        if (((r = r.shared), 0 != (2 & As))) {
          var a = r.pending;
          return null === a ? (t.next = t) : ((t.next = a.next), (a.next = t)), (r.pending = t), No(e, n);
        }
        return (
          null === (a = r.interleaved) ? ((t.next = t), Lo(r)) : ((t.next = a.next), (a.next = t)),
          (r.interleaved = t),
          No(e, n)
        );
      }
      function Mo(e, t, n) {
        if (null !== (t = t.updateQueue) && ((t = t.shared), 0 != (4194240 & n))) {
          var r = t.lanes;
          (n |= r &= e.pendingLanes), (t.lanes = n), bt(e, n);
        }
      }
      function Fo(e, t) {
        var n = e.updateQueue,
          r = e.alternate;
        if (null !== r && n === (r = r.updateQueue)) {
          var a = null,
            o = null;
          if (null !== (n = n.firstBaseUpdate)) {
            do {
              var i = {
                eventTime: n.eventTime,
                lane: n.lane,
                tag: n.tag,
                payload: n.payload,
                callback: n.callback,
                next: null,
              };
              null === o ? (a = o = i) : (o = o.next = i), (n = n.next);
            } while (null !== n);
            null === o ? (a = o = t) : (o = o.next = t);
          } else a = o = t;
          return (
            (n = {
              baseState: r.baseState,
              firstBaseUpdate: a,
              lastBaseUpdate: o,
              shared: r.shared,
              effects: r.effects,
            }),
            void (e.updateQueue = n)
          );
        }
        null === (e = n.lastBaseUpdate) ? (n.firstBaseUpdate = t) : (e.next = t), (n.lastBaseUpdate = t);
      }
      function Bo(e, t, n, r) {
        var a = e.updateQueue;
        Ro = !1;
        var o = a.firstBaseUpdate,
          i = a.lastBaseUpdate,
          l = a.shared.pending;
        if (null !== l) {
          a.shared.pending = null;
          var s = l,
            u = s.next;
          (s.next = null), null === i ? (o = u) : (i.next = u), (i = s);
          var c = e.alternate;
          null !== c &&
            (l = (c = c.updateQueue).lastBaseUpdate) !== i &&
            (null === l ? (c.firstBaseUpdate = u) : (l.next = u), (c.lastBaseUpdate = s));
        }
        if (null !== o) {
          var d = a.baseState;
          for (i = 0, c = u = s = null, l = o; ; ) {
            var f = l.lane,
              p = l.eventTime;
            if ((r & f) === f) {
              null !== c &&
                (c = c.next =
                  { eventTime: p, lane: 0, tag: l.tag, payload: l.payload, callback: l.callback, next: null });
              e: {
                var m = e,
                  g = l;
                switch (((f = t), (p = n), g.tag)) {
                  case 1:
                    if ('function' == typeof (m = g.payload)) {
                      d = m.call(p, d, f);
                      break e;
                    }
                    d = m;
                    break e;
                  case 3:
                    m.flags = (-65537 & m.flags) | 128;
                  case 0:
                    if (null == (f = 'function' == typeof (m = g.payload) ? m.call(p, d, f) : m)) break e;
                    d = F({}, d, f);
                    break e;
                  case 2:
                    Ro = !0;
                }
              }
              null !== l.callback &&
                0 !== l.lane &&
                ((e.flags |= 64), null === (f = a.effects) ? (a.effects = [l]) : f.push(l));
            } else
              (p = { eventTime: p, lane: f, tag: l.tag, payload: l.payload, callback: l.callback, next: null }),
                null === c ? ((u = c = p), (s = d)) : (c = c.next = p),
                (i |= f);
            if (null === (l = l.next)) {
              if (null === (l = a.shared.pending)) break;
              (l = (f = l).next), (f.next = null), (a.lastBaseUpdate = f), (a.shared.pending = null);
            }
          }
          if (
            (null === c && (s = d),
            (a.baseState = s),
            (a.firstBaseUpdate = u),
            (a.lastBaseUpdate = c),
            null !== (t = a.shared.interleaved))
          ) {
            a = t;
            do {
              (i |= a.lane), (a = a.next);
            } while (a !== t);
          } else null === o && (a.shared.lanes = 0);
          (Fs |= i), (e.lanes = i), (e.memoizedState = d);
        }
      }
      function zo(e, t, n) {
        if (((e = t.effects), (t.effects = null), null !== e))
          for (t = 0; t < e.length; t++) {
            var r = e[t],
              a = r.callback;
            if (null !== a) {
              if (((r.callback = null), (r = n), 'function' != typeof a)) throw Error(o(191, a));
              a.call(r);
            }
          }
      }
      var jo = new r.Component().refs;
      function Uo(e, t, n, r) {
        (n = null == (n = n(r, (t = e.memoizedState))) ? t : F({}, t, n)),
          (e.memoizedState = n),
          0 === e.lanes && (e.updateQueue.baseState = n);
      }
      var $o = {
        isMounted: function (e) {
          return !!(e = e._reactInternals) && $e(e) === e;
        },
        enqueueSetState: function (e, t, n) {
          e = e._reactInternals;
          var r = tu(),
            a = nu(e),
            o = Do(r, a);
          (o.payload = t), null != n && (o.callback = n), null !== (t = Io(e, o, a)) && (ru(t, e, a, r), Mo(t, e, a));
        },
        enqueueReplaceState: function (e, t, n) {
          e = e._reactInternals;
          var r = tu(),
            a = nu(e),
            o = Do(r, a);
          (o.tag = 1),
            (o.payload = t),
            null != n && (o.callback = n),
            null !== (t = Io(e, o, a)) && (ru(t, e, a, r), Mo(t, e, a));
        },
        enqueueForceUpdate: function (e, t) {
          e = e._reactInternals;
          var n = tu(),
            r = nu(e),
            a = Do(n, r);
          (a.tag = 2), null != t && (a.callback = t), null !== (t = Io(e, a, r)) && (ru(t, e, r, n), Mo(t, e, r));
        },
      };
      function Ho(e, t, n, r, a, o, i) {
        return 'function' == typeof (e = e.stateNode).shouldComponentUpdate
          ? e.shouldComponentUpdate(r, o, i)
          : !t.prototype || !t.prototype.isPureReactComponent || !sr(n, r) || !sr(a, o);
      }
      function qo(e, t, n) {
        var r = !1,
          a = _a,
          o = t.contextType;
        return (
          'object' == typeof o && null !== o
            ? (o = To(o))
            : ((a = Pa(t) ? Na : La.current), (o = (r = null != (r = t.contextTypes)) ? Ra(e, a) : _a)),
          (t = new t(n, o)),
          (e.memoizedState = null !== t.state && void 0 !== t.state ? t.state : null),
          (t.updater = $o),
          (e.stateNode = t),
          (t._reactInternals = e),
          r &&
            (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = a),
            (e.__reactInternalMemoizedMaskedChildContext = o)),
          t
        );
      }
      function Go(e, t, n, r) {
        (e = t.state),
          'function' == typeof t.componentWillReceiveProps && t.componentWillReceiveProps(n, r),
          'function' == typeof t.UNSAFE_componentWillReceiveProps && t.UNSAFE_componentWillReceiveProps(n, r),
          t.state !== e && $o.enqueueReplaceState(t, t.state, null);
      }
      function Zo(e, t, n, r) {
        var a = e.stateNode;
        (a.props = n), (a.state = e.memoizedState), (a.refs = jo), Po(e);
        var o = t.contextType;
        'object' == typeof o && null !== o
          ? (a.context = To(o))
          : ((o = Pa(t) ? Na : La.current), (a.context = Ra(e, o))),
          (a.state = e.memoizedState),
          'function' == typeof (o = t.getDerivedStateFromProps) && (Uo(e, t, o, n), (a.state = e.memoizedState)),
          'function' == typeof t.getDerivedStateFromProps ||
            'function' == typeof a.getSnapshotBeforeUpdate ||
            ('function' != typeof a.UNSAFE_componentWillMount && 'function' != typeof a.componentWillMount) ||
            ((t = a.state),
            'function' == typeof a.componentWillMount && a.componentWillMount(),
            'function' == typeof a.UNSAFE_componentWillMount && a.UNSAFE_componentWillMount(),
            t !== a.state && $o.enqueueReplaceState(a, a.state, null),
            Bo(e, n, a, r),
            (a.state = e.memoizedState)),
          'function' == typeof a.componentDidMount && (e.flags |= 4194308);
      }
      function Vo(e, t, n) {
        if (null !== (e = n.ref) && 'function' != typeof e && 'object' != typeof e) {
          if (n._owner) {
            if ((n = n._owner)) {
              if (1 !== n.tag) throw Error(o(309));
              var r = n.stateNode;
            }
            if (!r) throw Error(o(147, e));
            var a = r,
              i = '' + e;
            return null !== t && null !== t.ref && 'function' == typeof t.ref && t.ref._stringRef === i
              ? t.ref
              : ((t = function (e) {
                  var t = a.refs;
                  t === jo && (t = a.refs = {}), null === e ? delete t[i] : (t[i] = e);
                }),
                (t._stringRef = i),
                t);
          }
          if ('string' != typeof e) throw Error(o(284));
          if (!n._owner) throw Error(o(290, e));
        }
        return e;
      }
      function Wo(e, t) {
        throw (
          ((e = Object.prototype.toString.call(t)),
          Error(o(31, '[object Object]' === e ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e)))
        );
      }
      function Ko(e) {
        return (0, e._init)(e._payload);
      }
      function Qo(e) {
        function t(t, n) {
          if (e) {
            var r = t.deletions;
            null === r ? ((t.deletions = [n]), (t.flags |= 16)) : r.push(n);
          }
        }
        function n(n, r) {
          if (!e) return null;
          for (; null !== r; ) t(n, r), (r = r.sibling);
          return null;
        }
        function r(e, t) {
          for (e = new Map(); null !== t; ) null !== t.key ? e.set(t.key, t) : e.set(t.index, t), (t = t.sibling);
          return e;
        }
        function a(e, t) {
          return ((e = Du(e, t)).index = 0), (e.sibling = null), e;
        }
        function i(t, n, r) {
          return (
            (t.index = r),
            e
              ? null !== (r = t.alternate)
                ? (r = r.index) < n
                  ? ((t.flags |= 2), n)
                  : r
                : ((t.flags |= 2), n)
              : ((t.flags |= 1048576), n)
          );
        }
        function l(t) {
          return e && null === t.alternate && (t.flags |= 2), t;
        }
        function s(e, t, n, r) {
          return null === t || 6 !== t.tag ? (((t = Bu(n, e.mode, r)).return = e), t) : (((t = a(t, n)).return = e), t);
        }
        function u(e, t, n, r) {
          var o = n.type;
          return o === S
            ? d(e, t, n.props.children, r, n.key)
            : null !== t &&
              (t.elementType === o || ('object' == typeof o && null !== o && o.$$typeof === P && Ko(o) === t.type))
            ? (((r = a(t, n.props)).ref = Vo(e, t, n)), (r.return = e), r)
            : (((r = Iu(n.type, n.key, n.props, null, e.mode, r)).ref = Vo(e, t, n)), (r.return = e), r);
        }
        function c(e, t, n, r) {
          return null === t ||
            4 !== t.tag ||
            t.stateNode.containerInfo !== n.containerInfo ||
            t.stateNode.implementation !== n.implementation
            ? (((t = zu(n, e.mode, r)).return = e), t)
            : (((t = a(t, n.children || [])).return = e), t);
        }
        function d(e, t, n, r, o) {
          return null === t || 7 !== t.tag
            ? (((t = Mu(n, e.mode, r, o)).return = e), t)
            : (((t = a(t, n)).return = e), t);
        }
        function f(e, t, n) {
          if (('string' == typeof t && '' !== t) || 'number' == typeof t)
            return ((t = Bu('' + t, e.mode, n)).return = e), t;
          if ('object' == typeof t && null !== t) {
            switch (t.$$typeof) {
              case k:
                return ((n = Iu(t.type, t.key, t.props, null, e.mode, n)).ref = Vo(e, null, t)), (n.return = e), n;
              case E:
                return ((t = zu(t, e.mode, n)).return = e), t;
              case P:
                return f(e, (0, t._init)(t._payload), n);
            }
            if (te(t) || I(t)) return ((t = Mu(t, e.mode, n, null)).return = e), t;
            Wo(e, t);
          }
          return null;
        }
        function p(e, t, n, r) {
          var a = null !== t ? t.key : null;
          if (('string' == typeof n && '' !== n) || 'number' == typeof n) return null !== a ? null : s(e, t, '' + n, r);
          if ('object' == typeof n && null !== n) {
            switch (n.$$typeof) {
              case k:
                return n.key === a ? u(e, t, n, r) : null;
              case E:
                return n.key === a ? c(e, t, n, r) : null;
              case P:
                return p(e, t, (a = n._init)(n._payload), r);
            }
            if (te(n) || I(n)) return null !== a ? null : d(e, t, n, r, null);
            Wo(e, n);
          }
          return null;
        }
        function m(e, t, n, r, a) {
          if (('string' == typeof r && '' !== r) || 'number' == typeof r)
            return s(t, (e = e.get(n) || null), '' + r, a);
          if ('object' == typeof r && null !== r) {
            switch (r.$$typeof) {
              case k:
                return u(t, (e = e.get(null === r.key ? n : r.key) || null), r, a);
              case E:
                return c(t, (e = e.get(null === r.key ? n : r.key) || null), r, a);
              case P:
                return m(e, t, n, (0, r._init)(r._payload), a);
            }
            if (te(r) || I(r)) return d(t, (e = e.get(n) || null), r, a, null);
            Wo(t, r);
          }
          return null;
        }
        function g(a, o, l, s) {
          for (var u = null, c = null, d = o, g = (o = 0), h = null; null !== d && g < l.length; g++) {
            d.index > g ? ((h = d), (d = null)) : (h = d.sibling);
            var v = p(a, d, l[g], s);
            if (null === v) {
              null === d && (d = h);
              break;
            }
            e && d && null === v.alternate && t(a, d),
              (o = i(v, o, g)),
              null === c ? (u = v) : (c.sibling = v),
              (c = v),
              (d = h);
          }
          if (g === l.length) return n(a, d), ao && Xa(a, g), u;
          if (null === d) {
            for (; g < l.length; g++)
              null !== (d = f(a, l[g], s)) && ((o = i(d, o, g)), null === c ? (u = d) : (c.sibling = d), (c = d));
            return ao && Xa(a, g), u;
          }
          for (d = r(a, d); g < l.length; g++)
            null !== (h = m(d, a, g, l[g], s)) &&
              (e && null !== h.alternate && d.delete(null === h.key ? g : h.key),
              (o = i(h, o, g)),
              null === c ? (u = h) : (c.sibling = h),
              (c = h));
          return (
            e &&
              d.forEach(function (e) {
                return t(a, e);
              }),
            ao && Xa(a, g),
            u
          );
        }
        function h(a, l, s, u) {
          var c = I(s);
          if ('function' != typeof c) throw Error(o(150));
          if (null == (s = c.call(s))) throw Error(o(151));
          for (
            var d = (c = null), g = l, h = (l = 0), v = null, b = s.next();
            null !== g && !b.done;
            h++, b = s.next()
          ) {
            g.index > h ? ((v = g), (g = null)) : (v = g.sibling);
            var y = p(a, g, b.value, u);
            if (null === y) {
              null === g && (g = v);
              break;
            }
            e && g && null === y.alternate && t(a, g),
              (l = i(y, l, h)),
              null === d ? (c = y) : (d.sibling = y),
              (d = y),
              (g = v);
          }
          if (b.done) return n(a, g), ao && Xa(a, h), c;
          if (null === g) {
            for (; !b.done; h++, b = s.next())
              null !== (b = f(a, b.value, u)) && ((l = i(b, l, h)), null === d ? (c = b) : (d.sibling = b), (d = b));
            return ao && Xa(a, h), c;
          }
          for (g = r(a, g); !b.done; h++, b = s.next())
            null !== (b = m(g, a, h, b.value, u)) &&
              (e && null !== b.alternate && g.delete(null === b.key ? h : b.key),
              (l = i(b, l, h)),
              null === d ? (c = b) : (d.sibling = b),
              (d = b));
          return (
            e &&
              g.forEach(function (e) {
                return t(a, e);
              }),
            ao && Xa(a, h),
            c
          );
        }
        return function e(r, o, i, s) {
          if (
            ('object' == typeof i && null !== i && i.type === S && null === i.key && (i = i.props.children),
            'object' == typeof i && null !== i)
          ) {
            switch (i.$$typeof) {
              case k:
                e: {
                  for (var u = i.key, c = o; null !== c; ) {
                    if (c.key === u) {
                      if ((u = i.type) === S) {
                        if (7 === c.tag) {
                          n(r, c.sibling), ((o = a(c, i.props.children)).return = r), (r = o);
                          break e;
                        }
                      } else if (
                        c.elementType === u ||
                        ('object' == typeof u && null !== u && u.$$typeof === P && Ko(u) === c.type)
                      ) {
                        n(r, c.sibling), ((o = a(c, i.props)).ref = Vo(r, c, i)), (o.return = r), (r = o);
                        break e;
                      }
                      n(r, c);
                      break;
                    }
                    t(r, c), (c = c.sibling);
                  }
                  i.type === S
                    ? (((o = Mu(i.props.children, r.mode, s, i.key)).return = r), (r = o))
                    : (((s = Iu(i.type, i.key, i.props, null, r.mode, s)).ref = Vo(r, o, i)), (s.return = r), (r = s));
                }
                return l(r);
              case E:
                e: {
                  for (c = i.key; null !== o; ) {
                    if (o.key === c) {
                      if (
                        4 === o.tag &&
                        o.stateNode.containerInfo === i.containerInfo &&
                        o.stateNode.implementation === i.implementation
                      ) {
                        n(r, o.sibling), ((o = a(o, i.children || [])).return = r), (r = o);
                        break e;
                      }
                      n(r, o);
                      break;
                    }
                    t(r, o), (o = o.sibling);
                  }
                  ((o = zu(i, r.mode, s)).return = r), (r = o);
                }
                return l(r);
              case P:
                return e(r, o, (c = i._init)(i._payload), s);
            }
            if (te(i)) return g(r, o, i, s);
            if (I(i)) return h(r, o, i, s);
            Wo(r, i);
          }
          return ('string' == typeof i && '' !== i) || 'number' == typeof i
            ? ((i = '' + i),
              null !== o && 6 === o.tag
                ? (n(r, o.sibling), ((o = a(o, i)).return = r), (r = o))
                : (n(r, o), ((o = Bu(i, r.mode, s)).return = r), (r = o)),
              l(r))
            : n(r, o);
        };
      }
      var Yo = Qo(!0),
        Xo = Qo(!1),
        Jo = {},
        ei = xa(Jo),
        ti = xa(Jo),
        ni = xa(Jo);
      function ri(e) {
        if (e === Jo) throw Error(o(174));
        return e;
      }
      function ai(e, t) {
        switch ((Ta(ni, t), Ta(ti, e), Ta(ei, Jo), (e = t.nodeType))) {
          case 9:
          case 11:
            t = (t = t.documentElement) ? t.namespaceURI : se(null, '');
            break;
          default:
            t = se((t = (e = 8 === e ? t.parentNode : t).namespaceURI || null), (e = e.tagName));
        }
        Ca(ei), Ta(ei, t);
      }
      function oi() {
        Ca(ei), Ca(ti), Ca(ni);
      }
      function ii(e) {
        ri(ni.current);
        var t = ri(ei.current),
          n = se(t, e.type);
        t !== n && (Ta(ti, e), Ta(ei, n));
      }
      function li(e) {
        ti.current === e && (Ca(ei), Ca(ti));
      }
      var si = xa(0);
      function ui(e) {
        for (var t = e; null !== t; ) {
          if (13 === t.tag) {
            var n = t.memoizedState;
            if (null !== n && (null === (n = n.dehydrated) || '$?' === n.data || '$!' === n.data)) return t;
          } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
            if (0 != (128 & t.flags)) return t;
          } else if (null !== t.child) {
            (t.child.return = t), (t = t.child);
            continue;
          }
          if (t === e) break;
          for (; null === t.sibling; ) {
            if (null === t.return || t.return === e) return null;
            t = t.return;
          }
          (t.sibling.return = t.return), (t = t.sibling);
        }
        return null;
      }
      var ci = [];
      function di() {
        for (var e = 0; e < ci.length; e++) ci[e]._workInProgressVersionPrimary = null;
        ci.length = 0;
      }
      var fi = w.ReactCurrentDispatcher,
        pi = w.ReactCurrentBatchConfig,
        mi = 0,
        gi = null,
        hi = null,
        vi = null,
        bi = !1,
        yi = !1,
        wi = 0,
        ki = 0;
      function Ei() {
        throw Error(o(321));
      }
      function Si(e, t) {
        if (null === t) return !1;
        for (var n = 0; n < t.length && n < e.length; n++) if (!lr(e[n], t[n])) return !1;
        return !0;
      }
      function xi(e, t, n, r, a, i) {
        if (
          ((mi = i),
          (gi = t),
          (t.memoizedState = null),
          (t.updateQueue = null),
          (t.lanes = 0),
          (fi.current = null === e || null === e.memoizedState ? ll : sl),
          (e = n(r, a)),
          yi)
        ) {
          i = 0;
          do {
            if (((yi = !1), (wi = 0), 25 <= i)) throw Error(o(301));
            (i += 1), (vi = hi = null), (t.updateQueue = null), (fi.current = ul), (e = n(r, a));
          } while (yi);
        }
        if (((fi.current = il), (t = null !== hi && null !== hi.next), (mi = 0), (vi = hi = gi = null), (bi = !1), t))
          throw Error(o(300));
        return e;
      }
      function Ci() {
        var e = 0 !== wi;
        return (wi = 0), e;
      }
      function Ti() {
        var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
        return null === vi ? (gi.memoizedState = vi = e) : (vi = vi.next = e), vi;
      }
      function _i() {
        if (null === hi) {
          var e = gi.alternate;
          e = null !== e ? e.memoizedState : null;
        } else e = hi.next;
        var t = null === vi ? gi.memoizedState : vi.next;
        if (null !== t) (vi = t), (hi = e);
        else {
          if (null === e) throw Error(o(310));
          (e = {
            memoizedState: (hi = e).memoizedState,
            baseState: hi.baseState,
            baseQueue: hi.baseQueue,
            queue: hi.queue,
            next: null,
          }),
            null === vi ? (gi.memoizedState = vi = e) : (vi = vi.next = e);
        }
        return vi;
      }
      function Li(e, t) {
        return 'function' == typeof t ? t(e) : t;
      }
      function Ai(e) {
        var t = _i(),
          n = t.queue;
        if (null === n) throw Error(o(311));
        n.lastRenderedReducer = e;
        var r = hi,
          a = r.baseQueue,
          i = n.pending;
        if (null !== i) {
          if (null !== a) {
            var l = a.next;
            (a.next = i.next), (i.next = l);
          }
          (r.baseQueue = a = i), (n.pending = null);
        }
        if (null !== a) {
          (i = a.next), (r = r.baseState);
          var s = (l = null),
            u = null,
            c = i;
          do {
            var d = c.lane;
            if ((mi & d) === d)
              null !== u &&
                (u = u.next =
                  { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }),
                (r = c.hasEagerState ? c.eagerState : e(r, c.action));
            else {
              var f = {
                lane: d,
                action: c.action,
                hasEagerState: c.hasEagerState,
                eagerState: c.eagerState,
                next: null,
              };
              null === u ? ((s = u = f), (l = r)) : (u = u.next = f), (gi.lanes |= d), (Fs |= d);
            }
            c = c.next;
          } while (null !== c && c !== i);
          null === u ? (l = r) : (u.next = s),
            lr(r, t.memoizedState) || (wl = !0),
            (t.memoizedState = r),
            (t.baseState = l),
            (t.baseQueue = u),
            (n.lastRenderedState = r);
        }
        if (null !== (e = n.interleaved)) {
          a = e;
          do {
            (i = a.lane), (gi.lanes |= i), (Fs |= i), (a = a.next);
          } while (a !== e);
        } else null === a && (n.lanes = 0);
        return [t.memoizedState, n.dispatch];
      }
      function Ni(e) {
        var t = _i(),
          n = t.queue;
        if (null === n) throw Error(o(311));
        n.lastRenderedReducer = e;
        var r = n.dispatch,
          a = n.pending,
          i = t.memoizedState;
        if (null !== a) {
          n.pending = null;
          var l = (a = a.next);
          do {
            (i = e(i, l.action)), (l = l.next);
          } while (l !== a);
          lr(i, t.memoizedState) || (wl = !0),
            (t.memoizedState = i),
            null === t.baseQueue && (t.baseState = i),
            (n.lastRenderedState = i);
        }
        return [i, r];
      }
      function Ri() {}
      function Pi(e, t) {
        var n = gi,
          r = _i(),
          a = t(),
          i = !lr(r.memoizedState, a);
        if (
          (i && ((r.memoizedState = a), (wl = !0)),
          (r = r.queue),
          qi(Ii.bind(null, n, r, e), [e]),
          r.getSnapshot !== t || i || (null !== vi && 1 & vi.memoizedState.tag))
        ) {
          if (((n.flags |= 2048), zi(9, Di.bind(null, n, r, a, t), void 0, null), null === Ns)) throw Error(o(349));
          0 != (30 & mi) || Oi(n, t, a);
        }
        return a;
      }
      function Oi(e, t, n) {
        (e.flags |= 16384),
          (e = { getSnapshot: t, value: n }),
          null === (t = gi.updateQueue)
            ? ((t = { lastEffect: null, stores: null }), (gi.updateQueue = t), (t.stores = [e]))
            : null === (n = t.stores)
            ? (t.stores = [e])
            : n.push(e);
      }
      function Di(e, t, n, r) {
        (t.value = n), (t.getSnapshot = r), Mi(t) && Fi(e);
      }
      function Ii(e, t, n) {
        return n(function () {
          Mi(t) && Fi(e);
        });
      }
      function Mi(e) {
        var t = e.getSnapshot;
        e = e.value;
        try {
          var n = t();
          return !lr(e, n);
        } catch (r) {
          return !0;
        }
      }
      function Fi(e) {
        var t = No(e, 1);
        null !== t && ru(t, e, 1, -1);
      }
      function Bi(e) {
        var t = Ti();
        return (
          'function' == typeof e && (e = e()),
          (t.memoizedState = t.baseState = e),
          (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: Li,
            lastRenderedState: e,
          }),
          (t.queue = e),
          (e = e.dispatch = nl.bind(null, gi, e)),
          [t.memoizedState, e]
        );
      }
      function zi(e, t, n, r) {
        return (
          (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
          null === (t = gi.updateQueue)
            ? ((t = { lastEffect: null, stores: null }), (gi.updateQueue = t), (t.lastEffect = e.next = e))
            : null === (n = t.lastEffect)
            ? (t.lastEffect = e.next = e)
            : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e)),
          e
        );
      }
      function ji() {
        return _i().memoizedState;
      }
      function Ui(e, t, n, r) {
        var a = Ti();
        (gi.flags |= e), (a.memoizedState = zi(1 | t, n, void 0, void 0 === r ? null : r));
      }
      function $i(e, t, n, r) {
        var a = _i();
        r = void 0 === r ? null : r;
        var o = void 0;
        if (null !== hi) {
          var i = hi.memoizedState;
          if (((o = i.destroy), null !== r && Si(r, i.deps))) return void (a.memoizedState = zi(t, n, o, r));
        }
        (gi.flags |= e), (a.memoizedState = zi(1 | t, n, o, r));
      }
      function Hi(e, t) {
        return Ui(8390656, 8, e, t);
      }
      function qi(e, t) {
        return $i(2048, 8, e, t);
      }
      function Gi(e, t) {
        return $i(4, 2, e, t);
      }
      function Zi(e, t) {
        return $i(4, 4, e, t);
      }
      function Vi(e, t) {
        return 'function' == typeof t
          ? ((e = e()),
            t(e),
            function () {
              t(null);
            })
          : null != t
          ? ((e = e()),
            (t.current = e),
            function () {
              t.current = null;
            })
          : void 0;
      }
      function Wi(e, t, n) {
        return (n = null != n ? n.concat([e]) : null), $i(4, 4, Vi.bind(null, t, e), n);
      }
      function Ki() {}
      function Qi(e, t) {
        var n = _i();
        t = void 0 === t ? null : t;
        var r = n.memoizedState;
        return null !== r && null !== t && Si(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
      }
      function Yi(e, t) {
        var n = _i();
        t = void 0 === t ? null : t;
        var r = n.memoizedState;
        return null !== r && null !== t && Si(t, r[1]) ? r[0] : ((e = e()), (n.memoizedState = [e, t]), e);
      }
      function Xi(e, t, n) {
        return 0 == (21 & mi)
          ? (e.baseState && ((e.baseState = !1), (wl = !0)), (e.memoizedState = n))
          : (lr(n, t) || ((n = gt()), (gi.lanes |= n), (Fs |= n), (e.baseState = !0)), t);
      }
      function Ji(e, t) {
        var n = yt;
        (yt = 0 !== n && 4 > n ? n : 4), e(!0);
        var r = pi.transition;
        pi.transition = {};
        try {
          e(!1), t();
        } finally {
          (yt = n), (pi.transition = r);
        }
      }
      function el() {
        return _i().memoizedState;
      }
      function tl(e, t, n) {
        var r = nu(e);
        if (((n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }), rl(e))) al(t, n);
        else if (null !== (n = Ao(e, t, n, r))) {
          ru(n, e, r, tu()), ol(n, t, r);
        }
      }
      function nl(e, t, n) {
        var r = nu(e),
          a = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
        if (rl(e)) al(t, a);
        else {
          var o = e.alternate;
          if (0 === e.lanes && (null === o || 0 === o.lanes) && null !== (o = t.lastRenderedReducer))
            try {
              var i = t.lastRenderedState,
                l = o(i, n);
              if (((a.hasEagerState = !0), (a.eagerState = l), lr(l, i))) {
                var s = t.interleaved;
                return null === s ? ((a.next = a), Lo(t)) : ((a.next = s.next), (s.next = a)), void (t.interleaved = a);
              }
            } catch (u) {}
          null !== (n = Ao(e, t, a, r)) && (ru(n, e, r, (a = tu())), ol(n, t, r));
        }
      }
      function rl(e) {
        var t = e.alternate;
        return e === gi || (null !== t && t === gi);
      }
      function al(e, t) {
        yi = bi = !0;
        var n = e.pending;
        null === n ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t);
      }
      function ol(e, t, n) {
        if (0 != (4194240 & n)) {
          var r = t.lanes;
          (n |= r &= e.pendingLanes), (t.lanes = n), bt(e, n);
        }
      }
      var il = {
          readContext: To,
          useCallback: Ei,
          useContext: Ei,
          useEffect: Ei,
          useImperativeHandle: Ei,
          useInsertionEffect: Ei,
          useLayoutEffect: Ei,
          useMemo: Ei,
          useReducer: Ei,
          useRef: Ei,
          useState: Ei,
          useDebugValue: Ei,
          useDeferredValue: Ei,
          useTransition: Ei,
          useMutableSource: Ei,
          useSyncExternalStore: Ei,
          useId: Ei,
          unstable_isNewReconciler: !1,
        },
        ll = {
          readContext: To,
          useCallback: function (e, t) {
            return (Ti().memoizedState = [e, void 0 === t ? null : t]), e;
          },
          useContext: To,
          useEffect: Hi,
          useImperativeHandle: function (e, t, n) {
            return (n = null != n ? n.concat([e]) : null), Ui(4194308, 4, Vi.bind(null, t, e), n);
          },
          useLayoutEffect: function (e, t) {
            return Ui(4194308, 4, e, t);
          },
          useInsertionEffect: function (e, t) {
            return Ui(4, 2, e, t);
          },
          useMemo: function (e, t) {
            var n = Ti();
            return (t = void 0 === t ? null : t), (e = e()), (n.memoizedState = [e, t]), e;
          },
          useReducer: function (e, t, n) {
            var r = Ti();
            return (
              (t = void 0 !== n ? n(t) : t),
              (r.memoizedState = r.baseState = t),
              (e = {
                pending: null,
                interleaved: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: e,
                lastRenderedState: t,
              }),
              (r.queue = e),
              (e = e.dispatch = tl.bind(null, gi, e)),
              [r.memoizedState, e]
            );
          },
          useRef: function (e) {
            return (e = { current: e }), (Ti().memoizedState = e);
          },
          useState: Bi,
          useDebugValue: Ki,
          useDeferredValue: function (e) {
            return (Ti().memoizedState = e);
          },
          useTransition: function () {
            var e = Bi(!1),
              t = e[0];
            return (e = Ji.bind(null, e[1])), (Ti().memoizedState = e), [t, e];
          },
          useMutableSource: function () {},
          useSyncExternalStore: function (e, t, n) {
            var r = gi,
              a = Ti();
            if (ao) {
              if (void 0 === n) throw Error(o(407));
              n = n();
            } else {
              if (((n = t()), null === Ns)) throw Error(o(349));
              0 != (30 & mi) || Oi(r, t, n);
            }
            a.memoizedState = n;
            var i = { value: n, getSnapshot: t };
            return (
              (a.queue = i),
              Hi(Ii.bind(null, r, i, e), [e]),
              (r.flags |= 2048),
              zi(9, Di.bind(null, r, i, n, t), void 0, null),
              n
            );
          },
          useId: function () {
            var e = Ti(),
              t = Ns.identifierPrefix;
            if (ao) {
              var n = Ya;
              (t = ':' + t + 'R' + (n = (Qa & ~(1 << (32 - it(Qa) - 1))).toString(32) + n)),
                0 < (n = wi++) && (t += 'H' + n.toString(32)),
                (t += ':');
            } else t = ':' + t + 'r' + (n = ki++).toString(32) + ':';
            return (e.memoizedState = t);
          },
          unstable_isNewReconciler: !1,
        },
        sl = {
          readContext: To,
          useCallback: Qi,
          useContext: To,
          useEffect: qi,
          useImperativeHandle: Wi,
          useInsertionEffect: Gi,
          useLayoutEffect: Zi,
          useMemo: Yi,
          useReducer: Ai,
          useRef: ji,
          useState: function () {
            return Ai(Li);
          },
          useDebugValue: Ki,
          useDeferredValue: function (e) {
            return Xi(_i(), hi.memoizedState, e);
          },
          useTransition: function () {
            return [Ai(Li)[0], _i().memoizedState];
          },
          useMutableSource: Ri,
          useSyncExternalStore: Pi,
          useId: el,
          unstable_isNewReconciler: !1,
        },
        ul = {
          readContext: To,
          useCallback: Qi,
          useContext: To,
          useEffect: qi,
          useImperativeHandle: Wi,
          useInsertionEffect: Gi,
          useLayoutEffect: Zi,
          useMemo: Yi,
          useReducer: Ni,
          useRef: ji,
          useState: function () {
            return Ni(Li);
          },
          useDebugValue: Ki,
          useDeferredValue: function (e) {
            var t = _i();
            return null === hi ? (t.memoizedState = e) : Xi(t, hi.memoizedState, e);
          },
          useTransition: function () {
            return [Ni(Li)[0], _i().memoizedState];
          },
          useMutableSource: Ri,
          useSyncExternalStore: Pi,
          useId: el,
          unstable_isNewReconciler: !1,
        };
      function cl(e, t) {
        try {
          var n = '',
            r = t;
          do {
            (n += U(r)), (r = r.return);
          } while (r);
          var a = n;
        } catch (o) {
          a = '\nError generating stack: ' + o.message + '\n' + o.stack;
        }
        return { value: e, source: t, stack: a, digest: null };
      }
      function dl(e, t, n) {
        return { value: e, source: null, stack: null != n ? n : null, digest: null != t ? t : null };
      }
      function fl(e, t) {
        try {
          console.error(t.value);
        } catch (n) {
          setTimeout(function () {
            throw n;
          });
        }
      }
      var pl = 'function' == typeof WeakMap ? WeakMap : Map;
      function ml(e, t, n) {
        ((n = Do(-1, n)).tag = 3), (n.payload = { element: null });
        var r = t.value;
        return (
          (n.callback = function () {
            Gs || ((Gs = !0), (Zs = r)), fl(0, t);
          }),
          n
        );
      }
      function gl(e, t, n) {
        (n = Do(-1, n)).tag = 3;
        var r = e.type.getDerivedStateFromError;
        if ('function' == typeof r) {
          var a = t.value;
          (n.payload = function () {
            return r(a);
          }),
            (n.callback = function () {
              fl(0, t);
            });
        }
        var o = e.stateNode;
        return (
          null !== o &&
            'function' == typeof o.componentDidCatch &&
            (n.callback = function () {
              fl(0, t), 'function' != typeof r && (null === Vs ? (Vs = new Set([this])) : Vs.add(this));
              var e = t.stack;
              this.componentDidCatch(t.value, { componentStack: null !== e ? e : '' });
            }),
          n
        );
      }
      function hl(e, t, n) {
        var r = e.pingCache;
        if (null === r) {
          r = e.pingCache = new pl();
          var a = new Set();
          r.set(t, a);
        } else void 0 === (a = r.get(t)) && ((a = new Set()), r.set(t, a));
        a.has(n) || (a.add(n), (e = Tu.bind(null, e, t, n)), t.then(e, e));
      }
      function vl(e) {
        do {
          var t;
          if (((t = 13 === e.tag) && (t = null === (t = e.memoizedState) || null !== t.dehydrated), t)) return e;
          e = e.return;
        } while (null !== e);
        return null;
      }
      function bl(e, t, n, r, a) {
        return 0 == (1 & e.mode)
          ? (e === t
              ? (e.flags |= 65536)
              : ((e.flags |= 128),
                (n.flags |= 131072),
                (n.flags &= -52805),
                1 === n.tag && (null === n.alternate ? (n.tag = 17) : (((t = Do(-1, 1)).tag = 2), Io(n, t, 1))),
                (n.lanes |= 1)),
            e)
          : ((e.flags |= 65536), (e.lanes = a), e);
      }
      var yl = w.ReactCurrentOwner,
        wl = !1;
      function kl(e, t, n, r) {
        t.child = null === e ? Xo(t, null, n, r) : Yo(t, e.child, n, r);
      }
      function El(e, t, n, r, a) {
        n = n.render;
        var o = t.ref;
        return (
          Co(t, a),
          (r = xi(e, t, n, r, o, a)),
          (n = Ci()),
          null === e || wl
            ? (ao && n && eo(t), (t.flags |= 1), kl(e, t, r, a), t.child)
            : ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a), Gl(e, t, a))
        );
      }
      function Sl(e, t, n, r, a) {
        if (null === e) {
          var o = n.type;
          return 'function' != typeof o ||
            Ou(o) ||
            void 0 !== o.defaultProps ||
            null !== n.compare ||
            void 0 !== n.defaultProps
            ? (((e = Iu(n.type, null, r, t, t.mode, a)).ref = t.ref), (e.return = t), (t.child = e))
            : ((t.tag = 15), (t.type = o), xl(e, t, o, r, a));
        }
        if (((o = e.child), 0 == (e.lanes & a))) {
          var i = o.memoizedProps;
          if ((n = null !== (n = n.compare) ? n : sr)(i, r) && e.ref === t.ref) return Gl(e, t, a);
        }
        return (t.flags |= 1), ((e = Du(o, r)).ref = t.ref), (e.return = t), (t.child = e);
      }
      function xl(e, t, n, r, a) {
        if (null !== e) {
          var o = e.memoizedProps;
          if (sr(o, r) && e.ref === t.ref) {
            if (((wl = !1), (t.pendingProps = r = o), 0 == (e.lanes & a))) return (t.lanes = e.lanes), Gl(e, t, a);
            0 != (131072 & e.flags) && (wl = !0);
          }
        }
        return _l(e, t, n, r, a);
      }
      function Cl(e, t, n) {
        var r = t.pendingProps,
          a = r.children,
          o = null !== e ? e.memoizedState : null;
        if ('hidden' === r.mode)
          if (0 == (1 & t.mode))
            (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }), Ta(Ds, Os), (Os |= n);
          else {
            if (0 == (1073741824 & n))
              return (
                (e = null !== o ? o.baseLanes | n : n),
                (t.lanes = t.childLanes = 1073741824),
                (t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }),
                (t.updateQueue = null),
                Ta(Ds, Os),
                (Os |= e),
                null
              );
            (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
              (r = null !== o ? o.baseLanes : n),
              Ta(Ds, Os),
              (Os |= r);
          }
        else null !== o ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n), Ta(Ds, Os), (Os |= r);
        return kl(e, t, a, n), t.child;
      }
      function Tl(e, t) {
        var n = t.ref;
        ((null === e && null !== n) || (null !== e && e.ref !== n)) && ((t.flags |= 512), (t.flags |= 2097152));
      }
      function _l(e, t, n, r, a) {
        var o = Pa(n) ? Na : La.current;
        return (
          (o = Ra(t, o)),
          Co(t, a),
          (n = xi(e, t, n, r, o, a)),
          (r = Ci()),
          null === e || wl
            ? (ao && r && eo(t), (t.flags |= 1), kl(e, t, n, a), t.child)
            : ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a), Gl(e, t, a))
        );
      }
      function Ll(e, t, n, r, a) {
        if (Pa(n)) {
          var o = !0;
          Ma(t);
        } else o = !1;
        if ((Co(t, a), null === t.stateNode)) ql(e, t), qo(t, n, r), Zo(t, n, r, a), (r = !0);
        else if (null === e) {
          var i = t.stateNode,
            l = t.memoizedProps;
          i.props = l;
          var s = i.context,
            u = n.contextType;
          'object' == typeof u && null !== u ? (u = To(u)) : (u = Ra(t, (u = Pa(n) ? Na : La.current)));
          var c = n.getDerivedStateFromProps,
            d = 'function' == typeof c || 'function' == typeof i.getSnapshotBeforeUpdate;
          d ||
            ('function' != typeof i.UNSAFE_componentWillReceiveProps &&
              'function' != typeof i.componentWillReceiveProps) ||
            ((l !== r || s !== u) && Go(t, i, r, u)),
            (Ro = !1);
          var f = t.memoizedState;
          (i.state = f),
            Bo(t, r, i, a),
            (s = t.memoizedState),
            l !== r || f !== s || Aa.current || Ro
              ? ('function' == typeof c && (Uo(t, n, c, r), (s = t.memoizedState)),
                (l = Ro || Ho(t, n, l, r, f, s, u))
                  ? (d ||
                      ('function' != typeof i.UNSAFE_componentWillMount && 'function' != typeof i.componentWillMount) ||
                      ('function' == typeof i.componentWillMount && i.componentWillMount(),
                      'function' == typeof i.UNSAFE_componentWillMount && i.UNSAFE_componentWillMount()),
                    'function' == typeof i.componentDidMount && (t.flags |= 4194308))
                  : ('function' == typeof i.componentDidMount && (t.flags |= 4194308),
                    (t.memoizedProps = r),
                    (t.memoizedState = s)),
                (i.props = r),
                (i.state = s),
                (i.context = u),
                (r = l))
              : ('function' == typeof i.componentDidMount && (t.flags |= 4194308), (r = !1));
        } else {
          (i = t.stateNode),
            Oo(e, t),
            (l = t.memoizedProps),
            (u = t.type === t.elementType ? l : vo(t.type, l)),
            (i.props = u),
            (d = t.pendingProps),
            (f = i.context),
            'object' == typeof (s = n.contextType) && null !== s
              ? (s = To(s))
              : (s = Ra(t, (s = Pa(n) ? Na : La.current)));
          var p = n.getDerivedStateFromProps;
          (c = 'function' == typeof p || 'function' == typeof i.getSnapshotBeforeUpdate) ||
            ('function' != typeof i.UNSAFE_componentWillReceiveProps &&
              'function' != typeof i.componentWillReceiveProps) ||
            ((l !== d || f !== s) && Go(t, i, r, s)),
            (Ro = !1),
            (f = t.memoizedState),
            (i.state = f),
            Bo(t, r, i, a);
          var m = t.memoizedState;
          l !== d || f !== m || Aa.current || Ro
            ? ('function' == typeof p && (Uo(t, n, p, r), (m = t.memoizedState)),
              (u = Ro || Ho(t, n, u, r, f, m, s) || !1)
                ? (c ||
                    ('function' != typeof i.UNSAFE_componentWillUpdate && 'function' != typeof i.componentWillUpdate) ||
                    ('function' == typeof i.componentWillUpdate && i.componentWillUpdate(r, m, s),
                    'function' == typeof i.UNSAFE_componentWillUpdate && i.UNSAFE_componentWillUpdate(r, m, s)),
                  'function' == typeof i.componentDidUpdate && (t.flags |= 4),
                  'function' == typeof i.getSnapshotBeforeUpdate && (t.flags |= 1024))
                : ('function' != typeof i.componentDidUpdate ||
                    (l === e.memoizedProps && f === e.memoizedState) ||
                    (t.flags |= 4),
                  'function' != typeof i.getSnapshotBeforeUpdate ||
                    (l === e.memoizedProps && f === e.memoizedState) ||
                    (t.flags |= 1024),
                  (t.memoizedProps = r),
                  (t.memoizedState = m)),
              (i.props = r),
              (i.state = m),
              (i.context = s),
              (r = u))
            : ('function' != typeof i.componentDidUpdate ||
                (l === e.memoizedProps && f === e.memoizedState) ||
                (t.flags |= 4),
              'function' != typeof i.getSnapshotBeforeUpdate ||
                (l === e.memoizedProps && f === e.memoizedState) ||
                (t.flags |= 1024),
              (r = !1));
        }
        return Al(e, t, n, r, o, a);
      }
      function Al(e, t, n, r, a, o) {
        Tl(e, t);
        var i = 0 != (128 & t.flags);
        if (!r && !i) return a && Fa(t, n, !1), Gl(e, t, o);
        (r = t.stateNode), (yl.current = t);
        var l = i && 'function' != typeof n.getDerivedStateFromError ? null : r.render();
        return (
          (t.flags |= 1),
          null !== e && i ? ((t.child = Yo(t, e.child, null, o)), (t.child = Yo(t, null, l, o))) : kl(e, t, l, o),
          (t.memoizedState = r.state),
          a && Fa(t, n, !0),
          t.child
        );
      }
      function Nl(e) {
        var t = e.stateNode;
        t.pendingContext ? Da(0, t.pendingContext, t.pendingContext !== t.context) : t.context && Da(0, t.context, !1),
          ai(e, t.containerInfo);
      }
      function Rl(e, t, n, r, a) {
        return mo(), go(a), (t.flags |= 256), kl(e, t, n, r), t.child;
      }
      var Pl,
        Ol,
        Dl,
        Il,
        Ml = { dehydrated: null, treeContext: null, retryLane: 0 };
      function Fl(e) {
        return { baseLanes: e, cachePool: null, transitions: null };
      }
      function Bl(e, t, n) {
        var r,
          a = t.pendingProps,
          i = si.current,
          l = !1,
          s = 0 != (128 & t.flags);
        if (
          ((r = s) || (r = (null === e || null !== e.memoizedState) && 0 != (2 & i)),
          r ? ((l = !0), (t.flags &= -129)) : (null !== e && null === e.memoizedState) || (i |= 1),
          Ta(si, 1 & i),
          null === e)
        )
          return (
            uo(t),
            null !== (e = t.memoizedState) && null !== (e = e.dehydrated)
              ? (0 == (1 & t.mode) ? (t.lanes = 1) : '$!' === e.data ? (t.lanes = 8) : (t.lanes = 1073741824), null)
              : ((s = a.children),
                (e = a.fallback),
                l
                  ? ((a = t.mode),
                    (l = t.child),
                    (s = { mode: 'hidden', children: s }),
                    0 == (1 & a) && null !== l ? ((l.childLanes = 0), (l.pendingProps = s)) : (l = Fu(s, a, 0, null)),
                    (e = Mu(e, a, n, null)),
                    (l.return = t),
                    (e.return = t),
                    (l.sibling = e),
                    (t.child = l),
                    (t.child.memoizedState = Fl(n)),
                    (t.memoizedState = Ml),
                    e)
                  : zl(t, s))
          );
        if (null !== (i = e.memoizedState) && null !== (r = i.dehydrated))
          return (function (e, t, n, r, a, i, l) {
            if (n)
              return 256 & t.flags
                ? ((t.flags &= -257), jl(e, t, l, (r = dl(Error(o(422))))))
                : null !== t.memoizedState
                ? ((t.child = e.child), (t.flags |= 128), null)
                : ((i = r.fallback),
                  (a = t.mode),
                  (r = Fu({ mode: 'visible', children: r.children }, a, 0, null)),
                  ((i = Mu(i, a, l, null)).flags |= 2),
                  (r.return = t),
                  (i.return = t),
                  (r.sibling = i),
                  (t.child = r),
                  0 != (1 & t.mode) && Yo(t, e.child, null, l),
                  (t.child.memoizedState = Fl(l)),
                  (t.memoizedState = Ml),
                  i);
            if (0 == (1 & t.mode)) return jl(e, t, l, null);
            if ('$!' === a.data) {
              if ((r = a.nextSibling && a.nextSibling.dataset)) var s = r.dgst;
              return (r = s), jl(e, t, l, (r = dl((i = Error(o(419))), r, void 0)));
            }
            if (((s = 0 != (l & e.childLanes)), wl || s)) {
              if (null !== (r = Ns)) {
                switch (l & -l) {
                  case 4:
                    a = 2;
                    break;
                  case 16:
                    a = 8;
                    break;
                  case 64:
                  case 128:
                  case 256:
                  case 512:
                  case 1024:
                  case 2048:
                  case 4096:
                  case 8192:
                  case 16384:
                  case 32768:
                  case 65536:
                  case 131072:
                  case 262144:
                  case 524288:
                  case 1048576:
                  case 2097152:
                  case 4194304:
                  case 8388608:
                  case 16777216:
                  case 33554432:
                  case 67108864:
                    a = 32;
                    break;
                  case 536870912:
                    a = 268435456;
                    break;
                  default:
                    a = 0;
                }
                0 !== (a = 0 != (a & (r.suspendedLanes | l)) ? 0 : a) &&
                  a !== i.retryLane &&
                  ((i.retryLane = a), No(e, a), ru(r, e, a, -1));
              }
              return hu(), jl(e, t, l, (r = dl(Error(o(421)))));
            }
            return '$?' === a.data
              ? ((t.flags |= 128), (t.child = e.child), (t = Lu.bind(null, e)), (a._reactRetry = t), null)
              : ((e = i.treeContext),
                (ro = ua(a.nextSibling)),
                (no = t),
                (ao = !0),
                (oo = null),
                null !== e &&
                  ((Va[Wa++] = Qa), (Va[Wa++] = Ya), (Va[Wa++] = Ka), (Qa = e.id), (Ya = e.overflow), (Ka = t)),
                (t = zl(t, r.children)),
                (t.flags |= 4096),
                t);
          })(e, t, s, a, r, i, n);
        if (l) {
          (l = a.fallback), (s = t.mode), (r = (i = e.child).sibling);
          var u = { mode: 'hidden', children: a.children };
          return (
            0 == (1 & s) && t.child !== i
              ? (((a = t.child).childLanes = 0), (a.pendingProps = u), (t.deletions = null))
              : ((a = Du(i, u)).subtreeFlags = 14680064 & i.subtreeFlags),
            null !== r ? (l = Du(r, l)) : ((l = Mu(l, s, n, null)).flags |= 2),
            (l.return = t),
            (a.return = t),
            (a.sibling = l),
            (t.child = a),
            (a = l),
            (l = t.child),
            (s =
              null === (s = e.child.memoizedState)
                ? Fl(n)
                : { baseLanes: s.baseLanes | n, cachePool: null, transitions: s.transitions }),
            (l.memoizedState = s),
            (l.childLanes = e.childLanes & ~n),
            (t.memoizedState = Ml),
            a
          );
        }
        return (
          (e = (l = e.child).sibling),
          (a = Du(l, { mode: 'visible', children: a.children })),
          0 == (1 & t.mode) && (a.lanes = n),
          (a.return = t),
          (a.sibling = null),
          null !== e && (null === (n = t.deletions) ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
          (t.child = a),
          (t.memoizedState = null),
          a
        );
      }
      function zl(e, t) {
        return ((t = Fu({ mode: 'visible', children: t }, e.mode, 0, null)).return = e), (e.child = t);
      }
      function jl(e, t, n, r) {
        return (
          null !== r && go(r),
          Yo(t, e.child, null, n),
          ((e = zl(t, t.pendingProps.children)).flags |= 2),
          (t.memoizedState = null),
          e
        );
      }
      function Ul(e, t, n) {
        e.lanes |= t;
        var r = e.alternate;
        null !== r && (r.lanes |= t), xo(e.return, t, n);
      }
      function $l(e, t, n, r, a) {
        var o = e.memoizedState;
        null === o
          ? (e.memoizedState = {
              isBackwards: t,
              rendering: null,
              renderingStartTime: 0,
              last: r,
              tail: n,
              tailMode: a,
            })
          : ((o.isBackwards = t),
            (o.rendering = null),
            (o.renderingStartTime = 0),
            (o.last = r),
            (o.tail = n),
            (o.tailMode = a));
      }
      function Hl(e, t, n) {
        var r = t.pendingProps,
          a = r.revealOrder,
          o = r.tail;
        if ((kl(e, t, r.children, n), 0 != (2 & (r = si.current)))) (r = (1 & r) | 2), (t.flags |= 128);
        else {
          if (null !== e && 0 != (128 & e.flags))
            e: for (e = t.child; null !== e; ) {
              if (13 === e.tag) null !== e.memoizedState && Ul(e, n, t);
              else if (19 === e.tag) Ul(e, n, t);
              else if (null !== e.child) {
                (e.child.return = e), (e = e.child);
                continue;
              }
              if (e === t) break e;
              for (; null === e.sibling; ) {
                if (null === e.return || e.return === t) break e;
                e = e.return;
              }
              (e.sibling.return = e.return), (e = e.sibling);
            }
          r &= 1;
        }
        if ((Ta(si, r), 0 == (1 & t.mode))) t.memoizedState = null;
        else
          switch (a) {
            case 'forwards':
              for (n = t.child, a = null; null !== n; )
                null !== (e = n.alternate) && null === ui(e) && (a = n), (n = n.sibling);
              null === (n = a) ? ((a = t.child), (t.child = null)) : ((a = n.sibling), (n.sibling = null)),
                $l(t, !1, a, n, o);
              break;
            case 'backwards':
              for (n = null, a = t.child, t.child = null; null !== a; ) {
                if (null !== (e = a.alternate) && null === ui(e)) {
                  t.child = a;
                  break;
                }
                (e = a.sibling), (a.sibling = n), (n = a), (a = e);
              }
              $l(t, !0, n, null, o);
              break;
            case 'together':
              $l(t, !1, null, null, void 0);
              break;
            default:
              t.memoizedState = null;
          }
        return t.child;
      }
      function ql(e, t) {
        0 == (1 & t.mode) && null !== e && ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
      }
      function Gl(e, t, n) {
        if ((null !== e && (t.dependencies = e.dependencies), (Fs |= t.lanes), 0 == (n & t.childLanes))) return null;
        if (null !== e && t.child !== e.child) throw Error(o(153));
        if (null !== t.child) {
          for (n = Du((e = t.child), e.pendingProps), t.child = n, n.return = t; null !== e.sibling; )
            (e = e.sibling), ((n = n.sibling = Du(e, e.pendingProps)).return = t);
          n.sibling = null;
        }
        return t.child;
      }
      function Zl(e, t) {
        if (!ao)
          switch (e.tailMode) {
            case 'hidden':
              t = e.tail;
              for (var n = null; null !== t; ) null !== t.alternate && (n = t), (t = t.sibling);
              null === n ? (e.tail = null) : (n.sibling = null);
              break;
            case 'collapsed':
              n = e.tail;
              for (var r = null; null !== n; ) null !== n.alternate && (r = n), (n = n.sibling);
              null === r ? (t || null === e.tail ? (e.tail = null) : (e.tail.sibling = null)) : (r.sibling = null);
          }
      }
      function Vl(e) {
        var t = null !== e.alternate && e.alternate.child === e.child,
          n = 0,
          r = 0;
        if (t)
          for (var a = e.child; null !== a; )
            (n |= a.lanes | a.childLanes),
              (r |= 14680064 & a.subtreeFlags),
              (r |= 14680064 & a.flags),
              (a.return = e),
              (a = a.sibling);
        else
          for (a = e.child; null !== a; )
            (n |= a.lanes | a.childLanes), (r |= a.subtreeFlags), (r |= a.flags), (a.return = e), (a = a.sibling);
        return (e.subtreeFlags |= r), (e.childLanes = n), t;
      }
      function Wl(e, t, n) {
        var r = t.pendingProps;
        switch ((to(t), t.tag)) {
          case 2:
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return Vl(t), null;
          case 1:
          case 17:
            return Pa(t.type) && Oa(), Vl(t), null;
          case 3:
            return (
              (r = t.stateNode),
              oi(),
              Ca(Aa),
              Ca(La),
              di(),
              r.pendingContext && ((r.context = r.pendingContext), (r.pendingContext = null)),
              (null !== e && null !== e.child) ||
                (fo(t)
                  ? (t.flags |= 4)
                  : null === e ||
                    (e.memoizedState.isDehydrated && 0 == (256 & t.flags)) ||
                    ((t.flags |= 1024), null !== oo && (lu(oo), (oo = null)))),
              Ol(e, t),
              Vl(t),
              null
            );
          case 5:
            li(t);
            var a = ri(ni.current);
            if (((n = t.type), null !== e && null != t.stateNode))
              Dl(e, t, n, r, a), e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
            else {
              if (!r) {
                if (null === t.stateNode) throw Error(o(166));
                return Vl(t), null;
              }
              if (((e = ri(ei.current)), fo(t))) {
                (r = t.stateNode), (n = t.type);
                var i = t.memoizedProps;
                switch (((r[fa] = t), (r[pa] = i), (e = 0 != (1 & t.mode)), n)) {
                  case 'dialog':
                    zr('cancel', r), zr('close', r);
                    break;
                  case 'iframe':
                  case 'object':
                  case 'embed':
                    zr('load', r);
                    break;
                  case 'video':
                  case 'audio':
                    for (a = 0; a < Ir.length; a++) zr(Ir[a], r);
                    break;
                  case 'source':
                    zr('error', r);
                    break;
                  case 'img':
                  case 'image':
                  case 'link':
                    zr('error', r), zr('load', r);
                    break;
                  case 'details':
                    zr('toggle', r);
                    break;
                  case 'input':
                    Q(r, i), zr('invalid', r);
                    break;
                  case 'select':
                    (r._wrapperState = { wasMultiple: !!i.multiple }), zr('invalid', r);
                    break;
                  case 'textarea':
                    ae(r, i), zr('invalid', r);
                }
                for (var s in (be(n, i), (a = null), i))
                  if (i.hasOwnProperty(s)) {
                    var u = i[s];
                    'children' === s
                      ? 'string' == typeof u
                        ? r.textContent !== u &&
                          (!0 !== i.suppressHydrationWarning && Xr(r.textContent, u, e), (a = ['children', u]))
                        : 'number' == typeof u &&
                          r.textContent !== '' + u &&
                          (!0 !== i.suppressHydrationWarning && Xr(r.textContent, u, e), (a = ['children', '' + u]))
                      : l.hasOwnProperty(s) && null != u && 'onScroll' === s && zr('scroll', r);
                  }
                switch (n) {
                  case 'input':
                    Z(r), J(r, i, !0);
                    break;
                  case 'textarea':
                    Z(r), ie(r);
                    break;
                  case 'select':
                  case 'option':
                    break;
                  default:
                    'function' == typeof i.onClick && (r.onclick = Jr);
                }
                (r = a), (t.updateQueue = r), null !== r && (t.flags |= 4);
              } else {
                (s = 9 === a.nodeType ? a : a.ownerDocument),
                  'http://www.w3.org/1999/xhtml' === e && (e = le(n)),
                  'http://www.w3.org/1999/xhtml' === e
                    ? 'script' === n
                      ? (((e = s.createElement('div')).innerHTML = '<script></script>'),
                        (e = e.removeChild(e.firstChild)))
                      : 'string' == typeof r.is
                      ? (e = s.createElement(n, { is: r.is }))
                      : ((e = s.createElement(n)),
                        'select' === n && ((s = e), r.multiple ? (s.multiple = !0) : r.size && (s.size = r.size)))
                    : (e = s.createElementNS(e, n)),
                  (e[fa] = t),
                  (e[pa] = r),
                  Pl(e, t, !1, !1),
                  (t.stateNode = e);
                e: {
                  switch (((s = ye(n, r)), n)) {
                    case 'dialog':
                      zr('cancel', e), zr('close', e), (a = r);
                      break;
                    case 'iframe':
                    case 'object':
                    case 'embed':
                      zr('load', e), (a = r);
                      break;
                    case 'video':
                    case 'audio':
                      for (a = 0; a < Ir.length; a++) zr(Ir[a], e);
                      a = r;
                      break;
                    case 'source':
                      zr('error', e), (a = r);
                      break;
                    case 'img':
                    case 'image':
                    case 'link':
                      zr('error', e), zr('load', e), (a = r);
                      break;
                    case 'details':
                      zr('toggle', e), (a = r);
                      break;
                    case 'input':
                      Q(e, r), (a = K(e, r)), zr('invalid', e);
                      break;
                    case 'option':
                    default:
                      a = r;
                      break;
                    case 'select':
                      (e._wrapperState = { wasMultiple: !!r.multiple }),
                        (a = F({}, r, { value: void 0 })),
                        zr('invalid', e);
                      break;
                    case 'textarea':
                      ae(e, r), (a = re(e, r)), zr('invalid', e);
                  }
                  for (i in (be(n, a), (u = a)))
                    if (u.hasOwnProperty(i)) {
                      var c = u[i];
                      'style' === i
                        ? he(e, c)
                        : 'dangerouslySetInnerHTML' === i
                        ? null != (c = c ? c.__html : void 0) && de(e, c)
                        : 'children' === i
                        ? 'string' == typeof c
                          ? ('textarea' !== n || '' !== c) && fe(e, c)
                          : 'number' == typeof c && fe(e, '' + c)
                        : 'suppressContentEditableWarning' !== i &&
                          'suppressHydrationWarning' !== i &&
                          'autoFocus' !== i &&
                          (l.hasOwnProperty(i)
                            ? null != c && 'onScroll' === i && zr('scroll', e)
                            : null != c && y(e, i, c, s));
                    }
                  switch (n) {
                    case 'input':
                      Z(e), J(e, r, !1);
                      break;
                    case 'textarea':
                      Z(e), ie(e);
                      break;
                    case 'option':
                      null != r.value && e.setAttribute('value', '' + q(r.value));
                      break;
                    case 'select':
                      (e.multiple = !!r.multiple),
                        null != (i = r.value)
                          ? ne(e, !!r.multiple, i, !1)
                          : null != r.defaultValue && ne(e, !!r.multiple, r.defaultValue, !0);
                      break;
                    default:
                      'function' == typeof a.onClick && (e.onclick = Jr);
                  }
                  switch (n) {
                    case 'button':
                    case 'input':
                    case 'select':
                    case 'textarea':
                      r = !!r.autoFocus;
                      break e;
                    case 'img':
                      r = !0;
                      break e;
                    default:
                      r = !1;
                  }
                }
                r && (t.flags |= 4);
              }
              null !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
            }
            return Vl(t), null;
          case 6:
            if (e && null != t.stateNode) Il(e, t, e.memoizedProps, r);
            else {
              if ('string' != typeof r && null === t.stateNode) throw Error(o(166));
              if (((n = ri(ni.current)), ri(ei.current), fo(t))) {
                if (
                  ((r = t.stateNode), (n = t.memoizedProps), (r[fa] = t), (i = r.nodeValue !== n) && null !== (e = no))
                )
                  switch (e.tag) {
                    case 3:
                      Xr(r.nodeValue, n, 0 != (1 & e.mode));
                      break;
                    case 5:
                      !0 !== e.memoizedProps.suppressHydrationWarning && Xr(r.nodeValue, n, 0 != (1 & e.mode));
                  }
                i && (t.flags |= 4);
              } else ((r = (9 === n.nodeType ? n : n.ownerDocument).createTextNode(r))[fa] = t), (t.stateNode = r);
            }
            return Vl(t), null;
          case 13:
            if (
              (Ca(si),
              (r = t.memoizedState),
              null === e || (null !== e.memoizedState && null !== e.memoizedState.dehydrated))
            ) {
              if (ao && null !== ro && 0 != (1 & t.mode) && 0 == (128 & t.flags))
                po(), mo(), (t.flags |= 98560), (i = !1);
              else if (((i = fo(t)), null !== r && null !== r.dehydrated)) {
                if (null === e) {
                  if (!i) throw Error(o(318));
                  if (!(i = null !== (i = t.memoizedState) ? i.dehydrated : null)) throw Error(o(317));
                  i[fa] = t;
                } else mo(), 0 == (128 & t.flags) && (t.memoizedState = null), (t.flags |= 4);
                Vl(t), (i = !1);
              } else null !== oo && (lu(oo), (oo = null)), (i = !0);
              if (!i) return 65536 & t.flags ? t : null;
            }
            return 0 != (128 & t.flags)
              ? ((t.lanes = n), t)
              : ((r = null !== r) !== (null !== e && null !== e.memoizedState) &&
                  r &&
                  ((t.child.flags |= 8192),
                  0 != (1 & t.mode) && (null === e || 0 != (1 & si.current) ? 0 === Is && (Is = 3) : hu())),
                null !== t.updateQueue && (t.flags |= 4),
                Vl(t),
                null);
          case 4:
            return oi(), Ol(e, t), null === e && $r(t.stateNode.containerInfo), Vl(t), null;
          case 10:
            return So(t.type._context), Vl(t), null;
          case 19:
            if ((Ca(si), null === (i = t.memoizedState))) return Vl(t), null;
            if (((r = 0 != (128 & t.flags)), null === (s = i.rendering)))
              if (r) Zl(i, !1);
              else {
                if (0 !== Is || (null !== e && 0 != (128 & e.flags)))
                  for (e = t.child; null !== e; ) {
                    if (null !== (s = ui(e))) {
                      for (
                        t.flags |= 128,
                          Zl(i, !1),
                          null !== (r = s.updateQueue) && ((t.updateQueue = r), (t.flags |= 4)),
                          t.subtreeFlags = 0,
                          r = n,
                          n = t.child;
                        null !== n;

                      )
                        (e = r),
                          ((i = n).flags &= 14680066),
                          null === (s = i.alternate)
                            ? ((i.childLanes = 0),
                              (i.lanes = e),
                              (i.child = null),
                              (i.subtreeFlags = 0),
                              (i.memoizedProps = null),
                              (i.memoizedState = null),
                              (i.updateQueue = null),
                              (i.dependencies = null),
                              (i.stateNode = null))
                            : ((i.childLanes = s.childLanes),
                              (i.lanes = s.lanes),
                              (i.child = s.child),
                              (i.subtreeFlags = 0),
                              (i.deletions = null),
                              (i.memoizedProps = s.memoizedProps),
                              (i.memoizedState = s.memoizedState),
                              (i.updateQueue = s.updateQueue),
                              (i.type = s.type),
                              (e = s.dependencies),
                              (i.dependencies = null === e ? null : { lanes: e.lanes, firstContext: e.firstContext })),
                          (n = n.sibling);
                      return Ta(si, (1 & si.current) | 2), t.child;
                    }
                    e = e.sibling;
                  }
                null !== i.tail && Ye() > Hs && ((t.flags |= 128), (r = !0), Zl(i, !1), (t.lanes = 4194304));
              }
            else {
              if (!r)
                if (null !== (e = ui(s))) {
                  if (
                    ((t.flags |= 128),
                    (r = !0),
                    null !== (n = e.updateQueue) && ((t.updateQueue = n), (t.flags |= 4)),
                    Zl(i, !0),
                    null === i.tail && 'hidden' === i.tailMode && !s.alternate && !ao)
                  )
                    return Vl(t), null;
                } else
                  2 * Ye() - i.renderingStartTime > Hs &&
                    1073741824 !== n &&
                    ((t.flags |= 128), (r = !0), Zl(i, !1), (t.lanes = 4194304));
              i.isBackwards
                ? ((s.sibling = t.child), (t.child = s))
                : (null !== (n = i.last) ? (n.sibling = s) : (t.child = s), (i.last = s));
            }
            return null !== i.tail
              ? ((t = i.tail),
                (i.rendering = t),
                (i.tail = t.sibling),
                (i.renderingStartTime = Ye()),
                (t.sibling = null),
                (n = si.current),
                Ta(si, r ? (1 & n) | 2 : 1 & n),
                t)
              : (Vl(t), null);
          case 22:
          case 23:
            return (
              fu(),
              (r = null !== t.memoizedState),
              null !== e && (null !== e.memoizedState) !== r && (t.flags |= 8192),
              r && 0 != (1 & t.mode)
                ? 0 != (1073741824 & Os) && (Vl(t), 6 & t.subtreeFlags && (t.flags |= 8192))
                : Vl(t),
              null
            );
          case 24:
          case 25:
            return null;
        }
        throw Error(o(156, t.tag));
      }
      function Kl(e, t) {
        switch ((to(t), t.tag)) {
          case 1:
            return Pa(t.type) && Oa(), 65536 & (e = t.flags) ? ((t.flags = (-65537 & e) | 128), t) : null;
          case 3:
            return (
              oi(),
              Ca(Aa),
              Ca(La),
              di(),
              0 != (65536 & (e = t.flags)) && 0 == (128 & e) ? ((t.flags = (-65537 & e) | 128), t) : null
            );
          case 5:
            return li(t), null;
          case 13:
            if ((Ca(si), null !== (e = t.memoizedState) && null !== e.dehydrated)) {
              if (null === t.alternate) throw Error(o(340));
              mo();
            }
            return 65536 & (e = t.flags) ? ((t.flags = (-65537 & e) | 128), t) : null;
          case 19:
            return Ca(si), null;
          case 4:
            return oi(), null;
          case 10:
            return So(t.type._context), null;
          case 22:
          case 23:
            return fu(), null;
          default:
            return null;
        }
      }
      (Pl = function (e, t) {
        for (var n = t.child; null !== n; ) {
          if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode);
          else if (4 !== n.tag && null !== n.child) {
            (n.child.return = n), (n = n.child);
            continue;
          }
          if (n === t) break;
          for (; null === n.sibling; ) {
            if (null === n.return || n.return === t) return;
            n = n.return;
          }
          (n.sibling.return = n.return), (n = n.sibling);
        }
      }),
        (Ol = function () {}),
        (Dl = function (e, t, n, r) {
          var a = e.memoizedProps;
          if (a !== r) {
            (e = t.stateNode), ri(ei.current);
            var o,
              i = null;
            switch (n) {
              case 'input':
                (a = K(e, a)), (r = K(e, r)), (i = []);
                break;
              case 'select':
                (a = F({}, a, { value: void 0 })), (r = F({}, r, { value: void 0 })), (i = []);
                break;
              case 'textarea':
                (a = re(e, a)), (r = re(e, r)), (i = []);
                break;
              default:
                'function' != typeof a.onClick && 'function' == typeof r.onClick && (e.onclick = Jr);
            }
            for (c in (be(n, r), (n = null), a))
              if (!r.hasOwnProperty(c) && a.hasOwnProperty(c) && null != a[c])
                if ('style' === c) {
                  var s = a[c];
                  for (o in s) s.hasOwnProperty(o) && (n || (n = {}), (n[o] = ''));
                } else
                  'dangerouslySetInnerHTML' !== c &&
                    'children' !== c &&
                    'suppressContentEditableWarning' !== c &&
                    'suppressHydrationWarning' !== c &&
                    'autoFocus' !== c &&
                    (l.hasOwnProperty(c) ? i || (i = []) : (i = i || []).push(c, null));
            for (c in r) {
              var u = r[c];
              if (((s = null != a ? a[c] : void 0), r.hasOwnProperty(c) && u !== s && (null != u || null != s)))
                if ('style' === c)
                  if (s) {
                    for (o in s) !s.hasOwnProperty(o) || (u && u.hasOwnProperty(o)) || (n || (n = {}), (n[o] = ''));
                    for (o in u) u.hasOwnProperty(o) && s[o] !== u[o] && (n || (n = {}), (n[o] = u[o]));
                  } else n || (i || (i = []), i.push(c, n)), (n = u);
                else
                  'dangerouslySetInnerHTML' === c
                    ? ((u = u ? u.__html : void 0),
                      (s = s ? s.__html : void 0),
                      null != u && s !== u && (i = i || []).push(c, u))
                    : 'children' === c
                    ? ('string' != typeof u && 'number' != typeof u) || (i = i || []).push(c, '' + u)
                    : 'suppressContentEditableWarning' !== c &&
                      'suppressHydrationWarning' !== c &&
                      (l.hasOwnProperty(c)
                        ? (null != u && 'onScroll' === c && zr('scroll', e), i || s === u || (i = []))
                        : (i = i || []).push(c, u));
            }
            n && (i = i || []).push('style', n);
            var c = i;
            (t.updateQueue = c) && (t.flags |= 4);
          }
        }),
        (Il = function (e, t, n, r) {
          n !== r && (t.flags |= 4);
        });
      var Ql = !1,
        Yl = !1,
        Xl = 'function' == typeof WeakSet ? WeakSet : Set,
        Jl = null;
      function es(e, t) {
        var n = e.ref;
        if (null !== n)
          if ('function' == typeof n)
            try {
              n(null);
            } catch (r) {
              Cu(e, t, r);
            }
          else n.current = null;
      }
      function ts(e, t, n) {
        try {
          n();
        } catch (r) {
          Cu(e, t, r);
        }
      }
      var ns = !1;
      function rs(e, t, n) {
        var r = t.updateQueue;
        if (null !== (r = null !== r ? r.lastEffect : null)) {
          var a = (r = r.next);
          do {
            if ((a.tag & e) === e) {
              var o = a.destroy;
              (a.destroy = void 0), void 0 !== o && ts(t, n, o);
            }
            a = a.next;
          } while (a !== r);
        }
      }
      function as(e, t) {
        if (null !== (t = null !== (t = t.updateQueue) ? t.lastEffect : null)) {
          var n = (t = t.next);
          do {
            if ((n.tag & e) === e) {
              var r = n.create;
              n.destroy = r();
            }
            n = n.next;
          } while (n !== t);
        }
      }
      function os(e) {
        var t = e.ref;
        if (null !== t) {
          var n = e.stateNode;
          e.tag, (e = n), 'function' == typeof t ? t(e) : (t.current = e);
        }
      }
      function is(e) {
        var t = e.alternate;
        null !== t && ((e.alternate = null), is(t)),
          (e.child = null),
          (e.deletions = null),
          (e.sibling = null),
          5 === e.tag &&
            null !== (t = e.stateNode) &&
            (delete t[fa], delete t[pa], delete t[ga], delete t[ha], delete t[va]),
          (e.stateNode = null),
          (e.return = null),
          (e.dependencies = null),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.pendingProps = null),
          (e.stateNode = null),
          (e.updateQueue = null);
      }
      function ls(e) {
        return 5 === e.tag || 3 === e.tag || 4 === e.tag;
      }
      function ss(e) {
        e: for (;;) {
          for (; null === e.sibling; ) {
            if (null === e.return || ls(e.return)) return null;
            e = e.return;
          }
          for (e.sibling.return = e.return, e = e.sibling; 5 !== e.tag && 6 !== e.tag && 18 !== e.tag; ) {
            if (2 & e.flags) continue e;
            if (null === e.child || 4 === e.tag) continue e;
            (e.child.return = e), (e = e.child);
          }
          if (!(2 & e.flags)) return e.stateNode;
        }
      }
      function us(e, t, n) {
        var r = e.tag;
        if (5 === r || 6 === r)
          (e = e.stateNode),
            t
              ? 8 === n.nodeType
                ? n.parentNode.insertBefore(e, t)
                : n.insertBefore(e, t)
              : (8 === n.nodeType ? (t = n.parentNode).insertBefore(e, n) : (t = n).appendChild(e),
                null != (n = n._reactRootContainer) || null !== t.onclick || (t.onclick = Jr));
        else if (4 !== r && null !== (e = e.child))
          for (us(e, t, n), e = e.sibling; null !== e; ) us(e, t, n), (e = e.sibling);
      }
      function cs(e, t, n) {
        var r = e.tag;
        if (5 === r || 6 === r) (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
        else if (4 !== r && null !== (e = e.child))
          for (cs(e, t, n), e = e.sibling; null !== e; ) cs(e, t, n), (e = e.sibling);
      }
      var ds = null,
        fs = !1;
      function ps(e, t, n) {
        for (n = n.child; null !== n; ) ms(e, t, n), (n = n.sibling);
      }
      function ms(e, t, n) {
        if (ot && 'function' == typeof ot.onCommitFiberUnmount)
          try {
            ot.onCommitFiberUnmount(at, n);
          } catch (l) {}
        switch (n.tag) {
          case 5:
            Yl || es(n, t);
          case 6:
            var r = ds,
              a = fs;
            (ds = null),
              ps(e, t, n),
              (fs = a),
              null !== (ds = r) &&
                (fs
                  ? ((e = ds), (n = n.stateNode), 8 === e.nodeType ? e.parentNode.removeChild(n) : e.removeChild(n))
                  : ds.removeChild(n.stateNode));
            break;
          case 18:
            null !== ds &&
              (fs
                ? ((e = ds),
                  (n = n.stateNode),
                  8 === e.nodeType ? sa(e.parentNode, n) : 1 === e.nodeType && sa(e, n),
                  $t(e))
                : sa(ds, n.stateNode));
            break;
          case 4:
            (r = ds), (a = fs), (ds = n.stateNode.containerInfo), (fs = !0), ps(e, t, n), (ds = r), (fs = a);
            break;
          case 0:
          case 11:
          case 14:
          case 15:
            if (!Yl && null !== (r = n.updateQueue) && null !== (r = r.lastEffect)) {
              a = r = r.next;
              do {
                var o = a,
                  i = o.destroy;
                (o = o.tag), void 0 !== i && (0 != (2 & o) || 0 != (4 & o)) && ts(n, t, i), (a = a.next);
              } while (a !== r);
            }
            ps(e, t, n);
            break;
          case 1:
            if (!Yl && (es(n, t), 'function' == typeof (r = n.stateNode).componentWillUnmount))
              try {
                (r.props = n.memoizedProps), (r.state = n.memoizedState), r.componentWillUnmount();
              } catch (l) {
                Cu(n, t, l);
              }
            ps(e, t, n);
            break;
          case 21:
            ps(e, t, n);
            break;
          case 22:
            1 & n.mode ? ((Yl = (r = Yl) || null !== n.memoizedState), ps(e, t, n), (Yl = r)) : ps(e, t, n);
            break;
          default:
            ps(e, t, n);
        }
      }
      function gs(e) {
        var t = e.updateQueue;
        if (null !== t) {
          e.updateQueue = null;
          var n = e.stateNode;
          null === n && (n = e.stateNode = new Xl()),
            t.forEach(function (t) {
              var r = Au.bind(null, e, t);
              n.has(t) || (n.add(t), t.then(r, r));
            });
        }
      }
      function hs(e, t) {
        var n = t.deletions;
        if (null !== n)
          for (var r = 0; r < n.length; r++) {
            var a = n[r];
            try {
              var i = e,
                l = t,
                s = l;
              e: for (; null !== s; ) {
                switch (s.tag) {
                  case 5:
                    (ds = s.stateNode), (fs = !1);
                    break e;
                  case 3:
                  case 4:
                    (ds = s.stateNode.containerInfo), (fs = !0);
                    break e;
                }
                s = s.return;
              }
              if (null === ds) throw Error(o(160));
              ms(i, l, a), (ds = null), (fs = !1);
              var u = a.alternate;
              null !== u && (u.return = null), (a.return = null);
            } catch (c) {
              Cu(a, t, c);
            }
          }
        if (12854 & t.subtreeFlags) for (t = t.child; null !== t; ) vs(t, e), (t = t.sibling);
      }
      function vs(e, t) {
        var n = e.alternate,
          r = e.flags;
        switch (e.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            if ((hs(t, e), bs(e), 4 & r)) {
              try {
                rs(3, e, e.return), as(3, e);
              } catch (h) {
                Cu(e, e.return, h);
              }
              try {
                rs(5, e, e.return);
              } catch (h) {
                Cu(e, e.return, h);
              }
            }
            break;
          case 1:
            hs(t, e), bs(e), 512 & r && null !== n && es(n, n.return);
            break;
          case 5:
            if ((hs(t, e), bs(e), 512 & r && null !== n && es(n, n.return), 32 & e.flags)) {
              var a = e.stateNode;
              try {
                fe(a, '');
              } catch (h) {
                Cu(e, e.return, h);
              }
            }
            if (4 & r && null != (a = e.stateNode)) {
              var i = e.memoizedProps,
                l = null !== n ? n.memoizedProps : i,
                s = e.type,
                u = e.updateQueue;
              if (((e.updateQueue = null), null !== u))
                try {
                  'input' === s && 'radio' === i.type && null != i.name && Y(a, i), ye(s, l);
                  var c = ye(s, i);
                  for (l = 0; l < u.length; l += 2) {
                    var d = u[l],
                      f = u[l + 1];
                    'style' === d
                      ? he(a, f)
                      : 'dangerouslySetInnerHTML' === d
                      ? de(a, f)
                      : 'children' === d
                      ? fe(a, f)
                      : y(a, d, f, c);
                  }
                  switch (s) {
                    case 'input':
                      X(a, i);
                      break;
                    case 'textarea':
                      oe(a, i);
                      break;
                    case 'select':
                      var p = a._wrapperState.wasMultiple;
                      a._wrapperState.wasMultiple = !!i.multiple;
                      var m = i.value;
                      null != m
                        ? ne(a, !!i.multiple, m, !1)
                        : p !== !!i.multiple &&
                          (null != i.defaultValue
                            ? ne(a, !!i.multiple, i.defaultValue, !0)
                            : ne(a, !!i.multiple, i.multiple ? [] : '', !1));
                  }
                  a[pa] = i;
                } catch (h) {
                  Cu(e, e.return, h);
                }
            }
            break;
          case 6:
            if ((hs(t, e), bs(e), 4 & r)) {
              if (null === e.stateNode) throw Error(o(162));
              (a = e.stateNode), (i = e.memoizedProps);
              try {
                a.nodeValue = i;
              } catch (h) {
                Cu(e, e.return, h);
              }
            }
            break;
          case 3:
            if ((hs(t, e), bs(e), 4 & r && null !== n && n.memoizedState.isDehydrated))
              try {
                $t(t.containerInfo);
              } catch (h) {
                Cu(e, e.return, h);
              }
            break;
          case 4:
          default:
            hs(t, e), bs(e);
            break;
          case 13:
            hs(t, e),
              bs(e),
              8192 & (a = e.child).flags &&
                ((i = null !== a.memoizedState),
                (a.stateNode.isHidden = i),
                !i || (null !== a.alternate && null !== a.alternate.memoizedState) || ($s = Ye())),
              4 & r && gs(e);
            break;
          case 22:
            if (
              ((d = null !== n && null !== n.memoizedState),
              1 & e.mode ? ((Yl = (c = Yl) || d), hs(t, e), (Yl = c)) : hs(t, e),
              bs(e),
              8192 & r)
            ) {
              if (((c = null !== e.memoizedState), (e.stateNode.isHidden = c) && !d && 0 != (1 & e.mode)))
                for (Jl = e, d = e.child; null !== d; ) {
                  for (f = Jl = d; null !== Jl; ) {
                    switch (((m = (p = Jl).child), p.tag)) {
                      case 0:
                      case 11:
                      case 14:
                      case 15:
                        rs(4, p, p.return);
                        break;
                      case 1:
                        es(p, p.return);
                        var g = p.stateNode;
                        if ('function' == typeof g.componentWillUnmount) {
                          (r = p), (n = p.return);
                          try {
                            (t = r), (g.props = t.memoizedProps), (g.state = t.memoizedState), g.componentWillUnmount();
                          } catch (h) {
                            Cu(r, n, h);
                          }
                        }
                        break;
                      case 5:
                        es(p, p.return);
                        break;
                      case 22:
                        if (null !== p.memoizedState) {
                          Es(f);
                          continue;
                        }
                    }
                    null !== m ? ((m.return = p), (Jl = m)) : Es(f);
                  }
                  d = d.sibling;
                }
              e: for (d = null, f = e; ; ) {
                if (5 === f.tag) {
                  if (null === d) {
                    d = f;
                    try {
                      (a = f.stateNode),
                        c
                          ? 'function' == typeof (i = a.style).setProperty
                            ? i.setProperty('display', 'none', 'important')
                            : (i.display = 'none')
                          : ((s = f.stateNode),
                            (l = null != (u = f.memoizedProps.style) && u.hasOwnProperty('display') ? u.display : null),
                            (s.style.display = ge('display', l)));
                    } catch (h) {
                      Cu(e, e.return, h);
                    }
                  }
                } else if (6 === f.tag) {
                  if (null === d)
                    try {
                      f.stateNode.nodeValue = c ? '' : f.memoizedProps;
                    } catch (h) {
                      Cu(e, e.return, h);
                    }
                } else if (
                  ((22 !== f.tag && 23 !== f.tag) || null === f.memoizedState || f === e) &&
                  null !== f.child
                ) {
                  (f.child.return = f), (f = f.child);
                  continue;
                }
                if (f === e) break e;
                for (; null === f.sibling; ) {
                  if (null === f.return || f.return === e) break e;
                  d === f && (d = null), (f = f.return);
                }
                d === f && (d = null), (f.sibling.return = f.return), (f = f.sibling);
              }
            }
            break;
          case 19:
            hs(t, e), bs(e), 4 & r && gs(e);
          case 21:
        }
      }
      function bs(e) {
        var t = e.flags;
        if (2 & t) {
          try {
            e: {
              for (var n = e.return; null !== n; ) {
                if (ls(n)) {
                  var r = n;
                  break e;
                }
                n = n.return;
              }
              throw Error(o(160));
            }
            switch (r.tag) {
              case 5:
                var a = r.stateNode;
                32 & r.flags && (fe(a, ''), (r.flags &= -33)), cs(e, ss(e), a);
                break;
              case 3:
              case 4:
                var i = r.stateNode.containerInfo;
                us(e, ss(e), i);
                break;
              default:
                throw Error(o(161));
            }
          } catch (l) {
            Cu(e, e.return, l);
          }
          e.flags &= -3;
        }
        4096 & t && (e.flags &= -4097);
      }
      function ys(e, t, n) {
        (Jl = e), ws(e, t, n);
      }
      function ws(e, t, n) {
        for (var r = 0 != (1 & e.mode); null !== Jl; ) {
          var a = Jl,
            o = a.child;
          if (22 === a.tag && r) {
            var i = null !== a.memoizedState || Ql;
            if (!i) {
              var l = a.alternate,
                s = (null !== l && null !== l.memoizedState) || Yl;
              l = Ql;
              var u = Yl;
              if (((Ql = i), (Yl = s) && !u))
                for (Jl = a; null !== Jl; )
                  (s = (i = Jl).child),
                    22 === i.tag && null !== i.memoizedState ? Ss(a) : null !== s ? ((s.return = i), (Jl = s)) : Ss(a);
              for (; null !== o; ) (Jl = o), ws(o, t, n), (o = o.sibling);
              (Jl = a), (Ql = l), (Yl = u);
            }
            ks(e);
          } else 0 != (8772 & a.subtreeFlags) && null !== o ? ((o.return = a), (Jl = o)) : ks(e);
        }
      }
      function ks(e) {
        for (; null !== Jl; ) {
          var t = Jl;
          if (0 != (8772 & t.flags)) {
            var n = t.alternate;
            try {
              if (0 != (8772 & t.flags))
                switch (t.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Yl || as(5, t);
                    break;
                  case 1:
                    var r = t.stateNode;
                    if (4 & t.flags && !Yl)
                      if (null === n) r.componentDidMount();
                      else {
                        var a = t.elementType === t.type ? n.memoizedProps : vo(t.type, n.memoizedProps);
                        r.componentDidUpdate(a, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                      }
                    var i = t.updateQueue;
                    null !== i && zo(t, i, r);
                    break;
                  case 3:
                    var l = t.updateQueue;
                    if (null !== l) {
                      if (((n = null), null !== t.child))
                        switch (t.child.tag) {
                          case 5:
                          case 1:
                            n = t.child.stateNode;
                        }
                      zo(t, l, n);
                    }
                    break;
                  case 5:
                    var s = t.stateNode;
                    if (null === n && 4 & t.flags) {
                      n = s;
                      var u = t.memoizedProps;
                      switch (t.type) {
                        case 'button':
                        case 'input':
                        case 'select':
                        case 'textarea':
                          u.autoFocus && n.focus();
                          break;
                        case 'img':
                          u.src && (n.src = u.src);
                      }
                    }
                    break;
                  case 6:
                  case 4:
                  case 12:
                  case 19:
                  case 17:
                  case 21:
                  case 22:
                  case 23:
                  case 25:
                    break;
                  case 13:
                    if (null === t.memoizedState) {
                      var c = t.alternate;
                      if (null !== c) {
                        var d = c.memoizedState;
                        if (null !== d) {
                          var f = d.dehydrated;
                          null !== f && $t(f);
                        }
                      }
                    }
                    break;
                  default:
                    throw Error(o(163));
                }
              Yl || (512 & t.flags && os(t));
            } catch (p) {
              Cu(t, t.return, p);
            }
          }
          if (t === e) {
            Jl = null;
            break;
          }
          if (null !== (n = t.sibling)) {
            (n.return = t.return), (Jl = n);
            break;
          }
          Jl = t.return;
        }
      }
      function Es(e) {
        for (; null !== Jl; ) {
          var t = Jl;
          if (t === e) {
            Jl = null;
            break;
          }
          var n = t.sibling;
          if (null !== n) {
            (n.return = t.return), (Jl = n);
            break;
          }
          Jl = t.return;
        }
      }
      function Ss(e) {
        for (; null !== Jl; ) {
          var t = Jl;
          try {
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                var n = t.return;
                try {
                  as(4, t);
                } catch (s) {
                  Cu(t, n, s);
                }
                break;
              case 1:
                var r = t.stateNode;
                if ('function' == typeof r.componentDidMount) {
                  var a = t.return;
                  try {
                    r.componentDidMount();
                  } catch (s) {
                    Cu(t, a, s);
                  }
                }
                var o = t.return;
                try {
                  os(t);
                } catch (s) {
                  Cu(t, o, s);
                }
                break;
              case 5:
                var i = t.return;
                try {
                  os(t);
                } catch (s) {
                  Cu(t, i, s);
                }
            }
          } catch (s) {
            Cu(t, t.return, s);
          }
          if (t === e) {
            Jl = null;
            break;
          }
          var l = t.sibling;
          if (null !== l) {
            (l.return = t.return), (Jl = l);
            break;
          }
          Jl = t.return;
        }
      }
      var xs,
        Cs = Math.ceil,
        Ts = w.ReactCurrentDispatcher,
        _s = w.ReactCurrentOwner,
        Ls = w.ReactCurrentBatchConfig,
        As = 0,
        Ns = null,
        Rs = null,
        Ps = 0,
        Os = 0,
        Ds = xa(0),
        Is = 0,
        Ms = null,
        Fs = 0,
        Bs = 0,
        zs = 0,
        js = null,
        Us = null,
        $s = 0,
        Hs = 1 / 0,
        qs = null,
        Gs = !1,
        Zs = null,
        Vs = null,
        Ws = !1,
        Ks = null,
        Qs = 0,
        Ys = 0,
        Xs = null,
        Js = -1,
        eu = 0;
      function tu() {
        return 0 != (6 & As) ? Ye() : -1 !== Js ? Js : (Js = Ye());
      }
      function nu(e) {
        return 0 == (1 & e.mode)
          ? 1
          : 0 != (2 & As) && 0 !== Ps
          ? Ps & -Ps
          : null !== ho.transition
          ? (0 === eu && (eu = gt()), eu)
          : 0 !== (e = yt)
          ? e
          : (e = void 0 === (e = window.event) ? 16 : Qt(e.type));
      }
      function ru(e, t, n, r) {
        if (50 < Ys) throw ((Ys = 0), (Xs = null), Error(o(185)));
        vt(e, n, r),
          (0 != (2 & As) && e === Ns) ||
            (e === Ns && (0 == (2 & As) && (Bs |= n), 4 === Is && su(e, Ps)),
            au(e, r),
            1 === n && 0 === As && 0 == (1 & t.mode) && ((Hs = Ye() + 500), za && $a()));
      }
      function au(e, t) {
        var n = e.callbackNode;
        !(function (e, t) {
          for (var n = e.suspendedLanes, r = e.pingedLanes, a = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
            var i = 31 - it(o),
              l = 1 << i,
              s = a[i];
            -1 === s ? (0 != (l & n) && 0 == (l & r)) || (a[i] = pt(l, t)) : s <= t && (e.expiredLanes |= l), (o &= ~l);
          }
        })(e, t);
        var r = ft(e, e === Ns ? Ps : 0);
        if (0 === r) null !== n && We(n), (e.callbackNode = null), (e.callbackPriority = 0);
        else if (((t = r & -r), e.callbackPriority !== t)) {
          if ((null != n && We(n), 1 === t))
            0 === e.tag
              ? (function (e) {
                  (za = !0), Ua(e);
                })(uu.bind(null, e))
              : Ua(uu.bind(null, e)),
              ia(function () {
                0 == (6 & As) && $a();
              }),
              (n = null);
          else {
            switch (wt(r)) {
              case 1:
                n = Je;
                break;
              case 4:
                n = et;
                break;
              case 16:
              default:
                n = tt;
                break;
              case 536870912:
                n = rt;
            }
            n = Nu(n, ou.bind(null, e));
          }
          (e.callbackPriority = t), (e.callbackNode = n);
        }
      }
      function ou(e, t) {
        if (((Js = -1), (eu = 0), 0 != (6 & As))) throw Error(o(327));
        var n = e.callbackNode;
        if (Su() && e.callbackNode !== n) return null;
        var r = ft(e, e === Ns ? Ps : 0);
        if (0 === r) return null;
        if (0 != (30 & r) || 0 != (r & e.expiredLanes) || t) t = vu(e, r);
        else {
          t = r;
          var a = As;
          As |= 2;
          var i = gu();
          for ((Ns === e && Ps === t) || ((qs = null), (Hs = Ye() + 500), pu(e, t)); ; )
            try {
              yu();
              break;
            } catch (s) {
              mu(e, s);
            }
          Eo(), (Ts.current = i), (As = a), null !== Rs ? (t = 0) : ((Ns = null), (Ps = 0), (t = Is));
        }
        if (0 !== t) {
          if ((2 === t && 0 !== (a = mt(e)) && ((r = a), (t = iu(e, a))), 1 === t))
            throw ((n = Ms), pu(e, 0), su(e, r), au(e, Ye()), n);
          if (6 === t) su(e, r);
          else {
            if (
              ((a = e.current.alternate),
              0 == (30 & r) &&
                !(function (e) {
                  for (var t = e; ; ) {
                    if (16384 & t.flags) {
                      var n = t.updateQueue;
                      if (null !== n && null !== (n = n.stores))
                        for (var r = 0; r < n.length; r++) {
                          var a = n[r],
                            o = a.getSnapshot;
                          a = a.value;
                          try {
                            if (!lr(o(), a)) return !1;
                          } catch (l) {
                            return !1;
                          }
                        }
                    }
                    if (((n = t.child), 16384 & t.subtreeFlags && null !== n)) (n.return = t), (t = n);
                    else {
                      if (t === e) break;
                      for (; null === t.sibling; ) {
                        if (null === t.return || t.return === e) return !0;
                        t = t.return;
                      }
                      (t.sibling.return = t.return), (t = t.sibling);
                    }
                  }
                  return !0;
                })(a) &&
                (2 === (t = vu(e, r)) && 0 !== (i = mt(e)) && ((r = i), (t = iu(e, i))), 1 === t))
            )
              throw ((n = Ms), pu(e, 0), su(e, r), au(e, Ye()), n);
            switch (((e.finishedWork = a), (e.finishedLanes = r), t)) {
              case 0:
              case 1:
                throw Error(o(345));
              case 2:
              case 5:
                Eu(e, Us, qs);
                break;
              case 3:
                if ((su(e, r), (130023424 & r) === r && 10 < (t = $s + 500 - Ye()))) {
                  if (0 !== ft(e, 0)) break;
                  if (((a = e.suspendedLanes) & r) !== r) {
                    tu(), (e.pingedLanes |= e.suspendedLanes & a);
                    break;
                  }
                  e.timeoutHandle = ra(Eu.bind(null, e, Us, qs), t);
                  break;
                }
                Eu(e, Us, qs);
                break;
              case 4:
                if ((su(e, r), (4194240 & r) === r)) break;
                for (t = e.eventTimes, a = -1; 0 < r; ) {
                  var l = 31 - it(r);
                  (i = 1 << l), (l = t[l]) > a && (a = l), (r &= ~i);
                }
                if (
                  ((r = a),
                  10 <
                    (r =
                      (120 > (r = Ye() - r)
                        ? 120
                        : 480 > r
                        ? 480
                        : 1080 > r
                        ? 1080
                        : 1920 > r
                        ? 1920
                        : 3e3 > r
                        ? 3e3
                        : 4320 > r
                        ? 4320
                        : 1960 * Cs(r / 1960)) - r))
                ) {
                  e.timeoutHandle = ra(Eu.bind(null, e, Us, qs), r);
                  break;
                }
                Eu(e, Us, qs);
                break;
              default:
                throw Error(o(329));
            }
          }
        }
        return au(e, Ye()), e.callbackNode === n ? ou.bind(null, e) : null;
      }
      function iu(e, t) {
        var n = js;
        return (
          e.current.memoizedState.isDehydrated && (pu(e, t).flags |= 256),
          2 !== (e = vu(e, t)) && ((t = Us), (Us = n), null !== t && lu(t)),
          e
        );
      }
      function lu(e) {
        null === Us ? (Us = e) : Us.push.apply(Us, e);
      }
      function su(e, t) {
        for (t &= ~zs, t &= ~Bs, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
          var n = 31 - it(t),
            r = 1 << n;
          (e[n] = -1), (t &= ~r);
        }
      }
      function uu(e) {
        if (0 != (6 & As)) throw Error(o(327));
        Su();
        var t = ft(e, 0);
        if (0 == (1 & t)) return au(e, Ye()), null;
        var n = vu(e, t);
        if (0 !== e.tag && 2 === n) {
          var r = mt(e);
          0 !== r && ((t = r), (n = iu(e, r)));
        }
        if (1 === n) throw ((n = Ms), pu(e, 0), su(e, t), au(e, Ye()), n);
        if (6 === n) throw Error(o(345));
        return (e.finishedWork = e.current.alternate), (e.finishedLanes = t), Eu(e, Us, qs), au(e, Ye()), null;
      }
      function cu(e, t) {
        var n = As;
        As |= 1;
        try {
          return e(t);
        } finally {
          0 === (As = n) && ((Hs = Ye() + 500), za && $a());
        }
      }
      function du(e) {
        null !== Ks && 0 === Ks.tag && 0 == (6 & As) && Su();
        var t = As;
        As |= 1;
        var n = Ls.transition,
          r = yt;
        try {
          if (((Ls.transition = null), (yt = 1), e)) return e();
        } finally {
          (yt = r), (Ls.transition = n), 0 == (6 & (As = t)) && $a();
        }
      }
      function fu() {
        (Os = Ds.current), Ca(Ds);
      }
      function pu(e, t) {
        (e.finishedWork = null), (e.finishedLanes = 0);
        var n = e.timeoutHandle;
        if ((-1 !== n && ((e.timeoutHandle = -1), aa(n)), null !== Rs))
          for (n = Rs.return; null !== n; ) {
            var r = n;
            switch ((to(r), r.tag)) {
              case 1:
                null != (r = r.type.childContextTypes) && Oa();
                break;
              case 3:
                oi(), Ca(Aa), Ca(La), di();
                break;
              case 5:
                li(r);
                break;
              case 4:
                oi();
                break;
              case 13:
              case 19:
                Ca(si);
                break;
              case 10:
                So(r.type._context);
                break;
              case 22:
              case 23:
                fu();
            }
            n = n.return;
          }
        if (
          ((Ns = e),
          (Rs = e = Du(e.current, null)),
          (Ps = Os = t),
          (Is = 0),
          (Ms = null),
          (zs = Bs = Fs = 0),
          (Us = js = null),
          null !== _o)
        ) {
          for (t = 0; t < _o.length; t++)
            if (null !== (r = (n = _o[t]).interleaved)) {
              n.interleaved = null;
              var a = r.next,
                o = n.pending;
              if (null !== o) {
                var i = o.next;
                (o.next = a), (r.next = i);
              }
              n.pending = r;
            }
          _o = null;
        }
        return e;
      }
      function mu(e, t) {
        for (;;) {
          var n = Rs;
          try {
            if ((Eo(), (fi.current = il), bi)) {
              for (var r = gi.memoizedState; null !== r; ) {
                var a = r.queue;
                null !== a && (a.pending = null), (r = r.next);
              }
              bi = !1;
            }
            if (
              ((mi = 0),
              (vi = hi = gi = null),
              (yi = !1),
              (wi = 0),
              (_s.current = null),
              null === n || null === n.return)
            ) {
              (Is = 1), (Ms = t), (Rs = null);
              break;
            }
            e: {
              var i = e,
                l = n.return,
                s = n,
                u = t;
              if (((t = Ps), (s.flags |= 32768), null !== u && 'object' == typeof u && 'function' == typeof u.then)) {
                var c = u,
                  d = s,
                  f = d.tag;
                if (0 == (1 & d.mode) && (0 === f || 11 === f || 15 === f)) {
                  var p = d.alternate;
                  p
                    ? ((d.updateQueue = p.updateQueue), (d.memoizedState = p.memoizedState), (d.lanes = p.lanes))
                    : ((d.updateQueue = null), (d.memoizedState = null));
                }
                var m = vl(l);
                if (null !== m) {
                  (m.flags &= -257), bl(m, l, s, 0, t), 1 & m.mode && hl(i, c, t), (u = c);
                  var g = (t = m).updateQueue;
                  if (null === g) {
                    var h = new Set();
                    h.add(u), (t.updateQueue = h);
                  } else g.add(u);
                  break e;
                }
                if (0 == (1 & t)) {
                  hl(i, c, t), hu();
                  break e;
                }
                u = Error(o(426));
              } else if (ao && 1 & s.mode) {
                var v = vl(l);
                if (null !== v) {
                  0 == (65536 & v.flags) && (v.flags |= 256), bl(v, l, s, 0, t), go(cl(u, s));
                  break e;
                }
              }
              (i = u = cl(u, s)), 4 !== Is && (Is = 2), null === js ? (js = [i]) : js.push(i), (i = l);
              do {
                switch (i.tag) {
                  case 3:
                    (i.flags |= 65536), (t &= -t), (i.lanes |= t), Fo(i, ml(0, u, t));
                    break e;
                  case 1:
                    s = u;
                    var b = i.type,
                      y = i.stateNode;
                    if (
                      0 == (128 & i.flags) &&
                      ('function' == typeof b.getDerivedStateFromError ||
                        (null !== y && 'function' == typeof y.componentDidCatch && (null === Vs || !Vs.has(y))))
                    ) {
                      (i.flags |= 65536), (t &= -t), (i.lanes |= t), Fo(i, gl(i, s, t));
                      break e;
                    }
                }
                i = i.return;
              } while (null !== i);
            }
            ku(n);
          } catch (w) {
            (t = w), Rs === n && null !== n && (Rs = n = n.return);
            continue;
          }
          break;
        }
      }
      function gu() {
        var e = Ts.current;
        return (Ts.current = il), null === e ? il : e;
      }
      function hu() {
        (0 !== Is && 3 !== Is && 2 !== Is) || (Is = 4),
          null === Ns || (0 == (268435455 & Fs) && 0 == (268435455 & Bs)) || su(Ns, Ps);
      }
      function vu(e, t) {
        var n = As;
        As |= 2;
        var r = gu();
        for ((Ns === e && Ps === t) || ((qs = null), pu(e, t)); ; )
          try {
            bu();
            break;
          } catch (a) {
            mu(e, a);
          }
        if ((Eo(), (As = n), (Ts.current = r), null !== Rs)) throw Error(o(261));
        return (Ns = null), (Ps = 0), Is;
      }
      function bu() {
        for (; null !== Rs; ) wu(Rs);
      }
      function yu() {
        for (; null !== Rs && !Ke(); ) wu(Rs);
      }
      function wu(e) {
        var t = xs(e.alternate, e, Os);
        (e.memoizedProps = e.pendingProps), null === t ? ku(e) : (Rs = t), (_s.current = null);
      }
      function ku(e) {
        var t = e;
        do {
          var n = t.alternate;
          if (((e = t.return), 0 == (32768 & t.flags))) {
            if (null !== (n = Wl(n, t, Os))) return void (Rs = n);
          } else {
            if (null !== (n = Kl(n, t))) return (n.flags &= 32767), void (Rs = n);
            if (null === e) return (Is = 6), void (Rs = null);
            (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
          }
          if (null !== (t = t.sibling)) return void (Rs = t);
          Rs = t = e;
        } while (null !== t);
        0 === Is && (Is = 5);
      }
      function Eu(e, t, n) {
        var r = yt,
          a = Ls.transition;
        try {
          (Ls.transition = null),
            (yt = 1),
            (function (e, t, n, r) {
              do {
                Su();
              } while (null !== Ks);
              if (0 != (6 & As)) throw Error(o(327));
              n = e.finishedWork;
              var a = e.finishedLanes;
              if (null === n) return null;
              if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current)) throw Error(o(177));
              (e.callbackNode = null), (e.callbackPriority = 0);
              var i = n.lanes | n.childLanes;
              if (
                ((function (e, t) {
                  var n = e.pendingLanes & ~t;
                  (e.pendingLanes = t),
                    (e.suspendedLanes = 0),
                    (e.pingedLanes = 0),
                    (e.expiredLanes &= t),
                    (e.mutableReadLanes &= t),
                    (e.entangledLanes &= t),
                    (t = e.entanglements);
                  var r = e.eventTimes;
                  for (e = e.expirationTimes; 0 < n; ) {
                    var a = 31 - it(n),
                      o = 1 << a;
                    (t[a] = 0), (r[a] = -1), (e[a] = -1), (n &= ~o);
                  }
                })(e, i),
                e === Ns && ((Rs = Ns = null), (Ps = 0)),
                (0 == (2064 & n.subtreeFlags) && 0 == (2064 & n.flags)) ||
                  Ws ||
                  ((Ws = !0),
                  Nu(tt, function () {
                    return Su(), null;
                  })),
                (i = 0 != (15990 & n.flags)),
                0 != (15990 & n.subtreeFlags) || i)
              ) {
                (i = Ls.transition), (Ls.transition = null);
                var l = yt;
                yt = 1;
                var s = As;
                (As |= 4),
                  (_s.current = null),
                  (function (e, t) {
                    if (((ea = qt), pr((e = fr())))) {
                      if ('selectionStart' in e) var n = { start: e.selectionStart, end: e.selectionEnd };
                      else
                        e: {
                          var r =
                            (n = ((n = e.ownerDocument) && n.defaultView) || window).getSelection && n.getSelection();
                          if (r && 0 !== r.rangeCount) {
                            n = r.anchorNode;
                            var a = r.anchorOffset,
                              i = r.focusNode;
                            r = r.focusOffset;
                            try {
                              n.nodeType, i.nodeType;
                            } catch (k) {
                              n = null;
                              break e;
                            }
                            var l = 0,
                              s = -1,
                              u = -1,
                              c = 0,
                              d = 0,
                              f = e,
                              p = null;
                            t: for (;;) {
                              for (
                                var m;
                                f !== n || (0 !== a && 3 !== f.nodeType) || (s = l + a),
                                  f !== i || (0 !== r && 3 !== f.nodeType) || (u = l + r),
                                  3 === f.nodeType && (l += f.nodeValue.length),
                                  null !== (m = f.firstChild);

                              )
                                (p = f), (f = m);
                              for (;;) {
                                if (f === e) break t;
                                if (
                                  (p === n && ++c === a && (s = l),
                                  p === i && ++d === r && (u = l),
                                  null !== (m = f.nextSibling))
                                )
                                  break;
                                p = (f = p).parentNode;
                              }
                              f = m;
                            }
                            n = -1 === s || -1 === u ? null : { start: s, end: u };
                          } else n = null;
                        }
                      n = n || { start: 0, end: 0 };
                    } else n = null;
                    for (ta = { focusedElem: e, selectionRange: n }, qt = !1, Jl = t; null !== Jl; )
                      if (((e = (t = Jl).child), 0 != (1028 & t.subtreeFlags) && null !== e)) (e.return = t), (Jl = e);
                      else
                        for (; null !== Jl; ) {
                          t = Jl;
                          try {
                            var g = t.alternate;
                            if (0 != (1024 & t.flags))
                              switch (t.tag) {
                                case 0:
                                case 11:
                                case 15:
                                case 5:
                                case 6:
                                case 4:
                                case 17:
                                  break;
                                case 1:
                                  if (null !== g) {
                                    var h = g.memoizedProps,
                                      v = g.memoizedState,
                                      b = t.stateNode,
                                      y = b.getSnapshotBeforeUpdate(t.elementType === t.type ? h : vo(t.type, h), v);
                                    b.__reactInternalSnapshotBeforeUpdate = y;
                                  }
                                  break;
                                case 3:
                                  var w = t.stateNode.containerInfo;
                                  1 === w.nodeType
                                    ? (w.textContent = '')
                                    : 9 === w.nodeType && w.documentElement && w.removeChild(w.documentElement);
                                  break;
                                default:
                                  throw Error(o(163));
                              }
                          } catch (k) {
                            Cu(t, t.return, k);
                          }
                          if (null !== (e = t.sibling)) {
                            (e.return = t.return), (Jl = e);
                            break;
                          }
                          Jl = t.return;
                        }
                    (g = ns), (ns = !1);
                  })(e, n),
                  vs(n, e),
                  mr(ta),
                  (qt = !!ea),
                  (ta = ea = null),
                  (e.current = n),
                  ys(n, e, a),
                  Qe(),
                  (As = s),
                  (yt = l),
                  (Ls.transition = i);
              } else e.current = n;
              if (
                (Ws && ((Ws = !1), (Ks = e), (Qs = a)),
                (i = e.pendingLanes),
                0 === i && (Vs = null),
                (function (e) {
                  if (ot && 'function' == typeof ot.onCommitFiberRoot)
                    try {
                      ot.onCommitFiberRoot(at, e, void 0, 128 == (128 & e.current.flags));
                    } catch (t) {}
                })(n.stateNode),
                au(e, Ye()),
                null !== t)
              )
                for (r = e.onRecoverableError, n = 0; n < t.length; n++)
                  (a = t[n]), r(a.value, { componentStack: a.stack, digest: a.digest });
              if (Gs) throw ((Gs = !1), (e = Zs), (Zs = null), e);
              0 != (1 & Qs) && 0 !== e.tag && Su(),
                (i = e.pendingLanes),
                0 != (1 & i) ? (e === Xs ? Ys++ : ((Ys = 0), (Xs = e))) : (Ys = 0),
                $a();
            })(e, t, n, r);
        } finally {
          (Ls.transition = a), (yt = r);
        }
        return null;
      }
      function Su() {
        if (null !== Ks) {
          var e = wt(Qs),
            t = Ls.transition,
            n = yt;
          try {
            if (((Ls.transition = null), (yt = 16 > e ? 16 : e), null === Ks)) var r = !1;
            else {
              if (((e = Ks), (Ks = null), (Qs = 0), 0 != (6 & As))) throw Error(o(331));
              var a = As;
              for (As |= 4, Jl = e.current; null !== Jl; ) {
                var i = Jl,
                  l = i.child;
                if (0 != (16 & Jl.flags)) {
                  var s = i.deletions;
                  if (null !== s) {
                    for (var u = 0; u < s.length; u++) {
                      var c = s[u];
                      for (Jl = c; null !== Jl; ) {
                        var d = Jl;
                        switch (d.tag) {
                          case 0:
                          case 11:
                          case 15:
                            rs(8, d, i);
                        }
                        var f = d.child;
                        if (null !== f) (f.return = d), (Jl = f);
                        else
                          for (; null !== Jl; ) {
                            var p = (d = Jl).sibling,
                              m = d.return;
                            if ((is(d), d === c)) {
                              Jl = null;
                              break;
                            }
                            if (null !== p) {
                              (p.return = m), (Jl = p);
                              break;
                            }
                            Jl = m;
                          }
                      }
                    }
                    var g = i.alternate;
                    if (null !== g) {
                      var h = g.child;
                      if (null !== h) {
                        g.child = null;
                        do {
                          var v = h.sibling;
                          (h.sibling = null), (h = v);
                        } while (null !== h);
                      }
                    }
                    Jl = i;
                  }
                }
                if (0 != (2064 & i.subtreeFlags) && null !== l) (l.return = i), (Jl = l);
                else
                  e: for (; null !== Jl; ) {
                    if (0 != (2048 & (i = Jl).flags))
                      switch (i.tag) {
                        case 0:
                        case 11:
                        case 15:
                          rs(9, i, i.return);
                      }
                    var b = i.sibling;
                    if (null !== b) {
                      (b.return = i.return), (Jl = b);
                      break e;
                    }
                    Jl = i.return;
                  }
              }
              var y = e.current;
              for (Jl = y; null !== Jl; ) {
                var w = (l = Jl).child;
                if (0 != (2064 & l.subtreeFlags) && null !== w) (w.return = l), (Jl = w);
                else
                  e: for (l = y; null !== Jl; ) {
                    if (0 != (2048 & (s = Jl).flags))
                      try {
                        switch (s.tag) {
                          case 0:
                          case 11:
                          case 15:
                            as(9, s);
                        }
                      } catch (E) {
                        Cu(s, s.return, E);
                      }
                    if (s === l) {
                      Jl = null;
                      break e;
                    }
                    var k = s.sibling;
                    if (null !== k) {
                      (k.return = s.return), (Jl = k);
                      break e;
                    }
                    Jl = s.return;
                  }
              }
              if (((As = a), $a(), ot && 'function' == typeof ot.onPostCommitFiberRoot))
                try {
                  ot.onPostCommitFiberRoot(at, e);
                } catch (E) {}
              r = !0;
            }
            return r;
          } finally {
            (yt = n), (Ls.transition = t);
          }
        }
        return !1;
      }
      function xu(e, t, n) {
        (e = Io(e, (t = ml(0, (t = cl(n, t)), 1)), 1)), (t = tu()), null !== e && (vt(e, 1, t), au(e, t));
      }
      function Cu(e, t, n) {
        if (3 === e.tag) xu(e, e, n);
        else
          for (; null !== t; ) {
            if (3 === t.tag) {
              xu(t, e, n);
              break;
            }
            if (1 === t.tag) {
              var r = t.stateNode;
              if (
                'function' == typeof t.type.getDerivedStateFromError ||
                ('function' == typeof r.componentDidCatch && (null === Vs || !Vs.has(r)))
              ) {
                (t = Io(t, (e = gl(t, (e = cl(n, e)), 1)), 1)), (e = tu()), null !== t && (vt(t, 1, e), au(t, e));
                break;
              }
            }
            t = t.return;
          }
      }
      function Tu(e, t, n) {
        var r = e.pingCache;
        null !== r && r.delete(t),
          (t = tu()),
          (e.pingedLanes |= e.suspendedLanes & n),
          Ns === e &&
            (Ps & n) === n &&
            (4 === Is || (3 === Is && (130023424 & Ps) === Ps && 500 > Ye() - $s) ? pu(e, 0) : (zs |= n)),
          au(e, t);
      }
      function _u(e, t) {
        0 === t && (0 == (1 & e.mode) ? (t = 1) : ((t = ct), 0 == (130023424 & (ct <<= 1)) && (ct = 4194304)));
        var n = tu();
        null !== (e = No(e, t)) && (vt(e, t, n), au(e, n));
      }
      function Lu(e) {
        var t = e.memoizedState,
          n = 0;
        null !== t && (n = t.retryLane), _u(e, n);
      }
      function Au(e, t) {
        var n = 0;
        switch (e.tag) {
          case 13:
            var r = e.stateNode,
              a = e.memoizedState;
            null !== a && (n = a.retryLane);
            break;
          case 19:
            r = e.stateNode;
            break;
          default:
            throw Error(o(314));
        }
        null !== r && r.delete(t), _u(e, n);
      }
      function Nu(e, t) {
        return Ve(e, t);
      }
      function Ru(e, t, n, r) {
        (this.tag = e),
          (this.key = n),
          (this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null),
          (this.index = 0),
          (this.ref = null),
          (this.pendingProps = t),
          (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
          (this.mode = r),
          (this.subtreeFlags = this.flags = 0),
          (this.deletions = null),
          (this.childLanes = this.lanes = 0),
          (this.alternate = null);
      }
      function Pu(e, t, n, r) {
        return new Ru(e, t, n, r);
      }
      function Ou(e) {
        return !(!(e = e.prototype) || !e.isReactComponent);
      }
      function Du(e, t) {
        var n = e.alternate;
        return (
          null === n
            ? (((n = Pu(e.tag, t, e.key, e.mode)).elementType = e.elementType),
              (n.type = e.type),
              (n.stateNode = e.stateNode),
              (n.alternate = e),
              (e.alternate = n))
            : ((n.pendingProps = t), (n.type = e.type), (n.flags = 0), (n.subtreeFlags = 0), (n.deletions = null)),
          (n.flags = 14680064 & e.flags),
          (n.childLanes = e.childLanes),
          (n.lanes = e.lanes),
          (n.child = e.child),
          (n.memoizedProps = e.memoizedProps),
          (n.memoizedState = e.memoizedState),
          (n.updateQueue = e.updateQueue),
          (t = e.dependencies),
          (n.dependencies = null === t ? null : { lanes: t.lanes, firstContext: t.firstContext }),
          (n.sibling = e.sibling),
          (n.index = e.index),
          (n.ref = e.ref),
          n
        );
      }
      function Iu(e, t, n, r, a, i) {
        var l = 2;
        if (((r = e), 'function' == typeof e)) Ou(e) && (l = 1);
        else if ('string' == typeof e) l = 5;
        else
          e: switch (e) {
            case S:
              return Mu(n.children, a, i, t);
            case x:
              (l = 8), (a |= 8);
              break;
            case C:
              return ((e = Pu(12, n, t, 2 | a)).elementType = C), (e.lanes = i), e;
            case A:
              return ((e = Pu(13, n, t, a)).elementType = A), (e.lanes = i), e;
            case N:
              return ((e = Pu(19, n, t, a)).elementType = N), (e.lanes = i), e;
            case O:
              return Fu(n, a, i, t);
            default:
              if ('object' == typeof e && null !== e)
                switch (e.$$typeof) {
                  case T:
                    l = 10;
                    break e;
                  case _:
                    l = 9;
                    break e;
                  case L:
                    l = 11;
                    break e;
                  case R:
                    l = 14;
                    break e;
                  case P:
                    (l = 16), (r = null);
                    break e;
                }
              throw Error(o(130, null == e ? e : typeof e, ''));
          }
        return ((t = Pu(l, n, t, a)).elementType = e), (t.type = r), (t.lanes = i), t;
      }
      function Mu(e, t, n, r) {
        return ((e = Pu(7, e, r, t)).lanes = n), e;
      }
      function Fu(e, t, n, r) {
        return ((e = Pu(22, e, r, t)).elementType = O), (e.lanes = n), (e.stateNode = { isHidden: !1 }), e;
      }
      function Bu(e, t, n) {
        return ((e = Pu(6, e, null, t)).lanes = n), e;
      }
      function zu(e, t, n) {
        return (
          ((t = Pu(4, null !== e.children ? e.children : [], e.key, t)).lanes = n),
          (t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }),
          t
        );
      }
      function ju(e, t, n, r, a) {
        (this.tag = t),
          (this.containerInfo = e),
          (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
          (this.timeoutHandle = -1),
          (this.callbackNode = this.pendingContext = this.context = null),
          (this.callbackPriority = 0),
          (this.eventTimes = ht(0)),
          (this.expirationTimes = ht(-1)),
          (this.entangledLanes =
            this.finishedLanes =
            this.mutableReadLanes =
            this.expiredLanes =
            this.pingedLanes =
            this.suspendedLanes =
            this.pendingLanes =
              0),
          (this.entanglements = ht(0)),
          (this.identifierPrefix = r),
          (this.onRecoverableError = a),
          (this.mutableSourceEagerHydrationData = null);
      }
      function Uu(e, t, n, r, a, o, i, l, s) {
        return (
          (e = new ju(e, t, n, l, s)),
          1 === t ? ((t = 1), !0 === o && (t |= 8)) : (t = 0),
          (o = Pu(3, null, null, t)),
          (e.current = o),
          (o.stateNode = e),
          (o.memoizedState = {
            element: r,
            isDehydrated: n,
            cache: null,
            transitions: null,
            pendingSuspenseBoundaries: null,
          }),
          Po(o),
          e
        );
      }
      function $u(e) {
        if (!e) return _a;
        e: {
          if ($e((e = e._reactInternals)) !== e || 1 !== e.tag) throw Error(o(170));
          var t = e;
          do {
            switch (t.tag) {
              case 3:
                t = t.stateNode.context;
                break e;
              case 1:
                if (Pa(t.type)) {
                  t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                  break e;
                }
            }
            t = t.return;
          } while (null !== t);
          throw Error(o(171));
        }
        if (1 === e.tag) {
          var n = e.type;
          if (Pa(n)) return Ia(e, n, t);
        }
        return t;
      }
      function Hu(e, t, n, r, a, o, i, l, s) {
        return (
          ((e = Uu(n, r, !0, e, 0, o, 0, l, s)).context = $u(null)),
          (n = e.current),
          ((o = Do((r = tu()), (a = nu(n)))).callback = null != t ? t : null),
          Io(n, o, a),
          (e.current.lanes = a),
          vt(e, a, r),
          au(e, r),
          e
        );
      }
      function qu(e, t, n, r) {
        var a = t.current,
          o = tu(),
          i = nu(a);
        return (
          (n = $u(n)),
          null === t.context ? (t.context = n) : (t.pendingContext = n),
          ((t = Do(o, i)).payload = { element: e }),
          null !== (r = void 0 === r ? null : r) && (t.callback = r),
          null !== (e = Io(a, t, i)) && (ru(e, a, i, o), Mo(e, a, i)),
          i
        );
      }
      function Gu(e) {
        return (e = e.current).child ? (e.child.tag, e.child.stateNode) : null;
      }
      function Zu(e, t) {
        if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
          var n = e.retryLane;
          e.retryLane = 0 !== n && n < t ? n : t;
        }
      }
      function Vu(e, t) {
        Zu(e, t), (e = e.alternate) && Zu(e, t);
      }
      xs = function (e, t, n) {
        if (null !== e)
          if (e.memoizedProps !== t.pendingProps || Aa.current) wl = !0;
          else {
            if (0 == (e.lanes & n) && 0 == (128 & t.flags))
              return (
                (wl = !1),
                (function (e, t, n) {
                  switch (t.tag) {
                    case 3:
                      Nl(t), mo();
                      break;
                    case 5:
                      ii(t);
                      break;
                    case 1:
                      Pa(t.type) && Ma(t);
                      break;
                    case 4:
                      ai(t, t.stateNode.containerInfo);
                      break;
                    case 10:
                      var r = t.type._context,
                        a = t.memoizedProps.value;
                      Ta(bo, r._currentValue), (r._currentValue = a);
                      break;
                    case 13:
                      if (null !== (r = t.memoizedState))
                        return null !== r.dehydrated
                          ? (Ta(si, 1 & si.current), (t.flags |= 128), null)
                          : 0 != (n & t.child.childLanes)
                          ? Bl(e, t, n)
                          : (Ta(si, 1 & si.current), null !== (e = Gl(e, t, n)) ? e.sibling : null);
                      Ta(si, 1 & si.current);
                      break;
                    case 19:
                      if (((r = 0 != (n & t.childLanes)), 0 != (128 & e.flags))) {
                        if (r) return Hl(e, t, n);
                        t.flags |= 128;
                      }
                      if (
                        (null !== (a = t.memoizedState) &&
                          ((a.rendering = null), (a.tail = null), (a.lastEffect = null)),
                        Ta(si, si.current),
                        r)
                      )
                        break;
                      return null;
                    case 22:
                    case 23:
                      return (t.lanes = 0), Cl(e, t, n);
                  }
                  return Gl(e, t, n);
                })(e, t, n)
              );
            wl = 0 != (131072 & e.flags);
          }
        else (wl = !1), ao && 0 != (1048576 & t.flags) && Ja(t, Za, t.index);
        switch (((t.lanes = 0), t.tag)) {
          case 2:
            var r = t.type;
            ql(e, t), (e = t.pendingProps);
            var a = Ra(t, La.current);
            Co(t, n), (a = xi(null, t, r, e, a, n));
            var i = Ci();
            return (
              (t.flags |= 1),
              'object' == typeof a && null !== a && 'function' == typeof a.render && void 0 === a.$$typeof
                ? ((t.tag = 1),
                  (t.memoizedState = null),
                  (t.updateQueue = null),
                  Pa(r) ? ((i = !0), Ma(t)) : (i = !1),
                  (t.memoizedState = null !== a.state && void 0 !== a.state ? a.state : null),
                  Po(t),
                  (a.updater = $o),
                  (t.stateNode = a),
                  (a._reactInternals = t),
                  Zo(t, r, e, n),
                  (t = Al(null, t, r, !0, i, n)))
                : ((t.tag = 0), ao && i && eo(t), kl(null, t, a, n), (t = t.child)),
              t
            );
          case 16:
            r = t.elementType;
            e: {
              switch (
                (ql(e, t),
                (e = t.pendingProps),
                (r = (a = r._init)(r._payload)),
                (t.type = r),
                (a = t.tag =
                  (function (e) {
                    if ('function' == typeof e) return Ou(e) ? 1 : 0;
                    if (null != e) {
                      if ((e = e.$$typeof) === L) return 11;
                      if (e === R) return 14;
                    }
                    return 2;
                  })(r)),
                (e = vo(r, e)),
                a)
              ) {
                case 0:
                  t = _l(null, t, r, e, n);
                  break e;
                case 1:
                  t = Ll(null, t, r, e, n);
                  break e;
                case 11:
                  t = El(null, t, r, e, n);
                  break e;
                case 14:
                  t = Sl(null, t, r, vo(r.type, e), n);
                  break e;
              }
              throw Error(o(306, r, ''));
            }
            return t;
          case 0:
            return (r = t.type), (a = t.pendingProps), _l(e, t, r, (a = t.elementType === r ? a : vo(r, a)), n);
          case 1:
            return (r = t.type), (a = t.pendingProps), Ll(e, t, r, (a = t.elementType === r ? a : vo(r, a)), n);
          case 3:
            e: {
              if ((Nl(t), null === e)) throw Error(o(387));
              (r = t.pendingProps), (a = (i = t.memoizedState).element), Oo(e, t), Bo(t, r, null, n);
              var l = t.memoizedState;
              if (((r = l.element), i.isDehydrated)) {
                if (
                  ((i = {
                    element: r,
                    isDehydrated: !1,
                    cache: l.cache,
                    pendingSuspenseBoundaries: l.pendingSuspenseBoundaries,
                    transitions: l.transitions,
                  }),
                  (t.updateQueue.baseState = i),
                  (t.memoizedState = i),
                  256 & t.flags)
                ) {
                  t = Rl(e, t, r, n, (a = cl(Error(o(423)), t)));
                  break e;
                }
                if (r !== a) {
                  t = Rl(e, t, r, n, (a = cl(Error(o(424)), t)));
                  break e;
                }
                for (
                  ro = ua(t.stateNode.containerInfo.firstChild),
                    no = t,
                    ao = !0,
                    oo = null,
                    n = Xo(t, null, r, n),
                    t.child = n;
                  n;

                )
                  (n.flags = (-3 & n.flags) | 4096), (n = n.sibling);
              } else {
                if ((mo(), r === a)) {
                  t = Gl(e, t, n);
                  break e;
                }
                kl(e, t, r, n);
              }
              t = t.child;
            }
            return t;
          case 5:
            return (
              ii(t),
              null === e && uo(t),
              (r = t.type),
              (a = t.pendingProps),
              (i = null !== e ? e.memoizedProps : null),
              (l = a.children),
              na(r, a) ? (l = null) : null !== i && na(r, i) && (t.flags |= 32),
              Tl(e, t),
              kl(e, t, l, n),
              t.child
            );
          case 6:
            return null === e && uo(t), null;
          case 13:
            return Bl(e, t, n);
          case 4:
            return (
              ai(t, t.stateNode.containerInfo),
              (r = t.pendingProps),
              null === e ? (t.child = Yo(t, null, r, n)) : kl(e, t, r, n),
              t.child
            );
          case 11:
            return (r = t.type), (a = t.pendingProps), El(e, t, r, (a = t.elementType === r ? a : vo(r, a)), n);
          case 7:
            return kl(e, t, t.pendingProps, n), t.child;
          case 8:
          case 12:
            return kl(e, t, t.pendingProps.children, n), t.child;
          case 10:
            e: {
              if (
                ((r = t.type._context),
                (a = t.pendingProps),
                (i = t.memoizedProps),
                (l = a.value),
                Ta(bo, r._currentValue),
                (r._currentValue = l),
                null !== i)
              )
                if (lr(i.value, l)) {
                  if (i.children === a.children && !Aa.current) {
                    t = Gl(e, t, n);
                    break e;
                  }
                } else
                  for (null !== (i = t.child) && (i.return = t); null !== i; ) {
                    var s = i.dependencies;
                    if (null !== s) {
                      l = i.child;
                      for (var u = s.firstContext; null !== u; ) {
                        if (u.context === r) {
                          if (1 === i.tag) {
                            (u = Do(-1, n & -n)).tag = 2;
                            var c = i.updateQueue;
                            if (null !== c) {
                              var d = (c = c.shared).pending;
                              null === d ? (u.next = u) : ((u.next = d.next), (d.next = u)), (c.pending = u);
                            }
                          }
                          (i.lanes |= n),
                            null !== (u = i.alternate) && (u.lanes |= n),
                            xo(i.return, n, t),
                            (s.lanes |= n);
                          break;
                        }
                        u = u.next;
                      }
                    } else if (10 === i.tag) l = i.type === t.type ? null : i.child;
                    else if (18 === i.tag) {
                      if (null === (l = i.return)) throw Error(o(341));
                      (l.lanes |= n), null !== (s = l.alternate) && (s.lanes |= n), xo(l, n, t), (l = i.sibling);
                    } else l = i.child;
                    if (null !== l) l.return = i;
                    else
                      for (l = i; null !== l; ) {
                        if (l === t) {
                          l = null;
                          break;
                        }
                        if (null !== (i = l.sibling)) {
                          (i.return = l.return), (l = i);
                          break;
                        }
                        l = l.return;
                      }
                    i = l;
                  }
              kl(e, t, a.children, n), (t = t.child);
            }
            return t;
          case 9:
            return (
              (a = t.type),
              (r = t.pendingProps.children),
              Co(t, n),
              (r = r((a = To(a)))),
              (t.flags |= 1),
              kl(e, t, r, n),
              t.child
            );
          case 14:
            return (a = vo((r = t.type), t.pendingProps)), Sl(e, t, r, (a = vo(r.type, a)), n);
          case 15:
            return xl(e, t, t.type, t.pendingProps, n);
          case 17:
            return (
              (r = t.type),
              (a = t.pendingProps),
              (a = t.elementType === r ? a : vo(r, a)),
              ql(e, t),
              (t.tag = 1),
              Pa(r) ? ((e = !0), Ma(t)) : (e = !1),
              Co(t, n),
              qo(t, r, a),
              Zo(t, r, a, n),
              Al(null, t, r, !0, e, n)
            );
          case 19:
            return Hl(e, t, n);
          case 22:
            return Cl(e, t, n);
        }
        throw Error(o(156, t.tag));
      };
      var Wu =
        'function' == typeof reportError
          ? reportError
          : function (e) {
              console.error(e);
            };
      function Ku(e) {
        this._internalRoot = e;
      }
      function Qu(e) {
        this._internalRoot = e;
      }
      function Yu(e) {
        return !(!e || (1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType));
      }
      function Xu(e) {
        return !(
          !e ||
          (1 !== e.nodeType &&
            9 !== e.nodeType &&
            11 !== e.nodeType &&
            (8 !== e.nodeType || ' react-mount-point-unstable ' !== e.nodeValue))
        );
      }
      function Ju() {}
      function ec(e, t, n, r, a) {
        var o = n._reactRootContainer;
        if (o) {
          var i = o;
          if ('function' == typeof a) {
            var l = a;
            a = function () {
              var e = Gu(i);
              l.call(e);
            };
          }
          qu(t, i, e, a);
        } else
          i = (function (e, t, n, r, a) {
            if (a) {
              if ('function' == typeof r) {
                var o = r;
                r = function () {
                  var e = Gu(i);
                  o.call(e);
                };
              }
              var i = Hu(t, r, e, 0, null, !1, 0, '', Ju);
              return (e._reactRootContainer = i), (e[ma] = i.current), $r(8 === e.nodeType ? e.parentNode : e), du(), i;
            }
            for (; (a = e.lastChild); ) e.removeChild(a);
            if ('function' == typeof r) {
              var l = r;
              r = function () {
                var e = Gu(s);
                l.call(e);
              };
            }
            var s = Uu(e, 0, !1, null, 0, !1, 0, '', Ju);
            return (
              (e._reactRootContainer = s),
              (e[ma] = s.current),
              $r(8 === e.nodeType ? e.parentNode : e),
              du(function () {
                qu(t, s, n, r);
              }),
              s
            );
          })(n, t, e, a, r);
        return Gu(i);
      }
      (Qu.prototype.render = Ku.prototype.render =
        function (e) {
          var t = this._internalRoot;
          if (null === t) throw Error(o(409));
          qu(e, t, null, null);
        }),
        (Qu.prototype.unmount = Ku.prototype.unmount =
          function () {
            var e = this._internalRoot;
            if (null !== e) {
              this._internalRoot = null;
              var t = e.containerInfo;
              du(function () {
                qu(null, e, null, null);
              }),
                (t[ma] = null);
            }
          }),
        (Qu.prototype.unstable_scheduleHydration = function (e) {
          if (e) {
            var t = xt();
            e = { blockedOn: null, target: e, priority: t };
            for (var n = 0; n < Ot.length && 0 !== t && t < Ot[n].priority; n++);
            Ot.splice(n, 0, e), 0 === n && Ft(e);
          }
        }),
        (kt = function (e) {
          switch (e.tag) {
            case 3:
              var t = e.stateNode;
              if (t.current.memoizedState.isDehydrated) {
                var n = dt(t.pendingLanes);
                0 !== n && (bt(t, 1 | n), au(t, Ye()), 0 == (6 & As) && ((Hs = Ye() + 500), $a()));
              }
              break;
            case 13:
              du(function () {
                var t = No(e, 1);
                if (null !== t) {
                  var n = tu();
                  ru(t, e, 1, n);
                }
              }),
                Vu(e, 1);
          }
        }),
        (Et = function (e) {
          if (13 === e.tag) {
            var t = No(e, 134217728);
            if (null !== t) ru(t, e, 134217728, tu());
            Vu(e, 134217728);
          }
        }),
        (St = function (e) {
          if (13 === e.tag) {
            var t = nu(e),
              n = No(e, t);
            if (null !== n) ru(n, e, t, tu());
            Vu(e, t);
          }
        }),
        (xt = function () {
          return yt;
        }),
        (Ct = function (e, t) {
          var n = yt;
          try {
            return (yt = e), t();
          } finally {
            yt = n;
          }
        }),
        (Ee = function (e, t, n) {
          switch (t) {
            case 'input':
              if ((X(e, n), (t = n.name), 'radio' === n.type && null != t)) {
                for (n = e; n.parentNode; ) n = n.parentNode;
                for (
                  n = n.querySelectorAll('input[name=' + JSON.stringify('' + t) + '][type="radio"]'), t = 0;
                  t < n.length;
                  t++
                ) {
                  var r = n[t];
                  if (r !== e && r.form === e.form) {
                    var a = ka(r);
                    if (!a) throw Error(o(90));
                    V(r), X(r, a);
                  }
                }
              }
              break;
            case 'textarea':
              oe(e, n);
              break;
            case 'select':
              null != (t = n.value) && ne(e, !!n.multiple, t, !1);
          }
        }),
        (Le = cu),
        (Ae = du);
      var tc = { usingClientEntryPoint: !1, Events: [ya, wa, ka, Te, _e, cu] },
        nc = { findFiberByHostInstance: ba, bundleType: 0, version: '18.2.0', rendererPackageName: 'react-dom' },
        rc = {
          bundleType: nc.bundleType,
          version: nc.version,
          rendererPackageName: nc.rendererPackageName,
          rendererConfig: nc.rendererConfig,
          overrideHookState: null,
          overrideHookStateDeletePath: null,
          overrideHookStateRenamePath: null,
          overrideProps: null,
          overridePropsDeletePath: null,
          overridePropsRenamePath: null,
          setErrorHandler: null,
          setSuspenseHandler: null,
          scheduleUpdate: null,
          currentDispatcherRef: w.ReactCurrentDispatcher,
          findHostInstanceByFiber: function (e) {
            return null === (e = Ge(e)) ? null : e.stateNode;
          },
          findFiberByHostInstance:
            nc.findFiberByHostInstance ||
            function () {
              return null;
            },
          findHostInstancesForRefresh: null,
          scheduleRefresh: null,
          scheduleRoot: null,
          setRefreshHandler: null,
          getCurrentFiber: null,
          reconcilerVersion: '18.2.0-next-9e3b772b8-20220608',
        };
      if ('undefined' != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
        var ac = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!ac.isDisabled && ac.supportsFiber)
          try {
            (at = ac.inject(rc)), (ot = ac);
          } catch (ce) {}
      }
      (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tc),
        (t.createPortal = function (e, t) {
          var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
          if (!Yu(t)) throw Error(o(200));
          return (function (e, t, n) {
            var r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
            return { $$typeof: E, key: null == r ? null : '' + r, children: e, containerInfo: t, implementation: n };
          })(e, t, null, n);
        }),
        (t.createRoot = function (e, t) {
          if (!Yu(e)) throw Error(o(299));
          var n = !1,
            r = '',
            a = Wu;
          return (
            null != t &&
              (!0 === t.unstable_strictMode && (n = !0),
              void 0 !== t.identifierPrefix && (r = t.identifierPrefix),
              void 0 !== t.onRecoverableError && (a = t.onRecoverableError)),
            (t = Uu(e, 1, !1, null, 0, n, 0, r, a)),
            (e[ma] = t.current),
            $r(8 === e.nodeType ? e.parentNode : e),
            new Ku(t)
          );
        }),
        (t.findDOMNode = function (e) {
          if (null == e) return null;
          if (1 === e.nodeType) return e;
          var t = e._reactInternals;
          if (void 0 === t) {
            if ('function' == typeof e.render) throw Error(o(188));
            throw ((e = Object.keys(e).join(',')), Error(o(268, e)));
          }
          return (e = null === (e = Ge(t)) ? null : e.stateNode);
        }),
        (t.flushSync = function (e) {
          return du(e);
        }),
        (t.hydrate = function (e, t, n) {
          if (!Xu(t)) throw Error(o(200));
          return ec(null, e, t, !0, n);
        }),
        (t.hydrateRoot = function (e, t, n) {
          if (!Yu(e)) throw Error(o(405));
          var r = (null != n && n.hydratedSources) || null,
            a = !1,
            i = '',
            l = Wu;
          if (
            (null != n &&
              (!0 === n.unstable_strictMode && (a = !0),
              void 0 !== n.identifierPrefix && (i = n.identifierPrefix),
              void 0 !== n.onRecoverableError && (l = n.onRecoverableError)),
            (t = Hu(t, null, e, 1, null != n ? n : null, a, 0, i, l)),
            (e[ma] = t.current),
            $r(e),
            r)
          )
            for (e = 0; e < r.length; e++)
              (a = (a = (n = r[e])._getVersion)(n._source)),
                null == t.mutableSourceEagerHydrationData
                  ? (t.mutableSourceEagerHydrationData = [n, a])
                  : t.mutableSourceEagerHydrationData.push(n, a);
          return new Qu(t);
        }),
        (t.render = function (e, t, n) {
          if (!Xu(t)) throw Error(o(200));
          return ec(null, e, t, !1, n);
        }),
        (t.unmountComponentAtNode = function (e) {
          if (!Xu(e)) throw Error(o(40));
          return (
            !!e._reactRootContainer &&
            (du(function () {
              ec(null, null, e, !1, function () {
                (e._reactRootContainer = null), (e[ma] = null);
              });
            }),
            !0)
          );
        }),
        (t.unstable_batchedUpdates = cu),
        (t.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
          if (!Xu(n)) throw Error(o(200));
          if (null == e || void 0 === e._reactInternals) throw Error(o(38));
          return ec(e, t, n, !1, r);
        }),
        (t.version = '18.2.0-next-9e3b772b8-20220608');
    },
    1542: (e, t, n) => {
      'use strict';
      !(function e() {
        if (
          'undefined' != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
          'function' == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
        )
          try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
          } catch (t) {
            console.error(t);
          }
      })(),
        (e.exports = n(3577));
    },
    4335: e => {
      var t = 'undefined' != typeof Element,
        n = 'function' == typeof Map,
        r = 'function' == typeof Set,
        a = 'function' == typeof ArrayBuffer && !!ArrayBuffer.isView;
      function o(e, i) {
        if (e === i) return !0;
        if (e && i && 'object' == typeof e && 'object' == typeof i) {
          if (e.constructor !== i.constructor) return !1;
          var l, s, u, c;
          if (Array.isArray(e)) {
            if ((l = e.length) != i.length) return !1;
            for (s = l; 0 != s--; ) if (!o(e[s], i[s])) return !1;
            return !0;
          }
          if (n && e instanceof Map && i instanceof Map) {
            if (e.size !== i.size) return !1;
            for (c = e.entries(); !(s = c.next()).done; ) if (!i.has(s.value[0])) return !1;
            for (c = e.entries(); !(s = c.next()).done; ) if (!o(s.value[1], i.get(s.value[0]))) return !1;
            return !0;
          }
          if (r && e instanceof Set && i instanceof Set) {
            if (e.size !== i.size) return !1;
            for (c = e.entries(); !(s = c.next()).done; ) if (!i.has(s.value[0])) return !1;
            return !0;
          }
          if (a && ArrayBuffer.isView(e) && ArrayBuffer.isView(i)) {
            if ((l = e.length) != i.length) return !1;
            for (s = l; 0 != s--; ) if (e[s] !== i[s]) return !1;
            return !0;
          }
          if (e.constructor === RegExp) return e.source === i.source && e.flags === i.flags;
          if (
            e.valueOf !== Object.prototype.valueOf &&
            'function' == typeof e.valueOf &&
            'function' == typeof i.valueOf
          )
            return e.valueOf() === i.valueOf();
          if (
            e.toString !== Object.prototype.toString &&
            'function' == typeof e.toString &&
            'function' == typeof i.toString
          )
            return e.toString() === i.toString();
          if ((l = (u = Object.keys(e)).length) !== Object.keys(i).length) return !1;
          for (s = l; 0 != s--; ) if (!Object.prototype.hasOwnProperty.call(i, u[s])) return !1;
          if (t && e instanceof Element) return !1;
          for (s = l; 0 != s--; )
            if ((('_owner' !== u[s] && '__v' !== u[s] && '__o' !== u[s]) || !e.$$typeof) && !o(e[u[s]], i[u[s]]))
              return !1;
          return !0;
        }
        return e != e && i != i;
      }
      e.exports = function (e, t) {
        try {
          return o(e, t);
        } catch (n) {
          if ((n.message || '').match(/stack|recursion/i))
            return console.warn('react-fast-compare cannot handle circular refs'), !1;
          throw n;
        }
      };
    },
    2883: (e, t, n) => {
      'use strict';
      n.d(t, { B6: () => G, ql: () => J });
      var r = n(7378),
        a = n(3615),
        o = n.n(a),
        i = n(4335),
        l = n.n(i),
        s = n(3996),
        u = n.n(s),
        c = n(4445),
        d = n.n(c);
      function f() {
        return (
          (f =
            Object.assign ||
            function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
              }
              return e;
            }),
          f.apply(this, arguments)
        );
      }
      function p(e, t) {
        (e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), m(e, t);
      }
      function m(e, t) {
        return (
          (m =
            Object.setPrototypeOf ||
            function (e, t) {
              return (e.__proto__ = t), e;
            }),
          m(e, t)
        );
      }
      function g(e, t) {
        if (null == e) return {};
        var n,
          r,
          a = {},
          o = Object.keys(e);
        for (r = 0; r < o.length; r++) t.indexOf((n = o[r])) >= 0 || (a[n] = e[n]);
        return a;
      }
      var h = {
          BASE: 'base',
          BODY: 'body',
          HEAD: 'head',
          HTML: 'html',
          LINK: 'link',
          META: 'meta',
          NOSCRIPT: 'noscript',
          SCRIPT: 'script',
          STYLE: 'style',
          TITLE: 'title',
          FRAGMENT: 'Symbol(react.fragment)',
        },
        v = { rel: ['amphtml', 'canonical', 'alternate'] },
        b = { type: ['application/ld+json'] },
        y = {
          charset: '',
          name: ['robots', 'description'],
          property: [
            'og:type',
            'og:title',
            'og:url',
            'og:image',
            'og:image:alt',
            'og:description',
            'twitter:url',
            'twitter:title',
            'twitter:description',
            'twitter:image',
            'twitter:image:alt',
            'twitter:card',
            'twitter:site',
          ],
        },
        w = Object.keys(h).map(function (e) {
          return h[e];
        }),
        k = {
          accesskey: 'accessKey',
          charset: 'charSet',
          class: 'className',
          contenteditable: 'contentEditable',
          contextmenu: 'contextMenu',
          'http-equiv': 'httpEquiv',
          itemprop: 'itemProp',
          tabindex: 'tabIndex',
        },
        E = Object.keys(k).reduce(function (e, t) {
          return (e[k[t]] = t), e;
        }, {}),
        S = function (e, t) {
          for (var n = e.length - 1; n >= 0; n -= 1) {
            var r = e[n];
            if (Object.prototype.hasOwnProperty.call(r, t)) return r[t];
          }
          return null;
        },
        x = function (e) {
          var t = S(e, h.TITLE),
            n = S(e, 'titleTemplate');
          if ((Array.isArray(t) && (t = t.join('')), n && t))
            return n.replace(/%s/g, function () {
              return t;
            });
          var r = S(e, 'defaultTitle');
          return t || r || void 0;
        },
        C = function (e) {
          return S(e, 'onChangeClientState') || function () {};
        },
        T = function (e, t) {
          return t
            .filter(function (t) {
              return void 0 !== t[e];
            })
            .map(function (t) {
              return t[e];
            })
            .reduce(function (e, t) {
              return f({}, e, t);
            }, {});
        },
        _ = function (e, t) {
          return t
            .filter(function (e) {
              return void 0 !== e[h.BASE];
            })
            .map(function (e) {
              return e[h.BASE];
            })
            .reverse()
            .reduce(function (t, n) {
              if (!t.length)
                for (var r = Object.keys(n), a = 0; a < r.length; a += 1) {
                  var o = r[a].toLowerCase();
                  if (-1 !== e.indexOf(o) && n[o]) return t.concat(n);
                }
              return t;
            }, []);
        },
        L = function (e, t, n) {
          var r = {};
          return n
            .filter(function (t) {
              return (
                !!Array.isArray(t[e]) ||
                (void 0 !== t[e] &&
                  console &&
                  'function' == typeof console.warn &&
                  console.warn('Helmet: ' + e + ' should be of type "Array". Instead found type "' + typeof t[e] + '"'),
                !1)
              );
            })
            .map(function (t) {
              return t[e];
            })
            .reverse()
            .reduce(function (e, n) {
              var a = {};
              n.filter(function (e) {
                for (var n, o = Object.keys(e), i = 0; i < o.length; i += 1) {
                  var l = o[i],
                    s = l.toLowerCase();
                  -1 === t.indexOf(s) ||
                    ('rel' === n && 'canonical' === e[n].toLowerCase()) ||
                    ('rel' === s && 'stylesheet' === e[s].toLowerCase()) ||
                    (n = s),
                    -1 === t.indexOf(l) || ('innerHTML' !== l && 'cssText' !== l && 'itemprop' !== l) || (n = l);
                }
                if (!n || !e[n]) return !1;
                var u = e[n].toLowerCase();
                return r[n] || (r[n] = {}), a[n] || (a[n] = {}), !r[n][u] && ((a[n][u] = !0), !0);
              })
                .reverse()
                .forEach(function (t) {
                  return e.push(t);
                });
              for (var o = Object.keys(a), i = 0; i < o.length; i += 1) {
                var l = o[i],
                  s = f({}, r[l], a[l]);
                r[l] = s;
              }
              return e;
            }, [])
            .reverse();
        },
        A = function (e, t) {
          if (Array.isArray(e) && e.length) for (var n = 0; n < e.length; n += 1) if (e[n][t]) return !0;
          return !1;
        },
        N = function (e) {
          return Array.isArray(e) ? e.join('') : e;
        },
        R = function (e, t) {
          return Array.isArray(e)
            ? e.reduce(
                function (e, n) {
                  return (
                    (function (e, t) {
                      for (var n = Object.keys(e), r = 0; r < n.length; r += 1)
                        if (t[n[r]] && t[n[r]].includes(e[n[r]])) return !0;
                      return !1;
                    })(n, t)
                      ? e.priority.push(n)
                      : e.default.push(n),
                    e
                  );
                },
                { priority: [], default: [] }
              )
            : { default: e };
        },
        P = function (e, t) {
          var n;
          return f({}, e, (((n = {})[t] = void 0), n));
        },
        O = [h.NOSCRIPT, h.SCRIPT, h.STYLE],
        D = function (e, t) {
          return (
            void 0 === t && (t = !0),
            !1 === t
              ? String(e)
              : String(e)
                  .replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&#x27;')
          );
        },
        I = function (e) {
          return Object.keys(e).reduce(function (t, n) {
            var r = void 0 !== e[n] ? n + '="' + e[n] + '"' : '' + n;
            return t ? t + ' ' + r : r;
          }, '');
        },
        M = function (e, t) {
          return (
            void 0 === t && (t = {}),
            Object.keys(e).reduce(function (t, n) {
              return (t[k[n] || n] = e[n]), t;
            }, t)
          );
        },
        F = function (e, t) {
          return t.map(function (t, n) {
            var a,
              o = (((a = { key: n })['data-rh'] = !0), a);
            return (
              Object.keys(t).forEach(function (e) {
                var n = k[e] || e;
                'innerHTML' === n || 'cssText' === n
                  ? (o.dangerouslySetInnerHTML = { __html: t.innerHTML || t.cssText })
                  : (o[n] = t[e]);
              }),
              r.createElement(e, o)
            );
          });
        },
        B = function (e, t, n) {
          switch (e) {
            case h.TITLE:
              return {
                toComponent: function () {
                  return (
                    (n = t.titleAttributes),
                    ((a = { key: (e = t.title) })['data-rh'] = !0),
                    (o = M(n, a)),
                    [r.createElement(h.TITLE, o, e)]
                  );
                  var e, n, a, o;
                },
                toString: function () {
                  return (function (e, t, n, r) {
                    var a = I(n),
                      o = N(t);
                    return a
                      ? '<' + e + ' data-rh="true" ' + a + '>' + D(o, r) + '</' + e + '>'
                      : '<' + e + ' data-rh="true">' + D(o, r) + '</' + e + '>';
                  })(e, t.title, t.titleAttributes, n);
                },
              };
            case 'bodyAttributes':
            case 'htmlAttributes':
              return {
                toComponent: function () {
                  return M(t);
                },
                toString: function () {
                  return I(t);
                },
              };
            default:
              return {
                toComponent: function () {
                  return F(e, t);
                },
                toString: function () {
                  return (function (e, t, n) {
                    return t.reduce(function (t, r) {
                      var a = Object.keys(r)
                          .filter(function (e) {
                            return !('innerHTML' === e || 'cssText' === e);
                          })
                          .reduce(function (e, t) {
                            var a = void 0 === r[t] ? t : t + '="' + D(r[t], n) + '"';
                            return e ? e + ' ' + a : a;
                          }, ''),
                        o = r.innerHTML || r.cssText || '',
                        i = -1 === O.indexOf(e);
                      return t + '<' + e + ' data-rh="true" ' + a + (i ? '/>' : '>' + o + '</' + e + '>');
                    }, '');
                  })(e, t, n);
                },
              };
          }
        },
        z = function (e) {
          var t = e.baseTag,
            n = e.bodyAttributes,
            r = e.encode,
            a = e.htmlAttributes,
            o = e.noscriptTags,
            i = e.styleTags,
            l = e.title,
            s = void 0 === l ? '' : l,
            u = e.titleAttributes,
            c = e.linkTags,
            d = e.metaTags,
            f = e.scriptTags,
            p = {
              toComponent: function () {},
              toString: function () {
                return '';
              },
            };
          if (e.prioritizeSeoTags) {
            var m = (function (e) {
              var t = e.linkTags,
                n = e.scriptTags,
                r = e.encode,
                a = R(e.metaTags, y),
                o = R(t, v),
                i = R(n, b);
              return {
                priorityMethods: {
                  toComponent: function () {
                    return [].concat(F(h.META, a.priority), F(h.LINK, o.priority), F(h.SCRIPT, i.priority));
                  },
                  toString: function () {
                    return B(h.META, a.priority, r) + ' ' + B(h.LINK, o.priority, r) + ' ' + B(h.SCRIPT, i.priority, r);
                  },
                },
                metaTags: a.default,
                linkTags: o.default,
                scriptTags: i.default,
              };
            })(e);
            (p = m.priorityMethods), (c = m.linkTags), (d = m.metaTags), (f = m.scriptTags);
          }
          return {
            priority: p,
            base: B(h.BASE, t, r),
            bodyAttributes: B('bodyAttributes', n, r),
            htmlAttributes: B('htmlAttributes', a, r),
            link: B(h.LINK, c, r),
            meta: B(h.META, d, r),
            noscript: B(h.NOSCRIPT, o, r),
            script: B(h.SCRIPT, f, r),
            style: B(h.STYLE, i, r),
            title: B(h.TITLE, { title: s, titleAttributes: u }, r),
          };
        },
        j = [],
        U = function (e, t) {
          var n = this;
          void 0 === t && (t = 'undefined' != typeof document),
            (this.instances = []),
            (this.value = {
              setHelmet: function (e) {
                n.context.helmet = e;
              },
              helmetInstances: {
                get: function () {
                  return n.canUseDOM ? j : n.instances;
                },
                add: function (e) {
                  (n.canUseDOM ? j : n.instances).push(e);
                },
                remove: function (e) {
                  var t = (n.canUseDOM ? j : n.instances).indexOf(e);
                  (n.canUseDOM ? j : n.instances).splice(t, 1);
                },
              },
            }),
            (this.context = e),
            (this.canUseDOM = t),
            t ||
              (e.helmet = z({
                baseTag: [],
                bodyAttributes: {},
                encodeSpecialCharacters: !0,
                htmlAttributes: {},
                linkTags: [],
                metaTags: [],
                noscriptTags: [],
                scriptTags: [],
                styleTags: [],
                title: '',
                titleAttributes: {},
              }));
        },
        $ = r.createContext({}),
        H = o().shape({
          setHelmet: o().func,
          helmetInstances: o().shape({ get: o().func, add: o().func, remove: o().func }),
        }),
        q = 'undefined' != typeof document,
        G = (function (e) {
          function t(n) {
            var r;
            return ((r = e.call(this, n) || this).helmetData = new U(r.props.context, t.canUseDOM)), r;
          }
          return (
            p(t, e),
            (t.prototype.render = function () {
              return r.createElement($.Provider, { value: this.helmetData.value }, this.props.children);
            }),
            t
          );
        })(r.Component);
      (G.canUseDOM = q),
        (G.propTypes = { context: o().shape({ helmet: o().shape() }), children: o().node.isRequired }),
        (G.defaultProps = { context: {} }),
        (G.displayName = 'HelmetProvider');
      var Z = function (e, t) {
          var n,
            r = document.head || document.querySelector(h.HEAD),
            a = r.querySelectorAll(e + '[data-rh]'),
            o = [].slice.call(a),
            i = [];
          return (
            t &&
              t.length &&
              t.forEach(function (t) {
                var r = document.createElement(e);
                for (var a in t)
                  Object.prototype.hasOwnProperty.call(t, a) &&
                    ('innerHTML' === a
                      ? (r.innerHTML = t.innerHTML)
                      : 'cssText' === a
                      ? r.styleSheet
                        ? (r.styleSheet.cssText = t.cssText)
                        : r.appendChild(document.createTextNode(t.cssText))
                      : r.setAttribute(a, void 0 === t[a] ? '' : t[a]));
                r.setAttribute('data-rh', 'true'),
                  o.some(function (e, t) {
                    return (n = t), r.isEqualNode(e);
                  })
                    ? o.splice(n, 1)
                    : i.push(r);
              }),
            o.forEach(function (e) {
              return e.parentNode.removeChild(e);
            }),
            i.forEach(function (e) {
              return r.appendChild(e);
            }),
            { oldTags: o, newTags: i }
          );
        },
        V = function (e, t) {
          var n = document.getElementsByTagName(e)[0];
          if (n) {
            for (
              var r = n.getAttribute('data-rh'), a = r ? r.split(',') : [], o = [].concat(a), i = Object.keys(t), l = 0;
              l < i.length;
              l += 1
            ) {
              var s = i[l],
                u = t[s] || '';
              n.getAttribute(s) !== u && n.setAttribute(s, u), -1 === a.indexOf(s) && a.push(s);
              var c = o.indexOf(s);
              -1 !== c && o.splice(c, 1);
            }
            for (var d = o.length - 1; d >= 0; d -= 1) n.removeAttribute(o[d]);
            a.length === o.length
              ? n.removeAttribute('data-rh')
              : n.getAttribute('data-rh') !== i.join(',') && n.setAttribute('data-rh', i.join(','));
          }
        },
        W = function (e, t) {
          var n = e.baseTag,
            r = e.htmlAttributes,
            a = e.linkTags,
            o = e.metaTags,
            i = e.noscriptTags,
            l = e.onChangeClientState,
            s = e.scriptTags,
            u = e.styleTags,
            c = e.title,
            d = e.titleAttributes;
          V(h.BODY, e.bodyAttributes),
            V(h.HTML, r),
            (function (e, t) {
              void 0 !== e && document.title !== e && (document.title = N(e)), V(h.TITLE, t);
            })(c, d);
          var f = {
              baseTag: Z(h.BASE, n),
              linkTags: Z(h.LINK, a),
              metaTags: Z(h.META, o),
              noscriptTags: Z(h.NOSCRIPT, i),
              scriptTags: Z(h.SCRIPT, s),
              styleTags: Z(h.STYLE, u),
            },
            p = {},
            m = {};
          Object.keys(f).forEach(function (e) {
            var t = f[e],
              n = t.newTags,
              r = t.oldTags;
            n.length && (p[e] = n), r.length && (m[e] = f[e].oldTags);
          }),
            t && t(),
            l(e, p, m);
        },
        K = null,
        Q = (function (e) {
          function t() {
            for (var t, n = arguments.length, r = new Array(n), a = 0; a < n; a++) r[a] = arguments[a];
            return ((t = e.call.apply(e, [this].concat(r)) || this).rendered = !1), t;
          }
          p(t, e);
          var n = t.prototype;
          return (
            (n.shouldComponentUpdate = function (e) {
              return !d()(e, this.props);
            }),
            (n.componentDidUpdate = function () {
              this.emitChange();
            }),
            (n.componentWillUnmount = function () {
              this.props.context.helmetInstances.remove(this), this.emitChange();
            }),
            (n.emitChange = function () {
              var e,
                t,
                n = this.props.context,
                r = n.setHelmet,
                a = null,
                o =
                  ((e = n.helmetInstances.get().map(function (e) {
                    var t = f({}, e.props);
                    return delete t.context, t;
                  })),
                  {
                    baseTag: _(['href'], e),
                    bodyAttributes: T('bodyAttributes', e),
                    defer: S(e, 'defer'),
                    encode: S(e, 'encodeSpecialCharacters'),
                    htmlAttributes: T('htmlAttributes', e),
                    linkTags: L(h.LINK, ['rel', 'href'], e),
                    metaTags: L(h.META, ['name', 'charset', 'http-equiv', 'property', 'itemprop'], e),
                    noscriptTags: L(h.NOSCRIPT, ['innerHTML'], e),
                    onChangeClientState: C(e),
                    scriptTags: L(h.SCRIPT, ['src', 'innerHTML'], e),
                    styleTags: L(h.STYLE, ['cssText'], e),
                    title: x(e),
                    titleAttributes: T('titleAttributes', e),
                    prioritizeSeoTags: A(e, 'prioritizeSeoTags'),
                  });
              G.canUseDOM
                ? ((t = o),
                  K && cancelAnimationFrame(K),
                  t.defer
                    ? (K = requestAnimationFrame(function () {
                        W(t, function () {
                          K = null;
                        });
                      }))
                    : (W(t), (K = null)))
                : z && (a = z(o)),
                r(a);
            }),
            (n.init = function () {
              this.rendered || ((this.rendered = !0), this.props.context.helmetInstances.add(this), this.emitChange());
            }),
            (n.render = function () {
              return this.init(), null;
            }),
            t
          );
        })(r.Component);
      (Q.propTypes = { context: H.isRequired }), (Q.displayName = 'HelmetDispatcher');
      var Y = ['children'],
        X = ['children'],
        J = (function (e) {
          function t() {
            return e.apply(this, arguments) || this;
          }
          p(t, e);
          var n = t.prototype;
          return (
            (n.shouldComponentUpdate = function (e) {
              return !l()(P(this.props, 'helmetData'), P(e, 'helmetData'));
            }),
            (n.mapNestedChildrenToProps = function (e, t) {
              if (!t) return null;
              switch (e.type) {
                case h.SCRIPT:
                case h.NOSCRIPT:
                  return { innerHTML: t };
                case h.STYLE:
                  return { cssText: t };
                default:
                  throw new Error(
                    '<' +
                      e.type +
                      ' /> elements are self-closing and can not contain children. Refer to our API for more information.'
                  );
              }
            }),
            (n.flattenArrayTypeChildren = function (e) {
              var t,
                n = e.child,
                r = e.arrayTypeChildren;
              return f(
                {},
                r,
                (((t = {})[n.type] = [].concat(r[n.type] || [], [
                  f({}, e.newChildProps, this.mapNestedChildrenToProps(n, e.nestedChildren)),
                ])),
                t)
              );
            }),
            (n.mapObjectTypeChildren = function (e) {
              var t,
                n,
                r = e.child,
                a = e.newProps,
                o = e.newChildProps,
                i = e.nestedChildren;
              switch (r.type) {
                case h.TITLE:
                  return f({}, a, (((t = {})[r.type] = i), (t.titleAttributes = f({}, o)), t));
                case h.BODY:
                  return f({}, a, { bodyAttributes: f({}, o) });
                case h.HTML:
                  return f({}, a, { htmlAttributes: f({}, o) });
                default:
                  return f({}, a, (((n = {})[r.type] = f({}, o)), n));
              }
            }),
            (n.mapArrayTypeChildrenToProps = function (e, t) {
              var n = f({}, t);
              return (
                Object.keys(e).forEach(function (t) {
                  var r;
                  n = f({}, n, (((r = {})[t] = e[t]), r));
                }),
                n
              );
            }),
            (n.warnOnInvalidChildren = function (e, t) {
              return (
                u()(
                  w.some(function (t) {
                    return e.type === t;
                  }),
                  'function' == typeof e.type
                    ? 'You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.'
                    : 'Only elements types ' +
                        w.join(', ') +
                        ' are allowed. Helmet does not support rendering <' +
                        e.type +
                        '> elements. Refer to our API for more information.'
                ),
                u()(
                  !t ||
                    'string' == typeof t ||
                    (Array.isArray(t) &&
                      !t.some(function (e) {
                        return 'string' != typeof e;
                      })),
                  'Helmet expects a string as a child of <' +
                    e.type +
                    '>. Did you forget to wrap your children in braces? ( <' +
                    e.type +
                    '>{``}</' +
                    e.type +
                    '> ) Refer to our API for more information.'
                ),
                !0
              );
            }),
            (n.mapChildrenToProps = function (e, t) {
              var n = this,
                a = {};
              return (
                r.Children.forEach(e, function (e) {
                  if (e && e.props) {
                    var r = e.props,
                      o = r.children,
                      i = g(r, Y),
                      l = Object.keys(i).reduce(function (e, t) {
                        return (e[E[t] || t] = i[t]), e;
                      }, {}),
                      s = e.type;
                    switch (('symbol' == typeof s ? (s = s.toString()) : n.warnOnInvalidChildren(e, o), s)) {
                      case h.FRAGMENT:
                        t = n.mapChildrenToProps(o, t);
                        break;
                      case h.LINK:
                      case h.META:
                      case h.NOSCRIPT:
                      case h.SCRIPT:
                      case h.STYLE:
                        a = n.flattenArrayTypeChildren({
                          child: e,
                          arrayTypeChildren: a,
                          newChildProps: l,
                          nestedChildren: o,
                        });
                        break;
                      default:
                        t = n.mapObjectTypeChildren({ child: e, newProps: t, newChildProps: l, nestedChildren: o });
                    }
                  }
                }),
                this.mapArrayTypeChildrenToProps(a, t)
              );
            }),
            (n.render = function () {
              var e = this.props,
                t = e.children,
                n = g(e, X),
                a = f({}, n),
                o = n.helmetData;
              return (
                t && (a = this.mapChildrenToProps(t, a)),
                !o || o instanceof U || (o = new U(o.context, o.instances)),
                o
                  ? r.createElement(Q, f({}, a, { context: o.value, helmetData: void 0 }))
                  : r.createElement($.Consumer, null, function (e) {
                      return r.createElement(Q, f({}, a, { context: e }));
                    })
              );
            }),
            t
          );
        })(r.Component);
      (J.propTypes = {
        base: o().object,
        bodyAttributes: o().object,
        children: o().oneOfType([o().arrayOf(o().node), o().node]),
        defaultTitle: o().string,
        defer: o().bool,
        encodeSpecialCharacters: o().bool,
        htmlAttributes: o().object,
        link: o().arrayOf(o().object),
        meta: o().arrayOf(o().object),
        noscript: o().arrayOf(o().object),
        onChangeClientState: o().func,
        script: o().arrayOf(o().object),
        style: o().arrayOf(o().object),
        title: o().string,
        titleAttributes: o().object,
        titleTemplate: o().string,
        prioritizeSeoTags: o().bool,
        helmetData: o().object,
      }),
        (J.defaultProps = { defer: !0, encodeSpecialCharacters: !0, prioritizeSeoTags: !1 }),
        (J.displayName = 'Helmet');
    },
    1237: (e, t, n) => {
      'use strict';
      function r(e, t) {
        (e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), (e.__proto__ = t);
      }
      function a(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e;
      }
      function o(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
            : (e[t] = n),
          e
        );
      }
      function i() {
        return (
          (i =
            Object.assign ||
            function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
              }
              return e;
            }),
          i.apply(this, arguments)
        );
      }
      var l = n(7378),
        s = n(3615),
        u = [],
        c = [];
      function d(e) {
        var t = e(),
          n = { loading: !0, loaded: null, error: null };
        return (
          (n.promise = t
            .then(function (e) {
              return (n.loading = !1), (n.loaded = e), e;
            })
            .catch(function (e) {
              throw ((n.loading = !1), (n.error = e), e);
            })),
          n
        );
      }
      function f(e) {
        var t = { loading: !1, loaded: {}, error: null },
          n = [];
        try {
          Object.keys(e).forEach(function (r) {
            var a = d(e[r]);
            a.loading ? (t.loading = !0) : ((t.loaded[r] = a.loaded), (t.error = a.error)),
              n.push(a.promise),
              a.promise
                .then(function (e) {
                  t.loaded[r] = e;
                })
                .catch(function (e) {
                  t.error = e;
                });
          });
        } catch (r) {
          t.error = r;
        }
        return (
          (t.promise = Promise.all(n)
            .then(function (e) {
              return (t.loading = !1), e;
            })
            .catch(function (e) {
              throw ((t.loading = !1), e);
            })),
          t
        );
      }
      function p(e, t) {
        return l.createElement((n = e) && n.__esModule ? n.default : n, t);
        var n;
      }
      function m(e, t) {
        var d, f;
        if (!t.loading) throw new Error('react-loadable requires a `loading` component');
        var m = i(
            { loader: null, loading: null, delay: 200, timeout: null, render: p, webpack: null, modules: null },
            t
          ),
          g = null;
        function h() {
          return g || (g = e(m.loader)), g.promise;
        }
        return (
          u.push(h),
          'function' == typeof m.webpack &&
            c.push(function () {
              if (
                (0, m.webpack)().every(function (e) {
                  return void 0 !== e && void 0 !== n.m[e];
                })
              )
                return h();
            }),
          (f = d =
            (function (t) {
              function n(n) {
                var r;
                return (
                  o(a(a((r = t.call(this, n) || this))), 'retry', function () {
                    r.setState({ error: null, loading: !0, timedOut: !1 }), (g = e(m.loader)), r._loadModule();
                  }),
                  h(),
                  (r.state = { error: g.error, pastDelay: !1, timedOut: !1, loading: g.loading, loaded: g.loaded }),
                  r
                );
              }
              r(n, t),
                (n.preload = function () {
                  return h();
                });
              var i = n.prototype;
              return (
                (i.UNSAFE_componentWillMount = function () {
                  this._loadModule();
                }),
                (i.componentDidMount = function () {
                  this._mounted = !0;
                }),
                (i._loadModule = function () {
                  var e = this;
                  if (
                    (this.context.loadable &&
                      Array.isArray(m.modules) &&
                      m.modules.forEach(function (t) {
                        e.context.loadable.report(t);
                      }),
                    g.loading)
                  ) {
                    var t = function (t) {
                      e._mounted && e.setState(t);
                    };
                    'number' == typeof m.delay &&
                      (0 === m.delay
                        ? this.setState({ pastDelay: !0 })
                        : (this._delay = setTimeout(function () {
                            t({ pastDelay: !0 });
                          }, m.delay))),
                      'number' == typeof m.timeout &&
                        (this._timeout = setTimeout(function () {
                          t({ timedOut: !0 });
                        }, m.timeout));
                    var n = function () {
                      t({ error: g.error, loaded: g.loaded, loading: g.loading }), e._clearTimeouts();
                    };
                    g.promise
                      .then(function () {
                        return n(), null;
                      })
                      .catch(function (e) {
                        return n(), null;
                      });
                  }
                }),
                (i.componentWillUnmount = function () {
                  (this._mounted = !1), this._clearTimeouts();
                }),
                (i._clearTimeouts = function () {
                  clearTimeout(this._delay), clearTimeout(this._timeout);
                }),
                (i.render = function () {
                  return this.state.loading || this.state.error
                    ? l.createElement(m.loading, {
                        isLoading: this.state.loading,
                        pastDelay: this.state.pastDelay,
                        timedOut: this.state.timedOut,
                        error: this.state.error,
                        retry: this.retry,
                      })
                    : this.state.loaded
                    ? m.render(this.state.loaded, this.props)
                    : null;
                }),
                n
              );
            })(l.Component)),
          o(d, 'contextTypes', { loadable: s.shape({ report: s.func.isRequired }) }),
          f
        );
      }
      function g(e) {
        return m(d, e);
      }
      g.Map = function (e) {
        if ('function' != typeof e.render) throw new Error('LoadableMap requires a `render(loaded, props)` function');
        return m(f, e);
      };
      var h = (function (e) {
        function t() {
          return e.apply(this, arguments) || this;
        }
        r(t, e);
        var n = t.prototype;
        return (
          (n.getChildContext = function () {
            return { loadable: { report: this.props.report } };
          }),
          (n.render = function () {
            return l.Children.only(this.props.children);
          }),
          t
        );
      })(l.Component);
      function v(e) {
        for (var t = []; e.length; ) {
          var n = e.pop();
          t.push(n());
        }
        return Promise.all(t).then(function () {
          if (e.length) return v(e);
        });
      }
      o(h, 'propTypes', { report: s.func.isRequired }),
        o(h, 'childContextTypes', { loadable: s.shape({ report: s.func.isRequired }).isRequired }),
        (g.Capture = h),
        (g.preloadAll = function () {
          return new Promise(function (e, t) {
            v(u).then(e, t);
          });
        }),
        (g.preloadReady = function () {
          return new Promise(function (e, t) {
            v(c).then(e, e);
          });
        }),
        (e.exports = g);
    },
    5473: (e, t, n) => {
      'use strict';
      n.d(t, { H: () => l, f: () => i });
      var r = n(5582),
        a = n(5773),
        o = n(7378);
      function i(e, t, n) {
        return (
          void 0 === n && (n = []),
          e.some(function (e) {
            var a = e.path ? (0, r.LX)(t, e) : n.length ? n[n.length - 1].match : r.F0.computeRootMatch(t);
            return a && (n.push({ route: e, match: a }), e.routes && i(e.routes, t, n)), a;
          }),
          n
        );
      }
      function l(e, t, n) {
        return (
          void 0 === t && (t = {}),
          void 0 === n && (n = {}),
          e
            ? o.createElement(
                r.rs,
                n,
                e.map(function (e, n) {
                  return o.createElement(r.AW, {
                    key: e.key || n,
                    path: e.path,
                    exact: e.exact,
                    strict: e.strict,
                    render: function (n) {
                      return e.render
                        ? e.render((0, a.Z)({}, n, {}, t, { route: e }))
                        : o.createElement(e.component, (0, a.Z)({}, n, t, { route: e }));
                    },
                  });
                })
              )
            : null
        );
      }
    },
    1535: (e, t) => {
      'use strict';
      var n = Symbol.for('react.element'),
        r = Symbol.for('react.portal'),
        a = Symbol.for('react.fragment'),
        o = Symbol.for('react.strict_mode'),
        i = Symbol.for('react.profiler'),
        l = Symbol.for('react.provider'),
        s = Symbol.for('react.context'),
        u = Symbol.for('react.forward_ref'),
        c = Symbol.for('react.suspense'),
        d = Symbol.for('react.memo'),
        f = Symbol.for('react.lazy'),
        p = Symbol.iterator;
      var m = {
          isMounted: function () {
            return !1;
          },
          enqueueForceUpdate: function () {},
          enqueueReplaceState: function () {},
          enqueueSetState: function () {},
        },
        g = Object.assign,
        h = {};
      function v(e, t, n) {
        (this.props = e), (this.context = t), (this.refs = h), (this.updater = n || m);
      }
      function b() {}
      function y(e, t, n) {
        (this.props = e), (this.context = t), (this.refs = h), (this.updater = n || m);
      }
      (v.prototype.isReactComponent = {}),
        (v.prototype.setState = function (e, t) {
          if ('object' != typeof e && 'function' != typeof e && null != e)
            throw Error(
              'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
            );
          this.updater.enqueueSetState(this, e, t, 'setState');
        }),
        (v.prototype.forceUpdate = function (e) {
          this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
        }),
        (b.prototype = v.prototype);
      var w = (y.prototype = new b());
      (w.constructor = y), g(w, v.prototype), (w.isPureReactComponent = !0);
      var k = Array.isArray,
        E = Object.prototype.hasOwnProperty,
        S = { current: null },
        x = { key: !0, ref: !0, __self: !0, __source: !0 };
      function C(e, t, r) {
        var a,
          o = {},
          i = null,
          l = null;
        if (null != t)
          for (a in (void 0 !== t.ref && (l = t.ref), void 0 !== t.key && (i = '' + t.key), t))
            E.call(t, a) && !x.hasOwnProperty(a) && (o[a] = t[a]);
        var s = arguments.length - 2;
        if (1 === s) o.children = r;
        else if (1 < s) {
          for (var u = Array(s), c = 0; c < s; c++) u[c] = arguments[c + 2];
          o.children = u;
        }
        if (e && e.defaultProps) for (a in (s = e.defaultProps)) void 0 === o[a] && (o[a] = s[a]);
        return { $$typeof: n, type: e, key: i, ref: l, props: o, _owner: S.current };
      }
      function T(e) {
        return 'object' == typeof e && null !== e && e.$$typeof === n;
      }
      var _ = /\/+/g;
      function L(e, t) {
        return 'object' == typeof e && null !== e && null != e.key
          ? (function (e) {
              var t = { '=': '=0', ':': '=2' };
              return (
                '$' +
                e.replace(/[=:]/g, function (e) {
                  return t[e];
                })
              );
            })('' + e.key)
          : t.toString(36);
      }
      function A(e, t, a, o, i) {
        var l = typeof e;
        ('undefined' !== l && 'boolean' !== l) || (e = null);
        var s = !1;
        if (null === e) s = !0;
        else
          switch (l) {
            case 'string':
            case 'number':
              s = !0;
              break;
            case 'object':
              switch (e.$$typeof) {
                case n:
                case r:
                  s = !0;
              }
          }
        if (s)
          return (
            (i = i((s = e))),
            (e = '' === o ? '.' + L(s, 0) : o),
            k(i)
              ? ((a = ''),
                null != e && (a = e.replace(_, '$&/') + '/'),
                A(i, t, a, '', function (e) {
                  return e;
                }))
              : null != i &&
                (T(i) &&
                  (i = (function (e, t) {
                    return { $$typeof: n, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
                  })(i, a + (!i.key || (s && s.key === i.key) ? '' : ('' + i.key).replace(_, '$&/') + '/') + e)),
                t.push(i)),
            1
          );
        if (((s = 0), (o = '' === o ? '.' : o + ':'), k(e)))
          for (var u = 0; u < e.length; u++) {
            var c = o + L((l = e[u]), u);
            s += A(l, t, a, c, i);
          }
        else if (
          ((c = (function (e) {
            return null === e || 'object' != typeof e
              ? null
              : 'function' == typeof (e = (p && e[p]) || e['@@iterator'])
              ? e
              : null;
          })(e)),
          'function' == typeof c)
        )
          for (e = c.call(e), u = 0; !(l = e.next()).done; ) s += A((l = l.value), t, a, (c = o + L(l, u++)), i);
        else if ('object' === l)
          throw (
            ((t = String(e)),
            Error(
              'Objects are not valid as a React child (found: ' +
                ('[object Object]' === t ? 'object with keys {' + Object.keys(e).join(', ') + '}' : t) +
                '). If you meant to render a collection of children, use an array instead.'
            ))
          );
        return s;
      }
      function N(e, t, n) {
        if (null == e) return e;
        var r = [],
          a = 0;
        return (
          A(e, r, '', '', function (e) {
            return t.call(n, e, a++);
          }),
          r
        );
      }
      function R(e) {
        if (-1 === e._status) {
          var t = e._result;
          (t = t()).then(
            function (t) {
              (0 !== e._status && -1 !== e._status) || ((e._status = 1), (e._result = t));
            },
            function (t) {
              (0 !== e._status && -1 !== e._status) || ((e._status = 2), (e._result = t));
            }
          ),
            -1 === e._status && ((e._status = 0), (e._result = t));
        }
        if (1 === e._status) return e._result.default;
        throw e._result;
      }
      var P = { current: null },
        O = { transition: null },
        D = { ReactCurrentDispatcher: P, ReactCurrentBatchConfig: O, ReactCurrentOwner: S };
      (t.Children = {
        map: N,
        forEach: function (e, t, n) {
          N(
            e,
            function () {
              t.apply(this, arguments);
            },
            n
          );
        },
        count: function (e) {
          var t = 0;
          return (
            N(e, function () {
              t++;
            }),
            t
          );
        },
        toArray: function (e) {
          return (
            N(e, function (e) {
              return e;
            }) || []
          );
        },
        only: function (e) {
          if (!T(e)) throw Error('React.Children.only expected to receive a single React element child.');
          return e;
        },
      }),
        (t.Component = v),
        (t.Fragment = a),
        (t.Profiler = i),
        (t.PureComponent = y),
        (t.StrictMode = o),
        (t.Suspense = c),
        (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = D),
        (t.cloneElement = function (e, t, r) {
          if (null == e)
            throw Error('React.cloneElement(...): The argument must be a React element, but you passed ' + e + '.');
          var a = g({}, e.props),
            o = e.key,
            i = e.ref,
            l = e._owner;
          if (null != t) {
            if (
              (void 0 !== t.ref && ((i = t.ref), (l = S.current)),
              void 0 !== t.key && (o = '' + t.key),
              e.type && e.type.defaultProps)
            )
              var s = e.type.defaultProps;
            for (u in t) E.call(t, u) && !x.hasOwnProperty(u) && (a[u] = void 0 === t[u] && void 0 !== s ? s[u] : t[u]);
          }
          var u = arguments.length - 2;
          if (1 === u) a.children = r;
          else if (1 < u) {
            s = Array(u);
            for (var c = 0; c < u; c++) s[c] = arguments[c + 2];
            a.children = s;
          }
          return { $$typeof: n, type: e.type, key: o, ref: i, props: a, _owner: l };
        }),
        (t.createContext = function (e) {
          return (
            ((e = {
              $$typeof: s,
              _currentValue: e,
              _currentValue2: e,
              _threadCount: 0,
              Provider: null,
              Consumer: null,
              _defaultValue: null,
              _globalName: null,
            }).Provider = { $$typeof: l, _context: e }),
            (e.Consumer = e)
          );
        }),
        (t.createElement = C),
        (t.createFactory = function (e) {
          var t = C.bind(null, e);
          return (t.type = e), t;
        }),
        (t.createRef = function () {
          return { current: null };
        }),
        (t.forwardRef = function (e) {
          return { $$typeof: u, render: e };
        }),
        (t.isValidElement = T),
        (t.lazy = function (e) {
          return { $$typeof: f, _payload: { _status: -1, _result: e }, _init: R };
        }),
        (t.memo = function (e, t) {
          return { $$typeof: d, type: e, compare: void 0 === t ? null : t };
        }),
        (t.startTransition = function (e) {
          var t = O.transition;
          O.transition = {};
          try {
            e();
          } finally {
            O.transition = t;
          }
        }),
        (t.unstable_act = function () {
          throw Error('act(...) is not supported in production builds of React.');
        }),
        (t.useCallback = function (e, t) {
          return P.current.useCallback(e, t);
        }),
        (t.useContext = function (e) {
          return P.current.useContext(e);
        }),
        (t.useDebugValue = function () {}),
        (t.useDeferredValue = function (e) {
          return P.current.useDeferredValue(e);
        }),
        (t.useEffect = function (e, t) {
          return P.current.useEffect(e, t);
        }),
        (t.useId = function () {
          return P.current.useId();
        }),
        (t.useImperativeHandle = function (e, t, n) {
          return P.current.useImperativeHandle(e, t, n);
        }),
        (t.useInsertionEffect = function (e, t) {
          return P.current.useInsertionEffect(e, t);
        }),
        (t.useLayoutEffect = function (e, t) {
          return P.current.useLayoutEffect(e, t);
        }),
        (t.useMemo = function (e, t) {
          return P.current.useMemo(e, t);
        }),
        (t.useReducer = function (e, t, n) {
          return P.current.useReducer(e, t, n);
        }),
        (t.useRef = function (e) {
          return P.current.useRef(e);
        }),
        (t.useState = function (e) {
          return P.current.useState(e);
        }),
        (t.useSyncExternalStore = function (e, t, n) {
          return P.current.useSyncExternalStore(e, t, n);
        }),
        (t.useTransition = function () {
          return P.current.useTransition();
        }),
        (t.version = '18.2.0');
    },
    7378: (e, t, n) => {
      'use strict';
      e.exports = n(1535);
    },
    3323: (e, t) => {
      'use strict';
      function n(e, t) {
        var n = e.length;
        e.push(t);
        e: for (; 0 < n; ) {
          var r = (n - 1) >>> 1,
            a = e[r];
          if (!(0 < o(a, t))) break e;
          (e[r] = t), (e[n] = a), (n = r);
        }
      }
      function r(e) {
        return 0 === e.length ? null : e[0];
      }
      function a(e) {
        if (0 === e.length) return null;
        var t = e[0],
          n = e.pop();
        if (n !== t) {
          e[0] = n;
          e: for (var r = 0, a = e.length, i = a >>> 1; r < i; ) {
            var l = 2 * (r + 1) - 1,
              s = e[l],
              u = l + 1,
              c = e[u];
            if (0 > o(s, n))
              u < a && 0 > o(c, s) ? ((e[r] = c), (e[u] = n), (r = u)) : ((e[r] = s), (e[l] = n), (r = l));
            else {
              if (!(u < a && 0 > o(c, n))) break e;
              (e[r] = c), (e[u] = n), (r = u);
            }
          }
        }
        return t;
      }
      function o(e, t) {
        var n = e.sortIndex - t.sortIndex;
        return 0 !== n ? n : e.id - t.id;
      }
      if ('object' == typeof performance && 'function' == typeof performance.now) {
        var i = performance;
        t.unstable_now = function () {
          return i.now();
        };
      } else {
        var l = Date,
          s = l.now();
        t.unstable_now = function () {
          return l.now() - s;
        };
      }
      var u = [],
        c = [],
        d = 1,
        f = null,
        p = 3,
        m = !1,
        g = !1,
        h = !1,
        v = 'function' == typeof setTimeout ? setTimeout : null,
        b = 'function' == typeof clearTimeout ? clearTimeout : null,
        y = 'undefined' != typeof setImmediate ? setImmediate : null;
      function w(e) {
        for (var t = r(c); null !== t; ) {
          if (null === t.callback) a(c);
          else {
            if (!(t.startTime <= e)) break;
            a(c), (t.sortIndex = t.expirationTime), n(u, t);
          }
          t = r(c);
        }
      }
      function k(e) {
        if (((h = !1), w(e), !g))
          if (null !== r(u)) (g = !0), O(E);
          else {
            var t = r(c);
            null !== t && D(k, t.startTime - e);
          }
      }
      function E(e, n) {
        (g = !1), h && ((h = !1), b(T), (T = -1)), (m = !0);
        var o = p;
        try {
          for (w(n), f = r(u); null !== f && (!(f.expirationTime > n) || (e && !A())); ) {
            var i = f.callback;
            if ('function' == typeof i) {
              (f.callback = null), (p = f.priorityLevel);
              var l = i(f.expirationTime <= n);
              (n = t.unstable_now()), 'function' == typeof l ? (f.callback = l) : f === r(u) && a(u), w(n);
            } else a(u);
            f = r(u);
          }
          if (null !== f) var s = !0;
          else {
            var d = r(c);
            null !== d && D(k, d.startTime - n), (s = !1);
          }
          return s;
        } finally {
          (f = null), (p = o), (m = !1);
        }
      }
      'undefined' != typeof navigator &&
        void 0 !== navigator.scheduling &&
        void 0 !== navigator.scheduling.isInputPending &&
        navigator.scheduling.isInputPending.bind(navigator.scheduling);
      var S,
        x = !1,
        C = null,
        T = -1,
        _ = 5,
        L = -1;
      function A() {
        return !(t.unstable_now() - L < _);
      }
      function N() {
        if (null !== C) {
          var e = t.unstable_now();
          L = e;
          var n = !0;
          try {
            n = C(!0, e);
          } finally {
            n ? S() : ((x = !1), (C = null));
          }
        } else x = !1;
      }
      if ('function' == typeof y)
        S = function () {
          y(N);
        };
      else if ('undefined' != typeof MessageChannel) {
        var R = new MessageChannel(),
          P = R.port2;
        (R.port1.onmessage = N),
          (S = function () {
            P.postMessage(null);
          });
      } else
        S = function () {
          v(N, 0);
        };
      function O(e) {
        (C = e), x || ((x = !0), S());
      }
      function D(e, n) {
        T = v(function () {
          e(t.unstable_now());
        }, n);
      }
      (t.unstable_IdlePriority = 5),
        (t.unstable_ImmediatePriority = 1),
        (t.unstable_LowPriority = 4),
        (t.unstable_NormalPriority = 3),
        (t.unstable_Profiling = null),
        (t.unstable_UserBlockingPriority = 2),
        (t.unstable_cancelCallback = function (e) {
          e.callback = null;
        }),
        (t.unstable_continueExecution = function () {
          g || m || ((g = !0), O(E));
        }),
        (t.unstable_forceFrameRate = function (e) {
          0 > e || 125 < e
            ? console.error(
                'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
              )
            : (_ = 0 < e ? Math.floor(1e3 / e) : 5);
        }),
        (t.unstable_getCurrentPriorityLevel = function () {
          return p;
        }),
        (t.unstable_getFirstCallbackNode = function () {
          return r(u);
        }),
        (t.unstable_next = function (e) {
          switch (p) {
            case 1:
            case 2:
            case 3:
              var t = 3;
              break;
            default:
              t = p;
          }
          var n = p;
          p = t;
          try {
            return e();
          } finally {
            p = n;
          }
        }),
        (t.unstable_pauseExecution = function () {}),
        (t.unstable_requestPaint = function () {}),
        (t.unstable_runWithPriority = function (e, t) {
          switch (e) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
              break;
            default:
              e = 3;
          }
          var n = p;
          p = e;
          try {
            return t();
          } finally {
            p = n;
          }
        }),
        (t.unstable_scheduleCallback = function (e, a, o) {
          var i = t.unstable_now();
          switch (
            ('object' == typeof o && null !== o ? (o = 'number' == typeof (o = o.delay) && 0 < o ? i + o : i) : (o = i),
            e)
          ) {
            case 1:
              var l = -1;
              break;
            case 2:
              l = 250;
              break;
            case 5:
              l = 1073741823;
              break;
            case 4:
              l = 1e4;
              break;
            default:
              l = 5e3;
          }
          return (
            (e = { id: d++, callback: a, priorityLevel: e, startTime: o, expirationTime: (l = o + l), sortIndex: -1 }),
            o > i
              ? ((e.sortIndex = o),
                n(c, e),
                null === r(u) && e === r(c) && (h ? (b(T), (T = -1)) : (h = !0), D(k, o - i)))
              : ((e.sortIndex = l), n(u, e), g || m || ((g = !0), O(E))),
            e
          );
        }),
        (t.unstable_shouldYield = A),
        (t.unstable_wrapCallback = function (e) {
          var t = p;
          return function () {
            var n = p;
            p = t;
            try {
              return e.apply(this, arguments);
            } finally {
              p = n;
            }
          };
        });
    },
    1102: (e, t, n) => {
      'use strict';
      e.exports = n(3323);
    },
    4445: e => {
      e.exports = function (e, t, n, r) {
        var a = n ? n.call(r, e, t) : void 0;
        if (void 0 !== a) return !!a;
        if (e === t) return !0;
        if ('object' != typeof e || !e || 'object' != typeof t || !t) return !1;
        var o = Object.keys(e),
          i = Object.keys(t);
        if (o.length !== i.length) return !1;
        for (var l = Object.prototype.hasOwnProperty.bind(t), s = 0; s < o.length; s++) {
          var u = o[s];
          if (!l(u)) return !1;
          var c = e[u],
            d = t[u];
          if (!1 === (a = n ? n.call(r, c, d, u) : void 0) || (void 0 === a && c !== d)) return !1;
        }
        return !0;
      };
    },
    4047: (e, t, n) => {
      'use strict';
      var r = n(7378);
      var a =
          'function' == typeof Object.is
            ? Object.is
            : function (e, t) {
                return (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t);
              },
        o = r.useState,
        i = r.useEffect,
        l = r.useLayoutEffect,
        s = r.useDebugValue;
      function u(e) {
        var t = e.getSnapshot;
        e = e.value;
        try {
          var n = t();
          return !a(e, n);
        } catch (r) {
          return !0;
        }
      }
      var c =
        'undefined' == typeof window || void 0 === window.document || void 0 === window.document.createElement
          ? function (e, t) {
              return t();
            }
          : function (e, t) {
              var n = t(),
                r = o({ inst: { value: n, getSnapshot: t } }),
                a = r[0].inst,
                c = r[1];
              return (
                l(
                  function () {
                    (a.value = n), (a.getSnapshot = t), u(a) && c({ inst: a });
                  },
                  [e, n, t]
                ),
                i(
                  function () {
                    return (
                      u(a) && c({ inst: a }),
                      e(function () {
                        u(a) && c({ inst: a });
                      })
                    );
                  },
                  [e]
                ),
                s(n),
                n
              );
            };
      t.useSyncExternalStore = void 0 !== r.useSyncExternalStore ? r.useSyncExternalStore : c;
    },
    644: (e, t, n) => {
      'use strict';
      e.exports = n(4047);
    },
    5773: (e, t, n) => {
      'use strict';
      function r() {
        return (
          (r = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var n = arguments[t];
                  for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
                }
                return e;
              }),
          r.apply(this, arguments)
        );
      }
      n.d(t, { Z: () => r });
    },
    3219: (e, t, n) => {
      'use strict';
      n.d(t, { Z: () => a });
      var r = n(6983);
      function a(e, t) {
        (e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), (0, r.Z)(e, t);
      }
    },
    808: (e, t, n) => {
      'use strict';
      function r(e, t) {
        if (null == e) return {};
        var n,
          r,
          a = {},
          o = Object.keys(e);
        for (r = 0; r < o.length; r++) (n = o[r]), t.indexOf(n) >= 0 || (a[n] = e[n]);
        return a;
      }
      n.d(t, { Z: () => r });
    },
    6983: (e, t, n) => {
      'use strict';
      function r(e, t) {
        return (
          (r = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (e, t) {
                return (e.__proto__ = t), e;
              }),
          r(e, t)
        );
      }
      n.d(t, { Z: () => r });
    },
    2215: (e, t, n) => {
      'use strict';
      n.d(t, { Z: () => o });
      var r = !0,
        a = 'Invariant failed';
      function o(e, t) {
        if (!e) {
          if (r) throw new Error(a);
          var n = 'function' == typeof t ? t() : t,
            o = n ? ''.concat(a, ': ').concat(n) : a;
          throw new Error(o);
        }
      }
    },
    6809: (e, t, n) => {
      'use strict';
      n.r(t), n.d(t, { default: () => r });
      const r = {
        title: 'Positive Map',
        url: 'https://decSunshineHe.github.io',
        baseUrl: '/positive-map/',
        onBrokenLinks: 'throw',
        onBrokenMarkdownLinks: 'warn',
        favicon: 'img/favicon.ico',
        trailingSlash: !0,
        customFields: {
          codeSandboxPacakgeConfig: {
            dependencies: {
              react: '^18.2.0',
              'react-dom': '^18.2.0',
              antd: '5.3.2',
              '@positive-map/rc-components': '1.0.10',
            },
            devDependencies: { sass: '^1.60.0' },
          },
        },
        organizationName: 'decSunshineHe',
        projectName: 'positive-map',
        i18n: { defaultLocale: 'zh-Hans', locales: ['zh-Hans'], path: 'i18n', localeConfigs: {} },
        presets: [
          [
            'classic',
            {
              docs: {
                path: 'docs/components',
                routeBasePath: 'components',
                sidebarPath: '/Users/hewenjie/Documents/project/positive-map/website/sidebars.js',
              },
              theme: { customCss: '/Users/hewenjie/Documents/project/positive-map/website/src/css/custom.css' },
            },
          ],
        ],
        plugins: ['./plugins/sass', './plugins/alias', './plugins/mdx', './plugins/tsdoc'],
        themeConfig: {
          navbar: {
            title: 'Positive Map',
            logo: { alt: '\u7ec4\u4ef6\u6587\u6863 Logo', src: 'img/logo.png' },
            items: [
              { to: '/components/intro', label: '\u7ec4\u4ef6', position: 'left' },
              { href: 'https://github.com/decSunshineHe/positive-map', label: 'GitHub', position: 'right' },
            ],
            hideOnScroll: !1,
          },
          prism: {
            theme: {
              plain: { color: '#393A34', backgroundColor: '#f6f8fa' },
              styles: [
                { types: ['comment', 'prolog', 'doctype', 'cdata'], style: { color: '#999988', fontStyle: 'italic' } },
                { types: ['namespace'], style: { opacity: 0.7 } },
                { types: ['string', 'attr-value'], style: { color: '#e3116c' } },
                { types: ['punctuation', 'operator'], style: { color: '#393A34' } },
                {
                  types: [
                    'entity',
                    'url',
                    'symbol',
                    'number',
                    'boolean',
                    'variable',
                    'constant',
                    'property',
                    'regex',
                    'inserted',
                  ],
                  style: { color: '#36acaa' },
                },
                { types: ['atrule', 'keyword', 'attr-name', 'selector'], style: { color: '#00a4db' } },
                { types: ['function', 'deleted', 'tag'], style: { color: '#d73a49' } },
                { types: ['function-variable'], style: { color: '#6f42c1' } },
                { types: ['tag', 'selector', 'keyword'], style: { color: '#00009f' } },
              ],
            },
            darkTheme: {
              plain: { color: '#F8F8F2', backgroundColor: '#282A36' },
              styles: [
                { types: ['prolog', 'constant', 'builtin'], style: { color: 'rgb(189, 147, 249)' } },
                { types: ['inserted', 'function'], style: { color: 'rgb(80, 250, 123)' } },
                { types: ['deleted'], style: { color: 'rgb(255, 85, 85)' } },
                { types: ['changed'], style: { color: 'rgb(255, 184, 108)' } },
                { types: ['punctuation', 'symbol'], style: { color: 'rgb(248, 248, 242)' } },
                { types: ['string', 'char', 'tag', 'selector'], style: { color: 'rgb(255, 121, 198)' } },
                { types: ['keyword', 'variable'], style: { color: 'rgb(189, 147, 249)', fontStyle: 'italic' } },
                { types: ['comment'], style: { color: 'rgb(98, 114, 164)' } },
                { types: ['attr-name'], style: { color: 'rgb(241, 250, 140)' } },
              ],
            },
            additionalLanguages: [],
            magicComments: [
              {
                className: 'theme-code-block-highlighted-line',
                line: 'highlight-next-line',
                block: { start: 'highlight-start', end: 'highlight-end' },
              },
            ],
          },
          colorMode: { defaultMode: 'light', disableSwitch: !1, respectPrefersColorScheme: !1 },
          docs: { versionPersistence: 'localStorage', sidebar: { hideable: !1, autoCollapseCategories: !1 } },
          metadata: [],
          tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
        },
        baseUrlIssueBanner: !0,
        onDuplicateRoutes: 'warn',
        staticDirectories: ['static'],
        themes: [],
        scripts: [],
        headTags: [],
        stylesheets: [],
        clientModules: [],
        tagline: '',
        titleDelimiter: '|',
        noIndex: !1,
        markdown: { mermaid: !1 },
      };
    },
    7529: e => {
      'use strict';
      e.exports = JSON.parse(
        '{"theme.AnnouncementBar.closeButtonAriaLabel":"\u5173\u95ed","theme.BackToTopButton.buttonAriaLabel":"\u56de\u5230\u9876\u90e8","theme.CodeBlock.copied":"\u590d\u5236\u6210\u529f","theme.CodeBlock.copy":"\u590d\u5236","theme.CodeBlock.copyButtonAriaLabel":"\u590d\u5236\u4ee3\u7801\u5230\u526a\u8d34\u677f","theme.CodeBlock.wordWrapToggle":"\u5207\u6362\u81ea\u52a8\u6362\u884c","theme.DocSidebarItem.toggleCollapsedCategoryAriaLabel":"\u6253\u5f00/\u6536\u8d77\u4fa7\u8fb9\u680f\u83dc\u5355\u300c{label}\u300d","theme.ErrorPageContent.title":"\u9875\u9762\u5df2\u5d29\u6e83\u3002","theme.ErrorPageContent.tryAgain":"\u91cd\u8bd5","theme.NavBar.navAriaLabel":"\u4e3b\u5bfc\u822a","theme.NotFound.p1":"\u6211\u4eec\u627e\u4e0d\u5230\u60a8\u8981\u627e\u7684\u9875\u9762\u3002","theme.NotFound.p2":"\u8bf7\u8054\u7cfb\u539f\u59cb\u94fe\u63a5\u6765\u6e90\u7f51\u7ad9\u7684\u6240\u6709\u8005\uff0c\u5e76\u544a\u77e5\u4ed6\u4eec\u94fe\u63a5\u5df2\u635f\u574f\u3002","theme.NotFound.title":"\u627e\u4e0d\u5230\u9875\u9762","theme.TOCCollapsible.toggleButtonLabel":"\u672c\u9875\u603b\u89c8","theme.admonition.caution":"\u8b66\u544a","theme.admonition.danger":"\u5371\u9669","theme.admonition.info":"\u4fe1\u606f","theme.admonition.note":"\u5907\u6ce8","theme.admonition.tip":"\u63d0\u793a","theme.blog.archive.description":"\u5386\u53f2\u535a\u6587","theme.blog.archive.title":"\u5386\u53f2\u535a\u6587","theme.blog.paginator.navAriaLabel":"\u535a\u6587\u5217\u8868\u5206\u9875\u5bfc\u822a","theme.blog.paginator.newerEntries":"\u8f83\u65b0\u7684\u535a\u6587","theme.blog.paginator.olderEntries":"\u8f83\u65e7\u7684\u535a\u6587","theme.blog.post.paginator.navAriaLabel":"\u535a\u6587\u5206\u9875\u5bfc\u822a","theme.blog.post.paginator.newerPost":"\u8f83\u65b0\u4e00\u7bc7","theme.blog.post.paginator.olderPost":"\u8f83\u65e7\u4e00\u7bc7","theme.blog.post.plurals":"{count} \u7bc7\u535a\u6587","theme.blog.post.readMore":"\u9605\u8bfb\u66f4\u591a","theme.blog.post.readMoreLabel":"\u9605\u8bfb {title} \u7684\u5168\u6587","theme.blog.post.readingTime.plurals":"\u9605\u8bfb\u9700 {readingTime} \u5206\u949f","theme.blog.sidebar.navAriaLabel":"\u6700\u8fd1\u535a\u6587\u5bfc\u822a","theme.blog.tagTitle":"{nPosts} \u542b\u6709\u6807\u7b7e\u300c{tagName}\u300d","theme.colorToggle.ariaLabel":"\u5207\u6362\u6d45\u8272/\u6697\u9ed1\u6a21\u5f0f\uff08\u5f53\u524d\u4e3a{mode}\uff09","theme.colorToggle.ariaLabel.mode.dark":"\u6697\u9ed1\u6a21\u5f0f","theme.colorToggle.ariaLabel.mode.light":"\u6d45\u8272\u6a21\u5f0f","theme.common.editThisPage":"\u7f16\u8f91\u6b64\u9875","theme.common.headingLinkTitle":"{heading}\u7684\u76f4\u63a5\u94fe\u63a5","theme.common.skipToMainContent":"\u8df3\u5230\u4e3b\u8981\u5185\u5bb9","theme.docs.DocCard.categoryDescription":"{count} \u4e2a\u9879\u76ee","theme.docs.breadcrumbs.home":"\u4e3b\u9875\u9762","theme.docs.breadcrumbs.navAriaLabel":"\u9875\u9762\u8def\u5f84","theme.docs.paginator.navAriaLabel":"\u6587\u6863\u5206\u9875\u5bfc\u822a","theme.docs.paginator.next":"\u4e0b\u4e00\u9875","theme.docs.paginator.previous":"\u4e0a\u4e00\u9875","theme.docs.sidebar.closeSidebarButtonAriaLabel":"\u5173\u95ed\u5bfc\u822a\u680f","theme.docs.sidebar.collapseButtonAriaLabel":"\u6536\u8d77\u4fa7\u8fb9\u680f","theme.docs.sidebar.collapseButtonTitle":"\u6536\u8d77\u4fa7\u8fb9\u680f","theme.docs.sidebar.expandButtonAriaLabel":"\u5c55\u5f00\u4fa7\u8fb9\u680f","theme.docs.sidebar.expandButtonTitle":"\u5c55\u5f00\u4fa7\u8fb9\u680f","theme.docs.sidebar.navAriaLabel":"\u6587\u6863\u4fa7\u8fb9\u680f","theme.docs.sidebar.toggleSidebarButtonAriaLabel":"\u5207\u6362\u5bfc\u822a\u680f","theme.docs.tagDocListPageTitle":"{nDocsTagged}\u300c{tagName}\u300d","theme.docs.tagDocListPageTitle.nDocsTagged":"{count} \u7bc7\u6587\u6863\u5e26\u6709\u6807\u7b7e","theme.docs.versionBadge.label":"\u7248\u672c\uff1a{versionLabel}","theme.docs.versions.latestVersionLinkLabel":"\u6700\u65b0\u7248\u672c","theme.docs.versions.latestVersionSuggestionLabel":"\u6700\u65b0\u7684\u6587\u6863\u8bf7\u53c2\u9605 {latestVersionLink} ({versionLabel})\u3002","theme.docs.versions.unmaintainedVersionLabel":"\u6b64\u4e3a {siteTitle} {versionLabel} \u7248\u7684\u6587\u6863\uff0c\u73b0\u5df2\u4e0d\u518d\u79ef\u6781\u7ef4\u62a4\u3002","theme.docs.versions.unreleasedVersionLabel":"\u6b64\u4e3a {siteTitle} {versionLabel} \u7248\u5c1a\u672a\u53d1\u884c\u7684\u6587\u6863\u3002","theme.lastUpdated.atDate":"\u4e8e {date} ","theme.lastUpdated.byUser":"\u7531 {user} ","theme.lastUpdated.lastUpdatedAtBy":"\u6700\u540e{byUser}{atDate}\u66f4\u65b0","theme.navbar.mobileLanguageDropdown.label":"\u9009\u62e9\u8bed\u8a00","theme.navbar.mobileSidebarSecondaryMenu.backButtonLabel":"\u2190 \u56de\u5230\u4e3b\u83dc\u5355","theme.navbar.mobileVersionsDropdown.label":"\u9009\u62e9\u7248\u672c","theme.tags.tagsListLabel":"\u6807\u7b7e\uff1a","theme.tags.tagsPageLink":"\u67e5\u770b\u6240\u6709\u6807\u7b7e","theme.tags.tagsPageTitle":"\u6807\u7b7e"}'
      );
    },
    6887: e => {
      'use strict';
      e.exports = JSON.parse(
        '{"/positive-map/markdown-page/-072":{"__comp":"1f391b9e","__context":{"plugin":"181152ac"},"content":"393be207"},"/positive-map/components/-a6e":{"__comp":"1be78505","__context":{"plugin":"ba8dffb3"},"versionMetadata":"935f2afb"},"/positive-map/components/category/\u9875\u9762\u5143\u7d20/-aa2":{"__comp":"14eb3368","categoryGeneratedIndex":"3d95e484"},"/positive-map/components/intro/-e79":{"__comp":"17896441","content":"a8591d8d"},"/positive-map/components/page-elements/AddressCascader/-958":{"__comp":"17896441","content":"9f8d80ef"},"/positive-map/components/page-elements/NumericKeyboard/-31f":{"__comp":"17896441","content":"39c24051"},"/positive-map/components/page-elements/SwitchStaff/-1d6":{"__comp":"17896441","content":"119fc729"},"/positive-map/-faf":{"__comp":"1df93b7f","__context":{"plugin":"181152ac"},"config":"5e9f5e1a"}}'
      );
    },
  },
  e => {
    e.O(0, [532], () => {
      return (t = 3375), e((e.s = t));
      var t;
    });
    e.O();
  },
]);
