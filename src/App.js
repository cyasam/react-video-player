import VideoPlayer from './components/VideoPlayer';
import './App.css';

import videosData from './video-data';

function App() {
  return (
    <div className="app">
      <div className="container">
        {videosData.map(({ sources, poster, title }, index) => (
          <VideoPlayer
            key={index}
            sources={sources}
            poster={poster}
            title={title}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
