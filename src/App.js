import VideoPlayer from './components/VideoPlayer';
import './App.css';

import videosData from './video-data';

function App() {
  return (
    <div className="app">
      {videosData.map((video, index) => (
        <VideoPlayer key={index} data={video} />
      ))}
    </div>
  );
}

export default App;
