import { useState, useEffect, useRef, useCallback } from 'react';

import './ProgressBar.css';

function ProgressBar({
  defaultValue,
  onDrag,
  onDragStop,
  onHover,
  onProgressDown,
}) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(null);
  const [posx, setPosx] = useState(null);

  const handleContainerWidth = useCallback(() => {
    const refClientRects = ref.current.getClientRects()[0];
    return refClientRects.width;
  }, []);

  const handleBulletPosition = useCallback(
    (event) => {
      let mousePosition;

      if (event.type === 'touchmove') {
        mousePosition = event.touches[0].clientX;
      } else if (event.type === 'touchend') {
        mousePosition = event.changedTouches[0].clientX;
      } else {
        mousePosition = event.clientX;
      }

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

  const calcBulletPosition = useCallback(
    (val) => {
      const containerWidth = handleContainerWidth();
      return (val * containerWidth) / 100;
    },
    [handleContainerWidth]
  );

  const calculatePercentage = useCallback(
    (event) => {
      const val = handleBulletPosition(event);
      const containerWidth = handleContainerWidth();
      return (val / containerWidth) * 100;
    },
    [handleContainerWidth, handleBulletPosition]
  );

  const onMouseMove = useCallback(
    (event) => {
      const bulletPosX = calcBulletPosition(calculatePercentage(event));
      setPosx(bulletPosX);

      onDrag && onDrag(calculatePercentage(event), event);
    },
    [calcBulletPosition, onDrag, calculatePercentage]
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

  const onTouchEnd = useCallback(
    (event) => {
      setDragging(false);

      if (onDragStop) {
        onDragStop(calculatePercentage(event), event);
      }
    },
    [onDragStop, calculatePercentage]
  );

  const handleMouseDown = useCallback(() => {
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mouseup', onMouseUp, false);
    setDragging(true);
  }, [onMouseMove, onMouseUp]);

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
    setPosx(calcBulletPosition(defaultValue));
  }, [defaultValue, calcBulletPosition]);

  return (
    <div
      ref={ref}
      className="progress-container"
      data-dragging={dragging}
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
        onTouchMove={onMouseMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="inner" />
      </div>
    </div>
  );
}

export default ProgressBar;
