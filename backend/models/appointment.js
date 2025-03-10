const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  patientId:  { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  patientName: { type: String, required: true },
  doctorName: { type: String, required: true },
  dateOfBooking: { type: Date, default: Date.now },
  dateOfAppointment: { type: Date, required: true },
  slot: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Cancelled","Paid"], default: "Pending" },
  paidAmount: { type: Number, required: true },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
