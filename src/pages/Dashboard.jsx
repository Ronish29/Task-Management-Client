import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useHomeRedirect from '../hooks/useHomeRedirect';
import axios from 'axios';
import TaskItem from '../components/Task/TaskItem';
import TaskProgress from '../components/Task/TaskProgress';
import config from '../config';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { username } = location.state || {};
    const token = localStorage.getItem('token');
    const [taskData, setTaskData] = useState([]);
    const [taskProgress, setTaskProgress] = useState({ completed: 0, inProgress: 0, pending: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState('all'); 

    useHomeRedirect();

    const headerConfig = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/');
        toast.success('Logged out successfully!');
    };

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/tasks/`, headerConfig);
            const tasks = response.data;
            setTaskData(tasks);
            setIsLoading(false);
            updateTaskProgress(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setIsLoading(false);
        }
    };

    const updateTaskProgress = (tasks) => {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.status === 'completed').length;
        const inProgressTasks = tasks.filter(task => task.status === 'in progress').length;
        const pendingTasks = tasks.filter(task => task.status === 'pending').length;

        setTaskProgress({
            completed: (completedTasks / totalTasks) * 100,
            inProgress: (inProgressTasks / totalTasks) * 100,
            pending: (pendingTasks / totalTasks) * 100
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const title = data.get('taskTitle');
        const description = data.get('taskDescription');

        try {
            const response = await axios.post(
                `${config.BASE_URL}/tasks/`,
                { title, description },
                headerConfig
            );

            if (response.data.success) {
                toast.success("Task created successfully");
                getTasks();
            }
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleEdit = async (taskId, updatedTask) => {
        try {
            await axios.put(`${config.BASE_URL}/tasks/${taskId}`, updatedTask, headerConfig);
            getTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`${config.BASE_URL}/tasks/${taskId}`, headerConfig);
            getTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleChangeStatusFilter = (event) => {
        setSelectedStatus(event.target.value);
    };

    
    const filteredTasks = taskData.filter(task => {
        if (selectedStatus === 'all') {
            return true; 
        } else {
            return task.status === selectedStatus;
        }
    });

    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                }}
            >
                <h1>Hey {username}</h1>
                <Button variant="outlined" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
            <TaskProgress
                completed={taskProgress.completed}
                inProgress={taskProgress.inProgress}
                pending={taskProgress.pending}
            />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                }}
            >
                <h1>New Task Creation</h1>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="filter-by-status-label">Filter By Status</InputLabel>
                    <Select
                        labelId="filter-by-status-label"
                        id="filter-by-status"
                        value={selectedStatus}
                        onChange={handleChangeStatusFilter}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="in progress">In Progress</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '90%',
                }}
            >
                <TextField
                    margin="normal"
                    required
                    id="taskTitle"
                    label="Task Title"
                    name="taskTitle"
                    sx={{
                        maxWidth: '300px'
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    id="taskDescription"
                    label="Task Description"
                    name="taskDescription"
                    sx={{
                        maxWidth: '300px'
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        mt: 3,
                        mb: 2,
                        maxWidth: '300px'
                    }}
                >
                    Create
                </Button>
            </Box>
            <Grid container spacing={2}>
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <Grid item xs={12} sm={6} md={4} key={task._id}>
                            <TaskItem
                                title={task.title}
                                description={task.description}
                                status={task.status}
                                onEdit={(updatedTask) => handleEdit(task._id, updatedTask)}
                                onDelete={() => handleDelete(task._id)}
                            />
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography variant="body1">No tasks available</Typography>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default Dashboard;
