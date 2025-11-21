import React from "react";
import "./PopularProperties.css";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";

const PopularProperties = () => {
  const properties = [
    {
      id: 1,
      title: "Semi Detached Duplex",
      price: "₦1,430,000,000",
      bed: 6,
      bath: 3,
      size: "720 sq ft",
      location: "Victoria Island, Lagos",
      image: "/phouse1.jpg"
    },
    {
      id: 2,
      title: "Special Duplex",
      price: "₦670,000,000",
      bed: 6,
      bath: 3,
      size: "720 sq ft",
      location: "Victoria Island, Lagos",
      image: "/phouse2.jpg"
    },
    {
      id: 3,
      title: "Split-Level House",
      price: "₦340,000,000",
      bed: 6,
      bath: 3,
      size: "720 sq ft",
      location: "Victoria Island, Lagos",
      image: "/phouse3.jpg"
    },
    {
      id: 4,
      title: "Twin Duplex",
      price: "₦290,000,000",
      bed: 6,
      bath: 3,
      size: "720 sq ft",
      location: "Victoria Island, Lagos",
      image: "/phouse4.jpg"
    }
  ];

  return (
    <section className="popular-section">
      <h2 className="popular-title">Discover Our Popular Properties</h2>

      <div className="popular-wrapper">

        {/* LEFT ARROW */}
        <button className="nav-arrow left">
          <ArrowLeft size={26} />
        </button>

        {/* PROPERTY CARDS */}
        <div className="popular-cards">
          {properties.map((property) => (
            <div key={property.id} className="property-card">
              <img src={property.image} alt={property.title} className="property-img" />

              <div className="property-overlay">
                <h3>{property.title}</h3>
                <p className="property-price">{property.price}</p>

                <p className="property-meta">
                  {property.bed} Bed | {property.bath} Bath | {property.size}
                </p>

                <p className="property-location">
                  <MapPin size={14} /> {property.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT ARROW */}
        <button className="nav-arrow right">
          <ArrowRight size={26} />
        </button>

      </div>
    </section>
  );
};

export default PopularProperties;
