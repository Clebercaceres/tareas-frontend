
import React from 'react';

export const TodoContext = React.createContext();

const TodoProvider = ({ children }) => {
  const [userData, setUserData] = React.useState(null);
  const [todos, setTodos] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const todosPerPage = 10;

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const editTodo = (id, updatedText) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: updatedText } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const paginatedTodos = () => {
    const startIndex = (currentPage - 1) * todosPerPage;
    return todos.slice(startIndex, startIndex + todosPerPage);
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
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const logout = () => {
    setUserData(null);
    localStorage.removeItem('userData');
  };

  return (
    <TodoContext.Provider
      value={{
        userData,
        setUserData,
        todos: paginatedTodos(),
        addTodo,
        editTodo,
        deleteTodo,
        currentPage,
        nextPage,
        prevPage,
        reorderTodos,
        totalTodos: todos.length,
        logout
      }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;