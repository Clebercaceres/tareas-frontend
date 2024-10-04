import React from 'react';
import TaskManager from './components/TaskManager';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { getAllUsers } from './components/context/services/AuthService';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import { TodoContext } from './components/context/TodoContext';

const App = () => {
  const [mode, setMode] = React.useState('light');
  const [currentTodo, setCurrentTodo] = React.useState(null);
  const { user, setUser } = React.useContext(TodoContext);
  const navigate = useNavigate();
  const [isFirstLoad, setIsFirstLoad] = React.useState(true);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = () => {
    console.log('Cerrando sesión');
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        console.log('Usuarios obtenidos:', users);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    if (isFirstLoad) {
      fetchUsers();
      setIsFirstLoad(false);
    }
  }, [isFirstLoad]);



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={
          <TaskManager
            mode={mode}
            toggleMode={toggleMode}
            onLogout={handleLogout}
            currentTodo={currentTodo}
            setCurrentTodo={setCurrentTodo}
          />
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
