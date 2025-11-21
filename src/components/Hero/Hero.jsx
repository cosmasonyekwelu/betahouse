import React, { useState } from "react";
import "./Hero.css";

export default function Hero({ query, setQuery, setPage }) {
  const [localSearch, setLocalSearch] = useState({
    location: "",
    type: "",
    bedrooms: 0,
  });

  const updateField = (field, value) => {
    setLocalSearch({ ...localSearch, [field]: value });
  };

  const handleSearch = () => {
  
    setQuery({
      ...query,
      location: localSearch.location.trim(),
      type: localSearch.type.trim(),
      bedrooms: localSearch.bedrooms,
    });

 
    setPage(1);
  };

  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1>Browse Our Properties</h1>
        <p>Find your perfect home among our curated properties. Start browsing now!</p>

        {/* SEARCH BAR */}
        <div className="search-box">

          {/* LOCATION */}
          <div className="search-item">
            <label>LOCATION</label>
            <input
              type="text"
              placeholder="eg. Gbagada"
              value={localSearch.location}
              onChange={(e) => updateField("location", e.target.value)}
            />
          </div>

          {/* PROPERTY TYPE */}
          <div className="search-item border-left">
            <label>PROPERTY TYPE</label>
            <input
              type="text"
              placeholder="eg. Duplex, Bedroom Flat"
              value={localSearch.type}
              onChange={(e) => updateField("type", e.target.value)}
            />
          </div>

          {/* BEDROOM */}
          <div className="search-item border-left bedroom-control">
            <label>BEDROOM</label>

            <div className="bedroom-counter">
              <button
                onClick={() => updateField("bedrooms", Math.max(0, localSearch.bedrooms - 1))}
              >
                -
              </button>

              <span>{localSearch.bedrooms}</span>

              <button
                onClick={() => updateField("bedrooms", localSearch.bedrooms + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* FIND BUTTON */}
          <button className="search-btn" onClick={handleSearch}>
            Find Property
          </button>

        </div>
      </div>
    </section>
  );
}
