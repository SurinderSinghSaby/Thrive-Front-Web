import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

function Header() {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn, setUser } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = async () => {
        try {
            const response = await axios.get('http://localhost:3001/logout');
            if (response.status === 200) {
                setUser(null);
                setIsLoggedIn(false);
                navigate('/landing');
            } else {
                console.error('Error logging out:', response.data.message);
            }
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

    return (
        <header>
            <div>Logo Here</div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/directory">Plant Directory</Link>
                <Link to="/my-garden">My Garden</Link>
                <Link to="/journal">Journal</Link>
                <Link to="/marketplace">Marketplace</Link>
            </nav>
            { isLoggedIn && (
                <div onClick={() => setShowDropdown(!showDropdown)}>
                    User Profile
                    { showDropdown && (
                        <div className="dropdown">
                            <Link to="/about">About</Link>
                            <button onClick={handleLogout}>Sign Out</button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}

export default Header;

