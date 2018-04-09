(function () {
    'use strict';

    /*! Full Tilt v0.7 / http://github.com/richtr/Full-Tilt */
    !function (a) {
      function b(a) {
        return a = +a, 0 === a || isNaN(a) ? a : a > 0 ? 1 : -1;
      }function c(a) {
        var b = new Promise(function (b, c) {
          var d = function d(e) {
            setTimeout(function () {
              a && a.data ? b() : e >= 20 ? c() : d(++e);
            }, 50);
          };d(0);
        });return b;
      }function d() {
        o = n ? (a.screen.orientation.angle || 0) * j : (a.orientation || 0) * j;
      }function e(a) {
        l.orientation.data = a;for (var b in l.orientation.callbacks) {
          l.orientation.callbacks[b].call(this);
        }
      }function f(a) {
        l.motion.data = a;for (var b in l.motion.callbacks) {
          l.motion.callbacks[b].call(this);
        }
      }if (void 0 === a.FULLTILT || null === a.FULLTILT) {
        var g = Math.PI,
            h = g / 2,
            i = 2 * g,
            j = g / 180,
            k = 180 / g,
            l = { orientation: { active: !1, callbacks: [], data: void 0 }, motion: { active: !1, callbacks: [], data: void 0 } },
            m = !1,
            n = a.screen && a.screen.orientation && void 0 !== a.screen.orientation.angle && null !== a.screen.orientation.angle ? !0 : !1,
            o = (n ? a.screen.orientation.angle : a.orientation || 0) * j,
            p = h,
            q = g,
            r = i / 3,
            s = -h,
            t = {};t.version = "0.5.3", t.getDeviceOrientation = function (a) {
          var b = new Promise(function (b, d) {
            var e = new t.DeviceOrientation(a);e.start();var f = new c(l.orientation);f.then(function () {
              b(e);
            })["catch"](function () {
              e.stop(), d("DeviceOrientation is not supported");
            });
          });return b;
        }, t.getDeviceMotion = function (a) {
          var b = new Promise(function (b, d) {
            var e = new t.DeviceMotion(a);e.start();var f = new c(l.motion);f.then(function () {
              b(e);
            })["catch"](function () {
              e.stop(), d("DeviceMotion is not supported");
            });
          });return b;
        }, t.Quaternion = function (a, c, d, e) {
          var f;this.set = function (a, b, c, d) {
            this.x = a || 0, this.y = b || 0, this.z = c || 0, this.w = d || 1;
          }, this.copy = function (a) {
            this.x = a.x, this.y = a.y, this.z = a.z, this.w = a.w;
          }, this.setFromEuler = function () {
            var a, b, c, d, e, f, g, h, i, k, l, m;return function (n) {
              return n = n || {}, c = (n.alpha || 0) * j, a = (n.beta || 0) * j, b = (n.gamma || 0) * j, f = c / 2, d = a / 2, e = b / 2, g = Math.cos(d), h = Math.cos(e), i = Math.cos(f), k = Math.sin(d), l = Math.sin(e), m = Math.sin(f), this.set(k * h * i - g * l * m, g * l * i + k * h * m, g * h * m + k * l * i, g * h * i - k * l * m), this.normalize(), this;
            };
          }(), this.setFromRotationMatrix = function () {
            var a;return function (c) {
              return a = c.elements, this.set(.5 * Math.sqrt(1 + a[0] - a[4] - a[8]) * b(a[7] - a[5]), .5 * Math.sqrt(1 - a[0] + a[4] - a[8]) * b(a[2] - a[6]), .5 * Math.sqrt(1 - a[0] - a[4] + a[8]) * b(a[3] - a[1]), .5 * Math.sqrt(1 + a[0] + a[4] + a[8])), this;
            };
          }(), this.multiply = function (a) {
            return f = t.Quaternion.prototype.multiplyQuaternions(this, a), this.copy(f), this;
          }, this.rotateX = function (a) {
            return f = t.Quaternion.prototype.rotateByAxisAngle(this, [1, 0, 0], a), this.copy(f), this;
          }, this.rotateY = function (a) {
            return f = t.Quaternion.prototype.rotateByAxisAngle(this, [0, 1, 0], a), this.copy(f), this;
          }, this.rotateZ = function (a) {
            return f = t.Quaternion.prototype.rotateByAxisAngle(this, [0, 0, 1], a), this.copy(f), this;
          }, this.normalize = function () {
            return t.Quaternion.prototype.normalize(this);
          }, this.set(a, c, d, e);
        }, t.Quaternion.prototype = { constructor: t.Quaternion, multiplyQuaternions: function () {
            var a = new t.Quaternion();return function (b, c) {
              var d = b.x,
                  e = b.y,
                  f = b.z,
                  g = b.w,
                  h = c.x,
                  i = c.y,
                  j = c.z,
                  k = c.w;return a.set(d * k + g * h + e * j - f * i, e * k + g * i + f * h - d * j, f * k + g * j + d * i - e * h, g * k - d * h - e * i - f * j), a;
            };
          }(), normalize: function normalize(a) {
            var b = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w);return 0 === b ? (a.x = 0, a.y = 0, a.z = 0, a.w = 1) : (b = 1 / b, a.x *= b, a.y *= b, a.z *= b, a.w *= b), a;
          }, rotateByAxisAngle: function () {
            var a,
                b,
                c = new t.Quaternion(),
                d = new t.Quaternion();return function (e, f, g) {
              return a = (g || 0) / 2, b = Math.sin(a), d.set((f[0] || 0) * b, (f[1] || 0) * b, (f[2] || 0) * b, Math.cos(a)), c = t.Quaternion.prototype.multiplyQuaternions(e, d), t.Quaternion.prototype.normalize(c);
            };
          }() }, t.RotationMatrix = function (a, b, c, d, e, f, g, h, i) {
          var k;this.elements = new Float32Array(9), this.identity = function () {
            return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
          }, this.set = function (a, b, c, d, e, f, g, h, i) {
            this.elements[0] = a || 1, this.elements[1] = b || 0, this.elements[2] = c || 0, this.elements[3] = d || 0, this.elements[4] = e || 1, this.elements[5] = f || 0, this.elements[6] = g || 0, this.elements[7] = h || 0, this.elements[8] = i || 1;
          }, this.copy = function (a) {
            this.elements[0] = a.elements[0], this.elements[1] = a.elements[1], this.elements[2] = a.elements[2], this.elements[3] = a.elements[3], this.elements[4] = a.elements[4], this.elements[5] = a.elements[5], this.elements[6] = a.elements[6], this.elements[7] = a.elements[7], this.elements[8] = a.elements[8];
          }, this.setFromEuler = function () {
            var a, b, c, d, e, f, g, h, i;return function (k) {
              return k = k || {}, c = (k.alpha || 0) * j, a = (k.beta || 0) * j, b = (k.gamma || 0) * j, d = Math.cos(a), e = Math.cos(b), f = Math.cos(c), g = Math.sin(a), h = Math.sin(b), i = Math.sin(c), this.set(f * e - i * g * h, -d * i, e * i * g + f * h, e * i + f * g * h, f * d, i * h - f * e * g, -d * h, g, d * e), this.normalize(), this;
            };
          }(), this.setFromQuaternion = function () {
            var a, b, c, d;return function (e) {
              return a = e.w * e.w, b = e.x * e.x, c = e.y * e.y, d = e.z * e.z, this.set(a + b - c - d, 2 * (e.x * e.y - e.w * e.z), 2 * (e.x * e.z + e.w * e.y), 2 * (e.x * e.y + e.w * e.z), a - b + c - d, 2 * (e.y * e.z - e.w * e.x), 2 * (e.x * e.z - e.w * e.y), 2 * (e.y * e.z + e.w * e.x), a - b - c + d), this;
            };
          }(), this.multiply = function (a) {
            return k = t.RotationMatrix.prototype.multiplyMatrices(this, a), this.copy(k), this;
          }, this.rotateX = function (a) {
            return k = t.RotationMatrix.prototype.rotateByAxisAngle(this, [1, 0, 0], a), this.copy(k), this;
          }, this.rotateY = function (a) {
            return k = t.RotationMatrix.prototype.rotateByAxisAngle(this, [0, 1, 0], a), this.copy(k), this;
          }, this.rotateZ = function (a) {
            return k = t.RotationMatrix.prototype.rotateByAxisAngle(this, [0, 0, 1], a), this.copy(k), this;
          }, this.normalize = function () {
            return t.RotationMatrix.prototype.normalize(this);
          }, this.set(a, b, c, d, e, f, g, h, i);
        }, t.RotationMatrix.prototype = { constructor: t.RotationMatrix, multiplyMatrices: function () {
            var a,
                b,
                c = new t.RotationMatrix();return function (d, e) {
              return a = d.elements, b = e.elements, c.set(a[0] * b[0] + a[1] * b[3] + a[2] * b[6], a[0] * b[1] + a[1] * b[4] + a[2] * b[7], a[0] * b[2] + a[1] * b[5] + a[2] * b[8], a[3] * b[0] + a[4] * b[3] + a[5] * b[6], a[3] * b[1] + a[4] * b[4] + a[5] * b[7], a[3] * b[2] + a[4] * b[5] + a[5] * b[8], a[6] * b[0] + a[7] * b[3] + a[8] * b[6], a[6] * b[1] + a[7] * b[4] + a[8] * b[7], a[6] * b[2] + a[7] * b[5] + a[8] * b[8]), c;
            };
          }(), normalize: function normalize(a) {
            var b = a.elements,
                c = b[0] * b[4] * b[8] - b[0] * b[5] * b[7] - b[1] * b[3] * b[8] + b[1] * b[5] * b[6] + b[2] * b[3] * b[7] - b[2] * b[4] * b[6];return b[0] /= c, b[1] /= c, b[2] /= c, b[3] /= c, b[4] /= c, b[5] /= c, b[6] /= c, b[7] /= c, b[8] /= c, a.elements = b, a;
          }, rotateByAxisAngle: function () {
            var a,
                b,
                c = new t.RotationMatrix(),
                d = new t.RotationMatrix(),
                e = !1;return function (f, g, h) {
              return d.identity(), e = !1, a = Math.sin(h), b = Math.cos(h), 1 === g[0] && 0 === g[1] && 0 === g[2] ? (e = !0, d.elements[4] = b, d.elements[5] = -a, d.elements[7] = a, d.elements[8] = b) : 1 === g[1] && 0 === g[0] && 0 === g[2] ? (e = !0, d.elements[0] = b, d.elements[2] = a, d.elements[6] = -a, d.elements[8] = b) : 1 === g[2] && 0 === g[0] && 0 === g[1] && (e = !0, d.elements[0] = b, d.elements[1] = -a, d.elements[3] = a, d.elements[4] = b), e ? (c = t.RotationMatrix.prototype.multiplyMatrices(f, d), c = t.RotationMatrix.prototype.normalize(c)) : c = f, c;
            };
          }() }, t.Euler = function (a, b, c) {
          this.set = function (a, b, c) {
            this.alpha = a || 0, this.beta = b || 0, this.gamma = c || 0;
          }, this.copy = function (a) {
            this.alpha = a.alpha, this.beta = a.beta, this.gamma = a.gamma;
          }, this.setFromRotationMatrix = function () {
            var a, b, c, d;return function (e) {
              a = e.elements, a[8] > 0 ? (b = Math.atan2(-a[1], a[4]), c = Math.asin(a[7]), d = Math.atan2(-a[6], a[8])) : a[8] < 0 ? (b = Math.atan2(a[1], -a[4]), c = -Math.asin(a[7]), c += c >= 0 ? -g : g, d = Math.atan2(a[6], -a[8])) : a[6] > 0 ? (b = Math.atan2(-a[1], a[4]), c = Math.asin(a[7]), d = -h) : a[6] < 0 ? (b = Math.atan2(a[1], -a[4]), c = -Math.asin(a[7]), c += c >= 0 ? -g : g, d = -h) : (b = Math.atan2(a[3], a[0]), c = a[7] > 0 ? h : -h, d = 0), 0 > b && (b += i), b *= k, c *= k, d *= k, this.set(b, c, d);
            };
          }(), this.setFromQuaternion = function () {
            var a, b, c;return function (d) {
              var e = d.w * d.w,
                  f = d.x * d.x,
                  j = d.y * d.y,
                  l = d.z * d.z,
                  m = e + f + j + l,
                  n = d.w * d.x + d.y * d.z,
                  o = 1e-6;if (n > (.5 - o) * m) a = 2 * Math.atan2(d.y, d.w), b = h, c = 0;else if ((-.5 + o) * m > n) a = -2 * Math.atan2(d.y, d.w), b = -h, c = 0;else {
                var p = e - f + j - l,
                    q = 2 * (d.w * d.z - d.x * d.y),
                    r = e - f - j + l,
                    s = 2 * (d.w * d.y - d.x * d.z);r > 0 ? (a = Math.atan2(q, p), b = Math.asin(2 * n / m), c = Math.atan2(s, r)) : (a = Math.atan2(-q, -p), b = -Math.asin(2 * n / m), b += 0 > b ? g : -g, c = Math.atan2(-s, -r));
              }0 > a && (a += i), a *= k, b *= k, c *= k, this.set(a, b, c);
            };
          }(), this.rotateX = function (a) {
            return t.Euler.prototype.rotateByAxisAngle(this, [1, 0, 0], a), this;
          }, this.rotateY = function (a) {
            return t.Euler.prototype.rotateByAxisAngle(this, [0, 1, 0], a), this;
          }, this.rotateZ = function (a) {
            return t.Euler.prototype.rotateByAxisAngle(this, [0, 0, 1], a), this;
          }, this.set(a, b, c);
        }, t.Euler.prototype = { constructor: t.Euler, rotateByAxisAngle: function () {
            var a = new t.RotationMatrix();return function (b, c, d) {
              return a.setFromEuler(b), a = t.RotationMatrix.prototype.rotateByAxisAngle(a, c, d), b.setFromRotationMatrix(a), b;
            };
          }() }, t.DeviceOrientation = function (b) {
          this.options = b || {};var c = 0,
              d = 200,
              e = 0,
              f = 10;if (this.alphaOffsetScreen = 0, this.alphaOffsetDevice = void 0, "game" === this.options.type) {
            var g = function (b) {
              return null !== b.alpha && (this.alphaOffsetDevice = new t.Euler(b.alpha, 0, 0), this.alphaOffsetDevice.rotateZ(-o), ++e >= f) ? void a.removeEventListener("deviceorientation", g, !1) : void (++c >= d && a.removeEventListener("deviceorientation", g, !1));
            }.bind(this);a.addEventListener("deviceorientation", g, !1);
          } else if ("world" === this.options.type) {
            var h = function (b) {
              return b.absolute !== !0 && void 0 !== b.webkitCompassAccuracy && null !== b.webkitCompassAccuracy && +b.webkitCompassAccuracy >= 0 && +b.webkitCompassAccuracy < 50 && (this.alphaOffsetDevice = new t.Euler(b.webkitCompassHeading, 0, 0), this.alphaOffsetDevice.rotateZ(o), this.alphaOffsetScreen = o, ++e >= f) ? void a.removeEventListener("deviceorientation", h, !1) : void (++c >= d && a.removeEventListener("deviceorientation", h, !1));
            }.bind(this);a.addEventListener("deviceorientation", h, !1);
          }
        }, t.DeviceOrientation.prototype = { constructor: t.DeviceOrientation, start: function start(b) {
            b && "[object Function]" == Object.prototype.toString.call(b) && l.orientation.callbacks.push(b), m || (n ? a.screen.orientation.addEventListener("change", d, !1) : a.addEventListener("orientationchange", d, !1)), l.orientation.active || (a.addEventListener("deviceorientation", e, !1), l.orientation.active = !0);
          }, stop: function stop() {
            l.orientation.active && (a.removeEventListener("deviceorientation", e, !1), l.orientation.active = !1);
          }, listen: function listen(a) {
            this.start(a);
          }, getFixedFrameQuaternion: function () {
            var a = new t.Euler(),
                b = new t.RotationMatrix(),
                c = new t.Quaternion();return function () {
              var d = l.orientation.data || { alpha: 0, beta: 0, gamma: 0 },
                  e = d.alpha;return this.alphaOffsetDevice && (b.setFromEuler(this.alphaOffsetDevice), b.rotateZ(-this.alphaOffsetScreen), a.setFromRotationMatrix(b), a.alpha < 0 && (a.alpha += 360), a.alpha %= 360, e -= a.alpha), a.set(e, d.beta, d.gamma), c.setFromEuler(a), c;
            };
          }(), getScreenAdjustedQuaternion: function () {
            var a;return function () {
              return a = this.getFixedFrameQuaternion(), a.rotateZ(-o), a;
            };
          }(), getFixedFrameMatrix: function () {
            var a = new t.Euler(),
                b = new t.RotationMatrix();return function () {
              var c = l.orientation.data || { alpha: 0, beta: 0, gamma: 0 },
                  d = c.alpha;return this.alphaOffsetDevice && (b.setFromEuler(this.alphaOffsetDevice), b.rotateZ(-this.alphaOffsetScreen), a.setFromRotationMatrix(b), a.alpha < 0 && (a.alpha += 360), a.alpha %= 360, d -= a.alpha), a.set(d, c.beta, c.gamma), b.setFromEuler(a), b;
            };
          }(), getScreenAdjustedMatrix: function () {
            var a;return function () {
              return a = this.getFixedFrameMatrix(), a.rotateZ(-o), a;
            };
          }(), getFixedFrameEuler: function () {
            var a,
                b = new t.Euler();return function () {
              return a = this.getFixedFrameMatrix(), b.setFromRotationMatrix(a), b;
            };
          }(), getScreenAdjustedEuler: function () {
            var a,
                b = new t.Euler();return function () {
              return a = this.getScreenAdjustedMatrix(), b.setFromRotationMatrix(a), b;
            };
          }(), isAbsolute: function isAbsolute() {
            return l.orientation.data && l.orientation.data.absolute === !0 ? !0 : !1;
          }, getLastRawEventData: function getLastRawEventData() {
            return l.orientation.data || {};
          }, ALPHA: "alpha", BETA: "beta", GAMMA: "gamma" }, t.DeviceMotion = function (a) {
          this.options = a || {};
        }, t.DeviceMotion.prototype = { constructor: t.DeviceMotion, start: function start(b) {
            b && "[object Function]" == Object.prototype.toString.call(b) && l.motion.callbacks.push(b), m || (n ? a.screen.orientation.addEventListener("change", d, !1) : a.addEventListener("orientationchange", d, !1)), l.motion.active || (a.addEventListener("devicemotion", f, !1), l.motion.active = !0);
          }, stop: function stop() {
            l.motion.active && (a.removeEventListener("devicemotion", f, !1), l.motion.active = !1);
          }, listen: function listen(a) {
            this.start(a);
          }, getScreenAdjustedAcceleration: function getScreenAdjustedAcceleration() {
            var a = l.motion.data && l.motion.data.acceleration ? l.motion.data.acceleration : { x: 0, y: 0, z: 0 },
                b = {};switch (o) {case p:
                b.x = -a.y, b.y = a.x;break;case q:
                b.x = -a.x, b.y = -a.y;break;case r:case s:
                b.x = a.y, b.y = -a.x;break;default:
                b.x = a.x, b.y = a.y;}return b.z = a.z, b;
          }, getScreenAdjustedAccelerationIncludingGravity: function getScreenAdjustedAccelerationIncludingGravity() {
            var a = l.motion.data && l.motion.data.accelerationIncludingGravity ? l.motion.data.accelerationIncludingGravity : { x: 0, y: 0, z: 0 },
                b = {};switch (o) {case p:
                b.x = -a.y, b.y = a.x;break;case q:
                b.x = -a.x, b.y = -a.y;break;case r:case s:
                b.x = a.y, b.y = -a.x;break;default:
                b.x = a.x, b.y = a.y;}return b.z = a.z, b;
          }, getScreenAdjustedRotationRate: function getScreenAdjustedRotationRate() {
            var a = l.motion.data && l.motion.data.rotationRate ? l.motion.data.rotationRate : { alpha: 0, beta: 0, gamma: 0 },
                b = {};switch (o) {case p:
                b.beta = -a.gamma, b.gamma = a.beta;break;case q:
                b.beta = -a.beta, b.gamma = -a.gamma;break;case r:case s:
                b.beta = a.gamma, b.gamma = -a.beta;break;default:
                b.beta = a.beta, b.gamma = a.gamma;}return b.alpha = a.alpha, b;
          }, getLastRawEventData: function getLastRawEventData() {
            return l.motion.data || {};
          } }, a.FULLTILT = t;
      }
    }(window);

    var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var gyronorm = createCommonjsModule(function (module) {
    /**
    * JavaScript project for accessing and normalizing the accelerometer and gyroscope data on mobile devices
    *
    * @author Doruk Eker <dorukeker@gmail.com>
    * @copyright Doruk Eker <http://dorukeker.com>
    * @version 2.0.4
    * @license MIT License | http://opensource.org/licenses/MIT
    */

    (function(root, factory) {
      if (typeof undefined === 'function' && undefined.amd) {
        undefined(function() {
          return (root.GyroNorm = factory());
        });
      } else if ('object' === 'object' && module.exports) {
        module.exports = (root.GyroNorm = factory());
      } else {
        root.GyroNorm = factory();
      }
    }(commonjsGlobal, function() {
      /* Constants */
      var GAME                            = 'game';
      var WORLD                           = 'world';
      var DEVICE_ORIENTATION              = 'deviceorientation';
      var ACCELERATION                    = 'acceleration';
      var ACCELERATION_INCLUDING_GRAVITY  = 'accelerationinludinggravity';
      var ROTATION_RATE                   = 'rotationrate';

      /*-------------------------------------------------------*/
      /* PRIVATE VARIABLES */

      var _interval           = null;       // Timer to return values
      var _calibrationValue   = 0;          // Alpha offset value
      var _gravityCoefficient = 0;          // Coefficient to normalze gravity related values
      var _isRunning          = false;      // Boolean value if GyroNorm is tracking
      var _isReady            = false;      // Boolean value if GyroNorm is is initialized

      var _do                 = null;       // Object to store the device orientation values
      var _dm                 = null;       // Object to store the device motion values

      /* OPTIONS */
      var _frequency          = 50;         // Frequency for the return data in milliseconds
      var _gravityNormalized  = true;       // Flag if to normalize gravity values
      var _orientationBase    = GAME;       // Can be GyroNorm.GAME or GyroNorm.WORLD. GyroNorm.GAME returns orientation values with respect to the head direction of the device. GyroNorm.WORLD returns the orientation values with respect to the actual north direction of the world.
      var _decimalCount       = 2;          // Number of digits after the decimals point for the return values
      var _logger             = null;       // Function to callback on error. There is no default value. It can only be set by the user on gn.init()
      var _screenAdjusted     = false;      // If set to true it will return screen adjusted values. (e.g. On a horizontal orientation of a mobile device, the head would be one of the sides, instead of  the actual head of the device.)

      /*-------------------------------------------------------*/
      /* PUBLIC FUNCTIONS */

      /*
      *
      * Constructor function
      *
      */

      var GyroNorm = function(options) {};

      /* Constants */
      GyroNorm.GAME                             = GAME;
      GyroNorm.WORLD                            = WORLD;
      GyroNorm.DEVICE_ORIENTATION               = DEVICE_ORIENTATION;
      GyroNorm.ACCELERATION                     = ACCELERATION;
      GyroNorm.ACCELERATION_INCLUDING_GRAVITY   = ACCELERATION_INCLUDING_GRAVITY;
      GyroNorm.ROTATION_RATE                    = ROTATION_RATE;

      /*
      *
      * Initialize GyroNorm instance function
      *
      * @param object options - values are as follows. If set in the init function they overwrite the default option values
      * @param int options.frequency
      * @param boolean options.gravityNormalized
      * @param boolean options.orientationBase
      * @param boolean options.decimalCount
      * @param function options.logger
      * @param function options.screenAdjusted
      *
      */

      GyroNorm.prototype.init = function(options) {
        // Assign options that are passed with the constructor function
        if (options && options.frequency) _frequency = options.frequency;
        if (options && options.gravityNormalized) _gravityNormalized = options.gravityNormalized;
        if (options && options.orientationBase) _orientationBase = options.orientationBase;
        if (options && options.decimalCount) _decimalCount = options.decimalCount;
        if (options && options.logger) _logger = options.logger;
        if (options && options.screenAdjusted) _screenAdjusted = options.screenAdjusted;

        var deviceOrientationPromise = new FULLTILT.getDeviceOrientation({ 'type': _orientationBase }).then(function(controller) {
          _do = controller;
        });

        var deviceMotionPromise = new FULLTILT.getDeviceMotion().then(function(controller) {
          _dm = controller;
          // Set gravity coefficient
          _gravityCoefficient = (_dm.getScreenAdjustedAccelerationIncludingGravity().z > 0) ? -1 : 1;
        });

        return Promise.all([deviceOrientationPromise, deviceMotionPromise]).then(function() {
          _isReady = true;
        });
      };

      /*
      *
      * Stops all the tracking and listening on the window objects
      *
      */
      GyroNorm.prototype.end = function() {
        try {
          _isReady = false;
          this.stop();
          _dm.stop();
          _do.stop();
        } catch(err){
          log(err);
        }
      };

      /*
      *
      * Starts tracking the values
      *
      * @param function callback - Callback function to read the values
      *
      */
      GyroNorm.prototype.start = function(callback) {
        if (!_isReady) {
          log({ message: 'GyroNorm is not initialized yet. First call the "init()" function.', code: 1 });
          return;
        }

        _interval = setInterval(function() {
          callback(snapShot());
        }, _frequency);
        _isRunning = true;
      };

      /*
      *
      * Stops tracking the values
      *
      */
      GyroNorm.prototype.stop = function() {
        if (_interval) {
          clearInterval(_interval);
          _isRunning = false;
        }
      };

      /*
      *
      * Toggles if to normalize gravity related values
      *
      * @param boolean flag
      *
      */
      GyroNorm.prototype.normalizeGravity = function(flag) {
        _gravityNormalized = (flag) ? true : false;
      };


      /*
      *
      * Sets the current head direction as alpha = 0
      * Can only be used if device orientation is being tracked, values are not screen adjusted, value type is GyroNorm.EULER and orientation base is GyroNorm.GAME
      *
      * @return: If head direction is set successfully returns true, else false
      *
      */
      GyroNorm.prototype.setHeadDirection = function() {
        if (_screenAdjusted || _orientationBase === WORLD) {
          return false;
        }

        _calibrationValue = _do.getFixedFrameEuler().alpha;
        return true;
      };

      /*
      *
      * Sets the log function
      *
      */
      GyroNorm.prototype.startLogging = function(logger) {
        if (logger) {
          _logger = logger;
        }
      };

      /*
      *
      * Sets the log function to null which stops the logging
      *
      */
      GyroNorm.prototype.stopLogging = function() {
        _logger = null;
      };

      /*
      *
      * Returns if certain type of event is available on the device
      *
      * @param string _eventType - possible values are "deviceorientation" , "devicemotion" , "compassneedscalibration"
      *
      * @return true if event is available false if not
      *
      */
      GyroNorm.prototype.isAvailable = function(_eventType) {

        var doSnapShot = _do.getScreenAdjustedEuler();
        var accSnapShot = _dm.getScreenAdjustedAcceleration();
        var accGraSnapShot = _dm.getScreenAdjustedAccelerationIncludingGravity();
        var rotRateSnapShot = _dm.getScreenAdjustedRotationRate();

        switch (_eventType) {
          case DEVICE_ORIENTATION:
            return ((doSnapShot.alpha && doSnapShot.alpha !== null) && (doSnapShot.beta && doSnapShot.beta !== null) && (doSnapShot.gamma && doSnapShot.gamma !== null));
            break;

          case ACCELERATION:
            return (accSnapShot && accSnapShot.x && accSnapShot.y && accSnapShot.z);
            break;

          case ACCELERATION_INCLUDING_GRAVITY:
            return (accGraSnapShot && accGraSnapShot.x && accGraSnapShot.y && accGraSnapShot.z);
            break;

          case ROTATION_RATE:
            return (rotRateSnapShot && rotRateSnapShot.alpha && rotRateSnapShot.beta && rotRateSnapShot.gamma);
            break;

          default:
            return {
              deviceOrientationAvailable: ((doSnapShot.alpha && doSnapShot.alpha !== null) && (doSnapShot.beta && doSnapShot.beta !== null) && (doSnapShot.gamma && doSnapShot.gamma !== null)),
              accelerationAvailable: (accSnapShot && accSnapShot.x && accSnapShot.y && accSnapShot.z),
              accelerationIncludingGravityAvailable: (accGraSnapShot && accGraSnapShot.x && accGraSnapShot.y && accGraSnapShot.z),
              rotationRateAvailable: (rotRateSnapShot && rotRateSnapShot.alpha && rotRateSnapShot.beta && rotRateSnapShot.gamma)
            }
            break;
        }
      };

      /*
      *
      * Returns boolean value if the GyroNorm is running
      *
      */
      GyroNorm.prototype.isRunning = function() {
        return _isRunning;
      };

      /*-------------------------------------------------------*/
      /* PRIVATE FUNCTIONS */

      /*
      *
      * Utility function to round with digits after the decimal point
      *
      * @param float number - the original number to round
      *
      */
      function rnd(number) {
        return Math.round(number * Math.pow(10, _decimalCount)) / Math.pow(10, _decimalCount);
      }

      /*
      *
      * Takes a snapshot of the current deviceo orientaion and device motion values
      *
      */
      function snapShot() {
        var doSnapShot = {};

        if (_screenAdjusted) {
          doSnapShot = _do.getScreenAdjustedEuler();
        } else {
          doSnapShot = _do.getFixedFrameEuler();
        }

        var accSnapShot = _dm.getScreenAdjustedAcceleration();
        var accGraSnapShot = _dm.getScreenAdjustedAccelerationIncludingGravity();
        var rotRateSnapShot = _dm.getScreenAdjustedRotationRate();

        var alphaToSend = 0;

        if (_orientationBase === GAME) {
          alphaToSend = doSnapShot.alpha - _calibrationValue;
          alphaToSend = (alphaToSend < 0) ? (360 - Math.abs(alphaToSend)) : alphaToSend;
        } else {
          alphaToSend = doSnapShot.alpha;
        }

        var snapShot = {
          do: {
            alpha: rnd(alphaToSend),
            beta: rnd(doSnapShot.beta),
            gamma: rnd(doSnapShot.gamma),
            absolute: _do.isAbsolute()
          },
          dm: {
            x: rnd(accSnapShot.x),
            y: rnd(accSnapShot.y),
            z: rnd(accSnapShot.z),
            gx: rnd(accGraSnapShot.x),
            gy: rnd(accGraSnapShot.y),
            gz: rnd(accGraSnapShot.z),
            alpha: rnd(rotRateSnapShot.alpha),
            beta: rnd(rotRateSnapShot.beta),
            gamma: rnd(rotRateSnapShot.gamma)
          }
        };

        // Normalize gravity
        if (_gravityNormalized) {
          snapShot.dm.gx *= _gravityCoefficient;
          snapShot.dm.gy *= _gravityCoefficient;
          snapShot.dm.gz *= _gravityCoefficient;
        }

        return snapShot;
      }


      /*
      *
      * Starts listening to orientation event on the window object
      *
      */
      function log(err) {
        if (_logger) {
          if (typeof(err) == 'string') {
            err = { message: err, code: 0 };
          }
          _logger(err);
        }
      }

      return GyroNorm;
    }));
    });

    var makeWebGLContext = function makeWebGLContext(canvas) {
        var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {

            return;
        }
        return gl;
    };

    var makeFramebuffer = function makeFramebuffer(gl, props) {
        var colorAttachment = props.colorAttachment,
            texture = props.texture;

        var framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, colorAttachment, gl.TEXTURE_2D, texture, 0);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        return framebuffer;
    };

    var bindFramebuffer = function bindFramebuffer(gl, framebuffer, texture) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        if (!framebuffer) return;
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    };

    var makeTexture = function makeTexture(gl, props) {
        var width = props.width,
            height = props.height,
            image = props.image;


        var texture = gl.createTexture();

        var level = 0;
        var internalFormat = gl.RGBA;
        var border = 0;
        var format = gl.RGBA;
        var type = gl.UNSIGNED_BYTE;

        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        if (image) {
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, format, type, image);
        } else {
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, format, type, image);
        }

        gl.bindTexture(gl.TEXTURE_2D, null);
        return texture;
    };

    var classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    var createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    var toConsumableArray = function (arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

        return arr2;
      } else {
        return Array.from(arr);
      }
    };

    var CircleGeometry = function () {
        function CircleGeometry(props) {
            classCallCheck(this, CircleGeometry);
            var radius = props.radius,
                vertexDetail = props.vertexDetail;


            this.vertices = this.makeVertices(radius, vertexDetail);
        }

        createClass(CircleGeometry, [{
            key: "makeVertices",
            value: function makeVertices(radius, detail) {
                var theta = Math.PI * 2;
                var aspect = window.innerWidth / window.innerHeight;
                var step = theta / detail;
                var verticesArr = [];
                for (var i = 0; i < detail; i += 1) {
                    var posx = Math.sin(i * step) * radius;
                    var posy = Math.cos(i * step) * radius * aspect;
                    verticesArr.push(posx, posy);
                }
                return new Float32Array(verticesArr);
            }
        }]);
        return CircleGeometry;
    }();

    var PlaneGeometry = function () {
        function PlaneGeometry(props) {
            classCallCheck(this, PlaneGeometry);
            var width = props.width,
                height = props.height,
                widthSegments = props.widthSegments,
                heightSegments = props.heightSegments;


            this.vertices = this.makeVertices(widthSegments, heightSegments, width, height);
            this.uvs = this.makeUvs(widthSegments, heightSegments);
            this.indices = this.makeIndices(widthSegments, heightSegments);
        }

        createClass(PlaneGeometry, [{
            key: "makeVertices",
            value: function makeVertices(widthSegments, heightSegments, width, height) {
                var verticesArr = [];
                var ratex = 1 / widthSegments;
                var ratey = 1 / heightSegments;

                for (var y = 0; y <= heightSegments; y += 1) {
                    var posy = (-0.5 + ratey * y) * height;

                    for (var x = 0; x <= widthSegments; x += 1) {
                        var posx = (-0.5 + ratex * x) * width;

                        verticesArr.push(posx, posy);
                    }
                }
                return new Float32Array(verticesArr);
            }
        }, {
            key: "makeUvs",
            value: function makeUvs(widthSegments, heightSegments) {
                var uvsArr = [];
                var ratex = 1 / widthSegments;
                var ratey = 1 / heightSegments;
                for (var y = 0; y <= heightSegments; y += 1) {
                    var uvy = 1.0 - ratey * y;
                    for (var x = 0; x <= widthSegments; x += 1) {
                        var uvx = 1.0 - ratex * x;
                        uvsArr.push(uvx, uvy);
                    }
                }
                return new Float32Array(uvsArr);
            }
        }, {
            key: "makeIndices",
            value: function makeIndices(widthSegments, heightSegments) {
                var widthSegment = widthSegments;
                var heightSegment = heightSegments;
                var indices = [];

                for (var yy = 0; yy < heightSegment; yy++) {
                    for (var xx = 0; xx < widthSegment; xx++) {
                        var rowStartNum = yy * (widthSegment + 1);
                        var nextRowStartNum = (yy + 1) * (widthSegment + 1);

                        indices.push(rowStartNum + xx);
                        indices.push(rowStartNum + xx + 1);
                        indices.push(nextRowStartNum + xx);

                        indices.push(rowStartNum + xx + 1);
                        indices.push(nextRowStartNum + xx + 1);
                        indices.push(nextRowStartNum + xx);
                    }
                }

                indices = new Uint16Array(indices);

                return indices;
            }
        }]);
        return PlaneGeometry;
    }();

    var makeShader = function makeShader(gl, type, shaderSource) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;

        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    };

    var makeProgram = function makeProgram(gl, vertexShader, fragmentShader) {
        var doValidate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.log("Error linking program: " + gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return;
        }
        if (doValidate) {
            gl.validateProgram(program);
            if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
                console.log("Error validating program: " + gl.getProgramInfoLog(program));
                return;
            }
        }

        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);

        return program;
    };

    var makeBuffer = function makeBuffer(gl, props) {
        var bufferType = props.bufferType,
            typedArray = props.typedArray,
            drawType = props.drawType;


        var buffer = gl.createBuffer();
        gl.bindBuffer(bufferType, buffer);
        gl.bufferData(bufferType, typedArray, drawType);
        // gl.bindBuffer(bufferType, null)

        return buffer;
    };

    var bindBuffer = function bindBuffer(gl, buffer, props) {
        var bufferType = props.bufferType,
            attribLocation = props.attribLocation,
            attribType = props.attribType,
            itemsPerVert = props.itemsPerVert;


        gl.bindBuffer(bufferType, buffer);
        if (!buffer) return;
        gl.enableVertexAttribArray(attribLocation);
        gl.vertexAttribPointer(attribLocation, itemsPerVert, attribType, false, 0, 0);
        gl.bindBuffer(bufferType, null);
    };

    /*
    ** Copyright (c) 2015 The Khronos Group Inc.
    **
    ** Permission is hereby granted, free of charge, to any person obtaining a
    ** copy of this software and/or associated documentation files (the
    ** "Materials"), to deal in the Materials without restriction, including
    ** without limitation the rights to use, copy, modify, merge, publish,
    ** distribute, sublicense, and/or sell copies of the Materials, and to
    ** permit persons to whom the Materials are furnished to do so, subject to
    ** the following conditions:
    **
    ** The above copyright notice and this permission notice shall be included
    ** in all copies or substantial portions of the Materials.
    **
    ** THE MATERIALS ARE PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    ** EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    ** MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
    ** IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
    ** CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
    ** TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
    ** MATERIALS OR THE USE OR OTHER DEALINGS IN THE MATERIALS.
    */
    (function () {

        var glErrorShadow = {};

        function error(msg) {
            if (window.console && window.console.error) {
                window.console.error(msg);
            }
        }

        function log(msg) {
            if (window.console && window.console.log) {
                window.console.log(msg);
            }
        }

        function synthesizeGLError(err, opt_msg) {
            glErrorShadow[err] = true;
            if (opt_msg !== undefined) {
                error(opt_msg);
            }
        }

        function wrapGLError(gl) {
            var f = gl.getError;
            gl.getError = function () {
                var err;
                do {
                    err = f.apply(gl);
                    if (err != gl.NO_ERROR) {
                        glErrorShadow[err] = true;
                    }
                } while (err != gl.NO_ERROR);
                for (var err in glErrorShadow) {
                    if (glErrorShadow[err]) {
                        delete glErrorShadow[err];
                        return parseInt(err);
                    }
                }
                return gl.NO_ERROR;
            };
        }

        var WebGLVertexArrayObjectOES = function WebGLVertexArrayObjectOES(ext) {
            var gl = ext.gl;

            this.ext = ext;
            this.isAlive = true;
            this.hasBeenBound = false;

            this.elementArrayBuffer = null;
            this.attribs = new Array(ext.maxVertexAttribs);
            for (var n = 0; n < this.attribs.length; n++) {
                var attrib = new WebGLVertexArrayObjectOES.VertexAttrib(gl);
                this.attribs[n] = attrib;
            }

            this.maxAttrib = 0;
        };

        WebGLVertexArrayObjectOES.VertexAttrib = function VertexAttrib(gl) {
            this.enabled = false;
            this.buffer = null;
            this.size = 4;
            this.type = gl.FLOAT;
            this.normalized = false;
            this.stride = 16;
            this.offset = 0;

            this.cached = "";
            this.recache();
        };
        WebGLVertexArrayObjectOES.VertexAttrib.prototype.recache = function recache() {
            this.cached = [this.size, this.type, this.normalized, this.stride, this.offset].join(":");
        };

        var OESVertexArrayObject = function OESVertexArrayObject(gl) {
            var self = this;
            this.gl = gl;

            wrapGLError(gl);

            var original = this.original = {
                getParameter: gl.getParameter,
                enableVertexAttribArray: gl.enableVertexAttribArray,
                disableVertexAttribArray: gl.disableVertexAttribArray,
                bindBuffer: gl.bindBuffer,
                getVertexAttrib: gl.getVertexAttrib,
                vertexAttribPointer: gl.vertexAttribPointer
            };

            gl.getParameter = function getParameter(pname) {
                if (pname == self.VERTEX_ARRAY_BINDING_OES) {
                    if (self.currentVertexArrayObject == self.defaultVertexArrayObject) {
                        return null;
                    } else {
                        return self.currentVertexArrayObject;
                    }
                }
                return original.getParameter.apply(this, arguments);
            };

            gl.enableVertexAttribArray = function enableVertexAttribArray(index) {
                var vao = self.currentVertexArrayObject;
                vao.maxAttrib = Math.max(vao.maxAttrib, index);
                var attrib = vao.attribs[index];
                attrib.enabled = true;
                return original.enableVertexAttribArray.apply(this, arguments);
            };
            gl.disableVertexAttribArray = function disableVertexAttribArray(index) {
                var vao = self.currentVertexArrayObject;
                vao.maxAttrib = Math.max(vao.maxAttrib, index);
                var attrib = vao.attribs[index];
                attrib.enabled = false;
                return original.disableVertexAttribArray.apply(this, arguments);
            };

            gl.bindBuffer = function bindBuffer(target, buffer) {
                switch (target) {
                    case gl.ARRAY_BUFFER:
                        self.currentArrayBuffer = buffer;
                        break;
                    case gl.ELEMENT_ARRAY_BUFFER:
                        self.currentVertexArrayObject.elementArrayBuffer = buffer;
                        break;
                }
                return original.bindBuffer.apply(this, arguments);
            };

            gl.getVertexAttrib = function getVertexAttrib(index, pname) {
                var vao = self.currentVertexArrayObject;
                var attrib = vao.attribs[index];
                switch (pname) {
                    case gl.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING:
                        return attrib.buffer;
                    case gl.VERTEX_ATTRIB_ARRAY_ENABLED:
                        return attrib.enabled;
                    case gl.VERTEX_ATTRIB_ARRAY_SIZE:
                        return attrib.size;
                    case gl.VERTEX_ATTRIB_ARRAY_STRIDE:
                        return attrib.stride;
                    case gl.VERTEX_ATTRIB_ARRAY_TYPE:
                        return attrib.type;
                    case gl.VERTEX_ATTRIB_ARRAY_NORMALIZED:
                        return attrib.normalized;
                    default:
                        return original.getVertexAttrib.apply(this, arguments);
                }
            };

            gl.vertexAttribPointer = function vertexAttribPointer(indx, size, type, normalized, stride, offset) {
                var vao = self.currentVertexArrayObject;
                vao.maxAttrib = Math.max(vao.maxAttrib, indx);
                var attrib = vao.attribs[indx];
                attrib.buffer = self.currentArrayBuffer;
                attrib.size = size;
                attrib.type = type;
                attrib.normalized = normalized;
                attrib.stride = stride;
                attrib.offset = offset;
                attrib.recache();
                return original.vertexAttribPointer.apply(this, arguments);
            };

            if (gl.instrumentExtension) {
                gl.instrumentExtension(this, "OES_vertex_array_object");
            }

            gl.canvas.addEventListener('webglcontextrestored', function () {
                log("OESVertexArrayObject emulation library context restored");
                self.reset_();
            }, true);

            this.reset_();
        };

        OESVertexArrayObject.prototype.VERTEX_ARRAY_BINDING_OES = 0x85B5;

        OESVertexArrayObject.prototype.reset_ = function reset_() {
            var contextWasLost = this.vertexArrayObjects !== undefined;
            if (contextWasLost) {
                for (var ii = 0; ii < this.vertexArrayObjects.length; ++ii) {
                    this.vertexArrayObjects.isAlive = false;
                }
            }
            var gl = this.gl;
            this.maxVertexAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);

            this.defaultVertexArrayObject = new WebGLVertexArrayObjectOES(this);
            this.currentVertexArrayObject = null;
            this.currentArrayBuffer = null;
            this.vertexArrayObjects = [this.defaultVertexArrayObject];

            this.bindVertexArrayOES(null);
        };

        OESVertexArrayObject.prototype.createVertexArrayOES = function createVertexArrayOES() {
            var arrayObject = new WebGLVertexArrayObjectOES(this);
            this.vertexArrayObjects.push(arrayObject);
            return arrayObject;
        };

        OESVertexArrayObject.prototype.deleteVertexArrayOES = function deleteVertexArrayOES(arrayObject) {
            arrayObject.isAlive = false;
            this.vertexArrayObjects.splice(this.vertexArrayObjects.indexOf(arrayObject), 1);
            if (this.currentVertexArrayObject == arrayObject) {
                this.bindVertexArrayOES(null);
            }
        };

        OESVertexArrayObject.prototype.isVertexArrayOES = function isVertexArrayOES(arrayObject) {
            if (arrayObject && arrayObject instanceof WebGLVertexArrayObjectOES) {
                if (arrayObject.hasBeenBound && arrayObject.ext == this) {
                    return true;
                }
            }
            return false;
        };

        OESVertexArrayObject.prototype.bindVertexArrayOES = function bindVertexArrayOES(arrayObject) {
            var gl = this.gl;
            if (arrayObject && !arrayObject.isAlive) {
                synthesizeGLError(gl.INVALID_OPERATION, "bindVertexArrayOES: attempt to bind deleted arrayObject");
                return;
            }
            var original = this.original;

            var oldVAO = this.currentVertexArrayObject;
            this.currentVertexArrayObject = arrayObject || this.defaultVertexArrayObject;
            this.currentVertexArrayObject.hasBeenBound = true;
            var newVAO = this.currentVertexArrayObject;

            if (oldVAO == newVAO) {
                return;
            }

            if (!oldVAO || newVAO.elementArrayBuffer != oldVAO.elementArrayBuffer) {
                original.bindBuffer.call(gl, gl.ELEMENT_ARRAY_BUFFER, newVAO.elementArrayBuffer);
            }

            var currentBinding = this.currentArrayBuffer;
            var maxAttrib = Math.max(oldVAO ? oldVAO.maxAttrib : 0, newVAO.maxAttrib);
            for (var n = 0; n <= maxAttrib; n++) {
                var attrib = newVAO.attribs[n];
                var oldAttrib = oldVAO ? oldVAO.attribs[n] : null;

                if (!oldVAO || attrib.enabled != oldAttrib.enabled) {
                    if (attrib.enabled) {
                        original.enableVertexAttribArray.call(gl, n);
                    } else {
                        original.disableVertexAttribArray.call(gl, n);
                    }
                }

                if (attrib.enabled) {
                    var bufferChanged = false;
                    if (!oldVAO || attrib.buffer != oldAttrib.buffer) {
                        if (currentBinding != attrib.buffer) {
                            original.bindBuffer.call(gl, gl.ARRAY_BUFFER, attrib.buffer);
                            currentBinding = attrib.buffer;
                        }
                        bufferChanged = true;
                    }

                    if (bufferChanged || attrib.cached != oldAttrib.cached) {
                        original.vertexAttribPointer.call(gl, n, attrib.size, attrib.type, attrib.normalized, attrib.stride, attrib.offset);
                    }
                }
            }

            if (this.currentArrayBuffer != currentBinding) {
                original.bindBuffer.call(gl, gl.ARRAY_BUFFER, this.currentArrayBuffer);
            }
        };

        function setupVertexArrayObject() {
            var original_getSupportedExtensions = WebGLRenderingContext.prototype.getSupportedExtensions;
            WebGLRenderingContext.prototype.getSupportedExtensions = function getSupportedExtensions() {
                var list = original_getSupportedExtensions.call(this) || [];
                if (list.indexOf("OES_vertex_array_object") < 0) {
                    list.push("OES_vertex_array_object");
                }
                return list;
            };

            var original_getExtension = WebGLRenderingContext.prototype.getExtension;
            WebGLRenderingContext.prototype.getExtension = function getExtension(name) {
                var ext = original_getExtension.call(this, name);
                if (ext) {
                    return ext;
                }
                if (name !== "OES_vertex_array_object") {
                    return null;
                }

                if (!this.__OESVertexArrayObject) {
                    console.log("Setup OES_vertex_array_object polyfill");
                    this.__OESVertexArrayObject = new OESVertexArrayObject(this);
                }
                return this.__OESVertexArrayObject;
            };
        }

        setupVertexArrayObject();
    })();

    var extensions = [];

    var getExtension = function getExtension(gl, extName) {
        var ext = extensions.find(function (ext) {
            return ext.name === extName;
        });
        if (ext) return ext.extension;

        var newExt = {
            name: extName,
            extension: gl.getExtension(extName)
        };
        extensions.push(newExt);

        // console.log(`Enabled WebGL extension: ${extName}`)

        return newExt.extension;
    };

    var makeVAO = function makeVAO(gl, attribs) {
        var rtn = {
            vaoExtension: getExtension(gl, 'OES_vertex_array_object'),
            buffers: [],
            vao: null
        };

        if (rtn.vaoExtension) {
            rtn.vao = rtn.vaoExtension.createVertexArrayOES();
            rtn.vaoExtension.bindVertexArrayOES(rtn.vao);
        }

        rtn.buffers = attribs.map(function (attrib) {
            var buffer = makeBuffer(gl, attrib);
            if (attrib.bufferType !== gl.ELEMENT_ARRAY_BUFFER) {
                bindBuffer(gl, buffer, attrib);
            }
            return buffer;
        });

        if (rtn.vaoExtension) {
            rtn.vaoExtension.bindVertexArrayOES(null);
        }

        return rtn;
    };

    var vertexShaderBallsSrc = "uniform mat4 u_translateMatrix;attribute vec2 a_position;void main(){gl_Position=u_translateMatrix*vec4(a_position,0.0,1.0);gl_PointSize=20.0;}";

    var fragmentShaderBallsSrc = "precision highp float;uniform vec4 u_color;void main(){gl_FragColor=u_color;}";

    var BallMesh = function () {
        function BallMesh(gl, props) {
            classCallCheck(this, BallMesh);

            this.gl = gl;
            var geometry = props.geometry,
                vertexCount = props.vertexCount,
                transformMatrix = props.transformMatrix,
                color = props.color;

            this.vertexCount = vertexCount;
            this.transformMatrix = transformMatrix;

            this.drawMode = 6;

            var vertexShader = makeShader(gl, gl.VERTEX_SHADER, vertexShaderBallsSrc);
            var fragmentShader = makeShader(gl, gl.FRAGMENT_SHADER, fragmentShaderBallsSrc);
            this.program = makeProgram(gl, vertexShader, fragmentShader);

            var a_position = gl.getAttribLocation(this.program, 'a_position');

            this.u_translateMatrix = gl.getUniformLocation(this.program, 'u_translateMatrix');
            this.u_color = gl.getUniformLocation(this.program, 'u_color');

            gl.useProgram(this.program);
            gl.uniformMatrix4fv(this.u_translateMatrix, false, this.transformMatrix);
            gl.uniform4f.apply(gl, [this.u_color].concat(toConsumableArray(color)));
            gl.useProgram(null);

            var attribs = [{
                bufferType: gl.ARRAY_BUFFER,
                attribLocation: a_position,
                attribType: gl.FLOAT,
                itemsPerVert: 2,
                typedArray: geometry.vertices,
                drawType: gl.STATIC_DRAW
            }];

            this.rtn = makeVAO(gl, attribs);
        }

        createClass(BallMesh, [{
            key: 'translate',
            value: function translate() {
                this.gl.useProgram(this.program);
                this.gl.uniformMatrix4fv(this.u_translateMatrix, false, this.transformMatrix);
                this.gl.useProgram(null);
            }
        }, {
            key: 'renderFrame',
            value: function renderFrame(gl, dt, now) {
                gl.useProgram(this.program);
                if (this.rtn.vaoExtension) {
                    this.rtn.vaoExtension.bindVertexArrayOES(this.rtn.vao);
                }
                gl.drawArrays(this.drawMode, 0, this.vertexCount);
                if (this.rtn.vaoExtension) {
                    this.rtn.vaoExtension.bindVertexArrayOES(null);
                }
                gl.useProgram(null);
            }
        }]);
        return BallMesh;
    }();

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    // document.body.appendChild(canvas)

    canvas.width = 512;
    canvas.height = 256;

    var fontSize = 100;
    var fillColor = '#fff';

    var canvasTexture = {
        setFontSize: function setFontSize(val) {
            fontSize = val;
        },
        setFillColor: function setFillColor(val) {
            fillColor = val;
        },
        drawText: function drawText(string) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = fillColor;
            ctx.font = fontSize + 'px Space Mono';
            ctx.textAlign = 'center';
            ctx.fillText(string, canvas.width / 2, canvas.height / 2);

            var idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
            return idata;
        }
    };

    var vertexShaderTextSrc = "uniform mat4 u_translateMatrix;attribute vec2 a_position;attribute vec2 a_uv;varying vec2 v_uv;void main(){gl_Position=u_translateMatrix*vec4(a_position,0.0,1.0);v_uv=a_uv;}";

    var fragmentShaderTextSrc = "precision highp float;uniform sampler2D u_diffuse;varying vec2 v_uv;void main(){vec2 uv=v_uv;uv.y=1.0-uv.y;gl_FragColor=texture2D(u_diffuse,uv);}";

    var TextMesh = function () {
        function TextMesh(gl, props) {
            classCallCheck(this, TextMesh);

            this.gl = gl;
            var text = props.text,
                geometry = props.geometry,
                transformMatrix = props.transformMatrix;


            var textureData = canvasTexture.drawText(text);
            this.texture = makeTexture(gl, {
                width: 400,
                height: 300,
                image: textureData
            });

            this.drawMode = 4;
            this.transformMatrix = transformMatrix;

            var vertexShader = makeShader(gl, gl.VERTEX_SHADER, vertexShaderTextSrc);
            var fragmentShader = makeShader(gl, gl.FRAGMENT_SHADER, fragmentShaderTextSrc);
            this.program = makeProgram(gl, vertexShader, fragmentShader);

            var a_position = gl.getAttribLocation(this.program, 'a_position');
            var a_uv = gl.getAttribLocation(this.program, 'a_uv');

            gl.useProgram(this.program);
            this.u_translateMatrix = gl.getUniformLocation(this.program, 'u_translateMatrix');
            this.u_diffuse = gl.getUniformLocation(this.program, 'u_diffuse');
            gl.uniformMatrix4fv(this.u_translateMatrix, false, this.transformMatrix);
            gl.uniform1i(this.u_diffuse, 0);
            gl.useProgram(null);

            var attribs = [{
                bufferType: gl.ARRAY_BUFFER,
                attribLocation: a_position,
                attribType: gl.FLOAT,
                itemsPerVert: 2,
                typedArray: geometry.vertices,
                drawType: gl.STATIC_DRAW
            }, {
                bufferType: gl.ARRAY_BUFFER,
                attribLocation: a_uv,
                attribType: gl.FLOAT,
                itemsPerVert: 2,
                typedArray: geometry.uvs,
                drawType: gl.STATIC_DRAW
            }, {
                bufferType: gl.ELEMENT_ARRAY_BUFFER,
                typedArray: geometry.indices,
                drawType: gl.STATIC_DRAW
            }];

            this.rtn = makeVAO(gl, attribs);
            this.vertexCount = geometry.indices.length;
        }

        createClass(TextMesh, [{
            key: 'translate',
            value: function translate() {
                this.gl.useProgram(this.program);
                this.gl.uniformMatrix4fv(this.u_translateMatrix, false, this.transformMatrix);
                this.gl.useProgram(null);
            }
        }, {
            key: 'renderFrame',
            value: function renderFrame(gl, dt, now) {

                if (this.rtn.vaoExtension) {
                    this.rtn.vaoExtension.bindVertexArrayOES(this.rtn.vao);
                }

                gl.useProgram(this.program);
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
                gl.drawElements(this.drawMode, this.vertexCount, gl.UNSIGNED_SHORT, 0);
                gl.bindTexture(gl.TEXTURE_2D, null);
                gl.disable(gl.BLEND);
                gl.useProgram(null);

                if (this.rtn.vaoExtension) {
                    this.rtn.vaoExtension.bindVertexArrayOES(null);
                }
            }
        }]);
        return TextMesh;
    }();

    var SkillBall = function () {
        function SkillBall(gl, props) {
            classCallCheck(this, SkillBall);
            var skill = props.skill,
                circleGeometry = props.circleGeometry,
                planeGeometry = props.planeGeometry,
                vertexCount = props.vertexCount,
                color = props.color,
                position = props.position,
                velocity = props.velocity;


            this.position = position;
            this.velocity = velocity;

            var transformMatrix = this.transformMatrix = new Float32Array([1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);

            this.ballMesh = new BallMesh(gl, {
                geometry: circleGeometry,
                vertexCount: vertexCount,
                transformMatrix: transformMatrix,
                color: color
            });
            this.textMesh = new TextMesh(gl, {
                text: skill,
                geometry: planeGeometry,
                transformMatrix: transformMatrix
            });
            this.translate(this.position.x, this.position.y);
        }

        createClass(SkillBall, [{
            key: 'translate',
            value: function translate() {
                var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

                this.position.x = this.transformMatrix[12] = x;
                this.position.y = this.transformMatrix[13] = y;
                this.ballMesh.translate();
                this.textMesh.translate();
            }
        }, {
            key: 'renderFrame',
            value: function renderFrame(gl, dt, now) {
                this.ballMesh.renderFrame(gl, dt, now);
                this.textMesh.renderFrame(gl, dt, now);
            }
        }]);
        return SkillBall;
    }();

    var BallsScene = function () {
        function BallsScene(gl, props) {
            var _this = this;

            classCallCheck(this, BallsScene);
            var skills = props.skills;


            this.balls = [];
            this.count = skills.length;
            this.sceneGravity = {
                x: -0.1, y: 0.1
            };

            this.radius = 0.125;
            var vertexDetail = 25;

            // reuse geometry for balls meshes
            var circleGeometry = new CircleGeometry({
                radius: this.radius,
                vertexDetail: vertexDetail
            });
            var planeGeometry = new PlaneGeometry({
                width: 0.2,
                height: 0.2,
                widthSegments: 3,
                heightSegments: 3
            });

            var colors = [[0.219, 0, 0.894, 1], [0.968, 0.56, 0.701, 1], [0.341, 0.294, 0.564, 1], [0.901, 0.403, 0.403, 1]];
            var colorPicker = 0;

            for (var i = 0; i < this.count; i += 1) {
                var skill = skills[i];
                var x = (Math.random() * 2 - 1) * 2 * 0.5;
                var y = (Math.random() * 2 - 1) * 2 * 0.5;
                var color = colors[colorPicker];

                colorPicker += 1;
                if (colorPicker === colors.length) colorPicker = 0;

                var skillBall = new SkillBall(gl, {
                    skill: skill,
                    vertexCount: vertexDetail,
                    circleGeometry: circleGeometry,
                    planeGeometry: planeGeometry,
                    color: color,
                    position: { x: x, y: y },
                    velocity: { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 }
                });

                this.balls.push(skillBall);
            }

            var gravityCount = 0;
            var gravityInterval = setInterval(function () {
                if (gravityCount % 2 === 0) {
                    _this.sceneGravity.y *= -1;
                } else {
                    _this.sceneGravity.x *= -1;
                }
                gravityCount += 1;
            }, 2000);
        }

        createClass(BallsScene, [{
            key: 'onMouseMove',
            value: function onMouseMove(props) {}
        }, {
            key: 'renderFrame',
            value: function renderFrame(gl, dt, now) {
                var _this2 = this;

                var spring = 0.3;
                this.balls.forEach(function (ball, i) {
                    for (var j = 0; j < _this2.balls.length; j += 1) {
                        if (i === j) return;

                        var ball2 = _this2.balls[j];
                        var dx = ball2.position.x - ball.position.x;
                        var dy = ball2.position.y - ball.position.y;
                        var dist = Math.sqrt(dx * dx + dy * dy);
                        var minDist = Math.sqrt(_this2.radius);

                        if (dist < minDist) {
                            var angle = Math.atan2(dy, dx);
                            var tx = ball.position.x + Math.cos(angle) * minDist;
                            var ty = ball.position.y + Math.sin(angle) * minDist;
                            var ax = (tx - ball.position.x) * spring * 0.5;
                            var ay = (ty - ball.position.y) * spring * 0.5;

                            ball.velocity.x -= ax * 10;
                            ball.velocity.y -= ay * 10;
                            ball2.velocity.x += ax * 10;
                            ball2.velocity.y += ay * 10;
                        }
                    }
                });

                this.balls.forEach(function (ball) {
                    var bounce = 0.6;

                    if (ball.position.x + _this2.radius > 1) {
                        ball.position.x = 1 - _this2.radius;
                        ball.velocity.x *= -1;
                        ball.velocity.x *= bounce;
                    } else if (ball.position.x - _this2.radius < -1) {
                        ball.position.x = -1 + _this2.radius;
                        ball.velocity.x *= -1;
                    } else if (ball.position.y + _this2.radius * 2 > 1) {
                        ball.position.y = 1 - _this2.radius * 2;
                        ball.velocity.y *= -1;
                        ball.velocity.x *= bounce;
                    } else if (ball.position.y - _this2.radius * 2 < -1) {
                        ball.position.y = -1 + _this2.radius * 2;
                        ball.velocity.y *= -1;
                        ball.velocity.y *= bounce;
                    }

                    ball.velocity.x += _this2.sceneGravity.x;
                    ball.velocity.y += _this2.sceneGravity.y;

                    ball.position.x += ball.velocity.x * (dt * 0.1);
                    ball.position.y += ball.velocity.y * (dt * 0.1);

                    ball.translate(ball.position.x, ball.position.y);
                    ball.renderFrame(gl, dt, now);
                });
            }
        }]);
        return BallsScene;
    }();

    var vertexShaderGallerySrc = "uniform float u_time;uniform vec2 u_mousePos;uniform float u_hoverOffset;attribute vec2 a_position;attribute vec2 a_uv;varying vec2 v_uv;vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float snoise(vec3 v){const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}vec3 snoiseVec3(vec3 x){float s=snoise(vec3(x));float s1=snoise(vec3(x.y-19.1,x.z+33.4,x.x+47.2));float s2=snoise(vec3(x.z+74.2,x.x-124.5,x.y+99.4));vec3 c=vec3(s,s1,s2);return c;}vec3 curlNoise(vec3 p){const float e=.1;vec3 dx=vec3(e,0.0,0.0);vec3 dy=vec3(0.0,e,0.0);vec3 dz=vec3(0.0,0.0,e);vec3 p_x0=snoiseVec3(p-dx);vec3 p_x1=snoiseVec3(p+dx);vec3 p_y0=snoiseVec3(p-dy);vec3 p_y1=snoiseVec3(p+dy);vec3 p_z0=snoiseVec3(p-dz);vec3 p_z1=snoiseVec3(p+dz);float x=p_y1.z-p_y0.z-p_z1.y+p_z0.y;float y=p_z1.x-p_z0.x-p_x1.z+p_x0.z;float z=p_x1.y-p_x0.y-p_y1.x+p_y0.x;const float divisor=1.0/(2.0*e);return normalize(vec3(x,y,z)*divisor);}void main(){vec4 position=vec4(a_position,0.0,1.0);vec2 mousePos=u_mousePos;mousePos.x=(2.0-mousePos.x)*(u_hoverOffset*0.3);position.xyz+=curlNoise(vec3(0.1*position.xy+mousePos.xy,0.0))*0.5;gl_Position=position;gl_PointSize=5.0;v_uv=a_uv;}";

    var fragmentShaderGallerySrc = "precision highp float;uniform sampler2D u_textures[3];uniform sampler2D u_ballsTexture;uniform float u_texMixFactor;uniform float u_ballsSimMixFactor;varying vec2 v_uv;void main(){float f=u_texMixFactor*3.0;vec2 uv=v_uv;uv.x=1.0-uv.x;vec4 texColor1=texture2D(u_textures[0],uv);vec4 texColor2=texture2D(u_textures[1],uv);vec4 texColor3=texture2D(u_textures[2],uv);vec4 projectColor=mix(texColor1,mix(texColor2,texColor3,clamp(f,1.0,2.0)),clamp(f,0.0,1.0));vec4 ballsColor=texture2D(u_ballsTexture,v_uv);gl_FragColor=mix(projectColor,ballsColor,u_ballsSimMixFactor);}";

    var ImageGallery = function () {
        function ImageGallery(gl, props) {
            classCallCheck(this, ImageGallery);

            this.gl = gl;

            var images = props.images,
                width = props.width,
                height = props.height,
                widthSegments = props.widthSegments,
                heightSegments = props.heightSegments;


            this.drawMode = gl.TRIANGLES;
            this.mousePos = { x: 0, y: 0 };
            this.mousePosTarget = { x: 0, y: 0 };

            this.ballsSimMixFactor = 1;
            this.ballsSimMixFactorTarget = this.ballsSimMixFactor;
            this.hoverOffsetFactor = 0;
            this.hoverOffsetFactorTarget = this.hoverOffsetFactor;

            var vertexShader = makeShader(gl, gl.VERTEX_SHADER, vertexShaderGallerySrc);
            var fragmentShader = makeShader(gl, gl.FRAGMENT_SHADER, fragmentShaderGallerySrc);
            this.program = makeProgram(gl, vertexShader, fragmentShader);

            var a_position = gl.getAttribLocation(this.program, 'a_position');
            var a_uv = gl.getAttribLocation(this.program, 'a_uv');

            this.u_texture = gl.getUniformLocation(this.program, 'u_textures[0]');
            this.u_ballsTexture = gl.getUniformLocation(this.program, 'u_ballsTexture');
            this.u_time = gl.getUniformLocation(this.program, 'u_time');
            this.u_texMixFactor = gl.getUniformLocation(this.program, 'u_texMixFactor');
            this.u_ballsSimMixFactor = gl.getUniformLocation(this.program, 'u_ballsSimMixFactor');
            this.u_hoverOffset = gl.getUniformLocation(this.program, 'u_hoverOffset');
            this.u_mousePos = gl.getUniformLocation(this.program, 'u_mousePos');

            this.textures = images.map(function (img) {
                return makeTexture(gl, {
                    width: img.width,
                    heigth: img.height,
                    image: img
                });
            });
            this.textureMixFactor = 0;
            this.textureMixFactorTarget = this.textureMixFactor;

            gl.useProgram(this.program);
            gl.uniform1iv(this.u_texture, images.map(function (a, i) {
                return i;
            }));
            gl.uniform1i(this.u_ballsTexture, images.length);
            gl.uniform1f(this.u_ballsSimMixFactor, this.ballsSimMixFactor);
            gl.uniform1f(this.u_hoverOffset, this.hoverOffsetFactor);
            gl.useProgram(null);

            var geometry = new PlaneGeometry({ width: width, height: height, widthSegments: widthSegments, heightSegments: heightSegments });
            var attribs = [{
                bufferType: gl.ARRAY_BUFFER,
                attribLocation: a_position,
                attribType: gl.FLOAT,
                itemsPerVert: 2,
                typedArray: geometry.vertices,
                drawType: gl.STATIC_DRAW
            }, {
                bufferType: gl.ARRAY_BUFFER,
                attribLocation: a_uv,
                attribType: gl.FLOAT,
                itemsPerVert: 2,
                typedArray: geometry.uvs,
                drawType: gl.STATIC_DRAW
            }, {
                bufferType: gl.ELEMENT_ARRAY_BUFFER,
                typedArray: geometry.indices,
                drawType: gl.STATIC_DRAW
            }];
            this.rtn = makeVAO(gl, attribs);
            this.vertexCount = geometry.indices.length;
        }

        createClass(ImageGallery, [{
            key: 'onMouseMove',
            value: function onMouseMove(mousePos) {
                var x = mousePos.x - 0.5;
                var y = mousePos.y - 0.5;
                this.mousePosTarget.x = x;
                this.mousePosTarget.y = y;

                if (x < -0.4) {
                    this.hoverOffsetFactorTarget = 1.2;
                }
            }
        }, {
            key: 'setTextureIndex',
            value: function setTextureIndex(idx) {
                this.textureMixFactorTarget = 1 / this.textures.length * idx;
            }
        }, {
            key: 'hover',
            value: function hover() {
                // this.drawMode = this.gl.TRIANGLES
                this.ballsSimMixFactorTarget = 0;
            }
        }, {
            key: 'unHover',
            value: function unHover() {
                // this.drawMode = this.gl.POINTS
                this.ballsSimMixFactorTarget = 1;
            }
        }, {
            key: 'renderFrame',
            value: function renderFrame(gl, dt, now, ballsTexture) {
                if (this.rtn.vaoExtension) {
                    this.rtn.vaoExtension.bindVertexArrayOES(this.rtn.vao);
                }

                gl.useProgram(this.program);

                gl.uniform1f(this.u_time, now);
                gl.uniform1f(this.u_texMixFactor, this.textureMixFactor);
                gl.uniform1f(this.u_ballsSimMixFactor, this.ballsSimMixFactor);
                gl.uniform1f(this.u_hoverOffset, this.hoverOffsetFactor);

                var _mousePos = this.mousePos,
                    x = _mousePos.x,
                    y = _mousePos.y;

                this.gl.uniform2f(this.u_mousePos, x + 0.5, 1 - y);
                this.textures.forEach(function (texture, i) {
                    gl.activeTexture(gl['TEXTURE' + i]);
                    gl.bindTexture(gl.TEXTURE_2D, texture);
                });

                gl.activeTexture(gl['TEXTURE' + this.textures.length]);
                gl.bindTexture(gl.TEXTURE_2D, ballsTexture);
                gl.drawElements(this.drawMode, this.vertexCount, gl.UNSIGNED_SHORT, 0);
                gl.useProgram(null);

                if (this.rtn.vaoExtension) {
                    this.rtn.vaoExtension.bindVertexArrayOES(null);
                }

                var mixTime = dt * 5;

                this.textureMixFactor += (this.textureMixFactorTarget - this.textureMixFactor) * mixTime;
                this.hoverOffsetFactor += (this.hoverOffsetFactorTarget - this.hoverOffsetFactor) * mixTime;

                this.ballsSimMixFactor += (this.ballsSimMixFactorTarget - this.ballsSimMixFactor) * (dt * 3);

                this.mousePos.x += (this.mousePosTarget.x - this.mousePos.x) * mixTime;
                this.mousePos.y += (this.mousePosTarget.y - this.mousePos.y) * mixTime;
            }
        }]);
        return ImageGallery;
    }();

    var PostFX = function () {
        function PostFX(gl, props) {
            classCallCheck(this, PostFX);
            var width = props.width,
                height = props.height,
                shaderBits = props.shaderBits;


            this.drawMode = gl.TRIANGLES;
            this.mixFactor = 0;
            this.mixFactorTarget = this.mixFactor;

            var vertexShaderSource = '\n            attribute vec2 a_position;\n            attribute vec2 a_uv;\n\n            varying vec2 v_uv;\n\n            ' + (shaderBits.vertexShader && shaderBits.vertexShader.head ? shaderBits.vertexShader.head : '') + '\n\n            void main () {\n                vec2 newPosition = a_position;\n\n                ' + (shaderBits.vertexShader && shaderBits.vertexShader.body ? shaderBits.vertexShader.body : '') + '\n\n                vec4 position = vec4(newPosition, 0.0, 1.0);                \n\n                gl_Position = position;\n                v_uv = a_uv;\n            }\n        ';
            var fragmentShaderSource = '\n            precision highp float;\n            \n            uniform sampler2D u_diffuse;\n            uniform vec2 u_resolution;\n            uniform float u_mixFactor;\n\n            ' + (shaderBits.fragmentShader && shaderBits.fragmentShader.head ? shaderBits.fragmentShader.head : '') + '        \n\n            varying vec2 v_uv;\n\n            void main () {\n                vec2 uv = v_uv;\n\n                ' + (shaderBits.fragmentShader && shaderBits.fragmentShader.body ? shaderBits.fragmentShader.body : '') + '            \n            }\n        ';
            var vertexShader = makeShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
            var fragmentShader = makeShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
            this.program = makeProgram(gl, vertexShader, fragmentShader);

            var a_position = gl.getAttribLocation(this.program, 'a_position');
            var a_uv = gl.getAttribLocation(this.program, 'a_uv');

            this.u_diffuse = gl.getUniformLocation(this.program, 'u_diffuse');
            this.u_resolution = gl.getUniformLocation(this.program, 'u_resolution');
            this.u_mixFactor = gl.getUniformLocation(this.program, 'u_mixFactor');

            gl.useProgram(this.program);
            gl.uniform1i(this.u_diffuse, 0);
            gl.uniform2f(this.u_resolution, window.innerWidth, window.innerHeight);
            gl.uniform1f(this.u_mixFactor, this.mixFactor);
            gl.useProgram(null);

            var widthSegments = 1;
            var heightSegments = 1;
            var geometry = new PlaneGeometry({ width: width, height: height, widthSegments: widthSegments, heightSegments: heightSegments });
            var attribs = [{
                bufferType: gl.ARRAY_BUFFER,
                attribLocation: a_position,
                attribType: gl.FLOAT,
                itemsPerVert: 2,
                typedArray: geometry.vertices,
                drawType: gl.STATIC_DRAW
            }, {
                bufferType: gl.ARRAY_BUFFER,
                attribLocation: a_uv,
                attribType: gl.FLOAT,
                itemsPerVert: 2,
                typedArray: geometry.uvs,
                drawType: gl.STATIC_DRAW
            }, {
                bufferType: gl.ELEMENT_ARRAY_BUFFER,
                typedArray: geometry.indices,
                drawType: gl.STATIC_DRAW
            }];
            this.rtn = makeVAO(gl, attribs);

            this.vertexCount = geometry.indices.length;
        }

        createClass(PostFX, [{
            key: 'hover',
            value: function hover() {
                this.mixFactorTarget = 1;
            }
        }, {
            key: 'unHover',
            value: function unHover() {
                this.mixFactorTarget = 0.25;
            }
        }, {
            key: 'renderFrame',
            value: function renderFrame(gl, dt, now, texture) {
                if (this.rtn.vaoExtension) {
                    this.rtn.vaoExtension.bindVertexArrayOES(this.rtn.vao);
                }

                gl.useProgram(this.program);
                gl.uniform1f(this.u_mixFactor, this.mixFactor);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.drawElements(this.drawMode, this.vertexCount, gl.UNSIGNED_SHORT, 0);
                gl.bindTexture(gl.TEXTURE_2D, null);
                gl.useProgram(null);

                if (this.rtn.vaoExtension) {
                    this.rtn.vaoExtension.bindVertexArrayOES(null);
                }

                this.mixFactor += (this.mixFactorTarget - this.mixFactor) * (dt * 3);
            }
        }]);
        return PostFX;
    }();

    var dpr = window.devicePixelRatio || 1;
    var w = window.innerWidth * dpr;
    var h = window.innerHeight * dpr;
    var elapsedTimeMs = 0;

    var canvas$1 = document.createElement('canvas');
    var gl = makeWebGLContext(canvas$1);

    var ballsSimulation = void 0;

    var ballsTexture = makeTexture(gl, {
        width: w,
        height: h,
        image: null
    });
    var ballsFramebuffer = makeFramebuffer(gl, {
        colorAttachment: gl.COLOR_ATTACHMENT0,
        texture: ballsTexture
    });

    var fadeTexture = makeTexture(gl, {
        width: w,
        height: h,
        image: null
    });
    var fadeFramebuffer = makeFramebuffer(gl, {
        colorAttachment: gl.COLOR_ATTACHMENT0,
        texture: resultTexture
    });
    var fadeMesh = new PostFX(gl, {
        width: 2,
        height: 2,

        shaderBits: {
            fragmentShader: {
                body: '\n                uv.x = 1.0 - uv.x;\n                uv.y = 1.0 - uv.y;\n                vec4 fadeColor = vec4(vec3(0.835), 1.0);\n                gl_FragColor = mix(texture2D(u_diffuse, uv), fadeColor, 0.3);\n            '
            }
        }
    });

    var resultTexture = makeTexture(gl, {
        width: w,
        height: h,
        image: null
    });
    var resultFramebuffer = makeFramebuffer(gl, {
        colorAttachment: gl.COLOR_ATTACHMENT0,
        texture: resultTexture
    });
    var resultMesh = new PostFX(gl, {
        width: 2,
        height: 2,

        shaderBits: {
            fragmentShader: {
                body: '\n                uv.x = 1.0 - uv.x;\n                uv.y = 1.0 - uv.y;\n                gl_FragColor = texture2D(u_diffuse, uv);\n            '
            }
        }
    });

    var aspect = w / h;
    var gallery = void 0;

    var imageResources = ['/assets/projects/codesketch-texture.png', '/assets/projects/archive-texture.png', '/assets/projects/archive-texture.png'];

    loadImageResources(imageResources, function (images) {
        var w = 1;
        var h = 1;

        if (window.innerWidth < 800) {
            w = 1.5;
        } else if (window.innerWidth > 800 && window.innerWidth < 1050) {
            w = 1.3;
        }

        if (window.innerHeight < 450) {
            h = 1.3;
        } else if (window.innerHeight > 450 && window.innerHeight < 600) {
            h = 1.175;
        }

        gallery = new ImageGallery(gl, {
            images: images,
            width: w,
            height: h,
            widthSegments: Math.round(20 * aspect),
            heightSegments: Math.round(12 * aspect)
        });
    });

    init();
    function init() {

        canvas$1.width = w;
        canvas$1.height = h;
        canvas$1.style.width = window.innerWidth + 'px';
        canvas$1.style.height = window.innerHeight + 'px';
        document.querySelector('.scene-container').appendChild(canvas$1);

        WebFont.load({
            google: {
                families: ['Space Mono']
            },
            active: function active() {
                ballsSimulation = new BallsScene(gl, {
                    skills: ['skills:', 'webgl', 'glsl', 'vue', 'react', 'canvas2d', 'svg', 'threejs', 'wp', 'express', 'webpack', 'git']
                });
            }
        });

        var gn = new gyronorm();
        gn.init().then(function () {
            gn.start(function (data) {

                data.do.gamma *= -1;

                // console.log(`alpha: ${data.do.alpha}`)
                // console.log(`gamma: ${data.do.gamma}`)

                if (gallery) gallery.onMouseMove({
                    x: data.do.alpha * 0.01,
                    y: data.do.beta * 0.01
                });
            });
        }).catch(function (error) {});

        attachListeners();
        introAnimation();
    }

    function attachListeners() {
        window.addEventListener('resize', onResize);
        window.requestAnimationFrame(onRenderFrame);
        document.body.addEventListener('mousemove', function (e) {
            if (!gallery) return;
            gallery.onMouseMove({
                x: e.pageX / w,
                y: e.pageY / h
            });
        });
        var projectList = document.querySelector('.projects-list');
        projectList.addEventListener('mousemove', onMouseMove, false);
        projectList.addEventListener('mouseleave', onMouseLeave, false);
    }

    function introAnimation() {
        var animateIns = [].concat(toConsumableArray(document.querySelectorAll('.animate-in')));
        var idx = 0;
        var interval = setInterval(function () {
            if (idx >= animateIns.length) {
                clearInterval(interval);
                return;
            }
            animateIns[idx].className += ' visible';
            idx += 1;
        }, 50);
    }

    function onMouseMove(e) {
        var count = document.querySelector('.projects-list').children.length;
        if (e.target.nodeName === 'LI') {
            var idx = parseInt(e.target.getAttribute('data-index'));
            gallery.setTextureIndex(idx);
            gallery.hover();
        }
    }

    function onMouseLeave(e) {
        gallery.unHover();
    }

    function loadImageResources(resources, cb) {
        var imgs = [];
        resources.forEach(function (resource, i) {
            var img = document.createElement('img');
            img.i = i;
            img.onload = function (e) {
                if (i === resources.length - 1) {
                    cb(imgs.sort(function (a, b) {
                        return a.i - b.i;
                    }));
                }
            };
            img.src = resource;
            imgs.push(img);
        });
    }

    function onResize() {
        w = canvas$1.width = window.innerWidth * dpr;
        h = canvas$1.height = window.innerHeight * dpr;
        canvas$1.style.width = window.innerWidth + 'px';
        canvas$1.style.height = window.innerHeight + 'px';

        gl.bindTexture(gl.TEXTURE_2D, fadeTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

        gl.bindTexture(gl.TEXTURE_2D, resultTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

        gl.bindTexture(gl.TEXTURE_2D, ballsTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    function onRenderFrame() {
        window.requestAnimationFrame(onRenderFrame);
        var now = window.performance.now() / 1000;
        var dt = now - elapsedTimeMs;
        elapsedTimeMs = now;

        gl.viewport(0, 0, w, h);
        gl.clearColor(0.9, 0.9, 0.9, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // render skills balls texture

        bindFramebuffer(gl, ballsFramebuffer, ballsTexture);
        if (ballsSimulation) ballsSimulation.renderFrame(gl, dt, now);

        // render main scene

        bindFramebuffer(gl, fadeFramebuffer, fadeTexture);
        if (gallery) gallery.renderFrame(gl, dt, now, ballsTexture);

        bindFramebuffer(gl, resultFramebuffer, resultTexture);
        fadeMesh.renderFrame(gl, dt, now, fadeTexture);

        bindFramebuffer(gl, null);
        resultMesh.renderFrame(gl, dt, now, resultTexture);

        swapBuffers();
    }

    function swapBuffers() {
        var temp = resultFramebuffer;
        resultFramebuffer = fadeFramebuffer;
        fadeFramebuffer = temp;
        temp = resultTexture;
        resultTexture = fadeTexture;
        fadeTexture = temp;
    }

}());
