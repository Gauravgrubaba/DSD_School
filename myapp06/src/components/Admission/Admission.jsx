import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Admission = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    currentAddress: "",
    permanentAddress: "",
    city: "",
    state: "",
    pincode: "",
    classApplied: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleDownload = async () => {
    const element = formRef.current;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("DSD_Admission_Form.pdf");
  };

  const inputClasses =
    "border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="pt-28 p-4 bg-gray-100 min-h-screen">
      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6"
        >
          <div className="bg-blue-900 text-white py-6 px-6 rounded-t-lg mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">DSD SCHOOL</h1>
              <h2 className="text-md uppercase tracking-wide">
                Educational & Literary Academy
              </h2>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-center mb-4">
            Admission Form
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="Full Name"
            />

            <input
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="Date of Birth"
            />

            <input
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="Father's Name"
            />

            <input
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="Mother's Name"
            />

            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Gender:</label>
              {["Male", "Female", "Other"].map((g) => (
                <label key={g} className="text-sm flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    onChange={handleChange}
                    required
                    className="mr-1"
                  />
                  {g}
                </label>
              ))}
            </div>

            <input
              name="classApplied"
              value={formData.classApplied}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="Class Applying For"
            />

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="Email Address"
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="Phone Number"
            />

            <textarea
              name="currentAddress"
              value={formData.currentAddress}
              onChange={handleChange}
              required
              className={`${inputClasses} md:col-span-2 resize-none`}
              placeholder="Current Address"
            ></textarea>

            <textarea
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              required
              className={`${inputClasses} md:col-span-2 resize-none`}
              placeholder="Permanent Address"
            ></textarea>

            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="City"
            />

            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="State"
            />

            <input
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="Pincode"
            />
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </form>
      ) : (
        <div
          className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 m-4"
          ref={formRef}
        >
          <div className="bg-blue-900 text-white py-6 px-6 rounded-t-lg mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">DSD SCHOOL</h1>
              <h2 className="text-md uppercase tracking-wide">
                Educational & Literary Academy
              </h2>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-center mb-4">
            Admission Form
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <p>
              <strong>Full Name:</strong> {formData.fullName}
            </p>
            <p>
              <strong>Date of Birth:</strong> {formData.dob}
            </p>
            <p>
              <strong>Father's Name:</strong> {formData.fatherName}
            </p>
            <p>
              <strong>Mother's Name:</strong> {formData.motherName}
            </p>
            <p>
              <strong>Gender:</strong> {formData.gender}
            </p>
            <p>
              <strong>Class:</strong> {formData.classApplied}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Phone:</strong> {formData.phone}
            </p>
            <p className="md:col-span-2">
              <strong>Current Address:</strong> {formData.currentAddress}
            </p>
            <p className="md:col-span-2">
              <strong>Permanent Address:</strong> {formData.permanentAddress}
            </p>
            <p>
              <strong>City:</strong> {formData.city}
            </p>
            <p>
              <strong>State:</strong> {formData.state}
            </p>
            <p>
              <strong>Pincode:</strong> {formData.pincode}
            </p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
            >
              Download as PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admission;
