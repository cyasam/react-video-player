import { useState, useEffect, useRef, useCallback } from 'react';

import './ProgressBar.css';

function ProgressBar({ value, onDrag, onDragStop, onHover, onProgressDown }) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(null);
  const [posx, setPosx] = useState(null);

  const handleContainerWidth = useCallback(() => {
    const refClientRects = ref.current.getClientRects()[0];
    return refClientRects.width;
  }, []);

  const handleBulletPosition = useCallback(
    (event) => {
      const mousePosition = event.clientX;
      const refClientRects = ref.current.getClientRects()[0];
      const refStartPosition = refClientRects.left;
      const containerWidth = handleContainerWidth();
      const refEndPosition = refStartPosition + containerWidth;

      let val;

      if (mousePosition < refStartPosition) {
        val = 0;
      } else if (mousePosition > refEndPosition) {
        val = containerWidth;
      } else {
        val = mousePosition - refStartPosition;
      }

      return val;
    },
    [handleContainerWidth]
  );

  const setBulletPosition = useCallback(
    (value) => {
      const containerWidth = handleContainerWidth();
      const bulletPosX = (value * containerWidth) / 100;
      setPosx(bulletPosX);
    },
    [handleContainerWidth]
  );

  const calculatePercentage = useCallback(
    (event, value) => {
      const val = value >= 0 ? value : handleBulletPosition(event);
      const containerWidth = handleContainerWidth();
      return (val / containerWidth) * 100;
    },
    [handleContainerWidth, handleBulletPosition]
  );

  const onMouseMove = useCallback(
    (event) => {
      setBulletPosition(calculatePercentage(event));

      onDrag && onDrag(calculatePercentage(event), event);
    },
    [setBulletPosition, onDrag, calculatePercentage]
  );

  const onMouseUp = useCallback(
    (event) => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      setDragging(false);

      if (onDragStop) {
        onDragStop(calculatePercentage(event), event);
      }
    },
    [onMouseMove, onDragStop, calculatePercentage]
  );

  const handleMouseDown = useCallback(() => {
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mouseup', onMouseUp, false);
    setDragging(true);
  }, [onMouseMove, onMouseUp]);

  const onClick = useCallback(
    (event) => {
      onMouseMove(event);

      if (onDragStop) {
        onDragStop(calculatePercentage(event), event);
      }
    },
    [onMouseMove, onDragStop, calculatePercentage]
  );

  const onWrapperMouseMove = useCallback(
    (event) => {
      if (onHover) {
        onHover(calculatePercentage(event));
      }
    },
    [onHover, calculatePercentage]
  );

  const onWrapperMouseDown = useCallback(
    (event) => {
      handleMouseDown(event);
      onMouseMove(event);

      if (onProgressDown) {
        onProgressDown(calculatePercentage(event), event);
      }
    },
    [handleMouseDown, onMouseMove, calculatePercentage, onProgressDown]
  );

  useEffect(() => {
    setBulletPosition(value);
  }, [value, setBulletPosition]);

  useEffect(() => {
    window.addEventListener(
      'resize',
      function () {
        handleContainerWidth();
        setBulletPosition(value);
      },
      false
    );
  }, [value, setBulletPosition, handleContainerWidth]);

  return (
    <div
      ref={ref}
      className={`progress-container${dragging ? ' dragging' : ''}`}
      onClick={onClick}
      onMouseMove={onWrapperMouseMove}
      onMouseDown={onWrapperMouseDown}
    >
      <div className="progress-bar" />
      <div
        className="progress-line"
        style={{
          width: `${posx}px`,
        }}
      />
      <div
        className="progress-bullet"
        draggable="false"
        style={{
          transform: `translateX(${posx}px)`,
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="inner" />
      </div>
    </div>
  );
}

export default ProgressBar;
