import { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import './VideoPlayer.css';

import { formatVideoTime } from '../utils';

import { ReactComponent as PlayIcon } from '../images/play.svg';
import { ReactComponent as PauseIcon } from '../images/pause.svg';
import { ReactComponent as VolumeIcon } from '../images/volume.svg';
import { ReactComponent as MuteIcon } from '../images/mute.svg';
import { ReactComponent as FullscreenIcon } from '../images/fullscreen.svg';
import { ReactComponent as FullscreenExitIcon } from '../images/fullscreen-exit.svg';

function VideoPlayer({ data }) {
  const videoPlayerRef = useRef(null);
  const videoRef = useRef(null);
  const videoProgressRef = useRef(null);
  const bulletRef = useRef(null);
  const bulletDraggableRef = useRef(null);
  const timeout = useRef(null);

  const [video] = useState(data);
  const [videoSize, setVideoSize] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTimeLabel, setCurrentTimeLabel] = useState(
    formatVideoTime(currentTime)
  );
  const [loadedPercentage, setLoadedPercentage] = useState(0);
  const [status, setStatus] = useState(null);
  const [soundStatus, setSoundStatus] = useState(null);
  const [fullscreenStatus, setFullscreenStatus] = useState(false);
  const [selectedTime, setSelectedTime] = useState(0);
  const [bulletPosX, setBulletPosX] = useState(0);
  const [draggedBullet, setDraggedBullet] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const play = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setStatus('playing');
    } else {
      video.pause();
      setStatus('paused');
    }
  };

  const mute = () => {
    const video = videoRef.current;
    if (video.muted) {
      video.muted = false;
      setSoundStatus(null);
    } else {
      video.muted = true;
      setSoundStatus('muted');
    }
  };

  const fullscreen = () => {
    const videoPlayer = videoPlayerRef.current;
    if (!fullscreenStatus) {
      videoPlayer.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const setCurrentTimeAndDuration = () => {
    const video = videoRef.current;
    setDuration(video.duration);
    setCurrentTime(video.currentTime);
    setCurrentTimeLabel(formatVideoTime(video.currentTime));
  };

  const onLoadedData = () => {
    setVideoSize(calculateVideoSize());
    setCurrentTimeAndDuration();
  };

  const onTimeUpdate = () => {
    setCurrentTimeAndDuration();
    onProgress();
  };

  const onEnded = () => {
    setStatus('paused');
  };

  const onProgress = () => {
    let range = 0;
    const video = videoRef.current;
    const buffered = video.buffered;

    if (buffered.length === 0 || currentTime <= 0) {
      return;
    }

    const loadStartPercentage = buffered.start(range) / duration;
    const loadEndPercentage = buffered.end(range) / duration;

    setLoadedPercentage(loadEndPercentage - loadStartPercentage);
  };

  const getCurrentPercentage = () => {
    return (currentTime / duration) * 100 + '%';
  };

  const getSelectedPercentage = () => {
    return (selectedTime / duration) * 100 + '%';
  };

  const getLoadedPercentage = () => {
    return loadedPercentage * 100 + '%';
  };

  const handleProgressOnOver = (event) => {
    const videoProgress = videoProgressRef.current;
    const videoProgressClientRects = videoProgress.getClientRects()[0];

    const videoProgressWidth = videoProgressClientRects.width;
    const videoProgressStartPosition = videoProgressClientRects.x;
    const videoProgressMousePosition =
      event.type === 'touchmove'
        ? event.targetTouches[0].clientX
        : event.clientX;

    const selectedTimeResult =
      ((videoProgressMousePosition - videoProgressStartPosition) /
        videoProgressWidth) *
      duration;

    if (selectedTimeResult <= duration) {
      setSelectedTime(selectedTimeResult);
    }
  };

  const handleProgressClick = () => {
    const video = videoRef.current;
    video.currentTime = selectedTime;
    setCurrentTime(selectedTime);
    setCurrentTimeLabel(formatVideoTime(selectedTime));
  };

  const handleBulletDrag = (event) => {
    setDraggedBullet(true);
    const video = videoRef.current;
    video.pause();

    handleProgressOnOver(event);
    setCurrentTime(selectedTime);
  };

  const handleBulletStop = (_, dragElement) => {
    handleProgressClick();
    setBulletPosX(dragElement.x);
    setDraggedBullet(false);
    setCurrentTimeLabel(formatVideoTime(selectedTime));

    if (status === 'playing') {
      const video = videoRef.current;
      video.play();
    }
  };

  const handleShowControls = () => {
    clearTimeout(timeout.current);
    setShowControls(true);

    if (status === 'playing') {
      timeout.current = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    }
  };

  const calculateVideoSize = () => {
    return {
      width: videoPlayerRef.current && videoPlayerRef.current.clientWidth,
      height:
        videoPlayerRef.current &&
        videoRef.current &&
        (videoRef.current.videoHeight / videoRef.current.videoWidth) *
          videoPlayerRef.current.clientWidth,
    };
  };

  useEffect(() => {
    document.addEventListener(
      'fullscreenchange',
      function () {
        if (!document.fullscreenElement) {
          setFullscreenStatus(false);
        } else {
          setFullscreenStatus(true);
        }
      },
      false
    );

    window.addEventListener(
      'resize',
      function () {
        const videoProgress = videoProgressRef.current;
        const videoProgressClientRects = videoProgress.getClientRects()[0];

        const videoProgressWidth = videoProgressClientRects.width;

        setBulletPosX((currentTime / duration) * videoProgressWidth);
        setVideoSize(calculateVideoSize());
      },
      false
    );
  }, [currentTime, duration]);

  useEffect(() => {
    const videoProgress = videoProgressRef.current;
    setBulletPosX((currentTime / duration) * videoProgress.clientWidth);
  }, [currentTime, duration]);

  let videoPlayerClass = 'video-player';

  if (fullscreenStatus) {
    videoPlayerClass += ' fullscreen';
  }

  if (status) {
    videoPlayerClass += ' ' + status;
  }

  if (!showControls) {
    videoPlayerClass += ' hide-controls';
  }

  return (
    <div
      className={videoPlayerClass}
      ref={videoPlayerRef}
      onMouseMove={handleShowControls}
    >
      <div className="video-screen">
        <video
          className="video"
          ref={videoRef}
          poster={video.thumb}
          onPlay={handleShowControls}
          onPause={handleShowControls}
          onLoadedData={onLoadedData}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
          style={videoSize}
        >
          {video.sources.map(({ id, url, type }) => (
            <source key={id} src={url} type={type} />
          ))}
          Sorry, your browser doesn't support embedded videos.
        </video>

        <div
          className="play-overlay"
          style={{ opacity: status === 'playing' ? 0 : 1 }}
          onClick={play}
        >
          <PlayIcon />
        </div>
      </div>
      <div className="video-controls">
        <div className="controls-background" />

        <div
          ref={videoProgressRef}
          className={`video-progress-wrapper${
            draggedBullet ? ' dragging' : ''
          }`}
          onClick={handleProgressClick}
          onMouseMove={handleProgressOnOver}
        >
          <div
            className="load-progress"
            style={{ width: getLoadedPercentage() }}
          />
          <div
            className="selected-progress"
            style={{ width: getSelectedPercentage() }}
          >
            <div className="selected-progress-inner" />
            <div className="tooltip">{formatVideoTime(selectedTime)}</div>
          </div>
          <div
            className="current-progress"
            style={{ width: getCurrentPercentage() }}
          />

          <Draggable
            ref={bulletDraggableRef}
            nodeRef={bulletRef}
            axis="x"
            bounds=".video-progress-wrapper"
            handle=".bullet"
            position={{ x: bulletPosX, y: 0 }}
            offsetParent={videoProgressRef.current}
            onDrag={handleBulletDrag}
            onStop={handleBulletStop}
          >
            <div ref={bulletRef} className="bullet">
              <div className="bullet-inner" />
            </div>
          </Draggable>
        </div>

        {duration > 0 && (
          <div className="controls-inner">
            <button className="button" onClick={play}>
              {status === 'playing' ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button className="button" onClick={mute}>
              {soundStatus === 'muted' ? <MuteIcon /> : <VolumeIcon />}
            </button>
            <div className="time-display">
              {currentTimeLabel} / {formatVideoTime(duration)}
            </div>
            <button className="button fullscreen-button" onClick={fullscreen}>
              {fullscreenStatus ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoPlayer;
