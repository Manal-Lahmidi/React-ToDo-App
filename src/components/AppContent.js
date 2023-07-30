// this component is responsible for rendering the list of todos with animation using the framer-motion library.
//The animation is based on the container and child variants defined at the beginning of the file.
// It also handles filtering the todos based on the filterStatus provided by the Redux store.

import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';//A hook that allows to extract data from the Redux store state.
import styles from '../styles/modules/app.module.scss';
import TodoItem from './TodoItem';

//Animation Variants:
///control the div element 
const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,// when the children of the <div> are animated, there will be a delay of 0.2 seconds between each child.
    },
  },
};
///control the items 
const child = {
  hidden: { y: 20/*the child element is moved 20 pixels down from its original position */, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function AppContent() {
  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });

  return (
    //apply animations
    <motion.div
      className={styles.content__wrapper}
      variants={container} //defines the animation variants for the motion.div
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {filteredTodoList && filteredTodoList.length > 0 ? (
          filteredTodoList.map((todo) => (
            // <motion.div key={todo.id} variants={child}>
            <TodoItem key={todo.id} todo={todo} />
            // </motion.div>
          ))
        ) : (
          <motion.p variants={child} className={styles.emptyText}>
            No ToDos
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;
