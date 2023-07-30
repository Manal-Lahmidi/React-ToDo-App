export const getClasses = (classes) =>
  classes
    .filter((item) => item !== '')//filters out any empty strings from the array (if present).
    .join(' ')//joins the remaining class names with a space separator, creating a single string (e.g., 'button primary').
    .trim();// trims any leading or trailing whitespace from the resulting string to ensure it is clean.

/* Example usage:

import React from 'react';
import { getClasses } from '../utils/getClasses';
import styles from '../styles/modules/button.module.scss';

function MyButton({ variant }) {
  // If variant is 'primary', the resulting classes will be 'button primary'
  // If variant is 'secondary', the resulting classes will be 'button secondary'
  const classes = getClasses([styles.button, variant === 'primary' && styles.primary]);

  return <button className={classes}>Click me</button>;
}

export default MyButton; */