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
  return (
    <article className="card">
      {/* IMAGE */}
      <div
        className="card-media"
        style={{ backgroundImage: `url(${data.image})` }}
      >
        {/* BADGES */}
        <div className="badges">
          {data.featured && <span className="badge-featured">Featured</span>}
          <span className="badge-type">{data.for}</span>
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
          <MapPin size={16} /> <span>{data.location}</span>
        </div>

        {/* BED / BATH */}
        <div className="specs">
          <div><BedDouble size={16} /> {data.bedrooms} Bedrooms</div>
          <div><Bath size={16} /> {data.bathrooms} Bathrooms</div>
        </div>

        {/* PRICE + ACTIONS */}
        <div className="footer-row">
          <div className="price">
            ₦ {data.price.toLocaleString()} {data.rent && "/ Year"}
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
