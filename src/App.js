import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css'; // Import the CSS file

function App() {
  // States for input, response, and selected options
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Options for Multi-Select Dropdown
  const filterOptions = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highestLowercaseAlphabet', label: 'Highest Lowercase Alphabet' }
  ];

  // Handle JSON input change
  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate JSON input
    try {
      JSON.parse(jsonInput);
    } catch (error) {
      alert('Invalid JSON format');
      return;
    }

    try {
      // Make API call to backend
      const res = await axios.post('https://bajajbackend-1.onrender.com/your-endpoint', {
        data: JSON.parse(jsonInput)
      });

      setResponse(res.data); // Update response state with backend response
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data from backend');
    }
  };

  // Handle option selection
  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  // Function to render filtered response based on selected options
  const renderFilteredResponse = () => {
    if (!response) return null;

    let filteredResponse = { ...response }; // Copy response to filter

    // Filter based on selected options
    if (selectedOptions.some(opt => opt.value === 'alphabets')) {
      filteredResponse = filteredResponse.alphabets;
    }
    if (selectedOptions.some(opt => opt.value === 'numbers')) {
      filteredResponse = filteredResponse.numbers;
    }
    if (selectedOptions.some(opt => opt.value === 'highestLowercaseAlphabet')) {
      filteredResponse = filteredResponse.highestLowercaseAlphabet;
    }

    return (
      <div className="response-container">
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Frontend App</h1>
        {/* Form to input JSON */}
        <form onSubmit={handleSubmit} className="form">
          <textarea
            value={jsonInput}
            onChange={handleInputChange}
            placeholder='Enter JSON here'
            rows={5}
            cols={40}
            className="json-input"
          />
          <button type='submit' className="submit-button">Submit</button>
        </form>

        {/* Dropdown for selecting filters */}
        {response && (
          <Select
            isMulti
            options={filterOptions}
            onChange={handleSelectChange}
            className="dropdown"
          />
        )}

        {/* Render response based on filter options */}
        {renderFilteredResponse()}
      </div>
    </div>
  );
}

export default App;
