import React from 'react';
// import ReactDOM from 'react-dom';
import { Toaster } from 'react-hot-toast';
import AppContent from './components/AppContent';
import AppHeader from './components/AppHeader';
import PageTitle from './components/PageTitle';
import styles from './styles/modules/app.module.scss';


function App() {
  return (
    <>
      <div className="container">
        <PageTitle>My ToDo List :</PageTitle>{/* The PageTitle component is used to display the title "TODO List" at the top of the app. */}
        <div className={styles.app__wrapper}>
          <AppHeader />{/* The AppHeader component contains a button to add tasks and a select dropdown to filter tasks based on their status (all, incomplete, or complete). */}
          <AppContent />{/* The AppContent component displays the list of tasks with animations for filtering and sorting. */}
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: '1.8rem',
          },
        }}
      />
    </>
  );
}
export default App;
