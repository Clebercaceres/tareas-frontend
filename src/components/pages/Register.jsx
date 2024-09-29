import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Link, Grid, Avatar } from '@mui/material';
import { register } from "../context/services/AuthService"; // Asegúrate de que este servicio haga el llamado correcto a la API

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null); // Estado para manejar errores
    const avatars = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROI--23ZsZB50wGPBSL3U9wV4Gq83t5Xxh-w&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHjodsHsI5i5bMpgVRnQWd2ix1-nnoLK52nw&s"
    ];
    const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {
            const response = await register({ username, email, password, confirmPassword, avatar: selectedAvatar });

            if (response.data.message === "Usuario registrado exitosamente") {
                // Limpiar el error
                setError(null);
                // Redirigir al login
                navigate("/login");
            }
        } catch (err) {
            // Mostrar el error en la interfaz
            if (err.response && err.response.data.message) {
                setError(err.response.data.message); // Mostrar el mensaje de error devuelto por el backend
            } else {
                setError("Error al registrarse. Intente nuevamente.");
            }
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" gutterBottom>Registro</Typography>
            {error && <Typography color="error" align="center">{error}</Typography>}
            <form onSubmit={handleRegister}>
                <TextField
                    label="Nombre de usuario"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    label="Correo electrónico"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <TextField
                    label="Confirmar contraseña"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <Typography variant="subtitle1" align="center" gutterBottom>Selecciona un avatar:</Typography>
                <Grid container spacing={0} justifyContent="center" gap="10px" marginBottom="10px">
                    {avatars.map((avatar, index) => (
                        <Avatar
                            key={index}
                            src={avatar}
                            alt={`Avatar ${index}`}
                            onClick={() => setSelectedAvatar(avatar)}
                            sx={{
                                cursor: 'pointer',
                                border: selectedAvatar === avatar ? '2px solid blue' : 'none'
                            }}
                        />
                    ))}
                </Grid>
                <Button type="submit" variant="contained" color="primary" fullWidth>Registrarse</Button>
            </form>
            <Typography align="center" marginTop={2}>
                ¿Ya tienes una cuenta?
                <Link href="/login" variant="body2" color="primary"> Inicia sesión aquí</Link>
            </Typography>
        </Container>
    );
};

export default Register;
