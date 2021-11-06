import './_button.scss';

import React from 'react';
import { Button as HipoButton } from '@hipo/react-ui-toolkit';
import { ButtonProps as HipoButtonProps } from '@hipo/react-ui-toolkit';
import classNames from 'classnames';

export type ButtonProps = HipoButtonProps & {
  size?: 'regular' | 'medium' | 'large';
  typography?: string;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  // eslint-disable-next-line prefer-arrow-callback
  function (props, ref) {
    const {
      size = 'regular',
      typography = 'body-semibold',
      customClassName,
      children,
      ...otherProps
    } = props;

    return (
      <HipoButton
        ref={ref}
        customClassName={classNames(
          customClassName,
          'button--primary',
          `button--${size}`,
          `typography--${typography}`
        )}
        {...otherProps}
      >
        {children}
      </HipoButton>
    );
  }
);

export default Button;
