import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      });
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#F8FAFC", minHeight: "100vh", fontFamily: "Inter, Arial, sans-serif" }}>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "80px 20px" }}>
        <div style={{ 
          padding: "40px", 
          borderRadius: "24px", 
          border: "1px solid #E2E8F0",
          width: "100%", 
          maxWidth: "450px" 
        }}>
          <h2 style={{ color: "#0F172A", fontSize: "32px", fontWeight: "800", marginBottom: "10px", textAlign: "center" }}>
            Welcome Back
          </h2>
          <p style={{ color: "#64748B", textAlign: "center", marginBottom: "30px" }}>
            Enter your credentials to access your dashboard
          </p>

          {error && (
            <div style={{ color: "#EF4444", padding: "12px", borderRadius: "12px", border: "1px solid #FCA5A5", marginBottom: "20px", fontSize: "14px", textAlign: "center" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
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
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p style={{ marginTop: "25px", color: "#64748B", textAlign: "center", fontSize: "14px" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#4F46E5", fontWeight: "700", textDecoration: "none" }}>
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
