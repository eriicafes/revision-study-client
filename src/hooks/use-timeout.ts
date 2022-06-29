import { useEffect, useRef } from "react";

export function useTimeout(
  callback: () => void,
  duration: number,
  enabled = true
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    // update callback here to avoid resetting the timer when callback changes
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // bail out if not enabled
    if (!enabled) return;

    // get current callback from ref
    const tick = () => callbackRef.current();

    // apply callback and clear on unmount
    const timeoutId = setTimeout(tick, duration);
    return () => clearTimeout(timeoutId);
  }, [duration, enabled]);
}
