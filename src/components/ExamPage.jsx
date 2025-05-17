
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../service/api"; // Make sure your axios instance is correctly set up
import "../cssfiles/ExamPage.css";

// Function to get the token from cookies
const getToken = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split("; token=");
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

function ExamPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get state passed via location or fallback to localStorage
  const locationState = location.state || JSON.parse(localStorage.getItem("examState"));
  const { testId } = locationState || {};
  
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  // Fetch questions based on testId
  useEffect(() => {
    if (testId) {
      const fetchQuestions = async () => {
        try {
          const token = getToken();
          if (!token) {
            alert("Invalid token. Please log in again.");
            navigate("/login");
            return;
          }
          
          const response = await axios.get(`http://localhost:8080/test/${testId}/questions`, {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            setQuestions(response.data); // Set fetched questions
          }
        } catch (err) {
          // Correct error handling
          if (err.response) {
            if (err.response.status === 403) {
              alert("You have already attempted this exam.");
            } else {
              alert("Failed to fetch questions. Please try again.");
            }
          } else {
            console.error("Error fetching questions:", err);
            alert("Failed to fetch questions. Please try again.");
          }
        }
      };
      fetchQuestions();
    }
  }, [testId, navigate]);

  // Timer logic for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          handleSubmit(); // Auto-submit when time runs out
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  // Format time for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle the option change for each question
  const handleOptionChange = (questionId, optionId) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionId,
    }));
  };

  // Handle exam submission
  const handleSubmit = async () => {
    const token = getToken();
    if (!token) {
      alert("Invalid token. Please log in again.");
      navigate("/login");
      return;
    }

    if (Object.keys(selectedAnswers).length !== questions.length) {
      alert("Please select an answer for every question.");
      return;
    }

    const payload = {
      testId,
      answers: selectedAnswers,
      language: testId === 1 ? "Java" : "Python",
    };

    try {
      const response = await axios.post("/test/submit", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert("Answers submitted successfully!");
        navigate("/result", { state: response.data });
      }
    } catch (err) {
      console.error("Error submitting answers:", err);
      alert("Failed to submit answers. Please try again.");
    }
  };

  // Redirect to login if no questions or testId is missing
  useEffect(() => {
    if (!testId) {
      console.error("Missing testId");
      navigate("/login");
    }
  }, [testId, navigate]);

  return (
    <div className="container">
      <div className="exam-container">
        <h1 className="exam-head">{testId === 1 ? "Java Quiz" : "Python Quiz"}</h1>
        <div className={`timer ${timeLeft <= 3 * 60 ? "timer-warning" : ""}`}>
          Time Left: {formatTime(timeLeft)}
        </div>
        {questions.map((question) => (
          <div className="question" key={question.jid || question.pId}>
            {/* Question rendering */}
            <h3 className="question-text">
              {testId === 1 ? question.jid : question.pId}.{" "}
              {testId === 1 ? question.javaQuestions : question.pythonQuestions}
            </h3>

            {/* Options rendering */}
            <ul className="options" style={{ listStyleType: "none", padding: 0 }}>
              {(testId === 1 ? question.javaOptions : question.pythonOptions).map((option) => (
                <li key={option.joId || option.poId}>
                  <label className="qlabel">
                    <input
                      type="radio"
                      className="green-radio"
                      name={`question-${testId === 1 ? question.jid : question.pId}`}
                      value={option.joId || option.poId}
                      onChange={() =>
                        handleOptionChange(
                          testId === 1 ? question.jid : question.pId,
                          option.joId || option.poId
                        )
                      }
                      checked={
                        selectedAnswers[testId === 1 ? question.jid : question.pId] ===
                        (option.joId || option.poId)
                      }
                    />
                    {option.options}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="submit-section">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default ExamPage;

