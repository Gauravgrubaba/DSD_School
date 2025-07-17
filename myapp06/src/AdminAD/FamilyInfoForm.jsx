// src/components/AdminFamilyInfoPanel.jsx

import React from 'react';

const FamilyInfoForm = ({ formData, handleBack, setStep }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg sm:text-xl font-bold text-center border-b border-black pb-3 uppercase tracking-widest">
        Family Information
      </h2>

      {/* Parents Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">Father's Details</h3>
          <p><strong>Name:</strong> {formData.fatherName}</p>
          <p><strong>DOB:</strong> {formData.fatherDOB}</p>
          <p><strong>Aadhar:</strong> {formData.fatherAadhar}</p>
          <p><strong>Education:</strong> {formData.fatherEducation}</p>
          <p><strong>Occupation:</strong> {formData.fatherOccupation}</p>
          <p><strong>Mobile:</strong> {formData.fatherMobile}</p>
          <p><strong>Email:</strong> {formData.fatherEmail}</p>
          <p><strong>Blood Group:</strong> {formData.fatherBloodGroup}</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">Mother's Details</h3>
          <p><strong>Name:</strong> {formData.motherName}</p>
          <p><strong>DOB:</strong> {formData.motherDOB}</p>
          <p><strong>Aadhar:</strong> {formData.motherAadhar}</p>
          <p><strong>Education:</strong> {formData.motherEducation}</p>
          <p><strong>Occupation:</strong> {formData.motherOccupation}</p>
          <p><strong>Mobile:</strong> {formData.motherMobile}</p>
          <p><strong>Email:</strong> {formData.motherEmail}</p>
          <p><strong>Blood Group:</strong> {formData.motherBloodGroup}</p>
        </div>
      </div>

      {/* Annual Income */}
      <div className="border border-black p-4 rounded-lg">
        <p className="font-semibold">16. Annual Family Income:</p>
        <p>{formData.annualIncome}</p>
      </div>

      {/* Child Lives With */}
      <div className="border border-black p-4 rounded-lg">
        <p className="font-semibold">17. Child lives with:</p>
        <p>{formData.childLivesWith}</p>
      </div>

      {/* Local Guardian */}
      <div className="border border-black p-4 rounded-lg">
        <p className="font-semibold">18. Local Guardian</p>
        <p><strong>Name & Address:</strong> {formData.guardianNameAddress}</p>
        <p><strong>Mobile:</strong> {formData.guardianMobile}</p>
        <p><strong>Relationship:</strong> {formData.guardianRelation}</p>
      </div>

      {/* Siblings */}
      <div className="border border-black p-4 rounded-lg">
        <p className="font-semibold">19. Siblings:</p>
        {(formData.siblings || []).map((sibling, index) => (
          <div key={index} className="mb-2">
            <p><strong>{index + 1}.</strong> {sibling.name}, Age: {sibling.age}, Gender: {sibling.gender}, School: {sibling.school}</p>
          </div>
        ))}
      </div>

      {/* Real Sibling Applying */}
      <div className="border border-black p-4 rounded-lg">
        <p className="font-semibold">20. Real Sibling Applying for Admission:</p>
        <p><strong>Name:</strong> {formData.realSiblingName}</p>
        <p><strong>Class:</strong> {formData.realSiblingClass}</p>
        <p><strong>Regd. No:</strong> {formData.realSiblingRegNo}</p>
      </div>

      {/* Language */}
      <div className="border border-black p-4 rounded-lg">
        <p className="font-semibold">21. Language Spoken at Home:</p>
        <p>{formData.languageAtHome}</p>
      </div>

      {/* Transport */}
      <div className="border border-black p-4 rounded-lg">
        <p className="font-semibold">22. School Transport Required:</p>
        <p>{formData.transportRequired}</p>
      </div>

     
    </div>
  );
};

export default FamilyInfoForm;
