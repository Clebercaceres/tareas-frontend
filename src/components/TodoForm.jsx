import React from 'react';
import { TodoContext } from './context/TodoContext';
import { TextField, Button, Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { notification } from 'antd'; // Importamos la notificación de Ant Design

const TodoForm = ({ currentTodo, setCurrentTodo }) => {
    const { addTodo, editTodo } = React.useContext(TodoContext);
    const [todo, setTodo] = React.useState({
        text: '',
        description: '',
        category: '',
        priority: '',
        deadline: ''
    });

    // Notificación de éxito
    const openSuccessNotification = (message) => {
        notification.success({
            message: 'Operación Exitosa',
            description: message,
            placement: 'topRight',
            duration: 3, // Duración de la notificación en segundos
        });
    };

    // Notificación de error
    const openErrorNotification = (message) => {
        notification.error({
            message: 'Error',
            description: message,
            placement: 'topRight',
            duration: 3,
        });
    };

    // Efecto para cargar el "todo" actual en el formulario
    React.useEffect(() => {
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

        // Validar campos vacíos
        if (!todo.text || !todo.description || !todo.category || !todo.priority || !todo.deadline) {
            openErrorNotification('Por favor, completa todos los campos');
            return;
        }

        try {
            if (currentTodo) {
                // Editar tarea
                editTodo(currentTodo.id, todo);
                openSuccessNotification('La tarea ha sido editada con éxito'); // Mostrar notificación de éxito
            } else {
                // Agregar nueva tarea
                const newTodo = { id: uuidv4(), ...todo };
                addTodo(newTodo);
                openSuccessNotification('La nueva tarea ha sido añadida con éxito');
            }

            // Limpiar el formulario después de agregar o editar
            setCurrentTodo(null);
            setTodo({ text: '', description: '', category: '', priority: '', deadline: '' });

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