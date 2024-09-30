import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import TodoProvider from './components/context/TodoContext';
import Login from './components/pages/Login';
import Register from './components/pages/Register';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <TodoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </TodoProvider>
  </React.StrictMode>
);