import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../service/api";

function TypeOfExam() {
  const [selectedExam, setSelectedExam] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to get the token from cookies
  const getToken = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split("; token=");
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  // Check if the token exists on component mount
  useEffect(() => {
    const token = getToken();
    if (!token) {
      // Redirect to login page or show blank page
      navigate("/login");
    }
  }, [navigate]);

  const handleExamSelection = (examType) => {
    setSelectedExam(examType);
  };

  const handleSubmit = async () => {
    if (!selectedExam) {
      alert("Please select an exam type before submitting.");
      return;
    }

    const token = getToken();
    if (!token) {
      alert("You must be logged in to select an exam.");
      return;
    }

    const examId = selectedExam === "java" ? 1 : 2;
    setLoading(true);

    try {
      const response = await axios.get(`/test/${examId}/questions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched Questions:", response.data); // Debugging fetched data

      if (response.status === 200) {
        if (response.data && response.data.length > 0) {
          navigate(`/exam/${examId}`, { state: { questions: response.data, testId: examId } });
        } else {
          alert("No questions found for this exam.");
        }
      } else if (response.status === 403) {
        alert("You have already attempted this exam.");
      }
    } catch (error) {
      console.error("Error fetching resources:", error);

      if (error.response) {
        if (error.response.status === 403) {
          alert("You have already attempted this exam.");
        } else {
          setError("Failed to fetch questions. Please try again.");
        }
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // If no token is available, render nothing
  const token = getToken();
  if (!token) {
    return null; // Blank page if token is not present
  }

  return (
    <div>
      <h1>Which exam are you attending?</h1>
      <div>
        <label>
          <input
            type="radio"
            name="exam"
            value="java"
            onChange={() => handleExamSelection("java")}
          />
          Java
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="exam"
            value="python"
            onChange={() => handleExamSelection("python")}
          />
          Python
        </label>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default TypeOfExam;
