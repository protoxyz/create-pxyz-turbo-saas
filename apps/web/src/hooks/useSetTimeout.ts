import { Dispatch, SetStateAction, useCallback, useState } from "react";

export function useSetTimeout<T>(
  set: Dispatch<SetStateAction<T>>,
  timeout: number = 500,
) {
  const [queryTimeout, setQueryTimeout] = useState<NodeJS.Timeout | null>(null);

  const setDelayed = useCallback(
    (value: T) => {
      if (queryTimeout) {
        clearTimeout(queryTimeout);
      }
      setQueryTimeout(
        setTimeout(() => {
          set(value);
        }, timeout),
      );
    },
    [queryTimeout, set, timeout],
  );

  return setDelayed;
}
