import React, { useState } from "react";

const STATUS_OPTIONS = [
    { value: "", label: "All Statuses" },
    { value: "OPEN", label: "Open" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "RESOLVED", label: "Resolved" },
    { value: "CLOSED", label: "Closed" },
];

function HelpFilters({ onFilter }) {
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setStatus(value);
        onFilter(value);
    };

    const handleClear = () => {
        setStatus("");
        onFilter("");
    };

    return (
        <div className="filters-bar">
            <label>Status:</label>
            <select value={status} onChange={handleChange}>
                {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            <button className="btn btn-secondary-sm" onClick={handleClear}>Clear</button>
        </div>
    );
}

export default HelpFilters;
