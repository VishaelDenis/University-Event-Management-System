import React, { useState } from "react";

const ROLES = ["STUDENT", "ORGANIZER", "ADMIN"];

// Editing an existing user's role. There's no "create user" endpoint on the
// backend (accounts are created via /auth/register), so this form only
// handles the admin action that exists: changing someone's role.
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
        <form
            onSubmit={handleSubmit}
            style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}
        >
            <span>
                Editing <strong>{user.name}</strong> ({user.email})
            </span>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                {ROLES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                ))}
            </select>
            <button type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
            <button type="button" onClick={onCancel} disabled={saving}>Cancel</button>
        </form>
    );
}

export default UserForm;
