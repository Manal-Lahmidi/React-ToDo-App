//control todo items (checking, updating, deleting and displaying)
import { format, isValid} from 'date-fns';// These functions are used for formatting dates and checking if a date is valid, respectively.
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';//This function is used to show toast notifications when certain events, such as successful todo deletion, occur.
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';//imports the delete and edit icons from the react-icons library. These icons will be used in the UI.
import { useDispatch } from 'react-redux';//used to dispatch actions to update the store.
import { deleteTodo, updateTodo } from '../slices/todoSlice';//imports the deleteTodo and updateTodo actions from the todoSlice. These actions will be dispatched to update the Redux store when the user deletes or updates a todo item.
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import CheckButton from './CheckButton';
import TodoModal from './TodoModal';

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);//The initial state of checked is set to false. This state variable will be used to track whether the todo item is checked (completed) or not.
  const [updateModalOpen, setUpdateModalOpen] = useState(false);// This state variable will be used to manage the visibility of the update modal for the todo item.

  useEffect(() => {//useEffect hook is used to update the checked state whenever the todo.status prop changes. 
    if (todo.status === 'complete') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const handleCheck = () => {
    //This function is called when the user clicks on the checkbox to toggle
    // the status of the todo item between 'complete' and 'incomplete'.
    //It updates the checked state and dispatches an action to update the todo's status in the Redux store.
    setChecked(!checked);
    dispatch(
      updateTodo({ ...todo, status: checked ? 'incomplete' : 'complete' })
    );
  };

  const handleDelete = () => {
    //It dispatches a deleteTodo action to remove the todo from the Redux store and shows a success toast notification using react-hot-toast.
    dispatch(deleteTodo(todo.id));
    toast.success('Task Deleted Successfully');
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  // Check if todo.time is a valid date
  const isTodoTimeValid = isValid(new Date(todo.time));

  // Format the time only if it's a valid date, otherwise show "Invalid Date"
  const formattedTime = isTodoTimeValid? format(new Date(todo.time), 'dd/MM/yyyy p'): 'Invalid Date';

  console.log(todo.time);

  return (
    <>
      <motion.div className={styles.item} variants={child}> {/* The animation for this motion.div will control how the todo item appears on the screen.*/}
        <div className={styles.todoDetails}>{/* It contains the details of the todo item, including the checkbox, todo text, and time.*/}
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todoText,
                todo.status === 'complete' && styles['todoText--completed'],
              ])}
            >
              {todo.title}
            </p>
            <p className={styles.time}>
              {todo.time ? formattedTime : 'Invalid Date'}
            </p>

          </div>
        </div>
        <div className={styles.todoActions}>
          <div
          /* It has an onClick event handler that calls the handleDelete function when clicked.This function dispatches an action to delete the todo item from the Redux store. */
            className={styles.icon}
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <MdDelete />{/* represents the delete icon */}
          </div>
          <div
            className={styles.icon}
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}//(e.g., when the user presses the "Enter" key while the icon is focused). In this case, pressing the "Enter" key will also call the handleUpdate function.
            tabIndex={0}//This attribute makes the div focusable. It gives the div an order in the keyboard focus navigation. When users navigate through elements using the "Tab" key, this element will be included in the focus order.
            role="button"//The value "button" indicates that the div behaves like a button element. 
          >
            <MdEdit />{/* represents the update icon */}
          </div>
        </div>
      </motion.div>
      <TodoModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        todo={todo}
      />
    </>
  );
}

export default TodoItem;
