import { Link } from "react-router-dom";

export function AdminDashboard() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white flex flex-col">
                <div className="px-6 py-4 text-2xl font-bold border-b border-gray-700">
                    🎬 GrandReel Admin
                </div>
                <nav className="flex-1 px-4 py-6 space-y-3">
                    <Link
                        to="/AdminDashboard"
                        className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                    >
                        📊 Dashboard
                    </Link>
                    <Link
                        to="/AddMovie"
                        className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                    >
                        ➕ Add Movie
                    </Link>
                    <Link
                        to="/UpdateMovie"
                        className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                    >
                        🎥 Manage Movies
                    </Link>
                </nav>
                <div className="px-4 py-4 border-t border-gray-700">
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg">
                        🚪 Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <span className="text-gray-600">Welcome, Admin</span>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                            <h2 className="text-lg font-bold text-gray-700">🎬 Total Movies</h2>
                            <p className="text-3xl font-semibold mt-2">24</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                            <h2 className="text-lg font-bold text-gray-700">📅 Upcoming Shows</h2>
                            <p className="text-3xl font-semibold mt-2">8</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                            <h2 className="text-lg font-bold text-gray-700">👥 Total Users</h2>
                            <p className="text-3xl font-semibold mt-2">132</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
