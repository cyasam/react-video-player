import classNames from 'classnames';
import { useState } from 'react';
import styles from './SelectionList.module.css';

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

function SpeedSelection({ speed, onChange }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={classNames('speed-selection', styles['selection-area'], {
        open: isActive,
      })}
      style={{
        marginLeft: 'auto',
      }}
    >
      <button onClick={() => setIsActive(!isActive)}>{speed}x</button>
      <ul
        className={styles['selection-list']}
        style={{
          visibility: !isActive ? 'hidden' : 'visible',
          opacity: !isActive ? 0 : 1,
        }}
      >
        {speedList.map((item, index) => (
          <li
            key={index}
            className={classNames(styles.item, {
              active: item.value === speed,
            })}
            onClick={() => onChange(item.value)}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SpeedSelection;
