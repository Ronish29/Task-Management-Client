import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useHomeRedirect = (redirectPath = '/') => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate(redirectPath); 
        }
    }, [navigate, redirectPath]);
};

export default useHomeRedirect;