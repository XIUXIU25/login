// src/pages/Events.jsx
import React, { useState } from "react";
import "../styles/Events.css";
import Modal from '../components/Modal';

function Events({ events }) {
  const [filter, setFilter] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const filteredEvents = filter === "all" ? events : events.filter((event) => event.type === filter);

  const handleBuyNow = (event) => {
    setSelectedEvent(event); 
    setModalOpen(true); 
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEvent(null); 
  };

  const handleConfirmPurchase = () => {
    setSuccessMessage(`You have purchased: ${selectedEvent.name} for $${selectedEvent.price}`);
    handleCloseModal(); 
  };

  return (
    <div className="events-gallery">
      <h1>Events</h1>

      <div className="filters">
        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
          All events
        </button>
        <button className={filter === "electric" ? "active" : ""} onClick={() => setFilter("electric")}>
        Psychology events
        </button>
        <button className={filter === "petrol" ? "active" : ""} onClick={() => setFilter("petrol")}>
        Legal Insights events
        </button>
        <button className={filter === "hybrid" ? "active" : ""} onClick={() => setFilter("hybrid")}>
          Hybrid events
        </button>
      </div>

      <div className="events-eventlist">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div className="events-carcard" key={event.id}>
              <img src={event.image} alt={event.name} />
              <h4>{event.name}</h4>
              <p>Type: {event.type}</p>
              <p>Price: ${event.price}</p>
              <button className="modal-open" onClick={() => handleBuyNow(event)}>
                JOIN NOW
              </button>
            </div>
          ))
        ) : (
          <p>No events found for the selected filter.</p>
        )}
      </div>

      {isModalOpen && (
        <Modal
          event={selectedevent}
          onClose={handleCloseModal}
          onConfirm={handleConfirmPurchase}
        />
      )}
      
      {successMessage && (
        <p className="success-message" aria-live="assertive">
          {successMessage}
        </p>
      )}
    </div>
  );
}

export default Events;

