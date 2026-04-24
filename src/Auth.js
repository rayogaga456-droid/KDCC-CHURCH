import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import logo from "./assets/logo.png";
const family = "https://images.unsplash.com/photo-1511895426328-dc8714191300";
const bible = "https://images.unsplash.com/photo-1504052434569-70ad5836ab65";

function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
    await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(form)
    });

    navigate("/home");
  };

  const register = async () => {
    await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(form)
    });

    alert("Registered ✅");
    setIsLogin(true);
  };

  return (
    <div className="bg">
      <div className="glass-card">

        {/* IMAGE SIDE */}
        <div className="image-side">
          <img
            src={isLogin ? bible : family}
            alt=""
            className="side-img"
          />
        </div>

        {/* FORM SIDE */}
        <div className="form-side">

          <div className="logo-row">
            <img src={logo} alt="" />
            <span>KDCC</span>
          </div>

          <h2>{isLogin ? "Welcome Back 👋" : "Join KDCC"}</h2>

          {!isLogin && (
            <input name="name" placeholder="Full Name" onChange={handleChange}/>
          )}

          <input name="email" placeholder="Email" onChange={handleChange}/>
          <input name="password" type="password" placeholder="Password" onChange={handleChange}/>

          <button onClick={isLogin ? login : register}>
            {isLogin ? "LOGIN" : "SIGN UP"}
          </button>

          <p onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create account" : "Already have an account?"}
          </p>

        </div>
      </div>
    </div>
  );
}

export default Auth;