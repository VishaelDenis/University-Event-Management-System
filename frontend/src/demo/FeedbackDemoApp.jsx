// FOR LOCAL/STANDALONE TESTING ONLY.
//
// A tiny stand-in for StudentDashboard.jsx so you can see the feedback
// module render and work end to end before it's wired into the real
// dashboard. Point your app's entry file (main.jsx / index.js) at this
// component temporarily, e.g.:
//
//   import FeedbackDemoApp from './demo/FeedbackDemoApp';
//   ReactDOM.createRoot(document.getElementById('root')).render(<FeedbackDemoApp />);
//
// Delete this whole demo/ folder once StudentDashboard.jsx is wired up for
// real (see ../StudentDashboard-wiring.md).

import React from 'react';
import FeedbackList from '../components/student/FeedbackManagement/FeedbackList';
import './feedback-demo.css';

const FeedbackDemoApp = () => {
  return (
    <div className="feedback-demo-shell">
      <h1>Feedback Module — Standalone Test</h1>
      <p>
        Talking to the dummy backend at <code>http://localhost:8080</code>,
        logged in as the seeded dummy student.
      </p>
      <FeedbackList />
    </div>
  );
};

export default FeedbackDemoApp;
