import { ReactNode } from 'react';
import { FaTimes } from 'react-icons/fa';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

function RemoveButton(props: IProps) {
  const { children = '', ...nativeProps } = props;
  return (
    <button
      type="button"
      {...nativeProps}
      className={`btn btn-primary btn-outline ${nativeProps.className}`}
    >
      {children ? <span className="mr-2">{children}</span> : null}
      <FaTimes />
    </button>
  );
}

export default RemoveButton;
