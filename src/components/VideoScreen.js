import { ReactComponent as PauseIcon } from '../images/pause.svg';

function VideoScreen({
  videoRef,
  sources,
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
      <video
        className="video"
        ref={videoRef}
        poster={poster}
        onPlay={onPlay}
        onPause={onPause}
        onLoadedData={onLoadedData}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        style={{ ...style }}
      >
        {sources.map(({ id, url, type }) => (
          <source key={id} src={url} type={type} />
        ))}
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
