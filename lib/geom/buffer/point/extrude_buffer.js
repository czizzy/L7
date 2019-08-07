"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _buffer = _interopRequireDefault(require("../buffer"));

var _global = _interopRequireDefault(require("../../../global"));

var _extrude = require("../../extrude");

var shapePath = _interopRequireWildcard(require("../../shape/path"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ExtrudeBuffer =
/*#__PURE__*/
function (_BufferBase) {
  _inherits(ExtrudeBuffer, _BufferBase);

  function ExtrudeBuffer() {
    _classCallCheck(this, ExtrudeBuffer);

    return _possibleConstructorReturn(this, _getPrototypeOf(ExtrudeBuffer).apply(this, arguments));
  }

  _createClass(ExtrudeBuffer, [{
    key: "_buildFeatures",
    value: function _buildFeatures() {
      var _this = this;

      var layerData = this.get('layerData');
      this._offset = 0;
      this._indexOffset = 0;
      layerData.forEach(function (feature) {
        _this._calculateFill(feature);
      });
    }
  }, {
    key: "_initAttributes",
    value: function _initAttributes() {
      _get(_getPrototypeOf(ExtrudeBuffer.prototype), "_initAttributes", this).call(this);

      this.attributes.miters = new Float32Array(this.verticesCount * 3);
      this.attributes.normals = new Float32Array(this.verticesCount * 3);
      this.attributes.sizes = new Float32Array(this.verticesCount * 3);
    }
  }, {
    key: "_calculateFeatures",
    value: function _calculateFeatures() {
      var _this2 = this;

      var layerData = this.get('layerData');
      this.geometryMap = {};
      layerData.forEach(function (feature) {
        var shape = feature.shape;

        var _this2$getShape = _this2.getShape(shape),
            positions = _this2$getShape.positions,
            indexArray = _this2$getShape.indexArray;

        _this2.verticesCount += positions.length / 3;
        _this2.indexCount += indexArray.length;
      });
    }
  }, {
    key: "_calcultateGeometry",
    value: function _calcultateGeometry() {
      var shape = this.get('shapeType');
      var hexgonFill = this.getShapeFunction(shape)([this._getPoints(6)]);
      this.instanceGeometry = hexgonFill;
    }
  }, {
    key: "_calculateFill",
    value: function _calculateFill(feature) {
      var _this3 = this;

      feature.bufferInfo = {
        verticesOffset: this._offset
      };
      var coordinates = feature.coordinates,
          shape = feature.shape;
      var instanceGeometry = this.getShape(shape);
      var numPoint = instanceGeometry.positions.length / 3;

      this._encodeArray(feature, numPoint);

      this.attributes.miters.set(instanceGeometry.positions, this._offset * 3);
      var indexArray = instanceGeometry.indexArray.map(function (v) {
        return v + _this3._offset;
      });
      this.indexArray.set(indexArray, this._indexOffset);

      if (instanceGeometry.normals) {
        this.attributes.normals.set(instanceGeometry.normals, this._offset * 3);
      }

      var position = [];

      for (var i = 0; i < numPoint; i++) {
        position.push.apply(position, _toConsumableArray(coordinates));
      }

      this.attributes.positions.set(position, this._offset * 3);
      this._offset += numPoint;
      this._indexOffset += indexArray.length;
    }
  }, {
    key: "_getPoints",
    value: function _getPoints(num) {
      return (0, shapePath.polygonPath)(num, 1);
    }
  }, {
    key: "getShape",
    value: function getShape(shape) {
      var pointShape = _global["default"].pointShape;

      if (this.geometryMap[shape]) {
        return this.geometryMap[shape];
      }

      var geometry = null;

      if (pointShape['3d'].indexOf(shape) !== -1) {
        geometry = (0, _extrude.extrude_Polygon)([shapePath[shape]()]);
      } else if (pointShape['2d'].indexOf(shape) !== -1) {
        geometry = (0, _extrude.fillPolygon)([shapePath[shape]()]);
      } else {
        geometry = (0, _extrude.fillPolygon)([shapePath[shape]()]);
      }

      this.geometryMap[shape] = geometry;
      return geometry;
    }
  }]);

  return ExtrudeBuffer;
}(_buffer["default"]);

exports["default"] = ExtrudeBuffer;