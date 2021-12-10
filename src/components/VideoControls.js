import { useState, useEffect, useRef, useCallback } from 'react';
import Draggable from 'react-draggable';

import { ReactComponent as PlayIcon } from '../images/play.svg';
import { ReactComponent as PauseIcon } from '../images/pause.svg';
import { ReactComponent as VolumeIcon } from '../images/volume.svg';
import { ReactComponent as MuteIcon } from '../images/mute.svg';
import { ReactComponent as FullscreenIcon } from '../images/fullscreen.svg';
import { ReactComponent as FullscreenExitIcon } from '../images/fullscreen-exit.svg';

import { formatVideoTime } from '../utils';

function VideoControls({
  videoProgressRef,
  status,
  fullscreenStatus,
  soundStatus,
  currentTime,
  duration,
  selectedTime,
  loadedPercentage,
  draggedBullet,
  bulletPosX,
  onClick,
  onMouseMove,
  onPlayClick,
  onVolumeClick,
  onFullscreenClick,
  onBulletDrag,
  onBulletStop,
}) {
  const bulletRef = useRef(null);
  const [currentTimeLabel, setCurrentTimeLabel] = useState(
    formatVideoTime(currentTime)
  );

  const getCurrentPercentage = useCallback(() => {
    return (currentTime / duration) * 100 + '%';
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

      <div
        ref={videoProgressRef}
        className={`video-progress-wrapper${draggedBullet ? ' dragging' : ''}`}
        onClick={() => {
          onClick();
          setCurrentTimeLabel(formatVideoTime(selectedTime));
        }}
        onMouseMove={onMouseMove}
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
          nodeRef={bulletRef}
          axis="x"
          bounds=".video-progress-wrapper"
          handle=".bullet"
          position={{ x: bulletPosX, y: 0 }}
          offsetParent={videoProgressRef.current}
          onDrag={onBulletDrag}
          onStop={() => {
            onBulletStop();
            setCurrentTimeLabel(formatVideoTime(selectedTime));
          }}
        >
          <div ref={bulletRef} className="bullet">
            <div className="bullet-inner" />
          </div>
        </Draggable>
      </div>

      {duration > 0 && (
        <div className="controls-inner">
          <button className="button" onClick={onPlayClick}>
            {status === 'playing' ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button className="button" onClick={onVolumeClick}>
            {soundStatus === 'muted' ? <MuteIcon /> : <VolumeIcon />}
          </button>
          <div className="time-display">
            {currentTimeLabel} / {formatVideoTime(duration)}
          </div>
          <button
            className="button fullscreen-button"
            onClick={onFullscreenClick}
          >
            {fullscreenStatus ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </button>
        </div>
      )}
    </div>
  );
}

export default VideoControls;
