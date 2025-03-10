import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiurl } from "../api/axios";

// Modal component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  // Close modal when clicking outside of modal content
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 p-12"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-h-[80vh] overflow-auto">
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={onClose}
        >
          X
        </button>
        {children}
        {/* Close Button inside modal */}
        <div className="mt-4 flex justify-end">
          <button
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const DoctorsList = () => {
  const [userData, setUserData] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isBookModalOpen, setBookModalOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({
    selectedDate: "",
    selectedSlot: "",
  });
  const [error, setError] = useState(null); // Added state for error handling
  const navigate = useNavigate();

  useEffect(() => {
    fetch(apiurl + "/api/doctors")
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }
      try {
        const response = await fetch(`${apiurl}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message || "Failed to fetch profile");
      }
    };

    fetchUserProfile();
  }, []);

  const handleKnowDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setModalOpen(true);
  };

  const handleBookNow = (doctor) => {
    setSelectedDoctor(doctor);
    setBookModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setBookModalOpen(false);
    setSelectedDoctor(null);
    setAppointmentDetails({ selectedDate: "", selectedSlot: "" });
  };

  const handleSlotSelection = (slot) => {
    setAppointmentDetails((prevState) => ({
      ...prevState,
      selectedSlot: slot,
    }));
  };

  const handleDateChange = (e) => {
    setAppointmentDetails((prevState) => ({
      ...prevState,
      selectedDate: e.target.value,
    }));
  };

  const handleBooking = () => {
    const { selectedDate, selectedSlot } = appointmentDetails;
    const appointmentData = {
      patientId: userData._id,
      patientName: userData.fullName,
      doctorName: selectedDoctor.fullName,
      dateOfBooking: new Date(),
      dateOfAppointment: selectedDate,
      slot: selectedSlot,
      paidAmount: selectedDoctor.consultationFee,
    };
    fetch(apiurl + "/api/Bookappointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentData),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Appointment booked successfully!");
        closeModal();
      })
      .catch((error) => console.error("Error booking appointment:", error));
  };

  return (
    <div className="p-6 flex-grow min-h-screen">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">
        Available Doctors
      </h1>
      <div className="grid grid-cols-1 w-full">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-white p-6 shadow-md rounded-lg mb-3"
          >
            <h2 className="text-xl font-bold">{doctor.specialization}</h2>
            <p className="text-gray-700">Dr. {doctor.fullName}</p>
            <p className="text-gray-600 mt-2">{doctor.description}</p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                onClick={() => handleBookNow(doctor)} // Open book modal
              >
                Book Now
              </button>
              <button
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 cursor-pointer"
                onClick={() => handleKnowDoctor(doctor)} // Open modal with doctor details
              >
                Know Your Doctor
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* // Modal for displaying doctor details (Know Your Doctor) */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedDoctor && (
          <div>
            <h2 className="text-xl font-bold mb-2 items-center">
              Dr. {selectedDoctor.fullName}
            </h2>
            <p>
              <strong>Specialization:</strong> {selectedDoctor.specialization}
            </p>
            <p>
              <strong>Gender:</strong> {selectedDoctor.gender}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {new Date(selectedDoctor.dateOfBirth).toLocaleDateString()}
            </p>
            <p>
              <strong>Years of Experience:</strong>{" "}
              {selectedDoctor.yearsOfExperience}
            </p>
            <p>
              <strong>Clinic Name:</strong> {selectedDoctor.clinicName}
            </p>
            <p>
              <strong>Clinic Address:</strong> {selectedDoctor.clinicAddress}
            </p>
            <p>
              <strong>Consultation Fee:</strong> ₹
              {selectedDoctor.consultationFee}
            </p>
            <p>
              <strong>Description:</strong> {selectedDoctor.description}
            </p>

            {/* Displaying Doctor's Availability */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Availability</h3>
              <div className="mt-2">
                {selectedDoctor.availability.length === 0 ? (
                  <p>No availability provided.</p>
                ) : (
                  selectedDoctor.availability.map((availability, index) => (
                    <div key={index} className="mt-4">
                      <p className="font-bold">{availability.day}:</p>
                      {availability.slots.length === 0 ? (
                        <p>No available slots</p>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2 items-center">
                          {availability.slots.map((slot, idx) => (
                            <div key={idx} className="border p-2 rounded-md">
                              {slot.start} - {slot.end}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
      
      {/* Modal for booking appointment */}
      <Modal isOpen={isBookModalOpen} onClose={closeModal}>
        {selectedDoctor && (
          <div>
            <h2 className="text-xl font-bold mb-2">
              Book Appointment with Dr. {selectedDoctor.fullName}
            </h2>
            <p>
              <strong>Specialization:</strong> {selectedDoctor.specialization}
            </p>
            <p>
              <strong>Consultation Fee:</strong> ₹
              {selectedDoctor.consultationFee}
            </p>

            <div className="mt-4">
              <label htmlFor="appointmentDate" className="block text-gray-600">
                Select Appointment Date
              </label>
              <input
                type="date"
                id="appointmentDate"
                className="mt-2 border p-2 w-full"
                onChange={handleDateChange}
              />

              {appointmentDetails.selectedDate && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">
                    Available Slots on {appointmentDetails.selectedDate}
                  </h3>
                  <div className="mt-2">
                    {selectedDoctor.availability
                      .filter(
                        (avail) =>
                          avail.day ===
                          new Date(
                            appointmentDetails.selectedDate
                          ).toLocaleString("en-us", { weekday: "long" })
                      )
                      .map((availability) =>
                        availability.slots.length === 0 ? (
                          <p key={availability.day}>
                            No available slots for the selected day.
                          </p>
                        ) : (
                          <div key={availability.day}>
                            {availability.slots.map((slot, idx) => (
                              <div key={idx}>
                                <input
                                  type="radio"
                                  id={`slot-${idx}`}
                                  name="slot"
                                  value={`${slot.start} - ${slot.end}`}
                                  onChange={() =>
                                    handleSlotSelection(
                                      `${slot.start} - ${slot.end}`
                                    )
                                  }
                                />
                                <label htmlFor={`slot-${idx}`} className="ml-2">
                                  {slot.start} - {slot.end}
                                </label>
                              </div>
                            ))}
                          </div>
                        )
                      )}
                  </div>
                </div>
              )}

              {appointmentDetails.selectedSlot && (
                <div className="mt-4">
                  <button
                    className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                    onClick={handleBooking}
                  >
                    Book
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DoctorsList;
