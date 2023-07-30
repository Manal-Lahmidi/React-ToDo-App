import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';//The Provider component from react-redux is used to wrap the App component and provide access to the Redux store throughout the application. 
import App from './App';
import '@fontsource/poppins';//the Poppins font is being included in the project to ensure a consistent and uniform typography style across the entire application.
import '@fontsource/poppins/500.css';// @fontsource/poppins provides the Poppins font in different font weights (e.g., regular, 500, 600, 700) 
import '@fontsource/poppins/600.css';//as separate modules. This allows you to import only the specific font weights that you need for your 
import '@fontsource/poppins/700.css';//application to keep the file size smaller and load only the required fonts.
import './styles/GlobalStyles.css';
import { store } from './app/store';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode> {/* Strict mode performs additional checks and warnings during development to help you catch and address common mistakes that might otherwise go unnoticed. */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
