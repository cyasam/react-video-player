import VideoPlayer from './lib';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="container">
        <div className="video vertical">
          <VideoPlayer
            poster="/images/vertical-poster.jpg"
            title="Terminator Geniysis Coming"
          >
            <source src="https://www.angrygorilla.us/react-video/test-vertical.mp4" />
          </VideoPlayer>
        </div>
        <div className="video">
          <VideoPlayer
            poster="/images/poster.jpg"
            title="Sintel - Open Movie by Blender Foundation"
          >
            <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />

            <track
              label="English"
              kind="subtitles"
              srcLang="en"
              src="subs/sintel-en.vtt"
              default
            />
            <track
              label="German - Deutsch"
              kind="subtitles"
              srcLang="de"
              src="subs/sintel-de.vtt"
            />
            <track
              label="Spanish - Español"
              kind="subtitles"
              srcLang="es"
              src="subs/sintel-es.vtt"
            />
            <track
              label="French - Français"
              kind="subtitles"
              srcLang="fr"
              src="subs/sintel-fr.vtt"
            />
            <track
              label="Japanese"
              kind="subtitles"
              srcLang="ja"
              src="subs/sintel-ja.vtt"
            />
            <track
              label="Polish - Polski"
              kind="subtitles"
              srcLang="pl"
              src="subs/sintel-pl.vtt"
            />
            <track
              label="Russian"
              kind="subtitles"
              srcLang="ru"
              src="subs/sintel-ru.vtt"
            />
            <track
              label="Swedish"
              kind="subtitles"
              srcLang="sv"
              src="subs/sintel-sv.vtt"
            />
            <track
              label="Turkish"
              kind="subtitles"
              srcLang="tr"
              src="subs/sintel-tr.vtt"
            />
          </VideoPlayer>
        </div>
      </div>
    </div>
  );
}

export default App;
