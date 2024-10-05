import React from 'react';
import { TodoContext } from './context/TodoContext';
import {
    Container,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Typography,
    Button,
    Box,
} from '@mui/material';
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
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: todo?._id });

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
                primary={todo?.title || 'Sin título'}
                secondary={`Descripción: ${todo?.description || 'No disponible'} | Categoría: ${todo?.category || 'No disponible'} | Prioridad: ${todo?.priority || 'No disponible'} | Fecha límite: ${todo.deadline || 'No disponible'}`}
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
        deleteTodo(todoToDelete._id);
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
                <SortableContext items={paginatedTodos?.map(todo => todo?._id) || []} strategy={verticalListSortingStrategy}>

                    <List>
                        {paginatedTodos && paginatedTodos?.length > 0 ? (
                            paginatedTodos.map((todo) => (
                                <SortableItem
                                    key={todo.id}
                                    todo={todo}
                                    deleteTodo={() => {
                                        setTodoToDelete(todo);
                                        setDeleteModalOpen(true);
                                    }}
                                    handleEdit={() => setCurrentTodo(todo)}
                                />
                            ))
                        ) : (
                            <ListItem>
                                <ListItemText primary="No hay tareas disponibles." />
                            </ListItem>
                        )}
                    </List>
                </SortableContext>
            </DndContext>

            {/* Botones de paginación */}
            {totalTodos > 10 && (
                <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                    <Button onClick={prevPage} disabled={currentPage === 1} startIcon={<ArrowBackIcon />}>Anterior</Button>
                    <Typography>{`${currentPage} de ${Math.ceil(totalTodos / 10)}`}</Typography>
                    <Button onClick={nextPage} disabled={currentPage * 10 >= totalTodos} endIcon={<ArrowForwardIcon />}>Siguiente</Button>
                </Box>
            )}

            {/* Modal de confirmación */}
            <ConfirmationModal
                open={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Confirmar eliminación"
                content={`¿Estás seguro de que deseas eliminar la tarea "${todoToDelete?.title}"?`}
            />

        </Container>
    );
};

export default TodoList;

