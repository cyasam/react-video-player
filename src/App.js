import { useState, useRef, useEffect } from 'react';
import './App.css';

import videoData from './video-data';
import { ReactComponent as PlayIcon } from './images/play.svg';
import { ReactComponent as PauseIcon } from './images/pause.svg';
import { ReactComponent as VolumeIcon } from './images/volume.svg';
import { ReactComponent as MuteIcon } from './images/mute.svg';
import { ReactComponent as FullscreenIcon } from './images/fullscreen.svg';
import { ReactComponent as FullscreenExitIcon } from './images/fullscreen-exit.svg';

function App() {
  const videoWrapperRef = useRef(null);
  const videoRef = useRef(null);

  const [video] = useState(videoData);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loadedPercentage, setLoadedPercentage] = useState(0);
  const [status, setStatus] = useState(null);
  const [soundStatus, setSoundStatus] = useState(null);
  const [fullscreenStatus, setFullscreenStatus] = useState(false);

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
    let range = 0;
    const video = videoRef.current;
    const buffered = video.buffered;

    if (buffered.length === 0) {
      return;
    }

    while (
      !(
        buffered.start(range) <= currentTime &&
        currentTime <= buffered.end(range)
      )
    ) {
      range += 1;
    }

    const loadStartPercentage = buffered.start(range) / duration;
    const loadEndPercentage = buffered.end(range) / duration;
    const loadPercentage = loadEndPercentage - loadStartPercentage;

    setLoadedPercentage(loadPercentage);
  };

  const onPause = () => setStatus('paused');

  const handleCurrentPercentage = () => {
    return (currentTime / duration) * 100 + '%';
  };

  const handleLoadedPercentage = () => {
    return loadedPercentage * 100 + '%';
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
    <div className="app">
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

          <div className="video-progress-wrapper">
            <div
              className="load-progress"
              style={{ width: handleLoadedPercentage() }}
            />
            <div
              className="current-progress"
              style={{ width: handleCurrentPercentage() }}
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

export default App;
