import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  itemName: String,
  category: String,
  description: String,
  dateTime: String,
  location: String,
  status: String, // "Lost" or "Found"
  contact: String,
  image: String, // file path
});

const Report = mongoose.model("Report", ReportSchema);
export default Report;