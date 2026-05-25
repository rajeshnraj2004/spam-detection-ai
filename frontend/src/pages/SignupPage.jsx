import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:8000/api/auth/register", {
        name,
        email,
        password,
      });
      if (res.data.success) {
        // Automatically login or redirect to login
        navigate("/login");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#F8FAFC", minHeight: "100vh", fontFamily: "Inter, Arial, sans-serif" }}>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px 20px" }}>
        <div style={{ 
          padding: "40px", 
          borderRadius: "24px", 
          border: "1px solid #E2E8F0",
          width: "100%", 
          maxWidth: "450px" 
        }}>
          <h2 style={{ color: "#0F172A", fontSize: "32px", fontWeight: "800", marginBottom: "10px", textAlign: "center" }}>
            Create Account
          </h2>
          <p style={{ color: "#64748B", textAlign: "center", marginBottom: "30px" }}>
            Join SpamShield today for better message security
          </p>

          {error && (
            <div style={{ color: "#EF4444", padding: "12px", borderRadius: "12px", border: "1px solid #FCA5A5", marginBottom: "20px", fontSize: "14px", textAlign: "center" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSignup}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", color: "#475569", marginBottom: "8px", fontWeight: "600" }}>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid #E2E8F0",
                  backgroundColor: "transparent",
                  outline: "none",
                  fontSize: "16px",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", color: "#475569", marginBottom: "8px", fontWeight: "600" }}>Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid #E2E8F0",
                  backgroundColor: "transparent",
                  outline: "none",
                  fontSize: "16px",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{ marginBottom: "30px" }}>
              <label style={{ display: "block", color: "#475569", marginBottom: "8px", fontWeight: "600" }}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid #E2E8F0",
                  backgroundColor: "transparent",
                  outline: "none",
                  fontSize: "16px",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: "linear-gradient(90deg,#4F46E5,#6366F1)",
                color: "#fff",
                border: "none",
                padding: "16px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 10px 20px rgba(79,70,229,0.2)",
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p style={{ marginTop: "25px", color: "#64748B", textAlign: "center", fontSize: "14px" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#4F46E5", fontWeight: "700", textDecoration: "none" }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
