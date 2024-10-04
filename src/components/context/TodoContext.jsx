import React from 'react';
import axios from 'axios';

export const TodoContext = React.createContext();

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const todosPerPage = 10;
  const [paginatedTodos, setPaginatedTodos] = React.useState([]);

  const storedUserData = localStorage.getItem('userData');
  const initialUserData = storedUserData ? JSON.parse(storedUserData) : null;
  const [userData, setUserData] = React.useState(initialUserData);

  // Función para obtener el token de userData o localStorage
  const getToken = () => {
    const currentUserData = userData || JSON.parse(localStorage.getItem('userData'));
    return currentUserData?.token;
  };

  // Cargar tareas desde el backend
  const loadTodos = async () => {
    const token = getToken();
    if (!token) {
      console.error("El token no está disponible.");
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/auth/usuarioLogeado', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Datos del usuario y tareas:', response.data);
      setUserData(response.data);
      setTodos(response.data.tasks || []);
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
    }
  };

  const addTodo = async (newTodo) => {
    const token = getToken();
    if (!token) {
      console.error("El token no está disponible.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/tasks', newTodo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos([...todos, response.data.task]);
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
    }
  };

  // Editar tarea con el token persistente
  const editTodo = async (_id, updatedTodo) => {
    const token = getToken();
    if (!token) {
      console.error("El token no está disponible.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/auth/tasks/${_id}`, updatedTodo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedTodos = todos.map(todo =>
        todo._id === _id ? { ...todo, ...response.data.task } : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error al editar la tarea:', error);
    }
  };

  const deleteTodo = async (_id) => {
    const token = getToken();
    if (!token) {
      console.error("El token no está disponible.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/auth/tasks/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(todos.filter(todo => todo._id !== _id));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const nextPage = () => {
    if (currentPage * todosPerPage < todos.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const reorderTodos = (fromId, toId) => {
    const fromIndex = todos.findIndex(todo => todo.id === fromId);
    const toIndex = todos.findIndex(todo => todo.id === toId);

    if (fromIndex !== -1 && toIndex !== -1) {
      const updatedTodos = Array.from(todos);
      const [movedTodo] = updatedTodos.splice(fromIndex, 1);
      updatedTodos.splice(toIndex, 0, movedTodo);
      setTodos(updatedTodos);
    }
  };

  React.useEffect(() => {
    const startIndex = (currentPage - 1) * todosPerPage;
    setPaginatedTodos(todos?.slice(startIndex, startIndex + todosPerPage));
  }, [todos, currentPage]);

  React.useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
      if (parsedUserData?.token) {
        loadTodos();
      }
    }
  }, []);

  // Cerrar sesión
  const logout = () => {
    setUserData(null);
    localStorage.removeItem('userData');
  };

  return (
    <TodoContext.Provider
      value={{
        userData,
        setUserData,
        todos,
        paginatedTodos,
        addTodo,
        editTodo,
        deleteTodo,
        currentPage,
        nextPage,
        prevPage,
        reorderTodos,
        totalTodos: todos?.length,
        logout,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
