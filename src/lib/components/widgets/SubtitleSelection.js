import classNames from 'classnames';
import { useState, useEffect } from 'react';
import styles from './SelectionList.module.css';

const buttonActiveBgStyle = 'rgba(255, 0, 0, 0.5)';

function SubtitleSelection({ videoRef, selectedSubtitle, onChange }) {
  const [tracks, setTracks] = useState([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const tracks = [];
    const textTracks = videoRef.current.textTracks;

    for (let i = 0; i < textTracks.length; i++) {
      tracks.push(textTracks[i]);
    }
    setTracks(tracks);
  }, [videoRef]);

  return (
    <>
      {tracks.length > 0 && (
        <div
          className={classNames(
            'subtitle-selection',
            styles['selection-area'],
            {
              open: isActive,
            }
          )}
        >
          <button
            onClick={() => setIsActive(!isActive)}
            style={{
              backgroundColor:
                selectedSubtitle &&
                selectedSubtitle.language &&
                buttonActiveBgStyle,
            }}
          >
            CC
          </button>
          <ul
            className={styles['selection-list']}
            style={{
              visibility: !isActive ? 'hidden' : 'visible',
              opacity: !isActive ? 0 : 1,
            }}
          >
            <li
              className={classNames(styles.item, {
                active: !selectedSubtitle,
              })}
              onClick={() => onChange(null)}
            >
              Off
            </li>

            {tracks.map((track, index) => (
              <li
                key={index}
                className={classNames(styles.item, {
                  active:
                    selectedSubtitle &&
                    track.language === selectedSubtitle.language,
                })}
                onClick={() => onChange(track)}
              >
                {track.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default SubtitleSelection;
