import React from "react";
import "./PropertyCard.css";
import {
  MapPin,
  BedDouble,
  Bath,
  Heart,
  Share2,
  Camera,
  BadgeCheck
} from "lucide-react";

export default function PropertyCard({ data }) {
  const imageUrl =
    data.images?.[0] ||
    data.image ||
    "https://placehold.co/600x400?text=No+Image";

  const city = data.location?.city || "";
  const area = data.location?.area || "";

  return (
    <article className="card">
      {/* IMAGE */}
      <div
        className="card-media"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {/* BADGES */}
        <div className="badges">
          {data.featured && <span className="badge-featured">Featured</span>}
          <span className="badge-type">
            {data.status === "sale" ? "For Sale" : "For Rent"}
          </span>
        </div>

        {/* TOOLS (right bottom icons) */}
        <div className="tools">
          <button><Camera size={18} /></button>
          <button><BadgeCheck size={18} /></button>
        </div>
      </div>

      {/* CARD BODY */}
      <div className="card-body">
        <h3 className="title">{data.title}</h3>

        {/* LOCATION */}
        <div className="meta">
          <MapPin size={16} />{" "}
          <span>
            {area}, {city}
          </span>
        </div>

        {/* BED / BATH */}
        <div className="specs">
          <div>
            <BedDouble size={16} /> {data.bedrooms} Bedrooms
          </div>
          <div>
            <Bath size={16} /> {data.bathrooms} Bathrooms
          </div>
        </div>

        {/* PRICE + ACTIONS */}
        <div className="footer-row">
          <div className="price">
            ₦ {Number(data.price).toLocaleString()}{" "}
            {data.status === "rent" && "/ Year"}
          </div>

          <div className="actions">
            <Share2 size={18} />
            <Heart size={18} />
          </div>
        </div>
      </div>
    </article>
  );
}
