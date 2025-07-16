import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const CarCards = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { location, pickupDate, returnDate } = state || {};

  const [cars, setCars] = useState({ premium: [], family: [], everyday: [] });

  useEffect(() => {
    if (!location) {
      navigate("/dashboard");
      return;
    }
    const fetchCars = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/cars?city=${location}`);
        if (!res.ok) throw new Error("Failed to fetch cars");
        const data = await res.json();

        // Group cars by type
        const grouped = { premium: [], family: [], everyday: [] };
        data.forEach(car => {
          grouped[car.type]?.push(car);
        });
        setCars(grouped);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCars();
  }, [location, navigate]);

  const handleBookCar = (car) => {
    navigate("/booking", {
      state: { location, pickupDate, returnDate, car },
    });
  };

  return (
    <div className="container my-5" style={{ color: "white" }}>
      <h2 className="mb-3">
        <center>Available Cars in {location}</center>
      </h2>
      <p>
        <center>
          <strong>From:</strong> {pickupDate} &nbsp; | &nbsp;
          <strong>To:</strong> {returnDate}
        </center>
      </p>

      {["premium", "family", "everyday"].map((type) => {
        const carList = cars[type];
        if (!carList || carList.length === 0) return null;

        const sectionTitle =
          type === "premium"
            ? "Premium Cars"
            : type === "family"
            ? "Family Cars"
            : "Everyday Cars";

        return (
          <div key={type} className="mb-5">
            <h4 className="mb-3">{sectionTitle}</h4>
            <div className="row">
              {carList.map((car) => (
                <div key={car._id} className="col-md-4 mb-4">
                  <div
                    className="card h-100 shadow-sm"
                    style={{ cursor: "pointer", transition: "transform 0.3s ease" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <img
                      src={car.img}
                      alt={car.name}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{car.name}</h5>
                      <p className="card-text mb-1">₹{car.price}/day</p>
                      <p className="card-text mb-1"><strong>Model:</strong> {car.model}</p>
                      <p className="card-text mb-1"><strong>Mileage:</strong> {car.mileage}</p>
                      <p className="card-text mb-3"><strong>Transmission:</strong> {car.transmission}</p>
                      <button className="btn btn-primary w-100" onClick={() => handleBookCar(car)}>
                        Book This Car
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default CarCards;

