import React, { useContext, useState } from 'react';
import { TodoContext } from './context/TodoContext';
import { Modal, Button, TextField, Box, Typography } from '@mui/material';

const EditTodoModal = ({ currentTodo, setCurrentTodo, open, onClose }) => {
    const { editTodo } = useContext(TodoContext);
    const [todoText, setTodoText] = useState("");

    React.useEffect(() => {
        if (currentTodo) {
            setTodoText(currentTodo.text);
        }
    }, [currentTodo]);

    const handleSave = () => {
        editTodo(currentTodo.id, todoText);
        setCurrentTodo(null);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    outline: 'none',
                }}
            >
                <Typography variant="h6" component="h2" gutterBottom>
                    Editar Tarea
                </Typography>
                <TextField
                    fullWidth
                    value={todoText}
                    onChange={(e) => setTodoText(e.target.value)}
                    placeholder="Edita tu tarea"
                    variant="outlined"
                    margin="normal"
                />
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button onClick={onClose} color="secondary" sx={{ mr: 1 }}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSave} variant="contained" color="primary">
                        Guardar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditTodoModal;