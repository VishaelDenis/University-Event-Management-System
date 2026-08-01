import React, { useState, useEffect, useRef, useCallback } from "react";
import Sidebar from "../common/Sidebar";
import EventList from "./EventManagement/EventList";
import EventForm from "./EventManagement/EventForm";
import VenueForm from "./VenueManagement/VenueForm";
import VenueList from "./VenueManagement/VenueList";
import { useAuth } from "../../hooks/useAuth";

const SECTIONS = [
    { id: "create-event", icon: "➕", label: "Create Event" },
    { id: "my-events", icon: "📅", label: "My Events" },
    { id: "create-venue", icon: "🏛️", label: "Create Venue" },
    { id: "venues", icon: "📍", label: "Venues" },
];

function OrganizerDashboard() {
    const { user } = useAuth();
    const [activeSection, setActiveSection] = useState("create-event");
    const observerRef = useRef(null);

    const [editingEvent, setEditingEvent] = useState(null);
    const [editingVenue, setEditingVenue] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSuccess = () => {
        setEditingEvent(null);
        setEditingVenue(null);
        setRefreshKey((k) => k + 1);
    };

    const sectionIds = SECTIONS.map((s) => s.id);
    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observerRef.current.observe(el);
        });

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, []);

    const handleNavigate = useCallback((sectionId) => {
        setActiveSection(sectionId);
        const el = document.getElementById(sectionId);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, []);

    if (!user) {
        return <div className="loading-container"><div className="loading-spinner" /><p className="loading-text">Loading user information...</p></div>;
    }

    const organizerId = user.userId;

    return (
        <div className="dashboard">
            <div className="dashboard-hero dashboard-hero-organizer">
                <div className="dashboard-hero-overlay" />
                <div className="dashboard-hero-content">
                    <span className="eyebrow eyebrow-light">Organizer Panel</span>
                    <h2>Welcome back, {user.name.split(" ")[0]}</h2>
                    <p>Create events, manage venues, and keep campus activities running smoothly.</p>
                </div>
            </div>

            <div className="dashboard-layout">
                <Sidebar sections={SECTIONS} activeSection={activeSection} onNavigate={handleNavigate} />

                <div className="dashboard-content">
                    <div id="create-event" className="dashboard-section">
                        <h3>{editingEvent ? "✏️ Edit Event" : "➕ Create Event"}</h3>
                        <EventForm
                            organizerId={organizerId}
                            editingEvent={editingEvent}
                            onSuccess={handleSuccess}
                            onCancel={() => setEditingEvent(null)}
                        />
                    </div>

                    <div id="my-events" className="dashboard-section">
                        <h3>📅 My Events</h3>
                        <EventList key={refreshKey} organizerId={organizerId} onEdit={setEditingEvent} />
                    </div>

                    <div id="create-venue" className="dashboard-section">
                        <h3>{editingVenue ? "✏️ Edit Venue" : "🏛️ Create Venue"}</h3>
                        <VenueForm
                            editingVenue={editingVenue}
                            onSuccess={handleSuccess}
                            onCancel={() => setEditingVenue(null)}
                        />
                    </div>

                    <div id="venues" className="dashboard-section">
                        <h3>📍 Venues</h3>
                        <VenueList key={refreshKey} onEdit={setEditingVenue} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrganizerDashboard;
