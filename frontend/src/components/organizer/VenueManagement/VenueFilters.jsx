import React, { useState } from "react";

function VenueFilters({ onFilter }) {
    const [search, setSearch] = useState("");

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        onFilter(value);
    };

    const handleClear = () => {
        setSearch("");
        onFilter("");
    };

    return (
        <div className="filters-bar">
            <input
                type="text"
                className="search-bar"
                placeholder="Search venues by name..."
                value={search}
                onChange={handleSearchChange}
                style={{ flex: 1, maxWidth: "300px" }}
            />
            <button className="btn btn-secondary-sm" onClick={handleClear}>Clear</button>
        </div>
    );
}

export default VenueFilters;
