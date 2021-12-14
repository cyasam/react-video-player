import './SubtitleScreen.css';

function SubtitleScreen({ cue }) {
  if (cue.length === 0) {
    return null;
  }

  const { text } = cue[0];

  const textList = text.split('\n');

  return (
    <div className="subtitle-screen">
      {textList.map((text, index) => (
        <span key={index} className="subtitle-text">
          <span className="subtitle-visual-line">{text}</span>
        </span>
      ))}
    </div>
  );
}

export default SubtitleScreen;
