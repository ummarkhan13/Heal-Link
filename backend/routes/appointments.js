const express = require("express");
const Appointment = require("../models/appointment");
const router = express.Router();

// Route to create an appointment
router.post("/Bookappointments", async (req, res) => {
  try {
    const { patientId, patientName, doctorName, dateOfAppointment, slot, paidAmount } = req.body;
    
    const newAppointment = new Appointment({
      patientId,
      patientName,
      doctorName,
      dateOfAppointment,
      slot,
      paidAmount,
    });

    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



router.get("/appointments", async (req, res) => {
  const userRole = req.query.role;
  const userName = req.query.name;

  try {
    let appointments;
    if (userRole === "Patient") {
      appointments = await Appointment.find({ patientName: userName });
    } else if (userRole === "Doctor") {
      appointments = await Appointment.find({ doctorName: userName });
    } else {
      return res.status(400).json({ error: "Invalid user role" });
    }
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});


router.put("/appointments/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({ message: "Appointment status updated successfully", appointment });
  } catch (error) {
    res.status(500).json({ error: "Failed to update appointment status" });
  }
});

module.exports = router;
