(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
window.devMode = true;
},{}]},{},[1]);

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global,setImmediate){
!(function(t) {
  if ('object' == typeof exports && 'undefined' != typeof module) module.exports = t();
  else if ('function' == typeof define && define.amd) define([], t);
  else {
    ('undefined' != typeof window
      ? window
      : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
          ? self
          : this
    ).Promise = t();
  }
})(function() {
  return (function o(n, c, l) {
    function u(e, t) {
      if (!c[e]) {
        if (!n[e]) {
          var i = 'function' == typeof require && require;
          if (!t && i) return i(e, !0);
          if (a) return a(e, !0);
          var r = new Error("Cannot find module '" + e + "'");
          throw ((r.code = 'MODULE_NOT_FOUND'), r);
        }
        var s = (c[e] = { exports: {} });
        n[e][0].call(
          s.exports,
          function(t) {
            return u(n[e][1][t] || t);
          },
          s,
          s.exports,
          o,
          n,
          c,
          l
        );
      }
      return c[e].exports;
    }
    for (var a = 'function' == typeof require && require, t = 0; t < l.length; t++) u(l[t]);
    return u;
  })(
    {
      1: [
        function(t, e, i) {
          'use strict';
          t('setimmediate'), (e.exports = t('./lib/aigle'));
        },
        { './lib/aigle': 2, setimmediate: 84 }
      ],
      2: [
        function(ur, ar, t) {
          (function(l) {
            'use strict';
            var t = ur('aigle-core'),
              c = t.AigleCore,
              u = t.AigleProxy,
              a = ur('./internal/queue'),
              s = ur('./internal/async'),
              e = ur('./internal/util'),
              i = e.VERSION,
              h = e.INTERNAL,
              _ = e.PENDING,
              p = e.UNHANDLED,
              f = e.errorObj,
              v = e.call0,
              y = e.callResolve,
              m = e.callReject,
              r = e.callReceiver,
              d = !1,
              g = (function(e) {
                function n(t) {
                  e.call(this),
                    (this._resolved = 0),
                    (this._value = void 0),
                    (this._key = void 0),
                    (this._receiver = void 0),
                    (this._onFulfilled = void 0),
                    (this._onRejected = void 0),
                    (this._receivers = void 0),
                    t !== h && this._execute(t);
                }
                return (
                  e && (n.__proto__ = e),
                  (((n.prototype = Object.create(e && e.prototype)).constructor = n).prototype.then = function(t, e) {
                    return nr(this, new n(h), t, e);
                  }),
                  (n.prototype.catch = function(t) {
                    var r,
                      s,
                      e = arguments;
                    if (1 < arguments.length) {
                      var i = arguments.length;
                      if ('function' == typeof (t = arguments[--i])) {
                        for (var o = Array(i); i--; ) o[i] = e[i];
                        (r = o),
                          (s = t),
                          (t = function(t) {
                            for (var e = r.length; e--; ) {
                              var i = r[e];
                              if (i === Error || i.prototype instanceof Error) {
                                if (t instanceof i) return s(t);
                              } else if (i(t)) return s(t);
                            }
                            return (f.e = t), f;
                          });
                      }
                    }
                    return nr(this, new n(h), void 0, t);
                  }),
                  (n.prototype.finally = function(t) {
                    var s, o;
                    return (
                      (t =
                        'function' != typeof t
                          ? t
                          : ((s = this),
                            (o = t),
                            function() {
                              var t = s._resolved,
                                e = s._value,
                                i = v(o);
                              if (i === f) return i;
                              if (i instanceof c)
                                switch (i._resolved) {
                                  case 1:
                                    return (i._value = e), i;
                                  case 2:
                                    return i;
                                }
                              var r = new g(h);
                              return (
                                i && i.then
                                  ? 1 === t
                                    ? i.then(
                                        function() {
                                          return r._resolve(e);
                                        },
                                        function(t) {
                                          return r._reject(t);
                                        }
                                      )
                                    : i.then(
                                        function() {
                                          return r._reject(e);
                                        },
                                        function(t) {
                                          return r._reject(t);
                                        }
                                      )
                                  : ((r._resolved = t), (r._value = e)),
                                r
                              );
                            })),
                      nr(this, new n(h), t, t)
                    );
                  }),
                  (n.prototype.toString = function() {
                    return '[object Promise]';
                  }),
                  (n.prototype.isPending = function() {
                    return 0 === this._resolved;
                  }),
                  (n.prototype.isFulfilled = function() {
                    return 1 === this._resolved;
                  }),
                  (n.prototype.isRejected = function() {
                    return 2 === this._resolved;
                  }),
                  (n.prototype.isCancelled = function() {
                    return this._value instanceof er;
                  }),
                  (n.prototype.value = function() {
                    return 1 === this._resolved ? this._value : void 0;
                  }),
                  (n.prototype.reason = function() {
                    return 2 === this._resolved ? this._value : void 0;
                  }),
                  (n.prototype.cancel = function() {
                    if (this._execute !== sr && 0 === this._resolved) {
                      var t = this._onCancelQueue;
                      if (t) {
                        var e = -1,
                          i = t.array;
                        for (this._onCancelQueue = void 0; ++e < t.length; ) i[e]();
                      }
                      (this._resolved = 2),
                        (this._value = new er('late cancellation observer')),
                        this._parent && this._parent.cancel();
                    }
                  }),
                  (n.prototype.suppressUnhandledRejections = function() {
                    this._receiver = h;
                  }),
                  (n.prototype.spread = function(t) {
                    return cr(this, new Li(t));
                  }),
                  (n.prototype.all = function() {
                    return lr(this, R);
                  }),
                  (n.prototype.race = function() {
                    return lr(this, L);
                  }),
                  (n.prototype.props = function() {
                    return lr(this, k);
                  }),
                  (n.prototype.parallel = function() {
                    return lr(this, O);
                  }),
                  (n.prototype.each = function(t) {
                    return lr(this, P, t);
                  }),
                  (n.prototype.forEach = function(t) {
                    return lr(this, P, t);
                  }),
                  (n.prototype.eachSeries = function(t) {
                    return lr(this, z, t);
                  }),
                  (n.prototype.forEachSeries = function(t) {
                    return lr(this, z, t);
                  }),
                  (n.prototype.eachLimit = function(t, e) {
                    return lr(this, M, t, e);
                  }),
                  (n.prototype.forEachLimit = function(t, e) {
                    return lr(this, M, t, e);
                  }),
                  (n.prototype.map = function(t) {
                    return lr(this, C, t);
                  }),
                  (n.prototype.mapSeries = function(t) {
                    return lr(this, K, t);
                  }),
                  (n.prototype.mapLimit = function(t, e) {
                    return lr(this, $, t, e);
                  }),
                  (n.prototype.mapValues = function(t) {
                    return lr(this, Z, t);
                  }),
                  (n.prototype.mapValuesSeries = function(t) {
                    return lr(this, tt, t);
                  }),
                  (n.prototype.mapValuesLimit = function(t, e) {
                    return lr(this, rt, t, e);
                  }),
                  (n.prototype.filter = function(t) {
                    return lr(this, nt, t);
                  }),
                  (n.prototype.filterSeries = function(t) {
                    return lr(this, ut, t);
                  }),
                  (n.prototype.filterLimit = function(t, e) {
                    return lr(this, _t, t, e);
                  }),
                  (n.prototype.reject = function(t) {
                    return lr(this, vt, t);
                  }),
                  (n.prototype.rejectSeries = function(t) {
                    return lr(this, dt, t);
                  }),
                  (n.prototype.rejectLimit = function(t, e) {
                    return lr(this, jt, t, e);
                  }),
                  (n.prototype.find = function(t) {
                    return lr(this, Lt, t);
                  }),
                  (n.prototype.findSeries = function(t) {
                    return lr(this, kt, t);
                  }),
                  (n.prototype.findLimit = function(t, e) {
                    return lr(this, Ot, t, e);
                  }),
                  (n.prototype.findIndex = function(t) {
                    return lr(this, Pt, t);
                  }),
                  (n.prototype.findIndexSeries = function(t) {
                    return lr(this, zt, t);
                  }),
                  (n.prototype.findIndexLimit = function(t, e) {
                    return lr(this, Mt, t, e);
                  }),
                  (n.prototype.findKey = function(t) {
                    return lr(this, Ct, t);
                  }),
                  (n.prototype.findKeySeries = function(t) {
                    return lr(this, Kt, t);
                  }),
                  (n.prototype.findKeyLimit = function(t, e) {
                    return lr(this, $t, t, e);
                  }),
                  (n.prototype.pick = function(t) {
                    for (var e = [], i = arguments.length - 1; 0 < i--; ) e[i] = arguments[i + 1];
                    return lr(this, Zt, t, e);
                  }),
                  (n.prototype.pickSeries = function(t) {
                    return this.pickBySeries(t);
                  }),
                  (n.prototype.pickLimit = function(t, e) {
                    return this.pickByLimit(t, e);
                  }),
                  (n.prototype.pickBy = function(t) {
                    return lr(this, te, t);
                  }),
                  (n.prototype.pickBySeries = function(t) {
                    return lr(this, re, t);
                  }),
                  (n.prototype.pickByLimit = function(t, e) {
                    return lr(this, ne, t, e);
                  }),
                  (n.prototype.omit = function(t) {
                    for (var e = [], i = arguments.length - 1; 0 < i--; ) e[i] = arguments[i + 1];
                    return lr(this, ue, t, e);
                  }),
                  (n.prototype.omitSeries = function(t) {
                    return this.omitBySeries(t);
                  }),
                  (n.prototype.omitLimit = function(t, e) {
                    return this.omitByLimit(t, e);
                  }),
                  (n.prototype.omitBy = function(t) {
                    return lr(this, _e, t);
                  }),
                  (n.prototype.omitBySeries = function(t) {
                    return lr(this, ve, t);
                  }),
                  (n.prototype.omitByLimit = function(t, e) {
                    return lr(this, de, t, e);
                  }),
                  (n.prototype.reduce = function(t, e) {
                    return lr(this, je, t, e);
                  }),
                  (n.prototype.transform = function(t, e) {
                    return lr(this, Le, t, e);
                  }),
                  (n.prototype.transformSeries = function(t, e) {
                    return lr(this, ke, t, e);
                  }),
                  (n.prototype.transformLimit = function(t, e, i) {
                    return lr(this, Oe, t, e, i);
                  }),
                  (n.prototype.sortBy = function(t) {
                    return lr(this, Pe, t);
                  }),
                  (n.prototype.sortBySeries = function(t) {
                    return lr(this, ze, t);
                  }),
                  (n.prototype.sortByLimit = function(t, e) {
                    return lr(this, Me, t, e);
                  }),
                  (n.prototype.some = function(t) {
                    return lr(this, Ce, t);
                  }),
                  (n.prototype.someSeries = function(t) {
                    return lr(this, Ke, t);
                  }),
                  (n.prototype.someLimit = function(t, e) {
                    return lr(this, $e, t, e);
                  }),
                  (n.prototype.every = function(t) {
                    return lr(this, Ze, t);
                  }),
                  (n.prototype.everySeries = function(t) {
                    return lr(this, ti, t);
                  }),
                  (n.prototype.everyLimit = function(t, e) {
                    return lr(this, ri, t, e);
                  }),
                  (n.prototype.concat = function(t) {
                    return lr(this, ni, t);
                  }),
                  (n.prototype.concatSeries = function(t) {
                    return lr(this, ui, t);
                  }),
                  (n.prototype.concatLimit = function(t, e) {
                    return lr(this, _i, t, e);
                  }),
                  (n.prototype.groupBy = function(t) {
                    return lr(this, vi, t);
                  }),
                  (n.prototype.groupBySeries = function(t) {
                    return lr(this, di, t);
                  }),
                  (n.prototype.groupByLimit = function(t, e) {
                    return lr(this, ji, t, e);
                  }),
                  (n.prototype.delay = function(t) {
                    return nr(this, new Ai(t));
                  }),
                  (n.prototype.timeout = function(t, e) {
                    return cr(this, new Oi(t, e));
                  }),
                  (n.prototype.whilst = function(e, i) {
                    return this.then(function(t) {
                      return Ni(t, e, i);
                    });
                  }),
                  (n.prototype.doWhilst = function(e, i) {
                    return this.then(function(t) {
                      return Bi(t, e, i);
                    });
                  }),
                  (n.prototype.until = function(e, i) {
                    return this.then(function(t) {
                      return Pi(t, e, i);
                    });
                  }),
                  (n.prototype.doUntil = function(e, i) {
                    return this.then(function(t) {
                      return Ti(t, e, i);
                    });
                  }),
                  (n.prototype.thru = function(e) {
                    return this.then(function(t) {
                      return zi(t, e);
                    });
                  }),
                  (n.prototype.tap = function(e) {
                    return this.then(function(t) {
                      return Di(t, e);
                    });
                  }),
                  (n.prototype.times = function(t) {
                    return lr(this, Wi, t);
                  }),
                  (n.prototype.timesSeries = function(t) {
                    return lr(this, Ui, t);
                  }),
                  (n.prototype.timesLimit = function(t, e) {
                    return lr(this, qi, t, e);
                  }),
                  (n.prototype.disposer = function(t) {
                    return new Ji(this, t);
                  }),
                  (n.prototype._resolve = function(t) {
                    0 === this._resolved &&
                      ((this._resolved = 1), (this._value = t), void 0 !== this._receiver && this._callResolve());
                  }),
                  (n.prototype._callResolve = function() {
                    var t = this._receiver;
                    if (
                      ((this._receiver = void 0),
                      t instanceof u
                        ? t._callResolve(this._value, this._key)
                        : this._key === h
                          ? t._resolve(this._value)
                          : y(t, this._onFulfilled, this._value),
                      this._receivers)
                    ) {
                      var e = this._value,
                        i = this._key,
                        r = this._receivers;
                      this._receivers = void 0;
                      for (var s = -1, o = r.array; ++s < r.length; ) {
                        var n = o[s],
                          c = n.receiver,
                          l = n.onFulfilled;
                        c instanceof u ? c._callResolve(e, i) : y(c, l, e);
                      }
                    }
                  }),
                  (n.prototype._reject = function(t) {
                    if (0 === this._resolved) {
                      if (((this._resolved = 2), (this._value = t), void 0 === this._receiver))
                        return (this._receiver = p), void s(this);
                      d && Yi(this), this._callReject();
                    }
                  }),
                  (n.prototype._callReject = function() {
                    var t = this._receiver;
                    if ((this._receiver = void 0) !== t && t !== p) {
                      if (
                        t !== h &&
                        (t instanceof u
                          ? t._callReject(this._value)
                          : this._key === h
                            ? t._reject(this._value)
                            : m(t, this._onRejected, this._value),
                        this._receivers)
                      ) {
                        var e = this._value,
                          i = this._receivers;
                        this._receivers = void 0;
                        for (var r = -1, s = i.array; ++r < i.length; ) {
                          var o = s[r],
                            n = o.receiver,
                            c = o.onRejected;
                          n instanceof u ? n._callReject(e) : m(n, c, e);
                        }
                      }
                    } else l.emit('unhandledRejection', this._value);
                  }),
                  (n.prototype._addReceiver = function(t, e) {
                    (this._key = e), (this._receiver = t);
                  }),
                  n
                );
              })(c);
            (g.prototype._execute = sr), (ar.exports = g), (ar.exports.default = g);
            var o = ur('./all'),
              n = o.all,
              R = o.All,
              j = ur('./attempt'),
              x = ur('./race'),
              S = x.race,
              L = x.Race,
              b = ur('./props'),
              w = b.props,
              k = b.Props,
              E = ur('./parallel'),
              A = E.parallel,
              O = E.Parallel,
              N = ur('./each'),
              B = N.each,
              P = N.Each,
              T = ur('./eachSeries'),
              I = T.eachSeries,
              z = T.EachSeries,
              D = ur('./eachLimit'),
              F = D.eachLimit,
              M = D.EachLimit,
              W = ur('./map'),
              V = W.map,
              C = W.Map,
              U = ur('./mapSeries'),
              G = U.mapSeries,
              K = U.MapSeries,
              q = ur('./mapLimit'),
              H = q.mapLimit,
              $ = q.MapLimit,
              J = ur('./mapValues'),
              Q = J.mapValues,
              Z = J.MapValues,
              Y = ur('./mapValuesSeries'),
              X = Y.mapValuesSeries,
              tt = Y.MapValuesSeries,
              et = ur('./mapValuesLimit'),
              it = et.mapValuesLimit,
              rt = et.MapValuesLimit,
              st = ur('./filter'),
              ot = st.filter,
              nt = st.Filter,
              ct = ur('./filterSeries'),
              lt = ct.filterSeries,
              ut = ct.FilterSeries,
              at = ur('./filterLimit'),
              ht = at.filterLimit,
              _t = at.FilterLimit,
              pt = ur('./reject'),
              ft = pt.reject,
              vt = pt.Reject,
              yt = ur('./rejectSeries'),
              mt = yt.rejectSeries,
              dt = yt.RejectSeries,
              gt = ur('./rejectLimit'),
              Rt = gt.rejectLimit,
              jt = gt.RejectLimit,
              xt = ur('./find'),
              St = xt.find,
              Lt = xt.Find,
              bt = ur('./findSeries'),
              wt = bt.findSeries,
              kt = bt.FindSeries,
              Et = ur('./findLimit'),
              At = Et.findLimit,
              Ot = Et.FindLimit,
              Nt = ur('./findIndex'),
              Bt = Nt.findIndex,
              Pt = Nt.FindIndex,
              Tt = ur('./findIndexSeries'),
              It = Tt.findIndexSeries,
              zt = Tt.FindIndexSeries,
              Dt = ur('./findIndexLimit'),
              Ft = Dt.findIndexLimit,
              Mt = Dt.FindIndexLimit,
              Wt = ur('./findKey'),
              Vt = Wt.findKey,
              Ct = Wt.FindKey,
              Ut = ur('./findKeySeries'),
              Gt = Ut.findKeySeries,
              Kt = Ut.FindKeySeries,
              qt = ur('./findKeyLimit'),
              Ht = qt.findKeyLimit,
              $t = qt.FindKeyLimit,
              Jt = ur('./pick'),
              Qt = Jt.pick,
              Zt = Jt.Pick,
              Yt = ur('./pickBy'),
              Xt = Yt.pickBy,
              te = Yt.PickBy,
              ee = ur('./pickBySeries'),
              ie = ee.pickBySeries,
              re = ee.PickBySeries,
              se = ur('./pickByLimit'),
              oe = se.pickByLimit,
              ne = se.PickByLimit,
              ce = ur('./omit'),
              le = ce.omit,
              ue = ce.Omit,
              ae = ur('./omitBy'),
              he = ae.omitBy,
              _e = ae.OmitBy,
              pe = ur('./omitBySeries'),
              fe = pe.omitBySeries,
              ve = pe.OmitBySeries,
              ye = ur('./omitByLimit'),
              me = ye.omitByLimit,
              de = ye.OmitByLimit,
              ge = ur('./reduce'),
              Re = ge.reduce,
              je = ge.Reduce,
              xe = ur('./transform'),
              Se = xe.transform,
              Le = xe.Transform,
              be = ur('./transformSeries'),
              we = be.transformSeries,
              ke = be.TransformSeries,
              Ee = ur('./transformLimit'),
              Ae = Ee.transformLimit,
              Oe = Ee.TransformLimit,
              Ne = ur('./sortBy'),
              Be = Ne.sortBy,
              Pe = Ne.SortBy,
              Te = ur('./sortBySeries'),
              Ie = Te.sortBySeries,
              ze = Te.SortBySeries,
              De = ur('./sortByLimit'),
              Fe = De.sortByLimit,
              Me = De.SortByLimit,
              We = ur('./some'),
              Ve = We.some,
              Ce = We.Some,
              Ue = ur('./someSeries'),
              Ge = Ue.someSeries,
              Ke = Ue.SomeSeries,
              qe = ur('./someLimit'),
              He = qe.someLimit,
              $e = qe.SomeLimit,
              Je = ur('./every'),
              Qe = Je.every,
              Ze = Je.Every,
              Ye = ur('./everySeries'),
              Xe = Ye.everySeries,
              ti = Ye.EverySeries,
              ei = ur('./everyLimit'),
              ii = ei.everyLimit,
              ri = ei.EveryLimit,
              si = ur('./concat'),
              oi = si.concat,
              ni = si.Concat,
              ci = ur('./concatSeries'),
              li = ci.concatSeries,
              ui = ci.ConcatSeries,
              ai = ur('./concatLimit'),
              hi = ai.concatLimit,
              _i = ai.ConcatLimit,
              pi = ur('./groupBy'),
              fi = pi.groupBy,
              vi = pi.GroupBy,
              yi = ur('./groupBySeries'),
              mi = yi.groupBySeries,
              di = yi.GroupBySeries,
              gi = ur('./groupByLimit'),
              Ri = gi.groupByLimit,
              ji = gi.GroupByLimit,
              xi = ur('./join'),
              Si = xi.join,
              Li = xi.Spread,
              bi = ur('./promisify'),
              wi = ur('./promisifyAll'),
              ki = ur('./delay'),
              Ei = ki.delay,
              Ai = ki.Delay,
              Oi = ur('./timeout'),
              Ni = ur('./whilst').whilst,
              Bi = ur('./doWhilst').doWhilst,
              Pi = ur('./until').until,
              Ti = ur('./doUntil'),
              Ii = ur('./retry'),
              zi = ur('./thru'),
              Di = ur('./tap'),
              Fi = ur('./times'),
              Mi = Fi.times,
              Wi = Fi.Times,
              Vi = ur('./timesSeries'),
              Ci = Vi.timesSeries,
              Ui = Vi.TimesSeries,
              Gi = ur('./timesLimit'),
              Ki = Gi.timesLimit,
              qi = Gi.TimesLimit,
              Hi = ur('./using'),
              $i = Hi.using,
              Ji = Hi.Disposer,
              Qi = ur('./debug'),
              Zi = Qi.resolveStack,
              Yi = Qi.reconstructStack,
              Xi = ur('./internal/mixin').createProxy;
            (g.VERSION = i),
              (g.resolve = rr),
              (g.reject = function(t, e) {
                if (2 === arguments.length && 'function' == typeof e) return ft(t, e);
                var i = new g(h);
                return i._reject(t), i;
              }),
              (g.all = n),
              (g.race = S),
              (g.props = w),
              (g.parallel = A),
              (g.each = B),
              (g.eachSeries = I),
              (g.eachLimit = F),
              (g.forEach = B),
              (g.forEachSeries = I),
              (g.forEachLimit = F),
              (g.map = V),
              (g.mapSeries = G),
              (g.mapLimit = H),
              (g.mapValues = Q),
              (g.mapValuesSeries = X),
              (g.mapValuesLimit = it),
              (g.filter = ot),
              (g.filterSeries = lt),
              (g.filterLimit = ht),
              (g.rejectSeries = mt),
              (g.rejectLimit = Rt),
              (g.find = St),
              (g.findSeries = wt),
              (g.findLimit = At),
              (g.findIndex = Bt),
              (g.findIndexSeries = It),
              (g.findIndexLimit = Ft),
              (g.findKey = Vt),
              (g.findKeySeries = Gt),
              (g.findKeyLimit = Ht),
              (g.detect = St),
              (g.detectSeries = wt),
              (g.detectLimit = At),
              (g.pick = Qt),
              (g.pickSeries = ie),
              (g.pickLimit = oe),
              (g.pickBy = Xt),
              (g.pickBySeries = ie),
              (g.pickByLimit = oe),
              (g.omit = le),
              (g.omitSeries = fe),
              (g.omitLimit = me),
              (g.omitBy = he),
              (g.omitBySeries = fe),
              (g.omitByLimit = me),
              (g.reduce = Re),
              (g.transform = Se),
              (g.transformSeries = we),
              (g.transformLimit = Ae),
              (g.sortBy = Be),
              (g.sortBySeries = Ie),
              (g.sortByLimit = Fe),
              (g.some = Ve),
              (g.someSeries = Ge),
              (g.someLimit = He),
              (g.every = Qe),
              (g.everySeries = Xe),
              (g.everyLimit = ii),
              (g.concat = oi),
              (g.concatSeries = li),
              (g.concatLimit = hi),
              (g.groupBy = fi),
              (g.groupBySeries = mi),
              (g.groupByLimit = Ri),
              (g.attempt = j),
              (g.try = j),
              (g.join = Si),
              (g.promisify = bi),
              (g.promisifyAll = wi),
              (g.delay = Ei),
              (g.whilst = Ni),
              (g.doWhilst = Bi),
              (g.until = Pi),
              (g.doUntil = Ti),
              (g.retry = Ii),
              (g.thru = zi),
              (g.tap = Di),
              (g.times = Mi),
              (g.timesSeries = Ci),
              (g.timesLimit = Ki),
              (g.using = $i),
              (g.mixin = function(r, t) {
                void 0 === t && (t = {});
                var o = t.override,
                  n = t.promisify;
                void 0 === n && (n = !0);
                return (
                  Object.getOwnPropertyNames(r).forEach(function(t) {
                    var e = r[t];
                    if ('function' == typeof e && (!g[t] || o)) {
                      if ('chain' === t) {
                        var i = e();
                        if (i && i.__chain__)
                          return (
                            (g.chain = rr),
                            void (g.prototype.value = function() {
                              return this;
                            })
                          );
                      }
                      var s = Xi(e, n);
                      (g[t] = function(t, e, i, r) {
                        return new s(t, e, i, r)._execute();
                      }),
                        (g.prototype[t] = function(t, e, i) {
                          return lr(this, s, t, e, i);
                        });
                    }
                  }),
                  g
                );
              }),
              (g.config = function(t) {
                void 0 !== (t = t || {}).longStackTraces && (d = !!t.longStackTraces);
                void 0 !== t.cancellation && (g.prototype._execute = t.cancellation ? or : sr);
              }),
              (g.longStackTraces = function() {
                d = !0;
              });
            var tr = ur('./error'),
              er = tr.CancellationError,
              ir = tr.TimeoutError;
            function rr(t) {
              if (t instanceof c) return t;
              var e = new g(h);
              return r(e, t), e;
            }
            function sr(e) {
              var i = this;
              d && Zi(this);
              try {
                e(
                  function(t) {
                    void 0 !== e && ((e = void 0), r(i, t));
                  },
                  function(t) {
                    void 0 !== e && ((e = void 0), i._reject(t));
                  }
                );
              } catch (t) {
                if (void 0 === e) return;
                (e = void 0), this._reject(t);
              }
            }
            function or(e) {
              var i = this;
              d && Zi(this);
              try {
                e(
                  function(t) {
                    void 0 !== e && (t instanceof g && 0 === t._resolved && (i._parent = t), (e = void 0), r(i, t));
                  },
                  function(t) {
                    void 0 !== e && ((e = void 0), i._reject(t));
                  },
                  function(t) {
                    if ('function' != typeof t) throw new TypeError('onCancel must be function');
                    0 === i._resolved &&
                      (void 0 === i._onCancelQueue && (i._onCancelQueue = new a()), i._onCancelQueue.push(t));
                  }
                );
              } catch (t) {
                if (void 0 === e) return;
                (e = void 0), this._reject(t);
              }
            }
            function nr(t, e, i, r) {
              return (
                d && Zi(e, t),
                void 0 === t._receiver || t._receiver === h
                  ? (0 !== t._resolved && s(t), (t._receiver = e), (t._onFulfilled = i), (t._onRejected = r))
                  : t._receiver === p
                    ? ((t._receiver = e), (t._onFulfilled = i), (t._onRejected = r))
                    : (t._receivers || (t._receivers = new a()),
                      t._receivers.push({ receiver: e, onFulfilled: i, onRejected: r })),
                e
              );
            }
            function cr(t, e) {
              return d && Zi(e, t), 0 !== t._resolved && s(t), (t._receiver = e)._promise;
            }
            function lr(t, e, i, r, s) {
              if (d) {
                d = !1;
                var o = lr(t, e, i, r, s);
                return (d = !0), Zi(o, t), o;
              }
              switch (t._resolved) {
                case 0:
                  var n = new e(_, i, r, s);
                  return (
                    void 0 === t._receiver
                      ? (t._receiver = n)
                      : (t._receivers || (t._receivers = new a()), t._receivers.push({ receiver: n })),
                    n._promise
                  );
                case 1:
                  return new e(t._value, i, r, s)._execute();
                case 2:
                  return g.reject(t._value);
              }
            }
            (g.CancellationError = er), (g.TimeoutError = ir);
          }.call(this, ur('_process')));
        },
        {
          './all': 3,
          './attempt': 4,
          './concat': 5,
          './concatLimit': 6,
          './concatSeries': 7,
          './debug': 8,
          './delay': 9,
          './doUntil': 10,
          './doWhilst': 11,
          './each': 12,
          './eachLimit': 13,
          './eachSeries': 14,
          './error': 15,
          './every': 16,
          './everyLimit': 17,
          './everySeries': 18,
          './filter': 19,
          './filterLimit': 20,
          './filterSeries': 21,
          './find': 22,
          './findIndex': 23,
          './findIndexLimit': 24,
          './findIndexSeries': 25,
          './findKey': 26,
          './findKeyLimit': 27,
          './findKeySeries': 28,
          './findLimit': 29,
          './findSeries': 30,
          './groupBy': 31,
          './groupByLimit': 32,
          './groupBySeries': 33,
          './internal/async': 34,
          './internal/mixin': 36,
          './internal/queue': 37,
          './internal/util': 38,
          './join': 39,
          './map': 40,
          './mapLimit': 41,
          './mapSeries': 42,
          './mapValues': 43,
          './mapValuesLimit': 44,
          './mapValuesSeries': 45,
          './omit': 46,
          './omitBy': 47,
          './omitByLimit': 48,
          './omitBySeries': 49,
          './parallel': 50,
          './pick': 51,
          './pickBy': 52,
          './pickByLimit': 53,
          './pickBySeries': 54,
          './promisify': 55,
          './promisifyAll': 56,
          './props': 57,
          './race': 58,
          './reduce': 59,
          './reject': 60,
          './rejectLimit': 61,
          './rejectSeries': 62,
          './retry': 63,
          './some': 64,
          './someLimit': 65,
          './someSeries': 66,
          './sortBy': 67,
          './sortByLimit': 68,
          './sortBySeries': 69,
          './tap': 70,
          './thru': 71,
          './timeout': 72,
          './times': 73,
          './timesLimit': 74,
          './timesSeries': 75,
          './transform': 76,
          './transformLimit': 77,
          './transformSeries': 78,
          './until': 79,
          './using': 80,
          './whilst': 81,
          _process: 83,
          'aigle-core': 82
        }
      ],
      3: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.PENDING,
            l = o.promiseArrayEach,
            u = o.promiseSetEach,
            a = t('./props').callResolve,
            h = (function(e) {
              function t(t) {
                e.call(this),
                  (this._promise = new s(n)),
                  (this._rest = void 0),
                  (this._coll = void 0),
                  (this._result = void 0),
                  t === c ? (this._callResolve = this._set) : ((this._callResolve = void 0), this._set(t));
              }
              return (
                e && (t.__proto__ = e),
                (((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype._set = function(t) {
                  if (Array.isArray(t)) {
                    var e = t.length;
                    (this._rest = e), (this._coll = t), (this._result = Array(e)), (this._callResolve = a), l(this);
                  } else if (t instanceof Set) {
                    var i = t.size;
                    (this._rest = i), (this._coll = t), (this._result = Array(i)), (this._callResolve = a), u(this);
                  } else (this._rest = 0), (this._result = []);
                  return 0 === this._rest && this._promise._resolve(this._result), this;
                }),
                (t.prototype._execute = function() {
                  return this._promise;
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r);
          e.exports = {
            all: function(t) {
              return new h(t)._promise;
            },
            All: h
          };
        },
        { './aigle': 2, './internal/util': 38, './props': 57, 'aigle-core': 82 }
      ],
      4: [
        function(t, e, i) {
          'use strict';
          var r = t('./aigle'),
            s = t('./internal/util'),
            o = s.INTERNAL,
            n = s.callResolve;
          e.exports = function(t) {
            var e = new r(o);
            return n(e, t), e;
          };
        },
        { './aigle': 2, './internal/util': 38 }
      ],
      5: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/util').concatArray,
            o = t('./internal/collection').setParallel,
            n = (function(i) {
              function t(t, e) {
                i.call(this, t, e, c);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype._callResolve = function(
                  t,
                  e
                ) {
                  (this._result[e] = t), 0 == --this._rest && this._promise._resolve(s(this._result));
                }),
                t
              );
            })(r);
          function c(t) {
            return o.call(this, t), (this._result = Array(this._rest)), this;
          }
          e.exports = {
            concat: function(t, e) {
              return new n(t, e)._execute();
            },
            Concat: n
          };
        },
        { './each': 12, './internal/collection': 35, './internal/util': 38 }
      ],
      6: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/util').concatArray,
            o = t('./internal/collection').setLimit,
            n = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, i, c);
              }
              return (
                r && (t.__proto__ = r),
                (((t.prototype = Object.create(r && r.prototype)).constructor = t).prototype._callResolve = function(
                  t,
                  e
                ) {
                  (this._result[e] = t),
                    0 == --this._rest
                      ? this._promise._resolve(s(this._result))
                      : 0 < this._callRest-- && this._iterate();
                }),
                t
              );
            })(r);
          function c(t) {
            return o.call(this, t), (this._result = Array(this._rest)), this;
          }
          e.exports = {
            concatLimit: function(t, e, i) {
              return new n(t, e, i)._execute();
            },
            ConcatLimit: n
          };
        },
        { './eachLimit': 13, './internal/collection': 35, './internal/util': 38 }
      ],
      7: [
        function(t, e, i) {
          'use strict';
          var r = (function(i) {
            function t(t, e) {
              i.call(this, t, e), (this._result = []);
            }
            return (
              i && (t.__proto__ = i),
              (((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype._callResolve = function(t) {
                var e;
                Array.isArray(t) ? (e = this._result).push.apply(e, t) : void 0 !== t && this._result.push(t),
                  0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
              }),
              t
            );
          })(t('./eachSeries').EachSeries);
          e.exports = {
            concatSeries: function(t, e) {
              return new r(t, e)._execute();
            },
            ConcatSeries: r
          };
        },
        { './eachSeries': 14 }
      ],
      8: [
        function(t, e, i) {
          'use strict';
          e.exports = {
            resolveStack: function(t, e) {
              var i,
                r = new Error().stack;
              (t._stacks = t._stacks || []), e && e._stacks && (i = t._stacks).push.apply(i, e._stacks);
              var s = r.split('\n').slice(4);
              t._stacks.push(s.join('\n'));
            },
            reconstructStack: function(t) {
              var e = t._value,
                i = t._stacks;
              if (e instanceof Error == !1 || !i || e._reconstructed) return;
              var r = e.stack.split('\n'),
                s = i.length;
              for (; s--; ) r.push('From previous event:'), r.push(i[s]);
              (e.stack = r.join('\n')), (e._reconstructed = !0);
            }
          };
        },
        {}
      ],
      9: [
        function(t, e, i) {
          'use strict';
          var r = t('./aigle'),
            s = t('./internal/util').INTERNAL,
            o = (function(i) {
              function t(t) {
                i.call(this, s), (this._ms = t), (this._timer = void 0);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype._resolve = function(t) {
                  var e = this;
                  return (
                    (this._timer = setTimeout(function() {
                      return i.prototype._resolve.call(e, t);
                    }, this._ms)),
                    this
                  );
                }),
                (t.prototype._reject = function(t) {
                  clearTimeout(this._timer), i.prototype._reject.call(this, t);
                }),
                t
              );
            })(r);
          e.exports = {
            delay: function(t, e) {
              return new o(t)._resolve(e);
            },
            Delay: o
          };
        },
        { './aigle': 2, './internal/util': 38 }
      ],
      10: [
        function(t, e, i) {
          'use strict';
          var r = t('./doWhilst').DoWhilst,
            s = t('./until').UntilTester;
          e.exports = function(t, e, i) {
            'function' != typeof i && ((i = e), (e = t), (t = void 0));
            return new r(new s(i), e)._iterate(t);
          };
        },
        { './doWhilst': 11, './until': 79 }
      ],
      11: [
        function(t, e, i) {
          'use strict';
          var r = t('./whilst'),
            s = r.AigleWhilst,
            o = r.WhilstTester,
            n = (function(i) {
              function t(t, e) {
                i.call(this, t, e);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype._iterate = function(t) {
                  return this._next(t), this._promise;
                }),
                t
              );
            })(s);
          e.exports = {
            doWhilst: function(t, e, i) {
              'function' != typeof i && ((i = e), (e = t), (t = void 0));
              return new n(new o(i), e)._iterate(t);
            },
            DoWhilst: n
          };
        },
        { './whilst': 81 }
      ],
      12: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.PENDING,
            l = t('./internal/collection'),
            u = l.execute,
            a = l.setParallel,
            h = (function(r) {
              function t(t, e, i) {
                void 0 === i && (i = _),
                  r.call(this),
                  (this._iterator = e),
                  (this._promise = new s(n)),
                  (this._coll = void 0),
                  (this._size = void 0),
                  (this._rest = void 0),
                  (this._keys = void 0),
                  (this._result = void 0),
                  (this._iterate = void 0),
                  t === c
                    ? ((this._set = i), (this._iterate = this._callResolve), (this._callResolve = u))
                    : i.call(this, t);
              }
              return (
                r && (t.__proto__ = r),
                (((t.prototype = Object.create(r && r.prototype)).constructor = t).prototype._execute = function() {
                  return 0 === this._rest ? this._promise._resolve(this._result) : this._iterate(), this._promise;
                }),
                (t.prototype._callResolve = function(t) {
                  (0 != --this._rest && !1 !== t) || this._promise._resolve(this._result);
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r);
          function _(t) {
            return a.call(this, t), (this._result = t), this;
          }
          e.exports = {
            each: function(t, e) {
              return new h(t, e)._execute();
            },
            Each: h
          };
        },
        { './aigle': 2, './internal/collection': 35, './internal/util': 38, 'aigle-core': 82 }
      ],
      13: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            o = t('./aigle'),
            s = t('./internal/util'),
            n = s.DEFAULT_LIMIT,
            c = s.INTERNAL,
            l = s.PENDING,
            u = t('./internal/collection'),
            a = u.execute,
            h = u.setLimit,
            _ = (function(s) {
              function t(t, e, i, r) {
                void 0 === r && (r = p),
                  s.call(this),
                  'function' == typeof e && ((i = e), (e = n)),
                  (this._iterator = i),
                  (this._promise = new o(c)),
                  (this._index = 0),
                  (this._limit = e),
                  (this._coll = void 0),
                  (this._rest = void 0),
                  (this._size = void 0),
                  (this._keys = void 0),
                  (this._result = void 0),
                  (this._iterate = void 0),
                  (this._callRest = void 0),
                  t === l
                    ? ((this._set = r), (this._iterate = this._callResolve), (this._callResolve = a))
                    : r.call(this, t);
              }
              return (
                s && (t.__proto__ = s),
                (((t.prototype = Object.create(s && s.prototype)).constructor = t).prototype._execute = function() {
                  if (0 === this._rest) this._promise._resolve(this._result);
                  else for (; this._limit--; ) this._iterate();
                  return this._promise;
                }),
                (t.prototype._callResolve = function(t) {
                  !1 === t
                    ? ((this._callRest = 0), this._promise._resolve(this._result))
                    : 0 == --this._rest
                      ? this._promise._resolve(this._result)
                      : 0 < this._callRest-- && this._iterate();
                }),
                (t.prototype._callReject = function(t) {
                  (this._callRest = 0), this._promise._reject(t);
                }),
                t
              );
            })(r);
          function p(t) {
            return h.call(this, t), (this._result = t), this;
          }
          e.exports = {
            eachLimit: function(t, e, i) {
              return new _(t, e, i)._execute();
            },
            EachLimit: _
          };
        },
        { './aigle': 2, './internal/collection': 35, './internal/util': 38, 'aigle-core': 82 }
      ],
      14: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.PENDING,
            l = t('./internal/collection'),
            u = l.execute,
            a = l.setSeries,
            h = (function(r) {
              function t(t, e, i) {
                void 0 === i && (i = _),
                  r.call(this),
                  (this._iterator = e),
                  (this._promise = new s(n)),
                  (this._index = 0),
                  (this._coll = void 0),
                  (this._rest = void 0),
                  (this._size = void 0),
                  (this._keys = void 0),
                  (this._result = void 0),
                  (this._iterate = void 0),
                  t === c
                    ? ((this._set = i), (this._iterate = this._callResolve), (this._callResolve = u))
                    : i.call(this, t);
              }
              return (
                r && (t.__proto__ = r),
                (((t.prototype = Object.create(r && r.prototype)).constructor = t).prototype._execute = function() {
                  return 0 === this._rest ? this._promise._resolve(this._result) : this._iterate(), this._promise;
                }),
                (t.prototype._callResolve = function(t) {
                  0 == --this._rest || !1 === t ? this._promise._resolve(this._result) : this._iterate();
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r);
          function _(t) {
            return a.call(this, t), (this._result = t), this;
          }
          e.exports = {
            eachSeries: function(t, e) {
              return new h(t, e)._execute();
            },
            EachSeries: h
          };
        },
        { './aigle': 2, './internal/collection': 35, './internal/util': 38, 'aigle-core': 82 }
      ],
      15: [
        function(t, e, i) {
          'use strict';
          for (var r = ['CancellationError', 'TimeoutError'], s = r.length; s--; )
            i[r[s]] = (function(t) {
              function e() {
                t.apply(this, arguments);
              }
              return t && (e.__proto__ = t), ((e.prototype = Object.create(t && t.prototype)).constructor = e);
            })(Error);
        },
        {}
      ],
      16: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/util').PENDING,
            o = t('./internal/collection').setShorthand,
            n = (function(i) {
              function t(t, e) {
                i.call(this, t, e), (this._result = !0), t === s ? (this._set = o) : o.call(this, t);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype._callResolve = function(
                  t
                ) {
                  t ? 0 == --this._rest && this._promise._resolve(!0) : this._promise._resolve(!1);
                }),
                t
              );
            })(r);
          e.exports = {
            every: function(t, e) {
              return new n(t, e)._execute();
            },
            Every: n
          };
        },
        { './each': 12, './internal/collection': 35, './internal/util': 38 }
      ],
      17: [
        function(t, e, i) {
          'use strict';
          var r = (function(r) {
            function t(t, e, i) {
              r.call(this, t, e, i), (this._result = !0);
            }
            return (
              r && (t.__proto__ = r),
              (((t.prototype = Object.create(r && r.prototype)).constructor = t).prototype._callResolve = function(t) {
                t
                  ? 0 == --this._rest
                    ? this._promise._resolve(!0)
                    : 0 < this._callRest-- && this._iterate()
                  : this._promise._resolve(!1);
              }),
              t
            );
          })(t('./eachLimit').EachLimit);
          e.exports = {
            everyLimit: function(t, e, i) {
              return new r(t, e, i)._execute();
            },
            EveryLimit: r
          };
        },
        { './eachLimit': 13 }
      ],
      18: [
        function(t, e, i) {
          'use strict';
          var r = (function(i) {
            function t(t, e) {
              i.call(this, t, e), (this._result = !0);
            }
            return (
              i && (t.__proto__ = i),
              (((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype._callResolve = function(t) {
                t ? (0 == --this._rest ? this._promise._resolve(!0) : this._iterate()) : this._promise._resolve(!1);
              }),
              t
            );
          })(t('./eachSeries.js').EachSeries);
          e.exports = {
            everySeries: function(t, e) {
              return new r(t, e)._execute();
            },
            EverySeries: r
          };
        },
        { './eachSeries.js': 14 }
      ],
      19: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.compactArray,
            l = (function(i) {
              function t(t, e) {
                i.call(this, t, e, u);
              }
              return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t);
            })(r);
          function u(t) {
            return (
              s.call(this, t),
              (this._result = Array(this._rest)),
              (this._callResolve = void 0 === this._keys ? a : h),
              this
            );
          }
          function a(t, e) {
            (this._result[e] = t ? this._coll[e] : n), 0 == --this._rest && this._promise._resolve(c(this._result));
          }
          function h(t, e) {
            (this._result[e] = t ? this._coll[this._keys[e]] : n),
              0 == --this._rest && this._promise._resolve(c(this._result));
          }
          (l.prototype._set = u),
            (e.exports = {
              filter: function(t, e) {
                return new l(t, e)._execute();
              },
              Filter: l
            });
        },
        { './each': 12, './internal/collection': 35, './internal/util': 38 }
      ],
      20: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.compactArray,
            l = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, i, u);
              }
              return r && (t.__proto__ = r), ((t.prototype = Object.create(r && r.prototype)).constructor = t);
            })(r);
          function u(t) {
            return (
              s.call(this, t),
              (this._result = Array(this._rest)),
              (this._callResolve = void 0 === this._keys ? a : h),
              this
            );
          }
          function a(t, e) {
            (this._result[e] = t ? this._coll[e] : n),
              0 == --this._rest ? this._promise._resolve(c(this._result)) : 0 < this._callRest-- && this._iterate();
          }
          function h(t, e) {
            (this._result[e] = t ? this._coll[this._keys[e]] : n),
              0 == --this._rest ? this._promise._resolve(c(this._result)) : 0 < this._callRest-- && this._iterate();
          }
          e.exports = {
            filterLimit: function(t, e, i) {
              return new l(t, e, i)._execute();
            },
            FilterLimit: l
          };
        },
        { './eachLimit': 13, './internal/collection': 35, './internal/util': 38 }
      ],
      21: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.compactArray,
            l = (function(i) {
              function t(t, e) {
                i.call(this, t, e, u);
              }
              return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t);
            })(r);
          function u(t) {
            return (
              s.call(this, t),
              (this._result = Array(this._rest)),
              (this._callResolve = void 0 === this._keys ? a : h),
              this
            );
          }
          function a(t, e) {
            (this._result[e] = t ? this._coll[e] : n),
              0 == --this._rest ? this._promise._resolve(c(this._result)) : this._iterate();
          }
          function h(t, e) {
            (this._result[e] = t ? this._coll[this._keys[e]] : n),
              0 == --this._rest ? this._promise._resolve(c(this._result)) : this._iterate();
          }
          e.exports = {
            filterSeries: function(t, e) {
              return new l(t, e)._execute();
            },
            FilterSeries: l
          };
        },
        { './eachSeries': 14, './internal/collection': 35, './internal/util': 38 }
      ],
      22: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n);
              }
              return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t);
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t
              ? ((this._size = 0), this._promise._resolve(this._coll[e]))
              : 0 == --this._rest && this._promise._resolve();
          }
          function l(t, e) {
            t
              ? ((this._size = 0), this._promise._resolve(this._coll[this._keys[e]]))
              : 0 == --this._rest && this._promise._resolve();
          }
          e.exports = {
            find: function(t, e) {
              return new o(t, e)._execute();
            },
            Find: o
          };
        },
        { './each': 12, './internal/collection': 35 }
      ],
      23: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n), (this._result = -1);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype._callResolve = function(
                  t,
                  e
                ) {
                  t ? ((this._size = 0), this._promise._resolve(e)) : 0 == --this._rest && this._promise._resolve(-1);
                }),
                t
              );
            })(r);
          function n(t) {
            return s.call(this, t), void 0 !== this._keys && (this._rest = 0), this;
          }
          e.exports = {
            findIndex: function(t, e) {
              return new o(t, e)._execute();
            },
            FindIndex: o
          };
        },
        { './each': 12, './internal/collection': 35 }
      ],
      24: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, i, n), (this._result = -1);
              }
              return (
                r && (t.__proto__ = r),
                (((t.prototype = Object.create(r && r.prototype)).constructor = t).prototype._callResolve = function(
                  t,
                  e
                ) {
                  t
                    ? ((this._callRest = 0), this._promise._resolve(e))
                    : 0 == --this._rest
                      ? this._promise._resolve(-1)
                      : 0 < this._callRest-- && this._iterate();
                }),
                t
              );
            })(r);
          function n(t) {
            return s.call(this, t), void 0 !== this._keys && (this._rest = 0), this;
          }
          e.exports = {
            findIndexLimit: function(t, e, i) {
              return new o(t, e, i)._execute();
            },
            FindIndexLimit: o
          };
        },
        { './eachLimit': 13, './internal/collection': 35 }
      ],
      25: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n), (this._result = -1);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype._callResolve = function(
                  t,
                  e
                ) {
                  t ? this._promise._resolve(e) : 0 == --this._rest ? this._promise._resolve(-1) : this._iterate();
                }),
                t
              );
            })(r);
          function n(t) {
            return s.call(this, t), void 0 !== this._keys && (this._rest = 0), this;
          }
          e.exports = {
            findIndexSeries: function(t, e) {
              return new o(t, e)._execute();
            },
            FindIndexSeries: o
          };
        },
        { './eachSeries': 14, './internal/collection': 35 }
      ],
      26: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n);
              }
              return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t);
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t ? ((this._size = 0), this._promise._resolve('' + e)) : 0 == --this._rest && this._promise._resolve();
          }
          function l(t, e) {
            t
              ? ((this._size = 0), this._promise._resolve(this._keys[e]))
              : 0 == --this._rest && this._promise._resolve();
          }
          e.exports = {
            findKey: function(t, e) {
              return new o(t, e)._execute();
            },
            FindKey: o
          };
        },
        { './each': 12, './internal/collection': 35 }
      ],
      27: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, i, n);
              }
              return r && (t.__proto__ = r), ((t.prototype = Object.create(r && r.prototype)).constructor = t);
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t
              ? ((this._callRest = 0), this._promise._resolve('' + e))
              : 0 == --this._rest
                ? this._promise._resolve()
                : 0 < this._callRest-- && this._iterate();
          }
          function l(t, e) {
            t
              ? ((this._callRest = 0), this._promise._resolve(this._keys[e]))
              : 0 == --this._rest
                ? this._promise._resolve()
                : 0 < this._callRest-- && this._iterate();
          }
          e.exports = {
            findKeyLimit: function(t, e, i) {
              return new o(t, e, i)._execute();
            },
            FindKeyLimit: o
          };
        },
        { './eachLimit': 13, './internal/collection': 35 }
      ],
      28: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n);
              }
              return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t);
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t ? this._promise._resolve('' + e) : 0 == --this._rest ? this._promise._resolve() : this._iterate();
          }
          function l(t, e) {
            t ? this._promise._resolve(this._keys[e]) : 0 == --this._rest ? this._promise._resolve() : this._iterate();
          }
          e.exports = {
            findKeySeries: function(t, e) {
              return new o(t, e)._execute();
            },
            FindKeySeries: o
          };
        },
        { './eachSeries': 14, './internal/collection': 35 }
      ],
      29: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, i, n);
              }
              return r && (t.__proto__ = r), ((t.prototype = Object.create(r && r.prototype)).constructor = t);
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t
              ? ((this._callRest = 0), this._promise._resolve(this._coll[e]))
              : 0 == --this._rest
                ? this._promise._resolve()
                : 0 < this._callRest-- && this._iterate();
          }
          function l(t, e) {
            t
              ? ((this._callRest = 0), this._promise._resolve(this._coll[this._keys[e]]))
              : 0 == --this._rest
                ? this._promise._resolve()
                : 0 < this._callRest-- && this._iterate();
          }
          e.exports = {
            findLimit: function(t, e, i) {
              return new o(t, e, i)._execute();
            },
            FindLimit: o
          };
        },
        { './eachLimit': 13, './internal/collection': 35 }
      ],
      30: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n);
              }
              return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t);
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t ? this._promise._resolve(this._coll[e]) : 0 == --this._rest ? this._promise._resolve() : this._iterate();
          }
          function l(t, e) {
            t
              ? this._promise._resolve(this._coll[this._keys[e]])
              : 0 == --this._rest
                ? this._promise._resolve()
                : this._iterate();
          }
          e.exports = {
            findSeries: function(t, e) {
              return new o(t, e)._execute();
            },
            FindSeries: o
          };
        },
        { './eachSeries': 14, './internal/collection': 35 }
      ],
      31: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n), (this._result = {});
              }
              return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t);
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            this._result[t] ? this._result[t].push(this._coll[e]) : (this._result[t] = [this._coll[e]]),
              0 == --this._rest && this._promise._resolve(this._result);
          }
          function l(t, e) {
            this._result[t]
              ? this._result[t].push(this._coll[this._keys[e]])
              : (this._result[t] = [this._coll[this._keys[e]]]),
              0 == --this._rest && this._promise._resolve(this._result);
          }
          e.exports = {
            groupBy: function(t, e) {
              return new o(t, e)._execute();
            },
            GroupBy: o
          };
        },
        { './each': 12, './internal/collection': 35 }
      ],
      32: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, i, n), (this._result = {});
              }
              return r && (t.__proto__ = r), ((t.prototype = Object.create(r && r.prototype)).constructor = t);
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            this._result[t] ? this._result[t].push(this._coll[e]) : (this._result[t] = [this._coll[e]]),
              0 == --this._rest ? this._promise._resolve(this._result) : 0 < this._callRest-- && this._iterate();
          }
          function l(t, e) {
            this._result[t]
              ? this._result[t].push(this._coll[this._keys[e]])
              : (this._result[t] = [this._coll[this._keys[e]]]),
              0 == --this._rest ? this._promise._resolve(this._result) : 0 < this._callRest-- && this._iterate();
          }
          e.exports = {
            groupByLimit: function(t, e, i) {
              return new o(t, e, i)._execute();
            },
            GroupByLimit: o
          };
        },
        { './eachLimit': 13, './internal/collection': 35 }
      ],
      33: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n), (this._result = {});
              }
              return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t);
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            this._result[t] ? this._result[t].push(this._coll[e]) : (this._result[t] = [this._coll[e]]),
              0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
          }
          function l(t, e) {
            this._result[t]
              ? this._result[t].push(this._coll[this._keys[e]])
              : (this._result[t] = [this._coll[this._keys[e]]]),
              0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
          }
          e.exports = {
            groupBySeries: function(t, e) {
              return new o(t, e)._execute();
            },
            GroupBySeries: o
          };
        },
        { './eachSeries': 14, './internal/collection': 35 }
      ],
      34: [
        function(t, e, i) {
          'use strict';
          var r = Array(8),
            s = 0,
            o = !1;
          function n() {
            for (var t = -1; ++t < s; ) {
              var e = r[t];
              switch (((r[t] = void 0), e._resolved)) {
                case 1:
                  e._callResolve();
                  break;
                case 2:
                  e._callReject();
              }
            }
            (s = 0), (o = !1);
          }
          e.exports = function(t) {
            !1 === o && (setImmediate(n), (o = !0)), (r[s++] = t);
          };
        },
        {}
      ],
      35: [
        function(t, e, i) {
          'use strict';
          var r = t('./util'),
            l = r.call3,
            u = r.callProxyReciever,
            s = [
              [y, m],
              [y, d],
              [
                function() {
                  var t = this._coll,
                    e = this._index++;
                  u(l(this._iterator, t[e], e, t), this, e);
                },
                function() {
                  var t = this._coll,
                    e = this._index++,
                    i = this._keys[e];
                  u(l(this._iterator, t[i], i, t), this, e);
                }
              ]
            ].map(function(t) {
              var i = t[0],
                r = t[1];
              return function(t) {
                if (Array.isArray(t)) (this._coll = t), (this._size = t.length), (this._iterate = i);
                else if (t && 'object' == typeof t) {
                  var e = Object.keys(t);
                  (this._coll = t), (this._size = e.length), (this._keys = e), (this._iterate = r);
                } else this._size = 0;
                return (this._rest = this._size), this;
              };
            }),
            o = s[0],
            n = s[1],
            c = s[2],
            a = {
              iterateArrayParallel: y,
              iterateArrayWithString: function() {
                var t = this._iterator,
                  e = this._coll,
                  i = -1;
                for (; ++i < this._size; ) {
                  var r = e[i];
                  r ? this._callResolve(r[t], i) : this._callResolve(void 0, i);
                }
              },
              iterateArrayWithArray: function() {
                var t = this._coll,
                  e = this._iterator,
                  i = e[0],
                  r = e[1],
                  s = -1;
                for (; ++s < this._size; ) {
                  var o = t[s];
                  o ? this._callResolve(o[i] === r, s) : this._callResolve(void 0, s);
                }
              },
              iterateArrayWithObject: function() {
                var t = this._iterator,
                  e = this._coll,
                  i = Object.keys(t),
                  r = -1;
                t: for (; ++r < this._size; ) {
                  var s = e[r];
                  if (s) {
                    for (var o = i.length; o--; ) {
                      var n = i[o];
                      if (s[n] !== t[n]) {
                        this._callResolve(!1, r);
                        continue t;
                      }
                    }
                    this._callResolve(!0, r);
                  } else this._callResolve(void 0, r);
                }
              },
              iterateObjectParallel: m,
              iterateObjectWithString: function() {
                var t = this._iterator,
                  e = this._coll,
                  i = this._keys,
                  r = -1;
                for (; ++r < this._size; ) {
                  var s = e[i[r]];
                  s ? this._callResolve(s[t], r) : this._callResolve(void 0, r);
                }
              },
              iterateObjectWithArray: function() {
                var t = this._coll,
                  e = this._keys,
                  i = this._iterator,
                  r = i[0],
                  s = i[1],
                  o = -1;
                for (; ++o < this._size; ) {
                  var n = t[e[o]];
                  n ? this._callResolve(n[r] === s, o) : this._callResolve(void 0, o);
                }
              },
              iterateObjectWithObject: function() {
                var t = this._iterator,
                  e = this._coll,
                  i = this._keys,
                  r = Object.keys(t),
                  s = -1;
                t: for (; ++s < this._size; ) {
                  var o = e[i[s]];
                  if (o) {
                    for (var n = r.length; n--; ) {
                      var c = r[n];
                      if (o[c] !== t[c]) {
                        this._callResolve(!1, s);
                        continue t;
                      }
                    }
                    this._callResolve(!0, s);
                  } else this._callResolve(void 0, s);
                }
              }
            },
            h = [
              a,
              Object.assign({}, a, { iterateObjectParallel: d }),
              Object.assign({}, a, { iterateArrayWithArray: g, iterateObjectWithArray: g }),
              Object.assign({}, a, { iterateArrayWithArray: R, iterateObjectWithArray: R })
            ].map(function(t) {
              var i = t.iterateArrayParallel,
                r = t.iterateArrayWithString,
                s = t.iterateArrayWithArray,
                o = t.iterateArrayWithObject,
                n = t.iterateObjectParallel,
                c = t.iterateObjectWithString,
                l = t.iterateObjectWithArray,
                u = t.iterateObjectWithObject;
              return function(t) {
                if (Array.isArray(t))
                  switch (((this._coll = t), (this._size = t.length), typeof this._iterator)) {
                    case 'function':
                      this._iterate = i;
                      break;
                    case 'string':
                      this._iterate = r;
                      break;
                    case 'object':
                      this._iterate = Array.isArray(this._iterator) ? s : o;
                  }
                else if (t && 'object' == typeof t) {
                  var e = Object.keys(t);
                  switch (((this._coll = t), (this._size = e.length), (this._keys = e), typeof this._iterator)) {
                    case 'function':
                      this._iterate = n;
                      break;
                    case 'string':
                      this._iterate = c;
                      break;
                    case 'object':
                      this._iterate = Array.isArray(this._iterator) ? l : u;
                  }
                } else this._size = 0;
                return (this._rest = this._size), this;
              };
            }),
            _ = h[0],
            p = h[1],
            f = h[2],
            v = h[3];
          function y() {
            for (
              var t = this._rest, e = this._iterator, i = this._coll, r = -1;
              ++r < t && u(l(e, i[r], r, i), this, r);

            );
          }
          function m() {
            for (var t = this._rest, e = this._iterator, i = this._coll, r = this._keys, s = -1; ++s < t; ) {
              var o = r[s];
              if (!1 === u(l(e, i[o], o, i), this, s)) break;
            }
          }
          function d() {
            for (
              var t = this, e = t._rest, i = t._iterator, r = t._coll, s = t._keys, o = t._result, n = -1;
              ++n < e;

            ) {
              var c = s[n];
              if (((o[c] = void 0), !1 === u(l(i, r[c], c, r), this, n))) break;
            }
          }
          function g() {
            var s = this._coll,
              o = this._result;
            !(function t(e) {
              var i = -1;
              for (; ++i < e.length; ) {
                var r = e[i];
                Array.isArray(r) ? t(r) : s.hasOwnProperty(r) && (o[r] = s[r]);
              }
            })(this._iterator),
              this._promise._resolve(o);
          }
          function R() {
            var e = this._coll,
              i = this._result,
              s = {};
            !(function t(e) {
              var i = -1;
              for (; ++i < e.length; ) {
                var r = e[i];
                Array.isArray(r) ? t(r) : (s[r] = !0);
              }
            })(this._iterator),
              Object.keys(e).forEach(function(t) {
                !1 === s.hasOwnProperty(t) && (i[t] = e[t]);
              }),
              this._promise._resolve(i);
          }
          e.exports = {
            execute: function(t) {
              (this._callResolve = this._iterate), this._set(t), this._execute();
            },
            setParallel: o,
            setParallelWithOrder: n,
            setShorthand: _,
            setShorthandWithOrder: p,
            setPickShorthand: f,
            setOmitShorthand: v,
            setSeries: c,
            setLimit: function(t) {
              c.call(this, t);
              var e = this._limit,
                i = this._size;
              return (this._limit = e < i ? e : i), (this._callRest = i - this._limit), this;
            }
          };
        },
        { './util': 38 }
      ],
      36: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('../aigle'),
            o = t('../map').map,
            n = t('../mapValues').mapValues,
            c = t('./util'),
            l = c.INTERNAL,
            u = c.PENDING,
            a = c.apply,
            h = c.callProxyReciever;
          e.exports = {
            createProxy: function(r, t) {
              var s = t ? f : p;
              return (function(i) {
                function t() {
                  for (var t = [], e = arguments.length; e--; ) t[e] = arguments[e];
                  i.call(this, r, s, t);
                }
                return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t);
              })(_);
            }
          };
          var _ = (function(r) {
            function t(t, e, i) {
              r.call(this),
                (this._promise = new s(l)),
                (this._func = t),
                (this._args = i),
                (this._execute = e),
                i[0] === u && ((this._set = this._callResolve), (this._callResolve = e));
            }
            return (
              r && (t.__proto__ = r),
              (((t.prototype = Object.create(r && r.prototype)).constructor = t).prototype._callResolve = function(t) {
                this._promise._resolve(t);
              }),
              (t.prototype._callReject = function(t) {
                this._promise._reject(t);
              }),
              t
            );
          })(r);
          function p(t) {
            var e = this._args;
            return (
              e[0] === u && ((e[0] = t), (this._callResolve = this._set)), h(a(this._func, e), this), this._promise
            );
          }
          function f(t) {
            var r = this,
              s = this._args;
            s[0] === u ? ((s[0] = t), (this._callResolve = this._set)) : (t = s[0]);
            var e = 'function' == typeof s[1];
            return (
              e && Array.isArray(t)
                ? v(this, o, function(t) {
                    var e = 0;
                    (s[1] = function() {
                      return t[e++];
                    }),
                      h(a(r._func, s), r);
                  })
                : e && t && 'object' == typeof t
                  ? v(this, n, function(t) {
                      var e = 0,
                        i = Object.keys(t);
                      (s[1] = function() {
                        return t[i[e++]];
                      }),
                        h(a(r._func, s), r);
                    })
                  : h(a(this._func, s), this),
              this._promise
            );
          }
          function v(e, t, i) {
            var r = e._args,
              s = r[0],
              o = r[1],
              n = t(s, function(t, e) {
                return o(t, e, s);
              });
            return 1 === n._resolved
              ? i(n._value)
              : n.then(i, function(t) {
                  return e._callReject(t);
                });
          }
        },
        { '../aigle': 2, '../map': 40, '../mapValues': 43, './util': 38, 'aigle-core': 82 }
      ],
      37: [
        function(t, e, i) {
          'use strict';
          var r = function(t) {
            void 0 === t && (t = 8), (this.array = Array(t)), (this.length = 0);
          };
          (r.prototype.push = function(t) {
            this.array[this.length++] = t;
          }),
            (e.exports = r);
        },
        {}
      ],
      38: [
        function(t, e, i) {
          'use strict';
          var l = t('aigle-core').AigleCore,
            r = t('../../package.json').version,
            s = { e: void 0 },
            c = 'function' == typeof Symbol ? Symbol.iterator : function() {};
          function o() {}
          function n(t, e) {
            try {
              return t(e);
            } catch (t) {
              return (s.e = t), s;
            }
          }
          function u(t, e) {
            if (e && e.then) {
              if (e instanceof l)
                switch (e._resolved) {
                  case 0:
                    return void e._addReceiver(t, o);
                  case 1:
                    return void t._resolve(e._value);
                  case 2:
                    return e.suppressUnhandledRejections(), void t._reject(e._value);
                }
              a(e, t);
            } else t._resolve(e);
          }
          function a(t, e) {
            t.then(
              function(t) {
                e._resolve(t);
              },
              function(t) {
                e._reject(t);
              }
            );
          }
          function h(t, e, i) {
            t.then(
              function(t) {
                e._callResolve(t, i);
              },
              function(t) {
                e._callReject(t);
              }
            );
          }
          function _(t, e, i, r) {
            var s = t[i];
            (t[i] = t[r]), (t[r] = s);
            var o = e[i];
            (e[i] = e[r]), (e[r] = o);
          }
          function p(t, e, i, r) {
            if (e !== i) {
              for (var s = e; ++s <= i && t[e] === t[s]; ) {
                var o = s - 1;
                if (r[o] > r[s]) {
                  var n = r[o];
                  (r[o] = r[s]), (r[s] = n);
                }
              }
              if (!(i < s))
                p(
                  t,
                  e,
                  (s = (function(t, e, i, r, s) {
                    for (var o = e, n = i; o <= n; ) {
                      for (e = o; o < n && t[o] < r; ) o++;
                      for (; e <= n && t[n] >= r; ) n--;
                      if (n < o) break;
                      _(t, s, o++, n--);
                    }
                    return o;
                  })(t, e, i, t[t[e] > t[s] ? e : s], r)) - 1,
                  r
                ),
                  p(t, s, i, r);
            }
          }
          e.exports = {
            VERSION: r,
            DEFAULT_LIMIT: 8,
            INTERNAL: o,
            PENDING: function() {},
            UNHANDLED: function() {},
            defaultIterator: function(t) {
              return t;
            },
            errorObj: s,
            iteratorSymbol: c,
            call0: function(t) {
              try {
                return t();
              } catch (t) {
                return (s.e = t), s;
              }
            },
            call1: n,
            call3: function(t, e, i, r) {
              try {
                return t(e, i, r);
              } catch (t) {
                return (s.e = t), s;
              }
            },
            apply: function(t, e) {
              try {
                switch (e.length) {
                  case 0:
                    return t();
                  case 1:
                    return t(e[0]);
                  case 2:
                    return t(e[0], e[1]);
                  case 3:
                    return t(e[0], e[1], e[2]);
                  default:
                    return t.apply(null, e);
                }
              } catch (t) {
                return (s.e = t), s;
              }
            },
            callResolve: function(t, e, i) {
              if ('function' != typeof e) return void t._resolve(i);
              var r = n(e, i);
              if (r === s) return void t._reject(s.e);
              u(t, r);
            },
            callReject: function(t, e, i) {
              if ('function' != typeof e) return void t._reject(i);
              var r = n(e, i);
              if (r === s) return void t._reject(s.e);
              u(t, r);
            },
            callReceiver: u,
            callThen: a,
            callProxyReciever: function(t, e, i) {
              if (t instanceof l)
                switch (t._resolved) {
                  case 0:
                    return t._addReceiver(e, i), !0;
                  case 1:
                    return e._callResolve(t._value, i), !0;
                  case 2:
                    return t.suppressUnhandledRejections(), e._callReject(t._value), !1;
                }
              if (t === s) return e._callReject(s.e), !1;
              t && t.then ? h(t, e, i) : e._callResolve(t, i);
              return !0;
            },
            promiseArrayEach: function(t) {
              var e = t._rest,
                i = t._coll,
                r = -1;
              for (; ++r < e; ) {
                var s = i[r];
                if (s instanceof l)
                  switch (s._resolved) {
                    case 0:
                      s._addReceiver(t, r);
                      continue;
                    case 1:
                      t._callResolve(s._value, r);
                      continue;
                    case 2:
                      return s.suppressUnhandledRejections(), void t._callReject(s._value);
                  }
                s && s.then ? h(s, t, r) : t._callResolve(s, r);
              }
            },
            promiseObjectEach: function(t) {
              var e = t._rest,
                i = t._keys,
                r = t._coll,
                s = t._result,
                o = -1;
              for (; ++o < e; ) {
                var n = i[o],
                  c = r[n];
                if (((s[n] = void 0), c instanceof l))
                  switch (c._resolved) {
                    case 0:
                      c._addReceiver(t, n);
                      continue;
                    case 1:
                      t._callResolve(c._value, n);
                      continue;
                    case 2:
                      return c.suppressUnhandledRejections(), void t._callReject(c._value);
                  }
                c && c.then ? h(c, t, n) : t._callResolve(c, n);
              }
            },
            promiseMapEach: function(t) {
              var e,
                i = t._result,
                r = t._coll[c]();
              for (; !1 === (e = r.next()).done; ) {
                var s = e.value,
                  o = s[0],
                  n = s[1];
                if ((i.set(o, n), n instanceof l))
                  switch (n._resolved) {
                    case 0:
                      n._addReceiver(t, o);
                      continue;
                    case 1:
                      t._callResolve(n._value, o);
                      continue;
                    case 2:
                      return n.suppressUnhandledRejections(), void t._callReject(n._value);
                  }
                n && n.then ? h(n, t, o) : t._callResolve(n, o);
              }
            },
            promiseSetEach: function(t) {
              var e,
                i = t._coll[c](),
                r = -1;
              for (; !1 === (e = i.next()).done; ) {
                var s = e.value;
                if (s instanceof l)
                  switch (s._resolved) {
                    case 0:
                      s._addReceiver(t, ++r);
                      continue;
                    case 1:
                      t._callResolve(s._value, ++r);
                      continue;
                    case 2:
                      return s.suppressUnhandledRejections(), void t._callReject(s._value);
                  }
                s && s.then ? h(s, t, ++r) : t._callResolve(s, ++r);
              }
            },
            compactArray: function(t) {
              var e = -1,
                i = t.length,
                r = [];
              for (; ++e < i; ) {
                var s = t[e];
                s !== o && r.push(s);
              }
              return r;
            },
            concatArray: function(t) {
              var e = -1,
                i = t.length,
                r = [];
              for (; ++e < i; ) {
                var s = t[e];
                Array.isArray(s) ? r.push.apply(r, s) : void 0 !== s && r.push(s);
              }
              return r;
            },
            clone: function(t) {
              return Array.isArray(t)
                ? (function(t) {
                    var e = t.length,
                      i = Array(e);
                    for (; e--; ) i[e] = t[e];
                    return i;
                  })(t)
                : (function(t) {
                    var e = Object.keys(t),
                      i = e.length,
                      r = {};
                    for (; i--; ) {
                      var s = e[i];
                      r[s] = t[s];
                    }
                    return r;
                  })(t);
            },
            createEmptyObject: function(t, e) {
              var i = -1,
                r = e.length,
                s = {};
              for (; ++i < r; ) s[e[i]] = void 0;
              return s;
            },
            sortArray: function(t, e) {
              for (var i = t.length, r = Array(i), s = 0; s < i; s++) r[s] = s;
              p(e, 0, i - 1, r);
              for (var o = Array(i), n = 0; n < i; n++) {
                var c = r[n];
                o[n] = void 0 === c ? t[n] : t[c];
              }
              return o;
            },
            sortObject: function(t, e, i) {
              for (var r = e.length, s = Array(r), o = 0; o < r; o++) s[o] = o;
              p(i, 0, r - 1, s);
              for (var n = Array(r), c = 0; c < r; c++) {
                var l = s[c];
                n[c] = t[e[void 0 === l ? c : l]];
              }
              return n;
            }
          };
        },
        { '../../package.json': 88, 'aigle-core': 82 }
      ],
      39: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.call1,
            l = o.apply,
            u = o.callProxyReciever,
            a = (function(i) {
              function t(t, e) {
                i.call(this),
                  (this._promise = new s(n)),
                  (this._rest = e),
                  (this._result = Array(e)),
                  (this._handler = t);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype._callResolve = function(
                  t,
                  e
                ) {
                  if (e === n) return this._promise._resolve(t);
                  if (((this._result[e] = t), 0 == --this._rest)) {
                    var i = this._handler,
                      r = this._result;
                    void 0 === i ? this._promise._resolve(r) : u(l(i, r), this, n);
                  }
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r),
            h = (function(e) {
              function t(t) {
                e.call(this), (this._promise = new s(n)), (this._handler = t);
              }
              return (
                e && (t.__proto__ = e),
                (((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype._callResolve = function(
                  t,
                  e
                ) {
                  if (e === n) return this._promise._resolve(t);
                  !(function(t, e) {
                    var i = t._handler;
                    if (void 0 === i) return t._promise._resolve(e);
                    switch (typeof e) {
                      case 'string':
                        e = e.split('');
                        break;
                      case 'object':
                        if (Array.isArray(e)) break;
                        if (e) {
                          for (var r = Object.keys(e), s = r.length, o = Array(s); s--; ) o[s] = e[r[s]];
                          e = o;
                          break;
                        }
                      default:
                        return u(c(i, e), t, n);
                    }
                    u(l(i, e), t, n);
                  })(this, t);
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r);
          e.exports = {
            join: function() {
              var t = arguments,
                e = arguments.length,
                i = 'function' == typeof arguments[e - 1] ? arguments[--e] : void 0,
                r = new a(i, e);
              for (; e--; ) u(t[e], r, e);
              return r._promise;
            },
            Spread: h
          };
        },
        { './aigle': 2, './internal/util': 38, 'aigle-core': 82 }
      ],
      40: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype._callResolve = function(
                  t,
                  e
                ) {
                  (this._result[e] = t), 0 == --this._rest && this._promise._resolve(this._result);
                }),
                t
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._result = Array(this._rest)), this;
          }
          e.exports = {
            map: function(t, e) {
              return new o(t, e)._execute();
            },
            Map: o
          };
        },
        { './each': 12, './internal/collection': 35 }
      ],
      41: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, i, n);
              }
              return (
                r && (t.__proto__ = r),
                (((t.prototype = Object.create(r && r.prototype)).constructor = t).prototype._callResolve = function(
                  t,
                  e
                ) {
                  (this._result[e] = t),
                    0 == --this._rest ? this._promise._resolve(this._result) : 0 < this._callRest-- && this._iterate();
                }),
                t
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._result = Array(this._rest)), this;
          }
          e.exports = {
            mapLimit: function(t, e, i) {
              return new o(t, e, i)._execute();
            },
            MapLimit: o
          };
        },
        { './eachLimit': 13, './internal/collection': 35 }
      ],
      42: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype._callResolve = function(
                  t,
                  e
                ) {
                  (this._result[e] = t), 0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
                }),
                t
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._result = Array(this._rest)), this;
          }
          e.exports = {
            mapSeries: function(t, e) {
              return new o(t, e)._execute();
            },
            MapSeries: o
          };
        },
        { './eachSeries': 14, './internal/collection': 35 }
      ],
      43: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthandWithOrder,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n), (this._result = {});
              }
              return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t);
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            (this._result[e] = t), 0 == --this._rest && this._promise._resolve(this._result);
          }
          function l(t, e) {
            (this._result[this._keys[e]] = t), 0 == --this._rest && this._promise._resolve(this._result);
          }
          e.exports = {
            mapValues: function(t, e) {
              return new o(t, e)._execute();
            },
            MapValues: o
          };
        },
        { './each': 12, './internal/collection': 35 }
      ],
      44: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = t('./internal/util').createEmptyObject,
            n = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, i, c);
              }
              return r && (t.__proto__ = r), ((t.prototype = Object.create(r && r.prototype)).constructor = t);
            })(r);
          function c(t) {
            return (
              s.call(this, t),
              void 0 === this._keys
                ? ((this._result = {}), (this._callResolve = l))
                : ((this._result = o(t, this._keys)), (this._callResolve = u)),
              this
            );
          }
          function l(t, e) {
            (this._result[e] = t),
              0 == --this._rest ? this._promise._resolve(this._result) : 0 < this._callRest-- && this._iterate();
          }
          function u(t, e) {
            (this._result[this._keys[e]] = t),
              0 == --this._rest ? this._promise._resolve(this._result) : 0 < this._callRest-- && this._iterate();
          }
          e.exports = {
            mapValuesLimit: function(t, e, i) {
              return new n(t, e, i)._execute();
            },
            MapValuesLimit: n
          };
        },
        { './eachLimit': 13, './internal/collection': 35, './internal/util': 38 }
      ],
      45: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n), (this._result = {});
              }
              return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t);
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            (this._result[e] = t), 0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
          }
          function l(t, e) {
            (this._result[this._keys[e]] = t),
              0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
          }
          e.exports = {
            mapValuesSeries: function(t, e) {
              return new o(t, e)._execute();
            },
            MapValuesSeries: o
          };
        },
        { './eachSeries': 14, './internal/collection': 35 }
      ],
      46: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setOmitShorthand,
            o = (function(r) {
              function t(t, e, i) {
                'function' != typeof e && (e = [e].concat(i)), r.call(this, t, e, n), (this._result = {});
              }
              return r && (t.__proto__ = r), ((t.prototype = Object.create(r && r.prototype)).constructor = t);
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t || (this._result[e] = this._coll[e]), 0 == --this._rest && this._promise._resolve(this._result);
          }
          function l(t, e) {
            if (!t) {
              var i = this._keys[e];
              this._result[i] = this._coll[i];
            }
            0 == --this._rest && this._promise._resolve(this._result);
          }
          e.exports = {
            omit: function(t, e) {
              var i = [],
                r = arguments.length - 2;
              for (; 0 < r--; ) i[r] = arguments[r + 2];
              return new o(t, e, i)._execute();
            },
            Omit: o
          };
        },
        { './each': 12, './internal/collection': 35 }
      ],
      47: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n), (this._result = {});
              }
              return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t);
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t || (this._result[e] = this._coll[e]), 0 == --this._rest && this._promise._resolve(this._result);
          }
          function l(t, e) {
            if (!t) {
              var i = this._keys[e];
              this._result[i] = this._coll[i];
            }
            0 == --this._rest && this._promise._resolve(this._result);
          }
          e.exports = {
            omitBy: function(t, e) {
              return new o(t, e)._execute();
            },
            OmitBy: o
          };
        },
        { './each': 12, './internal/collection': 35 }
      ],
      48: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, i, n), (this._result = {});
              }
              return r && (t.__proto__ = r), ((t.prototype = Object.create(r && r.prototype)).constructor = t);
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t || (this._result[e] = this._coll[e]),
              0 == --this._rest ? this._promise._resolve(this._result) : 0 < this._callRest-- && this._iterate();
          }
          function l(t, e) {
            if (!t) {
              var i = this._keys[e];
              this._result[i] = this._coll[i];
            }
            0 == --this._rest ? this._promise._resolve(this._result) : 0 < this._callRest-- && this._iterate();
          }
          e.exports = {
            omitByLimit: function(t, e, i) {
              return new o(t, e, i)._execute();
            },
            OmitByLimit: o
          };
        },
        { './eachLimit': 13, './internal/collection': 35 }
      ],
      49: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/util').PENDING,
            o = t('./internal/collection').setSeries,
            n = (function(i) {
              function t(t, e) {
                i.call(this, t, e),
                  (this._result = {}),
                  t === s ? (this._set = c) : (this._callResolve = void 0 === this._keys ? l : u);
              }
              return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t);
            })(r);
          function c(t) {
            return o.call(this, t), (this._callResolve = void 0 === this._keys ? l : u), this;
          }
          function l(t, e) {
            t || (this._result[e] = this._coll[e]),
              0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
          }
          function u(t, e) {
            if (!t) {
              var i = this._keys[e];
              this._result[i] = this._coll[i];
            }
            0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
          }
          e.exports = {
            omitBySeries: function(t, e) {
              return new n(t, e)._execute();
            },
            OmitBySeries: n
          };
        },
        { './eachSeries': 14, './internal/collection': 35, './internal/util': 38 }
      ],
      50: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.PENDING,
            l = o.promiseArrayEach,
            u = o.promiseObjectEach,
            a = o.promiseMapEach,
            h = o.promiseSetEach,
            _ = o.iteratorSymbol,
            p = t('./props'),
            f = p.callResolve,
            v = p.callResolveMap,
            y = (function(e) {
              function t(t) {
                e.call(this),
                  (this._promise = new s(n)),
                  (this._rest = void 0),
                  (this._coll = void 0),
                  (this._keys = void 0),
                  (this._result = void 0),
                  t === c ? (this._callResolve = this._set) : ((this._callResolve = void 0), this._set(t));
              }
              return (
                e && (t.__proto__ = e),
                (((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype._set = function(t) {
                  if (((this._coll = t), Array.isArray(t))) {
                    var e = t.length;
                    (this._rest = e), (this._result = Array(e)), (this._callResolve = f), l(this);
                  } else if (t && 'object' == typeof t)
                    if (t[_])
                      (this._rest = t.size),
                        t instanceof Map
                          ? ((this._result = new Map()), (this._callResolve = v), a(this))
                          : ((this._result = Array(this._rest)), (this._callResolve = f), h(this));
                    else {
                      var i = Object.keys(t);
                      (this._rest = i.length), (this._keys = i), (this._result = {}), (this._callResolve = f), u(this);
                    }
                  else (this._rest = 0), (this._result = {});
                  return 0 === this._rest && this._promise._resolve(this._result), this;
                }),
                (t.prototype._execute = function() {
                  return this._promise;
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r);
          e.exports = {
            parallel: function(t) {
              return new y(t)._promise;
            },
            Parallel: y
          };
        },
        { './aigle': 2, './internal/util': 38, './props': 57, 'aigle-core': 82 }
      ],
      51: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setPickShorthand,
            o = (function(r) {
              function t(t, e, i) {
                'function' != typeof e && (e = [e].concat(i)), r.call(this, t, e, n), (this._result = {});
              }
              return r && (t.__proto__ = r), ((t.prototype = Object.create(r && r.prototype)).constructor = t);
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t && (this._result[e] = this._coll[e]), 0 == --this._rest && this._promise._resolve(this._result);
          }
          function l(t, e) {
            if (t) {
              var i = this._keys[e];
              this._result[i] = this._coll[i];
            }
            0 == --this._rest && this._promise._resolve(this._result);
          }
          e.exports = {
            pick: function(t, e) {
              var i = [],
                r = arguments.length - 2;
              for (; 0 < r--; ) i[r] = arguments[r + 2];
              return new o(t, e, i)._execute();
            },
            Pick: o
          };
        },
        { './each': 12, './internal/collection': 35 }
      ],
      52: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n), (this._result = {});
              }
              return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t);
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t && (this._result[e] = this._coll[e]), 0 == --this._rest && this._promise._resolve(this._result);
          }
          function l(t, e) {
            if (t) {
              var i = this._keys[e];
              this._result[i] = this._coll[i];
            }
            0 == --this._rest && this._promise._resolve(this._result);
          }
          e.exports = {
            pickBy: function(t, e) {
              return new o(t, e)._execute();
            },
            PickBy: o
          };
        },
        { './each': 12, './internal/collection': 35 }
      ],
      53: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, i, n), (this._result = {});
              }
              return r && (t.__proto__ = r), ((t.prototype = Object.create(r && r.prototype)).constructor = t);
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t && (this._result[e] = this._coll[e]),
              0 == --this._rest ? this._promise._resolve(this._result) : 0 < this._callRest-- && this._iterate();
          }
          function l(t, e) {
            if (t) {
              var i = this._keys[e];
              this._result[i] = this._coll[i];
            }
            0 == --this._rest ? this._promise._resolve(this._result) : 0 < this._callRest-- && this._iterate();
          }
          e.exports = {
            pickByLimit: function(t, e, i) {
              return new o(t, e, i)._execute();
            },
            PickByLimit: o
          };
        },
        { './eachLimit': 13, './internal/collection': 35 }
      ],
      54: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n), (this._result = {});
              }
              return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t);
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t && (this._result[e] = this._coll[e]),
              0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
          }
          function l(t, e) {
            if (t) {
              var i = this._keys[e];
              this._result[i] = this._coll[i];
            }
            0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
          }
          e.exports = {
            pickBySeries: function(t, e) {
              return new o(t, e)._execute();
            },
            PickBySeries: o
          };
        },
        { './eachSeries': 14, './internal/collection': 35 }
      ],
      55: [
        function(t, e, i) {
          'use strict';
          var u = t('./aigle'),
            r = t('./internal/util'),
            a = r.INTERNAL,
            h = r.callThen,
            s = 'function' == typeof setImmediate ? setImmediate : {},
            o =
              (function() {
                try {
                  return t('util').promisify.custom;
                } catch (t) {
                  return;
                }
              })() || {};
          function _(i) {
            return function(t, e) {
              return t ? i._reject(t) : i._resolve(e);
            };
          }
          e.exports = function(t, e) {
            switch (typeof t) {
              case 'object':
                switch (typeof e) {
                  case 'string':
                  case 'number':
                    if ('function' != typeof t[e]) throw new TypeError('Function not found key: ' + e);
                    return t[e].__isPromisified__
                      ? t[e]
                      : (function(n, c) {
                          return (t.__isPromisified__ = !0), t;
                          function t(t) {
                            var e = arguments,
                              i = new u(a),
                              r = _(i),
                              s = arguments.length;
                            switch (s) {
                              case 0:
                                n[c](r);
                                break;
                              case 1:
                                n[c](t, r);
                                break;
                              default:
                                for (var o = Array(s); s--; ) o[s] = e[s];
                                (o[o.length] = r), n[c].apply(n, o);
                            }
                            return i;
                          }
                        })(t, e);
                  default:
                    throw new TypeError('Second argument is invalid');
                }
              case 'function':
                if (t.__isPromisified__) return t;
                var i = e && void 0 !== e.context ? e.context : void 0;
                return (function(n, c) {
                  var l = n[o];
                  if (l) return (t.__isPromisified__ = !0), t;
                  switch (n) {
                    case setTimeout:
                      return u.delay;
                    case s:
                      return u.resolve;
                  }
                  return (e.__isPromisified__ = !0), e;
                  function t(t) {
                    var e,
                      i = arguments,
                      r = new u(a),
                      s = arguments.length;
                    switch (s) {
                      case 0:
                        e = l.call(c || this);
                        break;
                      case 1:
                        e = l.call(c || this, t);
                        break;
                      default:
                        for (var o = Array(s); s--; ) o[s] = i[s];
                        e = l.apply(c || this, o);
                    }
                    return h(e, r), r;
                  }
                  function e(t) {
                    var e = arguments,
                      i = new u(a),
                      r = _(i),
                      s = arguments.length;
                    switch (s) {
                      case 0:
                        n.call(c || this, r);
                        break;
                      case 1:
                        n.call(c || this, t, r);
                        break;
                      default:
                        for (var o = Array(s); s--; ) o[s] = e[s];
                        (o[o.length] = r), n.apply(c || this, o);
                    }
                    return i;
                  }
                })(t, i);
              default:
                throw new TypeError('Type of first argument is not function');
            }
          };
        },
        { './aigle': 2, './internal/util': 38, util: 87 }
      ],
      56: [
        function(t, e, i) {
          'use strict';
          var l = t('./promisify'),
            a = {
              constructor: !0,
              arity: !0,
              length: !0,
              name: !0,
              arguments: !0,
              caller: !0,
              callee: !0,
              prototype: !0,
              __isPromisified__: !0
            };
          function n(t) {
            return /^(?!_).*/.test(t);
          }
          function h(t, e, i, r, s, o) {
            var n = {};
            switch (typeof i) {
              case 'function':
                if (s) {
                  if (i.__isPromisified__) return;
                  var c = '' + r + t;
                  if (s[c]) {
                    if (!s[c].__isPromisified__)
                      throw new TypeError("Cannot promisify an API that has normal methods with '" + t + "'-suffix");
                  } else s[c] = l(i);
                }
                u(t, e, i, i, o, n), u(t, e, i.prototype, i.prototype, o, n);
                break;
              case 'object':
                if (!i) break;
                u(t, e, i, i, o, n), u(t, e, Object.getPrototypeOf(i), i, o, n);
            }
          }
          e.exports = function(t, e) {
            var i = e || {},
              r = i.suffix;
            void 0 === r && (r = 'Async');
            var s = i.filter;
            void 0 === s && (s = n);
            var o = i.depth;
            void 0 === o && (o = 2);
            return h(r, s, t, void 0, void 0, o), t;
          };
          var _ = Function.prototype,
            p = Object.prototype,
            f = Array.prototype;
          function u(t, e, i, r, s, o) {
            if (0 != s-- && i && _ !== i && p !== i && f !== i && !Object.isFrozen(i))
              for (var n = Object.getOwnPropertyNames(i), c = n.length; c--; ) {
                var l = n[c];
                if (!0 !== a[l] && !0 !== o[l] && e(l)) {
                  var u = Object.getOwnPropertyDescriptor(i, l);
                  !u || u.set || u.get || ((o[l] = !0), h(t, e, i[l], l, r, s));
                }
              }
          }
        },
        { './promisify': 55 }
      ],
      57: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.PENDING,
            l = o.promiseObjectEach,
            u = o.promiseMapEach,
            a = (function(e) {
              function t(t) {
                e.call(this),
                  (this._promise = new s(n)),
                  (this._rest = void 0),
                  (this._result = void 0),
                  (this._coll = void 0),
                  (this._keys = void 0),
                  t === c ? (this._callResolve = this._set) : ((this._callResolve = void 0), this._set(t));
              }
              return (
                e && (t.__proto__ = e),
                (((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype._set = function(t) {
                  if ((this._coll = t) && 'object' == typeof t)
                    if (t instanceof Map)
                      (this._result = new Map()), (this._rest = t.size), (this._callResolve = _), u(this);
                    else {
                      var e = Object.keys(t);
                      (this._result = {}), (this._rest = e.length), (this._keys = e), (this._callResolve = h), l(this);
                    }
                  else (this._rest = 0), (this._result = {});
                  return 0 === this._rest && this._promise._resolve(this._result), this;
                }),
                (t.prototype._execute = function() {
                  return this._promise;
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r);
          function h(t, e) {
            (this._result[e] = t), 0 == --this._rest && this._promise._resolve(this._result);
          }
          function _(t, e) {
            this._result.set(e, t), 0 == --this._rest && this._promise._resolve(this._result);
          }
          e.exports = {
            props: function(t) {
              return new a(t)._promise;
            },
            Props: a,
            callResolve: h,
            callResolveMap: _
          };
        },
        { './aigle': 2, './internal/util': 38, 'aigle-core': 82 }
      ],
      58: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.PENDING,
            l = o.promiseArrayEach,
            u = o.promiseObjectEach,
            a = o.promiseMapEach,
            h = o.promiseSetEach,
            _ = o.iteratorSymbol,
            p = (function(e) {
              function t(t) {
                e.call(this),
                  (this._promise = new s(n)),
                  (this._rest = void 0),
                  (this._coll = void 0),
                  (this._keys = void 0),
                  (this._result = void 0),
                  t === c ? (this._callResolve = this._set) : ((this._callResolve = void 0), this._set(t));
              }
              return (
                e && (t.__proto__ = e),
                (((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype._set = function(t) {
                  if (((this._coll = t), (this._callResolve = f), Array.isArray(t))) {
                    var e = t.length;
                    (this._rest = e), l(this);
                  } else if (t && 'object' == typeof t)
                    if (t[_]) (this._rest = t.size), t instanceof Map ? ((this._result = new Map()), a(this)) : h(this);
                    else {
                      var i = Object.keys(t);
                      (this._result = {}), (this._rest = i.length), (this._keys = i), u(this);
                    }
                  else this._rest = 0;
                  return this;
                }),
                (t.prototype._execute = function() {
                  return this._promise;
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r);
          function f(t) {
            this._promise._resolve(t);
          }
          e.exports = {
            race: function(t) {
              return new p(t)._promise;
            },
            Race: p
          };
        },
        { './aigle': 2, './internal/util': 38, 'aigle-core': 82 }
      ],
      59: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/collection'),
            n = o.execute,
            c = o.setSeries,
            l = t('./internal/util'),
            u = l.INTERNAL,
            a = l.PENDING,
            h = l.call3,
            _ = l.callProxyReciever,
            p = (function(r) {
              function t(t, e, i) {
                r.call(this),
                  (this._result = i),
                  (this._iterator = e),
                  (this._promise = new s(u)),
                  (this._coll = void 0),
                  (this._rest = void 0),
                  (this._size = void 0),
                  (this._keys = void 0),
                  (this._iterate = void 0),
                  t === a
                    ? ((this._set = f), (this._iterate = this._callResolve), (this._callResolve = n))
                    : f.call(this, t);
              }
              return (
                r && (t.__proto__ = r),
                (((t.prototype = Object.create(r && r.prototype)).constructor = t).prototype._callResolve = function(
                  t,
                  e
                ) {
                  0 == --this._rest ? this._promise._resolve(t) : this._iterate(++e, t);
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r);
          function f(t) {
            return (
              c.call(this, t),
              void 0 === this._keys
                ? ((this._iterate = v), (this._execute = m))
                : ((this._iterate = y), (this._execute = d)),
              this
            );
          }
          function v(t, e) {
            _(h(this._iterator, e, this._coll[t], t), this, t);
          }
          function y(t, e) {
            var i = this._keys[t];
            _(h(this._iterator, e, this._coll[i], i), this, t);
          }
          function m() {
            return (
              0 === this._rest
                ? this._promise._resolve(this._result)
                : void 0 === this._result
                  ? this._callResolve(this._coll[0], 0)
                  : this._iterate(0, this._result),
              this._promise
            );
          }
          function d() {
            return (
              0 === this._rest
                ? this._promise._resolve(this._result)
                : void 0 === this._result
                  ? this._callResolve(this._coll[this._keys[0]], 0)
                  : this._iterate(0, this._result),
              this._promise
            );
          }
          e.exports = {
            reduce: function(t, e, i) {
              return new p(t, e, i)._execute();
            },
            Reduce: p
          };
        },
        { './aigle': 2, './internal/collection': 35, './internal/util': 38, 'aigle-core': 82 }
      ],
      60: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.compactArray,
            l = (function(i) {
              function t(t, e) {
                i.call(this, t, e, u);
              }
              return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t);
            })(r);
          function u(t) {
            return (
              s.call(this, t),
              (this._result = Array(this._rest)),
              (this._callResolve = void 0 === this._keys ? a : h),
              this
            );
          }
          function a(t, e) {
            (this._result[e] = t ? n : this._coll[e]), 0 == --this._rest && this._promise._resolve(c(this._result));
          }
          function h(t, e) {
            (this._result[e] = t ? n : this._coll[this._keys[e]]),
              0 == --this._rest && this._promise._resolve(c(this._result));
          }
          e.exports = {
            reject: function(t, e) {
              return new l(t, e)._execute();
            },
            Reject: l
          };
        },
        { './each': 12, './internal/collection': 35, './internal/util': 38 }
      ],
      61: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.compactArray,
            l = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, i, u);
              }
              return r && (t.__proto__ = r), ((t.prototype = Object.create(r && r.prototype)).constructor = t);
            })(r);
          function u(t) {
            return (
              s.call(this, t),
              (this._result = Array(this._rest)),
              (this._callResolve = void 0 === this._keys ? a : h),
              this
            );
          }
          function a(t, e) {
            (this._result[e] = t ? n : this._coll[e]),
              0 == --this._rest ? this._promise._resolve(c(this._result)) : 0 < this._callRest-- && this._iterate();
          }
          function h(t, e) {
            (this._result[e] = t ? n : this._coll[this._keys[e]]),
              0 == --this._rest ? this._promise._resolve(c(this._result)) : 0 < this._callRest-- && this._iterate();
          }
          e.exports = {
            rejectLimit: function(t, e, i) {
              return new l(t, e, i)._execute();
            },
            RejectLimit: l
          };
        },
        { './eachLimit': 13, './internal/collection': 35, './internal/util': 38 }
      ],
      62: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.compactArray,
            l = (function(i) {
              function t(t, e) {
                i.call(this, t, e, u);
              }
              return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t);
            })(r);
          function u(t) {
            return (
              s.call(this, t),
              (this._result = Array(this._rest)),
              (this._callResolve = void 0 === this._keys ? a : h),
              this
            );
          }
          function a(t, e) {
            (this._result[e] = t ? n : this._coll[e]),
              0 == --this._rest ? this._promise._resolve(c(this._result)) : this._iterate();
          }
          function h(t, e) {
            (this._result[e] = t ? n : this._coll[this._keys[e]]),
              0 == --this._rest ? this._promise._resolve(c(this._result)) : this._iterate();
          }
          e.exports = {
            rejectSeries: function(t, e) {
              return new l(t, e)._execute();
            },
            RejectSeries: l
          };
        },
        { './eachSeries': 14, './internal/collection': 35, './internal/util': 38 }
      ],
      63: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.call0,
            l = o.callProxyReciever,
            u = 5,
            a = (function(i) {
              function t(t, e) {
                i.call(this), (this._promise = new s(n)), (this._rest = e), (this._handler = t), this._iterate();
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype._iterate = function() {
                  l(c(this._handler), this, void 0);
                }),
                (t.prototype._callResolve = function(t) {
                  this._promise._resolve(t);
                }),
                (t.prototype._callReject = function(t) {
                  0 == --this._rest ? this._promise._reject(t) : this._iterate();
                }),
                t
              );
            })(r);
          e.exports = function(t, e) {
            'function' == typeof t && ((e = t), (t = u));
            return new a(e, t)._promise;
          };
        },
        { './aigle': 2, './internal/util': 38, 'aigle-core': 82 }
      ],
      64: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, s), (this._result = !1);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype._callResolve = function(
                  t
                ) {
                  t ? this._promise._resolve(!0) : 0 == --this._rest && this._promise._resolve(!1);
                }),
                t
              );
            })(r);
          e.exports = {
            some: function(t, e) {
              return new o(t, e)._execute();
            },
            Some: o
          };
        },
        { './each': 12, './internal/collection': 35 }
      ],
      65: [
        function(t, e, i) {
          'use strict';
          var r = (function(r) {
            function t(t, e, i) {
              r.call(this, t, e, i), (this._result = !1);
            }
            return (
              r && (t.__proto__ = r),
              (((t.prototype = Object.create(r && r.prototype)).constructor = t).prototype._callResolve = function(t) {
                t
                  ? this._promise._resolve(!0)
                  : 0 == --this._rest
                    ? this._promise._resolve(!1)
                    : 0 < this._callRest-- && this._iterate();
              }),
              t
            );
          })(t('./eachLimit').EachLimit);
          e.exports = {
            someLimit: function(t, e, i) {
              return new r(t, e, i)._execute();
            },
            SomeLimit: r
          };
        },
        { './eachLimit': 13 }
      ],
      66: [
        function(t, e, i) {
          'use strict';
          var r = (function(i) {
            function t(t, e) {
              i.call(this, t, e), (this._result = !1);
            }
            return (
              i && (t.__proto__ = i),
              (((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype._callResolve = function(t) {
                t ? this._promise._resolve(!0) : 0 == --this._rest ? this._promise._resolve(!1) : this._iterate();
              }),
              t
            );
          })(t('./eachSeries.js').EachSeries);
          e.exports = {
            someSeries: function(t, e) {
              return new r(t, e)._execute();
            },
            SomeSeries: r
          };
        },
        { './eachSeries.js': 14 }
      ],
      67: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = t('./internal/util'),
            n = o.sortArray,
            c = o.sortObject,
            l = (function(i) {
              function t(t, e) {
                i.call(this, t, e, u);
              }
              return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t);
            })(r);
          function u(t) {
            return (
              s.call(this, t),
              (this._result = Array(this._rest)),
              (this._callResolve = void 0 === this._keys ? a : h),
              this
            );
          }
          function a(t, e) {
            (this._result[e] = t), 0 == --this._rest && this._promise._resolve(n(this._coll, this._result));
          }
          function h(t, e) {
            (this._result[e] = t), 0 == --this._rest && this._promise._resolve(c(this._coll, this._keys, this._result));
          }
          e.exports = {
            sortBy: function(t, e) {
              return new l(t, e)._execute();
            },
            SortBy: l
          };
        },
        { './each': 12, './internal/collection': 35, './internal/util': 38 }
      ],
      68: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = t('./internal/util'),
            n = o.sortArray,
            c = o.sortObject,
            l = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, i, u);
              }
              return r && (t.__proto__ = r), ((t.prototype = Object.create(r && r.prototype)).constructor = t);
            })(r);
          function u(t) {
            return (
              s.call(this, t),
              (this._result = Array(this._rest)),
              (this._callResolve = void 0 === this._keys ? a : h),
              this
            );
          }
          function a(t, e) {
            (this._result[e] = t),
              0 == --this._rest
                ? this._promise._resolve(n(this._coll, this._result))
                : 0 < this._callRest-- && this._iterate();
          }
          function h(t, e) {
            (this._result[e] = t),
              0 == --this._rest
                ? this._promise._resolve(c(this._coll, this._keys, this._result))
                : 0 < this._callRest-- && this._iterate();
          }
          e.exports = {
            sortByLimit: function(t, e, i) {
              return new l(t, e, i)._execute();
            },
            SortByLimit: l
          };
        },
        { './eachLimit': 13, './internal/collection': 35, './internal/util': 38 }
      ],
      69: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = t('./internal/util'),
            n = o.sortArray,
            c = o.sortObject,
            l = (function(i) {
              function t(t, e) {
                i.call(this, t, e, u);
              }
              return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t);
            })(r);
          function u(t) {
            return (
              s.call(this, t),
              (this._result = Array(this._rest)),
              (this._callResolve = void 0 === this._keys ? a : h),
              this
            );
          }
          function a(t, e) {
            (this._result[e] = t),
              0 == --this._rest ? this._promise._resolve(n(this._coll, this._result)) : this._iterate();
          }
          function h(t, e) {
            (this._result[e] = t),
              0 == --this._rest ? this._promise._resolve(c(this._coll, this._keys, this._result)) : this._iterate();
          }
          e.exports = {
            sortBySeries: function(t, e) {
              return new l(t, e)._execute();
            },
            SortBySeries: l
          };
        },
        { './eachSeries': 14, './internal/collection': 35, './internal/util': 38 }
      ],
      70: [
        function(t, e, i) {
          'use strict';
          var r = t('./aigle'),
            s = t('./internal/util'),
            o = s.INTERNAL,
            n = s.callResolve;
          e.exports = function(t, e) {
            var i = new r(o);
            return (
              n(i, e, t),
              i.then(function() {
                return t;
              })
            );
          };
        },
        { './aigle': 2, './internal/util': 38 }
      ],
      71: [
        function(t, e, i) {
          'use strict';
          var r = t('./aigle'),
            s = t('./internal/util'),
            o = s.INTERNAL,
            n = s.callResolve;
          e.exports = function(t, e) {
            var i = new r(o);
            return n(i, e, t), i;
          };
        },
        { './aigle': 2, './internal/util': 38 }
      ],
      72: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./error').TimeoutError,
            n = t('./internal/util').INTERNAL,
            c = (function(r) {
              function t(t, e) {
                var i = this;
                r.call(this),
                  (this._promise = new s(n)),
                  (this._message = e),
                  (this._timer = setTimeout(function() {
                    e ? i._callReject(e) : i._callReject(new o('operation timed out'));
                  }, t));
              }
              return (
                r && (t.__proto__ = r),
                (((t.prototype = Object.create(r && r.prototype)).constructor = t).prototype._callResolve = function(
                  t
                ) {
                  clearTimeout(this._timer), this._promise._resolve(t);
                }),
                (t.prototype._callReject = function(t) {
                  clearTimeout(this._timer), this._promise._reject(t);
                }),
                t
              );
            })(r);
          e.exports = c;
        },
        { './aigle': 2, './error': 15, './internal/util': 38, 'aigle-core': 82 }
      ],
      73: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.PENDING,
            l = o.defaultIterator,
            u = o.call1,
            a = o.callProxyReciever,
            h = (function(i) {
              function t(t, e) {
                i.call(this),
                  (this._promise = new s(n)),
                  (this._iterator = 'function' == typeof e ? e : l),
                  (this._rest = void 0),
                  (this._result = void 0),
                  t === c ? ((this._rest = this._callResolve), (this._callResolve = p)) : _.call(this, t);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype._execute = function() {
                  if (1 <= this._rest)
                    for (var t = this._rest, e = this._iterator, i = -1; ++i < t && a(u(e, i), this, i); );
                  else this._promise._resolve(this._result);
                  return this._promise;
                }),
                (t.prototype._callResolve = function(t, e) {
                  (this._result[e] = t), 0 == --this._rest && this._promise._resolve(this._result);
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r);
          function _(t) {
            1 <= (t = 0 | +t) ? ((this._rest = t), (this._result = Array(t))) : ((this._rest = 0), (this._result = []));
          }
          function p(t) {
            (this._callResolve = this._rest), _.call(this, t), this._execute();
          }
          e.exports = {
            times: function(t, e) {
              return new h(t, e)._execute();
            },
            Times: h,
            set: _,
            execute: p
          };
        },
        { './aigle': 2, './internal/util': 38, 'aigle-core': 82 }
      ],
      74: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.PENDING,
            l = o.DEFAULT_LIMIT,
            u = o.defaultIterator,
            a = o.call1,
            h = o.callProxyReciever,
            _ = (function(r) {
              function t(t, e, i) {
                r.call(this),
                  'function' == typeof e && ((i = e), (e = l)),
                  (this._promise = new s(n)),
                  (this._index = 0),
                  (this._limit = e),
                  (this._iterator = 'function' == typeof i ? i : u),
                  (this._rest = void 0),
                  (this._result = void 0),
                  (this._callRest = void 0),
                  t === c ? ((this._rest = this._callResolve), (this._callResolve = f)) : p.call(this, t);
              }
              return (
                r && (t.__proto__ = r),
                (((t.prototype = Object.create(r && r.prototype)).constructor = t).prototype._execute = function() {
                  if (0 === this._rest) this._promise._resolve(this._result);
                  else for (; this._limit--; ) this._iterate();
                  return this._promise;
                }),
                (t.prototype._iterate = function() {
                  var t = this._index++;
                  h(a(this._iterator, t), this, t);
                }),
                (t.prototype._callResolve = function(t, e) {
                  (this._result[e] = t),
                    0 == --this._rest ? this._promise._resolve(this._result) : 0 < this._callRest-- && this._iterate();
                }),
                (t.prototype._callReject = function(t) {
                  (this._callRest = 0), this._promise._reject(t);
                }),
                t
              );
            })(r);
          function p(t) {
            if (1 <= (t = 0 | +t)) {
              (this._rest = t), (this._result = Array(t));
              var e = this._limit;
              (this._limit = e < t ? e : t), (this._callRest = t - this._limit);
            } else (this._rest = 0), (this._result = []);
          }
          function f(t) {
            (this._callResolve = this._rest), p.call(this, t), this._execute();
          }
          e.exports = {
            timesLimit: function(t, e, i) {
              return new _(t, e, i)._execute();
            },
            TimesLimit: _
          };
        },
        { './aigle': 2, './internal/util': 38, 'aigle-core': 82 }
      ],
      75: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./times'),
            n = o.set,
            c = o.execute,
            l = t('./internal/util'),
            u = l.INTERNAL,
            a = l.PENDING,
            h = l.defaultIterator,
            _ = l.call1,
            p = l.callProxyReciever,
            f = (function(i) {
              function t(t, e) {
                i.call(this),
                  (this._promise = new s(u)),
                  (this._iterator = 'function' == typeof e ? e : h),
                  (this._index = 0),
                  (this._rest = void 0),
                  (this._result = void 0),
                  t === a ? ((this._rest = this._callResolve), (this._callResolve = c)) : n.call(this, t);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype._execute = function() {
                  return 1 <= this._rest ? this._iterate() : this._promise._resolve(this._result), this._promise;
                }),
                (t.prototype._iterate = function() {
                  var t = this._index++;
                  p(_(this._iterator, t), this, t);
                }),
                (t.prototype._callResolve = function(t, e) {
                  (this._result[e] = t), 0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r);
          e.exports = {
            timesSeries: function(t, e) {
              return new f(t, e)._execute();
            },
            TimesSeries: f
          };
        },
        { './aigle': 2, './internal/util': 38, './times': 73, 'aigle-core': 82 }
      ],
      76: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setParallel,
            o = t('./internal/util'),
            l = o.call3,
            u = o.callProxyReciever,
            n = o.clone,
            c = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, a), void 0 !== i && (this._result = i);
              }
              return (
                r && (t.__proto__ = r),
                (((t.prototype = Object.create(r && r.prototype)).constructor = t).prototype._callResolve = function(
                  t
                ) {
                  !1 === t
                    ? this._promise._resolve(n(this._result))
                    : 0 == --this._rest && this._promise._resolve(this._result);
                }),
                t
              );
            })(r);
          function a(t) {
            return (
              s.call(this, t),
              void 0 !== this._keys || void 0 === this._coll
                ? (void 0 === this._result && (this._result = {}), (this._iterate = _))
                : (void 0 === this._result && (this._result = []), (this._iterate = h)),
              this
            );
          }
          function h() {
            for (
              var t = this._rest, e = this._result, i = this._iterator, r = this._coll, s = -1;
              ++s < t && u(l(i, e, r[s], s), this, s);

            );
          }
          function _() {
            for (
              var t = this, e = t._rest, i = t._result, r = t._iterator, s = t._coll, o = t._keys, n = -1;
              ++n < e;

            ) {
              var c = o[n];
              if (!1 === u(l(r, i, s[c], c), this, n)) break;
            }
          }
          e.exports = {
            transform: function(t, e, i) {
              return new c(t, e, i)._execute();
            },
            Transform: c
          };
        },
        { './each': 12, './internal/collection': 35, './internal/util': 38 }
      ],
      77: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = t('./internal/util'),
            n = o.DEFAULT_LIMIT,
            c = o.call3,
            l = o.callProxyReciever,
            u = o.clone,
            a = (function(s) {
              function t(t, e, i, r) {
                'function' == typeof e && ((r = i), (i = e), (e = n)),
                  s.call(this, t, e, i, h),
                  void 0 !== r && (this._result = r);
              }
              return (
                s && (t.__proto__ = s),
                (((t.prototype = Object.create(s && s.prototype)).constructor = t).prototype._callResolve = function(
                  t
                ) {
                  !1 === t
                    ? this._promise._resolve(u(this._result))
                    : 0 == --this._rest
                      ? this._promise._resolve(this._result)
                      : 0 < this._callRest-- && this._iterate();
                }),
                t
              );
            })(r);
          function h(t) {
            return (
              s.call(this, t),
              void 0 !== this._keys || void 0 === this._coll
                ? (void 0 === this._result && (this._result = {}), (this._iterate = p))
                : (void 0 === this._result && (this._result = []), (this._iterate = _)),
              this
            );
          }
          function _() {
            var t = this._index++;
            l(c(this._iterator, this._result, this._coll[t], t), this, t);
          }
          function p() {
            var t = this._index++,
              e = this._keys[t];
            l(c(this._iterator, this._result, this._coll[e], e), this, t);
          }
          e.exports = {
            transformLimit: function(t, e, i, r) {
              return new a(t, e, i, r)._execute();
            },
            TransformLimit: a
          };
        },
        { './eachLimit': 13, './internal/collection': 35, './internal/util': 38 }
      ],
      78: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = t('./internal/util'),
            n = o.call3,
            c = o.callProxyReciever,
            l = o.clone,
            u = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, a), void 0 !== i && (this._result = i);
              }
              return (
                r && (t.__proto__ = r),
                (((t.prototype = Object.create(r && r.prototype)).constructor = t).prototype._callResolve = function(
                  t
                ) {
                  !1 === t
                    ? this._promise._resolve(l(this._result))
                    : 0 == --this._rest
                      ? this._promise._resolve(this._result)
                      : this._iterate();
                }),
                t
              );
            })(r);
          function a(t) {
            return (
              s.call(this, t),
              void 0 !== this._keys || void 0 === this._coll
                ? (void 0 === this._result && (this._result = {}), (this._iterate = _))
                : (void 0 === this._result && (this._result = []), (this._iterate = h)),
              this
            );
          }
          function h() {
            var t = this._index++;
            c(n(this._iterator, this._result, this._coll[t], t), this, t);
          }
          function _() {
            var t = this._index++,
              e = this._keys[t];
            c(n(this._iterator, this._result, this._coll[e], e), this, t);
          }
          e.exports = {
            transformSeries: function(t, e, i) {
              return new u(t, e, i)._execute();
            },
            TransformSeries: u
          };
        },
        { './eachSeries': 14, './internal/collection': 35, './internal/util': 38 }
      ],
      79: [
        function(t, e, i) {
          'use strict';
          var r = t('./whilst'),
            s = r.AigleWhilst,
            o = (function(e) {
              function t(t) {
                e.call(this, t);
              }
              return (
                e && (t.__proto__ = e),
                (((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype._callResolve = function(
                  t
                ) {
                  t ? this._proxy._promise._resolve(this._value) : this._proxy._next(this._value);
                }),
                t
              );
            })(r.WhilstTester);
          e.exports = {
            until: function(t, e, i) {
              'function' != typeof i && ((i = e), (e = t), (t = void 0));
              return new s(new o(e), i)._iterate(t);
            },
            UntilTester: o
          };
        },
        { './whilst': 81 }
      ],
      80: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            n = t('./aigle'),
            s = t('./internal/util'),
            c = s.INTERNAL,
            l = s.apply,
            o = s.call1,
            u = s.callProxyReciever,
            a = {},
            h = function(t, e) {
              (this._promise = t), (this._handler = e);
            };
          h.prototype._dispose = function() {
            var t = this,
              e = this._promise;
            switch (e._resolved) {
              case 0:
                return e.then(function() {
                  return t._dispose();
                });
              case 1:
                return o(this._handler, this._promise._value);
            }
          };
          var _ = (function(o) {
            function t(t, e) {
              o.call(this);
              var i = t.length;
              (this._promise = new n(c)),
                (this._rest = i),
                (this._disposed = i),
                (this._array = t),
                (this._error = void 0),
                (this._result = Array(i)),
                (this._handler = e);
              for (var r = -1; ++r < i; ) {
                var s = t[r];
                u(s instanceof h == !1 ? s : s._promise, this, r);
              }
            }
            return (
              o && (t.__proto__ = o),
              (((t.prototype = Object.create(o && o.prototype)).constructor = t).prototype._spread = function() {
                var t = this._handler,
                  e = this._result;
                if ('function' != typeof t) return this._callResolve(void 0, c);
                u(l(t, e), this, c);
              }),
              (t.prototype._release = function() {
                for (var t = this._array, e = t.length; e--; ) {
                  var i = t[e];
                  i instanceof h == !1 ? this._callResolve(i, a) : u(i._dispose(), this, a);
                }
              }),
              (t.prototype._callResolve = function(t, e) {
                if (e === c) return (this._result = t), this._release();
                e !== a
                  ? ((this._result[e] = t), 0 == --this._rest && this._spread())
                  : 0 == --this._disposed &&
                    (this._error ? this._promise._reject(this._error) : this._promise._resolve(this._result));
              }),
              (t.prototype._callReject = function(t) {
                if (this._error) return this._promise._reject(t);
                (this._error = t), this._release();
              }),
              t
            );
          })(r);
          e.exports = {
            using: function() {
              var t = arguments,
                e = arguments.length,
                i = arguments[--e],
                r = Array(e);
              for (; e--; ) r[e] = t[e];
              return new _(r, i)._promise;
            },
            Disposer: h
          };
        },
        { './aigle': 2, './internal/util': 38, 'aigle-core': 82 }
      ],
      81: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.callProxyReciever,
            l = o.call1,
            u = (function(e) {
              function t(t) {
                e.call(this), (this._tester = t), (this._proxy = void 0), (this._value = void 0);
              }
              return (
                e && (t.__proto__ = e),
                (((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype._test = function(t) {
                  (this._value = t), c(l(this._tester, t), this, void 0);
                }),
                (t.prototype._callResolve = function(t) {
                  t ? this._proxy._next(this._value) : this._proxy._promise._resolve(this._value);
                }),
                (t.prototype._callReject = function(t) {
                  this._proxy._callReject(t);
                }),
                t
              );
            })(r),
            a = (function(i) {
              function t(t, e) {
                i.call(this), (this._promise = new s(n)), (this._tester = t), (this._iterator = e), (t._proxy = this);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype._iterate = function(t) {
                  return this._callResolve(t), this._promise;
                }),
                (t.prototype._next = function(t) {
                  c(l(this._iterator, t), this, void 0);
                }),
                (t.prototype._callResolve = function(t) {
                  this._tester._test(t);
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r);
          e.exports = {
            whilst: function(t, e, i) {
              'function' != typeof i && ((i = e), (e = t), (t = void 0));
              return new a(new u(e), i)._iterate(t);
            },
            AigleWhilst: a,
            WhilstTester: u
          };
        },
        { './aigle': 2, './internal/util': 38, 'aigle-core': 82 }
      ],
      82: [
        function(t, e, i) {
          'use strict';
          e.exports = { AigleCore: function() {}, AigleProxy: function() {} };
        },
        {}
      ],
      83: [
        function(t, e, i) {
          var r,
            s,
            o = (e.exports = {});
          function n() {
            throw new Error('setTimeout has not been defined');
          }
          function c() {
            throw new Error('clearTimeout has not been defined');
          }
          function l(e) {
            if (r === setTimeout) return setTimeout(e, 0);
            if ((r === n || !r) && setTimeout) return (r = setTimeout), setTimeout(e, 0);
            try {
              return r(e, 0);
            } catch (t) {
              try {
                return r.call(null, e, 0);
              } catch (t) {
                return r.call(this, e, 0);
              }
            }
          }
          !(function() {
            try {
              r = 'function' == typeof setTimeout ? setTimeout : n;
            } catch (t) {
              r = n;
            }
            try {
              s = 'function' == typeof clearTimeout ? clearTimeout : c;
            } catch (t) {
              s = c;
            }
          })();
          var u,
            a = [],
            h = !1,
            _ = -1;
          function p() {
            h && u && ((h = !1), u.length ? (a = u.concat(a)) : (_ = -1), a.length && f());
          }
          function f() {
            if (!h) {
              var t = l(p);
              h = !0;
              for (var e = a.length; e; ) {
                for (u = a, a = []; ++_ < e; ) u && u[_].run();
                (_ = -1), (e = a.length);
              }
              (u = null),
                (h = !1),
                (function(e) {
                  if (s === clearTimeout) return clearTimeout(e);
                  if ((s === c || !s) && clearTimeout) return (s = clearTimeout), clearTimeout(e);
                  try {
                    s(e);
                  } catch (t) {
                    try {
                      return s.call(null, e);
                    } catch (t) {
                      return s.call(this, e);
                    }
                  }
                })(t);
            }
          }
          function v(t, e) {
            (this.fun = t), (this.array = e);
          }
          function y() {}
          (o.nextTick = function(t) {
            var e = arguments,
              i = new Array(arguments.length - 1);
            if (1 < arguments.length) for (var r = 1; r < arguments.length; r++) i[r - 1] = e[r];
            a.push(new v(t, i)), 1 !== a.length || h || l(f);
          }),
            (v.prototype.run = function() {
              this.fun.apply(null, this.array);
            }),
            (o.title = 'browser'),
            (o.browser = !0),
            (o.env = {}),
            (o.argv = []),
            (o.version = ''),
            (o.versions = {}),
            (o.on = y),
            (o.addListener = y),
            (o.once = y),
            (o.off = y),
            (o.removeListener = y),
            (o.removeAllListeners = y),
            (o.emit = y),
            (o.prependListener = y),
            (o.prependOnceListener = y),
            (o.listeners = function(t) {
              return [];
            }),
            (o.binding = function(t) {
              throw new Error('process.binding is not supported');
            }),
            (o.cwd = function() {
              return '/';
            }),
            (o.chdir = function(t) {
              throw new Error('process.chdir is not supported');
            }),
            (o.umask = function() {
              return 0;
            });
        },
        {}
      ],
      84: [
        function(t, e, i) {
          (function(f, t) {
            !(function(i, r) {
              'use strict';
              if (!i.setImmediate) {
                var o,
                  s,
                  e,
                  n,
                  t,
                  c = 1,
                  l = {},
                  u = !1,
                  a = i.document,
                  h = Object.getPrototypeOf && Object.getPrototypeOf(i);
                (h = h && h.setTimeout ? h : i),
                  '[object process]' === {}.toString.call(i.process)
                    ? (o = function(t) {
                        f.nextTick(function() {
                          p(t);
                        });
                      })
                    : !(function() {
                        if (i.postMessage && !i.importScripts) {
                          var t = !0,
                            e = i.onmessage;
                          return (
                            (i.onmessage = function() {
                              t = !1;
                            }),
                            i.postMessage('', '*'),
                            (i.onmessage = e),
                            t
                          );
                        }
                      })()
                      ? i.MessageChannel
                        ? (((e = new MessageChannel()).port1.onmessage = function(t) {
                            p(t.data);
                          }),
                          (o = function(t) {
                            e.port2.postMessage(t);
                          }))
                        : a && 'onreadystatechange' in a.createElement('script')
                          ? ((s = a.documentElement),
                            (o = function(t) {
                              var e = a.createElement('script');
                              (e.onreadystatechange = function() {
                                p(t), (e.onreadystatechange = null), s.removeChild(e), (e = null);
                              }),
                                s.appendChild(e);
                            }))
                          : (o = function(t) {
                              setTimeout(p, 0, t);
                            })
                      : ((n = 'setImmediate$' + Math.random() + '$'),
                        (t = function(t) {
                          t.source === i &&
                            'string' == typeof t.data &&
                            0 === t.data.indexOf(n) &&
                            p(+t.data.slice(n.length));
                        }),
                        i.addEventListener ? i.addEventListener('message', t, !1) : i.attachEvent('onmessage', t),
                        (o = function(t) {
                          i.postMessage(n + t, '*');
                        })),
                  (h.setImmediate = function(t) {
                    var e = arguments;
                    'function' != typeof t && (t = new Function('' + t));
                    for (var i = new Array(arguments.length - 1), r = 0; r < i.length; r++) i[r] = e[r + 1];
                    var s = { callback: t, args: i };
                    return (l[c] = s), o(c), c++;
                  }),
                  (h.clearImmediate = _);
              }
              function _(t) {
                delete l[t];
              }
              function p(t) {
                if (u) setTimeout(p, 0, t);
                else {
                  var e = l[t];
                  if (e) {
                    u = !0;
                    try {
                      !(function(t) {
                        var e = t.callback,
                          i = t.args;
                        switch (i.length) {
                          case 0:
                            e();
                            break;
                          case 1:
                            e(i[0]);
                            break;
                          case 2:
                            e(i[0], i[1]);
                            break;
                          case 3:
                            e(i[0], i[1], i[2]);
                            break;
                          default:
                            e.apply(r, i);
                        }
                      })(e);
                    } finally {
                      _(t), (u = !1);
                    }
                  }
                }
              }
            })('undefined' == typeof self ? (void 0 === t ? this : t) : self);
          }.call(
            this,
            t('_process'),
            'undefined' != typeof global
              ? global
              : 'undefined' != typeof self
                ? self
                : 'undefined' != typeof window
                  ? window
                  : {}
          ));
        },
        { _process: 83 }
      ],
      85: [
        function(t, e, i) {
          'function' == typeof Object.create
            ? (e.exports = function(t, e) {
                (t.super_ = e),
                  (t.prototype = Object.create(e.prototype, {
                    constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 }
                  }));
              })
            : (e.exports = function(t, e) {
                t.super_ = e;
                var i = function() {};
                (i.prototype = e.prototype), (t.prototype = new i()), (t.prototype.constructor = t);
              });
        },
        {}
      ],
      86: [
        function(t, e, i) {
          e.exports = function(t) {
            return (
              t &&
              'object' == typeof t &&
              'function' == typeof t.copy &&
              'function' == typeof t.fill &&
              'function' == typeof t.readUInt8
            );
          };
        },
        {}
      ],
      87: [
        function(_, t, k) {
          (function(r, s) {
            var l = /%[sdj%]/g;
            (k.format = function(t) {
              var e = arguments;
              if (!R(t)) {
                for (var i = [], r = 0; r < arguments.length; r++) i.push(u(e[r]));
                return i.join(' ');
              }
              r = 1;
              for (
                var s = arguments,
                  o = s.length,
                  n = String(t).replace(l, function(t) {
                    if ('%%' === t) return '%';
                    if (o <= r) return t;
                    switch (t) {
                      case '%s':
                        return String(s[r++]);
                      case '%d':
                        return Number(s[r++]);
                      case '%j':
                        try {
                          return JSON.stringify(s[r++]);
                        } catch (t) {
                          return '[Circular]';
                        }
                      default:
                        return t;
                    }
                  }),
                  c = s[r];
                r < o;
                c = s[++r]
              )
                d(c) || !a(c) ? (n += ' ' + c) : (n += ' ' + u(c));
              return n;
            }),
              (k.deprecate = function(t, e) {
                if (j(s.process))
                  return function() {
                    return k.deprecate(t, e).apply(this, arguments);
                  };
                if (!0 === r.noDeprecation) return t;
                var i = !1;
                return function() {
                  if (!i) {
                    if (r.throwDeprecation) throw new Error(e);
                    r.traceDeprecation ? console.trace(e) : console.error(e), (i = !0);
                  }
                  return t.apply(this, arguments);
                };
              });
            var t,
              o = {};
            function u(t, e) {
              var i = { seen: [], stylize: c };
              return (
                3 <= arguments.length && (i.depth = arguments[2]),
                4 <= arguments.length && (i.colors = arguments[3]),
                m(e) ? (i.showHidden = e) : e && k._extend(i, e),
                j(i.showHidden) && (i.showHidden = !1),
                j(i.depth) && (i.depth = 2),
                j(i.colors) && (i.colors = !1),
                j(i.customInspect) && (i.customInspect = !0),
                i.colors && (i.stylize = n),
                p(i, t, i.depth)
              );
            }
            function n(t, e) {
              var i = u.styles[e];
              return i ? '[' + u.colors[i][0] + 'm' + t + '[' + u.colors[i][1] + 'm' : t;
            }
            function c(t, e) {
              return t;
            }
            function p(e, i, r) {
              if (
                e.customInspect &&
                i &&
                b(i.inspect) &&
                i.inspect !== k.inspect &&
                (!i.constructor || i.constructor.prototype !== i)
              ) {
                var t = i.inspect(r, e);
                return R(t) || (t = p(e, t, r)), t;
              }
              var s = (function(t, e) {
                if (j(e)) return t.stylize('undefined', 'undefined');
                if (R(e)) {
                  var i =
                    "'" +
                    JSON.stringify(e)
                      .replace(/^"|"$/g, '')
                      .replace(/'/g, "\\'")
                      .replace(/\\"/g, '"') +
                    "'";
                  return t.stylize(i, 'string');
                }
                if (g(e)) return t.stylize('' + e, 'number');
                if (m(e)) return t.stylize('' + e, 'boolean');
                if (d(e)) return t.stylize('null', 'null');
              })(e, i);
              if (s) return s;
              var o,
                n = Object.keys(i),
                c = ((o = {}),
                n.forEach(function(t, e) {
                  o[t] = !0;
                }),
                o);
              if (
                (e.showHidden && (n = Object.getOwnPropertyNames(i)),
                L(i) && (0 <= n.indexOf('message') || 0 <= n.indexOf('description')))
              )
                return f(i);
              if (0 === n.length) {
                if (b(i)) {
                  var l = i.name ? ': ' + i.name : '';
                  return e.stylize('[Function' + l + ']', 'special');
                }
                if (x(i)) return e.stylize(RegExp.prototype.toString.call(i), 'regexp');
                if (S(i)) return e.stylize(Date.prototype.toString.call(i), 'date');
                if (L(i)) return f(i);
              }
              var u,
                a = '',
                h = !1,
                _ = ['{', '}'];
              (y(i) && ((h = !0), (_ = ['[', ']'])), b(i)) && (a = ' [Function' + (i.name ? ': ' + i.name : '') + ']');
              return (
                x(i) && (a = ' ' + RegExp.prototype.toString.call(i)),
                S(i) && (a = ' ' + Date.prototype.toUTCString.call(i)),
                L(i) && (a = ' ' + f(i)),
                0 !== n.length || (h && 0 != i.length)
                  ? r < 0
                    ? x(i)
                      ? e.stylize(RegExp.prototype.toString.call(i), 'regexp')
                      : e.stylize('[Object]', 'special')
                    : (e.seen.push(i),
                      (u = h
                        ? (function(e, i, r, s, t) {
                            for (var o = [], n = 0, c = i.length; n < c; ++n)
                              w(i, String(n)) ? o.push(v(e, i, r, s, String(n), !0)) : o.push('');
                            return (
                              t.forEach(function(t) {
                                t.match(/^\d+$/) || o.push(v(e, i, r, s, t, !0));
                              }),
                              o
                            );
                          })(e, i, r, c, n)
                        : n.map(function(t) {
                            return v(e, i, r, c, t, h);
                          })),
                      e.seen.pop(),
                      (function(t, e, i) {
                        if (
                          60 <
                          t.reduce(function(t, e) {
                            return 0, 0 <= e.indexOf('\n') && 0, t + e.replace(/\u001b\[\d\d?m/g, '').length + 1;
                          }, 0)
                        )
                          return i[0] + ('' === e ? '' : e + '\n ') + ' ' + t.join(',\n  ') + ' ' + i[1];
                        return i[0] + e + ' ' + t.join(', ') + ' ' + i[1];
                      })(u, a, _))
                  : _[0] + a + _[1]
              );
            }
            function f(t) {
              return '[' + Error.prototype.toString.call(t) + ']';
            }
            function v(t, e, i, r, s, o) {
              var n, c, l;
              if (
                ((l = Object.getOwnPropertyDescriptor(e, s) || { value: e[s] }).get
                  ? (c = l.set ? t.stylize('[Getter/Setter]', 'special') : t.stylize('[Getter]', 'special'))
                  : l.set && (c = t.stylize('[Setter]', 'special')),
                w(r, s) || (n = '[' + s + ']'),
                c ||
                  (t.seen.indexOf(l.value) < 0
                    ? -1 < (c = d(i) ? p(t, l.value, null) : p(t, l.value, i - 1)).indexOf('\n') &&
                      (c = o
                        ? c
                            .split('\n')
                            .map(function(t) {
                              return '  ' + t;
                            })
                            .join('\n')
                            .substr(2)
                        : '\n' +
                          c
                            .split('\n')
                            .map(function(t) {
                              return '   ' + t;
                            })
                            .join('\n'))
                    : (c = t.stylize('[Circular]', 'special'))),
                j(n))
              ) {
                if (o && s.match(/^\d+$/)) return c;
                (n = JSON.stringify('' + s)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)
                  ? ((n = n.substr(1, n.length - 2)), (n = t.stylize(n, 'name')))
                  : ((n = n
                      .replace(/'/g, "\\'")
                      .replace(/\\"/g, '"')
                      .replace(/(^"|"$)/g, "'")),
                    (n = t.stylize(n, 'string')));
              }
              return n + ': ' + c;
            }
            function y(t) {
              return Array.isArray(t);
            }
            function m(t) {
              return 'boolean' == typeof t;
            }
            function d(t) {
              return null === t;
            }
            function g(t) {
              return 'number' == typeof t;
            }
            function R(t) {
              return 'string' == typeof t;
            }
            function j(t) {
              return void 0 === t;
            }
            function x(t) {
              return a(t) && '[object RegExp]' === e(t);
            }
            function a(t) {
              return 'object' == typeof t && null !== t;
            }
            function S(t) {
              return a(t) && '[object Date]' === e(t);
            }
            function L(t) {
              return a(t) && ('[object Error]' === e(t) || t instanceof Error);
            }
            function b(t) {
              return 'function' == typeof t;
            }
            function e(t) {
              return Object.prototype.toString.call(t);
            }
            function i(t) {
              return t < 10 ? '0' + t.toString(10) : t.toString(10);
            }
            (k.debuglog = function(e) {
              if ((j(t) && (t = r.env.NODE_DEBUG || ''), (e = e.toUpperCase()), !o[e]))
                if (new RegExp('\\b' + e + '\\b', 'i').test(t)) {
                  var i = r.pid;
                  o[e] = function() {
                    var t = k.format.apply(k, arguments);
                    console.error('%s %d: %s', e, i, t);
                  };
                } else o[e] = function() {};
              return o[e];
            }),
              ((k.inspect = u).colors = {
                bold: [1, 22],
                italic: [3, 23],
                underline: [4, 24],
                inverse: [7, 27],
                white: [37, 39],
                grey: [90, 39],
                black: [30, 39],
                blue: [34, 39],
                cyan: [36, 39],
                green: [32, 39],
                magenta: [35, 39],
                red: [31, 39],
                yellow: [33, 39]
              }),
              (u.styles = {
                special: 'cyan',
                number: 'yellow',
                boolean: 'yellow',
                undefined: 'grey',
                null: 'bold',
                string: 'green',
                date: 'magenta',
                regexp: 'red'
              }),
              (k.isArray = y),
              (k.isBoolean = m),
              (k.isNull = d),
              (k.isNullOrUndefined = function(t) {
                return null == t;
              }),
              (k.isNumber = g),
              (k.isString = R),
              (k.isSymbol = function(t) {
                return 'symbol' == typeof t;
              }),
              (k.isUndefined = j),
              (k.isRegExp = x),
              (k.isObject = a),
              (k.isDate = S),
              (k.isError = L),
              (k.isFunction = b),
              (k.isPrimitive = function(t) {
                return (
                  null === t ||
                  'boolean' == typeof t ||
                  'number' == typeof t ||
                  'string' == typeof t ||
                  'symbol' == typeof t ||
                  void 0 === t
                );
              }),
              (k.isBuffer = _('./support/isBuffer'));
            var h = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            function w(t, e) {
              return Object.prototype.hasOwnProperty.call(t, e);
            }
            (k.log = function() {
              var t, e;
              console.log(
                '%s - %s',
                ((t = new Date()),
                (e = [i(t.getHours()), i(t.getMinutes()), i(t.getSeconds())].join(':')),
                [t.getDate(), h[t.getMonth()], e].join(' ')),
                k.format.apply(k, arguments)
              );
            }),
              (k.inherits = _('inherits')),
              (k._extend = function(t, e) {
                if (!e || !a(e)) return t;
                for (var i = Object.keys(e), r = i.length; r--; ) t[i[r]] = e[i[r]];
                return t;
              });
          }.call(
            this,
            _('_process'),
            'undefined' != typeof global
              ? global
              : 'undefined' != typeof self
                ? self
                : 'undefined' != typeof window
                  ? window
                  : {}
          ));
        },
        { './support/isBuffer': 86, _process: 83, inherits: 85 }
      ],
      88: [
        function(t, e, i) {
          e.exports = {
            name: 'aigle',
            version: '1.12.0',
            description: 'Aigle is an ideal Promise library, faster and more functional than other Promise libraries',
            main: 'index.js',
            typings: 'aigle.d.ts',
            private: !0,
            browser: 'browser.js',
            scripts: {
              bench: 'node --expose_gc ./benchmark -d',
              eslint: 'eslint . --ext .js',
              test: 'DELAY=50 npm-run-all -p eslint test:type test:cov',
              'test:mocha': 'mocha test/**/*.js',
              'test:cov': 'nyc npm run test:mocha',
              'test:type': 'cd typings && tsc',
              codecov: 'nyc report --reporter=lcovonly && codecov',
              prettier:
                "prettier --write './benchmark/**/*.js' './gulp/**/*.js' './lib/**/*.js' './test/**/*.js' './typings/**/*.ts'",
              precommit: 'lint-staged'
            },
            homepage: 'https://github.com/suguru03/aigle',
            keywords: ['aigle', 'promise', 'async'],
            files: ['README.md', 'index.js', 'lib/', 'browser.js', 'dist/'],
            author: 'Suguru Motegi',
            license: 'MIT',
            devDependencies: {
              babili: '0.1.4',
              benchmark: '^2.1.1',
              bluebird: '^3.5.1',
              browserify: '^16.0.0',
              buble: '^0.19.0',
              codecov: '^3.0.0',
              docdash: '^0.4.0',
              eslint: '^4.19.1',
              'fs-extra': '^6.0.0',
              gulp: '^3.9.1',
              'gulp-bump': '^3.0.0',
              'gulp-git': '^2.4.2',
              'gulp-tag-version': '^1.3.0',
              husky: '^0.14.3',
              jsdoc: '^3.5.5',
              'lint-staged': '^7.0.0',
              lodash: '^4.15.0',
              minimist: '^1.2.0',
              mocha: '^5.0.0',
              'mocha.parallel': '0.15.5',
              'neo-async': '^2.5.0',
              'npm-run-all': '^4.1.2',
              nyc: '^11.4.1',
              prettier: '^1.11.1',
              'require-dir': '^1.0.0',
              'run-sequence': '^2.0.0',
              semver: '^5.5.0',
              setimmediate: '^1.0.5',
              tslint: '^5.9.1',
              typescript: '^2.7.2',
              'uglify-js': '^3.1.5'
            },
            dependencies: { 'aigle-core': '^1.0.0' },
            'lint-staged': { '*.{js,ts}': ['prettier --write', 'git add'] },
            prettier: { printWidth: 120, singleQuote: !0 }
          };
        },
        {}
      ]
    },
    {},
    [1]
  )(1);
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("timers").setImmediate)
},{"timers":6}],2:[function(require,module,exports){
'use stirct';

module.exports = require('./aigle').each;

},{"./aigle":1}],3:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],4:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

},{}],5:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],6:[function(require,module,exports){
(function (setImmediate,clearImmediate){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":5,"timers":6}],7:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],8:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":7,"_process":5,"inherits":3}],9:[function(require,module,exports){
'use strict';

var $    = require('jquery');
var Root = require('./lib/Root');

window.debugMode = true;

$(function () {
    var root = new Root({id: 'main'});

    root.init().catch(function (err) {
        console.error('App: Failed to init app:', err.stack);
    });
});
},{"./lib/Root":14,"jquery":4}],10:[function(require,module,exports){
'use strict';

var Helper = require('./Helper');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Assembly() {}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function regToNumber(reg) {
    switch (reg) {
        case 'r0':
            return 0;
        case 'r1':
            return 1;
        case 'r2':
            return 2;
        case 'r3':
            return 3;
        default:
            throw new Error('Unknown register: ' + reg);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function generate2Reg(parsedLine) {
    var self = this;

    var regA = regToNumber(parsedLine.operands[0]);
    var regB = regToNumber(parsedLine.operands[1]);

    return [(self.code << 4) + (regA << 2) + regB];
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function generateInOut(parsedLine) {
    var self = this;
    var instrType =  parsedLine.mnemonic == 'in' ? 0 : 1; // in or out
    var regB = regToNumber(parsedLine.operands[1]);
    if (parsedLine.operands[0] == 'data') {
        return [(self.code << 4) + (instrType << 3) + regB];
    } else if (parsedLine.operands[0] == 'addr') {
        return [(self.code << 4) + (instrType << 3) + (1 << 2) + regB];
    } else {
        throw new Error('Unknown in/out operand value: ' + parsedLine.operands[0]);
    }
 }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Assembly.INSTR = {
    db: {
        opCount: 1,
        length: 1,
        generate: function (parsedLine) {
            return [parseInt(parsedLine.operands[0])];
        }
    },
    ld: {
        code   : 0, // 0000
        opCount: 2,
        length : 1,
        generate: generate2Reg
    },
    st: {
        code   : 1, // 0001
        opCount: 2,
        length : 1,
        generate: generate2Reg
    },
    data: {
        code   : 2, // 0010
        opCount: 2,
        length : 2,
        generate: function (parsedLine) {
            var self = this;
            var regB = regToNumber(parsedLine.operands[0]);
            return [(self.code << 4) + regB, parseInt(parsedLine.operands[1])];
        }
    },
    jmpr: {
        code   : 3, // 0011
        opCount: 1,
        length : 1,
        generate: function (parsedLine) {
            var self = this;
            var regB = regToNumber(parsedLine.operands[0]);
            return [(self.code << 4) + regB];
        }
    },
    jmp: {
        code   : 4, // 0100
        opCount: 1,
        length : 2,
        generate: function (parsedLine, symbols) {
            var self = this;
            var resolvedSymbol = symbols[parsedLine.operands[0]];
            if (resolvedSymbol) {
                return [self.code << 4, resolvedSymbol];
            } else {
                throw new Error('Unresolved symbol: ' + parsedLine.operands[0] + ' at line ' + parsedLine.lineNo);
            }
        }
    },
    j: {
        code   : 5, // 0101
        opCount: 1,
        length : 2,
        generate: function (parsedLine, symbols) {
            var self = this;
            var resolvedSymbol = symbols[parsedLine.operands[0]];
            if (resolvedSymbol) {
                var instrCode = self.code << 4;
                if (parsedLine.mnemonic.indexOf('c') >=0) {
                    instrCode += 1 << 3;
                }
                if (parsedLine.mnemonic.indexOf('a') >=0) {
                    instrCode += 1 << 2;
                }
                if (parsedLine.mnemonic.indexOf('e') >=0) {
                    instrCode += 1 << 1;
                }
                if (parsedLine.mnemonic.indexOf('z') >=0) {
                    instrCode += 1;
                }

                return [instrCode, resolvedSymbol];
            } else {
                throw new Error('Unresolved symbol: ' + parsedLine.operands[0] + ' at line ' + parsedLine.lineNo);
            }
        }
    },
    clf: {
        code   : 6, // 0110
        opCount: 0,
        length : 1,
        generate: function (parsedLine) {
            var self = this;
            return [self.code << 4];
        }
    },
    "in": {
        code   : 7, // 0111
        opCount: 2,
        length : 1,
        generate: generateInOut
    },
    out: {
        code   : 7, // 0111
        opCount: 2,
        length : 1,
        generate: generateInOut
    },
    add: {
        code   : 8, // 1000
        opCount: 2,
        length : 1,
        generate: generate2Reg
    },
    shr: {
        code   : 9, // 1001
        opCount: 2,
        length : 1,
        generate: generate2Reg
    },
    shl: {
        code   : 10, // 1010
        opCount: 2,
        length : 1,
        generate: generate2Reg
    },
    not: {
        code   : 11, // 1011
        opCount: 2,
        length : 1,
        generate: generate2Reg
    },
    and: {
        code   : 12, // 1100
        opCount: 2,
        length : 1,
        generate: generate2Reg
    },
    or: {
        code   : 13, // 1101
        opCount: 2,
        length : 1,
        generate: generate2Reg
    },
    xor: {
        code   : 14, // 1110
        opCount: 2,
        length : 1,
        generate: generate2Reg
    },
    cmp: {
        code   : 15, // 1111
        opCount: 2,
        length : 1,
        generate: generate2Reg
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Assembly.parseLine = function (line, lineNo) {
    ///console.log('parseLine:', line, lineNo);
    line = line.trim().toLowerCase();
    if (line == '') {
        return null;
    }
    var lineRegEx = /^(([a-z][a-z0-9]*)\s*:\s*)?([a-z]+)(\s+(([a-z0-9]+)(\s*,\s*([a-z0-9]+))?)?)?$/;
    var matched = line.match(lineRegEx);
    if (matched) {
        var result = {
            line    : line,
            lineNo  : lineNo,
            mnemonic: matched[3],
            operands: []
        };
        if (matched[2]) {
            result.label = matched[2];
        }

        if (matched[6]) {
            result.operands.push(matched[6]);
            if (matched[8]) {
                result.operands.push(matched[8]);
            }
        }
        //console.log(matched);
        return result;
    } else {
        throw new Error('Parsing failed at line '+ lineNo);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Assembly.isJmpIf = function (parsedLine) {
    var jmpIfRegEx = /^j(c?)(a?)(e?)(z?)$/;
    return !!parsedLine.mnemonic.match(jmpIfRegEx);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Assembly.translate = function (program) {
    var binary       = [];
    var parsedLines  = [];
    var instrOffset  = 0;
    var symbols = {};
    try {
        var lines = program.split('\n');
        for (var lineIndex = 0; lineIndex < lines.length; ++lineIndex) {
            var line = lines[lineIndex];
            var lineNo = lineIndex + 1;
            var parsedLine = Assembly.parseLine(line, lineNo);
            if (parsedLine) {
                if (Assembly.INSTR[parsedLine.mnemonic]) {
                    parsedLine.instr = Assembly.INSTR[parsedLine.mnemonic];
                } else if (Assembly.isJmpIf(parsedLine)) {
                    parsedLine.instr = Assembly.INSTR.j;
                } else {
                    throw new Error('Unknown mnemonic: ' + parsedLine.mnemonic + ' at line ' + lineNo);
                }
                if (parsedLine.operands.length !== parsedLine.instr.opCount) {
                    throw new Error('Wrong number of operands at line ' + lineNo + ': ' + line);
                }
                parsedLine.offset = instrOffset;
                if (parsedLine.label) {
                    if (symbols[parsedLine.label]) {
                        throw new Error('Duplicate label at line ' + lineNo  + ': ' + parsedLine.label)
                    } else {
                        symbols[parsedLine.label] = instrOffset;
                    }
                }
                parsedLines.push(parsedLine);
                instrOffset += parsedLine.instr.length;
            }
        }
        for (var i = 0; i < parsedLines.length; ++i) {
            parsedLine = parsedLines[i];
            var bytes = parsedLine.instr.generate.call(parsedLine.instr, parsedLine, symbols);
            parsedLine.bytes = bytes;
            parsedLine.binaryBytes = [];
            parsedLine.hexBytes = [];
            bytes.forEach(function (byte) {
                binary.push(byte);
                parsedLine.binaryBytes.push(Helper.number2BinStringWithPadding(byte));
                parsedLine.hexBytes.push(Helper.numberToHexString(byte));
            });
        }
        console.log('symbols:', symbols);
        console.log('parsedLines:', parsedLines);

        return binary;
    } catch (err) {
        console.error('Assembly failed:', err.stack);
    }
};

// test
/*var binary = Assembly.translate('jmp start\ndb 0x11\ndata r2, 0x15\nfirst: add r0,r2\nor r3, r1\n second: jz start\n third: clf\njmpr r2\nstart:xor r1, r1');
console.log('image:', binary);*/

module.exports = Assembly;
},{"./Helper":12}],11:[function(require,module,exports){
'use strict';

var Promise = require('aigle');
var Pin     = require('./conductor/Pin');
var Helper  = require('./Helper');

Component.PIN_MARGIN     = 0.2;
Component.MIN_FONT_SIZE  = 4;
Component.MIN_DRAW_SCALE = 0.2;

Component.selectedItem = null;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Component(options) {
    var self = this;
    options = options || {};

    self.parent = options.parent || null;
    self.title  = options.title  || null;
    self.scale  = options.scale  || 1;

    self.id      = options.id      !== undefined ? options.id      : null;
    self.left    = options.left    !== undefined ? options.left    : 0;
    self.top     = options.top     !== undefined ? options.top     : 0;
    self.width   = options.width   !== undefined ? options.width   : 50;
    self.height  = options.width   !== undefined ? options.height  : 50;
    self.outline = options.outline !== undefined ? options.outline : true;

    self.debugPin  = options.debugPin  !== undefined ? options.debugPin  : false;
    self.pinMargin = options.pinMargin !== undefined ? options.pinMargin : Component.PIN_MARGIN;
    self.minScale  = options.minScale  !== undefined ? options.minScale  : Component.MIN_DRAW_SCALE;

    self.detailDraw = true;
    self.pins       = [];
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.init = function () {
    var self = this;
    //console.log('Component: ' + self.getTitle() + ' init');
    self.globalRect    = self.calcGlobalRect(true);
    self.boxGlobalRect = self.calcGlobalRect(false);
    return Promise.resolve();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.addPin = function (position, index, totalCount, title, value) {
    var self = this;
    var point = self.getPinPoint(index, position, totalCount);
    var pin = new Pin({
        parent  : self,
        title   : title,
        position: position,
        left    : point.left,
        top     : point.top,
        length  : point.length,
        value   : value
    });
    // pin has no init method
    self.pins.push(pin);
    return pin;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.drawSelf = function (ctx) {
    var self = this;
    if (self.detailDraw) {
        if (self.outline) {
            self.drawOutline(ctx);
        }
    } else {
        self.drawOutline(ctx);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.drawOutline = function (ctx) {
    var self = this;
    if (!self.detailDraw) {
        ctx.fillStyle = '#E8E8E8';
        self.fillRect(ctx, 0, 0, self.width, self.height);
    }
    ctx.beginPath();
    ctx.strokeStyle = '#0000FF';
    self.moveTo(ctx, 0, 0);
    self.lineTo(ctx, self.width, 0);
    self.lineTo(ctx, self.width, self.height);
    self.lineTo(ctx, 0, self.height);
    self.lineTo(ctx, 0, 0);
    ctx.stroke();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.moveTo = function (ctx, left, top) {
    var self = this;
    if (self.parent) {
        self.parent.moveTo(
            ctx,
            self.left + left  * self.scale,
            self.top  + top   * self.scale
        );
    } else {
        ctx.moveTo(
            Component.round(left * self.scale),
            Component.round(top  * self.scale)
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.lineTo = function (ctx, left, top) {
    var self = this;
    if (self.parent) {
        self.parent.lineTo(
            ctx,
            self.left + left * self.scale,
            self.top  + top  * self.scale
        );
    } else {
        ctx.lineTo(
            Component.round(left * self.scale),
            Component.round(top  * self.scale)
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.fillRect = function (ctx, left, top, width, height) {
    var self = this;
    if (self.parent) {
        self.parent.fillRect(
            ctx,
            self.left + left * self.scale,
            self.top  + top  * self.scale,
            width  * self.scale,
            height * self.scale
        );
    } else {
        ctx.fillRect(
            Component.round(left   * self.scale),
            Component.round(top    * self.scale),
            Component.round(width  * self.scale),
            Component.round(height * self.scale)
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.calcGlobalRect = function (includePins) {
    var self = this;
    var rect = includePins ? {
        left  : self.left - Pin.LENGTH * self.scale,
        top   : self.top  - Pin.LENGTH * self.scale,
        width : (self.width  + Pin.LENGTH * 2) * self.scale,
        height: (self.height + Pin.LENGTH * 2) * self.scale
    } : {
        left  : self.left,
        top   : self.top,
        width : self.width  * self.scale,
        height: self.height * self.scale
    };

    var parent = self.parent;
    while (parent) {
        rect.left *= parent.scale;
        rect.top  *= parent.scale;

        rect.left += parent.left;
        rect.top  += parent.top;

        rect.width  *= parent.scale;
        rect.height *= parent.scale;
        parent = parent.parent;
    }

    rect.right = rect.left + rect.width;
    rect.bottom = rect.top + rect.height;
    return rect;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.isViewable = function () {
    var self = this;
    return Helper.rectOverlap(self.globalRect, window.root.visibleArea);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.bezierCurveTo = function (ctx, cx1, cy1, cx2, cy2, x, y) {
    var self = this;
    if (self.parent) {
        self.parent.bezierCurveTo(
            ctx,
            self.left + cx1 * self.scale,
            self.top  + cy1 * self.scale,
            self.left + cx2 * self.scale,
            self.top  + cy2 * self.scale,
            self.left + x   * self.scale,
            self.top  + y   * self.scale
        );
    } else {
        ctx.bezierCurveTo(
            Component.round(cx1 * self.scale),
            Component.round(cy1 * self.scale),
            Component.round(cx2 * self.scale),
            Component.round(cy2 * self.scale),
            Component.round(x   * self.scale),
            Component.round(y   * self.scale)
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.arc = function (ctx, x, y, r, startAngle, endAngle) {
    var self = this;
    if (self.parent) {
        self.parent.arc(
            ctx,
            self.left + x * self.scale,
            self.top  + y * self.scale,
            r * self.scale,
            startAngle,
            endAngle
        );
    } else {
        self.ctx.arc(
            Component.round(x * self.scale),
            Component.round(y * self.scale),
            Component.round(r * self.scale),
            startAngle,
            endAngle
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.drawDot = function (ctx, x, y, r, startAngle, endAngle) {
    var self = this;
    if (self.parent) {
        self.parent.drawDot(
            ctx,
            self.left + x * self.scale,
            self.top  + y * self.scale,
            r * self.scale,
            startAngle,
            endAngle
        );
    } else {
        var dotR = Math.min(r * self.scale, 2);
        dotR = Math.max(dotR, 1.5);
        self.ctx.arc(
            Component.round(x * self.scale),
            Component.round(y * self.scale),
            //Component.round(dotR),
            dotR,
            startAngle,
            endAngle
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.setFontSize = function (ctx, size) {
    var self = this;
    if (self.parent) {
        self.parent.setFontSize(ctx, size * self.scale);
    } else {
        ctx.csFontSize = size * self.scale;
        ctx.font = ctx.csFontSize.toFixed(0) + 'px sans-serif';
        //console.log(ctx.font);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.fillText = function (ctx, text, x, y) {
    var self = this;
    if (self.parent) {
        self.parent.fillText(
            ctx,
            text,
            self.left + x * self.scale,
            self.top  + y * self.scale
        );
    } else {
        if (ctx.csFontSize > Component.MIN_FONT_SIZE) {
            ctx.fillText(
                text,
                Component.round(x * self.scale),
                Component.round(y * self.scale)
            );
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.drawPins = function (ctx) {
    var self = this;
    //console.log('Component.prototype.drawPins');
    for (var i = 0; i < self.pins.length; ++i) {
        self.pins[i].draw(ctx);
    }
    self.printPinTitles(ctx);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.drawPinsCircles = function (ctx) {
    var self = this;
    for (var i = 0; i < self.pins.length; ++i) {
        var pin = self.pins[i];
        if (pin.inverted) {
            pin.drawCircle(ctx);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.draw = function (ctx) {
    var self = this;
    if (self.isViewable()) {
        var effectiveScale = self.getEffectiveScale();
        //console.log('Component: %s effective scale: %s', self.getTitle(), effectiveScale);
        self.detailDraw = effectiveScale > self.minScale || self.parent === null;
        ctx.save();
        try {
            // draw pins first
            self.drawPins(ctx);
            self.drawSelf(ctx);
            self.printTitle(ctx);
            // need to draw pin invert circles after self
            self.drawPinsCircles(ctx);
        } catch (err) {
            console.error('Component: Error during draw:', err.stack);
        } finally {
            ctx.restore();
        }
    /*} else {
        console.log('Component ' + self.getTitle() + ' is not viewable');*/
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.getTitlePos = function () {
    //var self = this;
    return {
        left    : 2,
        top     : 0,
        baseLine: 'top'
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.getTitleAlign = function () {
    //var self = this;
    return 'left';
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.printTitle = function (ctx) {
    var self = this;
    var title = self.getTitle();
    if (title) {
        self.setFontSize(ctx, 9);
        ctx.fillStyle = '#AAA';
        var pos = self.getTitlePos();
        ctx.textBaseline = pos.baseLine;
        ctx.textAlign = self.getTitleAlign();
        self.fillText(
            ctx,
            title,
            pos.left,
            pos.top
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.clear = function () {
    var self = this;
    self.title = '';
    for (var i = 0; i < self.pins.length; ++i) {
        self.pins[i].clear();
    }

    /*for (var i = 0; i < self.inputs.length; ++i) {
        self.inputs[i].clear();
    }
    for (var j = 0; j < self.outputs.length; ++j) {
        self.outputs[j].clear();
    }*/
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.getTitle = function () {
    var self = this;
    return self.title || self.id;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.toString = function () {
    var self = this;
    return self.getTitle();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.toParentPoint = function (point) {
    var self = this;
    point.left *= self.scale;
    point.top  *= self.scale;

    point.left += self.left;
    point.top  += self.top;
    return point;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.getBusPoint = function (position) {
    var self = this;
    var point = {
        left: 0,
        top : 0
    };
    switch (position) {
        case 'left':
            point.top  += self.height / 2;
            break;
        case 'right':
            point.left += self.width;
            point.top  += self.height / 2;
            break;
        case 'top':
            point.left += self.width / 2;
            break;
        case 'bottom':
        default:
            point.left += self.width / 2;
            point.top  += self.height + 5;
    }
    return point;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.getPinScale = function () {
    return 1;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.getPinPoint = function (index, position, count) {
    var self = this;
    var margin;
    if (typeof self.pinMargin == 'object') {
        if (self.pinMargin[position]) {
            margin = self.pinMargin[position];
        } else {
            margin = Component.PIN_MARGIN;
        }
    } else {
        margin = self.pinMargin;
    }

    var point = {
        length: Pin.LENGTH * self.getPinScale()
    };

    switch (position) {
        case 'left':
            point.left = -point.length;
            point.top  = Component.getMiddlePosR(index, count, self.height, margin);
            break;
        case 'right':
            point.left = self.width + point.length;
            point.top  = Component.getMiddlePosR(index, count, self.height, margin);
            break;
        case 'top':
            point.left = Component.getMiddlePosR(index, count, self.width, margin);
            point.top  = -point.length;
            break;
        case 'bottom':
        default:
            point.left = Component.getMiddlePosR(index, count, self.width, margin);
            point.top  = self.height + point.length;
    }

    return point;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.printPinTitles = function (ctx) {
    var self = this;
    var pinScale = self.getPinScale();
    self.setFontSize(ctx, 11 * pinScale);
    //ctx.textBaseline = 'bottom';
    ctx.fillStyle = '#444444';

    for (var i = 0; i < self.pins.length; ++i) {
        var pin = self.pins[i];
        if (pin.title) {
            var pinPos = pin.getPoint(true);
            if (pin.position == 'bottom') {
                ctx.textBaseline = 'top';
            } else {
                ctx.textBaseline = 'bottom';
            }
            var crr = {top: -4, left: 0};
            if (pin.position == Pin.POS.RIGHT) {
                ctx.textAlign = 'left';
                crr.left = 5;
            } else if (pin.position == Pin.POS.LEFT) {
                ctx.textAlign = 'right';
                crr.left = -5;
            } else if (pin.position == Pin.POS.BOTTOM) {
                ctx.textAlign = 'left';
                crr.left = 3;
                crr.top  = 0;
            } else {
                ctx.textAlign = 'left';
                crr.left = 3;
                crr.top  = -4;
            }
            self.fillText(ctx, pin.title, pinPos.left + crr.left * pinScale, pinPos.top + crr.top * pinScale);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.handleClick = function (globalPoint) {
    var self = this;
    // must be overridden
    //console.log('Component: Clicked: ' + self.title);
    Component.setSelectedItem(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.getEffectiveScale = function () {
    var self = this;
    if (self.parent) {
        return self.scale * self.parent.getEffectiveScale();
    } else {
        return self.scale;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.getMiddlePosR = function (index, count, length, margin) {
    if (count == 1) {
        return length / 2;
    } else {
        return length - (length * margin + index * length * (1 - margin * 2) / (count - 1));
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.setSelectedItem = function (component) {
    if (component !== Component.selectedItem) {
        if (Component.selectedItem) {
            console.log('Component: Deselect:', Component.selectedItem.getTitle());
            Component.setHLState(Component.selectedItem, false);
            Component.selectedItem = null;
        }
        if (component) {
            Component.selectedItem = component;
            Component.setHLState(Component.selectedItem, true);
            console.log('Component: Selected:', component.getTitle());
            console.log(component);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.setHLState = function (component, hlState) {
    component.pins.forEach(function (pin) {
        pin.hl = hlState;
        pin.cnn.forEach(function (cnn) {
            cnn.hl = hlState;
            cnn.cnn.forEach(function (cnn) {
                cnn.hl = hlState;
            });
        });
    });
    root._redraw();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.round = function (value) {
    return Math.round(value);
};

module.exports = Component;
},{"./Helper":12,"./conductor/Pin":46,"aigle":1}],12:[function(require,module,exports){
'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Helper() {}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Helper.uid = function (length) {
    var chars = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var password = '';
    for(var i = 0; i < length; ++i) {
        password += chars[Helper.randomInteger(0, chars.length - 1)];
    }
    return password;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Helper.randomInteger = function (min, max) {
    var rand = min + Math.random() * (max - min);
    return Math.round(rand);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Helper.getNormalPath = function (point1, point2, yFirst) {
    //console.log('Helper.getNormalPath', arguments);
    if (point1.left == point2.left || point1.top == point2.top) {
        return [
            point2
        ];
    } else if (yFirst === true) {
        return [
            {
                left: point1.left,
                top : point2.top
            },
            point2
        ];
    } else {
        return [
            {
                left: point2.left,
                top : point1.top
            },
            point2
        ];
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Helper.clone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Helper.cloneArray = function (arr) {
    return JSON.parse(JSON.stringify(arr));
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Helper.number2BinString = function (dec) {
    // >>> is the unsigned right shift operator which converts number to 32 bit unsigned integer
    return (dec >>> 0).toString(2);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Helper.number2BinStringWithPadding = function (dec) {
    var binaryStr = Helper.number2BinString(dec);
    // zero padding
    var count = 8 - binaryStr.length;
    for (var k = 0; k < count; ++k) {
        binaryStr = '0' + binaryStr;
    }
    return binaryStr;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Helper.binStringToNumber = function (binString) {
    // >>> is the unsigned right shift operator which converts number to 32 bit unsigned integer
    return parseInt(binString, 2);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Helper.busStateToNumber = function (lines) {
    var binaryString = '';
    for (var i = 0; i < lines.length; ++i) {
        binaryString = lines[i].toString() + binaryString;
    }
    return parseInt(binaryString, 2);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Helper.numberToHexString = function (number) {
    var strVal = number.toString(16).toUpperCase();
    if (number <= 0xF) {
        strVal = '0' + strVal;
    }
    return '0x' + strVal;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Helper.pointInRect = function (point, rect) {
    return point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Helper.rectOverlap = function (rect1, rect2) {
    var xOverlap = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
    var yOverlap = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));
    return xOverlap * yOverlap > 0;
};


module.exports = Helper;
},{}],13:[function(require,module,exports){
'use strict';

var util      = require('util');
var Component = require('./Component');

util.inherits(Label, Component);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Label(options) {
    var self = this;
    options = options || {};
    options.title    = options.title    || 'Label';
    options.outline = false;

    Label.super_.call(self, options);

    self.fontSize = options.fontSize || 20;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Label.prototype.printTitle = function (ctx) {
    var self = this;
    var title = self.getTitle();
    if (title) {
        self.setFontSize(ctx, self.fontSize);
        ctx.fillStyle = '#444';
        var pos = self.getTitlePos();
        ctx.textBaseline = pos.baseLine;
        ctx.textAlign = self.getTitleAlign();
        self.fillText(
            ctx,
            title,
            pos.left,
            pos.top
        );
    }
};

module.exports = Label;
},{"./Component":11,"util":8}],14:[function(require,module,exports){
'use strict';

var util     = require('util');
var Promise  = require('aigle');
var $        = require('jquery');
var Circuit  = require('./circuit/Circuit');
var Helper   = require('./Helper');
var Assembly = require('./Assembly');

util.inherits(Root, Circuit);

Root.GRID_STEP = 50;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Root(options) {
    var self = this;
    Root.super_.call(self, options);

    self.canvas         = document.getElementById(options.id);
    self.ctx            = self.canvas.getContext('2d');
    self.translated     = {x: 0.5, y: 0.5};
    self.mouseDown      = false;
    self.cursorSet      = false;
    self.visibleArea    = null;
    self.loadingPromise = null;
    window.root         = self;

    self.models = {
        wires: {
            title: 'Wire Test',
            load : require('./model/wireTest')
        },
        gates: {
            title: 'Gates',
            load: require('./model/gates')
        },

        latch: {
            title: 'Latch',
            load: require('./model/latch')
        },
        cpu: {
            title: 'CPU',
            load : require('./model/cpuTest')
        },
        stepper: {
            title: 'Stepper',
            load : require('./model/stepper')
        },
        ram: {
            title: 'RAM',
            load : require('./model/ramTest')
        },
        dFlipFlop: {
            title: 'D Flip Flop',
            load : require('./model/DFlipFlop')
        },
        srLatch: {
            title: 'SR-latch',
            load : require('./model/srLatch')
        },
        clock: {
            title: 'Clock',
            load : require('./model/clock')
        },
        bus1: {
            title: 'Bus1',
            load : require('./model/bus1')
        },
        alu: {
            title: 'ALU',
            load : require('./model/ALU')
        },
        adder: {
            title: 'Adder',
            load: require('./model/adder')
        },
        compare: {
            title: 'Compare',
            load : require('./model/compare')
        },
        byte: {
            title: 'Byte Operators',
            load : require('./model/operators')
        },
        test: {
            title: 'Test',
            load : require('./model/test')
        },
        busTest: {
            title: 'Bus Test',
            load: require('./model/busTest')
        },
        decoder7: {
            title: 'Decoder7',
            load: require('./model/dec7')
        },
        register: {
            title: 'Register',
            load: require('./model/register')
        },
        decoders: {
            title: 'Decoders',
            load: require('./model/decoders')
        }
    };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.init = function () {
    var self = this;
    //console.log('Root.prototype.init');
    return Root.super_.prototype.init.call(self).then(function () {
        self.ctx.lineCap = 'square';
        self.ctx.lineWidth = 1;
        self.ctx.translate(self.translated.x, self.translated.y);
        self.visibleArea = self.getVisibleArea();

        self.attachEventHandlers();

        var modelControl = $('#selectedModel');

        return self.loadModel(self.models[modelControl[0].value]);
    }).catch(function (err) {
        console.error('Root: Error during initialization:', err.stack);

    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.loadModel = function (model) {
    var self = this;
    return Promise.try(function () {
        // if already loading, wait before it completes
        if (self.loadingPromise && self.loadingPromise.isPending()) {
            return self.loadingPromise;
        }
    }).then(function () {
        var loadingStartTime = Date.now();
        self.title = model.title;
        return self.loadingPromise = model.load.bind(self)().then(function () {
            self._redraw();
            console.log('Root: Model loaded in %d ms', Date.now() - loadingStartTime);
        }).finally(function () {
            self.loadingPromise = null;
        });
    });
};

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.createButton = function (title, cb) {
    var self = this;
    var parentDiv = $('#controlPanel');
    var div = $('<div/>', {class: 'input-control'});
    var button = $('<button/>', {text: ' ' + title});
    button.appendTo(div);
    div.appendTo(parentDiv);
    button.click(cb);
};
*/

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.createControl = function (control, afterUpdate) {
    var self = this;
    var parentDiv = $('#controlPanel');
    var div = $('<div/>', {class: 'input-control'});
    var label = $('<label/>', {text: ' ' + control.title});
    label.appendTo(div);
    var attr = {
        //id: 'cb_nand1_0',
        type: 'checkbox'
    };
    if (control.input.value) {
        attr.checked = 'checked';
    }
    var input = $('<input />', attr);
    label.prepend(input);
    div.appendTo(parentDiv);
    input.click(function (event) {
        control.input.setValue(this.checked).then(function () {
            if (afterUpdate) {
                afterUpdate(control);
            }
            self._redraw();
        }).catch(function (err) {
            console.error('Root: Error while updating %s value:', control.title, err.stack);
        });
    });
};
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.attachEventHandlers = function () {
    var self = this;
    $(document).on('mousedown', self.canvas, self.onCanvasMouseDown.bind(self));
    $(document).on('mousemove', self.canvas, self.onCanvasMouseMove.bind(self));
    $(document).on('mouseup',   self.canvas, self.onCanvasMouseUp.bind(self));

    var modelControl = $('#selectedModel');

    for (var id in self.models) {
        $('<option/>', {
            value: id,
            text : self.models[id].title
        }).appendTo(modelControl);
    }

    if (window.localStorage.getItem('modelIndex')) {
        modelControl[0].selectedIndex = parseInt(window.localStorage.getItem('modelIndex'));
    }

    modelControl.change(function (event) {
        var modelId = modelControl[0].value;
        window.localStorage.setItem('modelIndex', modelControl[0].selectedIndex);
        console.log('Root: Model changed to: ' + modelId);
        self.clear();
        self.defaultView();
        //$('#controlPanel').empty();
        $('#tick').off();

        var model = self.models[modelId];
        self.loadModel(model).catch(function (err) {
            console.error('Root: Error loading model:', err.stack);
        });
    });

    var zoomControl = $('#zoomControl');
    var zoomItemCount = zoomControl.find('option').length;
    zoomControl.change(function (event) {
        var zoomValue = parseFloat(this.value);
        console.log('zoom changed:', zoomValue);
        self.updateZoom(zoomValue);
    });

    function zoomIn(mousePoint) {
        var index = zoomControl[0].selectedIndex;
        if (index < zoomItemCount - 1) {
            zoomControl[0].selectedIndex = index + 1;
            self.updateZoom(zoomControl.val(), mousePoint);
        }
    }

    function zoomOut(mousePoint) {
        var index = zoomControl[0].selectedIndex;
        if (index > 0) {
            zoomControl[0].selectedIndex = index - 1;
            //console.log('value:', zoomControl.val());
            self.updateZoom(zoomControl.val(), mousePoint);
        }
    }

    $('#zoomIn').click(function () {
        zoomIn();
    });
    $('#zoomOut').click(function () {
        zoomOut()
    });

    $(self.canvas).bind('mousewheel', function (event) {
        var mousePoint = {x: event.offsetX, y: event.offsetY};
        if (event.originalEvent.wheelDelta > 0) {
            zoomIn(mousePoint);
        } else {
            zoomOut(mousePoint);
        }
        event.preventDefault();
    });

    $('#defaultView').click(function () {
        zoomControl.val('1');
        self.defaultView();
        self._redraw();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.defaultView = function () {
    var self = this;
    self.offsetBy({
        x: -self.translated.x + 0.5,
        y: -self.translated.y + 0.5
    });
    self.scale = 1;
    self.visibleArea = self.getVisibleArea();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.updateZoom = function (zoomValue, mousePoint) {
    var self = this;
    if (!mousePoint) {
        mousePoint = {
            x: self.canvas.width / 2,
            y: self.canvas.height / 2
        };
    }
    var modelPoint = {
        x: (mousePoint.x - self.translated.x - 0.5) / self.scale,
        y: (mousePoint.y - self.translated.y - 0.5) / self.scale
    };
    var newModelPoint = {
        x: (mousePoint.x - self.translated.x - 0.5) / zoomValue,
        y: (mousePoint.y - self.translated.y - 0.5) / zoomValue
    };
    self.scale = zoomValue;
    self.offsetBy({
        x: Math.round((newModelPoint.x - modelPoint.x) * zoomValue),
        y: Math.round((newModelPoint.y - modelPoint.y) * zoomValue)
    });
    self._redraw();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype._redraw = function () {
    var self = this;
    self.clearCanvas();
    self.draw(self.ctx);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.draw = function (ctx) {
    var self = this;
    ctx.save();
    try {
        self.drawGrid(ctx);
        self.printTitle(ctx);
        for (var i = 0; i < self.wires.length; ++i) {
            // todo: check if wire is in visible area
            self.wires[i].draw(ctx);
        }
        for (var j = 0; j < self.buses.length; ++j) {
            self.buses[j].draw(ctx);
        }
        for (var uid in self.children) {
            self.children[uid].draw(ctx);
        }
    } catch (err) {
        console.error('Root: Error during draw:', err.stack);
    } finally {
        ctx.restore();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.drawGrid = function (ctx) {
    var self = this;
    if (self.scale > 0.3) {
        ctx.beginPath();
        ctx.strokeStyle = '#EFEFEF';

        var step = Root.GRID_STEP;
        var fromX = Math.floor(-self.translated.x / self.scale / step) * step;
        var toX = fromX + self.canvas.width / self.scale + step;

        var fromY = Math.floor(-self.translated.y / self.scale / step) * step;
        var toY = fromY + self.canvas.height / self.scale + step;

        for (var x = fromX; x < toX; x += step) {
            self.moveTo(ctx, x - 1, fromY - 1);
            self.lineTo(ctx, x - 1, toY - 1);
            ctx.stroke();
        }

        for (var y = fromY; y < toY; y += step) {
            self.moveTo(ctx, fromX - 1, y - 1);
            self.lineTo(ctx, toX - 1, y - 1);
            ctx.stroke();
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.clearCanvas = function () {
    var self = this;
    self.ctx.clearRect(
        -self.translated.x,
        -self.translated.y,
        self.canvas.width,
        self.canvas.height
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.canvasToModel = function (point) {
    var self = this;
    return {
        x: Math.round((point.x - self.translated.x - 0.5) / self.scale),
        y: Math.round((point.y - self.translated.y - 0.5) / self.scale)
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.getVisibleArea = function () {
    var self = this;
    var leftTop = self.canvasToModel({x: 0, y: 0});
    var bottomRight = self.canvasToModel({x: self.canvas.width, y: self.canvas.height});
    return {
        left  : leftTop.x,
        top   : leftTop.y,
        right : bottomRight.x,
        bottom: bottomRight.y
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.onCanvasMouseDown = function (event) {
    var self = this;
    if (event.target == self.canvas) {
        event.preventDefault();

        //console.log('mouse down event:', event);
        //console.log('mouse down client:', event.clientX, event.clientY);
        //console.log('mouse down offset:', event.offsetX, event.offsetY);

        self.lastPos = {
            x: event.screenX,
            y: event.screenY
        };
        self.downPos = {
            x: event.screenX,
            y: event.screenY
        };
        self.mouseDown = true;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.onCanvasMouseMove = function (event) {
    var self = this;
    if (self.mouseDown) {
        //event.preventDefault();
        var diff = {
            x: event.screenX - self.lastPos.x,
            y: event.screenY - self.lastPos.y
        };
        self.lastPos = {
            x: event.screenX,
            y: event.screenY
        };
        self.offsetBy(diff);
        if (!self.cursorSet) {
            self.canvas.style.cursor = 'move';
            self.cursorSet = true;
        }

        self._redraw();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.onCanvasMouseUp = function (event) {
    var self = this;
    if (self.mouseDown) {
        if (self.cursorSet) {
            self.canvas.style.cursor = 'default';
            self.cursorSet = false;
        }

        var diff = {
            x: event.screenX - self.downPos.x,
            y: event.screenY - self.downPos.y
        };
        if (diff.x == 0 && diff.y == 0) {
            var globalPoint = self.canvasToModel({
                x: event.offsetX,
                y: event.offsetY
            });
            self.handleClick(globalPoint);
        }

        //console.log('mouse up:', event);
        self.mouseDown = false;
        self.lastPos   = null;
        self.downPos   = null;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.offsetBy = function (diff) {
    var self = this;
    self.ctx.translate(
        diff.x,
        diff.y
    );
    self.translated = {
        x: self.translated.x + diff.x,
        y: self.translated.y + diff.y
    };
    self.visibleArea = self.getVisibleArea();
    //console.log('Root: Visible area changed:', self.visibleArea);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.dumpInfo = function () {
    var self = this;
    console.log('Children:', self.children);
};

module.exports = Root;
},{"./Assembly":10,"./Helper":12,"./circuit/Circuit":25,"./model/ALU":55,"./model/DFlipFlop":56,"./model/adder":57,"./model/bus1":58,"./model/busTest":59,"./model/clock":60,"./model/compare":61,"./model/cpuTest":62,"./model/dec7":63,"./model/decoders":64,"./model/gates":65,"./model/latch":66,"./model/operators":67,"./model/ramTest":68,"./model/register":69,"./model/srLatch":70,"./model/stepper":71,"./model/test":72,"./model/wireTest":73,"aigle":1,"jquery":4,"util":8}],15:[function(require,module,exports){
'use strict';

var util      = require('util');
var Component = require('./Component');
var Pin       = require('./conductor/Pin');

util.inherits(Switch, Component);

Switch.DEFAULT_SIZE = 20;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Switch(options) {
    var self = this;
    options = options || {};

    options.width  = options.width  !== undefined ? options.width  : Switch.DEFAULT_SIZE;
    options.height = options.height !== undefined ? options.height : Switch.DEFAULT_SIZE;
    options.title  = options.title || 'Switch';

    Switch.super_.call(self, options);

    self.flip = options.flip !== undefined ? !!options.flip : false;

    self.output = self.addPin(self.flip ?  Pin.POS.LEFT : Pin.POS.RIGHT, 0, 1, null, options.value);
    self.output.active = true;
    self.output.debugTitle = 'o';
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Switch.prototype.drawSelf = function (ctx) {
    var self = this;

    var radius = self.width / 2;
    ctx.strokeStyle = self.output.getValue() ? '#FF0000' : '#444444';
    ctx.fillStyle   = self.output.getValue()  ? '#ffeeee' :'#F4F4F4';
    ctx.beginPath();
    self.arc(
        ctx,
        self.width / 2,
        self.height / 2,
        radius,
        0,
        Math.PI * 2
    );
    ctx.fill();
    ctx.stroke();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Switch.prototype.getTitlePos = function () {
    var self = this;
    return {
        left    : self.output.getValue() ?  self.width / 2: self.width / 2,
        top     : self.height / 2,
        baseLine: 'middle'
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Switch.prototype.getTitleAlign = function () {
    //var self = this;
    return 'center';
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Switch.prototype.printTitle = function (ctx) {
    var self = this;
    var title = self.getTitle();
    if (title) {
        self.setFontSize(ctx, 12);
        ctx.fillStyle = self.output.getValue() ? '#FF0000' : '#444444';
        var pos = self.getTitlePos();
        ctx.textBaseline = pos.baseLine;
        ctx.textAlign = self.getTitleAlign();
        self.fillText(
            ctx,
            title,
            pos.left,
            pos.top
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Switch.prototype.handleClick = function (globalPoint) {
    var self = this;
    //console.log('Component: Clicked: ' + self.title);
    self.output.setValue(!self.output.value).then(function () {
        window.root._redraw();
    }).catch(function (err) {
        console.log('Switch: Error during setValue:', err.stack);

    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Switch.prototype.getTitle = function () {
    var self = this;
    return self.output.toString();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Switch.createForInput = function (holder, input, value) {
    var inputPoint = input.getParentPoint();
    var inputSwitch = new Switch({
        left: input.position == Pin.POS.RIGHT ? inputPoint.left + 20 : inputPoint.left - 40,
        top : inputPoint.top - Switch.DEFAULT_SIZE / 2,
        flip: input.position == Pin.POS.RIGHT,
        value: value
    });
    holder.addChild(inputSwitch);
    holder.addWire({
        cnn: [
            inputSwitch.output,
            input
        ],
        segments: [
            [
                inputSwitch.output,
                input
            ]
        ]
    })

};

module.exports = Switch;
},{"./Component":11,"./conductor/Pin":46,"util":8}],16:[function(require,module,exports){
'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var XOR     = require('../gate/XOR');
var AND     = require('../gate/AND');
var NOT     = require('../gate/NOT');
var OR      = require('../gate/OR');
var Wire    = require('../conductor/Wire');
var Pin     = require('../conductor/Pin');

util.inherits(ADD, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ADD(options) {
    var self = this;
    options = options || {};

    options.width     = 410;
    options.height    = 210;
    options.pinMargin = 0.2;
    options.title     = options.title || 'ADD';

    ADD.super_.call(self, options);

    self.inputA = self.addPin(Pin.POS.LEFT, 6,8, 'a');
    self.inputB = self.addPin(Pin.POS.LEFT, 1,8, 'b');

    self.carryIn  = self.addPin(Pin.POS.BOTTOM, 0,1, 'carry in');
    self.carryOut = self.addPin(Pin.POS.TOP,    0,1, 'carry out');

    self.output = self.addPin(Pin.POS.RIGHT, 0,1, 'c');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ADD.prototype.init = function () {
    var self = this;

    var scale = 1;

    var xor1 = new XOR({
        title: 'XOR1',
        top  : 15,
        left : 55,
        scale: scale
    });
    self.addChild(xor1);

    var xor2 = new XOR({
        title: 'XOR2',
        id   : 'xor2',
        top  : 15,
        left : 305,
        scale: scale
    });
    self.addChild(xor2);

    var and1 = new AND({
        title: 'AND1',
        id   : 'and1',
        top  : 70,
        left : 180,
        scale: scale
    });
    self.addChild(and1);

    var and2 = new AND({
        title: 'AND2',
        top  : 130,
        left : 180,
        scale: scale
    });
    self.addChild(and2);

    var or = new OR({
        title: 'OR',
        top  : 100,
        left : 290,
        scale: scale
    });
    self.addChild(or);

    // a to xor1 and and2
    self.addWire({
        cnn: [
            self.inputA,
            xor1.inputs[1],
            and2.inputs[1]
        ],
        segments: [
            [
                xor1.inputs[1],
                {
                    left: 15,
                    top: 0, relY: true
                },
                'cnn2+'
            ],
            [
                self.inputA,
                {
                    left: 15,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    // b to xor1 and and2
    self.addWire({
        cnn: [
            self.inputB,
            xor1.inputs[0],
            and2.inputs[0]
        ],
        segments: [
            [
                xor1.inputs[0],
                {
                    left: 30,
                    top: 0, relY: true
                },
                'cnn2+'
            ],
            [
                self.inputB,
                {
                    left: 30,
                    top: 0, relY: true,
                    solder: true
                }
            ]

        ]
    });

    // xor1 to xor2 and and1
    self.addWire({
        cnn: [
            xor1.output,
            xor2.inputs[1],
            and1.inputs[0]
        ],
        segments: [
            [
                xor2.inputs[1],
                {
                    left: 140,
                    top: 0, relY: true
                },
                'cnn2+'
            ],
            [
                xor1.output,
                {
                    left: 140,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.carryIn,
            and1.inputs[1],
            xor2.inputs[0]
        ],
        segments: [
            [
                self.carryIn,
                {
                    left: 155,
                    top: self.height - 15,
                    yFirst: true
                },
                'cnn2+'
            ],
            [
                and1.inputs[1],
                {
                    left: 155,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            and1.output,
            or.inputs[1]
        ],
        segments: [
            [
                and1.output,
                or.inputs[1]
            ]
        ]
    });

    self.addWire({
        cnn: [
            and2.output,
            or.inputs[0]
        ],
        segments: [
            [
                and2.output,
                or.inputs[0]
            ]
        ]
    });

    self.addWire({
        cnn: [
            xor2.output,
            self.output
        ],
        segments: [
            [
                xor2.output,
                'cnn1+'
            ]
        ]
    });

    self.addWire({
        cnn: [
            or.output,
            self.carryOut
        ],
        segments: [
            [
                or.output,
                {
                    top: -50, relY: true,
                    left: 0, relX: true
                },
                {
                    top: 15,
                    left: 250
                },
                self.carryOut
            ]
        ]
    });

    return ADD.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ADD.prototype.drawSelf = function (ctx) {
    var self = this;
    ADD.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 80 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, 'ADD:' + self.output, self.width / 2, self.height / 2);
    }
};

module.exports = ADD;
},{"../conductor/Pin":46,"../conductor/Wire":47,"../gate/AND":48,"../gate/NOT":52,"../gate/OR":53,"../gate/XOR":54,"./Circuit":25,"util":8}],17:[function(require,module,exports){
'use strict';

var Promise    = require('aigle');
var util       = require('util');
var Circuit    = require('./Circuit');
var Decoder    = require('./Decoder');
var Comparator = require('./Comparator');
var Adder      = require('./Adder');
var Orer       = require('./Orer');
var Zero       = require('./Zero');
var Ander      = require('./Ander');
var SHL        = require('./SHL');
var SHR        = require('./SHR');
var Inverter   = require('./Inverter');
var Enabler    = require('./Enabler');
var Pin        = require('../conductor/Pin');
var Bus        = require('../conductor/Bus');
var AND        = require('../gate/AND');

util.inherits(ALU, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ALU(options) {
    var self = this;
    options = options || {};

    options.title     = 'ALU';
    options.width     = 600;
    options.height    = 1250;
    options.minScale  = 0.4;
    options.pinMargin = 0.25;

    ALU.super_.call(self, options);

    self.inputsA = [];
    self.inputsB = [];
    self.outputs = [];
    self.op      = [];

    var pinCount = 8;

    for (var i = 0; i < pinCount; ++i) {
        var inputA = self.addPin(Pin.POS.LEFT, i, pinCount, 'a'+ i);
        self.inputsA.push(inputA);
    }

    for (var j = 0; j < pinCount; ++j) {
        var inputB = self.addPin(Pin.POS.TOP, j, pinCount, 'b'+ j);
        self.inputsB.push(inputB);
    }

    for (var k = 0; k < pinCount; ++k) {
        var output = self.addPin(Pin.POS.BOTTOM, k, pinCount, 'c'+ k);
        self.outputs.push(output);
    }

    for (var n = 0; n < 3; ++n) {
        var op = self.addPin(Pin.POS.RIGHT, n, 8, 'op ' + n);
        self.op.push(op);
    }
    self.carryIn = self.addPin(Pin.POS.RIGHT, 3, 8, 'carry in');

    self.carryOuPin = self.addPin(Pin.POS.RIGHT, 4, 8, 'carry out');
    self.zeroPin    = self.addPin(Pin.POS.RIGHT, 5, 8, 'zero');
    self.equalPin   = self.addPin(Pin.POS.RIGHT, 6, 8, 'equal');
    self.largerPin  = self.addPin(Pin.POS.RIGHT, 7, 8, 'a larger');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ALU.prototype.init = function () {
    var self = this;
    var scale = 0.2;
    var baseTop = 80;
    var baseLeft = 150;
    var step =  150;

    var cmp = new Comparator({
        left : baseLeft,
        top  : baseTop,
        scale: scale
    });
    self.addChild(cmp);

    var orer = new Orer({
        left: baseLeft,
        top: baseTop + step,
        scale: scale
    });
    self.addChild(orer);

    var ander = new Ander({
        left: baseLeft,
        top: baseTop + step * 2,
        scale: scale
    });

    self.addChild(ander);

    var adder = new Adder({
        left: baseLeft,
        top: baseTop + step * 3,
        scale: scale
    });
    self.addChild(adder);

    var adderCarryAnd = new AND({
        title: 'CARRY+',
        left: baseLeft + 210,
        top: adder.top + adder.height * scale + 10,
        scale: 0.3
    });
    self.addChild(adderCarryAnd);

    var not = new Inverter({
        left: baseLeft,
        top: baseTop + step * 4,
        scale: scale
    });
    self.addChild(not);

    var shl = new SHL({
        left: baseLeft,
        top: baseTop + step * 5,
        scale: scale
    });
    self.addChild(shl);

    var shlCarryAnd = new AND({
        title: 'CARRY<<',
        left: baseLeft + 210,
        //top: shl.top - 20,
        top: shl.top + shl.height * scale + 10,
        scale: 0.3
    });
    self.addChild(shlCarryAnd);

    var shr = new SHR({
        left: baseLeft,
        top: baseTop + step * 6,
        scale: scale
    });
    self.addChild(shr);

    var shrCarryAnd = new AND({
        title: 'CARRY>>',
        left: baseLeft + 210,
        top: shr.top + shl.height * scale + 10,
        scale: 0.3
    });
    self.addChild(shrCarryAnd);

    var zero = new Zero({
        left : self.width - 60,
        top  : self.zeroPin.getPoint(true).top,
        scale: scale
    });
    self.addChild(zero);

    self.addWire({
        cnn: [
            zero.output,
            self.zeroPin
        ],
        segment: [
            zero.output,
            {
                left: self.width - 20,
                top : 0, relY: true
            },
            'cnn1+'
        ]
    });

    self.addWire({
        cnn: [
            self.carryIn,
            adder.carryIn,
            shl.shiftInPin,
            shr.shiftInPin
        ],
        segments: [
            [
                self.carryIn,
                {
                    left: self.width - 70,
                    top: adder.top + 130
                },
                adder.carryIn
            ],
            [
                {
                    left: baseLeft + 80,
                    top: adder.top + 130,
                    solder: true
                },
                {
                    top: shl.top + 110,
                    left: 0, relX: true
                },
                shl.shiftInPin
            ],
            [
                {
                    top: shl.top + 110,
                    left: baseLeft + 80,
                    solder: true
                },
                {
                    top: shr.top - 15,
                    left: 0, relX: true
                },
                shr.shiftInPin
            ]
        ]
    });

    self.addWire({
        cnn: [
            adder.carryOut,
            adderCarryAnd.inputs[0]
        ],
        segment: [
             adder.carryOut,
             'cnn1+'
        ]
    });

    self.addWire({
        cnn: [
            cmp.eqPin,
            self.equalPin
        ],
        segment: [
            cmp.eqPin,
            {
                left: self.width - 65,
                top : 10, relY: true,
                yFirst: true
            },
            'cnn1+'
        ]
    });

    self.addWire({
        cnn: [
            cmp.largerPin,
            self.largerPin
        ],
        segment: [
            cmp.largerPin,
            {
                left: self.width - 60,
                top: 5, relY: true,
                yFirst: true
            },
            'cnn1+'
        ]
    });

    var busAOptions = {
        parent: self,
        cnn: [
            self.inputsA,
            cmp.inputsA,
            orer.inputsA,
            ander.inputsA,
            adder.inputsA,
            not.inputs,
            shl.inputs,
            shr.inputs
        ],
        segments: [
            [
                self.inputsA,
                {
                    left: 25,
                    top: self.height - 160,
                    align: 'right'
                },
                {
                    left: 65,
                    top: 0, relY: true,
                    align: 'x'
                },
                'cnn1+'
            ]
        ]
    };
    [orer.inputsA, ander.inputsA, adder.inputsA, not.inputs, shl.inputs, shr.inputs].forEach(function (inputs) {
        busAOptions.segments.push([
            inputs,
            {
                left: 65,
                top: 0, relY: true,
                solder: true,
                align: 'x'
            }
        ]);
    });

    var busA = new Bus(busAOptions);
    self.buses.push(busA);

    var busBOptions = {
        parent : self,
        cnn: [self.inputsB, cmp.inputsB, orer.inputsB, ander.inputsB, adder.inputsB],
        segments: [
            [
                self.inputsB,
                {
                    left: 110,
                    top: 25,
                    yFirst: true,
                    align: 'left'
                },
                {
                    left: 0, relX: true,
                    top: adder.top - 45, relY: true,
                    align: 'y',
                    yFirst: true,
                    flip: true,
                    dbl: true
                },
                adder.inputsB
            ]
        ]
    };

    [cmp, orer, ander].forEach(function (circuit) {
        busBOptions.segments.push([
            {
                left  : 110,
                top   : circuit.top - 20,
                solder: true,
                flip: true,
                align : 'right'
            },
            circuit.inputsB
        ]);
    });

    var busB = new Bus(busBOptions);
    self.buses.push(busB);

    var opDecoder = new Decoder({
        id: 'opDecoder',
        title: 'OP',
        left : baseLeft + 80,
        top  : self.height - 120,
        scale: scale,
        inputCount: 3
    });
    var opOutputTitles = ['ADD', 'SHR', 'SHL', 'NOT', 'AND', 'OR', 'XOR', 'CMP'];
    for (var n = 0; n < opDecoder.outputs.length; ++n) {
        opDecoder.outputs[n].title = opOutputTitles[n];
    }

    self.addChild(opDecoder);
    for (var i = 0; i < 3; ++i) {
        self.addWire({
            cnn: [
                self.op[i],
                opDecoder.inputs[i]
            ],
            segment: [
                self.op[i],
                {
                    left: -30 - i * 3, relX: true,
                    top: opDecoder.top + 75 - 3 * i
                },
                {
                    top: 0, relY: true,
                    left: opDecoder.left - 13 + i * 3
                },
                'cnn1+'
            ]
        });
    }

    var operators = [adder, shr, shl, not, ander, orer, cmp];
    operators.forEach(function (operator, opCode) {
        var enabler = new Enabler({
            left: baseLeft + 200,
            top  : operator.top,
            scale: scale
        });
        operator.enabler = enabler;
        self.addChild(enabler);
        for (var i = 0; i < 8; ++i) {
            self.addWire({
                cnn: [
                    operator.outputs[i],
                    enabler.inputs[i]
                ],
                segment: [
                    operator.outputs[i],
                    enabler.inputs[i]
                ]
            });
        }
        self.addWire({
            cnn: [
                opDecoder.outputs[opCode],
                enabler.enablePin
            ],
            segments: [
                [
                    opDecoder.outputs[opCode],
                    {
                        left: 25 - opCode * 3, relX: true,
                        top: 0, relY: true
                    },
                    'cnn1+'
                ]
            ]
        });
    });

    self.addWire({
        cnn: [
            opDecoder.outputs[0],
            adderCarryAnd.inputs[1]
        ],
        segment: [
            {
                left: 'cnn1.left',
                top: adder.enabler.enablePin.getParentPoint().top,
                solder: true
            },
            adderCarryAnd.inputs[1]
        ]
    });

    self.addWire({
        cnn: [
            opDecoder.outputs[1],
            shrCarryAnd.inputs[1]
        ],
        segment: [
            {
                left: 'cnn1.left',
                top: shr.enabler.enablePin.getParentPoint().top,
                solder: true
            },
            shrCarryAnd.inputs[1]
        ]
    });

    self.addWire({
        cnn: [
            opDecoder.outputs[2],
            shlCarryAnd.inputs[1]
        ],
        segment: [
            {
                left: 'cnn1.left',
                top: shl.enabler.enablePin.getParentPoint().top,
                solder: true
            },
            shlCarryAnd.inputs[1]
        ]
    });

    self.addWire({
        cnn: [
            shr.shiftOutPin,
            shrCarryAnd.inputs[0]
        ],
        segment: [
            shr.shiftOutPin,
            'cnn1+'
        ]
    });

    self.addWire({
        cnn: [
            shl.shiftOutPin,
            shlCarryAnd.inputs[0]
        ],
        segment: [
            shl.shiftOutPin,
            {
                top: -10, relY: true,
                left: baseLeft + 100,
                yFirst: true
            },
            {
                left: 0, relX: true,
                top: 'cnn1.top'
            },
            shlCarryAnd.inputs[0]
        ]
    });

    self.addWire({
        cnn: [
            shrCarryAnd.output,
            shlCarryAnd.output,
            adderCarryAnd.output,
            self.carryOuPin
        ],
        segments: [
            [
                shrCarryAnd.output,
                {
                    left: self.width - 100,
                    top: 'cnn1.top'
                },
                'cnn3+'
            ],
            [
                shlCarryAnd.output,
                {
                    left: self.width - 100,
                    top: 0, relY: true,
                    solder: true
                }
            ],
            [
                adderCarryAnd.output,
                {
                    left: self.width - 100,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    var busCOptions = {
        parent: self,
        cnn: [
            cmp.enabler.outputs,
            adder.enabler.outputs,
            shr.enabler.outputs,
            shl.enabler.outputs,
            not.enabler.outputs,
            ander.enabler.outputs,
            orer.enabler.outputs,
            zero.inputs,
            self.outputs
        ],
        segments: [
            [
                cmp.enabler.outputs,
                {
                    left: self.width - 130,
                    top: self.height - 25,
                    align: 'left',
                    flip: true
                },
                self.outputs
            ]
        ]
    };

    [
        adder.enabler.outputs,
        shr.enabler.outputs,
        shl.enabler.outputs,
        not.enabler.outputs,
        ander.enabler.outputs,
        orer.enabler.outputs,
        zero.inputs
    ].forEach(function (outputs) {
        busCOptions.segments.push([
            outputs,
            {
                left: self.width - 130,
                top: 0, relY: true,
                align: 'x',
                flip: true,
                solder: true
            }
        ]);
    });

    var busC = new Bus(busCOptions);
    self.buses.push(busC);

    return busA.init().then(function () {
        return busB.init();
    }).then(function () {
        return busC.init();
    }).then(function () {
        return ALU.super_.prototype.init.call(self);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ALU.prototype.drawSelf = function (ctx) {
    var self = this;
    ALU.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 120 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ALU.prototype.getTitle = function () {
    var self = this;
    var title = Adder.super_.prototype.getTitle.call(self);
    return title + ':' + self.getHexValue();
};


module.exports = ALU;
},{"../conductor/Bus":44,"../conductor/Pin":46,"../gate/AND":48,"./Adder":18,"./Ander":19,"./Circuit":25,"./Comparator":27,"./Decoder":29,"./Enabler":31,"./Inverter":32,"./Orer":34,"./SHL":38,"./SHR":39,"./Zero":43,"aigle":1,"util":8}],18:[function(require,module,exports){
'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var Pin     = require('../conductor/Pin');
var ADD     = require('./ADD');

util.inherits(Adder, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Adder(options) {
    var self = this;
    options = options || {};

    options.title     = 'ADD';
    options.width     = 300;
    options.height    = Circuit.BYTE_HANDLER_HEIGHT;
    options.minScale  = 0.4;
    options.pinMargin = 0.15;

    Adder.super_.call(self, options);

    self.inputsA = [];
    self.inputsB = [];
    self.outputs = [];

    var pinCount = 8;

    for (var i = 0; i < pinCount; ++i) {
        var inputA = self.addPin(Pin.POS.LEFT, i, pinCount, 'a' + i);
        self.inputsA.push(inputA);

        var inputB = self.addPin(Pin.POS.TOP, i, pinCount, 'b' + i);
        self.inputsB.push(inputB);
    }

    for (var j = 0; j < pinCount; ++j) {
        var output = self.addPin(Pin.POS.RIGHT, j, pinCount, 'c' + j);
        self.outputs.push(output);
    }

    self.carryIn  = self.addPin(Pin.POS.BOTTOM, 4, 6, 'carry in');
    self.carryOut = self.addPin(Pin.POS.BOTTOM, 1, 6, 'carry out');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Adder.prototype.init = function () {
    var self = this;
    var scale = 0.2;
    var baseTop = 45;

    for (var i = 0; i < 8; ++i) {
        var ri = 7 - i;
        var add = new ADD({
            title: 'ADD' + ri,
            id   : 'add' + ri,
            left : 100,
            top  : baseTop + 55 * i,
            scale: scale
        });
        self.addChild(add);

        self.addWire({
            cnn: [
                self.inputsA[ri],
                add.inputA
            ],
            segment: [
                self.inputsA[ri],
                {
                    left: 10, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        });

        self.addWire({
            cnn: [
                self.inputsB[ri],
                add.inputB
            ],
            segment: [
                self.inputsB[ri],
                {
                    top   : 3 + i * 3,
                    left  : self.width * self.pinMargin + i * 3,
                    yFirst: true
                },
                'cnn1+'
            ]
        });

        self.addWire({
            cnn: [
                add.output,
                self.outputs[ri]
            ],
            segment: [
                add.output,
                {
                    left: self.width - 10,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        });
        if (i > 0) {
            var prevCarryIn = self.children['add' + (ri + 1)].carryIn;
            self.addWire({
                cnn: [
                    add.carryOut,
                    prevCarryIn
                ],
                segment: [
                    add.carryOut,
                    prevCarryIn
                ]
            });
        }
    }

    self.addWire({
        cnn: [
            self.carryIn,
            self.children['add0'].carryIn
        ],
        segment: [
            self.carryIn,
            {
                left: 0, relX: true,
                top: self.height - 10
            },
            self.children['add0'].carryIn
        ]
    });

    self.addWire({
        cnn: [
            self.children['add7'].carryOut,
            self.carryOut
        ],
        segments: [
            [
                self.children['add7'].carryOut,
                {
                    top: -5, relY: true,
                    left: 0, relX: true
                },
                self.carryOut
            ]
        ]
    });

    return Adder.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Adder.prototype.getTitle = function () {
    var self = this;
    var title = Adder.super_.prototype.getTitle.call(self);
    return title + ':' + self.getHexValue();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Adder.prototype.drawSelf = function (ctx) {
    var self = this;
    Adder.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 60 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = Adder;
},{"../conductor/Pin":46,"./ADD":16,"./Circuit":25,"util":8}],19:[function(require,module,exports){
'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var Pin     = require('../conductor/Pin');
var AND     = require('../gate/AND');

util.inherits(Ander, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Ander(options) {
    var self = this;
    options = options || {};

    options.title     = 'AND';
    options.width     = 300;
    options.height    = Circuit.BYTE_HANDLER_HEIGHT;
    options.minScale  = 0.4;
    options.pinMargin = 0.15;

    Ander.super_.call(self, options);

    self.inputsA = [];
    self.inputsB = [];
    self.outputs = [];

    var pinCount = 8;

    for (var i = 0; i < pinCount; ++i) {
        var inputA = self.addPin(Pin.POS.LEFT, i, pinCount, 'a' + i);
        self.inputsA.push(inputA);

        var inputB = self.addPin(Pin.POS.TOP, i, pinCount, 'b' + i);
        self.inputsB.push(inputB);
    }

    for (var j = 0; j < pinCount; ++j) {
        var output = self.addPin(Pin.POS.RIGHT, j, pinCount, 'c' + j);
        self.outputs.push(output);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ander.prototype.init = function () {
    var self = this;
    var scale = 0.7;
    for (var i = 0; i < 8; ++i) {
        var and = new AND({
            title: 'AND' + i,
            left : self.width * 0.7,
            top  : self.getPinPoint(i, Pin.POS.LEFT, 8).top - (50 * scale) / 2,
            scale: scale
        });
        self.addChild(and);

        self.addWire({
            cnn: [
                self.inputsA[i],
                and.inputs[0]
            ],
            segment: [
                self.inputsA[i],
                {
                    top: 'cnn1.top',
                    left: 20
                },
                and.inputs[0]
            ]
        });

        self.addWire({
            cnn: [
                self.inputsB[i],
                and.inputs[1]
            ],
            segment: [
                self.inputsB[i],
                {
                    top   : 35 - 3 * i,
                    left  : self.width * self.pinMargin  + 21 - 3 * i,
                    yFirst: true
                },
                'cnn1+'
            ]
        });

        self.addWire({
            cnn: [
                and.output,
                self.outputs[i]
            ],
            segment: [
                and.output,
                self.outputs[i]
            ]
        });
    }

    return Ander.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ander.prototype.getTitle = function () {
    var self = this;
    var title = Ander.super_.prototype.getTitle.call(self);
    return title + ':' + self.getHexValue();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ander.prototype.drawSelf = function (ctx) {
    var self = this;
    Ander.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 60 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = Ander;
},{"../conductor/Pin":46,"../gate/AND":48,"./Circuit":25,"util":8}],20:[function(require,module,exports){
'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var AND     = require('../gate/AND');
var NOT     = require('../gate/NOT');
var OR      = require('../gate/OR');
var Pin     = require('../conductor/Pin');

util.inherits(Bus1, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bus1(options) {
    var self = this;
    options = options || {};
    options.width     = 600;
    options.height    = 160;
    options.minScale  = 0.4;
    options.pinMargin = 0.1;

    options.title = options.title || 'Bus1';

    Bus1.super_.call(self, options);

    self.inputs  = [];
    self.outputs = [];

    var pinCount = 8;

    for (var i = 0; i < pinCount; ++i) {
        var input = self.addPin(Pin.POS.TOP, i, pinCount, 'i'+ i);
        self.inputs.push(input);
    }

    for (var j = 0; j < pinCount; ++j) {
        var output = self.addPin(Pin.POS.BOTTOM, j, pinCount, 'o'+ j);
        self.outputs.push(output);
    }

    self.bus1 = self.addPin(Pin.POS.RIGHT, 5, 8, 'bus1');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Bus1.prototype.init = function () {
    var self = this;
    var scale = 0.4;
    var baseTop = 90;
    var not = new NOT({
        left : 15,
        top  : 60,
        scale: scale
    });
    self.addChild(not);

    self.addWire({
        cnn: [
            self.bus1,
            not.inputs[0]
        ],
        segment: [
            not.inputs[0],
            {
                top: 20,
                left: self.width - 10,
                yFirst: true
            },
            {
                left: 0, relX: true,
                top: 'cnn0.top',
                solder: true
            }
        ]
    });

    var notOutputWire = {
        cnn: [not.output],
        segments: []
    };

    for (var i = 0; i < 8; ++i) {
        var gate;
        var pointLeft = self.inputs[i].getPoint(true).left + self.inputs[i].length * scale;
        if (i == 0) {
            gate = new OR({
                left: pointLeft,
                top: baseTop,
                scale: scale
            });

            self.addWire({
                cnn: [
                    self.bus1,
                    gate.inputs[0]
                ],
                segment: [
                    self.bus1,
                    {
                        left: self.width - 75,
                        top: 0, relY: true
                    },
                    'cnn1+'
                ]
            });

        } else {
            gate = new AND({
                left: pointLeft,
                top: baseTop,
                scale: scale
            });

            notOutputWire.cnn.push(gate.inputs[0]);
            if (i == 1) {
                notOutputWire.segments.push([
                    not.output,
                    {
                        left: self.width - 145,
                        top: 0, relY: true
                    },
                    'cnn' + i + '+'
                ]);
            } else {
                notOutputWire.segments.push([
                    gate.inputs[0],
                    {
                        top: 'cnn0.top',
                        left: -10, relX: true,
                        solder: true
                    }
                ]);
            }
        }
        self.addChild(gate);
        self.addWire({
            cnn: [
                self.inputs[i],
                gate.inputs[1]
            ],
            segment: [
                gate.inputs[1],
                self.inputs[i]
            ]
        });
        self.addWire({
            cnn: [
                gate.output,
                self.outputs[i]
            ],
            segment: [
                gate.output,
                {
                    left: 0, relX: true,
                    top: self.height - 20
                },
                self.outputs[i]
            ]
        });
    }

    self.addWire(notOutputWire);

    return Bus1.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Bus1.prototype.getTitle = function () {
    var self = this;
    var title = Bus1.super_.prototype.getTitle.call(self);
    return title + ':' + self.bus1;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Bus1.prototype.drawSelf = function (ctx) {
    var self = this;
    Bus1.super_.prototype.drawSelf.call(self, ctx);

    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 100 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = Bus1;
},{"../conductor/Pin":46,"../gate/AND":48,"../gate/NOT":52,"../gate/OR":53,"./Circuit":25,"util":8}],21:[function(require,module,exports){
'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var AND     = require('../gate/AND');
var Latch   = require('./Latch');
var Pin     = require('../conductor/Pin');
var Bus     = require('../conductor/Bus');
var Helper  = require('../Helper');

util.inherits(BusReg, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function BusReg(options) {
    var self = this;
    options = options || {};
    options.width     = 350;
    options.height    = 560;
    options.pinMargin = 0.08;
    options.minScale  = 0.4;

    BusReg.super_.call(self, options);
    self.data    = [];
    self.latches = [];

    var pinCount = 8;
    for (var j = 0; j < pinCount; ++j) {
        var dataPin = self.addPin(Pin.POS.RIGHT, j, pinCount, 'd'+ j);
        self.data.push(dataPin);
    }

    self.setPin    = self.addPin(Pin.POS.BOTTOM, 4, 6, 's');
    self.enablePin = self.addPin(Pin.POS.BOTTOM, 1, 6, 'e');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
BusReg.prototype.init = function () {
    var self = this;
    var setWireOptions = {
        cnn     : [self.setPin],
        segments: []
    };

    var enableWireOptions = {
        cnn     : [self.enablePin],
        segments: []
    };

    var latchInputs  = [];
    var andOutputs = [];

    for (var i = 0; i < 8; ++i) {
        var ri = 7 - i;
        var latch = new Latch({
            id   : 'latch' + i,
            title: 'Latch' + i,
            left : 65,
            top  : 60 + 60 * ri,
            scale: 0.25
        });
        self.addChild(latch);
        self.latches.push(latch);

        var and = new AND({
            id   : 'and' + i,
            title: 'AND' + i,
            left : 220,
            top  : 70 + 60 * ri,
            scale: 0.5
        });
        self.addChild(and);

        latchInputs.push(latch.dataPin);
        andOutputs.push(and.output);

        // latch's output to and and input
        self.addWire({
            cnn: [
                latch.output,
                and.inputs[1]
            ],
            segments: [
                [
                    latch.output,
                    {
                        left: 5, relX: true,
                        top: 0, relY: true
                    },
                    'cnn1+'
                ]
            ]
        });

        setWireOptions.cnn.push(latch.setPin);
        enableWireOptions.cnn.push(and.inputs[0]);

        var setLeft = 50;
        var enableLeft = 200;

        if (i == 7) {
            setWireOptions.segments.push([
                latch.setPin,
                {
                    left: setLeft,
                    top : self.height - 15
                },
                self.setPin
            ]);
            enableWireOptions.segments.push([
                and.inputs[0],
                {
                    left: enableLeft,
                    top : self.height - 15
                },
                self.enablePin
            ]);
        } else {
            setWireOptions.segments.push([
                latch.setPin,
                {
                    left: setLeft,
                    top: 0, relY: true,
                    solder: true
                }
            ]);
            enableWireOptions.segments.push([
                and.inputs[0],
                {
                    left: enableLeft,
                    top: 0, relY: true,
                    solder: true
                }
            ]);
        }
    }

    self.addWire(setWireOptions);
    self.addWire(enableWireOptions);

    var dataBus = new Bus({
        parent: self,
        cnn: [
            self.data,
            latchInputs,
            andOutputs
        ],
        segments: [
            [
                self.data,
                {
                    left : self.width - 25,
                    top  : 30,
                    align: 'right'
                },
                {
                    left: 30,
                    top: 30,
                    align: 'left'
                },
                'cnn1+'
            ],
            [
                andOutputs,
                {
                    top: 30,
                    left: 25, relX: true,
                    solder: true,
                    align: 'left'
                }
            ]
        ]
    });

    self.buses.push(dataBus);

    return dataBus.init().then(function () {
        return BusReg.super_.prototype.init.call(self);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
BusReg.prototype.getTitle = function () {
    var self = this;
    var title = BusReg.super_.prototype.getTitle.call(self);
    return title + ':' + self.getHexValue();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
BusReg.prototype.getHexValue = function () {
    var self = this;
    var value = 0;
    var weight = 1;
    for (var i = 0; i < 8; ++i) {
        if (self.latches[i].output.value) {
            value += weight;
        }
        weight = weight << 1;
    }
    var strVal = value.toString(16).toUpperCase();
    if (value <= 0xF) {
        strVal = '0' + strVal;
    }
    return strVal;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
BusReg.prototype.drawSelf = function (ctx) {
    var self = this;
    BusReg.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 90 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
BusReg.prototype.setByte = function (byte) {
    var self = this;
    var binaryString = Helper.number2BinString(byte);
    var bitsToSet = [];
    for (var i =  0; i < binaryString.length; ++i) {
        var ri = binaryString.length - 1 - i;
        if (binaryString[ri] === '1') {
            bitsToSet.push(i);
        }
    }
    return Promise.all(bitsToSet.map(function (latchIndex) {
        return self.latches[latchIndex].setTo1();
    }));
};

module.exports = BusReg;
},{"../Helper":12,"../conductor/Bus":44,"../conductor/Pin":46,"../gate/AND":48,"./Circuit":25,"./Latch":33,"util":8}],22:[function(require,module,exports){
'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var Latch   = require('./Latch');
var Pin     = require('../conductor/Pin');
var Helper  = require('../Helper');

util.inherits(Byte, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Byte(options) {
    var self = this;
    options = options || {};

    options.width     = options.width  || 190;
    options.height    = options.height || Circuit.BYTE_HANDLER_HEIGHT;
    options.minScale  = 0.4;
    options.pinMargin = 0.08;

    options.cellCount = options.cellCount || 8;

    Byte.super_.call(self, options);

    self.inputs  = [];
    self.outputs = [];

    for (var i = 0; i < options.cellCount; ++i) {
        var input = self.addPin(Pin.POS.LEFT, i, options.cellCount, 'i'+ i);
        self.inputs.push(input);
    }

    for (var j = 0; j < options.cellCount; ++j) {
        var output = self.addPin(Pin.POS.RIGHT, j, options.cellCount, 'o'+ j);
        self.outputs.push(output);
    }

    self.setPin = self.addPin(Pin.POS.BOTTOM, 18, 20, 's');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Byte.prototype.init = function () {
    var self = this;
    var setWireOptions = {
        cnn     : [self.setPin],
        segments: []
    };
    var scale = 0.25;

    for (var i = 0; i < self.inputs.length; ++i) {
        var latch = new Latch({
            id   : 'latch' + i,
            title: 'Latch' + i,
            left : 40,
            top  : self.outputs[i].getPoint(true).top - Latch.DEFAULT_HEIGHT / 2 * scale,
            scale: scale
        });
        self.addChild(latch);

        // input to latch's i
        self.addWire({
            cnn: [
                self.inputs[i],
                latch.dataPin
            ],
            segment: [
                self.inputs[i],
                {
                    left: 10, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        });

        // latch's output to output
        self.addWire({
            cnn: [
                latch.output,
                self.outputs[i]
            ],
            segment: [
                latch.output,
                self.outputs[i]
            ]
        });

        setWireOptions.cnn.push(latch.setPin);
        if (i == self.inputs.length - 1) {
            setWireOptions.segments.push([
                self.setPin,
                'cnn' + self.inputs.length + '+'
            ]);
        } else {
            setWireOptions.segments.push([
                latch.setPin,
                {
                    left: 'cnn0.left',
                    top: 0, relY: true,
                    solder: true
                }
            ]);
        }
    }

    self.addWire(setWireOptions);

    return Byte.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Byte.prototype.getTitle = function () {
    var self = this;
    var title = Byte.super_.prototype.getTitle.call(self);
    return title + ':' + self.getHexValue();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Byte.prototype.drawSelf = function (ctx) {
    var self = this;
    Byte.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 50 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Byte.prototype.setByte = function (byte) {
    var self = this;
    var binaryString = Helper.number2BinString(byte);
    var bitsToSet = [];
    for (var i =  0; i < binaryString.length; ++i) {
        var ri = binaryString.length - 1 - i;
        if (binaryString[ri] === '1') {
            bitsToSet.push(i);
        }
    }
    return Promise.all(bitsToSet.map(function (latchIndex) {
        return self.children['latch' + latchIndex].setTo1();
    }));
};

module.exports = Byte;
},{"../Helper":12,"../conductor/Pin":46,"./Circuit":25,"./Latch":33,"util":8}],23:[function(require,module,exports){
'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var XOR     = require('../gate/XOR');
var AND     = require('../gate/AND');
var NOT     = require('../gate/NOT');
var OR      = require('../gate/OR');
var Wire    = require('../conductor/Wire');
var Pin     = require('../conductor/Pin');

util.inherits(CMP, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CMP(options) {
    var self = this;
    options = options || {};

    options.width     = 440;
    options.height    = 210;
    options.pinMargin = 0.2;
    options.title     = options.title || 'CMP';

    CMP.super_.call(self, options);

    self.eqInPin     = self.addPin(Pin.POS.TOP,  4, 6, 'equal in');
    self.largerInPin = self.addPin(Pin.POS.TOP,  1, 6, 'a larger in');

    self.inputA = self.addPin(Pin.POS.LEFT, 1, 2, 'a');
    self.inputB = self.addPin(Pin.POS.LEFT, 0, 2, 'b');
    self.inputs = [self.inputA, self.inputB];

    self.eqOutPin     = self.addPin(Pin.POS.BOTTOM,  4, 6, 'equal out');
    self.largerOutPin = self.addPin(Pin.POS.BOTTOM,  1, 6, 'a larger out');

    self.output   = self.addPin(Pin.POS.RIGHT, 0, 1, 'xor');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CMP.prototype.init = function () {
    var self = this;
    var xor = new XOR({
        title: 'XOR',
        left: 40,
        top : 55
    });
    self.addChild(xor);

    var not = new NOT({
        title: 'NOT',
        left: 70,
        top: 130
    });
    self.addChild(not);

    var and1 = new AND({
        title: 'AND1',
        left: 220,
        top: 30,
        inputCount: 3
    });
    self.addChild(and1);

    var and2 = new AND({
        title: 'AND2',
        left: 190,
        top: 130
    });
    self.addChild(and2);

    var or = new OR({
        title: 'OR',
        left: 340,
        top: 30
    });
    self.addChild(or);

    self.addWire({
        cnn: [
            self.inputA,
            xor.inputs[1],
            and1.inputs[1]
        ],
        segments: [
            [
                {
                    top: 'cnn0.top',
                    left: 'cnn1.left',
                    solder: true
                },
                xor.inputs[1]
            ],
            [
                self.inputA,
                {
                    left: 120, relX: true,
                    top: 'cnn2.top'
                },
                and1.inputs[1]
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.inputB,
            xor.inputs[0]
        ],
        segment: [
            self.inputB,
            xor.inputs[0]
        ]
    });

    self.addWire({
        cnn: [
            xor.output,
            self.output,
            not.inputs[0],
            and1.inputs[0]
        ],
        segments: [
            [
                xor.output,
                {
                    left: 20, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                'cnn0*',
                {
                    left: 0, relX: true,
                    top: 40, relY: true
                },
                not.inputs[0]
            ],
            [
                {
                    left: 'cnn3.left',
                    top: 'cnn1.top',
                    solder: true
                },
                and1.inputs[0]
            ]
        ]
    });
    self.addWire({
        cnn: [
            self.eqInPin,
            and2.inputs[1],
            and1.inputs[2]
        ],
        segments: [
            [
                self.eqInPin,
                {
                    left: 'cnn1.left',
                    top: 20, relY: true,
                    yFirst: true
                },
                and2.inputs[1]
            ],
            [
                {
                    left: 'cnn1.left',
                    top: 'cnn2.top',
                    solder: true
                },
                and1.inputs[2]
            ]
        ]
    });

    self.addWire({
        cnn: [
            not.output,
            and2.inputs[0]
        ],
        segment: [
            not.output,
            and2.inputs[0]
        ]
    });

    self.addWire({
        cnn: [
            and2.output,
            self.eqOutPin
        ],
        segment: [
            and2.output,
            {
                left: 0, relX: true,
                top: self.height - 15
            },
            self.eqOutPin
        ]
    });

    self.addWire({
        cnn: [
            and1.output,
            or.inputs[0]
        ],
        segment: [
            and1.output,
            or.inputs[0]
        ]
    });

    self.addWire({
        cnn: [
            self.largerInPin,
            or.inputs[1]
        ],
        segment: [
            self.largerInPin,
            'cnn1+'
        ]
    });

    self.addWire({
        cnn: [
            or.output,
            self.largerOutPin
        ],
        segment: [
            or.output,
            {
                top: self.height - 15,
                left: 0, relX: true
            },
            self.largerOutPin
        ]
    });

    return CMP.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CMP.prototype.drawSelf = function (ctx) {
    var self = this;
    CMP.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 80 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, 'CMP:' + self.output, self.width / 2, self.height / 2);
    }
};

module.exports = CMP;
},{"../conductor/Pin":46,"../conductor/Wire":47,"../gate/AND":48,"../gate/NOT":52,"../gate/OR":53,"../gate/XOR":54,"./Circuit":25,"util":8}],24:[function(require,module,exports){
'use strict';

var util     = require('util');
var Circuit  = require('./Circuit');
var Pin      = require('../conductor/Pin');
var AND      = require('../gate/AND');
var NOT      = require('../gate/NOT');
var OR       = require('../gate/OR');
var Clock    = require('./Clock');
var Stepper  = require('./Stepper');
var BusReg   = require('./BusReg');
var Register = require('./Register');
var Byte     = require('./Byte');
var ALU      = require('./ALU');
var Bus1     = require('./Bus1');
var Bus      = require('../conductor/Bus');
var Decoder  = require('./Decoder');
var Label    = require('../Label');

util.inherits(CPU, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CPU(options) {
    var self = this;
    options = options || {};

    options.title     = 'CPU';
    options.width     = 1000;
    options.height    = 1000;
    options.minScale  = 0.2;
    options.pinMargin = 0.15;

    CPU.super_.call(self, options);

    var pinCount = 8;
    self.data = [];
    for (var i = 0; i < pinCount; ++i) {
        var data = self.addPin(Pin.POS.BOTTOM, i, pinCount, 'd'+ i);
        self.data.push(data);
    }

    // RAM control pins
    self.sAddrPin = self.addPin(Pin.POS.RIGHT, 7, 8, 'sAddr');
    self.sRamPin  = self.addPin(Pin.POS.RIGHT, 6, 8, 'sRam');
    self.eRamPin  = self.addPin(Pin.POS.RIGHT, 5, 8, 'eRam');

    // I/O control pins
    self.sIOPin        = self.addPin(Pin.POS.RIGHT, 4, 8, 'sIO');
    self.eIOPin        = self.addPin(Pin.POS.RIGHT, 3, 8, 'eIO');
    self.ioPin         = self.addPin(Pin.POS.RIGHT, 2, 8, 'I/O');
    self.ioDataAddrPin = self.addPin(Pin.POS.RIGHT, 1, 8, 'Data/Addr');

    //self.debugPin = true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.init = function () {
    var self = this;

    // circuits
    self.createRegisters();
    self.createALU();
    self.createControlSection();

    self.createEnableGates();
    self.createSetGates();
    self.createIRGates();
    self.createAluInstrGates();
    self.createLoadInstrGates();
    self.createStoreInstrGates();
    self.createDataInstrGates();
    self.createJmpRInstrGates();
    self.createJmpInstrGates();
    self.createJmpIfInstrGates();
    self.createClfInstrGates();
    self.createIOInstrGates();


    // base wires
    self.createStepperWires();
    self.createIRWires();

    // specific instruction wires
    self.createFetchInstrWires();
    self.createAluInstrWires();
    self.createLoadInstrWires();
    self.createStoreInstrWires();
    self.createDataInstrWires();
    self.createJmpRInstrWires();
    self.createJmpInstrWires();
    self.createJmpIfInstrWires();
    self.createClfInstrWires();
    self.createIOInstrWires();

    self.createEnableWires();
    self.createSetWires();
    self.createAluWires();


    // labels
    self.createLabels();

    // add stepper wires
    for (var i = 1; i <= 6; ++i) {
        self.addWire(self['stepWire' + i]);
    }

    // add IR wires
    for (var j = 0; j < self.ir.outputs.length; ++j) {
        self.addWire(self['irWire' + j]);
    }

    for (var k = 0; k < self.irDec.outputs.length; ++k) {
        self.addWire(self['andIRDecEWire' + k]);
    }

    var bus = self.createBus();

    return CPU.super_.prototype.init.call(self).then(function () {
        return bus.init();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createIRWires = function () {
    var self = this;

    for (var i = 0; i < self.ir.outputs.length; ++i) {
        self['irWire' + i] = {
            cnn     : [self.ir.outputs[i]],
            segments: []
        };
    }

    self['irWire7'].cnn.push(self.notIR7.inputs[0]);
    self['irWire7'].segments.push([
        self.notIR7.inputs[0],
        {
            left: 527,
            top: 0, relY: true,
            solder: true
        }
    ]);

    var notWire = {
        cnn: [self.notIR7.output],
        segments: []
    };
    for (var k = 0; k < self.irDec.outputs.length; ++k) {
        self.addWire({
            cnn: [
                self.irDec.outputs[k],
                self.children['andIRDecE' + k].inputs[0]
            ],
            segments: [
                [
                    self.irDec.outputs[k],
                    self.children['andIRDecE' + k].inputs[0]
                ]
            ]
        });
        notWire.cnn.push(self.children['andIRDecE' + k].inputs[1]);
        if (k == 7) {
            notWire.segments.push([
                self.children['andIRDecE' + k].inputs[1],
                {
                    left: -3, relX: true,
                    top: 0, relY: true
                },
                'cnn0+'
            ]);
        } else {
            notWire.segments.push([
                self.children['andIRDecE' + k].inputs[1],
                {
                    left: -3, relX: true,
                    top: 0, relY: true,
                    solder: true
                }
            ]);
        }

        self['andIRDecEWire' + k] = {
            cnn     : [self.children['andIRDecE' + k].output],
            segments: []
        };
    }
    self.addWire(notWire);

    // IR 0 - 3 to register decoders
    for (var j = 0; j < 3; ++j) {
        var irWireX = self['irWire' + (6 - (2 - j))];
        irWireX.cnn.push(self.irDec.inputs[j]);
        irWireX.segments.push([
            'cnn0',
            {
                left: 527 + Bus.WIRE_STEP * ((2 - j) + 1),
                top: 0, relY: true
            },
            'cnn' + (irWireX.cnn.length - 1) + '+'
        ]);
    }

    var irWire3 = self['irWire3'];
    var irWire2 = self['irWire2'];
    var irWire1 = self['irWire1'];
    var irWire0 = self['irWire0'];

    irWire3.cnn.push(self.decERegA.inputs[1]);
    irWire3.segments.push([
        self.decERegA.inputs[1],
        {
            left: 527 + Bus.WIRE_STEP * 4,
            top: 0, relY: true,
            solder: true
        }
    ]);

    irWire2.cnn.push(self.decERegA.inputs[0]);
    irWire2.segments.push([
        self.decERegA.inputs[0],
        {
            left: 527 + Bus.WIRE_STEP * 5,
            top: 0, relY: true
        },
        'cnn0+'
    ]);

    irWire1.cnn.push(self.decERegB.inputs[1]);
    irWire1.cnn.push(self.decSRegB.inputs[1]);
    irWire1.segments.push([
        self.decERegB.inputs[1],
        self.decSRegB.inputs[1]
    ]);
    irWire1.segments.push([
        'cnn0',
        {
            left: 527 + Bus.WIRE_STEP * 6,
            top: 'cnn' + (irWire1.cnn.length - 1) + '.top',
            solder: true
        }
    ]);

    irWire0.cnn.push(self.decERegB.inputs[0]);
    irWire0.cnn.push(self.decSRegB.inputs[0]);
    irWire0.segments.push([
        self.decERegB.inputs[0],
        self.decSRegB.inputs[0]
    ]);
    irWire0.segments.push([
        'cnn0',
        {
            left: 527 + Bus.WIRE_STEP * 7,
            top: 'cnn' + (irWire0.cnn.length - 1) + '.top',
            solder: true
        }
    ]);

};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createJmpIfInstrWires = function () {
    var self = this;

    var jmpIfEWire = self['andIRDecEWire5'];
    jmpIfEWire.cnn.push(self.andJMPIFS4.inputs[0]);
    jmpIfEWire.cnn.push(self.andJMPIFS5.inputs[0]);
    jmpIfEWire.cnn.push(self.andJMPIFS6.inputs[1]);

    jmpIfEWire.segments.push([
        'cnn0',
        self.andJMPIFS6.inputs[1]
    ]);

    jmpIfEWire.segments.push([
        self.andJMPIFS4.inputs[0],
        {
            left: 0, relX: true,
            top: 'cnn0.top',
            solder: true
        }
    ]);

    jmpIfEWire.segments.push([
        self.andJMPIFS5.inputs[0],
        {
            left: 0, relX: true,
            top: 'cnn0.top',
            solder: true
        }
    ]);

    self.addWire({
        cnn: [
            self.flags.outputs[0],
            self.andZ.inputs[0]
        ],
        segments: [
            [
                self.flags.outputs[0],
                {
                    left: 590,
                    top: self.height - 190,
                    yFirst: true
                },
                'cnn1+'
            ]
        ]
    });

    var step4Wire = self['stepWire4'];
    step4Wire.cnn.push(self.andJMPIFS4.inputs[1]);
    step4Wire.segments.push([
        self.andJMPIFS4.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    var step5Wire = self['stepWire5'];
    step5Wire.cnn.push(self.andJMPIFS5.inputs[1]);
    step5Wire.segments.push([
        self.andJMPIFS5.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    var step6Wire = self['stepWire6'];
    step6Wire.cnn.push(self.andJMPIFS6.inputs[2]);
    step6Wire.segments.push([
        self.andJMPIFS6.inputs[2],
        'cnn0'
    ]);

    self.addWire({
        cnn: [
            self.andJMPIFS4.output,
            self.orEBus1.inputs[1],
            self.orEIar.inputs[0],
            self.orSMar.inputs[0],
            self.orSAcc.inputs[0]
        ],
        segments: [
            [
                self.andJMPIFS4.output,
                {
                    left: 18, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orEIar.inputs[0],
                {
                    left: 'cnn0.left', offsetX: 18,
                    top: 0, relY: true,
                    solder: true
                }
            ],
            [
                self.orSMar.inputs[0],
                {
                    left: 'cnn0.left', offsetX: 18,
                    top: 0, relY: true,
                    solder: true
                }
            ],
            [
                self.orSAcc.inputs[0],
                {
                    left: 'cnn0.left', offsetX: 18,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.andJMPIFS5.output,
            self.orSIar.inputs[1],
            self.orEAcc.inputs[0]
        ],
        segments: [
            [
                self.andJMPIFS5.output,
                {
                    left: 15, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orEAcc.inputs[0],
                {
                    left: 'cnn0.left', offsetX: 15,
                    top: 0, relY: true,
                    solder: true
                }
            ]

        ]
    });

    self.addWire({
        cnn: [
            self.andJMPIFS6.output,
            self.orERam.inputs[0],
            self.orSIar.inputs[0]
        ],
        segments: [
            [
                self.andJMPIFS6.output,
                {
                    left: 6, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orSIar.inputs[0],
                {
                    left: 'cnn0.left', offsetX: 6,
                    top: 0, relY: true,
                    solder: true
                }
            ]

        ]
    });

    // flags to flag gates
    self.addWire({
        cnn: [
            self.flags.outputs[1],
            self.andE.inputs[0]
        ],
        segments: [
            [
                self.flags.outputs[1],
                {
                    left: 3, relX: true,
                    top: 0, relY: true
                },
                {
                    left: 587,
                    top: self.height - 193,
                    yFirst: true
                },
                'cnn1+'
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.flags.outputs[2],
            self.andA.inputs[0]
        ],
        segments: [
            [
                self.flags.outputs[2],
                {
                    left: 6, relX: true,
                    top: 0, relY: true
                },
                {
                    left: 584,
                    top: self.height - 196,
                    yFirst: true
                },
                'cnn1+'
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.flags.outputs[3],
            self.andC.inputs[0],
            self.alu.carryIn
        ],
        segments: [
            [
                self.flags.outputs[3],
                {
                    left: 9, relX: true,
                    top: 0, relY: true
                },
                {
                    left: 581,
                    top: self.height - 199,
                    yFirst: true
                },
                'cnn1+'
            ],
            [
                self.alu.carryIn,
                'cnn0*'
            ]
        ]
    });

    // flags to andFlag

    var irWire3 = self['irWire3'];
    var irWire2 = self['irWire2'];
    var irWire1 = self['irWire1'];
    var irWire0 = self['irWire0'];

    irWire3.cnn.push(self.andC.inputs[1]);
    irWire3.segments.push([
        self.andC.inputs[1],
        {
            left: 527 + Bus.WIRE_STEP * 4,
            top: 0, relY: true,
            solder: true
        }
    ]);



    irWire2.cnn.push(self.andA.inputs[1]);
    irWire2.segments.push([
        self.andA.inputs[1],
        {
            left: 527 + Bus.WIRE_STEP * 5,
            top: 0, relY: true,
            solder: true
        }
    ]);


    irWire1.cnn.push(self.andE.inputs[1]);
    irWire1.segments.push([
        self.andE.inputs[1],
        {
            left: 527 + Bus.WIRE_STEP * 6,
            top: 0, relY: true,
            solder: true
        }
    ]);

    irWire0.cnn.push(self.andZ.inputs[1]);
    irWire0.segments.push([
        self.andZ.inputs[1],
        {
            left: 527 + Bus.WIRE_STEP * 7,
            top: 0, relY: true,
            solder: true
        }
    ]);

    self.addWire({
        cnn: [
            self.andC.output,
            self.orJmpIf.inputs[3]
        ],
        segments: [
            [
                self.andC.output,
                {
                    left: 5, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.andA.output,
            self.orJmpIf.inputs[2]
        ],
        segments: [
            [
                self.andA.output,
                'cnn1+'
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.andE.output,
            self.orJmpIf.inputs[1]
        ],
        segments: [
            [
                self.andE.output,
                'cnn1+'
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.andZ.output,
            self.orJmpIf.inputs[0]
        ],
        segments: [
            [
                self.andZ.output,
                {
                    left: 5, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createAluWires = function () {
    var self = this;

    for (var i = 0; i < 8; ++i) {
        // tmp to bus1
        self.addWire({
            cnn: [
                self.tmp.outputs[i],
                self.bus1.inputs[i]
            ],
            segment: [
                self.tmp.outputs[i],
                self.bus1.inputs[i]
            ]
        });

        // bus1 to alu inputs b
        self.addWire({
            cnn: [
                self.bus1.outputs[i],
                self.alu.inputsB[i]
            ],
            segment: [
                self.bus1.outputs[i],

                {
                    left: 0, relX: true,
                    top: 25 - i * Bus.WIRE_STEP, relY: true

                },
                self.alu.inputsB[i]
            ]
        });

        // alu outputs to acc inputs
        var basePoint = self.alu.outputs[7].getParentPoint();
        self.addWire({
            cnn: [
                self.alu.outputs[i],
                self.acc.inputs[i]
            ],
            segment: [
                self.alu.outputs[i],
                {
                    left: basePoint.left - 30 + Bus.WIRE_STEP * i,
                    top: self.height - 150 + Bus.WIRE_STEP * i,
                    yFirst: true
                },
                'cnn1+'
            ]
        });
    }

    // alu to flags register
    self.addWire({
        cnn: [
            self.alu.carryOuPin,
            self.flags.inputs[3]
        ],
        segments: [
            [
                self.alu.carryOuPin,
                {
                    left: 280,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.alu.largerPin,
            self.flags.inputs[2]
        ],
        segments: [
            [
                self.alu.largerPin,
                {
                    left: 283,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        ]
    });
    self.addWire({
        cnn: [
            self.alu.equalPin,
            self.flags.inputs[1]
        ],
        segments: [
            [
                self.alu.equalPin,
                {
                    left: 286,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.alu.zeroPin,
            self.flags.inputs[0]
        ],
        segments: [
            [
                self.alu.zeroPin,
                {
                    left: 289,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createLoadInstrGates = function () {
    var self = this;
    var scale = 0.25;

    self.andLDS4 = new AND({
        id   : 'andLDS4',
        title: 'LDS4',
        left : self.stepper.outputs[3].getParentPoint().left + 10,
        top  : self.children['andIRDecE0'].top - 10,
        scale: scale
    });
    self.addChild(self.andLDS4);

    self.andLDS5 = new AND({
        id   : 'andLDS5',
        title: 'LDS5',
        left : self.stepper.outputs[4].getParentPoint().left + 10,
        top  : self.children['andIRDecE0'].top - 10,
        scale: scale
    });
    self.addChild(self.andLDS5);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createStoreInstrGates = function () {
    var self = this;
    var scale = 0.25;

    self.andSTS4 = new AND({
        id   : 'andSTS4',
        title: 'STS4',
        left : self.stepper.outputs[3].getParentPoint().left + 10,
        top  : self.children['andIRDecE1'].top - 10,
        scale: scale
    });
    self.addChild(self.andSTS4);

    self.andSTS5 = new AND({
        id   : 'andSTS5',
        title: 'STS5',
        left : self.stepper.outputs[4].getParentPoint().left + 10,
        top  : self.children['andIRDecE1'].top - 10,
        scale: scale
    });
    self.addChild(self.andSTS5);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createDataInstrGates = function () {
    var self = this;

    var scale = 0.25;
    var dataEnable = self.children['andIRDecE2'];

    self.andDATAS4 = new AND({
        id   : 'andDATAS4',
        title: 'DATAS4',
        left : self.stepper.outputs[3].getParentPoint().left + 10,
        top  : dataEnable.top - 10,
        scale: scale
    });
    self.addChild(self.andDATAS4);

    self.andDATAS5 = new AND({
        id   : 'andDATAS5',
        title: 'DATAS5',
        left : self.stepper.outputs[4].getParentPoint().left + 10,
        top  : dataEnable.top - 10,
        scale: scale
    });
    self.addChild(self.andDATAS5);

    self.andDATAS6 = new AND({
        id   : 'andDATAS6',
        title: 'DATAS6',
        left : self.stepper.outputs[5].getParentPoint().left + 10,
        top  : 0, // to calc
        scale: scale
    });
    self.andDATAS6.top = dataEnable.output.getParentPoint().top - self.andDATAS6.inputs[0].getPoint().top * scale;
    self.addChild(self.andDATAS6);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createJmpRInstrGates = function () {
    var self = this;
    var scale = 0.25;
    var jmpREnable = self.children['andIRDecE3'];

    self.andJMPRS4 = new AND({
        id   : 'andJMPRS4',
        title: 'JMPRS4',
        left : self.stepper.outputs[3].getParentPoint().left + 10,
        top  : jmpREnable.top - 10,
        scale: scale
    });
    self.addChild(self.andJMPRS4);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createClfInstrGates = function () {
    var self = this;
    var scale = 0.25;
    var clfEnable = self.children['andIRDecE6'];

    self.andCLFS4 = new AND({
        id   : 'andCLFS4',
        title: 'CLFS4',
        left : self.stepper.outputs[3].getParentPoint().left + 10,
        top  : clfEnable.top - 10,
        scale: scale
    });
    self.addChild(self.andCLFS4);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createJmpInstrGates = function () {
    var self = this;
    var scale = 0.25;
    var jmpEnable = self.children['andIRDecE4'];

    self.andJMPS4 = new AND({
        id   : 'andJMPS4',
        title: 'JMPS4',
        left : self.stepper.outputs[3].getParentPoint().left + 10,
        top  : jmpEnable.top - 10,
        scale: scale
    });
    self.addChild(self.andJMPS4);

    self.andJMPS5 = new AND({
        id   : 'andJMPS5',
        title: 'JMPS5',
        left : self.stepper.outputs[4].getParentPoint().left + 10,
        top  : jmpEnable.top - 10,
        scale: scale
    });
    self.addChild(self.andJMPS5);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createLoadInstrWires = function () {
    var self = this;

    var loadEWire = self['andIRDecEWire0'];
    loadEWire.cnn.push(self.andLDS4.inputs[0]);
    loadEWire.cnn.push(self.andLDS5.inputs[0]);

    loadEWire.segments.push([
        'cnn0',
        self.andLDS5.inputs[0]
    ]);

    loadEWire.segments.push([
        self.andLDS4.inputs[0],
        {
            left: 0, relX: true,
            top: 'cnn0.top',
            solder: true
        }
    ]);

    var step4Wire = self['stepWire4'];
    step4Wire.cnn.push(self.andLDS4.inputs[1]);
    step4Wire.segments.push([
        self.andLDS4.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    var step5Wire = self['stepWire5'];
    step5Wire.cnn.push(self.andLDS5.inputs[1]);
    step5Wire.segments.push([
        self.andLDS5.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    self.addWire({
        cnn: [
            self.andLDS4.output,
            self.orERegA.inputs[1],
            self.orSMar.inputs[4]
        ],
        segments: [
            [
                self.andLDS4.output,
                {
                    left: 3, relX: true,
                    top: 0, relY: true
                },
                'cnn2+'
            ],
            [
                self.orERegA.inputs[1],
                {
                    left: 'cnn0.left', offsetX: 3,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.andLDS5.output,
            self.orERam.inputs[3],
            self.orSRegB.inputs[2]
        ],
        segments: [
            [
                self.andLDS5.output,
                {
                    left: 3, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orSRegB.inputs[2],
                {
                    left: 'cnn0.left', offsetX: 3,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createStoreInstrWires = function () {
    var self = this;

    var storeEWire = self['andIRDecEWire1'];
    storeEWire.cnn.push(self.andSTS4.inputs[0]);
    storeEWire.cnn.push(self.andSTS5.inputs[0]);

    storeEWire.segments.push([
        'cnn0',
        self.andSTS5.inputs[0]
    ]);

    storeEWire.segments.push([
        self.andSTS4.inputs[0],
        {
            left: 0, relX: true,
            top: 'cnn0.top',
            solder: true
        }
    ]);

    var step4Wire = self['stepWire4'];
    step4Wire.cnn.push(self.andSTS4.inputs[1]);
    step4Wire.segments.push([
        self.andSTS4.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    var step5Wire = self['stepWire5'];
    step5Wire.cnn.push(self.andSTS5.inputs[1]);
    step5Wire.segments.push([
        self.andSTS5.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    self.addWire({
        cnn: [
            self.andSTS4.output,
            self.orERegA.inputs[0],
            self.orSMar.inputs[3]
        ],
        segments: [
            [
                self.andSTS4.output,
                {
                    left: 6, relX: true,
                    top: 0, relY: true
                },
                'cnn2+'
            ],
            [
                self.orERegA.inputs[0],
                {
                    left: 'cnn0.left', offsetX: 6,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.andSTS5.output,
            self.andSRam.inputs[0],
            self.orERegB.inputs[2]
        ],
        segments: [
            [
                self.andSTS5.output,
                {
                    left: 6, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orERegB.inputs[2],
                {
                    left: 'cnn0.left', offsetX: 6,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createJmpInstrWires = function () {
    var self = this;

    var jmpEWire = self['andIRDecEWire4'];

    jmpEWire.cnn.push(self.andJMPS4.inputs[0]);
    jmpEWire.cnn.push(self.andJMPS5.inputs[0]);

    jmpEWire.segments.push([
        'cnn0',
        self.andJMPS5.inputs[0]
    ]);

    jmpEWire.segments.push([
        self.andJMPS4.inputs[0],
        {
            left: 0, relX: true,
            top: 'cnn0.top',
            solder: true
        }
    ]);

    var step4Wire = self['stepWire4'];
    step4Wire.cnn.push(self.andJMPS4.inputs[1]);
    step4Wire.segments.push([
        self.andJMPS4.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    var step5Wire = self['stepWire5'];
    step5Wire.cnn.push(self.andJMPS5.inputs[1]);
    step5Wire.segments.push([
        self.andJMPS5.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    self.addWire({
        cnn: [
            self.andJMPS4.output,
            self.orSMar.inputs[1],
            self.orEIar.inputs[1]
        ],
        segments: [
            [
                self.andJMPS4.output,
                {
                    left: 15, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orEIar.inputs[1],
                {
                    left: 'cnn0.left', offsetX: 15,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.andJMPS5.output,
            self.orERam.inputs[1],
            self.orSIar.inputs[2]
        ],
        segments: [
            [
                self.andJMPS5.output,
                {
                    left: 12, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orSIar.inputs[2],
                {
                    left: 'cnn0.left', offsetX: 12,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createDataInstrWires = function () {
    var self = this;

    var dataEWire = self['andIRDecEWire2'];
    dataEWire.cnn.push(self.andDATAS4.inputs[0]);
    dataEWire.cnn.push(self.andDATAS5.inputs[0]);
    dataEWire.cnn.push(self.andDATAS6.inputs[0]);

    dataEWire.segments.push([
        'cnn0',
        self.andDATAS6.inputs[0]
    ]);

    dataEWire.segments.push([
        self.andDATAS4.inputs[0],
        {
            left: 0, relX: true,
            top: 'cnn0.top',
            solder: true
        }
    ]);

    dataEWire.segments.push([
        self.andDATAS5.inputs[0],
        {
            left: 0, relX: true,
            top: 'cnn0.top',
            solder: true
        }
    ]);

    var step4Wire = self['stepWire4'];
    step4Wire.cnn.push(self.andDATAS4.inputs[1]);
    step4Wire.segments.push([
        self.andDATAS4.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    var step5Wire = self['stepWire5'];
    step5Wire.cnn.push(self.andDATAS5.inputs[1]);
    step5Wire.segments.push([
        self.andDATAS5.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    var step6Wire = self['stepWire6'];
    step6Wire.cnn.push(self.andDATAS6.inputs[1]);
    step6Wire.segments.push([
        self.andDATAS6.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    self.addWire({
        cnn: [
            self.andDATAS4.output,
            self.orEBus1.inputs[2],
            self.orEIar.inputs[2],
            self.orSMar.inputs[2],
            self.orSAcc.inputs[1]
        ],
        segments: [
            [
                self.andDATAS4.output,
                {
                    left: 9, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orEIar.inputs[2],
                {
                    left: 'cnn0.left', offsetX: 9,
                    top: 0, relY: true,
                    solder: true
                }
            ],
            [
                self.orSMar.inputs[2],
                {
                    left: 'cnn0.left', offsetX: 9,
                    top: 0, relY: true,
                    solder: true
                }
            ],
            [
                self.orSAcc.inputs[1],
                {
                    left: 'cnn0.left', offsetX: 9,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.andDATAS5.output,
            self.orERam.inputs[2],
            self.orSRegB.inputs[1]
        ],
        segments: [
            [
                self.andDATAS5.output,
                {
                    left: 9, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orSRegB.inputs[1],
                {
                    left: 'cnn0.left', offsetX: 9,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.andDATAS6.output,
            self.orSIar.inputs[4],
            self.orEAcc.inputs[1]
        ],
        segments: [
            [
                self.andDATAS6.output,
                {
                    left: 3, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orEAcc.inputs[1],
                {
                    left: 'cnn0.left', offsetX: 3,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createJmpRInstrWires = function () {
    var self = this;
    var jmpREWire = self['andIRDecEWire3'];
    jmpREWire.cnn.push(self.andJMPRS4.inputs[0]);
    jmpREWire.segments.push([
        'cnn0',
        self.andJMPRS4.inputs[0]
    ]);

    var step4Wire = self['stepWire4'];
    step4Wire.cnn.push(self.andJMPRS4.inputs[1]);
    step4Wire.segments.push([
        self.andJMPRS4.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    self.addWire({
        cnn: [
            self.andJMPRS4.output,
            self.orSIar.inputs[3],
            self.orERegB.inputs[1]
        ],
        segments: [
            [
                self.andJMPRS4.output,
                {
                    left: 12, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orERegB.inputs[1],
                {
                    left: 'cnn0.left', offsetX: 12,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createIOInstrWires = function () {
    var self = this;
    var ioEWire = self['andIRDecEWire7'];

    ioEWire.cnn.push(self.andIOS4.inputs[1]);
    ioEWire.cnn.push(self.andIOS5.inputs[1]);
    ioEWire.segments.push([
        'cnn0',
        self.andIOS5.inputs[1]
    ]);
    ioEWire.segments.push([
        self.andIOS4.inputs[1],
        {
            left: -5, relX: true,
            top: 'cnn0.top',
            solder: true
        }
    ]);

    var step4Wire = self['stepWire4'];
    step4Wire.cnn.push(self.andIOS4.inputs[2]);
    step4Wire.segments.push([
        self.andIOS4.inputs[2],
        'cnn0'
    ]);

    var step5Wire = self['stepWire5'];
    step5Wire.cnn.push(self.andIOS5.inputs[2]);
    step5Wire.segments.push([
        self.andIOS5.inputs[2],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    self.addWire({
        cnn: [
            self.notIR3.output,
            self.andIOS5.inputs[0]
        ],
        segments: [
            [
                self.notIR3.output,
                'cnn1+'
            ]
        ]
    });

    var irWire3 = self['irWire3'];
    irWire3.cnn.push(self.notIR3.inputs[0]);
    irWire3.segments.push([
        'cnn0',
        {
            left: 527 + Bus.WIRE_STEP * 4,
            top: 'cnn' + (irWire3.cnn.length - 1) +'.top'
        },
        self.notIR3.inputs[0]
    ]);
    irWire3.cnn.push(self.andIOS4.inputs[0]);
    irWire3.segments.push([
        self.andIOS4.inputs[0],
        {
            left: 0, relX: true,
            top: 'cnn' + (irWire3.cnn.length - 2) +'.top',
            solder: true
        }
    ]);

    irWire3.cnn.push(self.ioPin);
    irWire3.segments.push([
        {
            left: 527 + Bus.WIRE_STEP * 4,
            top: self.height - 300,
            solder: true
        },
        {
            left: self.width - 6,
            top: 0, relY: true
        },
        'cnn' + (irWire3.cnn.length - 1) + '+'
    ]);

    var irWire2 = self['irWire2'];
    irWire2.cnn.push(self.ioDataAddrPin);
    irWire2.segments.push([
        {
            left: 527 + Bus.WIRE_STEP * 5,
            top: self.height - 130,
            solder: true
        },
        {
            left: self.width - 6,
            top: 0, relY: true
        },
        'cnn' + (irWire2.cnn.length - 1) + '+'
    ]);

    self.addWire({
        cnn: [
            self.andIOS4.output,
            self.orERegB.inputs[0],
            self.andSIO.inputs[0]
        ],
        segments: [
            [
                self.andIOS4.output,
                {
                    left: 24, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.andSIO.inputs[0],
                {
                    left: 'cnn0.left', offsetX: 24,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.andIOS5.output,
            self.andEIOClkE.inputs[0],
            self.orSRegB.inputs[0]
        ],
        segments: [
            [
                self.andIOS5.output,
                {
                    left: 18, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orSRegB.inputs[0],
                {
                    left: 'cnn0.left', offsetX: 18,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.andSIO.output,
            self.sIOPin
        ],
        segments: [
            [
                self.andSIO.output,
                {
                    left: self.width - 6,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        ]
    });


    self.addWire({
        cnn: [
            self.andEIOClkE.output,
            self.eIOPin
        ],
        segments: [
            [
                self.andEIOClkE.output,
                {
                    left: 363,
                    top: self.height - 142
                },
                {
                    left: self.width - 9,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        ]
    })
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createClfInstrWires = function () {
    var self = this;
    var clfEWire = self['andIRDecEWire6'];
    clfEWire.cnn.push(self.andCLFS4.inputs[0]);
    clfEWire.segments.push([
        'cnn0',
        self.andCLFS4.inputs[0]
    ]);

    var step4Wire = self['stepWire4'];
    step4Wire.cnn.push(self.andCLFS4.inputs[1]);
    step4Wire.segments.push([
        self.andCLFS4.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    self.addWire({
        cnn: [
            self.andCLFS4.output,
            self.orEBus1.inputs[0],
            self.orSFlags.inputs[1]
        ],
        segments: [
            [
                self.andCLFS4.output,
                {
                    left: 21, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orSFlags.inputs[1],
                {
                    left: 'cnn0.left', offsetX: 21,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createAluInstrGates = function () {
    var self = this;

    var scale = 0.25;
    var stepGatesTop = 405;

    self.andALS4 = new AND({
        id   : 'andALS4',
        title: 'ALS4',
        left : self.stepper.outputs[3].getParentPoint().left + 10,
        top  : stepGatesTop,
        scale: scale
    });
    self.addChild(self.andALS4);

    self.andALS5 = new AND({
        id   : 'andALS5',
        title: 'ALS5',
        left : self.stepper.outputs[4].getParentPoint().left + 10,
        top  : stepGatesTop,
        scale: scale
    });
    self.addChild(self.andALS5);

    self.andALS6 = new AND({
        id        : 'andALS6',
        title     : 'ALS6',
        left      : self.stepper.outputs[5].getParentPoint().left + 10,
        top       : stepGatesTop + 10,
        inputCount: 3,
        scale     : scale
    });
    self.addChild(self.andALS6);


    var baseTop = self.height - 157;
    var baseLeft = 485;
    var step = 15;
    for (var i = 0; i < 3; ++i) {
        var andOp = new AND({
            id        : 'andOp' + i,
            left      : baseLeft,
            title     : 'OP' + i,
            top       : baseTop - step * i,
            flip      : true,
            inputCount: 3,
            scale     : scale
        });
        self.addChild(andOp);
    }

    self.andOpCMP = new AND({
        id        : 'andOpCMP',
        title     : 'CMP',
        left      : 570,
        top       : self.children['andOp1'].inputs[0].getParentPoint().top - 25 * scale,
        inputCount: 3,
        scale     : scale
    });
    self.addChild(self.andOpCMP);

    self.notOpCMP = new NOT({
        id   : 'notOpCMP',
        title: 'NCMP',
        left : self.andOpCMP.left + 30,
        top  : self.andOpCMP.top,
        scale: scale
    });
    self.addChild(self.notOpCMP);

};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createJmpIfInstrGates = function () {
    var self = this;

    var scale    = 0.25;
    var jmpIfEnable = self.children['andIRDecE5'];

    self.andJMPIFS4 = new AND({
        id   : 'andJMPIFS4',
        title: 'JMPIFS4',
        left : self.stepper.outputs[3].getParentPoint().left + 10,
        top  : jmpIfEnable.top - 10,
        scale: scale
    });
    self.addChild(self.andJMPIFS4);

    self.andJMPIFS5 = new AND({
        id   : 'andJMPIFS5',
        title: 'JMPIFS5',
        left : self.stepper.outputs[4].getParentPoint().left + 10,
        top  : jmpIfEnable.top - 10,
        scale: scale
    });
    self.addChild(self.andJMPIFS5);

    self.andJMPIFS6 = new AND({
        id   : 'andJMPIFS6',
        title: 'JMPIFS6',
        left : self.stepper.outputs[5].getParentPoint().left + 10,
        top  : jmpIfEnable.top, // to calc
        scale: scale,
        inputCount: 3
    });
    self.addChild(self.andJMPIFS6);

    var flagTop  = self.height - 260;
    var flagStep = 17;

    self.andC = new AND({
        id   :'andC',
        title: 'C',
        left : 600,
        top  : flagTop,
        scale: scale
    });
    self.addChild(self.andC);

    self.andA = new AND({
        id   :'andA',
        title: 'A',
        left : 600,
        top  : flagTop + flagStep,
        scale: scale
    });
    self.addChild(self.andA);

    self.andE = new AND({
        id   :'andE',
        title: 'E',
        left : 600,
        top  : flagTop + flagStep * 2,
        scale: scale
    });
    self.addChild(self.andE);

    self.andZ = new AND({
        id   :'andZ',
        title: 'Z',
        left : 600,
        top  : flagTop + flagStep * 3,
        scale: scale
    });
    self.addChild(self.andZ);

    self.orJmpIf = new OR({
        id: 'orJmpIf',
        title: 'JMPIF',
        left: 650,
        top: flagTop + (flagStep * 3  + 50 * scale) / 2 - 25 * scale,
        scale: scale,
        inputCount: 4
    });
    self.addChild(self.orJmpIf);

    self.addWire({
        cnn: [
            self.orJmpIf.output,
            self.andJMPIFS6.inputs[0]
        ],
        segments: [
            [
                self.orJmpIf.output,
                {
                    left: 'cnn1.left', offsetX: -5,
                    top: 'cnn1.top'
                },
                self.andJMPIFS6.inputs[0]
            ]
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createIOInstrGates = function () {
    var self = this;

    var scale = 0.25;
    var ioEnable = self.children['andIRDecE7'];

    self.andIOS4 = new AND({
        id: 'andIOS4',
        title: 'IOS4',
        left: self.stepper.outputs[3].getParentPoint().left + 10,
        top: ioEnable.top - 10,
        scale: scale,
        inputCount: 3
    });
    self.addChild(self.andIOS4);

    self.andIOS5 = new AND({
        id: 'andIOS5',
        title: 'IOS5',
        left: self.stepper.outputs[4].getParentPoint().left + 10,
        top: ioEnable.top,
        scale: scale,
        inputCount: 3
    });
    self.addChild(self.andIOS5);

    self.notIR3 = new NOT({
        id   : 'notIR3',
        title: 'IR3',
        left : self.andIOS4.left + 20,
        top  : self.andIOS4.top + 32,
        scale: scale
    });
    self.addChild(self.notIR3);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createIRGates = function () {
    var self = this;

    var scale = 0.25;

    self.irDec = new Decoder({
        id        : 'irDec',
        title     : 'IRDec',
        inputCount: 3,
        left      : 545,
        top       : 443,
        height    : 700,
        pinMargin : {
            left: 0.44,
            right: 0.08
        },
        scale     : scale,
        reversed : true
    });
    self.addChild(self.irDec);
    var outPins     = ['LD', 'ST', 'DATA', 'JMPR', 'JMP', 'JMPIF', 'CLF', 'I/O'];
    var enableGates = ['ELD', 'EST', 'EDATA', 'EJMPR', 'EJMP', 'EJMPIF', 'ECLF', 'EIO'];

    for (var j = 0; j < self.irDec.outputs.length; ++j) {
        self.irDec.outputs[j].title = outPins[j];
        var andIRDecE = new AND({
            id: 'andIRDecE' + j,
            title: enableGates[j],
            left: self.irDec.left + 70,
            top: 0, // to calc
            scale: scale
        });
        andIRDecE.top = self.irDec.outputs[j].getParentPoint().top - andIRDecE.inputs[0].getPoint().top * scale;
        self.addChild(andIRDecE);
    }

    self.notIR7 = new NOT({
        id   : 'notIR7',
        title: 'IR7',
        left : self.irDec.left,
        top  : self.irDec.top - 18,
        scale: scale
    });
    self.addChild(self.notIR7);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createLabels = function () {
    var self = this;

    var enableLabelLeft = 400;

    var orEBus1Label = new Label({
        left    : enableLabelLeft,
        top     : self.orEBus1.top - 7,
        title   : 'Bus 1',
        fontSize: 10
    });
    self.addChild(orEBus1Label);

    var andERamLabel = new Label({
        left    : enableLabelLeft,
        top     : self.andERam.top - 7,
        title   : 'RAM',
        fontSize: 10
    });
    self.addChild(andERamLabel);

    var andEAccLabel = new Label({
        left    : enableLabelLeft,
        top     : self.andEAcc.top - 7,
        title   : 'ACC',
        fontSize: 10
    });
    self.addChild(andEAccLabel);

    var orERegBLabel = new Label({
        left    : self.orERegB.left - 30,
        top     : self.orERegB.top - 9,
        title   : 'Reg B',
        fontSize: 10
    });
    self.addChild(orERegBLabel);

    var orERegALabel = new Label({
        left    : self.orERegA.left - 30,
        top     : self.orERegA.top - 9,
        title   : 'Reg A',
        fontSize: 10
    });
    self.addChild(orERegALabel);

    var andEIarLabel = new Label({
        left    : enableLabelLeft,
        top     : self.andEIar.top - 7,
        title   : 'IAR',
        fontSize: 10
    });
    self.addChild(andEIarLabel);

    var andEIOClkELabel = new Label({
        left    : enableLabelLeft,
        top     : self.andEIOClkE.top - 7,
        title   : 'I/O',
        fontSize: 10
    });
    self.addChild(andEIOClkELabel);

    var orSRegBLabel = new Label({
        left    : self.orSRegB.left + 12,
        top     : self.orSRegB.top - 9,
        title   : 'Reg B',
        fontSize: 10
    });
    self.addChild(orSRegBLabel);

    var andSIrLabel = new Label({
        left    : self.andSIr.left + 20,
        top     : self.andSIr.top - 9,
        title   : 'IR',
        fontSize: 10
    });
    self.addChild(andSIrLabel);

    var andSMarLabel = new Label({
        left    : self.andSMar.left + 20,
        top     : self.andSMar.top - 9,
        title   : 'MAR',
        fontSize: 10
    });
    self.addChild(andSMarLabel);

    var andSIarLabel = new Label({
        left    : self.andSIar.left + 20,
        top     : self.andSIar.top - 9,
        title   : 'IAR',
        fontSize: 10
    });
    self.addChild(andSIarLabel);

    var andSAccLabel = new Label({
        left    : self.andSAcc.left + 20,
        top     : self.andSAcc.top - 9,
        title   : 'ACC',
        fontSize: 10
    });
    self.addChild(andSAccLabel);

    var andSRamLabel = new Label({
        left    : self.andSRam.left + 20,
        top     : self.andSRam.top - 9,
        title   : 'RAM',
        fontSize: 10
    });
    self.addChild(andSRamLabel);

    var andSTmpLabel = new Label({
        left    : self.andSTmp.left + 20,
        top     : self.andSTmp.top - 9,
        title   : 'TMP',
        fontSize: 10
    });
    self.addChild(andSTmpLabel);

    var andSFlagsLabel = new Label({
        left    : self.andSFlags.left + 20,
        top     : self.andSFlags.top - 9,
        title   : 'Flags',
        fontSize: 10
    });
    self.addChild(andSFlagsLabel);

    var andSIOLabel = new Label({
        left    : self.andSIO.left + 20,
        top     : self.andSIO.top - 9,
        title   : 'I/O',
        fontSize: 10
    });
    self.addChild(andSIOLabel);

};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createSetGates = function () {
    var self = this;

    var baseTop   = 197;
    var baseLeft  = self.width - 110;
    var step      = 25;
    var scale     = 0.25;
    var regOffset = 160;

    // IR
    self.andSIr = new AND({
        id   : 'andSIr',
        title: 'sIR',
        left : baseLeft,
        top  : baseTop,
        scale: scale
    });
    self.addChild(self.andSIr);

    // MAR
    self.andSMar = new AND({
        id   : 'andSMar',
        title: 'sMAR',
        left : baseLeft,
        top  : baseTop + step,
        scale: scale
    });
    self.addChild(self.andSMar);

    self.orSMar = new OR({
        id        : 'orSMar',
        title     : 'MAR',
        left      : baseLeft - 55,
        top       : self.andSMar.inputs[0].getParentPoint().top - 50 / 2 * scale,
        scale     : scale,
        inputCount: 6,
        pinMargin : 0.1
    });
    self.addChild(self.orSMar);

    // IAR
    self.andSIar = new AND({
        id   : 'andSIar',
        title: 'sIAR',
        left : baseLeft,
        top  : baseTop + step * 2,
        scale: scale
    });
    self.addChild(self.andSIar);

    self.orSIar = new OR({
        id        : 'orSIar',
        title     : 'IAR',
        left      : baseLeft - 55,
        top       : self.andSIar.inputs[0].getParentPoint().top - 50 / 2 * scale,
        scale     : scale,
        pinMargin : 0.1,
        inputCount: 6
    });
    self.addChild(self.orSIar);

    // ACC
    self.andSAcc = new AND({
        id   : 'andSAcc',
        title: 'sACC',
        left : baseLeft,
        top  : baseTop + step * 3,
        scale: scale
    });
    self.addChild(self.andSAcc);

    self.orSAcc = new OR({
        id        : 'orSAcc',
        title     : 'ACC',
        left      : baseLeft - 55,
        top       : self.andSAcc.inputs[0].getParentPoint().top - 50 / 2 * scale,
        scale     : scale,
        inputCount: 4
    });
    self.addChild(self.orSAcc);

    // RAM
    self.andSRam = new AND({
        id   : 'andSRam',
        title: 'sRAM',
        left : baseLeft,
        top  : baseTop + step * 4,
        scale: scale
    });
    self.addChild(self.andSRam);

    // TMP
    self.andSTmp = new AND({
        id   : 'andSTmp',
        title: 'sTMP',
        left : baseLeft,
        top  : baseTop + step * 5,
        scale: scale
    });
    self.addChild(self.andSTmp);

    // Flags
    self.andSFlags = new AND({
        id   : 'andSFlags',
        title: 'sFlags',
        left :  baseLeft,
        top  :  baseTop + step * 6,
        scale:  scale
    });
    self.addChild(self.andSFlags);

    self.orSFlags = new OR({
        id   : 'orSFlags',
        title: 'Flags',
        left : baseLeft - 55,
        top  : self.andSFlags.inputs[0].getParentPoint().top - 50 / 2 * scale,
        scale: scale
    });
    self.addChild(self.orSFlags);


    // andSIO
    self.andSIO = new AND({
        id   : 'andSIO',
        title: 'sIO',
        left :  baseLeft,
        top  :  baseTop + step * 7,
        scale:  scale
    });
    self.addChild(self.andSIO);

    self.orSRegB = new OR({
        id        : 'orSRegB',
        title     : 'RegB',
        left      : baseLeft - 55,
        top       : self.orSFlags.top + step * 2,
        scale     : scale,
        inputCount: 4
    });
    self.addChild(self.orSRegB);

    for (var i = 0; i < 4; ++i) {
        var ri = 3 - i;
        var andSRB = new AND({
            id        : 'andSRB' + i,
            title     : 'sRB' + i,
            left      : baseLeft,
            top       : 445 + step * (3 + ri) + 70,
            scale     : scale,
            inputCount: 3
        });
        self.addChild(andSRB);
    }

    // dec set RegB
    self.decSRegB = new Decoder({
        id        : 'decSRegB',
        title     : 'SRegB',
        left      : baseLeft - 68,
        top       : self.children['andSRB2'].top + 2,
        inputCount: 2,
        scale     : 0.2,
        pinMargin : {
            right: 0.25,
            left: 0.4
        }
    });
    self.addChild(self.decSRegB);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createFetchInstrWires = function () {
    var self = this;

    // step 1 - step3 are the same for all instruction types

    // step 1:
    //   MAR = IAR
    //   ACC = Bus1 (1) + IAR

    var stepWire1 = self['stepWire1'];

    stepWire1.cnn.push(self.orEBus1.inputs[3]);
    stepWire1.cnn.push(self.orEIar.inputs[3]);
    stepWire1.cnn.push(self.orSMar.inputs[5]);
    stepWire1.cnn.push(self.orSAcc.inputs[3]);

    // enable bus 1
    stepWire1.segments.push([
        self.orEBus1.inputs[3],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    // and enable IAR (last Step1 connection)
    stepWire1.segments.push([
        self.orEIar.inputs[3],
        {
            left: 'cnn0.left',
            top: 0, relY: true
        },
        'cnn0'
    ]);

    // set the current value of IAR to MAR
    stepWire1.segments.push([
        self.orSMar.inputs[5],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    // save the ALU result to ACC = IAR + Bus1
    stepWire1.segments.push([
        self.orSAcc.inputs[3],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    // step 2: IR = RAM

    var stepWire2 = self['stepWire2'];

    stepWire2.cnn.push(self.andSIr.inputs[0]);
    stepWire2.cnn.push(self.orERam.inputs[4]);

    // enable RAM to bus
    // last step2 cnn: orERam
    stepWire2.segments.push([
        self.orERam.inputs[4],
        {
            left: 'cnn0.left',
            top: 0, relY: true
        },
        'cnn0'
    ]);

    // save the value from RAM to IR
    stepWire2.segments.push([
        self.andSIr.inputs[0],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    // step 3: IAR = ACC

    var stepWire3 = self['stepWire3'];

    stepWire3.cnn.push(self.orEAcc.inputs[3]);
    stepWire3.cnn.push(self.orSIar.inputs[5]);

    // set IAR from ACC
    stepWire3.segments.push([
        self.orSIar.inputs[5],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    // enable ACC to bus
    stepWire3.segments.push([
        self.orEAcc.inputs[3],
        {
            left: 'cnn0.left',
            top: 0, relY: true
        },
        'cnn0'
    ]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createAluInstrWires = function () {
    var self = this;

    var stepWire4 = self['stepWire4'];
    var stepWire5 = self['stepWire5'];
    var stepWire6 = self['stepWire6'];

    // step 4
    stepWire4.cnn.push(self.andALS4.inputs[1]);

    // andALS4
    stepWire4.segments.push([
        self.andALS4.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
        //'cnn0'
    ]);

    // step 5
    stepWire5.cnn.push(self.andALS5.inputs[1]);

    // andALS5
    stepWire5.segments.push([
        self.andALS5.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    var baseCnnIndex = stepWire5.cnn.length;
    for (var i = 0; i < 3; ++i) {

        stepWire5.cnn.push(self.children['andOp' + i].inputs[2]);
        if (i == 0) {
            stepWire5.segments.push([
                self.children['andOp' + i].inputs[2],
                {
                    left: 5, relX: true,
                    top : 'cnn' + (baseCnnIndex + 2) + '.top'
                },
                {
                    left: 'cnn0.left',
                    top: 0, relY: true
                },
                'cnn0'
            ]);

        } else {
            stepWire5.segments.push([
                self.children['andOp' + i].inputs[2],
                {
                    left: 5, relX: true,
                    top: 0, relY: true,
                    solder: true
                }
            ]);
        }
    }

    // step 6
    stepWire6.cnn.push(self.andALS6.inputs[2]);

    // andALS6
    stepWire6.segments.push([
        self.andALS6.inputs[2],
        {
            left  : 'cnn0.left',
            top   : 0, relY: true,
            solder: true
        }
    ]);

    var irWire7 = self['irWire7'];

    // step 7
    irWire7.cnn.push(self.andALS6.inputs[1]);
    irWire7.segments.push([
        self.ir.outputs[7],
        {
            left: 527,
            top: 0, relY: true
        },
        'cnn' + (irWire7.cnn.length - 1) + '+'
    ]);

    irWire7.cnn.push(self.andALS4.inputs[0]);
    irWire7.segments.push([
        self.andALS4.inputs[0],
        {
            left: 0, relX: true,
            top: 'cnn' + (irWire7.cnn.length - 2) + '.top',
            solder: true
        }
    ]);

    irWire7.cnn.push(self.andALS5.inputs[0]);
    irWire7.segments.push([
        self.andALS5.inputs[0],
        {
            left: 0, relX: true,
            top: 'cnn' + (irWire7.cnn.length - 3) + '.top',
            solder: true
        }
    ]);



    for (var j = 0; j < 3; ++j) {
        // step 7
        irWire7.cnn.push(self.children['andOp' + j].inputs[1]);
        irWire7.segments.push([
            self.children['andOp' + j].inputs[1],
            {
                left: 527,
                top: 0, relY: true,
                solder: true
            }
        ]);

        var irWireX = self['irWire' + (6 - (2 - j))];
        irWireX.cnn.push(self.children['andOp' + j].inputs[0]);
        irWireX.cnn.push(self.andOpCMP.inputs[j]);
        irWireX.segments.push([
            self.children['andOp' + j].inputs[0],
            self.andOpCMP.inputs[j]
        ]);
        irWireX.segments.push([
            self.children['andOp' + j].inputs[0],
            {
                left: 527 + (3 - j) * Bus.WIRE_STEP,
                top: 0, relY: true,
                solder: true
            }
        ]);

        // andOp to alu op
        self.addWire({
            cnn: [
                self.children['andOp' + j].output,
                self.alu.op[j]
            ],
            segments: [
                [
                    self.children['andOp' + j].output,
                    {
                        left: 260 + Bus.WIRE_STEP * j,
                        top : 0, relY: true
                    },
                    'cnn1+'
                ]
            ]
        });
    }
    self.addWire({
        cnn: [
            self.andOpCMP.output,
            self.notOpCMP.inputs[0]
        ],
        segments: [
            [
                self.andOpCMP.output,
                self.notOpCMP.inputs[0]
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.notOpCMP.output,
            self.andALS6.inputs[0]
        ],
        segments: [
            [
                self.notOpCMP.output,
                {
                    left: 'cnn1.left', offsetX: -8,
                    top: 'cnn1.top'
                },
                self.andALS6.inputs[0]
            ]
        ]
    });



    // RegA to ACC
    self.addWire({
        cnn: [
            self.andALS5.output,
            self.orSAcc.inputs[2],
            self.orERegA.inputs[2],
            self.orSFlags.inputs[0]
        ],
        segments: [
            [
                self.andALS5.output,
                'cnn1+'
            ],
            [
                self.orERegA.inputs[2],
                {
                    left: 'cnn0.left',
                    top: 0, relY: true,
                    solder: true
                }
            ],
            [
                self.orSFlags.inputs[0],
                {
                    left: 'cnn0.left',
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.orEAcc.inputs[2],
            self.orSRegB.inputs[3],
            self.andALS6.output
        ],
        segments: [
            [
                self.orEAcc.inputs[2],
                self.andALS6.output
            ],
            [
                self.orSRegB.inputs[3],
                {
                    left  : 'cnn2.left',
                    top   : 0, relY: true,
                    solder: true
                }

            ]
        ]
    });

    self.addWire({
        cnn: [
            self.andALS4.output,
            self.orERegB.inputs[3],
            self.andSTmp.inputs[0]
        ],
        segments: [
            [
                self.andALS4.output,
                'cnn2+'
            ],
            [
                self.orERegB.inputs[3],
                {
                    left: 'cnn0.left',
                    top: 0, relY: true,
                    solder: true
                }

            ]
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createEnableGates = function () {
    var self = this;

    var baseTop  = 232;
    var baseLeft = 430;
    var step     = 25;
    var scale    = 0.25;

    // bus1
    self.orEBus1 = new OR({
        id        :'orEBus1',
        title     :'Bus1',
        left      : baseLeft + 60,
        top       : baseTop - step + 3,
        scale     : scale,
        inputCount: 4,
        flip      : true
    });
    self.addChild(self.orEBus1);

    // ram
    self.andERam = new AND({
        id   : 'andERam',
        title: 'eRAM',
        left : baseLeft,
        top  : baseTop,
        scale: scale,
        flip : true
    });
    self.addChild(self.andERam);

    self.orERam = new OR({
        id        : 'orERam',
        title     : 'RAM',
        left      : baseLeft + 60,
        top       : self.andERam.inputs[0].getParentPoint().top - 50 / 2 * scale,
        scale     : scale,
        inputCount: 5,
        pinMargin : 0.1,
        flip      : true
    });
    self.addChild(self.orERam);

    // acc
    self.andEAcc = new AND({
        id   : 'andEAcc',
        title: 'eACC',
        left : baseLeft,
        top  : baseTop + step,
        scale: scale,
        flip : true
    });
    self.addChild(self.andEAcc);

    self.orEAcc = new OR({
        id        : 'orEAcc',
        title     : 'ACC',
        left      : baseLeft + 60,
        top       : self.andEAcc.inputs[0].getParentPoint().top - 50 / 2 * scale,
        scale     : scale,
        inputCount: 4,
        flip      : true
    });
    self.addChild(self.orEAcc);

    // iar
    self.andEIar = new AND({
        id   : 'andEIar',
        title: 'eIAR',
        left : baseLeft,
        top  : baseTop + step * 2,
        scale: scale,
        flip : true
    });
    self.addChild(self.andEIar);

    self.orEIar = new OR({
        id        : 'orEIar',
        title     :'IAR',
        left      : baseLeft + 60,
        top       : self.andEIar.inputs[0].getParentPoint().top - 50 / 2 * scale,
        scale     : scale,
        inputCount: 4,
        flip      : true
    });
    self.addChild(self.orEIar);

    // I/O Clk E
    self.andEIOClkE = new AND({
        id   : 'andEIOClkE',
        title: 'eIO',
        left : baseLeft,
        top  : baseTop + step * 3,
        scale: scale,
        flip : true
    });
    self.addChild(self.andEIOClkE);

    // regB
    self.orERegB = new OR({
        id        : 'orERegB',
        title     : 'RegB',
        left      : baseLeft + 60,
        top       : self.orEIar.top + step * 2,
        scale     : scale,
        inputCount: 4,
        flip      : true
    });
    self.addChild(self.orERegB);

    // regA
    self.orERegA = new OR({
        id        :'orERegA',
        title     :'RegA',
        left      : baseLeft + 60,
        top       : self.orERegB.top + step,
        scale     : scale,
        inputCount: 3,
        flip      : true
    });
    self.addChild(self.orERegA);

    for (var i = 0; i < 4; ++i) {
        var ri = 3 - i;

        var andERB = new AND({
            id        : 'andERB' + i,
            title     : 'eRB' + i,
            left      : baseLeft,
            top       : 445 + step * (3 + ri) + 70,
            scale     : scale,
            flip      : true,
            inputCount: 3
        });
        self.addChild(andERB);

        var andERA = new AND({
            id        : 'andERA' + i,
            title     : 'eRA' + i,
            left      : baseLeft,
            top       : 445 + step * (7 + ri) + 70,
            scale     : scale,
            flip      : true,
            inputCount: 3
        });
        self.addChild(andERA);

        var orER = new OR({
            id   : 'orER' + i,
            title: 'eR' + i,
            left : baseLeft - 40,
            top  : andERB.top,
            scale: scale,
            flip : true
        });
        orER.top = andERB.output.getParentPoint().top - orER.inputs[1].getPoint().top * scale;
        self.addChild(orER);
    }

    // dec RegB
    self.decERegB = new Decoder({
        id        : 'decERegB',
        title     : 'ERegB',
        left      : baseLeft + 55,
        top       : self.children['andERB2'].top + 2,
        inputCount: 2,
        scale     : 0.2,
        flip      : true,
        pinMargin : {
            left: 0.25,
            right: 0.4
        }
    });
    self.addChild(self.decERegB);

    // dec RegB
    self.decERegA = new Decoder({
        id        : 'decERegA',
        title     : 'ERegA',
        left      : baseLeft + 55,
        //top       : baseTop + step * 8 + 73 ,
        top       : self.children['andERA2'].top + 2,
        inputCount: 2,
        scale     : 0.2,
        flip      : true,
        pinMargin : {
            left: 0.25,
            right: 0.4
        }
    });
    self.addChild(self.decERegA);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createBus = function () {
    var self = this;
    var busOptions = {
        parent: self,
        title: 'cpuBus',
        cnn: [
            self.data,        // 0
            self.alu.inputsA, // 1
            self.tmp.inputs,  // 2
            self.acc.outputs, // 3
            self.iar.data,    // 4
            self.ir.inputs,   // 5
            self.children['r0'].data,     // 6
            self.children['r1'].data,     // 7
            self.children['r2'].data,     // 8
            self.children['r3'].data      // 9
        ],
        segments: [
            [
                self.data,
                {
                    left: self.width - 20,
                    top: self.height - 20,
                    yFirst: true,
                    align: 'left',
                    flip: true
                },
                {
                    top: self.height - 50,
                    left: self.width - 20,
                    align: 'right'
                },
                {
                    top: self.height - 50,
                    left: 20,
                    align: 'right'
                },
                {
                    top: 25,
                    left: 20,
                    align: 'left',
                    flip: true
                },
                {
                    top: 25,
                    left: self.width - 200,
                    align: 'right',
                    flip: true
                },
                'cnn9+' // self.children['r3'].data
            ],
            [
                self.alu.inputsA,
                {
                    left : 20,
                    top  : 0, relY: true,
                    align: 'x',
                    flip: true,
                    solder: true
                }
            ],
            [
                self.tmp.inputs,
                {
                    left: 20,
                    top: 0, relY: true,
                    align: 'x',
                    flip: true,
                    solder: true
                }
            ],
            [
                self.acc.outputs,
                {
                    left  : 200,
                    top   : self.height - 50,
                    align : 'right',
                    solder: true
                }
            ],
            [
                self.iar.data,
                {
                    left  : 430,
                    top   : self.height - 50,
                    align : 'right',
                    solder: true
                }
            ],
            [
                self.ir.inputs,
                {
                    left  : 470,
                    top   : self.height - 50,
                    align : 'left',
                    solder: true
                }
            ],
            [
                self.children['r0'].data,
                {
                    left: self.children['r0'].left + 55,
                    top: 25,
                    align: 'right',
                    flip: true,
                    solder: true
                }

            ],
            [
                self.children['r1'].data,
                {
                    left: self.children['r1'].left + 55,
                    top: 25,
                    align: 'right',
                    flip: true,
                    solder: true
                }

            ],
            [
                self.children['r2'].data,
                {
                    left: self.children['r2'].left + 55,
                    top: 25,
                    align: 'right',
                    flip: true,
                    solder: true
                }

            ]
        ]
    };

    var bus = new Bus(busOptions);
    self.buses.push(bus);
    return bus
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createALU = function () {
    var self = this;
    var alu = self.alu = new ALU({
        id   : 'alu',
        left : 60,
        top  : 285,
        scale: 0.3
    });
    self.addChild(alu);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createRegisters = function () {
    var self = this;
    var scale = 0.1;

    // GPR r0-r3
    for (var i = 0; i < 4; ++i) {
        var reg = new BusReg({
            id   : 'r' + i,
            title: 'R' + i,
            left : 400 + 80 * i,
            top  : 45,
            scale: scale
        });
        self.addChild(reg);
    }

    // tmp
    self.tmp = new Byte({
        id   : 'tmp',
        title: 'TMP',
        left : 80,
        top  : 45,
        scale: scale,
        width: 250
    });
    self.addChild(self.tmp);

    // bus1
    self.bus1 = new Bus1({
        id   : 'bus1',
        left : 160,
        top  : 200,
        scale: 0.1
    });
    self.addChild(self.bus1);

    // ACC accumulator
    self.acc = new Register({
        id   : 'acc',
        title: 'ACC',
        left : 150,
        top  : self.height - 110,
        scale: scale
    });
    self.addChild(self.acc);

    // IAR instruction address register
    self.iar = new BusReg({
        id   : 'iar',
        title: 'IAR',
        left : 375,
        top  : self.height - 140,
        scale: scale
    });
    self.addChild(self.iar);

    // IR instruction register
    self.ir = new Byte({
        id   : 'ir',
        title: 'IR',
        left : 490,
        top  : self.height - 135,
        scale: scale,
        width: 250
    });
    self.addChild(self.ir);

    // flags register
    self.flags = new Byte({
        id       :'flags',
        title    : 'F',
        left     : 300,
        top      : 500,
        scale    : 0.2,
        cellCount: 4,
        height   : 400
    });
    var flagTitles = ['Z', 'E', 'A', 'C'];
    flagTitles.forEach(function (char, index) {
        self.flags.inputs[index].title  = char;
        self.flags.outputs[index].title = char;
    });
    self.addChild(self.flags);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createSetWires = function () {
    var self = this;

    var baseLeft  = self.andSIr.left;

    var clkSWire = {
        cnn: [
            self.clock.clkS,
            self.andSIr.inputs[1],
            self.andSMar.inputs[1],
            self.andSIar.inputs[1],
            self.andSAcc.inputs[1],
            self.andSRam.inputs[1],
            self.andSTmp.inputs[1],
            self.andSFlags.inputs[1],
            self.andSIO.inputs[1]
        ],
        segments: []
    };

    for (var k = 0; k < 8; ++k) {
        clkSWire.segments.push([
            'cnn' + (k + 1),
            {
                left  : baseLeft - 10,
                top   : 0, relY: true,
                solder: true
            }
        ]);
    }

    var orSRegBWire = {
        cnn     : [self.orSRegB.output],
        segments: []
    };

    for (var i = 0; i < 4; ++i) {
        clkSWire.cnn.push(self.children['andSRB' + i].inputs[2]);
        orSRegBWire.cnn.push(self.children['andSRB' + i].inputs[1]);

        if (i == 0) {
            clkSWire.segments.push([
                self.clock.clkS,
                {
                    left: 10, relX: true,
                    top: self.stepper.top - 10
                },
                {
                    left: baseLeft - 10,
                    top: 0, relY: true
                },
                'cnn' + (clkSWire.cnn.length - 1) + '+'
            ]);

            orSRegBWire.segments.push([
                self.children['andSRB' + i].inputs[1],
                {
                    left: baseLeft - 15,
                    top: 0, relY: true
                },
                'cnn0+'
            ]);
        } else {
            clkSWire.segments.push([
                'cnn' + (clkSWire.cnn.length - 1) + '+',
                {
                    left: baseLeft - 10,
                    top: 0, relY: true,
                    solder: true
                }
            ]);

            orSRegBWire.segments.push([
                'cnn' + (orSRegBWire.cnn.length - 1),
                {
                    left: baseLeft - 15,
                    top: 0, relY: true,
                    solder: true
                }
            ]);
        }

        var regSetPin = self.children['r' + i].setPin;
        var offset = Bus.WIRE_STEP * (3 - i);
        self.addWire({
            cnn: [
                self.children['andSRB' + i].output,
                regSetPin
            ],
            segment: [
                self.children['andSRB' + i].output,
                {
                    left: self.width - 30 + offset,
                    top: 120 - offset
                },
                regSetPin
            ]
        });

        self.addWire({
            cnn: [
                self.decSRegB.outputs[i],
                self.children['andSRB' + i].inputs[0]
            ],
            segment: [
                self.decSRegB.outputs[i],
                {
                    left: baseLeft - 20 - (i == 0 || i == 3 ? 5 : 0),
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        });
    }

    self.addWire(clkSWire);
    self.addWire(orSRegBWire);

    self.addWire({
        cnn: [
            self.orSMar.output,
            self.andSMar.inputs[0]
        ],
        segment: [
            self.orSMar.output,
            self.andSMar.inputs[0]
        ]
    });

    self.addWire({
        cnn: [
            self.orSIar.output,
            self.andSIar.inputs[0]
        ],
        segment: [
            self.orSIar.output,
            self.andSIar.inputs[0]
        ]
    });

    self.addWire({
        cnn: [
            self.orSAcc.output,
            self.andSAcc.inputs[0]
        ],
        segment: [
            self.orSAcc.output,
            self.andSAcc.inputs[0]
        ]
    });

    self.addWire({
        cnn: [
            self.orSFlags.output,
            self.andSFlags.inputs[0]
        ],
        segment: [
            self.orSFlags.output,
            self.andSFlags.inputs[0]
        ]
    });


    self.addWire({
        cnn: [
            self.andSIr.output,
            self.ir.setPin
        ],
        segment: [
            self.andSIr.output,
            {
                left: self.width - 49,
                top: self.height - 80
            },
            self.ir.setPin
        ]
    });

    self.addWire({
        cnn: [
            self.andSMar.output,
            self.sAddrPin
        ],
        segment: [
            self.andSMar.output,
            {
                left: self.width - 8,
                top: 0, relY: true
            },
            'cnn1+'
        ]
    });

    self.addWire({
        cnn: [
            self.andSIar.output,
            self.iar.setPin
        ],
        segment: [
            self.andSIar.output,
            {
                left: self.width - 46,
                top: self.height - 77
            },
            self.iar.setPin
        ]
    });

    self.addWire({
        cnn: [
            self.andSAcc.output,
            self.acc.setPin
        ],
        segment: [
            self.andSAcc.output,
            {
                left: self.width - 43,
                top: self.height - 74
            },
            self.acc.setPin
        ]
    });

    self.addWire({
        cnn: [
            self.andSRam.output,
            self.sRamPin
        ],
        segment: [
            self.andSRam.output,
            {
                left: self.width - 5,
                top: 0, relY: true
            },
            'cnn1+'
        ]
    });

    self.addWire({
        cnn: [
            self.andSTmp.output,
            self.tmp.setPin
        ],
        segment: [
            self.andSTmp.output,
            {
                left: self.width - 40,
                top: 107
            },
            self.tmp.setPin
        ]
    });

    self.addWire({
        cnn: [
            self.andSFlags.output,
            self.flags.setPin
        ],
        segment: [
            self.andSFlags.output,
            {
                left: self.width - 40,
                top: self.height - 71
            },
            self.flags.setPin
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createEnableWires = function () {
    var self = this;

    var baseLeft = self.andERam.left;

    var clkEWireOptions = {
        cnn     : [
            self.clock.clkE,
            self.andERam.inputs[1],
            self.andEAcc.inputs[1],
            self.andEIar.inputs[1],
            self.andEIOClkE.inputs[1]
        ],
        segments: [
            [
                self.andERam.inputs[1],
                {
                    left: self.andERam.left + 25,
                    top: 0, relY: true,
                    solder: true
                }
            ],
            [
                self.andEAcc.inputs[1],
                {
                    left: self.andEAcc.left + 25,
                    top: 0, relY: true,
                    solder: true
                }
            ],
            [
                self.andEIar.inputs[1],
                {
                    left: self.andEIar.left + 25,
                    top: 0, relY: true,
                    solder: true
                }
            ],
            [
                self.andEIOClkE.inputs[1],
                {
                    left: self.andEIOClkE.left + 25,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    };

    var orERegBWire = {
        cnn     : [self.orERegB.output],
        segments: []
    };

    var orERegAWire = {
        cnn     : [self.orERegA.output],
        segments: []
    };

    for (var i = 0; i < 4; ++i) {
        orERegBWire.cnn.push(self.children['andERB' + i].inputs[1]);
        if (i == 0) {
            orERegBWire.segments.push([
                self.orERegB.output,
                {
                    left: 460,
                    top: 0, relY: true
                },
                'cnn' + (i + 1) + '+'
            ]);
        } else {
            orERegBWire.segments.push([
                self.children['andERB' + i].inputs[1],
                {
                    left: 460,
                    top: 0, relY: true,
                    solder: true
                }
            ]);
        }

        // decB to andRegB
        self.addWire({
            cnn: [
                self.decERegB.outputs[i],
                self.children['andERB' + i].inputs[0]
            ],
            segment: [
                self.decERegB.outputs[i],
                {
                    left: baseLeft + 40 + (i == 0 || i == 3 ? 5 : 0),
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        });

        clkEWireOptions.cnn.push(self.children['andERB' + i].inputs[2]);
        clkEWireOptions.segments.push([
            self.children['andERB' + i].inputs[2],
            {
                left: baseLeft + 25,
                top: 0, relY: true,
                solder: true
            }
        ]);

        var offset = Bus.WIRE_STEP * i;
        self.addWire({
            cnn: [
                self.children['orER' + i].output,
                self.children['r' + i].enablePin
            ],
            segment: [
                self.children['orER' + i].output,
                {
                    left: baseLeft - 55 + offset,
                    top: 0, relY: true
                },
                {
                    top: 130 + offset,
                    left: 0, relX: true
                },
                self.children['r' + i].enablePin
            ]
        });

        self.addWire({
            cnn: [
                self.children['andERB' + i].output,
                self.children['orER' + i].inputs[1]
            ],
            segment: [
                self.children['andERB' + i].output,
                self.children['orER' + i].inputs[1]
            ]
        });

        self.addWire({
            cnn: [
                self.children['andERA' + i].output,
                self.children['orER' + i].inputs[0]
            ],
            segment: [
                self.children['andERA' + i].output,
                {
                    left: -12 + 3 * i, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        });

        self.addWire({
            cnn: [
                self.decERegA.outputs[i],
                self.children['andERA' + i].inputs[0]
            ],
            segment: [
                self.decERegA.outputs[i],
                {
                    left: baseLeft + 40 + (i == 0 || i == 3 ? 5 : 0),
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        });

        clkEWireOptions.cnn.push(self.children['andERA' + i].inputs[2]);
        if (i == 0) {
            clkEWireOptions.segments.push([
                self.clock.clkE,
                {
                    left: baseLeft + 25,
                    top: 0, relY: true,
                    yFirst: true
                },
                'cnn' + (clkEWireOptions.cnn.length - 1) + '+'
            ]);
        } else {
            clkEWireOptions.segments.push([
                self.children['andERA' + i].inputs[2],
                {
                    left: baseLeft + 25,
                    top: 0, relY: true,
                    solder: true
                }
            ]);
        }

        orERegAWire.cnn.push(self.children['andERA' + i].inputs[1]);
        if (i == 0) {
            orERegAWire.segments.push([
                self.orERegA.output,
                {
                    left: 465,
                    top: 0, relY: true
                },
                'cnn' + (i + 1) + '+'
            ]);
        } else {
            orERegAWire.segments.push([
                self.children['andERA' + i].inputs[1],
                {
                    left: 465,
                    top: 0, relY: true,
                    solder: true
                }
            ]);
        }

    }

    self.addWire(orERegBWire);
    self.addWire(orERegAWire);
    self.addWire(clkEWireOptions);

    // enableAcc to acc enable
    self.addWire({
        cnn: [
            self.andEAcc.output,
            self.acc.enablePin
        ],
        segment: [
            self.andEAcc.output,
            {
                left: 357,
                top: self.height - 68
            },
            self.acc.enablePin
        ]
    });

    // enable IAR to iar enable
    self.addWire({
        cnn: [
            self.andEIar.output,
            self.iar.enablePin
        ],
        segment: [
            self.andEIar.output,
            {
                left: 360,
                top: self.height - 68
            },
            self.iar.enablePin
        ]
    });

    self.addWire({
        cnn: [
            self.andERam.output,
            self.eRamPin
        ],
        segment: [
            self.andERam.output,
            {
                top: 145,
                left: 387
            },
            {
                left: self.width - 11,
                top: 0, relY: true
            },
            'cnn1+'
        ]
    });

    self.addWire({
        cnn: [
            self.orERam.output,
            self.andERam.inputs[0]
        ],
        segment: [
            self.orERam.output,
            self.andERam.inputs[0]
        ]
    });

    self.addWire({
        cnn: [
            self.orEAcc.output,
            self.andEAcc.inputs[0]
        ],
        segment: [
            self.orEAcc.output,
            self.andEAcc.inputs[0]
        ]
    });

    self.addWire({
        cnn: [
            self.orEIar.output,
            self.andEIar.inputs[0]
        ],
        segment: [
            self.orEIar.output,
            self.andEIar.inputs[0]
        ]
    });

    self.addWire({
        cnn: [
            self.orEBus1.output,
            self.bus1.bus1
        ],
        segment: [
            self.orEBus1.output,
            {
                left: 358,
                top: 0, relY: true
            },
            'cnn1+'
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createStepperWires = function () {
    var self = this;

    for (var i = 1; i <= 6; ++i) {
        self['stepWire' + i] = {
            cnn: [self.stepper.outputs[i - 1]],
            segments: []
        };
        /*if (i > 3) {
            self['stepWire' + i].segments.push([
                self.stepper.outputs[i - 1],
                {
                    left: 0, relX: true,
                    top: self.height - 250
                }
            ]);
        }*/
    }

    // stepper step 7 to reset
    self.addWire({
        turnOnDelay: 300,
        cnn: [
            self.stepper.outputs[6],
            self.stepper.reset
        ],
        segment: [
            self.stepper.outputs[6],
            {
                top   : 2, relX: true,
                left  : 12, relY: true,
                yFirst: true
            },
            {
                left  : self.stepper.left - 3,
                top   : self.stepper.top - 4,
                yFirst: true
            },
            'cnn1+'
        ]
    });

    // clock to stepper
    self.addWire({
        cnn: [
            self.clock.clk,
            self.stepper.clk
        ],
        segment: [
            self.clock.clk,
            {
                left: 10, relX: true,
                top : 0,  relY: true
            },
            'cnn1+'
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createControlSection = function () {
    var self = this;

    // clock
    self.clock = new Clock({
        id   : 'clock',
        title: 'Clock',
        left : 420,
        top  : 160,
        scale: 0.1
    });
    self.addChild(self.clock);

    // stepper
    self.stepper = new Stepper({
        id       :'stepper',
        title    : 'Stepper',
        left     : self.width - 460,
        top      : self.clock.top,
        stepCount: 7,
        scale    : 0.08
    });
    self.addChild(self.stepper);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.drawSelf = function (ctx) {
    var self = this;
    CPU.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 160 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = CPU;
},{"../Label":13,"../conductor/Bus":44,"../conductor/Pin":46,"../gate/AND":48,"../gate/NOT":52,"../gate/OR":53,"./ALU":17,"./Bus1":20,"./BusReg":21,"./Byte":22,"./Circuit":25,"./Clock":26,"./Decoder":29,"./Register":37,"./Stepper":41,"util":8}],25:[function(require,module,exports){
'use strict';

var util      = require('util');
var Promise   = require('aigle');
var Component = require('../Component');
var Wire      = require('../conductor/Wire');
var Helper    = require('../Helper');
var Label     = require('../Label');

Promise.each = require('aigle/each');

util.inherits(Circuit, Component);

Circuit.BYTE_HANDLER_HEIGHT = 500;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Circuit(options) {
    var self = this;
    Circuit.super_.call(self, options);
    self.children     = {};
    self.wires        = [];
    self.buses        = [];
    self.childCounter = 0;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Circuit.prototype.init = function () {
    var self = this;
    //console.log('Circuit.prototype.init');
    return Circuit.super_.prototype.init.call(self).then(function () {
        return self.initChildren();
    }).then(function () {
        return self.initWires();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Circuit.prototype.addChild = function (child) {
    var self = this;
    var id = child.id !== null ? child.id : self.createID();
    if (self.children[id]) {
        throw new Error('Component: Child with the same id is already exists.');
    } else {
        self.children[id] = child;
        child.parent = self;
        if (child.id === null) {
            child.id = id;
        }
        return id;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Circuit.prototype.clear = function () {
    var self = this;
    Circuit.super_.prototype.clear.call(self);
    for (var id in self.children) {
        self.children[id].clear();
    }
    self.wires.forEach(function (wire) {
        wire.clear();
    });

    self.buses.forEach(function (bus) {
        bus.clear();
    });

    self.children     = {};
    self.wires        = [];
    self.buses        = [];
    self.childCounter = 0;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Circuit.prototype.drawSelf = function (ctx) {
    var self = this;
    Circuit.super_.prototype.drawSelf.call(self, ctx);
    if (self.detailDraw) {
        for (var n = 0; n < self.buses.length; ++n) {
            self.buses[n].draw(ctx);
        }

        for (var k = 0; k < self.wires.length; ++k) {
            self.wires[k].draw(ctx);
        }

        for (var uid in self.children) {
            self.children[uid].draw(ctx);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Circuit.prototype.initChildren = function () {
    var self = this;
    //console.log('Component.prototype.initChildren: ' + self.id);
    return Promise.each(Object.keys(self.children), function (id) {
        return self.children[id].init();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Circuit.prototype.initWires = function () {
    var self = this;
    //console.log('Component.prototype.initWires:', self.wires.length, self.id);
    return Promise.each(self.wires, function (wire) {
        return wire.init();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Circuit.prototype.addWire = function (options) {
    var self = this;
    //console.log('Component.prototype.addWire');
    options.parent = self;
    var wire = new Wire(options);
    self.wires.push(wire);
    return wire;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Circuit.prototype.handleClick = function (globalPoint) {
    var self = this;
    //console.log('Circuit: Component click:', globalPoint);
    if (self.detailDraw) {
        var found = false;
        for (var id in self.children) {
            var child = self.children[id];
            if (child instanceof Label) {
                continue;
            }

            //console.log('Circuit: Child ' + id +' rect:', child.boxGlobalRect);
            if (Helper.pointInRect(globalPoint, child.boxGlobalRect)) {
                found = true;
                //console.log('Circuit: Child clicked: ' + child.title);
                // need to convert point to child point
                child.handleClick(globalPoint);
            }
        }
        if (!found) {
            //console.log('Circuit: Clicked on empty place.');
            Component.setSelectedItem(null);
        }
    } else {
        Circuit.super_.prototype.handleClick.call(self, globalPoint);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Circuit.prototype.createID = function () {
    var self = this;
    return '#' + self.childCounter++;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Circuit.prototype.getHexValue = function () {
    var self = this;
    if (self.outputs) {
        var value = 0;
        var weight = 1;
        for (var i = 0; i < self.outputs.length; ++i) {
            if (self.outputs[i].value) {
                value += weight;
            }
            weight = weight << 1;
        }
        var strVal = value.toString(16).toUpperCase();
        if (value <= 0xF) {
            strVal = '0' + strVal;
        }
        return '0x' + strVal;
    } else {
        return '0x';
    }
};

module.exports = Circuit;
},{"../Component":11,"../Helper":12,"../Label":13,"../conductor/Wire":47,"aigle":1,"aigle/each":2,"util":8}],26:[function(require,module,exports){
'use strict';

var util    = require('util');
var Promise = require('aigle');
var Circuit = require('./Circuit');
var AND     = require('../gate/AND');
var OR      = require('../gate/OR');
var Pin     = require('../conductor/Pin');

util.inherits(Clock, Circuit);

Clock.CYCLE = 500;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Clock(options) {
    var self = this;
    options = options || {};
    options.width     = 300;
    options.height    = 300;
    options.minScale  = 0.5;
    options.pinMargin = 0.2;

    options.title = options.title || 'Clock';

    Clock.super_.call(self, options);

    self.timer = null;
    self.cleared = false;

    self.srcClk = new Pin({
        parent  : self,
        title   : 'clk',
        position: Pin.POS.LEFT,
        left    : 100,
        top     : self.height / 2,
        length  : 50,
        //value   : true,
        active  : true
    });
    self.pins.push(self.srcClk);

    self.delayClk = new Pin({
        parent  : self,
        title   : 'clk d',
        position: Pin.POS.LEFT,
        left    : 30,
        top     : self.height /2  + 50,
        length  : 50,
        active  : true
    });
    self.pins.push(self.delayClk);

    self.clkS = self.addPin(Pin.POS.RIGHT, 2, 3, 'clk s');
    self.clk  = self.addPin(Pin.POS.RIGHT, 1, 3, 'clk');
    self.clkE = self.addPin(Pin.POS.RIGHT, 0, 3, 'clk e');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Clock.prototype.init = function () {
    var self = this;

    var and = new AND({
        title: 'AND',
        left: 200,
        top : self.clkS.getPoint().top - 25
    });
    self.addChild(and);

    var or = new OR({
        title: 'OR',
        left: 200,
        top : self.clkE.getPoint().top - 25
    });
    self.addChild(or);

    self.addWire({
        cnn: [
            self.srcClk,
            self.clk,
            or.inputs[1],
            and.inputs[0]
        ],
        segments: [
            [
                self.srcClk,
                {
                    left: self.width - 50,
                    top: 'cnn1.top'
                },
                self.clk
            ],
            [
                or.inputs[1],
                {
                    left: 0, relX: true,
                    top: 'cnn0.top',
                    solder: true
                }
            ],
            [
                and.inputs[0],
                {
                    left: 0, relX: true,
                    top: 'cnn0.top',
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.delayClk,
            or.inputs[0],
            and.inputs[1]
        ],
        segments: [
            [
                self.delayClk,
                {
                    top: 'cnn2.top',
                    left: 'cnn0.left'
                },
                and.inputs[1]
            ],
            [

                or.inputs[0],
                'cnn0*'
            ]
        ]
    });

    self.addWire({
        cnn: [
            or.output,
            self.clkE
        ],
        segment: [
            or.output,
            {
                left: self.width - 50,
                top: 0, relY: true
            },
            'cnn1+'
        ]
    });

    self.addWire({
        cnn: [
            and.output,
            self.clkS
        ],
        segment: [
            and.output,
            {
                left: self.width - 50,
                top: 0, relY: true
            },
            'cnn1+'
        ]
    });

    return Clock.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Clock.prototype.scheduleTick = function () {
    var self = this;
    //console.log('Clock: scheduleTick');
    if (!self.cleared) {
        self.timer = setTimeout(self.onHalfTick.bind(self), Clock.CYCLE / 2);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Clock.prototype.doTick = function () {
    var self = this;
    return Promise.try(function () {
        if (self.srcClk.value) {
            if (self.delayClk.value) {
                return self.srcClk.setValue(false);
            } else {
                return self.delayClk.setValue(true);
            }
        } else {
            if (self.delayClk.value) {
                return self.delayClk.setValue(false);
            } else {
                return self.srcClk.setValue(true);
            }
        }
    }).then(function () {
        window.root._redraw();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Clock.prototype.onHalfTick = function () {
    var self = this;
    self.timer = null;
    return self.doTick().then(function () {
        self.scheduleTick();
    }).catch(function (err) {
        console.log('Clock: Error during tick:', err.stack);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Clock.prototype.clear = function () {
    var self = this;
    //console.log('Clock clear');
    Clock.super_.prototype.clear.call(self);
    if (self.timer) {
        clearTimeout(self.timer);
    }
    self.cleared = true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Clock.prototype.drawSelf = function (ctx) {
    var self = this;
    Clock.super_.prototype.drawSelf.call(self, ctx);

    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 90 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = Clock;
},{"../conductor/Pin":46,"../gate/AND":48,"../gate/OR":53,"./Circuit":25,"aigle":1,"util":8}],27:[function(require,module,exports){
'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var CMP     = require('./CMP');
var Pin     = require('../conductor/Pin');

util.inherits(Comparator, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Comparator(options) {
    var self = this;
    options = options || {};
    options.title     = 'CMP';
    options.width     = 300;
    options.height    = Circuit.BYTE_HANDLER_HEIGHT;
    options.minScale  = 0.4;
    options.pinMargin = 0.15;

    Comparator.super_.call(self, options);

    self.inputsA = [];
    self.inputsB = [];
    self.outputs = [];

    var pinCount = 8;

    for (var i = 0; i < pinCount; ++i) {
        var inputA = self.addPin(Pin.POS.LEFT, i, pinCount, 'a'+ i);
        self.inputsA.push(inputA);

        var inputB = self.addPin(Pin.POS.TOP, i, pinCount, 'b'+ i);
        self.inputsB.push(inputB);
    }

    for (var j = 0; j < pinCount; ++j) {
        var output = self.addPin(Pin.POS.RIGHT, j, pinCount, 'c'+ j);
        self.outputs.push(output);
    }

    self.eqPin     = self.addPin(Pin.POS.BOTTOM, 5, 8, 'equal out');
    self.largerPin = self.addPin(Pin.POS.BOTTOM, 2, 8, 'a larger out');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Comparator.prototype.init = function () {
    var self = this;

    var baseTop = 50;
    var scale = 0.2;

    for (var i = 0; i < 8; ++i) {
        var ri = 7 - i;
        var cmp = new CMP({
            id   : 'cmp' + ri,
            title: 'CMP' + ri,
            top  : baseTop + 55 * i,
            left : 95,
            scale: scale,
            equal: i == 0
        });

        if (i == 0) {
            // high bit eqInPin must be always on in comparator
            cmp.eqInPin.value = true;
            cmp.eqInPin.title += ' (always on)';

            cmp.largerInPin.title += ' (always off)';
        }

        self.addChild(cmp);
        self.addWire({
            cnn: [
                self.inputsA[ri],
                cmp.inputA
            ],
            segments: [
                [
                    self.inputsA[ri],
                    {
                        left: 20, relX: true,
                        top: 'cnn0.top'
                    },
                    'cnn1+'
                ]
            ]
        });
        self.addWire({
            cnn: [
                self.inputsB[ri],
                cmp.inputB
            ],
            segments: [
                [
                    self.inputsB[ri],
                    {
                        left  : self.width * self.pinMargin + i * 3,
                        top   : 15 + i * 3,
                        yFirst: true
                    },
                    'cnn1+'
                ]
            ]
        });

        self.addWire({
            cnn: [
                cmp.output,
                self.outputs[ri]
            ],
            segments: [
                [
                    cmp.output,
                    {
                        left: self.width - 20,
                        top: 0, relY: true
                    },
                    'cnn1+'
                ]
            ]
        });

        if (i > 0) {
            var prevCmp = self.children['cmp' + (ri + 1)];
            self.addWire({
                cnn: [
                    prevCmp.eqOutPin,
                    cmp.eqInPin
                ],
                segment: [
                    prevCmp.eqOutPin,
                    cmp.eqInPin
                ]
            });

            self.addWire({
                cnn: [
                    prevCmp.largerOutPin,
                    cmp.largerInPin
                ],
                segment: [
                    prevCmp.largerOutPin,
                    cmp.largerInPin
                ]
            });
        }

        if (i == 7) {
            self.addWire({
                cnn: [
                    cmp.eqOutPin,
                    self.eqPin
                ],
                segments: [
                    [
                        cmp.eqOutPin,
                        {
                            left: 0, relX: true,
                            top: 7, relY: true
                        },
                        self.eqPin
                    ]
                ]
            });

            self.addWire({
                cnn: [
                    cmp.largerOutPin,
                    self.largerPin
                ],
                segments: [
                    [
                        cmp.largerOutPin,
                        {
                            left: 0, relX: true,
                            top: 7, relY: true
                        },
                        self.largerPin
                    ]
                ]
            });
        }
    }

    return Comparator.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Comparator.prototype.getTitle = function () {
    var self = this;
    var title = Comparator.super_.prototype.getTitle.call(self);
    return title + ':' + self.getHexValue();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Comparator.prototype.drawSelf = function (ctx) {
    var self = this;
    Comparator.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 60 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = Comparator;
},{"../conductor/Pin":46,"./CMP":23,"./Circuit":25,"util":8}],28:[function(require,module,exports){
'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var NAND    = require('../gate/NAND');
var NOT     = require('../gate/NOT');
var Wire    = require('../conductor/Wire');
var Pin     = require('../conductor/Pin');

util.inherits(DFlipFlop, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DFlipFlop(options) {
    var self = this;
    options = options || {};

    options.width     = 440;
    options.height    = 210;
    options.pinMargin = 0.2;

    DFlipFlop.super_.call(self, options);

    self.dataPin = self.addPin(Pin.POS.LEFT,  3, 4, 'i', options.dataValue);
    self.setPin  = self.addPin(Pin.POS.LEFT,  1, 4, 's');
    self.output  = self.addPin(Pin.POS.RIGHT, 0, 1, 'o');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
DFlipFlop.prototype.init = function () {
    var self = this;

    var not = new NOT({
        id: 'not1',
        title: 'NOT',
        left: 40,
        top: 150
    });
    self.addChild(not);

    var nand1 = new NAND({
        id   : 'nand1',
        title: 'NAND1',
        left : 160,
        top  : 20
    });
    nand1.output.title = 'a';
    self.addChild(nand1);

    var nand2 = new NAND({
        id   : 'nand2',
        title: 'NAND2',
        left : 160,
        top  : 140
    });
    nand2.output.title = 'b';
    self.addChild(nand2);

    var nand3 = new NAND({
        type : 'NAND',
        id   : 'nand3',
        title: 'NAND3',
        left : 310,
        top  : 20
    });
    nand3.output.title = 'o';
    self.addChild(nand3);

    var nand4 = new NAND({
        id   : 'nand4',
        title: 'NAND4',
        left : 310,
        top  : 140
    });
    nand4.output.title = 'c';
    self.addChild(nand4);

    self.addWire({
        cnn: [
            self.dataPin,
            nand1.inputs[1],
            not.inputs[0]
        ],
        segments: [
            [
                self.dataPin,
                {
                    left: 'cnn1.left',
                    top: 'cnn0.top'
                },
                nand1.inputs[1]
            ],
            [
                not.inputs[0],
                {
                    left: 0, relX: true,
                    top: 'cnn0.top',
                    solder: true

                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.setPin,
            nand1.inputs[0],
            nand2.inputs[1]
        ],
        segments: [
            [
                self.setPin,
                {left: 'cnn1.left', top: 'cnn0.top', solder: true},
                nand1.inputs[0]
            ],
            [
                {left: 'cnn1.left', top: 'cnn0.top'},
                nand2.inputs[1]
            ]
        ]
    });

    self.addWire({
        cnn: [
            not.output,
            nand2.inputs[0]
        ],
        segment: [
            not.output,
            nand2.inputs[0]
        ]
    });

    self.addWire({
        cnn: [
            nand1.output,
            nand3.inputs[1]
        ],
        segment: [
            nand1.output,
            nand3.inputs[1]
        ]
    });

    self.addWire({
        cnn: [
            nand2.output,
            nand4.inputs[0]
        ],
        segments: [
            [
                nand2.output,
                {
                    left: 'cnn0.left',
                    top: 'cnn1.top'
                },
                nand4.inputs[0]
            ]
        ]
    });
    self.addWire({
        cnn: [
            nand4.output,
            nand3.inputs[0]
        ],
        segment: [
            nand4.output,
            {
                left: 'cnn0.left',
                top: -40, relY: true
            },
            {
                left: 'cnn1.left',
                top: -40, relY: true,
                skew: true
            },
            nand3.inputs[0]
        ]
    });
    self.addWire({
        cnn: [
            nand3.output,
            nand4.inputs[1],
            self.output
        ],
        segments: [
            [
                nand3.output,
                {left: 'cnn0.left', top: 40, relY: true},
                {left: 'cnn1.left', top: 40, relY: true, skew: true},
                nand4.inputs[1]
            ],
            [
                'cnn0*',
                {left: 20, top: 'cnn0.top', relX: true},
                {left: 0, top: 'cnn2.top', relX: true},
                self.output
            ]
        ]
    });

    return DFlipFlop.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
DFlipFlop.prototype.drawSelf = function (ctx) {
    var self = this;
    DFlipFlop.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 80 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, 'M:' + self.output, self.width / 2, self.height / 2);
    }
};

module.exports = DFlipFlop;
},{"../conductor/Pin":46,"../conductor/Wire":47,"../gate/NAND":50,"../gate/NOT":52,"./Circuit":25,"util":8}],29:[function(require,module,exports){
'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var AND     = require('../gate/AND');
var NOT     = require('../gate/NOT');
var Pin     = require('../conductor/Pin');
var Helper  = require('../Helper');

util.inherits(Decoder, Circuit);

Decoder.AND_Y_SPACE = 30;
Decoder.NOT_X_SPACE = 40;
Decoder.NOT_Y_SPACE = 12;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Decoder(options) {
    var self = this;
    options = options || {};

    options.inputCount  = options.inputCount || 2;
    options.outputCount = Math.pow(2, options.inputCount);

    options.width     = Decoder.NOT_X_SPACE * (options.inputCount + 2);
    options.height    = options.height    || Decoder.AND_Y_SPACE * options.outputCount + Decoder.AND_Y_SPACE + 30;
    options.pinMargin = options.pinMargin || 0.18;
    options.minScale  = 0.5;


    Decoder.super_.call(self, options);

    self.flip     = options.flip     !== undefined ? !!options.flip     : false;
    self.reversed = options.reversed !== undefined ? !!options.reversed : false;

    self.inputs  = [];
    self.outputs = [];

    for (var i = 0; i < options.inputCount; ++i) {
        var input = self.addPin(self.flip ? Pin.POS.RIGHT : Pin.POS.LEFT, i, options.inputCount, 'i'+ i);
        self.inputs.push(input);
    }

    for (var j = 0; j < options.outputCount; ++j) {
        var output = self.addPin(self.flip ? Pin.POS.LEFT : Pin.POS.RIGHT, self.reversed ? options.outputCount - 1- j : j, options.outputCount, 'o'+ j);
        self.outputs.push(output);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Decoder.prototype.init = function () {
    var self = this;
    var nots     = [];
    var onWires  = [];
    var offWires = [];

    for (var j = 0; j < self.inputs.length; ++j) {
        var rj =  self.inputs.length - 1 - j;

        var notLeft = self.flip ?
            Decoder.NOT_X_SPACE * (rj + 1) + 25:
            Decoder.NOT_X_SPACE * (self.inputs.length - rj);

        var not = new NOT({
            id   : 'not' + j,
            title: 'NOT' + j,
            left : notLeft,
            top  : 7 + Decoder.NOT_Y_SPACE * rj,
            scale: 0.25,
            flip : self.flip
        });
        nots.push(not);
        self.addChild(not);

        var offset = 5 * (rj + 1);
        onWires.push({
            cnn: [
                self.inputs[j],
                not.inputs[0]
            ],
            segments: [
                [
                    self.inputs[j],
                    {
                        left: self.flip ? -offset: offset, relX: true,
                        top : 0, relY: true
                    },
                    'cnn1+'
                ]
            ]
        });
        offWires.push({
            cnn     : [not.output],
            segments: []
        });
    }

    var scale = 0.25;
    for (var i = 0; i < self.outputs.length; ++i) {
        var and = new AND({
            id        : 'and' + i,
            title     : 'AND' + i,
            left      : self.children['not' + (self.inputs.length - 1)].left + (self.flip ? - 45 : 45),
            top       : self.outputs[i].getPoint(true).top - 25 * scale,
            inputCount: self.inputs.length,
            scale     : scale,
            flip      : self.flip
        });
        self.addChild(and);

        // and to output
        self.addWire({
            cnn: [
                and.output,
                self.outputs[i]
            ],
            segments: [
                [
                    and.output,
                    self.outputs[i]
                ]
            ]
        });

        var binary = Helper.number2BinString(i);
        // zero padding
        var count = self.inputs.length - binary.length;
        for (var k = 0; k < count; ++k) {
            binary = '0' + binary;
        }
        binary = binary.split('');
        //console.log('binary:', binary);

        for (var n = 0; n < binary.length; ++n) {
            var nr = binary.length - 1 - n;
            var value = binary[n];
            if (value == '0') {
                offWires[nr].cnn.push(and.inputs[n]);
                offWires[nr].segments.push([
                    and.inputs[n],
                    {
                        left  : 'cnn0.left',
                        top   : 0, relY: true,
                        solder: true
                    }
                ]);

            } else {
                onWires[nr].cnn.push(and.inputs[n]);
                onWires[nr].segments.push([
                    and.inputs[n],
                    {
                        left  : 'cnn1.left',
                        top   : 0, relY: true,
                        solder: true
                    }
                ]);
            }
        }
    }

    for (var m = 0; m < onWires.length; ++m) {
        var wireOptions = onWires[m];
        var lastSegment = wireOptions.segments[self.reversed ? wireOptions.segments.length - 1 : 1];
        //console.log('onWires[%d], lastSegment ', index, lastSegment);
        lastSegment[lastSegment.length - 1].solder = false;
        lastSegment.push('cnn1*');
        self.addWire(wireOptions);
    }

    for (var p = 0; p < offWires.length; ++p) {
        var offWireOptions = offWires[p];
        var lastOffSegment = offWireOptions.segments[self.reversed ? offWireOptions.segments.length - 1 : 0];
        //console.log('offWires[%d], lastSegment ', index, lastSegment);
        lastOffSegment[lastOffSegment.length - 1].solder = false;
        lastOffSegment.push('cnn0');
        self.addWire(offWireOptions);
    }

    return Decoder.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Decoder.prototype.drawSelf = function (ctx) {
    var self = this;
    Decoder.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 50 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.inputs.length + 'X' + self.outputs.length, self.width / 2, self.height / 2);
    }
};

module.exports = Decoder;
},{"../Helper":12,"../conductor/Pin":46,"../gate/AND":48,"../gate/NOT":52,"./Circuit":25,"util":8}],30:[function(require,module,exports){
'use strict';

var util      = require('util');
var Circuit   = require('./Circuit');
var AND       = require('../gate/AND');
var OR        = require('../gate/OR');
var NOT       = require('../gate/NOT');
var NOR       = require('../gate/NOR');
var Pin       = require('../conductor/Pin');
var Helper    = require('../Helper');

util.inherits(Decoder7Seg, Circuit);

Decoder7Seg.PADDING        = 20;
Decoder7Seg.AND_SPACE      = 30;
Decoder7Seg.NOT_SPACE      = 40;
Decoder7Seg.NOT_SPACE_VERT = 12;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Decoder7Seg(options) {
    var self = this;
    options = options || {};
    options.width     = 430;
    options.height    = 340;
    options.minScale  = 0.5;
    options.pinMargin = 0.18;

    Decoder7Seg.super_.call(self, options);

    self.seg7 = [
        {
            gateClass: NOR,
            outputs  : [1,4],
            offset   : 10
        },
        {
            gateClass: NOR,
            outputs  : [5,6],
            offset   : 30
        },
        {
            gateClass: NOT,
            outputs  : [2],
            offset   : 50
        },
        {
            gateClass: NOR,
            outputs  : [1, 4, 7],
            offset   : 70
        },
        {
            gateClass: OR,
            outputs  : [0, 2, 6, 8],
            offset   : 90
        },
        {
            gateClass: NOR,
            outputs  : [1, 2, 3, 7],
            offset   : 120
        },
        {
            gateClass: NOR,
            outputs  : [0, 1, 7],
            offset   : 140
        }
    ];

    self.inputs  = [];
    self.outputs = [];

    var inputCount  = 4;
    var outputCount = 7;

    for (var i = 0; i < inputCount; ++i) {
        var input = self.addPin(Pin.POS.LEFT, i, inputCount, 'i' + i);
        self.inputs.push(input);
    }

    for (var j = 0; j < outputCount; ++j) {
        var title = String.fromCharCode(97 + j);
        var output = self.addPin(Pin.POS.RIGHT, outputCount - 1 - j, outputCount, title);
        self.outputs.push(output);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Decoder7Seg.prototype.init = function () {
    var self = this;
    self.createDecoder();

    for (var index = 0; index < self.seg7.length; ++index) {
        var segInfo = self.seg7[index];
        var gate = new segInfo.gateClass({
            id        : segInfo.gateClass.name.toLowerCase() + '7' + index ,
            title     : segInfo.gateClass.name + index,
            inputCount: segInfo.outputs.length,
            top       : 20 + 45 * index,
            left      : 380,
            scale     : 0.25
        });
        self.addChild(gate);

        // gate out to seg7dec output
        self.addWire({
            cnn: [
                gate.output,
                self.outputs[index]
            ],
            segments: [
                [
                    gate.output,
                    {
                        left: 10, relX: true,
                        top : 0, relY: true
                    },
                    'cnn1+'
                ]
            ]
        });
        segInfo.outputs.forEach(function (outputIndex, index) {
            // from decoder output to gate
            var andGate = self.children['and' + outputIndex];
            // counting output's wires in order to split lines vertically
            if (andGate.wireCount !== undefined) {
                andGate.wireCount++;
            } else {
                andGate.wireCount = 0;
            }
            self.addWire({
                cnn: [
                    andGate.output,
                    gate.inputs[index]
                ],
                segments: [
                    [
                        andGate.output,
                        {
                            left: 0, relX: true,
                            top : andGate.wireCount * 5, relY: true
                        },
                        {
                            left: segInfo.offset + index * 3, relX: true,
                            top : 0, relY: true
                        },
                        'cnn1+'
                    ]
                ]
            });
        });
    }

    return Decoder7Seg.super_.prototype.init.call(self).then(function () {
        // adding soldering points
        for (var i = 0; i < 9; ++i) {
            var andGate = self.children['and' + i];
            var cnnCount = andGate.output.cnn.length;
            andGate.output.cnn.forEach(function (wire, index) {
                if (index < cnnCount - 1) {
                    wire.solders.push(wire.segments[0][1]);
                }
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Decoder7Seg.prototype.createDecoder = function () {
    var self = this;
    var nots     = [];
    var onWires  = [];
    var offWires = [];
    for (var j = 0; j < self.inputs.length; ++j) {
        var rj = self.inputs.length - 1 - j;
        var not = new NOT({
            id   : 'not' + j,
            title: 'NOT' + j,
            left : Decoder7Seg.NOT_SPACE * self.inputs.length - Decoder7Seg.NOT_SPACE * j,
            top  : 8 + Decoder7Seg.NOT_SPACE_VERT * j,
            scale: 0.25
        });
        nots.push(not);
        self.addChild(not);
        onWires.push({
            cnn: [
                self.inputs[rj],
                not.inputs[0]
            ],
            segments: [
                [
                    self.inputs[rj],
                    {left: 5 + j * 3, top: 'cnn0.top', relX: true},
                    {left: 5 + j * 3, top: 'cnn1.top', relX: true},
                    not.inputs[0]
                ]
            ]
        });
        offWires.push({
            cnn: [not.output],
            segments: []
        });
    }

    for (var i = 0; i < 9; ++i) {
        var and = new AND({
            id: 'and' + i,
            title: 'AND' + i,
            left: Decoder7Seg.NOT_SPACE * self.inputs.length + Decoder7Seg.NOT_SPACE,
            inputCount: self.inputs.length,
            top: Decoder7Seg.AND_SPACE + Decoder7Seg.AND_SPACE * i + 12,
            scale: 0.25
        });
        var binary = Helper.number2BinString(i);
        if (binary.length < self.inputs.length) {
            var count = self.inputs.length - binary.length;
            for (var k = 0; k < count; ++k) {
                binary = '0' + binary;
            }
        }
        binary = binary.split('');
        binary.forEach(function (value, j) {
            var lastCnnIndex;
            if (value == '0') {
                //console.log(i, j, ': 0');
                lastCnnIndex = offWires[j].cnn.length;
                offWires[j].cnn.push(and.inputs[3 - j]);
                offWires[j].segments.push([
                    {
                        left  : 'cnn0.left',
                        top   : 'cnn'+ lastCnnIndex + '.top',
                        solder: true
                    },
                    and.inputs[3 - j]
                ]);

            } else {
                //console.log(i, j, ': 1');
                lastCnnIndex = onWires[j].cnn.length;
                onWires[j].cnn.push(and.inputs[3 - j]);
                onWires[j].segments.push([
                    {
                        left  : 'cnn1.left',
                        top   : 'cnn'+ lastCnnIndex + '.top',
                        solder: true
                    },
                    and.inputs[3 - j]
                ]);
            }
        });

        self.addChild(and);
    }

    onWires.forEach(function (wireOptions) {
        var lastSegment = wireOptions.segments[wireOptions.segments.length - 1];
        //console.log('onWires[%d], lastSegment ', index, lastSegment);
        lastSegment[0].solder = false;
        lastSegment.unshift('cnn1*');
        self.addWire(wireOptions);
    });

    offWires.forEach(function (wireOptions) {
        var lastSegment = wireOptions.segments[wireOptions.segments.length - 1];
        //console.log('offWires[%d], lastSegment ', index, lastSegment);
        lastSegment[0].solder = false;
        lastSegment.unshift('cnn0');
        self.addWire(wireOptions);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Decoder7Seg.prototype.drawSelf = function (ctx) {
    var self = this;
    Decoder7Seg.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 50 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, 'SEG7DEC', self.width / 2, self.height / 2);
    }
};

module.exports = Decoder7Seg;
},{"../Helper":12,"../conductor/Pin":46,"../gate/AND":48,"../gate/NOR":51,"../gate/NOT":52,"../gate/OR":53,"./Circuit":25,"util":8}],31:[function(require,module,exports){
'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var AND     = require('../gate/AND');
var Pin     = require('../conductor/Pin');

util.inherits(Enabler, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Enabler(options) {
    var self = this;
    options = options || {};
    options.width     = 200;
    options.height    = Circuit.BYTE_HANDLER_HEIGHT;
    options.minScale  = 0.4;
    options.pinMargin = 0.15;

    options.title = options.title || 'E';

    Enabler.super_.call(self, options);

    self.inputs  = [];
    self.outputs = [];

    var pinCount = 8;

    for (var i = 0; i < pinCount; ++i) {
        var input = self.addPin(Pin.POS.LEFT, i, pinCount, 'i'+ i);
        self.inputs.push(input);
    }

    for (var j = 0; j < pinCount; ++j) {
        var output = self.addPin(Pin.POS.RIGHT, j, pinCount, 'eo'+ j);
        self.outputs.push(output);
    }

    self.enablePin = self.addPin(Pin.POS.BOTTOM, 6, 8, 'e');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Enabler.prototype.init = function () {
    var self = this;
    var ands = [];
    var enableWireOptions = {
        cnn     : [self.enablePin],
        segments: []
    };
    var scale = 0.5;

    for (var i = 0; i < 8; ++i) {
        var and = new AND({
            id      : 'and' + i,
            title   : 'eAND' + i,
            left    : self.width / 2 - 30 * scale,
            top     : self.outputs[i].getPoint(true).top - 25 * scale,
            scale   : scale,
            debugPin: self.debugPin
        });
        ands.push(and);
        self.addChild(and);

        // input to and
        self.addWire({
            cnn: [
                self.inputs[i],
                and.inputs[1]
            ],
            segment: [
                self.inputs[i],
                {
                    left: 25, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        });

        //
        self.addWire({
            cnn: [
                and.output,
                self.outputs[i]
            ],
            segment: [
                and.output,
                self.outputs[i]
            ]
        });

        enableWireOptions.cnn.push(and.inputs[0]);

        if (i == 7) {
            enableWireOptions.segments.push([
                self.enablePin,
                'cnn' + (i + 1) + '+'
            ]);
        } else {
            enableWireOptions.segments.push([
                and.inputs[0],
                {
                    left: 'cnn0.left',
                    top: 0, relY: true,
                    solder: true
                }
            ]);
        }

    }
    self.addWire(enableWireOptions);

    return Enabler.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Enabler.prototype.getTitle = function () {
    var self = this;
    var title = Enabler.super_.prototype.getTitle.call(self);
    return title + ':' + self.enablePin;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Enabler.prototype.drawSelf = function (ctx) {
    var self = this;
    Enabler.super_.prototype.drawSelf.call(self, ctx);

    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 50 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = Enabler;
},{"../conductor/Pin":46,"../gate/AND":48,"./Circuit":25,"util":8}],32:[function(require,module,exports){
'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var Pin     = require('../conductor/Pin');
var NOT     = require('../gate/NOT');

util.inherits(Inverter, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Inverter(options) {
    var self = this;
    options = options || {};

    options.title     = 'NOT';
    options.width     = 300;
    options.height    = Circuit.BYTE_HANDLER_HEIGHT;
    options.minScale  = 0.4;
    options.pinMargin = 0.15;

    Inverter.super_.call(self, options);

    self.inputs  = [];
    self.outputs = [];

    var pinCount = 8;

    for (var i = 0; i < pinCount; ++i) {
        var input = self.addPin(Pin.POS.LEFT, i, pinCount, 'i'+ i);
        self.inputs.push(input);
    }

    for (var j = 0; j < pinCount; ++j) {
        var output = self.addPin(Pin.POS.RIGHT, j, pinCount, 'o'+ j);
        self.outputs.push(output);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Inverter.prototype.init = function () {
    var self = this;
    var scale = 0.7;
    for (var i = 0; i < 8; ++i) {
        var not = new NOT({
            title: 'NOT' + i,
            left : self.width / 2 - 25 * scale,
            top  : self.getPinPoint(i, Pin.POS.LEFT, 8).top - (50 * scale) / 2,
            scale: scale
        });
        self.addChild(not);

        self.addWire({
            cnn: [
                self.inputs[i],
                not.inputs[0]
            ],
            segment: [
                self.inputs[i],
                not.inputs[0]
            ]
        });

        self.addWire({
            cnn: [
                not.output,
                self.outputs[i]
            ],
            segment: [
                not.output,
                self.outputs[i]
            ]
        });
    }

    return Inverter.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Inverter.prototype.getTitle = function () {
    var self = this;
    var title = Inverter.super_.prototype.getTitle.call(self);
    return title + ':' + self.getHexValue();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Inverter.prototype.drawSelf = function (ctx) {
    var self = this;
    Inverter.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 60 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = Inverter;
},{"../conductor/Pin":46,"../gate/NOT":52,"./Circuit":25,"util":8}],33:[function(require,module,exports){
'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var NAND    = require('../gate/NAND');
var Wire    = require('../conductor/Wire');
var Pin     = require('../conductor/Pin');

util.inherits(Latch, Circuit);

Latch.DEFAULT_HEIGHT = 210;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Latch(options) {
    var self = this;
    options = options || {};

    options.width = 440;
    options.height = Latch.DEFAULT_HEIGHT;
    options.pinMargin = 0.2;


    Latch.super_.call(self, options);

    self.dataPin = self.addPin(Pin.POS.LEFT, 1, 2, 'i', options.dataValue);
    self.setPin = self.addPin(Pin.POS.LEFT, 0, 2, 's');
    self.output = self.addPin(Pin.POS.RIGHT, 0, 1, 'o');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Latch.prototype.init = function () {
    var self = this;

    //self.debugPin = true;

    var nand1 = new NAND({
        id: 'nand1',
        title: 'NAND1',
        left: 40,
        top: 20,
        debugPin: self.debugPin
    });
    //nand1.output.title = 'a';
    self.addChild(nand1);

    var nand2 = new NAND({
        id: 'nand2',
        title: 'NAND2',
        left: 160,
        top: 140,
        //values: [false, true],
        debugPin: self.debugPin
    });
    //nand2.output.title = 'b';
    self.addChild(nand2);

    var nand3 = new NAND({
        type: 'NAND',
        id: 'nand3',
        title: 'NAND3',
        left: 310,
        top: 20,
        //values: [true, false],
        debugPin: self.debugPin
    });
    //nand3.output.title = 'o';
    self.addChild(nand3);

    var nand4 = new NAND({
        id: 'nand4',
        title: 'NAND4',
        left: 310,
        top: 140,
        //values: [true, false],
        debugPin: self.debugPin
    });
    //nand4.output.title = 'c';
    self.addChild(nand4);

    // dataPin to nand1 input[1]
    self.addWire({
        cnn: [
            self.dataPin,
            nand1.inputs[1]
        ],
        segments: [
            [
                self.dataPin,
                nand1.inputs[1]
            ]
        ]
    });

    // setPin to nand1 and nand2
    self.addWire({
        cnn: [
            self.setPin,
            nand1.inputs[0],
            nand2.inputs[0]
        ],
        segments: [
            [
                nand1.inputs[0],
                {
                    left: 0, relX: true,
                    top: 'cnn0.top',
                    solder: true
                }
            ],
            [
                self.setPin,
                {
                    left: 130,
                    top: 0, relY: true
                },
                'cnn2+'
            ]
        ]
    });

    // nand1 output to nand2 and nand3
    self.addWire({
        cnn: [
            nand1.output,
            nand2.inputs[1],
            nand3.inputs[1]
        ],
        segments: [
            [
                nand2.inputs[1],
                {
                    left: 130,
                    top: 0, relY: true
                },
                'cnn2+'
            ],
            [
                nand1.output,
                {
                    left: 130,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            nand3.output,
            nand4.inputs[1],
            self.output
        ],
        segments: [
            [
                self.output,
                {
                    left: -25, relX: true,
                    top: 0, relY: true
                },
                'cnn0*+'
            ],
            [
                nand3.output,
                {
                    left: 0, relX: true,
                    top: 40, relY: true
                },
                {
                    left: 'cnn1.left',
                    top: 40, relY: true,
                    skew: true
                },
                nand4.inputs[1]
            ]
        ]
    });

    // nand2 to nand4
    self.addWire({
        cnn: [
            nand2.output,
            nand4.inputs[0]
        ],
        segments: [
            [
                nand2.output,
                'cnn1+'
            ]
        ]
    });

    // nand4 to nand3
    self.addWire({
        cnn: [
            nand4.output,
            nand3.inputs[0]
        ],
        segments: [
            [
                nand4.output,
                {
                    left: 0, relX: true,
                    top: -40, relY: true
                },
                {
                    left: 'cnn1.left',
                    top: -40, relY: true,
                    skew: true
                },
                nand3.inputs[0]
            ]
        ]
    });

    return Latch.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Latch.prototype.drawSelf = function (ctx) {
    var self = this;
    Latch.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 80 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#444444';
        self.fillText(ctx, 'M:' + self.output, self.width / 2, self.height / 2);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Latch.prototype.setTo1 = function () {
    var self = this;
    return self.children['nand3'].output.setValue(false);
};

module.exports = Latch;
},{"../conductor/Pin":46,"../conductor/Wire":47,"../gate/NAND":50,"./Circuit":25,"util":8}],34:[function(require,module,exports){
'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var Pin     = require('../conductor/Pin');
var OR      = require('../gate/OR');

util.inherits(Orer, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Orer(options) {
    var self = this;
    options = options || {};

    options.title     = 'OR';
    options.width     = 300;
    options.height    = Circuit.BYTE_HANDLER_HEIGHT;
    options.minScale  = 0.4;
    options.pinMargin = 0.15;

    Orer.super_.call(self, options);

    self.inputsA = [];
    self.inputsB = [];
    self.outputs = [];

    var pinCount = 8;

    for (var i = 0; i < pinCount; ++i) {
        var inputA = self.addPin(Pin.POS.LEFT, i, pinCount, 'a'+ i);
        self.inputsA.push(inputA);

        var inputB = self.addPin(Pin.POS.TOP, i, pinCount, 'b'+ i);
        self.inputsB.push(inputB);
    }

    for (var j = 0; j < pinCount; ++j) {
        var output = self.addPin(Pin.POS.RIGHT, j, pinCount, 'c'+ j);
        self.outputs.push(output);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Orer.prototype.init = function () {
    var self = this;
    var scale = 0.7;
    for (var i = 0; i < 8; ++i) {
        var or = new OR({
            title: 'OR' + i,
            left : self.width * 0.7,
            top  : self.getPinPoint(i, Pin.POS.LEFT, 8).top - (50 * scale) / 2,
            scale: scale
        });
        self.addChild(or);

        self.addWire({
            cnn: [
                self.inputsA[i],
                or.inputs[0]
            ],
            segment: [
                self.inputsA[i],
                {
                    top: 'cnn1.top',
                    left: 20
                },
                or.inputs[0]
            ]
        });

        self.addWire({
            cnn: [
                self.inputsB[i],
                or.inputs[1]
            ],
            segment: [
                self.inputsB[i],
                {
                    top   : 35 - 3 * i,
                    left  : self.width * self.pinMargin + 21 - 3 * i,
                    yFirst: true
                },
                {
                    left: 0, relX: true,
                    top: 'cnn1.top'
                },
                or.inputs[1]
            ]
        });

        self.addWire({
            cnn: [
                or.output,
                self.outputs[i]
            ],
            segment: [
                or.output,
                self.outputs[i]
            ]
        });
    }

    return Orer.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Orer.prototype.getTitle = function () {
    var self = this;
    var title = Orer.super_.prototype.getTitle.call(self);
    return title + ':' + self.getHexValue();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Orer.prototype.drawSelf = function (ctx) {
    var self = this;
    Orer.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 60 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = Orer;
},{"../conductor/Pin":46,"../gate/OR":53,"./Circuit":25,"util":8}],35:[function(require,module,exports){
'use strict';


var util     = require('util');
var Promise  = require('aigle');
var Circuit  = require('./Circuit');
var Byte     = require('./Byte');
var Decoder  = require('./Decoder');
var Register = require('./Register');
var BusReg   = require('./BusReg');
var AND      = require('../gate/AND');
var Wire     = require('../conductor/Wire');
var Bus      = require('../conductor/Bus');
var Pin      = require('../conductor/Pin');

Promise.each = require('aigle/each');

util.inherits(RAM, Circuit);

RAM.GRID_STEP   = 200;
RAM.GRID_STEP_V = 80;

RAM.CELL_OFFSET = {
    X: 300,
    Y: 120
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function RAM(options) {
    var self = this;
    options = options || {};

    options.title     = 'RAM256';
    options.width     = 3500;
    options.height    = 1550;
    options.pinMargin = 0.1;

    RAM.super_.call(self, options);

    self.cells    = [];
    self.setAnds  = [];
    self.enblAnds = [];

    self.addr = [];
    self.data = [];

    for (var i = 0; i < 8; ++i) {
        var addrPin = self.addPin(Pin.POS.TOP, i, 8, 'a' + i);
        self.addr.push(addrPin);
    }

    for (var j = 0; j < 8; ++j) {
        var busPin = self.addPin(Pin.POS.BOTTOM, j, 8, 'd' + j);
        self.data.push(busPin);
    }

    self.setAddrPin = self.addPin(Pin.POS.LEFT, 7, 8, 'sa');
    self.setPin     = self.addPin(Pin.POS.LEFT, 6, 8, 's');
    self.enablePin  = self.addPin(Pin.POS.LEFT, 5, 8, 'e');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
RAM.prototype.init = function () {
    var self = this;
    //console.log('RAM.prototype.init');

    self.addrReg = new Byte({
        id   : 'addrReg',
        left : 50,
        top  : 160,
        title: 'A',
        scale: 0.25
    });
    self.addChild(self.addrReg);

    self.vDec = new Decoder({
        id: 'VDec',
        inputCount: 4,
        top: 80,
        left: 140,
        scale: 0.25
    });
    self.addChild(self.vDec);

    self.hDec = new Decoder({
        id: 'HDec',
        inputCount: 4,
        top: 230,
        left: 140,
        scale: 0.25
    });
    self.addChild(self.hDec);

    // wires: address pins to address register
    self.createAddressWires();

    // wires: address register to decoders
    self.createAddrToDecoderWires();

    // create cell items: cell register, selector and, set and, enable end
    self.createCellGroups();

    // create data bus
    var dataBus = self.createDataBus();

    // wires: from decoders to cell selector's AND
    self.createSelectorWires();

    // wires: from set and enable pins to every set and enable ANDs
    self.createSetEnableWires();

    return dataBus.init().then(function () {
        return RAM.super_.prototype.init.call(self);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
RAM.prototype.createSetEnableWires = function () {
    var self = this;

    var setCnn = [self.setPin];
    for (var si = 0; si < self.setAnds.length; ++si) {
        setCnn.push(self.setAnds[si].inputs[0]);
    }
    var setWireOptions = {
        cnn: setCnn,
        segments: [
            // from the pin to bottom horizontal line
            [
                self.setPin,
                {
                    left: 50,
                    top : RAM.GRID_STEP_V * 16 + RAM.CELL_OFFSET.Y
                },
                {
                    left: RAM.GRID_STEP * 15 + RAM.CELL_OFFSET.X + 30,
                    top : 0, relY: true
                }
            ]
        ]
    };

    var enCnn = [self.enablePin];
    for (var ei = 0; ei < self.enblAnds.length; ++ei) {
        enCnn.push(self.enblAnds[ei].inputs[0]);
    }

    var enableWireOptions = {
        cnn: enCnn,
        segments: [
            // from the pin to bottom horizontal line
            [
                self.enablePin,
                {
                    left: 40,
                    top: RAM.GRID_STEP_V * 16 + RAM.CELL_OFFSET.Y + 10
                },
                {
                    left: 140 + RAM.GRID_STEP * 16,
                    top: 0,
                    relY: true
                }
            ]
        ]
    };

    for (var i = 0; i < 16; ++i) {
        setWireOptions.segments.push(
            [
                {
                    top   : RAM.GRID_STEP_V * 16 + RAM.CELL_OFFSET.Y,
                    left  : RAM.GRID_STEP * i + RAM.CELL_OFFSET.X + 30,
                    solder: i < 15
                },
                {
                    top : RAM.CELL_OFFSET.Y + 20,
                    left: 0,
                    relX: true
                }
            ]
        );
        enableWireOptions.segments.push(
            [
                {
                    left  : 340 + i * RAM.GRID_STEP,
                    top   : RAM.GRID_STEP_V * 16 + RAM.CELL_OFFSET.Y + 10,
                    solder: i < 15
                },
                {
                    top : RAM.CELL_OFFSET.Y + 40,
                    left: 0,
                    relX: true
                }
            ]
        );

        for (var j = 0; j < 16; ++j) {
            var index = i * 16 + j + 1;
            setWireOptions.segments.push([
                'cnn' + index ,
                {
                    left  : -25, relX: true,
                    top   : 0, relY: true,
                    solder: j < 15
                }
            ]);
            enableWireOptions.segments.push([
                'cnn' + index,
                {
                    left  : -15, relX: true,
                    top   : 0, relY: true,
                    solder: j < 15
                }
            ]);
        }
    }

    self.addWire(setWireOptions);
    self.addWire(enableWireOptions);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
RAM.prototype.createEnableWires = function () {
    var self = this;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
RAM.prototype.createSelectorWires = function () {
    var self = this;

    for (var i = 0; i < 16; ++i) {
        var col = i;
        // vertical selector wires
        var verticalWireOptions = {
            cnn: [self.vDec.outputs[i]],
            segments: [
                [
                    self.vDec.outputs[i],
                    {
                        left:  Bus.WIRE_STEP * 16 - Bus.WIRE_STEP * i, relX: true,
                        top :  RAM.CELL_OFFSET.Y - 20 - Bus.WIRE_STEP * i
                    },
                    {
                        left: col * RAM.GRID_STEP + RAM.CELL_OFFSET.X - 10,
                        top : 0, relY: true
                    },
                    {
                        left: 0, relX: true,
                        top : 'cnn1.top'
                    }
                ]
            ]
        };

        for (var j = 0; j < 16; ++j) {
            var vid = 'x' + i.toString(16).toUpperCase() + j.toString(16).toUpperCase();
            var vAndInput = self.children[vid].inputs[0];
            verticalWireOptions.cnn.push(vAndInput);
            verticalWireOptions.segments.push([
                vAndInput,
                {
                    left  : col * RAM.GRID_STEP + RAM.CELL_OFFSET.X - 10,
                    top   : 0, relY: true,
                    solder: j > 0
                }
            ]);
        }
        self.addWire(verticalWireOptions);

        // horizontal selector wires
        var row = 15 - i;
        var horizontalWireOptions = {
            cnn     : [self.hDec.outputs[i]],
            segments: [
                [
                    self.hDec.outputs[i],
                    {
                        left: (row > 2 ? 48 - Bus.WIRE_STEP * row: 55 + Bus.WIRE_STEP * row),
                        relX: true,
                        top : 0, relY: true
                    },
                    {
                        left  : RAM.GRID_STEP * 15 + RAM.CELL_OFFSET.X,
                        top   : row * RAM.GRID_STEP_V + RAM.CELL_OFFSET.Y - 10,
                        yFirst: true
                    }
                ]
            ]
        };

        for (var k = 0; k < 16; ++k) {
            var hid = 'x' + k.toString(16).toUpperCase() + i.toString(16).toUpperCase();
            //console.log('id:', id);
            var hAndInput = self.children[hid].inputs[1];
            horizontalWireOptions.cnn.push(hAndInput);
            horizontalWireOptions.segments.push([
                hAndInput,
                {
                    left  : 0, relX: true,
                    top   : row * RAM.GRID_STEP_V + RAM.CELL_OFFSET.Y - 10,
                    solder: k < 15
                }
            ]);
        }
        self.addWire(horizontalWireOptions);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
RAM.prototype.createAddrToDecoderWires = function () {
    var self = this;
    for (var i = 0; i < 8; ++i) {
        var decInput = i < 4 ? self.hDec.inputs[i] : self.vDec.inputs[i - 4];
        self.addWire({
            cnn: [
                self.addrReg.outputs[i],
                decInput
            ],
            segment: [
                self.addrReg.outputs[i],
                {
                    left: i < 4 ? 10 + 5 * i : 5 + 20 - 5 * (i - 4), relX: true,
                    top: 'cnn1.top'
                },
                decInput
            ]
        });
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
RAM.prototype.createAddressWires = function () {
    var self = this;
    // addr bus to addr byte
    for (var i = 0; i < 8; ++i) {
        self.addWire({
            cnn: [
                self.addr[i],
                self.addrReg.inputs[i]
            ],
            segment: [
                self.addr[i],
                {
                    top: 15 + Bus.WIRE_STEP *i,
                    left: 'cnn0.left',
                    relY: true
                },
                {
                    top: 0,
                    left: 20 + Bus.WIRE_STEP *i,
                    relY: true
                },
                {
                    top: 'cnn1.top',
                    left: 0,
                    relX: true
                },
                self.addrReg.inputs[i]
            ]
        });
    }

    // setAddr to addr byte
    self.addWire({
        cnn: [
            self.setAddrPin,
            self.addrReg.setPin
        ],
        segments: [
            [
                self.setAddrPin,
                {
                    left: 10,
                    top: 'cnn1.top'
                },
                self.addrReg.setPin
            ]
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
RAM.prototype.createDataBus = function () {
    var self = this;

    var busCnn = self.cells.map(function (cell) {
        return cell.data;
    });
    busCnn.push(self.data);

    var dataBusOptions = {
        parent  : self,
        cnn     : busCnn,
        segments: [
            [
                self.cells[255].data,
                {
                    top  : self.height - 70,
                    left : RAM.GRID_STEP * 15 + RAM.CELL_OFFSET.X + 160,
                    align: 'left',
                    flip : true
                },
                {
                    left : 30,
                    top  : self.height - 70,
                    align: 'left',
                    flip : true
                },
                {
                    top  : self.height - 30,
                    left : 30,
                    align: 'right'
                },
                self.data
            ]
        ]
    };

    for (var i = 0; i < 16; ++i) {
        if (i < 15) {
            var baseCellIndex = i * 16 + 15;
            dataBusOptions.segments.push([
                self.cells[baseCellIndex].data,
                //'cnn' + baseCellIndex,
                {
                    left  : RAM.GRID_STEP * i + RAM.CELL_OFFSET.X + 160,
                    top   : self.height - 70,
                    align : 'left',
                    flip: true,
                    solder: true
                }
            ]);
        }

        for (var j = 0; j < 15; ++j) {
            var cellIndex = i * 16 + j;
            var data = self.cells[cellIndex].data;
            dataBusOptions.segments.push([
                data,
                {
                    left : RAM.GRID_STEP * i + RAM.CELL_OFFSET.X + 160,
                    top  : 0, relY: true,
                    align: 'x',
                    flip: true,
                    solder: true
                }
            ]);
        }
    }

    var dataBus = new Bus(dataBusOptions);
    self.buses.push(dataBus);
    return dataBus;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
RAM.prototype.createCellGroups = function () {
    var self = this;

    // create cell items: cell register, selector and, set and, enable end
    for (var i = 0; i < 16; ++i) {
        var col = i;
        for (var j = 0; j < 16; ++j) {
            var row = 15 - j;
            var id = col.toString(16).toUpperCase() + j.toString(16).toUpperCase();
            //console.log('cellAddress: ' + id);

            // cell selector and
            var andX = new AND({
                id   : 'x' + id,
                title: 'X' + id,
                left : col * RAM.GRID_STEP   + RAM.CELL_OFFSET.X + 5,
                top  : row * RAM.GRID_STEP_V + RAM.CELL_OFFSET.Y,
                scale: 0.25
            });
            self.addChild(andX);

            // cell memory
            var cellReg = new BusReg({
                id   : 'cell' + id,
                left : col * RAM.GRID_STEP   + RAM.CELL_OFFSET.X + 100,
                top  : row * RAM.GRID_STEP_V + RAM.CELL_OFFSET.Y - 5,
                title: 'C' + id,
                scale: 0.10
            });
            self.addChild(cellReg);
            self.cells.push(cellReg);

            // cell setter and
            var andS = new AND({
                id   : 's' + id,
                title: 'S' + id,
                left : RAM.CELL_OFFSET.X + 60 + col * RAM.GRID_STEP,
                top  : RAM.CELL_OFFSET.Y + 10 + row * RAM.GRID_STEP_V,
                scale: 0.25
            });
            self.setAnds.push(andS);
            self.addChild(andS);

            // cell enabler
            var andE = new AND({
                id   : 'e' + id,
                title: 'E' + id,
                left : RAM.CELL_OFFSET.X + 60 + col * RAM.GRID_STEP,
                top  : RAM.CELL_OFFSET.Y + 30 + row * RAM.GRID_STEP_V,
                scale: 0.25
            });

            self.enblAnds.push(andE);
            self.addChild(andE);

            self.addWire({
                cnn: [
                    andX.output,
                    andS.inputs[1],
                    andE.inputs[1]
                ],
                segments: [
                    [
                        andX.output,
                        andS.inputs[1]
                    ],
                    [
                        andE.inputs[1],
                        {
                            top: 'cnn0.top',
                            left: -5, relX: true,
                            solder: true
                        }
                    ]
                ]
            });

            self.addWire({
                cnn: [
                    andS.output,
                    cellReg.setPin
                ],
                segments: [
                    [
                        andS.output,
                        {
                            top: 40, relY: true,
                            left: 10, relX: true
                        },
                        cellReg.setPin
                    ]
                ]
            });


            self.addWire({
                cnn: [
                    andE.output,
                    cellReg.enablePin
                ],
                segment: [
                    andE.output,
                    {
                        top: 25, relY: true,
                        left: 5, relX: true
                    },
                    cellReg.enablePin
                ]
            });
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
RAM.prototype.getPinScale = function () {
    var self = this;
    return 1 / self.scale;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
RAM.prototype.drawSelf = function (ctx) {
    var self = this;
    RAM.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 300 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
RAM.prototype.setContent = function (byteArray) {
    var self = this;
    return Promise.each(byteArray, function (byte, index) {
        return self.cells[index].setByte(byte);
    });
};

module.exports = RAM;
},{"../conductor/Bus":44,"../conductor/Pin":46,"../conductor/Wire":47,"../gate/AND":48,"./BusReg":21,"./Byte":22,"./Circuit":25,"./Decoder":29,"./Register":37,"aigle":1,"aigle/each":2,"util":8}],36:[function(require,module,exports){
'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var NAND    = require('../gate/NAND');
var NOT     = require('../gate/NOT');
var Wire    = require('../conductor/Wire');
var Pin     = require('../conductor/Pin');

util.inherits(RS, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function RS(options) {
    var self = this;
    options = options || {};

    options.width       = 440;
    options.height      = 210;
    options.inputCount  = 2;
    options.outputCount = 2;

    RS.super_.call(self, options);
    self.wires = [];

    self.inputs  = [];
    self.outputs = [];

    var inputCount  = 2;
    var outputCount = 2;

    for (var i = 0; i < inputCount; ++i) {
        var input = self.addPin(Pin.POS.LEFT, inputCount - 1 - i, inputCount);
        self.inputs.push(input);
    }

    for (var j = 0; j < outputCount; ++j) {
        var output = self.addPin(Pin.POS.RIGHT, inputCount - 1 - j, outputCount);
        self.outputs.push(output);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
RS.prototype.init = function () {
    var self = this;
    var not1 = new NOT({
        title: 'NOT1',
        left: 60,
        top  : 20
    });
    self.addChild(not1);

    var not2 = new NOT({
        title: 'NOT2',
        left: 60,
        top  : 145

    });
    self.addChild(not2);

    var nand1 = new NAND({
        title: 'NAND1',
        left  : 240,
        top   : 20
    });
    self.addChild(nand1);

    var nand2 = new NAND({
        title: 'NAND2',
        left  : 240,
        top   : 145
    });
    self.addChild(nand2);

    self.addWire({
        cnn: [
            self.inputs[0],
            not1.inputs[0]
        ],
        segment: [
            self.inputs[0],
            not1.inputs[0]
        ],
        normalize: false
    });

    self.addWire({
        cnn: [
            self.inputs[1],
            not2.inputs[0]
        ],
        segment: [
            self.inputs[1],
            not2.inputs[0]
        ],
        normalize: false
    });

    self.addWire({
        cnn: [
            not1.output,
            nand1.inputs[0]
        ],
        segment: [
            not1.output,
            nand1.inputs[0]
        ],
        normalize: false
    });

    self.addWire({
        cnn: [
            not2.output,
            nand2.inputs[1]
        ],
        segment: [
            not2.output,
            nand2.inputs[1]
        ],
        normalize: false
    });

    self.addWire({
        cnn: [
            nand1.output,
            self.outputs[0],
            nand2.inputs[0]
        ],
        segments: [
            [
                nand1.output,
                self.outputs[0]
            ],
            [
                nand1.output,
                nand2.inputs[0]
            ]
        ],
        normalize: false
    });

    self.addWire({
        cnn: [
            nand2.output,
            self.outputs[1],
            nand1.inputs[1]
        ],
        segments: [
            [
                nand2.output,
                self.outputs[1]
            ],
            [
                nand2.output,
                nand1.inputs[1]
            ]
        ],
        normalize: false
    });

    return RS.super_.prototype.init.call(self);
};

module.exports = RS;
},{"../conductor/Pin":46,"../conductor/Wire":47,"../gate/NAND":50,"../gate/NOT":52,"./Circuit":25,"util":8}],37:[function(require,module,exports){
'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var Byte    = require('./Byte');
var Enabler = require('./Enabler');
var Pin     = require('../conductor/Pin');

util.inherits(Register, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Register(options) {
    var self = this;
    options = options || {};
    options.width     = 300;
    options.height    = 290;
    options.pinMargin = 0.15;
    options.minScale  = 0.4;

    Register.super_.call(self, options);

    self.inputs  = [];
    self.outputs = [];
    self.byte    = null;

    var pinCount = 8;

    for (var i = 0; i < pinCount; ++i) {
        var input = self.addPin(Pin.POS.LEFT, i, pinCount, 'ri' + i);
        self.inputs.push(input);
    }

    for (var j = 0; j < pinCount; ++j) {
        var output = self.addPin(Pin.POS.RIGHT, j, pinCount, 'ro' + j);
        self.outputs.push(output);
    }

    self.setPin    = self.addPin(Pin.POS.BOTTOM, 3, 5, 's');
    self.enablePin = self.addPin(Pin.POS.BOTTOM, 1, 5, 'e');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Register.prototype.init = function () {
    var self = this;
    self.byte = new Byte({
        id   : 'byte1',
        title: 'B',
        left : 30,
        top  : 20,
        scale: 0.5
    });
    self.addChild(self.byte);

    var enabler = self.enabler = new Enabler({
        left : 160,
        top  : 20,
        scale: 0.5,
        debugPin: self.debugPin
    });
    self.addChild(enabler);

    for (var i = 0; i < 8; ++i) {
        // input to byte wire
        self.addWire({
            cnn: [
                self.inputs[i],
                self.byte.inputs[i]
            ],
            segments: [
                [
                    self.inputs[i],
                    {
                        left: 10, relX: true,
                        top: 'cnn1.top'
                    },
                    self.byte.inputs[i]
                ]
            ]
        });

        // enabler to output wires
        self.addWire({
            cnn: [
                enabler.outputs[i],
                self.outputs[i]
            ],
            segments: [
                [
                    enabler.outputs[i],
                    {
                        left: 10, relX: true,
                        top: 'cnn1.top'
                    },
                    self.outputs[i]
                ]
            ]
        });

        // byte to enabler wires
        self.addWire({
            cnn: [
                self.byte.outputs[i],
                enabler.inputs[i]
            ],
            segments: [
                [
                    self.byte.outputs[i],
                    enabler.inputs[i]
                ]
            ]
        });
    }

    // input set to byte's set wire
    self.addWire({
        cnn: [
            self.setPin,
            self.byte.setPin
        ],
        segments: [
            [
                self.setPin,
                {
                    left: 0, relX: true,
                    top: 'cnn1.top'
                },
                self.byte.setPin
            ]
        ]
    });

    // input enable to enabler's enable wire
    self.addWire({
        cnn: [
            self.enablePin,
            enabler.enablePin
        ],
        segments: [
            [
                self.enablePin,
                {
                    left: 0, relX: true,
                    top: 'cnn1.top'
                },
                enabler.enablePin
            ]
        ]
    });

    return Register.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Register.prototype.getTitle = function () {
    var self = this;
    var title = Register.super_.prototype.getTitle.call(self);
    return title + ':' + self.byte.getHexValue();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Register.prototype.drawSelf = function (ctx) {
    var self = this;
    Register.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 50 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = Register;
},{"../conductor/Pin":46,"./Byte":22,"./Circuit":25,"./Enabler":31,"util":8}],38:[function(require,module,exports){
'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var Pin     = require('../conductor/Pin');

util.inherits(SHL, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SHL(options) {
    var self = this;
    options = options || {};

    options.title     = 'SHL';
    options.width     = 300;
    options.height    = Circuit.BYTE_HANDLER_HEIGHT;
    options.minScale  = 0.4;
    options.pinMargin = 0.15;

    SHL.super_.call(self, options);

    self.inputs  = [];
    self.outputs = [];

    var pinCount = 8;

    for (var i = 0; i < pinCount; ++i) {
        var input = self.addPin(Pin.POS.LEFT, i, pinCount, 'i'+ i);
        self.inputs.push(input);
    }

    for (var j = 0; j < pinCount; ++j) {
        var output = self.addPin(Pin.POS.RIGHT, j, pinCount, 'o'+ j);
        self.outputs.push(output);
    }

    self.shiftOutPin = self.addPin(Pin.POS.TOP, 3, 7, 'out');
    self.shiftInPin  = self.addPin(Pin.POS.BOTTOM, 3, 7, 'in');

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
SHL.prototype.init = function () {
    var self = this;
    var basePoint = self.width * 0.25;
    var step = 25;
    for (var i = 0; i < 7; ++i) {
        var ri = 7 - i;
        self.addWire({
            cnn: [
                self.inputs[ri - 1],
                self.outputs[ri]
            ],
            segment: [
                self.inputs[ri - 1],
                {
                    left: basePoint + i * step,
                    top: 'cnn1.top'
                },
                self.outputs[ri]
            ]
        });
    }

    self.addWire({
        cnn: [
            self.shiftInPin,
            self.outputs[0]
        ],
        segment: [
            self.shiftInPin,
            {
                left  : basePoint + step * 7,
                top   : self.height - 13,
                yFirst: true
            },
            {
                left: 0, relX: true,
                top: 'cnn1.top'
            },
            self.outputs[0]
        ]
    });

    self.addWire({
        cnn: [
            self.inputs[7],
            self.shiftOutPin
        ],
        segment: [
            self.inputs[7],
            {
                left: basePoint - step,
                top: 13
            },
            self.shiftOutPin
        ]
    });

    return SHL.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
SHL.prototype.getTitle = function () {
    var self = this;
    var title = SHL.super_.prototype.getTitle.call(self);
    return title + ':' + self.getHexValue();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
SHL.prototype.drawSelf = function (ctx) {
    var self = this;
    SHL.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 60 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = SHL;
},{"../conductor/Pin":46,"./Circuit":25,"util":8}],39:[function(require,module,exports){
'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var Pin     = require('../conductor/Pin');

util.inherits(SHR, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SHR(options) {
    var self = this;
    options = options || {};

    options.title     = 'SHR';
    options.width     = 300;
    options.height    = Circuit.BYTE_HANDLER_HEIGHT;
    options.minScale  = 0.4;
    options.pinMargin = 0.15;

    SHR.super_.call(self, options);

    self.inputs  = [];
    self.outputs = [];

    var pinCount = 8;

    for (var i = 0; i < pinCount; ++i) {
        var input = self.addPin(Pin.POS.LEFT, i, pinCount, 'i'+ i);
        self.inputs.push(input);
    }

    for (var j = 0; j < pinCount; ++j) {
        var output = self.addPin(Pin.POS.RIGHT, j, pinCount, 'o'+ j);
        self.outputs.push(output);
    }

    self.shiftInPin  = self.addPin(Pin.POS.TOP, 0, 1, 'in');
    self.shiftOutPin = self.addPin(Pin.POS.BOTTOM, 0, 1, 'out');

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
SHR.prototype.init = function () {
    var self = this;
    var basePoint = self.width * 0.75;
    var step = 25;
    for (var i = 0; i < 7; ++i) {
        var ri = 7 - i;
        self.addWire({
            cnn: [
                self.inputs[ri],
                self.outputs[ri - 1]
            ],
            segment: [
                self.inputs[ri],
                {
                    left: basePoint - i * step,
                    top: 'cnn1.top'
                },
                self.outputs[ri - 1]
            ]
        });
    }

    self.addWire({
        cnn: [
            self.shiftInPin,
            self.outputs[7]
        ],
        segment: [
            self.shiftInPin,
            {
                left: 20, relX: true,
                top: 13,
                yFirst: true
            },
            {
                left: basePoint + step,
                top: 'cnn1.top'
            },
            self.outputs[7]
        ]
    });

    self.addWire({
        cnn: [
            self.inputs[0],
            self.shiftOutPin
        ],
        segments: [
            [
                self.inputs[0],
                {
                    left: basePoint - step * 7,
                    top: self.height - 13
                },
                self.shiftOutPin
            ]
        ]
    });

    return SHR.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
SHR.prototype.getTitle = function () {
    var self = this;
    var title = SHR.super_.prototype.getTitle.call(self);
    return title + ':' + self.getHexValue();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
SHR.prototype.drawSelf = function (ctx) {
    var self = this;
    SHR.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 60 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = SHR;
},{"../conductor/Pin":46,"./Circuit":25,"util":8}],40:[function(require,module,exports){
'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var Pin     = require('../conductor/Pin');

util.inherits(Seg7, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Seg7(options) {
    var self = this;

    if (options.width === undefined) {
        options.width = 70;
    }
    if (options.height === undefined) {
        options.height = 120;
    }

    Seg7.super_.call(self, options);

    self.lineSize   = 3;
    self.margin     = 5;
    self.lineHeight = self.height / 2 - self.margin * 2 - self.lineSize * 2;
    self.lineWidth  = self.width - self.margin * 2 - self.lineSize * 2;

    self.segments = [
        {
            left: self.margin + self.lineSize,
            top: self.margin,
            width: self.lineWidth,
            height: self.lineSize
        },
        {
            left: self.width - self.margin - self.lineSize,
            top: self.margin + self.lineSize,
            width: self.lineSize,
            height: self.lineHeight
        },
        {
            left: self.width - self.margin - self.lineSize,
            top: self.height / 2 + self.margin,
            width: self.lineSize,
            height: self.lineHeight
        },
        {
            left: self.margin + self.lineSize,
            top: self.height - self.margin - self.lineSize,
            width: self.lineWidth,
            height: self.lineSize
        },
        {
            left: self.margin,
            top: self.height / 2 + self.margin,
            width: self.lineSize,
            height: self.lineHeight
        },
        {
            left: self.margin,
            top: self.margin + self.lineSize,
            width: self.lineSize,
            height: self.lineHeight
        },
        {
            left: self.margin + self.lineSize,
            top: self.height / 2 - self.lineSize,
            width: self.lineWidth,
            height: self.lineSize
        }
    ];

    self.inputs = [];
    var inputCount = 7;

    for (var i = 0; i < inputCount; ++i) {
        var title = String.fromCharCode(97 + i);
        var input = self.addPin(Pin.POS.LEFT, inputCount - 1 - i, inputCount, title);
        self.inputs.push(input);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Seg7.prototype.getTitle = function () {
    //var self = this;
    return '';
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Seg7.prototype.drawSelf = function (ctx) {
    var self = this;
    Seg7.super_.prototype.drawSelf.call(self, ctx);
    for (var i = 0; i < self.inputs.length; ++i) {
        if (self.inputs[i].value) {
            var segment = self.segments[i];
            ctx.beginPath();
            self.moveTo(ctx, segment.left, segment.top);
            self.lineTo(ctx, segment.left + segment.width, segment.top);
            self.lineTo(ctx, segment.left + segment.width, segment.top + segment.height);
            self.lineTo(ctx, segment.left, segment.top + segment.height);
            self.lineTo(ctx, segment.left, segment.top);
            ctx.strokeStyle =  '#444444';
            ctx.fillStyle = '#444444';
            ctx.fill();
        }
    }
};

module.exports = Seg7;
},{"../conductor/Pin":46,"./Circuit":25,"util":8}],41:[function(require,module,exports){
'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var AND     = require('../gate/AND');
var OR      = require('../gate/OR');
var Latch   = require('./Latch');
var NOT     = require('../gate/NOT');
var Pin     = require('../conductor/Pin');

util.inherits(Stepper, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Stepper(options) {
    var self = this;
    options = options || {};

    options.stepCount = options.stepCount || 2;
    options.width     = options.stepCount * 450;
    options.height    = 500;
    options.minScale  = 0.2;
    options.pinMargin = 0.1;

    options.title = options.title || 'Stepper';

    Stepper.super_.call(self, options);

    self.outputs = [];

    self.reset = self.addPin(Pin.POS.LEFT, 7, 8, 'reset');
    self.clk   = self.addPin(Pin.POS.LEFT, 5, 8, 'clk');

    var outPos = [200, 600, 1000, 1400, 2200, self.width -200, self.width -100];
    for (var i = 0; i < options.stepCount; ++i) {
        var output = self.addPin(Pin.POS.BOTTOM, options.stepCount - 1 - i, options.stepCount, 's' + (i + 1));
        output.left = outPos[i];
        self.outputs.push(output);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Stepper.prototype.init = function () {
    var self = this;

    var gateLatch = new Latch({
        left: 270,
        top: 20,
        scale: 0.1,
        dataValue: true
    });
    self.addChild(gateLatch);

    var gateAnd = new AND({
        left: 300,
        top: 50,
        scale: 0.3
    });
    self.addChild(gateAnd);

    var not = new NOT({
        title: 'NOT',
        left : 60,
        top  : self.clk.getPoint().top - 25
    });
    self.addChild(not);

    var resetNot = new NOT({
        title: 'NOT',
        left : 180,
        top  : self.reset.getPoint().top - 25
    });
    self.addChild(resetNot);

    var point = not.output.getParentPoint();
    //console.log('not output point:', point);

    var notClkOr = new OR({
        title: 'OR1',
        left : 180,
        top  : 0 // to calc
    });
    notClkOr.top = point.top - notClkOr.inputs[0].getPoint().top;
    self.addChild(notClkOr);

    var clkOr = new OR({
        title: 'OR2',
        left : 180,
        top  : 220
    });
    self.addChild(clkOr);

    var baseLeft = 330;
    var step     = 400;
    var scale    = 0.3;

    // clk to not, clkOr.inputs[0]
    self.addWire({
        cnn: [
            self.clk,
            not.inputs[0],
            clkOr.inputs[0]
        ],
        segments: [
            [
                self.clk,
                not.inputs[0]
            ],
            [
                {
                    top: 'cnn0.top',
                    left: 30,
                    solder: true
                },
                'cnn2+'
            ]
        ]
    });

    // not ot notClkOr.inputs[0]
    self.addWire({
        cnn: [
            not.output,
            notClkOr.inputs[0]
        ],
        segment: [
            not.output,
            'cnn1+'
        ]
    });

    var notClkWireOptions = {
        cnn: [notClkOr.output],
        segments: []
    };

    var clkWireOptions = {
        cnn: [clkOr.output],
        segments: []
    };

    for (var i = 1; i < self.outputs.length; ++i) {
        var cellLeft = baseLeft + step * (i - 1);

        var latch1 = new Latch({
            title: 'L1-' + (i-1),
            id   : 'l1-' + (i-1),
            left : cellLeft,
            top  : 0, // to calc
            scale: scale
        });
        latch1.top = resetNot.output.getParentPoint().top - latch1.dataPin.getPoint().top * scale;

        self.addChild(latch1);

        var latch2 = new Latch({
            title: 'L2-' + (i-1),
            id   : 'l2-' + (i-1),
            left : cellLeft + 200,
            top  : latch1.top,
            scale: scale
        });
        self.addChild(latch2);

        var outputPoint= {left: i * 420};
        /*var latchNot = new NOT({
            title: 'NOT' + (i - 1),
            id: 'outNot' + (i - 1),
            left: outputPoint.left - 20,
            top: self.height - 120,
            debugPin: true
        });
        self.addChild(latchNot);*/

        var outputGate;

        if (i == 1) {
            outputGate = new OR({
                title: 'OR' + (i - 1),
                id  : 'outGate' + (i - 1),
                left: outputPoint.left + 70,
                top : self.height - 120 // to calc,
            });
        } else {
            outputGate = new AND({
                title: 'AND'+ (i - 1),
                id  : 'outGate' + (i - 1),
                left: outputPoint.left + 70,
                top : self.height - 120 // to calc
            });
        }
        outputGate.inputs[1].inverted = true;
        self.addChild(outputGate);

        // latch1.output to latch2.data
        self.addWire({
            cnn: [
                latch1.output,
                latch2.dataPin
            ],
            segment: [
                latch2.dataPin,
                {
                    left: -10, relX: true,
                    top: 'cnn0.top'
                },
                latch1.output
            ]
        });

        if (i > 1) {
            var prevLatch2 = self.children['l2-' + (i - 2)];
            // from previous latch2 output to latch1 data, gate.inputs[0]
            var prevOutNot = self.children['outGate' + (i - 2)];

            self.addWire({
                cnn: [
                    prevLatch2.output,
                    prevOutNot.inputs[1],
                    latch1.dataPin,
                    outputGate.inputs[0]
                ],
                segments: [
                    [
                        latch1.dataPin,
                        {
                            left: -10, relX: true,
                            top: 'cnn0.top'
                        },
                        prevLatch2.output
                    ],
                    [
                        prevLatch2.output,
                        {
                            left: cellLeft - 45,
                            top: 0, relY: true,
                            solder: true
                        },
                        {
                            left: 0, relX: true,
                            top: self.height - 150
                        },
                        'cnn3+'
                    ],
                    [
                        prevOutNot.inputs[1],
                        {
                            left: cellLeft - 45,
                            top: self.height - 150,
                            yFirst: true,
                            solder: true
                        }
                    ]
                ]
            });

            if (i == self.outputs.length - 1) {
                self.addWire({
                    cnn: [
                        latch2.output,
                        outputGate.inputs[1], self.outputs[i]
                    ],
                    segments: [
                        [
                            latch2.output,
                            {
                                left: cellLeft + 350,
                                top: self.height - 150
                            },
                            outputGate.inputs[1]
                        ],
                        [
                            self.outputs[i],
                            {
                                left: cellLeft + 350,
                                top: self.height - 150,
                                yFirst: true,
                                solder: true
                            }
                        ]
                    ]
                });
            }
        }

        notClkWireOptions.cnn.push(latch1.setPin);
        clkWireOptions.cnn.push(latch2.setPin);

        if (i == self.outputs.length - 1) {
            notClkWireOptions.segments.push([
                latch1.setPin,
                {
                    top: 'cnn0.top',
                    left: -10, relX: true
                },
                notClkOr.output
            ]);
            clkWireOptions.segments.push([
                latch2.setPin,
                {
                    top: 'cnn0.top',
                    left: -10, relX: true
                },
                clkOr.output
            ]);
        } else {
            notClkWireOptions.segments.push([
                latch1.setPin,
                {
                    top: 'cnn0.top',
                    left: -10, relX: true,
                    solder: true
                }
            ]);

            clkWireOptions.segments.push([
                latch2.setPin,
                {
                    top: 'cnn0.top',
                    left: -10, relX: true,
                    solder: true
                }
            ]);
        }

        // outGate to self.output
        self.addWire({
            cnn: [
                outputGate.output,
                self.outputs[i - 1]
            ],
            segment: [
                outputGate.output,
                {
                    left: 5, relX: true,
                    top: self.height - 50 + 5 * i
                },
                self.outputs[i - 1]
            ]
        });
    }

    // reset to reset not, notClkOr. clkOr
    var orOutGate = self.children['outGate0'];
    self.addWire({
        cnn: [
            self.reset,
            resetNot.inputs[0],
            notClkOr.inputs[1],
            clkOr.inputs[1],
            orOutGate.inputs[0]
        ],
        segments: [
            [
                self.reset,
                resetNot.inputs[0]
            ],
            [
                {
                    left: 140,
                    top: 'cnn0.top',
                    solder: true
                },
                'cnn4+'
            ],
            [
                notClkOr.inputs[1],
                {
                    left: 140,
                    top: 0, relY: true,
                    solder: true
                }
            ],
            [
                clkOr.inputs[1],
                {
                    left: 140,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            resetNot.output,
            gateAnd.inputs[0]
        ],
        segment: [
            resetNot.output,
            gateAnd.inputs[0]
        ]
    });


    self.addWire({
        cnn: [
            gateAnd.output,
            self.children['l1-0'].dataPin
        ],
        segment: [
            gateAnd.output,
            self.children['l1-0'].dataPin
        ]
    });


    self.addWire({
        cnn: [
            gateLatch.output,
            gateAnd.inputs[1]
        ],
        segment: [
            gateLatch.output,
            gateAnd.inputs[1]
        ]
    });

    // notClk.output to all latch1 set
    clkWireOptions.cnn.push(gateLatch.setPin);
    clkWireOptions.segments.push([
        'cnn0*',
        'cnn' + (clkWireOptions.cnn.length - 1) + '+'
    ]);
    self.addWire(notClkWireOptions);
    // clk.output to all latch1 set
    self.addWire(clkWireOptions);


    return Stepper.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Stepper.prototype.drawSelf = function (ctx) {
    var self = this;
    Stepper.super_.prototype.drawSelf.call(self, ctx);

    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 200 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = Stepper;
},{"../conductor/Pin":46,"../gate/AND":48,"../gate/NOT":52,"../gate/OR":53,"./Circuit":25,"./Latch":33,"util":8}],42:[function(require,module,exports){
'use strict';

var util     = require('util');
var Circuit  = require('./Circuit');
var Register = require('./Register');
var Pin      = require('../conductor/Pin');
var OR       = require('../gate/OR');
var NAND     = require('../gate/NAND');
var Switch   = require('../Switch');

util.inherits(TestCircuit, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function TestCircuit(options) {
    var self = this;
    options = options || {};
    options.width     = 400;
    options.height    = 400;
    options.minScale  = 0.4;
    options.pinMargin = 0.15;

    TestCircuit.super_.call(self, options);

    self.data = [];

    var pinCount = 1;

    for (var j = 0; j < pinCount; ++j) {
        var data = self.addPin(Pin.POS.BOTTOM, j, pinCount, 'd'+ j);
        self.data.push(data);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TestCircuit.prototype.init = function () {
    var self = this;

    /*self.or1 = new OR({
        title: 'OR1',
        top: 50,
        left: 50,
        //values: [false, true],
        debugPin: true
    });
    self.addChild(self.or1);

    self.or2 = new OR({
        title: 'OR2',
        top: 150,
        left: 50,
        debugPin: true
    });
    self.addChild(self.or2);

    self.or3 = new OR({
        title: 'OR3',
        top: 100,
        left: 250,
        debugPin: true
    });
    self.addChild(self.or3);
    self.or3.inputs[1].inverted = true;

    var wire = self.addWire({
        debugTitle: 'mainWire',
        cnn: [
            self.or1.output,
            self.or2.output,
            self.or3.inputs[1]
        ],
        segments: [
            [
                self.or1.output,
                self.or3.inputs[1]
            ],
            [
                self.or2.output,
                {
                    left: 50, relX: true,
                    offsetX: -25,
                    top: 'cnn0.top',
                    solder: true
                }
            ]
        ]
    });



    self.addWire({
        debugTitle: 'pinWire',
        cnn: [
            self.or3.output,
            self.data[0]
        ],
        segment: [
            self.or3.output,
            {
                left: 20, relX: true,
                top: 0, relY: true
            },
            {
                left: 0, relX: true,
                top: self.height - 30
            },
            self.data[0]
        ]
    });
     */

    var or1 = new OR({
        title: 'OR1',
        left: 100,
        top: 50,
        debugPin: self.debugPin
    });
    self.addChild(or1);

    Switch.createForInput(self, or1.inputs[1]);

    self.addWire({
        debugTitle: 'innerWire',
        cnn: [
            or1.output,
            self.data[0]
        ],
        segment: [
            or1.output,
            self.data[0]
        ]
    });

    return TestCircuit.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TestCircuit.prototype.drawSelf = function (ctx) {
    var self = this;
    TestCircuit.super_.prototype.drawSelf.call(self, ctx);

    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 50 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = TestCircuit;
},{"../Switch":15,"../conductor/Pin":46,"../gate/NAND":50,"../gate/OR":53,"./Circuit":25,"./Register":37,"util":8}],43:[function(require,module,exports){
'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var Pin     = require('../conductor/Pin');
var NOT     = require('../gate/NOT');
var ORR     = require('../gate/OR');

util.inherits(Zero, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Zero(options) {
    var self = this;
    options = options || {};

    options.title     = 'Z';
    options.width     = 120;
    options.height    = 200;
    options.minScale  = 0.4;
    options.pinMargin = 0.15;

    Zero.super_.call(self, options);

    self.inputs  = [];

    var pinCount = 8;

    for (var i = 0; i < pinCount; ++i) {
        var input = self.addPin(Pin.POS.LEFT, i, pinCount, 'i'+ i);
        self.inputs.push(input);
    }
    self.output = self.addPin(Pin.POS.RIGHT, 0, 1, 'z');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Zero.prototype.init = function () {
    var self = this;
    var scale = 0.4;

    var or = new ORR({
        title: 'OR',
        left: 45,
        top : self.height / 2 - 25 * scale,
        scale: scale,
        inputCount: 8
    });
    self.addChild(or);

    var not = new NOT({
        title: 'NOT',
        left: 85,
        top : self.height / 2 - 25 * scale,
        scale: scale
    });
    self.addChild(not);

    for (var i = 0; i < 8; ++i) {
        var offset = i < 4 ? 4 - i : i - 3;
        self.addWire({
            cnn:[
                self.inputs[i],
                or.inputs[i]
            ],
            segment: [
                self.inputs[i],
                {
                    left: 20  + offset * 3,
                    top: 'cnn1.top'
                },
                'cnn1+'
            ]
        });
    }

    self.addWire({
        cnn: [
            or.output,
            not.inputs[0]
        ],
        segment: [
            or.output,
            not.inputs[0]
        ]
    });

    self.addWire({
        cnn: [
            not.output,
            self.output
        ],
        segment: [
            not.output,
            self.output
        ]
    });

    return Zero.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Zero.prototype.getTitle = function () {
    var self = this;
    var title = Zero.super_.prototype.getTitle.call(self);
    return title + ':' + (self.output.value ? '1' : '0');
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Zero.prototype.drawSelf = function (ctx) {
    var self = this;
    Zero.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 30 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = Zero;
},{"../conductor/Pin":46,"../gate/NOT":52,"../gate/OR":53,"./Circuit":25,"util":8}],44:[function(require,module,exports){
'use strict';

var Promise = require('aigle');
var Wire    = require('./Wire');
var Helper  = require('../Helper');

Promise.each = require('aigle/each');

Bus.WIRE_STEP = 3;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bus(options) {
    var self = this;
    self.wires = [];

    for (var i = 0; i < 8; ++i) {
        var wireOptions = {
            parent  : options.parent,
            cnn     : [],
            segments: []
        };
        if (options.title) {
            wireOptions.title = options.title + ' w' + i;
        }

        for (var j = 0; j < options.cnn.length; ++j) {
            wireOptions.cnn.push(options.cnn[j][i]);
        }

        var offset = Bus.WIRE_STEP * (i - 4) + Bus.WIRE_STEP / 2;

        for (var n = 0; n < options.segments.length; ++n) {
            var points = options.segments[n];
            var wireSegment = [];
            for (var m = 0; m < points.length; ++m) {
                var point = points[m];
                if (typeof point === 'string') {
                    wireSegment.push(point);
                } else if (Array.isArray(point)) {
                    wireSegment.push(point[i]);
                } else {
                    var newPoint = Helper.clone(point);
                    var useOffset = offset;
                    if (point.dbl) {
                        useOffset = offset * 2
                    }
                    switch (point.align) {
                        case 'x':
                            newPoint.offsetX = point.flip ? useOffset : -useOffset;
                            break;
                        case 'y':
                            newPoint.offsetY = point.flip ? useOffset : -useOffset;
                            break;
                        case 'right':
                            newPoint.offsetX = point.flip ? -useOffset :  useOffset;
                            newPoint.offsetY = point.flip ?  useOffset : -useOffset;
                            break;
                        case 'left':
                            newPoint.offsetX = point.flip ? useOffset : -useOffset;
                            newPoint.offsetY = point.flip ? useOffset : -useOffset;
                            break;
                        default:
                            // no offset
                    }
                    wireSegment.push(newPoint);
                }
            }
            wireOptions.segments.push(wireSegment);
        }

        var busWire = new Wire(wireOptions);
        self.wires.push(busWire);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Bus.prototype.init = function () {
    var self = this;

    return Promise.each(self.wires, function (wire) {
        return wire.init();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Bus.prototype.draw = function (ctx) {
    var self = this;
    for (var i = 0; i < self.wires.length; ++i) {
        self.wires[i].draw(ctx);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Bus.prototype.clear = function () {
    var self = this;
    self.wires.forEach(function (wire) {
        wire.clear();
    });
    self.wires    = null;
};

module.exports = Bus;
},{"../Helper":12,"./Wire":47,"aigle":1,"aigle/each":2}],45:[function(require,module,exports){
'use strict';

var Promise = require('aigle');

Promise.each = require('aigle/each');

Conductor.HIGHLIGH_COLOR = '#FF00FF';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Conductor(options) {
    var self = this;
    options = options || {};

    // conductor's initial value can be true only for active pins
    self.value  = options.value  !== undefined ? !!options.value  : false;

    self.title       = options.title       || null;
    self.debugTitle  = options.debugTitle  || null;
    self.parent      = options.parent      || null;
    self.turnOnDelay = options.turnOnDelay || 0;

    // draw in highlight mode
    self.hl = false;

    // list of peer connections
    self.cnn = options.cnn || [];
    // do we get power from the corresponding peer connection
    self.pwrState = [];
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Conductor.prototype.handleCnnPwrStateUpdate = function (pwrState, cameFrom) {
    var self = this;

    var cameCnnIndex = self.cnn.indexOf(cameFrom);
    if (cameCnnIndex < 0) {
        throw new Error('Conductor: Update came from an unknown connection: ', cameFrom);
    }
    self.pwrState[cameCnnIndex] = pwrState;

    var newValue = self.detectValue();
    var changed = self.value !== newValue;
    if (changed) {
        self.value = newValue;
        if (window.debugMode === true && self.parent.debugPin === true) {
            var title = self.title || self.debugTitle;
            if (title) {
                console.log('%s %s updated to %d', self.parent.title, title, self.value ? 1 : 0);
            }
        }
    }
    // we need to propagate power state even if the value didn't change,
    // because power state depends on the number of power sources
    if (self.turnOnDelay && changed && newValue) {
        window.root._redraw();
        return Promise.delay(self.turnOnDelay).then(function () {
            return self.propagatePwrState(cameFrom);
        });
    } else {
        return self.propagatePwrState(cameFrom);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Conductor.prototype.detectValue = function () {
    var self = this;
    var value = false;
    for (var i = 0; i < self.pwrState.length; ++i) {
        if (self.pwrState[i]) {
            value = true;
            break;
        }
    }
    return value;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Conductor.prototype.propagatePwrState = function (except) {
    var self = this;
    var propagateTo = [];
    for (var i = 0; i < self.cnn.length; ++i) {
        var cnn = self.cnn[i];
        if (cnn == except || cnn.active) {
            continue;
        }
        var myCurrentPwrState = cnn.getPowerStateOf(self);
        if (self.value && !self.isTheOnlyPowerSource(cnn)) {
            // power state should be true, update it if it isn't
            if (!myCurrentPwrState) {
                propagateTo.push({
                    cnn  : cnn,
                    state: true
                });
            }
        } else {
            // power state should be false, update it if it isn't
            if (myCurrentPwrState) {
                propagateTo.push({
                    cnn  : cnn,
                    state: false
                });
            }
        }
    }
    return Promise.each(propagateTo, function (values) {
        return values.cnn.handleCnnPwrStateUpdate(values.state, self);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Conductor.prototype.getPowerStateOf = function (cnn) {
    var self = this;
    var cameCnnIndex = self.cnn.indexOf(cnn);
    if (cameCnnIndex < 0) {
        throw new Error('Conductor: Unknown connection: ', cnn);
    }
    if (self.pwrState[cameCnnIndex] !== undefined) {
        return self.pwrState[cameCnnIndex];
    } else {
        return false;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Conductor.prototype.isTheOnlyPowerSource = function (cnn) {
    var self = this;
    var cnnIndex = self.cnn.indexOf(cnn);
    var pwrSourceCount = 0;
    for (var i = 0; i < self.cnn.length; ++i) {
        if (self.pwrState[i]) {
            ++pwrSourceCount;
        }
    }
    return pwrSourceCount == 1 && self.pwrState[cnnIndex];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Conductor.prototype.clear = function () {
    var self = this;
    self.cnn      = null;
    self.pwrState = null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Conductor.prototype.toString = function () {
    var self = this;
    return self.getValue() ? '1' : '0';
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Conductor.prototype.getValue = function () {
    var self = this;
    return self.value;
};

module.exports = Conductor;
},{"aigle":1,"aigle/each":2}],46:[function(require,module,exports){
'use strict';

var Promise   = require('aigle');
var util      = require('util');
var Conductor = require('./Conductor');

Promise.each = require('aigle/each');

util.inherits(Pin, Conductor);

Pin.LENGTH = 20;

Pin.POS = {
    LEFT  : 'left',
    TOP   : 'top',
    RIGHT : 'right',
    BOTTOM: 'bottom'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Pin(options) {
    var self = this;
    options = options || {};
    Pin.super_.call(self, options);

    self.active      = options.active      !== undefined ? !!options.active      : false;
    self.inverted    = options.inverted    !== undefined ? !!options.inverted    : false;
    self.invertColor = options.invertColor !== undefined ? !!options.invertColor : false;

    self.onValueChanged = options.onValueChanged || null; // used only for gate's inactive pins

    // draw properties
    self.position    = options.position    !== undefined ? options.position    : Pin.POS.LEFT;
    self.left        = options.left        !== undefined ? options.left        : 0;
    self.top         = options.top         !== undefined ? options.top         : 0;
    self.length      = options.length      !== undefined ? options.length      : Pin.LENGTH;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Pin.prototype.setValue = function (newValue) {
    var self = this;
    if (!self.active) {
        throw new Error('Pin: setValue is only for active pins.');
    }

    if (self.value !== newValue) {
        self.value = newValue;
        if (window.debugMode === true && self.parent.debugPin === true) {
            var title = self.title || self.debugTitle;
            if (title) {
                console.log('%s %s set to %d', self.parent.title, title, (self.active ? self.getValue() : self.value) ? 1 : 0);
            }
        }
        // propagate to all connections
        return self.propagatePwrState();
        // active pins don'need to call onValueChanged
    } else {
        return Promise.resolve();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Pin.prototype.propagatePwrState = function (except) {
    var self = this;
    if (self.active) {
        // for active pins this method can be called only from setValue
        // just propagate power state to all connections
        var propagateTo = [];
        var currentValue = self.getValue();
        for (var i = 0; i < self.cnn.length; ++i) {
            var cnn = self.cnn[i];
            if (cnn.getPowerStateOf(self) !== currentValue) {
                propagateTo.push({
                    cnn  : cnn,
                    state: currentValue
                });
            }
        }
        return Promise.each(propagateTo, function (values) {
            return values.cnn.handleCnnPwrStateUpdate(values.state, self);
        });
    } else {
        return Pin.super_.prototype.propagatePwrState.call(self, except);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Pin.prototype.handleCnnPwrStateUpdate = function (pwrState, cameFrom) {
    var self = this;
    if (self.active) {
        console.warn('Pin: handleCnnPwrStateUpdate called for active pin.');
        // do nothing if active pin gets updated by wire
        return Promise.resolve();
    } else {
        var prevValue = self.value;
        return Pin.super_.prototype.handleCnnPwrStateUpdate.call(self, pwrState, cameFrom).then(function () {
            if (prevValue != self.value && self.onValueChanged) {
                return self.onValueChanged(self, self.getValue());
            }
        });
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Pin.prototype.getValue = function () {
    var self = this;
    if (self.inverted) {
        return !self.value;
    } else {
        return self.value;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Pin.prototype.getParentPoint = function (internal) {
    var self = this;
    return self.parent.toParentPoint(self.getPoint(internal));
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Pin.prototype.getPoint = function (internal) {
    var self = this;
    var point = {
        left: self.left,
        top : self.top
    };
    if (internal === true) {
        switch (self.position) {
            case Pin.POS.LEFT:
                point.left += self.length;
                break;
            case Pin.POS.RIGHT:
                point.left -= self.length;
                break;
            case Pin.POS.TOP:
                point.top += self.length;
                break;
            case Pin.POS.BOTTOM:
                point.top -= self.length;
                break;
        }
    }
    return point;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Pin.prototype.draw = function (ctx) {
    var self = this;

    var internalPoint = self.getPoint(true);
    ctx.beginPath();
    self.parent.moveTo(ctx, self.left, self.top);
    self.parent.lineTo(ctx, internalPoint.left, internalPoint.top);

    if (self.hl) {
        ctx.strokeStyle = Conductor.HIGHLIGH_COLOR;
    } else {
        if (self.inverted && self.invertColor) {
            ctx.strokeStyle = (!self.value) ? '#FF0000' :'#444444';
        } else {
            ctx.strokeStyle = self.value ? '#FF0000' :'#444444';
        }
    }

    ctx.stroke();

    // circle must be drawn separately
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Pin.prototype.drawCircle = function (ctx) {
    var self = this;
    var radius = 4;
    var internalPoint = self.getPoint(true);
    ctx.strokeStyle = '#444444';
    ctx.fillStyle   = '#F4F4F4';
    ctx.beginPath();
    self.parent.moveTo(
        ctx,
        internalPoint.left + (self.position == Pin.POS.LEFT ? 0 : radius * 2),
        internalPoint.top
    );
    self.parent.arc(
        ctx,
        internalPoint.left + (self.position == Pin.POS.LEFT ? - radius : radius),
        internalPoint.top,
        radius,
        0,
        Math.PI * 2
    );
    ctx.fill();
    ctx.stroke();
};

module.exports = Pin;
},{"./Conductor":45,"aigle":1,"aigle/each":2,"util":8}],47:[function(require,module,exports){
'use strict';

var util    = require('util');
var Promise = require('aigle');

var Conductor = require('./Conductor');
var Pin       = require('./Pin');
var Helper    = require('../Helper');

util.inherits(Wire, Conductor);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Wire(options) {
    var self = this;
    options = options || {};
    Wire.super_.call(self, options);

    self.segments = options.segments || [];
    // if wire is normalized, it will be drawn only using right angle
    self.normalize = options.normalize !== undefined ? options.normalize : true;

    if (options.segment) {
        self.segments.push(options.segment);
    }
    self.segments = self.decodeSegments(self.segments);
    self.solders  = self.getSolders(self.segments);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Wire.prototype.init = function () {
    var self = this;
    //console.log('Wire.prototype.init:', self.title || self.debugTitle || self);

    var currentValue = false;
    for (var i = 0; i < self.cnn.length; ++i) {
        var cnn = self.cnn[i];
        var cnnValue = cnn.active ? cnn.getValue() : cnn.value;
        self.pwrState.push(cnnValue);
        cnn.cnn.push(self);
        if (cnnValue) {
            currentValue = true;
        }
    }

    self.value = currentValue;
    if (currentValue) {
        return self.propagatePwrState();
    } else {
        return Promise.resolve();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Wire.prototype.decodeSegments = function (segments) {
    var self = this;
    var decodedSegments = [];
    for (var i = 0; i < segments.length; ++i) {
        var points = segments[i];
        var segmentPoints = [];
        for (var j = 0; j < points.length; ++j) {
            var point = points[j];
            var decodedPoint = self.decodePoint(point);
            var resultPoint = {
                left: decodedPoint.left,
                top : decodedPoint.top
            };
            if (decodedPoint.solder) {
                resultPoint.solder = true;
            }
            if (decodedPoint.skew) {
                resultPoint.skew = true;
            }
            if (decodedPoint.yFirst) {
                resultPoint.yFirst = true;
            }
            if (decodedPoint.flip) {
                resultPoint.flip = true;
            }
            if (decodedPoint.tag) {
                resultPoint.tag = decodedPoint.tag;
            }
            if (decodedPoint.align !== undefined) {
                resultPoint.align = decodedPoint.align;
            }

            if (decodedPoint.offsetX) {
                resultPoint.left += decodedPoint.offsetX;
            }

            if (decodedPoint.offsetY) {
                resultPoint.top += decodedPoint.offsetY;
            }

            if (j > 0) {
                var prevPoint = segmentPoints[segmentPoints.length - 1];
                if (decodedPoint.relX) {
                    resultPoint.left += prevPoint.left;
                }
                if (decodedPoint.relY) {
                    resultPoint.top += prevPoint.top;
                }
                if (decodedPoint.skew || self.normalize === false) {
                    segmentPoints.push(resultPoint);
                } else {
                    segmentPoints.push.apply(segmentPoints, Helper.getNormalPath(prevPoint, resultPoint, decodedPoint.yFirst));
                }
            } else {
                segmentPoints.push(resultPoint);
            }
        }
        decodedSegments.push(segmentPoints);
    }

    return decodedSegments;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Wire.prototype.getSolders = function (segments) {
    var solders = [];
    for (var i = 0; i < segments.length; ++i) {
        var points = segments[i];
        for (var j = 0; j < points.length; ++j) {
            var point = points[j];
            if (point.solder) {
                solders.push({
                    left: point.left,
                    top : point.top
                });
            }
        }
    }
    return solders;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Wire.prototype.decodePoint = function (point) {
    var self = this;
    if (typeof point === 'string') {
        var regex = /^cnn(\d+)(\.(left|top))?(\*)?(\+)?$/;
        var matches = point.match(regex);
        if (matches) {
            var cnnIndex = parseInt(matches[1]);
            if (cnnIndex < 0 || cnnIndex >= self.cnn.length) {
                throw new Error('Wire: Cnn ' + cnnIndex + ' not exists.');
            }
            var cnnPoint = self.getPinPos(self.cnn[cnnIndex]);
            if (matches[3] == 'left') {
                return cnnPoint.left;
            } else if (matches[3] == 'top') {
                return cnnPoint.top;
            } else {
                var resultPnt = {
                    left  : cnnPoint.left,
                    top   : cnnPoint.top
                };
                if (matches[4]) {
                    resultPnt.solder = true;
                }
                if (matches[5]) {
                    resultPnt.yFirst = true;
                }
                return resultPnt;
            }
        } else {
            throw new Error('Wire: Invalid wire format: ' + point);
        }
    } else if (point instanceof Pin) {
        return self.getPinPos(point);
    } else {
        if (typeof point.left === 'string') {
            point.left = self.decodePoint(point.left);
        }

        if (typeof point.top === 'string') {
            point.top = self.decodePoint(point.top);
        }
        return point;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Wire.prototype.getPinPos = function (pin) {
    var self = this;
    var sameParent = self.parent == pin.parent;
    var point = pin.getPoint(sameParent);
    if (sameParent) {
        return point;
    } else {
        return pin.parent.toParentPoint(point);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Wire.prototype.draw = function (ctx) {
    var self = this;
    ctx.beginPath();
    if (self.hl) {
        ctx.strokeStyle = Conductor.HIGHLIGH_COLOR;
    } else {
        ctx.strokeStyle = self.value ? '#FF0000' :'#444444';
    }

    for (var i = 0; i < self.segments.length; ++i) {
        var points = self.segments[i];
        for (var j = 0; j < points.length; ++j) {
            var point = points[j];
            if (j == 0) {
                self.parent.moveTo(ctx, point.left, point.top);
            } else {
                self.parent.lineTo(ctx, point.left, point.top);
            }
        }
    }
    ctx.stroke();

    // solders
    ctx.fillStyle = ctx.strokeStyle;
    for (var k = 0; k < self.solders.length; ++k) {
        var solderPoint = self.solders[k];
        ctx.beginPath();
        //self.parent.arc(ctx, point.left, point.top, 2, 0, 2 * Math.PI);
        self.parent.drawDot(ctx, solderPoint.left, solderPoint.top, 2, 0, 2 * Math.PI);
        ctx.fill();
    }
};

module.exports = Wire;
},{"../Helper":12,"./Conductor":45,"./Pin":46,"aigle":1,"util":8}],48:[function(require,module,exports){
'use strict';

var util = require('util');
var Gate = require('./Gate');

util.inherits(AND, Gate);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AND(options) {
    var self = this;
    if (options.inputCount !== undefined) {
        options.inputCount  = Math.max(options.inputCount, 2);
    } else {
        options.inputCount = 2;
    }
    if (options.width === undefined) {
        options.width = 60;
    }
    if (options.height === undefined) {
        options.height = 50;
    }
    options.outline = false;
    AND.super_.call(self, options);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
AND.prototype.drawSelf = function (ctx) {
    var self = this;
    var radius = self.height / 2;

    // gray line between arc and rectangle
    ctx.beginPath();
    ctx.strokeStyle = '#F4F4F4';
    if (self.flip) {
        self.moveTo(ctx, radius, self.height);
        self.lineTo(ctx, radius, 0);
    } else {
        self.moveTo(ctx, self.width - radius, self.height);
        self.lineTo(ctx, self.width - radius, 0);
    }
    ctx.stroke();

    // body and fill
    ctx.beginPath();
    ctx.strokeStyle = '#444444';
    ctx.fillStyle   = '#F4F4F4';

    if (self.flip) {
        self.moveTo(ctx, radius, 0);
        self.lineTo(ctx, self.width, 0);
        self.lineTo(ctx, self.width, self.height);
        self.lineTo(ctx, radius, self.height);

        self.moveTo(ctx, radius, 0);
        self.bezierCurveTo(
            ctx,
            -8.4, 0,
            -8.4, self.height,
            radius, self.height
        );
    } else {
        self.moveTo(ctx, self.width - radius, 0);
        self.lineTo(ctx, 0, 0);
        self.lineTo(ctx, 0, self.height);
        self.lineTo(ctx, self.width - radius, self.height);

        self.moveTo(ctx, self.width - radius, 0);
        self.bezierCurveTo(
            ctx,
            self.width + 8.4, 0,
            self.width + 8.4, self.height,
            self.width - radius, self.height
        );
    }

    ctx.fill();
    ctx.stroke();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
AND.prototype.getOutputValue = function () {
    var self = this;
    for (var i = 0; i < self.inputs.length; ++i) {
        if (!self.inputs[i].getValue()) {
            return false;
        }
    }
    return true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
AND.prototype.getTitlePos = function () {
    var self = this;
    if (self.flip) {
        return {
            left    : self.width - 3,
            top     : 0,
            baseLine: 'top'
        };
    } else {
        return {
            left    : 2,
            top     : 0,
            baseLine: 'top'
        };
    }

};

module.exports = AND;
},{"./Gate":49,"util":8}],49:[function(require,module,exports){
'use strict';

var util      = require('util');
var Component = require('../Component');
var Pin       = require('../conductor/Pin');

util.inherits(Gate, Component);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Gate(options) {
    var self = this;
    options = options || {};
    self.flip = options.flip !== undefined ? !!options.flip : false;
    Gate.super_.call(self, options);

    self.inputs = [];
    for (var i = 0; i < options.inputCount; ++i) {
        var value = options.values && options.values[i] !== undefined ? options.values[i] : undefined;
        var input = self.addPin(self.flip ? Pin.POS.RIGHT : Pin.POS.LEFT, i, options.inputCount, undefined, value);
        input.onValueChanged = self.handleInputChange.bind(self);
        input.debugTitle = 'i' + i;
        //input.title = 'i' + i;
        self.inputs.push(input);
    }

    if (self.flip) {
        self.output = self.addPin(Pin.POS.LEFT,  0, 1);
    } else {
        self.output = self.addPin(Pin.POS.RIGHT, 0, 1);
    }
    self.output.active = true;
    self.output.debugTitle = 'o';
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Gate.prototype.init = function () {
    var self = this;
    return Gate.super_.prototype.init.call(self).then(function () {
        return self.handleInputChange();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Gate.prototype.handleInputChange = function () {
    var self = this;
    return self.output.setValue(self.getOutputValue());
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Gate.prototype.getOutputValue = function () {
    //var self = this;
    return false;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Gate.prototype.getTitleAlign = function () {
    var self = this;
    return self.flip ? 'right' : 'left';
};

module.exports = Gate;
},{"../Component":11,"../conductor/Pin":46,"util":8}],50:[function(require,module,exports){
'use strict';

var util = require('util');
var AND  = require('./AND');

util.inherits(NAND, AND);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function NAND(options) {
    var self = this;
    NAND.super_.call(self, options);
    self.output.inverted    = true;
    self.output.invertColor = true;

}

module.exports = NAND;
},{"./AND":48,"util":8}],51:[function(require,module,exports){
'use strict';

var util = require('util');
var OR   = require('./OR');

util.inherits(NOR, OR);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function NOR(options) {
    var self = this;
    NOR.super_.call(self, options);
    self.output.inverted    = true;
    self.output.invertColor = true;
}

module.exports = NOR;
},{"./OR":53,"util":8}],52:[function(require,module,exports){
'use strict';

var util = require('util');
var Gate = require('./Gate');

util.inherits(NOT, Gate);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function NOT(options) {
    var self = this;
    options.inputCount  = 1;
    options.width  = options.width  !== undefined ? options.width  : 40;
    options.height = options.height !== undefined ? options.height : 50;

    options.outline = false;
    NOT.super_.call(self, options);
    self.output.inverted    = true;
    self.output.invertColor = true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
NOT.prototype.drawSelf = function (ctx) {
    var self = this;
    ctx.strokeStyle = '#444444';
    ctx.fillStyle   = '#F4F4F4';
    var halfHeight = self.height / 2;

    // triangle
    ctx.beginPath();
    if (self.flip) {
        self.moveTo(ctx, self.width, 0);
        self.lineTo(ctx, 0, halfHeight);
        self.lineTo(ctx, self.width, self.height);
        self.lineTo(ctx, self.width, 0);
    } else {
        self.moveTo(ctx, 0, 0);
        self.lineTo(ctx, self.width, halfHeight);
        self.lineTo(ctx, 0, self.height);
        self.lineTo(ctx, 0, 0);
    }
    ctx.fill();
    ctx.stroke();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
NOT.prototype.getOutputValue = function () {
    var self = this;
    // will be inverted by pin
    return self.inputs[0].getValue();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
NOT.prototype.getTitlePos = function () {
    var self = this;
    return {
        left    : self.flip ? self.width - 4 : 3,
        top     : self.height / 2 - 1,
        baseLine: 'middle'
    };
};

module.exports = NOT;
},{"./Gate":49,"util":8}],53:[function(require,module,exports){
'use strict';

var util = require('util');
var Gate = require('./Gate');

util.inherits(OR, Gate);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OR(options) {
    var self = this;
    if (options.inputCount !== undefined) {
        options.inputCount  = Math.max(options.inputCount, 2);
    } else {
        options.inputCount = 2;
    }
    if (options.width === undefined) {
        options.width = 60;
    }
    if (options.height === undefined) {
        options.height = 50;
    }
    options.outline = false;
    OR.super_.call(self, options);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
OR.prototype.drawSelf = function (ctx) {
    var self = this;

    ctx.beginPath();
    ctx.strokeStyle = '#444444';
    ctx.fillStyle   = '#F4F4F4';

    if (self.flip) {
        var topPointF = {
            left: self.width,
            top : 0
        };

        var rightPointF = {
            left: 0,
            top : self.height / 2
        };

        var bottomPointF = {
            left: self.width,
            top : self.height
        };

        var point1F = {
            left: topPointF.left - self.width / 3 * 2,
            top : topPointF.top - 1
        };

        var point2F = {
            left: rightPointF.left + 7,
            top : rightPointF.top - 15
        };

        self.moveTo(ctx, topPointF.left, topPointF.top);
        self.bezierCurveTo(
            ctx,
            point1F.left, point1F.top,
            point2F.left, point2F.top,
            rightPointF.left, rightPointF.top
        );

        self.bezierCurveTo(
            ctx,
            rightPointF.left + 7, rightPointF.top + 15,
            bottomPointF.left - self.width / 3 * 2, bottomPointF.top + 1,
            bottomPointF.left, bottomPointF.top
        );

        self.bezierCurveTo(
            ctx,
            bottomPointF.left - 10, bottomPointF.top - 10,
            topPointF.left - 10, topPointF.top + 10,
            topPointF.left, topPointF.top
        );
    } else {
        var topPoint = {
            left: 0,
            top : 0
        };

        var rightPoint = {
            left: self.width,
            top : self.height / 2
        };

        var bottomPoint = {
            left: 0,
            top : self.height
        };

        var point1 = {
            left: topPoint.left + self.width / 3 * 2,
            top : topPoint.top - 1
        };

        var point2 = {
            left: rightPoint.left - 7,
            top : rightPoint.top - 15
        };

        self.moveTo(ctx, topPoint.left, topPoint.top);
        self.bezierCurveTo(
            ctx,
            point1.left, point1.top,
            point2.left, point2.top,
            rightPoint.left, rightPoint.top
        );

        self.bezierCurveTo(
            ctx,
            rightPoint.left - 7, rightPoint.top + 15,
            bottomPoint.left + self.width / 3 * 2, bottomPoint.top + 1,
            bottomPoint.left, bottomPoint.top
        );

        self.bezierCurveTo(
            ctx,
            bottomPoint.left + 10, bottomPoint.top - 10,
            topPoint.left + 10, topPoint.top + 10,
            topPoint.left, topPoint.top
        );
    }

    ctx.fill();
    ctx.stroke();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
OR.prototype.getOutputValue = function () {
    var self = this;
    for (var i = 0; i < self.inputs.length; ++i) {
        if (self.inputs[i].getValue() === true) {
            return true;
        }
    }
    return false;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
OR.prototype.getTitlePos = function () {
    var self = this;
    return {
        left    : self.flip ? self.width - 9 : 7,
        top     : 2,
        baseLine: 'top'
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
OR.prototype.getPinPoint = function (index, position, count) {
    var self = this;
    var point = OR.super_.prototype.getPinPoint.apply(self, arguments);
    if (self.flip) {
        if (position == 'right') {
            point.length += 8;
        }
    } else {
        if (position == 'left') {
            point.length += 8;
        }
    }
    return point;
};

module.exports = OR;
},{"./Gate":49,"util":8}],54:[function(require,module,exports){
'use strict';

var util = require('util');
var OR   = require('./OR');

util.inherits(XOR, OR);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function XOR(options) {
    var self = this;
    XOR.super_.call(self, options);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
XOR.prototype.drawSelf = function (ctx) {
    var self = this;
    XOR.super_.prototype.drawSelf.call(self, ctx);

    var leftOffset = 5;
    // inputs arc
    ctx.beginPath();

    if (self.flip) {
        var topPointF = {
            left: self.width,
            top : 0
        };

        var bottomPointF = {
            left: self.width,
            top : self.height
        };

        self.moveTo(ctx, leftOffset + bottomPointF.left, bottomPointF.top);
        self.bezierCurveTo(
            ctx,
            leftOffset + bottomPointF.left - 10, bottomPointF.top - 10,
            leftOffset + topPointF.left - 10, topPointF.top + 10,
            leftOffset + topPointF.left, topPointF.top
        );
    } else {
        var topPoint = {
            left: 0,
            top: 0
        };

        var bottomPoint = {
            left: 0,
            top : self.height
        };

        self.moveTo(ctx, -leftOffset + bottomPoint.left, bottomPoint.top);
        self.bezierCurveTo(
            ctx,
            -leftOffset + bottomPoint.left + 10, bottomPoint.top - 10,
            -leftOffset + topPoint.left + 10, topPoint.top + 10,
            -leftOffset + topPoint.left, topPoint.top
        );
    }

    ctx.stroke();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
XOR.prototype.getOutputValue = function () {
    var self = this;
    var result = XOR.xor(self.inputs[0].getValue(), self.inputs[1].getValue());
    for(var i = 2; i < self.inputs.length; ++i ) {
        result = XOR.xor(result, self.inputs[i].getValue());
    }
    return result;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
XOR.xor = function (a, b) {
    return a !== b;
};

module.exports = XOR;
},{"./OR":53,"util":8}],55:[function(require,module,exports){
'use strict';

var ALU    = require('../circuit/ALU');
var Helper = require('../Helper');
var Switch = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;
    var alu = new ALU({
        left: 50,
        top: 50
    });
    self.addChild(alu);

    alu.inputsA.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    alu.inputsB.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    alu.op.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    Switch.createForInput(self, alu.carryIn);

    return self.initChildren().then(function () {
        return self.initWires();
    });
};
},{"../Helper":12,"../Switch":15,"../circuit/ALU":17}],56:[function(require,module,exports){
'use strict';

var DFlipFlop = require('../circuit/DFlipFlop');
var Switch    = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;
    var fdf1 = new DFlipFlop({
        id: 'fdf1',
        title: 'DFlipFlop',
        left: 100,
        top: 60,
        scale: 1
    });
    self.addChild(fdf1);

    Switch.createForInput(self, fdf1.dataPin);
    Switch.createForInput(self, fdf1.setPin);

    return self.initChildren().then(function () {
        return self.initWires();
    });
};


},{"../Switch":15,"../circuit/DFlipFlop":28}],57:[function(require,module,exports){
'use strict';

var ADD    = require('../circuit/ADD');
var Adder  = require('../circuit/Adder');
var Switch = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;
    var add = new ADD({
        left: 100,
        top: 50
    });
    self.addChild(add);

    Switch.createForInput(self, add.inputA);
    Switch.createForInput(self, add.inputB);
    Switch.createForInput(self, add.carryIn);

    var adder = new Adder({
        left: 100,
        top: 400,
        scale: 2
    });
    self.addChild(adder);

    Switch.createForInput(self, adder.carryIn);
    for (var i = 0; i < 8; ++i) {
        Switch.createForInput(self, adder.inputsA[i]);
        Switch.createForInput(self, adder.inputsB[i]);
    }

    return self.initChildren().then(function () {
        return self.initWires();
    });
};
},{"../Switch":15,"../circuit/ADD":16,"../circuit/Adder":18}],58:[function(require,module,exports){
'use strict';

var Bus1   = require('../circuit/Bus1');
var Switch = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;

    var bus1 = new Bus1({
        left: 100,
        top: 100
    });
    self.addChild(bus1);

    Switch.createForInput(self, bus1.bus1);

    for (var i = 0; i < 8; ++i) {
        Switch.createForInput(self, bus1.inputs[i]);
    }

    return self.initChildren().then(function () {
        return self.initWires();
    });
};
},{"../Switch":15,"../circuit/Bus1":20}],59:[function(require,module,exports){
'use strict';

var Register = require('../circuit/Register');
var Bus      = require('../conductor/Bus');
var Switch   = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;
    var reg1 = new Register({
        id: 'reg1',
        title: 'REG1',
        top: 200,
        left: 100,
        scale: 0.8
    });
    self.addChild(reg1);
    Switch.createForInput(self, reg1.setPin);
    Switch.createForInput(self, reg1.enablePin);

    var reg2 = new Register({
        id: 'reg2',
        title: 'REG2',
        top: 200,
        left: 600,
        scale: 0.8
    });
    self.addChild(reg2);
    Switch.createForInput(self, reg2.setPin);
    Switch.createForInput(self, reg2.enablePin);

    for (var i = 0; i < 8; ++i) {
        Switch.createForInput(self, reg1.inputs[i]);
    }

    var bus = new Bus({
        parent: self,
        cnn: [
            reg1.outputs,
            reg2.outputs,
            reg2.inputs
        ],
        segments: [
            [
                reg1.outputs,
                {
                    left: 400,
                    top: 100,
                    align: 'left'
                },
                {
                    left: 900,
                    top: 0, relY: true,
                    align: 'x',
                    flip: true
                },
                'cnn1+'
            ],
            [
                {
                    left: 500,
                    top: 100,
                    solder: true,
                    align: 'right'
                },
                'cnn2+'
            ]
        ]
    });

    self.buses.push(bus);

    return self.initChildren().then(function () {
        bus.init();
    }).then(function () {
        return self.initWires();
    });
};

},{"../Switch":15,"../circuit/Register":37,"../conductor/Bus":44}],60:[function(require,module,exports){
'use strict';

var $     = require('jquery');
var Clock = require('../circuit/Clock');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;

    var clock = new Clock({
        left: 50,
        top : 50
    });
    self.addChild(clock);

    return self.initChildren().then(function () {
        $('#tick').click(function () {
            clock.doTick().catch(function (err) {
                console.log('tick error:', err.stack);
            });
        });
        //clock.scheduleTick();
    });
};
},{"../circuit/Clock":26,"jquery":4}],61:[function(require,module,exports){
'use strict';

var CMP        = require('../circuit/CMP');
var Comparator = require('../circuit/Comparator');
var Switch     = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;
    var cmp = new CMP({
        left: 100,
        top: 50
    });
    self.addChild(cmp);

    Switch.createForInput(self, cmp.eqInPin);
    Switch.createForInput(self, cmp.largerInPin);
    Switch.createForInput(self, cmp.inputA);
    Switch.createForInput(self, cmp.inputB);

    var comparator = new Comparator({
        left: 100,
        top: 350
    });
    self.addChild(comparator);

    comparator.inputsA.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    comparator.inputsB.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    return self.initChildren().then(function () {
        return self.initWires();
    });
};

},{"../Switch":15,"../circuit/CMP":23,"../circuit/Comparator":27}],62:[function(require,module,exports){
'use strict';

var $        = require('jquery');
var CPU      = require('../circuit/CPU');
var RAM      = require('../circuit/RAM');
var Bus      = require('../conductor/Bus');
var Assembly = require('../Assembly');

module.exports = function () {
    var self = this;

    var cpu = new CPU({
        id: 'cpu',
        left: 50,
        top: 50
    });
    self.addChild(cpu);

    var ram = new RAM({
        id: 'ram',
        left: 1200,
        top: 100,
        scale: 0.4
    });
    self.addChild(ram);

    self.addWire({
        cnn: [
            cpu.sAddrPin,
            ram.setAddrPin
        ],
        segment: [
            cpu.sAddrPin,
            ram.setAddrPin
        ]
    });

    self.addWire({
        cnn: [
            cpu.sRamPin,
            ram.setPin
        ],
        segment: [
            cpu.sRamPin,
            ram.setPin
        ]
    });

    self.addWire({
        cnn: [
            cpu.eRamPin,
            ram.enablePin
        ],
        segment: [
            cpu.eRamPin,
            ram.enablePin
        ]
    });

    return self.initChildren().then(function () {
        var program = 'data r0, 0x10\ndata r1, 0x15\n add r0, r1';
        var binary = Assembly.translate(program);
        return ram.setContent(binary);
    }).then(function () {
        var bus = new Bus({
            parent: self,
            cnn: [
                cpu.data,
                ram.addr,
                ram.data
            ],
            segments: [
                [
                    cpu.data,
                    {
                        left: 1150,
                        top: cpu.top + cpu.height + 40,
                        yFirst: true,
                        align: 'left',
                        flip: true
                    },
                    {
                        left: 1150,
                        top: 50,
                        align: 'left',
                        flip: true
                    },
                    ram.addr
                ],
                [
                    {
                        left: 1150,
                        top: 750,
                        yFirst: true,
                        align: 'right',
                        solder: true
                    },
                    ram.data
                ]
            ]
        });
        self.buses.push(bus);
        return bus.init();
    }).then(function () {
        return self.initWires();
    }).then(function () {
        $('#tick').click(function () {
            cpu.clock.doTick().catch(function (err) {
                console.log('tick error:', err.stack);
            });
        });
        //cpu.clock.scheduleTick();
    });
};
},{"../Assembly":10,"../circuit/CPU":24,"../circuit/RAM":35,"../conductor/Bus":44,"jquery":4}],63:[function(require,module,exports){
'use strict';

var Decoder7Seg = require('../circuit/Decoder7Seg');
var Seg7        = require('../circuit/Seg7');
var Switch      = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;

    var dec1 = new Decoder7Seg({
        id: "dec1",
        title: "Seg7Dec",
        left: 100,
        top: 50
    });
    self.addChild(dec1);

    for (var i = 0; i < dec1.inputs.length; ++i) {
        Switch.createForInput(self, dec1.inputs[i]);
    }

    var seg7 = new Seg7({
        id   : "seg7",
        title: "Seg7",
        left : 660,
        top  : 20
    });
    self.addChild(seg7);

    for (var j = 0; j < 7; ++j) {
        self.addWire({
            cnn: [
                dec1.outputs[j],
                seg7.inputs[j]

            ],
            segment: [
                dec1.outputs[j],
                {
                    left: 40 + j * 5, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        });

    }

    return self.initChildren().then(function () {
        return self.initWires();
    });
};


},{"../Switch":15,"../circuit/Decoder7Seg":30,"../circuit/Seg7":40}],64:[function(require,module,exports){
'use strict';

var Decoder = require('../circuit/Decoder');
var Enabler = require('../circuit/Enabler');
var Switch  = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;
    self.debugPin = true;

    var dec1 = new Decoder({
        id        : 'dec1',
        title     : 'DEC1',
        inputCount: 4,
        top       : 50,
        left      : 100,
        flip      : true,
        reversed  : true
    });
    self.addChild(dec1);

    var dec2 = new Decoder({
        id        : 'dec2',
        title     : 'DEC2',
        inputCount: 4,
        top       : 50,
        left      : 500,
        debugPin: true
    });
    self.addChild(dec2);

    var enabler = new Enabler({
        left: 800,
        top: 50,
        scale: 0.5,
        debugPin: true
    });
    self.addChild(enabler);

    self.addWire({
        title: 'mainWire',
        cnn: [
            dec2.outputs[0],
            enabler.enablePin
        ],
        segment: [
            dec2.outputs[0],
            enabler.enablePin
        ]
    });

    for (var i = 0; i < 4; ++i) {
        Switch.createForInput(self, dec1.inputs[i]);
        Switch.createForInput(self, dec2.inputs[i]);
    }

    return self.initChildren().then(function () {
        return self.initWires();
    });
};
},{"../Switch":15,"../circuit/Decoder":29,"../circuit/Enabler":31}],65:[function(require,module,exports){
'use strict';

var AND    = require('../gate/AND');
var OR     = require('../gate/OR');
var NOR    = require('../gate/NOR');
var NOT    = require('../gate/NOT');
var XOR    = require('../gate/XOR');
var NAND   = require('../gate/NAND');
var Switch = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;
    var createGate = createGateFunc.bind(self);

    self.debugPin = true;

    var nand1 = createGate({
        gateClass: NAND,
        id: "nand1",
        title: "NAND1",
        debugPin: self.debugPin,
        left: 100,
        top: 50
    });

    var and1 = createGate({
        gateClass: AND,
        id: "and1",
        title: "AND1",
        debugPin: self.debugPin,
        left: 300,
        top: 50
    });
    and1.inputs[1].inverted = true;

    var not1 = createGate({
        gateClass: NOT,
        id: "not1",
        title: "NOT1",
        debugPin: self.debugPin,
        left: 500,
        top: 50
    });

    var xor1 = createGate({
        gateClass: XOR,
        id: 'xor1',
        title: 'XOR1',
        debugPin: self.debugPin,
        left: 100,
        top: 150
    });

    var xor2 = createGate({
        gateClass: XOR,
        id: "xor2",
        title: "XOR2",
        debugPin: self.debugPin,
        left: 250,
        top: 150,
        flip: true,
        inputCount: 3
    });

    var or1 = createGate({
        gateClass: OR,
        id: "or1",
        title: "OR1",
        debugPin: self.debugPin,
        left: 500,
        top: 150,
        inputCount: 3
    });
    or1.inputs[0].inverted = true;

    var nor1 = createGate({
        gateClass: NOR,
        id: "nor1",
        title: "NOR1",
        debugPin: self.debugPin,
        left: 100,
        top: 250
    });

    var not2 = createGate({
        gateClass: NOT,
        id: "not2",
        title: "NOT2",
        left: 250,
        debugPin: self.debugPin,
        top: 250,
        flip: true,
        inputs: [false]
    });
    //self.addChild(not2);

    var and2 = createGate({
        gateClass: AND,
        id: "and2",
        title: "AND2",
        debugPin: self.debugPin,
        left: 450,
        top: 250,
        flip: true
    });

    var or2 = createGate({
        gateClass: OR,
        id: "or2",
        title: "OR2",
        debugPin: self.debugPin,
        left: 650,
        top: 250,
        flip: true
    });

    return self.initChildren().then(function () {
        return self.initWires();
    });
};

function createGateFunc(options) {
    var self = this;

    var gate = new options.gateClass(options);
    self.addChild(gate);

    for (var i = 0; i < gate.inputs.length; ++i) {
        Switch.createForInput(self, gate.inputs[i]);
    }

    return gate;
}
},{"../Switch":15,"../gate/AND":48,"../gate/NAND":50,"../gate/NOR":51,"../gate/NOT":52,"../gate/OR":53,"../gate/XOR":54}],66:[function(require,module,exports){
'use strict';

var Latch  = require('../circuit/Latch');
var Switch = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;
    var latch1 = new Latch({
        id   : 'latch1',
        title: 'Latch',
        left : 100,
        top  : 60,
        debugPin: true
    });
    self.addChild(latch1);

    Switch.createForInput(self, latch1.dataPin);
    Switch.createForInput(self, latch1.setPin);

    return self.initChildren().then(function () {
    }).then(function () {
        return self.initWires();
    }).then(function () {
        //console.log('setting to 1');
        //return latch1.setTo1();
    });
};

},{"../Switch":15,"../circuit/Latch":33}],67:[function(require,module,exports){
'use strict';

var SHR      = require('../circuit/SHR');
var SHL      = require('../circuit/SHL');
var Inverter = require('../circuit/Inverter');
var Ander    = require('../circuit/Ander');
var Orer     = require('../circuit/Orer');
var Zero     = require('../circuit/Zero');
var Adder    = require('../circuit/Adder');
var Switch   = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;

    var shr = new SHR({
        top: 50,
        left: 100,
        scale: 0.6
    });
    self.addChild(shr);

    Switch.createForInput(self, shr.shiftInPin);
    shr.inputs.forEach(function (input) {
        Switch.createForInput(self, input);
    });


    var shl = new SHL({
        top: 50,
        left: 400,
        scale: 0.6
    });
    self.addChild(shl);
    Switch.createForInput(self, shl.shiftInPin);
    shl.inputs.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    var inv = new Inverter({
        top: 50,
        left: 700,
        scale: 0.6
    });
    self.addChild(inv);
    inv.inputs.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    var ander = new Ander({
        top: 500,
        left: 100,
        scale: 0.6
    });
    self.addChild(ander);
    ander.inputsA.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    ander.inputsB.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    var orer = new Orer({
        top: 500,
        left: 400,
        scale: 0.6
    });
    self.addChild(orer);

    orer.inputsA.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    orer.inputsB.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    var zero = new Zero({
        top: 500,
        left: 700
    });
    self.addChild(zero);
    zero.inputs.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    var adder = new Adder({
        top: 900,
        left: 100,
        scale: 0.6
    });
    self.addChild(adder);

    adder.inputsA.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    adder.inputsB.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    Switch.createForInput(self, adder.carryIn);

    return self.initChildren().then(function () {
        return self.initWires();
    });
};
},{"../Switch":15,"../circuit/Adder":18,"../circuit/Ander":19,"../circuit/Inverter":32,"../circuit/Orer":34,"../circuit/SHL":38,"../circuit/SHR":39,"../circuit/Zero":43}],68:[function(require,module,exports){
'use strict';

var RAM    = require('../circuit/RAM');
var Switch = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;

    var ram1 = new RAM({
        left: 100,
        top: 50,
        scale: 1
    });
    self.addChild(ram1);

    Switch.createForInput(self, ram1.setAddrPin);
    Switch.createForInput(self, ram1.setPin);
    Switch.createForInput(self, ram1.enablePin);

    for (var i = 0; i < 8; ++i) {
        Switch.createForInput(self, ram1.addr[i]);
        Switch.createForInput(self, ram1.data[i]);
    }

    return self.initChildren().then(function () {
        return ram1.setContent([1,2,3,4,5,6]);
    }).then(function () {
        return self.initWires();
    });
};


},{"../Switch":15,"../circuit/RAM":35}],69:[function(require,module,exports){
'use strict';

var Register = require('../circuit/Register');
var Switch   = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;
    var register1 = new Register({
        id: "register1",
        title: "R1",
        left: 100,
        top: 50
    });
    self.addChild(register1);
    Switch.createForInput(self, register1.setPin);
    Switch.createForInput(self, register1.enablePin);

    for (var i = 0; i < 8; ++i) {
        Switch.createForInput(self, register1.inputs[i]);
    }

    return self.initChildren().then(function () {
        return self.initWires();
    });
};

},{"../Switch":15,"../circuit/Register":37}],70:[function(require,module,exports){
'use strict';

var NAND   = require('../gate/NAND');
var Switch = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;
    self.debugPin = true;

    var nor1 = new NAND({
        title: 'NAND1',
        left: 200,
        top: 100,
        debugPin: self.debugPin
    });
    self.addChild(nor1);

    Switch.createForInput(self, nor1.inputs[1], true);

    var nor2 = new NAND({
        title: 'NAND2',
        left: 200,
        top: 200,
        debugPin: self.debugPin

    });
    self.addChild(nor2);
    Switch.createForInput(self, nor2.inputs[0], true);

    self.addWire({
        cnn: [
            nor1.output,
            nor2.inputs[1]
        ],
        segment: [
            nor1.output,
            {
                left: 0, relX: true,
                top: 35, relY: true
            },
            {
                left: 'cnn1.left',
                top: 25, relY: true,
                skew: true
            },
            nor2.inputs[1]
        ]
    });

    self.addWire({
        cnn: [
            nor2.output,
            nor1.inputs[0]
        ],
        segment: [
            nor2.output,
            {
                left: 0, relX: true,
                top: -40, relY: true
            },
            {
                left: 'cnn1.left',
                top: -25, relY: true,
                skew: true
            },
            nor1.inputs[0]
        ]
    });

    return self.initChildren().then(function () {
        return self.initWires();
    });
};

},{"../Switch":15,"../gate/NAND":50}],71:[function(require,module,exports){
'use strict';

var $       = require('jquery');
var Clock   = require('../circuit/Clock');
var Stepper = require('../circuit/Stepper');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;

    var clock = new Clock({
        left: 50,
        top: 120,
        scale: 0.2
    });
    self.addChild(clock);

    var stepper = new Stepper({
        left     : 150,
        top      : 50,
        stepCount: 7,
        scale    : 0.2
    });
    self.addChild(stepper);

    self.addWire({
        turnOnDelay: 300,
        cnn: [
            stepper.outputs[6],
            stepper.reset
        ],
        segment: [
            stepper.outputs[6],
            {
                left: 80, relX: true,
                top: -140, relY: true
            },
            stepper.reset
        ]
    });

    self.addWire({
        cnn: [
            clock.clk,
            stepper.clk
        ],
        segment: [
            clock.clk,
            {
                left: 20, relX: true,
                top: 0, relY: true
            },
            stepper.clk
        ]
    });

    return self.initChildren().then(function () {
        return self.initWires();
    }).then(function () {
        $('#tick').click(function () {
            clock.doTick().catch(function (err) {
                console.log('tick error:', err.stack);
            });
        });
        //clock.scheduleTick();
    });
};
},{"../circuit/Clock":26,"../circuit/Stepper":41,"jquery":4}],72:[function(require,module,exports){
'use strict';

var RS     = require('../circuit/RS');
var BusReg = require('../circuit/BusReg');
var Switch = require('../Switch');
var Label  = require('../Label');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;

    var rs = new RS({
        title: 'RS',
        top: 50,
        left: 100
    });
    self.addChild(rs);

    Switch.createForInput(self, rs.inputs[0]);
    Switch.createForInput(self, rs.inputs[1]);

    var busReg = new BusReg({
        title: 'BusReg',
        top: 300,
        left: 50
    });
    self.addChild(busReg);

    Switch.createForInput(self, busReg.setPin);
    Switch.createForInput(self, busReg.enablePin);

    for (var i = 0; i < 8; ++i) {
        Switch.createForInput(self, busReg.data[i]);
    }

    var label = new Label({
        left    : 10,
        top     : 10,
        title   : 'Sample Label',
        fontSize: 12
    });
    self.addChild(label);

    return self.initChildren().then(function () {
        return self.initWires();
    });
};
},{"../Label":13,"../Switch":15,"../circuit/BusReg":21,"../circuit/RS":36}],73:[function(require,module,exports){
'use strict';

var OR          = require('../gate/OR');
var TestCircuit = require('../circuit/TestCircuit');
var AND         = require('../gate/AND');
var Switch      = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;

    self.debugPin = true;

    var testCircuit = new TestCircuit({
        title: 'TestCircuit',
        top: 50,
        left: 50,
        debugPin: self.debugPin
    });
    self.addChild(testCircuit);

    var orA = new OR({
        title: 'OR-A',
        left: 100,
        top: 500,
        debugPin: self.debugPin
    });
    self.addChild(orA);

    var orB = new OR({
        title: 'OR-B',
        left: 400,
        top: 500,
        debugPin: self.debugPin
    });
    self.addChild(orB);

    Switch.createForInput(self, orA.inputs[1]);

    self.addWire({
        debugTitle: 'outerWire',
        cnn: [
            testCircuit.data[0],
            orA.output,
            orB.inputs[1]
        ],
        segments: [
            [
                testCircuit.data[0],
                'cnn2+'
            ],
            [
                'cnn0*',
                orA.output
            ]
        ]
    });

    return self.initChildren().then(function () {
        return self.initWires();
    });
};
},{"../Switch":15,"../circuit/TestCircuit":42,"../gate/AND":48,"../gate/OR":53}]},{},[9]);
