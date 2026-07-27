import React from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import EventPage from './pages/EventPage';
import './App.css';

function App() {
    return (
        <div className="App">
            <Navbar />
            <div className="content">
                <HomePage />
                <EventPage />

            </div>
        </div>
    );
}

export default App;