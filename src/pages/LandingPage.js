// LandingPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
    return (
        <div className="landing-container">
            <h1>Welcome to Thrive!</h1>
            <p>Discover and track your favorite plants. Create an account or log in to get started.</p>
            <Link to="/signup">Create an Account</Link>
            <Link to="/login">Log In</Link>
        </div>
    );
}

export default LandingPage;

