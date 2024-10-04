import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Link } from '@mui/material';
import { notification } from 'antd';
import { login } from "../context/services/AuthService";
import { TodoContext } from "../context/TodoContext";

const Login = () => {
    const [identifier, setIdentifier] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { setUserData } = React.useContext(TodoContext);
    const navigate = useNavigate();

    const showErrorNotification = (message) => {
        notification.error({
            message: 'Error de autenticación',
            description: message,
            placement: 'topRight',
        });
    };



    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await login(identifier, password);

            if (response.data.token) {
                const userData = {
                    token: response.data.token,
                    username: response.data.username,
                    avatar: response.data.avatar,
                };

                setUserData(userData);
                localStorage.setItem('userData', JSON.stringify(userData));
                navigate("/");
            } else {
                showErrorNotification("Credenciales inválidas");
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Error al iniciar sesión";
            showErrorNotification(errorMessage);
        }
    };

    

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" gutterBottom>
                Iniciar Sesión
            </Typography>
            <form onSubmit={handleLogin}>
                <TextField
                    label="Usuario o correo"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Iniciar Sesión
                </Button>
            </form>
            <Typography align="center" marginTop={2}>
                ¿No tienes una cuenta?
                <Link href="/register" variant="body2" color="primary">
                    {" "}Regístrate aquí
                </Link>
            </Typography>
        </Container>
    );
};

export default Login;