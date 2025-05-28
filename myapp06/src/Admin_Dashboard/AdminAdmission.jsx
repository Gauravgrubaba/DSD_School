import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Sample admissions data (simulate backend data)
const admissionForms = [
  {
    id: 1,
    fullName: "Ravi Sharma",
    fatherName: "Suresh Sharma",
    motherName: "Anita Sharma",
    gender: "Male",
    dob: "2010-05-15",
    email: "ravi@example.com",
    phone: "9876543210",
    currentAddress: "123, Main Street, Gonda",
    permanentAddress: "123, Main Street, Gonda",
    city: "Gonda",
    state: "Uttar Pradesh",
    pincode: "271001",
    classApplied: "6th",
  },
  {
    id: 2,
    fullName: "Anjali Verma",
    fatherName: "Rajeev Verma",
    motherName: "Seema Verma",
    gender: "Female",
    dob: "2011-08-20",
    email: "anjali@example.com",
    phone: "8765432109",
    currentAddress: "456, Green Colony, Lucknow",
    permanentAddress: "456, Green Colony, Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    pincode: "226001",
    classApplied: "7th",
  },
];

const AdminAdmissionDashboard = () => {
  const formRefs = useRef({});

  const handleDownload = async (id) => {
    const element = formRefs.current[id];
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Admission_Form_${id}.pdf`);
  };

  return (
    <div className="pt-24 px-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">
        Admin Admission Dashboard
      </h1>

      {admissionForms.map((form) => (
        <div
          key={form.id}
          ref={(el) => (formRefs.current[form.id] = el)}
          className="bg-white shadow-lg rounded-lg p-6 mb-8 max-w-4xl mx-auto"
        >
          <div className="bg-blue-900 text-white py-4 px-6 rounded-t-lg mb-6">
            <h2 className="text-xl font-semibold">DSD SCHOOL</h2>
            <p className="text-sm">Educational & Literary Academy</p>
          </div>

          <h3 className="text-lg font-bold mb-4 text-center">Admission Form</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <p><strong>Full Name:</strong> {form.fullName}</p>
            <p><strong>Date of Birth:</strong> {form.dob}</p>
            <p><strong>Father's Name:</strong> {form.fatherName}</p>
            <p><strong>Mother's Name:</strong> {form.motherName}</p>
            <p><strong>Gender:</strong> {form.gender}</p>
            <p><strong>Class Applied:</strong> {form.classApplied}</p>
            <p><strong>Email:</strong> {form.email}</p>
            <p><strong>Phone:</strong> {form.phone}</p>
            <p className="md:col-span-2"><strong>Current Address:</strong> {form.currentAddress}</p>
            <p className="md:col-span-2"><strong>Permanent Address:</strong> {form.permanentAddress}</p>
            <p><strong>City:</strong> {form.city}</p>
            <p><strong>State:</strong> {form.state}</p>
            <p><strong>Pincode:</strong> {form.pincode}</p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => handleDownload(form.id)}
              className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
            >
              Download PDF
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminAdmissionDashboard;
