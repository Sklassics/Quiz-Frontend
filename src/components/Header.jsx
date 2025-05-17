// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../cssfiles/Header.css';

const Header = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [location]);

  const getData = async () => {
    const data = await JSON.parse(sessionStorage.getItem('userData'));
    if (data && data.isLoggedIn) {
      setUserData(data.userData);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    setUserData(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <i className="fas fa-briefcase logo-icon"></i>
        <span className="logo-text">ExamPortal</span>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        </li>
        <li>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About Us</Link>
        </li>
        <li>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
        </li>
        {userData ? (
          <>
            <li className="navbar-profile">
              <Link to="/profile">
                <img
                  // eslint-disable-next-line no-undef
                  src={require('../img1.png')}
                  alt="Profile"
                  className="profile-photo-circle"
                />
                <span className="username">{userData.name}</span>
              </Link>
            </li>
            <li>
              <i className="fas fa-sign-out-alt" onClick={logout}></i>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
            </li>
            <li>
              <Link to="/register" className={location.pathname === '/register' ? 'active' : ''}>Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;