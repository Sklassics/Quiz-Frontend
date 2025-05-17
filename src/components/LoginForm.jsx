import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios"; // Ensure axios is configured properly
import '../cssfiles/Login.css'
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        { username, password },
        { withCredentials: true } // Ensure cookies are allowed
      );

      if (response.data && response.data.token) {
        const token = response.data.token;

        // Save token to localStorage (or cookies) for future requests
        localStorage.setItem("token", token); // Store token in localStorage

        // Optionally, store token in cookies
        document.cookie = `token=${token}; path=/; secure; samesite=strict`;

        // Set default Authorization header for future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Redirect to home/dashboard after login
        navigate("/dash");
      } else {
        alert("No token received from the server.");
      }
    } catch (error) {
      console.error("Error during login:", error.response || error.message);
      alert("Invalid credentials or server error."); // Improve user feedback
    }
  };

  return (
    // <div style={{ textAlign: "center", marginTop: "50px" }}>
    //   <h1>Login Form</h1> {/* Heading for the form */}
    //   <form
    //     onSubmit={handleSubmit}
    //     style={{ display: "inline-block", textAlign: "left" }}
    //   >
    //     <div style={{ marginBottom: "10px" }}>
    //       <label>
    //         Username:
    //         <input
    //           type="text"
    //           placeholder="Enter your username"
    //           value={username}
    //           onChange={(e) => setUsername(e.target.value)}
    //           required
    //           style={{ marginLeft: "10px" }}
    //         />
    //       </label>
    //     </div>
    //     <div style={{ marginBottom: "10px" }}>
    //       <label>
    //         Password:
    //         <input
    //           type="password"
    //           placeholder="Enter your password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //           style={{ marginLeft: "10px" }}
    //         />
    //       </label>
    //     </div>
    //     <button
    //       type="submit"
    //       style={{ marginTop: "10px", padding: "5px 10px" }}
    //     >
    //       Login
    //     </button>
    //   </form>
    // </div>
    <div className="login-body">
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">Login Form</h1> {/* Login title */}
        <form onSubmit={handleSubmit}>
          <div className="login-input-group">
            <label className="login-label">Username:</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="login-input-group">
            <label className="login-label">Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default LoginForm;
