
import React from 'react';

export const TodoContext = React.createContext();

const TodoProvider = ({ children }) => {
  const [userData, setUserData] = React.useState(null);
  const [todos, setTodos] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const todosPerPage = 10;

  // Agregar nueva tarea
  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  // Editar tarea existente (actualizando todos los campos del todo)
  const editTodo = (id, updatedTodo) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    );
    setTodos(updatedTodos);
  };

  // Eliminar tarea por id
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // // Add new task
  // const addTodo = async (newTodo) => {
  //   try {
  //     const response = await createTask(newTodo);
  //     setTodos([...todos, response.data]);
  //   } catch (error) {
  //     console.error('Error creating task:', error);
  //   }
  // };

  // const createTask = async (newTask) => {
  //   const response = await api.createTask(newTask);
  //   if (response.message === "Tarea creada") {
  //     setTodos(prevTodos => [...prevTodos, response.task]); // Update the list
  //   }
  // };

  // // Edit task
  // const editTodo = async (id, updatedTodo) => {
  //   try {
  //     const response = await editTask(id, updatedTodo);
  //     setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
  //   } catch (error) {
  //     console.error('Error editing task:', error);
  //   }
  // };

  // // Delete task
  // const deleteTodo = async (id) => {
  //   try {
  //     await deleteTask(id);
  //     setTodos(todos.filter((todo) => todo.id !== id));
  //   } catch (error) {
  //     console.error('Error deleting task:', error);
  //   }
  // };


  // Obtener las tareas paginadas
  const paginatedTodos = () => {
    const startIndex = (currentPage - 1) * todosPerPage;
    return todos.slice(startIndex, startIndex + todosPerPage);
  };

  // Navegar a la siguiente página
  const nextPage = () => {
    if (currentPage * todosPerPage < todos.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Navegar a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Reordenar tareas (para drag-and-drop)
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

  // Cargar datos de usuario desde localStorage
  React.useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
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
        paginatedTodos: paginatedTodos(),
        addTodo,
        editTodo,
        deleteTodo,
        currentPage,
        nextPage,
        prevPage,
        reorderTodos,
        totalTodos: todos.length,
        logout
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;