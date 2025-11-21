import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT COLUMN — BRAND */}
        <div className="footer-col footer-brand">
          <div className="footer-logo-box">
            <div className="footer-logo">BH</div>
            <span className="footer-brand-name">BetaHouse</span>
          </div>

          <p className="footer-description">
            Discover, rent, and find your ideal home hassle-free with
            BetaHouse. Take control of your rental journey today!
          </p>

          <div className="footer-contact">

            <div className="contact-item">
              <MapPin size={20} color="#fff" />
              <span>95 Tinubu Estate, Lekki, Lagos</span>
            </div>

            <div className="contact-item">
              <Phone size={20} color="#fff" />
              <span>+234 675 8935 675</span>
            </div>

            <div className="contact-item">
              <Mail size={20} color="#fff" />
              <span>support@rentbetahouse.com</span>
            </div>

          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/properties">Properties</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact us</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        {/* MORE */}
        <div className="footer-col">
          <h3>More</h3>
          <ul>
            <li>Agents</li>
            <li>Affordable Houses</li>
            <li>FAQ’s</li>
          </ul>
        </div>

        {/* POPULAR SEARCH */}
        <div className="footer-col">
          <h3>Popular Search</h3>
          <ul>
            <li>Apartment for sale</li>
            <li>Apartment for rent</li>
            <li>3 bedroom flat</li>
            <li>Bungalow</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>Copyright 2025 Betahouse | Designed by Michael.fig</p>
        <span>Privacy Policy</span>
      </div>
    </footer>
  );
}
