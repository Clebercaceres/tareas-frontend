import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import { TodoContext } from './context/TodoContext';

const Header = () => {
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(TodoContext);

    const handleLogout = () => {
        setUserData(null);
        localStorage.removeItem('userData');
        navigate('/login');
    };


    return (
        <AppBar position="static">
            <Toolbar>
                {userData?.avatar && <Avatar src={userData.avatar} alt={userData.username} sx={{ marginRight: 2 }} />}
                <Typography variant="h6">
                    Bienvenido, {userData?.username || "Usuario"}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>
            </Toolbar>
        </AppBar>

    );
};

export default Header;
