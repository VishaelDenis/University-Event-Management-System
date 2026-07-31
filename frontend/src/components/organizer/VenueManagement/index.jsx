import React, { useState } from 'react';
import VenueList from './VenueList';
import VenueForm from './VenueForm';
import VenueFilters from './VenueFilters';

const VenueManagement = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingVenue, setEditingVenue] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [filters, setFilters] = useState({});

    const handleAddNew = () => {
        setEditingVenue(null);
        setShowForm(true);
    };

    const handleEdit = (venue) => {
        setEditingVenue(venue);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingVenue(null);
        setRefreshTrigger(prev => prev + 1);
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setEditingVenue(null);
    };

    const handleApplyFilters = (appliedFilters) => {
        setFilters(appliedFilters);
        setRefreshTrigger(prev => prev + 1);
    };

    const handleClearFilters = () => {
        setFilters({});
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="venue-management p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Venue Management</h1>
                    <p className="text-sm text-gray-500">Manage all event venues</p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Venue
                </button>
            </div>

            {/* Filters */}
            <VenueFilters
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
            />

            {/* Form (shown when adding/editing) */}
            {showForm && (
                <div className="mb-6 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                    <VenueForm
                        venueToEdit={editingVenue}
                        onSuccess={handleFormSuccess}
                        onCancel={handleFormCancel}
                    />
                </div>
            )}

            {/* Venue List */}
            <VenueList
                onEdit={handleEdit}
                refreshTrigger={refreshTrigger}
                filters={filters}
            />
        </div>
    );
};

export default VenueManagement;