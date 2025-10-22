import './App.css';
// import '/index.css'
import { Route, Routes, useNavigate } from "react-router-dom";
import { DefaultLayout } from "./view/common/DefaultLayout/DefaultLayout.tsx";
import { Login } from "./view/pages/Login/Login.tsx";
import { useEffect } from "react";
import { isTokenExpired } from "./auth/auth.ts";
import { Unauthorized } from "./auth/Unauthorized.tsx";
import {AddMovie} from "./view/pages/AddMovie/AddMovie.tsx";
import {UpdateMovie} from "./view/pages/UpdateMovie/UpdateMovie.tsx";
import {AddUser} from "./view/pages/AddUser/AddUser.tsx";
import {Register} from "./view/pages/Register/Register.tsx";

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
            <Route path="/AddMovie" element={<AddMovie />} />
            <Route path="/UpdateMovie/:id" element={<UpdateMovie />} />
            <Route path="/AddUser" element={<AddUser />} />
            <Route path="/register" element={<Register />} />


        </Routes>
    );
}

export default App;
// import './App.css';
// import { Route, Routes } from "react-router-dom";
// import { DefaultLayout } from "./view/common/DefaultLayout/DefaultLayout.tsx";
// // import { Login } from "./view/pages/Login/Login.tsx";
// import { Unauthorized } from "./auth/Unauthorized.tsx";
//
// function App() {
//     return (
//         <Routes>
//             {/* Main Application Routes */}
//             <Route path="/*" element={<DefaultLayout />} />
//
//             {/* Auth Routes */}
//             <Route path="/login" element={<DefaultLayout />} />
//             <Route path="/unauthorized" element={<Unauthorized />} />
//         </Routes>
//     );
// }
//
// export default App;