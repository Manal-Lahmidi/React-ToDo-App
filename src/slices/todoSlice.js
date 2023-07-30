import { createSlice } from '@reduxjs/toolkit';

const getInitialTodo = () => {
  // getting todo list
  const localTodoList = window.localStorage.getItem('todoList');
  // if todo list is not empty
  if (localTodoList) {
    return JSON.parse(localTodoList);
  }
  window.localStorage.setItem('todoList', []);
  return [];
};

const initialValue = {
  filterStatus: 'all',
  todoList: getInitialTodo(),
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initialValue,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);//adds the new todo item, received as action.payload, to the todoList array in the current state. The payload is the data that was dispatched along with the action.
      const todoList = window.localStorage.getItem('todoList');//retrieves the current todo list from the browser's local storage. The todo list is stored as a stringified JSON array in the local storage.
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({
          ...action.payload,
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
      } else {
        window.localStorage.setItem(
          'todoList',
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        );
      }
    },
  /* When the addTodo reducer function is called, it checks whether there is an existing todo list stored in the browser's local storage.
  The local storage is a mechanism in web browsers that allows web applications to store data locally on the user's device.
   Here's how the logic works:*/
  /* 1.If there is an existing todo list in the local storage, it means the user has previously added some todo items. In this case:
  // The function retrieves the existing todo list from the local storage using window.localStorage.getItem('todoList').
  // It then parses the stringified JSON array to convert it back into a JavaScript array using JSON.parse(todoList).
  // Next, the new todo item (action.payload) is added to this existing array using todoListArr.push({ ...action.payload }).
  // Finally, the updated todo list (todoListArr) is converted back to a string using JSON.stringify and stored back into the local storage with window.
    localStorage.setItem('todoList', JSON.stringify(todoListArr)).*/
  /* 2.If there is no existing todo list in the local storage, it means the user is adding the first todo item. In this case:
  // The function creates a new array containing the new todo item (action.payload) using [{ ...action.payload }].
  // This new array is then converted to a string using JSON.stringify and stored in the local storage with window.localStorage.setItem('todoList', JSON.stringify([{ ...action.payload }]));.*/
    updateTodo: (state, action) => {
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo) => {
          if (todo.id === action.payload.id) {
            todo.status = action.payload.status;
            todo.title = action.payload.title;
          }
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
        state.todoList = [...todoListArr];
      }
    },
    deleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, updateFilterStatus } =
  todoSlice.actions;
export default todoSlice.reducer;
