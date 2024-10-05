import React from 'react';
import { Drawer, Button, List, ListItem, ListItemText } from '@mui/material';
import { TodoContext } from '../context/TodoContext';
import { useTheme } from '@mui/material/styles';

const Historial = () => {
    const { deletedTodos, loadDeletedTodos } = React.useContext(TodoContext);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const theme = useTheme(); 

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(open);
        if (open) {
            loadDeletedTodos();
        }
    };

    return (
        <div>
            <Button
                variant="outlined"
                onClick={toggleDrawer(true)}
                sx={{
                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.primary.main,
                    color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
                    '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.primary.dark,
                    },
                }}
            >
                Ver historial
            </Button>
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.common.white,
                        backdropFilter: 'blur(10px)', 
                    },
                }}
            >
                <div style={{ width: 300 }}>
                    <List>
                        {deletedTodos.length === 0 ? (
                            <ListItem>
                                <ListItemText primary="No hay tareas eliminadas." />
                            </ListItem>
                        ) : (
                            deletedTodos.map((todo) => (
                                <ListItem 
                                    key={todo._id}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[300],
                                            cursor: 'pointer',
                                        },
                                        transition: 'background-color 0.3s ease',
                                        color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black, // Color por defecto
                                    }}
                                >
                                    <ListItemText
                                        primary={todo.title}
                                        secondary={`Categoría: ${todo.category} | Prioridad: ${todo.priority}`}
                                        sx={{
                                            color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
                                        }}
                                    />
                                </ListItem>
                            ))
                        )}
                    </List>
                </div>
            </Drawer>
        </div>
    );
};

export default Historial;
