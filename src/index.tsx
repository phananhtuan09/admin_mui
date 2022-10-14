import React from 'react';
import ReactDOM from 'react-dom';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import App from '@/App';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import ThemeProvider from '@/theme';
import { PersistGate } from 'redux-persist/integration/react';
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <HelmetProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </HelmetProvider>
    </ThemeProvider>
    ,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
