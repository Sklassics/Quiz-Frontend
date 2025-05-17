
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../cssfiles/Card.css'; // Ensure this CSS file exists for styling

// Utility function to retrieve the token from cookies
const getToken = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split("; token=");
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null; // Return null if token is not found
};

// Define the cards array
const cards = [
  {
    id: 1,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGOmMqGbQpWcyptGdOc8XRDuv2QWFiAhCJtA&s',
    title: 'Java Exam',
  },
  {
    id: 2,
    imageUrl: 'https://miro.medium.com/v2/resize:fit:700/1*3IcLSFuT8PQg4cUBaRXH1A.png',
    title: 'Python Exam',
  },
];

const Cards = () => {
  const navigate = useNavigate();

  // Function to handle card clicks
  const handleCardClick = (id) => {
    const token = getToken();
    if (!token) {
      alert("Invalid token. Please log in again.");
      navigate("/login");
      return;
    }

    console.log("Card ID clicked:", id); // Log the clicked card ID
    navigate(`/exam/${id}`, { state: { testId: id } }); // Pass ID via state
  };

  return (
    <div className="whole">
      <div className="card-container">
        {cards.map((card) => (
          <div
            key={card.id}
            className="card"
            onClick={() => handleCardClick(card.id)} // Pass the card ID to the handler
          >
            <img src={card.imageUrl} alt={card.title} className="card-image" />
            <h3>{card.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
