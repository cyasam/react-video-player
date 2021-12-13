import { useState } from 'react';
import ProgressBar from './widgets/ProgressBar';
import { ReactComponent as VolumeIcon } from '../images/volume.svg';
import { ReactComponent as MuteIcon } from '../images/mute.svg';
import './VolumeControl.css';

function VolumeControl({ volume, soundStatus, onVolumeClick, onVolumeChange }) {
  const [draggingBullet, setDraggingBullet] = useState(false);
  return (
    <div className="volume-control" data-dragging-bullet={draggingBullet}>
      <button className="button" onClick={onVolumeClick}>
        {soundStatus === 'muted' ? <MuteIcon /> : <VolumeIcon />}
      </button>
      <div className="volume-progress">
        <div className="volume-progress-inner">
          <ProgressBar
            value={volume}
            onDrag={(event) => {
              onVolumeChange(event);
              setDraggingBullet(true);
            }}
            onDragStop={() => {
              setDraggingBullet(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default VolumeControl;
