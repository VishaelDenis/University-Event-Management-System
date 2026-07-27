import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Welcome to the University Event Management System</h1>
            <p>Use the links above to test each dashboard.</p>
            <ul>
                <li><Link to="/organizer">Go to Organizer Dashboard (Event Management)</Link></li>
                <li><Link to="/student">Go to Student Dashboard</Link></li>
                <li><Link to="/admin">Go to Admin Dashboard</Link></li>
            </ul>
        </div>
    );
}

export default Home;