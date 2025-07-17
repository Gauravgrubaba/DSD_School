import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const nationalities = ['Indian', 'Other'];
const religions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Other'];
const cities = ['Mumbai', 'Delhi', 'Bangalore'];
const states = ['Maharashtra', 'Delhi', 'Karnataka'];

const Adminad1 = ({ name, label, value, onChange, disabled, type = 'text' }) => (
  <input
    type={type}
    name={name}
    placeholder={label}
    value={value}
    onChange={onChange}
    disabled={disabled}
    className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
  />
);

const AdminAdmission = () => {
  const [forms, setForms] = useState([
    {
      id: 1,
      firstName: 'John',
      middleName: 'A.',
      lastName: 'Doe',
      admissionClass: 'Nursery',
      gender: 'Male',
      dob: '2018-05-12',
      email: 'john@example.com',
      mobileNumber: '9876543210',
      address: '123 Main St',
      placeOfBirth: '',
      nationality: '',
      caste: '',
      bloodGroup: '',
      motherTongue: '',
      religion: '',
      aadharChild: '',
      city: '',
      state: '',
      pinCode: '',
      permanentAddress: '',
      photos: { father: '', mother: '', child: '' },

      // Family Info:
      fatherName: '',
      fatherQualification: '',
      fatherOccupation: '',
      fatherContact: '',
      motherName: '',
      motherQualification: '',
      motherOccupation: '',
      motherContact: '',
      annualIncome: '',
      childLivingWith: '',
      localGuardianName: '',
      localGuardianRelation: '',
      localGuardianContact: '',
      siblings: '',
      transportRequired: '',
    },
  ]);

  const [editingId, setEditingId] = useState(null);

  const handleEdit = id => setEditingId(id);
  const handleSave = () => {
    const form = forms.find(f => f.id === editingId);
    const required = ['firstName', 'lastName', 'dob', 'gender', 'mobileNumber'];
    if (required.some(field => !form[field])) {
      alert('Please fill all required fields.');
      return;
    }
    setEditingId(null);
  };

  const handleDelete = id =>
    setForms(forms.filter(f => f.id !== id));

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setForms(prev =>
      prev.map(f =>
        f.id === id ? { ...f, [name]: value } : f
      )
    );
  };

  const handleImageChange = (e, id, role) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () =>
      setForms(prev =>
        prev.map(f =>
          f.id === id
            ? { ...f, photos: { ...f.photos, [role]: reader.result } }
            : f
        )
      );
    if (file) reader.readAsDataURL(file);
  };

  const downloadPDF = async id => {
    const el = document.getElementById(`form-${id}`);
    const canvas = await html2canvas(el, { scale: 2 });
    const img = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const props = pdf.getImageProperties(img);
    const width = pdf.internal.pageSize.getWidth();
    const height = (props.height * width) / props.width;
    pdf.addImage(img, 'PNG', 0, 0, width, height);
    pdf.save(`form-${id}.pdf`);
  };

  const handleAddNew = () =>
    setForms(prev => [
      ...prev,
      {
        id: Date.now(),
        firstName: '',
        middleName: '',
        lastName: '',
        admissionClass: '',
        gender: '',
        dob: '',
        email: '',
        mobileNumber: '',
        address: '',
        placeOfBirth: '',
        nationality: '',
        caste: '',
        bloodGroup: '',
        motherTongue: '',
        religion: '',
        aadharChild: '',
        city: '',
        state: '',
        pinCode: '',
        permanentAddress: '',
        photos: { father: '', mother: '', child: '' },

        fatherName: '',
        fatherQualification: '',
        fatherOccupation: '',
        fatherContact: '',
        motherName: '',
        motherQualification: '',
        motherOccupation: '',
        motherContact: '',
        annualIncome: '',
        childLivingWith: '',
        localGuardianName: '',
        localGuardianRelation: '',
        localGuardianContact: '',
        siblings: '',
        transportRequired: '',
      },
    ]);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gradient-to-tr from-blue-50 to-purple-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10 tracking-wide">
        🎓 Admin Panel – Admission Forms
      </h1>
      <div className="flex justify-end mb-6">
        <button
          onClick={handleAddNew}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full shadow-md transition-all duration-300"
        >
          ➕ Add New Form
        </button>
      </div>

      {forms.map(form => (
        <div
          key={form.id}
          id={`form-${form.id}`}
          className="bg-white rounded-2xl shadow-xl p-6 mb-12 border border-indigo-100 hover:scale-[1.01] transition-transform"
        >
          {/* Photographs */}
          <h2 className="text-xl font-semibold text-indigo-600 mb-3 border-b pb-1">
            Photographs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {['father', 'mother', 'child'].map(role => (
              <div key={role} className="text-center">
                <label className="capitalize block mb-2 font-medium">
                  {role}'s Photo
                </label>
                {editingId === form.id ? (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleImageChange(e, form.id, role)}
                    />
                    {form.photos[role] && (
                      <img
                        src={form.photos[role]}
                        alt={`${role} preview`}
                        className="mt-2 w-24 h-28 object-cover mx-auto border rounded"
                      />
                    )}
                  </>
                ) : (
                  <img
                    src={form.photos[role] || '/placeholder.png'}
                    alt={`${role} preview`}
                    className="mt-2 w-24 h-28 object-cover mx-auto border rounded"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Admission & Student Info */}
          {/* ... (existing sections stay unchanged) */}

          {/* Family Information */}
          <h2 className="text-xl font-semibold text-indigo-600 mb-3 border-b pb-1 mt-8">
            Family Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {/* Father */}
            <InputField
              name="fatherName"
              label="Father's Name"
              value={form.fatherName}
              onChange={e => handleChange(e, form.id)}
              disabled={editingId !== form.id}
            />
            <InputField
              name="fatherQualification"
              label="Father's Qualification"
              value={form.fatherQualification}
              onChange={e => handleChange(e, form.id)}
              disabled={editingId !== form.id}
            />
            <InputField
              name="fatherOccupation"
              label="Father's Occupation"
              value={form.fatherOccupation}
              onChange={e => handleChange(e, form.id)}
              disabled={editingId !== form.id}
            />
            <InputField
              name="fatherContact"
              label="Father's Contact"
              value={form.fatherContact}
              onChange={e => handleChange(e, form.id)}
              disabled={editingId !== form.id}
            />

            {/* Mother */}
            <InputField
              name="motherName"
              label="Mother's Name"
              value={form.motherName}
              onChange={e => handleChange(e, form.id)}
              disabled={editingId !== form.id}
            />
            <InputField
              name="motherQualification"
              label="Mother's Qualification"
              value={form.motherQualification}
              onChange={e => handleChange(e, form.id)}
              disabled={editingId !== form.id}
            />
            <InputField
              name="motherOccupation"
              label="Mother's Occupation"
              value={form.motherOccupation}
              onChange={e => handleChange(e, form.id)}
              disabled={editingId !== form.id}
            />
            <InputField
              name="motherContact"
              label="Mother's Contact"
              value={form.motherContact}
              onChange={e => handleChange(e, form.id)}
              disabled={editingId !== form.id}
            />

            <InputField
              name="annualIncome"
              label="Annual Income"
              value={form.annualIncome}
              onChange={e => handleChange(e, form.id)}
              disabled={editingId !== form.id}
            />
          </div>

          {/* Child living with */}
          <div className="mb-4">
            <label className="block font-medium mb-2">
              Child is Living With:
            </label>
            {['Parents', 'Guardian'].map(option => (
              <label key={option} className="mr-4">
                <input
                  type="radio"
                  name="childLivingWith"
                  value={option}
                  checked={form.childLivingWith === option}
                  onChange={e => handleChange(e, form.id)}
                  disabled={editingId !== form.id}
                  className="mr-1"
                />
                {option}
              </label>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <InputField
              name="localGuardianName"
              label="Local Guardian Name"
              value={form.localGuardianName}
              onChange={e => handleChange(e, form.id)}
              disabled={editingId !== form.id}
            />
            <InputField
              name="localGuardianRelation"
              label="Guardian Relation"
              value={form.localGuardianRelation}
              onChange={e => handleChange(e, form.id)}
              disabled={editingId !== form.id}
            />
            <InputField
              name="localGuardianContact"
              label="Guardian Contact"
              value={form.localGuardianContact}
              onChange={e => handleChange(e, form.id)}
              disabled={editingId !== form.id}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <InputField
              name="siblings"
              label="No. of Siblings"
              type="number"
              value={form.siblings}
              onChange={e => handleChange(e, form.id)}
              disabled={editingId !== form.id}
            />
            <select
              name="transportRequired"
              value={form.transportRequired}
              onChange={e => handleChange(e, form.id)}
              disabled={editingId !== form.id}
              className="border p-2 rounded-md"
            >
              <option value="">Transport Required?</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 mt-4">
            {editingId === form.id ? (
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit(form.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => handleDelete(form.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow"
            >
              Delete
            </button>
            <button
              onClick={() => downloadPDF(form.id)}
              className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md shadow"
            >
              Download PDF
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};





export default Adminad1