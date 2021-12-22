"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

require("./VideoPlayer.css");

var _VideoScreen = _interopRequireDefault(require("./components/VideoScreen"));

var _VideoControls = _interopRequireDefault(require("./components/VideoControls"));

var _SubtitleScreen = _interopRequireDefault(require("./components/SubtitleScreen"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function VideoPlayer(_ref) {
  var children = _ref.children,
      poster = _ref.poster,
      title = _ref.title,
      volume = _ref.volume,
      playbackSpeed = _ref.playbackSpeed;

  var _videoRef = (0, _react.useRef)(null);

  var videoPlayerRef = (0, _react.useRef)(null);
  var volumeRef = (0, _react.useRef)(null);
  var timeout = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      duration = _useState2[0],
      setDuration = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      currentTime = _useState4[0],
      setCurrentTime = _useState4[1];

  var _useState5 = (0, _react.useState)(0),
      _useState6 = _slicedToArray(_useState5, 2),
      loadedPercentage = _useState6[0],
      setLoadedPercentage = _useState6[1];

  var _useState7 = (0, _react.useState)(null),
      _useState8 = _slicedToArray(_useState7, 2),
      status = _useState8[0],
      setStatus = _useState8[1];

  var _useState9 = (0, _react.useState)(null),
      _useState10 = _slicedToArray(_useState9, 2),
      soundStatus = _useState10[0],
      setSoundStatus = _useState10[1];

  var _useState11 = (0, _react.useState)(volume || 100),
      _useState12 = _slicedToArray(_useState11, 2),
      volumeMount = _useState12[0],
      setVolumeMount = _useState12[1];

  var _useState13 = (0, _react.useState)(Number(playbackSpeed) || 1),
      _useState14 = _slicedToArray(_useState13, 2),
      speed = _useState14[0],
      setSpeed = _useState14[1];

  var _useState15 = (0, _react.useState)(null),
      _useState16 = _slicedToArray(_useState15, 2),
      selectedSubtitle = _useState16[0],
      setSelectedSubtitle = _useState16[1];

  var _useState17 = (0, _react.useState)(false),
      _useState18 = _slicedToArray(_useState17, 2),
      fullscreenStatus = _useState18[0],
      setFullscreenStatus = _useState18[1];

  var _useState19 = (0, _react.useState)(true),
      _useState20 = _slicedToArray(_useState19, 2),
      showControls = _useState20[0],
      setShowControls = _useState20[1];

  var _useState21 = (0, _react.useState)(false),
      _useState22 = _slicedToArray(_useState21, 2),
      hidePoster = _useState22[0],
      setHidePoster = _useState22[1];

  var play = (0, _react.useCallback)(function () {
    var video = _videoRef.current;

    if (video.paused) {
      video.play();
      setStatus('playing');
    } else {
      video.pause();
      setStatus('paused');
    }
  }, []);
  var mute = (0, _react.useCallback)(function () {
    var video = _videoRef.current;

    if (video.muted) {
      video.muted = false;
      setSoundStatus(null);
      setVolumeMount(volumeRef.current);
    } else {
      video.muted = true;
      setSoundStatus('muted');
      volumeRef.current = volumeMount;
      setVolumeMount(0);
    }
  }, [volumeMount]);
  var fullscreen = (0, _react.useCallback)(function () {
    var videoPlayer = videoPlayerRef.current;

    if (!fullscreenStatus) {
      videoPlayer.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, [fullscreenStatus]);
  var onProgress = (0, _react.useCallback)(function () {
    var range = 0;
    var video = _videoRef.current;
    var buffered = video.buffered;

    if (buffered.length === 0 || currentTime <= 0) {
      return;
    }

    var loadStartPercentage = buffered.start(range) / duration;
    var loadEndPercentage = buffered.end(range) / duration;
    setLoadedPercentage(loadEndPercentage - loadStartPercentage);
  }, [currentTime, duration]);
  var handleShowControls = (0, _react.useCallback)(function () {
    clearTimeout(timeout.current);
    setShowControls(true);

    if (status === 'playing') {
      timeout.current = setTimeout(function () {
        setShowControls(false);
      }, 3000);
    }
  }, [status]);
  var onLoadedData = (0, _react.useCallback)(function () {
    var video = _videoRef.current;
    video.playbackRate = speed;
    setCurrentTime(video.currentTime);
    setDuration(video.duration);
  }, [speed]);
  var onTimeUpdate = (0, _react.useCallback)(function () {
    var video = _videoRef.current;
    setCurrentTime(video.currentTime);
    onProgress();
  }, [onProgress]);
  var onEnded = (0, _react.useCallback)(function () {
    clearTimeout(timeout.current);
    setStatus('paused');
    setShowControls(true);
  }, []);
  var handleProgressSelectEnter = (0, _react.useCallback)(function (value) {
    var video = _videoRef.current;
    video.pause();
    video.currentTime = value / 100 * duration;
    setHidePoster(true);
  }, [duration]);
  var handleBulletStop = (0, _react.useCallback)(function (value) {
    var selectedTimeResult = value / 100 * duration;
    var video = _videoRef.current;
    video.currentTime = selectedTimeResult;
    setCurrentTime(selectedTimeResult);

    if (status === 'playing') {
      var _video = _videoRef.current;

      _video.play();
    }
  }, [status, duration]);
  var handleVolumeChange = (0, _react.useCallback)(function (volume) {
    setVolumeMount(volume);
    var video = _videoRef.current;
    video.volume = volume / 100;
  }, []);
  var handleSpeedChange = (0, _react.useCallback)(function (speed) {
    setSpeed(speed);
    var video = _videoRef.current;
    video.playbackRate = speed;
  }, []);
  var handleSubtitleChange = (0, _react.useCallback)(function (track) {
    var textTracks = _videoRef.current.textTracks;

    for (var i = 0; i < textTracks.length; i++) {
      textTracks[i].mode = 'disabled';

      if (track && textTracks[i].language === track.language) {
        textTracks[i].mode = 'showing';
      }
    }

    setSelectedSubtitle(track);
  }, []);
  (0, _react.useEffect)(function () {
    handleVolumeChange(volumeMount);
  }, [volumeMount, handleVolumeChange]);
  (0, _react.useEffect)(function () {
    handleSpeedChange(speed);
  }, [speed, handleSpeedChange]);
  (0, _react.useEffect)(function () {
    document.addEventListener('fullscreenchange', function () {
      if (!document.fullscreenElement) {
        setFullscreenStatus(false);
      } else {
        setFullscreenStatus(true);
      }
    }, false);
  }, []);
  (0, _react.useEffect)(function () {
    var textTracks = _videoRef.current.textTracks;

    for (var i = 0; i < textTracks.length; i++) {
      if (textTracks[i].mode === 'showing') {
        setSelectedSubtitle(textTracks[i]);
      }
    }
  }, [_videoRef]);
  var videoPlayerClass = 'video-player';

  if (fullscreenStatus) {
    videoPlayerClass += ' fullscreen';
  }

  if (status) {
    videoPlayerClass += ' ' + status;
  }

  if (!showControls) {
    videoPlayerClass += ' hide-controls';
  }

  return /*#__PURE__*/React.createElement("div", {
    className: videoPlayerClass,
    ref: videoPlayerRef,
    onMouseMove: handleShowControls
  }, /*#__PURE__*/React.createElement(_VideoScreen.default, {
    videoRef: function videoRef(el) {
      _videoRef.current = el;
    },
    hidePoster: hidePoster,
    title: title,
    status: status,
    poster: poster,
    onPlay: handleShowControls,
    onPause: handleShowControls,
    onLoadedData: onLoadedData,
    onTimeUpdate: onTimeUpdate,
    onEnded: onEnded,
    onClick: play
  }, children), duration && /*#__PURE__*/React.createElement(React.Fragment, null, selectedSubtitle && selectedSubtitle.activeCues && /*#__PURE__*/React.createElement(_SubtitleScreen.default, {
    cue: selectedSubtitle.activeCues
  }), /*#__PURE__*/React.createElement(_VideoControls.default, {
    videoRef: _videoRef,
    status: status,
    fullscreenStatus: fullscreenStatus,
    soundStatus: soundStatus,
    volume: volumeMount,
    speed: speed,
    currentTime: currentTime,
    duration: duration,
    loadedPercentage: loadedPercentage,
    selectedSubtitle: selectedSubtitle,
    onPlayClick: play,
    onVolumeClick: mute,
    onVolumeChange: handleVolumeChange,
    onFullscreenClick: fullscreen,
    onBulletStop: handleBulletStop,
    onProgressDown: handleProgressSelectEnter,
    onSpeedChange: handleSpeedChange,
    onSubtitleChange: handleSubtitleChange
  })));
}

var _default = VideoPlayer;
exports.default = _default;