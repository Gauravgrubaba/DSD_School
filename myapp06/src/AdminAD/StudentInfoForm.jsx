import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const nationalities = ['Indian', 'Other'];
const religions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Other'];
const cities = ['Mumbai', 'Delhi', 'Bangalore'];
const states = ['Maharashtra', 'Delhi', 'Karnataka'];

const InputField = ({ name, label, value, onChange, disabled, type = 'text' }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={label}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="form-input w-full border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
    />
  </div>
);

const StudentInfoForm = () => {
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

  const handleSave = () => {
    const form = forms.find(f => f.id === editingId);
    const required = ['firstName', 'lastName', 'dob', 'gender', 'mobileNumber'];
    const hasEmpty = required.some(field => !form[field]);

    if (hasEmpty) {
      alert('Please fill all required fields.');
      return;
    }

    setEditingId(null);
  };

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
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`form-${id}.pdf`);
  };

  const handleAddNewForm = () => {
    setForms([
      ...forms,
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
        photos: {
          father: '',
          mother: '',
          child: '',
        },
      },
    ]);
  };

  return (
    <div className="px-4 sm:px-8 py-6 max-w-7xl mx-auto bg-gradient-to-br from-white to-gray-100 min-h-screen">
      {/* School Header Section */}
      <form className="mt-12 px-4 py-8 sm:px-6 md:px-10 bg-gray-50 shadow-inner rounded-3xl border border-gray-300">
        <div className="text-center mb-10 bg-black text-white py-5 px-4 sm:px-6 rounded-t-3xl">
          <h2 className="text-lg sm:text-2xl font-bold uppercase">S.S.P.M. Mumbai's</h2>
          <h1 className="text-xl sm:text-4xl font-extrabold tracking-wide leading-tight">
            D.S.D. School, Kalyan (W)
          </h1>
          <p className="text-xs sm:text-sm italic mt-1">(Government Recognized / Self Financed)</p>
          <p className="text-xs sm:text-sm">(Near Birla College, Kalyan(W), Dist - Thane Pin - 421301)</p>
          <p className="text-xs sm:text-sm mt-1 break-words">
            E-mail:
            <a href="mailto:dsdschool@sspmumbai.in" className="underline text-blue-300 ml-1">
              dsdschool@sspmumbai.in
            </a>
            <span className="ml-1">| U-Dise No: 27210601706</span>
          </p>
        </div>
      </form>

      {forms.map((form) => (
        <div
          key={form.id}
          id={`form-${form.id}`}
          className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 my-10"
        >
          {/* Image Upload */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-center">
            {['father', 'mother', 'child'].map((role) => (
              <div key={role}>
                <label className="block mb-2 font-medium capitalize">{role}'s Photo</label>
                {editingId === form.id ? (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, form.id, role)}
                      className="text-sm"
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

          {/* Admission Class */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Admission Class</label>
            {['Nursery', 'LKG', 'UKG', 'Grade I-VI'].map((cls) => (
              <label key={cls} className="mr-4 text-sm">
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

          {/* Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {[
              'firstName', 'middleName', 'lastName', 'placeOfBirth', 'bloodGroup',
              'motherTongue', 'aadharChild', 'pinCode', 'permanentAddress',
            ].map((field) => (
              <InputField
                key={field}
                name={field}
                label={field.replace(/([A-Z])/g, ' $1')}
                value={form[field]}
                onChange={(e) => handleChange(e, form.id)}
                disabled={editingId !== form.id}
              />
            ))}
            <InputField
              name="dob"
              type="date"
              label="Date of Birth"
              value={form.dob}
              onChange={(e) => handleChange(e, form.id)}
              disabled={editingId !== form.id}
            />
            <InputField
              name="mobileNumber"
              label="Mobile Number"
              value={form.mobileNumber}
              onChange={(e) => handleChange(e, form.id)}
              disabled={editingId !== form.id}
            />
            <InputField
              name="email"
              type="email"
              label="Email"
              value={form.email}
              onChange={(e) => handleChange(e, form.id)}
              disabled={editingId !== form.id}
            />
          </div>

          {/* Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {[
              { name: 'gender', options: ['Male', 'Female'] },
              { name: 'nationality', options: nationalities },
              { name: 'religion', options: religions },
            ].map(({ name, options }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{name}</label>
                <select
                  name={name}
                  value={form[name]}
                  onChange={(e) => handleChange(e, form.id)}
                  disabled={editingId !== form.id}
                  className="form-select w-full border border-gray-300 p-2 rounded-lg bg-white shadow-sm"
                >
                  <option value="">Select {name}</option>
                  {options.map((val) => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Caste */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Caste (with certificate):</label>
            {['SC', 'ST', 'OBC', 'GENERAL'].map((cat) => (
              <label key={cat} className="mr-4 text-sm">
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

          {/* City / State / Address */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { name: 'city', options: cities },
              { name: 'state', options: states },
            ].map(({ name, options }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{name}</label>
                <select
                  name={name}
                  value={form[name]}
                  onChange={(e) => handleChange(e, form.id)}
                  disabled={editingId !== form.id}
                  className="form-select w-full border border-gray-300 p-2 rounded-lg bg-white shadow-sm"
                >
                  <option value="">Select {name}</option>
                  {options.map((val) => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
              </div>
            ))}
            <InputField
              name="address"
              label="Address"
              value={form.address}
              onChange={(e) => handleChange(e, form.id)}
              disabled={editingId !== form.id}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-between gap-2 mt-6">
            {editingId === form.id ? (
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit(form.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => handleDelete(form.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => downloadPDF(form.id)}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Download PDF
            </button>
          </div>
        </div>
      ))}

      {/* Add New Form Button */}
      <div className="text-center my-8">
        <button
          onClick={handleAddNewForm}
          className="bg-indigo-600 text-white px-6 py-2 rounded-full shadow hover:bg-indigo-700"
        >
          Add New Form
        </button>
      </div>
    </div>
  );
};

export default StudentInfoForm;
