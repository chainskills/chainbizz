import { useState, useEffect, useLayoutEffect } from 'react';

// From https://usehooks.com/useKeyPress/
export const useKeyPress = targetKey => {
  // Keep track on the pressed key
  const [keyPressed, setKeyPressed] = useState(false);

  // Is our key pressed?
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  // Is our key released?
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  // Event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
    // eslint-disable-next-line
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
};

export const useLockBodyScroll = () => {
  useLayoutEffect(() => {
    // Retrieve original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // Lock scrolling on mount
    document.body.style.overflow = 'hidden';

    // Unlock scrolling on unmount
    return () => (document.body.style.overflow = originalStyle);
  }, []); // runs only on mont and unmount
};
