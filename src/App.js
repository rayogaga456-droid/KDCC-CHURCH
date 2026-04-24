import React, { useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import family from "./assets/family.jpg";
import bible from "./assets/bible.jpg";

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