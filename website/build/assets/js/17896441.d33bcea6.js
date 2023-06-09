'use strict';
(self.webpackChunkui_website = self.webpackChunkui_website || []).push([
  [918],
  {
    6821: (e, t, a) => {
      a.d(t, { Z: () => g });
      var n = a(5773),
        l = a(7378),
        r = a(8944),
        o = a(5484),
        s = a(5161),
        c = a(8862),
        i = a(1884),
        d = a(9213),
        m = a(8948);
      function u(e) {
        return l.createElement(
          'svg',
          (0, n.Z)({ viewBox: '0 0 24 24' }, e),
          l.createElement('path', {
            d: 'M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z',
            fill: 'currentColor',
          })
        );
      }
      const b = { breadcrumbHomeIcon: 'breadcrumbHomeIcon_sfvy' };
      function v() {
        const e = (0, m.Z)('/');
        return l.createElement(
          'li',
          { className: 'breadcrumbs__item' },
          l.createElement(
            i.Z,
            {
              'aria-label': (0, d.I)({
                id: 'theme.docs.breadcrumbs.home',
                message: 'Home page',
                description: 'The ARIA label for the home page in the breadcrumbs',
              }),
              className: 'breadcrumbs__link',
              href: e,
            },
            l.createElement(u, { className: b.breadcrumbHomeIcon })
          )
        );
      }
      const p = { breadcrumbsContainer: 'breadcrumbsContainer_T5ub' };
      function f(e) {
        let { children: t, href: a, isLast: n } = e;
        const r = 'breadcrumbs__link';
        return n
          ? l.createElement('span', { className: r, itemProp: 'name' }, t)
          : a
          ? l.createElement(
              i.Z,
              { className: r, href: a, itemProp: 'item' },
              l.createElement('span', { itemProp: 'name' }, t)
            )
          : l.createElement('span', { className: r }, t);
      }
      function h(e) {
        let { children: t, active: a, index: o, addMicrodata: s } = e;
        return l.createElement(
          'li',
          (0, n.Z)({}, s && { itemScope: !0, itemProp: 'itemListElement', itemType: 'https://schema.org/ListItem' }, {
            className: (0, r.default)('breadcrumbs__item', { 'breadcrumbs__item--active': a }),
          }),
          t,
          l.createElement('meta', { itemProp: 'position', content: String(o + 1) })
        );
      }
      function g() {
        const e = (0, s.s1)(),
          t = (0, c.Ns)();
        return e
          ? l.createElement(
              'nav',
              {
                className: (0, r.default)(o.k.docs.docBreadcrumbs, p.breadcrumbsContainer),
                'aria-label': (0, d.I)({
                  id: 'theme.docs.breadcrumbs.navAriaLabel',
                  message: 'Breadcrumbs',
                  description: 'The ARIA label for the breadcrumbs',
                }),
              },
              l.createElement(
                'ul',
                { className: 'breadcrumbs', itemScope: !0, itemType: 'https://schema.org/BreadcrumbList' },
                t && l.createElement(v, null),
                e.map((t, a) => {
                  const n = a === e.length - 1;
                  return l.createElement(
                    h,
                    { key: a, active: n, index: a, addMicrodata: !!t.href },
                    l.createElement(f, { href: t.href, isLast: n }, t.label)
                  );
                })
              )
            )
          : null;
      }
    },
    3327: (e, t, a) => {
      a.r(t), a.d(t, { default: () => X });
      var n = a(7378),
        l = a(8831),
        r = a(1763);
      const o = n.createContext(null);
      function s(e) {
        let { children: t, content: a } = e;
        const l = (function (e) {
          return (0, n.useMemo)(
            () => ({
              metadata: e.metadata,
              frontMatter: e.frontMatter,
              assets: e.assets,
              contentTitle: e.contentTitle,
              toc: e.toc,
            }),
            [e]
          );
        })(a);
        return n.createElement(o.Provider, { value: l }, t);
      }
      function c() {
        const e = (0, n.useContext)(o);
        if (null === e) throw new r.i6('DocProvider');
        return e;
      }
      function i() {
        const { metadata: e, frontMatter: t, assets: a } = c();
        return n.createElement(l.d, {
          title: e.title,
          description: e.description,
          keywords: t.keywords,
          image: a.image ?? t.image,
        });
      }
      var d = a(8944),
        m = a(8357),
        u = a(4619);
      function b() {
        const { metadata: e } = c();
        return n.createElement(u.Z, { previous: e.previous, next: e.next });
      }
      var v = a(4506),
        p = a(5069),
        f = a(5484),
        h = a(9213);
      function g(e) {
        let { lastUpdatedAt: t, formattedLastUpdatedAt: a } = e;
        return n.createElement(
          h.Z,
          {
            id: 'theme.lastUpdated.atDate',
            description: 'The words used to describe on which date a page has been last updated',
            values: {
              date: n.createElement(
                'b',
                null,
                n.createElement('time', { dateTime: new Date(1e3 * t).toISOString() }, a)
              ),
            },
          },
          ' on {date}'
        );
      }
      function E(e) {
        let { lastUpdatedBy: t } = e;
        return n.createElement(
          h.Z,
          {
            id: 'theme.lastUpdated.byUser',
            description: 'The words used to describe by who the page has been last updated',
            values: { user: n.createElement('b', null, t) },
          },
          ' by {user}'
        );
      }
      function L(e) {
        let { lastUpdatedAt: t, formattedLastUpdatedAt: a, lastUpdatedBy: l } = e;
        return n.createElement(
          'span',
          { className: f.k.common.lastUpdated },
          n.createElement(
            h.Z,
            {
              id: 'theme.lastUpdated.lastUpdatedAtBy',
              description: 'The sentence used to display when a page has been last updated, and by who',
              values: {
                atDate: t && a ? n.createElement(g, { lastUpdatedAt: t, formattedLastUpdatedAt: a }) : '',
                byUser: l ? n.createElement(E, { lastUpdatedBy: l }) : '',
              },
            },
            'Last updated{atDate}{byUser}'
          ),
          !1
        );
      }
      var N = a(5773);
      const C = { iconEdit: 'iconEdit_bHB7' };
      function _(e) {
        let { className: t, ...a } = e;
        return n.createElement(
          'svg',
          (0, N.Z)(
            {
              fill: 'currentColor',
              height: '20',
              width: '20',
              viewBox: '0 0 40 40',
              className: (0, d.default)(C.iconEdit, t),
              'aria-hidden': 'true',
            },
            a
          ),
          n.createElement(
            'g',
            null,
            n.createElement('path', {
              d: 'm34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z',
            })
          )
        );
      }
      function k(e) {
        let { editUrl: t } = e;
        return n.createElement(
          'a',
          { href: t, target: '_blank', rel: 'noreferrer noopener', className: f.k.common.editThisPage },
          n.createElement(_, null),
          n.createElement(
            h.Z,
            { id: 'theme.common.editThisPage', description: 'The link label to edit the current page' },
            'Edit this page'
          )
        );
      }
      var Z = a(1884);
      const x = { tag: 'tag_otG2', tagRegular: 'tagRegular_s0E1', tagWithCount: 'tagWithCount_PGyn' };
      function T(e) {
        let { permalink: t, label: a, count: l } = e;
        return n.createElement(
          Z.Z,
          { href: t, className: (0, d.default)(x.tag, l ? x.tagWithCount : x.tagRegular) },
          a,
          l && n.createElement('span', null, l)
        );
      }
      const H = { tags: 'tags_Ow0B', tag: 'tag_DFxh' };
      function y(e) {
        let { tags: t } = e;
        return n.createElement(
          n.Fragment,
          null,
          n.createElement(
            'b',
            null,
            n.createElement(
              h.Z,
              { id: 'theme.tags.tagsListLabel', description: 'The label alongside a tag list' },
              'Tags:'
            )
          ),
          n.createElement(
            'ul',
            { className: (0, d.default)(H.tags, 'padding--none', 'margin-left--sm') },
            t.map(e => {
              let { label: t, permalink: a } = e;
              return n.createElement(
                'li',
                { key: a, className: H.tag },
                n.createElement(T, { label: t, permalink: a })
              );
            })
          )
        );
      }
      const U = { lastUpdated: 'lastUpdated_pbO5' };
      function w(e) {
        return n.createElement(
          'div',
          { className: (0, d.default)(f.k.docs.docFooterTagsRow, 'row margin-bottom--sm') },
          n.createElement('div', { className: 'col' }, n.createElement(y, e))
        );
      }
      function A(e) {
        let { editUrl: t, lastUpdatedAt: a, lastUpdatedBy: l, formattedLastUpdatedAt: r } = e;
        return n.createElement(
          'div',
          { className: (0, d.default)(f.k.docs.docFooterEditMetaRow, 'row') },
          n.createElement('div', { className: 'col' }, t && n.createElement(k, { editUrl: t })),
          n.createElement(
            'div',
            { className: (0, d.default)('col', U.lastUpdated) },
            (a || l) && n.createElement(L, { lastUpdatedAt: a, formattedLastUpdatedAt: r, lastUpdatedBy: l })
          )
        );
      }
      function B() {
        const { metadata: e } = c(),
          { editUrl: t, lastUpdatedAt: a, formattedLastUpdatedAt: l, lastUpdatedBy: r, tags: o } = e,
          s = o.length > 0,
          i = !!(t || a || r);
        return s || i
          ? n.createElement(
              'footer',
              { className: (0, d.default)(f.k.docs.docFooter, 'docusaurus-mt-lg') },
              s && n.createElement(w, { tags: o }),
              i && n.createElement(A, { editUrl: t, lastUpdatedAt: a, lastUpdatedBy: r, formattedLastUpdatedAt: l })
            )
          : null;
      }
      var I = a(376),
        M = a(6033);
      const O = {
        tocCollapsibleButton: 'tocCollapsibleButton_iI2p',
        tocCollapsibleButtonExpanded: 'tocCollapsibleButtonExpanded_cHjC',
      };
      function R(e) {
        let { collapsed: t, ...a } = e;
        return n.createElement(
          'button',
          (0, N.Z)({ type: 'button' }, a, {
            className: (0, d.default)(
              'clean-btn',
              O.tocCollapsibleButton,
              !t && O.tocCollapsibleButtonExpanded,
              a.className
            ),
          }),
          n.createElement(
            h.Z,
            {
              id: 'theme.TOCCollapsible.toggleButtonLabel',
              description: 'The label used by the button on the collapsible TOC component',
            },
            'On this page'
          )
        );
      }
      const S = {
        tocCollapsible: 'tocCollapsible_wXna',
        tocCollapsibleContent: 'tocCollapsibleContent_vea0',
        tocCollapsibleExpanded: 'tocCollapsibleExpanded_BbRn',
      };
      function P(e) {
        let { toc: t, className: a, minHeadingLevel: l, maxHeadingLevel: r } = e;
        const { collapsed: o, toggleCollapsed: s } = (0, I.u)({ initialState: !0 });
        return n.createElement(
          'div',
          { className: (0, d.default)(S.tocCollapsible, !o && S.tocCollapsibleExpanded, a) },
          n.createElement(R, { collapsed: o, onClick: s }),
          n.createElement(
            I.z,
            { lazy: !0, className: S.tocCollapsibleContent, collapsed: o },
            n.createElement(M.Z, { toc: t, minHeadingLevel: l, maxHeadingLevel: r })
          )
        );
      }
      const V = { tocMobile: 'tocMobile_Ojys' };
      function D() {
        const { toc: e, frontMatter: t } = c();
        return n.createElement(P, {
          toc: e,
          minHeadingLevel: t.toc_min_heading_level,
          maxHeadingLevel: t.toc_max_heading_level,
          className: (0, d.default)(f.k.docs.docTocMobile, V.tocMobile),
        });
      }
      var F = a(7061);
      function z() {
        const { toc: e, frontMatter: t } = c();
        return n.createElement(F.Z, {
          toc: e,
          minHeadingLevel: t.toc_min_heading_level,
          maxHeadingLevel: t.toc_max_heading_level,
          className: f.k.docs.docTocDesktop,
        });
      }
      var j = a(1999),
        q = a(450);
      function G(e) {
        let { children: t } = e;
        const a = (function () {
          const { metadata: e, frontMatter: t, contentTitle: a } = c();
          return t.hide_title || void 0 !== a ? null : e.title;
        })();
        return n.createElement(
          'div',
          { className: (0, d.default)(f.k.docs.docMarkdown, 'markdown') },
          a && n.createElement('header', null, n.createElement(j.Z, { as: 'h1' }, a)),
          n.createElement(q.Z, null, t)
        );
      }
      var W = a(6821);
      const $ = { docItemContainer: 'docItemContainer_tjFy', docItemCol: 'docItemCol_Qr34' };
      function J(e) {
        let { children: t } = e;
        const a = (function () {
          const { frontMatter: e, toc: t } = c(),
            a = (0, m.i)(),
            l = e.hide_table_of_contents,
            r = !l && t.length > 0;
          return {
            hidden: l,
            mobile: r ? n.createElement(D, null) : void 0,
            desktop: !r || ('desktop' !== a && 'ssr' !== a) ? void 0 : n.createElement(z, null),
          };
        })();
        return n.createElement(
          'div',
          { className: 'row' },
          n.createElement(
            'div',
            { className: (0, d.default)('col', !a.hidden && $.docItemCol) },
            n.createElement(v.Z, null),
            n.createElement(
              'div',
              { className: $.docItemContainer },
              n.createElement(
                'article',
                null,
                n.createElement(W.Z, null),
                n.createElement(p.Z, null),
                a.mobile,
                n.createElement(G, null, t),
                n.createElement(B, null)
              ),
              n.createElement(b, null)
            )
          ),
          a.desktop && n.createElement('div', { className: 'col col--3' }, a.desktop)
        );
      }
      function X(e) {
        const t = `docs-doc-id-${e.content.metadata.unversionedId}`,
          a = e.content;
        return n.createElement(
          s,
          { content: e.content },
          n.createElement(
            l.FG,
            { className: t },
            n.createElement(i, null),
            n.createElement(J, null, n.createElement(a, null))
          )
        );
      }
    },
    4619: (e, t, a) => {
      a.d(t, { Z: () => i });
      var n = a(5773),
        l = a(7378),
        r = a(9213),
        o = a(8944),
        s = a(1884);
      function c(e) {
        const { permalink: t, title: a, subLabel: n, isNext: r } = e;
        return l.createElement(
          s.Z,
          {
            className: (0, o.default)(
              'pagination-nav__link',
              r ? 'pagination-nav__link--next' : 'pagination-nav__link--prev'
            ),
            to: t,
          },
          n && l.createElement('div', { className: 'pagination-nav__sublabel' }, n),
          l.createElement('div', { className: 'pagination-nav__label' }, a)
        );
      }
      function i(e) {
        const { previous: t, next: a } = e;
        return l.createElement(
          'nav',
          {
            className: 'pagination-nav docusaurus-mt-lg',
            'aria-label': (0, r.I)({
              id: 'theme.docs.paginator.navAriaLabel',
              message: 'Docs pages navigation',
              description: 'The ARIA label for the docs pagination',
            }),
          },
          t &&
            l.createElement(
              c,
              (0, n.Z)({}, t, {
                subLabel: l.createElement(
                  r.Z,
                  {
                    id: 'theme.docs.paginator.previous',
                    description: 'The label used to navigate to the previous doc',
                  },
                  'Previous'
                ),
              })
            ),
          a &&
            l.createElement(
              c,
              (0, n.Z)({}, a, {
                subLabel: l.createElement(
                  r.Z,
                  { id: 'theme.docs.paginator.next', description: 'The label used to navigate to the next doc' },
                  'Next'
                ),
                isNext: !0,
              })
            )
        );
      }
    },
    5069: (e, t, a) => {
      a.d(t, { Z: () => c });
      var n = a(7378),
        l = a(8944),
        r = a(9213),
        o = a(5484),
        s = a(5611);
      function c(e) {
        let { className: t } = e;
        const a = (0, s.E)();
        return a.badge
          ? n.createElement(
              'span',
              { className: (0, l.default)(t, o.k.docs.docVersionBadge, 'badge badge--secondary') },
              n.createElement(
                r.Z,
                { id: 'theme.docs.versionBadge.label', values: { versionLabel: a.label } },
                'Version: {versionLabel}'
              )
            )
          : null;
      }
    },
    4506: (e, t, a) => {
      a.d(t, { Z: () => f });
      var n = a(7378),
        l = a(8944),
        r = a(353),
        o = a(1884),
        s = a(9213),
        c = a(2935),
        i = a(5484),
        d = a(4453),
        m = a(5611);
      const u = {
        unreleased: function (e) {
          let { siteTitle: t, versionMetadata: a } = e;
          return n.createElement(
            s.Z,
            {
              id: 'theme.docs.versions.unreleasedVersionLabel',
              description: "The label used to tell the user that he's browsing an unreleased doc version",
              values: { siteTitle: t, versionLabel: n.createElement('b', null, a.label) },
            },
            'This is unreleased documentation for {siteTitle} {versionLabel} version.'
          );
        },
        unmaintained: function (e) {
          let { siteTitle: t, versionMetadata: a } = e;
          return n.createElement(
            s.Z,
            {
              id: 'theme.docs.versions.unmaintainedVersionLabel',
              description: "The label used to tell the user that he's browsing an unmaintained doc version",
              values: { siteTitle: t, versionLabel: n.createElement('b', null, a.label) },
            },
            'This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.'
          );
        },
      };
      function b(e) {
        const t = u[e.versionMetadata.banner];
        return n.createElement(t, e);
      }
      function v(e) {
        let { versionLabel: t, to: a, onClick: l } = e;
        return n.createElement(
          s.Z,
          {
            id: 'theme.docs.versions.latestVersionSuggestionLabel',
            description: 'The label used to tell the user to check the latest version',
            values: {
              versionLabel: t,
              latestVersionLink: n.createElement(
                'b',
                null,
                n.createElement(
                  o.Z,
                  { to: a, onClick: l },
                  n.createElement(
                    s.Z,
                    {
                      id: 'theme.docs.versions.latestVersionLinkLabel',
                      description: 'The label used for the latest version suggestion link label',
                    },
                    'latest version'
                  )
                )
              ),
            },
          },
          'For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).'
        );
      }
      function p(e) {
        let { className: t, versionMetadata: a } = e;
        const {
            siteConfig: { title: o },
          } = (0, r.Z)(),
          { pluginId: s } = (0, c.gA)({ failfast: !0 }),
          { savePreferredVersionName: m } = (0, d.J)(s),
          { latestDocSuggestion: u, latestVersionSuggestion: p } = (0, c.Jo)(s),
          f = u ?? (h = p).docs.find(e => e.id === h.mainDocId);
        var h;
        return n.createElement(
          'div',
          {
            className: (0, l.default)(t, i.k.docs.docVersionBanner, 'alert alert--warning margin-bottom--md'),
            role: 'alert',
          },
          n.createElement('div', null, n.createElement(b, { siteTitle: o, versionMetadata: a })),
          n.createElement(
            'div',
            { className: 'margin-top--md' },
            n.createElement(v, { versionLabel: p.label, to: f.path, onClick: () => m(p.name) })
          )
        );
      }
      function f(e) {
        let { className: t } = e;
        const a = (0, m.E)();
        return a.banner ? n.createElement(p, { className: t, versionMetadata: a }) : null;
      }
    },
    450: (e, t, a) => {
      a.d(t, { Z: () => o });
      var n = a(7378),
        l = a(5318),
        r = a(5256);
      function o(e) {
        let { children: t } = e;
        return n.createElement(l.Zo, { components: r.Z }, t);
      }
    },
    7061: (e, t, a) => {
      a.d(t, { Z: () => d });
      var n = a(5773),
        l = a(7378),
        r = a(8944),
        o = a(6033);
      const s = { tableOfContents: 'tableOfContents_XG6w', docItemContainer: 'docItemContainer_Tr6w' },
        c = 'table-of-contents__link toc-highlight',
        i = 'table-of-contents__link--active';
      function d(e) {
        let { className: t, ...a } = e;
        return l.createElement(
          'div',
          { className: (0, r.default)(s.tableOfContents, 'thin-scrollbar', t) },
          l.createElement(o.Z, (0, n.Z)({}, a, { linkClassName: c, linkActiveClassName: i }))
        );
      }
    },
    6033: (e, t, a) => {
      a.d(t, { Z: () => v });
      var n = a(5773),
        l = a(7378),
        r = a(624);
      function o(e) {
        const t = e.map(e => ({ ...e, parentIndex: -1, children: [] })),
          a = Array(7).fill(-1);
        t.forEach((e, t) => {
          const n = a.slice(2, e.level);
          (e.parentIndex = Math.max(...n)), (a[e.level] = t);
        });
        const n = [];
        return (
          t.forEach(e => {
            const { parentIndex: a, ...l } = e;
            a >= 0 ? t[a].children.push(l) : n.push(l);
          }),
          n
        );
      }
      function s(e) {
        let { toc: t, minHeadingLevel: a, maxHeadingLevel: n } = e;
        return t.flatMap(e => {
          const t = s({ toc: e.children, minHeadingLevel: a, maxHeadingLevel: n });
          return (function (e) {
            return e.level >= a && e.level <= n;
          })(e)
            ? [{ ...e, children: t }]
            : t;
        });
      }
      function c(e) {
        const t = e.getBoundingClientRect();
        return t.top === t.bottom ? c(e.parentNode) : t;
      }
      function i(e, t) {
        let { anchorTopOffset: a } = t;
        const n = e.find(e => c(e).top >= a);
        if (n) {
          return (function (e) {
            return e.top > 0 && e.bottom < window.innerHeight / 2;
          })(c(n))
            ? n
            : e[e.indexOf(n) - 1] ?? null;
        }
        return e[e.length - 1] ?? null;
      }
      function d() {
        const e = (0, l.useRef)(0),
          {
            navbar: { hideOnScroll: t },
          } = (0, r.L)();
        return (
          (0, l.useEffect)(() => {
            e.current = t ? 0 : document.querySelector('.navbar').clientHeight;
          }, [t]),
          e
        );
      }
      function m(e) {
        const t = (0, l.useRef)(void 0),
          a = d();
        (0, l.useEffect)(() => {
          if (!e) return () => {};
          const { linkClassName: n, linkActiveClassName: l, minHeadingLevel: r, maxHeadingLevel: o } = e;
          function s() {
            const e = (function (e) {
                return Array.from(document.getElementsByClassName(e));
              })(n),
              s = (function (e) {
                let { minHeadingLevel: t, maxHeadingLevel: a } = e;
                const n = [];
                for (let l = t; l <= a; l += 1) n.push(`h${l}.anchor`);
                return Array.from(document.querySelectorAll(n.join()));
              })({ minHeadingLevel: r, maxHeadingLevel: o }),
              c = i(s, { anchorTopOffset: a.current }),
              d = e.find(
                e =>
                  c &&
                  c.id ===
                    (function (e) {
                      return decodeURIComponent(e.href.substring(e.href.indexOf('#') + 1));
                    })(e)
              );
            e.forEach(e => {
              !(function (e, a) {
                a
                  ? (t.current && t.current !== e && t.current.classList.remove(l), e.classList.add(l), (t.current = e))
                  : e.classList.remove(l);
              })(e, e === d);
            });
          }
          return (
            document.addEventListener('scroll', s),
            document.addEventListener('resize', s),
            s(),
            () => {
              document.removeEventListener('scroll', s), document.removeEventListener('resize', s);
            }
          );
        }, [e, a]);
      }
      function u(e) {
        let { toc: t, className: a, linkClassName: n, isChild: r } = e;
        return t.length
          ? l.createElement(
              'ul',
              { className: r ? void 0 : a },
              t.map(e =>
                l.createElement(
                  'li',
                  { key: e.id },
                  l.createElement('a', {
                    href: `#${e.id}`,
                    className: n ?? void 0,
                    dangerouslySetInnerHTML: { __html: e.value },
                  }),
                  l.createElement(u, { isChild: !0, toc: e.children, className: a, linkClassName: n })
                )
              )
            )
          : null;
      }
      const b = l.memo(u);
      function v(e) {
        let {
          toc: t,
          className: a = 'table-of-contents table-of-contents__left-border',
          linkClassName: c = 'table-of-contents__link',
          linkActiveClassName: i,
          minHeadingLevel: d,
          maxHeadingLevel: u,
          ...v
        } = e;
        const p = (0, r.L)(),
          f = d ?? p.tableOfContents.minHeadingLevel,
          h = u ?? p.tableOfContents.maxHeadingLevel,
          g = (function (e) {
            let { toc: t, minHeadingLevel: a, maxHeadingLevel: n } = e;
            return (0, l.useMemo)(() => s({ toc: o(t), minHeadingLevel: a, maxHeadingLevel: n }), [t, a, n]);
          })({ toc: t, minHeadingLevel: f, maxHeadingLevel: h });
        return (
          m(
            (0, l.useMemo)(() => {
              if (c && i) return { linkClassName: c, linkActiveClassName: i, minHeadingLevel: f, maxHeadingLevel: h };
            }, [c, i, f, h])
          ),
          l.createElement(b, (0, n.Z)({ toc: g, className: a, linkClassName: c }, v))
        );
      }
    },
  },
]);
