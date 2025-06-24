import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

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

const PreviewField = ({ label, value }) => (
  <div className="flex flex-col">
    <label className="text-gray-700 text-xs font-semibold mb-1">{label}</label>
    <div className="border border-gray-300 bg-white rounded-md p-2 text-sm text-gray-800 shadow-sm min-h-[40px] whitespace-pre-wrap">
      {value || "-"}
    </div>
  </div>
);

const FinalFormPreview = ({ formData, setStep, photos }) => {
  const formRef = useRef(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDownload = async () => {
    const input = formRef.current;

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      scrollX: 0,
      scrollY: -window.scrollY,
      windowWidth: input.scrollWidth,
      windowHeight: input.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const margin = 10;
    const pdfWidth = pageWidth - margin * 2;
    const pdfHeight = pageHeight - margin * 2;

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const ratio = pdfWidth / imgWidth;
    const scaledHeight = imgHeight * ratio;

    let position = 0;

    const totalPages = Math.ceil(scaledHeight / pdfHeight);

    for (let i = 0; i < totalPages; i++) {
      const sourceY = (i * pdfHeight) / ratio;

      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = imgWidth;
      pageCanvas.height = pdfHeight / ratio;

      const pageCtx = pageCanvas.getContext("2d");
      pageCtx.drawImage(canvas, 0, sourceY, imgWidth, pageCanvas.height, 0, 0, imgWidth, pageCanvas.height);

      const pageData = pageCanvas.toDataURL("image/png");

      if (i > 0) pdf.addPage();
      pdf.addImage(pageData, "PNG", margin, margin, pdfWidth, pdfHeight);
    }

    pdf.save("Registration_Form.pdf");
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="max-w-xl mx-auto mt-20 p-10 bg-white border border-green-500 rounded-xl shadow-xl text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-4">🎉 Form Downloaded Successfully!</h2>
        <p className="text-gray-700 mb-6">Your registration form has been saved to your device as a PDF.</p>
        <button
          onClick={() => setStep(1)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-md"
        >
          Back to Edit Form
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div ref={formRef} className="w-full max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-300 space-y-10">
        <div className="text-center border-b border-black pb-4">
          <h2 className="text-3xl font-bold uppercase text-gray-900">Final Preview - Registration Form</h2>
          <p className="text-gray-600 text-sm">Please review your information before submitting.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {["father", "mother", "child"].map((role) => (
            photos?.[role] && (
              <div key={role} className="flex flex-col items-center">
                <img src={photos[role]} alt={`${role}`} className="w-28 h-32 object-cover border rounded-md shadow-md" />
                <p className="font-medium capitalize mt-2">{role}'s Photo</p>
              </div>
            )
          ))}
        </div>

        <section>
          <h3 className="text-xl font-semibold border-b border-black pb-2 mb-4">Student Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <PreviewField label="First Name" value={formData.firstName} />
            <PreviewField label="Middle Name" value={formData.middleName} />
            <PreviewField label="Last Name" value={formData.lastName} />
            <PreviewField label="Date of Birth" value={formatDate(formData.dob)} />
            <PreviewField label="Place of Birth" value={formData.placeOfBirth} />
            <PreviewField label="Gender" value={formData.gender} />
            <PreviewField label="Nationality" value={formData.nationality} />
            <PreviewField label="Caste" value={formData.caste} />
            <PreviewField label="Blood Group" value={formData.bloodGroup} />
            <PreviewField label="Mother Tongue" value={formData.motherTongue} />
            <PreviewField label="Religion" value={formData.religion} />
            <PreviewField label="Aadhar No. (Child)" value={formData.aadharChild} />
            <PreviewField label="Communication Address" value={formData.address} />
            <PreviewField label="Permanent Address" value={formData.permanentAddress} />
            <PreviewField label="City" value={formData.city} />
            <PreviewField label="State" value={formData.state} />
            <PreviewField label="Pin Code" value={formData.pinCode} />
            <PreviewField label="Mobile Number" value={formData.mobileNumber} />
            <PreviewField label="Email" value={formData.email} />
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold border-b border-black pb-2 mb-4">Family Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold underline text-base mb-2">Father's Details</h4>
              <PreviewField label="Name" value={formData.fatherName} />
              <PreviewField label="DOB" value={formatDate(formData.fatherDOB)} />
              <PreviewField label="Aadhar" value={formData.fatherAadhar} />
              <PreviewField label="Education" value={formData.fatherEducation} />
              <PreviewField label="Occupation" value={formData.fatherOccupation} />
              <PreviewField label="Mobile" value={formData.fatherMobile} />
              <PreviewField label="Email" value={formData.fatherEmail} />
              <PreviewField label="Blood Group" value={formData.fatherBloodGroup} />
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold underline text-base mb-2">Mother's Details</h4>
              <PreviewField label="Name" value={formData.motherName} />
              <PreviewField label="DOB" value={formatDate(formData.motherDOB)} />
              <PreviewField label="Aadhar" value={formData.motherAadhar} />
              <PreviewField label="Education" value={formData.motherEducation} />
              <PreviewField label="Occupation" value={formData.motherOccupation} />
              <PreviewField label="Mobile" value={formData.motherMobile} />
              <PreviewField label="Email" value={formData.motherEmail} />
              <PreviewField label="Blood Group" value={formData.motherBloodGroup} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <PreviewField label="Annual Family Income" value={formData.annualIncome} />
            <PreviewField label="Child Lives With" value={formData.childLivesWith} />
            <PreviewField label="Local Guardian Name & Address" value={formData.localGuardian} />
            <PreviewField label="Siblings" value={formData.siblings} />
            <PreviewField label="Real Sibling Also Applying?" value={formData.siblingAdmission} />
            <PreviewField label="Language Spoken at Home" value={formData.languageHome} />
            <PreviewField label="Require School Transport?" value={formData.schoolTransport} />
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold border-b border-black pb-2 mb-4">Brief History & Checklist</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PreviewField label="Brief History of the Child" value={formData.childHistory} />
            <PreviewField label="Checklist of Submitted Documents" value={formData.documentChecklist} />
          </div>
        </section>

        <section className="bg-gray-50 p-4 rounded-md border border-gray-300">
          <h3 className="text-xl font-semibold border-b border-black pb-2 mb-4">Declaration</h3>
          <p className="text-sm mb-4">I hereby declare that all the information provided above is true and correct to the best of my knowledge.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PreviewField label="Signature" value={formData.signature} />
            <PreviewField label="Full Name of Signatory" value={formData.signatoryName} />
            <PreviewField label="Relationship to Child" value={formData.signatoryRelation} />
            <PreviewField label="Date" value={formatDate(formData.signDate)} />
          </div>
        </section>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between gap-4 pt-6">
        <button
          onClick={() => setStep(1)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-lg shadow-md"
        >
          Edit Form
        </button>
        <button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg shadow-md"
        >
          Final Submit & Download PDF
        </button>
      </div>
    </div>
  );
};

export default FinalFormPreview;