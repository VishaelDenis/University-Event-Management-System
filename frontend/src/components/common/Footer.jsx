import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-brand">
                    <span className="footer-logo">University Events</span>
                    <p>Streamlined event management for campus life.</p>
                </div>
                <div className="footer-links">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/login">Login</Link>
                </div>
            </div>
            <div className="footer-bottom">&copy; 2026 University Event Management System</div>
        </footer>
    );
}

export default Footer;
