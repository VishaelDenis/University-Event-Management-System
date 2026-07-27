import React, { useEffect, useState } from "react";
import api from "../../../api/axios";

function VenueList() {
    const [venues, setVenues] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get("/venues")
            .then((res) => setVenues(res.data))
            .catch(() => setError("Could not load venues (endpoint may not be implemented yet)"));
    }, []);

    if (error) return <p>{error}</p>;

    return (
        <div>
            <h4>Existing Venues (for reference)</h4>
            <table border="1" cellPadding="6">
                <thead>
                <tr><th>Venue ID</th><th>Name</th><th>Capacity</th></tr>
                </thead>
                <tbody>
                {venues.map((v) => (
                    <tr key={v.venueId}>
                        <td>{v.venueId}</td>
                        <td>{v.name}</td>
                        <td>{v.capacity}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default VenueList;