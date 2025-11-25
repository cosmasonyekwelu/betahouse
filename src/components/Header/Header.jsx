import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

import "./Header.css";
import defaultAvatar from "/avatar.png";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

 
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    } catch (err) {
      console.error("Invalid JSON in localStorage for 'user'");
      localStorage.removeItem("user");
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setOpenDropdown(false);
    navigate("/signin");
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenDropdown(false);
  };

  return (
    <header className="header">
      <div className="header-container">

        {/* BRAND */}
        <div className="header-brand">
          <div className="header-logo">BH</div>
          <span className="header-brand-name">BetaHouse</span>
        </div>

        {/* DESKTOP NAV */}
        <nav className="desktop-nav">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>

          <Link
            to="/properties"
            className={location.pathname.startsWith("/properties") ? "active" : ""}
          >
            Properties
          </Link>

       <Link
  to="#"
  onClick={(e) => e.preventDefault()}
  className="nav-disabled"
>
  About Us
</Link>

<Link
  to="#"
  onClick={(e) => e.preventDefault()}
  className="nav-disabled"
>
  Blog
</Link>

<Link
  to="#"
  onClick={(e) => e.preventDefault()}
  className="nav-disabled"
>
  Contact Us
</Link>

        </nav>

        {/* DESKTOP AUTH */}
        <div className="desktop-auth">
          {!user ? (
            <>
              <Link to="/signin" className="btn-outline">Sign in</Link>
              <Link to="/signup" className="btn-primary">Sign up</Link>
            </>
          ) : (
            <div className="header-profile" onClick={() => setOpenDropdown(!openDropdown)}>
              <img src={user.avatar || defaultAvatar} className="profile-avatar" alt="" />
              <span className="profile-name">{user.name}</span>
              <ChevronDown size={18} />

              {openDropdown && (
                <div className="profile-dropdown">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE SLIDE MENU */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <nav className="mobile-nav">
          <Link to="/" onClick={closeMobileMenu}>Home</Link>
          <Link to="/properties" onClick={closeMobileMenu}>Properties</Link>
          <Link to="/about" onClick={closeMobileMenu}>About Us</Link>
          <Link to="/contact" onClick={closeMobileMenu}>Contact Us</Link>

          {!user ? (
            <div className="mobile-auth">
              <Link to="/signin" className="btn-outline" onClick={closeMobileMenu}>Sign in</Link>
              <Link to="/signup" className="btn-primary" onClick={closeMobileMenu}>Sign up</Link>
            </div>
          ) : (
            <button className="mobile-logout-btn" onClick={handleLogout}>Logout</button>
          )}
        </nav>
      </div>
    </header>
  );
}
