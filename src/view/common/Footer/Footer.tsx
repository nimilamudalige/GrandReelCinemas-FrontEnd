import { Link } from "react-router-dom";
import logo from "../../../assets/cinema-logo.jpg";

export function Footer() {
    return (
        <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-10 mt-auto">
            <div className="container mx-auto px-4 flex flex-col items-center gap-6">
                <img src={logo} alt="GrandReel Logo" className="w-16 h-16" />

                <p className="text-2xl font-bold tracking-wide text-yellow-400 hover:text-yellow-300 transition duration-300">
                    GrandReel Cinemas
                </p>

                <ul className="flex flex-wrap justify-center gap-8 text-yellow-500 text-lg">
                    <li><Link className="hover:text-yellow-300 transition" to="/">Home</Link></li>
                    <li><Link className="hover:text-yellow-300 transition" to="/movies">Movies</Link></li>
                    <li><Link className="hover:text-yellow-300 transition" to="/about">About</Link></li>
                    <li><Link className="hover:text-yellow-300 transition" to="/contact">Contact</Link></li>
                    <li><Link className="hover:text-yellow-300 transition" to="/bookings">My Bookings</Link></li>
                </ul>

                <p className="text-sm text-gray-400 text-center">
                    © {new Date().getFullYear()} GrandReel Cinemas. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
