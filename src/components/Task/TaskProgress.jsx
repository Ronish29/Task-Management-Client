import React from 'react';
import { Box, Typography, LinearProgress, Card } from '@mui/material';

const TaskProgress = ({ completed, inProgress, pending }) => {
    return (
        <Box sx={{ 
            margin: '0 auto',
            width: '90%', padding: 2 }}>
            <Card
                variant="outlined"
                sx={{
                    
                    padding: 2,
                    borderRadius: '16px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#fafafa'
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Task Progress
                </Typography>
                <Box sx={{ marginBottom: 2, marginTop: 2 }}>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>Completed: {completed.toFixed(2)}%</Typography>
                    <LinearProgress variant="determinate" value={completed} sx={{ marginBottom: 2, height: 10, borderRadius: 5, backgroundColor: '#e0f7e9' }} />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>In Progress: {inProgress.toFixed(2)}%</Typography>
                    <LinearProgress variant="determinate" value={inProgress} sx={{ marginBottom: 2, height: 10, borderRadius: 5, backgroundColor: '#e0e7ff' }} />
                </Box>
                <Box>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>Pending: {pending.toFixed(2)}%</Typography>
                    <LinearProgress variant="determinate" value={pending} sx={{ marginBottom: 2, height: 10, borderRadius: 5, backgroundColor: '#fff3e0' }} />
                </Box>
            </Card>

        </Box>
    );
};

export default TaskProgress;
