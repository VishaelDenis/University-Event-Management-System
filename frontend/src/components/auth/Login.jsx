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
        <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: "40px auto", display: "flex", flexDirection: "column", gap: "10px" }}>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" disabled={submitting}>
                {submitting ? "Logging in..." : "Login"}
            </button>
            <p>
                No account? <Link to="/register">Register</Link>
            </p>
        </form>
    );
}

export default Login;
