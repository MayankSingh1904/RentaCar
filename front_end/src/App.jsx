import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './aurora.css';
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./components/Dashboard";
import CarCards from "./components/carcard";
import Booking from "./components/Booking";
import AdminDashboard from "./components/AdminDashboard";
function App() {
  return (
    <div className="aurora-bg">
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/carcards" element={<CarCards />} />
        <Route path="/Booking" element={<Booking/>}/>
        <Route path="/admin" element={<AdminDashboard/>}/>
      </Routes>
    </Router>
    </div>
  );
}
export default App;
