import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="page-section">
            <div className="not-found-code">404</div>
            <h2><span>Page Not Found</span></h2>
            <div className="page-card">
                <p>
                    The page you are looking for does not exist or has been moved.
                </p>
                <p className="muted">
                    Please check the URL or navigate back to a known page.
                </p>
                <div className="home-links" style={{ marginTop: "24px" }}>
                    <Link to="/" className="home-link primary">Go Home</Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
