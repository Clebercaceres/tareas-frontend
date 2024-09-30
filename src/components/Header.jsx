import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { TodoContext } from './context/TodoContext';

const Header = ({ toggleMode, mode }) => {
    const navigate = useNavigate();
    const { userData, setUserData } = React.useContext(TodoContext);

    const handleLogout = () => {
        setUserData(null);
        localStorage.removeItem('userData');
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                {userData?.avatar && (
                    <Avatar src={userData.avatar} alt={userData.username} sx={{ marginRight: 2 }} />
                )}
                <Typography variant="h6" sx={{ marginRight: 2 }}>
                    Bienvenido, {userData?.username || "Usuario"}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Button color="inherit" onClick={toggleMode} startIcon={mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}>
                </Button>
                <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;