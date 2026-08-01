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
            // Register also returns a token, so log the user straight in.
            login(res.data);
            navigate("/student");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: "40px auto", display: "flex", flexDirection: "column", gap: "10px" }}>
            <h2>Register</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
            />
            <input
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
            />
            <input
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={6}
            />
            <button type="submit" disabled={submitting}>
                {submitting ? "Creating account..." : "Register"}
            </button>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </form>
    );
}

export default Register;
