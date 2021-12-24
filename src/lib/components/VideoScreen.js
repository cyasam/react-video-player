import { ReactComponent as PauseIcon } from '../images/pause.svg';

import styles from './VideoScreen.module.css';

function VideoScreen({
  videoRef,
  children,
  poster,
  hidePoster,
  title,
  style,
  status,
  onPlay,
  onPause,
  onLoadedData,
  onTimeUpdate,
  onClick,
  onEnded,
}) {
  return (
    <div className={styles['video-screen']} onClick={onClick}>
      {!hidePoster && (
        <div className={styles['video-poster']}>
          <img src={poster} alt="Poster" />
        </div>
      )}
      <video
        className={styles.video}
        ref={videoRef}
        onPlay={onPlay}
        onPause={onPause}
        onLoadedData={onLoadedData}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        style={{
          ...style,
        }}
      >
        {children}
        Sorry, your browser doesn't support embedded videos.
      </video>

      {title && <div className={styles.title}>{title}</div>}

      {status && (
        <div
          className={styles['play-overlay']}
          style={{ opacity: status === 'playing' ? 0 : 1 }}
        >
          <PauseIcon />
        </div>
      )}
    </div>
  );
}

export default VideoScreen;
