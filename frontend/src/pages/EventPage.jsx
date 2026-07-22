import React from 'react';
import CreateEventForm from '../components/CreateEventForm';
import EventList from '../components/EventList';

const EventPage = () => {
    const [refresh, setRefresh] = React.useState(false);

    const handleEventCreated = () => {
        setRefresh(!refresh);
    };

    return (
        <div>
            <h1>Event Management</h1>
            <CreateEventForm onEventCreated={handleEventCreated} />
            <EventList key={refresh} />
        </div>
    );
};

export default EventPage;