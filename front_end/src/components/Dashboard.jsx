import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Dashboard = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [bookingHistory, setBookingHistory] = useState([]);
  const handleSignOut = () => {
    navigate("/");
  };
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!location || !pickupDate || !returnDate) {
      alert("Please fill all booking details.");
      return;
    }
    alert(`Showing available cars in ${location} from ${pickupDate} to ${returnDate}`);
    navigate("/carcards", { state: { location, pickupDate, returnDate } });
  };
//
useEffect(() => {
  const fetchUserBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/bookings/my-bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookingHistory(res.data);
    } catch (error) {
      console.error("Error fetching booking history:", error);
      setBookingHistory([]);
    }
  };

  fetchUserBookings();
}, []);

//
  const indianCities = ["Delhi", "Ahmedabad", "Jaipur", "Chandigarh", "Agra"];
  return (
    <div>
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 30px",
          backgroundColor: "#3b1b83",
          color: "white",
        }}
      >
        <h2 style={{ margin: 0 }}>PrimeRentals</h2>
        <button
          onClick={handleSignOut}
          style={{
            backgroundColor: "#ff4d4d",
            border: "none",
            padding: "8px 15px",
            color: "white",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Sign Out
        </button>
      </header>

      {/* Body */}
      <main style={{ display: "flex", padding: "40px", gap: "40px" }}>
{/* User Stats */}
        <div
  style={{
    flex: 1,
    backgroundColor: "#f3f3f3",
    padding: "20px",
    borderRadius: "8px",
    maxHeight: "80vh",
    overflowY: "auto",
  }}
>
  <h3>Your Booking History</h3>
  {!Array.isArray(bookingHistory) || bookingHistory.length === 0 ? (
    <p>No bookings yet.</p>
  ) : (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {bookingHistory.map((booking) => {
        const carName = booking?.car?.name || "Unknown Car";
        const pickup = booking?.pickupDate?.substring(0, 10) || "N/A";
        const ret = booking?.returnDate?.substring(0, 10) || "N/A";
        return (
          <li
            key={booking._id || Math.random()}
            style={{
              marginBottom: "15px",
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "5px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <strong>{carName}</strong>
            <br />
            {pickup} → {ret}
            <br />
            <small>{booking.pickupBranch || "Unknown branch"}</small>
          </li>
        );
      })}
    </ul>
  )}
</div>
        {/* Booking Form */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#f3f3f3",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h3>Book a Car</h3>
          <form onSubmit={handleBookingSubmit}>
            {/* Location */}
            <div style={{ marginBottom: "20px" }}>
              <label>Pickup Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                }}
              >
                <option value="">-- Select a City --</option>
                {indianCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Pickup Date */}
            <div style={{ marginBottom: "20px" }}>
              <label>Pickup Date</label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

            {/* Return Date */}
            <div style={{ marginBottom: "20px" }}>
              <label>Return Date</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{
                backgroundColor: "#3b1b83",
                color: "white",
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Book Now
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
