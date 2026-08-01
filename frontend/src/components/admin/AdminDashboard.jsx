import React, { useState, useEffect, useRef, useCallback } from "react";
import Sidebar from "../common/Sidebar";
import UserList from "./UserManagement/UserList";
import AdminReports from "./Reports/AdminReports";
import { useAuth } from "../../hooks/useAuth";

const SECTIONS = [
    { id: "user-management", icon: "👥", label: "User Management" },
    { id: "reports", icon: "📊", label: "Reports" },
];

function AdminDashboard() {
    const { user } = useAuth();
    const [activeSection, setActiveSection] = useState("user-management");
    const observerRef = useRef(null);

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

    return (
        <div className="dashboard">
            <div className="dashboard-hero dashboard-hero-admin">
                <div className="dashboard-hero-overlay" />
                <div className="dashboard-hero-content">
                    <span className="eyebrow eyebrow-light">Admin Panel</span>
                    <h2>Welcome back{user ? `, ${user.name.split(" ")[0]}` : ""}</h2>
                    <p>Manage users, oversee activity, and keep the platform running smoothly.</p>
                </div>
            </div>

            <div className="dashboard-layout">
                <Sidebar sections={SECTIONS} activeSection={activeSection} onNavigate={handleNavigate} />

                <div className="dashboard-content">
                    <div id="user-management" className="dashboard-section">
                        <h3>👥 User Management</h3>
                        <UserList />
                    </div>

                    <div id="reports" className="dashboard-section">
                        <h3>📊 Reports</h3>
                        <AdminReports />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
