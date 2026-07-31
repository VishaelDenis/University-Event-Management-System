import React from 'react';
import VenueManagement from './VenueManagement/VenueManagement';

const OrganizerDashboard = () => {
    return (
        <div className="organizer-dashboard p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Organizer Dashboard</h1>
                <p className="text-gray-500">Manage your events and venues</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Venue Management Section */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <VenueManagement />
                </div>
            </div>
        </div>
    );
};

export default OrganizerDashboard;