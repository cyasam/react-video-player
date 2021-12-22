"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

require("./SelectionList.css");

require("./SpeedSelection.css");

var _utils = require("../../utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var speedList = [{
  text: '0.25',
  value: 0.25
}, {
  text: '0.5',
  value: 0.5
}, {
  text: '0.75',
  value: 0.75
}, {
  text: 'Normal',
  value: 1
}, {
  text: '1.25',
  value: 1.25
}, {
  text: '1.5',
  value: 1.5
}, {
  text: '1.75',
  value: 1.75
}, {
  text: '2',
  value: 2
}];

function SpeedSelection(_ref) {
  var speed = _ref.speed,
      onChange = _ref.onChange;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isActive = _useState2[0],
      setIsActive = _useState2[1];

  return /*#__PURE__*/React.createElement("div", {
    className: (0, _utils.makeClassName)({
      'speed-selection': true,
      'selection-area': true,
      open: isActive
    })
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setIsActive(!isActive);
    }
  }, speed, "x"), /*#__PURE__*/React.createElement("ul", {
    className: "selection-list",
    style: {
      visibility: !isActive ? 'hidden' : 'visible',
      opacity: !isActive ? 0 : 1
    }
  }, speedList.map(function (item, index) {
    return /*#__PURE__*/React.createElement("li", {
      key: index,
      className: (0, _utils.makeClassName)({
        item: true,
        active: item.value === speed
      }),
      onClick: function onClick() {
        return onChange(item.value);
      }
    }, item.text);
  })));
}

var _default = SpeedSelection;
exports.default = _default;