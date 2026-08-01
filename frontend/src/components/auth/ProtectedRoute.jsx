import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const DASHBOARD_BY_ROLE = {
    ADMIN: "/admin",
    ORGANIZER: "/organizer",
    STUDENT: "/student",
};

function ProtectedRoute({ children, allowedRoles }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner" />
                <p className="loading-text">Verifying authentication...</p>
            </div>
        );
    }

    if (!user) return <Navigate to="/login" replace />;

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to={DASHBOARD_BY_ROLE[user.role] || "/login"} replace />;
    }

    return children;
}

export default ProtectedRoute;
