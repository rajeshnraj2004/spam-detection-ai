import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navLinkStyle = (path) => ({
    textDecoration: "none",
    color: location.pathname === path ? "#4F46E5" : "#475569",
    fontSize: "16px",
    fontWeight: "600",
    transition: "0.3s",
    padding: "8px 12px",
    borderRadius: "8px"
  });

  return (
    <div
      className="navbar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 70px",
        borderBottom: "1px solid #EEF2FF",
        backgroundColor: "#F8FAFC",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <style>{`
        .nav-link:hover {
          color: #4F46E5 !important;
        }
      `}</style>

      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <h2
          style={{
            color: "#4F46E5",
            margin: 0,
            fontWeight: "800",
            fontSize: "30px",
          }}
        >
          SpamShield
        </h2>
      </Link>

      {/* Nav Links */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Link to="/" className="nav-link" style={navLinkStyle("/")}>
          Home
        </Link>
        <Link to="/features" className="nav-link" style={navLinkStyle("/features")}>
          Features
        </Link>
        <Link to="/docs" className="nav-link" style={navLinkStyle("/docs")}>
          Docs
        </Link>
        <Link to="/about" className="nav-link" style={navLinkStyle("/about")}>
          About
        </Link>
      </div>
      

      {/* Auth Buttons */}
      <div style={{ display: "flex", gap: "15px" }}>
        {isLoggedIn ? (
          <>
            <button
              onClick={() => navigate("/dashboard")}
              style={{
                backgroundColor: "transparent",
                color: "#4F46E5",
                border: "2px solid #6366F1",
                padding: "10px 20px",
                borderRadius: "12px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Dashboard
            </button>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#EF4444",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "12px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              style={{
                backgroundColor: "transparent",
                color: "#4F46E5",
                border: "none",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              style={{
                background: "linear-gradient(90deg,#4F46E5,#6366F1)",
                color: "#fff",
                border: "none",
                padding: "12px 24px",
                borderRadius: "12px",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 8px 20px rgba(79,70,229,0.25)",
              }}
            >
              Get Started
            </button>
          </>
        )}
      </div>
    </div>
  );
}