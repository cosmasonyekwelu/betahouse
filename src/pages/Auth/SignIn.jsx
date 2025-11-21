import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";        
import "./SignIn.css";


import authImg from "../../assets/auth.jpg";
import googleIcon from "../../assets/google-icon.png";

export default function SignIn() {
  const navigate = useNavigate();


  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");


  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.email || !form.password) {
      setErrorMsg("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

    
      const res = await API.post("/auth/signin", form);

  
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

     
      navigate("/properties");

    } catch (err) {
      if (err.response?.data?.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">

      {/* LEFT PANEL */}
      <div className="signin-left">

        <h1 className="signin-title">Welcome Back to BetaHouse!</h1>

        <p className="signin-subtitle">
          Lets get started by filling out the information below
        </p>

        {/* ERROR */}
        {errorMsg && <div className="signin-error">{errorMsg}</div>}

        <form className="signin-form" onSubmit={handleSubmit}>

          <div className="signin-field">
            <label>Email</label>
            <input 
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your Email"
            />
          </div>

          <div className="signin-field">
            <label>Password</label>
            <input 
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <div className="signin-row">
            <label className="signin-checkbox">
              <input type="checkbox" defaultChecked />
              Remember Me
            </label>

            <button type="button" className="signin-forgot">
              Forgot Password
            </button>
          </div>

          <button className="signin-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <div className="signin-or"><span>or</span></div>

          <button type="button" className="signin-google">
            <img src={googleIcon} alt="Google" />
            Continue with Google
          </button>

          <p className="signin-bottom">
            New User? <Link to="/signup">Sign Up</Link>
          </p>

        </form>

      </div>

      {/* RIGHT IMAGE */}
      <div className="signin-right">
        <div className="signin-logo">
          <div className="signin-logo-circle">BH</div>
          <span>BetaHouse</span>
        </div>

        <img 
          src={authImg}
          className="signin-image"
          alt="Auth"
        />
      </div>

    </div>
  );
}
