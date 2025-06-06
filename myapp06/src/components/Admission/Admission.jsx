import React, { useState, useRef, useEffect } from "react";
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

  // track form step: "edit" | "review" | "confirmed"
  const [step, setStep] = useState("edit");
  const formRef = useRef();

  // Messages for admission open/close (unchanged)
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);

  const openMessages = [
    "🎉 Admissions are now OPEN!",
    "📅 Hurry up and apply today!",
    "✅ Limited seats available!",
  ];
  const closedMessages = [
    "⚠️ Admissions are currently CLOSED.",
    "📢 Please check back later.",
    "🙏 Thank you for your interest.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(
        (prev) =>
          (prev + 1) % (isAdmissionOpen ? openMessages.length : closedMessages.length)
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [isAdmissionOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (!/^\d{0,10}$/.test(value)) return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // On initial submit, go to review step
  const handleSubmit = (e) => {
    e.preventDefault();
    setStep("review");
  };

  // Confirm the form: save/finalize and show download button
  const handleConfirm = () => {
    setStep("confirmed");
  };

  // Go back to edit form from review
  const handleEdit = () => {
    setStep("edit");
  };

  const handleDownload = async () => {
    if (!formRef.current) return;

    const canvas = await html2canvas(formRef.current, {
      scale: 2,
      useCORS: true,
      scrollY: -window.scrollY,
    });
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
      {/* Admission Message */}
      <div
        className={`max-w-4xl mx-auto mb-6 rounded-lg px-6 py-4 text-center text-white
          ${
            isAdmissionOpen
              ? "bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 shadow-lg"
              : "bg-gradient-to-r from-red-400 via-red-600 to-red-700 shadow-lg"
          }
          transform transition duration-700 ease-in-out animate-pulse mt-10
        `}
      >
        <h2 className="text-2xl font-extrabold tracking-wider drop-shadow-md select-none">
          {isAdmissionOpen ? openMessages[messageIndex] : closedMessages[messageIndex]}
        </h2>
      </div>

      {/* Step 1: Edit Form */}
      {step === "edit" && (
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6"
        >
          {/* Form header and fields as before */}
          <div className="bg-blue-900 text-white py-6 px-6 rounded-t-lg mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">DSD SCHOOL</h1>
              <h2 className="text-md uppercase tracking-wide">
                Educational & Literary Academy
              </h2>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-center mb-4">Admission Form</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* same inputs */}
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="Full Name"
              type="text"
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
              type="text"
            />
            <input
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="Mother's Name"
              type="text"
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
              type="text"
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
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="Phone Number"
              pattern="\d{10}"
              maxLength={10}
              title="Please enter a valid 10-digit phone number"
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
              type="text"
            />
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="State"
              type="text"
            />
            <input
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="Pincode"
              type="text"
              pattern="\d{6}"
              maxLength={6}
              title="Please enter a valid 6-digit pincode"
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
      )}

      {/* Step 2: Review Form */}
      {step === "review" && (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 m-4">
          <div
            ref={formRef}
            style={{ fontFamily: "Arial, sans-serif", fontSize: 12, lineHeight: 1.4 }}
          >
            <div className="bg-blue-900 text-white py-6 px-6 rounded-t-lg mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">DSD SCHOOL</h1>
                <h2 className="text-md uppercase tracking-wide">
                  Educational & Literary Academy
                </h2>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-center mb-4">Review Admission Form</h2>

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm"
              style={{ whiteSpace: "pre-wrap" }}
            >
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
                <strong>Pincode:</strong> {formData.pincode || "N/A"}
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={handleEdit}
              className="bg-yellow-500 text-white px-6 py-2 rounded shadow hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={handleConfirm}
              className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700"
            >
              Confirm & Save
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmed - show download */}
      {step === "confirmed" && (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 m-4">
          <div
            ref={formRef}
            style={{ fontFamily: "Arial, sans-serif", fontSize: 12, lineHeight: 1.4 }}
          >
            <div className="bg-blue-900 text-white py-6 px-6 rounded-t-lg mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">DSD SCHOOL</h1>
                <h2 className="text-md uppercase tracking-wide">
                  Educational & Literary Academy
                </h2>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-center mb-4">Admission Form</h2>

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm"
              style={{ whiteSpace: "pre-wrap" }}
            >
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
                <strong>Pincode:</strong> {formData.pincode || "N/A"}
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
            >
              Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admission;
