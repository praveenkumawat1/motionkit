import oe, { useRef as h, useEffect as N, useState as ae } from "react";
var w = { exports: {} }, b = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var D;
function se() {
  if (D) return b;
  D = 1;
  var i = Symbol.for("react.transitional.element"), c = Symbol.for("react.fragment");
  function u(l, n, t) {
    var f = null;
    if (t !== void 0 && (f = "" + t), n.key !== void 0 && (f = "" + n.key), "key" in n) {
      t = {};
      for (var m in n)
        m !== "key" && (t[m] = n[m]);
    } else t = n;
    return n = t.ref, {
      $$typeof: i,
      type: l,
      key: f,
      ref: n !== void 0 ? n : null,
      props: t
    };
  }
  return b.Fragment = c, b.jsx = u, b.jsxs = u, b;
}
var k = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var U;
function ie() {
  return U || (U = 1, process.env.NODE_ENV !== "production" && (function() {
    function i(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === re ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case P:
          return "Fragment";
        case J:
          return "Profiler";
        case z:
          return "StrictMode";
        case H:
          return "Suspense";
        case Z:
          return "SuspenseList";
        case K:
          return "Activity";
        case ee:
          return "ViewTransition";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case q:
            return "Portal";
          case G:
            return e.displayName || "Context";
          case X:
            return (e._context.displayName || "Context") + ".Consumer";
          case B:
            var r = e.render;
            return e = e.displayName, e || (e = r.displayName || r.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case Q:
            return r = e.displayName || null, r !== null ? r : i(e.type) || "Memo";
          case A:
            r = e._payload, e = e._init;
            try {
              return i(e(r));
            } catch {
            }
        }
      return null;
    }
    function c(e) {
      return "" + e;
    }
    function u(e) {
      try {
        c(e);
        var r = !1;
      } catch {
        r = !0;
      }
      if (r) {
        r = console;
        var o = r.error, a = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return o.call(
          r,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          a
        ), c(e);
      }
    }
    function l(e) {
      if (e === P) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === A)
        return "<...>";
      try {
        var r = i(e);
        return r ? "<" + r + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function n() {
      var e = S.A;
      return e === null ? null : e.getOwner();
    }
    function t() {
      return Error("react-stack-top-frame");
    }
    function f(e) {
      if (L.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function m(e, r) {
      function o() {
        Y || (Y = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          r
        ));
      }
      o.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: o,
        configurable: !0
      });
    }
    function E() {
      var e = i(this.type);
      return I[e] || (I[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function d(e, r, o, a, _, v) {
      var s = o.ref;
      return e = {
        $$typeof: $,
        type: e,
        key: r,
        props: o,
        _owner: a
      }, (s !== void 0 ? s : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: E
      }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(e, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(e, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: _
      }), Object.defineProperty(e, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: v
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function p(e, r, o, a, _, v) {
      var s = r.children;
      if (s !== void 0)
        if (a)
          if (te(s)) {
            for (a = 0; a < s.length; a++)
              R(s[a]);
            Object.freeze && Object.freeze(s);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else R(s);
      if (L.call(r, "key")) {
        s = i(e);
        var T = Object.keys(r).filter(function(ne) {
          return ne !== "key";
        });
        a = 0 < T.length ? "{key: someKey, " + T.join(": ..., ") + ": ...}" : "{key: someKey}", W[s + a] || (T = 0 < T.length ? "{" + T.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          a,
          s,
          T,
          s
        ), W[s + a] = !0);
      }
      if (s = null, o !== void 0 && (u(o), s = "" + o), f(r) && (u(r.key), s = "" + r.key), "key" in r) {
        o = {};
        for (var g in r)
          g !== "key" && (o[g] = r[g]);
      } else o = r;
      return s && m(
        o,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), d(
        e,
        s,
        o,
        n(),
        _,
        v
      );
    }
    function R(e) {
      C(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e !== null && e.$$typeof === A && (e._payload.status === "fulfilled" ? C(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
    }
    function C(e) {
      return typeof e == "object" && e !== null && e.$$typeof === $;
    }
    var x = oe, $ = Symbol.for("react.transitional.element"), q = Symbol.for("react.portal"), P = Symbol.for("react.fragment"), z = Symbol.for("react.strict_mode"), J = Symbol.for("react.profiler"), X = Symbol.for("react.consumer"), G = Symbol.for("react.context"), B = Symbol.for("react.forward_ref"), H = Symbol.for("react.suspense"), Z = Symbol.for("react.suspense_list"), Q = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), K = Symbol.for("react.activity"), ee = Symbol.for("react.view_transition"), re = Symbol.for("react.client.reference"), S = x.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = Object.prototype.hasOwnProperty, te = Array.isArray, j = console.createTask ? console.createTask : function() {
      return null;
    };
    x = {
      react_stack_bottom_frame: function(e) {
        return e();
      }
    };
    var Y, I = {}, M = x.react_stack_bottom_frame.bind(
      x,
      t
    )(), F = j(l(t)), W = {};
    k.Fragment = P, k.jsx = function(e, r, o) {
      var a = 1e4 > S.recentlyCreatedOwnerStacks++;
      if (a) {
        var _ = Error.stackTraceLimit;
        Error.stackTraceLimit = 10;
        var v = Error("react-stack-top-frame");
        Error.stackTraceLimit = _;
      } else v = M;
      return p(
        e,
        r,
        o,
        !1,
        v,
        a ? j(l(e)) : F
      );
    }, k.jsxs = function(e, r, o) {
      var a = 1e4 > S.recentlyCreatedOwnerStacks++;
      if (a) {
        var _ = Error.stackTraceLimit;
        Error.stackTraceLimit = 10;
        var v = Error("react-stack-top-frame");
        Error.stackTraceLimit = _;
      } else v = M;
      return p(
        e,
        r,
        o,
        !0,
        v,
        a ? j(l(e)) : F
      );
    };
  })()), k;
}
var V;
function le() {
  return V || (V = 1, process.env.NODE_ENV === "production" ? w.exports = se() : w.exports = ie()), w.exports;
}
var y = le();
const O = (...i) => i.filter(Boolean).join(" ");
function ue({
  children: i,
  strength: c = 0.22,
  className: u,
  ...l
}) {
  const n = h(null);
  return N(() => {
    const t = n.current;
    if (!t) return;
    const f = (E) => {
      const d = t.getBoundingClientRect(), p = (E.clientX - d.left - d.width / 2) * c, R = (E.clientY - d.top - d.height / 2) * c;
      t.style.setProperty("--motionkit-x", `${p}px`), t.style.setProperty("--motionkit-y", `${R}px`);
    }, m = () => {
      t.style.setProperty("--motionkit-x", "0px"), t.style.setProperty("--motionkit-y", "0px");
    };
    return t.addEventListener("pointermove", f), t.addEventListener("pointerleave", m), () => {
      t.removeEventListener("pointermove", f), t.removeEventListener("pointerleave", m);
    };
  }, [c]), /* @__PURE__ */ y.jsx("button", { ref: n, className: O("mk-magnetic", u), ...l, children: i });
}
function fe({
  children: i,
  as: c = "div",
  threshold: u = 0.2,
  once: l = !0,
  className: n,
  ...t
}) {
  const f = h(null), [m, E] = ae(!1);
  return N(() => {
    const d = f.current;
    if (!d || typeof IntersectionObserver > "u") {
      E(!0);
      return;
    }
    const p = new IntersectionObserver(([R]) => {
      R.isIntersecting ? (E(!0), l && p.disconnect()) : l || E(!1);
    }, { threshold: u });
    return p.observe(d), () => p.disconnect();
  }, [l, u]), /* @__PURE__ */ y.jsx(c, { ref: f, className: O("mk-reveal", m && "mk-reveal-visible", n), ...t, children: i });
}
function me({ children: i, delay: c = 0, className: u }) {
  return /* @__PURE__ */ y.jsx("span", { className: O("mk-text-reveal", u), style: { "--motionkit-delay": `${c}s` }, children: String(i).split(" ").map((l, n) => /* @__PURE__ */ y.jsxs("span", { className: "mk-text-word", style: { "--motionkit-index": n }, children: [
    l,
    " "
  ] }, `${l}-${n}`)) });
}
function de({ color: i = "#ff4d00", size: c = 18, className: u }) {
  const l = h(null);
  return N(() => {
    const n = l.current;
    if (!n) return;
    const t = (f) => {
      n.style.transform = `translate3d(${f.clientX}px, ${f.clientY}px, 0)`;
    };
    return window.addEventListener("pointermove", t, { passive: !0 }), () => window.removeEventListener("pointermove", t);
  }, []), /* @__PURE__ */ y.jsx("span", { ref: l, "aria-hidden": "true", className: O("mk-cursor-trail", u), style: { "--motionkit-color": i, "--motionkit-size": `${c}px` } });
}
function ve() {
  return {
    prefersReducedMotion: typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  };
}
const Ee = "0.1.0";
export {
  de as CursorTrail,
  ue as MagneticButton,
  fe as ScrollReveal,
  me as TextReveal,
  Ee as motionKitVersion,
  ve as useMotionKit
};
//# sourceMappingURL=index.js.map
