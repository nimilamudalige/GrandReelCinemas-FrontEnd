export function Unauthorized() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <h1 className="text-5xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
            <p className="text-lg text-gray-700">You do not have permission to view this page.</p>
        </div>
    );
}
