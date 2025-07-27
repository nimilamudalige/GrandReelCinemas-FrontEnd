import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import { DefaultLayout } from "./view/common/DefaultLayout/DefaultLayout.tsx";
import { Login } from "./view/pages/Login/Login.tsx";
import { useEffect } from "react";
import { isTokenExpired } from "./auth/auth.ts";
import { Unauthorized } from "./auth/Unauthorized.tsx";

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token || isTokenExpired(token)) {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            navigate("/login");
        }
    }, [navigate]);

    return (
        <Routes>
            {/* Main Application Routes */}
            <Route path="/*" element={<DefaultLayout />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
    );
}

export default App;
