import React, { ReactNode } from 'react';

interface IProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

function Form(props: IProps) {
  const { children, ...nativeProps } = props;
  return (
    <form {...nativeProps} className={`flex flex-col gap-2 ${nativeProps.className}`}>
      {children}
    </form>
  );
}

export default Form;
