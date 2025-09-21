import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import bodyParser from "body-parser";
import QRCode from "qrcode";

const app = express();

// Middleware
app.use(cors()); // allows frontend requests
// app.use(bodyParser.json());
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});

mongoose.connect("mongodb://127.0.0.1:27017/event-checkin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const participantSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  role: String,
  checkedIn: { type: Boolean, default: false },
  time: String,
});

const Participant = mongoose.model("Participant", participantSchema);

app.post("/api/register", async (req, res) => {
  try {
    console.log("📩 Incoming body:", req.body);

    const { name, email, department, role } = req.body;
    if (!name || !email || !department || !role) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const existing = await Participant.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const participant = await Participant.create({ name, email, department, role });
    // await participant.save();
    console.log("✅ Saved participant:", participant);

    const qrData = `http://localhost:5000/api/checkin/${participant._id}`;
    const qrCode = await QRCode.toDataURL(qrData);

    res.json({
      success: true,
      message: "Registered successfully",
      participant: {
        id: participant._id,
        name,
        email,
        department,
        role,
      },
      qrCode,
    });
  } catch (err) {
    console.error("❌ Error in /api/register:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});


app.post("/api/checkin", async (req, res) => {
  try {
    const { qrId } = req.body;
    const participant = await Participant.findById(qrId);

    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    if (participant.checkedIn) {
      return res.json({ message: "Already checked in!" });
    }

    participant.checkedIn = true;
    participant.time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    await participant.save();
    res.json({ message: "Check-in successful" });
  } catch (err) {
    console.error("Error in check-in:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/dashboard", async (req, res) => {
  try {
    const total = await Participant.countDocuments();
    console.log(total, "totaltotaltotal");
    const checkedIn = await Participant.countDocuments({ checkedIn: true });
    console.log(checkedIn, "totaltotaltotal");
    const pending = total - checkedIn;
    console.log(pending, "pending");

    const records = await Participant.find({ checkedIn: true }, "time");
    console.log(records, 'records')
    const peakTimes = {};

    records.forEach((p) => {
      if (p.time) {
        const hour = p.time.getHours(); // extract hour from Date
        peakTimes[hour] = (peakTimes[hour] || 0) + 1;
      }
    });
    console.log(records, 'records1')

    const peakTimesArray = Object.entries(peakTimes).map(([time, count]) => ({
      time: `${time}:00`, // make it human-readable
      count,
    }));

    console.log(peakTimesArray, 'peakTimesArray')

    const insights =
      checkedIn > pending
        ? "Most participants have already checked in."
        : "Many participants are still pending check-in.";

    res.json({ total, checkedIn, pending, peakTimes: peakTimesArray, insights });
  } catch (err) {
    console.error("Error fetching dashboard:", err);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));