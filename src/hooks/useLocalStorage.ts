import { useState, useCallback } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T | null = null,
): [T | null, (value: T | null) => void] {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    const item = localStorage.getItem(key);
    if (!item) return initialValue;
    try {
      return JSON.parse(item) as T;
    } catch {
      return item as unknown as T;
    }
  });

  const setValue = useCallback(
    (value: T | null) => {
      setStoredValue(value);
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
    [key],
  );

  return [storedValue, setValue];
}
