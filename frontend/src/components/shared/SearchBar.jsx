import React, { useState } from "react";

function SearchBar({ onSearch, placeholder = "Search..." }) {
    const [query, setQuery] = useState("");
    return (
        <input
            className="search-bar"
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
                setQuery(e.target.value);
                onSearch(e.target.value);
            }}
        />
    );
}

export default SearchBar;
