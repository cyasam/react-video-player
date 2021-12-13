import { useState, useEffect, useCallback } from 'react';

import { ReactComponent as PlayIcon } from '../images/play.svg';
import { ReactComponent as PauseIcon } from '../images/pause.svg';
import { ReactComponent as FullscreenIcon } from '../images/fullscreen.svg';
import { ReactComponent as FullscreenExitIcon } from '../images/fullscreen-exit.svg';

import { formatVideoTime } from '../utils';
import VolumeControl from './VolumeControl';
import SpeedSelection from './SpeedSelection';
import ProgressBar from './ProgressBar';

import './VideoControls.css';

function VideoControls({
  videoProgressRef,
  status,
  fullscreenStatus,
  soundStatus,
  volume,
  speed,
  currentTime,
  duration,
  selectedTime,
  loadedPercentage,
  draggedBullet,
  onPlayClick,
  onVolumeClick,
  onFullscreenClick,
  onBulletDrag,
  onBulletStop,
  onProgressOver,
  onProgressDown,
  onVolumeChange,
  onSpeedChange,
}) {
  const [currentTimeLabel, setCurrentTimeLabel] = useState(
    formatVideoTime(currentTime)
  );

  const getCurrentPercentage = useCallback(() => {
    return (currentTime / duration) * 100;
  }, [currentTime, duration]);

  const getSelectedPercentage = useCallback(() => {
    return (selectedTime / duration) * 100 + '%';
  }, [selectedTime, duration]);

  const getLoadedPercentage = useCallback(() => {
    return loadedPercentage * 100 + '%';
  }, [loadedPercentage]);

  useEffect(() => {
    if (!draggedBullet) {
      setCurrentTimeLabel(formatVideoTime(currentTime));
    }
  }, [draggedBullet, currentTime]);

  return (
    <div className="video-controls">
      <div className="controls-background" />

      <>
        <div className="controls-inner">
          <button className="button" onClick={onPlayClick}>
            {status === 'playing' ? <PauseIcon /> : <PlayIcon />}
          </button>
          <VolumeControl
            volume={volume}
            soundStatus={soundStatus}
            onVolumeClick={onVolumeClick}
            onVolumeChange={onVolumeChange}
          />

          <div className="time-display">
            {currentTimeLabel} / {formatVideoTime(duration)}
          </div>

          <SpeedSelection speed={speed} onSpeedChange={onSpeedChange} />
          <button
            className="button fullscreen-button"
            onClick={onFullscreenClick}
          >
            {fullscreenStatus ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </button>
        </div>

        <div
          ref={videoProgressRef}
          className={`video-progress-wrapper${
            draggedBullet ? ' dragging' : ''
          }`}
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

          <ProgressBar
            value={getCurrentPercentage()}
            onProgressDown={onProgressDown}
            onDrag={onBulletDrag}
            onDragStop={(value) => {
              onBulletStop(value);
              setCurrentTimeLabel(formatVideoTime(selectedTime));
            }}
            onHover={onProgressOver}
          />
        </div>
      </>
    </div>
  );
}

export default VideoControls;
