'use client';

import { useRef, useState } from 'react';

type CheckboxOption = {
  value: any;
  label: React.ReactNode;
};

export interface CheckboxGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  name: string;
  options: Array<CheckboxOption>;
  onChange?: (values: Array<any>) => void;
  CheckboxComponent: React.FC<any>;
}

const CheckboxGroup = ({
  name,
  onChange,
  options,
  CheckboxComponent,
  ...rest
}: CheckboxGroupProps) => {
  const valuesRef = useRef<Array<string>>([]);

  const handleCheckboxChange = (e: any) => {
    if (e.target.checked) {
      valuesRef.current.push(e.target.value);
    } else {
      const idx = valuesRef.current.findIndex((i) => i === e.target.value);
      if (idx > -1) {
        valuesRef.current.splice(idx, 1);
      }
    }

    onChange?.(valuesRef.current);
  };

  return (
    <div {...rest}>
      {options.map((item) => (
        <CheckboxComponent
          key={item.value}
          name={name}
          label={item.label}
          value={item.value}
          onChange={handleCheckboxChange}
        />
      ))}
    </div>
  );
};

export default CheckboxGroup;
