import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import logo from "./assets/logo.png";

const bible = "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800";
const family = "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800";

function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error for that field as user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
    setServerError("");
  };

  // ---- Validation ----
  const validate = () => {
    const newErrors = {};

    if (!isLogin && !form.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---- Login ----
  const login = async () => {
    if (!validate()) return;
    setLoading(true);
    setServerError("");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 404 || data.message?.toLowerCase().includes("not found") || data.message?.toLowerCase().includes("no account")) {
          setServerError("No account found with this email. Please sign up first.");
        } else if (res.status === 401 || data.message?.toLowerCase().includes("password") || data.message?.toLowerCase().includes("invalid")) {
          setServerError("Incorrect email or password. Please try again.");
        } else {
          setServerError(data.message || "Login failed. Please try again.");
        }
        return;
      }

      navigate("/home");
    } catch (err) {
      setServerError("Cannot connect to server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ---- Register ----
  const register = async () => {
    if (!validate()) return;
    setLoading(true);
    setServerError("");

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 409 || data.message?.toLowerCase().includes("exist") || data.message?.toLowerCase().includes("already")) {
          setServerError("An account with this email already exists. Please log in.");
        } else {
          setServerError(data.message || "Registration failed. Please try again.");
        }
        return;
      }

      setServerError("");
      setIsLogin(true);
      setForm({ name: "", email: "", password: "" });
      // Show a brief success note
      setServerError("✅ Account created! You can now log in.");
    } catch (err) {
      setServerError("Cannot connect to server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setServerError("");
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <div className="bg">
      <div className="glass-card">

        {/* IMAGE SIDE */}
        <div className="image-side">
          <img src={isLogin ? bible : family} alt="" className="side-img" />
          <div className="image-overlay">
            <p className="image-quote">
              {isLogin
                ? '"For I know the plans I have for you..." — Jer 29:11'
                : '"Come to me, all who are weary..." — Matt 11:28'}
            </p>
          </div>
        </div>

        {/* FORM SIDE */}
        <div className="form-side">

          <div className="logo-row">
            <img src={logo} alt="KDCC Logo" />
            <span>KDCC</span>
          </div>

          <h2>{isLogin ? "Welcome Back 👋" : "Join KDCC"}</h2>
          <p className="form-sub">{isLogin ? "Sign in to your account" : "Create your account today"}</p>

          {/* SERVER ERROR / SUCCESS */}
          {serverError && (
            <div className={`server-msg ${serverError.startsWith("✅") ? "success" : "error"}`}>
              {serverError}
            </div>
          )}

          {/* NAME FIELD */}
          {!isLogin && (
            <div className="field-group">
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className={errors.name ? "input-error" : ""}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>
          )}

          {/* EMAIL */}
          <div className="field-group">
            <input
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          {/* PASSWORD */}
          <div className="field-group">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <button onClick={isLogin ? login : register} disabled={loading} className="submit-btn">
            {loading ? "Please wait..." : isLogin ? "LOGIN" : "SIGN UP"}
          </button>

          <p className="switch-text" onClick={switchMode}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span>{isLogin ? "Sign Up" : "Log In"}</span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Auth;
