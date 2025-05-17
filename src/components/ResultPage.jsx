import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../cssfiles/Result.css';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { marks, totalMarks } = location.state || {};

  if (marks === undefined || totalMarks === undefined) {
    return <p>No results available. Please try again.</p>;
  }

  const percentage = ((marks / totalMarks) * 100).toFixed(2);
  const feedback =
    percentage >= 80
      ? "Excellent work!"
      : percentage >= 50
      ? "Good job! Keep practicing."
      : "Don't worry, you'll do better next time.";

  // Handle Log Out
  const handleLogout = () => {
    // Clear token from cookie storage
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="result-container">
      <h1 className="er">Exam Result</h1>
      <div className="result-main">
        <p className="pr">Marks obtained: {marks}</p>
        <p className="pr">Total Marks: {totalMarks}</p>
        <p className="pr">Percentage: {percentage}%</p>
        <p className="pr">Feedback: {feedback}</p>
        <div className="button-containerr">
          <button className="btns1" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
