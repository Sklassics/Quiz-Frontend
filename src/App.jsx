import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import TypeOfExam from "./components/TypeOfExam";
import ExamPage from "./components/ExamPage";
import Register from "./components/Register";
import Home from "./components/Home";
import ResultPage from "./components/ResultPage";
import Dashboard from "./components/Dashboard";
import Navbar from "./Head & Foot/Navbar";
import AboutUs from "./components/AboutUs";
import Footer from "./Head & Foot/Footer";
import Cards from "./components/Cards";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
        <Route path="/aboutus" element={<><Navbar /><AboutUs /><Footer /></>} />
        <Route path="/login" element={<><Navbar /><LoginForm /><Footer /></>} />
        <Route path="/register" element={<><Navbar /><Register /><Footer /></>} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/typeofexam" element={<TypeOfExam />} />
        <Route path="/exam/:id" element={<ExamPage />} /> 
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};

export default App;
