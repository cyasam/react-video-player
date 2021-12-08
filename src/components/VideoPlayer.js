import { useState, useRef, useEffect } from 'react';
import './VideoPlayer.css';

import { ReactComponent as PlayIcon } from '../images/play.svg';
import { ReactComponent as PauseIcon } from '../images/pause.svg';
import { ReactComponent as VolumeIcon } from '../images/volume.svg';
import { ReactComponent as MuteIcon } from '../images/mute.svg';
import { ReactComponent as FullscreenIcon } from '../images/fullscreen.svg';
import { ReactComponent as FullscreenExitIcon } from '../images/fullscreen-exit.svg';

function VideoPlayer({ data }) {
  const videoWrapperRef = useRef(null);
  const videoRef = useRef(null);

  const [video] = useState(data);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loadedPercentage, setLoadedPercentage] = useState(0);
  const [status, setStatus] = useState(null);
  const [soundStatus, setSoundStatus] = useState(null);
  const [fullscreenStatus, setFullscreenStatus] = useState(false);
  const [selectedTime, setSelectedTime] = useState(0);

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
    const videoWrapper = videoWrapperRef.current;
    if (!fullscreenStatus) {
      videoWrapper.requestFullscreen();
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
  };

  const onLoadedData = () => {
    setCurrentTimeAndDuration();
  };

  const onTimeUpdate = () => {
    setCurrentTimeAndDuration();
  };

  const onProgress = () => {
    const video = videoRef.current;
    const buffered = video.buffered;

    if (buffered.length === 0) {
      return;
    }

    const loadStartPercentage = buffered.start(0) / duration;
    const loadEndPercentage = buffered.end(buffered.length - 1) / duration;
    const loadPercentage = loadEndPercentage - loadStartPercentage;

    setLoadedPercentage(loadPercentage);
  };

  const onPause = () => setStatus('paused');

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
    const videoProgress = event.currentTarget;
    const videoProgressClientRects = videoProgress.getClientRects()[0];

    const videoProgressWidth = videoProgressClientRects.width;
    const videoProgressStartPosition = videoProgressClientRects.x;
    const videoProgressMousePosition = event.clientX;

    const selectedTimeResult =
      ((videoProgressMousePosition - videoProgressStartPosition) /
        videoProgressWidth) *
      duration;
    setSelectedTime(selectedTimeResult);
  };

  const handleProgressOnOut = () => {
    setSelectedTime(0);
  };

  const handleProgressClick = () => {
    const video = videoRef.current;
    video.currentTime = selectedTime;
    setCurrentTime(currentTime);
  };

  const formatVideoTime = (time) => {
    const allTimeStr = new Date(time * 1000).toISOString().substr(11, 8);
    const allTime = allTimeStr.split(':');

    const hours = allTime[0];
    const minutes = allTime[1];
    const seconds = allTime[2];

    const resultTime = [];

    if (parseInt(hours) > 0) {
      resultTime.push(parseInt(hours).toString());
    }
    if (parseInt(minutes) < 10 && parseInt(hours) > 0) {
      resultTime.push('0' + parseInt(minutes).toString());
    } else {
      resultTime.push(parseInt(minutes).toString());
    }
    resultTime.push(seconds);

    return resultTime.join(':');
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
  }, []);

  let videoWrapperClass = 'video-wrapper';

  if (fullscreenStatus) {
    videoWrapperClass += ' fullscreen';
  }

  return (
    <div className="video-player">
      <div className={videoWrapperClass} ref={videoWrapperRef}>
        <div className="video-screen">
          <video
            className="video"
            ref={videoRef}
            poster={video.thumb}
            width={video.width}
            onLoadedData={onLoadedData}
            onProgress={onProgress}
            onPause={onPause}
            onTimeUpdate={onTimeUpdate}
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
            className="video-progress-wrapper"
            onClick={handleProgressClick}
            onMouseMove={handleProgressOnOver}
            onMouseLeave={handleProgressOnOut}
          >
            <div
              className="load-progress"
              style={{ width: getLoadedPercentage() }}
            />
            <div
              className="selected-progress"
              style={{ width: getSelectedPercentage() }}
            >
              <div className="tooltip">{formatVideoTime(selectedTime)}</div>
            </div>
            <div
              className="current-progress"
              style={{ width: getCurrentPercentage() }}
            />
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
                {formatVideoTime(currentTime)} / {formatVideoTime(duration)}
              </div>
              <button className="button fullscreen-button" onClick={fullscreen}>
                {fullscreenStatus ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
