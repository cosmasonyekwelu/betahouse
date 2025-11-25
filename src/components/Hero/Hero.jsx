import React, { useState } from "react";
import "./Hero.css";

export default function Hero({ query, setQuery, setPage }) {
  const [localSearch, setLocalSearch] = useState({
    location: "",
    type: "",
    bedrooms: 0,
  });

  const updateField = (field, val) => {
    setLocalSearch({ ...localSearch, [field]: val });
  };

  const handleSearch = () => {
    const nextQuery = {
      ...query,
      location: localSearch.location.trim() || undefined,
      type: localSearch.type.trim() || undefined,
      bedrooms:
        localSearch.bedrooms > 0 ? String(localSearch.bedrooms) : undefined,
    };

    setQuery(nextQuery);
    setPage(1);
  };

  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1>Browse Our Properties</h1>
        <p>Find your perfect home among our curated properties.</p>

        <div className="search-box">
          <div className="search-item">
            <label>LOCATION</label>
            <input
              type="text"
              placeholder="e.g. Gbagada"
              value={localSearch.location}
              onChange={(e) => updateField("location", e.target.value)}
            />
          </div>

          <div className="search-item border-left">
            <label>PROPERTY TYPE</label>
            <input
              type="text"
              placeholder="e.g. Duplex"
              value={localSearch.type}
              onChange={(e) => updateField("type", e.target.value)}
            />
          </div>

          <div className="search-item border-left bedroom-control">
            <label>BEDROOM</label>

            <div className="bedroom-counter">
              <button
                onClick={() =>
                  updateField(
                    "bedrooms",
                    Math.max(0, localSearch.bedrooms - 1)
                  )
                }
              >
                -
              </button>

              <span>{localSearch.bedrooms}</span>

              <button
                onClick={() =>
                  updateField("bedrooms", localSearch.bedrooms + 1)
                }
              >
                +
              </button>
            </div>
          </div>

          <button className="search-btn" onClick={handleSearch}>
            Find Property
          </button>
        </div>
      </div>
    </section>
  );
}
