import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';

const EditTaskModal = ({ open, onClose, title, description, status, onSave }) => {
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedDescription, setUpdatedDescription] = useState(description);
    const [updatedStatus, setUpdatedStatus] = useState(status);


    useEffect(() => {
        setUpdatedTitle(title);
        setUpdatedDescription(description);
        setUpdatedStatus(status);
    }, [title, description, status]);

    const handleSave = () => {
        onSave({
            title: updatedTitle,
            description: updatedDescription,
            status: updatedStatus
        });
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
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
                    Edit Task
                </Typography>
                <TextField
                    label="Task Title"
                    fullWidth
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Task Description"
                    fullWidth
                    value={updatedDescription}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                    margin="normal"
                />


                <Box mt={2}>
                    <FormLabel component="legend">Status</FormLabel>
                    <RadioGroup
                        value={updatedStatus}
                        onChange={(e) => setUpdatedStatus(e.target.value)}
                        row
                    >
                        <FormControlLabel value="pending" control={<Radio />} label="Pending" />
                        <FormControlLabel value="in progress" control={<Radio />} label="In Progress" />
                        <FormControlLabel value="completed" control={<Radio />} label="Completed" />
                    </RadioGroup>
                </Box>

                <Box mt={2} display="flex" justifyContent="space-between">
                    <Button onClick={onClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} variant="contained" color="primary">
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditTaskModal;
