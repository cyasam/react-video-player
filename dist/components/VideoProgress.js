"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _utils = require("../utils");

var _ProgressBar = _interopRequireDefault(require("./widgets/ProgressBar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function VideoProgress(_ref) {
  var currentTime = _ref.currentTime,
      loadedPercentage = _ref.loadedPercentage,
      duration = _ref.duration,
      onProgressDown = _ref.onProgressDown,
      onBulletStop = _ref.onBulletStop;

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      selectedTime = _useState2[0],
      setSelectedTime = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      draggingBullet = _useState4[0],
      setDraggingBullet = _useState4[1];

  var getCurrentPercentage = (0, _react.useCallback)(function () {
    return currentTime / duration * 100;
  }, [currentTime, duration]);
  var getSelectedPercentage = (0, _react.useCallback)(function () {
    return selectedTime / duration * 100 + '%';
  }, [selectedTime, duration]);
  var getLoadedPercentage = (0, _react.useCallback)(function () {
    return loadedPercentage * 100 + '%';
  }, [loadedPercentage]);
  var handleProgressSelect = (0, _react.useCallback)(function (value) {
    var selectedTimeResult = value / 100 * duration;
    setSelectedTime(selectedTimeResult);
  }, [duration]);
  return /*#__PURE__*/React.createElement("div", {
    className: "video-progress-wrapper",
    "data-dragging-bullet": draggingBullet
  }, /*#__PURE__*/React.createElement("div", {
    className: "load-progress",
    style: {
      width: getLoadedPercentage()
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "selected-progress",
    style: {
      width: getSelectedPercentage()
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "selected-progress-inner"
  }), /*#__PURE__*/React.createElement("div", {
    className: "tooltip"
  }, (0, _utils.formatVideoTime)(selectedTime))), /*#__PURE__*/React.createElement(_ProgressBar.default, {
    defaultValue: getCurrentPercentage(currentTime),
    onProgressDown: onProgressDown,
    onDrag: function onDrag(value) {
      handleProgressSelect(value);
      setDraggingBullet(true);
    },
    onDragStop: function onDragStop(value) {
      onBulletStop(value);
      setDraggingBullet(false);
    },
    onHover: handleProgressSelect
  }));
}

var _default = VideoProgress;
exports.default = _default;