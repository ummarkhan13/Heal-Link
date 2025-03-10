// models/User.js
const mongoose = require("mongoose");

const TimeSlotSchema = new mongoose.Schema({
  start: { type: String, required: true }, // Start time in HH:MM format
  end: { type: String, required: true },   // End time in HH:MM format
});

const AvailabilitySchema = new mongoose.Schema({
  day: { type: String, required: true }, // Day of the week
  slots: [TimeSlotSchema],              // Array of time slots
});

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  address: { type: String, required: true },
  role: { type: String, required: true },
  credit: { type: Number, default: 1000 },
  medicalLicense: { type: String },
  specialization: { type: String },
  yearsOfExperience: { type: Number },
  clinicName: { type: String },
  clinicAddress: { type: String },
  consultationFee: { type: Number },
  description: { type: String, default: "" },
  availability: { type: [AvailabilitySchema], default: [] }, // Add availability field
});

// Set default availability for doctors
UserSchema.pre("save", function (next) {
  if (this.role === "Doctor" && this.availability.length === 0) {
    this.availability = [
      { day: "Monday", slots: [{ start: "09:00", end: "13:00" }, { start: "15:00", end: "18:00" }] },
      { day: "Tuesday", slots: [{ start: "09:00", end: "13:00" }, { start: "15:00", end: "18:00" }] },
      { day: "Wednesday", slots: [{ start: "09:00", end: "13:00" }, { start: "15:00", end: "18:00" }] },
      { day: "Thursday", slots: [{ start: "09:00", end: "13:00" }, { start: "15:00", end: "18:00" }] },
      { day: "Friday", slots: [{ start: "09:00", end: "13:00" }, { start: "15:00", end: "18:00" }] },
      { day: "Saturday", slots: [{ start: "10:00", end: "14:00" }] },
      { day: "Sunday", slots: [] },
    ];
  }
  next();
});

module.exports = mongoose.model("user", UserSchema);
