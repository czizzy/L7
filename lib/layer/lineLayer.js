"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _layer = _interopRequireDefault(require("../core/layer"));

var _render = require("./render/");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LineLayer =
/*#__PURE__*/
function (_Layer) {
  _inherits(LineLayer, _Layer);

  function LineLayer() {
    _classCallCheck(this, LineLayer);

    return _possibleConstructorReturn(this, _getPrototypeOf(LineLayer).apply(this, arguments));
  }

  _createClass(LineLayer, [{
    key: "shape",
    value: function shape(type) {
      this.shapeType = type;
      return this;
    }
  }, {
    key: "preRender",
    value: function preRender() {
      if (this.animateDuration > 0 && this.animateDuration < this.scene._engine.clock.getElapsedTime()) {
        this.layerMesh.material.setDefinesvalue('ANIMATE', false);
        this.emit('animateEnd');
        this.scene.stopAnimate();
        this.animateDuration = Infinity;
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      this.type = 'line';
      this.add((0, _render.getRender)('line', this.shapeType || 'line')(this.layerData, this, this.layerSource));
    }
  }]);

  return LineLayer;
}(_layer["default"]);

exports["default"] = LineLayer;