import { useState } from 'react';
export default function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our  value
  // Pass initial state function to useState so logic is only executed once
  const [storeValue, setStoreValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      //Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storeValue) : value;
      //Save state
      setStoreValue(valueToStore);
      //Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // a more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storeValue, setValue] as const;
}
