import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Navbar({ transparent }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

    const isActive = (path) => location.pathname === path ? "nav-link active" : "nav-link";

    return (
        <nav className={transparent ? "navbar navbar-transparent" : "navbar"}>
            <div className="navbar-brand">
                <Link to={user ? "#" : "/"} className="navbar-logo">
                    <span className="navbar-logo-mark">UE</span>
                    <span className="navbar-logo-text">University Events</span>
                </Link>
            </div>

            <div className="navbar-links">
                <Link to="/about" className={isActive("/about")}>About</Link>
                <Link to="/contact" className={isActive("/contact")}>Contact</Link>
                {!user && !isAuthPage && (
                    <>
                        <Link to="/login" className={isActive("/login")}>Login</Link>
                        <Link to="/register" className={isActive("/register")}>Register</Link>
                    </>
                )}
            </div>

            <div className="navbar-user">
                {user && (
                    <span className="user-info">
                        <span className="user-name">{user.name}</span>
                        <span className={"user-role user-role-" + user.role.toLowerCase()}>{user.role}</span>
                        <button onClick={handleLogout} className="btn-logout">Logout</button>
                    </span>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
