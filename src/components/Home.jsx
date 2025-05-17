// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import '../cssfiles/Home.css'; // Assuming you have a separate CSS file for home page styling

const Home = () => {
  const navigate = useNavigate(); // Create a navigate function using useNavigate()

  const handleGetStartedClick = () => {
    navigate('/register');  // Navigate to the signup page when clicked
  };

  return (
   <>
 
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to Exam Portal</h1>
        <p className="home-description">
          Get ready for your exams with the best resources and tools at your fingertips.
        </p>
        <button onClick={handleGetStartedClick}>Get Started</button>
      </div>
    </div>
    </>
  );
};

export default Home;