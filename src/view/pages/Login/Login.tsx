import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { backendApi } from "../../../api.ts";
import {getUserFromToken} from "../../../auth/auth.ts";
import type { UserData } from "../../../models/UserData.ts";

type FormData = {
    username: string;
    password: string;
};

export function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<FormData>();

    const authenticateUser = async (data: FormData) => {
        console.log("Login data:", data);
        try {
            const userCredentials = {
                username: data.username,  // assuming your backend uses "username" for email
                password: data.password
            };

            const response = await backendApi.post('/auth/login', userCredentials);
            console.log("Login response:", response.data);
            const user:UserData = getUserFromToken(response.data.accessToken);
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;

            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userId', user.id as String); // Assuming username is used as userId
            // @ts-ignore
            localStorage.setItem('username',user.username as String);
            localStorage.setItem('role', user.role as String);

            alert("Successfully logged in!");
            if (user.role === "admin") {
                navigate('/AdminDashboard');
            } else {
                navigate('/Home');
            }
            } catch (error) {
            console.error(error);
            alert("Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4">
            {/* Card Container */}
            <div className="w-full max-w-md bg-white border border-green-200 rounded-xl shadow-lg p-8 relative overflow-hidden">

                {/* Decorative Circle */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-green-100 rounded-full opacity-30 animate-pulse"></div>

                {/* Logo or Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 1111 3.646a9.003 9.003 0 019.354 11.708z" />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-green-800 text-center mb-6">
                    Welcome GrandReel Cinema
                </h2>

                {/* Go Back */}
                <div className="text-center mb-4">
                    <button
                        onClick={() => navigate("/")}
                        className="text-sm text-green-600 hover:text-green-900 underline"
                    >
                          Sign Up
                    </button>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit(authenticateUser)}>
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-green-700">
                            Email
                        </label>
                        <input
                            type="text"
                            id="username"
                            {...register("username")}
                            className="mt-1 block w-full border border-green-300 rounded-lg text-sm p-2 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter your username"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-green-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register("password")}
                            className="mt-1 block w-full border border-green-300 rounded-lg text-sm p-2 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Remember & Forgot */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="text-green-600 focus:ring-green-500 rounded" />
                            <span className="text-green-700">Remember me</span>
                        </label>
                        <a href="#" className="text-green-600 hover:text-green-900">Forgot password?</a>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Sign In
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-green-200"></div>
                    <span className="px-2 text-sm text-green-500">or</span>
                    <div className="flex-grow border-t border-green-200"></div>
                </div>

                {/* Social Login */}
                <div className="flex gap-3">
                    <button className="flex-1 py-2 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                        You don't have an account?
                        <a href="#" className="text-green-600 hover:text-green-900"  onClick={() => navigate("/register")}
                        >Sign Up</a>
                    </button>

                </div>
            </div>
        </div>

    );
}