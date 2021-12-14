import { useState, useEffect } from 'react';
import './SelectionList.css';
import './SubtitleSelection.css';

import { makeClassName } from '../../utils';

function SubtitleSelection({ videoRef, selectedSubtitle, onChange }) {
  const [tracks, setTracks] = useState(null);
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
      {tracks && (
        <div
          className={makeClassName({
            'subtitle-selection': true,
            'selection-area': true,
            open: isActive,
          })}
        >
          <button
            className={makeClassName({
              active: selectedSubtitle && selectedSubtitle.language,
            })}
            onClick={() => setIsActive(!isActive)}
          >
            CC
          </button>
          <ul
            className="selection-list"
            style={{
              visibility: !isActive ? 'hidden' : 'visible',
              opacity: !isActive ? 0 : 1,
            }}
          >
            <li
              className={makeClassName({
                item: true,
                active: !selectedSubtitle,
              })}
              onClick={() => onChange(null)}
            >
              Off
            </li>

            {tracks.map((track, index) => (
              <li
                key={index}
                className={makeClassName({
                  item: true,
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
