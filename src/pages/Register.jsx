import React, { useState } from "react";
import axios from "axios";
import "../css/Register.css"; // Import external CSS
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", department: "", password: "" });
  const [role, setRole] = useState("organiser");
  const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    console.log(role, form, "ahdshdhbh");
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/register", {
        role,
        ...form,
      });
      setQrCode(res.data.qrCode);

      setForm({ name: "", email: "", department: "", password: "" });
      setError("");

      // 👇 Show success toast
      toast.success("Registered successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Optionally navigate after a delay
      // setTimeout(() => navigate("/dashboard"), 3500);
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");

      // 👇 Show error toast
      toast.error("Registration failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
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
          {/* <input
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          /> */}

          <div className="password-wrapper">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {error && <p className="error-text">{error}</p>}
          <button type="submit">Register</button>
        </form>

        {qrCode && (
          <div className="qr-section">
            <h3>Your QR Code</h3>
            <img src={qrCode} alt="QR Code" />
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
