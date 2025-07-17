import React, { useState ,useEffect } from 'react';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import FinalFormPreview from './FinalFormPreview';

const Admission = () => {
  const [formData, setFormData] = useState({});
  const [photos, setPhotos] = useState({ father: '', mother: '', child: '' });
  const [step, setStep] = useState(1);
const [isPreview, setIsPreview] = useState(false);
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
  }, [isAdmissionOpen])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    const reader = new FileReader();
    reader.onload = () => {
      setPhotos((prev) => ({ ...prev, [name]: reader.result }));
    };
    if (files[0]) reader.readAsDataURL(files[0]);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };
const formatDate = (date) => {
  if (!date) return "-";
  try {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return date;
  }
};
 const BoxedInput = ({ label }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type="text"
      className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);


  const nationalities = ['Indian', 'Nepali', 'Bhutanese', 'Other'];
  const states = ['Maharashtra', 'Uttar Pradesh', 'Gujarat', 'Delhi', 'Karnataka', 'Other'];
  const cities = ['Kalyan', 'Mumbai', 'Pune', 'Delhi', 'Lucknow', 'Other'];
  const religions = ['Buddhist', 'Christian', 'Jew', 'Hindu', 'Sikh', 'Jain', 'Islam', 'Other'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-100 to-white py-10 px-4 sm:py-16 sm:px-6 lg:py-20 lg:px-8">
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
      <form onSubmit={handleNext} className="px-4 py-8 sm:px-6 md:px-10 max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl border border-gray-300">
  <div className="text-center mb-10 bg-black text-white py-5 px-4 sm:px-6 rounded-t-3xl">
  <h2 className="text-lg sm:text-2xl font-bold uppercase">S.S.P.M. Mumbai's</h2>
  <h1 className="text-xl sm:text-4xl font-extrabold tracking-wide leading-tight">D.S.D. School, Kalyan (W)</h1>
  
  <p className="text-xs sm:text-sm italic mt-1">(Government Recognized / Self Financed)</p>
  <p className="text-xs sm:text-sm">(Near Birla College, Kalyan(W), Dist - Thane Pin - 421301)</p>

  <p className="text-xs sm:text-sm mt-1 break-words">
    E-mail: 
    <a href="mailto:dsdschool@sspmumbai.in" className="underline text-blue-300 ml-1">dsdschool@sspmumbai.in</a>
    <br className="sm:hidden" />
    <span className="ml-1">| U-Dise No: 27210601706</span>
  </p>
</div>


  {step === 1 && (
  <>
    <h2 className="text-xl sm:text-3xl font-semibold text-center underline decoration-black underline-offset-4 mb-8 text-gray-900">REGISTRATION FORM</h2>

    {/* Image Upload Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10 text-center">
      {['father', 'mother', 'child'].map((role) => (
        <div key={role} className="bg-gray-100 p-4 rounded-xl shadow-inner">
          <label className="block font-medium mb-2 capitalize">
            {role}'s Passport Size Photo <span className="text-red-600">*</span>
          </label>
          <input type="file" name={role} accept="image/*" required onChange={handleImageChange} className="mx-auto" />
          {photos[role] && (
            <img src={photos[role]} alt={`${role} preview`} className="w-24 h-28 object-cover mt-2 mx-auto border border-gray-300" />
          )}
        </div>
      ))}
    </div>

    {/* Class Selection */}
    <h3 className="text-lg sm:text-xl font-bold mb-4 text-black">Seeking Admission To <span className="text-red-600">*</span></h3>
    <div className="mb-6">
  <label className="block text-sm font-semibold text-gray-700 mb-1">
    Admission Class
  </label>
  <select
    name="admissionClass"
    required
    onChange={handleChange}
    className="w-48 px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
  >
    <option value="">-- Select Class --</option>
    {[
      'Nursery',
      'LKG',
      'UKG',
      'Class I',
      'Class II',
      'Class III',
      'Class IV',
      'Class V',
      'Class VI',
      'Class VII',
      'Class VIII',
      'Class IX',
      'Class X',
    ].map((cls) => (
      <option key={cls} value={cls}>
        {cls}
      </option>
    ))}
  </select>
</div>


    {/* Student Details */}
    <h3 className="text-lg sm:text-xl font-bold mb-4 text-black">Student Details</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      <input type="text" name="firstName" placeholder="First Name *" required onChange={handleChange} className="w-full border border-gray-400 p-3 rounded-xl shadow-sm" />
      <input type="text" name="middleName" placeholder="Middle Name *" required onChange={handleChange} className="w-full border border-gray-400 p-3 rounded-xl shadow-sm" />
      <input type="text" name="lastName" placeholder="Last Name *" required onChange={handleChange} className="w-full border border-gray-400 p-3 rounded-xl shadow-sm" />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      <input type="date" name="dob" required onChange={handleChange} className="w-full border border-gray-400 p-3 rounded-xl shadow-sm" />
      <input type="text" name="placeOfBirth" placeholder="Place of Birth *" required onChange={handleChange} className="w-full border border-gray-400 p-3 rounded-xl shadow-sm" />
      <select name="gender" required onChange={handleChange} className="w-full border border-gray-400 p-3 rounded-xl shadow-sm">
        <option value="">Gender *</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>

    <select name="nationality" required onChange={handleChange} className="w-full border border-gray-400 p-3 rounded-xl shadow-sm mb-4">
      <option value="">Select Nationality *</option>
      {nationalities.map((n) => <option key={n} value={n}>{n}</option>)}
    </select>

    {/* Caste Section */}
    <div className="mb-6">
      <label className="block font-medium text-black mb-2">Caste (with certificate) <span className="text-red-600">*</span></label>
      <div className="flex flex-wrap gap-4 sm:gap-6">
        {['SC', 'ST', 'OBC', 'GENERAL'].map((cat) => (
          <label key={cat} className="flex items-center gap-2 font-medium">
            <input type="radio" name="caste" value={cat} required onChange={handleChange} /> {cat}
          </label>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <input type="text" name="bloodGroup" placeholder="Blood Group *" required onChange={handleChange} className="w-full border border-gray-400 p-3 rounded-xl shadow-sm" />
      <input type="text" name="motherTongue" placeholder="Mother Tongue *" required onChange={handleChange} className="w-full border border-gray-400 p-3 rounded-xl shadow-sm" />
    </div>

    <select name="religion" required onChange={handleChange} className="w-full border border-gray-400 p-3 rounded-xl shadow-sm mb-4">
      <option value="">Select Religion *</option>
      {religions.map((r) => <option key={r} value={r}>{r}</option>)}
    </select>

    <input type="number" name="aadharChild" placeholder="Aadhar ID of the Child (12 digits) *" required maxLength="12" onChange={handleChange} className="w-full border border-gray-400 p-3 rounded-xl shadow-sm mb-4" />
    <input type="text" name="address" placeholder="Address for Communication *" required onChange={handleChange} className="w-full border border-gray-400 p-3 rounded-xl shadow-sm mb-4" />

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      <select name="city" required onChange={handleChange} className="w-full border border-gray-400 p-3 rounded-xl shadow-sm">
        <option value="">Select City *</option>
        {cities.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      <select name="state" required onChange={handleChange} className="w-full border border-gray-400 p-3 rounded-xl shadow-sm">
        <option value="">Select State *</option>
        {states.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <input type="text" name="pinCode" placeholder="Pin Code *" required onChange={handleChange} className="w-full border border-gray-400 p-3 rounded-xl shadow-sm" />
    </div>

    <input type="text" name="permanentAddress" placeholder="Permanent Address (if different) *" required onChange={handleChange} className="w-full border border-gray-400 p-3 rounded-xl shadow-sm mb-4" />
    <input type="tel" name="mobileNumber" placeholder="Mobile Number (10 digits) *" required pattern="\d{10}" maxLength="10" onChange={handleChange} className="w-full border border-gray-400 p-3 rounded-xl shadow-sm mb-4" />
    <input type="email" name="email" placeholder="Email ID *" required onChange={handleChange} className="w-full border border-gray-400 p-3 rounded-xl shadow-sm mb-8" />

    <div className="flex justify-end">
      <button type="submit" className="bg-gradient-to-r from-black to-gray-700 hover:from-gray-800 hover:to-black text-white font-semibold py-3 px-10 rounded-xl shadow-lg">
        Next
      </button>
    </div>
  </>
)}

        {step === 2 && (
  <div className="space-y-6">

    {/* Heading */}
    <h2 className="text-lg sm:text-xl font-bold text-center border-b border-black pb-3 uppercase tracking-widest">
      Family Information
    </h2>

    {/* Parents Info */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">Father's Details</h3>
        <input
          type="text"
          name="fatherName"
          placeholder="Father’s Name"
          onChange={handleChange}
          className="w-full border border-gray-400 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
        />
        <input
          type="text"
          name="fatherDOB"
          placeholder="Father’s Date of Birth"
          onChange={handleChange}
          className="w-full border border-gray-400 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
        />
        <input
          type="text"
          name="fatherAadhar"
          placeholder="Father’s Aadhar ID"
          onChange={handleChange}
          className="w-full border border-gray-400 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
        />
        <input
          type="text"
          name="fatherEducation"
          placeholder="Father’s Education"
          onChange={handleChange}
          className="w-full border border-gray-400 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
        />
        <input
          type="text"
          name="fatherOccupation"
          placeholder="Father’s Occupation"
          onChange={handleChange}
          className="w-full border border-gray-400 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
        />
        <input
          type="text"
          name="fatherMobile"
          placeholder="Father’s Mobile No."
          onChange={handleChange}
          className="w-full border border-gray-400 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
        />
        <input
          type="text"
          name="fatherEmail"
          placeholder="Father’s Email ID"
          onChange={handleChange}
          className="w-full border border-gray-400 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
        />
        <input
          type="text"
          name="fatherBloodGroup"
          placeholder="Father’s Blood Group"
          onChange={handleChange}
          className="w-full border border-gray-400 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
        />
      </div>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">Mother's Details</h3>
        <input
          type="text"
          name="motherName"
          placeholder="Mother’s Name"
          onChange={handleChange}
          className="w-full border border-gray-400 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
        />
        <input
          type="text"
          name="motherDOB"
          placeholder="Mother’s Date of Birth"
          onChange={handleChange}
          className="w-full border border-gray-400 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
        />
        <input
          type="text"
          name="motherAadhar"
          placeholder="Mother’s Aadhar ID"
          onChange={handleChange}
          className="w-full border border-gray-400 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
        />
        <input
          type="text"
          name="motherEducation"
          placeholder="Mother’s Education"
          onChange={handleChange}
          className="w-full border border-gray-400 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
        />
        <input
          type="text"
          name="motherOccupation"
          placeholder="Mother’s Occupation"
          onChange={handleChange}
          className="w-full border border-gray-400 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
        />
        <input
          type="text"
          name="motherMobile"
          placeholder="Mother’s Mobile No."
          onChange={handleChange}
          className="w-full border border-gray-400 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
        />
        <input
          type="text"
          name="motherEmail"
          placeholder="Mother’s Email ID"
          onChange={handleChange}
          className="w-full border border-gray-400 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
        />
        <input
          type="text"
          name="motherBloodGroup"
          placeholder="Mother’s Blood Group"
          onChange={handleChange}
          className="w-full border border-gray-400 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
        />
      </div>
    </div>
    {/* Annual Income */}
    <div className="border border-black p-4 rounded-lg">
      <label className="font-semibold block">16. Annual Family Income:</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
        {["Up to 1 Lakh", "1 to 3 Lakh", "3 to 5 Lakh", "More than 10 Lakh"].map((item, i) => (
          <label key={i} className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="w-4 h-4" /> {item}
          </label>
        ))}
      </div>
    </div>

    {/* Child Lives With */}
    <div className="border border-black p-4 rounded-lg">
      <label className="font-semibold block">17. Child lives with:</label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
        {["Both Parents", "Father", "Mother", "Guardian"].map((item, i) => (
          <label key={i} className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="w-4 h-4" /> {item}
          </label>
        ))}
      </div>
    </div>

    {/* Local Guardian */}
    <div className="border border-black p-4 rounded-lg space-y-3">
      <label className="font-semibold block">18. Name & Address of Local Guardian (if any):</label>
      <input className="border border-black w-full px-2 py-1 rounded-md" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Mobile:</label>
          <input className="border border-black w-full px-2 py-1 rounded-md" />
        </div>
        <div>
          <label className="text-sm">Relationship with Child:</label>
          <input className="border border-black w-full px-2 py-1 rounded-md" />
        </div>
      </div>
    </div>

    {/* Siblings Table */}
    <div className="border border-black p-4 rounded-lg overflow-x-auto">
      <label className="font-semibold block mb-2">19. Siblings:</label>
      <table className="w-full min-w-[600px] border border-black text-sm text-center">
        <thead className="bg-gray-100">
          <tr>
            {["Sr.No", "Name", "Age", "M/F", "School"].map((h, i) => (
              <th key={i} className="border border-black px-2 py-1">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((row) => (
            <tr key={row}>
              <td className="border border-black px-2 py-1 font-medium">{row}</td>
              {[...Array(4)].map((_, i) => (
                <td key={i} className="border border-black px-2 py-1">
                  <input
                    type="text"
                    className="w-full border border-gray-300 px-2 py-1 rounded-md text-sm"
                    
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Real Sibling Applying */}
    <div className="border border-black p-4 rounded-lg">
      <label className="font-semibold block">20. If a real sibling is applying for admission:</label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
        <input className="border border-black px-2 py-1 rounded-md" placeholder="Name" />
        <input className="border border-black px-2 py-1 rounded-md" placeholder="Class" />
        <input className="border border-black px-2 py-1 rounded-md" placeholder="Regd. No." />
      </div>
    </div>

    {/* Language */}
    <div className="border border-black p-4 rounded-lg">
      <label className="font-semibold block">21. Language spoken at home:</label>
      <input className="border border-black w-full mt-2 px-2 py-1 rounded-md" />
    </div>

    {/* Transport */}
    <div className="border border-black p-4 rounded-lg">
      <label className="font-semibold block">22. Would you require School Transport?</label>
      <div className="flex flex-wrap gap-6 mt-2 text-sm">
        {["Yes", "No"].map((option, i) => (
          <label key={i} className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" /> {option}
          </label>
        ))}
      </div>
    </div>

    {/* Navigation Buttons */}
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
      <button
        type="button"
        onClick={handleBack}
        className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg w-full sm:w-auto"
      >
        Back
      </button>
      <button
        type="button"
        onClick={() => setStep(3)}
        className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-lg w-full sm:w-auto"
      >
        Next
      </button>
    </div>
  </div>
)}

        {step === 3 && (
  <div className="space-y-6">

    {/* Brief History of the Child */}
    <h2 className="text-lg sm:text-xl font-bold text-center border-b border-black pb-3 uppercase tracking-widest">
      Brief History of the Child
    </h2>
    <div className="overflow-x-auto border border-black rounded-lg mb-8">
      <table className="w-full min-w-[750px] text-sm text-center">
        <thead className="bg-gray-100">
          <tr>
            {["Sr.No", "School Name", "City", "Board", "Year Completed", "Grade", "Reason of Leaving"].map((h, i) => (
              <th key={i} className="border border-black px-3 py-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((row) => (
            <tr key={row}>
              <td className="border border-black px-3 py-2 font-semibold">{row}</td>
              {[...Array(6)].map((_, i) => (
                <td key={i} className="border border-black px-2 py-1">
                  <input
                    type="text"
                    className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                    placeholder="Enter"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Checklist of Documents */}
    <h2 className="text-lg sm:text-xl font-bold text-center border-b border-black pb-3 uppercase tracking-widest">
      Checklist of Documents
    </h2>
    <div className="overflow-x-auto border border-black rounded-lg mb-8">
      <table className="w-full min-w-[750px] text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-black px-3 py-2">Sr.No</th>
            <th className="border border-black px-3 py-2">Document</th>
            <th className="border border-black px-3 py-2 text-center">Yes</th>
            <th className="border border-black px-3 py-2 text-center">No</th>
            <th className="border border-black px-3 py-2">Remark</th>
          </tr>
        </thead>
        <tbody>
          {[
            "Attested Photocopy of the Original Birth Certificate issued by Govt. Authority",
            "Photocopy of the report card of the previous school, if applicable",
            "Certificate of Outstanding Achievements (if any)",
            "Certificate of Disability (if applicable)",
            "Photocopy of residence proof (ration/voter/residence lease/any other)",
            "Original Transfer Certificate from school last attended",
            "Aadhar Card",
            "Bank Account Number"
          ].map((doc, index) => (
            <tr key={index}>
              <td className="border border-black px-3 py-2 text-center">{index + 1}</td>
              <td className="border border-black px-3 py-2">{doc}</td>
              <td className="border border-black px-3 py-2 text-center"><input type="checkbox" /></td>
              <td className="border border-black px-3 py-2 text-center"><input type="checkbox" /></td>
              <td className="border border-black px-3 py-2">
                <input className="w-full px-2 py-1 border border-gray-300 rounded-md" placeholder="Remark" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Declaration */}
    <h2 className="text-lg sm:text-xl font-bold text-center border-b border-black pb-3 uppercase tracking-widest">
      Declaration
    </h2>
    <div className="space-y-4 text-sm leading-relaxed border border-black p-6 rounded-xl bg-gray-50">
      <p>
        I declare that all the information provided in this application form is true, complete, and correct to the best of my knowledge and belief.
      </p>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="infoConfirm"
          className="w-4 h-4 mt-1 border border-black accent-green-600"
          required
        />
        <label htmlFor="infoConfirm" className="text-sm font-medium leading-tight">
          I confirm that all the information provided above is true and correct.
        </label>
      </div>
    </div>

    {/* Signature Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
      <div>
        <label className="text-sm font-medium">Signature</label>
        <input
          type="text"
          className="w-full border border-black px-3 py-2 mt-1 rounded-md"
          placeholder="Signature"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Full Name of the Signatory</label>
        <input
          type="text"
          className="w-full border border-black px-3 py-2 mt-1 rounded-md"
          placeholder="Full Name"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Relationship to the Child</label>
        <input
          type="text"
          className="w-full border border-black px-3 py-2 mt-1 rounded-md"
          placeholder="e.g., Father, Mother"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Date</label>
        <input
          type="date"
          className="w-full border border-black px-3 py-2 mt-1 rounded-md"
        />
      </div>
    </div>

    {/* Navigation Buttons */}
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
      <button
        type="button"
        onClick={handleBack}
        className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg w-full sm:w-auto"
      >
        Back
      </button>
      <button
  type="button"
  onClick={() => setStep(4)}
  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg w-full sm:w-auto"
>
  Preview
</button>

    </div>

  </div>
)}
{step === 4 && (
  <FinalFormPreview
    formData={formData}
    photos={photos}
    setStep={setStep}
  />
)}

       
      </form>
    </div>

  );
};

export default Admission;
