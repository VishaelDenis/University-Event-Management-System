import React from "react";

const ROLES = ["ALL", "STUDENT", "ORGANIZER", "ADMIN"];

function UserFilters({ filters, onChange }) {
    const handleSearchChange = (e) => {
        onChange({ ...filters, search: e.target.value });
    };

    const handleRoleChange = (e) => {
        onChange({ ...filters, role: e.target.value });
    };

    return (
        <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
            <input
                type="text"
                placeholder="Search by name or email"
                value={filters.search}
                onChange={handleSearchChange}
                style={{ flex: 1 }}
            />
            <select value={filters.role} onChange={handleRoleChange}>
                {ROLES.map((role) => (
                    <option key={role} value={role}>
                        {role === "ALL" ? "All roles" : role}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default UserFilters;
