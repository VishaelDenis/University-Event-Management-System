import React, { useState } from "react";

function FeedbackFilters({ onFilter }) {
    const [minRating, setMinRating] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setMinRating(value);
        onFilter(value);
    };

    const handleClear = () => {
        setMinRating("");
        onFilter("");
    };

    return (
        <div className="filters-bar">
            <label>Minimum Rating:</label>
            <select value={minRating} onChange={handleChange}>
                <option value="">All Ratings</option>
                <option value="5">5 ★</option>
                <option value="4">4 ★ and above</option>
                <option value="3">3 ★ and above</option>
                <option value="2">2 ★ and above</option>
                <option value="1">1 ★ and above</option>
            </select>
            <button className="btn btn-secondary-sm" onClick={handleClear}>Clear</button>
        </div>
    );
}

export default FeedbackFilters;
