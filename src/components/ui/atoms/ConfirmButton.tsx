import React from 'react';
import { FaCheck, FaSpinner } from 'react-icons/fa';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

function ConfirmButton(props: IProps) {
  const { children = 'Confirm', type = 'button', loading, ...nativeProps } = props;
  return (
    <button
      {...nativeProps}
      disabled={loading || nativeProps.disabled}
      className={`btn btn-primary ${nativeProps.className}`}
      type={type}
    >
      <span className="mr-2">{children}</span>
      {loading ? (
        <span className="animate-spin">
          <FaSpinner />
        </span>
      ) : (
        <FaCheck />
      )}
    </button>
  );
}

export default ConfirmButton;
