import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import { useEffect, useState } from "react";

const PrivateRoute = ({ element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        setIsAuthenticated(!!token);
    }, [localStorage.getItem("auth_token")]); // Depend on localStorage change

    if (isAuthenticated === null) return null; // Prevent initial redirect glitch
    return isAuthenticated ? element : <Navigate to="/login" />;
};


const AppRoutes = () => {
    return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
    );
};

export default AppRoutes;
