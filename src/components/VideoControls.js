import { ReactComponent as PlayIcon } from '../images/play.svg';
import { ReactComponent as PauseIcon } from '../images/pause.svg';
import { ReactComponent as FullscreenIcon } from '../images/fullscreen.svg';
import { ReactComponent as FullscreenExitIcon } from '../images/fullscreen-exit.svg';

import VolumeControl from './VolumeControl';
import SpeedSelection from './widgets/SpeedSelection';
import Button from './widgets/Button';
import DisplayTime from './widgets/DisplayTime';
import VideoProgress from './VideoProgress';

import './VideoControls.css';

function VideoControls({
  status,
  fullscreenStatus,
  soundStatus,
  volume,
  speed,
  currentTime,
  duration,
  selectedTime,
  loadedPercentage,
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
  return (
    <div className="video-controls">
      <div className="controls-background" />

      <div className="controls-inner">
        <Button className="button" onClick={onPlayClick}>
          {status === 'playing' ? <PauseIcon /> : <PlayIcon />}
        </Button>

        <VolumeControl
          volume={volume}
          soundStatus={soundStatus}
          onVolumeClick={onVolumeClick}
          onVolumeChange={onVolumeChange}
        />

        <DisplayTime currentTime={currentTime} duration={duration} />

        <SpeedSelection speed={speed} onSpeedChange={onSpeedChange} />

        <Button
          className="button fullscreen-button"
          onClick={onFullscreenClick}
        >
          {fullscreenStatus ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </Button>
      </div>

      <VideoProgress
        currentTime={currentTime}
        selectedTime={selectedTime}
        loadedPercentage={loadedPercentage}
        duration={duration}
        onBulletDrag={onBulletDrag}
        onBulletStop={onBulletStop}
        onProgressOver={onProgressOver}
        onProgressDown={onProgressDown}
      />
    </div>
  );
}

export default VideoControls;
