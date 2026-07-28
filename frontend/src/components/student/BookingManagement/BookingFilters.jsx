import React from "react";
import SearchBar from "../../shared/SearchBar";

function BookingFilters({ onSearch }) {
    return (
        <div className="booking-filters">
            <SearchBar onSearch={onSearch} />
        </div>
    );
}

export default BookingFilters;
