// CareReminder.js

import React from 'react';
import './CareReminder.css';

function CareReminder() {
    return (
        <div className="care-reminder-container">
            <div className="care-reminder-content">
                <h2>Today's Plant Care Reminders:</h2>
                <ul>
                    <li>Water your Fiddle Leaf Fig</li>
                    <li>Prune your Rose Plant</li>
                    <li>Feed fertilizer to your Snake Plant</li>
                    <li>Mist your Air Plants</li>
                </ul>
            </div>
        </div>
    );
}

export default CareReminder;

