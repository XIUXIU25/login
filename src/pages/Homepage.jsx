// src/pages/Homepage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Homepage.css';


function HomePage() {
  const navigate = useNavigate(); //React Router navigate function

  const featuredEvents = [
    {
      id: 1,
      name: "Psychology & Personal Growth Talk",
      price: "Free",
      image: "/img/Mental+health-event1.jpg",
    },
    {
      id: 2,
      name: "Book Club",
      price: "Free",
      image: "/img/bilingual+book+club-event2.jpg",
    },
  ];

  return (
    <div className="homepage">
     
      <section className="hero">
        <div className="hero-content">
          <h1>Building Bridges for</h1>
          <h1>Dependent Visa Holders</h1>

          {/* <h1>forever.</h1> */}
          <div className="hero-buttons">
            <button onClick={() => navigate("/events")}>Browse Events</button>
            <button onClick={() => navigate("/add-events")}>Take Your Events</button>
          </div>
        </div>
      </section>

      
      <section className="featured-events">
        <h2>Featured Events</h2>
        <div className="event-list">
          {featuredEvents.map((event) => (
            <div className="event-card" key={event.id}>
              <img src={event.image} alt={event.name} />
              <h4>{event.name}</h4>
              <p>${event.price}</p>
            </div>
          ))}
        </div>
        <button className="view-all-button" onClick={() => navigate("/Events")}>
          View All Events
        </button>
      </section>

      
      <section className="cta">
        <h2>Ready to Find Your Dream Events?</h2>
        <button onClick={() => navigate("/profile")}>Sign Up NOW!</button>
      </section>
    </div>
  );
}

export default HomePage;
