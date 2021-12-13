import { useState } from 'react';
import './SpeedSelection.css';

import { makeClassName } from '../../utils';

const speedList = [
  {
    text: '0.25',
    value: 0.25,
  },
  {
    text: '0.5',
    value: 0.5,
  },
  {
    text: '0.75',
    value: 0.75,
  },
  {
    text: 'Normal',
    value: 1,
  },
  {
    text: '1.25',
    value: 1.25,
  },
  {
    text: '1.5',
    value: 1.5,
  },
  {
    text: '1.75',
    value: 1.75,
  },
  {
    text: '2',
    value: 2,
  },
];

function SpeedSelection({ speed, onSpeedChange }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={makeClassName({
        'speed-selection': true,
        open: isActive,
      })}
    >
      <button onClick={() => setIsActive(!isActive)}>{speed}x</button>
      <ul
        className="speed-list"
        style={{
          visibility: !isActive ? 'hidden' : 'visible',
          opacity: !isActive ? 0 : 1,
        }}
      >
        {speedList.map((item, index) => (
          <li
            key={index}
            className={makeClassName({
              item: true,
              active: item.value === speed,
            })}
            onClick={() => onSpeedChange(item.value)}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SpeedSelection;
