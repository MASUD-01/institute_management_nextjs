import { useEffect, useRef } from "react";
import { debounce, DebouncedFunc } from "lodash";

function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): DebouncedFunc<T> {
  const callbackRef = useRef<T>(callback);
  const debouncedRef = useRef<DebouncedFunc<T>>(null);

  // Always keep the latest callback
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Create the debounced function only once
  if (!debouncedRef.current) {
    debouncedRef.current = debounce(
      ((...args: any[]) => {
        callbackRef.current(...args);
      }) as T,
      delay
    );
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedRef.current?.cancel();
    };
  }, []);

  return debouncedRef.current;
}

export default useDebouncedCallback;
