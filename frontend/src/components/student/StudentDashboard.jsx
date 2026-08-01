import React, { useState, useEffect, useRef, useCallback } from "react";
import Sidebar from "../common/Sidebar";
import AvailableEvents from "./AvailableEvents";
import BookingList from "./BookingManagement/BookingList";
import BookingForm from "./BookingManagement/BookingForm";
import BookingFilters from "./BookingManagement/BookingFilters";
import FeedbackForm from "./FeedbackManagement/FeedbackForm";
import FeedbackList from "./FeedbackManagement/FeedbackList";
import FeedbackFilters from "./FeedbackManagement/FeedbackFilters";
import HelpForm from "./HelpManagement/HelpForm";
import HelpList from "./HelpManagement/HelpList";
import HelpFilters from "./HelpManagement/HelpFilters";
import { useAuth } from "../../hooks/useAuth";

const SECTIONS = [
    { id: "available-events", icon: "📋", label: "Available Events" },
    { id: "book-event", icon: "📅", label: "Book an Event" },
    { id: "my-bookings", icon: "🎫", label: "My Bookings" },
    { id: "submit-feedback", icon: "⭐", label: "Submit Feedback" },
    { id: "my-feedback", icon: "💬", label: "My Feedback" },
    { id: "submit-help", icon: "🆘", label: "Submit Help Request" },
    { id: "my-help", icon: "📝", label: "My Help Requests" },
];

function StudentDashboard() {
    const { user } = useAuth();
    const [activeSection, setActiveSection] = useState("available-events");
    const sectionRefs = useRef({});
    const observerRef = useRef(null);

    const [editingBooking, setEditingBooking] = useState(null);
    const [editingFeedback, setEditingFeedback] = useState(null);
    const [editingHelp, setEditingHelp] = useState(null);
    const [statusFilter, setStatusFilter] = useState("");
    const [feedbackFilter, setFeedbackFilter] = useState("");
    const [helpStatusFilter, setHelpStatusFilter] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSuccess = () => {
        setEditingBooking(null);
        setEditingFeedback(null);
        setEditingHelp(null);
        setRefreshKey((k) => k + 1);
    };

    // Intersection Observer to track visible section
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

    const studentId = user.userId;

    return (
        <div className="dashboard">
            <div className="dashboard-hero dashboard-hero-student">
                <div className="dashboard-hero-overlay" />
                <div className="dashboard-hero-content">
                    <span className="eyebrow eyebrow-light">Student Panel</span>
                    <h2>Welcome back, {user.name.split(" ")[0]}</h2>
                    <p>Book events, track your registrations, and share feedback — all from one place.</p>
                </div>
            </div>

            <div className="dashboard-layout">
                <Sidebar sections={SECTIONS} activeSection={activeSection} onNavigate={handleNavigate} />

                <div className="dashboard-content">
                    <div id="available-events" className="dashboard-section" ref={(el) => (sectionRefs.current["available-events"] = el)}>
                        <h3>📋 Available Events</h3>
                        <AvailableEvents />
                    </div>

                    <div id="book-event" className="dashboard-section">
                        <h3>{editingBooking ? "Update Booking Count" : "📅 Book an Event"}</h3>
                        <BookingForm
                            studentId={studentId}
                            editingBooking={editingBooking}
                            onSuccess={handleSuccess}
                            onCancel={() => setEditingBooking(null)}
                        />
                    </div>

                    <div id="my-bookings" className="dashboard-section">
                        <h3>🎫 My Bookings</h3>
                        <BookingFilters onFilter={setStatusFilter} />
                        <BookingList
                            studentId={studentId}
                            statusFilter={statusFilter}
                            refreshKey={refreshKey}
                            onEdit={setEditingBooking}
                        />
                    </div>

                    <div id="submit-feedback" className="dashboard-section">
                        <h3>{editingFeedback ? "Edit Feedback" : "⭐ Submit Feedback"}</h3>
                        <FeedbackForm
                            studentId={studentId}
                            editingFeedback={editingFeedback}
                            onSuccess={handleSuccess}
                            onCancel={() => setEditingFeedback(null)}
                        />
                    </div>

                    <div id="my-feedback" className="dashboard-section">
                        <h3>💬 My Feedback</h3>
                        <FeedbackFilters onFilter={setFeedbackFilter} />
                        <FeedbackList
                            studentId={studentId}
                            refreshKey={refreshKey}
                            ratingFilter={feedbackFilter}
                            onEdit={setEditingFeedback}
                        />
                    </div>

                    <div id="submit-help" className="dashboard-section">
                        <h3>{editingHelp ? "Edit Help Request" : "🆘 Submit Help Request"}</h3>
                        <HelpForm
                            studentId={studentId}
                            editingHelp={editingHelp}
                            onSuccess={handleSuccess}
                            onCancel={() => setEditingHelp(null)}
                        />
                    </div>

                    <div id="my-help" className="dashboard-section">
                        <h3>📝 My Help Requests</h3>
                        <HelpFilters onFilter={setHelpStatusFilter} />
                        <HelpList
                            studentId={studentId}
                            statusFilter={helpStatusFilter}
                            refreshKey={refreshKey}
                            onEdit={setEditingHelp}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;
