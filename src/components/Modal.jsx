// src/components/Modal.jsx
import React from "react";
import "../styles/Modal.css";

function Modal({ car, onClose, onConfirm }) {
  if (!car) return null; 

  return (
    <div className="modal-overlay" onClick={onClose}>
      <dialog
        className="modal"
        open
        onClick={(e) => e.stopPropagation()} 
      >
        <h2>Confirm Purchase</h2>
        <p>Are you sure you want to buy the following car?</p>
        <div className="modal-car-info">
          <h3>{car.name}</h3>
          <p>Type: {car.type}</p>
          <p>Price: ${car.price}</p>
        </div>
        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="button" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </dialog>
    </div>
  );
}

export default Modal;
