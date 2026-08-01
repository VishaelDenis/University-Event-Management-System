import React, { useState } from "react";

function EventFilters({ onFilter }) {
    const [dateFilter, setDateFilter] = useState("");

    const handleApply = () => onFilter(dateFilter);
    const handleClear = () => {
        setDateFilter("");
        onFilter("");
    };

    return (
        <div className="filters-bar">
            <label>Filter by date:</label>
            <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
            <button className="btn btn-primary-sm" onClick={handleApply}>Apply</button>
            <button className="btn btn-secondary-sm" onClick={handleClear}>Clear</button>
        </div>
    );
}

export default EventFilters;
