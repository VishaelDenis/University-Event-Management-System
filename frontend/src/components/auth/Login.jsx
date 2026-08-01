import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as loginApi } from "../../api/auth";
import { useAuth } from "../../hooks/useAuth";

const DASHBOARD_BY_ROLE = {
    ADMIN: "/admin",
    ORGANIZER: "/organizer",
    STUDENT: "/student",
};

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        try {
            const res = await loginApi({ email, password });
            login(res.data);
            navigate(DASHBOARD_BY_ROLE[res.data.role] || "/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Check your email and password.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="split-screen">
            <div className="split-screen-visual split-screen-visual-login">
                <img
                    src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80"
                    alt="University campus"
                    className="split-screen-bg"
                />
                <div className="split-screen-overlay" />
                <div className="split-screen-text">
                    <Link to="/" className="split-screen-brand">University Events</Link>
                    <h1>
                        Manage<br />
                        <span className="accent-word">Campus</span><br />
                        <span className="big-word">Events</span>
                    </h1>
                    <p className="split-screen-tagline">
                        Book venues. Track approvals. Collect feedback.
                        <span className="lead-word"> All in one place.</span>
                    </p>
                </div>
            </div>

            <div className="split-screen-form">
                <div className="auth-card auth-card-plain">
                    <h2>Welcome Back</h2>
                    <p className="auth-subtitle">Log in to continue to your dashboard.</p>
                    {error && <div className="auth-error">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary" disabled={submitting}>
                            {submitting ? "Logging in..." : "Login"}
                        </button>
                    </form>
                    <p className="auth-link">
                        No account? <Link to="/register">Register</Link>
                    </p>
                    <p className="auth-link">
                        <Link to="/">← Back to home</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
