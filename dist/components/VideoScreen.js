"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pause = require("../images/pause.svg");

require("./VideoScreen.css");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function VideoScreen(_ref) {
  var videoRef = _ref.videoRef,
      children = _ref.children,
      poster = _ref.poster,
      hidePoster = _ref.hidePoster,
      title = _ref.title,
      style = _ref.style,
      status = _ref.status,
      onPlay = _ref.onPlay,
      onPause = _ref.onPause,
      onLoadedData = _ref.onLoadedData,
      onTimeUpdate = _ref.onTimeUpdate,
      onClick = _ref.onClick,
      onEnded = _ref.onEnded;
  return /*#__PURE__*/React.createElement("div", {
    className: "video-screen",
    onClick: onClick
  }, !hidePoster && /*#__PURE__*/React.createElement("div", {
    className: "video-poster"
  }, /*#__PURE__*/React.createElement("img", {
    src: poster,
    alt: "Poster"
  })), /*#__PURE__*/React.createElement("video", {
    ref: videoRef,
    onPlay: onPlay,
    onPause: onPause,
    onLoadedData: onLoadedData,
    onTimeUpdate: onTimeUpdate,
    onEnded: onEnded,
    style: _objectSpread({}, style)
  }, children, "Sorry, your browser doesn't support embedded videos."), title && /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, title), status && /*#__PURE__*/React.createElement("div", {
    className: "play-overlay",
    style: {
      opacity: status === 'playing' ? 0 : 1
    }
  }, /*#__PURE__*/React.createElement(_pause.ReactComponent, null)));
}

var _default = VideoScreen;
exports.default = _default;