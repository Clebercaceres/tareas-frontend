import React from 'react';
import Header from './Header';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Historial from './pages/Historial';

const TaskManager = ({ mode, toggleMode, onLogout, currentTodo, setCurrentTodo }) => {
    return (
        <div>
            <Header mode={mode} toggleMode={toggleMode} onLogout={onLogout} />
            <h1>Gestión de tareas</h1>
            <Historial />
            <TodoForm currentTodo={currentTodo} setCurrentTodo={setCurrentTodo} />
            <TodoList setCurrentTodo={setCurrentTodo} />
        </div>
    );
};

export default TaskManager;
