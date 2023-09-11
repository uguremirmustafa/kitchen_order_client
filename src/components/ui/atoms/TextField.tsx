import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import FormControl from './FormControl';

interface IProps extends React.HTMLProps<HTMLInputElement> {
  error?: FieldError;
  label?: string;
}

const TextField = forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const { error, name, label, className, value, onChange, type, ...nativeInputElementProps } =
    props;
  return (
    <FormControl className={className}>
      {label ? (
        <label htmlFor={name} className="label">
          <span className="label-text">{label}</span>
        </label>
      ) : null}
      <input
        {...nativeInputElementProps}
        onChange={(e) => {
          if (onChange) {
            if (type === 'number') {
              onChange(e);
            } else {
              onChange(e);
            }
          }
        }}
        type={type}
        value={value}
        ref={ref}
        id={name}
        className="input input-bordered border-2 input-primary w-full"
      />
      {error ? <span>{error.message}</span> : ''}
    </FormControl>
  );
});

export default TextField;
