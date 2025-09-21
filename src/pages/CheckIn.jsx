import React, { useState } from "react";
import axios from "axios";

const CheckIn = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleCheckIn = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/attendees/checkin", { email });
      setMessage(`✅ ${res.data.name} checked in`);
    } catch (err) {
      setMessage("❌ Check-in failed");
    }
  };

  return (
    <div>
      <h2>Check In</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
      <button onClick={handleCheckIn}>Check In</button>
      <p>{message}</p>
    </div>
  );
};

export default CheckIn;
