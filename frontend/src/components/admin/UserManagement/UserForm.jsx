import React, { useState } from "react";

const ROLES = ["STUDENT", "ORGANIZER", "ADMIN"];

function UserForm({ user, onSave, onCancel }) {
    const [role, setRole] = useState(user.role);
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (role === user.role) {
            onCancel();
            return;
        }
        setSaving(true);
        try {
            await onSave(role);
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-card" style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                Editing <strong style={{ color: "var(--text)" }}>{user.name}</strong> ({user.email})
            </span>
            <select value={role} onChange={(e) => setRole(e.target.value)} style={{ padding: "8px 12px" }}>
                {ROLES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                ))}
            </select>
            <button type="submit" className="btn btn-primary-sm" disabled={saving}>
                {saving ? "Saving..." : "Save"}
            </button>
            <button type="button" className="btn btn-secondary-sm" onClick={onCancel} disabled={saving}>Cancel</button>
        </form>
    );
}

export default UserForm;
