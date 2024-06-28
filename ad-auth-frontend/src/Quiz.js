import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Quiz = () => {
  const [question] = useState('What is the capital of India?');
  const [selectedOption, setSelectedOption] = useState('');
  const location = useLocation();
  const { username } = location.state;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/submit-quiz', { question, selectedOption, username })
      .then(response => {
        alert('Quiz response saved successfully');
      })
      .catch(error => {
        console.error('Error submitting quiz:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{question}</h2>
      <div>
        <input type="radio" id="option1" name="quiz" value="Delhi" onChange={(e) => setSelectedOption(e.target.value)} />
        <label htmlFor="option1">Delhi</label>
      </div>
      <div>
        <input type="radio" id="option2" name="quiz" value="Mumbai" onChange={(e) => setSelectedOption(e.target.value)} />
        <label htmlFor="option2">Mumbai</label>
      </div>
      <div>
        <input type="radio" id="option3" name="quiz" value="Kolkata" onChange={(e) => setSelectedOption(e.target.value)} />
        <label htmlFor="option3">Kolkata</label>
      </div>
      <div>
        <input type="radio" id="option4" name="quiz" value="Chennai" onChange={(e) => setSelectedOption(e.target.value)} />
        <label htmlFor="option4">Chennai</label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Quiz;
