import React from 'react';

const HomePage = () => {
    return (
        <div style={{
            maxWidth: '900px',
            margin: '60px auto',
            padding: '40px 20px',
            textAlign: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
            border: '1px solid #D0E0E5'
        }}>
            <div style={{ fontSize: '56px', marginBottom: '10px' }}>
                🌀
            </div>

            <h1 style={{
                fontSize: '36px',
                fontWeight: '600',
                color: '#1A3A4A',
                margin: '10px 0 8px 0',
                letterSpacing: '-0.5px'
            }}>
                University Event Manager
            </h1>

            <p style={{
                fontSize: '18px',
                color: '#3A6B7A',
                marginBottom: '30px',
                fontWeight: '400'
            }}>
                Plan. Organize. Celebrate.
            </p>

            <p style={{
                fontSize: '16px',
                color: '#2C4A5A',
                maxWidth: '500px',
                margin: '0 auto 40px auto',
                lineHeight: '1.7',
                backgroundColor: '#F0F5F7',
                padding: '16px 24px',
                borderRadius: '40px',
                border: '1px solid #D0E0E5'
            }}>
                A simple space to manage events, venues, and feedback. All in one place.
            </p>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '14px'
            }}>
                <button style={{
                    backgroundColor: '#2A6F7A',
                    color: 'white',
                    padding: '12px 28px',
                    border: 'none',
                    borderRadius: '40px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: '0.3s',
                    boxShadow: '0 2px 8px rgba(42, 111, 122, 0.3)'
                }}>
                    Events
                </button>

                <button style={{
                    backgroundColor: '#3A8B9A',
                    color: 'white',
                    padding: '12px 28px',
                    border: 'none',
                    borderRadius: '40px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: '0.3s',
                    boxShadow: '0 2px 8px rgba(58, 139, 154, 0.3)'
                }}>
                    Venues
                </button>

                <button style={{
                    backgroundColor: '#5BA3B3',
                    color: 'white',
                    padding: '12px 28px',
                    border: 'none',
                    borderRadius: '40px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: '0.3s',
                    boxShadow: '0 2px 8px rgba(91, 163, 179, 0.3)'
                }}>
                    Feedback
                </button>
            </div>

            <p style={{
                marginTop: '40px',
                fontSize: '13px',
                color: '#7A9BA8',
                borderTop: '1px solid #D0E0E5',
                paddingTop: '20px'
            }}>
                ✦ built with ☕ and intention ✦
            </p>
        </div>
    );
};

export default HomePage;