import React, { useState, useEffect } from 'react';
import { venueApi } from '../../../services/venue';

const VenueForm = ({ venueToEdit, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        capacity: '',
        location: '',
        description: '',
        isAvailable: true
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Populate form when editing
    useEffect(() => {
        if (venueToEdit) {
            setFormData({
                name: venueToEdit.name || '',
                capacity: venueToEdit.capacity || '',
                location: venueToEdit.location || '',
                description: venueToEdit.description || '',
                isAvailable: venueToEdit.isAvailable !== undefined ? venueToEdit.isAvailable : true
            });
        }
    }, [venueToEdit]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Validate capacity
            const capacity = parseInt(formData.capacity);
            if (isNaN(capacity) || capacity < 1) {
                throw new Error('Capacity must be a number greater than 0');
            }

            const venueData = {
                ...formData,
                capacity: capacity
            };

            if (venueToEdit) {
                // Update existing venue
                await venueApi.updateVenue(venueToEdit.venueId, venueData);
            } else {
                // Create new venue
                await venueApi.createVenue(venueData);
            }

            // Reset form and notify parent
            setFormData({ name: '', capacity: '', location: '', description: '', isAvailable: true });
            onSuccess();
        } catch (err) {
            setError(err.response?.data || err.message || 'Failed to save venue');
            console.error('Save error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="venue-form">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                    {venueToEdit ? '✏️ Edit Venue' : '➕ Add New Venue'}
                </h2>
                <button
                    onClick={onCancel}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                    <span className="font-medium">Error:</span> {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Venue Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter venue name"
                            maxLength="100"
                        />
                    </div>

                    {/* Capacity */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Capacity <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            required
                            min="1"
                            max="10000"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter max capacity"
                        />
                    </div>

                    {/* Location */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., Main Building, Room 101"
                            maxLength="200"
                        />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder="Enter venue description (optional)"
                            maxLength="500"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            {formData.description?.length || 0}/500 characters
                        </p>
                    </div>

                    {/* Availability */}
                    <div className="md:col-span-2">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="isAvailable"
                                checked={formData.isAvailable}
                                onChange={handleChange}
                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">
                                This venue is available for booking
                            </span>
                        </label>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 pt-4 border-t border-gray-200 flex gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </>
                        ) : (
                            venueToEdit ? 'Update Venue' : 'Add Venue'
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-400 transition duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VenueForm;