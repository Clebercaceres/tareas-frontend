import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Link } from '@mui/material';
import { login } from "../context/services/AuthService";
import { TodoContext } from "../context/TodoContext";

const Login = () => {
    const [identifier, setIdentifier] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(null);
    const { setUserData } = React.useContext(TodoContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await login(identifier, password);

            // Verificar si el token está en la respuesta
            if (response.data.token) {
                const userData = {
                    token: response.data.token,
                    username: response.data.username,
                    avatar: response.data.avatar,
                };

                setUserData(userData);
                localStorage.setItem('userData', JSON.stringify(userData)); // Guardar en localStorage
                navigate("/");
            } else {
                // Si no hay token, mostramos error
                setError("Credenciales inválidas");
            }
        } catch (err) {
            // Si ocurre un error durante la petición, mostrar el mensaje adecuado
            setError(err.response?.data?.message || "Error al iniciar sesión");
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" gutterBottom>
                Iniciar Sesión
            </Typography>
            {error && <Typography color="error" align="center">{error}</Typography>}
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
