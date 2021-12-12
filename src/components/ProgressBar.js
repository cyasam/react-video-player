import { useState, useEffect, useRef, useCallback } from 'react';

import './ProgressBar.css';

function ProgressBar({ value, onDrag, onDragStop, onHover, onProgressDown }) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(null);
  const [posx, setPosx] = useState(null);

  const handleBulletPosition = useCallback((event) => {
    const mousePosition = event.clientX;
    const refClientRects = ref.current.getClientRects()[0];
    const refStartPosition = refClientRects.left;
    const refWidth = refClientRects.width;
    const refEndPosition = refStartPosition + refWidth;

    if (mousePosition < refStartPosition) {
      return {
        val: 0,
        containerWidth: refWidth,
      };
    } else if (mousePosition > refEndPosition) {
      return {
        val: refWidth,
        containerWidth: refWidth,
      };
    }

    return {
      val: mousePosition - refStartPosition,
      containerWidth: refWidth,
    };
  }, []);

  const onMouseMove = useCallback(
    (event) => {
      const { val, containerWidth } = handleBulletPosition(event);

      setPosx(val);
      onDrag && onDrag((val / containerWidth) * 100, event);
    },
    [onDrag, handleBulletPosition]
  );

  const onMouseUp = useCallback(
    (event) => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      setDragging(false);

      if (onDragStop) {
        const { val, containerWidth } = handleBulletPosition(event);
        onDragStop((val / containerWidth) * 100, event);
      }
    },
    [onMouseMove, onDragStop, handleBulletPosition]
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
        const { containerWidth } = handleBulletPosition(event);
        onDragStop((posx / containerWidth) * 100, event);
      }
    },
    [handleBulletPosition, onMouseMove, onDragStop, posx]
  );

  const onWrapperMouseMove = useCallback(
    (event) => {
      if (onHover) {
        const { val, containerWidth } = handleBulletPosition(event);

        onHover((val / containerWidth) * 100);
      }
    },
    [onHover, handleBulletPosition]
  );

  const onWrapperMouseDown = useCallback(
    (event) => {
      handleMouseDown(event);
      onMouseMove(event);

      if (onProgressDown) {
        const { val, containerWidth } = handleBulletPosition(event);
        onProgressDown((val / containerWidth) * 100, event);
      }
    },
    [handleMouseDown, onMouseMove, handleBulletPosition, onProgressDown]
  );

  useEffect(() => {
    const refClientRects = ref.current.getClientRects()[0];
    setPosx((value / 100) * refClientRects.width);
  }, [value]);

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
      />
    </div>
  );
}

export default ProgressBar;
