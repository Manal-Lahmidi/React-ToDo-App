// handles the header section of the Todo app and provides
//  options for adding tasks and filtering todos based on their status.

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button, { SelectButton } from './Button';
import styles from '../styles/modules/app.module.scss';
import TodoModal from './TodoModal';
import { updateFilterStatus } from '../slices/todoSlice';

function AppHeader() {
  /* `modalOpen`: It is a boolean state that tracks whether the modal for adding a new todo is open or closed.
    It is initialized with false, indicating that the modal is closed by default.*/
  const [modalOpen, setModalOpen] = useState(false);
  /* `filterStatus`: It is a string state that represents the current filter status for displaying todos 
  (e.g., 'all', 'incomplete', 'complete'). It is initialized with the value obtained from the Redux store using useSelector.*/
  const initialFilterStatus = useSelector((state) => state.todo.filterStatus);
  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
  /* useDispatch: The useDispatch hook is used to get the dispatch function from the Redux store, which allows us to dispatch actions to update the Redux store. */
  const dispatch = useDispatch();
  /*updateFilter: This is a function that handles the change in the filter dropdown. It updates the local filterStatus state when the user selects a different filter option.
  Additionally, it dispatches the updateFilterStatus action with the new value to update the Redux store.*/
  const updateFilter = (e) => {
    setFilterStatus(e.target.value);
    dispatch(updateFilterStatus(e.target.value));
  };

  return (
    <div className={styles.appHeader}>
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Add Task
      </Button>
      <SelectButton
        id="status"
        onChange={(e) => updateFilter(e)}
        value={filterStatus}
      >
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Completed</option>
      </SelectButton>
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
      {/* this component is responsible for rendering the modal for adding or editing todos.
       It takes the modalOpen and setModalOpen props to control its visibility.
       When the "Add Task" button is clicked, the modalOpen state is set to true, opening the modal for adding a new task. */}
    </div>
  );
}

export default AppHeader;
