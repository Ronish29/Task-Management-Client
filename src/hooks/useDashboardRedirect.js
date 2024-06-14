import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const useDashboardRedirect = (redirectPath = '/dashboard') => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate(redirectPath); 
        }
    }, [navigate, redirectPath]);
}

export default useDashboardRedirect