// src/pages/AddEvents.jsx
import React, { useState } from "react";
import "../styles/AddEvents.css";

function AddEvents({ addEvents }) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const models = {
    Tesla: ["Model S", "Model 3", "Model X", "Model Y"],
    Toyota: ["Corolla", "Camry", "Prius", "RAV4", "Highlander"],
    Ford: ["Mustang", "Focus", "Explorer", "F-150", "Escape"],
    BMW: ["3 Series", "5 Series", "X5", "X3", "i8"],
    Mercedes: ["C-Class", "E-Class", "S-Class", "GLC", "GLE"],
    Audi: ["A3", "A4", "A6", "Q5", "Q7"],
    Honda: ["Civic", "Accord", "CR-V", "Pilot", "Fit"],
    Hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe", "Kona"],
    Nissan: ["Altima", "Sentra", "Maxima", "Rogue", "Pathfinder"],
    Chevrolet: ["Malibu", "Impala", "Silverado", "Equinox", "Traverse"],
    Kia: ["Optima", "Sorento", "Sportage", "Telluride", "Soul"],
    Volkswagen: ["Jetta", "Passat", "Tiguan", "Golf", "Atlas"],
    Subaru: ["Outback", "Forester", "Crosstrek", "Impreza", "WRX"],
    Porsche: ["911", "Cayenne", "Panamera", "Macan", "Taycan"],
    Volvo: ["XC40", "XC60", "XC90", "S60", "V90"],
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (brand && model && type && price && image) {
      const name = `${brand} ${model}`; 
      addEvents({ name, type, price, image });
      setBrand("");
      setModel("");
      setType("");
      setPrice("");
      setImage("");
      setErrorMessage("");
    } else {
      setErrorMessage("Please fill all fields!");
    }
  };


  return (
    <div className="add-event">
      <h1>Add a New Events</h1>
      <form onSubmit={handleSubmit}>
        
        <label>
          Brand:
          <select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="">Select a brand</option>
            {Object.keys(models).map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>

        {brand && (
          <label>
            Model:
            <select value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="">Select a model</option>
              {models[brand].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
        )}

        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select a type</option>
            <option value="electric">Electric</option>
            <option value="petrol">Petrol</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </label>

        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter car price"
          />
        </label>

        <label>
          Image URL:
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter image URL"
          />
        </label>

        <button type="submit">Add Events</button>
      </form>
      <h2>The added event will automatically shown up in the Events page.</h2>

      {errorMessage && (
        <p className="error-message" aria-live="assertive">
        {errorMessage}
        </p>
      )}
    </div>
  );
}

export default AddEvents;
