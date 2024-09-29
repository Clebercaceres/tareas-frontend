import React from 'react';
import { TodoContext } from './context/TodoContext';
import { Container, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import EditTodoModal from './ModalEdit';
import ConfirmationModal from './ModalConfirm';

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
                backgroundColor: isDragging ? '#f0f0f0' : 'white',
                cursor: isDragging ? 'grabbing' : 'grab',
            }}
        >
            <ListItemText
                primary={todo.text}
                secondary={`Descripción: ${todo.description} | Categoría: ${todo.category} | Prioridad: ${todo.priority} | Fecha límite: ${todo.deadline}`}
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

const TodoList = () => {
    const { todos, deleteTodo, reorderTodos, nextPage, prevPage, totalTodos, currentPage } = React.useContext(TodoContext);
    const [currentTodo, setCurrentTodo] = React.useState(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [todoToDelete, setTodoToDelete] = React.useState(null);

    const handleDeleteConfirm = () => {
        deleteTodo(todoToDelete.id);
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
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={todos?.map(todo => todo?.id)} strategy={verticalListSortingStrategy}>
                    <List>
                        {todos?.map((todo) => (
                            <SortableItem
                                key={todo.id}
                                todo={todo}
                                deleteTodo={() => {
                                    setTodoToDelete(todo);
                                    setDeleteModalOpen(true);
                                }}
                                handleEdit={setCurrentTodo}
                            />
                        ))}
                    </List>
                </SortableContext>
            </DndContext>
            <div>
                <Button onClick={prevPage} variant="contained" color="secondary" disabled={currentPage === 1}>Anterior</Button>
                <Button onClick={nextPage} variant="contained" color="secondary" disabled={totalTodos <= currentPage * 10}>Siguiente</Button>
            </div>
            <ConfirmationModal
                open={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
            />
            <EditTodoModal
                currentTodo={currentTodo}
                setCurrentTodo={setCurrentTodo}
                open={!!currentTodo}
                onClose={() => setCurrentTodo(null)}
            />
        </Container>
    );
};

export default TodoList;