import { ReactComponent as PauseIcon } from '../images/pause.svg';

function VideoScreen({
  videoRef,
  width,
  height,
  children,
  poster,
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
    <div className="video-screen" onClick={onClick}>
      <div className="video-poster">
        <img src={poster} alt="Poster" />
      </div>
      <video
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

      {title && <div className="title">{title}</div>}

      {status && (
        <div
          className="play-overlay"
          style={{ opacity: status === 'playing' ? 0 : 1 }}
        >
          <PauseIcon />
        </div>
      )}
    </div>
  );
}

export default VideoScreen;
