import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const nationalities = ['Indian', 'Other'];
const religions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Other'];
const cities = ['Mumbai', 'Delhi', 'Bangalore'];
const states = ['Maharashtra', 'Delhi', 'Karnataka'];

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
      photos: {
        father: '',
        mother: '',
        child: '',
      },
    },
  ]);

  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id) => setEditingId(id);
  const handleSave = () => setEditingId(null);
  const handleDelete = (id) => setForms(forms.filter((form) => form.id !== id));

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === id ? { ...form, [name]: value } : form
      )
    );
  };

  const handleImageChange = (e, id, role) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForms((prevForms) =>
        prevForms.map((form) =>
          form.id === id
            ? { ...form, photos: { ...form.photos, [role]: reader.result } }
            : form
        )
      );
    };
    if (file) reader.readAsDataURL(file);
  };

  const downloadPDF = async (id) => {
    const element = document.getElementById(`form-${id}`);
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`form-${id}.pdf`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel - Admission Forms</h1>

      {forms.map((form) => (
        <div key={form.id} id={`form-${form.id}`} className="bg-white p-6 rounded-xl shadow mb-10">
          {/* Image Upload */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-center">
            {['father', 'mother', 'child'].map((role) => (
              <div key={role}>
                <label className="block mb-2 font-medium">{role}'s Photo</label>
                {editingId === form.id ? (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, form.id, role)}
                    />
                    {form.photos[role] && (
                      <img
                        src={form.photos[role]}
                        alt={`${role} preview`}
                        className="mt-2 w-24 h-28 object-cover mx-auto border"
                      />
                    )}
                  </>
                ) : (
                  form.photos[role] && (
                    <img
                      src={form.photos[role]}
                      alt={`${role} preview`}
                      className="mt-2 w-24 h-28 object-cover mx-auto border"
                    />
                  )
                )}
              </div>
            ))}
          </div>

          {/* Admission Class */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Admission Class</label>
            {['Nursery', 'LKG', 'UKG', 'Grade I-VI'].map((cls) => (
              <label key={cls} className="mr-4">
                <input
                  type="radio"
                  name="admissionClass"
                  value={cls}
                  checked={form.admissionClass === cls}
                  onChange={(e) => handleChange(e, form.id)}
                  disabled={editingId !== form.id}
                  className="mr-1"
                />
                {cls}
              </label>
            ))}
          </div>

          {/* Student Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {['firstName', 'middleName', 'lastName', 'placeOfBirth', 'bloodGroup', 'motherTongue', 'aadharChild', 'pinCode', 'permanentAddress'].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.replace(/([A-Z])/g, ' $1')}
                value={form[field]}
                onChange={(e) => handleChange(e, form.id)}
                disabled={editingId !== form.id}
                className="border p-2 rounded-md"
              />
            ))}
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={(e) => handleChange(e, form.id)}
              disabled={editingId !== form.id}
              className="border p-2 rounded-md"
            />
            <input
              type="text"
              name="mobileNumber"
              placeholder="Mobile Number"
              value={form.mobileNumber}
              onChange={(e) => handleChange(e, form.id)}
              disabled={editingId !== form.id}
              className="border p-2 rounded-md"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => handleChange(e, form.id)}
              disabled={editingId !== form.id}
              className="border p-2 rounded-md"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <select
              name="gender"
              value={form.gender}
              onChange={(e) => handleChange(e, form.id)}
              disabled={editingId !== form.id}
              className="border p-2 rounded-md"
            >
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            <select
              name="nationality"
              value={form.nationality}
              onChange={(e) => handleChange(e, form.id)}
              disabled={editingId !== form.id}
              className="border p-2 rounded-md"
            >
              <option value="">Nationality</option>
              {nationalities.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <select
              name="religion"
              value={form.religion}
              onChange={(e) => handleChange(e, form.id)}
              disabled={editingId !== form.id}
              className="border p-2 rounded-md"
            >
              <option value="">Religion</option>
              {religions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Caste (with certificate):</label>
            {['SC', 'ST', 'OBC', 'GENERAL'].map((cat) => (
              <label key={cat} className="mr-4">
                <input
                  type="radio"
                  name="caste"
                  value={cat}
                  checked={form.caste === cat}
                  onChange={(e) => handleChange(e, form.id)}
                  disabled={editingId !== form.id}
                  className="mr-1"
                />
                {cat}
              </label>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <select
              name="city"
              value={form.city}
              onChange={(e) => handleChange(e, form.id)}
              disabled={editingId !== form.id}
              className="border p-2 rounded-md"
            >
              <option value="">City</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              name="state"
              value={form.state}
              onChange={(e) => handleChange(e, form.id)}
              disabled={editingId !== form.id}
              className="border p-2 rounded-md"
            >
              <option value="">State</option>
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={(e) => handleChange(e, form.id)}
              disabled={editingId !== form.id}
              className="border p-2 rounded-md"
            />
          </div>

          <div className="flex justify-end gap-4 mt-4">
            {editingId === form.id ? (
              <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
            ) : (
              <button onClick={() => handleEdit(form.id)} className="bg-blue-600 text-white px-4 py-2 rounded">Edit</button>
            )}
            <button onClick={() => handleDelete(form.id)} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
            <button onClick={() => downloadPDF(form.id)} className="bg-gray-700 text-white px-4 py-2 rounded">Download PDF</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminAdmission;
