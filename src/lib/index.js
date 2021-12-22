import { useState, useRef, useEffect, useCallback } from 'react';

import './index.css';

import VideoScreen from './components/VideoScreen';
import VideoControls from './components/VideoControls';
import SubtitleScreen from './components/SubtitleScreen';

function VideoPlayer({ children, poster, title, volume, playbackSpeed }) {
  const videoRef = useRef(null);
  const videoPlayerRef = useRef(null);
  const volumeRef = useRef(null);
  const timeout = useRef(null);

  const [duration, setDuration] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [loadedPercentage, setLoadedPercentage] = useState(0);
  const [status, setStatus] = useState(null);
  const [soundStatus, setSoundStatus] = useState(null);
  const [volumeMount, setVolumeMount] = useState(volume || 100);
  const [speed, setSpeed] = useState(Number(playbackSpeed) || 1);
  const [selectedSubtitle, setSelectedSubtitle] = useState(null);
  const [fullscreenStatus, setFullscreenStatus] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [hidePoster, setHidePoster] = useState(false);

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

  const handleShowControls = useCallback(() => {
    clearTimeout(timeout.current);
    setShowControls(true);

    if (status === 'playing') {
      timeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [status]);

  const onLoadedData = useCallback(() => {
    const video = videoRef.current;
    video.playbackRate = speed;
    setCurrentTime(video.currentTime);
    setDuration(video.duration);
  }, [speed]);

  const onTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    setCurrentTime(video.currentTime);
    onProgress();
  }, [onProgress]);

  const onEnded = useCallback(() => {
    clearTimeout(timeout.current);
    setStatus('paused');
    setShowControls(true);
  }, []);

  const handleProgressSelectEnter = useCallback(
    (value) => {
      const video = videoRef.current;
      video.pause();

      video.currentTime = (value / 100) * duration;
      setHidePoster(true);
    },
    [duration]
  );

  const handleBulletStop = useCallback(
    (value) => {
      const selectedTimeResult = (value / 100) * duration;

      const video = videoRef.current;
      video.currentTime = selectedTimeResult;

      setCurrentTime(selectedTimeResult);

      if (status === 'playing') {
        const video = videoRef.current;
        video.play();
      }
    },
    [status, duration]
  );

  const handleVolumeChange = useCallback((volume) => {
    setVolumeMount(volume);

    const video = videoRef.current;
    video.volume = volume / 100;
  }, []);

  const handleSpeedChange = useCallback((speed) => {
    setSpeed(speed);

    const video = videoRef.current;
    video.playbackRate = speed;
  }, []);

  const handleSubtitleChange = useCallback((track) => {
    const textTracks = videoRef.current.textTracks;

    for (let i = 0; i < textTracks.length; i++) {
      textTracks[i].mode = 'disabled';

      if (track && textTracks[i].language === track.language) {
        textTracks[i].mode = 'showing';
      }
    }

    setSelectedSubtitle(track);
  }, []);

  useEffect(() => {
    handleVolumeChange(volumeMount);
  }, [volumeMount, handleVolumeChange]);

  useEffect(() => {
    handleSpeedChange(speed);
  }, [speed, handleSpeedChange]);

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
  }, []);

  useEffect(() => {
    const textTracks = videoRef.current.textTracks;

    for (let i = 0; i < textTracks.length; i++) {
      if (textTracks[i].mode === 'showing') {
        setSelectedSubtitle(textTracks[i]);
      }
    }
  }, [videoRef]);

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
        hidePoster={hidePoster}
        title={title}
        status={status}
        poster={poster}
        onPlay={handleShowControls}
        onPause={handleShowControls}
        onLoadedData={onLoadedData}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        onClick={play}
      >
        {children}
      </VideoScreen>

      {duration && (
        <>
          {selectedSubtitle && selectedSubtitle.activeCues && (
            <SubtitleScreen cue={selectedSubtitle.activeCues} />
          )}

          <VideoControls
            videoRef={videoRef}
            status={status}
            fullscreenStatus={fullscreenStatus}
            soundStatus={soundStatus}
            volume={volumeMount}
            speed={speed}
            currentTime={currentTime}
            duration={duration}
            loadedPercentage={loadedPercentage}
            selectedSubtitle={selectedSubtitle}
            onPlayClick={play}
            onVolumeClick={mute}
            onVolumeChange={handleVolumeChange}
            onFullscreenClick={fullscreen}
            onBulletStop={handleBulletStop}
            onProgressDown={handleProgressSelectEnter}
            onSpeedChange={handleSpeedChange}
            onSubtitleChange={handleSubtitleChange}
          />
        </>
      )}
    </div>
  );
}

export default VideoPlayer;
