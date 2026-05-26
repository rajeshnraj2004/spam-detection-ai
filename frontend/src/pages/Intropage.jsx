import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Navbar from "../components/Navbar";

export default function Intropage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#F8FAFC",
        minHeight: "100vh",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <Navbar />

      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "80px 70px",
          gap: "50px",
          flexWrap: "wrap",
        }}
      >
        {/* Left Content */}
        <div style={{ flex: 1, minWidth: "320px" }}>
          <div
            style={{
              width: "fit-content",
              padding: "10px 18px",
              borderRadius: "50px",
              border: "1px solid #E2E8F0",
              color: "#4F46E5",
              fontWeight: "600",
              marginBottom: "25px",
            }}
          >
            🚀 AI Message Security Platform
          </div>

          <h1
            style={{
              fontSize: "70px",
              lineHeight: "1.1",
              color: "#0F172A",
              marginBottom: "25px",
              fontWeight: "800",
            }}
          >
            AI Powered{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg,#4F46E5,#6366F1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Spam Detection
            </span>
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#64748B",
              lineHeight: "1.8",
              marginBottom: "40px",
              maxWidth: "600px",
            }}
          >
            SpamShield uses AI-powered protection to detect phishing,
            malicious links, and spam messages with industry-level accuracy.
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={handleGetStarted}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background:
                  "linear-gradient(90deg,#4F46E5,#6366F1)",
                color: "#fff",
                border: "none",
                padding: "16px 28px",
                borderRadius: "14px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 10px 25px rgba(79,70,229,0.25)",
              }}
            >
              Try it Now
              <FaArrowRight />
            </button>

            <button
              style={{
                backgroundColor: "transparent",
                color: "#4F46E5",
                border: "2px solid #6366F1",
                padding: "15px 28px",
                borderRadius: "14px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: "40px",
              marginTop: "50px",
              flexWrap: "wrap",
            }}
          >
            {[
              { num: "99.9%", text: "Spam Accuracy" },
              { num: "10M+", text: "Messages Protected" },
              { num: "24/7", text: "Live Monitoring" },
            ].map((item, index) => (
              <div key={index}>
                <h2
                  style={{
                    color: "#4F46E5",
                    margin: 0,
                    fontSize: "32px",
                  }}
                >
                  {item.num}
                </h2>

                <p
                  style={{
                    color: "#64748B",
                    marginTop: "8px",
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Hero Image */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "320px",
          }}
        >
          <div
            style={{
              padding: "20px",
              borderRadius: "30px",
              border: "1px solid #E2E8F0",
              position: "relative",
            }}
          >
            <img
              src="/src/assets/hero.png"
              alt="Hero"
              style={{
                width: "100%",
                maxWidth: "550px",
                borderRadius: "20px",
              }}
            />

            {/* Floating Status Card */}
            <div
              style={{
                position: "absolute",
                bottom: "-20px",
                left: "-20px",
                padding: "18px 22px",
                borderRadius: "18px",
                border: "1px solid #E2E8F0",
              }}
            >
              <h4
                style={{
                  color: "#22C55E",
                  margin: 0,
                  marginBottom: "8px",
                }}
              >
                ✓ Spam Blocked
              </h4>

              <p
                style={{
                  margin: 0,
                  color: "#64748B",
                  fontSize: "14px",
                }}
              >
                12 suspicious messages filtered today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}