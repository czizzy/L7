"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = DrawPolygonLine;

var THREE = _interopRequireWildcard(require("../../../core/three"));

var _buffer2 = require("../../../geom/buffer/");

var _lineMaterial = require("../../../geom/material/lineMaterial");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function DrawPolygonLine(layerData, layer, buffer) {
  var style = layer.get('styleOptions');
  var activeOption = layer.get('activedOptions');

  var config = _objectSpread({}, style, {
    activeColor: activeOption.fill
  });

  var opacity = config.opacity;

  if (!buffer) {
    var geometryBuffer = (0, _buffer2.getBuffer)(layer.type, layer.shape);
    buffer = new geometryBuffer({
      layerData: layerData
    });
  }

  var _buffer = buffer,
      attributes = _buffer.attributes,
      indexArray = _buffer.indexArray;
  var geometry = new THREE.BufferGeometry();

  if (indexArray) {
    geometry.setIndex(new THREE.Uint32BufferAttribute(indexArray, 1));
  }

  geometry.addAttribute('position', new THREE.Float32BufferAttribute(attributes.positions, 3));
  geometry.addAttribute('a_color', new THREE.Float32BufferAttribute(attributes.colors, 4));
  geometry.addAttribute('pickingId', new THREE.Float32BufferAttribute(attributes.pickingIds, 1));
  var lineMaterial = new _lineMaterial.LineMaterial({
    u_opacity: opacity
  }, {
    SHAPE: false
  });
  var polygonLineMesh = new THREE.LineSegments(geometry, lineMaterial);
  return polygonLineMesh;
}