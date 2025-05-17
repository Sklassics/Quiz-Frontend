import React, { useState, useEffect } from "react";
import axios from "axios"; // Axios instance
import { Link, useNavigate } from "react-router-dom"; // For navigation to quiz page
import '../cssfiles/Dashboard.css'
const Dashboard = () => {
  const [userDetails, setUserDetails] = useState();
  const [error, setError] = useState(null); // Track errors
  const navigate = useNavigate(); // Initialize navigation

  // Function to retrieve the cookie value by name
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  // Function to retrieve the token
  const getToken = () => {
    return getCookie("token"); // Use the same function for consistency
  };

  // Check if the token exists on component mount
  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login"); // Redirect to login page if token not found
    }
  }, [navigate]);

  useEffect(() => {
    const token = getToken(); // Retrieve token from cookies

    console.log("Token being sent:", token);

    if (token) {
      axios
        .get("/auth/user-details", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token as Bearer
          },
          withCredentials: true, // Include cookies in the request
        })
        .then((response) => {
          console.log("User details fetched:", response.data);
          setUserDetails(response.data); // Store user details
        })
        .catch((error) => {
          console.error("Error fetching user details:", error.response);
          if (error.response?.status === 403 || error.response?.status === 401) {
            setError("Invalid or expired token. Please login again.");
            setTimeout(() => {
              navigate("/login"); // Redirect to login page
            }, 2000);
          } else if (error.message.includes("Network Error")) {
            setError("Network error. Please try again later.");
          } else {
            setError("Failed to fetch user details. Please try again.");
          }
        });
    } else {
      setError("Token not found. Please login.");
    }
  }, []); // Dependency array empty to ensure this runs once

  // Function to handle quiz selection
  const handleQuizStart = (examType) => {
    // Navigate to the quiz page with the selected exam type
    navigate(`/quiz/${examType}`);
  };

  // Function to navigate to the TypeOfExam page
  const handleTypeOfExam = () => {
    navigate("/typeofexam");
  };

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  if (!userDetails) {
    return <div>Loading...</div>; // Show a loading state while fetching
  }

  return (
    // <div>
    //   <h1>Welcome, {userDetails.username}!</h1>
    //   <div style={{ marginTop: "20px" }}>
    //     {/* Button to navigate to TypeOfExam page */}
    //     <div style={{ marginTop: "20px" }}>
    //       <button
    //         onClick={handleTypeOfExam}
    //         style={{ padding: "10px" }}
    //       >
    //         Choose Exam Type
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <div className='Profile-container'>
        <div className='png'> 
        <img src='https://cdn-icons-png.flaticon.com/128/64/64572.png' alt='' className='profile-icon'/>
        <h2>Student</h2> 
        </div>
       
    
            <div className='menu'>
                <div className='icon-text'>
                <img src='https://cdn-icons-png.flaticon.com/128/566/566413.png' alt=''  className='Icon'/> 
                <h4><Link >Dashboard</Link></h4>
                </div>
                <div className='icon-text'>
                <img src='https://cdn-icons-png.flaticon.com/128/1739/1739438.png' alt='' className='Icon'/> 
                    <h4> <Link to="/cards"> Examination</Link></h4>
                </div>
                <div className='icon-text'>
                <img src='https://cdn-icons-png.flaticon.com/128/9743/9743444.png' alt=''  className='Icon'/> 
                    <h4><Link>My Marks</Link></h4>
                </div>
            
            </div>
        


    </div>
  );
};

export default Dashboard;
