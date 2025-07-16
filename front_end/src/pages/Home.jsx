import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/navbar";
const Home = () => {
  return (
    <><Navbar/>
    <div>
      {/* Hero Section */}
      <section
        className="text-center text-white d-flex flex-column justify-content-center"
        style={{
          background: "linear-gradient(135deg, #3b1b83 0%, #1c0f3a 100%)",
          height: "200px",
          padding: "2rem",
          boxShadow: "inset 0 0 50px rgba(255, 255, 255, 0.1)",
        }}
      >
        <h1
          className="display-4 fw-bold mb-3"
          style={{
            textShadow: "0 0 10px rgba(255, 255, 255, 0.7)",
            letterSpacing: "2px",
          }}
        >
          PrimeRentals
        </h1>
        <p
          className="lead"
          style={{
            fontStyle: "italic",
            textShadow: "0 0 5px rgba(255, 255, 255, 0.5)",
            borderBottom: "2px solid #8c72ff",
            display: "inline-block",
            paddingBottom: "6px",
            margin: "0 auto",
            maxWidth: "320px",
          }}
        >
          Driven by Service, Designed for Journeys.
        </p>
      </section>

      {/* Image Slider */}
        <section className="container-fluid px-0 ">
        <Carousel interval={2000} fade={false}>
            <Carousel.Item>
            <img
                className="d-block w-100 rounded" 
                src="/images/car1.jpg"
                alt="First slide"
                style={{ height: "600px", objectFit: "cover" }}
            />
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100 rounded"
                src="/images/car2.jpg"
                alt="Second slide"
                style={{ height: "600px", objectFit: "cover" }}
            />
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100 rounded"
                src="/images/car3.jpg"
                alt="Third slide"
                style={{ height: "600px", objectFit: "cover" }}
            />
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100 rounded"
                src="/images/car4.jpg"
                alt="Fourth slide"
                style={{ height: "600px", objectFit: "cover" }}
            />
            </Carousel.Item>
        </Carousel>
        </section>
      <section className="text-center py-4 bg-light">
        <h2>Ready to Ride?</h2>
        <p>Login now to book your perfect ride.</p>
        <Link to="/login" className="btn btn-primary">Login to Book</Link>
      </section>
      {/* FAQs */}
            <section className="container my-5">
            <h3 className="mb-4 text-center" style={{ color: 'white' }}>
            Frequently Asked Questions</h3>
        <div className="accordion" id="faqAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="faq1">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1">
                What documents are required to rent a car?
              </button>
            </h2>
            <div id="collapse1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                A valid driver’s license, government-issued ID, and a credit/debit card.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faq2">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2">
                Can I cancel or modify a booking?
              </button>
            </h2>
            <div id="collapse2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Yes, bookings can be modified or canceled 24 hours before pickup time.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faq3">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3">
                Is there a mileage limit?
              </button>
            </h2>
            <div id="collapse3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Most rentals include unlimited mileage. Check the listing for exceptions.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faq4">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4">
                What payment methods are accepted?
              </button>
            </h2>
            <div id="collapse4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                We accept all major credit/debit cards, UPI, and net banking. Cash payments are not accepted.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faq5">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5">
                Can I rent a car without a driver?
              </button>
            </h2>
            <div id="collapse5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Yes, all rentals are self-drive by default unless otherwise specified.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faq6">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse6">
                Are there any late return charges?
              </button>
            </h2>
            <div id="collapse6" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Yes, late returns are charged hourly beyond the grace period. Details are available in your booking policy.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="faq7">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse7">
                Is fuel included in the rental?
              </button>
            </h2>
            <div id="collapse7" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                No, fuel is not included. The vehicle should be returned with the same fuel level as when picked up.
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-dark text-white text-center py-3">
         @ PrimeRentals. All rights reserved. Made by Mayank<br/><br/>
         Contact: 7546879890<br/>
         Email: mayanksinghbora19@gmail.com
      </footer>
    </div>
    </>
  );
};
export default Home;
