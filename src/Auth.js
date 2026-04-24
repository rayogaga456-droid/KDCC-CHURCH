import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import logo from "./assets/logo.png";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const bible = "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800";
const family = "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800";

function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }

    setServerError("");
    setSuccessMsg("");
  };

  // ✅ VALIDATION
  const validate = () => {
    const newErrors = {};

    if (!isLogin && !form.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Min 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ SAVE AUTH
  const saveAuth = (data) => {
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  };

  // 🔐 LOGIN
  const login = async () => {
    if (!validate()) return;

    setLoading(true);
    setServerError("");
    setSuccessMsg("");

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setServerError(data.message || "Login failed");
        return;
      }

      // ✅ FIX: store auth
      saveAuth(data);

      navigate("/home");

    } catch (err) {
      setServerError("Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  };

  // 📝 REGISTER
  const register = async () => {
    if (!validate()) return;

    setLoading(true);
    setServerError("");
    setSuccessMsg("");

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (
          res.status === 409 ||
          data.message?.toLowerCase().includes("exist")
        ) {
          setServerError("Email already exists. Try logging in.");
        } else {
          setServerError(data.message || "Registration failed");
        }
        return;
      }

      // ✅ AUTO LOGIN AFTER SIGNUP (FIXES YOUR LOOP)
      saveAuth(data);

      setSuccessMsg("Account created successfully 🎉");

      navigate("/home");

    } catch (err) {
      setServerError("Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setServerError("");
    setSuccessMsg("");
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
          <p className="form-sub">
            {isLogin ? "Sign in to your account" : "Create your account"}
          </p>

          {/* SERVER ERROR */}
          {serverError && (
            <div className="server-msg error">{serverError}</div>
          )}

          {/* SUCCESS */}
          {successMsg && (
            <div className="server-msg success">{successMsg}</div>
          )}

          {/* NAME */}
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
              type="email"
              name="email"
              placeholder="Email Address"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          {/* PASSWORD */}
          <div className="field-group">
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
              />
              <span
                className="toggle-pass"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            {errors.password && (
              <span className="field-error">{errors.password}</span>
            )}
          </div>

          {/* BUTTON */}
          <button
            onClick={isLogin ? login : register}
            disabled={loading}
            className="submit-btn"
          >
            {loading ? "Please wait..." : isLogin ? "LOGIN" : "SIGN UP"}
          </button>

          {/* SWITCH */}
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