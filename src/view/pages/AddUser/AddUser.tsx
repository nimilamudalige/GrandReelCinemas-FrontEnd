import { useState } from "react";
import axios from "axios";

export function AddUser() {
    const [formData, setFormData] = useState({ username: "", password: "", role: "customer" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/users/add", formData);
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert("Failed to add user. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Add User</h1>
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
                <div className="mb-4">
                    <label className="block text-gray-700">Role</label>
                    <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                    Add User
                </button>
            </form>
        </div>
    );
}