import React from 'react';
import { TodoContext } from './context/TodoContext';
import { Container, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Button, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ConfirmationModal from './ModalConfirm';
import { notification } from 'antd';

const SortableItem = ({ todo, deleteTodo, handleEdit }) => {
    const {
        attributes, listeners, setNodeRef, transform, transition, isDragging,
    } = useSortable({ id: todo?.id });

    return (
        <ListItem
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{
                opacity: isDragging ? 0.5 : 1,
                transition: transition || 'transform 250ms ease',
                transform: CSS.Transform?.toString(transform),
                backgroundColor: isDragging ? '#424242' : 'inherit',
                cursor: isDragging ? 'grabbing' : 'grab',
            }}
        >
            <ListItemText
                primary={todo.text || 'Sin título'}
                secondary={`Descripción: ${todo.description || 'No disponible'} | Categoría: ${todo.category || 'No disponible'} | Prioridad: ${todo.priority || 'No disponible'} | Fecha límite: ${todo.deadline || 'No disponible'}`}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(todo)}>
                    <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={deleteTodo}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

const TodoList = ({ setCurrentTodo }) => {
    const { paginatedTodos, deleteTodo, reorderTodos, nextPage, prevPage, totalTodos, currentPage, setCurrentPage } = React.useContext(TodoContext);
    const [isDeleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [todoToDelete, setTodoToDelete] = React.useState(null);

    const openDeleteNotification = () => {
        notification.success({
            message: 'Tarea Eliminada',
            description: 'La tarea ha sido eliminada con éxito',
            placement: 'topRight',
            duration: 3,
        });
    };

    const handleDeleteConfirm = () => {
        deleteTodo(todoToDelete.id);
        openDeleteNotification();
        setDeleteModalOpen(false);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            reorderTodos(active.id, over.id);
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '20px' }}>
            <Typography variant="h5" align="center" gutterBottom>Lista de Tareas</Typography>
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={paginatedTodos?.map(todo => todo?.id)} strategy={verticalListSortingStrategy}>
                    <List>
                        {paginatedTodos?.map((todo) => (
                            <SortableItem
                                key={todo.id}
                                todo={todo}
                                deleteTodo={() => {
                                    setTodoToDelete(todo);
                                    setDeleteModalOpen(true);
                                }}
                                handleEdit={() => setCurrentTodo(todo)} 
                            />
                        ))}
                    </List>
                </SortableContext>
            </DndContext>

            {totalTodos > 10 && (
                <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                    <IconButton onClick={prevPage} disabled={currentPage === 1}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Box>
                        {Array.from({ length: Math.ceil(totalTodos / 10) }, (_, index) => (
                            <Button
                                key={index + 1}
                                variant={currentPage === index + 1 ? 'contained' : 'outlined'}
                                color="primary"
                                onClick={() => setCurrentPage(index + 1)} 
                                sx={{ margin: '0 5px' }}
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </Box>
                    <IconButton onClick={nextPage} disabled={totalTodos <= currentPage * 10}>
                        <ArrowForwardIcon />
                    </IconButton>
                </Box>
            )}
            <ConfirmationModal
                open={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm} 
            />
        </Container>
    );
};

export default TodoList;