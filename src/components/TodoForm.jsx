import React, { useContext, useEffect, useState } from 'react';
import { TodoContext } from './context/TodoContext';
import { TextField, Button, Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const TodoForm = ({ currentTodo, setCurrentTodo }) => {
    const { addTodo, editTodo } = useContext(TodoContext);
    const [todo, setTodo] = useState({
        text: '',
        description: '',
        category: '',
        priority: '',
        deadline: ''
    });

    useEffect(() => {
        if (currentTodo) {
            setTodo({
                text: currentTodo.text,
                description: currentTodo.description,
                category: currentTodo.category,
                priority: currentTodo.priority,
                deadline: currentTodo.deadline
            });
        } else {
            setTodo({ text: '', description: '', category: '', priority: '', deadline: '' });
        }
    }, [currentTodo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentTodo) {
            editTodo(currentTodo.id, todo);
        } else {
            const newTodo = { id: uuidv4(), ...todo };
            addTodo(newTodo);
        }
        setCurrentTodo(null);
        setTodo({ text: '', description: '', category: '', priority: '', deadline: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        type="text"
                        value={todo.text}
                        onChange={(e) => setTodo({ ...todo, text: e.target.value })}
                        label="Título de la tarea"
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        type="text"
                        multiline
                        rows={1}
                        value={todo.description}
                        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
                        label="Descripción"
                        required
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        type="text"
                        value={todo.category}
                        onChange={(e) => setTodo({ ...todo, category: e.target.value })}
                        label="Categoría"
                        required
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        type="text"
                        value={todo.priority}
                        onChange={(e) => setTodo({ ...todo, priority: e.target.value })}
                        label="Prioridad"
                        required
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        type="date"
                        value={todo.deadline}
                        onChange={(e) => setTodo({ ...todo, deadline: e.target.value })}
                        label="Fecha límite"
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        {currentTodo ? 'Actualizar' : 'Agregar'}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default TodoForm;