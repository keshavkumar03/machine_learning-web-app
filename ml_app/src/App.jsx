import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

const App = () => {
  const [sepalLength, setSepalLength] = useState('');
  const [sepalWidth, setSepalWidth] = useState('');
  const [petalLength, setPetalLength] = useState('');
  const [petalWidth, setPetalWidth] = useState('');
  const [predictedSpecies, setPredictedSpecies] = useState('');

  const predictSpecies = async (formData) => {
    try {
      const response = await axios.post('http://localhost:8000/predict/', formData);
      return response.data.species; // Assuming the response structure is { "species": "predicted_species_name" }
    } catch (error) {
      console.error('Error predicting:', error);
      throw error;
    }
  };

  const handlePredictClick = async (event) => {
    event.preventDefault(); // Prevents default form submission

    const formData = {
      sepal_length: parseFloat(sepalLength),
      sepal_width: parseFloat(sepalWidth),
      petal_length: parseFloat(petalLength),
      petal_width: parseFloat(petalWidth),
    };

    try {
      const species = await predictSpecies(formData);
      setPredictedSpecies(species);
    } catch (error) {
      // Handle error if necessary
    }
  };

  return (
    <div>
      <h1>Machine Learning Model Prediction</h1>
      <form onSubmit={handlePredictClick}>
        <label>
          Sepal Length:
          <input
            type="number"
            value={sepalLength}
            onChange={(e) => setSepalLength(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Sepal Width:
          <input
            type="number"
            value={sepalWidth}
            onChange={(e) => setSepalWidth(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Petal Length:
          <input
            type="number"
            value={petalLength}
            onChange={(e) => setPetalLength(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Petal Width:
          <input
            type="number"
            value={petalWidth}
            onChange={(e) => setPetalWidth(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Predict Species</button>
      </form>
      
      {predictedSpecies && (
        <div>
          <h2>Predicted Species:</h2>
          <p>{predictedSpecies}</p>
        </div>
      )}
    </div>
  );
};

export default App;
