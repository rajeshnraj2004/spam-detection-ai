import React from "react";
import Navbar from "../components/Navbar";

export default function About() {
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
          About SpamShield
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
          <p>
            SpamShield is an AI-powered message protection platform
            designed to stop phishing attacks, spam messages, and
            malicious threats.
          </p>

          <p>
            Our mission is to make online communication secure using
            modern AI technologies and real-time monitoring systems.
          </p>
        </div>
      </div>
    </div>
  );
}