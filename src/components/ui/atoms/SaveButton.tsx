import React from 'react';
import { FaSave, FaSpinner } from 'react-icons/fa';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

function SaveButton(props: IProps) {
  const { children = 'Save', type = 'submit', loading, ...nativeProps } = props;
  return (
    <button
      {...nativeProps}
      disabled={loading || nativeProps.disabled}
      className={`btn btn-primary mt-2 ${nativeProps.className}`}
      type={type}
    >
      <span className="mr-2">{children}</span>
      {loading ? (
        <span className="animate-spin">
          <FaSpinner />
        </span>
      ) : (
        <FaSave />
      )}
    </button>
  );
}

export default SaveButton;
