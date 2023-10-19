import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Journal.css';


const Journal = () => {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await axios.get(`/user/${user.username}/journal`);
                if (response.status === 200) {
                    setEntries(response.data);
                }
            } catch (error) {
                console.error("Error fetching journal entries:", error.message);
            }
        };

        fetchEntries();
    }, [user.username]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/user/${user.username}/journal`, { title, content });
            if (response.status === 201) {
                alert('Journal entry added successfully!');
                const currentDate = new Date();
                setEntries(prevEntries => [...prevEntries, { title, content, date: currentDate }]);
                setTitle('');
                setContent('');
            } else {
                alert('Error adding journal entry.');
            }
        } catch (error) {
            alert('Error adding journal entry:', error.message);
        }
    };

    const renderJournalEntry = (entry) => {
        const formattedDate = new Date(entry.date).toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    
        return (
            <div className="journal-entry" key={entry.date}>
                <h3>{entry.title}</h3>
                <p>{entry.content}</p>
                <small>{formattedDate}</small>
            </div>
        );
    };


    return (
        <div className="journal-container">
            <h2>Add Journal Entry</h2>
            <form onSubmit={handleSubmit} className="journal-form">
                <div className="journal-input">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        required
                        className="journal-title"
                    />
                </div>
                <div className="journal-textarea">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Content"
                        required
                        className="journal-content"
                    />
                </div>
                <div className="journal-btn-container">
                    <button type="submit" className="journal-btn">Add Entry</button>
                </div>
            </form>

            <h2>Your Journal Entries</h2>
            <div className="journal-entries">
                {entries.map(entry => renderJournalEntry(entry))}
            </div>
        </div>
    );
}

export default Journal;

