// src/view/common/MainContent.tsx

import './MainContent.css';
import { Route, Routes } from "react-router-dom";

// Import Cinema Pages
import { Home } from "../../pages/Home/Home";
import { About } from "../../pages/About/About";
import { Contact } from "../../pages/Contact/Contact";
import { BookingCart } from "../../pages/BookingCart/BookingCart.tsx";

export function MainContent() {
    return (
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen w-full">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/booking" element={<BookingCart />} />
                </Routes>
            </div>
        </div>
    );
}
