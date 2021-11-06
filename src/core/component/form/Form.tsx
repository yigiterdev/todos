import React, { FormEvent } from 'react';
import classNames from 'classnames';

interface FormProps {
  children: React.ReactNode;
  onSubmit?: VoidFunction;
  isDisabled?: boolean;
  customClassName?: string;
}

function Form({ children, customClassName, isDisabled, onSubmit }: FormProps) {
  return (
    <form
      className={classNames('form', customClassName)}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (onSubmit && !isDisabled) {
      onSubmit();
    }
  }
}

export default Form;
