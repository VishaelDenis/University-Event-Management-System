import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import AdminDashboard from "../components/admin/AdminDashboard";
import OrganizerDashboard from "../components/organizer/OrganizerDashboard";
import StudentDashboard from "../components/student/StudentDashboard";
import NotFound from "../pages/NotFound";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/organizer" element={<OrganizerDashboard />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;