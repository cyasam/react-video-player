"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _play = require("../images/play.svg");

var _pause = require("../images/pause.svg");

var _fullscreen = require("../images/fullscreen.svg");

var _fullscreenExit = require("../images/fullscreen-exit.svg");

var _VolumeControl = _interopRequireDefault(require("./VolumeControl"));

var _SpeedSelection = _interopRequireDefault(require("./widgets/SpeedSelection"));

var _SubtitleSelection = _interopRequireDefault(require("./widgets/SubtitleSelection"));

var _Button = _interopRequireDefault(require("./widgets/Button"));

var _DisplayTime = _interopRequireDefault(require("./widgets/DisplayTime"));

var _VideoProgress = _interopRequireDefault(require("./VideoProgress"));

require("./VideoControls.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function VideoControls(_ref) {
  var videoRef = _ref.videoRef,
      status = _ref.status,
      fullscreenStatus = _ref.fullscreenStatus,
      soundStatus = _ref.soundStatus,
      volume = _ref.volume,
      speed = _ref.speed,
      currentTime = _ref.currentTime,
      duration = _ref.duration,
      loadedPercentage = _ref.loadedPercentage,
      selectedSubtitle = _ref.selectedSubtitle,
      onPlayClick = _ref.onPlayClick,
      onVolumeClick = _ref.onVolumeClick,
      onFullscreenClick = _ref.onFullscreenClick,
      onBulletDrag = _ref.onBulletDrag,
      onBulletStop = _ref.onBulletStop,
      onProgressDown = _ref.onProgressDown,
      onVolumeChange = _ref.onVolumeChange,
      onSpeedChange = _ref.onSpeedChange,
      onSubtitleChange = _ref.onSubtitleChange;
  return /*#__PURE__*/React.createElement("div", {
    className: "video-controls"
  }, /*#__PURE__*/React.createElement("div", {
    className: "controls-background"
  }), /*#__PURE__*/React.createElement(_VideoProgress.default, {
    currentTime: currentTime,
    loadedPercentage: loadedPercentage,
    duration: duration,
    onBulletDrag: onBulletDrag,
    onBulletStop: onBulletStop,
    onProgressDown: onProgressDown
  }), /*#__PURE__*/React.createElement("div", {
    className: "controls-inner"
  }, /*#__PURE__*/React.createElement(_Button.default, {
    className: "button",
    onClick: onPlayClick
  }, status === 'playing' ? /*#__PURE__*/React.createElement(_pause.ReactComponent, null) : /*#__PURE__*/React.createElement(_play.ReactComponent, null)), /*#__PURE__*/React.createElement(_VolumeControl.default, {
    volume: volume,
    soundStatus: soundStatus,
    onVolumeClick: onVolumeClick,
    onVolumeChange: onVolumeChange
  }), /*#__PURE__*/React.createElement(_DisplayTime.default, {
    currentTime: currentTime,
    duration: duration
  }), /*#__PURE__*/React.createElement(_SpeedSelection.default, {
    speed: speed,
    onChange: onSpeedChange
  }), /*#__PURE__*/React.createElement(_SubtitleSelection.default, {
    videoRef: videoRef,
    onChange: onSubtitleChange,
    selectedSubtitle: selectedSubtitle
  }), /*#__PURE__*/React.createElement(_Button.default, {
    className: "button fullscreen-button",
    onClick: onFullscreenClick
  }, fullscreenStatus ? /*#__PURE__*/React.createElement(_fullscreenExit.ReactComponent, null) : /*#__PURE__*/React.createElement(_fullscreen.ReactComponent, null))));
}

var _default = VideoControls;
exports.default = _default;