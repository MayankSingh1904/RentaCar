import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Booking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { location, pickupDate, returnDate, car } = state || {};
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupBranch, setPickupBranch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  if (!car || !location) {
    // If no car or location passed, redirect back to dashboard or car list
    navigate("/dashboard");
    return null;
  }

  const calculateDays = () => {
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; // at least 1 day
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!email || !phone || !pickupBranch) {
      setError("Please fill all required fields");
      setLoading(false);
      return;
    }

    const days = calculateDays();
    const amount = days * Number(car.price);

    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          phone,
          car,
          type: car.type || "", // Make sure your car object has type or add it here
          city: location,
          pickupBranch,
          pickupDate,
          returnDate,
          days,
          amount,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create booking");
      } else {
        setSuccess("Booking created successfully!");
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-image d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: "url('/images/login.jpg')",
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          color: "white",
          width: "100%",
          maxWidth: "500px",
          borderRadius: "15px",
        }}
      >
        <h2 className="mb-3 text-center">
          Book Car: <span className="text-info">{car.name}</span>
        </h2>
  
        <p className="text-center mb-4">
          <strong>From:</strong> {pickupDate} &nbsp; | &nbsp;
          <strong>To:</strong> {returnDate}
        </p>
  
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email*</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
  
          <div className="mb-3">
            <label className="form-label">Phone*</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
  
          <div className="mb-3">
            <label className="form-label">Pickup Branch*</label>
            <select
              className="form-select"
              value={pickupBranch}
              onChange={(e) => setPickupBranch(e.target.value)}
              required
            >
              <option value="">Select a branch</option>
              <option value="MG Road">MG Road</option>
              <option value="Sector 21">Sector 21</option>
              <option value="Airport Terminal">Airport Terminal</option>
            </select>
          </div>
  
          <button
            type="submit"
            className="btn btn-outline-primary w-100 mt-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Booking...
              </>
            ) : (
              "Confirm Booking"
            )}
          </button>
  
          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success mt-3" role="alert">
              {success}
            </div>
          )}
        </form>
      </div>
    </div>
  );  
}  

export default Booking;
