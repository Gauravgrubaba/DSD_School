import { useState } from 'react';
import StudentInfoForm from '../AdminAD/StudentInfoForm';
import FamilyInfoForm from '../AdminAD/FamilyInfoForm';
import AdminAdmissionStep3 from '../AdminAD/AdminAdmissionStep3';

const sampleStudents = [
  {
    id: 1,
    name: "Ravi Kumar",
    status: "Pending",
    formData: {},
  },
  {
    id: 2,
    name: "Sita Sharma",
    status: "Approved",
    formData: {},
  },
  {
    id: 3,
    name: "Aman Verma",
    status: "New",
    formData: {},
  },
];

const AdminAdmission = () => {
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(true);
  const [openMessages, setOpenMessages] = useState(["Admissions Open for 2025-26"]);
  const [closedMessages, setClosedMessages] = useState(["Admissions Closed"]);
  const [messageIndex] = useState(0);

  const [editingOpenMsg, setEditingOpenMsg] = useState(openMessages[0]);
  const [editingClosedMsg, setEditingClosedMsg] = useState(closedMessages[0]);

  const [students, setStudents] = useState(sampleStudents);
  const [selectedStudentId, setSelectedStudentId] = useState(sampleStudents[0].id);
  const [step, setStep] = useState(1);
  const [filter, setFilter] = useState("All");

  const selectedStudent = students.find((s) => s.id === selectedStudentId);

  const handleSaveMessages = () => {
    setOpenMessages([editingOpenMsg]);
    setClosedMessages([editingClosedMsg]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudents((prev) =>
      prev.map((s) =>
        s.id === selectedStudentId
          ? {
              ...s,
              formData: {
                ...s.formData,
                [name]: value,
              },
            }
          : s
      )
    );
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const filteredStudents = students.filter((s) =>
    filter === "All" ? true : s.status.toLowerCase() === filter.toLowerCase()
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-7xl mx-auto my-10">
      {/* Admission Control Panel */}
      <div className="p-6 bg-white shadow-2xl rounded-xl">
        {/* Header & Toggle */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Admission Status</h2>
          <button
            onClick={() => setIsAdmissionOpen(!isAdmissionOpen)}
            className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
              isAdmissionOpen
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {isAdmissionOpen ? "Close Admission" : "Open Admission"}
          </button>
        </div>

        {/* Message Display */}
        <div
          className={`text-center mb-6 rounded-lg px-6 py-4 text-white font-bold text-xl tracking-wide ${
            isAdmissionOpen
              ? "bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500"
              : "bg-gradient-to-r from-red-400 via-red-600 to-red-700"
          } animate-pulse transition duration-700 ease-in-out`}
        >
          {isAdmissionOpen ? openMessages[messageIndex] : closedMessages[messageIndex]}
        </div>

        {/* Editable Messages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Open Admission Message:</label>
            <input
              type="text"
              value={editingOpenMsg}
              onChange={(e) => setEditingOpenMsg(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Closed Admission Message:</label>
            <input
              type="text"
              value={editingClosedMsg}
              onChange={(e) => setEditingClosedMsg(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <button
          onClick={handleSaveMessages}
          className="w-full sm:w-auto px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 font-semibold"
        >
          Save Messages
        </button>
      </div>

      {/* Filter & Student Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-10 mb-6 gap-4">
        <div>
          <span className="font-semibold">Status:</span>
          <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {selectedStudent?.status || "N/A"}
          </span>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div>
            <label className="font-semibold mr-1">Filter:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 px-3 py-1 rounded-md"
            >
              <option value="All">All</option>
              <option value="New">New</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
            </select>
          </div>

          <div>
            <label className="font-semibold mr-1">Select Student:</label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(parseInt(e.target.value))}
              className="border border-gray-300 px-3 py-1 rounded-md"
            >
              {filteredStudents.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Step Forms */}
      <div className="mt-6">
        {step === 1 && (
          <>
            <StudentInfoForm
              handleChange={handleChange}
              formData={selectedStudent?.formData || {}}
              setStep={setStep}
            />
            <div className="flex justify-end pt-6">
              <button
                onClick={() => setStep(2)}
                className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-lg"
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <FamilyInfoForm
              handleChange={handleChange}
              formData={selectedStudent?.formData || {}}
              setStep={setStep}
              handleBack={handleBack}
            />
            <div className="flex justify-between pt-6">
              <button
                onClick={handleBack}
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-lg"
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <AdminAdmissionStep3
            step={step}
            setStep={setStep}
            handleBack={handleBack}
            formDataFromBackend={selectedStudent?.formData || {}}
          />
        )}
      </div>
    </div>
  );
};

export default AdminAdmission;
