import React, { useState } from "react";

function BookingFilters({ onFilter }) {
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
            <label>Filter by status:</label>
            <select value={status} onChange={handleChange}>
                <option value="">All</option>
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="CANCELLED">Cancelled</option>
            </select>
            <button className="btn btn-secondary-sm" onClick={handleClear}>Clear</button>
        </div>
    );
}

export default BookingFilters;
