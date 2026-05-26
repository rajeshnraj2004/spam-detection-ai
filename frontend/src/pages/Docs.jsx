import React from "react";
import Navbar from "../components/Navbar";

export default function Docs() {
  return (
    <div
      style={{
        backgroundColor: "#F8FAFC",
        minHeight: "100vh",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <Navbar />

      <div style={{ padding: "70px" }}>
        <h1
          style={{
            color: "#0F172A",
            fontSize: "55px",
            marginBottom: "20px",
          }}
        >
          Documentation
        </h1>

        <div
          style={{
            padding: "35px",
            borderRadius: "20px",
            border: "1px solid #E2E8F0",
            lineHeight: "2",
            color: "#475569",
          }}
        >
          <h3 style={{ color: "#4F46E5" }}>Getting Started</h3>

          <p>
            1. Start the FastAPI backend and React frontend
            <br />
            2. Create an account on the signup page
            <br />
            3. Log in and open the dashboard
            <br />
            4. Paste a message and run spam analysis
          </p>

          <h3 style={{ color: "#4F46E5" }}>API Endpoints</h3>

          <p>
            <strong>Auth:</strong> POST /api/auth/register, POST /api/auth/login
            <br />
            <strong>Spam:</strong> POST /api/spam/predict, GET /api/spam/history, GET /api/spam/stats,
            DELETE /api/spam/history/:id, DELETE /api/spam/history (clear all)
          </p>
        </div>
      </div>
    </div>
  );
}