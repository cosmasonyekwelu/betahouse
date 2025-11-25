import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import "./SignUp.css";

import authImg from "/auth.jpg";
import googleIcon from "/google-icon.png";

export default function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: true,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Validation
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setErrorMsg("Please fill out all fields.");
      return;
    }

    if (form.password.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (!form.agree) {
      setErrorMsg("You must agree to the Terms & Privacy Policy.");
      return;
    }

    const payload = {
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      password: form.password,
    };

    try {
      setLoading(true);

      const res = await API.post("/auth/signup", payload);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/properties");
    } catch (err) {
      if (err.response?.data?.message) {
        setErrorMsg(err.response.data.message);
      } else if (err.response?.data?.errors) {
        setErrorMsg(err.response.data.errors[0].msg);
      } else {
        setErrorMsg("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">

      {/* LEFT PANEL */}
      <div className="signup-left">

        <h1 className="signup-title">
          Join our community of home seekers and explore new possibilities.
        </h1>

        <p className="signup-subtitle">
          Let's get started by filling out the information below.
        </p>

        {errorMsg && <div className="signup-error">{errorMsg}</div>}

        <form className="signup-form" onSubmit={handleSubmit}>

          <div className="signup-row">
            <div className="signup-field">
              <label>First Name</label>
              <input
                type="text"
                placeholder="Enter name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="signup-field">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Enter name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="signup-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="signup-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="signup-field">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <label className="signup-checkbox">
            <input
              type="checkbox"
              checked={form.agree}
              onChange={(e) => setForm({ ...form, agree: e.target.checked })}
            />
            I agree to <span>Terms of Service</span> and <span>Privacy Policy</span>
          </label>

          <button className="signup-btn" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>

          <div className="signup-or"><span>or</span></div>

          <button type="button" className="signup-google">
            <img src={googleIcon} alt="Google" />
            Continue with Google
          </button>

          <p className="signup-bottom">
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>

        </form>
      </div>

      {/* RIGHT PANEL */}
      <div className="signup-right">

        {/* CLICKABLE LOGO */}
        <Link to="/" className="signup-logo">
          <div className="signup-logo-circle">BH</div>
          <span>BetaHouse</span>
        </Link>

        <img
          src={authImg}
          alt="Signup"
          className="signup-image"
        />
      </div>
    </div>
  );
}
