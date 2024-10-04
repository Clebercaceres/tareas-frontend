import React from 'react';
import { TodoContext } from './context/TodoContext';
import { TextField, Button, Grid } from '@mui/material';
import { notification } from 'antd';

const TodoForm = ({ currentTodo, setCurrentTodo }) => {
    const { addTodo, editTodo } = React.useContext(TodoContext);
    const [todo, setTodo] = React.useState({
        title: '',
        description: '',
        category: '',
        priority: '',
        deadline: ''
    });

    const openSuccessNotification = (message) => {
        notification.success({
            message: 'Operación Exitosa',
            description: message,
            placement: 'topRight',
            duration: 3,
        });
    };

    const openErrorNotification = (message) => {
        notification.error({
            message: 'Error',
            description: message,
            placement: 'topRight',
            duration: 3,
        });
    };

    React.useEffect(() => {
        console.log('currentTodo actualizado:', currentTodo);  // Para depurar
        if (currentTodo) {
            setTodo({
                title: currentTodo.title,
                description: currentTodo.description,
                category: currentTodo.category,
                priority: currentTodo.priority,
                deadline: currentTodo.deadline.split('T')[0]
            });
        } else {
            setTodo({ title: '', description: '', category: '', priority: '', deadline: '' });
        }
    }, [currentTodo]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!todo.title || !todo.description || !todo.category || !todo.priority || !todo.deadline) {
            openErrorNotification('Por favor, completa todos los campos');
            return;
        }

        console.log('currentTodo:', currentTodo);  // Verifica el currentTodo

        try {
            if (currentTodo) {
                await editTodo(currentTodo._id, todo);
                openSuccessNotification('La tarea ha sido editada con éxito');
            } else {
                await addTodo(todo);
                openSuccessNotification('La nueva tarea ha sido añadida con éxito');
            }

            setCurrentTodo(null);
            setTodo({ title: '', description: '', category: '', priority: '', deadline: '' });
        } catch (error) {
            openErrorNotification('Hubo un error al guardar la tarea. Intenta nuevamente.');
            console.error('Error al guardar la tarea:', error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        type="text"
                        value={todo.title}
                        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
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
