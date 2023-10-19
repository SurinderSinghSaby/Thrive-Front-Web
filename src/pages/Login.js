import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LogIn = () => {
    const navigate = useNavigate();
    const { setUser, setIsLoggedIn, isLoggedIn } = useAuth();
    const [errorMessage, setErrorMessage] = useState('');
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrorMessage('');  // Clear error messages when user types
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userData.username || !userData.password) {
            setErrorMessage('Both username and password are required.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/login', userData);

            if (response.status === 200) {
                if (!response.data.user) {
                    setErrorMessage('Error logging in. Please try again.');
                    return;
                }
                setUser(response.data.user);
                setIsLoggedIn(true);
                navigate('/');
            } else {
                setErrorMessage(response.data.message || 'Unknown error occurred. Please try again.');
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message || 'Unknown error occurred. Please try again.');
            } else {
                setErrorMessage('Unknown error occurred. Please try again.');
            }
        }
    };

    const navigateToSignUp = () => {
        navigate('/signup');
    };

    return (
        <div class="login-container">
            <h1 class="login-container__title">Log in!</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input class="login-container__input"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={userData.username}
                    onChange={handleChange}
                />
                <input class="login-container__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={handleChange}
                />
                <button class="login-container__button" type="submit">Log In</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
            <button class="login-container__button" onClick={navigateToSignUp}>Don't have an account? Sign Up</button>
        </div>
    );
}

export default LogIn;

