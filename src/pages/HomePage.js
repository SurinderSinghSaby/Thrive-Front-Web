// HomePage.js

import React from 'react';
import CareReminder from '../components/Plant/CareReminder';
import WeatherBasedSuggestions from '../components/Plant/WeatherBasedSuggestions';

function HomePage() {
    return (
        <div>
            <WeatherBasedSuggestions />
            <CareReminder />
        </div>
    );
}

export default HomePage;

