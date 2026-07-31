import React, { useState } from 'react';

export default function HelpFilters({ events, onFilter }) {
    const [filters, setFilters] = useState({
        status: '',
        eventId: '',
        search: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        onFilter(newFilters);
    };

    const clearFilters = () => {
        const empty = { status: '', eventId: '', search: '' };
        setFilters(empty);
        onFilter(empty);
    };

    return (
        <div className="help-filters">
            <input
                type="text"
                name="search"
                placeholder="Search by keyword..."
                value={filters.search}
                onChange={handleChange}
                className="filter-input"
            />
            <select name="status" value={filters.status} onChange={handleChange} className="filter-select">
                <option value="">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="RESOLVED">Resolved</option>
            </select>
            <select name="eventId" value={filters.eventId} onChange={handleChange} className="filter-select">
                <option value="">All Events</option>
                {events.map(ev => (
                    <option key={ev.id} value={ev.id}>{ev.name}</option>
                ))}
            </select>
            <button onClick={clearFilters} className="btn-clear">Clear</button>
        </div>
    );
}