import React, { useState, useEffect } from 'react';
import { venueApi } from '../../../services/venue';

const VenueList = ({ onEdit, refreshTrigger, filters = {} }) => {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Load venues on mount, refresh, or filter change
    useEffect(() => {
        loadVenues();
    }, [refreshTrigger, filters]);

    const loadVenues = async () => {
        setLoading(true);
        setError(null);
        try {
            let data;
            // Check if filters are applied
            if (Object.keys(filters).length > 0) {
                data = await venueApi.filterVenues(filters);
            } else {
                data = await venueApi.getAllVenues();
            }
            setVenues(data);
        } catch (err) {
            setError('Failed to load venues. Please try again.');
            console.error('Error loading venues:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            await loadVenues();
            return;
        }
        setLoading(true);
        try {
            const data = await venueApi.searchVenues(searchTerm);
            setVenues(data);
        } catch (err) {
            setError('Search failed. Please try again.');
            console.error('Search error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
            return;
        }
        try {
            await venueApi.deleteVenue(id);
            await loadVenues();
        } catch (err) {
            setError('Failed to delete venue. Please try again.');
            console.error('Delete error:', err);
        }
    };

    const handleToggleAvailability = async (id) => {
        try {
            await venueApi.toggleAvailability(id);
            await loadVenues();
        } catch (err) {
            setError('Failed to update venue availability.');
            console.error('Toggle error:', err);
        }
    };

    if (loading && venues.length === 0) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="text-gray-500 text-lg">Loading venues...</div>
            </div>
        );
    }

    return (
        <div className="venue-list">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-5 flex gap-2">
                <input
                    type="text"
                    placeholder="Search venues by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-5 py-2.5 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Search
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setSearchTerm('');
                        loadVenues();
                    }}
                    className="bg-gray-300 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-400 transition duration-200"
                >
                    Clear
                </button>
            </form>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                    <span className="font-medium">Error:</span> {error}
                </div>
            )}

            {/* Results Count */}
            <div className="text-sm text-gray-500 mb-3">
                {venues.length} venue{venues.length !== 1 ? 's' : ''} found
            </div>

            {/* Venues Grid */}
            {venues.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-gray-500 text-lg">No venues found</p>
                    <p className="text-gray-400 text-sm">Click "Add New Venue" to create one</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {venues.map((venue) => (
                        <div
                            key={venue.venueId}
                            className={`bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition duration-200 ${
                                !venue.isAvailable ? 'opacity-60 bg-gray-50' : ''
                            }`}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold text-gray-800 truncate" title={venue.name}>
                                    {venue.name}
                                </h3>
                                <span
                                    className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                                        venue.isAvailable
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}
                                >
                                    {venue.isAvailable ? 'Available' : 'Unavailable'}
                                </span>
                            </div>

                            {/* Details */}
                            <div className="space-y-1.5 text-sm text-gray-600">
                                <p className="flex items-center gap-2">
                                    <span className="font-medium">Capacity:</span>
                                    <span>{venue.capacity} people</span>
                                </p>
                                {venue.location && (
                                    <p className="flex items-center gap-2">
                                        <span className="font-medium">📍</span>
                                        <span>{venue.location}</span>
                                    </p>
                                )}
                                {venue.description && (
                                    <p className="text-gray-500 text-xs line-clamp-2 mt-1">
                                        {venue.description}
                                    </p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap gap-2">
                                <button
                                    onClick={() => onEdit(venue)}
                                    className="bg-yellow-500 text-white px-3.5 py-1.5 rounded-lg hover:bg-yellow-600 transition text-sm flex items-center gap-1"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleToggleAvailability(venue.venueId)}
                                    className={`px-3.5 py-1.5 rounded-lg transition text-sm flex items-center gap-1 ${
                                        venue.isAvailable
                                            ? 'bg-orange-500 hover:bg-orange-600'
                                            : 'bg-green-500 hover:bg-green-600'
                                    } text-white`}
                                >
                                    {venue.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                                </button>
                                <button
                                    onClick={() => handleDelete(venue.venueId, venue.name)}
                                    className="bg-red-500 text-white px-3.5 py-1.5 rounded-lg hover:bg-red-600 transition text-sm flex items-center gap-1"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VenueList;