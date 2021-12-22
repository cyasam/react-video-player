"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

require("./ProgressBar.css");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ProgressBar(_ref) {
  var defaultValue = _ref.defaultValue,
      onDrag = _ref.onDrag,
      onDragStop = _ref.onDragStop,
      onHover = _ref.onHover,
      onProgressDown = _ref.onProgressDown;
  var ref = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      dragging = _useState2[0],
      setDragging = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      posx = _useState4[0],
      setPosx = _useState4[1];

  var handleContainerWidth = (0, _react.useCallback)(function () {
    var refClientRects = ref.current.getClientRects()[0];
    return refClientRects.width;
  }, []);
  var handleBulletPosition = (0, _react.useCallback)(function (event) {
    var mousePosition;

    if (event.type === 'touchmove') {
      mousePosition = event.touches[0].clientX;
    } else if (event.type === 'touchend') {
      mousePosition = event.changedTouches[0].clientX;
    } else {
      mousePosition = event.clientX;
    }

    var refClientRects = ref.current.getClientRects()[0];
    var refStartPosition = refClientRects.left;
    var containerWidth = handleContainerWidth();
    var refEndPosition = refStartPosition + containerWidth;
    var val;

    if (mousePosition < refStartPosition) {
      val = 0;
    } else if (mousePosition > refEndPosition) {
      val = containerWidth;
    } else {
      val = mousePosition - refStartPosition;
    }

    return val;
  }, [handleContainerWidth]);
  var calcBulletPosition = (0, _react.useCallback)(function (val) {
    var containerWidth = handleContainerWidth();
    return val * containerWidth / 100;
  }, [handleContainerWidth]);
  var calculatePercentage = (0, _react.useCallback)(function (event) {
    var val = handleBulletPosition(event);
    var containerWidth = handleContainerWidth();
    return val / containerWidth * 100;
  }, [handleContainerWidth, handleBulletPosition]);
  var onMouseMove = (0, _react.useCallback)(function (event) {
    var bulletPosX = calcBulletPosition(calculatePercentage(event));
    setPosx(bulletPosX);
    onDrag && onDrag(calculatePercentage(event), event);
  }, [calcBulletPosition, onDrag, calculatePercentage]);
  var onMouseUp = (0, _react.useCallback)(function (event) {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    setDragging(false);

    if (onDragStop) {
      onDragStop(calculatePercentage(event), event);
    }
  }, [onMouseMove, onDragStop, calculatePercentage]);
  var onTouchEnd = (0, _react.useCallback)(function (event) {
    setDragging(false);

    if (onDragStop) {
      onDragStop(calculatePercentage(event), event);
    }
  }, [onDragStop, calculatePercentage]);
  var handleMouseDown = (0, _react.useCallback)(function () {
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mouseup', onMouseUp, false);
    setDragging(true);
  }, [onMouseMove, onMouseUp]);
  var onWrapperMouseMove = (0, _react.useCallback)(function (event) {
    if (onHover) {
      onHover(calculatePercentage(event));
    }
  }, [onHover, calculatePercentage]);
  var onWrapperMouseDown = (0, _react.useCallback)(function (event) {
    handleMouseDown(event);
    onMouseMove(event);

    if (onProgressDown) {
      onProgressDown(calculatePercentage(event), event);
    }
  }, [handleMouseDown, onMouseMove, calculatePercentage, onProgressDown]);
  (0, _react.useEffect)(function () {
    setPosx(calcBulletPosition(defaultValue));
  }, [defaultValue, calcBulletPosition]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "progress-container",
    "data-dragging": dragging,
    onMouseMove: onWrapperMouseMove,
    onMouseDown: onWrapperMouseDown
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-bar"
  }), /*#__PURE__*/React.createElement("div", {
    className: "progress-line",
    style: {
      width: "".concat(posx, "px")
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "progress-bullet",
    draggable: "false",
    style: {
      transform: "translateX(".concat(posx, "px)")
    },
    onMouseDown: handleMouseDown,
    onTouchMove: onMouseMove,
    onTouchEnd: onTouchEnd
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  })));
}

var _default = ProgressBar;
exports.default = _default;