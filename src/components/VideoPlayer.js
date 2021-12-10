import { useState, useRef, useEffect, useCallback } from 'react';

import './VideoPlayer.css';

import VideoScreen from './VideoScreen';
import VideoControls from './VideoControls';

function VideoPlayer({ sources, poster, title, volume, playbackSpeed }) {
  const videoRef = useRef(null);
  const videoPlayerRef = useRef(null);
  const videoProgressRef = useRef(null);
  const volumeRef = useRef(null);
  const timeout = useRef(null);

  const [videoSize, setVideoSize] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loadedPercentage, setLoadedPercentage] = useState(0);
  const [status, setStatus] = useState(null);
  const [soundStatus, setSoundStatus] = useState(null);
  const [volumeMount, setVolumeMount] = useState(volume || 100);
  const [speed, setSpeed] = useState(Number(playbackSpeed) || 1);
  const [fullscreenStatus, setFullscreenStatus] = useState(false);
  const [selectedTime, setSelectedTime] = useState(0);
  const [bulletPosX, setBulletPosX] = useState(0);
  const [draggedBullet, setDraggedBullet] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const play = useCallback(() => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setStatus('playing');
    } else {
      video.pause();
      setStatus('paused');
    }
  }, []);

  const mute = useCallback(() => {
    const video = videoRef.current;

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

  const fullscreen = useCallback(() => {
    const videoPlayer = videoPlayerRef.current;
    if (!fullscreenStatus) {
      videoPlayer.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, [fullscreenStatus]);

  const calculateVideoSize = useCallback(() => {
    return {
      width: videoPlayerRef.current && videoPlayerRef.current.clientWidth,
      height:
        videoPlayerRef.current &&
        videoRef.current &&
        (videoRef.current.videoHeight / videoRef.current.videoWidth) *
          videoPlayerRef.current.clientWidth,
    };
  }, [videoRef]);

  const onProgress = useCallback(() => {
    let range = 0;
    const video = videoRef.current;
    const buffered = video.buffered;

    if (buffered.length === 0 || currentTime <= 0) {
      return;
    }

    const loadStartPercentage = buffered.start(range) / duration;
    const loadEndPercentage = buffered.end(range) / duration;

    setLoadedPercentage(loadEndPercentage - loadStartPercentage);
  }, [currentTime, duration]);

  const setCurrentTimeAndDuration = useCallback(() => {
    const video = videoRef.current;
    setDuration(video.duration);
    setCurrentTime(video.currentTime);
  }, []);

  const onLoadedData = useCallback(() => {
    setVideoSize(calculateVideoSize());
    setCurrentTimeAndDuration();

    const video = videoRef.current;
    video.playbackRate = speed;
  }, [speed, calculateVideoSize, setCurrentTimeAndDuration]);

  const onTimeUpdate = useCallback(() => {
    setCurrentTimeAndDuration();
    onProgress();
  }, [onProgress, setCurrentTimeAndDuration]);

  const onEnded = useCallback(() => {
    setStatus('paused');
  }, []);

  const handleProgressOnOver = useCallback(
    (event) => {
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
    },
    [duration]
  );

  const handleProgressClick = useCallback(() => {
    const video = videoRef.current;
    video.currentTime = selectedTime;
    setCurrentTime(selectedTime);
  }, [selectedTime]);

  const handleBulletDrag = useCallback(
    (event) => {
      setDraggedBullet(true);
      const video = videoRef.current;
      video.pause();

      handleProgressOnOver(event);
      setCurrentTime(selectedTime);
    },
    [selectedTime, handleProgressOnOver]
  );

  const handleBulletStop = useCallback(() => {
    handleProgressClick();
    setDraggedBullet(false);

    if (status === 'playing') {
      const video = videoRef.current;
      video.play();
    }
  }, [status, handleProgressClick]);

  const handleShowControls = useCallback(() => {
    clearTimeout(timeout.current);
    setShowControls(true);

    if (status === 'playing') {
      timeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [status]);

  const handleVolumeChange = (volume) => {
    setVolumeMount(volume);

    const video = videoRef.current;
    video.volume = volume / 100;
  };

  const handleSpeedChange = (speed) => {
    setSpeed(speed);

    const video = videoRef.current;
    video.playbackRate = speed;
  };

  useEffect(() => {
    handleVolumeChange(volumeMount);
  }, [volumeMount]);

  useEffect(() => {
    handleSpeedChange(speed);
  }, [speed]);

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
  }, [currentTime, duration, calculateVideoSize]);

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
      <VideoScreen
        videoRef={(el) => {
          videoRef.current = el;
        }}
        title={title}
        status={status}
        sources={sources}
        poster={poster}
        onPlay={handleShowControls}
        onPause={handleShowControls}
        onLoadedData={onLoadedData}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        onClick={play}
        style={videoSize}
      />

      <VideoControls
        videoProgressRef={(el) => (videoProgressRef.current = el)}
        status={status}
        fullscreenStatus={fullscreenStatus}
        soundStatus={soundStatus}
        volume={volumeMount}
        speed={speed}
        currentTime={currentTime}
        duration={duration}
        selectedTime={selectedTime}
        loadedPercentage={loadedPercentage}
        bulletPosX={bulletPosX}
        draggedBullet={draggedBullet}
        onClick={handleProgressClick}
        onPlayClick={play}
        onVolumeClick={mute}
        onVolumeChange={handleVolumeChange}
        onFullscreenClick={fullscreen}
        onMouseMove={handleProgressOnOver}
        onBulletDrag={handleBulletDrag}
        onBulletStop={handleBulletStop}
        onSpeedChange={handleSpeedChange}
      />
    </div>
  );
}

export default VideoPlayer;
