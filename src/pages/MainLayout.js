import React from 'react';
import Header from '../components/UI/Header';
import Footer from '../components/UI/Footer';
import './MainLayout.css';

function MainLayout({ children }) {
    return (
        <>
            <div className="container">
                <Header />

                <main className="main-content">
                    {children}  {/* This will be the main content of the page */}
                </main>
            </div>
            <Footer />
        </>
    );
}

export default MainLayout;

