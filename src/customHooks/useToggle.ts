import { useState } from 'react';

export default function useToggle(defaultValue: boolean): [boolean, Function] {
  const [value, setValue] = useState<boolean>(defaultValue);

  function toggleValue(value: any) {
    setValue((currentValue: boolean) =>
      typeof value === 'boolean' ? value : !currentValue
    );
  }
  return [value, toggleValue];
}
