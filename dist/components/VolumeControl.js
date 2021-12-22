"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _ProgressBar = _interopRequireDefault(require("./widgets/ProgressBar"));

var _volume = require("../images/volume.svg");

var _mute = require("../images/mute.svg");

require("./VolumeControl.css");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function VolumeControl(_ref) {
  var volume = _ref.volume,
      soundStatus = _ref.soundStatus,
      onVolumeClick = _ref.onVolumeClick,
      onVolumeChange = _ref.onVolumeChange;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      draggingBullet = _useState2[0],
      setDraggingBullet = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      clicked = _useState4[0],
      setClicked = _useState4[1];

  return /*#__PURE__*/React.createElement("div", {
    className: (0, _utils.makeClassName)({
      'volume-control': true,
      open: clicked
    }),
    "data-dragging-bullet": draggingBullet,
    onClick: function onClick() {
      return setClicked(true);
    },
    onMouseEnter: function onMouseEnter() {
      return setClicked(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setClicked(false);
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "button",
    onClick: function onClick(event) {
      onVolumeClick(event);
      setClicked(true);
    }
  }, soundStatus === 'muted' ? /*#__PURE__*/React.createElement(_mute.ReactComponent, null) : /*#__PURE__*/React.createElement(_volume.ReactComponent, null)), /*#__PURE__*/React.createElement("div", {
    className: "volume-progress"
  }, /*#__PURE__*/React.createElement("div", {
    className: "volume-progress-inner"
  }, /*#__PURE__*/React.createElement(_ProgressBar.default, {
    defaultValue: volume,
    onDrag: function onDrag(event) {
      onVolumeChange(event);
      setDraggingBullet(true);
    },
    onDragStop: function onDragStop() {
      setDraggingBullet(false);
      setClicked(false);
    }
  }))));
}

var _default = VolumeControl;
exports.default = _default;