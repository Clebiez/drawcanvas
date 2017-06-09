/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Drawcanvas = function () {
    function Drawcanvas(options) {
        var _this = this;

        _classCallCheck(this, Drawcanvas);

        this.canvas = document.getElementById(options.canvas);
        this.context = this.canvas.getContext('2d');

        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
        this.color = options.color ? options.color : '#000';
        this.size = options.size ? options.size : 3;
        this.canvas.addEventListener('mousedown', function (e) {
            _this.start(e);
        });
        this.canvas.addEventListener('touchstart', function (e) {
            e.preventDefault();
            var canvasCoords = _this.offset(_this.canvas);
            var t = {
                offsetX: e.touches[0].pageX - canvasCoords.left,
                offsetY: e.touches[0].pageY - canvasCoords.top
            };
            _this.start(t);
        });

        this.canvas.addEventListener('mousemove', function (e) {
            _this.move(e);
        });

        this.canvas.addEventListener('touchmove', function (e) {
            e.preventDefault();
            var canvasCoords = _this.offset(_this.canvas);
            var t = {
                offsetX: e.touches[0].pageX - canvasCoords.left,
                offsetY: e.touches[0].pageY - canvasCoords.top
            };
            _this.move(t);
        });

        this.canvas.addEventListener('mouseup', function () {
            _this.stop();
        });
        this.canvas.addEventListener('touchend', function () {
            _this.stop();
        });
    }

    _createClass(Drawcanvas, [{
        key: 'start',
        value: function start(e) {
            this.paint = true;
            this.addClick(e.offsetX, e.offsetY, false);
        }
    }, {
        key: 'move',
        value: function move(e) {
            if (this.paint) {
                this.addClick(e.offsetX, e.offsetY, true);
            }
        }
    }, {
        key: 'stop',
        value: function stop(e) {
            this.paint = false;
        }
    }, {
        key: 'addClick',
        value: function addClick(x, y, dragging) {
            this.clickX.push(x);
            this.clickY.push(y);
            this.clickDrag.push(dragging);
            this.redraw();
        }
    }, {
        key: 'redraw',
        value: function redraw() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.strokeStyle = this.color;
            this.context.lineJoin = 'round';
            this.context.lineWidth = this.size;

            for (var i = 0; i < this.clickX.length; i++) {
                this.context.beginPath();
                if (this.clickDrag[i] && i) {
                    this.context.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
                } else {
                    this.context.moveTo(this.clickX[i] - 1, this.clickY[i]);
                }
                this.context.lineTo(this.clickX[i], this.clickY[i]);
                this.context.closePath();
                this.context.stroke();
            }
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.clickX = [];
            this.clickY = [];
            this.dragging = [];
        }
    }, {
        key: 'offset',
        value: function offset(elt) {
            return elt.getBoundingClientRect();
        }
    }]);

    return Drawcanvas;
}();

exports.default = Drawcanvas;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);