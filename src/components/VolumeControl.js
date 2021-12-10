import { useState, useEffect, useRef, useCallback } from 'react';

import './VolumeControl.css';

function VolumeControl({ volume, onVolumeChange }) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(null);
  const [value, setValue] = useState(null);

  const handleBulletPosition = useCallback(
    (e) => {
      const mousePosition = e.clientX;
      const refClientRects = ref.current.getClientRects()[0];
      const refStartPosition = refClientRects.left;
      const refWidth = refClientRects.width;
      const refEndPosition = refStartPosition + refWidth;

      if (
        mousePosition >= refStartPosition &&
        mousePosition <= refEndPosition
      ) {
        const val = mousePosition - refStartPosition;
        setValue(val);
        onVolumeChange((val / refWidth) * 100);
      }
    },
    [onVolumeChange]
  );

  const handleMouseDown = () => {
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mouseup', onMouseUp, false);
    setDragging(true);
  };

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    setDragging(false);
  };

  const onMouseMove = useCallback(
    (e) => {
      handleBulletPosition(e);
    },
    [handleBulletPosition]
  );

  const onClick = (e) => {
    handleBulletPosition(e);
  };

  useEffect(() => {
    const refClientRects = ref.current.getClientRects()[0];
    setValue((volume / 100) * refClientRects.width);
  }, [volume]);

  return (
    <div className={`volume-control${dragging ? ' dragging' : ''}`}>
      <div ref={ref} className="progress-container" onClick={onClick}>
        <div
          className="progress-line"
          style={{
            width: `${value}px`,
          }}
        />
        <div
          className="progress-bullet"
          draggable="false"
          style={{
            transform: `translateX(${value}px)`,
          }}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
}

export default VolumeControl;
