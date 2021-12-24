import { useState } from 'react';
import classNames from 'classnames';

import ProgressBar from './widgets/ProgressBar';
import Button from './widgets/Button';

import { ReactComponent as VolumeIcon } from '../images/volume.svg';
import { ReactComponent as MuteIcon } from '../images/mute.svg';
import styles from './VolumeControl.module.css';

function VolumeControl({ volume, soundStatus, onVolumeClick, onVolumeChange }) {
  const [draggingBullet, setDraggingBullet] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <div
      className={classNames(styles['volume-control'], {
        [styles.open]: clicked,
      })}
      data-dragging-bullet={draggingBullet}
      onClick={() => setClicked(true)}
      onMouseEnter={() => setClicked(true)}
      onMouseLeave={() => setClicked(false)}
    >
      <Button
        className={styles['volume-control-button']}
        onClick={(event) => {
          onVolumeClick(event);
          setClicked(true);
        }}
      >
        {soundStatus === 'muted' ? <MuteIcon /> : <VolumeIcon />}
      </Button>
      <div className={styles['volume-progress']}>
        <div className={styles['volume-progress-inner']}>
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
