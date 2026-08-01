import React from "react";
import { Link } from "react-router-dom";
import img1 from "../components/img/img1.jpg";

function Home() {
    return (
        <div className="landing">
            
            <section className="hero">
                <div className="hero-brand">
                    <Link to="/" className="navbar-logo">
                        <span className="navbar-logo-mark">UE</span>
                        <span className="navbar-logo-text">University Events</span>
                    </Link>
                </div>
                <div className="hero-copy">
                    <span className="eyebrow">Campus Life, Organized</span>
                    <h1>
                        Turn Every Event Into an <em>Experience</em> Worth Having
                    </h1>
                    <p>
                        One platform for students, club organizers, and administrators to
                        book venues, manage registrations, gather feedback, and keep campus
                        life running smoothly — from orientation week to graduation day.
                    </p>
                    <div className="hero-actions">
                        <Link to="/register" className="btn-hero-primary">Get Started</Link>
                        <Link to="/about" className="btn-hero-secondary">
                            <span className="play-dot">▸</span> How it works
                        </Link>
                    </div>
                    <div className="hero-stats">
                        <div className="hero-stat">
                            <span className="hero-stat-value">120+</span>
                            <span className="hero-stat-label">Events hosted this year</span>
                        </div>
                        <div className="hero-stat-divider" />
                        <div className="hero-stat">
                            <span className="hero-stat-value">4.8/5</span>
                            <span className="hero-stat-label">Average feedback rating</span>
                        </div>
                    </div>
                </div>
                <div className="hero-media">
                    <img
                        className="hero-media-main"
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80"
                        alt="University campus building"
                    />
                    <img
                        className="hero-media-float"
                        src={img1}
                    />
                    <div className="hero-media-badge">
                        <strong>99%</strong>
                        <span>Booking success rate</span>
                    </div>
                </div>
            </section>

            {/* SPLIT — dark band */}
            <section className="split-band">
                <div className="split-media">
                    <img
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=80"
                        alt="Graduates celebrating"
                    />
                </div>
                <div className="split-copy">
                    <span className="eyebrow eyebrow-light">Since 2026</span>
                    <h2>The Right Tools Turn Busy Semesters Into Smooth Ones</h2>
                    <p>
                        Built by students, for students. Organizers publish events and
                        manage venues in minutes. Students discover, book, and give
                        feedback without the back-and-forth emails. Admins see it all in
                        one place.
                    </p>
                    <div className="split-stats">
                        <div>
                            <span className="split-stat-value">30%</span>
                            <span className="split-stat-label">Faster event approvals</span>
                        </div>
                        <div>
                            <span className="split-stat-value">95%</span>
                            <span className="split-stat-label">Students would use it again</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE */}
            <section className="features">
                <div className="features-header">
                    <span className="eyebrow">Why Choose Us</span>
                    <h2>Everything Campus Events Need, in One Dashboard</h2>
                    <p>
                        Purpose-built panels for every role on campus — no juggling
                        spreadsheets, group chats, or paper sign-up sheets.
                    </p>
                </div>
                <div className="feature-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🎓</div>
                        <h3>Student Bookings</h3>
                        <p>Browse events, reserve a spot, and track booking status in real time.</p>
                    </div>
                    <div className="feature-card feature-card-highlight">
                        <div className="feature-icon">🏛️</div>
                        <h3>Venue & Event Management</h3>
                        <p>Organizers create events, manage venues, and handle capacity with ease.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Admin Oversight</h3>
                        <p>Full visibility into users, activity, and reports across the platform.</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-band">
                <div className="cta-content">
                    <h2>Ready to Simplify Your Next Campus Event?</h2>
                    <p>Create your account and start booking, organizing, or overseeing events today.</p>
                    <Link to="/register" className="btn-hero-primary">Create Free Account</Link>
                </div>
            </section>
        </div>
    );
}

export default Home;
