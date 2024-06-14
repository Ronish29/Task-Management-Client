const isLocalhost = window.location.href.includes('localhost');

const config = {
    BASE_URL: isLocalhost 
        ? process.env.REACT_APP_BASE_URL || "http://localhost:4000/api" 
        : "http://192.168.29.73:4000/api"
};

export default config;