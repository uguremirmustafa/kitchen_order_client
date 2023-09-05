import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  className?: string;
}

function FormControl(props: IProps) {
  const { children, className } = props;
  return <div className={`form-control w-full ${className ?? ''}`}>{children}</div>;
}

export default FormControl;
