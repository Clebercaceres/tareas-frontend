import React from 'react';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoProvider from './components/context/TodoContext';

const App = () => {
  const [currentTodo, setCurrentTodo] = React.useState(null);

  return (
    <TodoProvider>
      <Header />
      <h1>Página principal</h1>
      <TodoForm currentTodo={currentTodo} setCurrentTodo={setCurrentTodo} />
      <TodoList />
    </TodoProvider>
  );
};

export default App;
