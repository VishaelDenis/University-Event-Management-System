import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register as registerApi } from "../../api/auth";
import { useAuth } from "../../hooks/useAuth";

function Register() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        try {
            const res = await registerApi(formData);
            login(res.data);
            navigate("/student");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="split-screen">
            <div className="split-screen-visual split-screen-visual-login">
                <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                    alt="Graduating students"
                    className="split-screen-bg"
                />
                <div className="split-screen-overlay" />
                <div className="split-screen-text">
                    <Link to="/" className="split-screen-brand">University Events</Link>
                    <h1>
                        Join Your<br />
                        <span className="accent-word">Campus</span><br />
                        <span className="big-word">Community</span>
                    </h1>
                    <p className="split-screen-tagline">
                        Create an account to start booking events
                        <span className="lead-word"> and never miss a moment.</span>
                    </p>
                </div>
            </div>

            <div className="split-screen-form">
                <div className="auth-card auth-card-plain">
                    <h2>Create Account</h2>
                    <p className="auth-subtitle">Join the platform in under a minute.</p>
                    {error && <div className="auth-error">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Create a password (min 6 characters)"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                minLength={6}
                            />
                        </div>
                        <button type="submit" className="btn-primary" disabled={submitting}>
                            {submitting ? "Creating account..." : "Register"}
                        </button>
                    </form>
                    <p className="auth-link">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                    <p className="auth-link">
                        <Link to="/">← Back to home</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
