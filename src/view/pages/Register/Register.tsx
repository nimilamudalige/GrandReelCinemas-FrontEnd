// `src/view/pages/Register/Register.tsx`
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Register() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/auth/register", formData);
            alert(response.data.message);
            navigate("/login");
        } catch (error) {
            console.error(error);
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Register</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
                <div className="mb-4">
                    <label className="block text-gray-700">Username</label>
                    <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Register
                </button>
            </form>
        </div>
    );
}