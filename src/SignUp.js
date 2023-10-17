import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';



const SignUp = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/signup', userData);
            console.log("SignUp component rendered");

            if (response.status === 200) {
                setUser(response.data.user); 
                console.log('User registered successfully:', response.data.user);
            } else {
                console.error('Error registering user:', response.data.message);
            }
    } catch (error) {
    console.error('Error registering user:', error.response ? error.response.data.message : error.message);
}

    };

    const navigateToLogin = () => {
        navigate('/login'); 
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={userData.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={handleChange}
                />
                <button type="submit">Sign Up</button>
            </form>
            <button onClick={navigateToLogin}>Already have an account? Log In</button>
        </div>
    );
}

export default SignUp;

