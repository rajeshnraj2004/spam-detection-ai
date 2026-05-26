import React from "react";
import Navbar from "../components/Navbar";

const cardStyle = {
  padding: "30px",
  borderRadius: "20px",
  border: "1px solid #E2E8F0",
};

export default function Features() {
  const features = [
    {
      title: "AI Spam Detection",
      description:
        "Classifies messages as spam or safe using a Naive Bayes model trained on the project dataset.",
    },
    {
      title: "User Authentication",
      description:
        "Sign up and log in with secure credentials. The dashboard is protected behind login.",
    },
    {
      title: "Message Analysis",
      description:
        "Paste any message on the dashboard and get an instant spam or safe result.",
    },
    {
      title: "Scan History",
      description:
        "Every analyzed message is saved to MongoDB. View your last 10 scans in recent activity.",
    },
    {
      title: "Statistics Dashboard",
      description:
        "Track total scans, spam blocked, and safe messages with live counts from the database.",
    },
    {
      title: "Visual Analytics",
      description:
        "Pie chart for spam vs safe distribution and a bar chart for weekly detection trends.",
    },
  ];

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
          Features
        </h1>

        <p style={{ color: "#64748B", fontSize: "18px", maxWidth: "700px", lineHeight: "1.7" }}>
          Everything listed here is built and available in this SpamShield project.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "25px",
            marginTop: "40px",
          }}
        >
          {features.map((item, index) => (
            <div key={index} style={cardStyle}>
              <h3 style={{ color: "#4F46E5", marginTop: 0 }}>{item.title}</h3>
              <p style={{ color: "#64748B", lineHeight: "1.7", marginBottom: 0 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
