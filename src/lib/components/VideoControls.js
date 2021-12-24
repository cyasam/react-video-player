import { ReactComponent as PlayIcon } from '../images/play.svg';
import { ReactComponent as PauseIcon } from '../images/pause.svg';
import { ReactComponent as FullscreenIcon } from '../images/fullscreen.svg';
import { ReactComponent as FullscreenExitIcon } from '../images/fullscreen-exit.svg';

import VolumeControl from './VolumeControl';
import SpeedSelection from './widgets/SpeedSelection';
import SubtitleSelection from './widgets/SubtitleSelection';
import Button from './widgets/Button';
import DisplayTime from './widgets/DisplayTime';
import VideoProgress from './VideoProgress';

import styles from './VideoControls.module.css';

function VideoControls({
  videoRef,
  status,
  fullscreenStatus,
  soundStatus,
  volume,
  speed,
  currentTime,
  duration,
  loadedPercentage,
  selectedSubtitle,
  onPlayClick,
  onVolumeClick,
  onFullscreenClick,
  onBulletDrag,
  onBulletStop,
  onProgressDown,
  onVolumeChange,
  onSpeedChange,
  onSubtitleChange,
}) {
  return (
    <div className={styles['video-controls']}>
      <div className={styles['controls-background']} />

      <VideoProgress
        currentTime={currentTime}
        loadedPercentage={loadedPercentage}
        duration={duration}
        onBulletDrag={onBulletDrag}
        onBulletStop={onBulletStop}
        onProgressDown={onProgressDown}
      />

      <div className={styles['controls-inner']}>
        <Button onClick={onPlayClick}>
          {status === 'playing' ? <PauseIcon /> : <PlayIcon />}
        </Button>

        <VolumeControl
          volume={volume}
          soundStatus={soundStatus}
          onVolumeClick={onVolumeClick}
          onVolumeChange={onVolumeChange}
        />

        <DisplayTime currentTime={currentTime} duration={duration} />

        <SpeedSelection speed={speed} onChange={onSpeedChange} />
        <SubtitleSelection
          videoRef={videoRef}
          onChange={onSubtitleChange}
          selectedSubtitle={selectedSubtitle}
        />

        <Button
          className={styles['fullscreen-button']}
          onClick={onFullscreenClick}
        >
          {fullscreenStatus ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </Button>
      </div>
    </div>
  );
}

export default VideoControls;
