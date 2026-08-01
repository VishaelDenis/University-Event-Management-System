import React from "react";

function About() {
    return (
        <div className="page-section">
            <span className="eyebrow">About Us</span>
            <h2>About This Platform</h2>
            <div className="page-card">
                <img
                    className="page-card-image"
                    src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=900&q=80"
                    alt="University campus walkway"
                />
                <p>
                    The University Event Management System is a comprehensive solution
                    designed to simplify the coordination of academic and social events
                    across campus.
                </p>
                <p className="muted">
                    Built with a modern tech stack — React on the frontend, Node.js and
                    Express on the backend, and MySQL for data persistence.
                </p>
                <p className="muted">
                    Features include role-based access for students, organizers, and
                    administrators, real-time booking management, feedback collection,
                    and integrated help request handling.
                </p>
            </div>
        </div>
    );
}

export default About;
