import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios'; // Import axios for making requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../cssfiles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    collegeName: '',
    department: '',
    password: '',
    dob: '',
    pno: '',
  });
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const navigate = useNavigate(); // Initialize navigate for programmatic navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/auth/register', formData);

      if (response.status === 201 || response.status === 200) {
       alert('Registration successful!');
        setError(null);
        
        // Reset form data after successful registration
        setFormData({
          username: '',
          email: '',
          collegeName: '',
          department: '',
          password: '',
          dob: '',
          pno: '',
        });

        // Navigate to login page after successful registration
        setTimeout(() => {
          navigate('/login'); // Adjust the route based on your app's routing
        }, 1000); // Delay navigation by 1 seconds to let the success message show
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setSuccess(null);
    }
  };

  return (
    <div className="register-body">
      <div className="register-container">
        <h2 className='regi-head'>Registration Form</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit} className="grid-form">
          {/* Username */}
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
            />
          </div>

          {/* Password with eye toggle */}
          <div className="form-group">
            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
              />
              <span className="password-toggle" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          {/* Department */}
          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Enter department"
            />
          </div>

          {/* Gender */}
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* College Name */}
          <div className="form-group">
            <label>College Name</label>
            <input
              type="text"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange}
              placeholder="Enter college name"
            />
          </div>

          {/* Date of Birth */}
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="pno"
              value={formData.pno}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>

          {/* Submit */}
          <div className="form-group full-width">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;