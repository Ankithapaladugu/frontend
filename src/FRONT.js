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

    const handleSelectChange = (selected) => {
        setSelectedOptions(selected || []);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>API Input</h1>
            <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='{"data":["M","1","334","4","B"]}'
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
                            { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
                        ]}
                        onChange={handleSelectChange}
                        styles={customSelectStyles}
                    />

                    <div style={styles.results}>
                        {selectedOptions.map((option) => (
                            <div key={option.value} style={styles.result}>
                                <h3>{option.label}</h3>
                                <p>{JSON.stringify(responseData[option.value])}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        width: '50%',
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
        backgroundColor: '#d4edda',
        color: '#000',
    },
};

const customSelectStyles = {
    control: (provided) => ({
        ...provided,
        marginBottom: '20px',
        fontSize: '16px',
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: '#007bff',
        color: '#fff',
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: '#fff',
    }),
};

export default FRONT;
