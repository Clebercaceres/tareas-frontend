import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const ConfirmationModal = ({ open, onClose, onConfirm }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h6">Confirmar Eliminación</Typography>
                <Typography variant="body1">¿Estás seguro de que deseas eliminar esta tarea?</Typography>
                <Button variant="contained" color="error" onClick={onConfirm}>Eliminar</Button>
                <Button variant="outlined" onClick={onClose}>Cancelar</Button>
            </Box>
        </Modal>
    );
};

export default ConfirmationModal;