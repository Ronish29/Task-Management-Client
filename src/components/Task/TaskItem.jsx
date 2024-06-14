import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PendingIcon from '@mui/icons-material/HourglassEmpty';
import InProgressIcon from '@mui/icons-material/Autorenew';
import CompletedIcon from '@mui/icons-material/CheckCircleOutline';
import EditTaskModal from '../Modals/EditTaskModal';
import DeleteModal from '../Modals/DeleteModal'; 

const TaskItem = ({ title, description, status, onEdit, onDelete }) => {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const editModalOpen = () => {
        setEditModalOpen(true);
    };

    const editModalClose = () => {
        setEditModalOpen(false);
    };

    const onDeleteModalOpen = () => {
        setDeleteModalOpen(true);
    };

    const deleteModalClose = () => {
        setDeleteModalOpen(false);
    };

    const handleSave = (updatedTask) => {
        onEdit(updatedTask);
        editModalClose();
    };

    const handleDelete = () => {
        onDelete();
        deleteModalClose();
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <PendingIcon sx={{ color: '#ff9800', fontSize: 40 }} />;
            case 'in progress':
                return <InProgressIcon sx={{ color: '#3f51b5', fontSize: 40 }} />;
            case 'completed':
                return <CompletedIcon sx={{ color: '#4caf50', fontSize: 40 }} />;
            default:
                return null;
        }
    };

    return (
        <>
            <Card
                variant="outlined"
                sx={{
                    maxWidth: 345,
                    margin: '20px auto',
                    padding: 2,
                    borderRadius: '16px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#fafafa',
                    position: 'relative'
                }}
            >
                <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                        {getStatusIcon(status)}
                        <Typography variant="h5" component="div" ml={2} sx={{ fontWeight: 'bold', color: '#333' }}>
                            {title}
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                        <strong>Description:</strong> {description}
                    </Typography>
                </CardContent>

                <Box
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1
                    }}
                >
                    <IconButton
                        onClick={editModalOpen}
                        sx={{
                            color: '#1976d2'
                        }}
                        size="small"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={onDeleteModalOpen} 
                        sx={{
                            color: '#d32f2f'
                        }}
                        size="small"
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Card>
            {isEditModalOpen && (
                <EditTaskModal
                    open={isEditModalOpen}
                    onClose={editModalClose}
                    title={title}
                    description={description}
                    status={status}
                    onSave={handleSave}
                />
            )}
            {isDeleteModalOpen && (
                <DeleteModal
                    open={isDeleteModalOpen}
                    onClose={deleteModalClose}
                    title={title}
                    onDelete={() => onDelete(handleDelete)} 
                />
            )}
        </>
    );
};

export default TaskItem;
