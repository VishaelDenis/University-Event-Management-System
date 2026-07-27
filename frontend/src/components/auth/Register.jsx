import React, { useState } from "react";

function Register() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO (Karikalan): call register API
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <input placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <input placeholder="Password" type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;