import React from 'react';
import styles from '../styles/modules/button.module.scss';
import { getClasses } from '../utils/getClasses';

const buttonTypes = {
  primary: 'primary',
  secondary: 'secondary',
};

function Button({ type, variant = 'primary', children, ...rest }) {
  return (
    <button
      // `type`: The type of button ('submit' or 'button'). It defaults to 'button'.
      // `children`: The content of the button, which can include text or other elements.
      // `...rest`: This collects any additional props passed to the component.
      type={type === 'submit' ? 'submit' : 'button'}
      /* The button's className is set using the getClasses function.
        It concatenates the 'styles.button' class (from the CSS module) 
        with a dynamic class based on the variant. For example,
        if the variant is 'primary', it adds the 'styles.button--primary' class.*/
      className={getClasses([
        styles.button,
        styles[`button--${buttonTypes[variant]}`],
      ])}
      {...rest}
    >
      {children}
    </button>
  );
}

function SelectButton({ children, id, ...rest }) {
  /* `children`: The content of the select dropdown,
    which includes the options for filtering todos based on their status.*/
  return (
    <select
      id={id}
      className={getClasses([styles.button, styles.button__select])}
      {...rest}
    >
      {children}
    </select>
  );
}

export { SelectButton };
export default Button;
