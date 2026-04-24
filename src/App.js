import React, { useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";
const family = "https://images.unsplash.com/photo-1511895426328-dc8714191300";
const bible = "https://images.unsplash.com/photo-1504052434569-70ad5836ab65";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg">

      <div className="glass-card">

        {/* LEFT IMAGE */}
        <div className="image-side">
          <img
            src={isLogin ? bible : family}
            alt="visual"
            className="side-img"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="form-side">

          <div className="logo-row">
            <img src={logo} alt="logo" />
            <span>KDCC</span>
          </div>

          <h2>Welcome Back 👋</h2>

          {!isLogin && <input placeholder="Full Name" />}
          <input placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button>
            {isLogin ? "Login" : "Sign Up"}
          </button>

          <p onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create account" : "Already have an account?"}
          </p>

        </div>

      </div>

    </div>
  );
}

export default App;