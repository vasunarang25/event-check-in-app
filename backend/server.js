import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import QRCode from "qrcode";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // allows frontend requests
app.use(bodyParser.json());

// Example route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});

// Example API endpoint
app.post("/api/register", async (req, res) => {
  const { name, email, department, role } = req.body;
  console.log("Received:", req.body);

  try {
    // Generate QR Code (string as base64 image)
    const qrCode = await QRCode.toDataURL(
      JSON.stringify({ name, email, department, role })
    );

    res.json({
      success: true,
      message: "User registered",
      data: { name, email, department, role },
      qrCode, // 👈 now returning QR code
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "QR Code generation failed" });
  }
});

app.get("/api/dashboard", (req, res) => {
    console.log(req, "request");
    res.json({
        success: true,
        message: "User registered",
        data: { name, email, department, role },
        qrCode, // 👈 now returning QR code
    });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});