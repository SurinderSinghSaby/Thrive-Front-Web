import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import PrivateComponent from './components/Functional/PrivateComponent';

import LandingPage from './pages/LandingPage';
import MainLayout from './pages/MainLayout';
import HomePage from './pages/HomePage';
import UserGarden from './pages/UserGarden';
import PlantDirectory from './pages/PlantDirectory';
import Journal from './pages/Journal';
import Marketplace from './pages/Marketplace';
import Login from './pages/Login';
import SignUp from './pages/SignUp';


function App() {
    return (
        <AuthProvider>
            <Router>
                <MainLayout>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/landing" element={<LandingPage />} />
                        <Route path="/" element={<PrivateComponent />} >
                            <Route index element={<HomePage />} />
                            <Route path="/my-garden" element={<UserGarden />} />
                            <Route path="/directory" element={<PlantDirectory />} />
                            <Route path="/journal" element={<Journal />} />
                            <Route path="/marketplace" element={<Marketplace />} />
                        </Route>
                    </Routes>
                </MainLayout>
            </Router>
        </AuthProvider>
    );
}

export default App;


