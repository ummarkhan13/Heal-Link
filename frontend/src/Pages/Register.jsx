import React, { useState } from "react";
import Background from "../components/Background";
// import Footer from "../components/Footer";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    address: "", // New field for address
    role: "Patient",
    medicalLicense: "",
    specialization: "",
    yearsOfExperience: "",
    clinicName: "",
    clinicAddress: "", // New field for clinic address
    consultationFee: "",
  });

  // const navigate = useNavigate()

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.phoneNumber ||
      !formData.gender ||
      !formData.dateOfBirth ||
      !formData.address // Ensure address is filled
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    if (
      formData.role === "Doctor" &&
      (!formData.medicalLicense ||
        !formData.specialization ||
        !formData.yearsOfExperience ||
        !formData.clinicName ||
        !formData.clinicAddress || // Ensure clinic address is filled
        !formData.consultationFee)
    ) {
      setError("Please fill in all required doctor fields.");
      return;
    }
    setError("");
    console.log("Registration successful:", formData);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert("Registration successful");
        console.log(await response.json());
        
        // Redirect to login page
        window.location.href = "/login";
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-b from-blue-100 to-gray-100 relative flex justify-center items-center overflow-hidden">
      {/* Background */}
      <Background />

      {/* Register Box */}
      <div className="bg-white p-12 rounded-lg shadow-lg w-full z-10 text-left max-w-screen-sm min-h-[400px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div className="flex flex-col">
            <label className="block text-gray-700 mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 mb-2" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 mb-2" htmlFor="dateOfBirth">
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* New Address Field */}
          <div className="flex flex-col">
            <label className="block text-gray-700 mb-2" htmlFor="address">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your address"
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 mb-2" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
            </select>
          </div>

          {formData.role === "Doctor" && (
            <>
              <div className="flex flex-col">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="medicalLicense"
                >
                  Medical License
                </label>
                <input
                  id="medicalLicense"
                  name="medicalLicense"
                  type="text"
                  value={formData.medicalLicense}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your medical license number"
                />
              </div>

              <div className="flex flex-col">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="specialization"
                >
                  Specialization (seperated by ,)
                </label>
                <input
                  id="specialization"
                  name="specialization"
                  type="text"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your specialization"
                />
              </div>

              <div className="flex flex-col">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="yearsOfExperience"
                >
                  Years of Experience
                </label>
                <input
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  type="number"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter years of experience"
                />
              </div>

              <div className="flex flex-col">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="clinicName"
                >
                  Clinic Name
                </label>
                <input
                  id="clinicName"
                  name="clinicName"
                  type="text"
                  value={formData.clinicName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter clinic name"
                />
              </div>

              {/* New Clinic Address Field */}
              <div className="flex flex-col">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="clinicAddress"
                >
                  Clinic Address
                </label>
                <input
                  id="clinicAddress"
                  name="clinicAddress"
                  type="text"
                  value={formData.clinicAddress}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter clinic address"
                />
              </div>

              <div className="flex flex-col">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="consultationFee"
                >
                  Consultation Fee
                </label>
                <input
                  id="consultationFee"
                  name="consultationFee"
                  type="number"
                  value={formData.consultationFee}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter consultation fee"
                />
              </div>
            </>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded font-bold hover:bg-blue-700 focus:outline-none focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
