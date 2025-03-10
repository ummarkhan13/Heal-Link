const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Appointment = require("../models/appointment");
const Payment = require("../models/Payment");
const authMiddleware = require("../middlewares/auth");

// Payment processing route
router.post("/payments", authMiddleware, async (req, res) => {
  const { appointmentId, consultationFee, doctorName } = req.body;
  // console.log(appointmentId,consultationFee,doctorName);
  
  const userId = req.user.id; // Assuming user ID is extracted from the token middleware
  // console.log(userId);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if this is the user's first consultation with the doctor
    const existingPayments = await Payment.find({
      patientName: user.fullName,
      doctorName,
    });

    let discount = 0;
    if (existingPayments.length === 0) {
      discount = 0.1 * consultationFee; // 10% discount
    }

    const finalAmount = consultationFee - discount;

    // Ensure the user has enough credit
    if (user.credit < finalAmount) {
      return res.status(400).json({ message: "Insufficient credit" });
    }

    // Deduct credit and save the user
    user.credit -= finalAmount;
    await user.save();

    // Create a payment record
    const payment = new Payment({
      patientId: userId,
      patientName: user.fullName,
      doctorName,
      paymentAmount: finalAmount,
      appointmentId,
      discountApplied: discount > 0,
    });

    await payment.save();

    // Update the appointment status to "Paid"
    appointment.status = "Paid";
    await appointment.save();

    res.status(200).json({ message: "Payment successful", payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment processing failed", error: err.message });
  }
});


// Endpoint to get payments for a specific user
router.get('/user-payments', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // `authMiddleware` adds the user to `req`
    const payments = await Payment.find({ patientId: userId }).exec();
    res.status(200).json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});


module.exports = router;
