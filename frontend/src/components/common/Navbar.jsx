import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav style={{ padding: "10px", borderBottom: "1px solid #ccc", display: "flex", gap: "15px" }}>
            <strong>Event Management System</strong>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/admin">Admin Dashboard</Link>
            <Link to="/organizer">Organizer Dashboard</Link>
            <Link to="/student">Student Dashboard</Link>
        </nav>
    );
}

export default Navbar;