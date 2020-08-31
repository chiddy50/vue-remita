!(function(e) {
  function t(i) {
    if (n[i]) return n[i].exports;
    var o = (n[i] = { i: i, l: !1, exports: {} });
    return e[i].call(o.exports, o, o.exports, t), (o.l = !0), o.exports;
  }
  var n = {};
  (t.m = e),
    (t.c = n),
    (t.d = function(e, n, i) {
      t.o(e, n) ||
        Object.defineProperty(e, n, {
          configurable: !1,
          enumerable: !0,
          get: i,
        });
    }),
    (t.n = function(e) {
      var n =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return t.d(n, "a", n), n;
    }),
    (t.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (t.p = ""),
    t((t.s = 12));
})([
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = n(1),
      o = n(2),
      r = (function() {
        function e() {}
        return (
          (e.log = function(e, t) {
            void 0 === t && (t = ""),
              i.environment.production || console.log(e, t);
          }),
          (e.error = function(e, t) {
            i.environment.production || console.error(e, t);
          }),
          (e.randomId = function() {
            return o().replace(/-/g, "");
          }),
          e
        );
      })();
    t.UtilService = r;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.environment = { production: !0 }),
      t.environment.production ||
        console.log("Current environment: ", t.environment);
  },
  function(e, t, n) {
    function i(e, t, n) {
      var i = (t && n) || 0;
      "string" == typeof e &&
        ((t = "binary" === e ? new Array(16) : null), (e = null)),
        (e = e || {});
      var a = e.random || (e.rng || o)();
      if (((a[6] = (15 & a[6]) | 64), (a[8] = (63 & a[8]) | 128), t))
        for (var s = 0; s < 16; ++s) t[i + s] = a[s];
      return t || r(a);
    }
    var o = n(3),
      r = n(4);
    e.exports = i;
  },
  function(e, t) {
    var n =
      ("undefined" != typeof crypto &&
        crypto.getRandomValues &&
        crypto.getRandomValues.bind(crypto)) ||
      ("undefined" != typeof msCrypto &&
        "function" == typeof window.msCrypto.getRandomValues &&
        msCrypto.getRandomValues.bind(msCrypto));
    if (n) {
      var i = new Uint8Array(16);
      e.exports = function() {
        return n(i), i;
      };
    } else {
      var o = new Array(16);
      e.exports = function() {
        for (var e, t = 0; t < 16; t++)
          0 == (3 & t) && (e = 4294967296 * Math.random()),
            (o[t] = (e >>> ((3 & t) << 3)) & 255);
        return o;
      };
    }
  },
  function(e, t) {
    function n(e, t) {
      var n = t || 0,
        o = i;
      return [
        o[e[n++]],
        o[e[n++]],
        o[e[n++]],
        o[e[n++]],
        "-",
        o[e[n++]],
        o[e[n++]],
        "-",
        o[e[n++]],
        o[e[n++]],
        "-",
        o[e[n++]],
        o[e[n++]],
        "-",
        o[e[n++]],
        o[e[n++]],
        o[e[n++]],
        o[e[n++]],
        o[e[n++]],
        o[e[n++]],
      ].join("");
    }
    for (var i = [], o = 0; o < 256; ++o)
      i[o] = (o + 256).toString(16).substr(1);
    e.exports = n;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = n(6),
      o = (function() {
        function e() {}
        return (
          (e.prototype.init = function(e) {
            return new i.InlinePaymentEngineComponent().init(e);
          }),
          e
        );
      })();
    t.InlinePaymentEngineModule = o;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = n(7),
      o = n(0),
      r = n(8),
      a = n(9),
      s = n(10),
      l = n(11),
      d = (function() {
        function e() {
          (this.INLINE_SCRIPT_NAME = "remita-pay-inline"),
            (this.IFRAME_CLASS_NAME = "iframe-pop"),
            (this.APP_LOADER_ID = "js-app-loader"),
            (this.OMITTED_PAYMENT_KEYS = ["onClose", "onSuccess", "onError"]),
            (this.view = new i.InlinePaymentEngineView());
        }
        return (
          (e.prototype.init = function(e) {
            this.view.setupAppLoader(this.APP_LOADER_ID);
            try {
              this.isValidPaymentOptions(e) &&
                ((this.eventMethod = window.addEventListener
                  ? "addEventListener"
                  : "attachEvent"),
                (this.eventer = window[this.eventMethod]),
                (this.messageEvent =
                  "attachEvent" == this.eventMethod ? "onmessage" : "message"),
                (e.transactionId = e.transactionId || o.UtilService.randomId()),
                (e.id = e.transactionId),
                (this.defaultOptions = new r.PaymentEngineOptions(e)),
                o.UtilService.log("Site Base ", this.siteBaseUrl),
                (this.siteBaseUrl =
                  void 0 !== e.config && e.config.host
                    ? e.config.host
                    : this.getInlineScriptPathUrl()),
                void 0 === e.config ||
                  e.config.host ||
                  (e.config.host = this.siteBaseUrl),
                (this.htmlPath = this.siteBaseUrl + "/base-template.html"),
                this.buildPaymentWidget(this.defaultOptions),
                this.listenForCloseEvent(),
                o.UtilService.log("init component", e),
                o.UtilService.log(
                  "init component this.defaultOptions",
                  this.defaultOptions
                ));
            } catch (t) {
              this.addDataCollectionFormBehaviour(e, t),
                t.publickey && t.narration
                  ? this.view.showInfoCollectionForm(this.APP_LOADER_ID, e, t)
                  : this.view.showPublicKeyError(this.APP_LOADER_ID, e, t);
            }
            return this;
          }),
          (e.prototype.addDataCollectionFormBehaviour = function(e, t) {
            var n = this;
            document
              .getElementById(this.APP_LOADER_ID)
              .addEventListener("click", function(e) {
                e.target.matches(".close-data-collect") &&
                  ((document.body.style.overflow = ""), n.closePaymentWidget());
              }),
              document
                .getElementById(this.APP_LOADER_ID)
                .addEventListener("submit", function(i) {
                  i.target.matches("#data-collect-form") &&
                    (t.firstName ||
                      (e.firstName = document.getElementById(
                        "data-collect-firstName"
                      ).value),
                    t.lastName ||
                      (e.lastName = document.getElementById(
                        "data-collect-lastName"
                      ).value),
                    t.email ||
                      (e.email = document.getElementById(
                        "data-collect-email"
                      ).value),
                    t.amount ||
                      (e.amount = document.getElementById(
                        "data-collect-amount"
                      ).value),
                    n.removeAppLoadingView(),
                    n.init(e).showPaymentWidget()),
                    i.stopPropagation();
                });
          }),
          (e.prototype.getInlineScriptPathUrl = function() {
            for (
              var e = document.getElementsByTagName("script"),
                t = "https://login.remita.net/payment/v1",
                n = 0;
              n < e.length;
              n++
            ) {
              var i = e[n];
              if (i && i.src) {
                var o = i.src.indexOf(this.INLINE_SCRIPT_NAME);
                if (-1 != o) {
                  t = i.src.substring(0, o - 1);
                  break;
                }
              }
            }
            return t;
          }),
          (e.prototype.isValidPaymentOptions = function(e) {
            if (!e)
              throw new Error(
                "Please provide the required payment options to continue."
              );
            if (!e.processRrr) {
              var t =
                  l.Validators.isString(e.firstName) && e.firstName.length > 0,
                n = l.Validators.isString(e.lastName) && e.lastName.length > 0,
                i = l.Validators.isString(e.email) && e.email.length > 0,
                o = l.Validators.isNumber(parseFloat(e.amount)),
                r = l.Validators.isString(e.key) && e.key.length > 0,
                a =
                  l.Validators.isString(e.narration) && e.narration.length > 0;
              if (!(t && n && i && o && r && a))
                throw {
                  firstName: t,
                  lastName: n,
                  email: i,
                  amount: o,
                  publickey: r,
                  narration: a,
                };
            }
            return !0;
          }),
          (e.prototype.buildPaymentWidget = function(e) {
            o.UtilService.log("building payment widget"),
              (this.isIframeLoaded = !1),
              (this.isIframeOpen = !1),
              (e.metadata.referrer = this.view.getWindowHref()),
              (e.metadata = JSON.stringify(e.metadata)),
              (e.extendedData = JSON.stringify(e.extendedData)),
              (e.config = JSON.stringify(e.config));
            var t = this.view.deleteKeysFromObject(
              e,
              this.OMITTED_PAYMENT_KEYS
            );
            o.UtilService.log("params", t);
            var n = this.htmlPath + "?" + this.view.serialize(t);
            this.setupPaymentWidget(n),
              o.UtilService.log("params", {
                options: e,
                params: t,
                iframeSrcPath: n,
              });
          }),
          (e.prototype.setupPaymentWidget = function(e) {
            var t = this,
              n = 10 * this.view.getHighestZIndex("div"),
              i = "z-index: " + Math.max(n, 999999);
            (i +=
              "\n        ;\ndisplay: none;\n        \nbackground: transparent;\n        \nbackground: rgba(0,0,0,0.005);\n        \nborder: 0px none transparent;\n        \noverflow-x: hidden;\n        \noverflow-y: hidden;\n        \nvisibility: hidden;\n        \nmargin: 0;\n        \npadding: 0;\n        \n-webkit-tap-highlight-color: transparent;\n        \n-webkit-touch-callout: none; position: fixed;\n        \nleft: 0;\n        \ntop: 0;\n        \nwidth: 100%;\n        \nheight: 100%;\n        "),
              (this.view.appendPaymentIframe({
                id: this.defaultOptions.id,
                src: e,
                cssText: i,
                className: this.IFRAME_CLASS_NAME,
                parent: document.body,
                disableSandboxMode: this.defaultOptions.disableSandboxMode,
              }).onload = function() {
                t.isIframeLoaded = !0;
              });
          }),
          (e.prototype.listenForCloseEvent = function() {
            var e = this;
            try {
              window.addEventListener(
                this.messageEvent,
                function(t) {
                  var n = t.data || t.message;
                  if (n && "string" == typeof n) {
                    var i = e.view.parseResponse(n, e.defaultOptions);
                    if (!i.isIframe) return;
                    e.handleIframeEvents(i);
                  }
                },
                !1
              );
            } catch (e) {
              o.UtilService.error("CloseEventException ", e);
            }
          }),
          (e.prototype.handleIframeEvents = function(e) {
            var t = e.action,
              n = e.data;
            switch (t) {
              case a.RmIframeEventType.RemitaCloseAppLoader:
                this.removeAppLoadingView();
                break;
              case a.RmIframeEventType.RemitaClose:
                n ? this.handleSuccess(n) : this.performCloseEvent();
                break;
              case a.RmIframeEventType.RemitaError:
                n && this.handleError(n);
                break;
              case a.RmIframeEventType.RemitaConfigError:
                this.handleConfigError(n);
                break;
              case a.RmIframeEventType.RemitaOpen:
                break;
              default:
                this.closePaymentWidget();
            }
          }),
          (e.prototype.displayPaymentIframe = function(e) {
            e.contentWindow.postMessage(
              a.RmIframeEventType.RemitaOpen + " " + this.defaultOptions.id,
              "*"
            ),
              (this.isIframeOpen = !0),
              this.view.displayPaymentIframe(this.defaultOptions.id);
          }),
          (e.prototype.openIframe = function() {
            this.showPaymentWidget();
          }),
          (e.prototype.showPaymentWidget = function() {
            var e,
              t = this;
            !this.isIframeOpen &&
              this.defaultOptions &&
              this.defaultOptions.id &&
              ((e = document.getElementById(this.defaultOptions.id)),
              this.isIframeLoaded
                ? this.displayPaymentIframe(e)
                : (e.onload = function() {
                    t.displayPaymentIframe(e), (t.isIframeLoaded = !0);
                  }));
          }),
          (e.prototype.closePaymentWidget = function() {
            this.isIframeOpen &&
              ((this.isIframeOpen = !1),
              this.view.hidePaymentIframe(this.defaultOptions.id)),
              this.removeAppLoadingView();
          }),
          (e.prototype.removeAppLoadingView = function() {
            var e = document.getElementById(this.APP_LOADER_ID);
            e && e.remove();
          }),
          (e.prototype.handleSuccess = function(e) {
            var t = new s.ChargeResponse(JSON.parse(e));
            this.defaultOptions.onSuccess &&
              (this.defaultOptions.onSuccess.call(this, t),
              this.performCloseEvent());
          }),
          (e.prototype.handleError = function(e) {
            var t = new s.ChargeResponse(JSON.parse(e));
            this.defaultOptions.onError &&
              t &&
              this.defaultOptions.onError.call(this, t);
          }),
          (e.prototype.handleConfigError = function(e) {
            var t = new s.ChargeResponse(JSON.parse(e));
            this.defaultOptions.onError &&
              t &&
              (this.defaultOptions.onError.call(this, t),
              this.performCloseEvent());
          }),
          (e.prototype.performCloseEvent = function() {
            this.defaultOptions.onClose &&
              (this.defaultOptions.onClose.call(this),
              this.closePaymentWidget());
          }),
          e
        );
      })();
    t.InlinePaymentEngineComponent = d;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = (function() {
      function e() {}
      return (
        (e.prototype.parseResponse = function(e, t) {
          var n, i, o, r, a;
          return "string" == typeof e
            ? ((n = e.split(" ")[0]),
              n &&
                ((i = e.split(" ")),
                (o = i[1]),
                (r = i.slice(2).join(" ")),
                (a = t.id == o)),
              { action: n, isIframe: a, data: r })
            : null;
        }),
        (e.prototype.deleteKeysFromObject = function(e, t) {
          for (var n = JSON.parse(JSON.stringify(e)), i = 0; i < t.length; i++)
            delete n[t[i]];
          for (var o in n) n.hasOwnProperty(o) && !n[o] && delete n[o];
          return n;
        }),
        (e.prototype.serialize = function(e) {
          return Object.keys(e)
            .map(function(t) {
              return encodeURIComponent(t) + "=" + encodeURIComponent(e[t]);
            })
            .join("&");
        }),
        (e.prototype.getWindowHref = function() {
          var e = window.location.href;
          return e && e.length > 500 && (e = e.split("?")[0]), e;
        }),
        (e.prototype.getHighestZIndex = function(e) {
          for (
            var t = document.getElementsByTagName(e), n = 0, i = 0;
            i < t.length;
            i++
          ) {
            var o = document.defaultView
              .getComputedStyle(t[i], null)
              .getPropertyValue("z-index");
            o > n && "auto" != o && (n = o);
          }
          return parseInt(0);
        }),
        (e.prototype.appendPaymentIframe = function(e) {
          var t = document.createElement("iframe");
          return (
            t.setAttribute("frameBorder", "0"),
            t.setAttribute("allowtransparency", "true"),
            e.disableSandboxMode ||
              t.setAttribute(
                "sandbox",
                "allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-popups-to-escape-sandbox"
              ),
            (t.style.cssText = e.cssText),
            (t.id = t.name = e.id),
            (t.src = e.src),
            (t.className = e.className),
            e.parent.appendChild(t),
            t
          );
        }),
        (e.prototype.displayPaymentIframe = function(e) {
          var t = document.getElementById(e);
          (t.style.display = "block"),
            (t.style.visibility = "visible"),
            (document.body.style.overflow = "hidden");
        }),
        (e.prototype.hidePaymentIframe = function(e) {
          var t = document.getElementById(e);
          (t.style.display = "none"),
            (t.style.visibility = "hidden"),
            (document.body.style.overflow = ""),
            t.remove();
        }),
        (e.prototype.setupAppLoader = function(e) {
          var t = document.createElement("div");
          (t.style.cssText =
            "\n            position: fixed;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            background: rgba(0, 0, 0, 0.73);\n            z-index: 99;\n            overflow: auto;\n        "),
            t.setAttribute("id", e),
            (t.innerHTML = this.getAppLoaderTemplate()),
            document.body.appendChild(t);
        }),
        (e.prototype.getAppLoaderTemplate = function() {
          return '\n            <div id="remita_section" \n            style="margin: 0;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);\n            ">\n                <svg style="margin: 20px; display: inline-block;" width="100px" height="100px" viewBox="0 0 464 156" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n                \n                    <defs></defs>\n                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n                        <g id="Remita_Ellipses">\n                            <g id="Page-1" transform="translate(14.000000, 6.000000)">\n                                <path d="M69.0157101,130.697805 C53.2804909,146.425721 27.7676839,146.425721 12.0324647,130.697805 C-3.70275452,114.969888 -3.70275452,89.4689227 12.0324647,73.7410066 C27.7676839,58.0130905 53.2804909,58.0130905 69.0157101,73.7410066 C84.7509293,89.4689227 84.7509293,114.969888 69.0157101,130.697805" id="Fill-13" fill="#F16521" transform="translate(0 1.70667)">\n                    <animateTransform attributeName="transform" dur="0.8s" type="translate" values="0 15 ; 0 -15; 0 15" repeatCount="indefinite" begin="0.00"></animateTransform>\n                </path>\n                                <path d="M69.0157101,73.7423454 C84.7509293,89.4702615 84.7509293,114.971227 69.0157101,130.699143 C53.2804909,146.427059 27.7676839,146.427059 12.0324647,130.699143" id="Fill-15" fill="#D95129" transform="translate(0 1.70667)">\n                    <animateTransform attributeName="transform" dur="0.8s" type="translate" values="0 15 ; 0 -15; 0 15" repeatCount="indefinite" begin="0.00"></animateTransform>\n                </path>\n                                <path d="M231.263125,126.847491 C210.392663,147.708266 176.554174,147.708266 155.683712,126.847491 C134.815929,105.986715 134.815929,72.1639309 155.683712,51.3031556 C176.554174,30.4450579 210.392663,30.4450579 231.263125,51.3031556 C252.133587,72.1639309 252.133587,105.986715 231.263125,126.847491" id="Fill-17" fill="#F16521" transform="translate(0 15.952)">\n                <animateTransform attributeName="transform" dur="0.8s" type="translate" values="0 18 ; 0 -18; 0 18" repeatCount="indefinite" begin="0.25"></animateTransform>\n                </path>\n                                <path d="M231.263125,51.3047622 C252.133587,72.1655375 252.133587,105.988322 231.263125,126.849097 C210.392663,147.707195 176.554174,147.707195 155.683712,126.849097" id="Fill-19" fill="#D95129" transform="translate(0 15.952)">\n                <animateTransform attributeName="transform" dur="0.8s" type="translate" values="0 18 ; 0 -18; 0 18" repeatCount="indefinite" begin="0.25"></animateTransform>\n                </path>\n                                <path d="M415.074006,121.625737 C387.238687,149.448137 342.109092,149.448137 314.268416,121.625737 C286.435776,93.8033372 286.435776,48.692011 314.268416,20.8669337 C342.109092,-6.95546606 387.238687,-6.95546606 415.074006,20.8669337 C442.912003,48.692011 442.912003,93.8033372 415.074006,121.625737" id="Fill-21" fill="#1CA78B" transform="translate(0 -14.1169)">\n                <animateTransform attributeName="transform" dur="0.8s" type="translate" values="0 23 ; 0 -23; 0 23" repeatCount="indefinite" begin="0.4"></animateTransform>\n                </path>\n                                <path d="M415.074006,20.868808 C442.912003,48.6912077 442.912003,93.8025339 415.074006,121.627611 C387.238687,149.450011 342.109092,149.450011 314.268416,121.627611" id="Fill-23" fill="#168972" transform="translate(0 -8.36689)">\n                <animateTransform attributeName="transform" dur="0.8s" type="translate" values="0 23 ; 0 -23; 0 23" repeatCount="indefinite" begin="0.4"></animateTransform>\n                </path>\n                            </g>\n                        </g>\n                    </g>\n                </svg>\n            </div>\n        ';
        }),
        (e.prototype.showInfoCollectionForm = function(e, t, n) {
          document.body.style.overflow = "hidden";
          var i = "font-weight: 600;margin-bottom: 5px;",
            o =
              "width: 100%;margin-bottom: 10px;height: 3rem;padding: 6px 12px;background-color: #fff;background-image: none;border: 1px solid #ccc;",
            r =
              '\n    <div style="padding: 30px;margin: 50px auto;height: 500px;max-width: 400px;background-color: #FFFFFF;box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);border-radius: 6px;position: relative;">\n    <button type="button" style="-webkit-appearance: none;padding: 0;cursor: pointer;background: transparent;border: 0;font-size: 30px;position: absolute;top: 5px;right: 20px;" class="close-data-collect" aria-label="Close">&times;</button>\n    <form id="data-collect-form">\n    <span style="display: block;text-align: center;">\n    \x3c!--?xml version="1.0" encoding="UTF-8"?--\x3e\n    <svg width="98px" height="30px" viewBox="0 0 56 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n        \x3c!-- Generator: sketchtool 52.5 (67469) - http://www.bohemiancoding.com/sketch --\x3e\n        <title>7337B6BB-C344-4138-818C-8830AB9191AF</title>\n        <desc>Created with sketchtool.</desc>\n        <defs>\n            <polygon id="path-1" points="3.78919723 10.2363416 0 10.2363416 0 0.00341211388 7.57839445 0.00341211388 7.57839445 10.2363416"></polygon>\n            <polygon id="path-3" points="0.0516099155 10.0657359 2.43633551 10.0657359 2.43633551 0.0553871385 0.0516099155 0.0553871385 0.0516099155 10.0657359"></polygon>\n        </defs>\n        <g id="New-Payment-Screens" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n            <g id="Origin_Screen" transform="translate(-701.000000, -461.000000)">\n                <g id="Group-2" transform="translate(381.000000, 139.000000)">\n                    <g id="Group-3-Copy" transform="translate(213.000000, 308.000000)">\n                        <g id="Group-5">\n                            <g id="pay_remita_large_btn_logo" transform="translate(107.000000, 14.000000)">\n                                <path d="M50.4464696,13.920401 C48.7842176,14.0569708 47.4031405,12.9063207 47.4031405,10.8978652 C47.4031405,8.89154225 48.7813626,7.76375331 50.4411675,7.89494909 C53.8767712,8.16629745 53.881176,13.6383045 50.4464696,13.920401 L50.4464696,13.920401 Z M55.7445819,6.36393359 L55.743603,6.36393359 L55.743603,6.15383268 C55.743603,6.04285368 55.6568116,5.95294448 55.5496274,5.95294448 L53.5547292,5.95294448 C53.4476266,5.95294448 53.3607536,6.04285368 53.3607536,6.15383268 L53.3607536,6.35676815 L53.3618956,6.35779179 L53.3607536,6.35779179 L53.3607536,6.40709683 C53.3509651,6.50519511 53.2399471,6.53624534 53.173222,6.46646762 C52.7827421,6.05812289 51.4916377,5.68023128 50.3147326,5.68023128 C47.502086,5.6600145 45.2951034,7.45998987 45.2951034,10.8978652 C45.2951034,14.3963909 47.4043641,16.2164124 50.2561647,16.1964515 C51.3182995,16.1763201 52.5372137,16.0389825 53.360672,14.9019808 L53.360672,16.0294286 C53.360672,16.1403223 53.4476266,16.2302315 53.5547292,16.2302315 L55.5496274,16.2302315 C55.6568116,16.2302315 55.743603,16.1403223 55.743603,16.0294286 L55.743603,15.6463335 L55.7445819,15.3051221 L55.7445819,6.36393359 Z" id="Fill-1" fill="#F16521"></path>\n                                <path d="M9.61935575,11.7876592 C9.77556404,13.0212237 10.810862,13.9111883 12.4904887,13.9111883 C13.3694153,13.9111883 14.5217675,13.5672472 15.0687005,12.9809607 L16.5922004,14.5379936 C15.576561,15.6300406 13.9162666,16.1558474 12.4513346,16.1558474 C9.13090913,16.1558474 7.15819822,14.0324036 7.15819822,10.8371296 C7.15819822,7.80376035 9.15056772,5.61966625 12.2756309,5.61966625 C15.4984976,5.61966625 17.5101178,7.6824597 17.1391333,11.7876592 L9.61935575,11.7876592 Z M14.8538427,9.74508254 C14.6976344,8.45086774 13.7210674,7.80376035 12.3537758,7.80376035 C11.0646292,7.80376035 10.0098357,8.45086774 9.65834664,9.74508254 L14.8538427,9.74508254 Z" id="Fill-3" fill="#F16521"></path>\n                                <g id="Group-7" transform="translate(0.000000, 5.997899)">\n                                    <mask id="mask-2" fill="#F16521">\n                                        <use xlink:href="#path-1"></use>\n                                    </mask>\n                                    <g id="Clip-6"></g>\n                                    <path d="M5.09790461,0.00341211388 C4.12141923,0.00341211388 3.12503055,0.185533692 2.38297997,1.41909816 L2.38297997,0.443916015 C2.38297997,0.333022314 2.29610695,0.243113114 2.18892277,0.243113114 L0.19410614,0.243113114 C0.086921963,0.243113114 -3.26283644e-05,0.333022314 -3.26283644e-05,0.443916015 L-3.26283644e-05,1.03736792 L-3.26283644e-05,1.40758228 L-3.26283644e-05,1.73599824 L-3.26283644e-05,2.70435616 L-3.26283644e-05,8.2457997 L-3.26283644e-05,8.76657358 L0.00225135715,8.76921797 L-3.26283644e-05,8.77058281 L-3.26283644e-05,9.5013723 L-3.26283644e-05,10.0353681 C-3.26283644e-05,10.1463471 0.086921963,10.2363416 0.19410614,10.2363416 L2.18892277,10.2363416 C2.29610695,10.2363416 2.38297997,10.1463471 2.38297997,10.0353681 L2.38297997,8.99527051 C2.38297997,8.94485653 2.38860837,8.89708694 2.38297997,8.84846431 L2.38297997,7.30098537 L2.38297997,4.97827415 C2.38297997,3.13820644 3.53525066,2.45049488 4.78532488,2.45049488 C5.5665295,2.45049488 6.01582207,2.67287941 6.50426869,3.09751698 L7.57839445,0.953941737 C7.05112008,0.407918214 6.09388544,0.00341211388 5.09790461,0.00341211388" id="Fill-5" fill="#F16521" mask="url(#mask-2)"></path>\n                                </g>\n                                <g id="Group-10" transform="translate(34.586066, 6.168505)">\n                                    <mask id="mask-4" fill="#F16521">\n                                        <use xlink:href="#path-3"></use>\n                                    </mask>\n                                    <g id="Clip-9"></g>\n                                    <path d="M2.43633551,8.80984771 L2.43633551,4.72691225 L2.43543823,4.72691225 L2.43543823,0.25619004 C2.43543823,0.145296339 2.3485652,0.0553871385 2.24129946,0.0553871385 L0.246564393,0.0553871385 C0.139380216,0.0553871385 0.0523440537,0.145296339 0.0523440537,0.25619004 L0.0523440537,6.92550783 C0.0523440537,6.92900524 0.0533229047,6.93233205 0.0534860465,6.93582947 L0.0534860465,8.59599348 L0.056667312,8.60000271 L0.0523440537,8.60000271 L0.0523440537,8.81325983 C0.052099341,8.81906042 0.0516099155,8.82511692 0.0516099155,8.83117343 C0.0516099155,8.83714463 0.052099341,8.84311582 0.0523440537,8.84908702 L0.0523440537,9.86478802 C0.0523440537,9.97576703 0.139380216,10.0657615 0.246564393,10.0657615 L2.24129946,10.0657615 C2.3485652,10.0657615 2.43543823,9.97576703 2.43543823,9.86478802 L2.43543823,8.84951354 C2.4355198,8.84328643 2.43633551,8.83722993 2.43633551,8.83117343 C2.43633551,8.82511692 2.43576451,8.81906042 2.43543823,8.81317453 L2.43543823,8.80993302 L2.43633551,8.80984771 Z" id="Fill-8" fill="#F16521" mask="url(#mask-4)"></path>\n                                </g>\n                                <path d="M29.1190207,6.12273126 C27.8690281,6.12273126 26.7556667,6.52706676 25.8962356,7.94275281 C25.3493027,6.56750031 24.1969504,6.08229771 23.0445981,6.08229771 C22.1265175,6.08229771 21.0132377,6.44619966 20.5055404,7.45737961 L20.5055404,6.44184921 C20.5055404,6.33087021 20.4185858,6.24096101 20.3114016,6.24096101 L18.316585,6.24096101 C18.2094008,6.24096101 18.1225278,6.33087021 18.1225278,6.44184921 L18.1225278,7.71362936 L18.1225278,8.70228935 L18.1225278,13.7689373 L18.1225278,14.7645068 L18.1225278,16.0293774 C18.1225278,16.1402711 18.2094008,16.2302656 18.316585,16.2302656 L20.3114016,16.2302656 C20.4185858,16.2302656 20.5055404,16.1402711 20.5055404,16.0293774 L20.5055404,14.7645068 L20.5055404,10.8954255 C20.5055404,9.58082338 21.2672495,8.38769246 22.5563147,8.38769246 C23.8648752,8.38769246 24.5290256,9.58082338 24.5290256,10.8954255 L24.5290256,14.7645068 L24.5351434,14.7720987 L24.5351434,16.0333013 C24.5351434,16.1442803 24.6220164,16.2341895 24.7292006,16.2341895 L26.7240172,16.2341895 C26.8312014,16.2341895 26.918156,16.1442803 26.918156,16.0333013 L26.918156,13.2989186 L26.911875,13.2989186 L26.911875,10.8954255 C26.911875,9.58082338 27.7126567,8.428126 29.0018033,8.428126 C30.2908685,8.428126 30.818306,9.54038983 30.818306,10.8548214 L30.818306,13.7689373 L30.8181428,13.7689373 L30.8181428,16.0293774 C30.8181428,16.1402711 30.9050974,16.2302656 31.0122,16.2302656 L33.0070167,16.2302656 C33.1142824,16.2302656 33.2011554,16.1402711 33.2011554,16.0293774 L33.2011554,14.7645068 L33.2011554,13.7689373 L33.2011554,10.8548214 C33.2011554,7.86188571 31.8534408,6.12273126 29.1190207,6.12273126" id="Fill-11" fill="#F16521"></path>\n                                <path d="M26.9025107,4.16384522 C26.4233632,4.66491414 25.6464818,4.66491414 25.1673343,4.16384522 C24.6881867,3.66277629 24.6881867,2.85035198 25.1673343,2.34928306 C25.6464818,1.84821413 26.4233632,1.84821413 26.9025107,2.34928306 C27.3816582,2.85035198 27.3816582,3.66277629 26.9025107,4.16384522" id="Fill-13" fill="#F16521"></path>\n                                <path d="M26.9025107,2.34932571 C27.3816582,2.85039463 27.3816582,3.66281894 26.9025107,4.16388787 C26.4233632,4.66495679 25.6464818,4.66495679 25.1673343,4.16388787" id="Fill-15" fill="#F16521"></path>\n                                <path d="M31.8430487,4.04117972 C31.2075297,4.7057742 30.177126,4.7057742 29.541607,4.04117972 C28.9061696,3.37658524 28.9061696,2.29903968 29.541607,1.6344452 C30.177126,0.969936021 31.2075297,0.969936021 31.8430487,1.6344452 C32.4785677,2.29903968 32.4785677,3.37658524 31.8430487,4.04117972" id="Fill-17" fill="#F16521"></path>\n                                <path d="M31.8430487,1.63449638 C32.4785677,2.29909086 32.4785677,3.37663642 31.8430487,4.0412309 C31.2075297,4.70574008 30.177126,4.70574008 29.541607,4.0412309" id="Fill-19" fill="#F16521"></path>\n                                <path d="M37.4402081,3.87482211 C36.5926047,4.76120399 35.2183796,4.76120399 34.3706131,3.87482211 C33.5230913,2.98844023 33.5230913,1.55125786 34.3706131,0.664790677 C35.2183796,-0.221591206 36.5926047,-0.221591206 37.4402081,0.664790677 C38.287893,1.55125786 38.287893,2.98844023 37.4402081,3.87482211" id="Fill-21" fill="#1CA78B"></path>\n                                <path d="M37.4402081,0.664850389 C38.287893,1.55123227 38.287893,2.98841464 37.4402081,3.87488182 C36.5926047,4.7612637 35.2183796,4.7612637 34.3706131,3.87488182" id="Fill-23" fill="#178972"></path>\n                                <path d="M44.7369055,13.5112971 C44.7369055,13.5112971 44.2973199,13.6603211 44.0159003,13.7335963 C43.7347253,13.8072979 43.4942543,13.8441488 43.2951397,13.8441488 C43.1426836,13.8441488 42.9990373,13.8257234 42.8643637,13.7890431 C42.7293638,13.752107 42.6094546,13.6848884 42.5038203,13.5867901 C42.3983491,13.4887771 42.3131075,13.3539133 42.2488296,13.1821987 C42.1843886,13.0106547 42.1522496,12.7899762 42.1522496,12.5202486 L42.1522496,7.15828223 L44.6032108,7.15828223 C44.7093346,7.15828223 44.7953103,7.0673494 44.7953103,6.95534676 L44.7953103,4.86926564 C44.7953103,4.7571777 44.7093346,4.66624486 44.6032108,4.66624486 L42.1522496,4.66624486 L42.1522496,1.60574932 L41.3257732,1.60574932 C41.1382416,2.72125465 40.7896076,3.62827982 40.2797078,4.32691014 C39.769808,5.02579636 39.1044341,5.55288265 38.2840755,5.90825432 L38.2840755,7.1034325 L39.6202886,7.1034325 L39.6202886,12.336421 C39.6202886,12.998371 39.6759199,13.5746771 39.7874274,14.0646566 C39.8986901,14.5550627 40.0774935,14.9596541 40.323593,15.2783455 C40.569774,15.5972076 40.8977706,15.83307 41.3081539,15.9861886 C41.718374,16.1392219 42.5005574,16.2283633 43.0981459,16.2160797 C44.5148695,16.1869915 45.0855396,15.7865799 45.34363,15.6146094 L44.7369055,13.5112971 Z" id="Fill-25" fill="#F16521"></path>\n                            </g>\n                        </g>\n                    </g>\n                </g>\n            </g>\n          </g>\n      </svg>\n      </span>\n      <p style="text-align: center;">Please fill details to proceed to payment</p>\n\n      <div>\n      <p style="' +
              i +
              '">First Name</p>\n      <input id="data-collect-firstName" type="text" style="' +
              o +
              '" value="' +
              (t.firstName || "") +
              '" ' +
              (t.firstName ? "disabled" : "") +
              ' required/>\n      </div>\n\n      <div>\n      <p style="' +
              i +
              '">Last Name</p>\n      <input id="data-collect-lastName" type="text" style="' +
              o +
              '" value="' +
              (t.lastName || "") +
              '" ' +
              (t.lastName ? "disabled" : "") +
              ' required/>\n      </div>\n\n      <div>\n      <p style="' +
              i +
              '">Email Address</p>\n      <input id="data-collect-email" type="email" style="' +
              o +
              '" value="' +
              (t.email || "") +
              '" ' +
              (t.email ? "disabled" : "") +
              ' required/>\n      </div>\n\n      <div>\n      <p style="' +
              i +
              '">Enter Amount</p>\n      <input id="data-collect-amount" type="number" style="' +
              o +
              '" min="0" value="' +
              (t.amount || "") +
              '" ' +
              (t.amount ? "disabled" : "") +
              ' required/>\n      </div>\n\n      <button \n        style="height: 3rem;width: 100%;background-color: #2b9d80;color: #FFFFFF;border: 1px solid transparent;display: inline-block;user-select: none;\n        background-image: none;margin-top: 20px;"\n        type="submit" \n        class="remita-pay-button" \n        id="submit-data-collect">\n        Next\n      </button>\n    </form>\n\n    </div>\n    ';
          document.getElementById(e).innerHTML = r;
        }),
        (e.prototype.showPublicKeyError = function(e, t, n) {
          document.body.style.overflow = "hidden";
          var i =
            '\n    <div style="padding: 30px;margin: 50px auto;height: 500px;max-width: 400px;background-color: #FFFFFF;box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);border-radius: 6px;text-align: center">\n      <div>\n        <h3 style="margin-bottom: 70px;font-size: 24px;font-weight: 500;line-height: 1.1;">Oops!</h3>\n        <span style="display: block;text-align: center;margin-bottom: 20px;">\n        <?xml version="1.0" encoding="UTF-8"?>\n        <svg width="91px" height="91px" viewBox="0 0 91 91" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n            \x3c!-- Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch --\x3e\n            <title>warning_modal_icon</title>\n            <desc>Created with Sketch.</desc>\n            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n                <g id="warning_modal_icon" transform="translate(1.000000, 1.000000)" fill="#C20000" fill-rule="nonzero">\n                    <path d="M44.7784615,89.5569231 C20.0875015,89.5569231 0,69.4694215 0,44.7784615 C0,20.0875015 20.0875015,0 44.7784615,0 C69.4694215,0 89.5569231,20.0875015 89.5569231,44.7784615 C89.5569231,69.4694215 69.4694215,89.5569231 44.7784615,89.5569231 Z M44.7784615,2.32615385 C21.3703754,2.32615385 2.32615385,21.3703754 2.32615385,44.7784615 C2.32615385,68.1865477 21.3703754,87.2307692 44.7784615,87.2307692 C68.1865477,87.2307692 87.2307692,68.1865477 87.2307692,44.7784615 C87.2307692,21.3703754 68.1865477,2.32615385 44.7784615,2.32615385 Z" id="Shape" stroke="#C20000" stroke-width="0.3"></path>\n                    <polygon id="XMLID_1267_" points="26.8201011 65.0022223 45.0011112 46.8212123 63.1798989 65.0022223 65 63.1821212 46.8212123 45.0011112 65 26.8201011 63.1798989 25 45.0011112 43.1810101 26.8201011 25 25 26.8201011 43.1787877 45.0011112 25 63.1821212"></polygon>\n                </g>\n            </g>\n        </svg>\n        </span>\n        <span style="text-align: center;margin-bottom: 62px;font-size: 20px;display: block;">Incomplete configuration, ' +
            (n.publickey
              ? "please add narration to config script"
              : "please add public key to config script") +
            '</span>\n        <button type="button" style="-webkit-appearance: none;padding: 18px 60px;cursor: pointer;background: #e3e3e3;border: 0;font-size: 1.2rem;border-radius: 31.5px;" class="close-data-collect" aria-label="Close">Close</button>\n      </div>\n    </div>\n    ';
          document.getElementById(e).innerHTML = i;
        }),
        e
      );
    })();
    t.InlinePaymentEngineView = i;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = (function() {
      function e(e) {
        e &&
          ((this.id = e.id || ""),
          (this.key = e.key || ""),
          (this.email = e.email || ""),
          (this.referralCode = e.referralCode || ""),
          (this.amount = e.amount || ""),
          (this.currency = e.currency || "NGN"),
          (this.firstName = e.firstName || ""),
          (this.lastName = e.lastName || ""),
          (this.phoneNumber = e.phoneNumber || ""),
          (this.customerId = e.customerId || ""),
          (this.metadata = e.metadata || {}),
          (this.processRrr = e.processRrr || !1),
          (this.tokenize = e.tokenize || !1),
          (this.onClose = e.onClose || function() {}),
          (this.onSuccess = e.onSuccess || function(e) {}),
          (this.onError = e.onError || function(e) {}),
          (this.pan = e.pan || ""),
          (this.tokenRef = e.tokenRef || ""),
          (this.expiryMonth = e.expiryMonth || ""),
          (this.expiryYear = e.expiryYear || ""),
          (this.cvv = e.cvv || ""),
          (this.pin = e.pin || ""),
          (this.transactionId = e.transactionId || ""),
          (this.channel = e.channel || ""),
          (this.config = e.config || null),
          (this.bankCode = e.bankCode || ""),
          (this.accountNumber = e.accountNumber || ""),
          (this.narration = e.narration || ""),
          (this.extendedData = e.extendedData || null),
          (this.disableSandboxMode = e.disableSandboxMode));
      }
      return e;
    })();
    t.PaymentEngineOptions = i;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = (function() {
      function e() {}
      return (
        (e.RemitaOpen = "RemitaOpen"),
        (e.RemitaClose = "RemitaClose"),
        (e.RemitaError = "RemitaError"),
        (e.RemitaConfigError = "RemitaConfigError"),
        (e.RemitaCloseAppLoader = "RemitaCloseAppLoader"),
        e
      );
    })();
    t.RmIframeEventType = i;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = (function() {
      function e(e) {
        e &&
          ((this.paymentReference = e.paymentReference || ""),
          (this.processorId = e.processorId || ""),
          (this.transactionId = e.transactionId || ""),
          (this.message = e.message || ""),
          (this.amount = e.debitedAmount || null));
      }
      return e;
    })();
    t.ChargeResponse = i;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = (function() {
      function e() {}
      return (
        (e.isString = function(e) {
          return "string" == typeof e || e instanceof String;
        }),
        (e.isNumber = function(e) {
          return "number" == typeof e && isFinite(e);
        }),
        (e.isArray = function(e) {
          return e && "object" == typeof e && e.constructor === Array;
        }),
        (e.isFunction = function(e) {
          return "function" == typeof e;
        }),
        (e.isObject = function(e) {
          return e && "object" == typeof e && e.constructor === Object;
        }),
        (e.isNull = function(e) {
          return null === e;
        }),
        (e.isUndefined = function(e) {
          return void 0 === e;
        }),
        (e.isNullOrUndefined = function(t) {
          return e.isNull(t) || e.isUndefined(t);
        }),
        (e.isBoolean = function(e) {
          return "boolean" == typeof e;
        }),
        (e.isRegExp = function(e) {
          return e && "object" == typeof e && e.constructor === RegExp;
        }),
        (e.isError = function(e) {
          return e instanceof Error && void 0 !== e.message;
        }),
        (e.isDate = function(e) {
          return e instanceof Date;
        }),
        (e.isSymbol = function(e) {
          return "symbol" == typeof e;
        }),
        (e.prototype.isValidEmail = function(e) {
          return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            e
          );
        }),
        e
      );
    })();
    t.Validators = i;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = n(0),
      o = n(5),
      r = new o.InlinePaymentEngineModule();
    (window.RmPaymentEngine = r),
      i.UtilService.log("RmPaymentEngine", window.RmPaymentEngine);
  },
]);
