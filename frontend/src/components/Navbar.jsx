import React from 'react';

function Navbar() {
    return (
        <nav style={{
            backgroundColor: '#1A3A4A',
            padding: '15px 30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#E8F0F2',
            boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
            fontFamily: "'Segoe UI', sans-serif"
        }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#E8F0F2' }}>
                🌊 Event Manager
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
                <span style={labelStyle}>Home</span>
                <span style={labelStyle}>Events</span>
                <span style={labelStyle}>Venues</span>
                <span style={labelStyle}>Feedback</span>
                <span style={{ ...labelStyle, backgroundColor: '#2A6F7A', padding: '8px 16px', borderRadius: '20px' }}>Login</span>
                <span style={{ ...labelStyle, backgroundColor: '#3A8B9A', padding: '8px 16px', borderRadius: '20px' }}>Register</span>
            </div>
        </nav>
    );
}

const labelStyle = {
    color: '#D4E6EC',
    fontSize: '16px',
    padding: '8px 12px',
    borderRadius: '6px',
    fontWeight: '500'
};

export default Navbar;