import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './admin.css';

export default function AdminDashboard() {
  const allCities = ["Delhi", "Ahmedabad", "Jaipur", "Chandigarh", "Agra"];

  const [activeTab, setActiveTab] = useState("bookings");
  const navigate = useNavigate();
  const [newCar, setNewCar] = useState({
    city: "Delhi",
    type: "premium",
    name: "",
    model: "",
    mileage: "",
    transmission: "Manual",
    price: "",
    img: "",
  });
  const [carsData, setCarsData] = useState({});
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bookings", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Booking fetch error:", err);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cars");
        if (!res.ok) throw new Error("Failed to fetch cars");
        const data = await res.json();

        // Group cars by city and type
        const grouped = {};
        data.forEach((car) => {
          if (!grouped[car.city]) grouped[car.city] = { premium: [], family: [], everyday: [] };
          grouped[car.city][car.type].push(car);
        });
        setCarsData(grouped);
      } catch (err) {
        console.error("Failed to fetch cars:", err);
      }
    };

    fetchCars();
  }, []);

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    const { city, type, name, model, mileage, transmission, price, img } = newCar;
    if (!name || !model || !mileage || !price) {
      alert("Fill all required fields!");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCar),
      });
      if (!res.ok) throw new Error("Failed to add car");
      const data = await res.json();

      setCarsData((prev) => {
        const updated = { ...prev };
        if (!updated[city]) {
          updated[city] = { premium: [], family: [], everyday: [] };
        }
        updated[city][type].push(data);
        return updated;
      });

      alert("Car added!");
      setNewCar({ ...newCar, name: "", model: "", mileage: "", price: "", img: "" });
    } catch (err) {
      alert("Failed to add car");
    }
  };

  const handleDeleteCar = async (city, type, carId) => {
    if (!window.confirm("Delete this car?")) return;

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/cars/${carId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete car");

      setCarsData((prev) => {
        const updated = { ...prev };
        updated[city][type] = updated[city][type].filter((car) => car._id !== carId);
        return updated;
      });

      alert("Car deleted!");
    } catch (err) {
      alert("Failed to delete car");
    }
  };

  const handleSignOut = () => {
    navigate("/");
  };

  return (
      <div className="admin-dashboard">
        <div
        className="d-flex justify-content-between align-items-center px-4 py-3"
        style={{
          backgroundColor: "#191970", // or any dark tone like '#1c1c1c'
          color: "white",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        }}
      >
        <h2 className="m-0">PrimeRentals</h2>
        <button
          onClick={handleSignOut}
          className="btn btn-danger btn-sm"

        >
          Sign Out
        </button>
      </div>
      <br/>
      <center>
      <h1 className="admin-title">Admin Dashboard</h1></center><hr/>

      <nav className="admin-nav">
        {['bookings', 'cars', 'addCar'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`admin-tab-btn ${activeTab === tab ? 'active' : ''}`}
          >
            {tab === 'bookings' ? 'User Bookings' : tab === 'cars' ? 'Manage Cars' : 'Add Car'}
          </button>
        ))}
      </nav>

      {activeTab === "bookings" && (
        <div>
          <h2>User Bookings</h2>
          {bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Car</th>
                  <th>Type</th>
                  <th>City</th>
                  <th>Pickup Branch</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Days</th>
                  <th>Amount (₹)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td>{b.userName || "N/A"}</td>
                    <td>{b.email}</td>
                    <td>{b.car?.name || "N/A"}</td>
                    <td>{b.type}</td>
                    <td>{b.city}</td>
                    <td>{b.pickupBranch}</td>
                    <td>{new Date(b.pickupDate).toLocaleDateString()}</td>
                    <td>{new Date(b.returnDate).toLocaleDateString()}</td>
                    <td>{b.days}</td>
                    <td>{b.amount}</td>
                    <td>{b.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === "cars" && (
        <div>
          <h2>Manage Cars</h2>
          {Object.entries(carsData).map(([city, types]) => (
            <div key={city} className="admin-city-section">
              <h3>{city}</h3>
              {['premium', 'family', 'everyday'].map((type) => (
                <div key={type} className="admin-car-type-section">
                  <h4 className="capitalize">{type} Cars</h4>
                  {types[type]?.length === 0 && <p>No cars in this category.</p>}
                  <div className="admin-car-list">
                    {types[type]?.map((car) => (
                      <div key={car._id} className="admin-car-card">
                        <img src={car.img} alt={car.name} className="admin-car-img" />
                        <h5 className="admin-car-name">{car.name}</h5>
                        <p><strong>Model:</strong> {car.model}</p>
                        <p><strong>Mileage:</strong> {car.mileage}</p>
                        <p><strong>Transmission:</strong> {car.transmission}</p>
                        <p className="admin-car-price">₹{car.price}/day</p>
                        <button onClick={() => handleDeleteCar(city, type, car._id)} className="admin-delete-btn">Delete</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {activeTab === "addCar" && (<center>
        <div className="admin-add-car-form">
          <h2>Add New Car</h2>
          <form onSubmit={handleAddCar}>
            <label>
              City:
              <select name="city" value={newCar.city} onChange={handleInputChange}>
                {allCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </label>
            <label>
              Type:
              <select name="type" value={newCar.type} onChange={handleInputChange}>
                <option value="premium">Premium</option>
                <option value="family">Family</option>
                <option value="everyday">Everyday</option>
              </select>
            </label>
            <label>
              Name:
              <input type="text" name="name" value={newCar.name} onChange={handleInputChange} required />
            </label>
            <label>
              Model:
              <input type="text" name="model" value={newCar.model} onChange={handleInputChange} required />
            </label>
            <label>
              Mileage:
              <input type="text" name="mileage" value={newCar.mileage} onChange={handleInputChange} placeholder="e.g., 15 km/l" required />
            </label>
            <label>
              Transmission:
              <select name="transmission" value={newCar.transmission} onChange={handleInputChange}>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </label>
            <label>
              Price Per Day (₹):
              <input type="number" name="price" value={newCar.price} onChange={handleInputChange} required min={1} />
            </label>
            <label>
              Image URL:
              <input type="text" name="img" value={newCar.img} onChange={handleInputChange} placeholder="Optional" />
            </label>
            <button type="submit" className="admin-add-btn">Add Car</button>
          </form>
        </div></center>
      )}
    </div>
  );
}
