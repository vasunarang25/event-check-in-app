import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckIn = () => {
  const [qrId, setQrId] = useState("");
  const [message, setMessage] = useState("");

  const handleCheckIn = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/checkin", { qrId });
      setMessage(res.data.message);
      setQrId("")
      toast.success("Check-In successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      setMessage("Error: " + err.response?.data?.message || err.message);
      toast.error("Registration failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Check-In</h1>

      {/* Input for testing check-in manually */}
      <input
        type="text"
        placeholder="Enter QR ID"
        value={qrId}
        onChange={(e) => setQrId(e.target.value)}
        className="border p-2 rounded w-80 mb-4"
        required
      />

      <button
        onClick={handleCheckIn}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit Check-In
      </button>

      {/* {message && <p className="mt-4 text-lg">{message}</p>} */}
      <ToastContainer />
    </div>
  );
};

export default CheckIn;
