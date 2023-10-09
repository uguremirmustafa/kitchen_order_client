import Select, { Props as RsProps } from 'react-select';
import FormControl from './FormControl';
import { forwardRef } from 'react';

interface SelectFieldProps extends RsProps {
  label?: string;
}

export interface SelectOption<T = unknown> {
  label: string;
  value: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SelectField = forwardRef<any, SelectFieldProps>((props, ref) => {
  const { label, name, className, ...nativeProps } = props;
  return (
    <FormControl className={className}>
      {label ? (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      ) : null}
      <Select
        {...nativeProps}
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        ref={ref}
        name={name}
        classNamePrefix="rs"
        isClearable
      />
    </FormControl>
  );
});

export default SelectField;
