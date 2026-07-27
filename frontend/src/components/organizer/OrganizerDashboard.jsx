import React, { useState } from "react";
import EventList from "./EventManagement/EventList";
import EventForm from "./EventManagement/EventForm";

function OrganizerDashboard() {
    // TEMP for testing: type in whatever user_id from your `users` table is an organizer.
    // Replace this with real logged-in user id from AuthContext once login is implemented.
    const [organizerId, setOrganizerId] = useState(2);

    const [editingEvent, setEditingEvent] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSuccess = () => {
        setEditingEvent(null);
        setRefreshKey((k) => k + 1);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Organizer Dashboard</h2>

            <div style={{ marginBottom: "15px" }}>
                <label>Testing as Organizer (User) ID: </label>
                <input
                    type="number"
                    value={organizerId}
                    onChange={(e) => setOrganizerId(Number(e.target.value))}
                />
            </div>

            <h3>{editingEvent ? "Edit Event" : "Create Event"}</h3>
            <EventForm
                organizerId={organizerId}
                editingEvent={editingEvent}
                onSuccess={handleSuccess}
                onCancel={() => setEditingEvent(null)}
            />

            <h3>My Events</h3>
            <EventList key={refreshKey} organizerId={organizerId} onEdit={setEditingEvent} />

            {/* TODO (Nilakshy): Venue Management section goes here */}
        </div>
    );
}

export default OrganizerDashboard;