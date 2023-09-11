import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import FormControl from './FormControl';

interface IProps extends React.HTMLProps<HTMLTextAreaElement> {
  name: string;
  error?: FieldError;
  label?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, IProps>((props, ref) => {
  const { error, name, label, rows = 5, ...nativeProps } = props;
  return (
    <FormControl>
      {label ? (
        <label htmlFor={name} className="label">
          <span className="label-text">{label}</span>
        </label>
      ) : null}
      <textarea
        {...nativeProps}
        ref={ref}
        id={name}
        rows={rows}
        className="textarea textarea-bordered border-2 textarea-primary w-full"
      />
      {error ? <span>{error.message}</span> : ''}
    </FormControl>
  );
});

export default Textarea;
