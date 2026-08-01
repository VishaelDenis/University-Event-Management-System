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
        <div className="filters-bar">
            <input
                type="text"
                className="search-bar"
                placeholder="Search by name or email"
                value={filters.search}
                onChange={handleSearchChange}
                style={{ flex: 1, maxWidth: "320px" }}
            />
            <label>Role:</label>
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
