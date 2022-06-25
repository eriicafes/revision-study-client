import { useEffect, useState } from "react";

/**
 * Cycle between an array of values with a given interval
 * @param items Items to cycle through
 * @param duration Duration between each cycle
 * @returns Tuple of current item and index
 */
export function useCycle<T>(
  items: readonly T[],
  duration: number
): [typeof items[number], number] {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((curr) => {
        const next = curr + 1;
        return next % items.length;
      });
    }, duration);

    return () => clearInterval(interval);
  }, [items, duration]);

  return [items[index], index];
}
