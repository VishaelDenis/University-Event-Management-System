import React, { useState } from 'react';

const VenueFilters = ({ onApplyFilters, onClearFilters }) => {
    const [filters, setFilters] = useState({
        name: '',
        minCapacity: '',
        maxCapacity: '',
        location: '',
        isAvailable: ''
    });

    const [isExpanded, setIsExpanded] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Clean up filters (remove empty values)
        const cleanFilters = {};
        Object.keys(filters).forEach(key => {
            if (filters[key] !== '' && filters[key] !== null && filters[key] !== undefined) {
                // Convert isAvailable to boolean if selected
                if (key === 'isAvailable' && filters[key] !== '') {
                    cleanFilters[key] = filters[key] === 'true';
                } else {
                    cleanFilters[key] = filters[key];
                }
            }
        });
        onApplyFilters(cleanFilters);
    };

    const handleClear = () => {
        setFilters({
            name: '',
            minCapacity: '',
            maxCapacity: '',
            location: '',
            isAvailable: ''
        });
        onClearFilters();
    };

    return (
        <div className="venue-filters bg-gray-50 rounded-lg border border-gray-200 p-4 mb-5">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    <h3 className="text-sm font-medium text-gray-700">Filters</h3>
                    <span className="text-xs text-gray-400">
                        {Object.values(filters).some(v => v !== '') ? '(Active)' : ''}
                    </span>
                </div>
                <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {isExpanded && (
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {/* Name Filter */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Venue Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={filters.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Search by name"
                            />
                        </div>

                        {/* Min Capacity */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Min Capacity
                            </label>
                            <input
                                type="number"
                                name="minCapacity"
                                value={filters.minCapacity}
                                onChange={handleChange}
                                min="1"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., 50"
                            />
                        </div>

                        {/* Max Capacity */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Max Capacity
                            </label>
                            <input
                                type="number"
                                name="maxCapacity"
                                value={filters.maxCapacity}
                                onChange={handleChange}
                                min="1"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., 200"
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={filters.location}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="City or building"
                            />
                        </div>

                        {/* Availability */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Availability
                            </label>
                            <select
                                name="isAvailable"
                                value={filters.isAvailable}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            >
                                <option value="">All</option>
                                <option value="true">Available</option>
                                <option value="false">Unavailable</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4 flex gap-3">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition duration-200 text-sm"
                        >
                            Apply Filters
                        </button>
                        <button
                            type="button"
                            onClick={handleClear}
                            className="bg-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-400 transition duration-200 text-sm"
                        >
                            Clear All
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default VenueFilters;