import { useCallback, useEffect, useState } from 'react';
import { loadFromSessionStorage, SessionStorageKey } from '../sessionStorage';

export const useSessionStorageValue = <TValue extends string = string>(
  key: SessionStorageKey,
) => {
  const [value, setInternalValue] = useState<TValue | null>(
    loadFromSessionStorage(key) as TValue | null,
  );

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setInternalValue(event.newValue as TValue | null);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  const setValue = useCallback(
    (newValue: TValue | null) => {
      try {
        if (newValue === null) {
          sessionStorage.removeItem(key);
          setInternalValue(null);
          return;
        }

        sessionStorage.setItem(key, newValue);
        setInternalValue(newValue);
      } catch (error) {
        console.error('Error saving to session storage:', error);
      }
    },
    [key],
  );

  return { value, setValue };
};
