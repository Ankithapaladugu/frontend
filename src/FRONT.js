import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

function FRONT() {
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {
            const parsedData = JSON.parse(jsonInput);
            setResponseData(null); // Clear previous response
            const response = await axios.post('https://backend-ibwt.onrender.com/bfhl', parsedData);
            setResponseData(response.data);
            setError('');
        } catch (error) {
            if (error.response) {
                setError(`Server Error: ${error.response.data.error}`);
            } else if (error.request) {
                setError('Network error: No response received from server');
            } else if (error instanceof SyntaxError) {
                setError('Invalid JSON format');
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    const handleOptionChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions || []);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Enter JSON Input</h1>
            <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Enter JSON here'
                style={styles.textarea}
            />
            <button onClick={handleSubmit} style={styles.button}>Submit</button>

            {error && (
                <p style={styles.error}>{error}</p>
            )}

            {responseData && (
                <div style={styles.responseContainer}>
                    <h2>Multi Filter</h2>
                    <Select
                        isMulti
                        options={[
                            { value: 'alphabets', label: 'Alphabets' },
                            { value: 'numbers', label: 'Numbers' },
                            { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
                        ]}
                        onChange={handleOptionChange}
                        styles={customStyles}
                    />

                    <div style={styles.results}>
                        {selectedOptions.some(option => option.value === 'alphabets') && (
                            <div style={{ ...styles.result, ...styles.alphabets }}>
                                <h3>Alphabets</h3>
                                <p>{JSON.stringify(responseData.alphabets)}</p>
                            </div>
                        )}
                        {selectedOptions.some(option => option.value === 'numbers') && (
                            <div style={{ ...styles.result, ...styles.numbers }}>
                                <h3>Numbers</h3>
                                <p>{JSON.stringify(responseData.numbers)}</p>
                            </div>
                        )}
                        {selectedOptions.some(option => option.value === 'highest_lowercase_alphabet') && (
                            <div style={{ ...styles.result, ...styles.highestLowercase }}>
                                <h3>Highest Lowercase Alphabet</h3>
                                <p>{JSON.stringify(responseData.highest_lowercase_alphabet)}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        width: '80%',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    textarea: {
        width: '100%',
        height: '100px',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        marginBottom: '10px',
    },
    button: {
        display: 'block',
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
        marginBottom: '20px',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: '20px',
    },
    responseContainer: {
        marginTop: '20px',
        backgroundColor: '#f0f0f0',
        padding: '20px',
        borderRadius: '10px',
    },
    results: {
        marginTop: '20px',
    },
    result: {
        marginBottom: '20px',
        padding: '10px',
        borderRadius: '5px',
        color: '#fff',
    },
    alphabets: {
        backgroundColor: '#4caf50',
    },
    numbers: {
        backgroundColor: '#2196f3',
    },
    highestLowercase: {
        backgroundColor: '#ff9800',
    },
};

const customStyles = {
    control: (base) => ({
        ...base,
        backgroundColor: '#e0e0e0',
        borderRadius: '5px',
        padding: '5px',
        fontSize: '16px',
    }),
    multiValue: (base) => ({
        ...base,
        backgroundColor: '#007bff',
        color: '#fff',
        borderRadius: '5px',
    }),
    multiValueLabel: (base) => ({
        ...base,
        color: '#fff',
    }),
    multiValueRemove: (base) => ({
        ...base,
        color: '#fff',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: '#0056b3',
            color: '#fff',
        },
    }),
};

export default FRONT;

