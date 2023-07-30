// It contains a custom check button component that utilizes Framer Motion to create smooth 
// animations for the checkmark and background color based on the checked/unchecked state.

import { motion, useMotionValue, useTransform } from 'framer-motion';
import React from 'react';
import styles from '../styles/modules/todoItem.module.scss';

const checkVariants = {
  // initial: This variant represents the initial state of the check button.
  // In this case, it sets the color property of the checkmark path to '#fff' (white).

  /* checked: This variant represents the checked state of the check button.
   It sets the pathLength property of the checkmark path to 1.
   The pathLength property is a value between 0 and 1,
   and animating it from 0 to 1 makes the checkmark path gradually appear,
   creating an animation of the checkmark drawing.*/

  /* unchecked: This variant represents the unchecked state of the check button.
    It sets the pathLength property of the checkmark path to 0, making the checkmark path disappear.
    This creates an animation of the checkmark path disappearing when the check button is unchecked.*/
  initial: {
    color: '#fff',
  },
  checked: { pathLength: 1 },
  unchecked: { pathLength: 0 },
};

const boxVariants = {
  /* checked: This variant represents the checked state of the check button.
    It sets the background property of the check button's background to var(--primaryPurple).
    This changes the background color to a primary purple color when the check button is checked.
    The transition property is set to { duration: 0.1 }, which means the color change will occur 
    smoothly over a duration of 0.1 seconds.*/

  /* unchecked: This variant represents the unchecked state of the check button.
    It sets the background property of the check button's background to var(--gray-2), 
    making the background color a light gray when the check button is unchecked.
    The transition property is set to { duration: 0.1 }, ensuring a smooth color transition.*/
  checked: {
    background: 'var(--primaryPurple)',
    transition: { duration: 0.1 },
  },
  unchecked: { background: 'var(--gray-2)', transition: { duration: 0.1 } },
};

function CheckButton({ checked, handleCheck }) {
// These are Framer Motion hooks: useMotionValue and useTransform.
/*pathLength is initialized with a value of 0 using useMotionValue(0).
  It will be used to control the length of the checkmark path in the SVG.*/
/*opacity is created using useTransform, and it takes the pathLength as input.
  It will map the values of pathLength from the range [0.05, 0.15] to the range [0, 1] for opacity.
  This means that when pathLength is between 0.05 and 0.15, the opacity value will be between 0 and 1.*/
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  return (
    <motion.div
      animate={checked ? 'checked' : 'unchecked'}
      className={styles.svgBox}
      variants={boxVariants}
      onClick={() => handleCheck()}
    >
      <motion.svg
        className={styles.svg}
        viewBox="0 0 53 38" //It takes four values: x, y, width, and height
        fill="none"//the checkmark path should not be filled with any color.
        xmlns="http://www.w3.org/2000/svg"//The xmlns attribute ensures that the SVG file is interpreted correctly as an SVG document.
      >
        <motion.path
          variants={checkVariants}
          animate={checked ? 'checked' : 'unchecked'}
          style={{ pathLength, opacity }}
          fill="none"
          strokeMiterlimit="10"
          strokeWidth="6"
          d="M1.5 22L16 36.5L51.5 1"//In this case, the path data consists of three commands: M (move to), L (line to), and Z (close path). It draws a checkmark shape with three lines.
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </motion.svg>
    </motion.div>
  );
}

export default CheckButton;
