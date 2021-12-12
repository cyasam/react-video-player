import ProgressBar from './ProgressBar';
import { ReactComponent as VolumeIcon } from '../images/volume.svg';
import { ReactComponent as MuteIcon } from '../images/mute.svg';
import './VolumeControl.css';

function VolumeControl({ volume, soundStatus, onVolumeClick, onVolumeChange }) {
  return (
    <div className="volume-control">
      <button className="button" onClick={onVolumeClick}>
        {soundStatus === 'muted' ? <MuteIcon /> : <VolumeIcon />}
      </button>
      <ProgressBar value={volume} onDrag={onVolumeChange} />
    </div>
  );
}

export default VolumeControl;
