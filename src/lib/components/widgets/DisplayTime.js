import { useState, useEffect } from 'react';

import { formatVideoTime } from '../../utils';
import styles from './DisplayTime.module.css';

function DisplayTime({ currentTime, duration }) {
  const [currentTimeLabel, setCurrentTimeLabel] = useState(
    formatVideoTime(currentTime)
  );

  useEffect(() => {
    setCurrentTimeLabel(formatVideoTime(currentTime));
  }, [currentTime]);

  return (
    <div className={styles['time-display']}>
      {currentTimeLabel} / {formatVideoTime(duration)}
    </div>
  );
}

export default DisplayTime;
