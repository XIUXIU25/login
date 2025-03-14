// src/pages/Events.jsx
import React, { useState } from "react";
import "../styles/Blogs.css";
import Modal from '../components/Modal';

function Blogs({ blogs }) {
  const [filter, setFilter] = useState("all");
  const [selectedCar, setSelectedCar] = useState(null); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const filteredCars = filter === "all" ? blogs : blogs.filter((blog) => blog.type === filter);

  const handleBuyNow = (blog) => {
    setSelectedCar(blog); 
    setModalOpen(true); 
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCar(null); 
  };

  const handleConfirmPurchase = () => {
    setSuccessMessage(`You have purchased: ${selectedCar.name} for $${selectedCar.price}`);
    handleCloseModal(); 
  };

  return (
    <div className="blogs-gallery">
      <h1>Blogs</h1>

      <div className="filters">
        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
          All Blogs
        </button>
        <button className={filter === "electric" ? "active" : ""} onClick={() => setFilter("electric")}>
          Featured Blogs
        </button>
        <button className={filter === "petrol" ? "active" : ""} onClick={() => setFilter("petrol")}>
          Latest Blogs
        </button>
        <button className={filter === "hybrid" ? "active" : ""} onClick={() => setFilter("hybrid")}>
          Hybrid Blogs
        </button>
      </div>

      <div className="blogs-bloglist">
        {filteredCars.length > 0 ? (
          filteredCars.map((blog) => (
            <div className="blogs-blogcard" key={blog.id}>
              <img src={blog.image} alt={blog.name} />
              <h4>{blog.name}</h4>
              <p>Type: {blog.type}</p>
              <p>Price: ${blog.price}</p>
              <button className="modal-open" onClick={() => handleBuyNow(blog)}>
                BUY NOW
              </button>
            </div>
          ))
        ) : (
          <p>No blogs found for the selected filter.</p>
        )}
      </div>

      {isModalOpen && (
        <Modal
          car={selectedCar}
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

export default Blogs;

