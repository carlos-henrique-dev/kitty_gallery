import React from 'react';
import ReactDOM from 'react-dom';
import { ContextProvider } from './context/ContextProvider';
import App from './pages/index';

import './styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
