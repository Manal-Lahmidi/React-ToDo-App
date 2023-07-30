// reusable component that renders a page title as a styled paragraph element.
// It allows you to easily create consistent and styled page titles throughout 
// your application by using the PageTitle component and passing the desired title 
// content as its children prop. The styling for the component is defined in the title.module.scss file.

import React from 'react';
import styles from '../styles/modules/title.module.scss';

function PageTitle({ children, ...rest }) {
  return (
    <p className={styles.title} {...rest}>
      {children}
    </p>
  );
}

export default PageTitle;
