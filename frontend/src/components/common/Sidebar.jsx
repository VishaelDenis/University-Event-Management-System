import React, { useState, useEffect } from "react";

function Sidebar({ sections, activeSection, onNavigate }) {
    return (
        <aside className="dashboard-sidebar">
            <div className="sidebar-header">Navigation</div>
            <nav className="sidebar-nav">
                {sections.map((section) => {
                    const isActive = activeSection === section.id;
                    return (
                        <button
                            key={section.id}
                            className={`sidebar-link ${isActive ? "active" : ""}`}
                            onClick={() => onNavigate(section.id)}
                            title={section.label}
                        >
                            <span className="sidebar-icon">{section.icon}</span>
                            <span className="sidebar-label">{section.label}</span>
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}

export default Sidebar;

