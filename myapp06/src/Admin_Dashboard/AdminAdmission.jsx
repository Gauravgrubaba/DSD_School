import React, { useState } from "react";

const AdminAdmission = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Amit Sharma",
      email: "amit.sharma@example.com",
      phone: "9876543210",
      course: "B.Tech CSE",
      date: "2025-05-10",
      paymentStatus: "Successful",
      paymentScreenshot: null,
    },
    {
      id: 2,
      name: "Priya Verma",
      email: "priya.verma@example.com",
      phone: "7890123456",
      course: "MBA",
      date: "2025-05-11",
      paymentStatus: "Pending",
      paymentScreenshot: null,
    },
  ]);

  const handleScreenshotUpload = (e, studentId) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = students.map((s) =>
          s.id === studentId ? { ...s, paymentScreenshot: reader.result } : s
        );
        setStudents(updated);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        📝 Admin - Admission Dashboard
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300 shadow-md bg-white rounded-lg">
          <thead className="bg-indigo-100">
            <tr className="text-left">
              <th className="p-4 border">Name</th>
              <th className="p-4 border">Email</th>
              <th className="p-4 border">Phone</th>
              <th className="p-4 border">Course</th>
              <th className="p-4 border">Admission Date</th>
              <th className="p-4 border">Payment Status</th>
              <th className="p-4 border">Upload Payment Screenshot</th>
              <th className="p-4 border">Preview</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-t">
                <td className="p-4 border">{student.name}</td>
                <td className="p-4 border">{student.email}</td>
                <td className="p-4 border">{student.phone}</td>
                <td className="p-4 border">{student.course}</td>
                <td className="p-4 border">{student.date}</td>
                <td className={`p-4 border font-medium ${student.paymentStatus === "Successful" ? "text-green-600" : "text-red-500"}`}>
                  {student.paymentStatus}
                </td>
                <td className="p-4 border">
                  <label className="cursor-pointer text-sm text-blue-600 bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleScreenshotUpload(e, student.id)}
                      className="hidden"
                    />
                  </label>
                </td>
                <td className="p-4 border">
                  {student.paymentScreenshot ? (
                    <img
                      src={student.paymentScreenshot}
                      alt="Screenshot"
                      className="w-24 h-auto rounded shadow"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm">No image</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAdmission;
