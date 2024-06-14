import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const DeleteModal = ({ open, onClose, title, onDelete }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%',
                    maxWidth: 400,
                    bgcolor: 'background.paper',
                    borderRadius: '8px',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" mb={2}>
                    Delete Task
                </Typography>
                <Typography variant="body1" mb={2}>
                    Are you sure you want to delete task: {title}?
                </Typography>

                <Box mt={2} display="flex" justifyContent="space-between">
                    <Button onClick={onClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={onDelete} variant="contained" color="primary">
                        Delete
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default DeleteModal;
