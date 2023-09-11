import { ReactNode } from 'react';
import { FaPlus } from 'react-icons/fa';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  outline?: boolean;
}

function AddButton(props: IProps) {
  const { children = '', outline = true, ...nativeProps } = props;
  return (
    <button
      {...nativeProps}
      type="button"
      className={`btn btn-primary border-2 ${outline && 'btn-outline'} flex ${
        nativeProps.className
      }`}
    >
      {children ? <span className="mr-2">{children}</span> : null}
      <FaPlus />
    </button>
  );
}

export default AddButton;
