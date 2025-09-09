import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import Report from "../model/Report.js";
import { verifyToken } from "./auth.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

/* ---------------- CREATE A REPORT ---------------- */
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    console.log("POST /api/report called");
    console.log("Request user:", req.user);
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    if (!req.user || !req.user.id) {
      console.error("No user info in request");
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { itemName, category, description, dateTime, location, status, contact } = req.body;

    // Validate required fields
    if (!itemName || !category || !description || !dateTime || !location || !status || !contact) {
      console.error("Missing required fields:", req.body);
      return res.status(400).json({ message: "Missing required fields" });
    }

    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const report = new Report({
      userId: new mongoose.Types.ObjectId(req.user.id), // ensure ObjectId
      itemName,
      category,
      description,
      dateTime,
      location,
      status,
      contact,
      image,
    });

    await report.save();
    console.log("Report saved with ID:", report._id);
    res.status(201).json({ message: "Report submitted", report });
  } catch (err) {
    console.error("Error in POST /api/report:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/* ---------------- UPDATE A REPORT ---------------- */
router.put("/:id", verifyToken, upload.single("image"), async (req, res) => {
  try {
    console.log("PUT /api/report/:id called");
    console.log("Request params:", req.params);
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { itemName, category, description, dateTime, location, status, contact } = req.body;

    // Check if report exists and belongs to user
    const existingReport = await Report.findOne({
      _id: req.params.id,
      userId: new mongoose.Types.ObjectId(req.user.id)
    });

    if (!existingReport) {
      return res.status(404).json({ message: "Report not found or access denied" });
    }

    // Update fields
    existingReport.itemName = itemName || existingReport.itemName;
    existingReport.category = category || existingReport.category;
    existingReport.description = description || existingReport.description;
    existingReport.dateTime = dateTime || existingReport.dateTime;
    existingReport.location = location || existingReport.location;
    existingReport.status = status || existingReport.status;
    existingReport.contact = contact || existingReport.contact;

    // Update image if new file is uploaded
    if (req.file) {
      existingReport.image = `/uploads/${req.file.filename}`;
    }

    await existingReport.save();
    console.log("Report updated with ID:", existingReport._id);
    res.json({ message: "Report updated", report: existingReport });
  } catch (err) {
    console.error("Error in PUT /api/report/:id:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/* ---------------- DELETE A REPORT ---------------- */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    console.log("DELETE /api/report/:id called");
    console.log("Request params:", req.params);

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Check if report exists and belongs to user
    const report = await Report.findOne({
      _id: req.params.id,
      userId: new mongoose.Types.ObjectId(req.user.id)
    });

    if (!report) {
      return res.status(404).json({ message: "Report not found or access denied" });
    }

    await Report.findByIdAndDelete(req.params.id);
    console.log("Report deleted with ID:", req.params.id);
    res.json({ message: "Report deleted successfully" });
  } catch (err) {
    console.error("Error in DELETE /api/report/:id:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/* ---------------- GET REPORTS FOR LOGGED-IN USER ---------------- */
router.get("/my", verifyToken, async (req, res) => {
  try {
    console.log("GET /api/report/my called");
    console.log("Request user:", req.user);

    if (!req.user || !req.user.id) {
      console.error("No user info in request");
      return res.status(401).json({ message: "User not authenticated" });
    }

    const reports = await Report.find({
      userId: new mongoose.Types.ObjectId(req.user.id),
    });

    console.log("User reports found:", reports.length);
    res.json(reports);
  } catch (err) {
    console.error("Error in GET /api/report/my:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/* ---------------- GET ALL REPORTS ---------------- */
router.get("/all", async (req, res) => {
  try {
    console.log("GET /api/report/all called");
    const reports = await Report.find();
    console.log("All reports found:", reports.length);
    res.json(reports);
  } catch (err) {
    console.error("Error in GET /api/report/all:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;