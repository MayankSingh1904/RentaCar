import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg px-4"
      style={{
        background: '#0d1b2a', // purple to blue gradient
      }}
    >
      <Link className="navbar-brand text-white fw-bold" to="/">
        PrimeRentals
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navContent"
        aria-controls="navContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }} />
      </button>

      <div className="collapse navbar-collapse" id="navContent">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">
              Home
            </Link>
          </li>
        </ul>
        <div className="d-flex">
          <Link to="/login" className="btn btn-outline-light me-2">
            Login
          </Link>
          <Link to="/register" className="btn btn-light text-primary">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
