import React, { useState } from "react";
import axios from "axios";
import "../css/Register.css"; // Import external CSS
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", department: "", password: "" });
  const [role, setRole] = useState("organiser");
  const [qrCode, setQrCode] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    console.log(role, form, "ahdshdhbh");
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/register", { role, ...form });
    console.log(res, "resresres", res.data.qrCode);
    setQrCode(res.data.qrCode);

    setForm({ name: "", email: "", department: "", password: "" });
    // setTimeout(() => {
    //   navigate("/dashboard");
    // }, 4000);
  };

  return (
    <div className="register-container">
      <div className="form-card">
        <h2>Register Attendance</h2>

        <div className="tab-container">
          <button
            type="button"
            className={`tab-btn ${role === "organiser" ? "active" : ""}`}
            onClick={() => setRole("organiser")}
          >
            Organiser
          </button>
          <button
            type="button"
            className={`tab-btn ${role === "participant" ? "active" : ""}`}
            onClick={() => setRole("participant")}
          >
            Participant
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" >
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>

        {qrCode && (
          <div className="qr-section">
            <h3>Your QR Code</h3>
            <img src={qrCode} alt="QR Code" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
