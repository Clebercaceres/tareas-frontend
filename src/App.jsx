import React from 'react';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoProvider from './components/context/TodoContext';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const App = () => {
  const [mode, setMode] = React.useState('light');
  const [currentTodo, setCurrentTodo] = React.useState(null);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = () => {
    console.log('Cerrando sesión');
  };

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TodoProvider>
        <Header mode={mode} toggleMode={toggleMode} onLogout={handleLogout} />
        <h1>Gestión de tareas</h1>
        <TodoForm currentTodo={currentTodo} setCurrentTodo={setCurrentTodo} />
        <TodoList setCurrentTodo={setCurrentTodo} />
      </TodoProvider>
    </ThemeProvider>
  );
};

export default App;