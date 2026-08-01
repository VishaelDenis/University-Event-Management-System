import React from "react";

function Contact() {
    return (
        <div className="page-section">
            <span className="eyebrow">Get In Touch</span>
            <h2>Contact Us</h2>
            <div className="page-card">
                <p>📧 <strong>Email:</strong> support@university-events.edu</p>
                <p>📞 <strong>Phone:</strong> +1 (555) 123-4567</p>
                <p>📍 <strong>Office:</strong> Student Affairs Building, Room 204</p>
                <p className="muted" style={{ marginTop: "16px" }}>
                    Our support team is available Monday through Friday, 9 AM – 5 PM.
                </p>
            </div>
        </div>
    );
}

export default Contact;
