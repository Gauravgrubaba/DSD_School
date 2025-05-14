import React, { useState } from "react";

const Admission = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    fatherName: "",
    motherName: "",
    email: "",
    phone: "",
    class: "",
    message: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setScannerOpen(true); // Open scanner after form submission
  };

  // Simulate successful payment scan
  const handlePaymentScan = () => {
    setSubmitted(true);
    setScannerOpen(false);
    setFormOpen(false);
  };

  return (
    <div className="pt-24 container mx-auto px-4 py-6">
      {/* Scrolling News Bar */}
      <div className="bg-blue-600 text-white py-2 overflow-hidden whitespace-nowrap">
        <marquee behavior="scroll" direction="left" className="text-lg font-semibold">
          🔹 Admissions Open for 2025-26! Apply Now! 🔹 Last Date: 30th April 2025 🔹 Limited Seats Available!
        </marquee>
      </div>

      {/* Button to Open Admission Form */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setFormOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-blue-800 transition"
        >
          Fill Admission Form
        </button>
      </div>

      {/* Admission Form Below the Header */}
      {formOpen && (
        <div className="mt-8 bg-white p-8 rounded-xl shadow-lg border border-gray-200 transition-transform transform scale-95 animate-fadeIn w-full max-w-lg mx-auto">
          <h3 className="text-3xl font-bold text-blue-700 text-center mb-4">Admission Form</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input type="text" name="fatherName" placeholder="Father's Name" value={formData.fatherName} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input type="text" name="motherName" placeholder="Mother's Name" value={formData.motherName} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <select name="class" value={formData.class} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Class</option>
              <option value="1">Class 1</option>
              <option value="2">Class 2</option>
              <option value="3">Class 3</option>
              <option value="4">Class 4</option>
              <option value="5">Class 5</option>
            </select>
            <textarea name="message" placeholder="Additional Message (Optional)" value={formData.message} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            
            {/* Payment Button (Inside the Form, Styled Properly) */}
            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-green-800 transition">
              Proceed to Payment
            </button>
          </form>

          {/* Close Form Button */}
          <button onClick={() => setFormOpen(false)} className="mt-3 text-red-600 font-semibold hover:underline block text-center w-full">
            Close
          </button>
        </div>
      )}

      {/* Fullscreen QR Scanner for Payment */}
      {scannerOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl text-center relative">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Scan QR Code to Pay</h3>
            <img
              src="https://via.placeholder.com/400x400" // Replace with actual QR code image
              alt="QR Code"
              className="mx-auto w-96 h-96"
            />
            <p className="text-gray-600 mt-2">Use any UPI app to scan & pay.</p>

            {/* Simulating successful scan */}
            <button
              onClick={handlePaymentScan}
              className="mt-4 bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-800 transition"
            >
              Payment Completed
            </button>

            {/* Close Scanner Option */}
            <button onClick={() => setScannerOpen(false)} className="absolute top-4 right-4 text-red-600 font-semibold hover:underline">
              ✖
            </button>
          </div>
        </div>
      )}

      {/* Success Message */}
      {submitted && (
        <div className="mt-6 text-center text-green-700 font-semibold text-xl">
          ✅ Admission Form Successfully Submitted & Fee Paid!
        </div>
      )}
    </div>
  );
};

export default Admission;
