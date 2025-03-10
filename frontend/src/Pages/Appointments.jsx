import React, { useEffect, useState } from "react";
import { apiurl } from "../api/axios";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  // console.log(appointments);
  const [userRole, setUserRole] = useState(null); // To store the user's role
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        // Fetch user profile
        const profileResponse = await fetch(`${apiurl}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = await profileResponse.json();
        setUserRole(userData.role); // Store the user's role

        // Fetch appointments based on role
        const appointmentsResponse = await fetch(
          `${apiurl}/api/appointments?role=${userData.role}&name=${userData.fullName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const appointmentsData = await appointmentsResponse.json();
        setAppointments(appointmentsData);
      } catch (err) {
        setError(err.message || "Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const updateStatus = async (appointmentId, newStatus) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${apiurl}/api/appointments/${appointmentId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update status to ${newStatus}`);
      }

      // Update the state with the updated appointment
      const updatedAppointment = await response.json();
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? updatedAppointment.appointment
            : appointment
        )
      );
    } catch (err) {
      console.error(err);
      alert(err.message || `Failed to update status to ${newStatus}`);
    }
  };

  const handlePayment = async (appointmentId, consultationFee, doctorName) => {
    // console.log(appointmentId);
    // console.log(consultationFee);
    // console.log(doctorName);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${apiurl}/api/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({appointmentId, consultationFee, doctorName }),
      });
  
      if (!response.ok) {
        throw new Error("Payment failed");
      }
  
      // Remove the appointment or update the state after payment
      const updatedAppointments = await response.json();
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== appointmentId)
      );
  
      alert("Payment successful!");

    } catch (err) {
      console.error(err);
      alert(err.message || "Payment failed");
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-xl font-bold">Appointments</h1>
      {appointments.length > 0 ? (
        <ul className="mt-4">
          {appointments.map((appointment) => (
            <li
              key={appointment._id}
              className="relative p-6 border rounded-lg mb-4 shadow-sm"
            >
              {/* Status Badge */}
              <span
                className={`absolute top-8 right-10 px-6 py-1 text-sm font-semibold rounded-full ${
                  appointment.status === "Pending"
                    ? "bg-yellow-500 text-black"
                    : appointment.status === "Cancelled"
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {appointment.status}
              </span>

              <p>
                <strong>Patient Name:</strong> {appointment.patientName}
              </p>
              <p>
                <strong>Doctor Name:</strong> {appointment.doctorName}
              </p>
              <p>
                <strong>Date of Booking:</strong>{" "}
                {new Date(appointment.dateOfBooking).toLocaleDateString()}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(appointment.dateOfAppointment).toLocaleDateString()}
              </p>
              <p>
                <strong>Time Slot:</strong> {appointment.slot}
              </p>
              <p>
                <strong>Paid Amount:</strong> ₹{appointment.paidAmount}
              </p>

              {userRole === "Doctor" && appointment.status === "Pending" && (
                <div className="flex gap-4 mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    onClick={() => updateStatus(appointment._id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    onClick={() => updateStatus(appointment._id, "Cancelled")}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/* ...other appointment details */}
              {userRole === "Patient" && appointment.status === "Approved" && (
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mt-4"
                  onClick={() =>
                    handlePayment(
                      appointment._id,
                      appointment.paidAmount,
                      appointment.doctorName
                    )
                  }
                >
                  Pay ₹{appointment.paidAmount}
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
}
