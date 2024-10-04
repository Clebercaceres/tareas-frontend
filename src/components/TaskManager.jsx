import React from 'react';
import Header from './Header';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const TaskManager = ({ mode, toggleMode, onLogout, currentTodo, setCurrentTodo }) => {
    return (
        <div>
            <Header mode={mode} toggleMode={toggleMode} onLogout={onLogout} />
            <h1>Gestión de tareas</h1>
            <TodoForm currentTodo={currentTodo} setCurrentTodo={setCurrentTodo} />
            <TodoList setCurrentTodo={setCurrentTodo} />
        </div>
    );
};

export default TaskManager;
