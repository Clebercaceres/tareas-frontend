import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const ConfirmationModal = ({ open, onClose, onConfirm }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            sx={{ backdropFilter: 'blur(4px)' }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 300,
                    bgcolor: (theme) => theme.palette.background.paper,
                    boxShadow: 24,
                    borderRadius: '15px',
                    p: 4,
                }}
            >
                <Typography variant="h6" align="center" gutterBottom>
                    Confirmar Eliminación
                </Typography>
                <Typography variant="body1" align="center">
                    ¿Estás seguro de que deseas eliminar esta tarea?
                </Typography>
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={onConfirm}
                        sx={{ marginRight: 1 }}
                    >
                        Eliminar
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ConfirmationModal;