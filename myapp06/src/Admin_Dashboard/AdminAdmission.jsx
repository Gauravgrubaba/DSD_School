import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const formsPerPage = 1;

const initialForms = [
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
    status: "Old",
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
    status: "New",
  },
];

const initialBoxes = [
  { id: 1, text: "Admission" },
  { id: 2, text: "Opinion" },
  { id: 3, text: "Notes" },
];

const AdminAdmissionDashboard = () => {
  const [forms, setForms] = useState(initialForms);
  const [editingId, setEditingId] = useState(null);
  const [editedForm, setEditedForm] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [boxes, setBoxes] = useState(initialBoxes);
  const [editingBoxId, setEditingBoxId] = useState(null);
  const [editingBoxText, setEditingBoxText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const formRefs = useRef({});

  const totalPages = Math.ceil(forms.length / formsPerPage);
  const startIndex = (currentPage - 1) * formsPerPage;

  // Filter forms by search and status filter
  const filteredForms = forms.filter((form) => {
    const matchName = form.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filter === "All" || form.status === filter;
    return matchName && matchFilter;
  });

  // Pagination of filtered forms
  const paginatedForms = filteredForms.slice(startIndex, startIndex + formsPerPage);

  // Edit form handlers
  const handleEditClick = (form) => {
    setEditingId(form.id);
    setEditedForm(form);
  };

  const handleSaveClick = (id) => {
    // Validate phone length
    if (editedForm.phone && editedForm.phone.length !== 10) {
      alert("Phone number must be exactly 10 digits");
      return;
    }
    setForms((prev) => prev.map((f) => (f.id === id ? editedForm : f)));
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedForm((prev) => ({ ...prev, [name]: value }));
  };

  // Download PDF
  const handleDownload = async (id) => {
    const element = formRefs.current[id];
    const buttons = element.querySelector(".no-print");
    if (buttons) buttons.style.display = "none";

    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Admission_Form_${id}.pdf`);

    if (buttons) buttons.style.display = "flex";
  };

  // Delete form
  const handleDeleteForm = (id) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      setForms((prev) => prev.filter((f) => f.id !== id));
      // Reset page if no forms on current page
      if ((filteredForms.length - 1) % formsPerPage === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  // Boxes edit handlers
  const handleAddBox = () => {
    const newId = boxes.length ? boxes[boxes.length - 1].id + 1 : 1;
    setBoxes((prev) => [...prev, { id: newId, text: "New Box" }]);
  };

  const handleEditBox = (id, text) => {
    setEditingBoxId(id);
    setEditingBoxText(text);
  };

  const handleBoxTextChange = (e) => {
    setEditingBoxText(e.target.value);
  };

  const handleSaveBox = (id) => {
    setBoxes((prev) =>
      prev.map((box) => (box.id === id ? { ...box, text: editingBoxText } : box))
    );
    setEditingBoxId(null);
  };

  const handleDeleteBox = (id) => {
    setBoxes((prev) => prev.filter((box) => box.id !== id));
    if (editingBoxId === id) setEditingBoxId(null);
  };

  // Pagination controls (adjust currentPage if filter/search changes)
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter, forms.length]);

  return (
    <div className="pt-24 px-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">
        Admin Admission Dashboard
      </h1>

      {/* Boxes Section */}
      <div className="max-w-4xl mx-auto mb-8 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Manage Boxes (Admission, Opinion, etc.)</h2>
        <div className="flex flex-wrap gap-3">
          {boxes.map((box) => (
            <div
              key={box.id}
              className="flex items-center border rounded px-3 py-1 bg-gray-50"
            >
              {editingBoxId === box.id ? (
                <>
                  <input
                    type="text"
                    value={editingBoxText}
                    onChange={handleBoxTextChange}
                    className="border rounded px-2 py-1"
                  />
                  <button
                    onClick={() => handleSaveBox(box.id)}
                    className="ml-2 bg-green-600 text-white px-2 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingBoxId(null)}
                    className="ml-1 px-2 text-gray-600 hover:text-gray-900"
                    title="Cancel"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <>
                  <span>{box.text}</span>
                  <button
                    onClick={() => handleEditBox(box.id, box.text)}
                    className="ml-2 px-2 text-blue-600 hover:text-blue-900"
                    title="Edit"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => handleDeleteBox(box.id)}
                    className="ml-1 px-2 text-red-600 hover:text-red-900"
                    title="Delete"
                  >
                    🗑
                  </button>
                </>
              )}
            </div>
          ))}

          <button
            onClick={handleAddBox}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Box
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search by student name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 border rounded px-3 py-2"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="All">All Students</option>
          <option value="Old">Old Students</option>
          <option value="New">New Students</option>
        </select>
      </div>

      {/* Admission Forms */}
      {paginatedForms.length === 0 ? (
        <p className="text-center text-gray-600">No admission forms found.</p>
      ) : (
        paginatedForms.map((form) => (
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
              {Object.entries(form).map(([key, value]) => {
                if (key === "id") return null;

                const label = key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase());

                return (
                  <p
                    key={key}
                    className={
                      key === "currentAddress" || key === "permanentAddress"
                        ? "md:col-span-2"
                        : ""
                    }
                  >
                    <strong>{label}:</strong>{" "}
                    {editingId === form.id ? (
                      <input
                        type="text"
                        name={key}
                        value={editedForm[key]}
                        onChange={handleInputChange}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      value
                    )}
                  </p>
                );
              })}
            </div>

            {/* Buttons */}
            <div className="mt-6 text-center flex gap-4 justify-center no-print">
              {editingId === form.id ? (
                <>
                  <button
                    onClick={() => handleSaveClick(form.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-600 text-white px-4 py-2 rounded shadow hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditClick(form)}
                    className="bg-yellow-600 text-white px-4 py-2 rounded shadow hover:bg-yellow-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDownload(form.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
                  >
                    Download PDF
                  </button>
                  <button
                    onClick={() => handleDeleteForm(form.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}

      {/* Pagination */}
      {filteredForms.length > formsPerPage && (
        <div className="flex justify-center mt-6">
          <label className="mr-2 font-medium">Select Page:</label>
          <select
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            className="border rounded px-3 py-1"
          >
            {Array.from(
              { length: Math.ceil(filteredForms.length / formsPerPage) },
              (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Page {i + 1}
                </option>
              )
            )}
          </select>
        </div>
      )}
    </div>
  );
};

export default AdminAdmissionDashboard;
