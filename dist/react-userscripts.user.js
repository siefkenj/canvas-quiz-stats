// ==UserScript==
// @name     Canvas Quiz Stats
// @namespace https://github.com/siefkenj/crowdmark-addons
// @version  1.4
// @description A sample userscript built using react
// @include https://q.utoronto.ca/courses/*
// @grant    none
// ==/UserScript==


(function() {
  "use strict";
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getDefaultExportFromCjs(x2) {
    return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
  }
  var react = { exports: {} };
  var react_production_min = {};
  /**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var l = Symbol.for("react.element"), n = Symbol.for("react.portal"), p$1 = Symbol.for("react.fragment"), q = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v$1 = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
  function A$1(a) {
    if (null === a || "object" !== typeof a)
      return null;
    a = z$1 && a[z$1] || a["@@iterator"];
    return "function" === typeof a ? a : null;
  }
  var B$1 = { isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, C$1 = Object.assign, D$1 = {};
  function E$1(a, b, e) {
    this.props = a;
    this.context = b;
    this.refs = D$1;
    this.updater = e || B$1;
  }
  E$1.prototype.isReactComponent = {};
  E$1.prototype.setState = function(a, b) {
    if ("object" !== typeof a && "function" !== typeof a && null != a)
      throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, a, b, "setState");
  };
  E$1.prototype.forceUpdate = function(a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
  };
  function F() {
  }
  F.prototype = E$1.prototype;
  function G$1(a, b, e) {
    this.props = a;
    this.context = b;
    this.refs = D$1;
    this.updater = e || B$1;
  }
  var H$1 = G$1.prototype = new F();
  H$1.constructor = G$1;
  C$1(H$1, E$1.prototype);
  H$1.isPureReactComponent = true;
  var I$1 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
  function M$1(a, b, e) {
    var d, c = {}, k = null, h = null;
    if (null != b)
      for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b)
        J.call(b, d) && !L$1.hasOwnProperty(d) && (c[d] = b[d]);
    var g = arguments.length - 2;
    if (1 === g)
      c.children = e;
    else if (1 < g) {
      for (var f = Array(g), m2 = 0; m2 < g; m2++)
        f[m2] = arguments[m2 + 2];
      c.children = f;
    }
    if (a && a.defaultProps)
      for (d in g = a.defaultProps, g)
        void 0 === c[d] && (c[d] = g[d]);
    return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K$1.current };
  }
  function N$1(a, b) {
    return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
  }
  function O$1(a) {
    return "object" === typeof a && null !== a && a.$$typeof === l;
  }
  function escape(a) {
    var b = { "=": "=0", ":": "=2" };
    return "$" + a.replace(/[=:]/g, function(a2) {
      return b[a2];
    });
  }
  var P$1 = /\/+/g;
  function Q$1(a, b) {
    return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
  }
  function R$1(a, b, e, d, c) {
    var k = typeof a;
    if ("undefined" === k || "boolean" === k)
      a = null;
    var h = false;
    if (null === a)
      h = true;
    else
      switch (k) {
        case "string":
        case "number":
          h = true;
          break;
        case "object":
          switch (a.$$typeof) {
            case l:
            case n:
              h = true;
          }
      }
    if (h)
      return h = a, c = c(h), a = "" === d ? "." + Q$1(h, 0) : d, I$1(c) ? (e = "", null != a && (e = a.replace(P$1, "$&/") + "/"), R$1(c, b, e, "", function(a2) {
        return a2;
      })) : null != c && (O$1(c) && (c = N$1(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P$1, "$&/") + "/") + a)), b.push(c)), 1;
    h = 0;
    d = "" === d ? "." : d + ":";
    if (I$1(a))
      for (var g = 0; g < a.length; g++) {
        k = a[g];
        var f = d + Q$1(k, g);
        h += R$1(k, b, e, f, c);
      }
    else if (f = A$1(a), "function" === typeof f)
      for (a = f.call(a), g = 0; !(k = a.next()).done; )
        k = k.value, f = d + Q$1(k, g++), h += R$1(k, b, e, f, c);
    else if ("object" === k)
      throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
    return h;
  }
  function S$1(a, b, e) {
    if (null == a)
      return a;
    var d = [], c = 0;
    R$1(a, d, "", "", function(a2) {
      return b.call(e, a2, c++);
    });
    return d;
  }
  function T$1(a) {
    if (-1 === a._status) {
      var b = a._result;
      b = b();
      b.then(function(b2) {
        if (0 === a._status || -1 === a._status)
          a._status = 1, a._result = b2;
      }, function(b2) {
        if (0 === a._status || -1 === a._status)
          a._status = 2, a._result = b2;
      });
      -1 === a._status && (a._status = 0, a._result = b);
    }
    if (1 === a._status)
      return a._result.default;
    throw a._result;
  }
  var U$1 = { current: null }, V$1 = { transition: null }, W$1 = { ReactCurrentDispatcher: U$1, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
  function X$1() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  react_production_min.Children = { map: S$1, forEach: function(a, b, e) {
    S$1(a, function() {
      b.apply(this, arguments);
    }, e);
  }, count: function(a) {
    var b = 0;
    S$1(a, function() {
      b++;
    });
    return b;
  }, toArray: function(a) {
    return S$1(a, function(a2) {
      return a2;
    }) || [];
  }, only: function(a) {
    if (!O$1(a))
      throw Error("React.Children.only expected to receive a single React element child.");
    return a;
  } };
  react_production_min.Component = E$1;
  react_production_min.Fragment = p$1;
  react_production_min.Profiler = r;
  react_production_min.PureComponent = G$1;
  react_production_min.StrictMode = q;
  react_production_min.Suspense = w;
  react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$1;
  react_production_min.act = X$1;
  react_production_min.cloneElement = function(a, b, e) {
    if (null === a || void 0 === a)
      throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
    var d = C$1({}, a.props), c = a.key, k = a.ref, h = a._owner;
    if (null != b) {
      void 0 !== b.ref && (k = b.ref, h = K$1.current);
      void 0 !== b.key && (c = "" + b.key);
      if (a.type && a.type.defaultProps)
        var g = a.type.defaultProps;
      for (f in b)
        J.call(b, f) && !L$1.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
    }
    var f = arguments.length - 2;
    if (1 === f)
      d.children = e;
    else if (1 < f) {
      g = Array(f);
      for (var m2 = 0; m2 < f; m2++)
        g[m2] = arguments[m2 + 2];
      d.children = g;
    }
    return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
  };
  react_production_min.createContext = function(a) {
    a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
    a.Provider = { $$typeof: t, _context: a };
    return a.Consumer = a;
  };
  react_production_min.createElement = M$1;
  react_production_min.createFactory = function(a) {
    var b = M$1.bind(null, a);
    b.type = a;
    return b;
  };
  react_production_min.createRef = function() {
    return { current: null };
  };
  react_production_min.forwardRef = function(a) {
    return { $$typeof: v$1, render: a };
  };
  react_production_min.isValidElement = O$1;
  react_production_min.lazy = function(a) {
    return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T$1 };
  };
  react_production_min.memo = function(a, b) {
    return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
  };
  react_production_min.startTransition = function(a) {
    var b = V$1.transition;
    V$1.transition = {};
    try {
      a();
    } finally {
      V$1.transition = b;
    }
  };
  react_production_min.unstable_act = X$1;
  react_production_min.useCallback = function(a, b) {
    return U$1.current.useCallback(a, b);
  };
  react_production_min.useContext = function(a) {
    return U$1.current.useContext(a);
  };
  react_production_min.useDebugValue = function() {
  };
  react_production_min.useDeferredValue = function(a) {
    return U$1.current.useDeferredValue(a);
  };
  react_production_min.useEffect = function(a, b) {
    return U$1.current.useEffect(a, b);
  };
  react_production_min.useId = function() {
    return U$1.current.useId();
  };
  react_production_min.useImperativeHandle = function(a, b, e) {
    return U$1.current.useImperativeHandle(a, b, e);
  };
  react_production_min.useInsertionEffect = function(a, b) {
    return U$1.current.useInsertionEffect(a, b);
  };
  react_production_min.useLayoutEffect = function(a, b) {
    return U$1.current.useLayoutEffect(a, b);
  };
  react_production_min.useMemo = function(a, b) {
    return U$1.current.useMemo(a, b);
  };
  react_production_min.useReducer = function(a, b, e) {
    return U$1.current.useReducer(a, b, e);
  };
  react_production_min.useRef = function(a) {
    return U$1.current.useRef(a);
  };
  react_production_min.useState = function(a) {
    return U$1.current.useState(a);
  };
  react_production_min.useSyncExternalStore = function(a, b, e) {
    return U$1.current.useSyncExternalStore(a, b, e);
  };
  react_production_min.useTransition = function() {
    return U$1.current.useTransition();
  };
  react_production_min.version = "18.3.1";
  {
    react.exports = react_production_min;
  }
  var reactExports = react.exports;
  const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
  var reactDom = { exports: {} };
  var reactDom_production_min = {};
  var scheduler = { exports: {} };
  var scheduler_production_min = {};
  /**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  (function(exports) {
    function f(a, b) {
      var c = a.length;
      a.push(b);
      a:
        for (; 0 < c; ) {
          var d = c - 1 >>> 1, e = a[d];
          if (0 < g(e, b))
            a[d] = b, a[c] = e, c = d;
          else
            break a;
        }
    }
    function h(a) {
      return 0 === a.length ? null : a[0];
    }
    function k(a) {
      if (0 === a.length)
        return null;
      var b = a[0], c = a.pop();
      if (c !== b) {
        a[0] = c;
        a:
          for (var d = 0, e = a.length, w2 = e >>> 1; d < w2; ) {
            var m2 = 2 * (d + 1) - 1, C2 = a[m2], n2 = m2 + 1, x2 = a[n2];
            if (0 > g(C2, c))
              n2 < e && 0 > g(x2, C2) ? (a[d] = x2, a[n2] = c, d = n2) : (a[d] = C2, a[m2] = c, d = m2);
            else if (n2 < e && 0 > g(x2, c))
              a[d] = x2, a[n2] = c, d = n2;
            else
              break a;
          }
      }
      return b;
    }
    function g(a, b) {
      var c = a.sortIndex - b.sortIndex;
      return 0 !== c ? c : a.id - b.id;
    }
    if ("object" === typeof performance && "function" === typeof performance.now) {
      var l2 = performance;
      exports.unstable_now = function() {
        return l2.now();
      };
    } else {
      var p2 = Date, q2 = p2.now();
      exports.unstable_now = function() {
        return p2.now() - q2;
      };
    }
    var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
    "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function G2(a) {
      for (var b = h(t2); null !== b; ) {
        if (null === b.callback)
          k(t2);
        else if (b.startTime <= a)
          k(t2), b.sortIndex = b.expirationTime, f(r2, b);
        else
          break;
        b = h(t2);
      }
    }
    function H2(a) {
      B2 = false;
      G2(a);
      if (!A2)
        if (null !== h(r2))
          A2 = true, I2(J2);
        else {
          var b = h(t2);
          null !== b && K2(H2, b.startTime - a);
        }
    }
    function J2(a, b) {
      A2 = false;
      B2 && (B2 = false, E2(L2), L2 = -1);
      z2 = true;
      var c = y2;
      try {
        G2(b);
        for (v2 = h(r2); null !== v2 && (!(v2.expirationTime > b) || a && !M2()); ) {
          var d = v2.callback;
          if ("function" === typeof d) {
            v2.callback = null;
            y2 = v2.priorityLevel;
            var e = d(v2.expirationTime <= b);
            b = exports.unstable_now();
            "function" === typeof e ? v2.callback = e : v2 === h(r2) && k(r2);
            G2(b);
          } else
            k(r2);
          v2 = h(r2);
        }
        if (null !== v2)
          var w2 = true;
        else {
          var m2 = h(t2);
          null !== m2 && K2(H2, m2.startTime - b);
          w2 = false;
        }
        return w2;
      } finally {
        v2 = null, y2 = c, z2 = false;
      }
    }
    var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
    function M2() {
      return exports.unstable_now() - Q2 < P2 ? false : true;
    }
    function R2() {
      if (null !== O2) {
        var a = exports.unstable_now();
        Q2 = a;
        var b = true;
        try {
          b = O2(true, a);
        } finally {
          b ? S2() : (N2 = false, O2 = null);
        }
      } else
        N2 = false;
    }
    var S2;
    if ("function" === typeof F2)
      S2 = function() {
        F2(R2);
      };
    else if ("undefined" !== typeof MessageChannel) {
      var T2 = new MessageChannel(), U2 = T2.port2;
      T2.port1.onmessage = R2;
      S2 = function() {
        U2.postMessage(null);
      };
    } else
      S2 = function() {
        D2(R2, 0);
      };
    function I2(a) {
      O2 = a;
      N2 || (N2 = true, S2());
    }
    function K2(a, b) {
      L2 = D2(function() {
        a(exports.unstable_now());
      }, b);
    }
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(a) {
      a.callback = null;
    };
    exports.unstable_continueExecution = function() {
      A2 || z2 || (A2 = true, I2(J2));
    };
    exports.unstable_forceFrameRate = function(a) {
      0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a ? Math.floor(1e3 / a) : 5;
    };
    exports.unstable_getCurrentPriorityLevel = function() {
      return y2;
    };
    exports.unstable_getFirstCallbackNode = function() {
      return h(r2);
    };
    exports.unstable_next = function(a) {
      switch (y2) {
        case 1:
        case 2:
        case 3:
          var b = 3;
          break;
        default:
          b = y2;
      }
      var c = y2;
      y2 = b;
      try {
        return a();
      } finally {
        y2 = c;
      }
    };
    exports.unstable_pauseExecution = function() {
    };
    exports.unstable_requestPaint = function() {
    };
    exports.unstable_runWithPriority = function(a, b) {
      switch (a) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          a = 3;
      }
      var c = y2;
      y2 = a;
      try {
        return b();
      } finally {
        y2 = c;
      }
    };
    exports.unstable_scheduleCallback = function(a, b, c) {
      var d = exports.unstable_now();
      "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
      switch (a) {
        case 1:
          var e = -1;
          break;
        case 2:
          e = 250;
          break;
        case 5:
          e = 1073741823;
          break;
        case 4:
          e = 1e4;
          break;
        default:
          e = 5e3;
      }
      e = c + e;
      a = { id: u2++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
      c > d ? (a.sortIndex = c, f(t2, a), null === h(r2) && a === h(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c - d))) : (a.sortIndex = e, f(r2, a), A2 || z2 || (A2 = true, I2(J2)));
      return a;
    };
    exports.unstable_shouldYield = M2;
    exports.unstable_wrapCallback = function(a) {
      var b = y2;
      return function() {
        var c = y2;
        y2 = b;
        try {
          return a.apply(this, arguments);
        } finally {
          y2 = c;
        }
      };
    };
  })(scheduler_production_min);
  {
    scheduler.exports = scheduler_production_min;
  }
  var schedulerExports = scheduler.exports;
  /**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var aa = reactExports, ca = schedulerExports;
  function p(a) {
    for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
      b += "&args[]=" + encodeURIComponent(arguments[c]);
    return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var da = /* @__PURE__ */ new Set(), ea = {};
  function fa(a, b) {
    ha(a, b);
    ha(a + "Capture", b);
  }
  function ha(a, b) {
    ea[a] = b;
    for (a = 0; a < b.length; a++)
      da.add(b[a]);
  }
  var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
  function oa(a) {
    if (ja.call(ma, a))
      return true;
    if (ja.call(la, a))
      return false;
    if (ka.test(a))
      return ma[a] = true;
    la[a] = true;
    return false;
  }
  function pa(a, b, c, d) {
    if (null !== c && 0 === c.type)
      return false;
    switch (typeof b) {
      case "function":
      case "symbol":
        return true;
      case "boolean":
        if (d)
          return false;
        if (null !== c)
          return !c.acceptsBooleans;
        a = a.toLowerCase().slice(0, 5);
        return "data-" !== a && "aria-" !== a;
      default:
        return false;
    }
  }
  function qa(a, b, c, d) {
    if (null === b || "undefined" === typeof b || pa(a, b, c, d))
      return true;
    if (d)
      return false;
    if (null !== c)
      switch (c.type) {
        case 3:
          return !b;
        case 4:
          return false === b;
        case 5:
          return isNaN(b);
        case 6:
          return isNaN(b) || 1 > b;
      }
    return false;
  }
  function v(a, b, c, d, e, f, g) {
    this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
    this.attributeName = d;
    this.attributeNamespace = e;
    this.mustUseProperty = c;
    this.propertyName = a;
    this.type = b;
    this.sanitizeURL = f;
    this.removeEmptyString = g;
  }
  var z = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
    z[a] = new v(a, 0, false, a, null, false, false);
  });
  [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
    var b = a[0];
    z[b] = new v(b, 1, false, a[1], null, false, false);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
    z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
  });
  ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
    z[a] = new v(a, 2, false, a, null, false, false);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
    z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
  });
  ["checked", "multiple", "muted", "selected"].forEach(function(a) {
    z[a] = new v(a, 3, true, a, null, false, false);
  });
  ["capture", "download"].forEach(function(a) {
    z[a] = new v(a, 4, false, a, null, false, false);
  });
  ["cols", "rows", "size", "span"].forEach(function(a) {
    z[a] = new v(a, 6, false, a, null, false, false);
  });
  ["rowSpan", "start"].forEach(function(a) {
    z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
  });
  var ra = /[\-:]([a-z])/g;
  function sa(a) {
    return a[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
    var b = a.replace(
      ra,
      sa
    );
    z[b] = new v(b, 1, false, a, null, false, false);
  });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
    var b = a.replace(ra, sa);
    z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
  });
  ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
    var b = a.replace(ra, sa);
    z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
  });
  ["tabIndex", "crossOrigin"].forEach(function(a) {
    z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
  });
  z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
  ["src", "href", "action", "formAction"].forEach(function(a) {
    z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
  });
  function ta(a, b, c, d) {
    var e = z.hasOwnProperty(b) ? z[b] : null;
    if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1])
      qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
  }
  var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
  var Ia = Symbol.for("react.offscreen");
  var Ja = Symbol.iterator;
  function Ka(a) {
    if (null === a || "object" !== typeof a)
      return null;
    a = Ja && a[Ja] || a["@@iterator"];
    return "function" === typeof a ? a : null;
  }
  var A = Object.assign, La;
  function Ma(a) {
    if (void 0 === La)
      try {
        throw Error();
      } catch (c) {
        var b = c.stack.trim().match(/\n( *(at )?)/);
        La = b && b[1] || "";
      }
    return "\n" + La + a;
  }
  var Na = false;
  function Oa(a, b) {
    if (!a || Na)
      return "";
    Na = true;
    var c = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (b)
        if (b = function() {
          throw Error();
        }, Object.defineProperty(b.prototype, "props", { set: function() {
          throw Error();
        } }), "object" === typeof Reflect && Reflect.construct) {
          try {
            Reflect.construct(b, []);
          } catch (l2) {
            var d = l2;
          }
          Reflect.construct(a, [], b);
        } else {
          try {
            b.call();
          } catch (l2) {
            d = l2;
          }
          a.call(b.prototype);
        }
      else {
        try {
          throw Error();
        } catch (l2) {
          d = l2;
        }
        a();
      }
    } catch (l2) {
      if (l2 && d && "string" === typeof l2.stack) {
        for (var e = l2.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; )
          h--;
        for (; 1 <= g && 0 <= h; g--, h--)
          if (e[g] !== f[h]) {
            if (1 !== g || 1 !== h) {
              do
                if (g--, h--, 0 > h || e[g] !== f[h]) {
                  var k = "\n" + e[g].replace(" at new ", " at ");
                  a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
                  return k;
                }
              while (1 <= g && 0 <= h);
            }
            break;
          }
      }
    } finally {
      Na = false, Error.prepareStackTrace = c;
    }
    return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
  }
  function Pa(a) {
    switch (a.tag) {
      case 5:
        return Ma(a.type);
      case 16:
        return Ma("Lazy");
      case 13:
        return Ma("Suspense");
      case 19:
        return Ma("SuspenseList");
      case 0:
      case 2:
      case 15:
        return a = Oa(a.type, false), a;
      case 11:
        return a = Oa(a.type.render, false), a;
      case 1:
        return a = Oa(a.type, true), a;
      default:
        return "";
    }
  }
  function Qa(a) {
    if (null == a)
      return null;
    if ("function" === typeof a)
      return a.displayName || a.name || null;
    if ("string" === typeof a)
      return a;
    switch (a) {
      case ya:
        return "Fragment";
      case wa:
        return "Portal";
      case Aa:
        return "Profiler";
      case za:
        return "StrictMode";
      case Ea:
        return "Suspense";
      case Fa:
        return "SuspenseList";
    }
    if ("object" === typeof a)
      switch (a.$$typeof) {
        case Ca:
          return (a.displayName || "Context") + ".Consumer";
        case Ba:
          return (a._context.displayName || "Context") + ".Provider";
        case Da:
          var b = a.render;
          a = a.displayName;
          a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
          return a;
        case Ga:
          return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
        case Ha:
          b = a._payload;
          a = a._init;
          try {
            return Qa(a(b));
          } catch (c) {
          }
      }
    return null;
  }
  function Ra(a) {
    var b = a.type;
    switch (a.tag) {
      case 24:
        return "Cache";
      case 9:
        return (b.displayName || "Context") + ".Consumer";
      case 10:
        return (b._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return b;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Qa(b);
      case 8:
        return b === za ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if ("function" === typeof b)
          return b.displayName || b.name || null;
        if ("string" === typeof b)
          return b;
    }
    return null;
  }
  function Sa(a) {
    switch (typeof a) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return a;
      case "object":
        return a;
      default:
        return "";
    }
  }
  function Ta(a) {
    var b = a.type;
    return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
  }
  function Ua(a) {
    var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
    if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
      var e = c.get, f = c.set;
      Object.defineProperty(a, b, { configurable: true, get: function() {
        return e.call(this);
      }, set: function(a2) {
        d = "" + a2;
        f.call(this, a2);
      } });
      Object.defineProperty(a, b, { enumerable: c.enumerable });
      return { getValue: function() {
        return d;
      }, setValue: function(a2) {
        d = "" + a2;
      }, stopTracking: function() {
        a._valueTracker = null;
        delete a[b];
      } };
    }
  }
  function Va(a) {
    a._valueTracker || (a._valueTracker = Ua(a));
  }
  function Wa(a) {
    if (!a)
      return false;
    var b = a._valueTracker;
    if (!b)
      return true;
    var c = b.getValue();
    var d = "";
    a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
    a = d;
    return a !== c ? (b.setValue(a), true) : false;
  }
  function Xa(a) {
    a = a || ("undefined" !== typeof document ? document : void 0);
    if ("undefined" === typeof a)
      return null;
    try {
      return a.activeElement || a.body;
    } catch (b) {
      return a.body;
    }
  }
  function Ya(a, b) {
    var c = b.checked;
    return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
  }
  function Za(a, b) {
    var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
    c = Sa(null != b.value ? b.value : c);
    a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
  }
  function ab(a, b) {
    b = b.checked;
    null != b && ta(a, "checked", b, false);
  }
  function bb(a, b) {
    ab(a, b);
    var c = Sa(b.value), d = b.type;
    if (null != c)
      if ("number" === d) {
        if (0 === c && "" === a.value || a.value != c)
          a.value = "" + c;
      } else
        a.value !== "" + c && (a.value = "" + c);
    else if ("submit" === d || "reset" === d) {
      a.removeAttribute("value");
      return;
    }
    b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
    null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
  }
  function db(a, b, c) {
    if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
      var d = b.type;
      if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value))
        return;
      b = "" + a._wrapperState.initialValue;
      c || b === a.value || (a.value = b);
      a.defaultValue = b;
    }
    c = a.name;
    "" !== c && (a.name = "");
    a.defaultChecked = !!a._wrapperState.initialChecked;
    "" !== c && (a.name = c);
  }
  function cb(a, b, c) {
    if ("number" !== b || Xa(a.ownerDocument) !== a)
      null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
  }
  var eb = Array.isArray;
  function fb(a, b, c, d) {
    a = a.options;
    if (b) {
      b = {};
      for (var e = 0; e < c.length; e++)
        b["$" + c[e]] = true;
      for (c = 0; c < a.length; c++)
        e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
    } else {
      c = "" + Sa(c);
      b = null;
      for (e = 0; e < a.length; e++) {
        if (a[e].value === c) {
          a[e].selected = true;
          d && (a[e].defaultSelected = true);
          return;
        }
        null !== b || a[e].disabled || (b = a[e]);
      }
      null !== b && (b.selected = true);
    }
  }
  function gb(a, b) {
    if (null != b.dangerouslySetInnerHTML)
      throw Error(p(91));
    return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
  }
  function hb(a, b) {
    var c = b.value;
    if (null == c) {
      c = b.children;
      b = b.defaultValue;
      if (null != c) {
        if (null != b)
          throw Error(p(92));
        if (eb(c)) {
          if (1 < c.length)
            throw Error(p(93));
          c = c[0];
        }
        b = c;
      }
      null == b && (b = "");
      c = b;
    }
    a._wrapperState = { initialValue: Sa(c) };
  }
  function ib(a, b) {
    var c = Sa(b.value), d = Sa(b.defaultValue);
    null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
    null != d && (a.defaultValue = "" + d);
  }
  function jb(a) {
    var b = a.textContent;
    b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
  }
  function kb(a) {
    switch (a) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function lb(a, b) {
    return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
  }
  var mb, nb = function(a) {
    return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
      MSApp.execUnsafeLocalFunction(function() {
        return a(b, c, d, e);
      });
    } : a;
  }(function(a, b) {
    if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a)
      a.innerHTML = b;
    else {
      mb = mb || document.createElement("div");
      mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
      for (b = mb.firstChild; a.firstChild; )
        a.removeChild(a.firstChild);
      for (; b.firstChild; )
        a.appendChild(b.firstChild);
    }
  });
  function ob(a, b) {
    if (b) {
      var c = a.firstChild;
      if (c && c === a.lastChild && 3 === c.nodeType) {
        c.nodeValue = b;
        return;
      }
    }
    a.textContent = b;
  }
  var pb = {
    animationIterationCount: true,
    aspectRatio: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridArea: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowSpan: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnSpan: true,
    gridColumnStart: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true
  }, qb = ["Webkit", "ms", "Moz", "O"];
  Object.keys(pb).forEach(function(a) {
    qb.forEach(function(b) {
      b = b + a.charAt(0).toUpperCase() + a.substring(1);
      pb[b] = pb[a];
    });
  });
  function rb(a, b, c) {
    return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
  }
  function sb(a, b) {
    a = a.style;
    for (var c in b)
      if (b.hasOwnProperty(c)) {
        var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
        "float" === c && (c = "cssFloat");
        d ? a.setProperty(c, e) : a[c] = e;
      }
  }
  var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
  function ub(a, b) {
    if (b) {
      if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML))
        throw Error(p(137, a));
      if (null != b.dangerouslySetInnerHTML) {
        if (null != b.children)
          throw Error(p(60));
        if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML))
          throw Error(p(61));
      }
      if (null != b.style && "object" !== typeof b.style)
        throw Error(p(62));
    }
  }
  function vb(a, b) {
    if (-1 === a.indexOf("-"))
      return "string" === typeof b.is;
    switch (a) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  var wb = null;
  function xb(a) {
    a = a.target || a.srcElement || window;
    a.correspondingUseElement && (a = a.correspondingUseElement);
    return 3 === a.nodeType ? a.parentNode : a;
  }
  var yb = null, zb = null, Ab = null;
  function Bb(a) {
    if (a = Cb(a)) {
      if ("function" !== typeof yb)
        throw Error(p(280));
      var b = a.stateNode;
      b && (b = Db(b), yb(a.stateNode, a.type, b));
    }
  }
  function Eb(a) {
    zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
  }
  function Fb() {
    if (zb) {
      var a = zb, b = Ab;
      Ab = zb = null;
      Bb(a);
      if (b)
        for (a = 0; a < b.length; a++)
          Bb(b[a]);
    }
  }
  function Gb(a, b) {
    return a(b);
  }
  function Hb() {
  }
  var Ib = false;
  function Jb(a, b, c) {
    if (Ib)
      return a(b, c);
    Ib = true;
    try {
      return Gb(a, b, c);
    } finally {
      if (Ib = false, null !== zb || null !== Ab)
        Hb(), Fb();
    }
  }
  function Kb(a, b) {
    var c = a.stateNode;
    if (null === c)
      return null;
    var d = Db(c);
    if (null === d)
      return null;
    c = d[b];
    a:
      switch (b) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
          a = !d;
          break a;
        default:
          a = false;
      }
    if (a)
      return null;
    if (c && "function" !== typeof c)
      throw Error(p(231, b, typeof c));
    return c;
  }
  var Lb = false;
  if (ia)
    try {
      var Mb = {};
      Object.defineProperty(Mb, "passive", { get: function() {
        Lb = true;
      } });
      window.addEventListener("test", Mb, Mb);
      window.removeEventListener("test", Mb, Mb);
    } catch (a) {
      Lb = false;
    }
  function Nb(a, b, c, d, e, f, g, h, k) {
    var l2 = Array.prototype.slice.call(arguments, 3);
    try {
      b.apply(c, l2);
    } catch (m2) {
      this.onError(m2);
    }
  }
  var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
    Ob = true;
    Pb = a;
  } };
  function Tb(a, b, c, d, e, f, g, h, k) {
    Ob = false;
    Pb = null;
    Nb.apply(Sb, arguments);
  }
  function Ub(a, b, c, d, e, f, g, h, k) {
    Tb.apply(this, arguments);
    if (Ob) {
      if (Ob) {
        var l2 = Pb;
        Ob = false;
        Pb = null;
      } else
        throw Error(p(198));
      Qb || (Qb = true, Rb = l2);
    }
  }
  function Vb(a) {
    var b = a, c = a;
    if (a.alternate)
      for (; b.return; )
        b = b.return;
    else {
      a = b;
      do
        b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
      while (a);
    }
    return 3 === b.tag ? c : null;
  }
  function Wb(a) {
    if (13 === a.tag) {
      var b = a.memoizedState;
      null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
      if (null !== b)
        return b.dehydrated;
    }
    return null;
  }
  function Xb(a) {
    if (Vb(a) !== a)
      throw Error(p(188));
  }
  function Yb(a) {
    var b = a.alternate;
    if (!b) {
      b = Vb(a);
      if (null === b)
        throw Error(p(188));
      return b !== a ? null : a;
    }
    for (var c = a, d = b; ; ) {
      var e = c.return;
      if (null === e)
        break;
      var f = e.alternate;
      if (null === f) {
        d = e.return;
        if (null !== d) {
          c = d;
          continue;
        }
        break;
      }
      if (e.child === f.child) {
        for (f = e.child; f; ) {
          if (f === c)
            return Xb(e), a;
          if (f === d)
            return Xb(e), b;
          f = f.sibling;
        }
        throw Error(p(188));
      }
      if (c.return !== d.return)
        c = e, d = f;
      else {
        for (var g = false, h = e.child; h; ) {
          if (h === c) {
            g = true;
            c = e;
            d = f;
            break;
          }
          if (h === d) {
            g = true;
            d = e;
            c = f;
            break;
          }
          h = h.sibling;
        }
        if (!g) {
          for (h = f.child; h; ) {
            if (h === c) {
              g = true;
              c = f;
              d = e;
              break;
            }
            if (h === d) {
              g = true;
              d = f;
              c = e;
              break;
            }
            h = h.sibling;
          }
          if (!g)
            throw Error(p(189));
        }
      }
      if (c.alternate !== d)
        throw Error(p(190));
    }
    if (3 !== c.tag)
      throw Error(p(188));
    return c.stateNode.current === c ? a : b;
  }
  function Zb(a) {
    a = Yb(a);
    return null !== a ? $b(a) : null;
  }
  function $b(a) {
    if (5 === a.tag || 6 === a.tag)
      return a;
    for (a = a.child; null !== a; ) {
      var b = $b(a);
      if (null !== b)
        return b;
      a = a.sibling;
    }
    return null;
  }
  var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
  function mc(a) {
    if (lc && "function" === typeof lc.onCommitFiberRoot)
      try {
        lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
      } catch (b) {
      }
  }
  var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
  function nc(a) {
    a >>>= 0;
    return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
  }
  var rc = 64, sc = 4194304;
  function tc(a) {
    switch (a & -a) {
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
        return a & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return a & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return a;
    }
  }
  function uc(a, b) {
    var c = a.pendingLanes;
    if (0 === c)
      return 0;
    var d = 0, e = a.suspendedLanes, f = a.pingedLanes, g = c & 268435455;
    if (0 !== g) {
      var h = g & ~e;
      0 !== h ? d = tc(h) : (f &= g, 0 !== f && (d = tc(f)));
    } else
      g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f && (d = tc(f));
    if (0 === d)
      return 0;
    if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240)))
      return b;
    0 !== (d & 4) && (d |= c & 16);
    b = a.entangledLanes;
    if (0 !== b)
      for (a = a.entanglements, b &= d; 0 < b; )
        c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
    return d;
  }
  function vc(a, b) {
    switch (a) {
      case 1:
      case 2:
      case 4:
        return b + 250;
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
        return b + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function wc(a, b) {
    for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f; ) {
      var g = 31 - oc(f), h = 1 << g, k = e[g];
      if (-1 === k) {
        if (0 === (h & c) || 0 !== (h & d))
          e[g] = vc(h, b);
      } else
        k <= b && (a.expiredLanes |= h);
      f &= ~h;
    }
  }
  function xc(a) {
    a = a.pendingLanes & -1073741825;
    return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
  }
  function yc() {
    var a = rc;
    rc <<= 1;
    0 === (rc & 4194240) && (rc = 64);
    return a;
  }
  function zc(a) {
    for (var b = [], c = 0; 31 > c; c++)
      b.push(a);
    return b;
  }
  function Ac(a, b, c) {
    a.pendingLanes |= b;
    536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
    a = a.eventTimes;
    b = 31 - oc(b);
    a[b] = c;
  }
  function Bc(a, b) {
    var c = a.pendingLanes & ~b;
    a.pendingLanes = b;
    a.suspendedLanes = 0;
    a.pingedLanes = 0;
    a.expiredLanes &= b;
    a.mutableReadLanes &= b;
    a.entangledLanes &= b;
    b = a.entanglements;
    var d = a.eventTimes;
    for (a = a.expirationTimes; 0 < c; ) {
      var e = 31 - oc(c), f = 1 << e;
      b[e] = 0;
      d[e] = -1;
      a[e] = -1;
      c &= ~f;
    }
  }
  function Cc(a, b) {
    var c = a.entangledLanes |= b;
    for (a = a.entanglements; c; ) {
      var d = 31 - oc(c), e = 1 << d;
      e & b | a[d] & b && (a[d] |= b);
      c &= ~e;
    }
  }
  var C = 0;
  function Dc(a) {
    a &= -a;
    return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
  }
  var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Sc(a, b) {
    switch (a) {
      case "focusin":
      case "focusout":
        Lc = null;
        break;
      case "dragenter":
      case "dragleave":
        Mc = null;
        break;
      case "mouseover":
      case "mouseout":
        Nc = null;
        break;
      case "pointerover":
      case "pointerout":
        Oc.delete(b.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Pc.delete(b.pointerId);
    }
  }
  function Tc(a, b, c, d, e, f) {
    if (null === a || a.nativeEvent !== f)
      return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
    a.eventSystemFlags |= d;
    b = a.targetContainers;
    null !== e && -1 === b.indexOf(e) && b.push(e);
    return a;
  }
  function Uc(a, b, c, d, e) {
    switch (b) {
      case "focusin":
        return Lc = Tc(Lc, a, b, c, d, e), true;
      case "dragenter":
        return Mc = Tc(Mc, a, b, c, d, e), true;
      case "mouseover":
        return Nc = Tc(Nc, a, b, c, d, e), true;
      case "pointerover":
        var f = e.pointerId;
        Oc.set(f, Tc(Oc.get(f) || null, a, b, c, d, e));
        return true;
      case "gotpointercapture":
        return f = e.pointerId, Pc.set(f, Tc(Pc.get(f) || null, a, b, c, d, e)), true;
    }
    return false;
  }
  function Vc(a) {
    var b = Wc(a.target);
    if (null !== b) {
      var c = Vb(b);
      if (null !== c) {
        if (b = c.tag, 13 === b) {
          if (b = Wb(c), null !== b) {
            a.blockedOn = b;
            Ic(a.priority, function() {
              Gc(c);
            });
            return;
          }
        } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
          a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
          return;
        }
      }
    }
    a.blockedOn = null;
  }
  function Xc(a) {
    if (null !== a.blockedOn)
      return false;
    for (var b = a.targetContainers; 0 < b.length; ) {
      var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
      if (null === c) {
        c = a.nativeEvent;
        var d = new c.constructor(c.type, c);
        wb = d;
        c.target.dispatchEvent(d);
        wb = null;
      } else
        return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
      b.shift();
    }
    return true;
  }
  function Zc(a, b, c) {
    Xc(a) && c.delete(b);
  }
  function $c() {
    Jc = false;
    null !== Lc && Xc(Lc) && (Lc = null);
    null !== Mc && Xc(Mc) && (Mc = null);
    null !== Nc && Xc(Nc) && (Nc = null);
    Oc.forEach(Zc);
    Pc.forEach(Zc);
  }
  function ad(a, b) {
    a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
  }
  function bd(a) {
    function b(b2) {
      return ad(b2, a);
    }
    if (0 < Kc.length) {
      ad(Kc[0], a);
      for (var c = 1; c < Kc.length; c++) {
        var d = Kc[c];
        d.blockedOn === a && (d.blockedOn = null);
      }
    }
    null !== Lc && ad(Lc, a);
    null !== Mc && ad(Mc, a);
    null !== Nc && ad(Nc, a);
    Oc.forEach(b);
    Pc.forEach(b);
    for (c = 0; c < Qc.length; c++)
      d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
    for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); )
      Vc(c), null === c.blockedOn && Qc.shift();
  }
  var cd = ua.ReactCurrentBatchConfig, dd = true;
  function ed(a, b, c, d) {
    var e = C, f = cd.transition;
    cd.transition = null;
    try {
      C = 1, fd(a, b, c, d);
    } finally {
      C = e, cd.transition = f;
    }
  }
  function gd(a, b, c, d) {
    var e = C, f = cd.transition;
    cd.transition = null;
    try {
      C = 4, fd(a, b, c, d);
    } finally {
      C = e, cd.transition = f;
    }
  }
  function fd(a, b, c, d) {
    if (dd) {
      var e = Yc(a, b, c, d);
      if (null === e)
        hd(a, b, d, id, c), Sc(a, d);
      else if (Uc(e, a, b, c, d))
        d.stopPropagation();
      else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
        for (; null !== e; ) {
          var f = Cb(e);
          null !== f && Ec(f);
          f = Yc(a, b, c, d);
          null === f && hd(a, b, d, id, c);
          if (f === e)
            break;
          e = f;
        }
        null !== e && d.stopPropagation();
      } else
        hd(a, b, d, null, c);
    }
  }
  var id = null;
  function Yc(a, b, c, d) {
    id = null;
    a = xb(d);
    a = Wc(a);
    if (null !== a)
      if (b = Vb(a), null === b)
        a = null;
      else if (c = b.tag, 13 === c) {
        a = Wb(b);
        if (null !== a)
          return a;
        a = null;
      } else if (3 === c) {
        if (b.stateNode.current.memoizedState.isDehydrated)
          return 3 === b.tag ? b.stateNode.containerInfo : null;
        a = null;
      } else
        b !== a && (a = null);
    id = a;
    return null;
  }
  function jd(a) {
    switch (a) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (ec()) {
          case fc:
            return 1;
          case gc:
            return 4;
          case hc:
          case ic:
            return 16;
          case jc:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var kd = null, ld = null, md = null;
  function nd() {
    if (md)
      return md;
    var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
    for (a = 0; a < c && b[a] === e[a]; a++)
      ;
    var g = c - a;
    for (d = 1; d <= g && b[c - d] === e[f - d]; d++)
      ;
    return md = e.slice(a, 1 < d ? 1 - d : void 0);
  }
  function od(a) {
    var b = a.keyCode;
    "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
    10 === a && (a = 13);
    return 32 <= a || 13 === a ? a : 0;
  }
  function pd() {
    return true;
  }
  function qd() {
    return false;
  }
  function rd(a) {
    function b(b2, d, e, f, g) {
      this._reactName = b2;
      this._targetInst = e;
      this.type = d;
      this.nativeEvent = f;
      this.target = g;
      this.currentTarget = null;
      for (var c in a)
        a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f) : f[c]);
      this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : false === f.returnValue) ? pd : qd;
      this.isPropagationStopped = qd;
      return this;
    }
    A(b.prototype, { preventDefault: function() {
      this.defaultPrevented = true;
      var a2 = this.nativeEvent;
      a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
    }, stopPropagation: function() {
      var a2 = this.nativeEvent;
      a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
    }, persist: function() {
    }, isPersistent: pd });
    return b;
  }
  var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
    return a.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
    return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
  }, movementX: function(a) {
    if ("movementX" in a)
      return a.movementX;
    a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
    return wd;
  }, movementY: function(a) {
    return "movementY" in a ? a.movementY : xd;
  } }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a) {
    return "clipboardData" in a ? a.clipboardData : window.clipboardData;
  } }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Nd = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Pd(a) {
    var b = this.nativeEvent;
    return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
  }
  function zd() {
    return Pd;
  }
  var Qd = A({}, ud, { key: function(a) {
    if (a.key) {
      var b = Md[a.key] || a.key;
      if ("Unidentified" !== b)
        return b;
    }
    return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
    return "keypress" === a.type ? od(a) : 0;
  }, keyCode: function(a) {
    return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  }, which: function(a) {
    return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  } }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
    deltaX: function(a) {
      return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
    },
    deltaY: function(a) {
      return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
  ia && "documentMode" in document && (be = document.documentMode);
  var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
  function ge(a, b) {
    switch (a) {
      case "keyup":
        return -1 !== $d.indexOf(b.keyCode);
      case "keydown":
        return 229 !== b.keyCode;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function he(a) {
    a = a.detail;
    return "object" === typeof a && "data" in a ? a.data : null;
  }
  var ie = false;
  function je(a, b) {
    switch (a) {
      case "compositionend":
        return he(b);
      case "keypress":
        if (32 !== b.which)
          return null;
        fe = true;
        return ee;
      case "textInput":
        return a = b.data, a === ee && fe ? null : a;
      default:
        return null;
    }
  }
  function ke(a, b) {
    if (ie)
      return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
    switch (a) {
      case "paste":
        return null;
      case "keypress":
        if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
          if (b.char && 1 < b.char.length)
            return b.char;
          if (b.which)
            return String.fromCharCode(b.which);
        }
        return null;
      case "compositionend":
        return de && "ko" !== b.locale ? null : b.data;
      default:
        return null;
    }
  }
  var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
  function me(a) {
    var b = a && a.nodeName && a.nodeName.toLowerCase();
    return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
  }
  function ne(a, b, c, d) {
    Eb(d);
    b = oe(b, "onChange");
    0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
  }
  var pe = null, qe = null;
  function re(a) {
    se(a, 0);
  }
  function te(a) {
    var b = ue(a);
    if (Wa(b))
      return a;
  }
  function ve(a, b) {
    if ("change" === a)
      return b;
  }
  var we = false;
  if (ia) {
    var xe;
    if (ia) {
      var ye = "oninput" in document;
      if (!ye) {
        var ze = document.createElement("div");
        ze.setAttribute("oninput", "return;");
        ye = "function" === typeof ze.oninput;
      }
      xe = ye;
    } else
      xe = false;
    we = xe && (!document.documentMode || 9 < document.documentMode);
  }
  function Ae() {
    pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
  }
  function Be(a) {
    if ("value" === a.propertyName && te(qe)) {
      var b = [];
      ne(b, qe, a, xb(a));
      Jb(re, b);
    }
  }
  function Ce(a, b, c) {
    "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
  }
  function De(a) {
    if ("selectionchange" === a || "keyup" === a || "keydown" === a)
      return te(qe);
  }
  function Ee(a, b) {
    if ("click" === a)
      return te(b);
  }
  function Fe(a, b) {
    if ("input" === a || "change" === a)
      return te(b);
  }
  function Ge(a, b) {
    return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
  }
  var He = "function" === typeof Object.is ? Object.is : Ge;
  function Ie(a, b) {
    if (He(a, b))
      return true;
    if ("object" !== typeof a || null === a || "object" !== typeof b || null === b)
      return false;
    var c = Object.keys(a), d = Object.keys(b);
    if (c.length !== d.length)
      return false;
    for (d = 0; d < c.length; d++) {
      var e = c[d];
      if (!ja.call(b, e) || !He(a[e], b[e]))
        return false;
    }
    return true;
  }
  function Je(a) {
    for (; a && a.firstChild; )
      a = a.firstChild;
    return a;
  }
  function Ke(a, b) {
    var c = Je(a);
    a = 0;
    for (var d; c; ) {
      if (3 === c.nodeType) {
        d = a + c.textContent.length;
        if (a <= b && d >= b)
          return { node: c, offset: b - a };
        a = d;
      }
      a: {
        for (; c; ) {
          if (c.nextSibling) {
            c = c.nextSibling;
            break a;
          }
          c = c.parentNode;
        }
        c = void 0;
      }
      c = Je(c);
    }
  }
  function Le(a, b) {
    return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
  }
  function Me() {
    for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
      try {
        var c = "string" === typeof b.contentWindow.location.href;
      } catch (d) {
        c = false;
      }
      if (c)
        a = b.contentWindow;
      else
        break;
      b = Xa(a.document);
    }
    return b;
  }
  function Ne(a) {
    var b = a && a.nodeName && a.nodeName.toLowerCase();
    return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
  }
  function Oe(a) {
    var b = Me(), c = a.focusedElem, d = a.selectionRange;
    if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
      if (null !== d && Ne(c)) {
        if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c)
          c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
        else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
          a = a.getSelection();
          var e = c.textContent.length, f = Math.min(d.start, e);
          d = void 0 === d.end ? f : Math.min(d.end, e);
          !a.extend && f > d && (e = d, d = f, f = e);
          e = Ke(c, f);
          var g = Ke(
            c,
            d
          );
          e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
        }
      }
      b = [];
      for (a = c; a = a.parentNode; )
        1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
      "function" === typeof c.focus && c.focus();
      for (c = 0; c < b.length; c++)
        a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
    }
  }
  var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
  function Ue(a, b, c) {
    var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
    Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
  }
  function Ve(a, b) {
    var c = {};
    c[a.toLowerCase()] = b.toLowerCase();
    c["Webkit" + a] = "webkit" + b;
    c["Moz" + a] = "moz" + b;
    return c;
  }
  var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
  ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
  function Ze(a) {
    if (Xe[a])
      return Xe[a];
    if (!We[a])
      return a;
    var b = We[a], c;
    for (c in b)
      if (b.hasOwnProperty(c) && c in Ye)
        return Xe[a] = b[c];
    return a;
  }
  var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function ff(a, b) {
    df.set(a, b);
    fa(b, [a]);
  }
  for (var gf = 0; gf < ef.length; gf++) {
    var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
    ff(jf, "on" + kf);
  }
  ff($e, "onAnimationEnd");
  ff(af, "onAnimationIteration");
  ff(bf, "onAnimationStart");
  ff("dblclick", "onDoubleClick");
  ff("focusin", "onFocus");
  ff("focusout", "onBlur");
  ff(cf, "onTransitionEnd");
  ha("onMouseEnter", ["mouseout", "mouseover"]);
  ha("onMouseLeave", ["mouseout", "mouseover"]);
  ha("onPointerEnter", ["pointerout", "pointerover"]);
  ha("onPointerLeave", ["pointerout", "pointerover"]);
  fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
  fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
  fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
  fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
  fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
  fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
  function nf(a, b, c) {
    var d = a.type || "unknown-event";
    a.currentTarget = c;
    Ub(d, b, void 0, a);
    a.currentTarget = null;
  }
  function se(a, b) {
    b = 0 !== (b & 4);
    for (var c = 0; c < a.length; c++) {
      var d = a[c], e = d.event;
      d = d.listeners;
      a: {
        var f = void 0;
        if (b)
          for (var g = d.length - 1; 0 <= g; g--) {
            var h = d[g], k = h.instance, l2 = h.currentTarget;
            h = h.listener;
            if (k !== f && e.isPropagationStopped())
              break a;
            nf(e, h, l2);
            f = k;
          }
        else
          for (g = 0; g < d.length; g++) {
            h = d[g];
            k = h.instance;
            l2 = h.currentTarget;
            h = h.listener;
            if (k !== f && e.isPropagationStopped())
              break a;
            nf(e, h, l2);
            f = k;
          }
      }
    }
    if (Qb)
      throw a = Rb, Qb = false, Rb = null, a;
  }
  function D(a, b) {
    var c = b[of];
    void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
    var d = a + "__bubble";
    c.has(d) || (pf(b, a, 2, false), c.add(d));
  }
  function qf(a, b, c) {
    var d = 0;
    b && (d |= 4);
    pf(c, a, d, b);
  }
  var rf = "_reactListening" + Math.random().toString(36).slice(2);
  function sf(a) {
    if (!a[rf]) {
      a[rf] = true;
      da.forEach(function(b2) {
        "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
      });
      var b = 9 === a.nodeType ? a : a.ownerDocument;
      null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
    }
  }
  function pf(a, b, c, d) {
    switch (jd(b)) {
      case 1:
        var e = ed;
        break;
      case 4:
        e = gd;
        break;
      default:
        e = fd;
    }
    c = e.bind(null, b, c, a);
    e = void 0;
    !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
    d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
  }
  function hd(a, b, c, d, e) {
    var f = d;
    if (0 === (b & 1) && 0 === (b & 2) && null !== d)
      a:
        for (; ; ) {
          if (null === d)
            return;
          var g = d.tag;
          if (3 === g || 4 === g) {
            var h = d.stateNode.containerInfo;
            if (h === e || 8 === h.nodeType && h.parentNode === e)
              break;
            if (4 === g)
              for (g = d.return; null !== g; ) {
                var k = g.tag;
                if (3 === k || 4 === k) {
                  if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e)
                    return;
                }
                g = g.return;
              }
            for (; null !== h; ) {
              g = Wc(h);
              if (null === g)
                return;
              k = g.tag;
              if (5 === k || 6 === k) {
                d = f = g;
                continue a;
              }
              h = h.parentNode;
            }
          }
          d = d.return;
        }
    Jb(function() {
      var d2 = f, e2 = xb(c), g2 = [];
      a: {
        var h2 = df.get(a);
        if (void 0 !== h2) {
          var k2 = td, n2 = a;
          switch (a) {
            case "keypress":
              if (0 === od(c))
                break a;
            case "keydown":
            case "keyup":
              k2 = Rd;
              break;
            case "focusin":
              n2 = "focus";
              k2 = Fd;
              break;
            case "focusout":
              n2 = "blur";
              k2 = Fd;
              break;
            case "beforeblur":
            case "afterblur":
              k2 = Fd;
              break;
            case "click":
              if (2 === c.button)
                break a;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              k2 = Bd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              k2 = Dd;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              k2 = Vd;
              break;
            case $e:
            case af:
            case bf:
              k2 = Hd;
              break;
            case cf:
              k2 = Xd;
              break;
            case "scroll":
              k2 = vd;
              break;
            case "wheel":
              k2 = Zd;
              break;
            case "copy":
            case "cut":
            case "paste":
              k2 = Jd;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              k2 = Td;
          }
          var t2 = 0 !== (b & 4), J2 = !t2 && "scroll" === a, x2 = t2 ? null !== h2 ? h2 + "Capture" : null : h2;
          t2 = [];
          for (var w2 = d2, u2; null !== w2; ) {
            u2 = w2;
            var F2 = u2.stateNode;
            5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
            if (J2)
              break;
            w2 = w2.return;
          }
          0 < t2.length && (h2 = new k2(h2, n2, null, c, e2), g2.push({ event: h2, listeners: t2 }));
        }
      }
      if (0 === (b & 7)) {
        a: {
          h2 = "mouseover" === a || "pointerover" === a;
          k2 = "mouseout" === a || "pointerout" === a;
          if (h2 && c !== wb && (n2 = c.relatedTarget || c.fromElement) && (Wc(n2) || n2[uf]))
            break a;
          if (k2 || h2) {
            h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
            if (k2) {
              if (n2 = c.relatedTarget || c.toElement, k2 = d2, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag))
                n2 = null;
            } else
              k2 = null, n2 = d2;
            if (k2 !== n2) {
              t2 = Bd;
              F2 = "onMouseLeave";
              x2 = "onMouseEnter";
              w2 = "mouse";
              if ("pointerout" === a || "pointerover" === a)
                t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
              J2 = null == k2 ? h2 : ue(k2);
              u2 = null == n2 ? h2 : ue(n2);
              h2 = new t2(F2, w2 + "leave", k2, c, e2);
              h2.target = J2;
              h2.relatedTarget = u2;
              F2 = null;
              Wc(e2) === d2 && (t2 = new t2(x2, w2 + "enter", n2, c, e2), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
              J2 = F2;
              if (k2 && n2)
                b: {
                  t2 = k2;
                  x2 = n2;
                  w2 = 0;
                  for (u2 = t2; u2; u2 = vf(u2))
                    w2++;
                  u2 = 0;
                  for (F2 = x2; F2; F2 = vf(F2))
                    u2++;
                  for (; 0 < w2 - u2; )
                    t2 = vf(t2), w2--;
                  for (; 0 < u2 - w2; )
                    x2 = vf(x2), u2--;
                  for (; w2--; ) {
                    if (t2 === x2 || null !== x2 && t2 === x2.alternate)
                      break b;
                    t2 = vf(t2);
                    x2 = vf(x2);
                  }
                  t2 = null;
                }
              else
                t2 = null;
              null !== k2 && wf(g2, h2, k2, t2, false);
              null !== n2 && null !== J2 && wf(g2, J2, n2, t2, true);
            }
          }
        }
        a: {
          h2 = d2 ? ue(d2) : window;
          k2 = h2.nodeName && h2.nodeName.toLowerCase();
          if ("select" === k2 || "input" === k2 && "file" === h2.type)
            var na = ve;
          else if (me(h2))
            if (we)
              na = Fe;
            else {
              na = De;
              var xa = Ce;
            }
          else
            (k2 = h2.nodeName) && "input" === k2.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
          if (na && (na = na(a, d2))) {
            ne(g2, na, c, e2);
            break a;
          }
          xa && xa(a, h2, d2);
          "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
        }
        xa = d2 ? ue(d2) : window;
        switch (a) {
          case "focusin":
            if (me(xa) || "true" === xa.contentEditable)
              Qe = xa, Re = d2, Se = null;
            break;
          case "focusout":
            Se = Re = Qe = null;
            break;
          case "mousedown":
            Te = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Te = false;
            Ue(g2, c, e2);
            break;
          case "selectionchange":
            if (Pe)
              break;
          case "keydown":
          case "keyup":
            Ue(g2, c, e2);
        }
        var $a;
        if (ae)
          b: {
            switch (a) {
              case "compositionstart":
                var ba = "onCompositionStart";
                break b;
              case "compositionend":
                ba = "onCompositionEnd";
                break b;
              case "compositionupdate":
                ba = "onCompositionUpdate";
                break b;
            }
            ba = void 0;
          }
        else
          ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
        ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
        if ($a = ce ? je(a, c) : ke(a, c))
          d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
      }
      se(g2, b);
    });
  }
  function tf(a, b, c) {
    return { instance: a, listener: b, currentTarget: c };
  }
  function oe(a, b) {
    for (var c = b + "Capture", d = []; null !== a; ) {
      var e = a, f = e.stateNode;
      5 === e.tag && null !== f && (e = f, f = Kb(a, c), null != f && d.unshift(tf(a, f, e)), f = Kb(a, b), null != f && d.push(tf(a, f, e)));
      a = a.return;
    }
    return d;
  }
  function vf(a) {
    if (null === a)
      return null;
    do
      a = a.return;
    while (a && 5 !== a.tag);
    return a ? a : null;
  }
  function wf(a, b, c, d, e) {
    for (var f = b._reactName, g = []; null !== c && c !== d; ) {
      var h = c, k = h.alternate, l2 = h.stateNode;
      if (null !== k && k === d)
        break;
      5 === h.tag && null !== l2 && (h = l2, e ? (k = Kb(c, f), null != k && g.unshift(tf(c, k, h))) : e || (k = Kb(c, f), null != k && g.push(tf(c, k, h))));
      c = c.return;
    }
    0 !== g.length && a.push({ event: b, listeners: g });
  }
  var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
  function zf(a) {
    return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
  }
  function Af(a, b, c) {
    b = zf(b);
    if (zf(a) !== b && c)
      throw Error(p(425));
  }
  function Bf() {
  }
  var Cf = null, Df = null;
  function Ef(a, b) {
    return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
  }
  var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
    return Hf.resolve(null).then(a).catch(If);
  } : Ff;
  function If(a) {
    setTimeout(function() {
      throw a;
    });
  }
  function Kf(a, b) {
    var c = b, d = 0;
    do {
      var e = c.nextSibling;
      a.removeChild(c);
      if (e && 8 === e.nodeType)
        if (c = e.data, "/$" === c) {
          if (0 === d) {
            a.removeChild(e);
            bd(b);
            return;
          }
          d--;
        } else
          "$" !== c && "$?" !== c && "$!" !== c || d++;
      c = e;
    } while (c);
    bd(b);
  }
  function Lf(a) {
    for (; null != a; a = a.nextSibling) {
      var b = a.nodeType;
      if (1 === b || 3 === b)
        break;
      if (8 === b) {
        b = a.data;
        if ("$" === b || "$!" === b || "$?" === b)
          break;
        if ("/$" === b)
          return null;
      }
    }
    return a;
  }
  function Mf(a) {
    a = a.previousSibling;
    for (var b = 0; a; ) {
      if (8 === a.nodeType) {
        var c = a.data;
        if ("$" === c || "$!" === c || "$?" === c) {
          if (0 === b)
            return a;
          b--;
        } else
          "/$" === c && b++;
      }
      a = a.previousSibling;
    }
    return null;
  }
  var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
  function Wc(a) {
    var b = a[Of];
    if (b)
      return b;
    for (var c = a.parentNode; c; ) {
      if (b = c[uf] || c[Of]) {
        c = b.alternate;
        if (null !== b.child || null !== c && null !== c.child)
          for (a = Mf(a); null !== a; ) {
            if (c = a[Of])
              return c;
            a = Mf(a);
          }
        return b;
      }
      a = c;
      c = a.parentNode;
    }
    return null;
  }
  function Cb(a) {
    a = a[Of] || a[uf];
    return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
  }
  function ue(a) {
    if (5 === a.tag || 6 === a.tag)
      return a.stateNode;
    throw Error(p(33));
  }
  function Db(a) {
    return a[Pf] || null;
  }
  var Sf = [], Tf = -1;
  function Uf(a) {
    return { current: a };
  }
  function E(a) {
    0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
  }
  function G(a, b) {
    Tf++;
    Sf[Tf] = a.current;
    a.current = b;
  }
  var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
  function Yf(a, b) {
    var c = a.type.contextTypes;
    if (!c)
      return Vf;
    var d = a.stateNode;
    if (d && d.__reactInternalMemoizedUnmaskedChildContext === b)
      return d.__reactInternalMemoizedMaskedChildContext;
    var e = {}, f;
    for (f in c)
      e[f] = b[f];
    d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
    return e;
  }
  function Zf(a) {
    a = a.childContextTypes;
    return null !== a && void 0 !== a;
  }
  function $f() {
    E(Wf);
    E(H);
  }
  function ag(a, b, c) {
    if (H.current !== Vf)
      throw Error(p(168));
    G(H, b);
    G(Wf, c);
  }
  function bg(a, b, c) {
    var d = a.stateNode;
    b = b.childContextTypes;
    if ("function" !== typeof d.getChildContext)
      return c;
    d = d.getChildContext();
    for (var e in d)
      if (!(e in b))
        throw Error(p(108, Ra(a) || "Unknown", e));
    return A({}, c, d);
  }
  function cg(a) {
    a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
    Xf = H.current;
    G(H, a);
    G(Wf, Wf.current);
    return true;
  }
  function dg(a, b, c) {
    var d = a.stateNode;
    if (!d)
      throw Error(p(169));
    c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
    G(Wf, c);
  }
  var eg = null, fg = false, gg = false;
  function hg(a) {
    null === eg ? eg = [a] : eg.push(a);
  }
  function ig(a) {
    fg = true;
    hg(a);
  }
  function jg() {
    if (!gg && null !== eg) {
      gg = true;
      var a = 0, b = C;
      try {
        var c = eg;
        for (C = 1; a < c.length; a++) {
          var d = c[a];
          do
            d = d(true);
          while (null !== d);
        }
        eg = null;
        fg = false;
      } catch (e) {
        throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
      } finally {
        C = b, gg = false;
      }
    }
    return null;
  }
  var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
  function tg(a, b) {
    kg[lg++] = ng;
    kg[lg++] = mg;
    mg = a;
    ng = b;
  }
  function ug(a, b, c) {
    og[pg++] = rg;
    og[pg++] = sg;
    og[pg++] = qg;
    qg = a;
    var d = rg;
    a = sg;
    var e = 32 - oc(d) - 1;
    d &= ~(1 << e);
    c += 1;
    var f = 32 - oc(b) + e;
    if (30 < f) {
      var g = e - e % 5;
      f = (d & (1 << g) - 1).toString(32);
      d >>= g;
      e -= g;
      rg = 1 << 32 - oc(b) + e | c << e | d;
      sg = f + a;
    } else
      rg = 1 << f | c << e | d, sg = a;
  }
  function vg(a) {
    null !== a.return && (tg(a, 1), ug(a, 1, 0));
  }
  function wg(a) {
    for (; a === mg; )
      mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
    for (; a === qg; )
      qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
  }
  var xg = null, yg = null, I = false, zg = null;
  function Ag(a, b) {
    var c = Bg(5, null, null, 0);
    c.elementType = "DELETED";
    c.stateNode = b;
    c.return = a;
    b = a.deletions;
    null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
  }
  function Cg(a, b) {
    switch (a.tag) {
      case 5:
        var c = a.type;
        b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
        return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
      case 6:
        return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
      case 13:
        return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
      default:
        return false;
    }
  }
  function Dg(a) {
    return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
  }
  function Eg(a) {
    if (I) {
      var b = yg;
      if (b) {
        var c = b;
        if (!Cg(a, b)) {
          if (Dg(a))
            throw Error(p(418));
          b = Lf(c.nextSibling);
          var d = xg;
          b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
        }
      } else {
        if (Dg(a))
          throw Error(p(418));
        a.flags = a.flags & -4097 | 2;
        I = false;
        xg = a;
      }
    }
  }
  function Fg(a) {
    for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; )
      a = a.return;
    xg = a;
  }
  function Gg(a) {
    if (a !== xg)
      return false;
    if (!I)
      return Fg(a), I = true, false;
    var b;
    (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
    if (b && (b = yg)) {
      if (Dg(a))
        throw Hg(), Error(p(418));
      for (; b; )
        Ag(a, b), b = Lf(b.nextSibling);
    }
    Fg(a);
    if (13 === a.tag) {
      a = a.memoizedState;
      a = null !== a ? a.dehydrated : null;
      if (!a)
        throw Error(p(317));
      a: {
        a = a.nextSibling;
        for (b = 0; a; ) {
          if (8 === a.nodeType) {
            var c = a.data;
            if ("/$" === c) {
              if (0 === b) {
                yg = Lf(a.nextSibling);
                break a;
              }
              b--;
            } else
              "$" !== c && "$!" !== c && "$?" !== c || b++;
          }
          a = a.nextSibling;
        }
        yg = null;
      }
    } else
      yg = xg ? Lf(a.stateNode.nextSibling) : null;
    return true;
  }
  function Hg() {
    for (var a = yg; a; )
      a = Lf(a.nextSibling);
  }
  function Ig() {
    yg = xg = null;
    I = false;
  }
  function Jg(a) {
    null === zg ? zg = [a] : zg.push(a);
  }
  var Kg = ua.ReactCurrentBatchConfig;
  function Lg(a, b, c) {
    a = c.ref;
    if (null !== a && "function" !== typeof a && "object" !== typeof a) {
      if (c._owner) {
        c = c._owner;
        if (c) {
          if (1 !== c.tag)
            throw Error(p(309));
          var d = c.stateNode;
        }
        if (!d)
          throw Error(p(147, a));
        var e = d, f = "" + a;
        if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f)
          return b.ref;
        b = function(a2) {
          var b2 = e.refs;
          null === a2 ? delete b2[f] : b2[f] = a2;
        };
        b._stringRef = f;
        return b;
      }
      if ("string" !== typeof a)
        throw Error(p(284));
      if (!c._owner)
        throw Error(p(290, a));
    }
    return a;
  }
  function Mg(a, b) {
    a = Object.prototype.toString.call(b);
    throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
  }
  function Ng(a) {
    var b = a._init;
    return b(a._payload);
  }
  function Og(a) {
    function b(b2, c2) {
      if (a) {
        var d2 = b2.deletions;
        null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
      }
    }
    function c(c2, d2) {
      if (!a)
        return null;
      for (; null !== d2; )
        b(c2, d2), d2 = d2.sibling;
      return null;
    }
    function d(a2, b2) {
      for (a2 = /* @__PURE__ */ new Map(); null !== b2; )
        null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
      return a2;
    }
    function e(a2, b2) {
      a2 = Pg(a2, b2);
      a2.index = 0;
      a2.sibling = null;
      return a2;
    }
    function f(b2, c2, d2) {
      b2.index = d2;
      if (!a)
        return b2.flags |= 1048576, c2;
      d2 = b2.alternate;
      if (null !== d2)
        return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
      b2.flags |= 2;
      return c2;
    }
    function g(b2) {
      a && null === b2.alternate && (b2.flags |= 2);
      return b2;
    }
    function h(a2, b2, c2, d2) {
      if (null === b2 || 6 !== b2.tag)
        return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
      b2 = e(b2, c2);
      b2.return = a2;
      return b2;
    }
    function k(a2, b2, c2, d2) {
      var f2 = c2.type;
      if (f2 === ya)
        return m2(a2, b2, c2.props.children, d2, c2.key);
      if (null !== b2 && (b2.elementType === f2 || "object" === typeof f2 && null !== f2 && f2.$$typeof === Ha && Ng(f2) === b2.type))
        return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
      d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
      d2.ref = Lg(a2, b2, c2);
      d2.return = a2;
      return d2;
    }
    function l2(a2, b2, c2, d2) {
      if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation)
        return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
      b2 = e(b2, c2.children || []);
      b2.return = a2;
      return b2;
    }
    function m2(a2, b2, c2, d2, f2) {
      if (null === b2 || 7 !== b2.tag)
        return b2 = Tg(c2, a2.mode, d2, f2), b2.return = a2, b2;
      b2 = e(b2, c2);
      b2.return = a2;
      return b2;
    }
    function q2(a2, b2, c2) {
      if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2)
        return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
      if ("object" === typeof b2 && null !== b2) {
        switch (b2.$$typeof) {
          case va:
            return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
          case wa:
            return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
          case Ha:
            var d2 = b2._init;
            return q2(a2, d2(b2._payload), c2);
        }
        if (eb(b2) || Ka(b2))
          return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
        Mg(a2, b2);
      }
      return null;
    }
    function r2(a2, b2, c2, d2) {
      var e2 = null !== b2 ? b2.key : null;
      if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2)
        return null !== e2 ? null : h(a2, b2, "" + c2, d2);
      if ("object" === typeof c2 && null !== c2) {
        switch (c2.$$typeof) {
          case va:
            return c2.key === e2 ? k(a2, b2, c2, d2) : null;
          case wa:
            return c2.key === e2 ? l2(a2, b2, c2, d2) : null;
          case Ha:
            return e2 = c2._init, r2(
              a2,
              b2,
              e2(c2._payload),
              d2
            );
        }
        if (eb(c2) || Ka(c2))
          return null !== e2 ? null : m2(a2, b2, c2, d2, null);
        Mg(a2, c2);
      }
      return null;
    }
    function y2(a2, b2, c2, d2, e2) {
      if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2)
        return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
      if ("object" === typeof d2 && null !== d2) {
        switch (d2.$$typeof) {
          case va:
            return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k(b2, a2, d2, e2);
          case wa:
            return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l2(b2, a2, d2, e2);
          case Ha:
            var f2 = d2._init;
            return y2(a2, b2, c2, f2(d2._payload), e2);
        }
        if (eb(d2) || Ka(d2))
          return a2 = a2.get(c2) || null, m2(b2, a2, d2, e2, null);
        Mg(b2, d2);
      }
      return null;
    }
    function n2(e2, g2, h2, k2) {
      for (var l3 = null, m3 = null, u2 = g2, w2 = g2 = 0, x2 = null; null !== u2 && w2 < h2.length; w2++) {
        u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
        var n3 = r2(e2, u2, h2[w2], k2);
        if (null === n3) {
          null === u2 && (u2 = x2);
          break;
        }
        a && u2 && null === n3.alternate && b(e2, u2);
        g2 = f(n3, g2, w2);
        null === m3 ? l3 = n3 : m3.sibling = n3;
        m3 = n3;
        u2 = x2;
      }
      if (w2 === h2.length)
        return c(e2, u2), I && tg(e2, w2), l3;
      if (null === u2) {
        for (; w2 < h2.length; w2++)
          u2 = q2(e2, h2[w2], k2), null !== u2 && (g2 = f(u2, g2, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
        I && tg(e2, w2);
        return l3;
      }
      for (u2 = d(e2, u2); w2 < h2.length; w2++)
        x2 = y2(u2, e2, w2, h2[w2], k2), null !== x2 && (a && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g2 = f(x2, g2, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
      a && u2.forEach(function(a2) {
        return b(e2, a2);
      });
      I && tg(e2, w2);
      return l3;
    }
    function t2(e2, g2, h2, k2) {
      var l3 = Ka(h2);
      if ("function" !== typeof l3)
        throw Error(p(150));
      h2 = l3.call(h2);
      if (null == h2)
        throw Error(p(151));
      for (var u2 = l3 = null, m3 = g2, w2 = g2 = 0, x2 = null, n3 = h2.next(); null !== m3 && !n3.done; w2++, n3 = h2.next()) {
        m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
        var t3 = r2(e2, m3, n3.value, k2);
        if (null === t3) {
          null === m3 && (m3 = x2);
          break;
        }
        a && m3 && null === t3.alternate && b(e2, m3);
        g2 = f(t3, g2, w2);
        null === u2 ? l3 = t3 : u2.sibling = t3;
        u2 = t3;
        m3 = x2;
      }
      if (n3.done)
        return c(
          e2,
          m3
        ), I && tg(e2, w2), l3;
      if (null === m3) {
        for (; !n3.done; w2++, n3 = h2.next())
          n3 = q2(e2, n3.value, k2), null !== n3 && (g2 = f(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
        I && tg(e2, w2);
        return l3;
      }
      for (m3 = d(e2, m3); !n3.done; w2++, n3 = h2.next())
        n3 = y2(m3, e2, w2, n3.value, k2), null !== n3 && (a && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g2 = f(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      a && m3.forEach(function(a2) {
        return b(e2, a2);
      });
      I && tg(e2, w2);
      return l3;
    }
    function J2(a2, d2, f2, h2) {
      "object" === typeof f2 && null !== f2 && f2.type === ya && null === f2.key && (f2 = f2.props.children);
      if ("object" === typeof f2 && null !== f2) {
        switch (f2.$$typeof) {
          case va:
            a: {
              for (var k2 = f2.key, l3 = d2; null !== l3; ) {
                if (l3.key === k2) {
                  k2 = f2.type;
                  if (k2 === ya) {
                    if (7 === l3.tag) {
                      c(a2, l3.sibling);
                      d2 = e(l3, f2.props.children);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    }
                  } else if (l3.elementType === k2 || "object" === typeof k2 && null !== k2 && k2.$$typeof === Ha && Ng(k2) === l3.type) {
                    c(a2, l3.sibling);
                    d2 = e(l3, f2.props);
                    d2.ref = Lg(a2, l3, f2);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  }
                  c(a2, l3);
                  break;
                } else
                  b(a2, l3);
                l3 = l3.sibling;
              }
              f2.type === ya ? (d2 = Tg(f2.props.children, a2.mode, h2, f2.key), d2.return = a2, a2 = d2) : (h2 = Rg(f2.type, f2.key, f2.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f2), h2.return = a2, a2 = h2);
            }
            return g(a2);
          case wa:
            a: {
              for (l3 = f2.key; null !== d2; ) {
                if (d2.key === l3)
                  if (4 === d2.tag && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                    c(a2, d2.sibling);
                    d2 = e(d2, f2.children || []);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  } else {
                    c(a2, d2);
                    break;
                  }
                else
                  b(a2, d2);
                d2 = d2.sibling;
              }
              d2 = Sg(f2, a2.mode, h2);
              d2.return = a2;
              a2 = d2;
            }
            return g(a2);
          case Ha:
            return l3 = f2._init, J2(a2, d2, l3(f2._payload), h2);
        }
        if (eb(f2))
          return n2(a2, d2, f2, h2);
        if (Ka(f2))
          return t2(a2, d2, f2, h2);
        Mg(a2, f2);
      }
      return "string" === typeof f2 && "" !== f2 || "number" === typeof f2 ? (f2 = "" + f2, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f2, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
    }
    return J2;
  }
  var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
  function $g() {
    Zg = Yg = Xg = null;
  }
  function ah(a) {
    var b = Wg.current;
    E(Wg);
    a._currentValue = b;
  }
  function bh(a, b, c) {
    for (; null !== a; ) {
      var d = a.alternate;
      (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
      if (a === c)
        break;
      a = a.return;
    }
  }
  function ch(a, b) {
    Xg = a;
    Zg = Yg = null;
    a = a.dependencies;
    null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
  }
  function eh(a) {
    var b = a._currentValue;
    if (Zg !== a)
      if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
        if (null === Xg)
          throw Error(p(308));
        Yg = a;
        Xg.dependencies = { lanes: 0, firstContext: a };
      } else
        Yg = Yg.next = a;
    return b;
  }
  var fh = null;
  function gh(a) {
    null === fh ? fh = [a] : fh.push(a);
  }
  function hh(a, b, c, d) {
    var e = b.interleaved;
    null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
    b.interleaved = c;
    return ih(a, d);
  }
  function ih(a, b) {
    a.lanes |= b;
    var c = a.alternate;
    null !== c && (c.lanes |= b);
    c = a;
    for (a = a.return; null !== a; )
      a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
    return 3 === c.tag ? c.stateNode : null;
  }
  var jh = false;
  function kh(a) {
    a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function lh(a, b) {
    a = a.updateQueue;
    b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
  }
  function mh(a, b) {
    return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
  }
  function nh(a, b, c) {
    var d = a.updateQueue;
    if (null === d)
      return null;
    d = d.shared;
    if (0 !== (K & 2)) {
      var e = d.pending;
      null === e ? b.next = b : (b.next = e.next, e.next = b);
      d.pending = b;
      return ih(a, c);
    }
    e = d.interleaved;
    null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
    d.interleaved = b;
    return ih(a, c);
  }
  function oh(a, b, c) {
    b = b.updateQueue;
    if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
      var d = b.lanes;
      d &= a.pendingLanes;
      c |= d;
      b.lanes = c;
      Cc(a, c);
    }
  }
  function ph(a, b) {
    var c = a.updateQueue, d = a.alternate;
    if (null !== d && (d = d.updateQueue, c === d)) {
      var e = null, f = null;
      c = c.firstBaseUpdate;
      if (null !== c) {
        do {
          var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
          null === f ? e = f = g : f = f.next = g;
          c = c.next;
        } while (null !== c);
        null === f ? e = f = b : f = f.next = b;
      } else
        e = f = b;
      c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects };
      a.updateQueue = c;
      return;
    }
    a = c.lastBaseUpdate;
    null === a ? c.firstBaseUpdate = b : a.next = b;
    c.lastBaseUpdate = b;
  }
  function qh(a, b, c, d) {
    var e = a.updateQueue;
    jh = false;
    var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
    if (null !== h) {
      e.shared.pending = null;
      var k = h, l2 = k.next;
      k.next = null;
      null === g ? f = l2 : g.next = l2;
      g = k;
      var m2 = a.alternate;
      null !== m2 && (m2 = m2.updateQueue, h = m2.lastBaseUpdate, h !== g && (null === h ? m2.firstBaseUpdate = l2 : h.next = l2, m2.lastBaseUpdate = k));
    }
    if (null !== f) {
      var q2 = e.baseState;
      g = 0;
      m2 = l2 = k = null;
      h = f;
      do {
        var r2 = h.lane, y2 = h.eventTime;
        if ((d & r2) === r2) {
          null !== m2 && (m2 = m2.next = {
            eventTime: y2,
            lane: 0,
            tag: h.tag,
            payload: h.payload,
            callback: h.callback,
            next: null
          });
          a: {
            var n2 = a, t2 = h;
            r2 = b;
            y2 = c;
            switch (t2.tag) {
              case 1:
                n2 = t2.payload;
                if ("function" === typeof n2) {
                  q2 = n2.call(y2, q2, r2);
                  break a;
                }
                q2 = n2;
                break a;
              case 3:
                n2.flags = n2.flags & -65537 | 128;
              case 0:
                n2 = t2.payload;
                r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
                if (null === r2 || void 0 === r2)
                  break a;
                q2 = A({}, q2, r2);
                break a;
              case 2:
                jh = true;
            }
          }
          null !== h.callback && 0 !== h.lane && (a.flags |= 64, r2 = e.effects, null === r2 ? e.effects = [h] : r2.push(h));
        } else
          y2 = { eventTime: y2, lane: r2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m2 ? (l2 = m2 = y2, k = q2) : m2 = m2.next = y2, g |= r2;
        h = h.next;
        if (null === h)
          if (h = e.shared.pending, null === h)
            break;
          else
            r2 = h, h = r2.next, r2.next = null, e.lastBaseUpdate = r2, e.shared.pending = null;
      } while (1);
      null === m2 && (k = q2);
      e.baseState = k;
      e.firstBaseUpdate = l2;
      e.lastBaseUpdate = m2;
      b = e.shared.interleaved;
      if (null !== b) {
        e = b;
        do
          g |= e.lane, e = e.next;
        while (e !== b);
      } else
        null === f && (e.shared.lanes = 0);
      rh |= g;
      a.lanes = g;
      a.memoizedState = q2;
    }
  }
  function sh(a, b, c) {
    a = b.effects;
    b.effects = null;
    if (null !== a)
      for (b = 0; b < a.length; b++) {
        var d = a[b], e = d.callback;
        if (null !== e) {
          d.callback = null;
          d = c;
          if ("function" !== typeof e)
            throw Error(p(191, e));
          e.call(d);
        }
      }
  }
  var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
  function xh(a) {
    if (a === th)
      throw Error(p(174));
    return a;
  }
  function yh(a, b) {
    G(wh, b);
    G(vh, a);
    G(uh, th);
    a = b.nodeType;
    switch (a) {
      case 9:
      case 11:
        b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
        break;
      default:
        a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
    }
    E(uh);
    G(uh, b);
  }
  function zh() {
    E(uh);
    E(vh);
    E(wh);
  }
  function Ah(a) {
    xh(wh.current);
    var b = xh(uh.current);
    var c = lb(b, a.type);
    b !== c && (G(vh, a), G(uh, c));
  }
  function Bh(a) {
    vh.current === a && (E(uh), E(vh));
  }
  var L = Uf(0);
  function Ch(a) {
    for (var b = a; null !== b; ) {
      if (13 === b.tag) {
        var c = b.memoizedState;
        if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data))
          return b;
      } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
        if (0 !== (b.flags & 128))
          return b;
      } else if (null !== b.child) {
        b.child.return = b;
        b = b.child;
        continue;
      }
      if (b === a)
        break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a)
          return null;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
    return null;
  }
  var Dh = [];
  function Eh() {
    for (var a = 0; a < Dh.length; a++)
      Dh[a]._workInProgressVersionPrimary = null;
    Dh.length = 0;
  }
  var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
  function P() {
    throw Error(p(321));
  }
  function Mh(a, b) {
    if (null === b)
      return false;
    for (var c = 0; c < b.length && c < a.length; c++)
      if (!He(a[c], b[c]))
        return false;
    return true;
  }
  function Nh(a, b, c, d, e, f) {
    Hh = f;
    M = b;
    b.memoizedState = null;
    b.updateQueue = null;
    b.lanes = 0;
    Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
    a = c(d, e);
    if (Jh) {
      f = 0;
      do {
        Jh = false;
        Kh = 0;
        if (25 <= f)
          throw Error(p(301));
        f += 1;
        O = N = null;
        b.updateQueue = null;
        Fh.current = Qh;
        a = c(d, e);
      } while (Jh);
    }
    Fh.current = Rh;
    b = null !== N && null !== N.next;
    Hh = 0;
    O = N = M = null;
    Ih = false;
    if (b)
      throw Error(p(300));
    return a;
  }
  function Sh() {
    var a = 0 !== Kh;
    Kh = 0;
    return a;
  }
  function Th() {
    var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    null === O ? M.memoizedState = O = a : O = O.next = a;
    return O;
  }
  function Uh() {
    if (null === N) {
      var a = M.alternate;
      a = null !== a ? a.memoizedState : null;
    } else
      a = N.next;
    var b = null === O ? M.memoizedState : O.next;
    if (null !== b)
      O = b, N = a;
    else {
      if (null === a)
        throw Error(p(310));
      N = a;
      a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
      null === O ? M.memoizedState = O = a : O = O.next = a;
    }
    return O;
  }
  function Vh(a, b) {
    return "function" === typeof b ? b(a) : b;
  }
  function Wh(a) {
    var b = Uh(), c = b.queue;
    if (null === c)
      throw Error(p(311));
    c.lastRenderedReducer = a;
    var d = N, e = d.baseQueue, f = c.pending;
    if (null !== f) {
      if (null !== e) {
        var g = e.next;
        e.next = f.next;
        f.next = g;
      }
      d.baseQueue = e = f;
      c.pending = null;
    }
    if (null !== e) {
      f = e.next;
      d = d.baseState;
      var h = g = null, k = null, l2 = f;
      do {
        var m2 = l2.lane;
        if ((Hh & m2) === m2)
          null !== k && (k = k.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d = l2.hasEagerState ? l2.eagerState : a(d, l2.action);
        else {
          var q2 = {
            lane: m2,
            action: l2.action,
            hasEagerState: l2.hasEagerState,
            eagerState: l2.eagerState,
            next: null
          };
          null === k ? (h = k = q2, g = d) : k = k.next = q2;
          M.lanes |= m2;
          rh |= m2;
        }
        l2 = l2.next;
      } while (null !== l2 && l2 !== f);
      null === k ? g = d : k.next = h;
      He(d, b.memoizedState) || (dh = true);
      b.memoizedState = d;
      b.baseState = g;
      b.baseQueue = k;
      c.lastRenderedState = d;
    }
    a = c.interleaved;
    if (null !== a) {
      e = a;
      do
        f = e.lane, M.lanes |= f, rh |= f, e = e.next;
      while (e !== a);
    } else
      null === e && (c.lanes = 0);
    return [b.memoizedState, c.dispatch];
  }
  function Xh(a) {
    var b = Uh(), c = b.queue;
    if (null === c)
      throw Error(p(311));
    c.lastRenderedReducer = a;
    var d = c.dispatch, e = c.pending, f = b.memoizedState;
    if (null !== e) {
      c.pending = null;
      var g = e = e.next;
      do
        f = a(f, g.action), g = g.next;
      while (g !== e);
      He(f, b.memoizedState) || (dh = true);
      b.memoizedState = f;
      null === b.baseQueue && (b.baseState = f);
      c.lastRenderedState = f;
    }
    return [f, d];
  }
  function Yh() {
  }
  function Zh(a, b) {
    var c = M, d = Uh(), e = b(), f = !He(d.memoizedState, e);
    f && (d.memoizedState = e, dh = true);
    d = d.queue;
    $h(ai.bind(null, c, d, a), [a]);
    if (d.getSnapshot !== b || f || null !== O && O.memoizedState.tag & 1) {
      c.flags |= 2048;
      bi(9, ci.bind(null, c, d, e, b), void 0, null);
      if (null === Q)
        throw Error(p(349));
      0 !== (Hh & 30) || di(c, b, e);
    }
    return e;
  }
  function di(a, b, c) {
    a.flags |= 16384;
    a = { getSnapshot: b, value: c };
    b = M.updateQueue;
    null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
  }
  function ci(a, b, c, d) {
    b.value = c;
    b.getSnapshot = d;
    ei(b) && fi(a);
  }
  function ai(a, b, c) {
    return c(function() {
      ei(b) && fi(a);
    });
  }
  function ei(a) {
    var b = a.getSnapshot;
    a = a.value;
    try {
      var c = b();
      return !He(a, c);
    } catch (d) {
      return true;
    }
  }
  function fi(a) {
    var b = ih(a, 1);
    null !== b && gi(b, a, 1, -1);
  }
  function hi(a) {
    var b = Th();
    "function" === typeof a && (a = a());
    b.memoizedState = b.baseState = a;
    a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
    b.queue = a;
    a = a.dispatch = ii.bind(null, M, a);
    return [b.memoizedState, a];
  }
  function bi(a, b, c, d) {
    a = { tag: a, create: b, destroy: c, deps: d, next: null };
    b = M.updateQueue;
    null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
    return a;
  }
  function ji() {
    return Uh().memoizedState;
  }
  function ki(a, b, c, d) {
    var e = Th();
    M.flags |= a;
    e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
  }
  function li(a, b, c, d) {
    var e = Uh();
    d = void 0 === d ? null : d;
    var f = void 0;
    if (null !== N) {
      var g = N.memoizedState;
      f = g.destroy;
      if (null !== d && Mh(d, g.deps)) {
        e.memoizedState = bi(b, c, f, d);
        return;
      }
    }
    M.flags |= a;
    e.memoizedState = bi(1 | b, c, f, d);
  }
  function mi(a, b) {
    return ki(8390656, 8, a, b);
  }
  function $h(a, b) {
    return li(2048, 8, a, b);
  }
  function ni(a, b) {
    return li(4, 2, a, b);
  }
  function oi(a, b) {
    return li(4, 4, a, b);
  }
  function pi(a, b) {
    if ("function" === typeof b)
      return a = a(), b(a), function() {
        b(null);
      };
    if (null !== b && void 0 !== b)
      return a = a(), b.current = a, function() {
        b.current = null;
      };
  }
  function qi(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;
    return li(4, 4, pi.bind(null, b, a), c);
  }
  function ri() {
  }
  function si(a, b) {
    var c = Uh();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Mh(b, d[1]))
      return d[0];
    c.memoizedState = [a, b];
    return a;
  }
  function ti(a, b) {
    var c = Uh();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Mh(b, d[1]))
      return d[0];
    a = a();
    c.memoizedState = [a, b];
    return a;
  }
  function ui(a, b, c) {
    if (0 === (Hh & 21))
      return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
    He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
    return b;
  }
  function vi(a, b) {
    var c = C;
    C = 0 !== c && 4 > c ? c : 4;
    a(true);
    var d = Gh.transition;
    Gh.transition = {};
    try {
      a(false), b();
    } finally {
      C = c, Gh.transition = d;
    }
  }
  function wi() {
    return Uh().memoizedState;
  }
  function xi(a, b, c) {
    var d = yi(a);
    c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
    if (zi(a))
      Ai(b, c);
    else if (c = hh(a, b, c, d), null !== c) {
      var e = R();
      gi(c, a, d, e);
      Bi(c, b, d);
    }
  }
  function ii(a, b, c) {
    var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
    if (zi(a))
      Ai(b, e);
    else {
      var f = a.alternate;
      if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f))
        try {
          var g = b.lastRenderedState, h = f(g, c);
          e.hasEagerState = true;
          e.eagerState = h;
          if (He(h, g)) {
            var k = b.interleaved;
            null === k ? (e.next = e, gh(b)) : (e.next = k.next, k.next = e);
            b.interleaved = e;
            return;
          }
        } catch (l2) {
        } finally {
        }
      c = hh(a, b, e, d);
      null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
    }
  }
  function zi(a) {
    var b = a.alternate;
    return a === M || null !== b && b === M;
  }
  function Ai(a, b) {
    Jh = Ih = true;
    var c = a.pending;
    null === c ? b.next = b : (b.next = c.next, c.next = b);
    a.pending = b;
  }
  function Bi(a, b, c) {
    if (0 !== (c & 4194240)) {
      var d = b.lanes;
      d &= a.pendingLanes;
      c |= d;
      b.lanes = c;
      Cc(a, c);
    }
  }
  var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a, b) {
    Th().memoizedState = [a, void 0 === b ? null : b];
    return a;
  }, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;
    return ki(
      4194308,
      4,
      pi.bind(null, b, a),
      c
    );
  }, useLayoutEffect: function(a, b) {
    return ki(4194308, 4, a, b);
  }, useInsertionEffect: function(a, b) {
    return ki(4, 2, a, b);
  }, useMemo: function(a, b) {
    var c = Th();
    b = void 0 === b ? null : b;
    a = a();
    c.memoizedState = [a, b];
    return a;
  }, useReducer: function(a, b, c) {
    var d = Th();
    b = void 0 !== c ? c(b) : b;
    d.memoizedState = d.baseState = b;
    a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
    d.queue = a;
    a = a.dispatch = xi.bind(null, M, a);
    return [d.memoizedState, a];
  }, useRef: function(a) {
    var b = Th();
    a = { current: a };
    return b.memoizedState = a;
  }, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
    return Th().memoizedState = a;
  }, useTransition: function() {
    var a = hi(false), b = a[0];
    a = vi.bind(null, a[1]);
    Th().memoizedState = a;
    return [b, a];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(a, b, c) {
    var d = M, e = Th();
    if (I) {
      if (void 0 === c)
        throw Error(p(407));
      c = c();
    } else {
      c = b();
      if (null === Q)
        throw Error(p(349));
      0 !== (Hh & 30) || di(d, b, c);
    }
    e.memoizedState = c;
    var f = { value: c, getSnapshot: b };
    e.queue = f;
    mi(ai.bind(
      null,
      d,
      f,
      a
    ), [a]);
    d.flags |= 2048;
    bi(9, ci.bind(null, d, f, c, b), void 0, null);
    return c;
  }, useId: function() {
    var a = Th(), b = Q.identifierPrefix;
    if (I) {
      var c = sg;
      var d = rg;
      c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
      b = ":" + b + "R" + c;
      c = Kh++;
      0 < c && (b += "H" + c.toString(32));
      b += ":";
    } else
      c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
    return a.memoizedState = b;
  }, unstable_isNewReconciler: false }, Ph = {
    readContext: eh,
    useCallback: si,
    useContext: eh,
    useEffect: $h,
    useImperativeHandle: qi,
    useInsertionEffect: ni,
    useLayoutEffect: oi,
    useMemo: ti,
    useReducer: Wh,
    useRef: ji,
    useState: function() {
      return Wh(Vh);
    },
    useDebugValue: ri,
    useDeferredValue: function(a) {
      var b = Uh();
      return ui(b, N.memoizedState, a);
    },
    useTransition: function() {
      var a = Wh(Vh)[0], b = Uh().memoizedState;
      return [a, b];
    },
    useMutableSource: Yh,
    useSyncExternalStore: Zh,
    useId: wi,
    unstable_isNewReconciler: false
  }, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
    return Xh(Vh);
  }, useDebugValue: ri, useDeferredValue: function(a) {
    var b = Uh();
    return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
  }, useTransition: function() {
    var a = Xh(Vh)[0], b = Uh().memoizedState;
    return [a, b];
  }, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
  function Ci(a, b) {
    if (a && a.defaultProps) {
      b = A({}, b);
      a = a.defaultProps;
      for (var c in a)
        void 0 === b[c] && (b[c] = a[c]);
      return b;
    }
    return b;
  }
  function Di(a, b, c, d) {
    b = a.memoizedState;
    c = c(d, b);
    c = null === c || void 0 === c ? b : A({}, b, c);
    a.memoizedState = c;
    0 === a.lanes && (a.updateQueue.baseState = c);
  }
  var Ei = { isMounted: function(a) {
    return (a = a._reactInternals) ? Vb(a) === a : false;
  }, enqueueSetState: function(a, b, c) {
    a = a._reactInternals;
    var d = R(), e = yi(a), f = mh(d, e);
    f.payload = b;
    void 0 !== c && null !== c && (f.callback = c);
    b = nh(a, f, e);
    null !== b && (gi(b, a, e, d), oh(b, a, e));
  }, enqueueReplaceState: function(a, b, c) {
    a = a._reactInternals;
    var d = R(), e = yi(a), f = mh(d, e);
    f.tag = 1;
    f.payload = b;
    void 0 !== c && null !== c && (f.callback = c);
    b = nh(a, f, e);
    null !== b && (gi(b, a, e, d), oh(b, a, e));
  }, enqueueForceUpdate: function(a, b) {
    a = a._reactInternals;
    var c = R(), d = yi(a), e = mh(c, d);
    e.tag = 2;
    void 0 !== b && null !== b && (e.callback = b);
    b = nh(a, e, d);
    null !== b && (gi(b, a, d, c), oh(b, a, d));
  } };
  function Fi(a, b, c, d, e, f, g) {
    a = a.stateNode;
    return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f) : true;
  }
  function Gi(a, b, c) {
    var d = false, e = Vf;
    var f = b.contextType;
    "object" === typeof f && null !== f ? f = eh(f) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
    b = new b(c, f);
    a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
    b.updater = Ei;
    a.stateNode = b;
    b._reactInternals = a;
    d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
    return b;
  }
  function Hi(a, b, c, d) {
    a = b.state;
    "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
    "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
    b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
  }
  function Ii(a, b, c, d) {
    var e = a.stateNode;
    e.props = c;
    e.state = a.memoizedState;
    e.refs = {};
    kh(a);
    var f = b.contextType;
    "object" === typeof f && null !== f ? e.context = eh(f) : (f = Zf(b) ? Xf : H.current, e.context = Yf(a, f));
    e.state = a.memoizedState;
    f = b.getDerivedStateFromProps;
    "function" === typeof f && (Di(a, b, f, c), e.state = a.memoizedState);
    "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
    "function" === typeof e.componentDidMount && (a.flags |= 4194308);
  }
  function Ji(a, b) {
    try {
      var c = "", d = b;
      do
        c += Pa(d), d = d.return;
      while (d);
      var e = c;
    } catch (f) {
      e = "\nError generating stack: " + f.message + "\n" + f.stack;
    }
    return { value: a, source: b, stack: e, digest: null };
  }
  function Ki(a, b, c) {
    return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
  }
  function Li(a, b) {
    try {
      console.error(b.value);
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  }
  var Mi = "function" === typeof WeakMap ? WeakMap : Map;
  function Ni(a, b, c) {
    c = mh(-1, c);
    c.tag = 3;
    c.payload = { element: null };
    var d = b.value;
    c.callback = function() {
      Oi || (Oi = true, Pi = d);
      Li(a, b);
    };
    return c;
  }
  function Qi(a, b, c) {
    c = mh(-1, c);
    c.tag = 3;
    var d = a.type.getDerivedStateFromError;
    if ("function" === typeof d) {
      var e = b.value;
      c.payload = function() {
        return d(e);
      };
      c.callback = function() {
        Li(a, b);
      };
    }
    var f = a.stateNode;
    null !== f && "function" === typeof f.componentDidCatch && (c.callback = function() {
      Li(a, b);
      "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
      var c2 = b.stack;
      this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
    });
    return c;
  }
  function Si(a, b, c) {
    var d = a.pingCache;
    if (null === d) {
      d = a.pingCache = new Mi();
      var e = /* @__PURE__ */ new Set();
      d.set(b, e);
    } else
      e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
    e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
  }
  function Ui(a) {
    do {
      var b;
      if (b = 13 === a.tag)
        b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
      if (b)
        return a;
      a = a.return;
    } while (null !== a);
    return null;
  }
  function Vi(a, b, c, d, e) {
    if (0 === (a.mode & 1))
      return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
    a.flags |= 65536;
    a.lanes = e;
    return a;
  }
  var Wi = ua.ReactCurrentOwner, dh = false;
  function Xi(a, b, c, d) {
    b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
  }
  function Yi(a, b, c, d, e) {
    c = c.render;
    var f = b.ref;
    ch(b, e);
    d = Nh(a, b, c, d, f, e);
    c = Sh();
    if (null !== a && !dh)
      return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
    I && c && vg(b);
    b.flags |= 1;
    Xi(a, b, d, e);
    return b.child;
  }
  function $i(a, b, c, d, e) {
    if (null === a) {
      var f = c.type;
      if ("function" === typeof f && !aj(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps)
        return b.tag = 15, b.type = f, bj(a, b, f, d, e);
      a = Rg(c.type, null, d, b, b.mode, e);
      a.ref = b.ref;
      a.return = b;
      return b.child = a;
    }
    f = a.child;
    if (0 === (a.lanes & e)) {
      var g = f.memoizedProps;
      c = c.compare;
      c = null !== c ? c : Ie;
      if (c(g, d) && a.ref === b.ref)
        return Zi(a, b, e);
    }
    b.flags |= 1;
    a = Pg(f, d);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  function bj(a, b, c, d, e) {
    if (null !== a) {
      var f = a.memoizedProps;
      if (Ie(f, d) && a.ref === b.ref)
        if (dh = false, b.pendingProps = d = f, 0 !== (a.lanes & e))
          0 !== (a.flags & 131072) && (dh = true);
        else
          return b.lanes = a.lanes, Zi(a, b, e);
    }
    return cj(a, b, c, d, e);
  }
  function dj(a, b, c) {
    var d = b.pendingProps, e = d.children, f = null !== a ? a.memoizedState : null;
    if ("hidden" === d.mode)
      if (0 === (b.mode & 1))
        b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
      else {
        if (0 === (c & 1073741824))
          return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
        b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
        d = null !== f ? f.baseLanes : c;
        G(ej, fj);
        fj |= d;
      }
    else
      null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
    Xi(a, b, e, c);
    return b.child;
  }
  function gj(a, b) {
    var c = b.ref;
    if (null === a && null !== c || null !== a && a.ref !== c)
      b.flags |= 512, b.flags |= 2097152;
  }
  function cj(a, b, c, d, e) {
    var f = Zf(c) ? Xf : H.current;
    f = Yf(b, f);
    ch(b, e);
    c = Nh(a, b, c, d, f, e);
    d = Sh();
    if (null !== a && !dh)
      return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
    I && d && vg(b);
    b.flags |= 1;
    Xi(a, b, c, e);
    return b.child;
  }
  function hj(a, b, c, d, e) {
    if (Zf(c)) {
      var f = true;
      cg(b);
    } else
      f = false;
    ch(b, e);
    if (null === b.stateNode)
      ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
    else if (null === a) {
      var g = b.stateNode, h = b.memoizedProps;
      g.props = h;
      var k = g.context, l2 = c.contextType;
      "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c) ? Xf : H.current, l2 = Yf(b, l2));
      var m2 = c.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g.getSnapshotBeforeUpdate;
      q2 || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l2) && Hi(b, g, d, l2);
      jh = false;
      var r2 = b.memoizedState;
      g.state = r2;
      qh(b, d, g, e);
      k = b.memoizedState;
      h !== d || r2 !== k || Wf.current || jh ? ("function" === typeof m2 && (Di(b, c, m2, d), k = b.memoizedState), (h = jh || Fi(b, c, h, d, r2, k, l2)) ? (q2 || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l2, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
    } else {
      g = b.stateNode;
      lh(a, b);
      h = b.memoizedProps;
      l2 = b.type === b.elementType ? h : Ci(b.type, h);
      g.props = l2;
      q2 = b.pendingProps;
      r2 = g.context;
      k = c.contextType;
      "object" === typeof k && null !== k ? k = eh(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));
      var y2 = c.getDerivedStateFromProps;
      (m2 = "function" === typeof y2 || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q2 || r2 !== k) && Hi(b, g, d, k);
      jh = false;
      r2 = b.memoizedState;
      g.state = r2;
      qh(b, d, g, e);
      var n2 = b.memoizedState;
      h !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di(b, c, y2, d), n2 = b.memoizedState), (l2 = jh || Fi(b, c, l2, d, r2, n2, k) || false) ? (m2 || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n2, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n2, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n2), g.props = d, g.state = n2, g.context = k, d = l2) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), d = false);
    }
    return jj(a, b, c, d, f, e);
  }
  function jj(a, b, c, d, e, f) {
    gj(a, b);
    var g = 0 !== (b.flags & 128);
    if (!d && !g)
      return e && dg(b, c, false), Zi(a, b, f);
    d = b.stateNode;
    Wi.current = b;
    var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
    b.flags |= 1;
    null !== a && g ? (b.child = Ug(b, a.child, null, f), b.child = Ug(b, null, h, f)) : Xi(a, b, h, f);
    b.memoizedState = d.state;
    e && dg(b, c, true);
    return b.child;
  }
  function kj(a) {
    var b = a.stateNode;
    b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
    yh(a, b.containerInfo);
  }
  function lj(a, b, c, d, e) {
    Ig();
    Jg(e);
    b.flags |= 256;
    Xi(a, b, c, d);
    return b.child;
  }
  var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
  function nj(a) {
    return { baseLanes: a, cachePool: null, transitions: null };
  }
  function oj(a, b, c) {
    var d = b.pendingProps, e = L.current, f = false, g = 0 !== (b.flags & 128), h;
    (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
    if (h)
      f = true, b.flags &= -129;
    else if (null === a || null !== a.memoizedState)
      e |= 1;
    G(L, e & 1);
    if (null === a) {
      Eg(b);
      a = b.memoizedState;
      if (null !== a && (a = a.dehydrated, null !== a))
        return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
      g = d.children;
      a = d.fallback;
      return f ? (d = b.mode, f = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = pj(g, d, 0, null), a = Tg(a, d, c, null), f.return = b, a.return = b, f.sibling = a, b.child = f, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
    }
    e = a.memoizedState;
    if (null !== e && (h = e.dehydrated, null !== h))
      return rj(a, b, g, d, h, e, c);
    if (f) {
      f = d.fallback;
      g = b.mode;
      e = a.child;
      h = e.sibling;
      var k = { mode: "hidden", children: d.children };
      0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = Pg(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
      null !== h ? f = Pg(h, f) : (f = Tg(f, g, c, null), f.flags |= 2);
      f.return = b;
      d.return = b;
      d.sibling = f;
      b.child = d;
      d = f;
      f = b.child;
      g = a.child.memoizedState;
      g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
      f.memoizedState = g;
      f.childLanes = a.childLanes & ~c;
      b.memoizedState = mj;
      return d;
    }
    f = a.child;
    a = f.sibling;
    d = Pg(f, { mode: "visible", children: d.children });
    0 === (b.mode & 1) && (d.lanes = c);
    d.return = b;
    d.sibling = null;
    null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
    b.child = d;
    b.memoizedState = null;
    return d;
  }
  function qj(a, b) {
    b = pj({ mode: "visible", children: b }, a.mode, 0, null);
    b.return = a;
    return a.child = b;
  }
  function sj(a, b, c, d) {
    null !== d && Jg(d);
    Ug(b, a.child, null, c);
    a = qj(b, b.pendingProps.children);
    a.flags |= 2;
    b.memoizedState = null;
    return a;
  }
  function rj(a, b, c, d, e, f, g) {
    if (c) {
      if (b.flags & 256)
        return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
      if (null !== b.memoizedState)
        return b.child = a.child, b.flags |= 128, null;
      f = d.fallback;
      e = b.mode;
      d = pj({ mode: "visible", children: d.children }, e, 0, null);
      f = Tg(f, e, g, null);
      f.flags |= 2;
      d.return = b;
      f.return = b;
      d.sibling = f;
      b.child = d;
      0 !== (b.mode & 1) && Ug(b, a.child, null, g);
      b.child.memoizedState = nj(g);
      b.memoizedState = mj;
      return f;
    }
    if (0 === (b.mode & 1))
      return sj(a, b, g, null);
    if ("$!" === e.data) {
      d = e.nextSibling && e.nextSibling.dataset;
      if (d)
        var h = d.dgst;
      d = h;
      f = Error(p(419));
      d = Ki(f, d, void 0);
      return sj(a, b, g, d);
    }
    h = 0 !== (g & a.childLanes);
    if (dh || h) {
      d = Q;
      if (null !== d) {
        switch (g & -g) {
          case 4:
            e = 2;
            break;
          case 16:
            e = 8;
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
            e = 32;
            break;
          case 536870912:
            e = 268435456;
            break;
          default:
            e = 0;
        }
        e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
        0 !== e && e !== f.retryLane && (f.retryLane = e, ih(a, e), gi(d, a, e, -1));
      }
      tj();
      d = Ki(Error(p(421)));
      return sj(a, b, g, d);
    }
    if ("$?" === e.data)
      return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
    a = f.treeContext;
    yg = Lf(e.nextSibling);
    xg = b;
    I = true;
    zg = null;
    null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
    b = qj(b, d.children);
    b.flags |= 4096;
    return b;
  }
  function vj(a, b, c) {
    a.lanes |= b;
    var d = a.alternate;
    null !== d && (d.lanes |= b);
    bh(a.return, b, c);
  }
  function wj(a, b, c, d, e) {
    var f = a.memoizedState;
    null === f ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c, f.tailMode = e);
  }
  function xj(a, b, c) {
    var d = b.pendingProps, e = d.revealOrder, f = d.tail;
    Xi(a, b, d.children, c);
    d = L.current;
    if (0 !== (d & 2))
      d = d & 1 | 2, b.flags |= 128;
    else {
      if (null !== a && 0 !== (a.flags & 128))
        a:
          for (a = b.child; null !== a; ) {
            if (13 === a.tag)
              null !== a.memoizedState && vj(a, c, b);
            else if (19 === a.tag)
              vj(a, c, b);
            else if (null !== a.child) {
              a.child.return = a;
              a = a.child;
              continue;
            }
            if (a === b)
              break a;
            for (; null === a.sibling; ) {
              if (null === a.return || a.return === b)
                break a;
              a = a.return;
            }
            a.sibling.return = a.return;
            a = a.sibling;
          }
      d &= 1;
    }
    G(L, d);
    if (0 === (b.mode & 1))
      b.memoizedState = null;
    else
      switch (e) {
        case "forwards":
          c = b.child;
          for (e = null; null !== c; )
            a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
          c = e;
          null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
          wj(b, false, e, c, f);
          break;
        case "backwards":
          c = null;
          e = b.child;
          for (b.child = null; null !== e; ) {
            a = e.alternate;
            if (null !== a && null === Ch(a)) {
              b.child = e;
              break;
            }
            a = e.sibling;
            e.sibling = c;
            c = e;
            e = a;
          }
          wj(b, true, c, null, f);
          break;
        case "together":
          wj(b, false, null, null, void 0);
          break;
        default:
          b.memoizedState = null;
      }
    return b.child;
  }
  function ij(a, b) {
    0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
  }
  function Zi(a, b, c) {
    null !== a && (b.dependencies = a.dependencies);
    rh |= b.lanes;
    if (0 === (c & b.childLanes))
      return null;
    if (null !== a && b.child !== a.child)
      throw Error(p(153));
    if (null !== b.child) {
      a = b.child;
      c = Pg(a, a.pendingProps);
      b.child = c;
      for (c.return = b; null !== a.sibling; )
        a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
      c.sibling = null;
    }
    return b.child;
  }
  function yj(a, b, c) {
    switch (b.tag) {
      case 3:
        kj(b);
        Ig();
        break;
      case 5:
        Ah(b);
        break;
      case 1:
        Zf(b.type) && cg(b);
        break;
      case 4:
        yh(b, b.stateNode.containerInfo);
        break;
      case 10:
        var d = b.type._context, e = b.memoizedProps.value;
        G(Wg, d._currentValue);
        d._currentValue = e;
        break;
      case 13:
        d = b.memoizedState;
        if (null !== d) {
          if (null !== d.dehydrated)
            return G(L, L.current & 1), b.flags |= 128, null;
          if (0 !== (c & b.child.childLanes))
            return oj(a, b, c);
          G(L, L.current & 1);
          a = Zi(a, b, c);
          return null !== a ? a.sibling : null;
        }
        G(L, L.current & 1);
        break;
      case 19:
        d = 0 !== (c & b.childLanes);
        if (0 !== (a.flags & 128)) {
          if (d)
            return xj(a, b, c);
          b.flags |= 128;
        }
        e = b.memoizedState;
        null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
        G(L, L.current);
        if (d)
          break;
        else
          return null;
      case 22:
      case 23:
        return b.lanes = 0, dj(a, b, c);
    }
    return Zi(a, b, c);
  }
  var zj, Aj, Bj, Cj;
  zj = function(a, b) {
    for (var c = b.child; null !== c; ) {
      if (5 === c.tag || 6 === c.tag)
        a.appendChild(c.stateNode);
      else if (4 !== c.tag && null !== c.child) {
        c.child.return = c;
        c = c.child;
        continue;
      }
      if (c === b)
        break;
      for (; null === c.sibling; ) {
        if (null === c.return || c.return === b)
          return;
        c = c.return;
      }
      c.sibling.return = c.return;
      c = c.sibling;
    }
  };
  Aj = function() {
  };
  Bj = function(a, b, c, d) {
    var e = a.memoizedProps;
    if (e !== d) {
      a = b.stateNode;
      xh(uh.current);
      var f = null;
      switch (c) {
        case "input":
          e = Ya(a, e);
          d = Ya(a, d);
          f = [];
          break;
        case "select":
          e = A({}, e, { value: void 0 });
          d = A({}, d, { value: void 0 });
          f = [];
          break;
        case "textarea":
          e = gb(a, e);
          d = gb(a, d);
          f = [];
          break;
        default:
          "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
      }
      ub(c, d);
      var g;
      c = null;
      for (l2 in e)
        if (!d.hasOwnProperty(l2) && e.hasOwnProperty(l2) && null != e[l2])
          if ("style" === l2) {
            var h = e[l2];
            for (g in h)
              h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
          } else
            "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f || (f = []) : (f = f || []).push(l2, null));
      for (l2 in d) {
        var k = d[l2];
        h = null != e ? e[l2] : void 0;
        if (d.hasOwnProperty(l2) && k !== h && (null != k || null != h))
          if ("style" === l2)
            if (h) {
              for (g in h)
                !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
              for (g in k)
                k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
            } else
              c || (f || (f = []), f.push(
                l2,
                c
              )), c = k;
          else
            "dangerouslySetInnerHTML" === l2 ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l2, k)) : "children" === l2 ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l2, "" + k) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k && "onScroll" === l2 && D("scroll", a), f || h === k || (f = [])) : (f = f || []).push(l2, k));
      }
      c && (f = f || []).push("style", c);
      var l2 = f;
      if (b.updateQueue = l2)
        b.flags |= 4;
    }
  };
  Cj = function(a, b, c, d) {
    c !== d && (b.flags |= 4);
  };
  function Dj(a, b) {
    if (!I)
      switch (a.tailMode) {
        case "hidden":
          b = a.tail;
          for (var c = null; null !== b; )
            null !== b.alternate && (c = b), b = b.sibling;
          null === c ? a.tail = null : c.sibling = null;
          break;
        case "collapsed":
          c = a.tail;
          for (var d = null; null !== c; )
            null !== c.alternate && (d = c), c = c.sibling;
          null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
      }
  }
  function S(a) {
    var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
    if (b)
      for (var e = a.child; null !== e; )
        c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
    else
      for (e = a.child; null !== e; )
        c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
    a.subtreeFlags |= d;
    a.childLanes = c;
    return b;
  }
  function Ej(a, b, c) {
    var d = b.pendingProps;
    wg(b);
    switch (b.tag) {
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
        return S(b), null;
      case 1:
        return Zf(b.type) && $f(), S(b), null;
      case 3:
        d = b.stateNode;
        zh();
        E(Wf);
        E(H);
        Eh();
        d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
        if (null === a || null === a.child)
          Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
        Aj(a, b);
        S(b);
        return null;
      case 5:
        Bh(b);
        var e = xh(wh.current);
        c = b.type;
        if (null !== a && null != b.stateNode)
          Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
        else {
          if (!d) {
            if (null === b.stateNode)
              throw Error(p(166));
            S(b);
            return null;
          }
          a = xh(uh.current);
          if (Gg(b)) {
            d = b.stateNode;
            c = b.type;
            var f = b.memoizedProps;
            d[Of] = b;
            d[Pf] = f;
            a = 0 !== (b.mode & 1);
            switch (c) {
              case "dialog":
                D("cancel", d);
                D("close", d);
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", d);
                break;
              case "video":
              case "audio":
                for (e = 0; e < lf.length; e++)
                  D(lf[e], d);
                break;
              case "source":
                D("error", d);
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  d
                );
                D("load", d);
                break;
              case "details":
                D("toggle", d);
                break;
              case "input":
                Za(d, f);
                D("invalid", d);
                break;
              case "select":
                d._wrapperState = { wasMultiple: !!f.multiple };
                D("invalid", d);
                break;
              case "textarea":
                hb(d, f), D("invalid", d);
            }
            ub(c, f);
            e = null;
            for (var g in f)
              if (f.hasOwnProperty(g)) {
                var h = f[g];
                "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f.suppressHydrationWarning && Af(
                  d.textContent,
                  h,
                  a
                ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
              }
            switch (c) {
              case "input":
                Va(d);
                db(d, f, true);
                break;
              case "textarea":
                Va(d);
                jb(d);
                break;
              case "select":
              case "option":
                break;
              default:
                "function" === typeof f.onClick && (d.onclick = Bf);
            }
            d = e;
            b.updateQueue = d;
            null !== d && (b.flags |= 4);
          } else {
            g = 9 === e.nodeType ? e : e.ownerDocument;
            "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
            "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
            a[Of] = b;
            a[Pf] = d;
            zj(a, b, false, false);
            b.stateNode = a;
            a: {
              g = vb(c, d);
              switch (c) {
                case "dialog":
                  D("cancel", a);
                  D("close", a);
                  e = d;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  D("load", a);
                  e = d;
                  break;
                case "video":
                case "audio":
                  for (e = 0; e < lf.length; e++)
                    D(lf[e], a);
                  e = d;
                  break;
                case "source":
                  D("error", a);
                  e = d;
                  break;
                case "img":
                case "image":
                case "link":
                  D(
                    "error",
                    a
                  );
                  D("load", a);
                  e = d;
                  break;
                case "details":
                  D("toggle", a);
                  e = d;
                  break;
                case "input":
                  Za(a, d);
                  e = Ya(a, d);
                  D("invalid", a);
                  break;
                case "option":
                  e = d;
                  break;
                case "select":
                  a._wrapperState = { wasMultiple: !!d.multiple };
                  e = A({}, d, { value: void 0 });
                  D("invalid", a);
                  break;
                case "textarea":
                  hb(a, d);
                  e = gb(a, d);
                  D("invalid", a);
                  break;
                default:
                  e = d;
              }
              ub(c, e);
              h = e;
              for (f in h)
                if (h.hasOwnProperty(f)) {
                  var k = h[f];
                  "style" === f ? sb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && nb(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && ob(a, k) : "number" === typeof k && ob(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ea.hasOwnProperty(f) ? null != k && "onScroll" === f && D("scroll", a) : null != k && ta(a, f, k, g));
                }
              switch (c) {
                case "input":
                  Va(a);
                  db(a, d, false);
                  break;
                case "textarea":
                  Va(a);
                  jb(a);
                  break;
                case "option":
                  null != d.value && a.setAttribute("value", "" + Sa(d.value));
                  break;
                case "select":
                  a.multiple = !!d.multiple;
                  f = d.value;
                  null != f ? fb(a, !!d.multiple, f, false) : null != d.defaultValue && fb(
                    a,
                    !!d.multiple,
                    d.defaultValue,
                    true
                  );
                  break;
                default:
                  "function" === typeof e.onClick && (a.onclick = Bf);
              }
              switch (c) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  d = !!d.autoFocus;
                  break a;
                case "img":
                  d = true;
                  break a;
                default:
                  d = false;
              }
            }
            d && (b.flags |= 4);
          }
          null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
        }
        S(b);
        return null;
      case 6:
        if (a && null != b.stateNode)
          Cj(a, b, a.memoizedProps, d);
        else {
          if ("string" !== typeof d && null === b.stateNode)
            throw Error(p(166));
          c = xh(wh.current);
          xh(uh.current);
          if (Gg(b)) {
            d = b.stateNode;
            c = b.memoizedProps;
            d[Of] = b;
            if (f = d.nodeValue !== c) {
              if (a = xg, null !== a)
                switch (a.tag) {
                  case 3:
                    Af(d.nodeValue, c, 0 !== (a.mode & 1));
                    break;
                  case 5:
                    true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
                }
            }
            f && (b.flags |= 4);
          } else
            d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
        }
        S(b);
        return null;
      case 13:
        E(L);
        d = b.memoizedState;
        if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
          if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128))
            Hg(), Ig(), b.flags |= 98560, f = false;
          else if (f = Gg(b), null !== d && null !== d.dehydrated) {
            if (null === a) {
              if (!f)
                throw Error(p(318));
              f = b.memoizedState;
              f = null !== f ? f.dehydrated : null;
              if (!f)
                throw Error(p(317));
              f[Of] = b;
            } else
              Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
            S(b);
            f = false;
          } else
            null !== zg && (Fj(zg), zg = null), f = true;
          if (!f)
            return b.flags & 65536 ? b : null;
        }
        if (0 !== (b.flags & 128))
          return b.lanes = c, b;
        d = null !== d;
        d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
        null !== b.updateQueue && (b.flags |= 4);
        S(b);
        return null;
      case 4:
        return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
      case 10:
        return ah(b.type._context), S(b), null;
      case 17:
        return Zf(b.type) && $f(), S(b), null;
      case 19:
        E(L);
        f = b.memoizedState;
        if (null === f)
          return S(b), null;
        d = 0 !== (b.flags & 128);
        g = f.rendering;
        if (null === g)
          if (d)
            Dj(f, false);
          else {
            if (0 !== T || null !== a && 0 !== (a.flags & 128))
              for (a = b.child; null !== a; ) {
                g = Ch(a);
                if (null !== g) {
                  b.flags |= 128;
                  Dj(f, false);
                  d = g.updateQueue;
                  null !== d && (b.updateQueue = d, b.flags |= 4);
                  b.subtreeFlags = 0;
                  d = c;
                  for (c = b.child; null !== c; )
                    f = c, a = d, f.flags &= 14680066, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
                  G(L, L.current & 1 | 2);
                  return b.child;
                }
                a = a.sibling;
              }
            null !== f.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
          }
        else {
          if (!d)
            if (a = Ch(g), null !== a) {
              if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f, true), null === f.tail && "hidden" === f.tailMode && !g.alternate && !I)
                return S(b), null;
            } else
              2 * B() - f.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
          f.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f.last, null !== c ? c.sibling = g : b.child = g, f.last = g);
        }
        if (null !== f.tail)
          return b = f.tail, f.rendering = b, f.tail = b.sibling, f.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
        S(b);
        return null;
      case 22:
      case 23:
        return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(p(156, b.tag));
  }
  function Ij(a, b) {
    wg(b);
    switch (b.tag) {
      case 1:
        return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
      case 3:
        return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
      case 5:
        return Bh(b), null;
      case 13:
        E(L);
        a = b.memoizedState;
        if (null !== a && null !== a.dehydrated) {
          if (null === b.alternate)
            throw Error(p(340));
          Ig();
        }
        a = b.flags;
        return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
      case 19:
        return E(L), null;
      case 4:
        return zh(), null;
      case 10:
        return ah(b.type._context), null;
      case 22:
      case 23:
        return Hj(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Jj = false, U = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
  function Lj(a, b) {
    var c = a.ref;
    if (null !== c)
      if ("function" === typeof c)
        try {
          c(null);
        } catch (d) {
          W(a, b, d);
        }
      else
        c.current = null;
  }
  function Mj(a, b, c) {
    try {
      c();
    } catch (d) {
      W(a, b, d);
    }
  }
  var Nj = false;
  function Oj(a, b) {
    Cf = dd;
    a = Me();
    if (Ne(a)) {
      if ("selectionStart" in a)
        var c = { start: a.selectionStart, end: a.selectionEnd };
      else
        a: {
          c = (c = a.ownerDocument) && c.defaultView || window;
          var d = c.getSelection && c.getSelection();
          if (d && 0 !== d.rangeCount) {
            c = d.anchorNode;
            var e = d.anchorOffset, f = d.focusNode;
            d = d.focusOffset;
            try {
              c.nodeType, f.nodeType;
            } catch (F2) {
              c = null;
              break a;
            }
            var g = 0, h = -1, k = -1, l2 = 0, m2 = 0, q2 = a, r2 = null;
            b:
              for (; ; ) {
                for (var y2; ; ) {
                  q2 !== c || 0 !== e && 3 !== q2.nodeType || (h = g + e);
                  q2 !== f || 0 !== d && 3 !== q2.nodeType || (k = g + d);
                  3 === q2.nodeType && (g += q2.nodeValue.length);
                  if (null === (y2 = q2.firstChild))
                    break;
                  r2 = q2;
                  q2 = y2;
                }
                for (; ; ) {
                  if (q2 === a)
                    break b;
                  r2 === c && ++l2 === e && (h = g);
                  r2 === f && ++m2 === d && (k = g);
                  if (null !== (y2 = q2.nextSibling))
                    break;
                  q2 = r2;
                  r2 = q2.parentNode;
                }
                q2 = y2;
              }
            c = -1 === h || -1 === k ? null : { start: h, end: k };
          } else
            c = null;
        }
      c = c || { start: 0, end: 0 };
    } else
      c = null;
    Df = { focusedElem: a, selectionRange: c };
    dd = false;
    for (V = b; null !== V; )
      if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a)
        a.return = b, V = a;
      else
        for (; null !== V; ) {
          b = V;
          try {
            var n2 = b.alternate;
            if (0 !== (b.flags & 1024))
              switch (b.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (null !== n2) {
                    var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b.stateNode, w2 = x2.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Ci(b.type, t2), J2);
                    x2.__reactInternalSnapshotBeforeUpdate = w2;
                  }
                  break;
                case 3:
                  var u2 = b.stateNode.containerInfo;
                  1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(p(163));
              }
          } catch (F2) {
            W(b, b.return, F2);
          }
          a = b.sibling;
          if (null !== a) {
            a.return = b.return;
            V = a;
            break;
          }
          V = b.return;
        }
    n2 = Nj;
    Nj = false;
    return n2;
  }
  function Pj(a, b, c) {
    var d = b.updateQueue;
    d = null !== d ? d.lastEffect : null;
    if (null !== d) {
      var e = d = d.next;
      do {
        if ((e.tag & a) === a) {
          var f = e.destroy;
          e.destroy = void 0;
          void 0 !== f && Mj(b, c, f);
        }
        e = e.next;
      } while (e !== d);
    }
  }
  function Qj(a, b) {
    b = b.updateQueue;
    b = null !== b ? b.lastEffect : null;
    if (null !== b) {
      var c = b = b.next;
      do {
        if ((c.tag & a) === a) {
          var d = c.create;
          c.destroy = d();
        }
        c = c.next;
      } while (c !== b);
    }
  }
  function Rj(a) {
    var b = a.ref;
    if (null !== b) {
      var c = a.stateNode;
      switch (a.tag) {
        case 5:
          a = c;
          break;
        default:
          a = c;
      }
      "function" === typeof b ? b(a) : b.current = a;
    }
  }
  function Sj(a) {
    var b = a.alternate;
    null !== b && (a.alternate = null, Sj(b));
    a.child = null;
    a.deletions = null;
    a.sibling = null;
    5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
    a.stateNode = null;
    a.return = null;
    a.dependencies = null;
    a.memoizedProps = null;
    a.memoizedState = null;
    a.pendingProps = null;
    a.stateNode = null;
    a.updateQueue = null;
  }
  function Tj(a) {
    return 5 === a.tag || 3 === a.tag || 4 === a.tag;
  }
  function Uj(a) {
    a:
      for (; ; ) {
        for (; null === a.sibling; ) {
          if (null === a.return || Tj(a.return))
            return null;
          a = a.return;
        }
        a.sibling.return = a.return;
        for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
          if (a.flags & 2)
            continue a;
          if (null === a.child || 4 === a.tag)
            continue a;
          else
            a.child.return = a, a = a.child;
        }
        if (!(a.flags & 2))
          return a.stateNode;
      }
  }
  function Vj(a, b, c) {
    var d = a.tag;
    if (5 === d || 6 === d)
      a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
    else if (4 !== d && (a = a.child, null !== a))
      for (Vj(a, b, c), a = a.sibling; null !== a; )
        Vj(a, b, c), a = a.sibling;
  }
  function Wj(a, b, c) {
    var d = a.tag;
    if (5 === d || 6 === d)
      a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
    else if (4 !== d && (a = a.child, null !== a))
      for (Wj(a, b, c), a = a.sibling; null !== a; )
        Wj(a, b, c), a = a.sibling;
  }
  var X = null, Xj = false;
  function Yj(a, b, c) {
    for (c = c.child; null !== c; )
      Zj(a, b, c), c = c.sibling;
  }
  function Zj(a, b, c) {
    if (lc && "function" === typeof lc.onCommitFiberUnmount)
      try {
        lc.onCommitFiberUnmount(kc, c);
      } catch (h) {
      }
    switch (c.tag) {
      case 5:
        U || Lj(c, b);
      case 6:
        var d = X, e = Xj;
        X = null;
        Yj(a, b, c);
        X = d;
        Xj = e;
        null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
        break;
      case 18:
        null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
        break;
      case 4:
        d = X;
        e = Xj;
        X = c.stateNode.containerInfo;
        Xj = true;
        Yj(a, b, c);
        X = d;
        Xj = e;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
          e = d = d.next;
          do {
            var f = e, g = f.destroy;
            f = f.tag;
            void 0 !== g && (0 !== (f & 2) ? Mj(c, b, g) : 0 !== (f & 4) && Mj(c, b, g));
            e = e.next;
          } while (e !== d);
        }
        Yj(a, b, c);
        break;
      case 1:
        if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount))
          try {
            d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
          } catch (h) {
            W(c, b, h);
          }
        Yj(a, b, c);
        break;
      case 21:
        Yj(a, b, c);
        break;
      case 22:
        c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
        break;
      default:
        Yj(a, b, c);
    }
  }
  function ak(a) {
    var b = a.updateQueue;
    if (null !== b) {
      a.updateQueue = null;
      var c = a.stateNode;
      null === c && (c = a.stateNode = new Kj());
      b.forEach(function(b2) {
        var d = bk.bind(null, a, b2);
        c.has(b2) || (c.add(b2), b2.then(d, d));
      });
    }
  }
  function ck(a, b) {
    var c = b.deletions;
    if (null !== c)
      for (var d = 0; d < c.length; d++) {
        var e = c[d];
        try {
          var f = a, g = b, h = g;
          a:
            for (; null !== h; ) {
              switch (h.tag) {
                case 5:
                  X = h.stateNode;
                  Xj = false;
                  break a;
                case 3:
                  X = h.stateNode.containerInfo;
                  Xj = true;
                  break a;
                case 4:
                  X = h.stateNode.containerInfo;
                  Xj = true;
                  break a;
              }
              h = h.return;
            }
          if (null === X)
            throw Error(p(160));
          Zj(f, g, e);
          X = null;
          Xj = false;
          var k = e.alternate;
          null !== k && (k.return = null);
          e.return = null;
        } catch (l2) {
          W(e, b, l2);
        }
      }
    if (b.subtreeFlags & 12854)
      for (b = b.child; null !== b; )
        dk(b, a), b = b.sibling;
  }
  function dk(a, b) {
    var c = a.alternate, d = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ck(b, a);
        ek(a);
        if (d & 4) {
          try {
            Pj(3, a, a.return), Qj(3, a);
          } catch (t2) {
            W(a, a.return, t2);
          }
          try {
            Pj(5, a, a.return);
          } catch (t2) {
            W(a, a.return, t2);
          }
        }
        break;
      case 1:
        ck(b, a);
        ek(a);
        d & 512 && null !== c && Lj(c, c.return);
        break;
      case 5:
        ck(b, a);
        ek(a);
        d & 512 && null !== c && Lj(c, c.return);
        if (a.flags & 32) {
          var e = a.stateNode;
          try {
            ob(e, "");
          } catch (t2) {
            W(a, a.return, t2);
          }
        }
        if (d & 4 && (e = a.stateNode, null != e)) {
          var f = a.memoizedProps, g = null !== c ? c.memoizedProps : f, h = a.type, k = a.updateQueue;
          a.updateQueue = null;
          if (null !== k)
            try {
              "input" === h && "radio" === f.type && null != f.name && ab(e, f);
              vb(h, g);
              var l2 = vb(h, f);
              for (g = 0; g < k.length; g += 2) {
                var m2 = k[g], q2 = k[g + 1];
                "style" === m2 ? sb(e, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e, q2) : "children" === m2 ? ob(e, q2) : ta(e, m2, q2, l2);
              }
              switch (h) {
                case "input":
                  bb(e, f);
                  break;
                case "textarea":
                  ib(e, f);
                  break;
                case "select":
                  var r2 = e._wrapperState.wasMultiple;
                  e._wrapperState.wasMultiple = !!f.multiple;
                  var y2 = f.value;
                  null != y2 ? fb(e, !!f.multiple, y2, false) : r2 !== !!f.multiple && (null != f.defaultValue ? fb(
                    e,
                    !!f.multiple,
                    f.defaultValue,
                    true
                  ) : fb(e, !!f.multiple, f.multiple ? [] : "", false));
              }
              e[Pf] = f;
            } catch (t2) {
              W(a, a.return, t2);
            }
        }
        break;
      case 6:
        ck(b, a);
        ek(a);
        if (d & 4) {
          if (null === a.stateNode)
            throw Error(p(162));
          e = a.stateNode;
          f = a.memoizedProps;
          try {
            e.nodeValue = f;
          } catch (t2) {
            W(a, a.return, t2);
          }
        }
        break;
      case 3:
        ck(b, a);
        ek(a);
        if (d & 4 && null !== c && c.memoizedState.isDehydrated)
          try {
            bd(b.containerInfo);
          } catch (t2) {
            W(a, a.return, t2);
          }
        break;
      case 4:
        ck(b, a);
        ek(a);
        break;
      case 13:
        ck(b, a);
        ek(a);
        e = a.child;
        e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
        d & 4 && ak(a);
        break;
      case 22:
        m2 = null !== c && null !== c.memoizedState;
        a.mode & 1 ? (U = (l2 = U) || m2, ck(b, a), U = l2) : ck(b, a);
        ek(a);
        if (d & 8192) {
          l2 = null !== a.memoizedState;
          if ((a.stateNode.isHidden = l2) && !m2 && 0 !== (a.mode & 1))
            for (V = a, m2 = a.child; null !== m2; ) {
              for (q2 = V = m2; null !== V; ) {
                r2 = V;
                y2 = r2.child;
                switch (r2.tag) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    Pj(4, r2, r2.return);
                    break;
                  case 1:
                    Lj(r2, r2.return);
                    var n2 = r2.stateNode;
                    if ("function" === typeof n2.componentWillUnmount) {
                      d = r2;
                      c = r2.return;
                      try {
                        b = d, n2.props = b.memoizedProps, n2.state = b.memoizedState, n2.componentWillUnmount();
                      } catch (t2) {
                        W(d, c, t2);
                      }
                    }
                    break;
                  case 5:
                    Lj(r2, r2.return);
                    break;
                  case 22:
                    if (null !== r2.memoizedState) {
                      gk(q2);
                      continue;
                    }
                }
                null !== y2 ? (y2.return = r2, V = y2) : gk(q2);
              }
              m2 = m2.sibling;
            }
          a:
            for (m2 = null, q2 = a; ; ) {
              if (5 === q2.tag) {
                if (null === m2) {
                  m2 = q2;
                  try {
                    e = q2.stateNode, l2 ? (f = e.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q2.stateNode, k = q2.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
                  } catch (t2) {
                    W(a, a.return, t2);
                  }
                }
              } else if (6 === q2.tag) {
                if (null === m2)
                  try {
                    q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
                  } catch (t2) {
                    W(a, a.return, t2);
                  }
              } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a) && null !== q2.child) {
                q2.child.return = q2;
                q2 = q2.child;
                continue;
              }
              if (q2 === a)
                break a;
              for (; null === q2.sibling; ) {
                if (null === q2.return || q2.return === a)
                  break a;
                m2 === q2 && (m2 = null);
                q2 = q2.return;
              }
              m2 === q2 && (m2 = null);
              q2.sibling.return = q2.return;
              q2 = q2.sibling;
            }
        }
        break;
      case 19:
        ck(b, a);
        ek(a);
        d & 4 && ak(a);
        break;
      case 21:
        break;
      default:
        ck(
          b,
          a
        ), ek(a);
    }
  }
  function ek(a) {
    var b = a.flags;
    if (b & 2) {
      try {
        a: {
          for (var c = a.return; null !== c; ) {
            if (Tj(c)) {
              var d = c;
              break a;
            }
            c = c.return;
          }
          throw Error(p(160));
        }
        switch (d.tag) {
          case 5:
            var e = d.stateNode;
            d.flags & 32 && (ob(e, ""), d.flags &= -33);
            var f = Uj(a);
            Wj(a, f, e);
            break;
          case 3:
          case 4:
            var g = d.stateNode.containerInfo, h = Uj(a);
            Vj(a, h, g);
            break;
          default:
            throw Error(p(161));
        }
      } catch (k) {
        W(a, a.return, k);
      }
      a.flags &= -3;
    }
    b & 4096 && (a.flags &= -4097);
  }
  function hk(a, b, c) {
    V = a;
    ik(a);
  }
  function ik(a, b, c) {
    for (var d = 0 !== (a.mode & 1); null !== V; ) {
      var e = V, f = e.child;
      if (22 === e.tag && d) {
        var g = null !== e.memoizedState || Jj;
        if (!g) {
          var h = e.alternate, k = null !== h && null !== h.memoizedState || U;
          h = Jj;
          var l2 = U;
          Jj = g;
          if ((U = k) && !l2)
            for (V = e; null !== V; )
              g = V, k = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k ? (k.return = g, V = k) : jk(e);
          for (; null !== f; )
            V = f, ik(f), f = f.sibling;
          V = e;
          Jj = h;
          U = l2;
        }
        kk(a);
      } else
        0 !== (e.subtreeFlags & 8772) && null !== f ? (f.return = e, V = f) : kk(a);
    }
  }
  function kk(a) {
    for (; null !== V; ) {
      var b = V;
      if (0 !== (b.flags & 8772)) {
        var c = b.alternate;
        try {
          if (0 !== (b.flags & 8772))
            switch (b.tag) {
              case 0:
              case 11:
              case 15:
                U || Qj(5, b);
                break;
              case 1:
                var d = b.stateNode;
                if (b.flags & 4 && !U)
                  if (null === c)
                    d.componentDidMount();
                  else {
                    var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
                    d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
                  }
                var f = b.updateQueue;
                null !== f && sh(b, f, d);
                break;
              case 3:
                var g = b.updateQueue;
                if (null !== g) {
                  c = null;
                  if (null !== b.child)
                    switch (b.child.tag) {
                      case 5:
                        c = b.child.stateNode;
                        break;
                      case 1:
                        c = b.child.stateNode;
                    }
                  sh(b, g, c);
                }
                break;
              case 5:
                var h = b.stateNode;
                if (null === c && b.flags & 4) {
                  c = h;
                  var k = b.memoizedProps;
                  switch (b.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      k.autoFocus && c.focus();
                      break;
                    case "img":
                      k.src && (c.src = k.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (null === b.memoizedState) {
                  var l2 = b.alternate;
                  if (null !== l2) {
                    var m2 = l2.memoizedState;
                    if (null !== m2) {
                      var q2 = m2.dehydrated;
                      null !== q2 && bd(q2);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(p(163));
            }
          U || b.flags & 512 && Rj(b);
        } catch (r2) {
          W(b, b.return, r2);
        }
      }
      if (b === a) {
        V = null;
        break;
      }
      c = b.sibling;
      if (null !== c) {
        c.return = b.return;
        V = c;
        break;
      }
      V = b.return;
    }
  }
  function gk(a) {
    for (; null !== V; ) {
      var b = V;
      if (b === a) {
        V = null;
        break;
      }
      var c = b.sibling;
      if (null !== c) {
        c.return = b.return;
        V = c;
        break;
      }
      V = b.return;
    }
  }
  function jk(a) {
    for (; null !== V; ) {
      var b = V;
      try {
        switch (b.tag) {
          case 0:
          case 11:
          case 15:
            var c = b.return;
            try {
              Qj(4, b);
            } catch (k) {
              W(b, c, k);
            }
            break;
          case 1:
            var d = b.stateNode;
            if ("function" === typeof d.componentDidMount) {
              var e = b.return;
              try {
                d.componentDidMount();
              } catch (k) {
                W(b, e, k);
              }
            }
            var f = b.return;
            try {
              Rj(b);
            } catch (k) {
              W(b, f, k);
            }
            break;
          case 5:
            var g = b.return;
            try {
              Rj(b);
            } catch (k) {
              W(b, g, k);
            }
        }
      } catch (k) {
        W(b, b.return, k);
      }
      if (b === a) {
        V = null;
        break;
      }
      var h = b.sibling;
      if (null !== h) {
        h.return = b.return;
        V = h;
        break;
      }
      V = b.return;
    }
  }
  var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
  function R() {
    return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
  }
  function yi(a) {
    if (0 === (a.mode & 1))
      return 1;
    if (0 !== (K & 2) && 0 !== Z)
      return Z & -Z;
    if (null !== Kg.transition)
      return 0 === Bk && (Bk = yc()), Bk;
    a = C;
    if (0 !== a)
      return a;
    a = window.event;
    a = void 0 === a ? 16 : jd(a.type);
    return a;
  }
  function gi(a, b, c, d) {
    if (50 < yk)
      throw yk = 0, zk = null, Error(p(185));
    Ac(a, c, d);
    if (0 === (K & 2) || a !== Q)
      a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
  }
  function Dk(a, b) {
    var c = a.callbackNode;
    wc(a, b);
    var d = uc(a, a === Q ? Z : 0);
    if (0 === d)
      null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
    else if (b = d & -d, a.callbackPriority !== b) {
      null != c && bc(c);
      if (1 === b)
        0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
          0 === (K & 6) && jg();
        }), c = null;
      else {
        switch (Dc(d)) {
          case 1:
            c = fc;
            break;
          case 4:
            c = gc;
            break;
          case 16:
            c = hc;
            break;
          case 536870912:
            c = jc;
            break;
          default:
            c = hc;
        }
        c = Fk(c, Gk.bind(null, a));
      }
      a.callbackPriority = b;
      a.callbackNode = c;
    }
  }
  function Gk(a, b) {
    Ak = -1;
    Bk = 0;
    if (0 !== (K & 6))
      throw Error(p(327));
    var c = a.callbackNode;
    if (Hk() && a.callbackNode !== c)
      return null;
    var d = uc(a, a === Q ? Z : 0);
    if (0 === d)
      return null;
    if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b)
      b = Ik(a, d);
    else {
      b = d;
      var e = K;
      K |= 2;
      var f = Jk();
      if (Q !== a || Z !== b)
        uk = null, Gj = B() + 500, Kk(a, b);
      do
        try {
          Lk();
          break;
        } catch (h) {
          Mk(a, h);
        }
      while (1);
      $g();
      mk.current = f;
      K = e;
      null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
    }
    if (0 !== b) {
      2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
      if (1 === b)
        throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
      if (6 === b)
        Ck(a, d);
      else {
        e = a.current.alternate;
        if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f = xc(a), 0 !== f && (d = f, b = Nk(a, f))), 1 === b))
          throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
        a.finishedWork = e;
        a.finishedLanes = d;
        switch (b) {
          case 0:
          case 1:
            throw Error(p(345));
          case 2:
            Pk(a, tk, uk);
            break;
          case 3:
            Ck(a, d);
            if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
              if (0 !== uc(a, 0))
                break;
              e = a.suspendedLanes;
              if ((e & d) !== d) {
                R();
                a.pingedLanes |= a.suspendedLanes & e;
                break;
              }
              a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
              break;
            }
            Pk(a, tk, uk);
            break;
          case 4:
            Ck(a, d);
            if ((d & 4194240) === d)
              break;
            b = a.eventTimes;
            for (e = -1; 0 < d; ) {
              var g = 31 - oc(d);
              f = 1 << g;
              g = b[g];
              g > e && (e = g);
              d &= ~f;
            }
            d = e;
            d = B() - d;
            d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
            if (10 < d) {
              a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
              break;
            }
            Pk(a, tk, uk);
            break;
          case 5:
            Pk(a, tk, uk);
            break;
          default:
            throw Error(p(329));
        }
      }
    }
    Dk(a, B());
    return a.callbackNode === c ? Gk.bind(null, a) : null;
  }
  function Nk(a, b) {
    var c = sk;
    a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
    a = Ik(a, b);
    2 !== a && (b = tk, tk = c, null !== b && Fj(b));
    return a;
  }
  function Fj(a) {
    null === tk ? tk = a : tk.push.apply(tk, a);
  }
  function Ok(a) {
    for (var b = a; ; ) {
      if (b.flags & 16384) {
        var c = b.updateQueue;
        if (null !== c && (c = c.stores, null !== c))
          for (var d = 0; d < c.length; d++) {
            var e = c[d], f = e.getSnapshot;
            e = e.value;
            try {
              if (!He(f(), e))
                return false;
            } catch (g) {
              return false;
            }
          }
      }
      c = b.child;
      if (b.subtreeFlags & 16384 && null !== c)
        c.return = b, b = c;
      else {
        if (b === a)
          break;
        for (; null === b.sibling; ) {
          if (null === b.return || b.return === a)
            return true;
          b = b.return;
        }
        b.sibling.return = b.return;
        b = b.sibling;
      }
    }
    return true;
  }
  function Ck(a, b) {
    b &= ~rk;
    b &= ~qk;
    a.suspendedLanes |= b;
    a.pingedLanes &= ~b;
    for (a = a.expirationTimes; 0 < b; ) {
      var c = 31 - oc(b), d = 1 << c;
      a[c] = -1;
      b &= ~d;
    }
  }
  function Ek(a) {
    if (0 !== (K & 6))
      throw Error(p(327));
    Hk();
    var b = uc(a, 0);
    if (0 === (b & 1))
      return Dk(a, B()), null;
    var c = Ik(a, b);
    if (0 !== a.tag && 2 === c) {
      var d = xc(a);
      0 !== d && (b = d, c = Nk(a, d));
    }
    if (1 === c)
      throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
    if (6 === c)
      throw Error(p(345));
    a.finishedWork = a.current.alternate;
    a.finishedLanes = b;
    Pk(a, tk, uk);
    Dk(a, B());
    return null;
  }
  function Qk(a, b) {
    var c = K;
    K |= 1;
    try {
      return a(b);
    } finally {
      K = c, 0 === K && (Gj = B() + 500, fg && jg());
    }
  }
  function Rk(a) {
    null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
    var b = K;
    K |= 1;
    var c = ok.transition, d = C;
    try {
      if (ok.transition = null, C = 1, a)
        return a();
    } finally {
      C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
    }
  }
  function Hj() {
    fj = ej.current;
    E(ej);
  }
  function Kk(a, b) {
    a.finishedWork = null;
    a.finishedLanes = 0;
    var c = a.timeoutHandle;
    -1 !== c && (a.timeoutHandle = -1, Gf(c));
    if (null !== Y)
      for (c = Y.return; null !== c; ) {
        var d = c;
        wg(d);
        switch (d.tag) {
          case 1:
            d = d.type.childContextTypes;
            null !== d && void 0 !== d && $f();
            break;
          case 3:
            zh();
            E(Wf);
            E(H);
            Eh();
            break;
          case 5:
            Bh(d);
            break;
          case 4:
            zh();
            break;
          case 13:
            E(L);
            break;
          case 19:
            E(L);
            break;
          case 10:
            ah(d.type._context);
            break;
          case 22:
          case 23:
            Hj();
        }
        c = c.return;
      }
    Q = a;
    Y = a = Pg(a.current, null);
    Z = fj = b;
    T = 0;
    pk = null;
    rk = qk = rh = 0;
    tk = sk = null;
    if (null !== fh) {
      for (b = 0; b < fh.length; b++)
        if (c = fh[b], d = c.interleaved, null !== d) {
          c.interleaved = null;
          var e = d.next, f = c.pending;
          if (null !== f) {
            var g = f.next;
            f.next = e;
            d.next = g;
          }
          c.pending = d;
        }
      fh = null;
    }
    return a;
  }
  function Mk(a, b) {
    do {
      var c = Y;
      try {
        $g();
        Fh.current = Rh;
        if (Ih) {
          for (var d = M.memoizedState; null !== d; ) {
            var e = d.queue;
            null !== e && (e.pending = null);
            d = d.next;
          }
          Ih = false;
        }
        Hh = 0;
        O = N = M = null;
        Jh = false;
        Kh = 0;
        nk.current = null;
        if (null === c || null === c.return) {
          T = 1;
          pk = b;
          Y = null;
          break;
        }
        a: {
          var f = a, g = c.return, h = c, k = b;
          b = Z;
          h.flags |= 32768;
          if (null !== k && "object" === typeof k && "function" === typeof k.then) {
            var l2 = k, m2 = h, q2 = m2.tag;
            if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
              var r2 = m2.alternate;
              r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
            }
            var y2 = Ui(g);
            if (null !== y2) {
              y2.flags &= -257;
              Vi(y2, g, h, f, b);
              y2.mode & 1 && Si(f, l2, b);
              b = y2;
              k = l2;
              var n2 = b.updateQueue;
              if (null === n2) {
                var t2 = /* @__PURE__ */ new Set();
                t2.add(k);
                b.updateQueue = t2;
              } else
                n2.add(k);
              break a;
            } else {
              if (0 === (b & 1)) {
                Si(f, l2, b);
                tj();
                break a;
              }
              k = Error(p(426));
            }
          } else if (I && h.mode & 1) {
            var J2 = Ui(g);
            if (null !== J2) {
              0 === (J2.flags & 65536) && (J2.flags |= 256);
              Vi(J2, g, h, f, b);
              Jg(Ji(k, h));
              break a;
            }
          }
          f = k = Ji(k, h);
          4 !== T && (T = 2);
          null === sk ? sk = [f] : sk.push(f);
          f = g;
          do {
            switch (f.tag) {
              case 3:
                f.flags |= 65536;
                b &= -b;
                f.lanes |= b;
                var x2 = Ni(f, k, b);
                ph(f, x2);
                break a;
              case 1:
                h = k;
                var w2 = f.type, u2 = f.stateNode;
                if (0 === (f.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                  f.flags |= 65536;
                  b &= -b;
                  f.lanes |= b;
                  var F2 = Qi(f, h, b);
                  ph(f, F2);
                  break a;
                }
            }
            f = f.return;
          } while (null !== f);
        }
        Sk(c);
      } catch (na) {
        b = na;
        Y === c && null !== c && (Y = c = c.return);
        continue;
      }
      break;
    } while (1);
  }
  function Jk() {
    var a = mk.current;
    mk.current = Rh;
    return null === a ? Rh : a;
  }
  function tj() {
    if (0 === T || 3 === T || 2 === T)
      T = 4;
    null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
  }
  function Ik(a, b) {
    var c = K;
    K |= 2;
    var d = Jk();
    if (Q !== a || Z !== b)
      uk = null, Kk(a, b);
    do
      try {
        Tk();
        break;
      } catch (e) {
        Mk(a, e);
      }
    while (1);
    $g();
    K = c;
    mk.current = d;
    if (null !== Y)
      throw Error(p(261));
    Q = null;
    Z = 0;
    return T;
  }
  function Tk() {
    for (; null !== Y; )
      Uk(Y);
  }
  function Lk() {
    for (; null !== Y && !cc(); )
      Uk(Y);
  }
  function Uk(a) {
    var b = Vk(a.alternate, a, fj);
    a.memoizedProps = a.pendingProps;
    null === b ? Sk(a) : Y = b;
    nk.current = null;
  }
  function Sk(a) {
    var b = a;
    do {
      var c = b.alternate;
      a = b.return;
      if (0 === (b.flags & 32768)) {
        if (c = Ej(c, b, fj), null !== c) {
          Y = c;
          return;
        }
      } else {
        c = Ij(c, b);
        if (null !== c) {
          c.flags &= 32767;
          Y = c;
          return;
        }
        if (null !== a)
          a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
        else {
          T = 6;
          Y = null;
          return;
        }
      }
      b = b.sibling;
      if (null !== b) {
        Y = b;
        return;
      }
      Y = b = a;
    } while (null !== b);
    0 === T && (T = 5);
  }
  function Pk(a, b, c) {
    var d = C, e = ok.transition;
    try {
      ok.transition = null, C = 1, Wk(a, b, c, d);
    } finally {
      ok.transition = e, C = d;
    }
    return null;
  }
  function Wk(a, b, c, d) {
    do
      Hk();
    while (null !== wk);
    if (0 !== (K & 6))
      throw Error(p(327));
    c = a.finishedWork;
    var e = a.finishedLanes;
    if (null === c)
      return null;
    a.finishedWork = null;
    a.finishedLanes = 0;
    if (c === a.current)
      throw Error(p(177));
    a.callbackNode = null;
    a.callbackPriority = 0;
    var f = c.lanes | c.childLanes;
    Bc(a, f);
    a === Q && (Y = Q = null, Z = 0);
    0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
      Hk();
      return null;
    }));
    f = 0 !== (c.flags & 15990);
    if (0 !== (c.subtreeFlags & 15990) || f) {
      f = ok.transition;
      ok.transition = null;
      var g = C;
      C = 1;
      var h = K;
      K |= 4;
      nk.current = null;
      Oj(a, c);
      dk(c, a);
      Oe(Df);
      dd = !!Cf;
      Df = Cf = null;
      a.current = c;
      hk(c);
      dc();
      K = h;
      C = g;
      ok.transition = f;
    } else
      a.current = c;
    vk && (vk = false, wk = a, xk = e);
    f = a.pendingLanes;
    0 === f && (Ri = null);
    mc(c.stateNode);
    Dk(a, B());
    if (null !== b)
      for (d = a.onRecoverableError, c = 0; c < b.length; c++)
        e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
    if (Oi)
      throw Oi = false, a = Pi, Pi = null, a;
    0 !== (xk & 1) && 0 !== a.tag && Hk();
    f = a.pendingLanes;
    0 !== (f & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
    jg();
    return null;
  }
  function Hk() {
    if (null !== wk) {
      var a = Dc(xk), b = ok.transition, c = C;
      try {
        ok.transition = null;
        C = 16 > a ? 16 : a;
        if (null === wk)
          var d = false;
        else {
          a = wk;
          wk = null;
          xk = 0;
          if (0 !== (K & 6))
            throw Error(p(331));
          var e = K;
          K |= 4;
          for (V = a.current; null !== V; ) {
            var f = V, g = f.child;
            if (0 !== (V.flags & 16)) {
              var h = f.deletions;
              if (null !== h) {
                for (var k = 0; k < h.length; k++) {
                  var l2 = h[k];
                  for (V = l2; null !== V; ) {
                    var m2 = V;
                    switch (m2.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Pj(8, m2, f);
                    }
                    var q2 = m2.child;
                    if (null !== q2)
                      q2.return = m2, V = q2;
                    else
                      for (; null !== V; ) {
                        m2 = V;
                        var r2 = m2.sibling, y2 = m2.return;
                        Sj(m2);
                        if (m2 === l2) {
                          V = null;
                          break;
                        }
                        if (null !== r2) {
                          r2.return = y2;
                          V = r2;
                          break;
                        }
                        V = y2;
                      }
                  }
                }
                var n2 = f.alternate;
                if (null !== n2) {
                  var t2 = n2.child;
                  if (null !== t2) {
                    n2.child = null;
                    do {
                      var J2 = t2.sibling;
                      t2.sibling = null;
                      t2 = J2;
                    } while (null !== t2);
                  }
                }
                V = f;
              }
            }
            if (0 !== (f.subtreeFlags & 2064) && null !== g)
              g.return = f, V = g;
            else
              b:
                for (; null !== V; ) {
                  f = V;
                  if (0 !== (f.flags & 2048))
                    switch (f.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Pj(9, f, f.return);
                    }
                  var x2 = f.sibling;
                  if (null !== x2) {
                    x2.return = f.return;
                    V = x2;
                    break b;
                  }
                  V = f.return;
                }
          }
          var w2 = a.current;
          for (V = w2; null !== V; ) {
            g = V;
            var u2 = g.child;
            if (0 !== (g.subtreeFlags & 2064) && null !== u2)
              u2.return = g, V = u2;
            else
              b:
                for (g = w2; null !== V; ) {
                  h = V;
                  if (0 !== (h.flags & 2048))
                    try {
                      switch (h.tag) {
                        case 0:
                        case 11:
                        case 15:
                          Qj(9, h);
                      }
                    } catch (na) {
                      W(h, h.return, na);
                    }
                  if (h === g) {
                    V = null;
                    break b;
                  }
                  var F2 = h.sibling;
                  if (null !== F2) {
                    F2.return = h.return;
                    V = F2;
                    break b;
                  }
                  V = h.return;
                }
          }
          K = e;
          jg();
          if (lc && "function" === typeof lc.onPostCommitFiberRoot)
            try {
              lc.onPostCommitFiberRoot(kc, a);
            } catch (na) {
            }
          d = true;
        }
        return d;
      } finally {
        C = c, ok.transition = b;
      }
    }
    return false;
  }
  function Xk(a, b, c) {
    b = Ji(c, b);
    b = Ni(a, b, 1);
    a = nh(a, b, 1);
    b = R();
    null !== a && (Ac(a, 1, b), Dk(a, b));
  }
  function W(a, b, c) {
    if (3 === a.tag)
      Xk(a, a, c);
    else
      for (; null !== b; ) {
        if (3 === b.tag) {
          Xk(b, a, c);
          break;
        } else if (1 === b.tag) {
          var d = b.stateNode;
          if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
            a = Ji(c, a);
            a = Qi(b, a, 1);
            b = nh(b, a, 1);
            a = R();
            null !== b && (Ac(b, 1, a), Dk(b, a));
            break;
          }
        }
        b = b.return;
      }
  }
  function Ti(a, b, c) {
    var d = a.pingCache;
    null !== d && d.delete(b);
    b = R();
    a.pingedLanes |= a.suspendedLanes & c;
    Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
    Dk(a, b);
  }
  function Yk(a, b) {
    0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
    var c = R();
    a = ih(a, b);
    null !== a && (Ac(a, b, c), Dk(a, c));
  }
  function uj(a) {
    var b = a.memoizedState, c = 0;
    null !== b && (c = b.retryLane);
    Yk(a, c);
  }
  function bk(a, b) {
    var c = 0;
    switch (a.tag) {
      case 13:
        var d = a.stateNode;
        var e = a.memoizedState;
        null !== e && (c = e.retryLane);
        break;
      case 19:
        d = a.stateNode;
        break;
      default:
        throw Error(p(314));
    }
    null !== d && d.delete(b);
    Yk(a, c);
  }
  var Vk;
  Vk = function(a, b, c) {
    if (null !== a)
      if (a.memoizedProps !== b.pendingProps || Wf.current)
        dh = true;
      else {
        if (0 === (a.lanes & c) && 0 === (b.flags & 128))
          return dh = false, yj(a, b, c);
        dh = 0 !== (a.flags & 131072) ? true : false;
      }
    else
      dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
    b.lanes = 0;
    switch (b.tag) {
      case 2:
        var d = b.type;
        ij(a, b);
        a = b.pendingProps;
        var e = Yf(b, H.current);
        ch(b, c);
        e = Nh(null, b, d, a, e, c);
        var f = Sh();
        b.flags |= 1;
        "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f = true, cg(b)) : f = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f, c)) : (b.tag = 0, I && f && vg(b), Xi(null, b, e, c), b = b.child);
        return b;
      case 16:
        d = b.elementType;
        a: {
          ij(a, b);
          a = b.pendingProps;
          e = d._init;
          d = e(d._payload);
          b.type = d;
          e = b.tag = Zk(d);
          a = Ci(d, a);
          switch (e) {
            case 0:
              b = cj(null, b, d, a, c);
              break a;
            case 1:
              b = hj(null, b, d, a, c);
              break a;
            case 11:
              b = Yi(null, b, d, a, c);
              break a;
            case 14:
              b = $i(null, b, d, Ci(d.type, a), c);
              break a;
          }
          throw Error(p(
            306,
            d,
            ""
          ));
        }
        return b;
      case 0:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
      case 1:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
      case 3:
        a: {
          kj(b);
          if (null === a)
            throw Error(p(387));
          d = b.pendingProps;
          f = b.memoizedState;
          e = f.element;
          lh(a, b);
          qh(b, d, null, c);
          var g = b.memoizedState;
          d = g.element;
          if (f.isDehydrated)
            if (f = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f, b.memoizedState = f, b.flags & 256) {
              e = Ji(Error(p(423)), b);
              b = lj(a, b, d, c, e);
              break a;
            } else if (d !== e) {
              e = Ji(Error(p(424)), b);
              b = lj(a, b, d, c, e);
              break a;
            } else
              for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; )
                c.flags = c.flags & -3 | 4096, c = c.sibling;
          else {
            Ig();
            if (d === e) {
              b = Zi(a, b, c);
              break a;
            }
            Xi(a, b, d, c);
          }
          b = b.child;
        }
        return b;
      case 5:
        return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f && Ef(d, f) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
      case 6:
        return null === a && Eg(b), null;
      case 13:
        return oj(a, b, c);
      case 4:
        return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
      case 11:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
      case 7:
        return Xi(a, b, b.pendingProps, c), b.child;
      case 8:
        return Xi(a, b, b.pendingProps.children, c), b.child;
      case 12:
        return Xi(a, b, b.pendingProps.children, c), b.child;
      case 10:
        a: {
          d = b.type._context;
          e = b.pendingProps;
          f = b.memoizedProps;
          g = e.value;
          G(Wg, d._currentValue);
          d._currentValue = g;
          if (null !== f)
            if (He(f.value, g)) {
              if (f.children === e.children && !Wf.current) {
                b = Zi(a, b, c);
                break a;
              }
            } else
              for (f = b.child, null !== f && (f.return = b); null !== f; ) {
                var h = f.dependencies;
                if (null !== h) {
                  g = f.child;
                  for (var k = h.firstContext; null !== k; ) {
                    if (k.context === d) {
                      if (1 === f.tag) {
                        k = mh(-1, c & -c);
                        k.tag = 2;
                        var l2 = f.updateQueue;
                        if (null !== l2) {
                          l2 = l2.shared;
                          var m2 = l2.pending;
                          null === m2 ? k.next = k : (k.next = m2.next, m2.next = k);
                          l2.pending = k;
                        }
                      }
                      f.lanes |= c;
                      k = f.alternate;
                      null !== k && (k.lanes |= c);
                      bh(
                        f.return,
                        c,
                        b
                      );
                      h.lanes |= c;
                      break;
                    }
                    k = k.next;
                  }
                } else if (10 === f.tag)
                  g = f.type === b.type ? null : f.child;
                else if (18 === f.tag) {
                  g = f.return;
                  if (null === g)
                    throw Error(p(341));
                  g.lanes |= c;
                  h = g.alternate;
                  null !== h && (h.lanes |= c);
                  bh(g, c, b);
                  g = f.sibling;
                } else
                  g = f.child;
                if (null !== g)
                  g.return = f;
                else
                  for (g = f; null !== g; ) {
                    if (g === b) {
                      g = null;
                      break;
                    }
                    f = g.sibling;
                    if (null !== f) {
                      f.return = g.return;
                      g = f;
                      break;
                    }
                    g = g.return;
                  }
                f = g;
              }
          Xi(a, b, e.children, c);
          b = b.child;
        }
        return b;
      case 9:
        return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
      case 14:
        return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
      case 15:
        return bj(a, b, b.type, b.pendingProps, c);
      case 17:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
      case 19:
        return xj(a, b, c);
      case 22:
        return dj(a, b, c);
    }
    throw Error(p(156, b.tag));
  };
  function Fk(a, b) {
    return ac(a, b);
  }
  function $k(a, b, c, d) {
    this.tag = a;
    this.key = c;
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
    this.index = 0;
    this.ref = null;
    this.pendingProps = b;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
    this.mode = d;
    this.subtreeFlags = this.flags = 0;
    this.deletions = null;
    this.childLanes = this.lanes = 0;
    this.alternate = null;
  }
  function Bg(a, b, c, d) {
    return new $k(a, b, c, d);
  }
  function aj(a) {
    a = a.prototype;
    return !(!a || !a.isReactComponent);
  }
  function Zk(a) {
    if ("function" === typeof a)
      return aj(a) ? 1 : 0;
    if (void 0 !== a && null !== a) {
      a = a.$$typeof;
      if (a === Da)
        return 11;
      if (a === Ga)
        return 14;
    }
    return 2;
  }
  function Pg(a, b) {
    var c = a.alternate;
    null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
    c.flags = a.flags & 14680064;
    c.childLanes = a.childLanes;
    c.lanes = a.lanes;
    c.child = a.child;
    c.memoizedProps = a.memoizedProps;
    c.memoizedState = a.memoizedState;
    c.updateQueue = a.updateQueue;
    b = a.dependencies;
    c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
    c.sibling = a.sibling;
    c.index = a.index;
    c.ref = a.ref;
    return c;
  }
  function Rg(a, b, c, d, e, f) {
    var g = 2;
    d = a;
    if ("function" === typeof a)
      aj(a) && (g = 1);
    else if ("string" === typeof a)
      g = 5;
    else
      a:
        switch (a) {
          case ya:
            return Tg(c.children, e, f, b);
          case za:
            g = 8;
            e |= 8;
            break;
          case Aa:
            return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f, a;
          case Ea:
            return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f, a;
          case Fa:
            return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f, a;
          case Ia:
            return pj(c, e, f, b);
          default:
            if ("object" === typeof a && null !== a)
              switch (a.$$typeof) {
                case Ba:
                  g = 10;
                  break a;
                case Ca:
                  g = 9;
                  break a;
                case Da:
                  g = 11;
                  break a;
                case Ga:
                  g = 14;
                  break a;
                case Ha:
                  g = 16;
                  d = null;
                  break a;
              }
            throw Error(p(130, null == a ? a : typeof a, ""));
        }
    b = Bg(g, c, b, e);
    b.elementType = a;
    b.type = d;
    b.lanes = f;
    return b;
  }
  function Tg(a, b, c, d) {
    a = Bg(7, a, d, b);
    a.lanes = c;
    return a;
  }
  function pj(a, b, c, d) {
    a = Bg(22, a, d, b);
    a.elementType = Ia;
    a.lanes = c;
    a.stateNode = { isHidden: false };
    return a;
  }
  function Qg(a, b, c) {
    a = Bg(6, a, null, b);
    a.lanes = c;
    return a;
  }
  function Sg(a, b, c) {
    b = Bg(4, null !== a.children ? a.children : [], a.key, b);
    b.lanes = c;
    b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
    return b;
  }
  function al(a, b, c, d, e) {
    this.tag = b;
    this.containerInfo = a;
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
    this.timeoutHandle = -1;
    this.callbackNode = this.pendingContext = this.context = null;
    this.callbackPriority = 0;
    this.eventTimes = zc(0);
    this.expirationTimes = zc(-1);
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
    this.entanglements = zc(0);
    this.identifierPrefix = d;
    this.onRecoverableError = e;
    this.mutableSourceEagerHydrationData = null;
  }
  function bl(a, b, c, d, e, f, g, h, k) {
    a = new al(a, b, c, h, k);
    1 === b ? (b = 1, true === f && (b |= 8)) : b = 0;
    f = Bg(3, null, null, b);
    a.current = f;
    f.stateNode = a;
    f.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
    kh(f);
    return a;
  }
  function cl(a, b, c) {
    var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
  }
  function dl(a) {
    if (!a)
      return Vf;
    a = a._reactInternals;
    a: {
      if (Vb(a) !== a || 1 !== a.tag)
        throw Error(p(170));
      var b = a;
      do {
        switch (b.tag) {
          case 3:
            b = b.stateNode.context;
            break a;
          case 1:
            if (Zf(b.type)) {
              b = b.stateNode.__reactInternalMemoizedMergedChildContext;
              break a;
            }
        }
        b = b.return;
      } while (null !== b);
      throw Error(p(171));
    }
    if (1 === a.tag) {
      var c = a.type;
      if (Zf(c))
        return bg(a, c, b);
    }
    return b;
  }
  function el(a, b, c, d, e, f, g, h, k) {
    a = bl(c, d, true, a, e, f, g, h, k);
    a.context = dl(null);
    c = a.current;
    d = R();
    e = yi(c);
    f = mh(d, e);
    f.callback = void 0 !== b && null !== b ? b : null;
    nh(c, f, e);
    a.current.lanes = e;
    Ac(a, e, d);
    Dk(a, d);
    return a;
  }
  function fl(a, b, c, d) {
    var e = b.current, f = R(), g = yi(e);
    c = dl(c);
    null === b.context ? b.context = c : b.pendingContext = c;
    b = mh(f, g);
    b.payload = { element: a };
    d = void 0 === d ? null : d;
    null !== d && (b.callback = d);
    a = nh(e, b, g);
    null !== a && (gi(a, e, g, f), oh(a, e, g));
    return g;
  }
  function gl(a) {
    a = a.current;
    if (!a.child)
      return null;
    switch (a.child.tag) {
      case 5:
        return a.child.stateNode;
      default:
        return a.child.stateNode;
    }
  }
  function hl(a, b) {
    a = a.memoizedState;
    if (null !== a && null !== a.dehydrated) {
      var c = a.retryLane;
      a.retryLane = 0 !== c && c < b ? c : b;
    }
  }
  function il(a, b) {
    hl(a, b);
    (a = a.alternate) && hl(a, b);
  }
  function jl() {
    return null;
  }
  var kl = "function" === typeof reportError ? reportError : function(a) {
    console.error(a);
  };
  function ll(a) {
    this._internalRoot = a;
  }
  ml.prototype.render = ll.prototype.render = function(a) {
    var b = this._internalRoot;
    if (null === b)
      throw Error(p(409));
    fl(a, b, null, null);
  };
  ml.prototype.unmount = ll.prototype.unmount = function() {
    var a = this._internalRoot;
    if (null !== a) {
      this._internalRoot = null;
      var b = a.containerInfo;
      Rk(function() {
        fl(null, a, null, null);
      });
      b[uf] = null;
    }
  };
  function ml(a) {
    this._internalRoot = a;
  }
  ml.prototype.unstable_scheduleHydration = function(a) {
    if (a) {
      var b = Hc();
      a = { blockedOn: null, target: a, priority: b };
      for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++)
        ;
      Qc.splice(c, 0, a);
      0 === c && Vc(a);
    }
  };
  function nl(a) {
    return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
  }
  function ol(a) {
    return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
  }
  function pl() {
  }
  function ql(a, b, c, d, e) {
    if (e) {
      if ("function" === typeof d) {
        var f = d;
        d = function() {
          var a2 = gl(g);
          f.call(a2);
        };
      }
      var g = el(b, d, a, 0, null, false, false, "", pl);
      a._reactRootContainer = g;
      a[uf] = g.current;
      sf(8 === a.nodeType ? a.parentNode : a);
      Rk();
      return g;
    }
    for (; e = a.lastChild; )
      a.removeChild(e);
    if ("function" === typeof d) {
      var h = d;
      d = function() {
        var a2 = gl(k);
        h.call(a2);
      };
    }
    var k = bl(a, 0, false, null, null, false, false, "", pl);
    a._reactRootContainer = k;
    a[uf] = k.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Rk(function() {
      fl(b, k, c, d);
    });
    return k;
  }
  function rl(a, b, c, d, e) {
    var f = c._reactRootContainer;
    if (f) {
      var g = f;
      if ("function" === typeof e) {
        var h = e;
        e = function() {
          var a2 = gl(g);
          h.call(a2);
        };
      }
      fl(b, g, a, e);
    } else
      g = ql(c, b, a, e, d);
    return gl(g);
  }
  Ec = function(a) {
    switch (a.tag) {
      case 3:
        var b = a.stateNode;
        if (b.current.memoizedState.isDehydrated) {
          var c = tc(b.pendingLanes);
          0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
        }
        break;
      case 13:
        Rk(function() {
          var b2 = ih(a, 1);
          if (null !== b2) {
            var c2 = R();
            gi(b2, a, 1, c2);
          }
        }), il(a, 1);
    }
  };
  Fc = function(a) {
    if (13 === a.tag) {
      var b = ih(a, 134217728);
      if (null !== b) {
        var c = R();
        gi(b, a, 134217728, c);
      }
      il(a, 134217728);
    }
  };
  Gc = function(a) {
    if (13 === a.tag) {
      var b = yi(a), c = ih(a, b);
      if (null !== c) {
        var d = R();
        gi(c, a, b, d);
      }
      il(a, b);
    }
  };
  Hc = function() {
    return C;
  };
  Ic = function(a, b) {
    var c = C;
    try {
      return C = a, b();
    } finally {
      C = c;
    }
  };
  yb = function(a, b, c) {
    switch (b) {
      case "input":
        bb(a, c);
        b = c.name;
        if ("radio" === c.type && null != b) {
          for (c = a; c.parentNode; )
            c = c.parentNode;
          c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
          for (b = 0; b < c.length; b++) {
            var d = c[b];
            if (d !== a && d.form === a.form) {
              var e = Db(d);
              if (!e)
                throw Error(p(90));
              Wa(d);
              bb(d, e);
            }
          }
        }
        break;
      case "textarea":
        ib(a, c);
        break;
      case "select":
        b = c.value, null != b && fb(a, !!c.multiple, b, false);
    }
  };
  Gb = Qk;
  Hb = Rk;
  var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
  var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
    a = Zb(a);
    return null === a ? null : a.stateNode;
  }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
    var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!vl.isDisabled && vl.supportsFiber)
      try {
        kc = vl.inject(ul), lc = vl;
      } catch (a) {
      }
  }
  reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
  reactDom_production_min.createPortal = function(a, b) {
    var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!nl(b))
      throw Error(p(200));
    return cl(a, b, null, c);
  };
  reactDom_production_min.createRoot = function(a, b) {
    if (!nl(a))
      throw Error(p(299));
    var c = false, d = "", e = kl;
    null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
    b = bl(a, 1, false, null, null, c, false, d, e);
    a[uf] = b.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    return new ll(b);
  };
  reactDom_production_min.findDOMNode = function(a) {
    if (null == a)
      return null;
    if (1 === a.nodeType)
      return a;
    var b = a._reactInternals;
    if (void 0 === b) {
      if ("function" === typeof a.render)
        throw Error(p(188));
      a = Object.keys(a).join(",");
      throw Error(p(268, a));
    }
    a = Zb(b);
    a = null === a ? null : a.stateNode;
    return a;
  };
  reactDom_production_min.flushSync = function(a) {
    return Rk(a);
  };
  reactDom_production_min.hydrate = function(a, b, c) {
    if (!ol(b))
      throw Error(p(200));
    return rl(null, a, b, true, c);
  };
  reactDom_production_min.hydrateRoot = function(a, b, c) {
    if (!nl(a))
      throw Error(p(405));
    var d = null != c && c.hydratedSources || null, e = false, f = "", g = kl;
    null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
    b = el(b, null, a, 1, null != c ? c : null, e, false, f, g);
    a[uf] = b.current;
    sf(a);
    if (d)
      for (a = 0; a < d.length; a++)
        c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
          c,
          e
        );
    return new ml(b);
  };
  reactDom_production_min.render = function(a, b, c) {
    if (!ol(b))
      throw Error(p(200));
    return rl(null, a, b, false, c);
  };
  reactDom_production_min.unmountComponentAtNode = function(a) {
    if (!ol(a))
      throw Error(p(40));
    return a._reactRootContainer ? (Rk(function() {
      rl(null, null, a, false, function() {
        a._reactRootContainer = null;
        a[uf] = null;
      });
    }), true) : false;
  };
  reactDom_production_min.unstable_batchedUpdates = Qk;
  reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
    if (!ol(c))
      throw Error(p(200));
    if (null == a || void 0 === a._reactInternals)
      throw Error(p(38));
    return rl(a, b, c, false, d);
  };
  reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
  function checkDCE() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
      return;
    }
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
    } catch (err) {
      console.error(err);
    }
  }
  {
    checkDCE();
    reactDom.exports = reactDom_production_min;
  }
  var reactDomExports = reactDom.exports;
  const ReactDOM = /* @__PURE__ */ getDefaultExportFromCjs(reactDomExports);
  var createRoot;
  var m = reactDomExports;
  {
    createRoot = m.createRoot;
    m.hydrateRoot;
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (excluded.indexOf(key) >= 0)
          continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  var classnames = { exports: {} };
  /*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  */
  (function(module) {
    (function() {
      var hasOwn = {}.hasOwnProperty;
      function classNames2() {
        var classes = "";
        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
          if (arg) {
            classes = appendClass(classes, parseValue(arg));
          }
        }
        return classes;
      }
      function parseValue(arg) {
        if (typeof arg === "string" || typeof arg === "number") {
          return arg;
        }
        if (typeof arg !== "object") {
          return "";
        }
        if (Array.isArray(arg)) {
          return classNames2.apply(null, arg);
        }
        if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
          return arg.toString();
        }
        var classes = "";
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes = appendClass(classes, key);
          }
        }
        return classes;
      }
      function appendClass(value, newClass) {
        if (!newClass) {
          return value;
        }
        if (value) {
          return value + " " + newClass;
        }
        return value + newClass;
      }
      if (module.exports) {
        classNames2.default = classNames2;
        module.exports = classNames2;
      } else {
        window.classNames = classNames2;
      }
    })();
  })(classnames);
  var classnamesExports = classnames.exports;
  const classNames = /* @__PURE__ */ getDefaultExportFromCjs(classnamesExports);
  function defaultKey(key) {
    return "default" + key.charAt(0).toUpperCase() + key.substr(1);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null)
      return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint);
      if (typeof res !== "object")
        return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return String(input);
  }
  function useUncontrolledProp(propValue, defaultValue, handler) {
    var wasPropRef = reactExports.useRef(propValue !== void 0);
    var _useState = reactExports.useState(defaultValue), stateValue = _useState[0], setState = _useState[1];
    var isProp = propValue !== void 0;
    var wasProp = wasPropRef.current;
    wasPropRef.current = isProp;
    if (!isProp && wasProp && stateValue !== defaultValue) {
      setState(defaultValue);
    }
    return [isProp ? propValue : stateValue, reactExports.useCallback(function(value) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      if (handler)
        handler.apply(void 0, [value].concat(args));
      setState(value);
    }, [handler])];
  }
  function useUncontrolled(props, config2) {
    return Object.keys(config2).reduce(function(result, fieldName) {
      var _extends2;
      var _ref = result, defaultValue = _ref[defaultKey(fieldName)], propsValue = _ref[fieldName], rest = _objectWithoutPropertiesLoose(_ref, [defaultKey(fieldName), fieldName].map(_toPropertyKey));
      var handlerName = config2[fieldName];
      var _useUncontrolledProp = useUncontrolledProp(propsValue, defaultValue, props[handlerName]), value = _useUncontrolledProp[0], handler = _useUncontrolledProp[1];
      return _extends({}, rest, (_extends2 = {}, _extends2[fieldName] = value, _extends2[handlerName] = handler, _extends2));
    }, props);
  }
  function _setPrototypeOf(o, p2) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p3) {
      o2.__proto__ = p3;
      return o2;
    };
    return _setPrototypeOf(o, p2);
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  var ThemeContext = /* @__PURE__ */ React.createContext({});
  ThemeContext.Consumer;
  ThemeContext.Provider;
  function useBootstrapPrefix(prefix, defaultPrefix) {
    var prefixes = reactExports.useContext(ThemeContext);
    return prefix || prefixes[defaultPrefix] || defaultPrefix;
  }
  var SelectableContext = /* @__PURE__ */ React.createContext(null);
  var makeEventKey = function makeEventKey2(eventKey, href) {
    if (href === void 0) {
      href = null;
    }
    if (eventKey != null)
      return String(eventKey);
    return href || null;
  };
  function ownerDocument(node) {
    return node && node.ownerDocument || document;
  }
  function ownerWindow(node) {
    var doc = ownerDocument(node);
    return doc && doc.defaultView || window;
  }
  function getComputedStyle(node, psuedoElement) {
    return ownerWindow(node).getComputedStyle(node, psuedoElement);
  }
  var rUpper = /([A-Z])/g;
  function hyphenate(string) {
    return string.replace(rUpper, "-$1").toLowerCase();
  }
  var msPattern = /^ms-/;
  function hyphenateStyleName(string) {
    return hyphenate(string).replace(msPattern, "-ms-");
  }
  var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
  function isTransform(value) {
    return !!(value && supportedTransforms.test(value));
  }
  function style(node, property) {
    var css = "";
    var transforms = "";
    if (typeof property === "string") {
      return node.style.getPropertyValue(hyphenateStyleName(property)) || getComputedStyle(node).getPropertyValue(hyphenateStyleName(property));
    }
    Object.keys(property).forEach(function(key) {
      var value = property[key];
      if (!value && value !== 0) {
        node.style.removeProperty(hyphenateStyleName(key));
      } else if (isTransform(key)) {
        transforms += key + "(" + value + ") ";
      } else {
        css += hyphenateStyleName(key) + ": " + value + ";";
      }
    });
    if (transforms) {
      css += "transform: " + transforms + ";";
    }
    node.style.cssText += ";" + css;
  }
  var propTypes$3 = { exports: {} };
  var ReactPropTypesSecret$1 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;
  var ReactPropTypesSecret = ReactPropTypesSecret_1;
  function emptyFunction() {
  }
  function emptyFunctionWithReset() {
  }
  emptyFunctionWithReset.resetWarningCache = emptyFunction;
  var factoryWithThrowingShims = function() {
    function shim(props, propName, componentName, location2, propFullName, secret) {
      if (secret === ReactPropTypesSecret) {
        return;
      }
      var err = new Error(
        "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
      );
      err.name = "Invariant Violation";
      throw err;
    }
    shim.isRequired = shim;
    function getShim() {
      return shim;
    }
    var ReactPropTypes = {
      array: shim,
      bool: shim,
      func: shim,
      number: shim,
      object: shim,
      string: shim,
      symbol: shim,
      any: shim,
      arrayOf: getShim,
      element: shim,
      elementType: shim,
      instanceOf: getShim,
      node: shim,
      objectOf: getShim,
      oneOf: getShim,
      oneOfType: getShim,
      shape: getShim,
      exact: getShim,
      checkPropTypes: emptyFunctionWithReset,
      resetWarningCache: emptyFunction
    };
    ReactPropTypes.PropTypes = ReactPropTypes;
    return ReactPropTypes;
  };
  {
    propTypes$3.exports = factoryWithThrowingShims();
  }
  var propTypesExports = propTypes$3.exports;
  const PropTypes = /* @__PURE__ */ getDefaultExportFromCjs(propTypesExports);
  const config = {
    disabled: false
  };
  const TransitionGroupContext = React.createContext(null);
  var UNMOUNTED = "unmounted";
  var EXITED = "exited";
  var ENTERING = "entering";
  var ENTERED = "entered";
  var EXITING = "exiting";
  var Transition = /* @__PURE__ */ function(_React$Component) {
    _inheritsLoose(Transition2, _React$Component);
    function Transition2(props, context2) {
      var _this;
      _this = _React$Component.call(this, props, context2) || this;
      var parentGroup = context2;
      var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
      var initialStatus;
      _this.appearStatus = null;
      if (props.in) {
        if (appear) {
          initialStatus = EXITED;
          _this.appearStatus = ENTERING;
        } else {
          initialStatus = ENTERED;
        }
      } else {
        if (props.unmountOnExit || props.mountOnEnter) {
          initialStatus = UNMOUNTED;
        } else {
          initialStatus = EXITED;
        }
      }
      _this.state = {
        status: initialStatus
      };
      _this.nextCallback = null;
      return _this;
    }
    Transition2.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
      var nextIn = _ref.in;
      if (nextIn && prevState.status === UNMOUNTED) {
        return {
          status: EXITED
        };
      }
      return null;
    };
    var _proto = Transition2.prototype;
    _proto.componentDidMount = function componentDidMount() {
      this.updateStatus(true, this.appearStatus);
    };
    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      var nextStatus = null;
      if (prevProps !== this.props) {
        var status = this.state.status;
        if (this.props.in) {
          if (status !== ENTERING && status !== ENTERED) {
            nextStatus = ENTERING;
          }
        } else {
          if (status === ENTERING || status === ENTERED) {
            nextStatus = EXITING;
          }
        }
      }
      this.updateStatus(false, nextStatus);
    };
    _proto.componentWillUnmount = function componentWillUnmount() {
      this.cancelNextCallback();
    };
    _proto.getTimeouts = function getTimeouts() {
      var timeout2 = this.props.timeout;
      var exit, enter, appear;
      exit = enter = appear = timeout2;
      if (timeout2 != null && typeof timeout2 !== "number") {
        exit = timeout2.exit;
        enter = timeout2.enter;
        appear = timeout2.appear !== void 0 ? timeout2.appear : enter;
      }
      return {
        exit,
        enter,
        appear
      };
    };
    _proto.updateStatus = function updateStatus(mounting, nextStatus) {
      if (mounting === void 0) {
        mounting = false;
      }
      if (nextStatus !== null) {
        this.cancelNextCallback();
        if (nextStatus === ENTERING) {
          this.performEnter(mounting);
        } else {
          this.performExit();
        }
      } else if (this.props.unmountOnExit && this.state.status === EXITED) {
        this.setState({
          status: UNMOUNTED
        });
      }
    };
    _proto.performEnter = function performEnter(mounting) {
      var _this2 = this;
      var enter = this.props.enter;
      var appearing = this.context ? this.context.isMounting : mounting;
      var _ref2 = this.props.nodeRef ? [appearing] : [ReactDOM.findDOMNode(this), appearing], maybeNode = _ref2[0], maybeAppearing = _ref2[1];
      var timeouts = this.getTimeouts();
      var enterTimeout = appearing ? timeouts.appear : timeouts.enter;
      if (!mounting && !enter || config.disabled) {
        this.safeSetState({
          status: ENTERED
        }, function() {
          _this2.props.onEntered(maybeNode);
        });
        return;
      }
      this.props.onEnter(maybeNode, maybeAppearing);
      this.safeSetState({
        status: ENTERING
      }, function() {
        _this2.props.onEntering(maybeNode, maybeAppearing);
        _this2.onTransitionEnd(enterTimeout, function() {
          _this2.safeSetState({
            status: ENTERED
          }, function() {
            _this2.props.onEntered(maybeNode, maybeAppearing);
          });
        });
      });
    };
    _proto.performExit = function performExit() {
      var _this3 = this;
      var exit = this.props.exit;
      var timeouts = this.getTimeouts();
      var maybeNode = this.props.nodeRef ? void 0 : ReactDOM.findDOMNode(this);
      if (!exit || config.disabled) {
        this.safeSetState({
          status: EXITED
        }, function() {
          _this3.props.onExited(maybeNode);
        });
        return;
      }
      this.props.onExit(maybeNode);
      this.safeSetState({
        status: EXITING
      }, function() {
        _this3.props.onExiting(maybeNode);
        _this3.onTransitionEnd(timeouts.exit, function() {
          _this3.safeSetState({
            status: EXITED
          }, function() {
            _this3.props.onExited(maybeNode);
          });
        });
      });
    };
    _proto.cancelNextCallback = function cancelNextCallback() {
      if (this.nextCallback !== null) {
        this.nextCallback.cancel();
        this.nextCallback = null;
      }
    };
    _proto.safeSetState = function safeSetState(nextState, callback) {
      callback = this.setNextCallback(callback);
      this.setState(nextState, callback);
    };
    _proto.setNextCallback = function setNextCallback(callback) {
      var _this4 = this;
      var active = true;
      this.nextCallback = function(event) {
        if (active) {
          active = false;
          _this4.nextCallback = null;
          callback(event);
        }
      };
      this.nextCallback.cancel = function() {
        active = false;
      };
      return this.nextCallback;
    };
    _proto.onTransitionEnd = function onTransitionEnd(timeout2, handler) {
      this.setNextCallback(handler);
      var node = this.props.nodeRef ? this.props.nodeRef.current : ReactDOM.findDOMNode(this);
      var doesNotHaveTimeoutOrListener = timeout2 == null && !this.props.addEndListener;
      if (!node || doesNotHaveTimeoutOrListener) {
        setTimeout(this.nextCallback, 0);
        return;
      }
      if (this.props.addEndListener) {
        var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback], maybeNode = _ref3[0], maybeNextCallback = _ref3[1];
        this.props.addEndListener(maybeNode, maybeNextCallback);
      }
      if (timeout2 != null) {
        setTimeout(this.nextCallback, timeout2);
      }
    };
    _proto.render = function render() {
      var status = this.state.status;
      if (status === UNMOUNTED) {
        return null;
      }
      var _this$props = this.props, children = _this$props.children;
      _this$props.in;
      _this$props.mountOnEnter;
      _this$props.unmountOnExit;
      _this$props.appear;
      _this$props.enter;
      _this$props.exit;
      _this$props.timeout;
      _this$props.addEndListener;
      _this$props.onEnter;
      _this$props.onEntering;
      _this$props.onEntered;
      _this$props.onExit;
      _this$props.onExiting;
      _this$props.onExited;
      _this$props.nodeRef;
      var childProps = _objectWithoutPropertiesLoose(_this$props, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
      return (
        // allows for nested Transitions
        /* @__PURE__ */ React.createElement(TransitionGroupContext.Provider, {
          value: null
        }, typeof children === "function" ? children(status, childProps) : React.cloneElement(React.Children.only(children), childProps))
      );
    };
    return Transition2;
  }(React.Component);
  Transition.contextType = TransitionGroupContext;
  Transition.propTypes = {};
  function noop$1() {
  }
  Transition.defaultProps = {
    in: false,
    mountOnEnter: false,
    unmountOnExit: false,
    appear: false,
    enter: true,
    exit: true,
    onEnter: noop$1,
    onEntering: noop$1,
    onEntered: noop$1,
    onExit: noop$1,
    onExiting: noop$1,
    onExited: noop$1
  };
  Transition.UNMOUNTED = UNMOUNTED;
  Transition.EXITED = EXITED;
  Transition.ENTERING = ENTERING;
  Transition.ENTERED = ENTERED;
  Transition.EXITING = EXITING;
  const Transition$1 = Transition;
  const canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
  var optionsSupported = false;
  var onceSupported = false;
  try {
    var options = {
      get passive() {
        return optionsSupported = true;
      },
      get once() {
        return onceSupported = optionsSupported = true;
      }
    };
    if (canUseDOM) {
      window.addEventListener("test", options, options);
      window.removeEventListener("test", options, true);
    }
  } catch (e) {
  }
  function addEventListener(node, eventName, handler, options2) {
    if (options2 && typeof options2 !== "boolean" && !onceSupported) {
      var once = options2.once, capture = options2.capture;
      var wrappedHandler = handler;
      if (!onceSupported && once) {
        wrappedHandler = handler.__once || function onceHandler(event) {
          this.removeEventListener(eventName, onceHandler, capture);
          handler.call(this, event);
        };
        handler.__once = wrappedHandler;
      }
      node.addEventListener(eventName, wrappedHandler, optionsSupported ? options2 : capture);
    }
    node.addEventListener(eventName, handler, options2);
  }
  function removeEventListener(node, eventName, handler, options2) {
    var capture = options2 && typeof options2 !== "boolean" ? options2.capture : options2;
    node.removeEventListener(eventName, handler, capture);
    if (handler.__once) {
      node.removeEventListener(eventName, handler.__once, capture);
    }
  }
  function listen(node, eventName, handler, options2) {
    addEventListener(node, eventName, handler, options2);
    return function() {
      removeEventListener(node, eventName, handler, options2);
    };
  }
  function triggerEvent(node, eventName, bubbles, cancelable) {
    if (cancelable === void 0) {
      cancelable = true;
    }
    if (node) {
      var event = document.createEvent("HTMLEvents");
      event.initEvent(eventName, bubbles, cancelable);
      node.dispatchEvent(event);
    }
  }
  function parseDuration$1(node) {
    var str = style(node, "transitionDuration") || "";
    var mult = str.indexOf("ms") === -1 ? 1e3 : 1;
    return parseFloat(str) * mult;
  }
  function emulateTransitionEnd(element, duration, padding) {
    if (padding === void 0) {
      padding = 5;
    }
    var called = false;
    var handle = setTimeout(function() {
      if (!called)
        triggerEvent(element, "transitionend", true);
    }, duration + padding);
    var remove = listen(element, "transitionend", function() {
      called = true;
    }, {
      once: true
    });
    return function() {
      clearTimeout(handle);
      remove();
    };
  }
  function transitionEnd(element, handler, duration, padding) {
    if (duration == null)
      duration = parseDuration$1(element) || 0;
    var removeEmulate = emulateTransitionEnd(element, duration, padding);
    var remove = listen(element, "transitionend", handler);
    return function() {
      removeEmulate();
      remove();
    };
  }
  function parseDuration(node, property) {
    var str = style(node, property) || "";
    var mult = str.indexOf("ms") === -1 ? 1e3 : 1;
    return parseFloat(str) * mult;
  }
  function transitionEndListener(element, handler) {
    var duration = parseDuration(element, "transitionDuration");
    var delay = parseDuration(element, "transitionDelay");
    var remove = transitionEnd(element, function(e) {
      if (e.target === element) {
        remove();
        handler(e);
      }
    }, duration + delay);
  }
  function createChainedFunction() {
    for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
      funcs[_key] = arguments[_key];
    }
    return funcs.filter(function(f) {
      return f != null;
    }).reduce(function(acc, f) {
      if (typeof f !== "function") {
        throw new Error("Invalid Argument Type, must only provide functions, undefined, or null.");
      }
      if (acc === null)
        return f;
      return function chainedFunction() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        acc.apply(this, args);
        f.apply(this, args);
      };
    }, null);
  }
  function triggerBrowserReflow(node) {
    node.offsetHeight;
  }
  function useCommittedRef(value) {
    const ref = reactExports.useRef(value);
    reactExports.useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref;
  }
  function useEventCallback(fn) {
    const ref = useCommittedRef(fn);
    return reactExports.useCallback(function(...args) {
      return ref.current && ref.current(...args);
    }, [ref]);
  }
  var _excluded$j = ["className", "children"];
  var _fadeStyles;
  var defaultProps$8 = {
    in: false,
    timeout: 300,
    mountOnEnter: false,
    unmountOnExit: false,
    appear: false
  };
  var fadeStyles = (_fadeStyles = {}, _fadeStyles[ENTERING] = "show", _fadeStyles[ENTERED] = "show", _fadeStyles);
  var Fade = /* @__PURE__ */ React.forwardRef(function(_ref, ref) {
    var className = _ref.className, children = _ref.children, props = _objectWithoutPropertiesLoose(_ref, _excluded$j);
    var handleEnter = reactExports.useCallback(function(node) {
      triggerBrowserReflow(node);
      if (props.onEnter)
        props.onEnter(node);
    }, [props]);
    return /* @__PURE__ */ React.createElement(Transition$1, _extends({
      ref,
      addEndListener: transitionEndListener
    }, props, {
      onEnter: handleEnter
    }), function(status, innerProps) {
      return /* @__PURE__ */ React.cloneElement(children, _extends({}, innerProps, {
        className: classNames("fade", className, children.props.className, fadeStyles[status])
      }));
    });
  });
  Fade.defaultProps = defaultProps$8;
  Fade.displayName = "Fade";
  var _excluded$i = ["label", "onClick", "className"];
  var propTypes$2 = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func
  };
  var defaultProps$7 = {
    label: "Close"
  };
  var CloseButton = /* @__PURE__ */ React.forwardRef(function(_ref, ref) {
    var label = _ref.label, onClick = _ref.onClick, className = _ref.className, props = _objectWithoutPropertiesLoose(_ref, _excluded$i);
    return /* @__PURE__ */ React.createElement("button", _extends({
      ref,
      type: "button",
      className: classNames("close", className),
      onClick
    }, props), /* @__PURE__ */ React.createElement("span", {
      "aria-hidden": "true"
    }, "×"), /* @__PURE__ */ React.createElement("span", {
      className: "sr-only"
    }, label));
  });
  CloseButton.displayName = "CloseButton";
  CloseButton.propTypes = propTypes$2;
  CloseButton.defaultProps = defaultProps$7;
  const divWithClassName = function(className) {
    return /* @__PURE__ */ React.forwardRef(function(p2, ref) {
      return /* @__PURE__ */ React.createElement("div", _extends({}, p2, {
        ref,
        className: classNames(p2.className, className)
      }));
    });
  };
  var rHyphen = /-(.)/g;
  function camelize(string) {
    return string.replace(rHyphen, function(_, chr) {
      return chr.toUpperCase();
    });
  }
  var _excluded$h = ["className", "bsPrefix", "as"];
  var pascalCase = function pascalCase2(str) {
    return str[0].toUpperCase() + camelize(str).slice(1);
  };
  function createWithBsPrefix(prefix, _temp) {
    var _ref = _temp === void 0 ? {} : _temp, _ref$displayName = _ref.displayName, displayName = _ref$displayName === void 0 ? pascalCase(prefix) : _ref$displayName, Component = _ref.Component, defaultProps2 = _ref.defaultProps;
    var BsComponent = /* @__PURE__ */ React.forwardRef(function(_ref2, ref) {
      var className = _ref2.className, bsPrefix = _ref2.bsPrefix, _ref2$as = _ref2.as, Tag = _ref2$as === void 0 ? Component || "div" : _ref2$as, props = _objectWithoutPropertiesLoose(_ref2, _excluded$h);
      var resolvedPrefix = useBootstrapPrefix(bsPrefix, prefix);
      return /* @__PURE__ */ React.createElement(Tag, _extends({
        ref,
        className: classNames(className, resolvedPrefix)
      }, props));
    });
    BsComponent.defaultProps = defaultProps2;
    BsComponent.displayName = displayName;
    return BsComponent;
  }
  var _excluded$g = ["as", "disabled", "onKeyDown"];
  function isTrivialHref(href) {
    return !href || href.trim() === "#";
  }
  var SafeAnchor = /* @__PURE__ */ React.forwardRef(function(_ref, ref) {
    var _ref$as = _ref.as, Component = _ref$as === void 0 ? "a" : _ref$as, disabled = _ref.disabled, onKeyDown = _ref.onKeyDown, props = _objectWithoutPropertiesLoose(_ref, _excluded$g);
    var handleClick = function handleClick2(event) {
      var href = props.href, onClick = props.onClick;
      if (disabled || isTrivialHref(href)) {
        event.preventDefault();
      }
      if (disabled) {
        event.stopPropagation();
        return;
      }
      if (onClick) {
        onClick(event);
      }
    };
    var handleKeyDown = function handleKeyDown2(event) {
      if (event.key === " ") {
        event.preventDefault();
        handleClick(event);
      }
    };
    if (isTrivialHref(props.href)) {
      props.role = props.role || "button";
      props.href = props.href || "#";
    }
    if (disabled) {
      props.tabIndex = -1;
      props["aria-disabled"] = true;
    }
    return /* @__PURE__ */ React.createElement(Component, _extends({
      ref
    }, props, {
      onClick: handleClick,
      onKeyDown: createChainedFunction(handleKeyDown, onKeyDown)
    }));
  });
  SafeAnchor.displayName = "SafeAnchor";
  var _excluded$f = ["bsPrefix", "variant", "size", "active", "className", "block", "type", "as"];
  var defaultProps$6 = {
    variant: "primary",
    active: false,
    disabled: false
  };
  var Button = /* @__PURE__ */ React.forwardRef(function(_ref, ref) {
    var bsPrefix = _ref.bsPrefix, variant = _ref.variant, size2 = _ref.size, active = _ref.active, className = _ref.className, block = _ref.block, type = _ref.type, as = _ref.as, props = _objectWithoutPropertiesLoose(_ref, _excluded$f);
    var prefix = useBootstrapPrefix(bsPrefix, "btn");
    var classes = classNames(className, prefix, active && "active", variant && prefix + "-" + variant, block && prefix + "-block", size2 && prefix + "-" + size2);
    if (props.href) {
      return /* @__PURE__ */ React.createElement(SafeAnchor, _extends({}, props, {
        as,
        ref,
        className: classNames(classes, props.disabled && "disabled")
      }));
    }
    if (ref) {
      props.ref = ref;
    }
    if (type) {
      props.type = type;
    } else if (!as) {
      props.type = "button";
    }
    var Component = as || "button";
    return /* @__PURE__ */ React.createElement(Component, _extends({}, props, {
      className: classes
    }));
  });
  Button.displayName = "Button";
  Button.defaultProps = defaultProps$6;
  var context$1 = /* @__PURE__ */ React.createContext(null);
  context$1.displayName = "CardContext";
  function useMounted() {
    const mounted = reactExports.useRef(true);
    const isMounted = reactExports.useRef(() => mounted.current);
    reactExports.useEffect(() => {
      mounted.current = true;
      return () => {
        mounted.current = false;
      };
    }, []);
    return isMounted.current;
  }
  function useUpdatedRef(value) {
    const valueRef = reactExports.useRef(value);
    valueRef.current = value;
    return valueRef;
  }
  function useWillUnmount(fn) {
    const onUnmount = useUpdatedRef(fn);
    reactExports.useEffect(() => () => onUnmount.current(), []);
  }
  function map(children, func) {
    var index = 0;
    return React.Children.map(children, function(child) {
      return /* @__PURE__ */ React.isValidElement(child) ? func(child, index++) : child;
    });
  }
  function forEach(children, func) {
    var index = 0;
    React.Children.forEach(children, function(child) {
      if (/* @__PURE__ */ React.isValidElement(child))
        func(child, index++);
    });
  }
  var toArray = Function.prototype.bind.call(Function.prototype.call, [].slice);
  function qsa(element, selector) {
    return toArray(element.querySelectorAll(selector));
  }
  function usePrevious(value) {
    const ref = reactExports.useRef(null);
    reactExports.useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  function useForceUpdate() {
    const [, dispatch] = reactExports.useReducer((state) => !state, false);
    return dispatch;
  }
  function useCallbackRef() {
    return reactExports.useState(null);
  }
  function contains(context2, node) {
    if (context2.contains)
      return context2.contains(node);
    if (context2.compareDocumentPosition)
      return context2 === node || !!(context2.compareDocumentPosition(node) & 16);
  }
  var NavContext = /* @__PURE__ */ React.createContext(null);
  NavContext.displayName = "NavContext";
  const toFnRef = (ref) => !ref || typeof ref === "function" ? ref : (value) => {
    ref.current = value;
  };
  function mergeRefs(refA, refB) {
    const a = toFnRef(refA);
    const b = toFnRef(refB);
    return (value) => {
      if (a)
        a(value);
      if (b)
        b(value);
    };
  }
  function useMergedRefs(refA, refB) {
    return reactExports.useMemo(() => mergeRefs(refA, refB), [refA, refB]);
  }
  var context = /* @__PURE__ */ React.createContext(null);
  context.displayName = "NavbarContext";
  function hasClass(element, className) {
    if (element.classList)
      return !!className && element.classList.contains(className);
    return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
  }
  var isRequiredForA11y = { exports: {} };
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isRequiredForA11y2;
    function isRequiredForA11y2(validator) {
      return function validate(props, propName, componentName, location2, propFullName) {
        var componentNameSafe = componentName || "<<anonymous>>";
        var propFullNameSafe = propFullName || propName;
        if (props[propName] == null) {
          return new Error("The " + location2 + " `" + propFullNameSafe + "` is required to make " + ("`" + componentNameSafe + "` accessible for users of assistive ") + "technologies such as screen readers.");
        }
        for (var _len = arguments.length, args = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
          args[_key - 5] = arguments[_key];
        }
        return validator.apply(void 0, [props, propName, componentName, location2, propFullName].concat(args));
      };
    }
    module.exports = exports["default"];
  })(isRequiredForA11y, isRequiredForA11y.exports);
  var all = { exports: {} };
  var createChainableTypeChecker = { exports: {} };
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = createChainableTypeChecker2;
    function createChainableTypeChecker2(validate) {
      function checkType(isRequired, props, propName, componentName, location2, propFullName) {
        var componentNameSafe = componentName || "<<anonymous>>";
        var propFullNameSafe = propFullName || propName;
        if (props[propName] == null) {
          if (isRequired) {
            return new Error("Required " + location2 + " `" + propFullNameSafe + "` was not specified " + ("in `" + componentNameSafe + "`."));
          }
          return null;
        }
        for (var _len = arguments.length, args = Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
          args[_key - 6] = arguments[_key];
        }
        return validate.apply(void 0, [props, propName, componentNameSafe, location2, propFullNameSafe].concat(args));
      }
      var chainedCheckType = checkType.bind(null, false);
      chainedCheckType.isRequired = checkType.bind(null, true);
      return chainedCheckType;
    }
    module.exports = exports["default"];
  })(createChainableTypeChecker, createChainableTypeChecker.exports);
  var createChainableTypeCheckerExports = createChainableTypeChecker.exports;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = all2;
    var _createChainableTypeChecker = createChainableTypeCheckerExports;
    var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function all2() {
      for (var _len = arguments.length, validators = Array(_len), _key = 0; _key < _len; _key++) {
        validators[_key] = arguments[_key];
      }
      function allPropTypes() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        var error = null;
        validators.forEach(function(validator) {
          if (error != null) {
            return;
          }
          var result = validator.apply(void 0, args);
          if (result != null) {
            error = result;
          }
        });
        return error;
      }
      return (0, _createChainableTypeChecker2.default)(allPropTypes);
    }
    module.exports = exports["default"];
  })(all, all.exports);
  var _excluded$e = ["as", "className", "type", "tooltip"];
  var propTypes$1 = {
    /**
     * Specify whether the feedback is for valid or invalid fields
     *
     * @type {('valid'|'invalid')}
     */
    type: PropTypes.string,
    /** Display feedback as a tooltip. */
    tooltip: PropTypes.bool,
    as: PropTypes.elementType
  };
  var Feedback = /* @__PURE__ */ React.forwardRef(
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    function(_ref, ref) {
      var _ref$as = _ref.as, Component = _ref$as === void 0 ? "div" : _ref$as, className = _ref.className, _ref$type = _ref.type, type = _ref$type === void 0 ? "valid" : _ref$type, _ref$tooltip = _ref.tooltip, tooltip = _ref$tooltip === void 0 ? false : _ref$tooltip, props = _objectWithoutPropertiesLoose(_ref, _excluded$e);
      return /* @__PURE__ */ React.createElement(Component, _extends({}, props, {
        ref,
        className: classNames(className, type + "-" + (tooltip ? "tooltip" : "feedback"))
      }));
    }
  );
  Feedback.displayName = "Feedback";
  Feedback.propTypes = propTypes$1;
  var FormContext = /* @__PURE__ */ React.createContext({
    controlId: void 0
  });
  var _excluded$d = ["bsPrefix", "bsCustomPrefix", "type", "size", "htmlSize", "id", "className", "isValid", "isInvalid", "plaintext", "readOnly", "custom", "as"];
  var FormControl = /* @__PURE__ */ React.forwardRef(function(_ref, ref) {
    var bsPrefix = _ref.bsPrefix, bsCustomPrefix = _ref.bsCustomPrefix, type = _ref.type, size2 = _ref.size, htmlSize = _ref.htmlSize, id2 = _ref.id, className = _ref.className, _ref$isValid = _ref.isValid, isValid = _ref$isValid === void 0 ? false : _ref$isValid, _ref$isInvalid = _ref.isInvalid, isInvalid = _ref$isInvalid === void 0 ? false : _ref$isInvalid, plaintext = _ref.plaintext, readOnly = _ref.readOnly, custom = _ref.custom, _ref$as = _ref.as, Component = _ref$as === void 0 ? "input" : _ref$as, props = _objectWithoutPropertiesLoose(_ref, _excluded$d);
    var _useContext = reactExports.useContext(FormContext), controlId = _useContext.controlId;
    var _ref2 = custom ? [bsCustomPrefix, "custom"] : [bsPrefix, "form-control"], prefix = _ref2[0], defaultPrefix = _ref2[1];
    bsPrefix = useBootstrapPrefix(prefix, defaultPrefix);
    var classes;
    if (plaintext) {
      var _classes;
      classes = (_classes = {}, _classes[bsPrefix + "-plaintext"] = true, _classes);
    } else if (type === "file") {
      var _classes2;
      classes = (_classes2 = {}, _classes2[bsPrefix + "-file"] = true, _classes2);
    } else if (type === "range") {
      var _classes3;
      classes = (_classes3 = {}, _classes3[bsPrefix + "-range"] = true, _classes3);
    } else if (Component === "select" && custom) {
      var _classes4;
      classes = (_classes4 = {}, _classes4[bsPrefix + "-select"] = true, _classes4[bsPrefix + "-select-" + size2] = size2, _classes4);
    } else {
      var _classes5;
      classes = (_classes5 = {}, _classes5[bsPrefix] = true, _classes5[bsPrefix + "-" + size2] = size2, _classes5);
    }
    return /* @__PURE__ */ React.createElement(Component, _extends({}, props, {
      type,
      size: htmlSize,
      ref,
      readOnly,
      id: id2 || controlId,
      className: classNames(className, classes, isValid && "is-valid", isInvalid && "is-invalid")
    }));
  });
  FormControl.displayName = "FormControl";
  const FormControl$1 = Object.assign(FormControl, {
    Feedback
  });
  var _excluded$c = ["bsPrefix", "size", "hasValidation", "className", "as"];
  var InputGroupAppend = createWithBsPrefix("input-group-append");
  var InputGroupPrepend = createWithBsPrefix("input-group-prepend");
  var InputGroupText = createWithBsPrefix("input-group-text", {
    Component: "span"
  });
  var InputGroupCheckbox = function InputGroupCheckbox2(props) {
    return /* @__PURE__ */ React.createElement(InputGroupText, null, /* @__PURE__ */ React.createElement("input", _extends({
      type: "checkbox"
    }, props)));
  };
  var InputGroupRadio = function InputGroupRadio2(props) {
    return /* @__PURE__ */ React.createElement(InputGroupText, null, /* @__PURE__ */ React.createElement("input", _extends({
      type: "radio"
    }, props)));
  };
  var InputGroup = /* @__PURE__ */ React.forwardRef(function(_ref, ref) {
    var bsPrefix = _ref.bsPrefix, size2 = _ref.size, hasValidation = _ref.hasValidation, className = _ref.className, _ref$as = _ref.as, Component = _ref$as === void 0 ? "div" : _ref$as, props = _objectWithoutPropertiesLoose(_ref, _excluded$c);
    bsPrefix = useBootstrapPrefix(bsPrefix, "input-group");
    return /* @__PURE__ */ React.createElement(Component, _extends({
      ref
    }, props, {
      className: classNames(className, bsPrefix, size2 && bsPrefix + "-" + size2, hasValidation && "has-validation")
    }));
  });
  InputGroup.displayName = "InputGroup";
  InputGroup.Text = InputGroupText;
  InputGroup.Radio = InputGroupRadio;
  InputGroup.Checkbox = InputGroupCheckbox;
  InputGroup.Append = InputGroupAppend;
  InputGroup.Prepend = InputGroupPrepend;
  var TabContext = /* @__PURE__ */ React.createContext(null);
  var _excluded$b = ["as", "onSelect", "activeKey", "role", "onKeyDown"];
  var noop = function noop2() {
  };
  var AbstractNav = /* @__PURE__ */ React.forwardRef(function(_ref, ref) {
    var _ref$as = _ref.as, Component = _ref$as === void 0 ? "ul" : _ref$as, onSelect = _ref.onSelect, activeKey = _ref.activeKey, role = _ref.role, onKeyDown = _ref.onKeyDown, props = _objectWithoutPropertiesLoose(_ref, _excluded$b);
    var forceUpdate = useForceUpdate();
    var needsRefocusRef = reactExports.useRef(false);
    var parentOnSelect = reactExports.useContext(SelectableContext);
    var tabContext = reactExports.useContext(TabContext);
    var getControlledId, getControllerId;
    if (tabContext) {
      role = role || "tablist";
      activeKey = tabContext.activeKey;
      getControlledId = tabContext.getControlledId;
      getControllerId = tabContext.getControllerId;
    }
    var listNode = reactExports.useRef(null);
    var getNextActiveChild = function getNextActiveChild2(offset) {
      var currentListNode = listNode.current;
      if (!currentListNode)
        return null;
      var items = qsa(currentListNode, "[data-rb-event-key]:not(.disabled)");
      var activeChild = currentListNode.querySelector(".active");
      if (!activeChild)
        return null;
      var index = items.indexOf(activeChild);
      if (index === -1)
        return null;
      var nextIndex = index + offset;
      if (nextIndex >= items.length)
        nextIndex = 0;
      if (nextIndex < 0)
        nextIndex = items.length - 1;
      return items[nextIndex];
    };
    var handleSelect = function handleSelect2(key, event) {
      if (key == null)
        return;
      if (onSelect)
        onSelect(key, event);
      if (parentOnSelect)
        parentOnSelect(key, event);
    };
    var handleKeyDown = function handleKeyDown2(event) {
      if (onKeyDown)
        onKeyDown(event);
      var nextActiveChild;
      switch (event.key) {
        case "ArrowLeft":
        case "ArrowUp":
          nextActiveChild = getNextActiveChild(-1);
          break;
        case "ArrowRight":
        case "ArrowDown":
          nextActiveChild = getNextActiveChild(1);
          break;
        default:
          return;
      }
      if (!nextActiveChild)
        return;
      event.preventDefault();
      handleSelect(nextActiveChild.dataset.rbEventKey, event);
      needsRefocusRef.current = true;
      forceUpdate();
    };
    reactExports.useEffect(function() {
      if (listNode.current && needsRefocusRef.current) {
        var activeChild = listNode.current.querySelector("[data-rb-event-key].active");
        if (activeChild)
          activeChild.focus();
      }
      needsRefocusRef.current = false;
    });
    var mergedRef = useMergedRefs(ref, listNode);
    return /* @__PURE__ */ React.createElement(SelectableContext.Provider, {
      value: handleSelect
    }, /* @__PURE__ */ React.createElement(NavContext.Provider, {
      value: {
        role,
        // used by NavLink to determine it's role
        activeKey: makeEventKey(activeKey),
        getControlledId: getControlledId || noop,
        getControllerId: getControllerId || noop
      }
    }, /* @__PURE__ */ React.createElement(Component, _extends({}, props, {
      onKeyDown: handleKeyDown,
      ref: mergedRef,
      role
    }))));
  });
  var _excluded$a = ["active", "className", "eventKey", "onSelect", "onClick", "as"];
  var defaultProps$5 = {
    disabled: false
  };
  var AbstractNavItem = /* @__PURE__ */ React.forwardRef(function(_ref, ref) {
    var active = _ref.active, className = _ref.className, eventKey = _ref.eventKey, onSelect = _ref.onSelect, onClick = _ref.onClick, Component = _ref.as, props = _objectWithoutPropertiesLoose(_ref, _excluded$a);
    var navKey = makeEventKey(eventKey, props.href);
    var parentOnSelect = reactExports.useContext(SelectableContext);
    var navContext = reactExports.useContext(NavContext);
    var isActive = active;
    if (navContext) {
      if (!props.role && navContext.role === "tablist")
        props.role = "tab";
      var contextControllerId = navContext.getControllerId(navKey);
      var contextControlledId = navContext.getControlledId(navKey);
      props["data-rb-event-key"] = navKey;
      props.id = contextControllerId || props.id;
      props["aria-controls"] = contextControlledId || props["aria-controls"];
      isActive = active == null && navKey != null ? navContext.activeKey === navKey : active;
    }
    if (props.role === "tab") {
      if (props.disabled) {
        props.tabIndex = -1;
        props["aria-disabled"] = true;
      }
      props["aria-selected"] = isActive;
    }
    var handleOnclick = useEventCallback(function(e) {
      if (onClick)
        onClick(e);
      if (navKey == null)
        return;
      if (onSelect)
        onSelect(navKey, e);
      if (parentOnSelect)
        parentOnSelect(navKey, e);
    });
    return /* @__PURE__ */ React.createElement(Component, _extends({}, props, {
      ref,
      onClick: handleOnclick,
      className: classNames(className, isActive && "active")
    }));
  });
  AbstractNavItem.defaultProps = defaultProps$5;
  var size;
  function scrollbarSize(recalc) {
    if (!size && size !== 0 || recalc) {
      if (canUseDOM) {
        var scrollDiv = document.createElement("div");
        scrollDiv.style.position = "absolute";
        scrollDiv.style.top = "-9999px";
        scrollDiv.style.width = "50px";
        scrollDiv.style.height = "50px";
        scrollDiv.style.overflow = "scroll";
        document.body.appendChild(scrollDiv);
        size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
      }
    }
    return size;
  }
  function activeElement(doc) {
    if (doc === void 0) {
      doc = ownerDocument();
    }
    try {
      var active = doc.activeElement;
      if (!active || !active.nodeName)
        return null;
      return active;
    } catch (e) {
      return doc.body;
    }
  }
  function addClass(element, className) {
    if (element.classList)
      element.classList.add(className);
    else if (!hasClass(element, className))
      if (typeof element.className === "string")
        element.className = element.className + " " + className;
      else
        element.setAttribute("class", (element.className && element.className.baseVal || "") + " " + className);
  }
  function replaceClassName(origClass, classToRemove) {
    return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, "");
  }
  function removeClass(element, className) {
    if (element.classList) {
      element.classList.remove(className);
    } else if (typeof element.className === "string") {
      element.className = replaceClassName(element.className, className);
    } else {
      element.setAttribute("class", replaceClassName(element.className && element.className.baseVal || "", className));
    }
  }
  function isDocument(element) {
    return "nodeType" in element && element.nodeType === document.DOCUMENT_NODE;
  }
  function isWindow(node) {
    if ("window" in node && node.window === node)
      return node;
    if (isDocument(node))
      return node.defaultView || false;
    return false;
  }
  function isBody(node) {
    return node && node.tagName.toLowerCase() === "body";
  }
  function bodyIsOverflowing(node) {
    var doc = isWindow(node) ? ownerDocument() : ownerDocument(node);
    var win = isWindow(node) || doc.defaultView;
    return doc.body.clientWidth < win.innerWidth;
  }
  function isOverflowing(container) {
    var win = isWindow(container);
    return win || isBody(container) ? bodyIsOverflowing(container) : container.scrollHeight > container.clientHeight;
  }
  var BLACKLIST = ["template", "script", "style"];
  var isHidable = function isHidable2(_ref) {
    var nodeType = _ref.nodeType, tagName = _ref.tagName;
    return nodeType === 1 && BLACKLIST.indexOf(tagName.toLowerCase()) === -1;
  };
  var siblings = function siblings2(container, exclude, cb2) {
    [].forEach.call(container.children, function(node) {
      if (exclude.indexOf(node) === -1 && isHidable(node)) {
        cb2(node);
      }
    });
  };
  function ariaHidden(hide, node) {
    if (!node)
      return;
    if (hide) {
      node.setAttribute("aria-hidden", "true");
    } else {
      node.removeAttribute("aria-hidden");
    }
  }
  function hideSiblings(container, _ref2) {
    var dialog = _ref2.dialog, backdrop = _ref2.backdrop;
    siblings(container, [dialog, backdrop], function(node) {
      return ariaHidden(true, node);
    });
  }
  function showSiblings(container, _ref3) {
    var dialog = _ref3.dialog, backdrop = _ref3.backdrop;
    siblings(container, [dialog, backdrop], function(node) {
      return ariaHidden(false, node);
    });
  }
  function findIndexOf(arr, cb2) {
    var idx = -1;
    arr.some(function(d, i) {
      if (cb2(d, i)) {
        idx = i;
        return true;
      }
      return false;
    });
    return idx;
  }
  var ModalManager = /* @__PURE__ */ function() {
    function ModalManager2(_temp) {
      var _ref = _temp === void 0 ? {} : _temp, _ref$hideSiblingNodes = _ref.hideSiblingNodes, hideSiblingNodes = _ref$hideSiblingNodes === void 0 ? true : _ref$hideSiblingNodes, _ref$handleContainerO = _ref.handleContainerOverflow, handleContainerOverflow = _ref$handleContainerO === void 0 ? true : _ref$handleContainerO;
      this.hideSiblingNodes = void 0;
      this.handleContainerOverflow = void 0;
      this.modals = void 0;
      this.containers = void 0;
      this.data = void 0;
      this.scrollbarSize = void 0;
      this.hideSiblingNodes = hideSiblingNodes;
      this.handleContainerOverflow = handleContainerOverflow;
      this.modals = [];
      this.containers = [];
      this.data = [];
      this.scrollbarSize = scrollbarSize();
    }
    var _proto = ModalManager2.prototype;
    _proto.isContainerOverflowing = function isContainerOverflowing(modal) {
      var data = this.data[this.containerIndexFromModal(modal)];
      return data && data.overflowing;
    };
    _proto.containerIndexFromModal = function containerIndexFromModal(modal) {
      return findIndexOf(this.data, function(d) {
        return d.modals.indexOf(modal) !== -1;
      });
    };
    _proto.setContainerStyle = function setContainerStyle(containerState, container) {
      var style$1 = {
        overflow: "hidden"
      };
      containerState.style = {
        overflow: container.style.overflow,
        paddingRight: container.style.paddingRight
      };
      if (containerState.overflowing) {
        style$1.paddingRight = parseInt(style(container, "paddingRight") || "0", 10) + this.scrollbarSize + "px";
      }
      style(container, style$1);
    };
    _proto.removeContainerStyle = function removeContainerStyle(containerState, container) {
      Object.assign(container.style, containerState.style);
    };
    _proto.add = function add(modal, container, className) {
      var modalIdx = this.modals.indexOf(modal);
      var containerIdx = this.containers.indexOf(container);
      if (modalIdx !== -1) {
        return modalIdx;
      }
      modalIdx = this.modals.length;
      this.modals.push(modal);
      if (this.hideSiblingNodes) {
        hideSiblings(container, modal);
      }
      if (containerIdx !== -1) {
        this.data[containerIdx].modals.push(modal);
        return modalIdx;
      }
      var data = {
        modals: [modal],
        // right now only the first modal of a container will have its classes applied
        classes: className ? className.split(/\s+/) : [],
        overflowing: isOverflowing(container)
      };
      if (this.handleContainerOverflow) {
        this.setContainerStyle(data, container);
      }
      data.classes.forEach(addClass.bind(null, container));
      this.containers.push(container);
      this.data.push(data);
      return modalIdx;
    };
    _proto.remove = function remove(modal) {
      var modalIdx = this.modals.indexOf(modal);
      if (modalIdx === -1) {
        return;
      }
      var containerIdx = this.containerIndexFromModal(modal);
      var data = this.data[containerIdx];
      var container = this.containers[containerIdx];
      data.modals.splice(data.modals.indexOf(modal), 1);
      this.modals.splice(modalIdx, 1);
      if (data.modals.length === 0) {
        data.classes.forEach(removeClass.bind(null, container));
        if (this.handleContainerOverflow) {
          this.removeContainerStyle(data, container);
        }
        if (this.hideSiblingNodes) {
          showSiblings(container, modal);
        }
        this.containers.splice(containerIdx, 1);
        this.data.splice(containerIdx, 1);
      } else if (this.hideSiblingNodes) {
        var _data$modals = data.modals[data.modals.length - 1], backdrop = _data$modals.backdrop, dialog = _data$modals.dialog;
        ariaHidden(false, dialog);
        ariaHidden(false, backdrop);
      }
    };
    _proto.isTopModal = function isTopModal(modal) {
      return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
    };
    return ModalManager2;
  }();
  var resolveContainerRef = function resolveContainerRef2(ref) {
    var _ref;
    if (typeof document === "undefined")
      return null;
    if (ref == null)
      return ownerDocument().body;
    if (typeof ref === "function")
      ref = ref();
    if (ref && "current" in ref)
      ref = ref.current;
    if ((_ref = ref) != null && _ref.nodeType)
      return ref || null;
    return null;
  };
  function useWaitForDOMRef(ref, onResolved) {
    var _useState = reactExports.useState(function() {
      return resolveContainerRef(ref);
    }), resolvedRef = _useState[0], setRef = _useState[1];
    if (!resolvedRef) {
      var earlyRef = resolveContainerRef(ref);
      if (earlyRef)
        setRef(earlyRef);
    }
    reactExports.useEffect(function() {
    }, [onResolved, resolvedRef]);
    reactExports.useEffect(function() {
      var nextRef = resolveContainerRef(ref);
      if (nextRef !== resolvedRef) {
        setRef(nextRef);
      }
    }, [ref, resolvedRef]);
    return resolvedRef;
  }
  var manager$1;
  function getManager() {
    if (!manager$1)
      manager$1 = new ModalManager();
    return manager$1;
  }
  function useModalManager(provided) {
    var modalManager = provided || getManager();
    var modal = reactExports.useRef({
      dialog: null,
      backdrop: null
    });
    return Object.assign(modal.current, {
      add: function add(container, className) {
        return modalManager.add(modal.current, container, className);
      },
      remove: function remove() {
        return modalManager.remove(modal.current);
      },
      isTopModal: function isTopModal() {
        return modalManager.isTopModal(modal.current);
      },
      setDialogRef: reactExports.useCallback(function(ref) {
        modal.current.dialog = ref;
      }, []),
      setBackdropRef: reactExports.useCallback(function(ref) {
        modal.current.backdrop = ref;
      }, [])
    });
  }
  var Modal$1 = /* @__PURE__ */ reactExports.forwardRef(function(_ref, ref) {
    var _ref$show = _ref.show, show = _ref$show === void 0 ? false : _ref$show, _ref$role = _ref.role, role = _ref$role === void 0 ? "dialog" : _ref$role, className = _ref.className, style2 = _ref.style, children = _ref.children, _ref$backdrop = _ref.backdrop, backdrop = _ref$backdrop === void 0 ? true : _ref$backdrop, _ref$keyboard = _ref.keyboard, keyboard = _ref$keyboard === void 0 ? true : _ref$keyboard, onBackdropClick = _ref.onBackdropClick, onEscapeKeyDown = _ref.onEscapeKeyDown, transition = _ref.transition, backdropTransition = _ref.backdropTransition, _ref$autoFocus = _ref.autoFocus, autoFocus = _ref$autoFocus === void 0 ? true : _ref$autoFocus, _ref$enforceFocus = _ref.enforceFocus, enforceFocus = _ref$enforceFocus === void 0 ? true : _ref$enforceFocus, _ref$restoreFocus = _ref.restoreFocus, restoreFocus = _ref$restoreFocus === void 0 ? true : _ref$restoreFocus, restoreFocusOptions = _ref.restoreFocusOptions, renderDialog = _ref.renderDialog, _ref$renderBackdrop = _ref.renderBackdrop, renderBackdrop = _ref$renderBackdrop === void 0 ? function(props) {
      return /* @__PURE__ */ React.createElement("div", props);
    } : _ref$renderBackdrop, providedManager = _ref.manager, containerRef = _ref.container, containerClassName = _ref.containerClassName, onShow = _ref.onShow, _ref$onHide = _ref.onHide, onHide = _ref$onHide === void 0 ? function() {
    } : _ref$onHide, onExit = _ref.onExit, onExited = _ref.onExited, onExiting = _ref.onExiting, onEnter = _ref.onEnter, onEntering = _ref.onEntering, onEntered = _ref.onEntered, rest = _objectWithoutPropertiesLoose(_ref, ["show", "role", "className", "style", "children", "backdrop", "keyboard", "onBackdropClick", "onEscapeKeyDown", "transition", "backdropTransition", "autoFocus", "enforceFocus", "restoreFocus", "restoreFocusOptions", "renderDialog", "renderBackdrop", "manager", "container", "containerClassName", "onShow", "onHide", "onExit", "onExited", "onExiting", "onEnter", "onEntering", "onEntered"]);
    var container = useWaitForDOMRef(containerRef);
    var modal = useModalManager(providedManager);
    var isMounted = useMounted();
    var prevShow = usePrevious(show);
    var _useState = reactExports.useState(!show), exited = _useState[0], setExited = _useState[1];
    var lastFocusRef = reactExports.useRef(null);
    reactExports.useImperativeHandle(ref, function() {
      return modal;
    }, [modal]);
    if (canUseDOM && !prevShow && show) {
      lastFocusRef.current = activeElement();
    }
    if (!transition && !show && !exited) {
      setExited(true);
    } else if (show && exited) {
      setExited(false);
    }
    var handleShow = useEventCallback(function() {
      modal.add(container, containerClassName);
      removeKeydownListenerRef.current = listen(document, "keydown", handleDocumentKeyDown);
      removeFocusListenerRef.current = listen(
        document,
        "focus",
        // the timeout is necessary b/c this will run before the new modal is mounted
        // and so steals focus from it
        function() {
          return setTimeout(handleEnforceFocus);
        },
        true
      );
      if (onShow) {
        onShow();
      }
      if (autoFocus) {
        var currentActiveElement = activeElement(document);
        if (modal.dialog && currentActiveElement && !contains(modal.dialog, currentActiveElement)) {
          lastFocusRef.current = currentActiveElement;
          modal.dialog.focus();
        }
      }
    });
    var handleHide = useEventCallback(function() {
      modal.remove();
      removeKeydownListenerRef.current == null ? void 0 : removeKeydownListenerRef.current();
      removeFocusListenerRef.current == null ? void 0 : removeFocusListenerRef.current();
      if (restoreFocus) {
        var _lastFocusRef$current;
        (_lastFocusRef$current = lastFocusRef.current) == null ? void 0 : _lastFocusRef$current.focus == null ? void 0 : _lastFocusRef$current.focus(restoreFocusOptions);
        lastFocusRef.current = null;
      }
    });
    reactExports.useEffect(function() {
      if (!show || !container)
        return;
      handleShow();
    }, [
      show,
      container,
      /* should never change: */
      handleShow
    ]);
    reactExports.useEffect(function() {
      if (!exited)
        return;
      handleHide();
    }, [exited, handleHide]);
    useWillUnmount(function() {
      handleHide();
    });
    var handleEnforceFocus = useEventCallback(function() {
      if (!enforceFocus || !isMounted() || !modal.isTopModal()) {
        return;
      }
      var currentActiveElement = activeElement();
      if (modal.dialog && currentActiveElement && !contains(modal.dialog, currentActiveElement)) {
        modal.dialog.focus();
      }
    });
    var handleBackdropClick = useEventCallback(function(e) {
      if (e.target !== e.currentTarget) {
        return;
      }
      onBackdropClick == null ? void 0 : onBackdropClick(e);
      if (backdrop === true) {
        onHide();
      }
    });
    var handleDocumentKeyDown = useEventCallback(function(e) {
      if (keyboard && e.keyCode === 27 && modal.isTopModal()) {
        onEscapeKeyDown == null ? void 0 : onEscapeKeyDown(e);
        if (!e.defaultPrevented) {
          onHide();
        }
      }
    });
    var removeFocusListenerRef = reactExports.useRef();
    var removeKeydownListenerRef = reactExports.useRef();
    var handleHidden = function handleHidden2() {
      setExited(true);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      onExited == null ? void 0 : onExited.apply(void 0, args);
    };
    var Transition2 = transition;
    if (!container || !(show || Transition2 && !exited)) {
      return null;
    }
    var dialogProps = _extends({
      role,
      ref: modal.setDialogRef,
      // apparently only works on the dialog role element
      "aria-modal": role === "dialog" ? true : void 0
    }, rest, {
      style: style2,
      className,
      tabIndex: -1
    });
    var dialog = renderDialog ? renderDialog(dialogProps) : /* @__PURE__ */ React.createElement("div", dialogProps, /* @__PURE__ */ React.cloneElement(children, {
      role: "document"
    }));
    if (Transition2) {
      dialog = /* @__PURE__ */ React.createElement(Transition2, {
        appear: true,
        unmountOnExit: true,
        "in": !!show,
        onExit,
        onExiting,
        onExited: handleHidden,
        onEnter,
        onEntering,
        onEntered
      }, dialog);
    }
    var backdropElement = null;
    if (backdrop) {
      var BackdropTransition2 = backdropTransition;
      backdropElement = renderBackdrop({
        ref: modal.setBackdropRef,
        onClick: handleBackdropClick
      });
      if (BackdropTransition2) {
        backdropElement = /* @__PURE__ */ React.createElement(BackdropTransition2, {
          appear: true,
          "in": !!show
        }, backdropElement);
      }
    }
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ ReactDOM.createPortal(/* @__PURE__ */ React.createElement(React.Fragment, null, backdropElement, dialog), container));
  });
  var propTypes = {
    /**
     * Set the visibility of the Modal
     */
    show: PropTypes.bool,
    /**
     * A DOM element, a `ref` to an element, or function that returns either. The Modal is appended to it's `container` element.
     *
     * For the sake of assistive technologies, the container should usually be the document body, so that the rest of the
     * page content can be placed behind a virtual backdrop as well as a visual one.
     */
    container: PropTypes.any,
    /**
     * A callback fired when the Modal is opening.
     */
    onShow: PropTypes.func,
    /**
     * A callback fired when either the backdrop is clicked, or the escape key is pressed.
     *
     * The `onHide` callback only signals intent from the Modal,
     * you must actually set the `show` prop to `false` for the Modal to close.
     */
    onHide: PropTypes.func,
    /**
     * Include a backdrop component.
     */
    backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(["static"])]),
    /**
     * A function that returns the dialog component. Useful for custom
     * rendering. **Note:** the component should make sure to apply the provided ref.
     *
     * ```js static
     * renderDialog={props => <MyDialog {...props} />}
     * ```
     */
    renderDialog: PropTypes.func,
    /**
     * A function that returns a backdrop component. Useful for custom
     * backdrop rendering.
     *
     * ```js
     *  renderBackdrop={props => <MyBackdrop {...props} />}
     * ```
     */
    renderBackdrop: PropTypes.func,
    /**
     * A callback fired when the escape key, if specified in `keyboard`, is pressed.
     *
     * If preventDefault() is called on the keyboard event, closing the modal will be cancelled.
     */
    onEscapeKeyDown: PropTypes.func,
    /**
     * A callback fired when the backdrop, if specified, is clicked.
     */
    onBackdropClick: PropTypes.func,
    /**
     * A css class or set of classes applied to the modal container when the modal is open,
     * and removed when it is closed.
     */
    containerClassName: PropTypes.string,
    /**
     * Close the modal when escape key is pressed
     */
    keyboard: PropTypes.bool,
    /**
     * A `react-transition-group@2.0.0` `<Transition/>` component used
     * to control animations for the dialog component.
     */
    transition: PropTypes.elementType,
    /**
     * A `react-transition-group@2.0.0` `<Transition/>` component used
     * to control animations for the backdrop components.
     */
    backdropTransition: PropTypes.elementType,
    /**
     * When `true` The modal will automatically shift focus to itself when it opens, and
     * replace it to the last focused element when it closes. This also
     * works correctly with any Modal children that have the `autoFocus` prop.
     *
     * Generally this should never be set to `false` as it makes the Modal less
     * accessible to assistive technologies, like screen readers.
     */
    autoFocus: PropTypes.bool,
    /**
     * When `true` The modal will prevent focus from leaving the Modal while open.
     *
     * Generally this should never be set to `false` as it makes the Modal less
     * accessible to assistive technologies, like screen readers.
     */
    enforceFocus: PropTypes.bool,
    /**
     * When `true` The modal will restore focus to previously focused element once
     * modal is hidden
     */
    restoreFocus: PropTypes.bool,
    /**
     * Options passed to focus function when `restoreFocus` is set to `true`
     *
     * @link  https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#Parameters
     */
    restoreFocusOptions: PropTypes.shape({
      preventScroll: PropTypes.bool
    }),
    /**
     * Callback fired before the Modal transitions in
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired as the Modal begins to transition in
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired after the Modal finishes transitioning in
     */
    onEntered: PropTypes.func,
    /**
     * Callback fired right before the Modal transitions out
     */
    onExit: PropTypes.func,
    /**
     * Callback fired as the Modal begins to transition out
     */
    onExiting: PropTypes.func,
    /**
     * Callback fired after the Modal finishes transitioning out
     */
    onExited: PropTypes.func,
    /**
     * A ModalManager instance used to track and manage the state of open
     * Modals. Useful when customizing how modals interact within a container
     */
    manager: PropTypes.instanceOf(ModalManager)
  };
  Modal$1.displayName = "Modal";
  Modal$1.propTypes = propTypes;
  const BaseModal = Object.assign(Modal$1, {
    Manager: ModalManager
  });
  var Selector = {
    FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
    STICKY_CONTENT: ".sticky-top",
    NAVBAR_TOGGLER: ".navbar-toggler"
  };
  var BootstrapModalManager = /* @__PURE__ */ function(_ModalManager) {
    _inheritsLoose(BootstrapModalManager2, _ModalManager);
    function BootstrapModalManager2() {
      return _ModalManager.apply(this, arguments) || this;
    }
    var _proto = BootstrapModalManager2.prototype;
    _proto.adjustAndStore = function adjustAndStore(prop, element, adjust) {
      var _css;
      var actual = element.style[prop];
      element.dataset[prop] = actual;
      style(element, (_css = {}, _css[prop] = parseFloat(style(element, prop)) + adjust + "px", _css));
    };
    _proto.restore = function restore(prop, element) {
      var value = element.dataset[prop];
      if (value !== void 0) {
        var _css2;
        delete element.dataset[prop];
        style(element, (_css2 = {}, _css2[prop] = value, _css2));
      }
    };
    _proto.setContainerStyle = function setContainerStyle(containerState, container) {
      var _this = this;
      _ModalManager.prototype.setContainerStyle.call(this, containerState, container);
      if (!containerState.overflowing)
        return;
      var size2 = scrollbarSize();
      qsa(container, Selector.FIXED_CONTENT).forEach(function(el2) {
        return _this.adjustAndStore("paddingRight", el2, size2);
      });
      qsa(container, Selector.STICKY_CONTENT).forEach(function(el2) {
        return _this.adjustAndStore("marginRight", el2, -size2);
      });
      qsa(container, Selector.NAVBAR_TOGGLER).forEach(function(el2) {
        return _this.adjustAndStore("marginRight", el2, size2);
      });
    };
    _proto.removeContainerStyle = function removeContainerStyle(containerState, container) {
      var _this2 = this;
      _ModalManager.prototype.removeContainerStyle.call(this, containerState, container);
      qsa(container, Selector.FIXED_CONTENT).forEach(function(el2) {
        return _this2.restore("paddingRight", el2);
      });
      qsa(container, Selector.STICKY_CONTENT).forEach(function(el2) {
        return _this2.restore("marginRight", el2);
      });
      qsa(container, Selector.NAVBAR_TOGGLER).forEach(function(el2) {
        return _this2.restore("marginRight", el2);
      });
    };
    return BootstrapModalManager2;
  }(ModalManager);
  const ModalBody = createWithBsPrefix("modal-body");
  var ModalContext = /* @__PURE__ */ React.createContext({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onHide: function onHide() {
    }
  });
  var _excluded$9 = ["bsPrefix", "className", "contentClassName", "centered", "size", "children", "scrollable"];
  var ModalDialog = /* @__PURE__ */ React.forwardRef(function(_ref, ref) {
    var bsPrefix = _ref.bsPrefix, className = _ref.className, contentClassName = _ref.contentClassName, centered = _ref.centered, size2 = _ref.size, children = _ref.children, scrollable = _ref.scrollable, props = _objectWithoutPropertiesLoose(_ref, _excluded$9);
    bsPrefix = useBootstrapPrefix(bsPrefix, "modal");
    var dialogClass = bsPrefix + "-dialog";
    return /* @__PURE__ */ React.createElement("div", _extends({}, props, {
      ref,
      className: classNames(dialogClass, className, size2 && bsPrefix + "-" + size2, centered && dialogClass + "-centered", scrollable && dialogClass + "-scrollable")
    }), /* @__PURE__ */ React.createElement("div", {
      className: classNames(bsPrefix + "-content", contentClassName)
    }, children));
  });
  ModalDialog.displayName = "ModalDialog";
  const ModalFooter = createWithBsPrefix("modal-footer");
  var _excluded$8 = ["bsPrefix", "closeLabel", "closeButton", "onHide", "className", "children"];
  var defaultProps$4 = {
    closeLabel: "Close",
    closeButton: false
  };
  var ModalHeader = /* @__PURE__ */ React.forwardRef(function(_ref, ref) {
    var bsPrefix = _ref.bsPrefix, closeLabel = _ref.closeLabel, closeButton = _ref.closeButton, onHide = _ref.onHide, className = _ref.className, children = _ref.children, props = _objectWithoutPropertiesLoose(_ref, _excluded$8);
    bsPrefix = useBootstrapPrefix(bsPrefix, "modal-header");
    var context2 = reactExports.useContext(ModalContext);
    var handleClick = useEventCallback(function() {
      if (context2)
        context2.onHide();
      if (onHide)
        onHide();
    });
    return /* @__PURE__ */ React.createElement("div", _extends({
      ref
    }, props, {
      className: classNames(className, bsPrefix)
    }), children, closeButton && /* @__PURE__ */ React.createElement(CloseButton, {
      label: closeLabel,
      onClick: handleClick
    }));
  });
  ModalHeader.displayName = "ModalHeader";
  ModalHeader.defaultProps = defaultProps$4;
  var DivStyledAsH4 = divWithClassName("h4");
  const ModalTitle = createWithBsPrefix("modal-title", {
    Component: DivStyledAsH4
  });
  var _excluded$7 = ["bsPrefix", "className", "style", "dialogClassName", "contentClassName", "children", "dialogAs", "aria-labelledby", "aria-describedby", "aria-label", "show", "animation", "backdrop", "keyboard", "onEscapeKeyDown", "onShow", "onHide", "container", "autoFocus", "enforceFocus", "restoreFocus", "restoreFocusOptions", "onEntered", "onExit", "onExiting", "onEnter", "onEntering", "onExited", "backdropClassName", "manager"];
  var manager;
  var defaultProps$3 = {
    show: false,
    backdrop: true,
    keyboard: true,
    autoFocus: true,
    enforceFocus: true,
    restoreFocus: true,
    animation: true,
    dialogAs: ModalDialog
  };
  function DialogTransition(props) {
    return /* @__PURE__ */ React.createElement(Fade, _extends({}, props, {
      timeout: null
    }));
  }
  function BackdropTransition(props) {
    return /* @__PURE__ */ React.createElement(Fade, _extends({}, props, {
      timeout: null
    }));
  }
  var Modal = /* @__PURE__ */ React.forwardRef(function(_ref, ref) {
    var bsPrefix = _ref.bsPrefix, className = _ref.className, style2 = _ref.style, dialogClassName = _ref.dialogClassName, contentClassName = _ref.contentClassName, children = _ref.children, Dialog = _ref.dialogAs, ariaLabelledby = _ref["aria-labelledby"], ariaDescribedby = _ref["aria-describedby"], ariaLabel = _ref["aria-label"], show = _ref.show, animation = _ref.animation, backdrop = _ref.backdrop, keyboard = _ref.keyboard, onEscapeKeyDown = _ref.onEscapeKeyDown, onShow = _ref.onShow, onHide = _ref.onHide, container = _ref.container, autoFocus = _ref.autoFocus, enforceFocus = _ref.enforceFocus, restoreFocus = _ref.restoreFocus, restoreFocusOptions = _ref.restoreFocusOptions, onEntered = _ref.onEntered, onExit = _ref.onExit, onExiting = _ref.onExiting, onEnter = _ref.onEnter, onEntering = _ref.onEntering, onExited = _ref.onExited, backdropClassName = _ref.backdropClassName, propsManager = _ref.manager, props = _objectWithoutPropertiesLoose(_ref, _excluded$7);
    var _useState = reactExports.useState({}), modalStyle = _useState[0], setStyle = _useState[1];
    var _useState2 = reactExports.useState(false), animateStaticModal = _useState2[0], setAnimateStaticModal = _useState2[1];
    var waitingForMouseUpRef = reactExports.useRef(false);
    var ignoreBackdropClickRef = reactExports.useRef(false);
    var removeStaticModalAnimationRef = reactExports.useRef(null);
    var _useCallbackRef = useCallbackRef(), modal = _useCallbackRef[0], setModalRef = _useCallbackRef[1];
    var handleHide = useEventCallback(onHide);
    bsPrefix = useBootstrapPrefix(bsPrefix, "modal");
    reactExports.useImperativeHandle(ref, function() {
      return {
        get _modal() {
          return modal;
        }
      };
    }, [modal]);
    var modalContext = reactExports.useMemo(function() {
      return {
        onHide: handleHide
      };
    }, [handleHide]);
    function getModalManager() {
      if (propsManager)
        return propsManager;
      if (!manager)
        manager = new BootstrapModalManager();
      return manager;
    }
    function updateDialogStyle(node) {
      if (!canUseDOM)
        return;
      var containerIsOverflowing = getModalManager().isContainerOverflowing(modal);
      var modalIsOverflowing = node.scrollHeight > ownerDocument(node).documentElement.clientHeight;
      setStyle({
        paddingRight: containerIsOverflowing && !modalIsOverflowing ? scrollbarSize() : void 0,
        paddingLeft: !containerIsOverflowing && modalIsOverflowing ? scrollbarSize() : void 0
      });
    }
    var handleWindowResize = useEventCallback(function() {
      if (modal) {
        updateDialogStyle(modal.dialog);
      }
    });
    useWillUnmount(function() {
      removeEventListener(window, "resize", handleWindowResize);
      if (removeStaticModalAnimationRef.current) {
        removeStaticModalAnimationRef.current();
      }
    });
    var handleDialogMouseDown = function handleDialogMouseDown2() {
      waitingForMouseUpRef.current = true;
    };
    var handleMouseUp = function handleMouseUp2(e) {
      if (waitingForMouseUpRef.current && modal && e.target === modal.dialog) {
        ignoreBackdropClickRef.current = true;
      }
      waitingForMouseUpRef.current = false;
    };
    var handleStaticModalAnimation = function handleStaticModalAnimation2() {
      setAnimateStaticModal(true);
      removeStaticModalAnimationRef.current = transitionEnd(modal.dialog, function() {
        setAnimateStaticModal(false);
      });
    };
    var handleStaticBackdropClick = function handleStaticBackdropClick2(e) {
      if (e.target !== e.currentTarget) {
        return;
      }
      handleStaticModalAnimation();
    };
    var handleClick = function handleClick2(e) {
      if (backdrop === "static") {
        handleStaticBackdropClick(e);
        return;
      }
      if (ignoreBackdropClickRef.current || e.target !== e.currentTarget) {
        ignoreBackdropClickRef.current = false;
        return;
      }
      onHide == null ? void 0 : onHide();
    };
    var handleEscapeKeyDown = function handleEscapeKeyDown2(e) {
      if (!keyboard && backdrop === "static") {
        e.preventDefault();
        handleStaticModalAnimation();
      } else if (keyboard && onEscapeKeyDown) {
        onEscapeKeyDown(e);
      }
    };
    var handleEnter = function handleEnter2(node, isAppearing) {
      if (node) {
        node.style.display = "block";
        updateDialogStyle(node);
      }
      onEnter == null ? void 0 : onEnter(node, isAppearing);
    };
    var handleExit = function handleExit2(node) {
      removeStaticModalAnimationRef.current == null ? void 0 : removeStaticModalAnimationRef.current();
      onExit == null ? void 0 : onExit(node);
    };
    var handleEntering = function handleEntering2(node, isAppearing) {
      onEntering == null ? void 0 : onEntering(node, isAppearing);
      addEventListener(window, "resize", handleWindowResize);
    };
    var handleExited = function handleExited2(node) {
      if (node)
        node.style.display = "";
      onExited == null ? void 0 : onExited(node);
      removeEventListener(window, "resize", handleWindowResize);
    };
    var renderBackdrop = reactExports.useCallback(function(backdropProps) {
      return /* @__PURE__ */ React.createElement("div", _extends({}, backdropProps, {
        className: classNames(bsPrefix + "-backdrop", backdropClassName, !animation && "show")
      }));
    }, [animation, backdropClassName, bsPrefix]);
    var baseModalStyle = _extends({}, style2, modalStyle);
    if (!animation) {
      baseModalStyle.display = "block";
    }
    var renderDialog = function renderDialog2(dialogProps) {
      return /* @__PURE__ */ React.createElement("div", _extends({
        role: "dialog"
      }, dialogProps, {
        style: baseModalStyle,
        className: classNames(className, bsPrefix, animateStaticModal && bsPrefix + "-static"),
        onClick: backdrop ? handleClick : void 0,
        onMouseUp: handleMouseUp,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        "aria-describedby": ariaDescribedby
      }), /* @__PURE__ */ React.createElement(Dialog, _extends({}, props, {
        onMouseDown: handleDialogMouseDown,
        className: dialogClassName,
        contentClassName
      }), children));
    };
    return /* @__PURE__ */ React.createElement(ModalContext.Provider, {
      value: modalContext
    }, /* @__PURE__ */ React.createElement(BaseModal, {
      show,
      ref: setModalRef,
      backdrop,
      container,
      keyboard: true,
      autoFocus,
      enforceFocus,
      restoreFocus,
      restoreFocusOptions,
      onEscapeKeyDown: handleEscapeKeyDown,
      onShow,
      onHide,
      onEnter: handleEnter,
      onEntering: handleEntering,
      onEntered,
      onExit: handleExit,
      onExiting,
      onExited: handleExited,
      manager: getModalManager(),
      containerClassName: bsPrefix + "-open",
      transition: animation ? DialogTransition : void 0,
      backdropTransition: animation ? BackdropTransition : void 0,
      renderBackdrop,
      renderDialog
    }));
  });
  Modal.displayName = "Modal";
  Modal.defaultProps = defaultProps$3;
  Modal.Body = ModalBody;
  Modal.Header = ModalHeader;
  Modal.Title = ModalTitle;
  Modal.Footer = ModalFooter;
  Modal.Dialog = ModalDialog;
  Modal.TRANSITION_DURATION = 300;
  Modal.BACKDROP_TRANSITION_DURATION = 150;
  var _excluded$6 = ["bsPrefix", "className", "children", "as"];
  var NavItem = /* @__PURE__ */ React.forwardRef(
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    function(_ref, ref) {
      var bsPrefix = _ref.bsPrefix, className = _ref.className, children = _ref.children, _ref$as = _ref.as, Component = _ref$as === void 0 ? "div" : _ref$as, props = _objectWithoutPropertiesLoose(_ref, _excluded$6);
      bsPrefix = useBootstrapPrefix(bsPrefix, "nav-item");
      return /* @__PURE__ */ React.createElement(Component, _extends({}, props, {
        ref,
        className: classNames(className, bsPrefix)
      }), children);
    }
  );
  NavItem.displayName = "NavItem";
  var _excluded$5 = ["bsPrefix", "disabled", "className", "href", "eventKey", "onSelect", "as"];
  var defaultProps$2 = {
    disabled: false,
    as: SafeAnchor
  };
  var NavLink = /* @__PURE__ */ React.forwardRef(function(_ref, ref) {
    var bsPrefix = _ref.bsPrefix, disabled = _ref.disabled, className = _ref.className, href = _ref.href, eventKey = _ref.eventKey, onSelect = _ref.onSelect, as = _ref.as, props = _objectWithoutPropertiesLoose(_ref, _excluded$5);
    bsPrefix = useBootstrapPrefix(bsPrefix, "nav-link");
    return /* @__PURE__ */ React.createElement(AbstractNavItem, _extends({}, props, {
      href,
      ref,
      eventKey,
      as,
      disabled,
      onSelect,
      className: classNames(className, bsPrefix, disabled && "disabled")
    }));
  });
  NavLink.displayName = "NavLink";
  NavLink.defaultProps = defaultProps$2;
  var _excluded$4 = ["as", "bsPrefix", "variant", "fill", "justify", "navbar", "navbarScroll", "className", "children", "activeKey"];
  var defaultProps$1 = {
    justify: false,
    fill: false
  };
  var Nav = /* @__PURE__ */ React.forwardRef(function(uncontrolledProps, ref) {
    var _classNames;
    var _useUncontrolled = useUncontrolled(uncontrolledProps, {
      activeKey: "onSelect"
    }), _useUncontrolled$as = _useUncontrolled.as, as = _useUncontrolled$as === void 0 ? "div" : _useUncontrolled$as, initialBsPrefix = _useUncontrolled.bsPrefix, variant = _useUncontrolled.variant, fill = _useUncontrolled.fill, justify = _useUncontrolled.justify, navbar = _useUncontrolled.navbar, navbarScroll = _useUncontrolled.navbarScroll, className = _useUncontrolled.className, children = _useUncontrolled.children, activeKey = _useUncontrolled.activeKey, props = _objectWithoutPropertiesLoose(_useUncontrolled, _excluded$4);
    var bsPrefix = useBootstrapPrefix(initialBsPrefix, "nav");
    var navbarBsPrefix;
    var cardHeaderBsPrefix;
    var isNavbar = false;
    var navbarContext = reactExports.useContext(context);
    var cardContext = reactExports.useContext(context$1);
    if (navbarContext) {
      navbarBsPrefix = navbarContext.bsPrefix;
      isNavbar = navbar == null ? true : navbar;
    } else if (cardContext) {
      cardHeaderBsPrefix = cardContext.cardHeaderBsPrefix;
    }
    return /* @__PURE__ */ React.createElement(AbstractNav, _extends({
      as,
      ref,
      activeKey,
      className: classNames(className, (_classNames = {}, _classNames[bsPrefix] = !isNavbar, _classNames[navbarBsPrefix + "-nav"] = isNavbar, _classNames[navbarBsPrefix + "-nav-scroll"] = isNavbar && navbarScroll, _classNames[cardHeaderBsPrefix + "-" + variant] = !!cardHeaderBsPrefix, _classNames[bsPrefix + "-" + variant] = !!variant, _classNames[bsPrefix + "-fill"] = fill, _classNames[bsPrefix + "-justified"] = justify, _classNames))
    }, props), children);
  });
  Nav.displayName = "Nav";
  Nav.defaultProps = defaultProps$1;
  Nav.Item = NavItem;
  Nav.Link = NavLink;
  var _excluded$3 = ["bsPrefix", "variant", "animation", "size", "children", "as", "className"];
  var Spinner = /* @__PURE__ */ React.forwardRef(function(_ref, ref) {
    var bsPrefix = _ref.bsPrefix, variant = _ref.variant, animation = _ref.animation, size2 = _ref.size, children = _ref.children, _ref$as = _ref.as, Component = _ref$as === void 0 ? "div" : _ref$as, className = _ref.className, props = _objectWithoutPropertiesLoose(_ref, _excluded$3);
    bsPrefix = useBootstrapPrefix(bsPrefix, "spinner");
    var bsSpinnerPrefix = bsPrefix + "-" + animation;
    return /* @__PURE__ */ React.createElement(Component, _extends({
      ref
    }, props, {
      className: classNames(className, bsSpinnerPrefix, size2 && bsSpinnerPrefix + "-" + size2, variant && "text-" + variant)
    }), children);
  });
  Spinner.displayName = "Spinner";
  var TabContainer = function TabContainer2(props) {
    var _useUncontrolled = useUncontrolled(props, {
      activeKey: "onSelect"
    }), id2 = _useUncontrolled.id, generateCustomChildId = _useUncontrolled.generateChildId, onSelect = _useUncontrolled.onSelect, activeKey = _useUncontrolled.activeKey, transition = _useUncontrolled.transition, mountOnEnter = _useUncontrolled.mountOnEnter, unmountOnExit = _useUncontrolled.unmountOnExit, children = _useUncontrolled.children;
    var generateChildId = reactExports.useMemo(function() {
      return generateCustomChildId || function(key, type) {
        return id2 ? id2 + "-" + type + "-" + key : null;
      };
    }, [id2, generateCustomChildId]);
    var tabContext = reactExports.useMemo(function() {
      return {
        onSelect,
        activeKey,
        transition,
        mountOnEnter: mountOnEnter || false,
        unmountOnExit: unmountOnExit || false,
        getControlledId: function getControlledId(key) {
          return generateChildId(key, "tabpane");
        },
        getControllerId: function getControllerId(key) {
          return generateChildId(key, "tab");
        }
      };
    }, [onSelect, activeKey, transition, mountOnEnter, unmountOnExit, generateChildId]);
    return /* @__PURE__ */ React.createElement(TabContext.Provider, {
      value: tabContext
    }, /* @__PURE__ */ React.createElement(SelectableContext.Provider, {
      value: onSelect || null
    }, children));
  };
  var _excluded$2 = ["bsPrefix", "as", "className"];
  var TabContent = /* @__PURE__ */ React.forwardRef(function(_ref, ref) {
    var bsPrefix = _ref.bsPrefix, _ref$as = _ref.as, Component = _ref$as === void 0 ? "div" : _ref$as, className = _ref.className, props = _objectWithoutPropertiesLoose(_ref, _excluded$2);
    var decoratedBsPrefix = useBootstrapPrefix(bsPrefix, "tab-content");
    return /* @__PURE__ */ React.createElement(Component, _extends({
      ref
    }, props, {
      className: classNames(className, decoratedBsPrefix)
    }));
  });
  var _excluded$1 = ["activeKey", "getControlledId", "getControllerId"], _excluded2 = ["bsPrefix", "className", "active", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "mountOnEnter", "unmountOnExit", "transition", "as", "eventKey"];
  function useTabContext(props) {
    var context2 = reactExports.useContext(TabContext);
    if (!context2)
      return props;
    var activeKey = context2.activeKey, getControlledId = context2.getControlledId, getControllerId = context2.getControllerId, rest = _objectWithoutPropertiesLoose(context2, _excluded$1);
    var shouldTransition = props.transition !== false && rest.transition !== false;
    var key = makeEventKey(props.eventKey);
    return _extends({}, props, {
      active: props.active == null && key != null ? makeEventKey(activeKey) === key : props.active,
      id: getControlledId(props.eventKey),
      "aria-labelledby": getControllerId(props.eventKey),
      transition: shouldTransition && (props.transition || rest.transition || Fade),
      mountOnEnter: props.mountOnEnter != null ? props.mountOnEnter : rest.mountOnEnter,
      unmountOnExit: props.unmountOnExit != null ? props.unmountOnExit : rest.unmountOnExit
    });
  }
  var TabPane = /* @__PURE__ */ React.forwardRef(function(props, ref) {
    var _useTabContext = useTabContext(props), bsPrefix = _useTabContext.bsPrefix, className = _useTabContext.className, active = _useTabContext.active, onEnter = _useTabContext.onEnter, onEntering = _useTabContext.onEntering, onEntered = _useTabContext.onEntered, onExit = _useTabContext.onExit, onExiting = _useTabContext.onExiting, onExited = _useTabContext.onExited, mountOnEnter = _useTabContext.mountOnEnter, unmountOnExit = _useTabContext.unmountOnExit, Transition2 = _useTabContext.transition, _useTabContext$as = _useTabContext.as, Component = _useTabContext$as === void 0 ? "div" : _useTabContext$as;
    _useTabContext.eventKey;
    var rest = _objectWithoutPropertiesLoose(_useTabContext, _excluded2);
    var prefix = useBootstrapPrefix(bsPrefix, "tab-pane");
    if (!active && !Transition2 && unmountOnExit)
      return null;
    var pane = /* @__PURE__ */ React.createElement(Component, _extends({}, rest, {
      ref,
      role: "tabpanel",
      "aria-hidden": !active,
      className: classNames(className, prefix, {
        active
      })
    }));
    if (Transition2)
      pane = /* @__PURE__ */ React.createElement(Transition2, {
        in: active,
        onEnter,
        onEntering,
        onEntered,
        onExit,
        onExiting,
        onExited,
        mountOnEnter,
        unmountOnExit
      }, pane);
    return /* @__PURE__ */ React.createElement(TabContext.Provider, {
      value: null
    }, /* @__PURE__ */ React.createElement(SelectableContext.Provider, {
      value: null
    }, pane));
  });
  TabPane.displayName = "TabPane";
  var Tab = /* @__PURE__ */ function(_React$Component) {
    _inheritsLoose(Tab2, _React$Component);
    function Tab2() {
      return _React$Component.apply(this, arguments) || this;
    }
    var _proto = Tab2.prototype;
    _proto.render = function render() {
      throw new Error("ReactBootstrap: The `Tab` component is not meant to be rendered! It's an abstract component that is only valid as a direct Child of the `Tabs` Component. For custom tabs components use TabPane and TabsContainer directly");
    };
    return Tab2;
  }(React.Component);
  Tab.Container = TabContainer;
  Tab.Content = TabContent;
  Tab.Pane = TabPane;
  var _excluded = ["id", "onSelect", "transition", "mountOnEnter", "unmountOnExit", "children", "activeKey"];
  var defaultProps = {
    variant: "tabs",
    mountOnEnter: false,
    unmountOnExit: false
  };
  function getDefaultActiveKey(children) {
    var defaultActiveKey;
    forEach(children, function(child) {
      if (defaultActiveKey == null) {
        defaultActiveKey = child.props.eventKey;
      }
    });
    return defaultActiveKey;
  }
  function renderTab(child) {
    var _child$props = child.props, title = _child$props.title, eventKey = _child$props.eventKey, disabled = _child$props.disabled, tabClassName = _child$props.tabClassName, id2 = _child$props.id;
    if (title == null) {
      return null;
    }
    return /* @__PURE__ */ React.createElement(NavItem, {
      as: NavLink,
      eventKey,
      disabled,
      id: id2,
      className: tabClassName
    }, title);
  }
  var Tabs = function Tabs2(props) {
    var _useUncontrolled = useUncontrolled(props, {
      activeKey: "onSelect"
    }), id2 = _useUncontrolled.id, onSelect = _useUncontrolled.onSelect, transition = _useUncontrolled.transition, mountOnEnter = _useUncontrolled.mountOnEnter, unmountOnExit = _useUncontrolled.unmountOnExit, children = _useUncontrolled.children, _useUncontrolled$acti = _useUncontrolled.activeKey, activeKey = _useUncontrolled$acti === void 0 ? getDefaultActiveKey(children) : _useUncontrolled$acti, controlledProps = _objectWithoutPropertiesLoose(_useUncontrolled, _excluded);
    return /* @__PURE__ */ React.createElement(TabContainer, {
      id: id2,
      activeKey,
      onSelect,
      transition,
      mountOnEnter,
      unmountOnExit
    }, /* @__PURE__ */ React.createElement(Nav, _extends({}, controlledProps, {
      role: "tablist",
      as: "nav"
    }), map(children, renderTab)), /* @__PURE__ */ React.createElement(TabContent, null, map(children, function(child) {
      var childProps = _extends({}, child.props);
      delete childProps.title;
      delete childProps.disabled;
      delete childProps.tabClassName;
      return /* @__PURE__ */ React.createElement(TabPane, childProps);
    })));
  };
  Tabs.defaultProps = defaultProps;
  Tabs.displayName = "Tabs";
  function log(...args) {
    console.log("Userscript (React Mode):", ...args);
  }
  function logFetch(arg) {
    const url = new URL(arg, String(window.location));
    log("GET request", "" + url);
    return fetch("" + url, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json+canvas-string-ids"
      }
    });
  }
  function logPut(url, body = {}) {
    url = new URL(url, String(window.location));
    log("PUT request", "" + url, body);
    return fetch("" + url, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json+canvas-string-ids"
      },
      body: JSON.stringify({ ...body, authenticity_token: getCSRFToken() }),
      method: "PUT"
    });
  }
  function addLocationChangeCallback(callback) {
    window.setTimeout(callback, 0);
    let oldHref = window.location.href;
    const body = document.querySelector("body");
    const observer = new MutationObserver((mutations) => {
      if (mutations.some(() => oldHref !== document.location.href)) {
        oldHref = document.location.href;
        callback();
      }
    });
    if (!body) {
      log("Cannot find body. URL change listener disabled.");
      return;
    }
    observer.observe(body, { childList: true, subtree: true });
    return observer;
  }
  function getCSRFToken() {
    const csrfCookie = document.cookie.split(";").find((v2) => v2.trim().startsWith("_csrf_token="));
    if (csrfCookie) {
      return decodeURIComponent(csrfCookie.trim().slice(12));
    }
  }
  async function awaitElement(selector) {
    const MAX_TRIES = 60;
    let tries = 0;
    return new Promise((resolve, reject) => {
      function probe() {
        tries++;
        return document.querySelector(selector);
      }
      function delayedProbe() {
        if (tries >= MAX_TRIES) {
          log("Can't find element with selector", selector);
          reject();
          return;
        }
        const elm = probe();
        if (elm) {
          resolve(elm);
          return;
        }
        window.setTimeout(delayedProbe, 250);
      }
      delayedProbe();
    });
  }
  function quizHtmlToOrder(html) {
    const parser2 = new DOMParser();
    const doc = parser2.parseFromString(html, "text/html");
    const nodes2 = doc.querySelectorAll(
      "div[data-group-id], div.question[id^='question_']"
    );
    let seen = {};
    const ids = Array.from(nodes2).map((node) => {
      var _a;
      let attr = node.getAttribute("id");
      if (attr == null ? void 0 : attr.match(/question_(\d+)/)) {
        return (_a = attr == null ? void 0 : attr.match(/question_(\d+)/)) == null ? void 0 : _a[1];
      } else {
        return node.getAttribute("data-group-id");
      }
    }).filter((id2) => {
      if (!id2) {
        return false;
      }
      if (seen[id2]) {
        return false;
      }
      seen[id2] = true;
      return true;
    });
    return ids;
  }
  function quizQuestionsToHash(questions) {
    const ret = {};
    for (const q2 of questions) {
      if (q2.type === "question_group") {
        for (const innerQ of q2.questions) {
          ret[innerQ.id] = innerQ;
        }
      } else {
        ret[q2.id] = q2;
      }
    }
    return ret;
  }
  function extractAnswersFromSubmissionHtml(html) {
    var _a, _b, _c;
    const parser2 = new DOMParser();
    const doc = parser2.parseFromString(html, "text/html");
    const questions = doc.querySelectorAll(".question");
    let ret = {};
    for (const q2 of questions) {
      if (q2.getAttribute("id") === "question_blank") {
        continue;
      }
      const questionId = ((_a = (q2.getAttribute("id") ?? "").match(/question_(\d+)/)) == null ? void 0 : _a[1]) ?? "unknown";
      if (questionId === "unknown") {
        log("Could not find question id for question", q2.outerHTML);
      }
      const questionType = q2.classList.contains("multiple_answers_question") ? "multiple_answers_question" : q2.classList.contains("multiple_choice_question") ? "multiple_choice_question" : q2.classList.contains("text_only_question") ? "text_only_question" : q2.classList.contains("essay_question") ? "essay_question" : "unknown";
      if (questionType === "unknown") {
        log(
          "Could not find question type for question",
          questionId,
          "from classes",
          q2.getAttribute("class")
        );
        continue;
      }
      let answer;
      switch (questionType) {
        case "essay_question":
        case "text_only_question": {
          const userAnswer = ((_b = q2.querySelector(".quiz_response_text")) == null ? void 0 : _b.innerHTML) || "";
          answer = { type: "essay", value: userAnswer };
          break;
        }
        case "multiple_answers_question":
        case "multiple_choice_question": {
          const selectedAnswers = Array.from(
            q2.querySelectorAll(".selected_answer")
          ).map((e) => {
            var _a2, _b2;
            const answerId = ((_b2 = (_a2 = e.getAttribute("id")) == null ? void 0 : _a2.match(/answer_(\d+)/)) == null ? void 0 : _b2[1]) || "unknown";
            const answerText = e.getAttribute("text") || "unknown";
            return { answerId, answerText };
          });
          if (questionType === "multiple_choice_question") {
            answer = {
              type: "multiple_choice",
              value: (_c = selectedAnswers[0]) == null ? void 0 : _c.answerId
            };
          } else {
            answer = {
              type: "multiple_answers",
              value: selectedAnswers.map((a) => a.answerId)
            };
          }
          break;
        }
      }
      ret[questionId] = answer;
    }
    return ret;
  }
  function extractQuizQuestionsFromHtml(html) {
    var _a, _b, _c, _d, _e;
    const parser2 = new DOMParser();
    const doc = parser2.parseFromString(html, "text/html");
    const questions = doc.querySelectorAll(".question");
    let ret = [];
    for (const q2 of questions) {
      if (q2.getAttribute("id") === "question_blank" || q2.getAttribute("id") === "question_new") {
        continue;
      }
      const questionId = ((_a = (q2.getAttribute("id") ?? "").match(/question_(\d+)/)) == null ? void 0 : _a[1]) ?? "unknown";
      if (questionId === "unknown") {
        log("Could not find question id for question", q2.outerHTML);
      }
      const questionType = q2.classList.contains("multiple_answers_question") ? "multiple_answers_question" : q2.classList.contains("multiple_choice_question") ? "multiple_choice_question" : q2.classList.contains("text_only_question") ? "text_only_question" : q2.classList.contains("essay_question") ? "essay_question" : "unknown";
      if (questionType === "unknown") {
        log(
          "Could not find question type for question",
          questionId,
          "from classes",
          q2.getAttribute("class")
        );
        continue;
      }
      const questionName = ((_b = q2.querySelector(".question_name")) == null ? void 0 : _b.textContent) || "";
      const questionText = ((_c = q2.querySelector(".question_text")) == null ? void 0 : _c.innerHTML) || "";
      let question = {
        id: +questionId,
        quiz_id: 0,
        position: 0,
        question_name: questionName,
        question_type: questionType,
        question_text: questionText.trim(),
        points_possible: 0,
        correct_comments: "",
        incorrect_comments: "",
        answers: []
      };
      for (const answerNode of q2.querySelectorAll(".answer")) {
        switch (questionType) {
          case "essay_question":
          case "text_only_question": {
            break;
          }
          case "multiple_answers_question":
          case "multiple_choice_question": {
            const id2 = +(((_e = (_d = answerNode.getAttribute("id")) == null ? void 0 : _d.match(/answer_(\d+)/)) == null ? void 0 : _e[1]) || "0");
            if (isNaN(id2)) {
              log(
                "Failed to find answer id",
                answerNode.getAttribute("id")
              );
            }
            question.answers.push({
              weight: 0,
              id: id2,
              text: answerNode.getAttribute("title") || ""
            });
            break;
          }
        }
      }
      ret.push(question);
    }
    return ret;
  }
  function QueryApi(props) {
    const [spinner, setSpinner] = React.useState(false);
    const [url, setUrl] = React.useState("");
    const [result, setResult] = React.useState("");
    async function query() {
      setSpinner(true);
      try {
        const resp = await logFetch(unescape(url));
        const json = await resp.json();
        log("Raw result", json);
        setResult(JSON.stringify(json, null, 4));
      } catch (e) {
        setResult("Error encountered. See console.");
        log(e);
      } finally {
        setSpinner(false);
      }
    }
    return /* @__PURE__ */ React.createElement("div", { className: "my-2" }, /* @__PURE__ */ React.createElement("p", null, "Enter the API endpoint to be queried. A prefix of", " ", /* @__PURE__ */ React.createElement("i", null, "https://q.utoronto.ca"), " is automatically added. Check the", " ", /* @__PURE__ */ React.createElement("a", { href: "https://canvas.instructure.com/doc/api/" }, "Canvas API Documentation"), "for details. All results are returned as JSON."), /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "query-input",
        value: url,
        onChange: (e) => {
          setUrl(e.target.value);
        }
      }
    ), "Unescaped URL:", /* @__PURE__ */ React.createElement(
      "input",
      {
        value: unescape(url),
        className: "query-input",
        onChange: () => {
        }
      }
    ), /* @__PURE__ */ React.createElement(Button, { onClick: query }, spinner && /* @__PURE__ */ React.createElement(Spinner, { animation: "border", role: "status" }), "Query"), /* @__PURE__ */ React.createElement("div", { style: { whiteSpace: "pre" } }, result));
  }
  class Quiz {
    init({ courseId, quizId }) {
      this.courseId = courseId;
      this.quizId = quizId;
    }
    /**
     * Fetch all the Quiz questions
     *
     * @memberof Quiz
     */
    async fetchQuestions({ asFlatList = false } = {}) {
      var _a;
      const url = `/api/v1/courses/${this.courseId}/quizzes/${this.quizId}/questions?per_page=1000`;
      const groupUrl = `/api/v1/courses/${this.courseId}/quizzes/${this.quizId}/groups/`;
      const editUrl = `/courses/${this.courseId}/quizzes/${this.quizId}/edit`;
      const statisticsUrl = `/api/v1/courses/${this.courseId}/quizzes/${this.quizId}/statistics`;
      const readOnlyUrl = `/courses/${this.courseId}/quizzes/${this.quizId}/read_only`;
      const resp = await logFetch(unescape(url));
      const json = await resp.json();
      log("Got quiz questions", json);
      this.quizQuestions = json.status !== "unauthorized" ? json : null;
      if (!this.quizQuestions) {
        log(
          "Failed to fetch quiz questions via `/api/v1/courses/:courseId/quizzes/:quizId/questions`",
          "Trying alternative"
        );
        try {
          const resp2 = await logFetch(statisticsUrl);
          const json2 = await resp2.json();
          const stats = ((_a = json2.quiz_statistics[0]) == null ? void 0 : _a.question_statistics) || [];
          const ret2 = stats.map((stat, i) => ({
            id: +stat.id,
            quiz_id: +this.quizId,
            position: i,
            question_name: "",
            question_type: stat.question_type,
            question_text: stat.question_text,
            points_possible: -1,
            answers: (stat.answers || []).map((a) => ({
              weight: 0,
              id: +a.id,
              text: a.text || ""
            })),
            correct_comments: "",
            incorrect_comments: ""
          }));
          return ret2;
        } catch (e) {
          log(
            "Failed to fetch quiz questions via `/api/v1/courses/:courseId/quizzes/:quizId/statistics`",
            e,
            "Trying alternative"
          );
          try {
            const resp2 = await logFetch(readOnlyUrl);
            const html = await resp2.text();
            const ret2 = extractQuizQuestionsFromHtml(html);
            log(ret2);
            return ret2;
          } catch (e2) {
            log(
              "Failed to fetch quiz questions via `/courses/:courseId/quizzes/:quizId/read_only`",
              e2
            );
            return [];
          }
        }
      }
      if (asFlatList) {
        return this.quizQuestions;
      }
      const quizGroups = {};
      for (const question of this.quizQuestions) {
        const groupId = String(question.quiz_group_id);
        quizGroups[groupId] = quizGroups[groupId] || [];
        quizGroups[groupId].push(question);
      }
      const groupIds = Object.keys(quizGroups).filter(
        (id2) => id2 !== "null" && id2 !== "undefined"
      );
      log("Found the following question groups", groupIds);
      const editFetchResp = logFetch(editUrl);
      const resps = await Promise.all(
        groupIds.map((id2) => logFetch(groupUrl + id2))
      );
      const groupInfo = await Promise.all(resps.map((resp2) => resp2.json()));
      const groups = {};
      for (const group of groupInfo) {
        groups[group.id] = {
          type: "question_group",
          ...group,
          questions: quizGroups[group.id] || []
        };
      }
      const editPageContents = await (await editFetchResp).text();
      const questionOder = quizHtmlToOrder(editPageContents);
      const ret = this.quizQuestions.filter(
        (q2) => "" + q2.quiz_group_id === "null" || "" + q2.quiz_group_id === "undefined"
      ).concat(Object.values(groups));
      ret.forEach((item) => {
        item.position = questionOder.indexOf(String(item.id));
      });
      ret.sort((a, b) => (a.position | 0) - (b.position | 0));
      return ret;
    }
    /**
     * Fetch the ids of all quiz submissions
     *
     * @memberof Quiz
     */
    async fetchSubmissionIds(progressCallback = (_prog) => {
    }) {
      const PAGE_SIZE = 20;
      const progress = {
        status: "in progress",
        message: "",
        total: null,
        progress: null,
        partialData: []
      };
      function notifyProgress() {
        progressCallback({ ...progress });
      }
      const url = `/api/v1/courses/${this.courseId}/quizzes/${this.quizId}/submissions?include[]=user&per_page=${PAGE_SIZE}`;
      let resp = null;
      progress.message = "Getting total number of submissions";
      notifyProgress();
      const numSubmissions = await this.findNumPages(
        `/api/v1/courses/${this.courseId}/quizzes/${this.quizId}/submissions?per_page=1`
      );
      progress.message = "";
      progress.total = numSubmissions;
      notifyProgress();
      const ret = [];
      const numPages = Math.ceil(numSubmissions / PAGE_SIZE);
      for (let page = 1; page <= numPages; page++) {
        progress.message = `Fetching ${page * PAGE_SIZE} of ${numSubmissions}`;
        notifyProgress();
        resp = await logFetch(url + "&page=" + page);
        const json = await resp.json();
        const submissions = combineSubmissionAndUserData(json);
        ret.push(...submissions);
        progress.partialData = [...ret];
        notifyProgress();
      }
      progress.status = "";
      notifyProgress();
      return ret;
    }
    async gradeSubmissions(submissions = [], questionInfo = { score: 0, id: "1234567" }, progressCallback = (_prog) => {
    }) {
      const BATCH_SIZE = 20;
      const progress = {
        status: "in progress",
        message: "",
        total: null,
        progress: null,
        partialData: []
      };
      function notifyProgress() {
        progressCallback({ ...progress });
      }
      const url = `/api/v1/courses/${this.courseId}/quizzes/${this.quizId}/submissions/`;
      for (let i = 0; i <= Math.ceil(submissions.length / BATCH_SIZE); i++) {
        const slice = submissions.slice(
          i * BATCH_SIZE,
          (i + 1) * BATCH_SIZE
        );
        progress.message = `Grading submissions ${i * BATCH_SIZE} of ${submissions.length}`;
        notifyProgress();
        const promises = slice.map(
          (submission) => logPut(url + submission.id, {
            quiz_submissions: [
              {
                attempt: submission.attempt,
                questions: {
                  [questionInfo.id]: {
                    score: questionInfo.score
                  }
                }
              }
            ]
          })
        );
        await Promise.all(promises);
      }
      progress.status = "done";
      progress.message = `Graded all ${submissions.length} submissions`;
      notifyProgress();
    }
    /**
     * Fetch the quiz submissions and answers that students gave
     *
     * @memberof Quiz
     */
    async fetchSubmissionsWithAnswers(progressCallback = (_prog) => {
    }) {
      const ret = {};
      const PAGE_SIZE = 20;
      const progressA = {
        status: "in progress",
        message: "",
        total: null,
        progress: null,
        partialData: []
      };
      const progressB = {
        status: "in progress",
        message: "",
        total: null,
        progress: null,
        partialData: []
      };
      function notifyProgress() {
        const progress = { ...progressA };
        progress.status = progressA.status || progressB.status;
        progress.message = [progressA.message, progressB.message].filter((x2) => x2).join("; ");
        progress.total = progressB.total != null ? progressB.total + 0 : null;
        progress.progress = null;
        progressCallback({ ...progress });
      }
      const quizUrl = `/api/v1/courses/${this.courseId}/quizzes/${this.quizId}`;
      const quizVersionUrl = `/api/v1/courses/${this.courseId}/quizzes/${this.quizId}/submissions?include[]=user&per_page=${PAGE_SIZE}`;
      let resp = null;
      progressA.message = "Fetching Quiz Details";
      notifyProgress();
      resp = await logFetch(quizUrl);
      const quizData = await resp.json();
      const assignmentId = quizData["assignment_id"] || quizData["id"];
      log("Quiz", this.quizId, "has assignment id", assignmentId);
      const quizQuestions = await this.fetchQuestions();
      quizQuestionsToHash(quizQuestions);
      const getQuizSubmittedAnswers = async () => {
        const answersUrl = `/api/v1/courses/${this.courseId}/quizzes/${assignmentId}/submissions?include[]=user&include[]=submission_history&per_page=${PAGE_SIZE}`;
        const numSubmissions = await this.findNumPages(
          `/api/v1/courses/${this.courseId}/quizzes/${assignmentId}/submissions?per_page=1`
        );
        const numPages = Math.ceil(numSubmissions / PAGE_SIZE);
        for (let page = 1; page <= numPages; page++) {
          progressA.message = `Fetching ${page * PAGE_SIZE} of ${numSubmissions}`;
          notifyProgress();
          resp = await logFetch(answersUrl + "&page=" + page);
          const quizSubmissions = await resp.json();
          log("Got user answers", quizSubmissions, answersUrl);
          let queue = [];
          for (const submission of quizSubmissions.quiz_submissions) {
            if (queue.length > 10) {
              await Promise.all(queue);
              queue.length = 0;
            }
            queue.push(
              (async () => {
                const user = quizSubmissions.users.find(
                  (u2) => u2.id === submission.user_id
                );
                if (!user) {
                  log(
                    "Could not find user",
                    submission.user_id,
                    "in",
                    quizSubmissions.users
                  );
                  return;
                }
                const resultUrl = submission.result_url;
                resp = await logFetch(resultUrl);
                const resultData = await resp.text();
                const questionAnswers = extractAnswersFromSubmissionHtml(resultData);
                const utorid = user.sis_user_id || user.id;
                ret[utorid] = ret[utorid] || {};
                ret[utorid].user = {
                  utorid: user.sis_user_id,
                  id: user.integration_id,
                  canvas_id: user.id
                };
                ret[utorid].workflow_state = submission.workflow_state;
                ret[utorid].answers = questionAnswers;
              })()
            );
          }
          await Promise.all(queue);
        }
        progressA.status = "";
        notifyProgress();
        return ret;
      };
      const getQuizVersions = async () => {
        progressB.message = "Getting total number of submissions";
        notifyProgress();
        const numSubmissions = await this.findNumPages(
          `/api/v1/courses/${this.courseId}/quizzes/${this.quizId}/submissions?per_page=1`
        );
        progressB.message = "";
        progressB.total = numSubmissions;
        notifyProgress();
        const numPages = Math.ceil(numSubmissions / PAGE_SIZE);
        for (let page = 1; page <= numPages; page++) {
          progressB.message = `Fetching ${page * PAGE_SIZE} of ${numSubmissions}`;
          notifyProgress();
          resp = await logFetch(quizVersionUrl + "&page=" + page);
          const json = await resp.json();
          const submissions = combineSubmissionAndUserData(json);
          const detailedSubmissions = await Promise.all(
            submissions.map(async (s) => {
              const rawData = await (await logFetch(
                `/api/v1/quiz_submissions/${s.id}/questions`
              )).json();
              return { ...rawData, submission_id: s.id };
            })
          );
          const submissionsHash = submissionsToSubmissionsHash(detailedSubmissions);
          const combinedSubmissionData = submissions.map((sub) => ({
            ...sub,
            questions: submissionsHash[sub.id]
          }));
          log("Combined submission data", combinedSubmissionData);
          for (const submission of combinedSubmissionData) {
            const utorid = submission.user.sis_user_id;
            ret[utorid] = ret[utorid] || {};
            ret[utorid].questions = submission.questions;
          }
          notifyProgress();
        }
        progressB.status = "";
        notifyProgress();
        return ret;
      };
      await Promise.all([getQuizSubmittedAnswers(), getQuizVersions()]);
      const fullData = {
        quizQuestions,
        quizSubmissions: Object.values(ret)
      };
      console.log("OUTING", fullData);
      return fullData;
    }
    /**
     * Fetch the quiz submissions
     *
     * @memberof Quiz
     */
    async fetchSubmissions(progressCallback = (_prog) => {
    }) {
      const PAGE_SIZE = 20;
      const progress = {
        status: "in progress",
        message: "",
        total: null,
        progress: null,
        partialData: []
      };
      function notifyProgress() {
        progressCallback({ ...progress });
      }
      const url = `/api/v1/courses/${this.courseId}/quizzes/${this.quizId}/submissions?include[]=user&per_page=${PAGE_SIZE}`;
      let resp = null;
      progress.message = "Getting total number of submissions";
      notifyProgress();
      const numSubmissions = await this.findNumPages(
        `/api/v1/courses/${this.courseId}/quizzes/${this.quizId}/submissions?per_page=1`
      );
      progress.message = "";
      progress.total = numSubmissions;
      notifyProgress();
      const ret = [];
      const numPages = Math.ceil(numSubmissions / PAGE_SIZE);
      for (let page = 1; page <= numPages; page++) {
        progress.message = `Fetching ${page * PAGE_SIZE} of ${numSubmissions}`;
        notifyProgress();
        resp = await logFetch(url + "&page=" + page);
        const json = await resp.json();
        const submissions = combineSubmissionAndUserData(json);
        log("got submissions", submissions);
        const detailedSubmissions = await Promise.all(
          submissions.map(async (s) => {
            const rawData = await (await logFetch(
              `/api/v1/quiz_submissions/${s.id}/questions`
            )).json();
            return { ...rawData, submission_id: s.id };
          })
        );
        const submissionsHash = submissionsToSubmissionsHash(detailedSubmissions);
        const combinedSubmissionData = submissions.map((sub) => ({
          ...sub,
          questions: submissionsHash[sub.id]
        }));
        log("Combined submission data", combinedSubmissionData);
        ret.push(...combinedSubmissionData);
        progress.partialData = [...ret];
        notifyProgress();
      }
      progress.status = "";
      notifyProgress();
      return ret;
    }
    /**
     * Perform bisection to find the number of pages associated with the API
     * endpoint specified by `url`
     *
     * @param {*} url
     * @memberof Quiz
     */
    async findNumPages(url) {
      const START_GUESS = 1e3;
      let guessPage = START_GUESS;
      let lowerBound = 1;
      let upperBound = 1e6;
      function getURL(page) {
        if (page == null) {
          page = guessPage;
        }
        return url + "&page=" + page;
      }
      async function isEmptyAt(page) {
        const resp = await logFetch(getURL(page));
        const json = await resp.json();
        return getPrimaryData(json).length === 0;
      }
      for (let i = 0; i < 10; i++) {
        if (await isEmptyAt(guessPage)) {
          break;
        }
        lowerBound = guessPage;
        guessPage *= 2;
      }
      upperBound = guessPage;
      for (
        let i = 0;
        // XXX This formula is NOT right, but I cannot be bothered to figured it out right now...
        i < 2 * Math.log(upperBound - lowerBound) / Math.log(2) + 10;
        i++
      ) {
        if (lowerBound === upperBound) {
          break;
        }
        guessPage = Math.floor(lowerBound / 2 + upperBound / 2) | 0;
        if (await isEmptyAt(guessPage)) {
          upperBound = guessPage;
        } else {
          lowerBound = guessPage;
        }
      }
      return Math.max(lowerBound, upperBound) - 1;
    }
  }
  function combineSubmissionAndUserData(data) {
    const submissions = data.quiz_submissions;
    const usersList = data.users;
    const users = {};
    for (const user of usersList) {
      users[user.id] = user;
    }
    return submissions.map((s) => ({ ...s, user: users[s.user_id] }));
  }
  function submissionsToSubmissionsHash(data) {
    const ret = {};
    for (const submission of data) {
      const questions = [...submission.quiz_submission_questions || []];
      questions.sort((a, b) => a.position - b.position);
      ret[submission.submission_id] = questions.map((q2) => q2.id);
    }
    return ret;
  }
  function formatSubmissionsAsCSV(submissions) {
    let ret = "last,first,utorid,quercus_id,id,end_at,questions\n";
    return ret + submissions.map(
      (sub) => [
        sub.user.sortable_name,
        sub.user.sis_user_id,
        sub.user.id,
        sub.user.integration_id,
        sub.end_at,
        ...sub.questions
      ].join(",")
    ).join("\n");
  }
  function getPrimaryData(data) {
    if (Array.isArray(data)) {
      return data;
    }
    const keys = Object.keys(data);
    if (keys.length === 0) {
      return data;
    }
    if (keys.length === 1) {
      return data[keys[0]];
    }
    if (data.meta) {
      return data[data.meta.primaryCollection];
    }
    return data;
  }
  const quizGlobal = new Quiz();
  function Question({ data = {} }) {
    const { question_type, question_text, id: id2, answers, type } = data;
    if (type === "question_group") {
      return /* @__PURE__ */ React.createElement(QuestionGroup, { data });
    }
    let answerNodes = null;
    if (question_type !== "text_only_question" && question_type !== "essay_question") {
      answerNodes = /* @__PURE__ */ React.createElement("div", { className: "question-answer-box" }, answers.map((answer, i) => /* @__PURE__ */ React.createElement(Answer, { data: answer, key: i, extraClass: question_type })));
    }
    return /* @__PURE__ */ React.createElement("div", { className: "question-container" }, /* @__PURE__ */ React.createElement("div", { className: "question-id" }, id2, " (type: ", question_type, ")"), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "question-body",
        dangerouslySetInnerHTML: { __html: question_text }
      }
    ), answerNodes);
  }
  function QuestionGroup({ data = {} }) {
    const { question_points, pick_count, questions } = data;
    return /* @__PURE__ */ React.createElement("div", { className: "group-container" }, /* @__PURE__ */ React.createElement("h4", null, "Question Group (Pick ", pick_count, " of ", questions.length, ";", " ", question_points, " points each)"), /* @__PURE__ */ React.createElement("div", { className: "question-group" }, questions.map((question, i) => /* @__PURE__ */ React.createElement(Question, { data: question, key: i }))));
  }
  function Answer({ data = {}, extraClass }) {
    let { text, html, weight } = data;
    if (!html) {
      html = text;
    }
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        className: `question-option ${extraClass} ${weight > 0 ? "correct" : "incorrect"}`,
        dangerouslySetInnerHTML: { __html: html }
      }
    );
  }
  function commonjsRequire(path) {
    throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
  }
  var compiledGrammar = {};
  (function(exports) {
    var parser2 = function() {
      var o = function(k, v2, o2, l2) {
        for (o2 = o2 || {}, l2 = k.length; l2--; o2[k[l2]] = v2)
          ;
        return o2;
      }, $V0 = [1, 9], $V1 = [1, 10], $V2 = [1, 11], $V3 = [1, 12], $V4 = [5, 11, 12, 13, 14, 15];
      var parser3 = {
        trace: function trace() {
        },
        yy: {},
        symbols_: { "error": 2, "root": 3, "expressions": 4, "EOF": 5, "expression": 6, "optional": 7, "literal": 8, "splat": 9, "param": 10, "(": 11, ")": 12, "LITERAL": 13, "SPLAT": 14, "PARAM": 15, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 5: "EOF", 11: "(", 12: ")", 13: "LITERAL", 14: "SPLAT", 15: "PARAM" },
        productions_: [0, [3, 2], [3, 1], [4, 2], [4, 1], [6, 1], [6, 1], [6, 1], [6, 1], [7, 3], [8, 1], [9, 1], [10, 1]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
          var $0 = $$.length - 1;
          switch (yystate) {
            case 1:
              return new yy.Root({}, [$$[$0 - 1]]);
            case 2:
              return new yy.Root({}, [new yy.Literal({ value: "" })]);
            case 3:
              this.$ = new yy.Concat({}, [$$[$0 - 1], $$[$0]]);
              break;
            case 4:
            case 5:
              this.$ = $$[$0];
              break;
            case 6:
              this.$ = new yy.Literal({ value: $$[$0] });
              break;
            case 7:
              this.$ = new yy.Splat({ name: $$[$0] });
              break;
            case 8:
              this.$ = new yy.Param({ name: $$[$0] });
              break;
            case 9:
              this.$ = new yy.Optional({}, [$$[$0 - 1]]);
              break;
            case 10:
              this.$ = yytext;
              break;
            case 11:
            case 12:
              this.$ = yytext.slice(1);
              break;
          }
        },
        table: [{ 3: 1, 4: 2, 5: [1, 3], 6: 4, 7: 5, 8: 6, 9: 7, 10: 8, 11: $V0, 13: $V1, 14: $V2, 15: $V3 }, { 1: [3] }, { 5: [1, 13], 6: 14, 7: 5, 8: 6, 9: 7, 10: 8, 11: $V0, 13: $V1, 14: $V2, 15: $V3 }, { 1: [2, 2] }, o($V4, [2, 4]), o($V4, [2, 5]), o($V4, [2, 6]), o($V4, [2, 7]), o($V4, [2, 8]), { 4: 15, 6: 4, 7: 5, 8: 6, 9: 7, 10: 8, 11: $V0, 13: $V1, 14: $V2, 15: $V3 }, o($V4, [2, 10]), o($V4, [2, 11]), o($V4, [2, 12]), { 1: [2, 1] }, o($V4, [2, 3]), { 6: 14, 7: 5, 8: 6, 9: 7, 10: 8, 11: $V0, 12: [1, 16], 13: $V1, 14: $V2, 15: $V3 }, o($V4, [2, 9])],
        defaultActions: { 3: [2, 2], 13: [2, 1] },
        parseError: function parseError(str, hash) {
          if (hash.recoverable) {
            this.trace(str);
          } else {
            let _parseError = function(msg, hash2) {
              this.message = msg;
              this.hash = hash2;
            };
            _parseError.prototype = Error;
            throw new _parseError(str, hash);
          }
        },
        parse: function parse(input) {
          var self2 = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, TERROR = 2, EOF = 1;
          var args = lstack.slice.call(arguments, 1);
          var lexer2 = Object.create(this.lexer);
          var sharedState = { yy: {} };
          for (var k in this.yy) {
            if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
              sharedState.yy[k] = this.yy[k];
            }
          }
          lexer2.setInput(input, sharedState.yy);
          sharedState.yy.lexer = lexer2;
          sharedState.yy.parser = this;
          if (typeof lexer2.yylloc == "undefined") {
            lexer2.yylloc = {};
          }
          var yyloc = lexer2.yylloc;
          lstack.push(yyloc);
          var ranges = lexer2.options && lexer2.options.ranges;
          if (typeof sharedState.yy.parseError === "function") {
            this.parseError = sharedState.yy.parseError;
          } else {
            this.parseError = Object.getPrototypeOf(this).parseError;
          }
          var lex = function() {
            var token;
            token = lexer2.lex() || EOF;
            if (typeof token !== "number") {
              token = self2.symbols_[token] || token;
            }
            return token;
          };
          var symbol, state, action, r2, yyval = {}, p2, len, newState, expected;
          while (true) {
            state = stack[stack.length - 1];
            if (this.defaultActions[state]) {
              action = this.defaultActions[state];
            } else {
              if (symbol === null || typeof symbol == "undefined") {
                symbol = lex();
              }
              action = table[state] && table[state][symbol];
            }
            if (typeof action === "undefined" || !action.length || !action[0]) {
              var errStr = "";
              expected = [];
              for (p2 in table[state]) {
                if (this.terminals_[p2] && p2 > TERROR) {
                  expected.push("'" + this.terminals_[p2] + "'");
                }
              }
              if (lexer2.showPosition) {
                errStr = "Parse error on line " + (yylineno + 1) + ":\n" + lexer2.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
              } else {
                errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == EOF ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
              }
              this.parseError(errStr, {
                text: lexer2.match,
                token: this.terminals_[symbol] || symbol,
                line: lexer2.yylineno,
                loc: yyloc,
                expected
              });
            }
            if (action[0] instanceof Array && action.length > 1) {
              throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
            }
            switch (action[0]) {
              case 1:
                stack.push(symbol);
                vstack.push(lexer2.yytext);
                lstack.push(lexer2.yylloc);
                stack.push(action[1]);
                symbol = null;
                {
                  yyleng = lexer2.yyleng;
                  yytext = lexer2.yytext;
                  yylineno = lexer2.yylineno;
                  yyloc = lexer2.yylloc;
                }
                break;
              case 2:
                len = this.productions_[action[1]][1];
                yyval.$ = vstack[vstack.length - len];
                yyval._$ = {
                  first_line: lstack[lstack.length - (len || 1)].first_line,
                  last_line: lstack[lstack.length - 1].last_line,
                  first_column: lstack[lstack.length - (len || 1)].first_column,
                  last_column: lstack[lstack.length - 1].last_column
                };
                if (ranges) {
                  yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                  ];
                }
                r2 = this.performAction.apply(yyval, [
                  yytext,
                  yyleng,
                  yylineno,
                  sharedState.yy,
                  action[1],
                  vstack,
                  lstack
                ].concat(args));
                if (typeof r2 !== "undefined") {
                  return r2;
                }
                if (len) {
                  stack = stack.slice(0, -1 * len * 2);
                  vstack = vstack.slice(0, -1 * len);
                  lstack = lstack.slice(0, -1 * len);
                }
                stack.push(this.productions_[action[1]][0]);
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                stack.push(newState);
                break;
              case 3:
                return true;
            }
          }
          return true;
        }
      };
      var lexer = /* @__PURE__ */ function() {
        var lexer2 = {
          EOF: 1,
          parseError: function parseError(str, hash) {
            if (this.yy.parser) {
              this.yy.parser.parseError(str, hash);
            } else {
              throw new Error(str);
            }
          },
          // resets the lexer, sets new input
          setInput: function(input, yy) {
            this.yy = yy || this.yy || {};
            this._input = input;
            this._more = this._backtrack = this.done = false;
            this.yylineno = this.yyleng = 0;
            this.yytext = this.matched = this.match = "";
            this.conditionStack = ["INITIAL"];
            this.yylloc = {
              first_line: 1,
              first_column: 0,
              last_line: 1,
              last_column: 0
            };
            if (this.options.ranges) {
              this.yylloc.range = [0, 0];
            }
            this.offset = 0;
            return this;
          },
          // consumes and returns one char from the input
          input: function() {
            var ch2 = this._input[0];
            this.yytext += ch2;
            this.yyleng++;
            this.offset++;
            this.match += ch2;
            this.matched += ch2;
            var lines = ch2.match(/(?:\r\n?|\n).*/g);
            if (lines) {
              this.yylineno++;
              this.yylloc.last_line++;
            } else {
              this.yylloc.last_column++;
            }
            if (this.options.ranges) {
              this.yylloc.range[1]++;
            }
            this._input = this._input.slice(1);
            return ch2;
          },
          // unshifts one char (or a string) into the input
          unput: function(ch2) {
            var len = ch2.length;
            var lines = ch2.split(/(?:\r\n?|\n)/g);
            this._input = ch2 + this._input;
            this.yytext = this.yytext.substr(0, this.yytext.length - len);
            this.offset -= len;
            var oldLines = this.match.split(/(?:\r\n?|\n)/g);
            this.match = this.match.substr(0, this.match.length - 1);
            this.matched = this.matched.substr(0, this.matched.length - 1);
            if (lines.length - 1) {
              this.yylineno -= lines.length - 1;
            }
            var r2 = this.yylloc.range;
            this.yylloc = {
              first_line: this.yylloc.first_line,
              last_line: this.yylineno + 1,
              first_column: this.yylloc.first_column,
              last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
            };
            if (this.options.ranges) {
              this.yylloc.range = [r2[0], r2[0] + this.yyleng - len];
            }
            this.yyleng = this.yytext.length;
            return this;
          },
          // When called from action, caches matched text and appends it on next action
          more: function() {
            this._more = true;
            return this;
          },
          // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
          reject: function() {
            if (this.options.backtrack_lexer) {
              this._backtrack = true;
            } else {
              return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
              });
            }
            return this;
          },
          // retain first n characters of the match
          less: function(n2) {
            this.unput(this.match.slice(n2));
          },
          // displays already matched input, i.e. for error messages
          pastInput: function() {
            var past = this.matched.substr(0, this.matched.length - this.match.length);
            return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
          },
          // displays upcoming input, i.e. for error messages
          upcomingInput: function() {
            var next = this.match;
            if (next.length < 20) {
              next += this._input.substr(0, 20 - next.length);
            }
            return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
          },
          // displays the character position where the lexing error occurred, i.e. for error messages
          showPosition: function() {
            var pre = this.pastInput();
            var c = new Array(pre.length + 1).join("-");
            return pre + this.upcomingInput() + "\n" + c + "^";
          },
          // test the lexed token: return FALSE when not a match, otherwise return token
          test_match: function(match, indexed_rule) {
            var token, lines, backup;
            if (this.options.backtrack_lexer) {
              backup = {
                yylineno: this.yylineno,
                yylloc: {
                  first_line: this.yylloc.first_line,
                  last_line: this.last_line,
                  first_column: this.yylloc.first_column,
                  last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
              };
              if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
              }
            }
            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) {
              this.yylineno += lines.length;
            }
            this.yylloc = {
              first_line: this.yylloc.last_line,
              last_line: this.yylineno + 1,
              first_column: this.yylloc.last_column,
              last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
            };
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
              this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
            this._more = false;
            this._backtrack = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
            if (this.done && this._input) {
              this.done = false;
            }
            if (token) {
              return token;
            } else if (this._backtrack) {
              for (var k in backup) {
                this[k] = backup[k];
              }
              return false;
            }
            return false;
          },
          // return next match in input
          next: function() {
            if (this.done) {
              return this.EOF;
            }
            if (!this._input) {
              this.done = true;
            }
            var token, match, tempMatch, index;
            if (!this._more) {
              this.yytext = "";
              this.match = "";
            }
            var rules = this._currentRules();
            for (var i = 0; i < rules.length; i++) {
              tempMatch = this._input.match(this.rules[rules[i]]);
              if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                  token = this.test_match(tempMatch, rules[i]);
                  if (token !== false) {
                    return token;
                  } else if (this._backtrack) {
                    match = false;
                    continue;
                  } else {
                    return false;
                  }
                } else if (!this.options.flex) {
                  break;
                }
              }
            }
            if (match) {
              token = this.test_match(match, rules[index]);
              if (token !== false) {
                return token;
              }
              return false;
            }
            if (this._input === "") {
              return this.EOF;
            } else {
              return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
              });
            }
          },
          // return next match that has a token
          lex: function lex() {
            var r2 = this.next();
            if (r2) {
              return r2;
            } else {
              return this.lex();
            }
          },
          // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
          begin: function begin(condition) {
            this.conditionStack.push(condition);
          },
          // pop the previously active lexer condition state off the condition stack
          popState: function popState() {
            var n2 = this.conditionStack.length - 1;
            if (n2 > 0) {
              return this.conditionStack.pop();
            } else {
              return this.conditionStack[0];
            }
          },
          // produce the lexer rule set which is active for the currently active lexer condition state
          _currentRules: function _currentRules() {
            if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
              return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
            } else {
              return this.conditions["INITIAL"].rules;
            }
          },
          // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
          topState: function topState(n2) {
            n2 = this.conditionStack.length - 1 - Math.abs(n2 || 0);
            if (n2 >= 0) {
              return this.conditionStack[n2];
            } else {
              return "INITIAL";
            }
          },
          // alias for begin(condition)
          pushState: function pushState(condition) {
            this.begin(condition);
          },
          // return the number of states currently on the stack
          stateStackSize: function stateStackSize() {
            return this.conditionStack.length;
          },
          options: {},
          performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
            switch ($avoiding_name_collisions) {
              case 0:
                return "(";
              case 1:
                return ")";
              case 2:
                return "SPLAT";
              case 3:
                return "PARAM";
              case 4:
                return "LITERAL";
              case 5:
                return "LITERAL";
              case 6:
                return "EOF";
            }
          },
          rules: [/^(?:\()/, /^(?:\))/, /^(?:\*+\w+)/, /^(?::+\w+)/, /^(?:[\w%\-~\n]+)/, /^(?:.)/, /^(?:$)/],
          conditions: { "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6], "inclusive": true } }
        };
        return lexer2;
      }();
      parser3.lexer = lexer;
      function Parser2() {
        this.yy = {};
      }
      Parser2.prototype = parser3;
      parser3.Parser = Parser2;
      return new Parser2();
    }();
    if (typeof commonjsRequire !== "undefined" && true) {
      exports.parser = parser2;
      exports.Parser = parser2.Parser;
      exports.parse = function() {
        return parser2.parse.apply(parser2, arguments);
      };
    }
  })(compiledGrammar);
  function createNode(displayName) {
    return function(props, children) {
      return {
        displayName,
        props,
        children: children || []
      };
    };
  }
  var nodes = {
    Root: createNode("Root"),
    Concat: createNode("Concat"),
    Literal: createNode("Literal"),
    Splat: createNode("Splat"),
    Param: createNode("Param"),
    Optional: createNode("Optional")
  };
  var parser = compiledGrammar.parser;
  parser.yy = nodes;
  var parser_1 = parser;
  var nodeTypes = Object.keys(nodes);
  function createVisitor$2(handlers) {
    nodeTypes.forEach(function(nodeType) {
      if (typeof handlers[nodeType] === "undefined") {
        throw new Error("No handler defined for " + nodeType.displayName);
      }
    });
    return {
      /**
       * Call the given handler for this node type
       * @param  {Object} node    the AST node
       * @param  {Object} context context to pass through to handlers
       * @return {Object}
       */
      visit: function(node, context2) {
        return this.handlers[node.displayName].call(this, node, context2);
      },
      handlers
    };
  }
  var create_visitor = createVisitor$2;
  var createVisitor$1 = create_visitor, escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
  function Matcher(options2) {
    this.captures = options2.captures;
    this.re = options2.re;
  }
  Matcher.prototype.match = function(path) {
    var match = this.re.exec(path), matchParams = {};
    if (!match) {
      return;
    }
    this.captures.forEach(function(capture, i) {
      if (typeof match[i + 1] === "undefined") {
        matchParams[capture] = void 0;
      } else {
        matchParams[capture] = decodeURIComponent(match[i + 1]);
      }
    });
    return matchParams;
  };
  var RegexpVisitor$1 = createVisitor$1({
    "Concat": function(node) {
      return node.children.reduce(
        (function(memo, child) {
          var childResult = this.visit(child);
          return {
            re: memo.re + childResult.re,
            captures: memo.captures.concat(childResult.captures)
          };
        }).bind(this),
        { re: "", captures: [] }
      );
    },
    "Literal": function(node) {
      return {
        re: node.props.value.replace(escapeRegExp, "\\$&"),
        captures: []
      };
    },
    "Splat": function(node) {
      return {
        re: "([^?]*?)",
        captures: [node.props.name]
      };
    },
    "Param": function(node) {
      return {
        re: "([^\\/\\?]+)",
        captures: [node.props.name]
      };
    },
    "Optional": function(node) {
      var child = this.visit(node.children[0]);
      return {
        re: "(?:" + child.re + ")?",
        captures: child.captures
      };
    },
    "Root": function(node) {
      var childResult = this.visit(node.children[0]);
      return new Matcher({
        re: new RegExp("^" + childResult.re + "(?=\\?|$)"),
        captures: childResult.captures
      });
    }
  });
  var regexp = RegexpVisitor$1;
  var createVisitor = create_visitor;
  var ReverseVisitor$1 = createVisitor({
    "Concat": function(node, context2) {
      var childResults = node.children.map((function(child) {
        return this.visit(child, context2);
      }).bind(this));
      if (childResults.some(function(c) {
        return c === false;
      })) {
        return false;
      } else {
        return childResults.join("");
      }
    },
    "Literal": function(node) {
      return decodeURI(node.props.value);
    },
    "Splat": function(node, context2) {
      if (context2[node.props.name]) {
        return context2[node.props.name];
      } else {
        return false;
      }
    },
    "Param": function(node, context2) {
      if (context2[node.props.name]) {
        return context2[node.props.name];
      } else {
        return false;
      }
    },
    "Optional": function(node, context2) {
      var childResult = this.visit(node.children[0], context2);
      if (childResult) {
        return childResult;
      } else {
        return "";
      }
    },
    "Root": function(node, context2) {
      context2 = context2 || {};
      var childResult = this.visit(node.children[0], context2);
      if (!childResult) {
        return false;
      }
      return encodeURI(childResult);
    }
  });
  var reverse = ReverseVisitor$1;
  var Parser = parser_1, RegexpVisitor = regexp, ReverseVisitor = reverse;
  Route$1.prototype = /* @__PURE__ */ Object.create(null);
  Route$1.prototype.match = function(path) {
    var re2 = RegexpVisitor.visit(this.ast), matched = re2.match(path);
    return matched ? matched : false;
  };
  Route$1.prototype.reverse = function(params) {
    return ReverseVisitor.visit(this.ast, params);
  };
  function Route$1(spec) {
    var route2;
    if (this) {
      route2 = this;
    } else {
      route2 = Object.create(Route$1.prototype);
    }
    if (typeof spec === "undefined") {
      throw new Error("A route spec is required");
    }
    route2.spec = spec;
    route2.ast = Parser.parse(spec);
    return route2;
  }
  var route = Route$1;
  var Route = route;
  var routeParser = Route;
  const RouteParser = /* @__PURE__ */ getDefaultExportFromCjs(routeParser);
  var FileSaver_min = { exports: {} };
  (function(module, exports) {
    (function(a, b) {
      b();
    })(commonjsGlobal, function() {
      function b(a2, b2) {
        return "undefined" == typeof b2 ? b2 = { autoBom: false } : "object" != typeof b2 && (console.warn("Deprecated: Expected third argument to be a object"), b2 = { autoBom: !b2 }), b2.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a2.type) ? new Blob(["\uFEFF", a2], { type: a2.type }) : a2;
      }
      function c(a2, b2, c2) {
        var d2 = new XMLHttpRequest();
        d2.open("GET", a2), d2.responseType = "blob", d2.onload = function() {
          g(d2.response, b2, c2);
        }, d2.onerror = function() {
          console.error("could not download file");
        }, d2.send();
      }
      function d(a2) {
        var b2 = new XMLHttpRequest();
        b2.open("HEAD", a2, false);
        try {
          b2.send();
        } catch (a3) {
        }
        return 200 <= b2.status && 299 >= b2.status;
      }
      function e(a2) {
        try {
          a2.dispatchEvent(new MouseEvent("click"));
        } catch (c2) {
          var b2 = document.createEvent("MouseEvents");
          b2.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null), a2.dispatchEvent(b2);
        }
      }
      var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof commonjsGlobal && commonjsGlobal.global === commonjsGlobal ? commonjsGlobal : void 0, a = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), g = f.saveAs || ("object" != typeof window || window !== f ? function() {
      } : "download" in HTMLAnchorElement.prototype && !a ? function(b2, g2, h) {
        var i = f.URL || f.webkitURL, j = document.createElement("a");
        g2 = g2 || b2.name || "download", j.download = g2, j.rel = "noopener", "string" == typeof b2 ? (j.href = b2, j.origin === location.origin ? e(j) : d(j.href) ? c(b2, g2, h) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b2), setTimeout(function() {
          i.revokeObjectURL(j.href);
        }, 4e4), setTimeout(function() {
          e(j);
        }, 0));
      } : "msSaveOrOpenBlob" in navigator ? function(f2, g2, h) {
        if (g2 = g2 || f2.name || "download", "string" != typeof f2)
          navigator.msSaveOrOpenBlob(b(f2, h), g2);
        else if (d(f2))
          c(f2, g2, h);
        else {
          var i = document.createElement("a");
          i.href = f2, i.target = "_blank", setTimeout(function() {
            e(i);
          });
        }
      } : function(b2, d2, e2, g2) {
        if (g2 = g2 || open("", "_blank"), g2 && (g2.document.title = g2.document.body.innerText = "downloading..."), "string" == typeof b2)
          return c(b2, d2, e2);
        var h = "application/octet-stream" === b2.type, i = /constructor/i.test(f.HTMLElement) || f.safari, j = /CriOS\/[\d]+/.test(navigator.userAgent);
        if ((j || h && i || a) && "undefined" != typeof FileReader) {
          var k = new FileReader();
          k.onloadend = function() {
            var a2 = k.result;
            a2 = j ? a2 : a2.replace(/^data:[^;]*;/, "data:attachment/file;"), g2 ? g2.location.href = a2 : location = a2, g2 = null;
          }, k.readAsDataURL(b2);
        } else {
          var l2 = f.URL || f.webkitURL, m2 = l2.createObjectURL(b2);
          g2 ? g2.location = m2 : location.href = m2, g2 = null, setTimeout(function() {
            l2.revokeObjectURL(m2);
          }, 4e4);
        }
      });
      f.saveAs = g.saveAs = g, module.exports = g;
    });
  })(FileSaver_min);
  var FileSaver_minExports = FileSaver_min.exports;
  const FileSaver = /* @__PURE__ */ getDefaultExportFromCjs(FileSaver_minExports);
  function ViewQuestions() {
    const [spinner, setSpinner] = React.useState(false);
    const [result, setResult] = React.useState("");
    const [questions, setQuestions] = React.useState([]);
    const divRef = React.useRef(null);
    const numQuestions = questions.map((x2) => x2.questions ? x2.questions.length : 1).reduce((a, b) => a + b, 0);
    React.useEffect(() => {
      setSpinner(true);
      const route2 = RouteParser("*start/courses/:courseId/quizzes/:quizId");
      const match = route2.match(window.location);
      quizGlobal.init(match);
      quizGlobal.fetchQuestions().then((q2) => setQuestions(q2)).catch((e) => setResult(e)).finally(() => setSpinner(false));
    }, []);
    function print() {
      if (divRef.current) {
        document.body.innerHTML = divRef.current.outerHTML;
        document.body.style.overflow = "visible";
        document.body.style.padding = "1em";
      }
    }
    function download() {
      FileSaver.saveAs(
        new Blob([JSON.stringify(questions, null, 4)], {
          type: "application/json"
        }),
        "quiz-questions.json"
      );
    }
    return /* @__PURE__ */ React.createElement("div", { className: "my-2" }, spinner && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Spinner, { animation: "border", role: "status" }), " Fetching Quiz Questions"), /* @__PURE__ */ React.createElement("div", { style: { whiteSpace: "pre" } }, result), /* @__PURE__ */ React.createElement("h4", null, "Displaying ", numQuestions, " questions", " ", /* @__PURE__ */ React.createElement(Button, { onClick: print, className: "mr-2" }, "Make Printable"), /* @__PURE__ */ React.createElement(Button, { onClick: download }, "Download Questions")), /* @__PURE__ */ React.createElement("div", { ref: divRef }, questions.map((question, i) => /* @__PURE__ */ React.createElement(Question, { data: question, key: i }))));
  }
  function ViewSubmissions() {
    const [spinner, setSpinner] = React.useState(false);
    const [result, setResult] = React.useState("");
    const [progress, setProgress] = React.useState({});
    function fetchQuizSubmissions() {
      setSpinner(true);
      const route2 = RouteParser("*start/courses/:courseId/quizzes/:quizId");
      const match = route2.match(window.location);
      quizGlobal.init(match);
      setResult(null);
      quizGlobal.fetchSubmissions(setProgress).then((q2) => q2).catch((e) => {
        log(e);
        setResult(e);
      }).finally(() => setSpinner(false));
    }
    function fetchQuizSubmissionsWithAnswers() {
      setSpinner(true);
      const route2 = RouteParser("*start/courses/:courseId/quizzes/:quizId");
      const match = route2.match(window.location);
      quizGlobal.init(match);
      setResult(null);
      quizGlobal.fetchSubmissionsWithAnswers(setProgress).then((q2) => {
        const data = JSON.stringify(q2, null, 4);
        FileSaver.saveAs(
          new Blob([data], { type: "application/json" }),
          "quiz-submissions.json"
        );
      }).catch((e) => {
        log(e);
        setResult(e);
      }).finally(() => setSpinner(false));
    }
    return /* @__PURE__ */ React.createElement("div", { className: "my-2" }, /* @__PURE__ */ React.createElement("p", null, "When fetched, quiz submissions appear in the textbox below. They can be copy-and-pasted into a CSV document. The questions are listed by Quercus question id in the order that they appear in a given student's test.", " ", /* @__PURE__ */ React.createElement("i", { style: { fontFamily: "monospace" } }, "end_at"), " lists the time that a student's test was scheduled to finish (not the time they actually submitted)."), /* @__PURE__ */ React.createElement("div", { className: "my-2" }, /* @__PURE__ */ React.createElement(
      Button,
      {
        title: "Fetch all quiz submissions. This could take a while!",
        onClick: fetchQuizSubmissions,
        className: "mr-2"
      },
      spinner && /* @__PURE__ */ React.createElement(
        Spinner,
        {
          animation: "border",
          role: "status",
          className: "mr-2",
          size: "sm"
        }
      ),
      "Fetch Quiz Submissions"
    ), /* @__PURE__ */ React.createElement(
      Button,
      {
        title: "Fetch all quiz submissions with answers. This could take a while!",
        onClick: fetchQuizSubmissionsWithAnswers
      },
      spinner && /* @__PURE__ */ React.createElement(
        Spinner,
        {
          animation: "border",
          role: "status",
          className: "mr-2",
          size: "sm"
        }
      ),
      "Fetch Quiz Submissions with Answers"
    ), spinner && progress.status && /* @__PURE__ */ React.createElement("span", { className: "mx-3" }, " ", "Fetching Quiz Submissions (", progress.message, ")") || /* @__PURE__ */ React.createElement(React.Fragment, null, " This could take a while")), /* @__PURE__ */ React.createElement(
      "textarea",
      {
        style: { width: "100%" },
        value: result || !!progress.partialData && formatSubmissionsAsCSV(progress.partialData) || "",
        rows: 20,
        onChange: () => {
        }
      }
    ));
  }
  function GradeSubmissions() {
    const [questionId, setQuestionId] = React.useState("");
    const [spinner, setSpinner] = React.useState(false);
    let [submissions, setSubmissions] = React.useState([]);
    const [progress, setProgress] = React.useState({});
    const [gradingProgress, setGradingProgress] = React.useState({});
    const [questions, setQuestions] = React.useState([]);
    const [points, setPoints] = React.useState("0");
    const questionsById = {};
    for (const question2 of questions) {
      questionsById[question2.id] = question2;
    }
    React.useEffect(() => {
      setSpinner(true);
      const route2 = RouteParser("*start/courses/:courseId/quizzes/:quizId");
      const match = route2.match(window.location);
      quizGlobal.init(match);
      quizGlobal.fetchQuestions({ asFlatList: true }).then((q2) => setQuestions(q2)).catch((e) => setSubmissions(e)).finally(() => setSpinner(false));
    }, []);
    function fetchQuizSubmissions() {
      setSpinner(true);
      const route2 = RouteParser("*start/courses/:courseId/quizzes/:quizId");
      const match = route2.match(window.location);
      quizGlobal.init(match);
      setSubmissions([]);
      quizGlobal.fetchSubmissionIds(setProgress).then(setSubmissions).catch((e) => {
        log(e);
      }).finally(() => setSpinner(false));
    }
    function gradeQuizSubmissions() {
      setSpinner(true);
      const route2 = RouteParser("*start/courses/:courseId/quizzes/:quizId");
      const match = route2.match(window.location);
      quizGlobal.init(match);
      quizGlobal.gradeSubmissions(
        //[{ attempt: 1, id: "3980153" }],
        submissions,
        { score: points, id: questionId },
        setGradingProgress
      ).then(() => {
      }).catch((e) => {
        log(e);
      }).finally(() => setSpinner(false));
    }
    let submissionSummary = (submissions || []).length > 0 && !spinner ? /* @__PURE__ */ React.createElement("span", { className: "mx-3" }, "Found ", (submissions || []).length, " submissions") : progress.status && /* @__PURE__ */ React.createElement("span", { className: "mx-3" }, " ", "Fetching Quiz Submissions (", progress.message, ")");
    let gradingSummary = gradingProgress.status && /* @__PURE__ */ React.createElement("span", { className: "mx-3" }, " ", "Grading Submissions (", gradingProgress.message, ")");
    const question = questionsById[questionId];
    const disabled = !question || !submissions.length;
    return /* @__PURE__ */ React.createElement("div", { className: "my-2" }, /* @__PURE__ */ React.createElement("p", null, "Set a uniform grade for a specific question. For example, this can be used to set a mark for essay questions without going through the speed grader. The question ID can be found from the", " ", /* @__PURE__ */ React.createElement("i", null, "Quiz Questions"), " tab."), /* @__PURE__ */ React.createElement(
      InputGroup,
      {
        title: "The internal Quercus ID for the question you want graded.",
        className: "my-2"
      },
      /* @__PURE__ */ React.createElement(InputGroup.Prepend, null, /* @__PURE__ */ React.createElement(InputGroup.Text, null, "Question ID")),
      /* @__PURE__ */ React.createElement(
        FormControl$1,
        {
          value: questionId,
          onChange: (e) => setQuestionId(e.target.value)
        }
      )
    ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, "Question Preview"), /* @__PURE__ */ React.createElement("div", { className: "ml-4" }, question ? /* @__PURE__ */ React.createElement(Question, { data: question }) : /* @__PURE__ */ React.createElement("p", null, "No valid question to preview."))), /* @__PURE__ */ React.createElement("div", { className: "my-2" }, /* @__PURE__ */ React.createElement(Button, { onClick: fetchQuizSubmissions }, "Fetch Submissions to be Marked"), submissionSummary), /* @__PURE__ */ React.createElement(
      InputGroup,
      {
        title: "How many points to grade all the submissions",
        className: "my-2"
      },
      /* @__PURE__ */ React.createElement(InputGroup.Prepend, null, /* @__PURE__ */ React.createElement(InputGroup.Text, null, "Set all submissions to")),
      /* @__PURE__ */ React.createElement(
        FormControl$1,
        {
          value: points,
          onChange: (e) => setPoints(e.target.value)
        }
      ),
      /* @__PURE__ */ React.createElement(InputGroup.Append, null, /* @__PURE__ */ React.createElement(InputGroup.Text, null, "out of ", question ? question.points_possible : "?"))
    ), /* @__PURE__ */ React.createElement(
      Button,
      {
        title: "Grade all submissions",
        disabled,
        className: "mr-2",
        onClick: gradeQuizSubmissions
      },
      "Grade Submissions"
    ), disabled && "You must download the submission and specify a question before grading", " ", gradingSummary);
  }
  function App() {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [currTab, setCurrTab] = React.useState("quizQuestions");
    React.useEffect(() => {
      const htmlNode = document.body.parentElement;
      if (!htmlNode) {
        return;
      }
      if (modalOpen) {
        htmlNode.setAttribute("id", "canvas-quiz-stats");
      } else {
        htmlNode.removeAttribute("id");
      }
    }, [modalOpen]);
    return /* @__PURE__ */ React.createElement("div", { className: "header-bar-right" }, /* @__PURE__ */ React.createElement("div", { className: "header-group-left" }, /* @__PURE__ */ React.createElement("button", { className: "btn", onClick: () => setModalOpen(true) }, "Quiz Stats"), /* @__PURE__ */ React.createElement(
      Modal,
      {
        show: modalOpen,
        dialogClassName: "fullscreen-modal",
        onHide: () => setModalOpen(false)
      },
      /* @__PURE__ */ React.createElement(Modal.Header, { closeButton: true }, /* @__PURE__ */ React.createElement(Modal.Title, null, "Advanced Quiz Stats")),
      /* @__PURE__ */ React.createElement(Modal.Body, null, /* @__PURE__ */ React.createElement(
        Tabs,
        {
          id: "controlled-tab-example",
          activeKey: currTab,
          onSelect: (k) => k != null && setCurrTab(k)
        },
        /* @__PURE__ */ React.createElement(
          Tab,
          {
            eventKey: "quizQuestions",
            title: "Quiz Questions"
          },
          /* @__PURE__ */ React.createElement(ViewQuestions, null)
        ),
        /* @__PURE__ */ React.createElement(
          Tab,
          {
            eventKey: "submissions",
            title: "Quiz Submissions"
          },
          /* @__PURE__ */ React.createElement(ViewSubmissions, null)
        ),
        /* @__PURE__ */ React.createElement(Tab, { eventKey: "grade", title: "Grade a Question" }, /* @__PURE__ */ React.createElement(GradeSubmissions, null)),
        /* @__PURE__ */ React.createElement(Tab, { eventKey: "api", title: "Query API" }, /* @__PURE__ */ React.createElement(QueryApi, null))
      )),
      /* @__PURE__ */ React.createElement(Modal.Footer, null, /* @__PURE__ */ React.createElement(
        Button,
        {
          variant: "secondary",
          onClick: () => setModalOpen(false)
        },
        "Close"
      ))
    )));
  }
  log("React script has successfully started");
  async function main() {
    const body = await awaitElement(".header-bar");
    const container = document.createElement("div");
    const route2 = RouteParser("*start/courses/:courseId/quizzes/:quizId");
    const match = route2.match(window.location);
    if (match) {
      quizGlobal.init(match);
      log(quizGlobal);
      body.appendChild(container);
      const root = createRoot(container);
      root.render(/* @__PURE__ */ React.createElement(App, null));
    }
  }
  addLocationChangeCallback(() => {
    main().catch((e) => {
      log(e);
    });
  });
})();
;
(function(){
                    const el = document.createElement("style");
                    el.innerText = "body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\",\n    \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\",\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, \"Courier New\",\n    monospace;\n}\n.App {\n    text-align: center;\n}\n\n.App-logo {\n    height: 40vmin;\n}\n\n.App-header {\n    background-color: #282c34;\n    min-height: 100vh;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    font-size: calc(10px + 2vmin);\n    color: white;\n}\n\n.App-link {\n    color: #09d3ac;\n}\n\n.fullscreen-modal {\n    width: 95%;\n    max-width: 95% !important;\n}\n\n.query-input {\n    display: block;\n    width: 100%;\n}\n\n.question-container {\n    border-top: 1px solid black;\n    border-bottom: 1px solid black;\n    margin-bottom: 4px;\n}\n\n.question-answer-box {\n    margin-left: 2em;\n}\n.question-option.correct {\n    color: #559900;\n}\n.question-option.multiple_answers_question::before {\n    content: \"☐\";\n    font-weight: bold;\n    margin-right: 0.5em;\n}\n.question-option.multiple_answers_question.correct::before {\n    content: \"☒\";\n    color: #559900;\n}\n\n.question-option.multiple_choice_question::before {\n    content: \"◌\";\n    font-weight: bold;\n    margin-right: 0.5em;\n}\n.question-option.multiple_choice_question.correct::before {\n    content: \"●\";\n    color: #559900;\n}\n\n.group-container {\n    margin-left: 1em;\n    margin-top: 1em;\n}\n.question-group {\n    border-left: 4px solid rgb(10, 93, 202);\n    padding-left: 1em;\n}\n\n.question-id {\n    font-weight: bold;\n    color: blue;\n    margin-bottom: 0.3em;\n}\n#canvas-quiz-stats {\n  /*!\n * Bootstrap v4.5.3 (https://getbootstrap.com/)\n * Copyright 2011-2020 The Bootstrap Authors\n * Copyright 2011-2020 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)\n */\n  /*# sourceMappingURL=bootstrap.css.map */\n}\n#canvas-quiz-stats :root {\n  --blue: #007bff;\n  --indigo: #6610f2;\n  --purple: #6f42c1;\n  --pink: #e83e8c;\n  --red: #dc3545;\n  --orange: #fd7e14;\n  --yellow: #ffc107;\n  --green: #28a745;\n  --teal: #20c997;\n  --cyan: #17a2b8;\n  --white: #fff;\n  --gray: #6c757d;\n  --gray-dark: #343a40;\n  --primary: #007bff;\n  --secondary: #6c757d;\n  --success: #28a745;\n  --info: #17a2b8;\n  --warning: #ffc107;\n  --danger: #dc3545;\n  --light: #f8f9fa;\n  --dark: #343a40;\n  --breakpoint-xs: 0;\n  --breakpoint-sm: 576px;\n  --breakpoint-md: 768px;\n  --breakpoint-lg: 992px;\n  --breakpoint-xl: 1200px;\n  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n}\n#canvas-quiz-stats *,\n#canvas-quiz-stats *::before,\n#canvas-quiz-stats *::after {\n  box-sizing: border-box;\n}\n#canvas-quiz-stats html {\n  font-family: sans-serif;\n  line-height: 1.15;\n  -webkit-text-size-adjust: 100%;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n#canvas-quiz-stats article,\n#canvas-quiz-stats aside,\n#canvas-quiz-stats figcaption,\n#canvas-quiz-stats figure,\n#canvas-quiz-stats footer,\n#canvas-quiz-stats header,\n#canvas-quiz-stats hgroup,\n#canvas-quiz-stats main,\n#canvas-quiz-stats nav,\n#canvas-quiz-stats section {\n  display: block;\n}\n#canvas-quiz-stats body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #212529;\n  text-align: left;\n  background-color: #fff;\n}\n#canvas-quiz-stats [tabindex=\"-1\"]:focus:not(:focus-visible) {\n  outline: 0 !important;\n}\n#canvas-quiz-stats hr {\n  box-sizing: content-box;\n  height: 0;\n  overflow: visible;\n}\n#canvas-quiz-stats h1,\n#canvas-quiz-stats h2,\n#canvas-quiz-stats h3,\n#canvas-quiz-stats h4,\n#canvas-quiz-stats h5,\n#canvas-quiz-stats h6 {\n  margin-top: 0;\n  margin-bottom: 0.5rem;\n}\n#canvas-quiz-stats p {\n  margin-top: 0;\n  margin-bottom: 1rem;\n}\n#canvas-quiz-stats abbr[title],\n#canvas-quiz-stats abbr[data-original-title] {\n  text-decoration: underline;\n  -webkit-text-decoration: underline dotted;\n  text-decoration: underline dotted;\n  cursor: help;\n  border-bottom: 0;\n  -webkit-text-decoration-skip-ink: none;\n  text-decoration-skip-ink: none;\n}\n#canvas-quiz-stats address {\n  margin-bottom: 1rem;\n  font-style: normal;\n  line-height: inherit;\n}\n#canvas-quiz-stats ol,\n#canvas-quiz-stats ul,\n#canvas-quiz-stats dl {\n  margin-top: 0;\n  margin-bottom: 1rem;\n}\n#canvas-quiz-stats ol ol,\n#canvas-quiz-stats ul ul,\n#canvas-quiz-stats ol ul,\n#canvas-quiz-stats ul ol {\n  margin-bottom: 0;\n}\n#canvas-quiz-stats dt {\n  font-weight: 700;\n}\n#canvas-quiz-stats dd {\n  margin-bottom: 0.5rem;\n  margin-left: 0;\n}\n#canvas-quiz-stats blockquote {\n  margin: 0 0 1rem;\n}\n#canvas-quiz-stats b,\n#canvas-quiz-stats strong {\n  font-weight: bolder;\n}\n#canvas-quiz-stats small {\n  font-size: 80%;\n}\n#canvas-quiz-stats sub,\n#canvas-quiz-stats sup {\n  position: relative;\n  font-size: 75%;\n  line-height: 0;\n  vertical-align: baseline;\n}\n#canvas-quiz-stats sub {\n  bottom: -0.25em;\n}\n#canvas-quiz-stats sup {\n  top: -0.5em;\n}\n#canvas-quiz-stats a {\n  color: #007bff;\n  text-decoration: none;\n  background-color: transparent;\n}\n#canvas-quiz-stats a:hover {\n  color: #0056b3;\n  text-decoration: underline;\n}\n#canvas-quiz-stats a:not([href]):not([class]) {\n  color: inherit;\n  text-decoration: none;\n}\n#canvas-quiz-stats a:not([href]):not([class]):hover {\n  color: inherit;\n  text-decoration: none;\n}\n#canvas-quiz-stats pre,\n#canvas-quiz-stats code,\n#canvas-quiz-stats kbd,\n#canvas-quiz-stats samp {\n  font-family: SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n  font-size: 1em;\n}\n#canvas-quiz-stats pre {\n  margin-top: 0;\n  margin-bottom: 1rem;\n  overflow: auto;\n  -ms-overflow-style: scrollbar;\n}\n#canvas-quiz-stats figure {\n  margin: 0 0 1rem;\n}\n#canvas-quiz-stats img {\n  vertical-align: middle;\n  border-style: none;\n}\n#canvas-quiz-stats svg {\n  overflow: hidden;\n  vertical-align: middle;\n}\n#canvas-quiz-stats table {\n  border-collapse: collapse;\n}\n#canvas-quiz-stats caption {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n  color: #6c757d;\n  text-align: left;\n  caption-side: bottom;\n}\n#canvas-quiz-stats th {\n  text-align: inherit;\n  text-align: -webkit-match-parent;\n}\n#canvas-quiz-stats label {\n  display: inline-block;\n  margin-bottom: 0.5rem;\n}\n#canvas-quiz-stats button {\n  border-radius: 0;\n}\n#canvas-quiz-stats button:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n}\n#canvas-quiz-stats input,\n#canvas-quiz-stats button,\n#canvas-quiz-stats select,\n#canvas-quiz-stats optgroup,\n#canvas-quiz-stats textarea {\n  margin: 0;\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit;\n}\n#canvas-quiz-stats button,\n#canvas-quiz-stats input {\n  overflow: visible;\n}\n#canvas-quiz-stats button,\n#canvas-quiz-stats select {\n  text-transform: none;\n}\n#canvas-quiz-stats [role=\"button\"] {\n  cursor: pointer;\n}\n#canvas-quiz-stats select {\n  word-wrap: normal;\n}\n#canvas-quiz-stats button,\n#canvas-quiz-stats [type=\"button\"],\n#canvas-quiz-stats [type=\"reset\"],\n#canvas-quiz-stats [type=\"submit\"] {\n  -webkit-appearance: button;\n}\n#canvas-quiz-stats button:not(:disabled),\n#canvas-quiz-stats [type=\"button\"]:not(:disabled),\n#canvas-quiz-stats [type=\"reset\"]:not(:disabled),\n#canvas-quiz-stats [type=\"submit\"]:not(:disabled) {\n  cursor: pointer;\n}\n#canvas-quiz-stats button::-moz-focus-inner,\n#canvas-quiz-stats [type=\"button\"]::-moz-focus-inner,\n#canvas-quiz-stats [type=\"reset\"]::-moz-focus-inner,\n#canvas-quiz-stats [type=\"submit\"]::-moz-focus-inner {\n  padding: 0;\n  border-style: none;\n}\n#canvas-quiz-stats input[type=\"radio\"],\n#canvas-quiz-stats input[type=\"checkbox\"] {\n  box-sizing: border-box;\n  padding: 0;\n}\n#canvas-quiz-stats textarea {\n  overflow: auto;\n  resize: vertical;\n}\n#canvas-quiz-stats fieldset {\n  min-width: 0;\n  padding: 0;\n  margin: 0;\n  border: 0;\n}\n#canvas-quiz-stats legend {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  padding: 0;\n  margin-bottom: 0.5rem;\n  font-size: 1.5rem;\n  line-height: inherit;\n  color: inherit;\n  white-space: normal;\n}\n#canvas-quiz-stats progress {\n  vertical-align: baseline;\n}\n#canvas-quiz-stats [type=\"number\"]::-webkit-inner-spin-button,\n#canvas-quiz-stats [type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n#canvas-quiz-stats [type=\"search\"] {\n  outline-offset: -2px;\n  -webkit-appearance: none;\n}\n#canvas-quiz-stats [type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n#canvas-quiz-stats ::-webkit-file-upload-button {\n  font: inherit;\n  -webkit-appearance: button;\n}\n#canvas-quiz-stats output {\n  display: inline-block;\n}\n#canvas-quiz-stats summary {\n  display: list-item;\n  cursor: pointer;\n}\n#canvas-quiz-stats template {\n  display: none;\n}\n#canvas-quiz-stats [hidden] {\n  display: none !important;\n}\n#canvas-quiz-stats h1,\n#canvas-quiz-stats h2,\n#canvas-quiz-stats h3,\n#canvas-quiz-stats h4,\n#canvas-quiz-stats h5,\n#canvas-quiz-stats h6,\n#canvas-quiz-stats .h1,\n#canvas-quiz-stats .h2,\n#canvas-quiz-stats .h3,\n#canvas-quiz-stats .h4,\n#canvas-quiz-stats .h5,\n#canvas-quiz-stats .h6 {\n  margin-bottom: 0.5rem;\n  font-weight: 500;\n  line-height: 1.2;\n}\n#canvas-quiz-stats h1,\n#canvas-quiz-stats .h1 {\n  font-size: 2.5rem;\n}\n#canvas-quiz-stats h2,\n#canvas-quiz-stats .h2 {\n  font-size: 2rem;\n}\n#canvas-quiz-stats h3,\n#canvas-quiz-stats .h3 {\n  font-size: 1.75rem;\n}\n#canvas-quiz-stats h4,\n#canvas-quiz-stats .h4 {\n  font-size: 1.5rem;\n}\n#canvas-quiz-stats h5,\n#canvas-quiz-stats .h5 {\n  font-size: 1.25rem;\n}\n#canvas-quiz-stats h6,\n#canvas-quiz-stats .h6 {\n  font-size: 1rem;\n}\n#canvas-quiz-stats .lead {\n  font-size: 1.25rem;\n  font-weight: 300;\n}\n#canvas-quiz-stats .display-1 {\n  font-size: 6rem;\n  font-weight: 300;\n  line-height: 1.2;\n}\n#canvas-quiz-stats .display-2 {\n  font-size: 5.5rem;\n  font-weight: 300;\n  line-height: 1.2;\n}\n#canvas-quiz-stats .display-3 {\n  font-size: 4.5rem;\n  font-weight: 300;\n  line-height: 1.2;\n}\n#canvas-quiz-stats .display-4 {\n  font-size: 3.5rem;\n  font-weight: 300;\n  line-height: 1.2;\n}\n#canvas-quiz-stats hr {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  border: 0;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n}\n#canvas-quiz-stats small,\n#canvas-quiz-stats .small {\n  font-size: 80%;\n  font-weight: 400;\n}\n#canvas-quiz-stats mark,\n#canvas-quiz-stats .mark {\n  padding: 0.2em;\n  background-color: #fcf8e3;\n}\n#canvas-quiz-stats .list-unstyled {\n  padding-left: 0;\n  list-style: none;\n}\n#canvas-quiz-stats .list-inline {\n  padding-left: 0;\n  list-style: none;\n}\n#canvas-quiz-stats .list-inline-item {\n  display: inline-block;\n}\n#canvas-quiz-stats .list-inline-item:not(:last-child) {\n  margin-right: 0.5rem;\n}\n#canvas-quiz-stats .initialism {\n  font-size: 90%;\n  text-transform: uppercase;\n}\n#canvas-quiz-stats .blockquote {\n  margin-bottom: 1rem;\n  font-size: 1.25rem;\n}\n#canvas-quiz-stats .blockquote-footer {\n  display: block;\n  font-size: 80%;\n  color: #6c757d;\n}\n#canvas-quiz-stats .blockquote-footer::before {\n  content: \"\\2014\\00A0\";\n}\n#canvas-quiz-stats .img-fluid {\n  max-width: 100%;\n  height: auto;\n}\n#canvas-quiz-stats .img-thumbnail {\n  padding: 0.25rem;\n  background-color: #fff;\n  border: 1px solid #dee2e6;\n  border-radius: 0.25rem;\n  max-width: 100%;\n  height: auto;\n}\n#canvas-quiz-stats .figure {\n  display: inline-block;\n}\n#canvas-quiz-stats .figure-img {\n  margin-bottom: 0.5rem;\n  line-height: 1;\n}\n#canvas-quiz-stats .figure-caption {\n  font-size: 90%;\n  color: #6c757d;\n}\n#canvas-quiz-stats code {\n  font-size: 87.5%;\n  color: #e83e8c;\n  word-wrap: break-word;\n}\n#canvas-quiz-stats a > code {\n  color: inherit;\n}\n#canvas-quiz-stats kbd {\n  padding: 0.2rem 0.4rem;\n  font-size: 87.5%;\n  color: #fff;\n  background-color: #212529;\n  border-radius: 0.2rem;\n}\n#canvas-quiz-stats kbd kbd {\n  padding: 0;\n  font-size: 100%;\n  font-weight: 700;\n}\n#canvas-quiz-stats pre {\n  display: block;\n  font-size: 87.5%;\n  color: #212529;\n}\n#canvas-quiz-stats pre code {\n  font-size: inherit;\n  color: inherit;\n  word-break: normal;\n}\n#canvas-quiz-stats .pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll;\n}\n#canvas-quiz-stats .container,\n#canvas-quiz-stats .container-fluid,\n#canvas-quiz-stats .container-sm,\n#canvas-quiz-stats .container-md,\n#canvas-quiz-stats .container-lg,\n#canvas-quiz-stats .container-xl {\n  width: 100%;\n  padding-right: 15px;\n  padding-left: 15px;\n  margin-right: auto;\n  margin-left: auto;\n}\n@media (min-width: 576px) {\n  #canvas-quiz-stats .container,\n  #canvas-quiz-stats .container-sm {\n    max-width: 540px;\n  }\n}\n@media (min-width: 768px) {\n  #canvas-quiz-stats .container,\n  #canvas-quiz-stats .container-sm,\n  #canvas-quiz-stats .container-md {\n    max-width: 720px;\n  }\n}\n@media (min-width: 992px) {\n  #canvas-quiz-stats .container,\n  #canvas-quiz-stats .container-sm,\n  #canvas-quiz-stats .container-md,\n  #canvas-quiz-stats .container-lg {\n    max-width: 960px;\n  }\n}\n@media (min-width: 1200px) {\n  #canvas-quiz-stats .container,\n  #canvas-quiz-stats .container-sm,\n  #canvas-quiz-stats .container-md,\n  #canvas-quiz-stats .container-lg,\n  #canvas-quiz-stats .container-xl {\n    max-width: 1140px;\n  }\n}\n#canvas-quiz-stats .row {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  margin-right: -15px;\n  margin-left: -15px;\n}\n#canvas-quiz-stats .no-gutters {\n  margin-right: 0;\n  margin-left: 0;\n}\n#canvas-quiz-stats .no-gutters > .col,\n#canvas-quiz-stats .no-gutters > [class*=\"col-\"] {\n  padding-right: 0;\n  padding-left: 0;\n}\n#canvas-quiz-stats .col-1,\n#canvas-quiz-stats .col-2,\n#canvas-quiz-stats .col-3,\n#canvas-quiz-stats .col-4,\n#canvas-quiz-stats .col-5,\n#canvas-quiz-stats .col-6,\n#canvas-quiz-stats .col-7,\n#canvas-quiz-stats .col-8,\n#canvas-quiz-stats .col-9,\n#canvas-quiz-stats .col-10,\n#canvas-quiz-stats .col-11,\n#canvas-quiz-stats .col-12,\n#canvas-quiz-stats .col,\n#canvas-quiz-stats .col-auto,\n#canvas-quiz-stats .col-sm-1,\n#canvas-quiz-stats .col-sm-2,\n#canvas-quiz-stats .col-sm-3,\n#canvas-quiz-stats .col-sm-4,\n#canvas-quiz-stats .col-sm-5,\n#canvas-quiz-stats .col-sm-6,\n#canvas-quiz-stats .col-sm-7,\n#canvas-quiz-stats .col-sm-8,\n#canvas-quiz-stats .col-sm-9,\n#canvas-quiz-stats .col-sm-10,\n#canvas-quiz-stats .col-sm-11,\n#canvas-quiz-stats .col-sm-12,\n#canvas-quiz-stats .col-sm,\n#canvas-quiz-stats .col-sm-auto,\n#canvas-quiz-stats .col-md-1,\n#canvas-quiz-stats .col-md-2,\n#canvas-quiz-stats .col-md-3,\n#canvas-quiz-stats .col-md-4,\n#canvas-quiz-stats .col-md-5,\n#canvas-quiz-stats .col-md-6,\n#canvas-quiz-stats .col-md-7,\n#canvas-quiz-stats .col-md-8,\n#canvas-quiz-stats .col-md-9,\n#canvas-quiz-stats .col-md-10,\n#canvas-quiz-stats .col-md-11,\n#canvas-quiz-stats .col-md-12,\n#canvas-quiz-stats .col-md,\n#canvas-quiz-stats .col-md-auto,\n#canvas-quiz-stats .col-lg-1,\n#canvas-quiz-stats .col-lg-2,\n#canvas-quiz-stats .col-lg-3,\n#canvas-quiz-stats .col-lg-4,\n#canvas-quiz-stats .col-lg-5,\n#canvas-quiz-stats .col-lg-6,\n#canvas-quiz-stats .col-lg-7,\n#canvas-quiz-stats .col-lg-8,\n#canvas-quiz-stats .col-lg-9,\n#canvas-quiz-stats .col-lg-10,\n#canvas-quiz-stats .col-lg-11,\n#canvas-quiz-stats .col-lg-12,\n#canvas-quiz-stats .col-lg,\n#canvas-quiz-stats .col-lg-auto,\n#canvas-quiz-stats .col-xl-1,\n#canvas-quiz-stats .col-xl-2,\n#canvas-quiz-stats .col-xl-3,\n#canvas-quiz-stats .col-xl-4,\n#canvas-quiz-stats .col-xl-5,\n#canvas-quiz-stats .col-xl-6,\n#canvas-quiz-stats .col-xl-7,\n#canvas-quiz-stats .col-xl-8,\n#canvas-quiz-stats .col-xl-9,\n#canvas-quiz-stats .col-xl-10,\n#canvas-quiz-stats .col-xl-11,\n#canvas-quiz-stats .col-xl-12,\n#canvas-quiz-stats .col-xl,\n#canvas-quiz-stats .col-xl-auto {\n  position: relative;\n  width: 100%;\n  padding-right: 15px;\n  padding-left: 15px;\n}\n#canvas-quiz-stats .col {\n  -ms-flex-preferred-size: 0;\n  flex-basis: 0;\n  -ms-flex-positive: 1;\n  flex-grow: 1;\n  max-width: 100%;\n}\n#canvas-quiz-stats .row-cols-1 > * {\n  -ms-flex: 0 0 100%;\n  flex: 0 0 100%;\n  max-width: 100%;\n}\n#canvas-quiz-stats .row-cols-2 > * {\n  -ms-flex: 0 0 50%;\n  flex: 0 0 50%;\n  max-width: 50%;\n}\n#canvas-quiz-stats .row-cols-3 > * {\n  -ms-flex: 0 0 33.333333%;\n  flex: 0 0 33.333333%;\n  max-width: 33.333333%;\n}\n#canvas-quiz-stats .row-cols-4 > * {\n  -ms-flex: 0 0 25%;\n  flex: 0 0 25%;\n  max-width: 25%;\n}\n#canvas-quiz-stats .row-cols-5 > * {\n  -ms-flex: 0 0 20%;\n  flex: 0 0 20%;\n  max-width: 20%;\n}\n#canvas-quiz-stats .row-cols-6 > * {\n  -ms-flex: 0 0 16.666667%;\n  flex: 0 0 16.666667%;\n  max-width: 16.666667%;\n}\n#canvas-quiz-stats .col-auto {\n  -ms-flex: 0 0 auto;\n  flex: 0 0 auto;\n  width: auto;\n  max-width: 100%;\n}\n#canvas-quiz-stats .col-1 {\n  -ms-flex: 0 0 8.333333%;\n  flex: 0 0 8.333333%;\n  max-width: 8.333333%;\n}\n#canvas-quiz-stats .col-2 {\n  -ms-flex: 0 0 16.666667%;\n  flex: 0 0 16.666667%;\n  max-width: 16.666667%;\n}\n#canvas-quiz-stats .col-3 {\n  -ms-flex: 0 0 25%;\n  flex: 0 0 25%;\n  max-width: 25%;\n}\n#canvas-quiz-stats .col-4 {\n  -ms-flex: 0 0 33.333333%;\n  flex: 0 0 33.333333%;\n  max-width: 33.333333%;\n}\n#canvas-quiz-stats .col-5 {\n  -ms-flex: 0 0 41.666667%;\n  flex: 0 0 41.666667%;\n  max-width: 41.666667%;\n}\n#canvas-quiz-stats .col-6 {\n  -ms-flex: 0 0 50%;\n  flex: 0 0 50%;\n  max-width: 50%;\n}\n#canvas-quiz-stats .col-7 {\n  -ms-flex: 0 0 58.333333%;\n  flex: 0 0 58.333333%;\n  max-width: 58.333333%;\n}\n#canvas-quiz-stats .col-8 {\n  -ms-flex: 0 0 66.666667%;\n  flex: 0 0 66.666667%;\n  max-width: 66.666667%;\n}\n#canvas-quiz-stats .col-9 {\n  -ms-flex: 0 0 75%;\n  flex: 0 0 75%;\n  max-width: 75%;\n}\n#canvas-quiz-stats .col-10 {\n  -ms-flex: 0 0 83.333333%;\n  flex: 0 0 83.333333%;\n  max-width: 83.333333%;\n}\n#canvas-quiz-stats .col-11 {\n  -ms-flex: 0 0 91.666667%;\n  flex: 0 0 91.666667%;\n  max-width: 91.666667%;\n}\n#canvas-quiz-stats .col-12 {\n  -ms-flex: 0 0 100%;\n  flex: 0 0 100%;\n  max-width: 100%;\n}\n#canvas-quiz-stats .order-first {\n  -ms-flex-order: -1;\n  order: -1;\n}\n#canvas-quiz-stats .order-last {\n  -ms-flex-order: 13;\n  order: 13;\n}\n#canvas-quiz-stats .order-0 {\n  -ms-flex-order: 0;\n  order: 0;\n}\n#canvas-quiz-stats .order-1 {\n  -ms-flex-order: 1;\n  order: 1;\n}\n#canvas-quiz-stats .order-2 {\n  -ms-flex-order: 2;\n  order: 2;\n}\n#canvas-quiz-stats .order-3 {\n  -ms-flex-order: 3;\n  order: 3;\n}\n#canvas-quiz-stats .order-4 {\n  -ms-flex-order: 4;\n  order: 4;\n}\n#canvas-quiz-stats .order-5 {\n  -ms-flex-order: 5;\n  order: 5;\n}\n#canvas-quiz-stats .order-6 {\n  -ms-flex-order: 6;\n  order: 6;\n}\n#canvas-quiz-stats .order-7 {\n  -ms-flex-order: 7;\n  order: 7;\n}\n#canvas-quiz-stats .order-8 {\n  -ms-flex-order: 8;\n  order: 8;\n}\n#canvas-quiz-stats .order-9 {\n  -ms-flex-order: 9;\n  order: 9;\n}\n#canvas-quiz-stats .order-10 {\n  -ms-flex-order: 10;\n  order: 10;\n}\n#canvas-quiz-stats .order-11 {\n  -ms-flex-order: 11;\n  order: 11;\n}\n#canvas-quiz-stats .order-12 {\n  -ms-flex-order: 12;\n  order: 12;\n}\n#canvas-quiz-stats .offset-1 {\n  margin-left: 8.333333%;\n}\n#canvas-quiz-stats .offset-2 {\n  margin-left: 16.666667%;\n}\n#canvas-quiz-stats .offset-3 {\n  margin-left: 25%;\n}\n#canvas-quiz-stats .offset-4 {\n  margin-left: 33.333333%;\n}\n#canvas-quiz-stats .offset-5 {\n  margin-left: 41.666667%;\n}\n#canvas-quiz-stats .offset-6 {\n  margin-left: 50%;\n}\n#canvas-quiz-stats .offset-7 {\n  margin-left: 58.333333%;\n}\n#canvas-quiz-stats .offset-8 {\n  margin-left: 66.666667%;\n}\n#canvas-quiz-stats .offset-9 {\n  margin-left: 75%;\n}\n#canvas-quiz-stats .offset-10 {\n  margin-left: 83.333333%;\n}\n#canvas-quiz-stats .offset-11 {\n  margin-left: 91.666667%;\n}\n@media (min-width: 576px) {\n  #canvas-quiz-stats .col-sm {\n    -ms-flex-preferred-size: 0;\n    flex-basis: 0;\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    max-width: 100%;\n  }\n  #canvas-quiz-stats .row-cols-sm-1 > * {\n    -ms-flex: 0 0 100%;\n    flex: 0 0 100%;\n    max-width: 100%;\n  }\n  #canvas-quiz-stats .row-cols-sm-2 > * {\n    -ms-flex: 0 0 50%;\n    flex: 0 0 50%;\n    max-width: 50%;\n  }\n  #canvas-quiz-stats .row-cols-sm-3 > * {\n    -ms-flex: 0 0 33.333333%;\n    flex: 0 0 33.333333%;\n    max-width: 33.333333%;\n  }\n  #canvas-quiz-stats .row-cols-sm-4 > * {\n    -ms-flex: 0 0 25%;\n    flex: 0 0 25%;\n    max-width: 25%;\n  }\n  #canvas-quiz-stats .row-cols-sm-5 > * {\n    -ms-flex: 0 0 20%;\n    flex: 0 0 20%;\n    max-width: 20%;\n  }\n  #canvas-quiz-stats .row-cols-sm-6 > * {\n    -ms-flex: 0 0 16.666667%;\n    flex: 0 0 16.666667%;\n    max-width: 16.666667%;\n  }\n  #canvas-quiz-stats .col-sm-auto {\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    width: auto;\n    max-width: 100%;\n  }\n  #canvas-quiz-stats .col-sm-1 {\n    -ms-flex: 0 0 8.333333%;\n    flex: 0 0 8.333333%;\n    max-width: 8.333333%;\n  }\n  #canvas-quiz-stats .col-sm-2 {\n    -ms-flex: 0 0 16.666667%;\n    flex: 0 0 16.666667%;\n    max-width: 16.666667%;\n  }\n  #canvas-quiz-stats .col-sm-3 {\n    -ms-flex: 0 0 25%;\n    flex: 0 0 25%;\n    max-width: 25%;\n  }\n  #canvas-quiz-stats .col-sm-4 {\n    -ms-flex: 0 0 33.333333%;\n    flex: 0 0 33.333333%;\n    max-width: 33.333333%;\n  }\n  #canvas-quiz-stats .col-sm-5 {\n    -ms-flex: 0 0 41.666667%;\n    flex: 0 0 41.666667%;\n    max-width: 41.666667%;\n  }\n  #canvas-quiz-stats .col-sm-6 {\n    -ms-flex: 0 0 50%;\n    flex: 0 0 50%;\n    max-width: 50%;\n  }\n  #canvas-quiz-stats .col-sm-7 {\n    -ms-flex: 0 0 58.333333%;\n    flex: 0 0 58.333333%;\n    max-width: 58.333333%;\n  }\n  #canvas-quiz-stats .col-sm-8 {\n    -ms-flex: 0 0 66.666667%;\n    flex: 0 0 66.666667%;\n    max-width: 66.666667%;\n  }\n  #canvas-quiz-stats .col-sm-9 {\n    -ms-flex: 0 0 75%;\n    flex: 0 0 75%;\n    max-width: 75%;\n  }\n  #canvas-quiz-stats .col-sm-10 {\n    -ms-flex: 0 0 83.333333%;\n    flex: 0 0 83.333333%;\n    max-width: 83.333333%;\n  }\n  #canvas-quiz-stats .col-sm-11 {\n    -ms-flex: 0 0 91.666667%;\n    flex: 0 0 91.666667%;\n    max-width: 91.666667%;\n  }\n  #canvas-quiz-stats .col-sm-12 {\n    -ms-flex: 0 0 100%;\n    flex: 0 0 100%;\n    max-width: 100%;\n  }\n  #canvas-quiz-stats .order-sm-first {\n    -ms-flex-order: -1;\n    order: -1;\n  }\n  #canvas-quiz-stats .order-sm-last {\n    -ms-flex-order: 13;\n    order: 13;\n  }\n  #canvas-quiz-stats .order-sm-0 {\n    -ms-flex-order: 0;\n    order: 0;\n  }\n  #canvas-quiz-stats .order-sm-1 {\n    -ms-flex-order: 1;\n    order: 1;\n  }\n  #canvas-quiz-stats .order-sm-2 {\n    -ms-flex-order: 2;\n    order: 2;\n  }\n  #canvas-quiz-stats .order-sm-3 {\n    -ms-flex-order: 3;\n    order: 3;\n  }\n  #canvas-quiz-stats .order-sm-4 {\n    -ms-flex-order: 4;\n    order: 4;\n  }\n  #canvas-quiz-stats .order-sm-5 {\n    -ms-flex-order: 5;\n    order: 5;\n  }\n  #canvas-quiz-stats .order-sm-6 {\n    -ms-flex-order: 6;\n    order: 6;\n  }\n  #canvas-quiz-stats .order-sm-7 {\n    -ms-flex-order: 7;\n    order: 7;\n  }\n  #canvas-quiz-stats .order-sm-8 {\n    -ms-flex-order: 8;\n    order: 8;\n  }\n  #canvas-quiz-stats .order-sm-9 {\n    -ms-flex-order: 9;\n    order: 9;\n  }\n  #canvas-quiz-stats .order-sm-10 {\n    -ms-flex-order: 10;\n    order: 10;\n  }\n  #canvas-quiz-stats .order-sm-11 {\n    -ms-flex-order: 11;\n    order: 11;\n  }\n  #canvas-quiz-stats .order-sm-12 {\n    -ms-flex-order: 12;\n    order: 12;\n  }\n  #canvas-quiz-stats .offset-sm-0 {\n    margin-left: 0;\n  }\n  #canvas-quiz-stats .offset-sm-1 {\n    margin-left: 8.333333%;\n  }\n  #canvas-quiz-stats .offset-sm-2 {\n    margin-left: 16.666667%;\n  }\n  #canvas-quiz-stats .offset-sm-3 {\n    margin-left: 25%;\n  }\n  #canvas-quiz-stats .offset-sm-4 {\n    margin-left: 33.333333%;\n  }\n  #canvas-quiz-stats .offset-sm-5 {\n    margin-left: 41.666667%;\n  }\n  #canvas-quiz-stats .offset-sm-6 {\n    margin-left: 50%;\n  }\n  #canvas-quiz-stats .offset-sm-7 {\n    margin-left: 58.333333%;\n  }\n  #canvas-quiz-stats .offset-sm-8 {\n    margin-left: 66.666667%;\n  }\n  #canvas-quiz-stats .offset-sm-9 {\n    margin-left: 75%;\n  }\n  #canvas-quiz-stats .offset-sm-10 {\n    margin-left: 83.333333%;\n  }\n  #canvas-quiz-stats .offset-sm-11 {\n    margin-left: 91.666667%;\n  }\n}\n@media (min-width: 768px) {\n  #canvas-quiz-stats .col-md {\n    -ms-flex-preferred-size: 0;\n    flex-basis: 0;\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    max-width: 100%;\n  }\n  #canvas-quiz-stats .row-cols-md-1 > * {\n    -ms-flex: 0 0 100%;\n    flex: 0 0 100%;\n    max-width: 100%;\n  }\n  #canvas-quiz-stats .row-cols-md-2 > * {\n    -ms-flex: 0 0 50%;\n    flex: 0 0 50%;\n    max-width: 50%;\n  }\n  #canvas-quiz-stats .row-cols-md-3 > * {\n    -ms-flex: 0 0 33.333333%;\n    flex: 0 0 33.333333%;\n    max-width: 33.333333%;\n  }\n  #canvas-quiz-stats .row-cols-md-4 > * {\n    -ms-flex: 0 0 25%;\n    flex: 0 0 25%;\n    max-width: 25%;\n  }\n  #canvas-quiz-stats .row-cols-md-5 > * {\n    -ms-flex: 0 0 20%;\n    flex: 0 0 20%;\n    max-width: 20%;\n  }\n  #canvas-quiz-stats .row-cols-md-6 > * {\n    -ms-flex: 0 0 16.666667%;\n    flex: 0 0 16.666667%;\n    max-width: 16.666667%;\n  }\n  #canvas-quiz-stats .col-md-auto {\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    width: auto;\n    max-width: 100%;\n  }\n  #canvas-quiz-stats .col-md-1 {\n    -ms-flex: 0 0 8.333333%;\n    flex: 0 0 8.333333%;\n    max-width: 8.333333%;\n  }\n  #canvas-quiz-stats .col-md-2 {\n    -ms-flex: 0 0 16.666667%;\n    flex: 0 0 16.666667%;\n    max-width: 16.666667%;\n  }\n  #canvas-quiz-stats .col-md-3 {\n    -ms-flex: 0 0 25%;\n    flex: 0 0 25%;\n    max-width: 25%;\n  }\n  #canvas-quiz-stats .col-md-4 {\n    -ms-flex: 0 0 33.333333%;\n    flex: 0 0 33.333333%;\n    max-width: 33.333333%;\n  }\n  #canvas-quiz-stats .col-md-5 {\n    -ms-flex: 0 0 41.666667%;\n    flex: 0 0 41.666667%;\n    max-width: 41.666667%;\n  }\n  #canvas-quiz-stats .col-md-6 {\n    -ms-flex: 0 0 50%;\n    flex: 0 0 50%;\n    max-width: 50%;\n  }\n  #canvas-quiz-stats .col-md-7 {\n    -ms-flex: 0 0 58.333333%;\n    flex: 0 0 58.333333%;\n    max-width: 58.333333%;\n  }\n  #canvas-quiz-stats .col-md-8 {\n    -ms-flex: 0 0 66.666667%;\n    flex: 0 0 66.666667%;\n    max-width: 66.666667%;\n  }\n  #canvas-quiz-stats .col-md-9 {\n    -ms-flex: 0 0 75%;\n    flex: 0 0 75%;\n    max-width: 75%;\n  }\n  #canvas-quiz-stats .col-md-10 {\n    -ms-flex: 0 0 83.333333%;\n    flex: 0 0 83.333333%;\n    max-width: 83.333333%;\n  }\n  #canvas-quiz-stats .col-md-11 {\n    -ms-flex: 0 0 91.666667%;\n    flex: 0 0 91.666667%;\n    max-width: 91.666667%;\n  }\n  #canvas-quiz-stats .col-md-12 {\n    -ms-flex: 0 0 100%;\n    flex: 0 0 100%;\n    max-width: 100%;\n  }\n  #canvas-quiz-stats .order-md-first {\n    -ms-flex-order: -1;\n    order: -1;\n  }\n  #canvas-quiz-stats .order-md-last {\n    -ms-flex-order: 13;\n    order: 13;\n  }\n  #canvas-quiz-stats .order-md-0 {\n    -ms-flex-order: 0;\n    order: 0;\n  }\n  #canvas-quiz-stats .order-md-1 {\n    -ms-flex-order: 1;\n    order: 1;\n  }\n  #canvas-quiz-stats .order-md-2 {\n    -ms-flex-order: 2;\n    order: 2;\n  }\n  #canvas-quiz-stats .order-md-3 {\n    -ms-flex-order: 3;\n    order: 3;\n  }\n  #canvas-quiz-stats .order-md-4 {\n    -ms-flex-order: 4;\n    order: 4;\n  }\n  #canvas-quiz-stats .order-md-5 {\n    -ms-flex-order: 5;\n    order: 5;\n  }\n  #canvas-quiz-stats .order-md-6 {\n    -ms-flex-order: 6;\n    order: 6;\n  }\n  #canvas-quiz-stats .order-md-7 {\n    -ms-flex-order: 7;\n    order: 7;\n  }\n  #canvas-quiz-stats .order-md-8 {\n    -ms-flex-order: 8;\n    order: 8;\n  }\n  #canvas-quiz-stats .order-md-9 {\n    -ms-flex-order: 9;\n    order: 9;\n  }\n  #canvas-quiz-stats .order-md-10 {\n    -ms-flex-order: 10;\n    order: 10;\n  }\n  #canvas-quiz-stats .order-md-11 {\n    -ms-flex-order: 11;\n    order: 11;\n  }\n  #canvas-quiz-stats .order-md-12 {\n    -ms-flex-order: 12;\n    order: 12;\n  }\n  #canvas-quiz-stats .offset-md-0 {\n    margin-left: 0;\n  }\n  #canvas-quiz-stats .offset-md-1 {\n    margin-left: 8.333333%;\n  }\n  #canvas-quiz-stats .offset-md-2 {\n    margin-left: 16.666667%;\n  }\n  #canvas-quiz-stats .offset-md-3 {\n    margin-left: 25%;\n  }\n  #canvas-quiz-stats .offset-md-4 {\n    margin-left: 33.333333%;\n  }\n  #canvas-quiz-stats .offset-md-5 {\n    margin-left: 41.666667%;\n  }\n  #canvas-quiz-stats .offset-md-6 {\n    margin-left: 50%;\n  }\n  #canvas-quiz-stats .offset-md-7 {\n    margin-left: 58.333333%;\n  }\n  #canvas-quiz-stats .offset-md-8 {\n    margin-left: 66.666667%;\n  }\n  #canvas-quiz-stats .offset-md-9 {\n    margin-left: 75%;\n  }\n  #canvas-quiz-stats .offset-md-10 {\n    margin-left: 83.333333%;\n  }\n  #canvas-quiz-stats .offset-md-11 {\n    margin-left: 91.666667%;\n  }\n}\n@media (min-width: 992px) {\n  #canvas-quiz-stats .col-lg {\n    -ms-flex-preferred-size: 0;\n    flex-basis: 0;\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    max-width: 100%;\n  }\n  #canvas-quiz-stats .row-cols-lg-1 > * {\n    -ms-flex: 0 0 100%;\n    flex: 0 0 100%;\n    max-width: 100%;\n  }\n  #canvas-quiz-stats .row-cols-lg-2 > * {\n    -ms-flex: 0 0 50%;\n    flex: 0 0 50%;\n    max-width: 50%;\n  }\n  #canvas-quiz-stats .row-cols-lg-3 > * {\n    -ms-flex: 0 0 33.333333%;\n    flex: 0 0 33.333333%;\n    max-width: 33.333333%;\n  }\n  #canvas-quiz-stats .row-cols-lg-4 > * {\n    -ms-flex: 0 0 25%;\n    flex: 0 0 25%;\n    max-width: 25%;\n  }\n  #canvas-quiz-stats .row-cols-lg-5 > * {\n    -ms-flex: 0 0 20%;\n    flex: 0 0 20%;\n    max-width: 20%;\n  }\n  #canvas-quiz-stats .row-cols-lg-6 > * {\n    -ms-flex: 0 0 16.666667%;\n    flex: 0 0 16.666667%;\n    max-width: 16.666667%;\n  }\n  #canvas-quiz-stats .col-lg-auto {\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    width: auto;\n    max-width: 100%;\n  }\n  #canvas-quiz-stats .col-lg-1 {\n    -ms-flex: 0 0 8.333333%;\n    flex: 0 0 8.333333%;\n    max-width: 8.333333%;\n  }\n  #canvas-quiz-stats .col-lg-2 {\n    -ms-flex: 0 0 16.666667%;\n    flex: 0 0 16.666667%;\n    max-width: 16.666667%;\n  }\n  #canvas-quiz-stats .col-lg-3 {\n    -ms-flex: 0 0 25%;\n    flex: 0 0 25%;\n    max-width: 25%;\n  }\n  #canvas-quiz-stats .col-lg-4 {\n    -ms-flex: 0 0 33.333333%;\n    flex: 0 0 33.333333%;\n    max-width: 33.333333%;\n  }\n  #canvas-quiz-stats .col-lg-5 {\n    -ms-flex: 0 0 41.666667%;\n    flex: 0 0 41.666667%;\n    max-width: 41.666667%;\n  }\n  #canvas-quiz-stats .col-lg-6 {\n    -ms-flex: 0 0 50%;\n    flex: 0 0 50%;\n    max-width: 50%;\n  }\n  #canvas-quiz-stats .col-lg-7 {\n    -ms-flex: 0 0 58.333333%;\n    flex: 0 0 58.333333%;\n    max-width: 58.333333%;\n  }\n  #canvas-quiz-stats .col-lg-8 {\n    -ms-flex: 0 0 66.666667%;\n    flex: 0 0 66.666667%;\n    max-width: 66.666667%;\n  }\n  #canvas-quiz-stats .col-lg-9 {\n    -ms-flex: 0 0 75%;\n    flex: 0 0 75%;\n    max-width: 75%;\n  }\n  #canvas-quiz-stats .col-lg-10 {\n    -ms-flex: 0 0 83.333333%;\n    flex: 0 0 83.333333%;\n    max-width: 83.333333%;\n  }\n  #canvas-quiz-stats .col-lg-11 {\n    -ms-flex: 0 0 91.666667%;\n    flex: 0 0 91.666667%;\n    max-width: 91.666667%;\n  }\n  #canvas-quiz-stats .col-lg-12 {\n    -ms-flex: 0 0 100%;\n    flex: 0 0 100%;\n    max-width: 100%;\n  }\n  #canvas-quiz-stats .order-lg-first {\n    -ms-flex-order: -1;\n    order: -1;\n  }\n  #canvas-quiz-stats .order-lg-last {\n    -ms-flex-order: 13;\n    order: 13;\n  }\n  #canvas-quiz-stats .order-lg-0 {\n    -ms-flex-order: 0;\n    order: 0;\n  }\n  #canvas-quiz-stats .order-lg-1 {\n    -ms-flex-order: 1;\n    order: 1;\n  }\n  #canvas-quiz-stats .order-lg-2 {\n    -ms-flex-order: 2;\n    order: 2;\n  }\n  #canvas-quiz-stats .order-lg-3 {\n    -ms-flex-order: 3;\n    order: 3;\n  }\n  #canvas-quiz-stats .order-lg-4 {\n    -ms-flex-order: 4;\n    order: 4;\n  }\n  #canvas-quiz-stats .order-lg-5 {\n    -ms-flex-order: 5;\n    order: 5;\n  }\n  #canvas-quiz-stats .order-lg-6 {\n    -ms-flex-order: 6;\n    order: 6;\n  }\n  #canvas-quiz-stats .order-lg-7 {\n    -ms-flex-order: 7;\n    order: 7;\n  }\n  #canvas-quiz-stats .order-lg-8 {\n    -ms-flex-order: 8;\n    order: 8;\n  }\n  #canvas-quiz-stats .order-lg-9 {\n    -ms-flex-order: 9;\n    order: 9;\n  }\n  #canvas-quiz-stats .order-lg-10 {\n    -ms-flex-order: 10;\n    order: 10;\n  }\n  #canvas-quiz-stats .order-lg-11 {\n    -ms-flex-order: 11;\n    order: 11;\n  }\n  #canvas-quiz-stats .order-lg-12 {\n    -ms-flex-order: 12;\n    order: 12;\n  }\n  #canvas-quiz-stats .offset-lg-0 {\n    margin-left: 0;\n  }\n  #canvas-quiz-stats .offset-lg-1 {\n    margin-left: 8.333333%;\n  }\n  #canvas-quiz-stats .offset-lg-2 {\n    margin-left: 16.666667%;\n  }\n  #canvas-quiz-stats .offset-lg-3 {\n    margin-left: 25%;\n  }\n  #canvas-quiz-stats .offset-lg-4 {\n    margin-left: 33.333333%;\n  }\n  #canvas-quiz-stats .offset-lg-5 {\n    margin-left: 41.666667%;\n  }\n  #canvas-quiz-stats .offset-lg-6 {\n    margin-left: 50%;\n  }\n  #canvas-quiz-stats .offset-lg-7 {\n    margin-left: 58.333333%;\n  }\n  #canvas-quiz-stats .offset-lg-8 {\n    margin-left: 66.666667%;\n  }\n  #canvas-quiz-stats .offset-lg-9 {\n    margin-left: 75%;\n  }\n  #canvas-quiz-stats .offset-lg-10 {\n    margin-left: 83.333333%;\n  }\n  #canvas-quiz-stats .offset-lg-11 {\n    margin-left: 91.666667%;\n  }\n}\n@media (min-width: 1200px) {\n  #canvas-quiz-stats .col-xl {\n    -ms-flex-preferred-size: 0;\n    flex-basis: 0;\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    max-width: 100%;\n  }\n  #canvas-quiz-stats .row-cols-xl-1 > * {\n    -ms-flex: 0 0 100%;\n    flex: 0 0 100%;\n    max-width: 100%;\n  }\n  #canvas-quiz-stats .row-cols-xl-2 > * {\n    -ms-flex: 0 0 50%;\n    flex: 0 0 50%;\n    max-width: 50%;\n  }\n  #canvas-quiz-stats .row-cols-xl-3 > * {\n    -ms-flex: 0 0 33.333333%;\n    flex: 0 0 33.333333%;\n    max-width: 33.333333%;\n  }\n  #canvas-quiz-stats .row-cols-xl-4 > * {\n    -ms-flex: 0 0 25%;\n    flex: 0 0 25%;\n    max-width: 25%;\n  }\n  #canvas-quiz-stats .row-cols-xl-5 > * {\n    -ms-flex: 0 0 20%;\n    flex: 0 0 20%;\n    max-width: 20%;\n  }\n  #canvas-quiz-stats .row-cols-xl-6 > * {\n    -ms-flex: 0 0 16.666667%;\n    flex: 0 0 16.666667%;\n    max-width: 16.666667%;\n  }\n  #canvas-quiz-stats .col-xl-auto {\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    width: auto;\n    max-width: 100%;\n  }\n  #canvas-quiz-stats .col-xl-1 {\n    -ms-flex: 0 0 8.333333%;\n    flex: 0 0 8.333333%;\n    max-width: 8.333333%;\n  }\n  #canvas-quiz-stats .col-xl-2 {\n    -ms-flex: 0 0 16.666667%;\n    flex: 0 0 16.666667%;\n    max-width: 16.666667%;\n  }\n  #canvas-quiz-stats .col-xl-3 {\n    -ms-flex: 0 0 25%;\n    flex: 0 0 25%;\n    max-width: 25%;\n  }\n  #canvas-quiz-stats .col-xl-4 {\n    -ms-flex: 0 0 33.333333%;\n    flex: 0 0 33.333333%;\n    max-width: 33.333333%;\n  }\n  #canvas-quiz-stats .col-xl-5 {\n    -ms-flex: 0 0 41.666667%;\n    flex: 0 0 41.666667%;\n    max-width: 41.666667%;\n  }\n  #canvas-quiz-stats .col-xl-6 {\n    -ms-flex: 0 0 50%;\n    flex: 0 0 50%;\n    max-width: 50%;\n  }\n  #canvas-quiz-stats .col-xl-7 {\n    -ms-flex: 0 0 58.333333%;\n    flex: 0 0 58.333333%;\n    max-width: 58.333333%;\n  }\n  #canvas-quiz-stats .col-xl-8 {\n    -ms-flex: 0 0 66.666667%;\n    flex: 0 0 66.666667%;\n    max-width: 66.666667%;\n  }\n  #canvas-quiz-stats .col-xl-9 {\n    -ms-flex: 0 0 75%;\n    flex: 0 0 75%;\n    max-width: 75%;\n  }\n  #canvas-quiz-stats .col-xl-10 {\n    -ms-flex: 0 0 83.333333%;\n    flex: 0 0 83.333333%;\n    max-width: 83.333333%;\n  }\n  #canvas-quiz-stats .col-xl-11 {\n    -ms-flex: 0 0 91.666667%;\n    flex: 0 0 91.666667%;\n    max-width: 91.666667%;\n  }\n  #canvas-quiz-stats .col-xl-12 {\n    -ms-flex: 0 0 100%;\n    flex: 0 0 100%;\n    max-width: 100%;\n  }\n  #canvas-quiz-stats .order-xl-first {\n    -ms-flex-order: -1;\n    order: -1;\n  }\n  #canvas-quiz-stats .order-xl-last {\n    -ms-flex-order: 13;\n    order: 13;\n  }\n  #canvas-quiz-stats .order-xl-0 {\n    -ms-flex-order: 0;\n    order: 0;\n  }\n  #canvas-quiz-stats .order-xl-1 {\n    -ms-flex-order: 1;\n    order: 1;\n  }\n  #canvas-quiz-stats .order-xl-2 {\n    -ms-flex-order: 2;\n    order: 2;\n  }\n  #canvas-quiz-stats .order-xl-3 {\n    -ms-flex-order: 3;\n    order: 3;\n  }\n  #canvas-quiz-stats .order-xl-4 {\n    -ms-flex-order: 4;\n    order: 4;\n  }\n  #canvas-quiz-stats .order-xl-5 {\n    -ms-flex-order: 5;\n    order: 5;\n  }\n  #canvas-quiz-stats .order-xl-6 {\n    -ms-flex-order: 6;\n    order: 6;\n  }\n  #canvas-quiz-stats .order-xl-7 {\n    -ms-flex-order: 7;\n    order: 7;\n  }\n  #canvas-quiz-stats .order-xl-8 {\n    -ms-flex-order: 8;\n    order: 8;\n  }\n  #canvas-quiz-stats .order-xl-9 {\n    -ms-flex-order: 9;\n    order: 9;\n  }\n  #canvas-quiz-stats .order-xl-10 {\n    -ms-flex-order: 10;\n    order: 10;\n  }\n  #canvas-quiz-stats .order-xl-11 {\n    -ms-flex-order: 11;\n    order: 11;\n  }\n  #canvas-quiz-stats .order-xl-12 {\n    -ms-flex-order: 12;\n    order: 12;\n  }\n  #canvas-quiz-stats .offset-xl-0 {\n    margin-left: 0;\n  }\n  #canvas-quiz-stats .offset-xl-1 {\n    margin-left: 8.333333%;\n  }\n  #canvas-quiz-stats .offset-xl-2 {\n    margin-left: 16.666667%;\n  }\n  #canvas-quiz-stats .offset-xl-3 {\n    margin-left: 25%;\n  }\n  #canvas-quiz-stats .offset-xl-4 {\n    margin-left: 33.333333%;\n  }\n  #canvas-quiz-stats .offset-xl-5 {\n    margin-left: 41.666667%;\n  }\n  #canvas-quiz-stats .offset-xl-6 {\n    margin-left: 50%;\n  }\n  #canvas-quiz-stats .offset-xl-7 {\n    margin-left: 58.333333%;\n  }\n  #canvas-quiz-stats .offset-xl-8 {\n    margin-left: 66.666667%;\n  }\n  #canvas-quiz-stats .offset-xl-9 {\n    margin-left: 75%;\n  }\n  #canvas-quiz-stats .offset-xl-10 {\n    margin-left: 83.333333%;\n  }\n  #canvas-quiz-stats .offset-xl-11 {\n    margin-left: 91.666667%;\n  }\n}\n#canvas-quiz-stats .table {\n  width: 100%;\n  margin-bottom: 1rem;\n  color: #212529;\n}\n#canvas-quiz-stats .table th,\n#canvas-quiz-stats .table td {\n  padding: 0.75rem;\n  vertical-align: top;\n  border-top: 1px solid #dee2e6;\n}\n#canvas-quiz-stats .table thead th {\n  vertical-align: bottom;\n  border-bottom: 2px solid #dee2e6;\n}\n#canvas-quiz-stats .table tbody + tbody {\n  border-top: 2px solid #dee2e6;\n}\n#canvas-quiz-stats .table-sm th,\n#canvas-quiz-stats .table-sm td {\n  padding: 0.3rem;\n}\n#canvas-quiz-stats .table-bordered {\n  border: 1px solid #dee2e6;\n}\n#canvas-quiz-stats .table-bordered th,\n#canvas-quiz-stats .table-bordered td {\n  border: 1px solid #dee2e6;\n}\n#canvas-quiz-stats .table-bordered thead th,\n#canvas-quiz-stats .table-bordered thead td {\n  border-bottom-width: 2px;\n}\n#canvas-quiz-stats .table-borderless th,\n#canvas-quiz-stats .table-borderless td,\n#canvas-quiz-stats .table-borderless thead th,\n#canvas-quiz-stats .table-borderless tbody + tbody {\n  border: 0;\n}\n#canvas-quiz-stats .table-striped tbody tr:nth-of-type(odd) {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n#canvas-quiz-stats .table-hover tbody tr:hover {\n  color: #212529;\n  background-color: rgba(0, 0, 0, 0.075);\n}\n#canvas-quiz-stats .table-primary,\n#canvas-quiz-stats .table-primary > th,\n#canvas-quiz-stats .table-primary > td {\n  background-color: #b8daff;\n}\n#canvas-quiz-stats .table-primary th,\n#canvas-quiz-stats .table-primary td,\n#canvas-quiz-stats .table-primary thead th,\n#canvas-quiz-stats .table-primary tbody + tbody {\n  border-color: #7abaff;\n}\n#canvas-quiz-stats .table-hover .table-primary:hover {\n  background-color: #9fcdff;\n}\n#canvas-quiz-stats .table-hover .table-primary:hover > td,\n#canvas-quiz-stats .table-hover .table-primary:hover > th {\n  background-color: #9fcdff;\n}\n#canvas-quiz-stats .table-secondary,\n#canvas-quiz-stats .table-secondary > th,\n#canvas-quiz-stats .table-secondary > td {\n  background-color: #d6d8db;\n}\n#canvas-quiz-stats .table-secondary th,\n#canvas-quiz-stats .table-secondary td,\n#canvas-quiz-stats .table-secondary thead th,\n#canvas-quiz-stats .table-secondary tbody + tbody {\n  border-color: #b3b7bb;\n}\n#canvas-quiz-stats .table-hover .table-secondary:hover {\n  background-color: #c8cbcf;\n}\n#canvas-quiz-stats .table-hover .table-secondary:hover > td,\n#canvas-quiz-stats .table-hover .table-secondary:hover > th {\n  background-color: #c8cbcf;\n}\n#canvas-quiz-stats .table-success,\n#canvas-quiz-stats .table-success > th,\n#canvas-quiz-stats .table-success > td {\n  background-color: #c3e6cb;\n}\n#canvas-quiz-stats .table-success th,\n#canvas-quiz-stats .table-success td,\n#canvas-quiz-stats .table-success thead th,\n#canvas-quiz-stats .table-success tbody + tbody {\n  border-color: #8fd19e;\n}\n#canvas-quiz-stats .table-hover .table-success:hover {\n  background-color: #b1dfbb;\n}\n#canvas-quiz-stats .table-hover .table-success:hover > td,\n#canvas-quiz-stats .table-hover .table-success:hover > th {\n  background-color: #b1dfbb;\n}\n#canvas-quiz-stats .table-info,\n#canvas-quiz-stats .table-info > th,\n#canvas-quiz-stats .table-info > td {\n  background-color: #bee5eb;\n}\n#canvas-quiz-stats .table-info th,\n#canvas-quiz-stats .table-info td,\n#canvas-quiz-stats .table-info thead th,\n#canvas-quiz-stats .table-info tbody + tbody {\n  border-color: #86cfda;\n}\n#canvas-quiz-stats .table-hover .table-info:hover {\n  background-color: #abdde5;\n}\n#canvas-quiz-stats .table-hover .table-info:hover > td,\n#canvas-quiz-stats .table-hover .table-info:hover > th {\n  background-color: #abdde5;\n}\n#canvas-quiz-stats .table-warning,\n#canvas-quiz-stats .table-warning > th,\n#canvas-quiz-stats .table-warning > td {\n  background-color: #ffeeba;\n}\n#canvas-quiz-stats .table-warning th,\n#canvas-quiz-stats .table-warning td,\n#canvas-quiz-stats .table-warning thead th,\n#canvas-quiz-stats .table-warning tbody + tbody {\n  border-color: #ffdf7e;\n}\n#canvas-quiz-stats .table-hover .table-warning:hover {\n  background-color: #ffe8a1;\n}\n#canvas-quiz-stats .table-hover .table-warning:hover > td,\n#canvas-quiz-stats .table-hover .table-warning:hover > th {\n  background-color: #ffe8a1;\n}\n#canvas-quiz-stats .table-danger,\n#canvas-quiz-stats .table-danger > th,\n#canvas-quiz-stats .table-danger > td {\n  background-color: #f5c6cb;\n}\n#canvas-quiz-stats .table-danger th,\n#canvas-quiz-stats .table-danger td,\n#canvas-quiz-stats .table-danger thead th,\n#canvas-quiz-stats .table-danger tbody + tbody {\n  border-color: #ed969e;\n}\n#canvas-quiz-stats .table-hover .table-danger:hover {\n  background-color: #f1b0b7;\n}\n#canvas-quiz-stats .table-hover .table-danger:hover > td,\n#canvas-quiz-stats .table-hover .table-danger:hover > th {\n  background-color: #f1b0b7;\n}\n#canvas-quiz-stats .table-light,\n#canvas-quiz-stats .table-light > th,\n#canvas-quiz-stats .table-light > td {\n  background-color: #fdfdfe;\n}\n#canvas-quiz-stats .table-light th,\n#canvas-quiz-stats .table-light td,\n#canvas-quiz-stats .table-light thead th,\n#canvas-quiz-stats .table-light tbody + tbody {\n  border-color: #fbfcfc;\n}\n#canvas-quiz-stats .table-hover .table-light:hover {\n  background-color: #ececf6;\n}\n#canvas-quiz-stats .table-hover .table-light:hover > td,\n#canvas-quiz-stats .table-hover .table-light:hover > th {\n  background-color: #ececf6;\n}\n#canvas-quiz-stats .table-dark,\n#canvas-quiz-stats .table-dark > th,\n#canvas-quiz-stats .table-dark > td {\n  background-color: #c6c8ca;\n}\n#canvas-quiz-stats .table-dark th,\n#canvas-quiz-stats .table-dark td,\n#canvas-quiz-stats .table-dark thead th,\n#canvas-quiz-stats .table-dark tbody + tbody {\n  border-color: #95999c;\n}\n#canvas-quiz-stats .table-hover .table-dark:hover {\n  background-color: #b9bbbe;\n}\n#canvas-quiz-stats .table-hover .table-dark:hover > td,\n#canvas-quiz-stats .table-hover .table-dark:hover > th {\n  background-color: #b9bbbe;\n}\n#canvas-quiz-stats .table-active,\n#canvas-quiz-stats .table-active > th,\n#canvas-quiz-stats .table-active > td {\n  background-color: rgba(0, 0, 0, 0.075);\n}\n#canvas-quiz-stats .table-hover .table-active:hover {\n  background-color: rgba(0, 0, 0, 0.075);\n}\n#canvas-quiz-stats .table-hover .table-active:hover > td,\n#canvas-quiz-stats .table-hover .table-active:hover > th {\n  background-color: rgba(0, 0, 0, 0.075);\n}\n#canvas-quiz-stats .table .thead-dark th {\n  color: #fff;\n  background-color: #343a40;\n  border-color: #454d55;\n}\n#canvas-quiz-stats .table .thead-light th {\n  color: #495057;\n  background-color: #e9ecef;\n  border-color: #dee2e6;\n}\n#canvas-quiz-stats .table-dark {\n  color: #fff;\n  background-color: #343a40;\n}\n#canvas-quiz-stats .table-dark th,\n#canvas-quiz-stats .table-dark td,\n#canvas-quiz-stats .table-dark thead th {\n  border-color: #454d55;\n}\n#canvas-quiz-stats .table-dark.table-bordered {\n  border: 0;\n}\n#canvas-quiz-stats .table-dark.table-striped tbody tr:nth-of-type(odd) {\n  background-color: rgba(255, 255, 255, 0.05);\n}\n#canvas-quiz-stats .table-dark.table-hover tbody tr:hover {\n  color: #fff;\n  background-color: rgba(255, 255, 255, 0.075);\n}\n@media (max-width: 575.98px) {\n  #canvas-quiz-stats .table-responsive-sm {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n  #canvas-quiz-stats .table-responsive-sm > .table-bordered {\n    border: 0;\n  }\n}\n@media (max-width: 767.98px) {\n  #canvas-quiz-stats .table-responsive-md {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n  #canvas-quiz-stats .table-responsive-md > .table-bordered {\n    border: 0;\n  }\n}\n@media (max-width: 991.98px) {\n  #canvas-quiz-stats .table-responsive-lg {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n  #canvas-quiz-stats .table-responsive-lg > .table-bordered {\n    border: 0;\n  }\n}\n@media (max-width: 1199.98px) {\n  #canvas-quiz-stats .table-responsive-xl {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n  #canvas-quiz-stats .table-responsive-xl > .table-bordered {\n    border: 0;\n  }\n}\n#canvas-quiz-stats .table-responsive {\n  display: block;\n  width: 100%;\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n}\n#canvas-quiz-stats .table-responsive > .table-bordered {\n  border: 0;\n}\n#canvas-quiz-stats .form-control {\n  display: block;\n  width: 100%;\n  height: calc(1.5em + 0.75rem + 2px);\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #495057;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  #canvas-quiz-stats .form-control {\n    transition: none;\n  }\n}\n#canvas-quiz-stats .form-control::-ms-expand {\n  background-color: transparent;\n  border: 0;\n}\n#canvas-quiz-stats .form-control:-moz-focusring {\n  color: transparent;\n  text-shadow: 0 0 0 #495057;\n}\n#canvas-quiz-stats .form-control:focus {\n  color: #495057;\n  background-color: #fff;\n  border-color: #80bdff;\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n#canvas-quiz-stats .form-control::-webkit-input-placeholder {\n  color: #6c757d;\n  opacity: 1;\n}\n#canvas-quiz-stats .form-control::-moz-placeholder {\n  color: #6c757d;\n  opacity: 1;\n}\n#canvas-quiz-stats .form-control:-ms-input-placeholder {\n  color: #6c757d;\n  opacity: 1;\n}\n#canvas-quiz-stats .form-control::-ms-input-placeholder {\n  color: #6c757d;\n  opacity: 1;\n}\n#canvas-quiz-stats .form-control::placeholder {\n  color: #6c757d;\n  opacity: 1;\n}\n#canvas-quiz-stats .form-control:disabled,\n#canvas-quiz-stats .form-control[readonly] {\n  background-color: #e9ecef;\n  opacity: 1;\n}\n#canvas-quiz-stats input[type=\"date\"].form-control,\n#canvas-quiz-stats input[type=\"time\"].form-control,\n#canvas-quiz-stats input[type=\"datetime-local\"].form-control,\n#canvas-quiz-stats input[type=\"month\"].form-control {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\n#canvas-quiz-stats select.form-control:focus::-ms-value {\n  color: #495057;\n  background-color: #fff;\n}\n#canvas-quiz-stats .form-control-file,\n#canvas-quiz-stats .form-control-range {\n  display: block;\n  width: 100%;\n}\n#canvas-quiz-stats .col-form-label {\n  padding-top: calc(0.375rem + 1px);\n  padding-bottom: calc(0.375rem + 1px);\n  margin-bottom: 0;\n  font-size: inherit;\n  line-height: 1.5;\n}\n#canvas-quiz-stats .col-form-label-lg {\n  padding-top: calc(0.5rem + 1px);\n  padding-bottom: calc(0.5rem + 1px);\n  font-size: 1.25rem;\n  line-height: 1.5;\n}\n#canvas-quiz-stats .col-form-label-sm {\n  padding-top: calc(0.25rem + 1px);\n  padding-bottom: calc(0.25rem + 1px);\n  font-size: 0.875rem;\n  line-height: 1.5;\n}\n#canvas-quiz-stats .form-control-plaintext {\n  display: block;\n  width: 100%;\n  padding: 0.375rem 0;\n  margin-bottom: 0;\n  font-size: 1rem;\n  line-height: 1.5;\n  color: #212529;\n  background-color: transparent;\n  border: solid transparent;\n  border-width: 1px 0;\n}\n#canvas-quiz-stats .form-control-plaintext.form-control-sm,\n#canvas-quiz-stats .form-control-plaintext.form-control-lg {\n  padding-right: 0;\n  padding-left: 0;\n}\n#canvas-quiz-stats .form-control-sm {\n  height: calc(1.5em + 0.5rem + 2px);\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  border-radius: 0.2rem;\n}\n#canvas-quiz-stats .form-control-lg {\n  height: calc(1.5em + 1rem + 2px);\n  padding: 0.5rem 1rem;\n  font-size: 1.25rem;\n  line-height: 1.5;\n  border-radius: 0.3rem;\n}\n#canvas-quiz-stats select.form-control[size],\n#canvas-quiz-stats select.form-control[multiple] {\n  height: auto;\n}\n#canvas-quiz-stats textarea.form-control {\n  height: auto;\n}\n#canvas-quiz-stats .form-group {\n  margin-bottom: 1rem;\n}\n#canvas-quiz-stats .form-text {\n  display: block;\n  margin-top: 0.25rem;\n}\n#canvas-quiz-stats .form-row {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  margin-right: -5px;\n  margin-left: -5px;\n}\n#canvas-quiz-stats .form-row > .col,\n#canvas-quiz-stats .form-row > [class*=\"col-\"] {\n  padding-right: 5px;\n  padding-left: 5px;\n}\n#canvas-quiz-stats .form-check {\n  position: relative;\n  display: block;\n  padding-left: 1.25rem;\n}\n#canvas-quiz-stats .form-check-input {\n  position: absolute;\n  margin-top: 0.3rem;\n  margin-left: -1.25rem;\n}\n#canvas-quiz-stats .form-check-input[disabled] ~ .form-check-label,\n#canvas-quiz-stats .form-check-input:disabled ~ .form-check-label {\n  color: #6c757d;\n}\n#canvas-quiz-stats .form-check-label {\n  margin-bottom: 0;\n}\n#canvas-quiz-stats .form-check-inline {\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -ms-flex-align: center;\n  align-items: center;\n  padding-left: 0;\n  margin-right: 0.75rem;\n}\n#canvas-quiz-stats .form-check-inline .form-check-input {\n  position: static;\n  margin-top: 0;\n  margin-right: 0.3125rem;\n  margin-left: 0;\n}\n#canvas-quiz-stats .valid-feedback {\n  display: none;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 80%;\n  color: #28a745;\n}\n#canvas-quiz-stats .valid-tooltip {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 5;\n  display: none;\n  max-width: 100%;\n  padding: 0.25rem 0.5rem;\n  margin-top: 0.1rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  color: #fff;\n  background-color: rgba(40, 167, 69, 0.9);\n  border-radius: 0.25rem;\n}\n#canvas-quiz-stats .was-validated :valid ~ .valid-feedback,\n#canvas-quiz-stats .was-validated :valid ~ .valid-tooltip,\n#canvas-quiz-stats .is-valid ~ .valid-feedback,\n#canvas-quiz-stats .is-valid ~ .valid-tooltip {\n  display: block;\n}\n#canvas-quiz-stats .was-validated .form-control:valid,\n#canvas-quiz-stats .form-control.is-valid {\n  border-color: #28a745;\n  padding-right: calc(1.5em + 0.75rem);\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e\");\n  background-repeat: no-repeat;\n  background-position: right calc(0.375em + 0.1875rem) center;\n  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);\n}\n#canvas-quiz-stats .was-validated .form-control:valid:focus,\n#canvas-quiz-stats .form-control.is-valid:focus {\n  border-color: #28a745;\n  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);\n}\n#canvas-quiz-stats .was-validated textarea.form-control:valid,\n#canvas-quiz-stats textarea.form-control.is-valid {\n  padding-right: calc(1.5em + 0.75rem);\n  background-position: top calc(0.375em + 0.1875rem) right calc(0.375em + 0.1875rem);\n}\n#canvas-quiz-stats .was-validated .custom-select:valid,\n#canvas-quiz-stats .custom-select.is-valid {\n  border-color: #28a745;\n  padding-right: calc(0.75em + 2.3125rem);\n  background: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e\") no-repeat right 0.75rem center / 8px 10px, url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e\") #fff no-repeat center right 1.75rem/calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);\n}\n#canvas-quiz-stats .was-validated .custom-select:valid:focus,\n#canvas-quiz-stats .custom-select.is-valid:focus {\n  border-color: #28a745;\n  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);\n}\n#canvas-quiz-stats .was-validated .form-check-input:valid ~ .form-check-label,\n#canvas-quiz-stats .form-check-input.is-valid ~ .form-check-label {\n  color: #28a745;\n}\n#canvas-quiz-stats .was-validated .form-check-input:valid ~ .valid-feedback,\n#canvas-quiz-stats .was-validated .form-check-input:valid ~ .valid-tooltip,\n#canvas-quiz-stats .form-check-input.is-valid ~ .valid-feedback,\n#canvas-quiz-stats .form-check-input.is-valid ~ .valid-tooltip {\n  display: block;\n}\n#canvas-quiz-stats .was-validated .custom-control-input:valid ~ .custom-control-label,\n#canvas-quiz-stats .custom-control-input.is-valid ~ .custom-control-label {\n  color: #28a745;\n}\n#canvas-quiz-stats .was-validated .custom-control-input:valid ~ .custom-control-label::before,\n#canvas-quiz-stats .custom-control-input.is-valid ~ .custom-control-label::before {\n  border-color: #28a745;\n}\n#canvas-quiz-stats .was-validated .custom-control-input:valid:checked ~ .custom-control-label::before,\n#canvas-quiz-stats .custom-control-input.is-valid:checked ~ .custom-control-label::before {\n  border-color: #34ce57;\n  background-color: #34ce57;\n}\n#canvas-quiz-stats .was-validated .custom-control-input:valid:focus ~ .custom-control-label::before,\n#canvas-quiz-stats .custom-control-input.is-valid:focus ~ .custom-control-label::before {\n  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);\n}\n#canvas-quiz-stats .was-validated .custom-control-input:valid:focus:not(:checked) ~ .custom-control-label::before,\n#canvas-quiz-stats .custom-control-input.is-valid:focus:not(:checked) ~ .custom-control-label::before {\n  border-color: #28a745;\n}\n#canvas-quiz-stats .was-validated .custom-file-input:valid ~ .custom-file-label,\n#canvas-quiz-stats .custom-file-input.is-valid ~ .custom-file-label {\n  border-color: #28a745;\n}\n#canvas-quiz-stats .was-validated .custom-file-input:valid:focus ~ .custom-file-label,\n#canvas-quiz-stats .custom-file-input.is-valid:focus ~ .custom-file-label {\n  border-color: #28a745;\n  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);\n}\n#canvas-quiz-stats .invalid-feedback {\n  display: none;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 80%;\n  color: #dc3545;\n}\n#canvas-quiz-stats .invalid-tooltip {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 5;\n  display: none;\n  max-width: 100%;\n  padding: 0.25rem 0.5rem;\n  margin-top: 0.1rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  color: #fff;\n  background-color: rgba(220, 53, 69, 0.9);\n  border-radius: 0.25rem;\n}\n#canvas-quiz-stats .was-validated :invalid ~ .invalid-feedback,\n#canvas-quiz-stats .was-validated :invalid ~ .invalid-tooltip,\n#canvas-quiz-stats .is-invalid ~ .invalid-feedback,\n#canvas-quiz-stats .is-invalid ~ .invalid-tooltip {\n  display: block;\n}\n#canvas-quiz-stats .was-validated .form-control:invalid,\n#canvas-quiz-stats .form-control.is-invalid {\n  border-color: #dc3545;\n  padding-right: calc(1.5em + 0.75rem);\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e\");\n  background-repeat: no-repeat;\n  background-position: right calc(0.375em + 0.1875rem) center;\n  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);\n}\n#canvas-quiz-stats .was-validated .form-control:invalid:focus,\n#canvas-quiz-stats .form-control.is-invalid:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n#canvas-quiz-stats .was-validated textarea.form-control:invalid,\n#canvas-quiz-stats textarea.form-control.is-invalid {\n  padding-right: calc(1.5em + 0.75rem);\n  background-position: top calc(0.375em + 0.1875rem) right calc(0.375em + 0.1875rem);\n}\n#canvas-quiz-stats .was-validated .custom-select:invalid,\n#canvas-quiz-stats .custom-select.is-invalid {\n  border-color: #dc3545;\n  padding-right: calc(0.75em + 2.3125rem);\n  background: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e\") no-repeat right 0.75rem center / 8px 10px, url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e\") #fff no-repeat center right 1.75rem/calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);\n}\n#canvas-quiz-stats .was-validated .custom-select:invalid:focus,\n#canvas-quiz-stats .custom-select.is-invalid:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n#canvas-quiz-stats .was-validated .form-check-input:invalid ~ .form-check-label,\n#canvas-quiz-stats .form-check-input.is-invalid ~ .form-check-label {\n  color: #dc3545;\n}\n#canvas-quiz-stats .was-validated .form-check-input:invalid ~ .invalid-feedback,\n#canvas-quiz-stats .was-validated .form-check-input:invalid ~ .invalid-tooltip,\n#canvas-quiz-stats .form-check-input.is-invalid ~ .invalid-feedback,\n#canvas-quiz-stats .form-check-input.is-invalid ~ .invalid-tooltip {\n  display: block;\n}\n#canvas-quiz-stats .was-validated .custom-control-input:invalid ~ .custom-control-label,\n#canvas-quiz-stats .custom-control-input.is-invalid ~ .custom-control-label {\n  color: #dc3545;\n}\n#canvas-quiz-stats .was-validated .custom-control-input:invalid ~ .custom-control-label::before,\n#canvas-quiz-stats .custom-control-input.is-invalid ~ .custom-control-label::before {\n  border-color: #dc3545;\n}\n#canvas-quiz-stats .was-validated .custom-control-input:invalid:checked ~ .custom-control-label::before,\n#canvas-quiz-stats .custom-control-input.is-invalid:checked ~ .custom-control-label::before {\n  border-color: #e4606d;\n  background-color: #e4606d;\n}\n#canvas-quiz-stats .was-validated .custom-control-input:invalid:focus ~ .custom-control-label::before,\n#canvas-quiz-stats .custom-control-input.is-invalid:focus ~ .custom-control-label::before {\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n#canvas-quiz-stats .was-validated .custom-control-input:invalid:focus:not(:checked) ~ .custom-control-label::before,\n#canvas-quiz-stats .custom-control-input.is-invalid:focus:not(:checked) ~ .custom-control-label::before {\n  border-color: #dc3545;\n}\n#canvas-quiz-stats .was-validated .custom-file-input:invalid ~ .custom-file-label,\n#canvas-quiz-stats .custom-file-input.is-invalid ~ .custom-file-label {\n  border-color: #dc3545;\n}\n#canvas-quiz-stats .was-validated .custom-file-input:invalid:focus ~ .custom-file-label,\n#canvas-quiz-stats .custom-file-input.is-invalid:focus ~ .custom-file-label {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n#canvas-quiz-stats .form-inline {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: row wrap;\n  flex-flow: row wrap;\n  -ms-flex-align: center;\n  align-items: center;\n}\n#canvas-quiz-stats .form-inline .form-check {\n  width: 100%;\n}\n@media (min-width: 576px) {\n  #canvas-quiz-stats .form-inline label {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    margin-bottom: 0;\n  }\n  #canvas-quiz-stats .form-inline .form-group {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    -ms-flex-flow: row wrap;\n    flex-flow: row wrap;\n    -ms-flex-align: center;\n    align-items: center;\n    margin-bottom: 0;\n  }\n  #canvas-quiz-stats .form-inline .form-control {\n    display: inline-block;\n    width: auto;\n    vertical-align: middle;\n  }\n  #canvas-quiz-stats .form-inline .form-control-plaintext {\n    display: inline-block;\n  }\n  #canvas-quiz-stats .form-inline .input-group,\n  #canvas-quiz-stats .form-inline .custom-select {\n    width: auto;\n  }\n  #canvas-quiz-stats .form-inline .form-check {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    width: auto;\n    padding-left: 0;\n  }\n  #canvas-quiz-stats .form-inline .form-check-input {\n    position: relative;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    margin-top: 0;\n    margin-right: 0.25rem;\n    margin-left: 0;\n  }\n  #canvas-quiz-stats .form-inline .custom-control {\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n  }\n  #canvas-quiz-stats .form-inline .custom-control-label {\n    margin-bottom: 0;\n  }\n}\n#canvas-quiz-stats .btn {\n  display: inline-block;\n  font-weight: 400;\n  color: #212529;\n  text-align: center;\n  vertical-align: middle;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  background-color: transparent;\n  border: 1px solid transparent;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  border-radius: 0.25rem;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  #canvas-quiz-stats .btn {\n    transition: none;\n  }\n}\n#canvas-quiz-stats .btn:hover {\n  color: #212529;\n  text-decoration: none;\n}\n#canvas-quiz-stats .btn:focus,\n#canvas-quiz-stats .btn.focus {\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n#canvas-quiz-stats .btn.disabled,\n#canvas-quiz-stats .btn:disabled {\n  opacity: 0.65;\n}\n#canvas-quiz-stats .btn:not(:disabled):not(.disabled) {\n  cursor: pointer;\n}\n#canvas-quiz-stats a.btn.disabled,\n#canvas-quiz-stats fieldset:disabled a.btn {\n  pointer-events: none;\n}\n#canvas-quiz-stats .btn-primary {\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff;\n}\n#canvas-quiz-stats .btn-primary:hover {\n  color: #fff;\n  background-color: #0069d9;\n  border-color: #0062cc;\n}\n#canvas-quiz-stats .btn-primary:focus,\n#canvas-quiz-stats .btn-primary.focus {\n  color: #fff;\n  background-color: #0069d9;\n  border-color: #0062cc;\n  box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);\n}\n#canvas-quiz-stats .btn-primary.disabled,\n#canvas-quiz-stats .btn-primary:disabled {\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff;\n}\n#canvas-quiz-stats .btn-primary:not(:disabled):not(.disabled):active,\n#canvas-quiz-stats .btn-primary:not(:disabled):not(.disabled).active,\n#canvas-quiz-stats .show > .btn-primary.dropdown-toggle {\n  color: #fff;\n  background-color: #0062cc;\n  border-color: #005cbf;\n}\n#canvas-quiz-stats .btn-primary:not(:disabled):not(.disabled):active:focus,\n#canvas-quiz-stats .btn-primary:not(:disabled):not(.disabled).active:focus,\n#canvas-quiz-stats .show > .btn-primary.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);\n}\n#canvas-quiz-stats .btn-secondary {\n  color: #fff;\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n#canvas-quiz-stats .btn-secondary:hover {\n  color: #fff;\n  background-color: #5a6268;\n  border-color: #545b62;\n}\n#canvas-quiz-stats .btn-secondary:focus,\n#canvas-quiz-stats .btn-secondary.focus {\n  color: #fff;\n  background-color: #5a6268;\n  border-color: #545b62;\n  box-shadow: 0 0 0 0.2rem rgba(130, 138, 145, 0.5);\n}\n#canvas-quiz-stats .btn-secondary.disabled,\n#canvas-quiz-stats .btn-secondary:disabled {\n  color: #fff;\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n#canvas-quiz-stats .btn-secondary:not(:disabled):not(.disabled):active,\n#canvas-quiz-stats .btn-secondary:not(:disabled):not(.disabled).active,\n#canvas-quiz-stats .show > .btn-secondary.dropdown-toggle {\n  color: #fff;\n  background-color: #545b62;\n  border-color: #4e555b;\n}\n#canvas-quiz-stats .btn-secondary:not(:disabled):not(.disabled):active:focus,\n#canvas-quiz-stats .btn-secondary:not(:disabled):not(.disabled).active:focus,\n#canvas-quiz-stats .show > .btn-secondary.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(130, 138, 145, 0.5);\n}\n#canvas-quiz-stats .btn-success {\n  color: #fff;\n  background-color: #28a745;\n  border-color: #28a745;\n}\n#canvas-quiz-stats .btn-success:hover {\n  color: #fff;\n  background-color: #218838;\n  border-color: #1e7e34;\n}\n#canvas-quiz-stats .btn-success:focus,\n#canvas-quiz-stats .btn-success.focus {\n  color: #fff;\n  background-color: #218838;\n  border-color: #1e7e34;\n  box-shadow: 0 0 0 0.2rem rgba(72, 180, 97, 0.5);\n}\n#canvas-quiz-stats .btn-success.disabled,\n#canvas-quiz-stats .btn-success:disabled {\n  color: #fff;\n  background-color: #28a745;\n  border-color: #28a745;\n}\n#canvas-quiz-stats .btn-success:not(:disabled):not(.disabled):active,\n#canvas-quiz-stats .btn-success:not(:disabled):not(.disabled).active,\n#canvas-quiz-stats .show > .btn-success.dropdown-toggle {\n  color: #fff;\n  background-color: #1e7e34;\n  border-color: #1c7430;\n}\n#canvas-quiz-stats .btn-success:not(:disabled):not(.disabled):active:focus,\n#canvas-quiz-stats .btn-success:not(:disabled):not(.disabled).active:focus,\n#canvas-quiz-stats .show > .btn-success.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(72, 180, 97, 0.5);\n}\n#canvas-quiz-stats .btn-info {\n  color: #fff;\n  background-color: #17a2b8;\n  border-color: #17a2b8;\n}\n#canvas-quiz-stats .btn-info:hover {\n  color: #fff;\n  background-color: #138496;\n  border-color: #117a8b;\n}\n#canvas-quiz-stats .btn-info:focus,\n#canvas-quiz-stats .btn-info.focus {\n  color: #fff;\n  background-color: #138496;\n  border-color: #117a8b;\n  box-shadow: 0 0 0 0.2rem rgba(58, 176, 195, 0.5);\n}\n#canvas-quiz-stats .btn-info.disabled,\n#canvas-quiz-stats .btn-info:disabled {\n  color: #fff;\n  background-color: #17a2b8;\n  border-color: #17a2b8;\n}\n#canvas-quiz-stats .btn-info:not(:disabled):not(.disabled):active,\n#canvas-quiz-stats .btn-info:not(:disabled):not(.disabled).active,\n#canvas-quiz-stats .show > .btn-info.dropdown-toggle {\n  color: #fff;\n  background-color: #117a8b;\n  border-color: #10707f;\n}\n#canvas-quiz-stats .btn-info:not(:disabled):not(.disabled):active:focus,\n#canvas-quiz-stats .btn-info:not(:disabled):not(.disabled).active:focus,\n#canvas-quiz-stats .show > .btn-info.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(58, 176, 195, 0.5);\n}\n#canvas-quiz-stats .btn-warning {\n  color: #212529;\n  background-color: #ffc107;\n  border-color: #ffc107;\n}\n#canvas-quiz-stats .btn-warning:hover {\n  color: #212529;\n  background-color: #e0a800;\n  border-color: #d39e00;\n}\n#canvas-quiz-stats .btn-warning:focus,\n#canvas-quiz-stats .btn-warning.focus {\n  color: #212529;\n  background-color: #e0a800;\n  border-color: #d39e00;\n  box-shadow: 0 0 0 0.2rem rgba(222, 170, 12, 0.5);\n}\n#canvas-quiz-stats .btn-warning.disabled,\n#canvas-quiz-stats .btn-warning:disabled {\n  color: #212529;\n  background-color: #ffc107;\n  border-color: #ffc107;\n}\n#canvas-quiz-stats .btn-warning:not(:disabled):not(.disabled):active,\n#canvas-quiz-stats .btn-warning:not(:disabled):not(.disabled).active,\n#canvas-quiz-stats .show > .btn-warning.dropdown-toggle {\n  color: #212529;\n  background-color: #d39e00;\n  border-color: #c69500;\n}\n#canvas-quiz-stats .btn-warning:not(:disabled):not(.disabled):active:focus,\n#canvas-quiz-stats .btn-warning:not(:disabled):not(.disabled).active:focus,\n#canvas-quiz-stats .show > .btn-warning.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(222, 170, 12, 0.5);\n}\n#canvas-quiz-stats .btn-danger {\n  color: #fff;\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n#canvas-quiz-stats .btn-danger:hover {\n  color: #fff;\n  background-color: #c82333;\n  border-color: #bd2130;\n}\n#canvas-quiz-stats .btn-danger:focus,\n#canvas-quiz-stats .btn-danger.focus {\n  color: #fff;\n  background-color: #c82333;\n  border-color: #bd2130;\n  box-shadow: 0 0 0 0.2rem rgba(225, 83, 97, 0.5);\n}\n#canvas-quiz-stats .btn-danger.disabled,\n#canvas-quiz-stats .btn-danger:disabled {\n  color: #fff;\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n#canvas-quiz-stats .btn-danger:not(:disabled):not(.disabled):active,\n#canvas-quiz-stats .btn-danger:not(:disabled):not(.disabled).active,\n#canvas-quiz-stats .show > .btn-danger.dropdown-toggle {\n  color: #fff;\n  background-color: #bd2130;\n  border-color: #b21f2d;\n}\n#canvas-quiz-stats .btn-danger:not(:disabled):not(.disabled):active:focus,\n#canvas-quiz-stats .btn-danger:not(:disabled):not(.disabled).active:focus,\n#canvas-quiz-stats .show > .btn-danger.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(225, 83, 97, 0.5);\n}\n#canvas-quiz-stats .btn-light {\n  color: #212529;\n  background-color: #f8f9fa;\n  border-color: #f8f9fa;\n}\n#canvas-quiz-stats .btn-light:hover {\n  color: #212529;\n  background-color: #e2e6ea;\n  border-color: #dae0e5;\n}\n#canvas-quiz-stats .btn-light:focus,\n#canvas-quiz-stats .btn-light.focus {\n  color: #212529;\n  background-color: #e2e6ea;\n  border-color: #dae0e5;\n  box-shadow: 0 0 0 0.2rem rgba(216, 217, 219, 0.5);\n}\n#canvas-quiz-stats .btn-light.disabled,\n#canvas-quiz-stats .btn-light:disabled {\n  color: #212529;\n  background-color: #f8f9fa;\n  border-color: #f8f9fa;\n}\n#canvas-quiz-stats .btn-light:not(:disabled):not(.disabled):active,\n#canvas-quiz-stats .btn-light:not(:disabled):not(.disabled).active,\n#canvas-quiz-stats .show > .btn-light.dropdown-toggle {\n  color: #212529;\n  background-color: #dae0e5;\n  border-color: #d3d9df;\n}\n#canvas-quiz-stats .btn-light:not(:disabled):not(.disabled):active:focus,\n#canvas-quiz-stats .btn-light:not(:disabled):not(.disabled).active:focus,\n#canvas-quiz-stats .show > .btn-light.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(216, 217, 219, 0.5);\n}\n#canvas-quiz-stats .btn-dark {\n  color: #fff;\n  background-color: #343a40;\n  border-color: #343a40;\n}\n#canvas-quiz-stats .btn-dark:hover {\n  color: #fff;\n  background-color: #23272b;\n  border-color: #1d2124;\n}\n#canvas-quiz-stats .btn-dark:focus,\n#canvas-quiz-stats .btn-dark.focus {\n  color: #fff;\n  background-color: #23272b;\n  border-color: #1d2124;\n  box-shadow: 0 0 0 0.2rem rgba(82, 88, 93, 0.5);\n}\n#canvas-quiz-stats .btn-dark.disabled,\n#canvas-quiz-stats .btn-dark:disabled {\n  color: #fff;\n  background-color: #343a40;\n  border-color: #343a40;\n}\n#canvas-quiz-stats .btn-dark:not(:disabled):not(.disabled):active,\n#canvas-quiz-stats .btn-dark:not(:disabled):not(.disabled).active,\n#canvas-quiz-stats .show > .btn-dark.dropdown-toggle {\n  color: #fff;\n  background-color: #1d2124;\n  border-color: #171a1d;\n}\n#canvas-quiz-stats .btn-dark:not(:disabled):not(.disabled):active:focus,\n#canvas-quiz-stats .btn-dark:not(:disabled):not(.disabled).active:focus,\n#canvas-quiz-stats .show > .btn-dark.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(82, 88, 93, 0.5);\n}\n#canvas-quiz-stats .btn-outline-primary {\n  color: #007bff;\n  border-color: #007bff;\n}\n#canvas-quiz-stats .btn-outline-primary:hover {\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff;\n}\n#canvas-quiz-stats .btn-outline-primary:focus,\n#canvas-quiz-stats .btn-outline-primary.focus {\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);\n}\n#canvas-quiz-stats .btn-outline-primary.disabled,\n#canvas-quiz-stats .btn-outline-primary:disabled {\n  color: #007bff;\n  background-color: transparent;\n}\n#canvas-quiz-stats .btn-outline-primary:not(:disabled):not(.disabled):active,\n#canvas-quiz-stats .btn-outline-primary:not(:disabled):not(.disabled).active,\n#canvas-quiz-stats .show > .btn-outline-primary.dropdown-toggle {\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff;\n}\n#canvas-quiz-stats .btn-outline-primary:not(:disabled):not(.disabled):active:focus,\n#canvas-quiz-stats .btn-outline-primary:not(:disabled):not(.disabled).active:focus,\n#canvas-quiz-stats .show > .btn-outline-primary.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);\n}\n#canvas-quiz-stats .btn-outline-secondary {\n  color: #6c757d;\n  border-color: #6c757d;\n}\n#canvas-quiz-stats .btn-outline-secondary:hover {\n  color: #fff;\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n#canvas-quiz-stats .btn-outline-secondary:focus,\n#canvas-quiz-stats .btn-outline-secondary.focus {\n  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5);\n}\n#canvas-quiz-stats .btn-outline-secondary.disabled,\n#canvas-quiz-stats .btn-outline-secondary:disabled {\n  color: #6c757d;\n  background-color: transparent;\n}\n#canvas-quiz-stats .btn-outline-secondary:not(:disabled):not(.disabled):active,\n#canvas-quiz-stats .btn-outline-secondary:not(:disabled):not(.disabled).active,\n#canvas-quiz-stats .show > .btn-outline-secondary.dropdown-toggle {\n  color: #fff;\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n#canvas-quiz-stats .btn-outline-secondary:not(:disabled):not(.disabled):active:focus,\n#canvas-quiz-stats .btn-outline-secondary:not(:disabled):not(.disabled).active:focus,\n#canvas-quiz-stats .show > .btn-outline-secondary.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5);\n}\n#canvas-quiz-stats .btn-outline-success {\n  color: #28a745;\n  border-color: #28a745;\n}\n#canvas-quiz-stats .btn-outline-success:hover {\n  color: #fff;\n  background-color: #28a745;\n  border-color: #28a745;\n}\n#canvas-quiz-stats .btn-outline-success:focus,\n#canvas-quiz-stats .btn-outline-success.focus {\n  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5);\n}\n#canvas-quiz-stats .btn-outline-success.disabled,\n#canvas-quiz-stats .btn-outline-success:disabled {\n  color: #28a745;\n  background-color: transparent;\n}\n#canvas-quiz-stats .btn-outline-success:not(:disabled):not(.disabled):active,\n#canvas-quiz-stats .btn-outline-success:not(:disabled):not(.disabled).active,\n#canvas-quiz-stats .show > .btn-outline-success.dropdown-toggle {\n  color: #fff;\n  background-color: #28a745;\n  border-color: #28a745;\n}\n#canvas-quiz-stats .btn-outline-success:not(:disabled):not(.disabled):active:focus,\n#canvas-quiz-stats .btn-outline-success:not(:disabled):not(.disabled).active:focus,\n#canvas-quiz-stats .show > .btn-outline-success.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5);\n}\n#canvas-quiz-stats .btn-outline-info {\n  color: #17a2b8;\n  border-color: #17a2b8;\n}\n#canvas-quiz-stats .btn-outline-info:hover {\n  color: #fff;\n  background-color: #17a2b8;\n  border-color: #17a2b8;\n}\n#canvas-quiz-stats .btn-outline-info:focus,\n#canvas-quiz-stats .btn-outline-info.focus {\n  box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5);\n}\n#canvas-quiz-stats .btn-outline-info.disabled,\n#canvas-quiz-stats .btn-outline-info:disabled {\n  color: #17a2b8;\n  background-color: transparent;\n}\n#canvas-quiz-stats .btn-outline-info:not(:disabled):not(.disabled):active,\n#canvas-quiz-stats .btn-outline-info:not(:disabled):not(.disabled).active,\n#canvas-quiz-stats .show > .btn-outline-info.dropdown-toggle {\n  color: #fff;\n  background-color: #17a2b8;\n  border-color: #17a2b8;\n}\n#canvas-quiz-stats .btn-outline-info:not(:disabled):not(.disabled):active:focus,\n#canvas-quiz-stats .btn-outline-info:not(:disabled):not(.disabled).active:focus,\n#canvas-quiz-stats .show > .btn-outline-info.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5);\n}\n#canvas-quiz-stats .btn-outline-warning {\n  color: #ffc107;\n  border-color: #ffc107;\n}\n#canvas-quiz-stats .btn-outline-warning:hover {\n  color: #212529;\n  background-color: #ffc107;\n  border-color: #ffc107;\n}\n#canvas-quiz-stats .btn-outline-warning:focus,\n#canvas-quiz-stats .btn-outline-warning.focus {\n  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);\n}\n#canvas-quiz-stats .btn-outline-warning.disabled,\n#canvas-quiz-stats .btn-outline-warning:disabled {\n  color: #ffc107;\n  background-color: transparent;\n}\n#canvas-quiz-stats .btn-outline-warning:not(:disabled):not(.disabled):active,\n#canvas-quiz-stats .btn-outline-warning:not(:disabled):not(.disabled).active,\n#canvas-quiz-stats .show > .btn-outline-warning.dropdown-toggle {\n  color: #212529;\n  background-color: #ffc107;\n  border-color: #ffc107;\n}\n#canvas-quiz-stats .btn-outline-warning:not(:disabled):not(.disabled):active:focus,\n#canvas-quiz-stats .btn-outline-warning:not(:disabled):not(.disabled).active:focus,\n#canvas-quiz-stats .show > .btn-outline-warning.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);\n}\n#canvas-quiz-stats .btn-outline-danger {\n  color: #dc3545;\n  border-color: #dc3545;\n}\n#canvas-quiz-stats .btn-outline-danger:hover {\n  color: #fff;\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n#canvas-quiz-stats .btn-outline-danger:focus,\n#canvas-quiz-stats .btn-outline-danger.focus {\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5);\n}\n#canvas-quiz-stats .btn-outline-danger.disabled,\n#canvas-quiz-stats .btn-outline-danger:disabled {\n  color: #dc3545;\n  background-color: transparent;\n}\n#canvas-quiz-stats .btn-outline-danger:not(:disabled):not(.disabled):active,\n#canvas-quiz-stats .btn-outline-danger:not(:disabled):not(.disabled).active,\n#canvas-quiz-stats .show > .btn-outline-danger.dropdown-toggle {\n  color: #fff;\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n#canvas-quiz-stats .btn-outline-danger:not(:disabled):not(.disabled):active:focus,\n#canvas-quiz-stats .btn-outline-danger:not(:disabled):not(.disabled).active:focus,\n#canvas-quiz-stats .show > .btn-outline-danger.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5);\n}\n#canvas-quiz-stats .btn-outline-light {\n  color: #f8f9fa;\n  border-color: #f8f9fa;\n}\n#canvas-quiz-stats .btn-outline-light:hover {\n  color: #212529;\n  background-color: #f8f9fa;\n  border-color: #f8f9fa;\n}\n#canvas-quiz-stats .btn-outline-light:focus,\n#canvas-quiz-stats .btn-outline-light.focus {\n  box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5);\n}\n#canvas-quiz-stats .btn-outline-light.disabled,\n#canvas-quiz-stats .btn-outline-light:disabled {\n  color: #f8f9fa;\n  background-color: transparent;\n}\n#canvas-quiz-stats .btn-outline-light:not(:disabled):not(.disabled):active,\n#canvas-quiz-stats .btn-outline-light:not(:disabled):not(.disabled).active,\n#canvas-quiz-stats .show > .btn-outline-light.dropdown-toggle {\n  color: #212529;\n  background-color: #f8f9fa;\n  border-color: #f8f9fa;\n}\n#canvas-quiz-stats .btn-outline-light:not(:disabled):not(.disabled):active:focus,\n#canvas-quiz-stats .btn-outline-light:not(:disabled):not(.disabled).active:focus,\n#canvas-quiz-stats .show > .btn-outline-light.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5);\n}\n#canvas-quiz-stats .btn-outline-dark {\n  color: #343a40;\n  border-color: #343a40;\n}\n#canvas-quiz-stats .btn-outline-dark:hover {\n  color: #fff;\n  background-color: #343a40;\n  border-color: #343a40;\n}\n#canvas-quiz-stats .btn-outline-dark:focus,\n#canvas-quiz-stats .btn-outline-dark.focus {\n  box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5);\n}\n#canvas-quiz-stats .btn-outline-dark.disabled,\n#canvas-quiz-stats .btn-outline-dark:disabled {\n  color: #343a40;\n  background-color: transparent;\n}\n#canvas-quiz-stats .btn-outline-dark:not(:disabled):not(.disabled):active,\n#canvas-quiz-stats .btn-outline-dark:not(:disabled):not(.disabled).active,\n#canvas-quiz-stats .show > .btn-outline-dark.dropdown-toggle {\n  color: #fff;\n  background-color: #343a40;\n  border-color: #343a40;\n}\n#canvas-quiz-stats .btn-outline-dark:not(:disabled):not(.disabled):active:focus,\n#canvas-quiz-stats .btn-outline-dark:not(:disabled):not(.disabled).active:focus,\n#canvas-quiz-stats .show > .btn-outline-dark.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5);\n}\n#canvas-quiz-stats .btn-link {\n  font-weight: 400;\n  color: #007bff;\n  text-decoration: none;\n}\n#canvas-quiz-stats .btn-link:hover {\n  color: #0056b3;\n  text-decoration: underline;\n}\n#canvas-quiz-stats .btn-link:focus,\n#canvas-quiz-stats .btn-link.focus {\n  text-decoration: underline;\n}\n#canvas-quiz-stats .btn-link:disabled,\n#canvas-quiz-stats .btn-link.disabled {\n  color: #6c757d;\n  pointer-events: none;\n}\n#canvas-quiz-stats .btn-lg,\n#canvas-quiz-stats .btn-group-lg > .btn {\n  padding: 0.5rem 1rem;\n  font-size: 1.25rem;\n  line-height: 1.5;\n  border-radius: 0.3rem;\n}\n#canvas-quiz-stats .btn-sm,\n#canvas-quiz-stats .btn-group-sm > .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  border-radius: 0.2rem;\n}\n#canvas-quiz-stats .btn-block {\n  display: block;\n  width: 100%;\n}\n#canvas-quiz-stats .btn-block + .btn-block {\n  margin-top: 0.5rem;\n}\n#canvas-quiz-stats input[type=\"submit\"].btn-block,\n#canvas-quiz-stats input[type=\"reset\"].btn-block,\n#canvas-quiz-stats input[type=\"button\"].btn-block {\n  width: 100%;\n}\n#canvas-quiz-stats .fade {\n  transition: opacity 0.15s linear;\n}\n@media (prefers-reduced-motion: reduce) {\n  #canvas-quiz-stats .fade {\n    transition: none;\n  }\n}\n#canvas-quiz-stats .fade:not(.show) {\n  opacity: 0;\n}\n#canvas-quiz-stats .collapse:not(.show) {\n  display: none;\n}\n#canvas-quiz-stats .collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  transition: height 0.35s ease;\n}\n@media (prefers-reduced-motion: reduce) {\n  #canvas-quiz-stats .collapsing {\n    transition: none;\n  }\n}\n#canvas-quiz-stats .dropup,\n#canvas-quiz-stats .dropright,\n#canvas-quiz-stats .dropdown,\n#canvas-quiz-stats .dropleft {\n  position: relative;\n}\n#canvas-quiz-stats .dropdown-toggle {\n  white-space: nowrap;\n}\n#canvas-quiz-stats .dropdown-toggle::after {\n  display: inline-block;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0.3em solid;\n  border-right: 0.3em solid transparent;\n  border-bottom: 0;\n  border-left: 0.3em solid transparent;\n}\n#canvas-quiz-stats .dropdown-toggle:empty::after {\n  margin-left: 0;\n}\n#canvas-quiz-stats .dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 10rem;\n  padding: 0.5rem 0;\n  margin: 0.125rem 0 0;\n  font-size: 1rem;\n  color: #212529;\n  text-align: left;\n  list-style: none;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n}\n#canvas-quiz-stats .dropdown-menu-left {\n  right: auto;\n  left: 0;\n}\n#canvas-quiz-stats .dropdown-menu-right {\n  right: 0;\n  left: auto;\n}\n@media (min-width: 576px) {\n  #canvas-quiz-stats .dropdown-menu-sm-left {\n    right: auto;\n    left: 0;\n  }\n  #canvas-quiz-stats .dropdown-menu-sm-right {\n    right: 0;\n    left: auto;\n  }\n}\n@media (min-width: 768px) {\n  #canvas-quiz-stats .dropdown-menu-md-left {\n    right: auto;\n    left: 0;\n  }\n  #canvas-quiz-stats .dropdown-menu-md-right {\n    right: 0;\n    left: auto;\n  }\n}\n@media (min-width: 992px) {\n  #canvas-quiz-stats .dropdown-menu-lg-left {\n    right: auto;\n    left: 0;\n  }\n  #canvas-quiz-stats .dropdown-menu-lg-right {\n    right: 0;\n    left: auto;\n  }\n}\n@media (min-width: 1200px) {\n  #canvas-quiz-stats .dropdown-menu-xl-left {\n    right: auto;\n    left: 0;\n  }\n  #canvas-quiz-stats .dropdown-menu-xl-right {\n    right: 0;\n    left: auto;\n  }\n}\n#canvas-quiz-stats .dropup .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-top: 0;\n  margin-bottom: 0.125rem;\n}\n#canvas-quiz-stats .dropup .dropdown-toggle::after {\n  display: inline-block;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0;\n  border-right: 0.3em solid transparent;\n  border-bottom: 0.3em solid;\n  border-left: 0.3em solid transparent;\n}\n#canvas-quiz-stats .dropup .dropdown-toggle:empty::after {\n  margin-left: 0;\n}\n#canvas-quiz-stats .dropright .dropdown-menu {\n  top: 0;\n  right: auto;\n  left: 100%;\n  margin-top: 0;\n  margin-left: 0.125rem;\n}\n#canvas-quiz-stats .dropright .dropdown-toggle::after {\n  display: inline-block;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0.3em solid transparent;\n  border-right: 0;\n  border-bottom: 0.3em solid transparent;\n  border-left: 0.3em solid;\n}\n#canvas-quiz-stats .dropright .dropdown-toggle:empty::after {\n  margin-left: 0;\n}\n#canvas-quiz-stats .dropright .dropdown-toggle::after {\n  vertical-align: 0;\n}\n#canvas-quiz-stats .dropleft .dropdown-menu {\n  top: 0;\n  right: 100%;\n  left: auto;\n  margin-top: 0;\n  margin-right: 0.125rem;\n}\n#canvas-quiz-stats .dropleft .dropdown-toggle::after {\n  display: inline-block;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n}\n#canvas-quiz-stats .dropleft .dropdown-toggle::after {\n  display: none;\n}\n#canvas-quiz-stats .dropleft .dropdown-toggle::before {\n  display: inline-block;\n  margin-right: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0.3em solid transparent;\n  border-right: 0.3em solid;\n  border-bottom: 0.3em solid transparent;\n}\n#canvas-quiz-stats .dropleft .dropdown-toggle:empty::after {\n  margin-left: 0;\n}\n#canvas-quiz-stats .dropleft .dropdown-toggle::before {\n  vertical-align: 0;\n}\n#canvas-quiz-stats .dropdown-menu[x-placement^=\"top\"],\n#canvas-quiz-stats .dropdown-menu[x-placement^=\"right\"],\n#canvas-quiz-stats .dropdown-menu[x-placement^=\"bottom\"],\n#canvas-quiz-stats .dropdown-menu[x-placement^=\"left\"] {\n  right: auto;\n  bottom: auto;\n}\n#canvas-quiz-stats .dropdown-divider {\n  height: 0;\n  margin: 0.5rem 0;\n  overflow: hidden;\n  border-top: 1px solid #e9ecef;\n}\n#canvas-quiz-stats .dropdown-item {\n  display: block;\n  width: 100%;\n  padding: 0.25rem 1.5rem;\n  clear: both;\n  font-weight: 400;\n  color: #212529;\n  text-align: inherit;\n  white-space: nowrap;\n  background-color: transparent;\n  border: 0;\n}\n#canvas-quiz-stats .dropdown-item:hover,\n#canvas-quiz-stats .dropdown-item:focus {\n  color: #16181b;\n  text-decoration: none;\n  background-color: #f8f9fa;\n}\n#canvas-quiz-stats .dropdown-item.active,\n#canvas-quiz-stats .dropdown-item:active {\n  color: #fff;\n  text-decoration: none;\n  background-color: #007bff;\n}\n#canvas-quiz-stats .dropdown-item.disabled,\n#canvas-quiz-stats .dropdown-item:disabled {\n  color: #6c757d;\n  pointer-events: none;\n  background-color: transparent;\n}\n#canvas-quiz-stats .dropdown-menu.show {\n  display: block;\n}\n#canvas-quiz-stats .dropdown-header {\n  display: block;\n  padding: 0.5rem 1.5rem;\n  margin-bottom: 0;\n  font-size: 0.875rem;\n  color: #6c757d;\n  white-space: nowrap;\n}\n#canvas-quiz-stats .dropdown-item-text {\n  display: block;\n  padding: 0.25rem 1.5rem;\n  color: #212529;\n}\n#canvas-quiz-stats .btn-group,\n#canvas-quiz-stats .btn-group-vertical {\n  position: relative;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  vertical-align: middle;\n}\n#canvas-quiz-stats .btn-group > .btn,\n#canvas-quiz-stats .btn-group-vertical > .btn {\n  position: relative;\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n}\n#canvas-quiz-stats .btn-group > .btn:hover,\n#canvas-quiz-stats .btn-group-vertical > .btn:hover {\n  z-index: 1;\n}\n#canvas-quiz-stats .btn-group > .btn:focus,\n#canvas-quiz-stats .btn-group > .btn:active,\n#canvas-quiz-stats .btn-group > .btn.active,\n#canvas-quiz-stats .btn-group-vertical > .btn:focus,\n#canvas-quiz-stats .btn-group-vertical > .btn:active,\n#canvas-quiz-stats .btn-group-vertical > .btn.active {\n  z-index: 1;\n}\n#canvas-quiz-stats .btn-toolbar {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n}\n#canvas-quiz-stats .btn-toolbar .input-group {\n  width: auto;\n}\n#canvas-quiz-stats .btn-group > .btn:not(:first-child),\n#canvas-quiz-stats .btn-group > .btn-group:not(:first-child) {\n  margin-left: -1px;\n}\n#canvas-quiz-stats .btn-group > .btn:not(:last-child):not(.dropdown-toggle),\n#canvas-quiz-stats .btn-group > .btn-group:not(:last-child) > .btn {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n#canvas-quiz-stats .btn-group > .btn:not(:first-child),\n#canvas-quiz-stats .btn-group > .btn-group:not(:first-child) > .btn {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n#canvas-quiz-stats .dropdown-toggle-split {\n  padding-right: 0.5625rem;\n  padding-left: 0.5625rem;\n}\n#canvas-quiz-stats .dropdown-toggle-split::after,\n#canvas-quiz-stats .dropup .dropdown-toggle-split::after,\n#canvas-quiz-stats .dropright .dropdown-toggle-split::after {\n  margin-left: 0;\n}\n#canvas-quiz-stats .dropleft .dropdown-toggle-split::before {\n  margin-right: 0;\n}\n#canvas-quiz-stats .btn-sm + .dropdown-toggle-split,\n#canvas-quiz-stats .btn-group-sm > .btn + .dropdown-toggle-split {\n  padding-right: 0.375rem;\n  padding-left: 0.375rem;\n}\n#canvas-quiz-stats .btn-lg + .dropdown-toggle-split,\n#canvas-quiz-stats .btn-group-lg > .btn + .dropdown-toggle-split {\n  padding-right: 0.75rem;\n  padding-left: 0.75rem;\n}\n#canvas-quiz-stats .btn-group-vertical {\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-align: start;\n  align-items: flex-start;\n  -ms-flex-pack: center;\n  justify-content: center;\n}\n#canvas-quiz-stats .btn-group-vertical > .btn,\n#canvas-quiz-stats .btn-group-vertical > .btn-group {\n  width: 100%;\n}\n#canvas-quiz-stats .btn-group-vertical > .btn:not(:first-child),\n#canvas-quiz-stats .btn-group-vertical > .btn-group:not(:first-child) {\n  margin-top: -1px;\n}\n#canvas-quiz-stats .btn-group-vertical > .btn:not(:last-child):not(.dropdown-toggle),\n#canvas-quiz-stats .btn-group-vertical > .btn-group:not(:last-child) > .btn {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n#canvas-quiz-stats .btn-group-vertical > .btn:not(:first-child),\n#canvas-quiz-stats .btn-group-vertical > .btn-group:not(:first-child) > .btn {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n#canvas-quiz-stats .btn-group-toggle > .btn,\n#canvas-quiz-stats .btn-group-toggle > .btn-group > .btn {\n  margin-bottom: 0;\n}\n#canvas-quiz-stats .btn-group-toggle > .btn input[type=\"radio\"],\n#canvas-quiz-stats .btn-group-toggle > .btn input[type=\"checkbox\"],\n#canvas-quiz-stats .btn-group-toggle > .btn-group > .btn input[type=\"radio\"],\n#canvas-quiz-stats .btn-group-toggle > .btn-group > .btn input[type=\"checkbox\"] {\n  position: absolute;\n  clip: rect(0, 0, 0, 0);\n  pointer-events: none;\n}\n#canvas-quiz-stats .input-group {\n  position: relative;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  -ms-flex-align: stretch;\n  align-items: stretch;\n  width: 100%;\n}\n#canvas-quiz-stats .input-group > .form-control,\n#canvas-quiz-stats .input-group > .form-control-plaintext,\n#canvas-quiz-stats .input-group > .custom-select,\n#canvas-quiz-stats .input-group > .custom-file {\n  position: relative;\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n  width: 1%;\n  min-width: 0;\n  margin-bottom: 0;\n}\n#canvas-quiz-stats .input-group > .form-control + .form-control,\n#canvas-quiz-stats .input-group > .form-control + .custom-select,\n#canvas-quiz-stats .input-group > .form-control + .custom-file,\n#canvas-quiz-stats .input-group > .form-control-plaintext + .form-control,\n#canvas-quiz-stats .input-group > .form-control-plaintext + .custom-select,\n#canvas-quiz-stats .input-group > .form-control-plaintext + .custom-file,\n#canvas-quiz-stats .input-group > .custom-select + .form-control,\n#canvas-quiz-stats .input-group > .custom-select + .custom-select,\n#canvas-quiz-stats .input-group > .custom-select + .custom-file,\n#canvas-quiz-stats .input-group > .custom-file + .form-control,\n#canvas-quiz-stats .input-group > .custom-file + .custom-select,\n#canvas-quiz-stats .input-group > .custom-file + .custom-file {\n  margin-left: -1px;\n}\n#canvas-quiz-stats .input-group > .form-control:focus,\n#canvas-quiz-stats .input-group > .custom-select:focus,\n#canvas-quiz-stats .input-group > .custom-file .custom-file-input:focus ~ .custom-file-label {\n  z-index: 3;\n}\n#canvas-quiz-stats .input-group > .custom-file .custom-file-input:focus {\n  z-index: 4;\n}\n#canvas-quiz-stats .input-group > .form-control:not(:last-child),\n#canvas-quiz-stats .input-group > .custom-select:not(:last-child) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n#canvas-quiz-stats .input-group > .form-control:not(:first-child),\n#canvas-quiz-stats .input-group > .custom-select:not(:first-child) {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n#canvas-quiz-stats .input-group > .custom-file {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n}\n#canvas-quiz-stats .input-group > .custom-file:not(:last-child) .custom-file-label,\n#canvas-quiz-stats .input-group > .custom-file:not(:last-child) .custom-file-label::after {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n#canvas-quiz-stats .input-group > .custom-file:not(:first-child) .custom-file-label {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n#canvas-quiz-stats .input-group-prepend,\n#canvas-quiz-stats .input-group-append {\n  display: -ms-flexbox;\n  display: flex;\n}\n#canvas-quiz-stats .input-group-prepend .btn,\n#canvas-quiz-stats .input-group-append .btn {\n  position: relative;\n  z-index: 2;\n}\n#canvas-quiz-stats .input-group-prepend .btn:focus,\n#canvas-quiz-stats .input-group-append .btn:focus {\n  z-index: 3;\n}\n#canvas-quiz-stats .input-group-prepend .btn + .btn,\n#canvas-quiz-stats .input-group-prepend .btn + .input-group-text,\n#canvas-quiz-stats .input-group-prepend .input-group-text + .input-group-text,\n#canvas-quiz-stats .input-group-prepend .input-group-text + .btn,\n#canvas-quiz-stats .input-group-append .btn + .btn,\n#canvas-quiz-stats .input-group-append .btn + .input-group-text,\n#canvas-quiz-stats .input-group-append .input-group-text + .input-group-text,\n#canvas-quiz-stats .input-group-append .input-group-text + .btn {\n  margin-left: -1px;\n}\n#canvas-quiz-stats .input-group-prepend {\n  margin-right: -1px;\n}\n#canvas-quiz-stats .input-group-append {\n  margin-left: -1px;\n}\n#canvas-quiz-stats .input-group-text {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  padding: 0.375rem 0.75rem;\n  margin-bottom: 0;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #495057;\n  text-align: center;\n  white-space: nowrap;\n  background-color: #e9ecef;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n}\n#canvas-quiz-stats .input-group-text input[type=\"radio\"],\n#canvas-quiz-stats .input-group-text input[type=\"checkbox\"] {\n  margin-top: 0;\n}\n#canvas-quiz-stats .input-group-lg > .form-control:not(textarea),\n#canvas-quiz-stats .input-group-lg > .custom-select {\n  height: calc(1.5em + 1rem + 2px);\n}\n#canvas-quiz-stats .input-group-lg > .form-control,\n#canvas-quiz-stats .input-group-lg > .custom-select,\n#canvas-quiz-stats .input-group-lg > .input-group-prepend > .input-group-text,\n#canvas-quiz-stats .input-group-lg > .input-group-append > .input-group-text,\n#canvas-quiz-stats .input-group-lg > .input-group-prepend > .btn,\n#canvas-quiz-stats .input-group-lg > .input-group-append > .btn {\n  padding: 0.5rem 1rem;\n  font-size: 1.25rem;\n  line-height: 1.5;\n  border-radius: 0.3rem;\n}\n#canvas-quiz-stats .input-group-sm > .form-control:not(textarea),\n#canvas-quiz-stats .input-group-sm > .custom-select {\n  height: calc(1.5em + 0.5rem + 2px);\n}\n#canvas-quiz-stats .input-group-sm > .form-control,\n#canvas-quiz-stats .input-group-sm > .custom-select,\n#canvas-quiz-stats .input-group-sm > .input-group-prepend > .input-group-text,\n#canvas-quiz-stats .input-group-sm > .input-group-append > .input-group-text,\n#canvas-quiz-stats .input-group-sm > .input-group-prepend > .btn,\n#canvas-quiz-stats .input-group-sm > .input-group-append > .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  border-radius: 0.2rem;\n}\n#canvas-quiz-stats .input-group-lg > .custom-select,\n#canvas-quiz-stats .input-group-sm > .custom-select {\n  padding-right: 1.75rem;\n}\n#canvas-quiz-stats .input-group > .input-group-prepend > .btn,\n#canvas-quiz-stats .input-group > .input-group-prepend > .input-group-text,\n#canvas-quiz-stats .input-group > .input-group-append:not(:last-child) > .btn,\n#canvas-quiz-stats .input-group > .input-group-append:not(:last-child) > .input-group-text,\n#canvas-quiz-stats .input-group > .input-group-append:last-child > .btn:not(:last-child):not(.dropdown-toggle),\n#canvas-quiz-stats .input-group > .input-group-append:last-child > .input-group-text:not(:last-child) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n#canvas-quiz-stats .input-group > .input-group-append > .btn,\n#canvas-quiz-stats .input-group > .input-group-append > .input-group-text,\n#canvas-quiz-stats .input-group > .input-group-prepend:not(:first-child) > .btn,\n#canvas-quiz-stats .input-group > .input-group-prepend:not(:first-child) > .input-group-text,\n#canvas-quiz-stats .input-group > .input-group-prepend:first-child > .btn:not(:first-child),\n#canvas-quiz-stats .input-group > .input-group-prepend:first-child > .input-group-text:not(:first-child) {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n#canvas-quiz-stats .custom-control {\n  position: relative;\n  z-index: 1;\n  display: block;\n  min-height: 1.5rem;\n  padding-left: 1.5rem;\n  -webkit-print-color-adjust: exact;\n  color-adjust: exact;\n}\n#canvas-quiz-stats .custom-control-inline {\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  margin-right: 1rem;\n}\n#canvas-quiz-stats .custom-control-input {\n  position: absolute;\n  left: 0;\n  z-index: -1;\n  width: 1rem;\n  height: 1.25rem;\n  opacity: 0;\n}\n#canvas-quiz-stats .custom-control-input:checked ~ .custom-control-label::before {\n  color: #fff;\n  border-color: #007bff;\n  background-color: #007bff;\n}\n#canvas-quiz-stats .custom-control-input:focus ~ .custom-control-label::before {\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n#canvas-quiz-stats .custom-control-input:focus:not(:checked) ~ .custom-control-label::before {\n  border-color: #80bdff;\n}\n#canvas-quiz-stats .custom-control-input:not(:disabled):active ~ .custom-control-label::before {\n  color: #fff;\n  background-color: #b3d7ff;\n  border-color: #b3d7ff;\n}\n#canvas-quiz-stats .custom-control-input[disabled] ~ .custom-control-label,\n#canvas-quiz-stats .custom-control-input:disabled ~ .custom-control-label {\n  color: #6c757d;\n}\n#canvas-quiz-stats .custom-control-input[disabled] ~ .custom-control-label::before,\n#canvas-quiz-stats .custom-control-input:disabled ~ .custom-control-label::before {\n  background-color: #e9ecef;\n}\n#canvas-quiz-stats .custom-control-label {\n  position: relative;\n  margin-bottom: 0;\n  vertical-align: top;\n}\n#canvas-quiz-stats .custom-control-label::before {\n  position: absolute;\n  top: 0.25rem;\n  left: -1.5rem;\n  display: block;\n  width: 1rem;\n  height: 1rem;\n  pointer-events: none;\n  content: \"\";\n  background-color: #fff;\n  border: #adb5bd solid 1px;\n}\n#canvas-quiz-stats .custom-control-label::after {\n  position: absolute;\n  top: 0.25rem;\n  left: -1.5rem;\n  display: block;\n  width: 1rem;\n  height: 1rem;\n  content: \"\";\n  background: no-repeat 50% / 50% 50%;\n}\n#canvas-quiz-stats .custom-checkbox .custom-control-label::before {\n  border-radius: 0.25rem;\n}\n#canvas-quiz-stats .custom-checkbox .custom-control-input:checked ~ .custom-control-label::after {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z'/%3e%3c/svg%3e\");\n}\n#canvas-quiz-stats .custom-checkbox .custom-control-input:indeterminate ~ .custom-control-label::before {\n  border-color: #007bff;\n  background-color: #007bff;\n}\n#canvas-quiz-stats .custom-checkbox .custom-control-input:indeterminate ~ .custom-control-label::after {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3e%3cpath stroke='%23fff' d='M0 2h4'/%3e%3c/svg%3e\");\n}\n#canvas-quiz-stats .custom-checkbox .custom-control-input:disabled:checked ~ .custom-control-label::before {\n  background-color: rgba(0, 123, 255, 0.5);\n}\n#canvas-quiz-stats .custom-checkbox .custom-control-input:disabled:indeterminate ~ .custom-control-label::before {\n  background-color: rgba(0, 123, 255, 0.5);\n}\n#canvas-quiz-stats .custom-radio .custom-control-label::before {\n  border-radius: 50%;\n}\n#canvas-quiz-stats .custom-radio .custom-control-input:checked ~ .custom-control-label::after {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e\");\n}\n#canvas-quiz-stats .custom-radio .custom-control-input:disabled:checked ~ .custom-control-label::before {\n  background-color: rgba(0, 123, 255, 0.5);\n}\n#canvas-quiz-stats .custom-switch {\n  padding-left: 2.25rem;\n}\n#canvas-quiz-stats .custom-switch .custom-control-label::before {\n  left: -2.25rem;\n  width: 1.75rem;\n  pointer-events: all;\n  border-radius: 0.5rem;\n}\n#canvas-quiz-stats .custom-switch .custom-control-label::after {\n  top: calc(0.25rem + 2px);\n  left: calc(-2.25rem + 2px);\n  width: calc(1rem - 4px);\n  height: calc(1rem - 4px);\n  background-color: #adb5bd;\n  border-radius: 0.5rem;\n  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-transform 0.15s ease-in-out;\n  transition: transform 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  transition: transform 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-transform 0.15s ease-in-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  #canvas-quiz-stats .custom-switch .custom-control-label::after {\n    transition: none;\n  }\n}\n#canvas-quiz-stats .custom-switch .custom-control-input:checked ~ .custom-control-label::after {\n  background-color: #fff;\n  -webkit-transform: translateX(0.75rem);\n  transform: translateX(0.75rem);\n}\n#canvas-quiz-stats .custom-switch .custom-control-input:disabled:checked ~ .custom-control-label::before {\n  background-color: rgba(0, 123, 255, 0.5);\n}\n#canvas-quiz-stats .custom-select {\n  display: inline-block;\n  width: 100%;\n  height: calc(1.5em + 0.75rem + 2px);\n  padding: 0.375rem 1.75rem 0.375rem 0.75rem;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #495057;\n  vertical-align: middle;\n  background: #fff url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e\") no-repeat right 0.75rem center / 8px 10px;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\n#canvas-quiz-stats .custom-select:focus {\n  border-color: #80bdff;\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n#canvas-quiz-stats .custom-select:focus::-ms-value {\n  color: #495057;\n  background-color: #fff;\n}\n#canvas-quiz-stats .custom-select[multiple],\n#canvas-quiz-stats .custom-select[size]:not([size=\"1\"]) {\n  height: auto;\n  padding-right: 0.75rem;\n  background-image: none;\n}\n#canvas-quiz-stats .custom-select:disabled {\n  color: #6c757d;\n  background-color: #e9ecef;\n}\n#canvas-quiz-stats .custom-select::-ms-expand {\n  display: none;\n}\n#canvas-quiz-stats .custom-select:-moz-focusring {\n  color: transparent;\n  text-shadow: 0 0 0 #495057;\n}\n#canvas-quiz-stats .custom-select-sm {\n  height: calc(1.5em + 0.5rem + 2px);\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  padding-left: 0.5rem;\n  font-size: 0.875rem;\n}\n#canvas-quiz-stats .custom-select-lg {\n  height: calc(1.5em + 1rem + 2px);\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  padding-left: 1rem;\n  font-size: 1.25rem;\n}\n#canvas-quiz-stats .custom-file {\n  position: relative;\n  display: inline-block;\n  width: 100%;\n  height: calc(1.5em + 0.75rem + 2px);\n  margin-bottom: 0;\n}\n#canvas-quiz-stats .custom-file-input {\n  position: relative;\n  z-index: 2;\n  width: 100%;\n  height: calc(1.5em + 0.75rem + 2px);\n  margin: 0;\n  opacity: 0;\n}\n#canvas-quiz-stats .custom-file-input:focus ~ .custom-file-label {\n  border-color: #80bdff;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n#canvas-quiz-stats .custom-file-input[disabled] ~ .custom-file-label,\n#canvas-quiz-stats .custom-file-input:disabled ~ .custom-file-label {\n  background-color: #e9ecef;\n}\n#canvas-quiz-stats .custom-file-input:lang(en) ~ .custom-file-label::after {\n  content: \"Browse\";\n}\n#canvas-quiz-stats .custom-file-input ~ .custom-file-label[data-browse]::after {\n  content: attr(data-browse);\n}\n#canvas-quiz-stats .custom-file-label {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 1;\n  height: calc(1.5em + 0.75rem + 2px);\n  padding: 0.375rem 0.75rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #495057;\n  background-color: #fff;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n}\n#canvas-quiz-stats .custom-file-label::after {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 3;\n  display: block;\n  height: calc(1.5em + 0.75rem);\n  padding: 0.375rem 0.75rem;\n  line-height: 1.5;\n  color: #495057;\n  content: \"Browse\";\n  background-color: #e9ecef;\n  border-left: inherit;\n  border-radius: 0 0.25rem 0.25rem 0;\n}\n#canvas-quiz-stats .custom-range {\n  width: 100%;\n  height: 1.4rem;\n  padding: 0;\n  background-color: transparent;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\n#canvas-quiz-stats .custom-range:focus {\n  outline: none;\n}\n#canvas-quiz-stats .custom-range:focus::-webkit-slider-thumb {\n  box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n#canvas-quiz-stats .custom-range:focus::-moz-range-thumb {\n  box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n#canvas-quiz-stats .custom-range:focus::-ms-thumb {\n  box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n#canvas-quiz-stats .custom-range::-moz-focus-outer {\n  border: 0;\n}\n#canvas-quiz-stats .custom-range::-webkit-slider-thumb {\n  width: 1rem;\n  height: 1rem;\n  margin-top: -0.25rem;\n  background-color: #007bff;\n  border: 0;\n  border-radius: 1rem;\n  -webkit-transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  -webkit-appearance: none;\n  appearance: none;\n}\n@media (prefers-reduced-motion: reduce) {\n  #canvas-quiz-stats .custom-range::-webkit-slider-thumb {\n    -webkit-transition: none;\n    transition: none;\n  }\n}\n#canvas-quiz-stats .custom-range::-webkit-slider-thumb:active {\n  background-color: #b3d7ff;\n}\n#canvas-quiz-stats .custom-range::-webkit-slider-runnable-track {\n  width: 100%;\n  height: 0.5rem;\n  color: transparent;\n  cursor: pointer;\n  background-color: #dee2e6;\n  border-color: transparent;\n  border-radius: 1rem;\n}\n#canvas-quiz-stats .custom-range::-moz-range-thumb {\n  width: 1rem;\n  height: 1rem;\n  background-color: #007bff;\n  border: 0;\n  border-radius: 1rem;\n  -moz-transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  -moz-appearance: none;\n  appearance: none;\n}\n@media (prefers-reduced-motion: reduce) {\n  #canvas-quiz-stats .custom-range::-moz-range-thumb {\n    -moz-transition: none;\n    transition: none;\n  }\n}\n#canvas-quiz-stats .custom-range::-moz-range-thumb:active {\n  background-color: #b3d7ff;\n}\n#canvas-quiz-stats .custom-range::-moz-range-track {\n  width: 100%;\n  height: 0.5rem;\n  color: transparent;\n  cursor: pointer;\n  background-color: #dee2e6;\n  border-color: transparent;\n  border-radius: 1rem;\n}\n#canvas-quiz-stats .custom-range::-ms-thumb {\n  width: 1rem;\n  height: 1rem;\n  margin-top: 0;\n  margin-right: 0.2rem;\n  margin-left: 0.2rem;\n  background-color: #007bff;\n  border: 0;\n  border-radius: 1rem;\n  -ms-transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  appearance: none;\n}\n@media (prefers-reduced-motion: reduce) {\n  #canvas-quiz-stats .custom-range::-ms-thumb {\n    -ms-transition: none;\n    transition: none;\n  }\n}\n#canvas-quiz-stats .custom-range::-ms-thumb:active {\n  background-color: #b3d7ff;\n}\n#canvas-quiz-stats .custom-range::-ms-track {\n  width: 100%;\n  height: 0.5rem;\n  color: transparent;\n  cursor: pointer;\n  background-color: transparent;\n  border-color: transparent;\n  border-width: 0.5rem;\n}\n#canvas-quiz-stats .custom-range::-ms-fill-lower {\n  background-color: #dee2e6;\n  border-radius: 1rem;\n}\n#canvas-quiz-stats .custom-range::-ms-fill-upper {\n  margin-right: 15px;\n  background-color: #dee2e6;\n  border-radius: 1rem;\n}\n#canvas-quiz-stats .custom-range:disabled::-webkit-slider-thumb {\n  background-color: #adb5bd;\n}\n#canvas-quiz-stats .custom-range:disabled::-webkit-slider-runnable-track {\n  cursor: default;\n}\n#canvas-quiz-stats .custom-range:disabled::-moz-range-thumb {\n  background-color: #adb5bd;\n}\n#canvas-quiz-stats .custom-range:disabled::-moz-range-track {\n  cursor: default;\n}\n#canvas-quiz-stats .custom-range:disabled::-ms-thumb {\n  background-color: #adb5bd;\n}\n#canvas-quiz-stats .custom-control-label::before,\n#canvas-quiz-stats .custom-file-label,\n#canvas-quiz-stats .custom-select {\n  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  #canvas-quiz-stats .custom-control-label::before,\n  #canvas-quiz-stats .custom-file-label,\n  #canvas-quiz-stats .custom-select {\n    transition: none;\n  }\n}\n#canvas-quiz-stats .nav {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none;\n}\n#canvas-quiz-stats .nav-link {\n  display: block;\n  padding: 0.5rem 1rem;\n}\n#canvas-quiz-stats .nav-link:hover,\n#canvas-quiz-stats .nav-link:focus {\n  text-decoration: none;\n}\n#canvas-quiz-stats .nav-link.disabled {\n  color: #6c757d;\n  pointer-events: none;\n  cursor: default;\n}\n#canvas-quiz-stats .nav-tabs {\n  border-bottom: 1px solid #dee2e6;\n}\n#canvas-quiz-stats .nav-tabs .nav-item {\n  margin-bottom: -1px;\n}\n#canvas-quiz-stats .nav-tabs .nav-link {\n  border: 1px solid transparent;\n  border-top-left-radius: 0.25rem;\n  border-top-right-radius: 0.25rem;\n}\n#canvas-quiz-stats .nav-tabs .nav-link:hover,\n#canvas-quiz-stats .nav-tabs .nav-link:focus {\n  border-color: #e9ecef #e9ecef #dee2e6;\n}\n#canvas-quiz-stats .nav-tabs .nav-link.disabled {\n  color: #6c757d;\n  background-color: transparent;\n  border-color: transparent;\n}\n#canvas-quiz-stats .nav-tabs .nav-link.active,\n#canvas-quiz-stats .nav-tabs .nav-item.show .nav-link {\n  color: #495057;\n  background-color: #fff;\n  border-color: #dee2e6 #dee2e6 #fff;\n}\n#canvas-quiz-stats .nav-tabs .dropdown-menu {\n  margin-top: -1px;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n#canvas-quiz-stats .nav-pills .nav-link {\n  border-radius: 0.25rem;\n}\n#canvas-quiz-stats .nav-pills .nav-link.active,\n#canvas-quiz-stats .nav-pills .show > .nav-link {\n  color: #fff;\n  background-color: #007bff;\n}\n#canvas-quiz-stats .nav-fill > .nav-link,\n#canvas-quiz-stats .nav-fill .nav-item {\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n  text-align: center;\n}\n#canvas-quiz-stats .nav-justified > .nav-link,\n#canvas-quiz-stats .nav-justified .nav-item {\n  -ms-flex-preferred-size: 0;\n  flex-basis: 0;\n  -ms-flex-positive: 1;\n  flex-grow: 1;\n  text-align: center;\n}\n#canvas-quiz-stats .tab-content > .tab-pane {\n  display: none;\n}\n#canvas-quiz-stats .tab-content > .active {\n  display: block;\n}\n#canvas-quiz-stats .navbar {\n  position: relative;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  padding: 0.5rem 1rem;\n}\n#canvas-quiz-stats .navbar .container,\n#canvas-quiz-stats .navbar .container-fluid,\n#canvas-quiz-stats .navbar .container-sm,\n#canvas-quiz-stats .navbar .container-md,\n#canvas-quiz-stats .navbar .container-lg,\n#canvas-quiz-stats .navbar .container-xl {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n}\n#canvas-quiz-stats .navbar-brand {\n  display: inline-block;\n  padding-top: 0.3125rem;\n  padding-bottom: 0.3125rem;\n  margin-right: 1rem;\n  font-size: 1.25rem;\n  line-height: inherit;\n  white-space: nowrap;\n}\n#canvas-quiz-stats .navbar-brand:hover,\n#canvas-quiz-stats .navbar-brand:focus {\n  text-decoration: none;\n}\n#canvas-quiz-stats .navbar-nav {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none;\n}\n#canvas-quiz-stats .navbar-nav .nav-link {\n  padding-right: 0;\n  padding-left: 0;\n}\n#canvas-quiz-stats .navbar-nav .dropdown-menu {\n  position: static;\n  float: none;\n}\n#canvas-quiz-stats .navbar-text {\n  display: inline-block;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n#canvas-quiz-stats .navbar-collapse {\n  -ms-flex-preferred-size: 100%;\n  flex-basis: 100%;\n  -ms-flex-positive: 1;\n  flex-grow: 1;\n  -ms-flex-align: center;\n  align-items: center;\n}\n#canvas-quiz-stats .navbar-toggler {\n  padding: 0.25rem 0.75rem;\n  font-size: 1.25rem;\n  line-height: 1;\n  background-color: transparent;\n  border: 1px solid transparent;\n  border-radius: 0.25rem;\n}\n#canvas-quiz-stats .navbar-toggler:hover,\n#canvas-quiz-stats .navbar-toggler:focus {\n  text-decoration: none;\n}\n#canvas-quiz-stats .navbar-toggler-icon {\n  display: inline-block;\n  width: 1.5em;\n  height: 1.5em;\n  vertical-align: middle;\n  content: \"\";\n  background: no-repeat center center;\n  background-size: 100% 100%;\n}\n@media (max-width: 575.98px) {\n  #canvas-quiz-stats .navbar-expand-sm > .container,\n  #canvas-quiz-stats .navbar-expand-sm > .container-fluid,\n  #canvas-quiz-stats .navbar-expand-sm > .container-sm,\n  #canvas-quiz-stats .navbar-expand-sm > .container-md,\n  #canvas-quiz-stats .navbar-expand-sm > .container-lg,\n  #canvas-quiz-stats .navbar-expand-sm > .container-xl {\n    padding-right: 0;\n    padding-left: 0;\n  }\n}\n@media (min-width: 576px) {\n  #canvas-quiz-stats .navbar-expand-sm {\n    -ms-flex-flow: row nowrap;\n    flex-flow: row nowrap;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n  }\n  #canvas-quiz-stats .navbar-expand-sm .navbar-nav {\n    -ms-flex-direction: row;\n    flex-direction: row;\n  }\n  #canvas-quiz-stats .navbar-expand-sm .navbar-nav .dropdown-menu {\n    position: absolute;\n  }\n  #canvas-quiz-stats .navbar-expand-sm .navbar-nav .nav-link {\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n  }\n  #canvas-quiz-stats .navbar-expand-sm > .container,\n  #canvas-quiz-stats .navbar-expand-sm > .container-fluid,\n  #canvas-quiz-stats .navbar-expand-sm > .container-sm,\n  #canvas-quiz-stats .navbar-expand-sm > .container-md,\n  #canvas-quiz-stats .navbar-expand-sm > .container-lg,\n  #canvas-quiz-stats .navbar-expand-sm > .container-xl {\n    -ms-flex-wrap: nowrap;\n    flex-wrap: nowrap;\n  }\n  #canvas-quiz-stats .navbar-expand-sm .navbar-collapse {\n    display: -ms-flexbox !important;\n    display: flex !important;\n    -ms-flex-preferred-size: auto;\n    flex-basis: auto;\n  }\n  #canvas-quiz-stats .navbar-expand-sm .navbar-toggler {\n    display: none;\n  }\n}\n@media (max-width: 767.98px) {\n  #canvas-quiz-stats .navbar-expand-md > .container,\n  #canvas-quiz-stats .navbar-expand-md > .container-fluid,\n  #canvas-quiz-stats .navbar-expand-md > .container-sm,\n  #canvas-quiz-stats .navbar-expand-md > .container-md,\n  #canvas-quiz-stats .navbar-expand-md > .container-lg,\n  #canvas-quiz-stats .navbar-expand-md > .container-xl {\n    padding-right: 0;\n    padding-left: 0;\n  }\n}\n@media (min-width: 768px) {\n  #canvas-quiz-stats .navbar-expand-md {\n    -ms-flex-flow: row nowrap;\n    flex-flow: row nowrap;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n  }\n  #canvas-quiz-stats .navbar-expand-md .navbar-nav {\n    -ms-flex-direction: row;\n    flex-direction: row;\n  }\n  #canvas-quiz-stats .navbar-expand-md .navbar-nav .dropdown-menu {\n    position: absolute;\n  }\n  #canvas-quiz-stats .navbar-expand-md .navbar-nav .nav-link {\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n  }\n  #canvas-quiz-stats .navbar-expand-md > .container,\n  #canvas-quiz-stats .navbar-expand-md > .container-fluid,\n  #canvas-quiz-stats .navbar-expand-md > .container-sm,\n  #canvas-quiz-stats .navbar-expand-md > .container-md,\n  #canvas-quiz-stats .navbar-expand-md > .container-lg,\n  #canvas-quiz-stats .navbar-expand-md > .container-xl {\n    -ms-flex-wrap: nowrap;\n    flex-wrap: nowrap;\n  }\n  #canvas-quiz-stats .navbar-expand-md .navbar-collapse {\n    display: -ms-flexbox !important;\n    display: flex !important;\n    -ms-flex-preferred-size: auto;\n    flex-basis: auto;\n  }\n  #canvas-quiz-stats .navbar-expand-md .navbar-toggler {\n    display: none;\n  }\n}\n@media (max-width: 991.98px) {\n  #canvas-quiz-stats .navbar-expand-lg > .container,\n  #canvas-quiz-stats .navbar-expand-lg > .container-fluid,\n  #canvas-quiz-stats .navbar-expand-lg > .container-sm,\n  #canvas-quiz-stats .navbar-expand-lg > .container-md,\n  #canvas-quiz-stats .navbar-expand-lg > .container-lg,\n  #canvas-quiz-stats .navbar-expand-lg > .container-xl {\n    padding-right: 0;\n    padding-left: 0;\n  }\n}\n@media (min-width: 992px) {\n  #canvas-quiz-stats .navbar-expand-lg {\n    -ms-flex-flow: row nowrap;\n    flex-flow: row nowrap;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n  }\n  #canvas-quiz-stats .navbar-expand-lg .navbar-nav {\n    -ms-flex-direction: row;\n    flex-direction: row;\n  }\n  #canvas-quiz-stats .navbar-expand-lg .navbar-nav .dropdown-menu {\n    position: absolute;\n  }\n  #canvas-quiz-stats .navbar-expand-lg .navbar-nav .nav-link {\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n  }\n  #canvas-quiz-stats .navbar-expand-lg > .container,\n  #canvas-quiz-stats .navbar-expand-lg > .container-fluid,\n  #canvas-quiz-stats .navbar-expand-lg > .container-sm,\n  #canvas-quiz-stats .navbar-expand-lg > .container-md,\n  #canvas-quiz-stats .navbar-expand-lg > .container-lg,\n  #canvas-quiz-stats .navbar-expand-lg > .container-xl {\n    -ms-flex-wrap: nowrap;\n    flex-wrap: nowrap;\n  }\n  #canvas-quiz-stats .navbar-expand-lg .navbar-collapse {\n    display: -ms-flexbox !important;\n    display: flex !important;\n    -ms-flex-preferred-size: auto;\n    flex-basis: auto;\n  }\n  #canvas-quiz-stats .navbar-expand-lg .navbar-toggler {\n    display: none;\n  }\n}\n@media (max-width: 1199.98px) {\n  #canvas-quiz-stats .navbar-expand-xl > .container,\n  #canvas-quiz-stats .navbar-expand-xl > .container-fluid,\n  #canvas-quiz-stats .navbar-expand-xl > .container-sm,\n  #canvas-quiz-stats .navbar-expand-xl > .container-md,\n  #canvas-quiz-stats .navbar-expand-xl > .container-lg,\n  #canvas-quiz-stats .navbar-expand-xl > .container-xl {\n    padding-right: 0;\n    padding-left: 0;\n  }\n}\n@media (min-width: 1200px) {\n  #canvas-quiz-stats .navbar-expand-xl {\n    -ms-flex-flow: row nowrap;\n    flex-flow: row nowrap;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n  }\n  #canvas-quiz-stats .navbar-expand-xl .navbar-nav {\n    -ms-flex-direction: row;\n    flex-direction: row;\n  }\n  #canvas-quiz-stats .navbar-expand-xl .navbar-nav .dropdown-menu {\n    position: absolute;\n  }\n  #canvas-quiz-stats .navbar-expand-xl .navbar-nav .nav-link {\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n  }\n  #canvas-quiz-stats .navbar-expand-xl > .container,\n  #canvas-quiz-stats .navbar-expand-xl > .container-fluid,\n  #canvas-quiz-stats .navbar-expand-xl > .container-sm,\n  #canvas-quiz-stats .navbar-expand-xl > .container-md,\n  #canvas-quiz-stats .navbar-expand-xl > .container-lg,\n  #canvas-quiz-stats .navbar-expand-xl > .container-xl {\n    -ms-flex-wrap: nowrap;\n    flex-wrap: nowrap;\n  }\n  #canvas-quiz-stats .navbar-expand-xl .navbar-collapse {\n    display: -ms-flexbox !important;\n    display: flex !important;\n    -ms-flex-preferred-size: auto;\n    flex-basis: auto;\n  }\n  #canvas-quiz-stats .navbar-expand-xl .navbar-toggler {\n    display: none;\n  }\n}\n#canvas-quiz-stats .navbar-expand {\n  -ms-flex-flow: row nowrap;\n  flex-flow: row nowrap;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n}\n#canvas-quiz-stats .navbar-expand > .container,\n#canvas-quiz-stats .navbar-expand > .container-fluid,\n#canvas-quiz-stats .navbar-expand > .container-sm,\n#canvas-quiz-stats .navbar-expand > .container-md,\n#canvas-quiz-stats .navbar-expand > .container-lg,\n#canvas-quiz-stats .navbar-expand > .container-xl {\n  padding-right: 0;\n  padding-left: 0;\n}\n#canvas-quiz-stats .navbar-expand .navbar-nav {\n  -ms-flex-direction: row;\n  flex-direction: row;\n}\n#canvas-quiz-stats .navbar-expand .navbar-nav .dropdown-menu {\n  position: absolute;\n}\n#canvas-quiz-stats .navbar-expand .navbar-nav .nav-link {\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n}\n#canvas-quiz-stats .navbar-expand > .container,\n#canvas-quiz-stats .navbar-expand > .container-fluid,\n#canvas-quiz-stats .navbar-expand > .container-sm,\n#canvas-quiz-stats .navbar-expand > .container-md,\n#canvas-quiz-stats .navbar-expand > .container-lg,\n#canvas-quiz-stats .navbar-expand > .container-xl {\n  -ms-flex-wrap: nowrap;\n  flex-wrap: nowrap;\n}\n#canvas-quiz-stats .navbar-expand .navbar-collapse {\n  display: -ms-flexbox !important;\n  display: flex !important;\n  -ms-flex-preferred-size: auto;\n  flex-basis: auto;\n}\n#canvas-quiz-stats .navbar-expand .navbar-toggler {\n  display: none;\n}\n#canvas-quiz-stats .navbar-light .navbar-brand {\n  color: rgba(0, 0, 0, 0.9);\n}\n#canvas-quiz-stats .navbar-light .navbar-brand:hover,\n#canvas-quiz-stats .navbar-light .navbar-brand:focus {\n  color: rgba(0, 0, 0, 0.9);\n}\n#canvas-quiz-stats .navbar-light .navbar-nav .nav-link {\n  color: rgba(0, 0, 0, 0.5);\n}\n#canvas-quiz-stats .navbar-light .navbar-nav .nav-link:hover,\n#canvas-quiz-stats .navbar-light .navbar-nav .nav-link:focus {\n  color: rgba(0, 0, 0, 0.7);\n}\n#canvas-quiz-stats .navbar-light .navbar-nav .nav-link.disabled {\n  color: rgba(0, 0, 0, 0.3);\n}\n#canvas-quiz-stats .navbar-light .navbar-nav .show > .nav-link,\n#canvas-quiz-stats .navbar-light .navbar-nav .active > .nav-link,\n#canvas-quiz-stats .navbar-light .navbar-nav .nav-link.show,\n#canvas-quiz-stats .navbar-light .navbar-nav .nav-link.active {\n  color: rgba(0, 0, 0, 0.9);\n}\n#canvas-quiz-stats .navbar-light .navbar-toggler {\n  color: rgba(0, 0, 0, 0.5);\n  border-color: rgba(0, 0, 0, 0.1);\n}\n#canvas-quiz-stats .navbar-light .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.5%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\");\n}\n#canvas-quiz-stats .navbar-light .navbar-text {\n  color: rgba(0, 0, 0, 0.5);\n}\n#canvas-quiz-stats .navbar-light .navbar-text a {\n  color: rgba(0, 0, 0, 0.9);\n}\n#canvas-quiz-stats .navbar-light .navbar-text a:hover,\n#canvas-quiz-stats .navbar-light .navbar-text a:focus {\n  color: rgba(0, 0, 0, 0.9);\n}\n#canvas-quiz-stats .navbar-dark .navbar-brand {\n  color: #fff;\n}\n#canvas-quiz-stats .navbar-dark .navbar-brand:hover,\n#canvas-quiz-stats .navbar-dark .navbar-brand:focus {\n  color: #fff;\n}\n#canvas-quiz-stats .navbar-dark .navbar-nav .nav-link {\n  color: rgba(255, 255, 255, 0.5);\n}\n#canvas-quiz-stats .navbar-dark .navbar-nav .nav-link:hover,\n#canvas-quiz-stats .navbar-dark .navbar-nav .nav-link:focus {\n  color: rgba(255, 255, 255, 0.75);\n}\n#canvas-quiz-stats .navbar-dark .navbar-nav .nav-link.disabled {\n  color: rgba(255, 255, 255, 0.25);\n}\n#canvas-quiz-stats .navbar-dark .navbar-nav .show > .nav-link,\n#canvas-quiz-stats .navbar-dark .navbar-nav .active > .nav-link,\n#canvas-quiz-stats .navbar-dark .navbar-nav .nav-link.show,\n#canvas-quiz-stats .navbar-dark .navbar-nav .nav-link.active {\n  color: #fff;\n}\n#canvas-quiz-stats .navbar-dark .navbar-toggler {\n  color: rgba(255, 255, 255, 0.5);\n  border-color: rgba(255, 255, 255, 0.1);\n}\n#canvas-quiz-stats .navbar-dark .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.5%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\");\n}\n#canvas-quiz-stats .navbar-dark .navbar-text {\n  color: rgba(255, 255, 255, 0.5);\n}\n#canvas-quiz-stats .navbar-dark .navbar-text a {\n  color: #fff;\n}\n#canvas-quiz-stats .navbar-dark .navbar-text a:hover,\n#canvas-quiz-stats .navbar-dark .navbar-text a:focus {\n  color: #fff;\n}\n#canvas-quiz-stats .card {\n  position: relative;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  min-width: 0;\n  word-wrap: break-word;\n  background-color: #fff;\n  background-clip: border-box;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-radius: 0.25rem;\n}\n#canvas-quiz-stats .card > hr {\n  margin-right: 0;\n  margin-left: 0;\n}\n#canvas-quiz-stats .card > .list-group {\n  border-top: inherit;\n  border-bottom: inherit;\n}\n#canvas-quiz-stats .card > .list-group:first-child {\n  border-top-width: 0;\n  border-top-left-radius: calc(0.25rem - 1px);\n  border-top-right-radius: calc(0.25rem - 1px);\n}\n#canvas-quiz-stats .card > .list-group:last-child {\n  border-bottom-width: 0;\n  border-bottom-right-radius: calc(0.25rem - 1px);\n  border-bottom-left-radius: calc(0.25rem - 1px);\n}\n#canvas-quiz-stats .card > .card-header + .list-group,\n#canvas-quiz-stats .card > .list-group + .card-footer {\n  border-top: 0;\n}\n#canvas-quiz-stats .card-body {\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n  min-height: 1px;\n  padding: 1.25rem;\n}\n#canvas-quiz-stats .card-title {\n  margin-bottom: 0.75rem;\n}\n#canvas-quiz-stats .card-subtitle {\n  margin-top: -0.375rem;\n  margin-bottom: 0;\n}\n#canvas-quiz-stats .card-text:last-child {\n  margin-bottom: 0;\n}\n#canvas-quiz-stats .card-link:hover {\n  text-decoration: none;\n}\n#canvas-quiz-stats .card-link + .card-link {\n  margin-left: 1.25rem;\n}\n#canvas-quiz-stats .card-header {\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: rgba(0, 0, 0, 0.03);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125);\n}\n#canvas-quiz-stats .card-header:first-child {\n  border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;\n}\n#canvas-quiz-stats .card-footer {\n  padding: 0.75rem 1.25rem;\n  background-color: rgba(0, 0, 0, 0.03);\n  border-top: 1px solid rgba(0, 0, 0, 0.125);\n}\n#canvas-quiz-stats .card-footer:last-child {\n  border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px);\n}\n#canvas-quiz-stats .card-header-tabs {\n  margin-right: -0.625rem;\n  margin-bottom: -0.75rem;\n  margin-left: -0.625rem;\n  border-bottom: 0;\n}\n#canvas-quiz-stats .card-header-pills {\n  margin-right: -0.625rem;\n  margin-left: -0.625rem;\n}\n#canvas-quiz-stats .card-img-overlay {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  padding: 1.25rem;\n  border-radius: calc(0.25rem - 1px);\n}\n#canvas-quiz-stats .card-img,\n#canvas-quiz-stats .card-img-top,\n#canvas-quiz-stats .card-img-bottom {\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  width: 100%;\n}\n#canvas-quiz-stats .card-img,\n#canvas-quiz-stats .card-img-top {\n  border-top-left-radius: calc(0.25rem - 1px);\n  border-top-right-radius: calc(0.25rem - 1px);\n}\n#canvas-quiz-stats .card-img,\n#canvas-quiz-stats .card-img-bottom {\n  border-bottom-right-radius: calc(0.25rem - 1px);\n  border-bottom-left-radius: calc(0.25rem - 1px);\n}\n#canvas-quiz-stats .card-deck .card {\n  margin-bottom: 15px;\n}\n@media (min-width: 576px) {\n  #canvas-quiz-stats .card-deck {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-flow: row wrap;\n    flex-flow: row wrap;\n    margin-right: -15px;\n    margin-left: -15px;\n  }\n  #canvas-quiz-stats .card-deck .card {\n    -ms-flex: 1 0 0%;\n    flex: 1 0 0%;\n    margin-right: 15px;\n    margin-bottom: 0;\n    margin-left: 15px;\n  }\n}\n#canvas-quiz-stats .card-group > .card {\n  margin-bottom: 15px;\n}\n@media (min-width: 576px) {\n  #canvas-quiz-stats .card-group {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-flow: row wrap;\n    flex-flow: row wrap;\n  }\n  #canvas-quiz-stats .card-group > .card {\n    -ms-flex: 1 0 0%;\n    flex: 1 0 0%;\n    margin-bottom: 0;\n  }\n  #canvas-quiz-stats .card-group > .card + .card {\n    margin-left: 0;\n    border-left: 0;\n  }\n  #canvas-quiz-stats .card-group > .card:not(:last-child) {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n  }\n  #canvas-quiz-stats .card-group > .card:not(:last-child) .card-img-top,\n  #canvas-quiz-stats .card-group > .card:not(:last-child) .card-header {\n    border-top-right-radius: 0;\n  }\n  #canvas-quiz-stats .card-group > .card:not(:last-child) .card-img-bottom,\n  #canvas-quiz-stats .card-group > .card:not(:last-child) .card-footer {\n    border-bottom-right-radius: 0;\n  }\n  #canvas-quiz-stats .card-group > .card:not(:first-child) {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n  }\n  #canvas-quiz-stats .card-group > .card:not(:first-child) .card-img-top,\n  #canvas-quiz-stats .card-group > .card:not(:first-child) .card-header {\n    border-top-left-radius: 0;\n  }\n  #canvas-quiz-stats .card-group > .card:not(:first-child) .card-img-bottom,\n  #canvas-quiz-stats .card-group > .card:not(:first-child) .card-footer {\n    border-bottom-left-radius: 0;\n  }\n}\n#canvas-quiz-stats .card-columns .card {\n  margin-bottom: 0.75rem;\n}\n@media (min-width: 576px) {\n  #canvas-quiz-stats .card-columns {\n    -webkit-column-count: 3;\n    -moz-column-count: 3;\n    column-count: 3;\n    -webkit-column-gap: 1.25rem;\n    -moz-column-gap: 1.25rem;\n    column-gap: 1.25rem;\n    orphans: 1;\n    widows: 1;\n  }\n  #canvas-quiz-stats .card-columns .card {\n    display: inline-block;\n    width: 100%;\n  }\n}\n#canvas-quiz-stats .accordion {\n  overflow-anchor: none;\n}\n#canvas-quiz-stats .accordion > .card {\n  overflow: hidden;\n}\n#canvas-quiz-stats .accordion > .card:not(:last-of-type) {\n  border-bottom: 0;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n#canvas-quiz-stats .accordion > .card:not(:first-of-type) {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n#canvas-quiz-stats .accordion > .card > .card-header {\n  border-radius: 0;\n  margin-bottom: -1px;\n}\n#canvas-quiz-stats .breadcrumb {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  padding: 0.75rem 1rem;\n  margin-bottom: 1rem;\n  list-style: none;\n  background-color: #e9ecef;\n  border-radius: 0.25rem;\n}\n#canvas-quiz-stats .breadcrumb-item {\n  display: -ms-flexbox;\n  display: flex;\n}\n#canvas-quiz-stats .breadcrumb-item + .breadcrumb-item {\n  padding-left: 0.5rem;\n}\n#canvas-quiz-stats .breadcrumb-item + .breadcrumb-item::before {\n  display: inline-block;\n  padding-right: 0.5rem;\n  color: #6c757d;\n  content: \"/\";\n}\n#canvas-quiz-stats .breadcrumb-item + .breadcrumb-item:hover::before {\n  text-decoration: underline;\n}\n#canvas-quiz-stats .breadcrumb-item + .breadcrumb-item:hover::before {\n  text-decoration: none;\n}\n#canvas-quiz-stats .breadcrumb-item.active {\n  color: #6c757d;\n}\n#canvas-quiz-stats .pagination {\n  display: -ms-flexbox;\n  display: flex;\n  padding-left: 0;\n  list-style: none;\n  border-radius: 0.25rem;\n}\n#canvas-quiz-stats .page-link {\n  position: relative;\n  display: block;\n  padding: 0.5rem 0.75rem;\n  margin-left: -1px;\n  line-height: 1.25;\n  color: #007bff;\n  background-color: #fff;\n  border: 1px solid #dee2e6;\n}\n#canvas-quiz-stats .page-link:hover {\n  z-index: 2;\n  color: #0056b3;\n  text-decoration: none;\n  background-color: #e9ecef;\n  border-color: #dee2e6;\n}\n#canvas-quiz-stats .page-link:focus {\n  z-index: 3;\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n#canvas-quiz-stats .page-item:first-child .page-link {\n  margin-left: 0;\n  border-top-left-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem;\n}\n#canvas-quiz-stats .page-item:last-child .page-link {\n  border-top-right-radius: 0.25rem;\n  border-bottom-right-radius: 0.25rem;\n}\n#canvas-quiz-stats .page-item.active .page-link {\n  z-index: 3;\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff;\n}\n#canvas-quiz-stats .page-item.disabled .page-link {\n  color: #6c757d;\n  pointer-events: none;\n  cursor: auto;\n  background-color: #fff;\n  border-color: #dee2e6;\n}\n#canvas-quiz-stats .pagination-lg .page-link {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  line-height: 1.5;\n}\n#canvas-quiz-stats .pagination-lg .page-item:first-child .page-link {\n  border-top-left-radius: 0.3rem;\n  border-bottom-left-radius: 0.3rem;\n}\n#canvas-quiz-stats .pagination-lg .page-item:last-child .page-link {\n  border-top-right-radius: 0.3rem;\n  border-bottom-right-radius: 0.3rem;\n}\n#canvas-quiz-stats .pagination-sm .page-link {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n}\n#canvas-quiz-stats .pagination-sm .page-item:first-child .page-link {\n  border-top-left-radius: 0.2rem;\n  border-bottom-left-radius: 0.2rem;\n}\n#canvas-quiz-stats .pagination-sm .page-item:last-child .page-link {\n  border-top-right-radius: 0.2rem;\n  border-bottom-right-radius: 0.2rem;\n}\n#canvas-quiz-stats .badge {\n  display: inline-block;\n  padding: 0.25em 0.4em;\n  font-size: 75%;\n  font-weight: 700;\n  line-height: 1;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.25rem;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  #canvas-quiz-stats .badge {\n    transition: none;\n  }\n}\n#canvas-quiz-stats a.badge:hover,\n#canvas-quiz-stats a.badge:focus {\n  text-decoration: none;\n}\n#canvas-quiz-stats .badge:empty {\n  display: none;\n}\n#canvas-quiz-stats .btn .badge {\n  position: relative;\n  top: -1px;\n}\n#canvas-quiz-stats .badge-pill {\n  padding-right: 0.6em;\n  padding-left: 0.6em;\n  border-radius: 10rem;\n}\n#canvas-quiz-stats .badge-primary {\n  color: #fff;\n  background-color: #007bff;\n}\n#canvas-quiz-stats a.badge-primary:hover,\n#canvas-quiz-stats a.badge-primary:focus {\n  color: #fff;\n  background-color: #0062cc;\n}\n#canvas-quiz-stats a.badge-primary:focus,\n#canvas-quiz-stats a.badge-primary.focus {\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);\n}\n#canvas-quiz-stats .badge-secondary {\n  color: #fff;\n  background-color: #6c757d;\n}\n#canvas-quiz-stats a.badge-secondary:hover,\n#canvas-quiz-stats a.badge-secondary:focus {\n  color: #fff;\n  background-color: #545b62;\n}\n#canvas-quiz-stats a.badge-secondary:focus,\n#canvas-quiz-stats a.badge-secondary.focus {\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5);\n}\n#canvas-quiz-stats .badge-success {\n  color: #fff;\n  background-color: #28a745;\n}\n#canvas-quiz-stats a.badge-success:hover,\n#canvas-quiz-stats a.badge-success:focus {\n  color: #fff;\n  background-color: #1e7e34;\n}\n#canvas-quiz-stats a.badge-success:focus,\n#canvas-quiz-stats a.badge-success.focus {\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5);\n}\n#canvas-quiz-stats .badge-info {\n  color: #fff;\n  background-color: #17a2b8;\n}\n#canvas-quiz-stats a.badge-info:hover,\n#canvas-quiz-stats a.badge-info:focus {\n  color: #fff;\n  background-color: #117a8b;\n}\n#canvas-quiz-stats a.badge-info:focus,\n#canvas-quiz-stats a.badge-info.focus {\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5);\n}\n#canvas-quiz-stats .badge-warning {\n  color: #212529;\n  background-color: #ffc107;\n}\n#canvas-quiz-stats a.badge-warning:hover,\n#canvas-quiz-stats a.badge-warning:focus {\n  color: #212529;\n  background-color: #d39e00;\n}\n#canvas-quiz-stats a.badge-warning:focus,\n#canvas-quiz-stats a.badge-warning.focus {\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);\n}\n#canvas-quiz-stats .badge-danger {\n  color: #fff;\n  background-color: #dc3545;\n}\n#canvas-quiz-stats a.badge-danger:hover,\n#canvas-quiz-stats a.badge-danger:focus {\n  color: #fff;\n  background-color: #bd2130;\n}\n#canvas-quiz-stats a.badge-danger:focus,\n#canvas-quiz-stats a.badge-danger.focus {\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5);\n}\n#canvas-quiz-stats .badge-light {\n  color: #212529;\n  background-color: #f8f9fa;\n}\n#canvas-quiz-stats a.badge-light:hover,\n#canvas-quiz-stats a.badge-light:focus {\n  color: #212529;\n  background-color: #dae0e5;\n}\n#canvas-quiz-stats a.badge-light:focus,\n#canvas-quiz-stats a.badge-light.focus {\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5);\n}\n#canvas-quiz-stats .badge-dark {\n  color: #fff;\n  background-color: #343a40;\n}\n#canvas-quiz-stats a.badge-dark:hover,\n#canvas-quiz-stats a.badge-dark:focus {\n  color: #fff;\n  background-color: #1d2124;\n}\n#canvas-quiz-stats a.badge-dark:focus,\n#canvas-quiz-stats a.badge-dark.focus {\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5);\n}\n#canvas-quiz-stats .jumbotron {\n  padding: 2rem 1rem;\n  margin-bottom: 2rem;\n  background-color: #e9ecef;\n  border-radius: 0.3rem;\n}\n@media (min-width: 576px) {\n  #canvas-quiz-stats .jumbotron {\n    padding: 4rem 2rem;\n  }\n}\n#canvas-quiz-stats .jumbotron-fluid {\n  padding-right: 0;\n  padding-left: 0;\n  border-radius: 0;\n}\n#canvas-quiz-stats .alert {\n  position: relative;\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 1rem;\n  border: 1px solid transparent;\n  border-radius: 0.25rem;\n}\n#canvas-quiz-stats .alert-heading {\n  color: inherit;\n}\n#canvas-quiz-stats .alert-link {\n  font-weight: 700;\n}\n#canvas-quiz-stats .alert-dismissible {\n  padding-right: 4rem;\n}\n#canvas-quiz-stats .alert-dismissible .close {\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 2;\n  padding: 0.75rem 1.25rem;\n  color: inherit;\n}\n#canvas-quiz-stats .alert-primary {\n  color: #004085;\n  background-color: #cce5ff;\n  border-color: #b8daff;\n}\n#canvas-quiz-stats .alert-primary hr {\n  border-top-color: #9fcdff;\n}\n#canvas-quiz-stats .alert-primary .alert-link {\n  color: #002752;\n}\n#canvas-quiz-stats .alert-secondary {\n  color: #383d41;\n  background-color: #e2e3e5;\n  border-color: #d6d8db;\n}\n#canvas-quiz-stats .alert-secondary hr {\n  border-top-color: #c8cbcf;\n}\n#canvas-quiz-stats .alert-secondary .alert-link {\n  color: #202326;\n}\n#canvas-quiz-stats .alert-success {\n  color: #155724;\n  background-color: #d4edda;\n  border-color: #c3e6cb;\n}\n#canvas-quiz-stats .alert-success hr {\n  border-top-color: #b1dfbb;\n}\n#canvas-quiz-stats .alert-success .alert-link {\n  color: #0b2e13;\n}\n#canvas-quiz-stats .alert-info {\n  color: #0c5460;\n  background-color: #d1ecf1;\n  border-color: #bee5eb;\n}\n#canvas-quiz-stats .alert-info hr {\n  border-top-color: #abdde5;\n}\n#canvas-quiz-stats .alert-info .alert-link {\n  color: #062c33;\n}\n#canvas-quiz-stats .alert-warning {\n  color: #856404;\n  background-color: #fff3cd;\n  border-color: #ffeeba;\n}\n#canvas-quiz-stats .alert-warning hr {\n  border-top-color: #ffe8a1;\n}\n#canvas-quiz-stats .alert-warning .alert-link {\n  color: #533f03;\n}\n#canvas-quiz-stats .alert-danger {\n  color: #721c24;\n  background-color: #f8d7da;\n  border-color: #f5c6cb;\n}\n#canvas-quiz-stats .alert-danger hr {\n  border-top-color: #f1b0b7;\n}\n#canvas-quiz-stats .alert-danger .alert-link {\n  color: #491217;\n}\n#canvas-quiz-stats .alert-light {\n  color: #818182;\n  background-color: #fefefe;\n  border-color: #fdfdfe;\n}\n#canvas-quiz-stats .alert-light hr {\n  border-top-color: #ececf6;\n}\n#canvas-quiz-stats .alert-light .alert-link {\n  color: #686868;\n}\n#canvas-quiz-stats .alert-dark {\n  color: #1b1e21;\n  background-color: #d6d8d9;\n  border-color: #c6c8ca;\n}\n#canvas-quiz-stats .alert-dark hr {\n  border-top-color: #b9bbbe;\n}\n#canvas-quiz-stats .alert-dark .alert-link {\n  color: #040505;\n}\n@-webkit-keyframes progress-bar-stripes {\n  from {\n    background-position: 1rem 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 1rem 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n#canvas-quiz-stats .progress {\n  display: -ms-flexbox;\n  display: flex;\n  height: 1rem;\n  overflow: hidden;\n  line-height: 0;\n  font-size: 0.75rem;\n  background-color: #e9ecef;\n  border-radius: 0.25rem;\n}\n#canvas-quiz-stats .progress-bar {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-pack: center;\n  justify-content: center;\n  overflow: hidden;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  background-color: #007bff;\n  transition: width 0.6s ease;\n}\n@media (prefers-reduced-motion: reduce) {\n  #canvas-quiz-stats .progress-bar {\n    transition: none;\n  }\n}\n#canvas-quiz-stats .progress-bar-striped {\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 1rem 1rem;\n}\n#canvas-quiz-stats .progress-bar-animated {\n  -webkit-animation: progress-bar-stripes 1s linear infinite;\n  animation: progress-bar-stripes 1s linear infinite;\n}\n@media (prefers-reduced-motion: reduce) {\n  #canvas-quiz-stats .progress-bar-animated {\n    -webkit-animation: none;\n    animation: none;\n  }\n}\n#canvas-quiz-stats .media {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: start;\n  align-items: flex-start;\n}\n#canvas-quiz-stats .media-body {\n  -ms-flex: 1;\n  flex: 1;\n}\n#canvas-quiz-stats .list-group {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0;\n  border-radius: 0.25rem;\n}\n#canvas-quiz-stats .list-group-item-action {\n  width: 100%;\n  color: #495057;\n  text-align: inherit;\n}\n#canvas-quiz-stats .list-group-item-action:hover,\n#canvas-quiz-stats .list-group-item-action:focus {\n  z-index: 1;\n  color: #495057;\n  text-decoration: none;\n  background-color: #f8f9fa;\n}\n#canvas-quiz-stats .list-group-item-action:active {\n  color: #212529;\n  background-color: #e9ecef;\n}\n#canvas-quiz-stats .list-group-item {\n  position: relative;\n  display: block;\n  padding: 0.75rem 1.25rem;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n}\n#canvas-quiz-stats .list-group-item:first-child {\n  border-top-left-radius: inherit;\n  border-top-right-radius: inherit;\n}\n#canvas-quiz-stats .list-group-item:last-child {\n  border-bottom-right-radius: inherit;\n  border-bottom-left-radius: inherit;\n}\n#canvas-quiz-stats .list-group-item.disabled,\n#canvas-quiz-stats .list-group-item:disabled {\n  color: #6c757d;\n  pointer-events: none;\n  background-color: #fff;\n}\n#canvas-quiz-stats .list-group-item.active {\n  z-index: 2;\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff;\n}\n#canvas-quiz-stats .list-group-item + .list-group-item {\n  border-top-width: 0;\n}\n#canvas-quiz-stats .list-group-item + .list-group-item.active {\n  margin-top: -1px;\n  border-top-width: 1px;\n}\n#canvas-quiz-stats .list-group-horizontal {\n  -ms-flex-direction: row;\n  flex-direction: row;\n}\n#canvas-quiz-stats .list-group-horizontal > .list-group-item:first-child {\n  border-bottom-left-radius: 0.25rem;\n  border-top-right-radius: 0;\n}\n#canvas-quiz-stats .list-group-horizontal > .list-group-item:last-child {\n  border-top-right-radius: 0.25rem;\n  border-bottom-left-radius: 0;\n}\n#canvas-quiz-stats .list-group-horizontal > .list-group-item.active {\n  margin-top: 0;\n}\n#canvas-quiz-stats .list-group-horizontal > .list-group-item + .list-group-item {\n  border-top-width: 1px;\n  border-left-width: 0;\n}\n#canvas-quiz-stats .list-group-horizontal > .list-group-item + .list-group-item.active {\n  margin-left: -1px;\n  border-left-width: 1px;\n}\n@media (min-width: 576px) {\n  #canvas-quiz-stats .list-group-horizontal-sm {\n    -ms-flex-direction: row;\n    flex-direction: row;\n  }\n  #canvas-quiz-stats .list-group-horizontal-sm > .list-group-item:first-child {\n    border-bottom-left-radius: 0.25rem;\n    border-top-right-radius: 0;\n  }\n  #canvas-quiz-stats .list-group-horizontal-sm > .list-group-item:last-child {\n    border-top-right-radius: 0.25rem;\n    border-bottom-left-radius: 0;\n  }\n  #canvas-quiz-stats .list-group-horizontal-sm > .list-group-item.active {\n    margin-top: 0;\n  }\n  #canvas-quiz-stats .list-group-horizontal-sm > .list-group-item + .list-group-item {\n    border-top-width: 1px;\n    border-left-width: 0;\n  }\n  #canvas-quiz-stats .list-group-horizontal-sm > .list-group-item + .list-group-item.active {\n    margin-left: -1px;\n    border-left-width: 1px;\n  }\n}\n@media (min-width: 768px) {\n  #canvas-quiz-stats .list-group-horizontal-md {\n    -ms-flex-direction: row;\n    flex-direction: row;\n  }\n  #canvas-quiz-stats .list-group-horizontal-md > .list-group-item:first-child {\n    border-bottom-left-radius: 0.25rem;\n    border-top-right-radius: 0;\n  }\n  #canvas-quiz-stats .list-group-horizontal-md > .list-group-item:last-child {\n    border-top-right-radius: 0.25rem;\n    border-bottom-left-radius: 0;\n  }\n  #canvas-quiz-stats .list-group-horizontal-md > .list-group-item.active {\n    margin-top: 0;\n  }\n  #canvas-quiz-stats .list-group-horizontal-md > .list-group-item + .list-group-item {\n    border-top-width: 1px;\n    border-left-width: 0;\n  }\n  #canvas-quiz-stats .list-group-horizontal-md > .list-group-item + .list-group-item.active {\n    margin-left: -1px;\n    border-left-width: 1px;\n  }\n}\n@media (min-width: 992px) {\n  #canvas-quiz-stats .list-group-horizontal-lg {\n    -ms-flex-direction: row;\n    flex-direction: row;\n  }\n  #canvas-quiz-stats .list-group-horizontal-lg > .list-group-item:first-child {\n    border-bottom-left-radius: 0.25rem;\n    border-top-right-radius: 0;\n  }\n  #canvas-quiz-stats .list-group-horizontal-lg > .list-group-item:last-child {\n    border-top-right-radius: 0.25rem;\n    border-bottom-left-radius: 0;\n  }\n  #canvas-quiz-stats .list-group-horizontal-lg > .list-group-item.active {\n    margin-top: 0;\n  }\n  #canvas-quiz-stats .list-group-horizontal-lg > .list-group-item + .list-group-item {\n    border-top-width: 1px;\n    border-left-width: 0;\n  }\n  #canvas-quiz-stats .list-group-horizontal-lg > .list-group-item + .list-group-item.active {\n    margin-left: -1px;\n    border-left-width: 1px;\n  }\n}\n@media (min-width: 1200px) {\n  #canvas-quiz-stats .list-group-horizontal-xl {\n    -ms-flex-direction: row;\n    flex-direction: row;\n  }\n  #canvas-quiz-stats .list-group-horizontal-xl > .list-group-item:first-child {\n    border-bottom-left-radius: 0.25rem;\n    border-top-right-radius: 0;\n  }\n  #canvas-quiz-stats .list-group-horizontal-xl > .list-group-item:last-child {\n    border-top-right-radius: 0.25rem;\n    border-bottom-left-radius: 0;\n  }\n  #canvas-quiz-stats .list-group-horizontal-xl > .list-group-item.active {\n    margin-top: 0;\n  }\n  #canvas-quiz-stats .list-group-horizontal-xl > .list-group-item + .list-group-item {\n    border-top-width: 1px;\n    border-left-width: 0;\n  }\n  #canvas-quiz-stats .list-group-horizontal-xl > .list-group-item + .list-group-item.active {\n    margin-left: -1px;\n    border-left-width: 1px;\n  }\n}\n#canvas-quiz-stats .list-group-flush {\n  border-radius: 0;\n}\n#canvas-quiz-stats .list-group-flush > .list-group-item {\n  border-width: 0 0 1px;\n}\n#canvas-quiz-stats .list-group-flush > .list-group-item:last-child {\n  border-bottom-width: 0;\n}\n#canvas-quiz-stats .list-group-item-primary {\n  color: #004085;\n  background-color: #b8daff;\n}\n#canvas-quiz-stats .list-group-item-primary.list-group-item-action:hover,\n#canvas-quiz-stats .list-group-item-primary.list-group-item-action:focus {\n  color: #004085;\n  background-color: #9fcdff;\n}\n#canvas-quiz-stats .list-group-item-primary.list-group-item-action.active {\n  color: #fff;\n  background-color: #004085;\n  border-color: #004085;\n}\n#canvas-quiz-stats .list-group-item-secondary {\n  color: #383d41;\n  background-color: #d6d8db;\n}\n#canvas-quiz-stats .list-group-item-secondary.list-group-item-action:hover,\n#canvas-quiz-stats .list-group-item-secondary.list-group-item-action:focus {\n  color: #383d41;\n  background-color: #c8cbcf;\n}\n#canvas-quiz-stats .list-group-item-secondary.list-group-item-action.active {\n  color: #fff;\n  background-color: #383d41;\n  border-color: #383d41;\n}\n#canvas-quiz-stats .list-group-item-success {\n  color: #155724;\n  background-color: #c3e6cb;\n}\n#canvas-quiz-stats .list-group-item-success.list-group-item-action:hover,\n#canvas-quiz-stats .list-group-item-success.list-group-item-action:focus {\n  color: #155724;\n  background-color: #b1dfbb;\n}\n#canvas-quiz-stats .list-group-item-success.list-group-item-action.active {\n  color: #fff;\n  background-color: #155724;\n  border-color: #155724;\n}\n#canvas-quiz-stats .list-group-item-info {\n  color: #0c5460;\n  background-color: #bee5eb;\n}\n#canvas-quiz-stats .list-group-item-info.list-group-item-action:hover,\n#canvas-quiz-stats .list-group-item-info.list-group-item-action:focus {\n  color: #0c5460;\n  background-color: #abdde5;\n}\n#canvas-quiz-stats .list-group-item-info.list-group-item-action.active {\n  color: #fff;\n  background-color: #0c5460;\n  border-color: #0c5460;\n}\n#canvas-quiz-stats .list-group-item-warning {\n  color: #856404;\n  background-color: #ffeeba;\n}\n#canvas-quiz-stats .list-group-item-warning.list-group-item-action:hover,\n#canvas-quiz-stats .list-group-item-warning.list-group-item-action:focus {\n  color: #856404;\n  background-color: #ffe8a1;\n}\n#canvas-quiz-stats .list-group-item-warning.list-group-item-action.active {\n  color: #fff;\n  background-color: #856404;\n  border-color: #856404;\n}\n#canvas-quiz-stats .list-group-item-danger {\n  color: #721c24;\n  background-color: #f5c6cb;\n}\n#canvas-quiz-stats .list-group-item-danger.list-group-item-action:hover,\n#canvas-quiz-stats .list-group-item-danger.list-group-item-action:focus {\n  color: #721c24;\n  background-color: #f1b0b7;\n}\n#canvas-quiz-stats .list-group-item-danger.list-group-item-action.active {\n  color: #fff;\n  background-color: #721c24;\n  border-color: #721c24;\n}\n#canvas-quiz-stats .list-group-item-light {\n  color: #818182;\n  background-color: #fdfdfe;\n}\n#canvas-quiz-stats .list-group-item-light.list-group-item-action:hover,\n#canvas-quiz-stats .list-group-item-light.list-group-item-action:focus {\n  color: #818182;\n  background-color: #ececf6;\n}\n#canvas-quiz-stats .list-group-item-light.list-group-item-action.active {\n  color: #fff;\n  background-color: #818182;\n  border-color: #818182;\n}\n#canvas-quiz-stats .list-group-item-dark {\n  color: #1b1e21;\n  background-color: #c6c8ca;\n}\n#canvas-quiz-stats .list-group-item-dark.list-group-item-action:hover,\n#canvas-quiz-stats .list-group-item-dark.list-group-item-action:focus {\n  color: #1b1e21;\n  background-color: #b9bbbe;\n}\n#canvas-quiz-stats .list-group-item-dark.list-group-item-action.active {\n  color: #fff;\n  background-color: #1b1e21;\n  border-color: #1b1e21;\n}\n#canvas-quiz-stats .close {\n  float: right;\n  font-size: 1.5rem;\n  font-weight: 700;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  opacity: 0.5;\n}\n#canvas-quiz-stats .close:hover {\n  color: #000;\n  text-decoration: none;\n}\n#canvas-quiz-stats .close:not(:disabled):not(.disabled):hover,\n#canvas-quiz-stats .close:not(:disabled):not(.disabled):focus {\n  opacity: 0.75;\n}\n#canvas-quiz-stats button.close {\n  padding: 0;\n  background-color: transparent;\n  border: 0;\n}\n#canvas-quiz-stats a.close.disabled {\n  pointer-events: none;\n}\n#canvas-quiz-stats .toast {\n  -ms-flex-preferred-size: 350px;\n  flex-basis: 350px;\n  max-width: 350px;\n  font-size: 0.875rem;\n  background-color: rgba(255, 255, 255, 0.85);\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);\n  opacity: 0;\n  border-radius: 0.25rem;\n}\n#canvas-quiz-stats .toast:not(:last-child) {\n  margin-bottom: 0.75rem;\n}\n#canvas-quiz-stats .toast.showing {\n  opacity: 1;\n}\n#canvas-quiz-stats .toast.show {\n  display: block;\n  opacity: 1;\n}\n#canvas-quiz-stats .toast.hide {\n  display: none;\n}\n#canvas-quiz-stats .toast-header {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  padding: 0.25rem 0.75rem;\n  color: #6c757d;\n  background-color: rgba(255, 255, 255, 0.85);\n  background-clip: padding-box;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n  border-top-left-radius: calc(0.25rem - 1px);\n  border-top-right-radius: calc(0.25rem - 1px);\n}\n#canvas-quiz-stats .toast-body {\n  padding: 0.75rem;\n}\n#canvas-quiz-stats .modal-open {\n  overflow: hidden;\n}\n#canvas-quiz-stats .modal-open .modal {\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n#canvas-quiz-stats .modal {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 1050;\n  display: none;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  outline: 0;\n}\n#canvas-quiz-stats .modal-dialog {\n  position: relative;\n  width: auto;\n  margin: 0.5rem;\n  pointer-events: none;\n}\n#canvas-quiz-stats .modal.fade .modal-dialog {\n  transition: -webkit-transform 0.3s ease-out;\n  transition: transform 0.3s ease-out;\n  transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;\n  -webkit-transform: translate(0, -50px);\n  transform: translate(0, -50px);\n}\n@media (prefers-reduced-motion: reduce) {\n  #canvas-quiz-stats .modal.fade .modal-dialog {\n    transition: none;\n  }\n}\n#canvas-quiz-stats .modal.show .modal-dialog {\n  -webkit-transform: none;\n  transform: none;\n}\n#canvas-quiz-stats .modal.modal-static .modal-dialog {\n  -webkit-transform: scale(1.02);\n  transform: scale(1.02);\n}\n#canvas-quiz-stats .modal-dialog-scrollable {\n  display: -ms-flexbox;\n  display: flex;\n  max-height: calc(100% - 1rem);\n}\n#canvas-quiz-stats .modal-dialog-scrollable .modal-content {\n  max-height: calc(100vh - 1rem);\n  overflow: hidden;\n}\n#canvas-quiz-stats .modal-dialog-scrollable .modal-header,\n#canvas-quiz-stats .modal-dialog-scrollable .modal-footer {\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n}\n#canvas-quiz-stats .modal-dialog-scrollable .modal-body {\n  overflow-y: auto;\n}\n#canvas-quiz-stats .modal-dialog-centered {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  min-height: calc(100% - 1rem);\n}\n#canvas-quiz-stats .modal-dialog-centered::before {\n  display: block;\n  height: calc(100vh - 1rem);\n  height: -webkit-min-content;\n  height: -moz-min-content;\n  height: min-content;\n  content: \"\";\n}\n#canvas-quiz-stats .modal-dialog-centered.modal-dialog-scrollable {\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-pack: center;\n  justify-content: center;\n  height: 100%;\n}\n#canvas-quiz-stats .modal-dialog-centered.modal-dialog-scrollable .modal-content {\n  max-height: none;\n}\n#canvas-quiz-stats .modal-dialog-centered.modal-dialog-scrollable::before {\n  content: none;\n}\n#canvas-quiz-stats .modal-content {\n  position: relative;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  width: 100%;\n  pointer-events: auto;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem;\n  outline: 0;\n}\n#canvas-quiz-stats .modal-backdrop {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 1040;\n  width: 100vw;\n  height: 100vh;\n  background-color: #000;\n}\n#canvas-quiz-stats .modal-backdrop.fade {\n  opacity: 0;\n}\n#canvas-quiz-stats .modal-backdrop.show {\n  opacity: 0.5;\n}\n#canvas-quiz-stats .modal-header {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: start;\n  align-items: flex-start;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  padding: 1rem 1rem;\n  border-bottom: 1px solid #dee2e6;\n  border-top-left-radius: calc(0.3rem - 1px);\n  border-top-right-radius: calc(0.3rem - 1px);\n}\n#canvas-quiz-stats .modal-header .close {\n  padding: 1rem 1rem;\n  margin: -1rem -1rem -1rem auto;\n}\n#canvas-quiz-stats .modal-title {\n  margin-bottom: 0;\n  line-height: 1.5;\n}\n#canvas-quiz-stats .modal-body {\n  position: relative;\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n  padding: 1rem;\n}\n#canvas-quiz-stats .modal-footer {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n  padding: 0.75rem;\n  border-top: 1px solid #dee2e6;\n  border-bottom-right-radius: calc(0.3rem - 1px);\n  border-bottom-left-radius: calc(0.3rem - 1px);\n}\n#canvas-quiz-stats .modal-footer > * {\n  margin: 0.25rem;\n}\n#canvas-quiz-stats .modal-scrollbar-measure {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll;\n}\n@media (min-width: 576px) {\n  #canvas-quiz-stats .modal-dialog {\n    max-width: 500px;\n    margin: 1.75rem auto;\n  }\n  #canvas-quiz-stats .modal-dialog-scrollable {\n    max-height: calc(100% - 3.5rem);\n  }\n  #canvas-quiz-stats .modal-dialog-scrollable .modal-content {\n    max-height: calc(100vh - 3.5rem);\n  }\n  #canvas-quiz-stats .modal-dialog-centered {\n    min-height: calc(100% - 3.5rem);\n  }\n  #canvas-quiz-stats .modal-dialog-centered::before {\n    height: calc(100vh - 3.5rem);\n    height: -webkit-min-content;\n    height: -moz-min-content;\n    height: min-content;\n  }\n  #canvas-quiz-stats .modal-sm {\n    max-width: 300px;\n  }\n}\n@media (min-width: 992px) {\n  #canvas-quiz-stats .modal-lg,\n  #canvas-quiz-stats .modal-xl {\n    max-width: 800px;\n  }\n}\n@media (min-width: 1200px) {\n  #canvas-quiz-stats .modal-xl {\n    max-width: 1140px;\n  }\n}\n#canvas-quiz-stats .tooltip {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  font-style: normal;\n  font-weight: 400;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  letter-spacing: normal;\n  word-break: normal;\n  word-spacing: normal;\n  white-space: normal;\n  line-break: auto;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  opacity: 0;\n}\n#canvas-quiz-stats .tooltip.show {\n  opacity: 0.9;\n}\n#canvas-quiz-stats .tooltip .arrow {\n  position: absolute;\n  display: block;\n  width: 0.8rem;\n  height: 0.4rem;\n}\n#canvas-quiz-stats .tooltip .arrow::before {\n  position: absolute;\n  content: \"\";\n  border-color: transparent;\n  border-style: solid;\n}\n#canvas-quiz-stats .bs-tooltip-top,\n#canvas-quiz-stats .bs-tooltip-auto[x-placement^=\"top\"] {\n  padding: 0.4rem 0;\n}\n#canvas-quiz-stats .bs-tooltip-top .arrow,\n#canvas-quiz-stats .bs-tooltip-auto[x-placement^=\"top\"] .arrow {\n  bottom: 0;\n}\n#canvas-quiz-stats .bs-tooltip-top .arrow::before,\n#canvas-quiz-stats .bs-tooltip-auto[x-placement^=\"top\"] .arrow::before {\n  top: 0;\n  border-width: 0.4rem 0.4rem 0;\n  border-top-color: #000;\n}\n#canvas-quiz-stats .bs-tooltip-right,\n#canvas-quiz-stats .bs-tooltip-auto[x-placement^=\"right\"] {\n  padding: 0 0.4rem;\n}\n#canvas-quiz-stats .bs-tooltip-right .arrow,\n#canvas-quiz-stats .bs-tooltip-auto[x-placement^=\"right\"] .arrow {\n  left: 0;\n  width: 0.4rem;\n  height: 0.8rem;\n}\n#canvas-quiz-stats .bs-tooltip-right .arrow::before,\n#canvas-quiz-stats .bs-tooltip-auto[x-placement^=\"right\"] .arrow::before {\n  right: 0;\n  border-width: 0.4rem 0.4rem 0.4rem 0;\n  border-right-color: #000;\n}\n#canvas-quiz-stats .bs-tooltip-bottom,\n#canvas-quiz-stats .bs-tooltip-auto[x-placement^=\"bottom\"] {\n  padding: 0.4rem 0;\n}\n#canvas-quiz-stats .bs-tooltip-bottom .arrow,\n#canvas-quiz-stats .bs-tooltip-auto[x-placement^=\"bottom\"] .arrow {\n  top: 0;\n}\n#canvas-quiz-stats .bs-tooltip-bottom .arrow::before,\n#canvas-quiz-stats .bs-tooltip-auto[x-placement^=\"bottom\"] .arrow::before {\n  bottom: 0;\n  border-width: 0 0.4rem 0.4rem;\n  border-bottom-color: #000;\n}\n#canvas-quiz-stats .bs-tooltip-left,\n#canvas-quiz-stats .bs-tooltip-auto[x-placement^=\"left\"] {\n  padding: 0 0.4rem;\n}\n#canvas-quiz-stats .bs-tooltip-left .arrow,\n#canvas-quiz-stats .bs-tooltip-auto[x-placement^=\"left\"] .arrow {\n  right: 0;\n  width: 0.4rem;\n  height: 0.8rem;\n}\n#canvas-quiz-stats .bs-tooltip-left .arrow::before,\n#canvas-quiz-stats .bs-tooltip-auto[x-placement^=\"left\"] .arrow::before {\n  left: 0;\n  border-width: 0.4rem 0 0.4rem 0.4rem;\n  border-left-color: #000;\n}\n#canvas-quiz-stats .tooltip-inner {\n  max-width: 200px;\n  padding: 0.25rem 0.5rem;\n  color: #fff;\n  text-align: center;\n  background-color: #000;\n  border-radius: 0.25rem;\n}\n#canvas-quiz-stats .popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1060;\n  display: block;\n  max-width: 276px;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  font-style: normal;\n  font-weight: 400;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  letter-spacing: normal;\n  word-break: normal;\n  word-spacing: normal;\n  white-space: normal;\n  line-break: auto;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem;\n}\n#canvas-quiz-stats .popover .arrow {\n  position: absolute;\n  display: block;\n  width: 1rem;\n  height: 0.5rem;\n  margin: 0 0.3rem;\n}\n#canvas-quiz-stats .popover .arrow::before,\n#canvas-quiz-stats .popover .arrow::after {\n  position: absolute;\n  display: block;\n  content: \"\";\n  border-color: transparent;\n  border-style: solid;\n}\n#canvas-quiz-stats .bs-popover-top,\n#canvas-quiz-stats .bs-popover-auto[x-placement^=\"top\"] {\n  margin-bottom: 0.5rem;\n}\n#canvas-quiz-stats .bs-popover-top > .arrow,\n#canvas-quiz-stats .bs-popover-auto[x-placement^=\"top\"] > .arrow {\n  bottom: calc(-0.5rem - 1px);\n}\n#canvas-quiz-stats .bs-popover-top > .arrow::before,\n#canvas-quiz-stats .bs-popover-auto[x-placement^=\"top\"] > .arrow::before {\n  bottom: 0;\n  border-width: 0.5rem 0.5rem 0;\n  border-top-color: rgba(0, 0, 0, 0.25);\n}\n#canvas-quiz-stats .bs-popover-top > .arrow::after,\n#canvas-quiz-stats .bs-popover-auto[x-placement^=\"top\"] > .arrow::after {\n  bottom: 1px;\n  border-width: 0.5rem 0.5rem 0;\n  border-top-color: #fff;\n}\n#canvas-quiz-stats .bs-popover-right,\n#canvas-quiz-stats .bs-popover-auto[x-placement^=\"right\"] {\n  margin-left: 0.5rem;\n}\n#canvas-quiz-stats .bs-popover-right > .arrow,\n#canvas-quiz-stats .bs-popover-auto[x-placement^=\"right\"] > .arrow {\n  left: calc(-0.5rem - 1px);\n  width: 0.5rem;\n  height: 1rem;\n  margin: 0.3rem 0;\n}\n#canvas-quiz-stats .bs-popover-right > .arrow::before,\n#canvas-quiz-stats .bs-popover-auto[x-placement^=\"right\"] > .arrow::before {\n  left: 0;\n  border-width: 0.5rem 0.5rem 0.5rem 0;\n  border-right-color: rgba(0, 0, 0, 0.25);\n}\n#canvas-quiz-stats .bs-popover-right > .arrow::after,\n#canvas-quiz-stats .bs-popover-auto[x-placement^=\"right\"] > .arrow::after {\n  left: 1px;\n  border-width: 0.5rem 0.5rem 0.5rem 0;\n  border-right-color: #fff;\n}\n#canvas-quiz-stats .bs-popover-bottom,\n#canvas-quiz-stats .bs-popover-auto[x-placement^=\"bottom\"] {\n  margin-top: 0.5rem;\n}\n#canvas-quiz-stats .bs-popover-bottom > .arrow,\n#canvas-quiz-stats .bs-popover-auto[x-placement^=\"bottom\"] > .arrow {\n  top: calc(-0.5rem - 1px);\n}\n#canvas-quiz-stats .bs-popover-bottom > .arrow::before,\n#canvas-quiz-stats .bs-popover-auto[x-placement^=\"bottom\"] > .arrow::before {\n  top: 0;\n  border-width: 0 0.5rem 0.5rem 0.5rem;\n  border-bottom-color: rgba(0, 0, 0, 0.25);\n}\n#canvas-quiz-stats .bs-popover-bottom > .arrow::after,\n#canvas-quiz-stats .bs-popover-auto[x-placement^=\"bottom\"] > .arrow::after {\n  top: 1px;\n  border-width: 0 0.5rem 0.5rem 0.5rem;\n  border-bottom-color: #fff;\n}\n#canvas-quiz-stats .bs-popover-bottom .popover-header::before,\n#canvas-quiz-stats .bs-popover-auto[x-placement^=\"bottom\"] .popover-header::before {\n  position: absolute;\n  top: 0;\n  left: 50%;\n  display: block;\n  width: 1rem;\n  margin-left: -0.5rem;\n  content: \"\";\n  border-bottom: 1px solid #f7f7f7;\n}\n#canvas-quiz-stats .bs-popover-left,\n#canvas-quiz-stats .bs-popover-auto[x-placement^=\"left\"] {\n  margin-right: 0.5rem;\n}\n#canvas-quiz-stats .bs-popover-left > .arrow,\n#canvas-quiz-stats .bs-popover-auto[x-placement^=\"left\"] > .arrow {\n  right: calc(-0.5rem - 1px);\n  width: 0.5rem;\n  height: 1rem;\n  margin: 0.3rem 0;\n}\n#canvas-quiz-stats .bs-popover-left > .arrow::before,\n#canvas-quiz-stats .bs-popover-auto[x-placement^=\"left\"] > .arrow::before {\n  right: 0;\n  border-width: 0.5rem 0 0.5rem 0.5rem;\n  border-left-color: rgba(0, 0, 0, 0.25);\n}\n#canvas-quiz-stats .bs-popover-left > .arrow::after,\n#canvas-quiz-stats .bs-popover-auto[x-placement^=\"left\"] > .arrow::after {\n  right: 1px;\n  border-width: 0.5rem 0 0.5rem 0.5rem;\n  border-left-color: #fff;\n}\n#canvas-quiz-stats .popover-header {\n  padding: 0.5rem 0.75rem;\n  margin-bottom: 0;\n  font-size: 1rem;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  border-top-left-radius: calc(0.3rem - 1px);\n  border-top-right-radius: calc(0.3rem - 1px);\n}\n#canvas-quiz-stats .popover-header:empty {\n  display: none;\n}\n#canvas-quiz-stats .popover-body {\n  padding: 0.5rem 0.75rem;\n  color: #212529;\n}\n#canvas-quiz-stats .carousel {\n  position: relative;\n}\n#canvas-quiz-stats .carousel.pointer-event {\n  -ms-touch-action: pan-y;\n  touch-action: pan-y;\n}\n#canvas-quiz-stats .carousel-inner {\n  position: relative;\n  width: 100%;\n  overflow: hidden;\n}\n#canvas-quiz-stats .carousel-inner::after {\n  display: block;\n  clear: both;\n  content: \"\";\n}\n#canvas-quiz-stats .carousel-item {\n  position: relative;\n  display: none;\n  float: left;\n  width: 100%;\n  margin-right: -100%;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  transition: -webkit-transform 0.6s ease-in-out;\n  transition: transform 0.6s ease-in-out;\n  transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  #canvas-quiz-stats .carousel-item {\n    transition: none;\n  }\n}\n#canvas-quiz-stats .carousel-item.active,\n#canvas-quiz-stats .carousel-item-next,\n#canvas-quiz-stats .carousel-item-prev {\n  display: block;\n}\n#canvas-quiz-stats .carousel-item-next:not(.carousel-item-left),\n#canvas-quiz-stats .active.carousel-item-right {\n  -webkit-transform: translateX(100%);\n  transform: translateX(100%);\n}\n#canvas-quiz-stats .carousel-item-prev:not(.carousel-item-right),\n#canvas-quiz-stats .active.carousel-item-left {\n  -webkit-transform: translateX(-100%);\n  transform: translateX(-100%);\n}\n#canvas-quiz-stats .carousel-fade .carousel-item {\n  opacity: 0;\n  transition-property: opacity;\n  -webkit-transform: none;\n  transform: none;\n}\n#canvas-quiz-stats .carousel-fade .carousel-item.active,\n#canvas-quiz-stats .carousel-fade .carousel-item-next.carousel-item-left,\n#canvas-quiz-stats .carousel-fade .carousel-item-prev.carousel-item-right {\n  z-index: 1;\n  opacity: 1;\n}\n#canvas-quiz-stats .carousel-fade .active.carousel-item-left,\n#canvas-quiz-stats .carousel-fade .active.carousel-item-right {\n  z-index: 0;\n  opacity: 0;\n  transition: opacity 0s 0.6s;\n}\n@media (prefers-reduced-motion: reduce) {\n  #canvas-quiz-stats .carousel-fade .active.carousel-item-left,\n  #canvas-quiz-stats .carousel-fade .active.carousel-item-right {\n    transition: none;\n  }\n}\n#canvas-quiz-stats .carousel-control-prev,\n#canvas-quiz-stats .carousel-control-next {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  z-index: 1;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  width: 15%;\n  color: #fff;\n  text-align: center;\n  opacity: 0.5;\n  transition: opacity 0.15s ease;\n}\n@media (prefers-reduced-motion: reduce) {\n  #canvas-quiz-stats .carousel-control-prev,\n  #canvas-quiz-stats .carousel-control-next {\n    transition: none;\n  }\n}\n#canvas-quiz-stats .carousel-control-prev:hover,\n#canvas-quiz-stats .carousel-control-prev:focus,\n#canvas-quiz-stats .carousel-control-next:hover,\n#canvas-quiz-stats .carousel-control-next:focus {\n  color: #fff;\n  text-decoration: none;\n  outline: 0;\n  opacity: 0.9;\n}\n#canvas-quiz-stats .carousel-control-prev {\n  left: 0;\n}\n#canvas-quiz-stats .carousel-control-next {\n  right: 0;\n}\n#canvas-quiz-stats .carousel-control-prev-icon,\n#canvas-quiz-stats .carousel-control-next-icon {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  background: no-repeat 50% / 100% 100%;\n}\n#canvas-quiz-stats .carousel-control-prev-icon {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath d='M5.25 0l-4 4 4 4 1.5-1.5L4.25 4l2.5-2.5L5.25 0z'/%3e%3c/svg%3e\");\n}\n#canvas-quiz-stats .carousel-control-next-icon {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath d='M2.75 0l-1.5 1.5L3.75 4l-2.5 2.5L2.75 8l4-4-4-4z'/%3e%3c/svg%3e\");\n}\n#canvas-quiz-stats .carousel-indicators {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 15;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n  justify-content: center;\n  padding-left: 0;\n  margin-right: 15%;\n  margin-left: 15%;\n  list-style: none;\n}\n#canvas-quiz-stats .carousel-indicators li {\n  box-sizing: content-box;\n  -ms-flex: 0 1 auto;\n  flex: 0 1 auto;\n  width: 30px;\n  height: 3px;\n  margin-right: 3px;\n  margin-left: 3px;\n  text-indent: -999px;\n  cursor: pointer;\n  background-color: #fff;\n  background-clip: padding-box;\n  border-top: 10px solid transparent;\n  border-bottom: 10px solid transparent;\n  opacity: 0.5;\n  transition: opacity 0.6s ease;\n}\n@media (prefers-reduced-motion: reduce) {\n  #canvas-quiz-stats .carousel-indicators li {\n    transition: none;\n  }\n}\n#canvas-quiz-stats .carousel-indicators .active {\n  opacity: 1;\n}\n#canvas-quiz-stats .carousel-caption {\n  position: absolute;\n  right: 15%;\n  bottom: 20px;\n  left: 15%;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #fff;\n  text-align: center;\n}\n@-webkit-keyframes spinner-border {\n  to {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n@keyframes spinner-border {\n  to {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n#canvas-quiz-stats .spinner-border {\n  display: inline-block;\n  width: 2rem;\n  height: 2rem;\n  vertical-align: text-bottom;\n  border: 0.25em solid currentColor;\n  border-right-color: transparent;\n  border-radius: 50%;\n  -webkit-animation: spinner-border 0.75s linear infinite;\n  animation: spinner-border 0.75s linear infinite;\n}\n#canvas-quiz-stats .spinner-border-sm {\n  width: 1rem;\n  height: 1rem;\n  border-width: 0.2em;\n}\n@-webkit-keyframes spinner-grow {\n  0% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n@keyframes spinner-grow {\n  0% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n#canvas-quiz-stats .spinner-grow {\n  display: inline-block;\n  width: 2rem;\n  height: 2rem;\n  vertical-align: text-bottom;\n  background-color: currentColor;\n  border-radius: 50%;\n  opacity: 0;\n  -webkit-animation: spinner-grow 0.75s linear infinite;\n  animation: spinner-grow 0.75s linear infinite;\n}\n#canvas-quiz-stats .spinner-grow-sm {\n  width: 1rem;\n  height: 1rem;\n}\n#canvas-quiz-stats .align-baseline {\n  vertical-align: baseline !important;\n}\n#canvas-quiz-stats .align-top {\n  vertical-align: top !important;\n}\n#canvas-quiz-stats .align-middle {\n  vertical-align: middle !important;\n}\n#canvas-quiz-stats .align-bottom {\n  vertical-align: bottom !important;\n}\n#canvas-quiz-stats .align-text-bottom {\n  vertical-align: text-bottom !important;\n}\n#canvas-quiz-stats .align-text-top {\n  vertical-align: text-top !important;\n}\n#canvas-quiz-stats .bg-primary {\n  background-color: #007bff !important;\n}\n#canvas-quiz-stats a.bg-primary:hover,\n#canvas-quiz-stats a.bg-primary:focus,\n#canvas-quiz-stats button.bg-primary:hover,\n#canvas-quiz-stats button.bg-primary:focus {\n  background-color: #0062cc !important;\n}\n#canvas-quiz-stats .bg-secondary {\n  background-color: #6c757d !important;\n}\n#canvas-quiz-stats a.bg-secondary:hover,\n#canvas-quiz-stats a.bg-secondary:focus,\n#canvas-quiz-stats button.bg-secondary:hover,\n#canvas-quiz-stats button.bg-secondary:focus {\n  background-color: #545b62 !important;\n}\n#canvas-quiz-stats .bg-success {\n  background-color: #28a745 !important;\n}\n#canvas-quiz-stats a.bg-success:hover,\n#canvas-quiz-stats a.bg-success:focus,\n#canvas-quiz-stats button.bg-success:hover,\n#canvas-quiz-stats button.bg-success:focus {\n  background-color: #1e7e34 !important;\n}\n#canvas-quiz-stats .bg-info {\n  background-color: #17a2b8 !important;\n}\n#canvas-quiz-stats a.bg-info:hover,\n#canvas-quiz-stats a.bg-info:focus,\n#canvas-quiz-stats button.bg-info:hover,\n#canvas-quiz-stats button.bg-info:focus {\n  background-color: #117a8b !important;\n}\n#canvas-quiz-stats .bg-warning {\n  background-color: #ffc107 !important;\n}\n#canvas-quiz-stats a.bg-warning:hover,\n#canvas-quiz-stats a.bg-warning:focus,\n#canvas-quiz-stats button.bg-warning:hover,\n#canvas-quiz-stats button.bg-warning:focus {\n  background-color: #d39e00 !important;\n}\n#canvas-quiz-stats .bg-danger {\n  background-color: #dc3545 !important;\n}\n#canvas-quiz-stats a.bg-danger:hover,\n#canvas-quiz-stats a.bg-danger:focus,\n#canvas-quiz-stats button.bg-danger:hover,\n#canvas-quiz-stats button.bg-danger:focus {\n  background-color: #bd2130 !important;\n}\n#canvas-quiz-stats .bg-light {\n  background-color: #f8f9fa !important;\n}\n#canvas-quiz-stats a.bg-light:hover,\n#canvas-quiz-stats a.bg-light:focus,\n#canvas-quiz-stats button.bg-light:hover,\n#canvas-quiz-stats button.bg-light:focus {\n  background-color: #dae0e5 !important;\n}\n#canvas-quiz-stats .bg-dark {\n  background-color: #343a40 !important;\n}\n#canvas-quiz-stats a.bg-dark:hover,\n#canvas-quiz-stats a.bg-dark:focus,\n#canvas-quiz-stats button.bg-dark:hover,\n#canvas-quiz-stats button.bg-dark:focus {\n  background-color: #1d2124 !important;\n}\n#canvas-quiz-stats .bg-white {\n  background-color: #fff !important;\n}\n#canvas-quiz-stats .bg-transparent {\n  background-color: transparent !important;\n}\n#canvas-quiz-stats .border {\n  border: 1px solid #dee2e6 !important;\n}\n#canvas-quiz-stats .border-top {\n  border-top: 1px solid #dee2e6 !important;\n}\n#canvas-quiz-stats .border-right {\n  border-right: 1px solid #dee2e6 !important;\n}\n#canvas-quiz-stats .border-bottom {\n  border-bottom: 1px solid #dee2e6 !important;\n}\n#canvas-quiz-stats .border-left {\n  border-left: 1px solid #dee2e6 !important;\n}\n#canvas-quiz-stats .border-0 {\n  border: 0 !important;\n}\n#canvas-quiz-stats .border-top-0 {\n  border-top: 0 !important;\n}\n#canvas-quiz-stats .border-right-0 {\n  border-right: 0 !important;\n}\n#canvas-quiz-stats .border-bottom-0 {\n  border-bottom: 0 !important;\n}\n#canvas-quiz-stats .border-left-0 {\n  border-left: 0 !important;\n}\n#canvas-quiz-stats .border-primary {\n  border-color: #007bff !important;\n}\n#canvas-quiz-stats .border-secondary {\n  border-color: #6c757d !important;\n}\n#canvas-quiz-stats .border-success {\n  border-color: #28a745 !important;\n}\n#canvas-quiz-stats .border-info {\n  border-color: #17a2b8 !important;\n}\n#canvas-quiz-stats .border-warning {\n  border-color: #ffc107 !important;\n}\n#canvas-quiz-stats .border-danger {\n  border-color: #dc3545 !important;\n}\n#canvas-quiz-stats .border-light {\n  border-color: #f8f9fa !important;\n}\n#canvas-quiz-stats .border-dark {\n  border-color: #343a40 !important;\n}\n#canvas-quiz-stats .border-white {\n  border-color: #fff !important;\n}\n#canvas-quiz-stats .rounded-sm {\n  border-radius: 0.2rem !important;\n}\n#canvas-quiz-stats .rounded {\n  border-radius: 0.25rem !important;\n}\n#canvas-quiz-stats .rounded-top {\n  border-top-left-radius: 0.25rem !important;\n  border-top-right-radius: 0.25rem !important;\n}\n#canvas-quiz-stats .rounded-right {\n  border-top-right-radius: 0.25rem !important;\n  border-bottom-right-radius: 0.25rem !important;\n}\n#canvas-quiz-stats .rounded-bottom {\n  border-bottom-right-radius: 0.25rem !important;\n  border-bottom-left-radius: 0.25rem !important;\n}\n#canvas-quiz-stats .rounded-left {\n  border-top-left-radius: 0.25rem !important;\n  border-bottom-left-radius: 0.25rem !important;\n}\n#canvas-quiz-stats .rounded-lg {\n  border-radius: 0.3rem !important;\n}\n#canvas-quiz-stats .rounded-circle {\n  border-radius: 50% !important;\n}\n#canvas-quiz-stats .rounded-pill {\n  border-radius: 50rem !important;\n}\n#canvas-quiz-stats .rounded-0 {\n  border-radius: 0 !important;\n}\n#canvas-quiz-stats .clearfix::after {\n  display: block;\n  clear: both;\n  content: \"\";\n}\n#canvas-quiz-stats .d-none {\n  display: none !important;\n}\n#canvas-quiz-stats .d-inline {\n  display: inline !important;\n}\n#canvas-quiz-stats .d-inline-block {\n  display: inline-block !important;\n}\n#canvas-quiz-stats .d-block {\n  display: block !important;\n}\n#canvas-quiz-stats .d-table {\n  display: table !important;\n}\n#canvas-quiz-stats .d-table-row {\n  display: table-row !important;\n}\n#canvas-quiz-stats .d-table-cell {\n  display: table-cell !important;\n}\n#canvas-quiz-stats .d-flex {\n  display: -ms-flexbox !important;\n  display: flex !important;\n}\n#canvas-quiz-stats .d-inline-flex {\n  display: -ms-inline-flexbox !important;\n  display: inline-flex !important;\n}\n@media (min-width: 576px) {\n  #canvas-quiz-stats .d-sm-none {\n    display: none !important;\n  }\n  #canvas-quiz-stats .d-sm-inline {\n    display: inline !important;\n  }\n  #canvas-quiz-stats .d-sm-inline-block {\n    display: inline-block !important;\n  }\n  #canvas-quiz-stats .d-sm-block {\n    display: block !important;\n  }\n  #canvas-quiz-stats .d-sm-table {\n    display: table !important;\n  }\n  #canvas-quiz-stats .d-sm-table-row {\n    display: table-row !important;\n  }\n  #canvas-quiz-stats .d-sm-table-cell {\n    display: table-cell !important;\n  }\n  #canvas-quiz-stats .d-sm-flex {\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n  #canvas-quiz-stats .d-sm-inline-flex {\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n@media (min-width: 768px) {\n  #canvas-quiz-stats .d-md-none {\n    display: none !important;\n  }\n  #canvas-quiz-stats .d-md-inline {\n    display: inline !important;\n  }\n  #canvas-quiz-stats .d-md-inline-block {\n    display: inline-block !important;\n  }\n  #canvas-quiz-stats .d-md-block {\n    display: block !important;\n  }\n  #canvas-quiz-stats .d-md-table {\n    display: table !important;\n  }\n  #canvas-quiz-stats .d-md-table-row {\n    display: table-row !important;\n  }\n  #canvas-quiz-stats .d-md-table-cell {\n    display: table-cell !important;\n  }\n  #canvas-quiz-stats .d-md-flex {\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n  #canvas-quiz-stats .d-md-inline-flex {\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n@media (min-width: 992px) {\n  #canvas-quiz-stats .d-lg-none {\n    display: none !important;\n  }\n  #canvas-quiz-stats .d-lg-inline {\n    display: inline !important;\n  }\n  #canvas-quiz-stats .d-lg-inline-block {\n    display: inline-block !important;\n  }\n  #canvas-quiz-stats .d-lg-block {\n    display: block !important;\n  }\n  #canvas-quiz-stats .d-lg-table {\n    display: table !important;\n  }\n  #canvas-quiz-stats .d-lg-table-row {\n    display: table-row !important;\n  }\n  #canvas-quiz-stats .d-lg-table-cell {\n    display: table-cell !important;\n  }\n  #canvas-quiz-stats .d-lg-flex {\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n  #canvas-quiz-stats .d-lg-inline-flex {\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n@media (min-width: 1200px) {\n  #canvas-quiz-stats .d-xl-none {\n    display: none !important;\n  }\n  #canvas-quiz-stats .d-xl-inline {\n    display: inline !important;\n  }\n  #canvas-quiz-stats .d-xl-inline-block {\n    display: inline-block !important;\n  }\n  #canvas-quiz-stats .d-xl-block {\n    display: block !important;\n  }\n  #canvas-quiz-stats .d-xl-table {\n    display: table !important;\n  }\n  #canvas-quiz-stats .d-xl-table-row {\n    display: table-row !important;\n  }\n  #canvas-quiz-stats .d-xl-table-cell {\n    display: table-cell !important;\n  }\n  #canvas-quiz-stats .d-xl-flex {\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n  #canvas-quiz-stats .d-xl-inline-flex {\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n@media print {\n  #canvas-quiz-stats .d-print-none {\n    display: none !important;\n  }\n  #canvas-quiz-stats .d-print-inline {\n    display: inline !important;\n  }\n  #canvas-quiz-stats .d-print-inline-block {\n    display: inline-block !important;\n  }\n  #canvas-quiz-stats .d-print-block {\n    display: block !important;\n  }\n  #canvas-quiz-stats .d-print-table {\n    display: table !important;\n  }\n  #canvas-quiz-stats .d-print-table-row {\n    display: table-row !important;\n  }\n  #canvas-quiz-stats .d-print-table-cell {\n    display: table-cell !important;\n  }\n  #canvas-quiz-stats .d-print-flex {\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n  #canvas-quiz-stats .d-print-inline-flex {\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n#canvas-quiz-stats .embed-responsive {\n  position: relative;\n  display: block;\n  width: 100%;\n  padding: 0;\n  overflow: hidden;\n}\n#canvas-quiz-stats .embed-responsive::before {\n  display: block;\n  content: \"\";\n}\n#canvas-quiz-stats .embed-responsive .embed-responsive-item,\n#canvas-quiz-stats .embed-responsive iframe,\n#canvas-quiz-stats .embed-responsive embed,\n#canvas-quiz-stats .embed-responsive object,\n#canvas-quiz-stats .embed-responsive video {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border: 0;\n}\n#canvas-quiz-stats .embed-responsive-21by9::before {\n  padding-top: 42.857143%;\n}\n#canvas-quiz-stats .embed-responsive-16by9::before {\n  padding-top: 56.25%;\n}\n#canvas-quiz-stats .embed-responsive-4by3::before {\n  padding-top: 75%;\n}\n#canvas-quiz-stats .embed-responsive-1by1::before {\n  padding-top: 100%;\n}\n#canvas-quiz-stats .flex-row {\n  -ms-flex-direction: row !important;\n  flex-direction: row !important;\n}\n#canvas-quiz-stats .flex-column {\n  -ms-flex-direction: column !important;\n  flex-direction: column !important;\n}\n#canvas-quiz-stats .flex-row-reverse {\n  -ms-flex-direction: row-reverse !important;\n  flex-direction: row-reverse !important;\n}\n#canvas-quiz-stats .flex-column-reverse {\n  -ms-flex-direction: column-reverse !important;\n  flex-direction: column-reverse !important;\n}\n#canvas-quiz-stats .flex-wrap {\n  -ms-flex-wrap: wrap !important;\n  flex-wrap: wrap !important;\n}\n#canvas-quiz-stats .flex-nowrap {\n  -ms-flex-wrap: nowrap !important;\n  flex-wrap: nowrap !important;\n}\n#canvas-quiz-stats .flex-wrap-reverse {\n  -ms-flex-wrap: wrap-reverse !important;\n  flex-wrap: wrap-reverse !important;\n}\n#canvas-quiz-stats .flex-fill {\n  -ms-flex: 1 1 auto !important;\n  flex: 1 1 auto !important;\n}\n#canvas-quiz-stats .flex-grow-0 {\n  -ms-flex-positive: 0 !important;\n  flex-grow: 0 !important;\n}\n#canvas-quiz-stats .flex-grow-1 {\n  -ms-flex-positive: 1 !important;\n  flex-grow: 1 !important;\n}\n#canvas-quiz-stats .flex-shrink-0 {\n  -ms-flex-negative: 0 !important;\n  flex-shrink: 0 !important;\n}\n#canvas-quiz-stats .flex-shrink-1 {\n  -ms-flex-negative: 1 !important;\n  flex-shrink: 1 !important;\n}\n#canvas-quiz-stats .justify-content-start {\n  -ms-flex-pack: start !important;\n  justify-content: flex-start !important;\n}\n#canvas-quiz-stats .justify-content-end {\n  -ms-flex-pack: end !important;\n  justify-content: flex-end !important;\n}\n#canvas-quiz-stats .justify-content-center {\n  -ms-flex-pack: center !important;\n  justify-content: center !important;\n}\n#canvas-quiz-stats .justify-content-between {\n  -ms-flex-pack: justify !important;\n  justify-content: space-between !important;\n}\n#canvas-quiz-stats .justify-content-around {\n  -ms-flex-pack: distribute !important;\n  justify-content: space-around !important;\n}\n#canvas-quiz-stats .align-items-start {\n  -ms-flex-align: start !important;\n  align-items: flex-start !important;\n}\n#canvas-quiz-stats .align-items-end {\n  -ms-flex-align: end !important;\n  align-items: flex-end !important;\n}\n#canvas-quiz-stats .align-items-center {\n  -ms-flex-align: center !important;\n  align-items: center !important;\n}\n#canvas-quiz-stats .align-items-baseline {\n  -ms-flex-align: baseline !important;\n  align-items: baseline !important;\n}\n#canvas-quiz-stats .align-items-stretch {\n  -ms-flex-align: stretch !important;\n  align-items: stretch !important;\n}\n#canvas-quiz-stats .align-content-start {\n  -ms-flex-line-pack: start !important;\n  align-content: flex-start !important;\n}\n#canvas-quiz-stats .align-content-end {\n  -ms-flex-line-pack: end !important;\n  align-content: flex-end !important;\n}\n#canvas-quiz-stats .align-content-center {\n  -ms-flex-line-pack: center !important;\n  align-content: center !important;\n}\n#canvas-quiz-stats .align-content-between {\n  -ms-flex-line-pack: justify !important;\n  align-content: space-between !important;\n}\n#canvas-quiz-stats .align-content-around {\n  -ms-flex-line-pack: distribute !important;\n  align-content: space-around !important;\n}\n#canvas-quiz-stats .align-content-stretch {\n  -ms-flex-line-pack: stretch !important;\n  align-content: stretch !important;\n}\n#canvas-quiz-stats .align-self-auto {\n  -ms-flex-item-align: auto !important;\n  align-self: auto !important;\n}\n#canvas-quiz-stats .align-self-start {\n  -ms-flex-item-align: start !important;\n  align-self: flex-start !important;\n}\n#canvas-quiz-stats .align-self-end {\n  -ms-flex-item-align: end !important;\n  align-self: flex-end !important;\n}\n#canvas-quiz-stats .align-self-center {\n  -ms-flex-item-align: center !important;\n  align-self: center !important;\n}\n#canvas-quiz-stats .align-self-baseline {\n  -ms-flex-item-align: baseline !important;\n  align-self: baseline !important;\n}\n#canvas-quiz-stats .align-self-stretch {\n  -ms-flex-item-align: stretch !important;\n  align-self: stretch !important;\n}\n@media (min-width: 576px) {\n  #canvas-quiz-stats .flex-sm-row {\n    -ms-flex-direction: row !important;\n    flex-direction: row !important;\n  }\n  #canvas-quiz-stats .flex-sm-column {\n    -ms-flex-direction: column !important;\n    flex-direction: column !important;\n  }\n  #canvas-quiz-stats .flex-sm-row-reverse {\n    -ms-flex-direction: row-reverse !important;\n    flex-direction: row-reverse !important;\n  }\n  #canvas-quiz-stats .flex-sm-column-reverse {\n    -ms-flex-direction: column-reverse !important;\n    flex-direction: column-reverse !important;\n  }\n  #canvas-quiz-stats .flex-sm-wrap {\n    -ms-flex-wrap: wrap !important;\n    flex-wrap: wrap !important;\n  }\n  #canvas-quiz-stats .flex-sm-nowrap {\n    -ms-flex-wrap: nowrap !important;\n    flex-wrap: nowrap !important;\n  }\n  #canvas-quiz-stats .flex-sm-wrap-reverse {\n    -ms-flex-wrap: wrap-reverse !important;\n    flex-wrap: wrap-reverse !important;\n  }\n  #canvas-quiz-stats .flex-sm-fill {\n    -ms-flex: 1 1 auto !important;\n    flex: 1 1 auto !important;\n  }\n  #canvas-quiz-stats .flex-sm-grow-0 {\n    -ms-flex-positive: 0 !important;\n    flex-grow: 0 !important;\n  }\n  #canvas-quiz-stats .flex-sm-grow-1 {\n    -ms-flex-positive: 1 !important;\n    flex-grow: 1 !important;\n  }\n  #canvas-quiz-stats .flex-sm-shrink-0 {\n    -ms-flex-negative: 0 !important;\n    flex-shrink: 0 !important;\n  }\n  #canvas-quiz-stats .flex-sm-shrink-1 {\n    -ms-flex-negative: 1 !important;\n    flex-shrink: 1 !important;\n  }\n  #canvas-quiz-stats .justify-content-sm-start {\n    -ms-flex-pack: start !important;\n    justify-content: flex-start !important;\n  }\n  #canvas-quiz-stats .justify-content-sm-end {\n    -ms-flex-pack: end !important;\n    justify-content: flex-end !important;\n  }\n  #canvas-quiz-stats .justify-content-sm-center {\n    -ms-flex-pack: center !important;\n    justify-content: center !important;\n  }\n  #canvas-quiz-stats .justify-content-sm-between {\n    -ms-flex-pack: justify !important;\n    justify-content: space-between !important;\n  }\n  #canvas-quiz-stats .justify-content-sm-around {\n    -ms-flex-pack: distribute !important;\n    justify-content: space-around !important;\n  }\n  #canvas-quiz-stats .align-items-sm-start {\n    -ms-flex-align: start !important;\n    align-items: flex-start !important;\n  }\n  #canvas-quiz-stats .align-items-sm-end {\n    -ms-flex-align: end !important;\n    align-items: flex-end !important;\n  }\n  #canvas-quiz-stats .align-items-sm-center {\n    -ms-flex-align: center !important;\n    align-items: center !important;\n  }\n  #canvas-quiz-stats .align-items-sm-baseline {\n    -ms-flex-align: baseline !important;\n    align-items: baseline !important;\n  }\n  #canvas-quiz-stats .align-items-sm-stretch {\n    -ms-flex-align: stretch !important;\n    align-items: stretch !important;\n  }\n  #canvas-quiz-stats .align-content-sm-start {\n    -ms-flex-line-pack: start !important;\n    align-content: flex-start !important;\n  }\n  #canvas-quiz-stats .align-content-sm-end {\n    -ms-flex-line-pack: end !important;\n    align-content: flex-end !important;\n  }\n  #canvas-quiz-stats .align-content-sm-center {\n    -ms-flex-line-pack: center !important;\n    align-content: center !important;\n  }\n  #canvas-quiz-stats .align-content-sm-between {\n    -ms-flex-line-pack: justify !important;\n    align-content: space-between !important;\n  }\n  #canvas-quiz-stats .align-content-sm-around {\n    -ms-flex-line-pack: distribute !important;\n    align-content: space-around !important;\n  }\n  #canvas-quiz-stats .align-content-sm-stretch {\n    -ms-flex-line-pack: stretch !important;\n    align-content: stretch !important;\n  }\n  #canvas-quiz-stats .align-self-sm-auto {\n    -ms-flex-item-align: auto !important;\n    align-self: auto !important;\n  }\n  #canvas-quiz-stats .align-self-sm-start {\n    -ms-flex-item-align: start !important;\n    align-self: flex-start !important;\n  }\n  #canvas-quiz-stats .align-self-sm-end {\n    -ms-flex-item-align: end !important;\n    align-self: flex-end !important;\n  }\n  #canvas-quiz-stats .align-self-sm-center {\n    -ms-flex-item-align: center !important;\n    align-self: center !important;\n  }\n  #canvas-quiz-stats .align-self-sm-baseline {\n    -ms-flex-item-align: baseline !important;\n    align-self: baseline !important;\n  }\n  #canvas-quiz-stats .align-self-sm-stretch {\n    -ms-flex-item-align: stretch !important;\n    align-self: stretch !important;\n  }\n}\n@media (min-width: 768px) {\n  #canvas-quiz-stats .flex-md-row {\n    -ms-flex-direction: row !important;\n    flex-direction: row !important;\n  }\n  #canvas-quiz-stats .flex-md-column {\n    -ms-flex-direction: column !important;\n    flex-direction: column !important;\n  }\n  #canvas-quiz-stats .flex-md-row-reverse {\n    -ms-flex-direction: row-reverse !important;\n    flex-direction: row-reverse !important;\n  }\n  #canvas-quiz-stats .flex-md-column-reverse {\n    -ms-flex-direction: column-reverse !important;\n    flex-direction: column-reverse !important;\n  }\n  #canvas-quiz-stats .flex-md-wrap {\n    -ms-flex-wrap: wrap !important;\n    flex-wrap: wrap !important;\n  }\n  #canvas-quiz-stats .flex-md-nowrap {\n    -ms-flex-wrap: nowrap !important;\n    flex-wrap: nowrap !important;\n  }\n  #canvas-quiz-stats .flex-md-wrap-reverse {\n    -ms-flex-wrap: wrap-reverse !important;\n    flex-wrap: wrap-reverse !important;\n  }\n  #canvas-quiz-stats .flex-md-fill {\n    -ms-flex: 1 1 auto !important;\n    flex: 1 1 auto !important;\n  }\n  #canvas-quiz-stats .flex-md-grow-0 {\n    -ms-flex-positive: 0 !important;\n    flex-grow: 0 !important;\n  }\n  #canvas-quiz-stats .flex-md-grow-1 {\n    -ms-flex-positive: 1 !important;\n    flex-grow: 1 !important;\n  }\n  #canvas-quiz-stats .flex-md-shrink-0 {\n    -ms-flex-negative: 0 !important;\n    flex-shrink: 0 !important;\n  }\n  #canvas-quiz-stats .flex-md-shrink-1 {\n    -ms-flex-negative: 1 !important;\n    flex-shrink: 1 !important;\n  }\n  #canvas-quiz-stats .justify-content-md-start {\n    -ms-flex-pack: start !important;\n    justify-content: flex-start !important;\n  }\n  #canvas-quiz-stats .justify-content-md-end {\n    -ms-flex-pack: end !important;\n    justify-content: flex-end !important;\n  }\n  #canvas-quiz-stats .justify-content-md-center {\n    -ms-flex-pack: center !important;\n    justify-content: center !important;\n  }\n  #canvas-quiz-stats .justify-content-md-between {\n    -ms-flex-pack: justify !important;\n    justify-content: space-between !important;\n  }\n  #canvas-quiz-stats .justify-content-md-around {\n    -ms-flex-pack: distribute !important;\n    justify-content: space-around !important;\n  }\n  #canvas-quiz-stats .align-items-md-start {\n    -ms-flex-align: start !important;\n    align-items: flex-start !important;\n  }\n  #canvas-quiz-stats .align-items-md-end {\n    -ms-flex-align: end !important;\n    align-items: flex-end !important;\n  }\n  #canvas-quiz-stats .align-items-md-center {\n    -ms-flex-align: center !important;\n    align-items: center !important;\n  }\n  #canvas-quiz-stats .align-items-md-baseline {\n    -ms-flex-align: baseline !important;\n    align-items: baseline !important;\n  }\n  #canvas-quiz-stats .align-items-md-stretch {\n    -ms-flex-align: stretch !important;\n    align-items: stretch !important;\n  }\n  #canvas-quiz-stats .align-content-md-start {\n    -ms-flex-line-pack: start !important;\n    align-content: flex-start !important;\n  }\n  #canvas-quiz-stats .align-content-md-end {\n    -ms-flex-line-pack: end !important;\n    align-content: flex-end !important;\n  }\n  #canvas-quiz-stats .align-content-md-center {\n    -ms-flex-line-pack: center !important;\n    align-content: center !important;\n  }\n  #canvas-quiz-stats .align-content-md-between {\n    -ms-flex-line-pack: justify !important;\n    align-content: space-between !important;\n  }\n  #canvas-quiz-stats .align-content-md-around {\n    -ms-flex-line-pack: distribute !important;\n    align-content: space-around !important;\n  }\n  #canvas-quiz-stats .align-content-md-stretch {\n    -ms-flex-line-pack: stretch !important;\n    align-content: stretch !important;\n  }\n  #canvas-quiz-stats .align-self-md-auto {\n    -ms-flex-item-align: auto !important;\n    align-self: auto !important;\n  }\n  #canvas-quiz-stats .align-self-md-start {\n    -ms-flex-item-align: start !important;\n    align-self: flex-start !important;\n  }\n  #canvas-quiz-stats .align-self-md-end {\n    -ms-flex-item-align: end !important;\n    align-self: flex-end !important;\n  }\n  #canvas-quiz-stats .align-self-md-center {\n    -ms-flex-item-align: center !important;\n    align-self: center !important;\n  }\n  #canvas-quiz-stats .align-self-md-baseline {\n    -ms-flex-item-align: baseline !important;\n    align-self: baseline !important;\n  }\n  #canvas-quiz-stats .align-self-md-stretch {\n    -ms-flex-item-align: stretch !important;\n    align-self: stretch !important;\n  }\n}\n@media (min-width: 992px) {\n  #canvas-quiz-stats .flex-lg-row {\n    -ms-flex-direction: row !important;\n    flex-direction: row !important;\n  }\n  #canvas-quiz-stats .flex-lg-column {\n    -ms-flex-direction: column !important;\n    flex-direction: column !important;\n  }\n  #canvas-quiz-stats .flex-lg-row-reverse {\n    -ms-flex-direction: row-reverse !important;\n    flex-direction: row-reverse !important;\n  }\n  #canvas-quiz-stats .flex-lg-column-reverse {\n    -ms-flex-direction: column-reverse !important;\n    flex-direction: column-reverse !important;\n  }\n  #canvas-quiz-stats .flex-lg-wrap {\n    -ms-flex-wrap: wrap !important;\n    flex-wrap: wrap !important;\n  }\n  #canvas-quiz-stats .flex-lg-nowrap {\n    -ms-flex-wrap: nowrap !important;\n    flex-wrap: nowrap !important;\n  }\n  #canvas-quiz-stats .flex-lg-wrap-reverse {\n    -ms-flex-wrap: wrap-reverse !important;\n    flex-wrap: wrap-reverse !important;\n  }\n  #canvas-quiz-stats .flex-lg-fill {\n    -ms-flex: 1 1 auto !important;\n    flex: 1 1 auto !important;\n  }\n  #canvas-quiz-stats .flex-lg-grow-0 {\n    -ms-flex-positive: 0 !important;\n    flex-grow: 0 !important;\n  }\n  #canvas-quiz-stats .flex-lg-grow-1 {\n    -ms-flex-positive: 1 !important;\n    flex-grow: 1 !important;\n  }\n  #canvas-quiz-stats .flex-lg-shrink-0 {\n    -ms-flex-negative: 0 !important;\n    flex-shrink: 0 !important;\n  }\n  #canvas-quiz-stats .flex-lg-shrink-1 {\n    -ms-flex-negative: 1 !important;\n    flex-shrink: 1 !important;\n  }\n  #canvas-quiz-stats .justify-content-lg-start {\n    -ms-flex-pack: start !important;\n    justify-content: flex-start !important;\n  }\n  #canvas-quiz-stats .justify-content-lg-end {\n    -ms-flex-pack: end !important;\n    justify-content: flex-end !important;\n  }\n  #canvas-quiz-stats .justify-content-lg-center {\n    -ms-flex-pack: center !important;\n    justify-content: center !important;\n  }\n  #canvas-quiz-stats .justify-content-lg-between {\n    -ms-flex-pack: justify !important;\n    justify-content: space-between !important;\n  }\n  #canvas-quiz-stats .justify-content-lg-around {\n    -ms-flex-pack: distribute !important;\n    justify-content: space-around !important;\n  }\n  #canvas-quiz-stats .align-items-lg-start {\n    -ms-flex-align: start !important;\n    align-items: flex-start !important;\n  }\n  #canvas-quiz-stats .align-items-lg-end {\n    -ms-flex-align: end !important;\n    align-items: flex-end !important;\n  }\n  #canvas-quiz-stats .align-items-lg-center {\n    -ms-flex-align: center !important;\n    align-items: center !important;\n  }\n  #canvas-quiz-stats .align-items-lg-baseline {\n    -ms-flex-align: baseline !important;\n    align-items: baseline !important;\n  }\n  #canvas-quiz-stats .align-items-lg-stretch {\n    -ms-flex-align: stretch !important;\n    align-items: stretch !important;\n  }\n  #canvas-quiz-stats .align-content-lg-start {\n    -ms-flex-line-pack: start !important;\n    align-content: flex-start !important;\n  }\n  #canvas-quiz-stats .align-content-lg-end {\n    -ms-flex-line-pack: end !important;\n    align-content: flex-end !important;\n  }\n  #canvas-quiz-stats .align-content-lg-center {\n    -ms-flex-line-pack: center !important;\n    align-content: center !important;\n  }\n  #canvas-quiz-stats .align-content-lg-between {\n    -ms-flex-line-pack: justify !important;\n    align-content: space-between !important;\n  }\n  #canvas-quiz-stats .align-content-lg-around {\n    -ms-flex-line-pack: distribute !important;\n    align-content: space-around !important;\n  }\n  #canvas-quiz-stats .align-content-lg-stretch {\n    -ms-flex-line-pack: stretch !important;\n    align-content: stretch !important;\n  }\n  #canvas-quiz-stats .align-self-lg-auto {\n    -ms-flex-item-align: auto !important;\n    align-self: auto !important;\n  }\n  #canvas-quiz-stats .align-self-lg-start {\n    -ms-flex-item-align: start !important;\n    align-self: flex-start !important;\n  }\n  #canvas-quiz-stats .align-self-lg-end {\n    -ms-flex-item-align: end !important;\n    align-self: flex-end !important;\n  }\n  #canvas-quiz-stats .align-self-lg-center {\n    -ms-flex-item-align: center !important;\n    align-self: center !important;\n  }\n  #canvas-quiz-stats .align-self-lg-baseline {\n    -ms-flex-item-align: baseline !important;\n    align-self: baseline !important;\n  }\n  #canvas-quiz-stats .align-self-lg-stretch {\n    -ms-flex-item-align: stretch !important;\n    align-self: stretch !important;\n  }\n}\n@media (min-width: 1200px) {\n  #canvas-quiz-stats .flex-xl-row {\n    -ms-flex-direction: row !important;\n    flex-direction: row !important;\n  }\n  #canvas-quiz-stats .flex-xl-column {\n    -ms-flex-direction: column !important;\n    flex-direction: column !important;\n  }\n  #canvas-quiz-stats .flex-xl-row-reverse {\n    -ms-flex-direction: row-reverse !important;\n    flex-direction: row-reverse !important;\n  }\n  #canvas-quiz-stats .flex-xl-column-reverse {\n    -ms-flex-direction: column-reverse !important;\n    flex-direction: column-reverse !important;\n  }\n  #canvas-quiz-stats .flex-xl-wrap {\n    -ms-flex-wrap: wrap !important;\n    flex-wrap: wrap !important;\n  }\n  #canvas-quiz-stats .flex-xl-nowrap {\n    -ms-flex-wrap: nowrap !important;\n    flex-wrap: nowrap !important;\n  }\n  #canvas-quiz-stats .flex-xl-wrap-reverse {\n    -ms-flex-wrap: wrap-reverse !important;\n    flex-wrap: wrap-reverse !important;\n  }\n  #canvas-quiz-stats .flex-xl-fill {\n    -ms-flex: 1 1 auto !important;\n    flex: 1 1 auto !important;\n  }\n  #canvas-quiz-stats .flex-xl-grow-0 {\n    -ms-flex-positive: 0 !important;\n    flex-grow: 0 !important;\n  }\n  #canvas-quiz-stats .flex-xl-grow-1 {\n    -ms-flex-positive: 1 !important;\n    flex-grow: 1 !important;\n  }\n  #canvas-quiz-stats .flex-xl-shrink-0 {\n    -ms-flex-negative: 0 !important;\n    flex-shrink: 0 !important;\n  }\n  #canvas-quiz-stats .flex-xl-shrink-1 {\n    -ms-flex-negative: 1 !important;\n    flex-shrink: 1 !important;\n  }\n  #canvas-quiz-stats .justify-content-xl-start {\n    -ms-flex-pack: start !important;\n    justify-content: flex-start !important;\n  }\n  #canvas-quiz-stats .justify-content-xl-end {\n    -ms-flex-pack: end !important;\n    justify-content: flex-end !important;\n  }\n  #canvas-quiz-stats .justify-content-xl-center {\n    -ms-flex-pack: center !important;\n    justify-content: center !important;\n  }\n  #canvas-quiz-stats .justify-content-xl-between {\n    -ms-flex-pack: justify !important;\n    justify-content: space-between !important;\n  }\n  #canvas-quiz-stats .justify-content-xl-around {\n    -ms-flex-pack: distribute !important;\n    justify-content: space-around !important;\n  }\n  #canvas-quiz-stats .align-items-xl-start {\n    -ms-flex-align: start !important;\n    align-items: flex-start !important;\n  }\n  #canvas-quiz-stats .align-items-xl-end {\n    -ms-flex-align: end !important;\n    align-items: flex-end !important;\n  }\n  #canvas-quiz-stats .align-items-xl-center {\n    -ms-flex-align: center !important;\n    align-items: center !important;\n  }\n  #canvas-quiz-stats .align-items-xl-baseline {\n    -ms-flex-align: baseline !important;\n    align-items: baseline !important;\n  }\n  #canvas-quiz-stats .align-items-xl-stretch {\n    -ms-flex-align: stretch !important;\n    align-items: stretch !important;\n  }\n  #canvas-quiz-stats .align-content-xl-start {\n    -ms-flex-line-pack: start !important;\n    align-content: flex-start !important;\n  }\n  #canvas-quiz-stats .align-content-xl-end {\n    -ms-flex-line-pack: end !important;\n    align-content: flex-end !important;\n  }\n  #canvas-quiz-stats .align-content-xl-center {\n    -ms-flex-line-pack: center !important;\n    align-content: center !important;\n  }\n  #canvas-quiz-stats .align-content-xl-between {\n    -ms-flex-line-pack: justify !important;\n    align-content: space-between !important;\n  }\n  #canvas-quiz-stats .align-content-xl-around {\n    -ms-flex-line-pack: distribute !important;\n    align-content: space-around !important;\n  }\n  #canvas-quiz-stats .align-content-xl-stretch {\n    -ms-flex-line-pack: stretch !important;\n    align-content: stretch !important;\n  }\n  #canvas-quiz-stats .align-self-xl-auto {\n    -ms-flex-item-align: auto !important;\n    align-self: auto !important;\n  }\n  #canvas-quiz-stats .align-self-xl-start {\n    -ms-flex-item-align: start !important;\n    align-self: flex-start !important;\n  }\n  #canvas-quiz-stats .align-self-xl-end {\n    -ms-flex-item-align: end !important;\n    align-self: flex-end !important;\n  }\n  #canvas-quiz-stats .align-self-xl-center {\n    -ms-flex-item-align: center !important;\n    align-self: center !important;\n  }\n  #canvas-quiz-stats .align-self-xl-baseline {\n    -ms-flex-item-align: baseline !important;\n    align-self: baseline !important;\n  }\n  #canvas-quiz-stats .align-self-xl-stretch {\n    -ms-flex-item-align: stretch !important;\n    align-self: stretch !important;\n  }\n}\n#canvas-quiz-stats .float-left {\n  float: left !important;\n}\n#canvas-quiz-stats .float-right {\n  float: right !important;\n}\n#canvas-quiz-stats .float-none {\n  float: none !important;\n}\n@media (min-width: 576px) {\n  #canvas-quiz-stats .float-sm-left {\n    float: left !important;\n  }\n  #canvas-quiz-stats .float-sm-right {\n    float: right !important;\n  }\n  #canvas-quiz-stats .float-sm-none {\n    float: none !important;\n  }\n}\n@media (min-width: 768px) {\n  #canvas-quiz-stats .float-md-left {\n    float: left !important;\n  }\n  #canvas-quiz-stats .float-md-right {\n    float: right !important;\n  }\n  #canvas-quiz-stats .float-md-none {\n    float: none !important;\n  }\n}\n@media (min-width: 992px) {\n  #canvas-quiz-stats .float-lg-left {\n    float: left !important;\n  }\n  #canvas-quiz-stats .float-lg-right {\n    float: right !important;\n  }\n  #canvas-quiz-stats .float-lg-none {\n    float: none !important;\n  }\n}\n@media (min-width: 1200px) {\n  #canvas-quiz-stats .float-xl-left {\n    float: left !important;\n  }\n  #canvas-quiz-stats .float-xl-right {\n    float: right !important;\n  }\n  #canvas-quiz-stats .float-xl-none {\n    float: none !important;\n  }\n}\n#canvas-quiz-stats .user-select-all {\n  -webkit-user-select: all !important;\n  -moz-user-select: all !important;\n  -ms-user-select: all !important;\n  user-select: all !important;\n}\n#canvas-quiz-stats .user-select-auto {\n  -webkit-user-select: auto !important;\n  -moz-user-select: auto !important;\n  -ms-user-select: auto !important;\n  user-select: auto !important;\n}\n#canvas-quiz-stats .user-select-none {\n  -webkit-user-select: none !important;\n  -moz-user-select: none !important;\n  -ms-user-select: none !important;\n  user-select: none !important;\n}\n#canvas-quiz-stats .overflow-auto {\n  overflow: auto !important;\n}\n#canvas-quiz-stats .overflow-hidden {\n  overflow: hidden !important;\n}\n#canvas-quiz-stats .position-static {\n  position: static !important;\n}\n#canvas-quiz-stats .position-relative {\n  position: relative !important;\n}\n#canvas-quiz-stats .position-absolute {\n  position: absolute !important;\n}\n#canvas-quiz-stats .position-fixed {\n  position: fixed !important;\n}\n#canvas-quiz-stats .position-sticky {\n  position: -webkit-sticky !important;\n  position: sticky !important;\n}\n#canvas-quiz-stats .fixed-top {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 1030;\n}\n#canvas-quiz-stats .fixed-bottom {\n  position: fixed;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1030;\n}\n@supports ((position: -webkit-sticky) or (position: sticky)) {\n  #canvas-quiz-stats .sticky-top {\n    position: -webkit-sticky;\n    position: sticky;\n    top: 0;\n    z-index: 1020;\n  }\n}\n#canvas-quiz-stats .sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}\n#canvas-quiz-stats .sr-only-focusable:active,\n#canvas-quiz-stats .sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  overflow: visible;\n  clip: auto;\n  white-space: normal;\n}\n#canvas-quiz-stats .shadow-sm {\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;\n}\n#canvas-quiz-stats .shadow {\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;\n}\n#canvas-quiz-stats .shadow-lg {\n  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;\n}\n#canvas-quiz-stats .shadow-none {\n  box-shadow: none !important;\n}\n#canvas-quiz-stats .w-25 {\n  width: 25% !important;\n}\n#canvas-quiz-stats .w-50 {\n  width: 50% !important;\n}\n#canvas-quiz-stats .w-75 {\n  width: 75% !important;\n}\n#canvas-quiz-stats .w-100 {\n  width: 100% !important;\n}\n#canvas-quiz-stats .w-auto {\n  width: auto !important;\n}\n#canvas-quiz-stats .h-25 {\n  height: 25% !important;\n}\n#canvas-quiz-stats .h-50 {\n  height: 50% !important;\n}\n#canvas-quiz-stats .h-75 {\n  height: 75% !important;\n}\n#canvas-quiz-stats .h-100 {\n  height: 100% !important;\n}\n#canvas-quiz-stats .h-auto {\n  height: auto !important;\n}\n#canvas-quiz-stats .mw-100 {\n  max-width: 100% !important;\n}\n#canvas-quiz-stats .mh-100 {\n  max-height: 100% !important;\n}\n#canvas-quiz-stats .min-vw-100 {\n  min-width: 100vw !important;\n}\n#canvas-quiz-stats .min-vh-100 {\n  min-height: 100vh !important;\n}\n#canvas-quiz-stats .vw-100 {\n  width: 100vw !important;\n}\n#canvas-quiz-stats .vh-100 {\n  height: 100vh !important;\n}\n#canvas-quiz-stats .m-0 {\n  margin: 0 !important;\n}\n#canvas-quiz-stats .mt-0,\n#canvas-quiz-stats .my-0 {\n  margin-top: 0 !important;\n}\n#canvas-quiz-stats .mr-0,\n#canvas-quiz-stats .mx-0 {\n  margin-right: 0 !important;\n}\n#canvas-quiz-stats .mb-0,\n#canvas-quiz-stats .my-0 {\n  margin-bottom: 0 !important;\n}\n#canvas-quiz-stats .ml-0,\n#canvas-quiz-stats .mx-0 {\n  margin-left: 0 !important;\n}\n#canvas-quiz-stats .m-1 {\n  margin: 0.25rem !important;\n}\n#canvas-quiz-stats .mt-1,\n#canvas-quiz-stats .my-1 {\n  margin-top: 0.25rem !important;\n}\n#canvas-quiz-stats .mr-1,\n#canvas-quiz-stats .mx-1 {\n  margin-right: 0.25rem !important;\n}\n#canvas-quiz-stats .mb-1,\n#canvas-quiz-stats .my-1 {\n  margin-bottom: 0.25rem !important;\n}\n#canvas-quiz-stats .ml-1,\n#canvas-quiz-stats .mx-1 {\n  margin-left: 0.25rem !important;\n}\n#canvas-quiz-stats .m-2 {\n  margin: 0.5rem !important;\n}\n#canvas-quiz-stats .mt-2,\n#canvas-quiz-stats .my-2 {\n  margin-top: 0.5rem !important;\n}\n#canvas-quiz-stats .mr-2,\n#canvas-quiz-stats .mx-2 {\n  margin-right: 0.5rem !important;\n}\n#canvas-quiz-stats .mb-2,\n#canvas-quiz-stats .my-2 {\n  margin-bottom: 0.5rem !important;\n}\n#canvas-quiz-stats .ml-2,\n#canvas-quiz-stats .mx-2 {\n  margin-left: 0.5rem !important;\n}\n#canvas-quiz-stats .m-3 {\n  margin: 1rem !important;\n}\n#canvas-quiz-stats .mt-3,\n#canvas-quiz-stats .my-3 {\n  margin-top: 1rem !important;\n}\n#canvas-quiz-stats .mr-3,\n#canvas-quiz-stats .mx-3 {\n  margin-right: 1rem !important;\n}\n#canvas-quiz-stats .mb-3,\n#canvas-quiz-stats .my-3 {\n  margin-bottom: 1rem !important;\n}\n#canvas-quiz-stats .ml-3,\n#canvas-quiz-stats .mx-3 {\n  margin-left: 1rem !important;\n}\n#canvas-quiz-stats .m-4 {\n  margin: 1.5rem !important;\n}\n#canvas-quiz-stats .mt-4,\n#canvas-quiz-stats .my-4 {\n  margin-top: 1.5rem !important;\n}\n#canvas-quiz-stats .mr-4,\n#canvas-quiz-stats .mx-4 {\n  margin-right: 1.5rem !important;\n}\n#canvas-quiz-stats .mb-4,\n#canvas-quiz-stats .my-4 {\n  margin-bottom: 1.5rem !important;\n}\n#canvas-quiz-stats .ml-4,\n#canvas-quiz-stats .mx-4 {\n  margin-left: 1.5rem !important;\n}\n#canvas-quiz-stats .m-5 {\n  margin: 3rem !important;\n}\n#canvas-quiz-stats .mt-5,\n#canvas-quiz-stats .my-5 {\n  margin-top: 3rem !important;\n}\n#canvas-quiz-stats .mr-5,\n#canvas-quiz-stats .mx-5 {\n  margin-right: 3rem !important;\n}\n#canvas-quiz-stats .mb-5,\n#canvas-quiz-stats .my-5 {\n  margin-bottom: 3rem !important;\n}\n#canvas-quiz-stats .ml-5,\n#canvas-quiz-stats .mx-5 {\n  margin-left: 3rem !important;\n}\n#canvas-quiz-stats .p-0 {\n  padding: 0 !important;\n}\n#canvas-quiz-stats .pt-0,\n#canvas-quiz-stats .py-0 {\n  padding-top: 0 !important;\n}\n#canvas-quiz-stats .pr-0,\n#canvas-quiz-stats .px-0 {\n  padding-right: 0 !important;\n}\n#canvas-quiz-stats .pb-0,\n#canvas-quiz-stats .py-0 {\n  padding-bottom: 0 !important;\n}\n#canvas-quiz-stats .pl-0,\n#canvas-quiz-stats .px-0 {\n  padding-left: 0 !important;\n}\n#canvas-quiz-stats .p-1 {\n  padding: 0.25rem !important;\n}\n#canvas-quiz-stats .pt-1,\n#canvas-quiz-stats .py-1 {\n  padding-top: 0.25rem !important;\n}\n#canvas-quiz-stats .pr-1,\n#canvas-quiz-stats .px-1 {\n  padding-right: 0.25rem !important;\n}\n#canvas-quiz-stats .pb-1,\n#canvas-quiz-stats .py-1 {\n  padding-bottom: 0.25rem !important;\n}\n#canvas-quiz-stats .pl-1,\n#canvas-quiz-stats .px-1 {\n  padding-left: 0.25rem !important;\n}\n#canvas-quiz-stats .p-2 {\n  padding: 0.5rem !important;\n}\n#canvas-quiz-stats .pt-2,\n#canvas-quiz-stats .py-2 {\n  padding-top: 0.5rem !important;\n}\n#canvas-quiz-stats .pr-2,\n#canvas-quiz-stats .px-2 {\n  padding-right: 0.5rem !important;\n}\n#canvas-quiz-stats .pb-2,\n#canvas-quiz-stats .py-2 {\n  padding-bottom: 0.5rem !important;\n}\n#canvas-quiz-stats .pl-2,\n#canvas-quiz-stats .px-2 {\n  padding-left: 0.5rem !important;\n}\n#canvas-quiz-stats .p-3 {\n  padding: 1rem !important;\n}\n#canvas-quiz-stats .pt-3,\n#canvas-quiz-stats .py-3 {\n  padding-top: 1rem !important;\n}\n#canvas-quiz-stats .pr-3,\n#canvas-quiz-stats .px-3 {\n  padding-right: 1rem !important;\n}\n#canvas-quiz-stats .pb-3,\n#canvas-quiz-stats .py-3 {\n  padding-bottom: 1rem !important;\n}\n#canvas-quiz-stats .pl-3,\n#canvas-quiz-stats .px-3 {\n  padding-left: 1rem !important;\n}\n#canvas-quiz-stats .p-4 {\n  padding: 1.5rem !important;\n}\n#canvas-quiz-stats .pt-4,\n#canvas-quiz-stats .py-4 {\n  padding-top: 1.5rem !important;\n}\n#canvas-quiz-stats .pr-4,\n#canvas-quiz-stats .px-4 {\n  padding-right: 1.5rem !important;\n}\n#canvas-quiz-stats .pb-4,\n#canvas-quiz-stats .py-4 {\n  padding-bottom: 1.5rem !important;\n}\n#canvas-quiz-stats .pl-4,\n#canvas-quiz-stats .px-4 {\n  padding-left: 1.5rem !important;\n}\n#canvas-quiz-stats .p-5 {\n  padding: 3rem !important;\n}\n#canvas-quiz-stats .pt-5,\n#canvas-quiz-stats .py-5 {\n  padding-top: 3rem !important;\n}\n#canvas-quiz-stats .pr-5,\n#canvas-quiz-stats .px-5 {\n  padding-right: 3rem !important;\n}\n#canvas-quiz-stats .pb-5,\n#canvas-quiz-stats .py-5 {\n  padding-bottom: 3rem !important;\n}\n#canvas-quiz-stats .pl-5,\n#canvas-quiz-stats .px-5 {\n  padding-left: 3rem !important;\n}\n#canvas-quiz-stats .m-n1 {\n  margin: -0.25rem !important;\n}\n#canvas-quiz-stats .mt-n1,\n#canvas-quiz-stats .my-n1 {\n  margin-top: -0.25rem !important;\n}\n#canvas-quiz-stats .mr-n1,\n#canvas-quiz-stats .mx-n1 {\n  margin-right: -0.25rem !important;\n}\n#canvas-quiz-stats .mb-n1,\n#canvas-quiz-stats .my-n1 {\n  margin-bottom: -0.25rem !important;\n}\n#canvas-quiz-stats .ml-n1,\n#canvas-quiz-stats .mx-n1 {\n  margin-left: -0.25rem !important;\n}\n#canvas-quiz-stats .m-n2 {\n  margin: -0.5rem !important;\n}\n#canvas-quiz-stats .mt-n2,\n#canvas-quiz-stats .my-n2 {\n  margin-top: -0.5rem !important;\n}\n#canvas-quiz-stats .mr-n2,\n#canvas-quiz-stats .mx-n2 {\n  margin-right: -0.5rem !important;\n}\n#canvas-quiz-stats .mb-n2,\n#canvas-quiz-stats .my-n2 {\n  margin-bottom: -0.5rem !important;\n}\n#canvas-quiz-stats .ml-n2,\n#canvas-quiz-stats .mx-n2 {\n  margin-left: -0.5rem !important;\n}\n#canvas-quiz-stats .m-n3 {\n  margin: -1rem !important;\n}\n#canvas-quiz-stats .mt-n3,\n#canvas-quiz-stats .my-n3 {\n  margin-top: -1rem !important;\n}\n#canvas-quiz-stats .mr-n3,\n#canvas-quiz-stats .mx-n3 {\n  margin-right: -1rem !important;\n}\n#canvas-quiz-stats .mb-n3,\n#canvas-quiz-stats .my-n3 {\n  margin-bottom: -1rem !important;\n}\n#canvas-quiz-stats .ml-n3,\n#canvas-quiz-stats .mx-n3 {\n  margin-left: -1rem !important;\n}\n#canvas-quiz-stats .m-n4 {\n  margin: -1.5rem !important;\n}\n#canvas-quiz-stats .mt-n4,\n#canvas-quiz-stats .my-n4 {\n  margin-top: -1.5rem !important;\n}\n#canvas-quiz-stats .mr-n4,\n#canvas-quiz-stats .mx-n4 {\n  margin-right: -1.5rem !important;\n}\n#canvas-quiz-stats .mb-n4,\n#canvas-quiz-stats .my-n4 {\n  margin-bottom: -1.5rem !important;\n}\n#canvas-quiz-stats .ml-n4,\n#canvas-quiz-stats .mx-n4 {\n  margin-left: -1.5rem !important;\n}\n#canvas-quiz-stats .m-n5 {\n  margin: -3rem !important;\n}\n#canvas-quiz-stats .mt-n5,\n#canvas-quiz-stats .my-n5 {\n  margin-top: -3rem !important;\n}\n#canvas-quiz-stats .mr-n5,\n#canvas-quiz-stats .mx-n5 {\n  margin-right: -3rem !important;\n}\n#canvas-quiz-stats .mb-n5,\n#canvas-quiz-stats .my-n5 {\n  margin-bottom: -3rem !important;\n}\n#canvas-quiz-stats .ml-n5,\n#canvas-quiz-stats .mx-n5 {\n  margin-left: -3rem !important;\n}\n#canvas-quiz-stats .m-auto {\n  margin: auto !important;\n}\n#canvas-quiz-stats .mt-auto,\n#canvas-quiz-stats .my-auto {\n  margin-top: auto !important;\n}\n#canvas-quiz-stats .mr-auto,\n#canvas-quiz-stats .mx-auto {\n  margin-right: auto !important;\n}\n#canvas-quiz-stats .mb-auto,\n#canvas-quiz-stats .my-auto {\n  margin-bottom: auto !important;\n}\n#canvas-quiz-stats .ml-auto,\n#canvas-quiz-stats .mx-auto {\n  margin-left: auto !important;\n}\n@media (min-width: 576px) {\n  #canvas-quiz-stats .m-sm-0 {\n    margin: 0 !important;\n  }\n  #canvas-quiz-stats .mt-sm-0,\n  #canvas-quiz-stats .my-sm-0 {\n    margin-top: 0 !important;\n  }\n  #canvas-quiz-stats .mr-sm-0,\n  #canvas-quiz-stats .mx-sm-0 {\n    margin-right: 0 !important;\n  }\n  #canvas-quiz-stats .mb-sm-0,\n  #canvas-quiz-stats .my-sm-0 {\n    margin-bottom: 0 !important;\n  }\n  #canvas-quiz-stats .ml-sm-0,\n  #canvas-quiz-stats .mx-sm-0 {\n    margin-left: 0 !important;\n  }\n  #canvas-quiz-stats .m-sm-1 {\n    margin: 0.25rem !important;\n  }\n  #canvas-quiz-stats .mt-sm-1,\n  #canvas-quiz-stats .my-sm-1 {\n    margin-top: 0.25rem !important;\n  }\n  #canvas-quiz-stats .mr-sm-1,\n  #canvas-quiz-stats .mx-sm-1 {\n    margin-right: 0.25rem !important;\n  }\n  #canvas-quiz-stats .mb-sm-1,\n  #canvas-quiz-stats .my-sm-1 {\n    margin-bottom: 0.25rem !important;\n  }\n  #canvas-quiz-stats .ml-sm-1,\n  #canvas-quiz-stats .mx-sm-1 {\n    margin-left: 0.25rem !important;\n  }\n  #canvas-quiz-stats .m-sm-2 {\n    margin: 0.5rem !important;\n  }\n  #canvas-quiz-stats .mt-sm-2,\n  #canvas-quiz-stats .my-sm-2 {\n    margin-top: 0.5rem !important;\n  }\n  #canvas-quiz-stats .mr-sm-2,\n  #canvas-quiz-stats .mx-sm-2 {\n    margin-right: 0.5rem !important;\n  }\n  #canvas-quiz-stats .mb-sm-2,\n  #canvas-quiz-stats .my-sm-2 {\n    margin-bottom: 0.5rem !important;\n  }\n  #canvas-quiz-stats .ml-sm-2,\n  #canvas-quiz-stats .mx-sm-2 {\n    margin-left: 0.5rem !important;\n  }\n  #canvas-quiz-stats .m-sm-3 {\n    margin: 1rem !important;\n  }\n  #canvas-quiz-stats .mt-sm-3,\n  #canvas-quiz-stats .my-sm-3 {\n    margin-top: 1rem !important;\n  }\n  #canvas-quiz-stats .mr-sm-3,\n  #canvas-quiz-stats .mx-sm-3 {\n    margin-right: 1rem !important;\n  }\n  #canvas-quiz-stats .mb-sm-3,\n  #canvas-quiz-stats .my-sm-3 {\n    margin-bottom: 1rem !important;\n  }\n  #canvas-quiz-stats .ml-sm-3,\n  #canvas-quiz-stats .mx-sm-3 {\n    margin-left: 1rem !important;\n  }\n  #canvas-quiz-stats .m-sm-4 {\n    margin: 1.5rem !important;\n  }\n  #canvas-quiz-stats .mt-sm-4,\n  #canvas-quiz-stats .my-sm-4 {\n    margin-top: 1.5rem !important;\n  }\n  #canvas-quiz-stats .mr-sm-4,\n  #canvas-quiz-stats .mx-sm-4 {\n    margin-right: 1.5rem !important;\n  }\n  #canvas-quiz-stats .mb-sm-4,\n  #canvas-quiz-stats .my-sm-4 {\n    margin-bottom: 1.5rem !important;\n  }\n  #canvas-quiz-stats .ml-sm-4,\n  #canvas-quiz-stats .mx-sm-4 {\n    margin-left: 1.5rem !important;\n  }\n  #canvas-quiz-stats .m-sm-5 {\n    margin: 3rem !important;\n  }\n  #canvas-quiz-stats .mt-sm-5,\n  #canvas-quiz-stats .my-sm-5 {\n    margin-top: 3rem !important;\n  }\n  #canvas-quiz-stats .mr-sm-5,\n  #canvas-quiz-stats .mx-sm-5 {\n    margin-right: 3rem !important;\n  }\n  #canvas-quiz-stats .mb-sm-5,\n  #canvas-quiz-stats .my-sm-5 {\n    margin-bottom: 3rem !important;\n  }\n  #canvas-quiz-stats .ml-sm-5,\n  #canvas-quiz-stats .mx-sm-5 {\n    margin-left: 3rem !important;\n  }\n  #canvas-quiz-stats .p-sm-0 {\n    padding: 0 !important;\n  }\n  #canvas-quiz-stats .pt-sm-0,\n  #canvas-quiz-stats .py-sm-0 {\n    padding-top: 0 !important;\n  }\n  #canvas-quiz-stats .pr-sm-0,\n  #canvas-quiz-stats .px-sm-0 {\n    padding-right: 0 !important;\n  }\n  #canvas-quiz-stats .pb-sm-0,\n  #canvas-quiz-stats .py-sm-0 {\n    padding-bottom: 0 !important;\n  }\n  #canvas-quiz-stats .pl-sm-0,\n  #canvas-quiz-stats .px-sm-0 {\n    padding-left: 0 !important;\n  }\n  #canvas-quiz-stats .p-sm-1 {\n    padding: 0.25rem !important;\n  }\n  #canvas-quiz-stats .pt-sm-1,\n  #canvas-quiz-stats .py-sm-1 {\n    padding-top: 0.25rem !important;\n  }\n  #canvas-quiz-stats .pr-sm-1,\n  #canvas-quiz-stats .px-sm-1 {\n    padding-right: 0.25rem !important;\n  }\n  #canvas-quiz-stats .pb-sm-1,\n  #canvas-quiz-stats .py-sm-1 {\n    padding-bottom: 0.25rem !important;\n  }\n  #canvas-quiz-stats .pl-sm-1,\n  #canvas-quiz-stats .px-sm-1 {\n    padding-left: 0.25rem !important;\n  }\n  #canvas-quiz-stats .p-sm-2 {\n    padding: 0.5rem !important;\n  }\n  #canvas-quiz-stats .pt-sm-2,\n  #canvas-quiz-stats .py-sm-2 {\n    padding-top: 0.5rem !important;\n  }\n  #canvas-quiz-stats .pr-sm-2,\n  #canvas-quiz-stats .px-sm-2 {\n    padding-right: 0.5rem !important;\n  }\n  #canvas-quiz-stats .pb-sm-2,\n  #canvas-quiz-stats .py-sm-2 {\n    padding-bottom: 0.5rem !important;\n  }\n  #canvas-quiz-stats .pl-sm-2,\n  #canvas-quiz-stats .px-sm-2 {\n    padding-left: 0.5rem !important;\n  }\n  #canvas-quiz-stats .p-sm-3 {\n    padding: 1rem !important;\n  }\n  #canvas-quiz-stats .pt-sm-3,\n  #canvas-quiz-stats .py-sm-3 {\n    padding-top: 1rem !important;\n  }\n  #canvas-quiz-stats .pr-sm-3,\n  #canvas-quiz-stats .px-sm-3 {\n    padding-right: 1rem !important;\n  }\n  #canvas-quiz-stats .pb-sm-3,\n  #canvas-quiz-stats .py-sm-3 {\n    padding-bottom: 1rem !important;\n  }\n  #canvas-quiz-stats .pl-sm-3,\n  #canvas-quiz-stats .px-sm-3 {\n    padding-left: 1rem !important;\n  }\n  #canvas-quiz-stats .p-sm-4 {\n    padding: 1.5rem !important;\n  }\n  #canvas-quiz-stats .pt-sm-4,\n  #canvas-quiz-stats .py-sm-4 {\n    padding-top: 1.5rem !important;\n  }\n  #canvas-quiz-stats .pr-sm-4,\n  #canvas-quiz-stats .px-sm-4 {\n    padding-right: 1.5rem !important;\n  }\n  #canvas-quiz-stats .pb-sm-4,\n  #canvas-quiz-stats .py-sm-4 {\n    padding-bottom: 1.5rem !important;\n  }\n  #canvas-quiz-stats .pl-sm-4,\n  #canvas-quiz-stats .px-sm-4 {\n    padding-left: 1.5rem !important;\n  }\n  #canvas-quiz-stats .p-sm-5 {\n    padding: 3rem !important;\n  }\n  #canvas-quiz-stats .pt-sm-5,\n  #canvas-quiz-stats .py-sm-5 {\n    padding-top: 3rem !important;\n  }\n  #canvas-quiz-stats .pr-sm-5,\n  #canvas-quiz-stats .px-sm-5 {\n    padding-right: 3rem !important;\n  }\n  #canvas-quiz-stats .pb-sm-5,\n  #canvas-quiz-stats .py-sm-5 {\n    padding-bottom: 3rem !important;\n  }\n  #canvas-quiz-stats .pl-sm-5,\n  #canvas-quiz-stats .px-sm-5 {\n    padding-left: 3rem !important;\n  }\n  #canvas-quiz-stats .m-sm-n1 {\n    margin: -0.25rem !important;\n  }\n  #canvas-quiz-stats .mt-sm-n1,\n  #canvas-quiz-stats .my-sm-n1 {\n    margin-top: -0.25rem !important;\n  }\n  #canvas-quiz-stats .mr-sm-n1,\n  #canvas-quiz-stats .mx-sm-n1 {\n    margin-right: -0.25rem !important;\n  }\n  #canvas-quiz-stats .mb-sm-n1,\n  #canvas-quiz-stats .my-sm-n1 {\n    margin-bottom: -0.25rem !important;\n  }\n  #canvas-quiz-stats .ml-sm-n1,\n  #canvas-quiz-stats .mx-sm-n1 {\n    margin-left: -0.25rem !important;\n  }\n  #canvas-quiz-stats .m-sm-n2 {\n    margin: -0.5rem !important;\n  }\n  #canvas-quiz-stats .mt-sm-n2,\n  #canvas-quiz-stats .my-sm-n2 {\n    margin-top: -0.5rem !important;\n  }\n  #canvas-quiz-stats .mr-sm-n2,\n  #canvas-quiz-stats .mx-sm-n2 {\n    margin-right: -0.5rem !important;\n  }\n  #canvas-quiz-stats .mb-sm-n2,\n  #canvas-quiz-stats .my-sm-n2 {\n    margin-bottom: -0.5rem !important;\n  }\n  #canvas-quiz-stats .ml-sm-n2,\n  #canvas-quiz-stats .mx-sm-n2 {\n    margin-left: -0.5rem !important;\n  }\n  #canvas-quiz-stats .m-sm-n3 {\n    margin: -1rem !important;\n  }\n  #canvas-quiz-stats .mt-sm-n3,\n  #canvas-quiz-stats .my-sm-n3 {\n    margin-top: -1rem !important;\n  }\n  #canvas-quiz-stats .mr-sm-n3,\n  #canvas-quiz-stats .mx-sm-n3 {\n    margin-right: -1rem !important;\n  }\n  #canvas-quiz-stats .mb-sm-n3,\n  #canvas-quiz-stats .my-sm-n3 {\n    margin-bottom: -1rem !important;\n  }\n  #canvas-quiz-stats .ml-sm-n3,\n  #canvas-quiz-stats .mx-sm-n3 {\n    margin-left: -1rem !important;\n  }\n  #canvas-quiz-stats .m-sm-n4 {\n    margin: -1.5rem !important;\n  }\n  #canvas-quiz-stats .mt-sm-n4,\n  #canvas-quiz-stats .my-sm-n4 {\n    margin-top: -1.5rem !important;\n  }\n  #canvas-quiz-stats .mr-sm-n4,\n  #canvas-quiz-stats .mx-sm-n4 {\n    margin-right: -1.5rem !important;\n  }\n  #canvas-quiz-stats .mb-sm-n4,\n  #canvas-quiz-stats .my-sm-n4 {\n    margin-bottom: -1.5rem !important;\n  }\n  #canvas-quiz-stats .ml-sm-n4,\n  #canvas-quiz-stats .mx-sm-n4 {\n    margin-left: -1.5rem !important;\n  }\n  #canvas-quiz-stats .m-sm-n5 {\n    margin: -3rem !important;\n  }\n  #canvas-quiz-stats .mt-sm-n5,\n  #canvas-quiz-stats .my-sm-n5 {\n    margin-top: -3rem !important;\n  }\n  #canvas-quiz-stats .mr-sm-n5,\n  #canvas-quiz-stats .mx-sm-n5 {\n    margin-right: -3rem !important;\n  }\n  #canvas-quiz-stats .mb-sm-n5,\n  #canvas-quiz-stats .my-sm-n5 {\n    margin-bottom: -3rem !important;\n  }\n  #canvas-quiz-stats .ml-sm-n5,\n  #canvas-quiz-stats .mx-sm-n5 {\n    margin-left: -3rem !important;\n  }\n  #canvas-quiz-stats .m-sm-auto {\n    margin: auto !important;\n  }\n  #canvas-quiz-stats .mt-sm-auto,\n  #canvas-quiz-stats .my-sm-auto {\n    margin-top: auto !important;\n  }\n  #canvas-quiz-stats .mr-sm-auto,\n  #canvas-quiz-stats .mx-sm-auto {\n    margin-right: auto !important;\n  }\n  #canvas-quiz-stats .mb-sm-auto,\n  #canvas-quiz-stats .my-sm-auto {\n    margin-bottom: auto !important;\n  }\n  #canvas-quiz-stats .ml-sm-auto,\n  #canvas-quiz-stats .mx-sm-auto {\n    margin-left: auto !important;\n  }\n}\n@media (min-width: 768px) {\n  #canvas-quiz-stats .m-md-0 {\n    margin: 0 !important;\n  }\n  #canvas-quiz-stats .mt-md-0,\n  #canvas-quiz-stats .my-md-0 {\n    margin-top: 0 !important;\n  }\n  #canvas-quiz-stats .mr-md-0,\n  #canvas-quiz-stats .mx-md-0 {\n    margin-right: 0 !important;\n  }\n  #canvas-quiz-stats .mb-md-0,\n  #canvas-quiz-stats .my-md-0 {\n    margin-bottom: 0 !important;\n  }\n  #canvas-quiz-stats .ml-md-0,\n  #canvas-quiz-stats .mx-md-0 {\n    margin-left: 0 !important;\n  }\n  #canvas-quiz-stats .m-md-1 {\n    margin: 0.25rem !important;\n  }\n  #canvas-quiz-stats .mt-md-1,\n  #canvas-quiz-stats .my-md-1 {\n    margin-top: 0.25rem !important;\n  }\n  #canvas-quiz-stats .mr-md-1,\n  #canvas-quiz-stats .mx-md-1 {\n    margin-right: 0.25rem !important;\n  }\n  #canvas-quiz-stats .mb-md-1,\n  #canvas-quiz-stats .my-md-1 {\n    margin-bottom: 0.25rem !important;\n  }\n  #canvas-quiz-stats .ml-md-1,\n  #canvas-quiz-stats .mx-md-1 {\n    margin-left: 0.25rem !important;\n  }\n  #canvas-quiz-stats .m-md-2 {\n    margin: 0.5rem !important;\n  }\n  #canvas-quiz-stats .mt-md-2,\n  #canvas-quiz-stats .my-md-2 {\n    margin-top: 0.5rem !important;\n  }\n  #canvas-quiz-stats .mr-md-2,\n  #canvas-quiz-stats .mx-md-2 {\n    margin-right: 0.5rem !important;\n  }\n  #canvas-quiz-stats .mb-md-2,\n  #canvas-quiz-stats .my-md-2 {\n    margin-bottom: 0.5rem !important;\n  }\n  #canvas-quiz-stats .ml-md-2,\n  #canvas-quiz-stats .mx-md-2 {\n    margin-left: 0.5rem !important;\n  }\n  #canvas-quiz-stats .m-md-3 {\n    margin: 1rem !important;\n  }\n  #canvas-quiz-stats .mt-md-3,\n  #canvas-quiz-stats .my-md-3 {\n    margin-top: 1rem !important;\n  }\n  #canvas-quiz-stats .mr-md-3,\n  #canvas-quiz-stats .mx-md-3 {\n    margin-right: 1rem !important;\n  }\n  #canvas-quiz-stats .mb-md-3,\n  #canvas-quiz-stats .my-md-3 {\n    margin-bottom: 1rem !important;\n  }\n  #canvas-quiz-stats .ml-md-3,\n  #canvas-quiz-stats .mx-md-3 {\n    margin-left: 1rem !important;\n  }\n  #canvas-quiz-stats .m-md-4 {\n    margin: 1.5rem !important;\n  }\n  #canvas-quiz-stats .mt-md-4,\n  #canvas-quiz-stats .my-md-4 {\n    margin-top: 1.5rem !important;\n  }\n  #canvas-quiz-stats .mr-md-4,\n  #canvas-quiz-stats .mx-md-4 {\n    margin-right: 1.5rem !important;\n  }\n  #canvas-quiz-stats .mb-md-4,\n  #canvas-quiz-stats .my-md-4 {\n    margin-bottom: 1.5rem !important;\n  }\n  #canvas-quiz-stats .ml-md-4,\n  #canvas-quiz-stats .mx-md-4 {\n    margin-left: 1.5rem !important;\n  }\n  #canvas-quiz-stats .m-md-5 {\n    margin: 3rem !important;\n  }\n  #canvas-quiz-stats .mt-md-5,\n  #canvas-quiz-stats .my-md-5 {\n    margin-top: 3rem !important;\n  }\n  #canvas-quiz-stats .mr-md-5,\n  #canvas-quiz-stats .mx-md-5 {\n    margin-right: 3rem !important;\n  }\n  #canvas-quiz-stats .mb-md-5,\n  #canvas-quiz-stats .my-md-5 {\n    margin-bottom: 3rem !important;\n  }\n  #canvas-quiz-stats .ml-md-5,\n  #canvas-quiz-stats .mx-md-5 {\n    margin-left: 3rem !important;\n  }\n  #canvas-quiz-stats .p-md-0 {\n    padding: 0 !important;\n  }\n  #canvas-quiz-stats .pt-md-0,\n  #canvas-quiz-stats .py-md-0 {\n    padding-top: 0 !important;\n  }\n  #canvas-quiz-stats .pr-md-0,\n  #canvas-quiz-stats .px-md-0 {\n    padding-right: 0 !important;\n  }\n  #canvas-quiz-stats .pb-md-0,\n  #canvas-quiz-stats .py-md-0 {\n    padding-bottom: 0 !important;\n  }\n  #canvas-quiz-stats .pl-md-0,\n  #canvas-quiz-stats .px-md-0 {\n    padding-left: 0 !important;\n  }\n  #canvas-quiz-stats .p-md-1 {\n    padding: 0.25rem !important;\n  }\n  #canvas-quiz-stats .pt-md-1,\n  #canvas-quiz-stats .py-md-1 {\n    padding-top: 0.25rem !important;\n  }\n  #canvas-quiz-stats .pr-md-1,\n  #canvas-quiz-stats .px-md-1 {\n    padding-right: 0.25rem !important;\n  }\n  #canvas-quiz-stats .pb-md-1,\n  #canvas-quiz-stats .py-md-1 {\n    padding-bottom: 0.25rem !important;\n  }\n  #canvas-quiz-stats .pl-md-1,\n  #canvas-quiz-stats .px-md-1 {\n    padding-left: 0.25rem !important;\n  }\n  #canvas-quiz-stats .p-md-2 {\n    padding: 0.5rem !important;\n  }\n  #canvas-quiz-stats .pt-md-2,\n  #canvas-quiz-stats .py-md-2 {\n    padding-top: 0.5rem !important;\n  }\n  #canvas-quiz-stats .pr-md-2,\n  #canvas-quiz-stats .px-md-2 {\n    padding-right: 0.5rem !important;\n  }\n  #canvas-quiz-stats .pb-md-2,\n  #canvas-quiz-stats .py-md-2 {\n    padding-bottom: 0.5rem !important;\n  }\n  #canvas-quiz-stats .pl-md-2,\n  #canvas-quiz-stats .px-md-2 {\n    padding-left: 0.5rem !important;\n  }\n  #canvas-quiz-stats .p-md-3 {\n    padding: 1rem !important;\n  }\n  #canvas-quiz-stats .pt-md-3,\n  #canvas-quiz-stats .py-md-3 {\n    padding-top: 1rem !important;\n  }\n  #canvas-quiz-stats .pr-md-3,\n  #canvas-quiz-stats .px-md-3 {\n    padding-right: 1rem !important;\n  }\n  #canvas-quiz-stats .pb-md-3,\n  #canvas-quiz-stats .py-md-3 {\n    padding-bottom: 1rem !important;\n  }\n  #canvas-quiz-stats .pl-md-3,\n  #canvas-quiz-stats .px-md-3 {\n    padding-left: 1rem !important;\n  }\n  #canvas-quiz-stats .p-md-4 {\n    padding: 1.5rem !important;\n  }\n  #canvas-quiz-stats .pt-md-4,\n  #canvas-quiz-stats .py-md-4 {\n    padding-top: 1.5rem !important;\n  }\n  #canvas-quiz-stats .pr-md-4,\n  #canvas-quiz-stats .px-md-4 {\n    padding-right: 1.5rem !important;\n  }\n  #canvas-quiz-stats .pb-md-4,\n  #canvas-quiz-stats .py-md-4 {\n    padding-bottom: 1.5rem !important;\n  }\n  #canvas-quiz-stats .pl-md-4,\n  #canvas-quiz-stats .px-md-4 {\n    padding-left: 1.5rem !important;\n  }\n  #canvas-quiz-stats .p-md-5 {\n    padding: 3rem !important;\n  }\n  #canvas-quiz-stats .pt-md-5,\n  #canvas-quiz-stats .py-md-5 {\n    padding-top: 3rem !important;\n  }\n  #canvas-quiz-stats .pr-md-5,\n  #canvas-quiz-stats .px-md-5 {\n    padding-right: 3rem !important;\n  }\n  #canvas-quiz-stats .pb-md-5,\n  #canvas-quiz-stats .py-md-5 {\n    padding-bottom: 3rem !important;\n  }\n  #canvas-quiz-stats .pl-md-5,\n  #canvas-quiz-stats .px-md-5 {\n    padding-left: 3rem !important;\n  }\n  #canvas-quiz-stats .m-md-n1 {\n    margin: -0.25rem !important;\n  }\n  #canvas-quiz-stats .mt-md-n1,\n  #canvas-quiz-stats .my-md-n1 {\n    margin-top: -0.25rem !important;\n  }\n  #canvas-quiz-stats .mr-md-n1,\n  #canvas-quiz-stats .mx-md-n1 {\n    margin-right: -0.25rem !important;\n  }\n  #canvas-quiz-stats .mb-md-n1,\n  #canvas-quiz-stats .my-md-n1 {\n    margin-bottom: -0.25rem !important;\n  }\n  #canvas-quiz-stats .ml-md-n1,\n  #canvas-quiz-stats .mx-md-n1 {\n    margin-left: -0.25rem !important;\n  }\n  #canvas-quiz-stats .m-md-n2 {\n    margin: -0.5rem !important;\n  }\n  #canvas-quiz-stats .mt-md-n2,\n  #canvas-quiz-stats .my-md-n2 {\n    margin-top: -0.5rem !important;\n  }\n  #canvas-quiz-stats .mr-md-n2,\n  #canvas-quiz-stats .mx-md-n2 {\n    margin-right: -0.5rem !important;\n  }\n  #canvas-quiz-stats .mb-md-n2,\n  #canvas-quiz-stats .my-md-n2 {\n    margin-bottom: -0.5rem !important;\n  }\n  #canvas-quiz-stats .ml-md-n2,\n  #canvas-quiz-stats .mx-md-n2 {\n    margin-left: -0.5rem !important;\n  }\n  #canvas-quiz-stats .m-md-n3 {\n    margin: -1rem !important;\n  }\n  #canvas-quiz-stats .mt-md-n3,\n  #canvas-quiz-stats .my-md-n3 {\n    margin-top: -1rem !important;\n  }\n  #canvas-quiz-stats .mr-md-n3,\n  #canvas-quiz-stats .mx-md-n3 {\n    margin-right: -1rem !important;\n  }\n  #canvas-quiz-stats .mb-md-n3,\n  #canvas-quiz-stats .my-md-n3 {\n    margin-bottom: -1rem !important;\n  }\n  #canvas-quiz-stats .ml-md-n3,\n  #canvas-quiz-stats .mx-md-n3 {\n    margin-left: -1rem !important;\n  }\n  #canvas-quiz-stats .m-md-n4 {\n    margin: -1.5rem !important;\n  }\n  #canvas-quiz-stats .mt-md-n4,\n  #canvas-quiz-stats .my-md-n4 {\n    margin-top: -1.5rem !important;\n  }\n  #canvas-quiz-stats .mr-md-n4,\n  #canvas-quiz-stats .mx-md-n4 {\n    margin-right: -1.5rem !important;\n  }\n  #canvas-quiz-stats .mb-md-n4,\n  #canvas-quiz-stats .my-md-n4 {\n    margin-bottom: -1.5rem !important;\n  }\n  #canvas-quiz-stats .ml-md-n4,\n  #canvas-quiz-stats .mx-md-n4 {\n    margin-left: -1.5rem !important;\n  }\n  #canvas-quiz-stats .m-md-n5 {\n    margin: -3rem !important;\n  }\n  #canvas-quiz-stats .mt-md-n5,\n  #canvas-quiz-stats .my-md-n5 {\n    margin-top: -3rem !important;\n  }\n  #canvas-quiz-stats .mr-md-n5,\n  #canvas-quiz-stats .mx-md-n5 {\n    margin-right: -3rem !important;\n  }\n  #canvas-quiz-stats .mb-md-n5,\n  #canvas-quiz-stats .my-md-n5 {\n    margin-bottom: -3rem !important;\n  }\n  #canvas-quiz-stats .ml-md-n5,\n  #canvas-quiz-stats .mx-md-n5 {\n    margin-left: -3rem !important;\n  }\n  #canvas-quiz-stats .m-md-auto {\n    margin: auto !important;\n  }\n  #canvas-quiz-stats .mt-md-auto,\n  #canvas-quiz-stats .my-md-auto {\n    margin-top: auto !important;\n  }\n  #canvas-quiz-stats .mr-md-auto,\n  #canvas-quiz-stats .mx-md-auto {\n    margin-right: auto !important;\n  }\n  #canvas-quiz-stats .mb-md-auto,\n  #canvas-quiz-stats .my-md-auto {\n    margin-bottom: auto !important;\n  }\n  #canvas-quiz-stats .ml-md-auto,\n  #canvas-quiz-stats .mx-md-auto {\n    margin-left: auto !important;\n  }\n}\n@media (min-width: 992px) {\n  #canvas-quiz-stats .m-lg-0 {\n    margin: 0 !important;\n  }\n  #canvas-quiz-stats .mt-lg-0,\n  #canvas-quiz-stats .my-lg-0 {\n    margin-top: 0 !important;\n  }\n  #canvas-quiz-stats .mr-lg-0,\n  #canvas-quiz-stats .mx-lg-0 {\n    margin-right: 0 !important;\n  }\n  #canvas-quiz-stats .mb-lg-0,\n  #canvas-quiz-stats .my-lg-0 {\n    margin-bottom: 0 !important;\n  }\n  #canvas-quiz-stats .ml-lg-0,\n  #canvas-quiz-stats .mx-lg-0 {\n    margin-left: 0 !important;\n  }\n  #canvas-quiz-stats .m-lg-1 {\n    margin: 0.25rem !important;\n  }\n  #canvas-quiz-stats .mt-lg-1,\n  #canvas-quiz-stats .my-lg-1 {\n    margin-top: 0.25rem !important;\n  }\n  #canvas-quiz-stats .mr-lg-1,\n  #canvas-quiz-stats .mx-lg-1 {\n    margin-right: 0.25rem !important;\n  }\n  #canvas-quiz-stats .mb-lg-1,\n  #canvas-quiz-stats .my-lg-1 {\n    margin-bottom: 0.25rem !important;\n  }\n  #canvas-quiz-stats .ml-lg-1,\n  #canvas-quiz-stats .mx-lg-1 {\n    margin-left: 0.25rem !important;\n  }\n  #canvas-quiz-stats .m-lg-2 {\n    margin: 0.5rem !important;\n  }\n  #canvas-quiz-stats .mt-lg-2,\n  #canvas-quiz-stats .my-lg-2 {\n    margin-top: 0.5rem !important;\n  }\n  #canvas-quiz-stats .mr-lg-2,\n  #canvas-quiz-stats .mx-lg-2 {\n    margin-right: 0.5rem !important;\n  }\n  #canvas-quiz-stats .mb-lg-2,\n  #canvas-quiz-stats .my-lg-2 {\n    margin-bottom: 0.5rem !important;\n  }\n  #canvas-quiz-stats .ml-lg-2,\n  #canvas-quiz-stats .mx-lg-2 {\n    margin-left: 0.5rem !important;\n  }\n  #canvas-quiz-stats .m-lg-3 {\n    margin: 1rem !important;\n  }\n  #canvas-quiz-stats .mt-lg-3,\n  #canvas-quiz-stats .my-lg-3 {\n    margin-top: 1rem !important;\n  }\n  #canvas-quiz-stats .mr-lg-3,\n  #canvas-quiz-stats .mx-lg-3 {\n    margin-right: 1rem !important;\n  }\n  #canvas-quiz-stats .mb-lg-3,\n  #canvas-quiz-stats .my-lg-3 {\n    margin-bottom: 1rem !important;\n  }\n  #canvas-quiz-stats .ml-lg-3,\n  #canvas-quiz-stats .mx-lg-3 {\n    margin-left: 1rem !important;\n  }\n  #canvas-quiz-stats .m-lg-4 {\n    margin: 1.5rem !important;\n  }\n  #canvas-quiz-stats .mt-lg-4,\n  #canvas-quiz-stats .my-lg-4 {\n    margin-top: 1.5rem !important;\n  }\n  #canvas-quiz-stats .mr-lg-4,\n  #canvas-quiz-stats .mx-lg-4 {\n    margin-right: 1.5rem !important;\n  }\n  #canvas-quiz-stats .mb-lg-4,\n  #canvas-quiz-stats .my-lg-4 {\n    margin-bottom: 1.5rem !important;\n  }\n  #canvas-quiz-stats .ml-lg-4,\n  #canvas-quiz-stats .mx-lg-4 {\n    margin-left: 1.5rem !important;\n  }\n  #canvas-quiz-stats .m-lg-5 {\n    margin: 3rem !important;\n  }\n  #canvas-quiz-stats .mt-lg-5,\n  #canvas-quiz-stats .my-lg-5 {\n    margin-top: 3rem !important;\n  }\n  #canvas-quiz-stats .mr-lg-5,\n  #canvas-quiz-stats .mx-lg-5 {\n    margin-right: 3rem !important;\n  }\n  #canvas-quiz-stats .mb-lg-5,\n  #canvas-quiz-stats .my-lg-5 {\n    margin-bottom: 3rem !important;\n  }\n  #canvas-quiz-stats .ml-lg-5,\n  #canvas-quiz-stats .mx-lg-5 {\n    margin-left: 3rem !important;\n  }\n  #canvas-quiz-stats .p-lg-0 {\n    padding: 0 !important;\n  }\n  #canvas-quiz-stats .pt-lg-0,\n  #canvas-quiz-stats .py-lg-0 {\n    padding-top: 0 !important;\n  }\n  #canvas-quiz-stats .pr-lg-0,\n  #canvas-quiz-stats .px-lg-0 {\n    padding-right: 0 !important;\n  }\n  #canvas-quiz-stats .pb-lg-0,\n  #canvas-quiz-stats .py-lg-0 {\n    padding-bottom: 0 !important;\n  }\n  #canvas-quiz-stats .pl-lg-0,\n  #canvas-quiz-stats .px-lg-0 {\n    padding-left: 0 !important;\n  }\n  #canvas-quiz-stats .p-lg-1 {\n    padding: 0.25rem !important;\n  }\n  #canvas-quiz-stats .pt-lg-1,\n  #canvas-quiz-stats .py-lg-1 {\n    padding-top: 0.25rem !important;\n  }\n  #canvas-quiz-stats .pr-lg-1,\n  #canvas-quiz-stats .px-lg-1 {\n    padding-right: 0.25rem !important;\n  }\n  #canvas-quiz-stats .pb-lg-1,\n  #canvas-quiz-stats .py-lg-1 {\n    padding-bottom: 0.25rem !important;\n  }\n  #canvas-quiz-stats .pl-lg-1,\n  #canvas-quiz-stats .px-lg-1 {\n    padding-left: 0.25rem !important;\n  }\n  #canvas-quiz-stats .p-lg-2 {\n    padding: 0.5rem !important;\n  }\n  #canvas-quiz-stats .pt-lg-2,\n  #canvas-quiz-stats .py-lg-2 {\n    padding-top: 0.5rem !important;\n  }\n  #canvas-quiz-stats .pr-lg-2,\n  #canvas-quiz-stats .px-lg-2 {\n    padding-right: 0.5rem !important;\n  }\n  #canvas-quiz-stats .pb-lg-2,\n  #canvas-quiz-stats .py-lg-2 {\n    padding-bottom: 0.5rem !important;\n  }\n  #canvas-quiz-stats .pl-lg-2,\n  #canvas-quiz-stats .px-lg-2 {\n    padding-left: 0.5rem !important;\n  }\n  #canvas-quiz-stats .p-lg-3 {\n    padding: 1rem !important;\n  }\n  #canvas-quiz-stats .pt-lg-3,\n  #canvas-quiz-stats .py-lg-3 {\n    padding-top: 1rem !important;\n  }\n  #canvas-quiz-stats .pr-lg-3,\n  #canvas-quiz-stats .px-lg-3 {\n    padding-right: 1rem !important;\n  }\n  #canvas-quiz-stats .pb-lg-3,\n  #canvas-quiz-stats .py-lg-3 {\n    padding-bottom: 1rem !important;\n  }\n  #canvas-quiz-stats .pl-lg-3,\n  #canvas-quiz-stats .px-lg-3 {\n    padding-left: 1rem !important;\n  }\n  #canvas-quiz-stats .p-lg-4 {\n    padding: 1.5rem !important;\n  }\n  #canvas-quiz-stats .pt-lg-4,\n  #canvas-quiz-stats .py-lg-4 {\n    padding-top: 1.5rem !important;\n  }\n  #canvas-quiz-stats .pr-lg-4,\n  #canvas-quiz-stats .px-lg-4 {\n    padding-right: 1.5rem !important;\n  }\n  #canvas-quiz-stats .pb-lg-4,\n  #canvas-quiz-stats .py-lg-4 {\n    padding-bottom: 1.5rem !important;\n  }\n  #canvas-quiz-stats .pl-lg-4,\n  #canvas-quiz-stats .px-lg-4 {\n    padding-left: 1.5rem !important;\n  }\n  #canvas-quiz-stats .p-lg-5 {\n    padding: 3rem !important;\n  }\n  #canvas-quiz-stats .pt-lg-5,\n  #canvas-quiz-stats .py-lg-5 {\n    padding-top: 3rem !important;\n  }\n  #canvas-quiz-stats .pr-lg-5,\n  #canvas-quiz-stats .px-lg-5 {\n    padding-right: 3rem !important;\n  }\n  #canvas-quiz-stats .pb-lg-5,\n  #canvas-quiz-stats .py-lg-5 {\n    padding-bottom: 3rem !important;\n  }\n  #canvas-quiz-stats .pl-lg-5,\n  #canvas-quiz-stats .px-lg-5 {\n    padding-left: 3rem !important;\n  }\n  #canvas-quiz-stats .m-lg-n1 {\n    margin: -0.25rem !important;\n  }\n  #canvas-quiz-stats .mt-lg-n1,\n  #canvas-quiz-stats .my-lg-n1 {\n    margin-top: -0.25rem !important;\n  }\n  #canvas-quiz-stats .mr-lg-n1,\n  #canvas-quiz-stats .mx-lg-n1 {\n    margin-right: -0.25rem !important;\n  }\n  #canvas-quiz-stats .mb-lg-n1,\n  #canvas-quiz-stats .my-lg-n1 {\n    margin-bottom: -0.25rem !important;\n  }\n  #canvas-quiz-stats .ml-lg-n1,\n  #canvas-quiz-stats .mx-lg-n1 {\n    margin-left: -0.25rem !important;\n  }\n  #canvas-quiz-stats .m-lg-n2 {\n    margin: -0.5rem !important;\n  }\n  #canvas-quiz-stats .mt-lg-n2,\n  #canvas-quiz-stats .my-lg-n2 {\n    margin-top: -0.5rem !important;\n  }\n  #canvas-quiz-stats .mr-lg-n2,\n  #canvas-quiz-stats .mx-lg-n2 {\n    margin-right: -0.5rem !important;\n  }\n  #canvas-quiz-stats .mb-lg-n2,\n  #canvas-quiz-stats .my-lg-n2 {\n    margin-bottom: -0.5rem !important;\n  }\n  #canvas-quiz-stats .ml-lg-n2,\n  #canvas-quiz-stats .mx-lg-n2 {\n    margin-left: -0.5rem !important;\n  }\n  #canvas-quiz-stats .m-lg-n3 {\n    margin: -1rem !important;\n  }\n  #canvas-quiz-stats .mt-lg-n3,\n  #canvas-quiz-stats .my-lg-n3 {\n    margin-top: -1rem !important;\n  }\n  #canvas-quiz-stats .mr-lg-n3,\n  #canvas-quiz-stats .mx-lg-n3 {\n    margin-right: -1rem !important;\n  }\n  #canvas-quiz-stats .mb-lg-n3,\n  #canvas-quiz-stats .my-lg-n3 {\n    margin-bottom: -1rem !important;\n  }\n  #canvas-quiz-stats .ml-lg-n3,\n  #canvas-quiz-stats .mx-lg-n3 {\n    margin-left: -1rem !important;\n  }\n  #canvas-quiz-stats .m-lg-n4 {\n    margin: -1.5rem !important;\n  }\n  #canvas-quiz-stats .mt-lg-n4,\n  #canvas-quiz-stats .my-lg-n4 {\n    margin-top: -1.5rem !important;\n  }\n  #canvas-quiz-stats .mr-lg-n4,\n  #canvas-quiz-stats .mx-lg-n4 {\n    margin-right: -1.5rem !important;\n  }\n  #canvas-quiz-stats .mb-lg-n4,\n  #canvas-quiz-stats .my-lg-n4 {\n    margin-bottom: -1.5rem !important;\n  }\n  #canvas-quiz-stats .ml-lg-n4,\n  #canvas-quiz-stats .mx-lg-n4 {\n    margin-left: -1.5rem !important;\n  }\n  #canvas-quiz-stats .m-lg-n5 {\n    margin: -3rem !important;\n  }\n  #canvas-quiz-stats .mt-lg-n5,\n  #canvas-quiz-stats .my-lg-n5 {\n    margin-top: -3rem !important;\n  }\n  #canvas-quiz-stats .mr-lg-n5,\n  #canvas-quiz-stats .mx-lg-n5 {\n    margin-right: -3rem !important;\n  }\n  #canvas-quiz-stats .mb-lg-n5,\n  #canvas-quiz-stats .my-lg-n5 {\n    margin-bottom: -3rem !important;\n  }\n  #canvas-quiz-stats .ml-lg-n5,\n  #canvas-quiz-stats .mx-lg-n5 {\n    margin-left: -3rem !important;\n  }\n  #canvas-quiz-stats .m-lg-auto {\n    margin: auto !important;\n  }\n  #canvas-quiz-stats .mt-lg-auto,\n  #canvas-quiz-stats .my-lg-auto {\n    margin-top: auto !important;\n  }\n  #canvas-quiz-stats .mr-lg-auto,\n  #canvas-quiz-stats .mx-lg-auto {\n    margin-right: auto !important;\n  }\n  #canvas-quiz-stats .mb-lg-auto,\n  #canvas-quiz-stats .my-lg-auto {\n    margin-bottom: auto !important;\n  }\n  #canvas-quiz-stats .ml-lg-auto,\n  #canvas-quiz-stats .mx-lg-auto {\n    margin-left: auto !important;\n  }\n}\n@media (min-width: 1200px) {\n  #canvas-quiz-stats .m-xl-0 {\n    margin: 0 !important;\n  }\n  #canvas-quiz-stats .mt-xl-0,\n  #canvas-quiz-stats .my-xl-0 {\n    margin-top: 0 !important;\n  }\n  #canvas-quiz-stats .mr-xl-0,\n  #canvas-quiz-stats .mx-xl-0 {\n    margin-right: 0 !important;\n  }\n  #canvas-quiz-stats .mb-xl-0,\n  #canvas-quiz-stats .my-xl-0 {\n    margin-bottom: 0 !important;\n  }\n  #canvas-quiz-stats .ml-xl-0,\n  #canvas-quiz-stats .mx-xl-0 {\n    margin-left: 0 !important;\n  }\n  #canvas-quiz-stats .m-xl-1 {\n    margin: 0.25rem !important;\n  }\n  #canvas-quiz-stats .mt-xl-1,\n  #canvas-quiz-stats .my-xl-1 {\n    margin-top: 0.25rem !important;\n  }\n  #canvas-quiz-stats .mr-xl-1,\n  #canvas-quiz-stats .mx-xl-1 {\n    margin-right: 0.25rem !important;\n  }\n  #canvas-quiz-stats .mb-xl-1,\n  #canvas-quiz-stats .my-xl-1 {\n    margin-bottom: 0.25rem !important;\n  }\n  #canvas-quiz-stats .ml-xl-1,\n  #canvas-quiz-stats .mx-xl-1 {\n    margin-left: 0.25rem !important;\n  }\n  #canvas-quiz-stats .m-xl-2 {\n    margin: 0.5rem !important;\n  }\n  #canvas-quiz-stats .mt-xl-2,\n  #canvas-quiz-stats .my-xl-2 {\n    margin-top: 0.5rem !important;\n  }\n  #canvas-quiz-stats .mr-xl-2,\n  #canvas-quiz-stats .mx-xl-2 {\n    margin-right: 0.5rem !important;\n  }\n  #canvas-quiz-stats .mb-xl-2,\n  #canvas-quiz-stats .my-xl-2 {\n    margin-bottom: 0.5rem !important;\n  }\n  #canvas-quiz-stats .ml-xl-2,\n  #canvas-quiz-stats .mx-xl-2 {\n    margin-left: 0.5rem !important;\n  }\n  #canvas-quiz-stats .m-xl-3 {\n    margin: 1rem !important;\n  }\n  #canvas-quiz-stats .mt-xl-3,\n  #canvas-quiz-stats .my-xl-3 {\n    margin-top: 1rem !important;\n  }\n  #canvas-quiz-stats .mr-xl-3,\n  #canvas-quiz-stats .mx-xl-3 {\n    margin-right: 1rem !important;\n  }\n  #canvas-quiz-stats .mb-xl-3,\n  #canvas-quiz-stats .my-xl-3 {\n    margin-bottom: 1rem !important;\n  }\n  #canvas-quiz-stats .ml-xl-3,\n  #canvas-quiz-stats .mx-xl-3 {\n    margin-left: 1rem !important;\n  }\n  #canvas-quiz-stats .m-xl-4 {\n    margin: 1.5rem !important;\n  }\n  #canvas-quiz-stats .mt-xl-4,\n  #canvas-quiz-stats .my-xl-4 {\n    margin-top: 1.5rem !important;\n  }\n  #canvas-quiz-stats .mr-xl-4,\n  #canvas-quiz-stats .mx-xl-4 {\n    margin-right: 1.5rem !important;\n  }\n  #canvas-quiz-stats .mb-xl-4,\n  #canvas-quiz-stats .my-xl-4 {\n    margin-bottom: 1.5rem !important;\n  }\n  #canvas-quiz-stats .ml-xl-4,\n  #canvas-quiz-stats .mx-xl-4 {\n    margin-left: 1.5rem !important;\n  }\n  #canvas-quiz-stats .m-xl-5 {\n    margin: 3rem !important;\n  }\n  #canvas-quiz-stats .mt-xl-5,\n  #canvas-quiz-stats .my-xl-5 {\n    margin-top: 3rem !important;\n  }\n  #canvas-quiz-stats .mr-xl-5,\n  #canvas-quiz-stats .mx-xl-5 {\n    margin-right: 3rem !important;\n  }\n  #canvas-quiz-stats .mb-xl-5,\n  #canvas-quiz-stats .my-xl-5 {\n    margin-bottom: 3rem !important;\n  }\n  #canvas-quiz-stats .ml-xl-5,\n  #canvas-quiz-stats .mx-xl-5 {\n    margin-left: 3rem !important;\n  }\n  #canvas-quiz-stats .p-xl-0 {\n    padding: 0 !important;\n  }\n  #canvas-quiz-stats .pt-xl-0,\n  #canvas-quiz-stats .py-xl-0 {\n    padding-top: 0 !important;\n  }\n  #canvas-quiz-stats .pr-xl-0,\n  #canvas-quiz-stats .px-xl-0 {\n    padding-right: 0 !important;\n  }\n  #canvas-quiz-stats .pb-xl-0,\n  #canvas-quiz-stats .py-xl-0 {\n    padding-bottom: 0 !important;\n  }\n  #canvas-quiz-stats .pl-xl-0,\n  #canvas-quiz-stats .px-xl-0 {\n    padding-left: 0 !important;\n  }\n  #canvas-quiz-stats .p-xl-1 {\n    padding: 0.25rem !important;\n  }\n  #canvas-quiz-stats .pt-xl-1,\n  #canvas-quiz-stats .py-xl-1 {\n    padding-top: 0.25rem !important;\n  }\n  #canvas-quiz-stats .pr-xl-1,\n  #canvas-quiz-stats .px-xl-1 {\n    padding-right: 0.25rem !important;\n  }\n  #canvas-quiz-stats .pb-xl-1,\n  #canvas-quiz-stats .py-xl-1 {\n    padding-bottom: 0.25rem !important;\n  }\n  #canvas-quiz-stats .pl-xl-1,\n  #canvas-quiz-stats .px-xl-1 {\n    padding-left: 0.25rem !important;\n  }\n  #canvas-quiz-stats .p-xl-2 {\n    padding: 0.5rem !important;\n  }\n  #canvas-quiz-stats .pt-xl-2,\n  #canvas-quiz-stats .py-xl-2 {\n    padding-top: 0.5rem !important;\n  }\n  #canvas-quiz-stats .pr-xl-2,\n  #canvas-quiz-stats .px-xl-2 {\n    padding-right: 0.5rem !important;\n  }\n  #canvas-quiz-stats .pb-xl-2,\n  #canvas-quiz-stats .py-xl-2 {\n    padding-bottom: 0.5rem !important;\n  }\n  #canvas-quiz-stats .pl-xl-2,\n  #canvas-quiz-stats .px-xl-2 {\n    padding-left: 0.5rem !important;\n  }\n  #canvas-quiz-stats .p-xl-3 {\n    padding: 1rem !important;\n  }\n  #canvas-quiz-stats .pt-xl-3,\n  #canvas-quiz-stats .py-xl-3 {\n    padding-top: 1rem !important;\n  }\n  #canvas-quiz-stats .pr-xl-3,\n  #canvas-quiz-stats .px-xl-3 {\n    padding-right: 1rem !important;\n  }\n  #canvas-quiz-stats .pb-xl-3,\n  #canvas-quiz-stats .py-xl-3 {\n    padding-bottom: 1rem !important;\n  }\n  #canvas-quiz-stats .pl-xl-3,\n  #canvas-quiz-stats .px-xl-3 {\n    padding-left: 1rem !important;\n  }\n  #canvas-quiz-stats .p-xl-4 {\n    padding: 1.5rem !important;\n  }\n  #canvas-quiz-stats .pt-xl-4,\n  #canvas-quiz-stats .py-xl-4 {\n    padding-top: 1.5rem !important;\n  }\n  #canvas-quiz-stats .pr-xl-4,\n  #canvas-quiz-stats .px-xl-4 {\n    padding-right: 1.5rem !important;\n  }\n  #canvas-quiz-stats .pb-xl-4,\n  #canvas-quiz-stats .py-xl-4 {\n    padding-bottom: 1.5rem !important;\n  }\n  #canvas-quiz-stats .pl-xl-4,\n  #canvas-quiz-stats .px-xl-4 {\n    padding-left: 1.5rem !important;\n  }\n  #canvas-quiz-stats .p-xl-5 {\n    padding: 3rem !important;\n  }\n  #canvas-quiz-stats .pt-xl-5,\n  #canvas-quiz-stats .py-xl-5 {\n    padding-top: 3rem !important;\n  }\n  #canvas-quiz-stats .pr-xl-5,\n  #canvas-quiz-stats .px-xl-5 {\n    padding-right: 3rem !important;\n  }\n  #canvas-quiz-stats .pb-xl-5,\n  #canvas-quiz-stats .py-xl-5 {\n    padding-bottom: 3rem !important;\n  }\n  #canvas-quiz-stats .pl-xl-5,\n  #canvas-quiz-stats .px-xl-5 {\n    padding-left: 3rem !important;\n  }\n  #canvas-quiz-stats .m-xl-n1 {\n    margin: -0.25rem !important;\n  }\n  #canvas-quiz-stats .mt-xl-n1,\n  #canvas-quiz-stats .my-xl-n1 {\n    margin-top: -0.25rem !important;\n  }\n  #canvas-quiz-stats .mr-xl-n1,\n  #canvas-quiz-stats .mx-xl-n1 {\n    margin-right: -0.25rem !important;\n  }\n  #canvas-quiz-stats .mb-xl-n1,\n  #canvas-quiz-stats .my-xl-n1 {\n    margin-bottom: -0.25rem !important;\n  }\n  #canvas-quiz-stats .ml-xl-n1,\n  #canvas-quiz-stats .mx-xl-n1 {\n    margin-left: -0.25rem !important;\n  }\n  #canvas-quiz-stats .m-xl-n2 {\n    margin: -0.5rem !important;\n  }\n  #canvas-quiz-stats .mt-xl-n2,\n  #canvas-quiz-stats .my-xl-n2 {\n    margin-top: -0.5rem !important;\n  }\n  #canvas-quiz-stats .mr-xl-n2,\n  #canvas-quiz-stats .mx-xl-n2 {\n    margin-right: -0.5rem !important;\n  }\n  #canvas-quiz-stats .mb-xl-n2,\n  #canvas-quiz-stats .my-xl-n2 {\n    margin-bottom: -0.5rem !important;\n  }\n  #canvas-quiz-stats .ml-xl-n2,\n  #canvas-quiz-stats .mx-xl-n2 {\n    margin-left: -0.5rem !important;\n  }\n  #canvas-quiz-stats .m-xl-n3 {\n    margin: -1rem !important;\n  }\n  #canvas-quiz-stats .mt-xl-n3,\n  #canvas-quiz-stats .my-xl-n3 {\n    margin-top: -1rem !important;\n  }\n  #canvas-quiz-stats .mr-xl-n3,\n  #canvas-quiz-stats .mx-xl-n3 {\n    margin-right: -1rem !important;\n  }\n  #canvas-quiz-stats .mb-xl-n3,\n  #canvas-quiz-stats .my-xl-n3 {\n    margin-bottom: -1rem !important;\n  }\n  #canvas-quiz-stats .ml-xl-n3,\n  #canvas-quiz-stats .mx-xl-n3 {\n    margin-left: -1rem !important;\n  }\n  #canvas-quiz-stats .m-xl-n4 {\n    margin: -1.5rem !important;\n  }\n  #canvas-quiz-stats .mt-xl-n4,\n  #canvas-quiz-stats .my-xl-n4 {\n    margin-top: -1.5rem !important;\n  }\n  #canvas-quiz-stats .mr-xl-n4,\n  #canvas-quiz-stats .mx-xl-n4 {\n    margin-right: -1.5rem !important;\n  }\n  #canvas-quiz-stats .mb-xl-n4,\n  #canvas-quiz-stats .my-xl-n4 {\n    margin-bottom: -1.5rem !important;\n  }\n  #canvas-quiz-stats .ml-xl-n4,\n  #canvas-quiz-stats .mx-xl-n4 {\n    margin-left: -1.5rem !important;\n  }\n  #canvas-quiz-stats .m-xl-n5 {\n    margin: -3rem !important;\n  }\n  #canvas-quiz-stats .mt-xl-n5,\n  #canvas-quiz-stats .my-xl-n5 {\n    margin-top: -3rem !important;\n  }\n  #canvas-quiz-stats .mr-xl-n5,\n  #canvas-quiz-stats .mx-xl-n5 {\n    margin-right: -3rem !important;\n  }\n  #canvas-quiz-stats .mb-xl-n5,\n  #canvas-quiz-stats .my-xl-n5 {\n    margin-bottom: -3rem !important;\n  }\n  #canvas-quiz-stats .ml-xl-n5,\n  #canvas-quiz-stats .mx-xl-n5 {\n    margin-left: -3rem !important;\n  }\n  #canvas-quiz-stats .m-xl-auto {\n    margin: auto !important;\n  }\n  #canvas-quiz-stats .mt-xl-auto,\n  #canvas-quiz-stats .my-xl-auto {\n    margin-top: auto !important;\n  }\n  #canvas-quiz-stats .mr-xl-auto,\n  #canvas-quiz-stats .mx-xl-auto {\n    margin-right: auto !important;\n  }\n  #canvas-quiz-stats .mb-xl-auto,\n  #canvas-quiz-stats .my-xl-auto {\n    margin-bottom: auto !important;\n  }\n  #canvas-quiz-stats .ml-xl-auto,\n  #canvas-quiz-stats .mx-xl-auto {\n    margin-left: auto !important;\n  }\n}\n#canvas-quiz-stats .stretched-link::after {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1;\n  pointer-events: auto;\n  content: \"\";\n  background-color: rgba(0, 0, 0, 0);\n}\n#canvas-quiz-stats .text-monospace {\n  font-family: SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace !important;\n}\n#canvas-quiz-stats .text-justify {\n  text-align: justify !important;\n}\n#canvas-quiz-stats .text-wrap {\n  white-space: normal !important;\n}\n#canvas-quiz-stats .text-nowrap {\n  white-space: nowrap !important;\n}\n#canvas-quiz-stats .text-truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n#canvas-quiz-stats .text-left {\n  text-align: left !important;\n}\n#canvas-quiz-stats .text-right {\n  text-align: right !important;\n}\n#canvas-quiz-stats .text-center {\n  text-align: center !important;\n}\n@media (min-width: 576px) {\n  #canvas-quiz-stats .text-sm-left {\n    text-align: left !important;\n  }\n  #canvas-quiz-stats .text-sm-right {\n    text-align: right !important;\n  }\n  #canvas-quiz-stats .text-sm-center {\n    text-align: center !important;\n  }\n}\n@media (min-width: 768px) {\n  #canvas-quiz-stats .text-md-left {\n    text-align: left !important;\n  }\n  #canvas-quiz-stats .text-md-right {\n    text-align: right !important;\n  }\n  #canvas-quiz-stats .text-md-center {\n    text-align: center !important;\n  }\n}\n@media (min-width: 992px) {\n  #canvas-quiz-stats .text-lg-left {\n    text-align: left !important;\n  }\n  #canvas-quiz-stats .text-lg-right {\n    text-align: right !important;\n  }\n  #canvas-quiz-stats .text-lg-center {\n    text-align: center !important;\n  }\n}\n@media (min-width: 1200px) {\n  #canvas-quiz-stats .text-xl-left {\n    text-align: left !important;\n  }\n  #canvas-quiz-stats .text-xl-right {\n    text-align: right !important;\n  }\n  #canvas-quiz-stats .text-xl-center {\n    text-align: center !important;\n  }\n}\n#canvas-quiz-stats .text-lowercase {\n  text-transform: lowercase !important;\n}\n#canvas-quiz-stats .text-uppercase {\n  text-transform: uppercase !important;\n}\n#canvas-quiz-stats .text-capitalize {\n  text-transform: capitalize !important;\n}\n#canvas-quiz-stats .font-weight-light {\n  font-weight: 300 !important;\n}\n#canvas-quiz-stats .font-weight-lighter {\n  font-weight: lighter !important;\n}\n#canvas-quiz-stats .font-weight-normal {\n  font-weight: 400 !important;\n}\n#canvas-quiz-stats .font-weight-bold {\n  font-weight: 700 !important;\n}\n#canvas-quiz-stats .font-weight-bolder {\n  font-weight: bolder !important;\n}\n#canvas-quiz-stats .font-italic {\n  font-style: italic !important;\n}\n#canvas-quiz-stats .text-white {\n  color: #fff !important;\n}\n#canvas-quiz-stats .text-primary {\n  color: #007bff !important;\n}\n#canvas-quiz-stats a.text-primary:hover,\n#canvas-quiz-stats a.text-primary:focus {\n  color: #0056b3 !important;\n}\n#canvas-quiz-stats .text-secondary {\n  color: #6c757d !important;\n}\n#canvas-quiz-stats a.text-secondary:hover,\n#canvas-quiz-stats a.text-secondary:focus {\n  color: #494f54 !important;\n}\n#canvas-quiz-stats .text-success {\n  color: #28a745 !important;\n}\n#canvas-quiz-stats a.text-success:hover,\n#canvas-quiz-stats a.text-success:focus {\n  color: #19692c !important;\n}\n#canvas-quiz-stats .text-info {\n  color: #17a2b8 !important;\n}\n#canvas-quiz-stats a.text-info:hover,\n#canvas-quiz-stats a.text-info:focus {\n  color: #0f6674 !important;\n}\n#canvas-quiz-stats .text-warning {\n  color: #ffc107 !important;\n}\n#canvas-quiz-stats a.text-warning:hover,\n#canvas-quiz-stats a.text-warning:focus {\n  color: #ba8b00 !important;\n}\n#canvas-quiz-stats .text-danger {\n  color: #dc3545 !important;\n}\n#canvas-quiz-stats a.text-danger:hover,\n#canvas-quiz-stats a.text-danger:focus {\n  color: #a71d2a !important;\n}\n#canvas-quiz-stats .text-light {\n  color: #f8f9fa !important;\n}\n#canvas-quiz-stats a.text-light:hover,\n#canvas-quiz-stats a.text-light:focus {\n  color: #cbd3da !important;\n}\n#canvas-quiz-stats .text-dark {\n  color: #343a40 !important;\n}\n#canvas-quiz-stats a.text-dark:hover,\n#canvas-quiz-stats a.text-dark:focus {\n  color: #121416 !important;\n}\n#canvas-quiz-stats .text-body {\n  color: #212529 !important;\n}\n#canvas-quiz-stats .text-muted {\n  color: #6c757d !important;\n}\n#canvas-quiz-stats .text-black-50 {\n  color: rgba(0, 0, 0, 0.5) !important;\n}\n#canvas-quiz-stats .text-white-50 {\n  color: rgba(255, 255, 255, 0.5) !important;\n}\n#canvas-quiz-stats .text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0;\n}\n#canvas-quiz-stats .text-decoration-none {\n  text-decoration: none !important;\n}\n#canvas-quiz-stats .text-break {\n  word-break: break-word !important;\n  word-wrap: break-word !important;\n}\n#canvas-quiz-stats .text-reset {\n  color: inherit !important;\n}\n#canvas-quiz-stats .visible {\n  visibility: visible !important;\n}\n#canvas-quiz-stats .invisible {\n  visibility: hidden !important;\n}\n@media print {\n  #canvas-quiz-stats *,\n  #canvas-quiz-stats *::before,\n  #canvas-quiz-stats *::after {\n    text-shadow: none !important;\n    box-shadow: none !important;\n  }\n  #canvas-quiz-stats a:not(.btn) {\n    text-decoration: underline;\n  }\n  #canvas-quiz-stats abbr[title]::after {\n    content: \" (\" attr(title) \")\";\n  }\n  #canvas-quiz-stats pre {\n    white-space: pre-wrap !important;\n  }\n  #canvas-quiz-stats pre,\n  #canvas-quiz-stats blockquote {\n    border: 1px solid #adb5bd;\n    page-break-inside: avoid;\n  }\n  #canvas-quiz-stats thead {\n    display: table-header-group;\n  }\n  #canvas-quiz-stats tr,\n  #canvas-quiz-stats img {\n    page-break-inside: avoid;\n  }\n  #canvas-quiz-stats p,\n  #canvas-quiz-stats h2,\n  #canvas-quiz-stats h3 {\n    orphans: 3;\n    widows: 3;\n  }\n  #canvas-quiz-stats h2,\n  #canvas-quiz-stats h3 {\n    page-break-after: avoid;\n  }\n  @page {\n    size: a3;\n  }\n  #canvas-quiz-stats body {\n    min-width: 992px !important;\n  }\n  #canvas-quiz-stats .container {\n    min-width: 992px !important;\n  }\n  #canvas-quiz-stats .navbar {\n    display: none;\n  }\n  #canvas-quiz-stats .badge {\n    border: 1px solid #000;\n  }\n  #canvas-quiz-stats .table {\n    border-collapse: collapse !important;\n  }\n  #canvas-quiz-stats .table td,\n  #canvas-quiz-stats .table th {\n    background-color: #fff !important;\n  }\n  #canvas-quiz-stats .table-bordered th,\n  #canvas-quiz-stats .table-bordered td {\n    border: 1px solid #dee2e6 !important;\n  }\n  #canvas-quiz-stats .table-dark {\n    color: inherit;\n  }\n  #canvas-quiz-stats .table-dark th,\n  #canvas-quiz-stats .table-dark td,\n  #canvas-quiz-stats .table-dark thead th,\n  #canvas-quiz-stats .table-dark tbody + tbody {\n    border-color: #dee2e6;\n  }\n  #canvas-quiz-stats .table .thead-dark th {\n    color: inherit;\n    border-color: #dee2e6;\n  }\n}\n";
                    el.type = "text/css";
                    document.head.appendChild(el);
                })();