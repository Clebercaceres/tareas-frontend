import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Link, Grid, Avatar, IconButton, InputAdornment } from '@mui/material';
import { notification } from 'antd'; // Importamos las notificaciones
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { register } from "../context/services/AuthService";

const Register = () => {
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [error, setError] = React.useState(null);

    const [usernameError, setUsernameError] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const [confirmPasswordError, setConfirmPasswordError] = React.useState("");

    const [showPassword, setShowPassword] = React.useState(false);

    const avatars = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROI--23ZsZB50wGPBSL3U9wV4Gq83t5Xxh-w&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHjodsHsI5i5bMpgVRnQWd2ix1-nnoLK52nw&s"
    ];

    const [selectedAvatar, setSelectedAvatar] = React.useState(avatars[0]);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateUsername = (username) => {
        return username.length >= 3;
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateUsername(username)) {
            setUsernameError("El nombre de usuario debe tener al menos 3 caracteres");
            return;
        } else {
            setUsernameError("");
        }

        if (!validateEmail(email)) {
            setEmailError("El correo electrónico no es válido");
            return;
        } else {
            setEmailError("");
        }

        if (password.length < 6) {
            setPasswordError("La contraseña debe tener al menos 6 caracteres");
            return;
        } else {
            setPasswordError("");
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError("Las contraseñas no coinciden");
            return;
        } else {
            setConfirmPasswordError("");
        }

        try {
            const response = await register({ username, email, password, confirmPassword, avatar: selectedAvatar });

            if (response.data.message === "Usuario registrado exitosamente") {
                notification.success({
                    message: 'Registro exitoso',
                    description: 'Te has registrado correctamente. Redirigiendo al inicio de sesión...',
                });
                setError(null);
                navigate("/login");
            }
        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
                notification.error({
                    message: 'Error de registro',
                    description: err.response.data.message,
                });
            } else {
                setError("Error al registrarse. Intente nuevamente.");
                notification.error({
                    message: 'Error de registro',
                    description: 'Error al registrarse. Intente nuevamente.',
                });
            }
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
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
                    error={!!usernameError}
                    helperText={usernameError}
                />

                <TextField
                    label="Correo electrónico"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    error={!!emailError}
                    helperText={emailError}
                />

                <TextField
                    label="Contraseña"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    error={!!passwordError}
                    helperText={passwordError}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={toggleShowPassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                <TextField
                    label="Confirmar contraseña"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    error={!!confirmPasswordError}
                    helperText={confirmPasswordError}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={toggleShowPassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
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