import VideoPlayer from './components/VideoPlayer';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="container">
        <div className="video vertical">
          <VideoPlayer
            poster="https://www.angrygorilla.us/react-video/test-vertical-poster.jpg"
            title="Terminator Geniysis Coming"
          >
            <source src="https://www.angrygorilla.us/react-video/test-vertical.mp4" />
          </VideoPlayer>
        </div>
        <div className="video">
          <VideoPlayer
            poster="https://www.angrygorilla.us/react-video/poster.jpg"
            title="Sintel - Open Movie by Blender Foundation"
          >
            <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
          </VideoPlayer>
        </div>
      </div>
    </div>
  );
}

export default App;
