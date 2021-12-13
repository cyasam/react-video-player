import { useState, useCallback } from 'react';

import { formatVideoTime } from '../utils';
import ProgressBar from './widgets/ProgressBar';

function VideoProgress({
  currentTime,
  selectedTime,
  loadedPercentage,
  duration,
  onProgressOver,
  onProgressDown,
  onBulletDrag,
  onBulletStop,
}) {
  const [draggingBullet, setDraggingBullet] = useState(false);

  const getCurrentPercentage = useCallback(() => {
    return (currentTime / duration) * 100;
  }, [currentTime, duration]);

  const getSelectedPercentage = useCallback(() => {
    return (selectedTime / duration) * 100 + '%';
  }, [selectedTime, duration]);

  const getLoadedPercentage = useCallback(() => {
    return loadedPercentage * 100 + '%';
  }, [loadedPercentage]);
  return (
    <div
      className="video-progress-wrapper"
      data-dragging-bullet={draggingBullet}
    >
      <div className="load-progress" style={{ width: getLoadedPercentage() }} />
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
        onDrag={(value) => {
          onBulletDrag(value);
          setDraggingBullet(true);
        }}
        onDragStop={(value) => {
          onBulletStop(value);
          setDraggingBullet(false);
        }}
        onHover={onProgressOver}
      />
    </div>
  );
}

export default VideoProgress;
