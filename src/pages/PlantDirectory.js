import React, { useState, useEffect } from 'react';
import './PlantDirectory.css';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function PlantDirectory() {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [plants, setPlants] = useState([]);
    const [filterDifficulty, setFilterDifficulty] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterSunlight, setFilterSunlight] = useState('');

    useEffect(() => {
        async function fetchData() {
            let url = `/api/plants?search=${searchTerm}`;
            if (filterDifficulty) url += `&difficulty=${filterDifficulty}`;
            if (filterType) url += `&type=${filterType}`;
            if (filterSunlight) url += `&sunlight=${filterSunlight}`;

            try {
                const response = await axios.get(url);
                setPlants(response.data);
            } catch (error) {
                console.error("Error fetching the plants:", error);
            }
        }

        fetchData();
    }, [searchTerm, filterDifficulty, filterType, filterSunlight]);


    const addPlantToGarden = async (plantName, plantType) => {
    try {
        const response = await axios.post(`/user/${user.username}/garden`, { plantName, plantType });
        if (response.status === 201) {
            alert('Plant added to garden successfully!');
            setPlants(prevPlants => [...prevPlants, { plantName, plantType }]);
        } else {
            alert('Error adding plant to garden.');
        }
    } catch (error) {
        alert('Error adding plant to garden:', error.message);
    }
    };



    return (
        <div className="directory-container plant-directory">
            <div className="filter-sidebar">
                <h3>Filter by:</h3>

                {/* Search Input */}
                <input 
                    type="text" 
                    placeholder="Search plants..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />

                {/* Difficulty Filter */}
                <label>Difficulty:</label>
                <select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)}>
                    <option value="">All</option>
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Difficult">Difficult</option>
                </select>

                {/* Type Filter */}
                <label>Type:</label>
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <option value="">All</option>
                    <option value="Succulent">Succulent</option>
                    <option value="Herb">Herb</option>
                    <option value="Vine">Vine</option>
                    <option value="Flower">Flower</option>
                    <option value="Ficus">Ficus</option>
                    <option value="Fern">Fern</option>
                    <option value="Palm">Palm</option>
                    <option value="Foliage Plant">Foliage Plant</option>
                    <option value="Epiphyte">Epiphyte</option>
                    <option value="Bromeliad">Bromeliad</option>
                    <option value="Conifer">Conifer</option>
                    <option value="Tropical Plant">Tropical Plant</option>
                    <option value="Cactus">Cactus</option>
                    <option value="Dracaena">Dracaena</option>
                </select>

                {/* Sunlight Filter */}
                <label>Sunlight:</label>
                <select value={filterSunlight} onChange={(e) => setFilterSunlight(e.target.value)}>
                    <option value="">All</option>
                    <option value="Direct sunlight">Direct sunlight</option>
                    <option value="Indirect sunlight">Indirect sunlight</option>
                    <option value="Partial sunlight">Partial sunlight</option>
                    <option value="Direct to partial sunlight">Direct to partial sunlight</option>
                    <option value="Indirect to partial sunlight">Indirect to partial sunlight</option>
                    <option value="Shade">Shade</option>
                </select>
            </div>

            <div className="plants-main-content">
                <div className="plants-container">
                    {plants.map(plant => (
                        <div key={plant._id} className="plant-card">
                            <h3>{plant.name}</h3>
                            <p><strong>Scientific Name:</strong> {plant.scientificName}</p>
                            <p><strong>Water Frequency:</strong> {plant.waterFrequency}</p>
                            <p><strong>Difficulty:</strong> {plant.difficulty}</p>
                            <p><strong>Sunlight:</strong> {plant.sunlight}</p>
                            <p><strong>Type:</strong> {plant.type}</p>
                            <p>{plant.about}</p>
                            <button onClick={() => addPlantToGarden(plant.name, plant.type)}>+</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PlantDirectory;

