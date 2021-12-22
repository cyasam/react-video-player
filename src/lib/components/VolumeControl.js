import { useState } from 'react';
import ProgressBar from './widgets/ProgressBar';
import { ReactComponent as VolumeIcon } from '../images/volume.svg';
import { ReactComponent as MuteIcon } from '../images/mute.svg';
import './VolumeControl.css';

import { makeClassName } from '../utils';

function VolumeControl({ volume, soundStatus, onVolumeClick, onVolumeChange }) {
  const [draggingBullet, setDraggingBullet] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <div
      className={makeClassName({ 'volume-control': true, open: clicked })}
      data-dragging-bullet={draggingBullet}
      onClick={() => setClicked(true)}
      onMouseEnter={() => setClicked(true)}
      onMouseLeave={() => setClicked(false)}
    >
      <button
        className="button"
        onClick={(event) => {
          onVolumeClick(event);
          setClicked(true);
        }}
      >
        {soundStatus === 'muted' ? <MuteIcon /> : <VolumeIcon />}
      </button>
      <div className="volume-progress">
        <div className="volume-progress-inner">
          <ProgressBar
            defaultValue={volume}
            onDrag={(event) => {
              onVolumeChange(event);
              setDraggingBullet(true);
            }}
            onDragStop={() => {
              setDraggingBullet(false);
              setClicked(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default VolumeControl;
