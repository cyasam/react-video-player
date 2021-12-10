import { ReactComponent as PlayIcon } from '../images/play.svg';

function VideoScreen({
  videoRef,
  poster,
  sources,
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

      <div
        className="play-overlay"
        style={{ opacity: status === 'playing' ? 0 : 1 }}
      >
        <PlayIcon />
      </div>
    </div>
  );
}

export default VideoScreen;
