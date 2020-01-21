import { useRef, useEffect } from 'react';


/**
 * A useEffect hook for usage on top of requestAnimationFrame.
 * Accepts a callback function and a minimum interval at which to call it.
 * NOTE: Callback is not guaranteed to be called at exactly the interval
 * specified, only at AT LEAST that interval.
 *
 * @param {function:(number)} callback - Arg is the time delta from the last call.
 * @param {number|undefined} interval - If undefined, callback fired at every frame.
 * @param {*} dependencies - Dependencies for useEffect
 * @return {void}
 */
export const useRequestAnimationFrame = (callback, interval, dependencies) => {
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = (time) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      if (!interval || deltaTime > interval) {
        previousTimeRef.current = time;
        callback(deltaTime);
      }
    } else {
      previousTimeRef.current = time;
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, dependencies);
};
