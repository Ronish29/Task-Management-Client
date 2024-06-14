import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import Login from './components/Auth/Login';
import {Route, Routes } from "react-router-dom";

import Register from './components/Auth/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Login />} /> 
      <Route path="/register" element = {<Register/>} /> 
      <Route path="/dashboard" element = {<Dashboard/>} />
      </Routes>
      
    </div>
  );
}

export default App;
