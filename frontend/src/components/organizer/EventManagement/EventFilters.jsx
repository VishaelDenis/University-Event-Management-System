import React, { useState } from "react";

function EventFilters({ onFilter }) {
    const [dateFilter, setDateFilter] = useState("");

    const handleApply = () => onFilter(dateFilter);
    const handleClear = () => {
        setDateFilter("");
        onFilter("");
    };

    return (
        <div>
            <label>Filter by date: </label>
            <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
            <button onClick={handleApply}>Apply</button>
            <button onClick={handleClear}>Clear</button>
        </div>
    );
}

export default EventFilters;