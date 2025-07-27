import './Navbar.css';
import icon from '../../../assets/icon.jpg';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function Navbar() {
    const [username, setUsername] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const storedUserName = localStorage.getItem("username");
        const storedRole = localStorage.getItem("role");
        setUsername(storedUserName);
        setRole(storedRole);
    }, []);

    return (
        <div className="p-3 bg-[#1e1e1e] flex justify-between items-center shadow-md">
            <div className="flex items-center">
                <img className="h-[2.5rem] w-[2.5rem] mr-2" src={icon} alt="Logo" />
                <h1 className="text-3xl text-[#f5c518] font-bold hover:text-white transition-all">
                    GrandReel Cinemas
                </h1>
            </div>

            <ul className="flex gap-6 items-center text-lg">
                {role === 'customer' && (
                    <>
                        <li className="text-white hover:text-[#f5c518] transition-all">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="text-white hover:text-[#f5c518] transition-all">
                            <Link to="/now-showing">Now Showing</Link>
                        </li>
                        <li className="text-white hover:text-[#f5c518] transition-all">
                            <Link to="/bookings">My Bookings</Link>
                        </li>
                        <li className="text-white hover:text-[#f5c518] transition-all">
                            <Link to="/contact">Contact</Link>
                        </li>
                    </>
                )}

                {role === 'admin' && (
                    <>
                        <li className="text-white hover:text-[#f5c518] transition-all">
                            <Link to="/admin-panel">Admin Panel</Link>
                        </li>
                        <li className="text-white hover:text-[#f5c518] transition-all">
                            <Link to="/manage-movies">Manage Movies</Link>
                        </li>
                        <li className="text-white hover:text-[#f5c518] transition-all">
                            <Link to="/manage-events">Manage Events</Link>
                        </li>
                    </>
                )}
            </ul>

            {username ? (
                <p className="text-white text-xl">🎟️ {username}</p>
            ) : (
                <Link
                    to="/login"
                    className="text-white bg-[#e50914] hover:bg-[#b0060e] px-4 py-2 rounded-md text-lg"
                >
                    Sign In
                </Link>
            )}
        </div>
    );
}
