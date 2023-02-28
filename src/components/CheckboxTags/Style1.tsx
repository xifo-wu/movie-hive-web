'use client';

import CheckboxGroup from '@/lib/components/CheckboxGroup';
import { forwardRef } from 'react';
import styles from './Style1.module.css';

export interface Props {
  name: string;
  options: Array<{ value: any; label: React.ReactNode }>;
  onChange?: (values: Array<any>) => void;
}

const Checkbox = ({ name, value, label, ...rest }: any) => {
  return (
    <div>
      <input
        className={`${styles.checkbox} hidden`}
        id={value}
        type="checkbox"
        value={value}
        {...rest}
      />
      <label
        className={`${styles.checkboxLabel} select-none block py-1 px-3 bg-slate-700 hover:bg-slate-900 transform transition-all duration-300 text-base rounded cursor-pointer`}
        htmlFor={value}
      >
        {label}
      </label>
    </div>
  );
};

const CheckboxTagStyle1 = forwardRef(({ name, options, onChange }: Props, ref) => {
  const handleSelectOptionsChange = (values: any) => {
    onChange?.(values);
  };

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <CheckboxGroup
        className="flex flex-wrap gap-4 items-center"
        name={name}
        onChange={handleSelectOptionsChange}
        options={options}
        CheckboxComponent={Checkbox}
      />
    </div>
  );
});

export default CheckboxTagStyle1;
