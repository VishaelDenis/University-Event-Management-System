import React from 'react';
import HelpList from './HelpManagement/HelpList';
// Import BookingList and FeedbackList when they are ready
// import BookingList from './BookingManagement/BookingList';
// import FeedbackList from './FeedbackManagement/FeedbackList';

export default function StudentDashboard() {
    return (
        <div className="student-dashboard">
            <h2>Student Dashboard</h2>
            <div className="dashboard-grid">
                {/* Booking Management (Vithusan) */}
                <section className="dashboard-section">
                    <h3>My Bookings</h3>
                    {/* <BookingList /> */}
                    <p className="placeholder">Booking component coming soon...</p>
                </section>

                {/* Feedback Management (Daniel) */}
                <section className="dashboard-section">
                    <h3>My Feedback</h3>
                    {/* <FeedbackList /> */}
                    <p className="placeholder">Feedback component coming soon...</p>
                </section>

                {/* Help Management (Your module) */}
                <section className="dashboard-section help-section">
                    <HelpList />
                </section>
            </div>
        </div>
    );
}