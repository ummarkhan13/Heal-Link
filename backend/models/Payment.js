const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  patientId:  { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  patientName: { type: String, required: true },
  doctorName: { type: String, required: true },
  paymentAmount: { type: Number, required: true },
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
  discountApplied: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
