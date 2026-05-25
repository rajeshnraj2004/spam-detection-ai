import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { FaShieldAlt, FaEnvelopeOpenText, FaHistory, FaCheckCircle, FaExclamationTriangle, FaTrash } from "react-icons/fa";

function parseUtcTimestamp(timestamp) {
  if (!timestamp) return null;
  if (typeof timestamp === "string") {
    const value = timestamp.trim();
    if (!value.endsWith("Z") && !/[+-]\d{2}:\d{2}$/.test(value)) {
      return new Date(`${value}Z`);
    }
    return new Date(value);
  }
  return new Date(timestamp);
}

function formatPerformedTime(date) {
  if (!date || Number.isNaN(date.getTime())) return "Unknown time";

  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const timeOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit" };

  if (isToday) {
    return `Today, ${date.toLocaleTimeString([], timeOptions)}`;
  }

  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...timeOptions,
  });
}

function formatRelativeTime(date) {
  if (!date || Number.isNaN(date.getTime())) return "";

  const diffSec = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diffSec < 0) return "just now";
  if (diffSec < 5) return "just now";
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return "";
}

function ActivityTime({ timestamp }) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const date = parseUtcTimestamp(timestamp);
  const performed = formatPerformedTime(date);
  const relative = formatRelativeTime(date);

  return (
    <span style={{ color: "#94A3B8", fontSize: "12px", display: "flex", flexDirection: "column", alignItems: "flex-end", lineHeight: 1.4 }}>
      <span>{performed}</span>
      {relative && <span style={{ color: "#CBD5E1", fontSize: "11px" }}>{relative}</span>}
    </span>
  );
}

export default function Dashboard() {
  const [messageText, setMessageText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ total: 0, spam: 0, safe: 0 });
  const [dbHistory, setDbHistory] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [clearingAll, setClearingAll] = useState(false);

  const fetchData = async () => {
    try {
      const statsRes = await axios.get("http://localhost:8000/api/spam/stats");
      setStats(statsRes.data);
      const historyRes = await axios.get("http://localhost:8000/api/spam/history");
      setDbHistory(historyRes.data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
    fetchData();
  }, []);

  const handleDeleteActivity = async (messageId) => {
    setDeletingId(messageId);
    try {
      await axios.delete(`http://localhost:8000/api/spam/history/${messageId}`);
      await fetchData();
    } catch (err) {
      console.error("Failed to delete activity:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleClearAllActivity = async () => {
    if (!dbHistory.length) return;
    setClearingAll(true);
    try {
      await axios.delete("http://localhost:8000/api/spam/history");
      await fetchData();
    } catch (err) {
      console.error("Failed to clear activity:", err);
    } finally {
      setClearingAll(false);
    }
  };

  const handleCheckSpam = async () => {
    if (!messageText.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post("http://localhost:8000/api/spam/predict", {
        text: messageText,
      });
      setResult(res.data);
      setMessageText("");
      fetchData(); // Refresh stats and history
    } catch (err) {
      console.error("Spam check failed", err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    { name: "Spam", value: stats.spam },
    { name: "Safe", value: stats.safe },
  ];

  const buildWeeklyTrends = (historyItems) => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const grouped = Object.fromEntries(
      order.map((day) => [day, { name: day, safe: 0, spam: 0 }])
    );

    for (const item of Array.isArray(historyItems) ? historyItems : []) {
      if (!item?.timestamp) continue;
      const day = dayNames[new Date(item.timestamp).getDay()];
      if (item.is_spam) grouped[day].spam += 1;
      else grouped[day].safe += 1;
    }

    return order.map((day) => grouped[day]);
  };

  const weeklyChartData = buildWeeklyTrends(dbHistory);

  const COLORS = ["#EF4444", "#22C55E"];

  return (
    <div style={{ backgroundColor: "#F8FAFC", minHeight: "100vh", fontFamily: "Inter, Arial, sans-serif" }}>
      <Navbar />
      
      <div style={{ padding: "40px 70px" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ color: "#0F172A", fontSize: "32px", fontWeight: "800", margin: 0 }}>
            Welcome back, {user?.name || "User"}!
          </h1>
          <p style={{ color: "#64748B", marginTop: "8px" }}>
            Monitor your message security and analyze suspicious texts in real-time.
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px", marginBottom: "40px" }}>
          {[
            { label: "Total Scanning", value: stats.total, icon: <FaEnvelopeOpenText />, color: "#4F46E5" },
            { label: "Spam Blocked", value: stats.spam, icon: <FaShieldAlt />, color: "#EF4444" },
            { label: "Safe Messages", value: stats.safe, icon: <FaCheckCircle />, color: "#22C55E" },
          ].map((stat, i) => (
            <div key={i} style={{ padding: "25px", borderRadius: "20px", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: "20px" }}>
              <div style={{ color: stat.color, padding: "15px", borderRadius: "14px", fontSize: "24px" }}>
                {stat.icon}
              </div>
              <div>
                <p style={{ color: "#64748B", fontSize: "14px", margin: 0 }}>{stat.label}</p>
                <h3 style={{ color: "#0F172A", fontSize: "24px", fontWeight: "700", margin: "5px 0 0 0" }}>{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr", gap: "30px" }}>
          {/* Main Action Area */}
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            {/* Spam Checker card */}
            <div style={{ padding: "35px", borderRadius: "24px", border: "1px solid #E2E8F0" }}>
              <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#0F172A", marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px" }}>
                <FaShieldAlt style={{ color: "#4F46E5" }} /> New Spam Analysis
              </h2>
              <textarea
                placeholder="Paste the message content here to analyze..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                style={{
                  width: "100%",
                  height: "200px",
                  padding: "20px",
                  borderRadius: "16px",
                  border: "1px solid #E2E8F0",
                  backgroundColor: "transparent",
                  fontSize: "16px",
                  lineHeight: "1.6",
                  outline: "none",
                  resize: "none",
                  boxSizing: "border-box",
                  fontFamily: "inherit"
                }}
              />
              <button
                onClick={handleCheckSpam}
                disabled={loading}
                style={{
                  marginTop: "20px",
                  width: "100%",
                  background: "linear-gradient(90deg,#4F46E5,#6366F1)",
                  color: "#fff",
                  border: "none",
                  padding: "16px",
                  borderRadius: "14px",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "0.3s"
                }}
              >
                {loading ? "Analyzing..." : "Check for Spam"}
              </button>

              {result && (
                <div style={{ 
                  marginTop: "30px", 
                  padding: "25px", 
                  borderRadius: "16px", 
                  border: "1px solid #E2E8F0",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px"
                }}>
                  <div style={{ fontSize: "40px", color: result.spam ? "#EF4444" : "#22C55E" }}>
                    {result.spam ? <FaExclamationTriangle /> : <FaCheckCircle />}
                  </div>
                  <div>
                    <h3 style={{ margin: 0, color: "#0F172A", fontSize: "20px" }}>
                      {result.spam ? "Spam Detected!" : "Looks Safe!"}
                    </h3>
                    <p style={{ margin: "5px 0 0 0", color: "#64748B" }}>
                      {result.message}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Weekly Analytics Chart */}
            <div style={{ padding: "35px", borderRadius: "24px", border: "1px solid #E2E8F0" }}>
              <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#0F172A", marginBottom: "30px" }}>Weekly Detection Trends</h2>
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={weeklyChartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="safe" fill="#6366F1" radius={[4, 4, 0, 0]} name="Safe Messages" />
                    <Bar dataKey="spam" fill="#EF4444" radius={[4, 4, 0, 0]} name="Spam Blocked" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Sidebar Analytics */}
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            <div style={{ padding: "35px", borderRadius: "24px", border: "1px solid #E2E8F0" }}>
              <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#0F172A", marginBottom: "20px" }}>Threat Distribution</h2>
              <div style={{ width: "100%", height: 250 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ padding: "35px", borderRadius: "24px", border: "1px solid #E2E8F0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", gap: "12px" }}>
                <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#0F172A", margin: 0, display: "flex", alignItems: "center", gap: "12px" }}>
                  <FaHistory style={{ color: "#4F46E5" }} /> Recent Activity
                </h2>
                {dbHistory.length > 0 && (
                  <button
                    onClick={handleClearAllActivity}
                    disabled={clearingAll}
                    style={{
                      background: "transparent",
                      border: "1px solid #E2E8F0",
                      color: "#64748B",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: "600",
                      cursor: clearingAll ? "not-allowed" : "pointer",
                      opacity: clearingAll ? 0.6 : 1,
                    }}
                  >
                    {clearingAll ? "Clearing..." : "Clear all"}
                  </button>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                {dbHistory.length > 0 ? dbHistory.map((act, i) => (
                  <div key={act._id || i} style={{ borderBottom: i === dbHistory.length - 1 ? "none" : "1px solid #F1F5F9", paddingBottom: "15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px", gap: "8px" }}>
                      <span style={{ color: act.is_spam ? "#EF4444" : "#22C55E", fontSize: "12px", fontWeight: "700", textTransform: "uppercase" }}>
                        {act.is_spam ? "SPAM" : "SAFE"}
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <ActivityTime timestamp={act.timestamp} />
                        <button
                          onClick={() => handleDeleteActivity(act._id)}
                          disabled={deletingId === act._id}
                          title="Remove activity"
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "#94A3B8",
                            cursor: deletingId === act._id ? "not-allowed" : "pointer",
                            padding: "2px",
                            display: "flex",
                            alignItems: "center",
                            opacity: deletingId === act._id ? 0.5 : 1,
                          }}
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </div>
                    <p style={{ margin: 0, color: "#1E293B", fontSize: "14px", fontWeight: "500", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {act.text}
                    </p>
                  </div>
                )) : (
                  <p style={{ textAlign: "center", color: "#64748B" }}>No recent activity</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
