import React, { useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(form)
    });
    alert("Registered ✅");
  };

  const login = async () => {
    await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(form)
    });
    alert("Logged in ✅");
  };

  return (
    <div className="auth-wrapper">

      {/* LEFT SIDE IMAGE */}
      <div className={`auth-image ${isLogin ? "login" : "signup"}`}>
        <div className="overlay">
          <img src={logo} alt="KDCC Logo" className="logo"/>
          <h1>KDCC</h1>
          <p>Raising Kingdom Diplomats</p>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="auth-form">
        <h2>{isLogin ? "Welcome Back" : "Join KDCC"}</h2>

        {!isLogin && (
          <input name="name" placeholder="Full Name" onChange={handleChange}/>
        )}

        <input name="email" placeholder="Email" onChange={handleChange}/>
        <input name="password" type="password" placeholder="Password" onChange={handleChange}/>

        <button onClick={isLogin ? login : register}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p onClick={() => setIsLogin(!isLogin)} className="switch">
          {isLogin ? "Create account" : "Already have an account?"}
        </p>
      </div>

    </div>
  );
}

export default App;