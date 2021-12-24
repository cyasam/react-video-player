import styles from './SubtitleScreen.module.css';

function SubtitleScreen({ cue }) {
  if (cue.length === 0) {
    return null;
  }

  const { text } = cue[0];

  const textList = text.split('\n');

  return (
    <div className={styles['subtitle-screen']}>
      {textList.map((text, index) => (
        <span key={index} className={styles['subtitle-text']}>
          <span className={styles['subtitle-visual-line']}>{text}</span>
        </span>
      ))}
    </div>
  );
}

export default SubtitleScreen;
