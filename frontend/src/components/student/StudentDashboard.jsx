import React from "react";
import BookingManagement from "./BookingManagement/BookingManagement";

function StudentDashboard() {
    return (
        <div>
            <h2>Student Dashboard</h2>
            <BookingManagement />
            {/* TODO: FeedbackManagement, HelpManagement */}
        </div>
    );
}

export default StudentDashboard;