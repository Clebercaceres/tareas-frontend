import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import TodoProvider from './components/context/TodoContext';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <TodoProvider>
      <Router>
        <App />
      </Router>
    </TodoProvider>
  </React.StrictMode>
);
