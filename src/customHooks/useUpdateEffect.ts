import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export default function useUpdateEffect(
  callback: EffectCallback,
  dependencies?: DependencyList
) {
  const firstRenderRef = useRef<boolean>(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    return callback();
  }, dependencies);
}
