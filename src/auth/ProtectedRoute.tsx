import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { JSX } from "react";

interface ProtectedRouteProps {
    children: JSX.Element;
    allowedRoles: string[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        setRole(storedRole);
        setLoading(false);
    }, []);

    if (loading) {
        return null; // or a spinner/loading indicator if needed
    }

    if (!role || !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}
