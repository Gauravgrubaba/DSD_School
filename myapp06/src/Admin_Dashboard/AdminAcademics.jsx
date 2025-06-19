import React, { useEffect, useState } from "react";
import api from "../api/axios.jsx";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function AdminAcademics() {
  const [heroImage, setHeroImage] = useState(null);
  const [heroText, setHeroText] = useState("");
  const [heroSections, setHeroSections] = useState({ images: [], texts: [] });
  const [isLoadingHero, setIsLoadingHero] = useState(false);
  const [isLoadingClass, setIsLoadingClass] = useState(false);
  const [deletingClassIndex, setDeletingClassIndex] = useState(null); // ✅ New state

  const [classes, setClasses] = useState([]);
  const [selectedClassIndex, setSelectedClassIndex] = useState(null);
  const [newClassName, setNewClassName] = useState("");
  const [newEntryDay, setNewEntryDay] = useState(weekdays[0]);
  const [newEntrySubject, setNewEntrySubject] = useState("");
  const [newEntryTime, setNewEntryTime] = useState("");
  const [newEntryPeriod, setNewEntryPeriod] = useState("AM");

  const [selectedClassData, setSelectedClassData] = useState({});
  const [selectedClassTimeTable, setSelectedClassTimeTable] = useState({});

  const handleAddHeroSection = async () => {
    if (!heroImage || !heroText.trim()) return alert("Please provide image and text.");
    if (heroSections.images.length >= 3) return alert("Maximum 3 images are allowed");

    const data = new FormData();
    data.append("text", heroText);
    data.append("heroSectionImage", heroImage);

    try {
      setIsLoadingHero(true);
      const res = await api.post("/academic/herosection", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setHeroSections(res?.data?.result);
    } catch (error) {
      console.error(error);
    } finally {
      setHeroText("");
      setHeroImage(null);
      setIsLoadingHero(false);
    }
  };

  const handleGetHeroSection = async () => {
    try {
      const res = await api.get("/academic/herosection");
      setHeroSections(res?.data?.result);
    } catch (error) {
      console.error("Error getting hero section images", error);
    }
  };

  useEffect(() => {
    handleGetHeroSection();
  }, []);

  const handleDeleteHero = async (index) => {
    try {
      const res = await api.delete(`/academic/herosection/${index}`);
      setHeroSections(res?.data?.result);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteClass = async (index) => {
    const id = classes[index]?.id;
    setDeletingClassIndex(index); // ✅ Set loading state
    try {
      const res = await api.delete(`/academic/class/${id}`);
      const result = res?.data?.result;
      const grouped = result.map(cls => ({
        className: cls.className,
        timeTable: cls.timeTable,
        id: cls._id
      }));
      setClasses(grouped);
      setSelectedClassIndex(null);
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingClassIndex(null); // ✅ Clear loading state
    }
  };

  const addTimetableEntry = async () => {
    const id = classes[selectedClassIndex]?.id;
    if (!newEntrySubject) return alert("Subject name is required.");
    if (!newEntryTime) return alert("Time is required");

    const data = {
      subject: newEntrySubject,
      time: `${newEntryTime} ${newEntryPeriod}`,
      day: newEntryDay
    };

    try {
      const res = await api.patch(`/academic/class/${id}`, data);
      const updatedTimeTable = res?.data?.result?.timeTable;
      setClasses(prev =>
        prev.map((cls, idx) =>
          idx === selectedClassIndex
            ? { ...cls, timeTable: updatedTimeTable }
            : cls
        )
      );
      setSelectedClassTimeTable(updatedTimeTable);
    } catch (error) {
      console.log(error);
    } finally {
      setNewEntrySubject("");
      setNewEntryTime("");
    }
  };

  const handleDeleteTimetableEntry = async (day, index) => {
    const id = classes[selectedClassIndex]?.id;
    try {
      const res = await api.delete(`/academic/class/${id}/${day}/${index}`);
      const grouped = {
        className: res?.data?.result?.className,
        timeTable: res?.data?.result?.timeTable,
        id: res?.data?.result?._id
      };
      setClasses(prev =>
        prev.map(cls => (cls.id === grouped.id ? grouped : cls))
      );
      setSelectedClassTimeTable(grouped.timeTable);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateClass = async () => {
    const trimmedName = newClassName.trim();
    if (!trimmedName) return alert("Enter a class name.");
    if (classes.some(c => c.className.toLowerCase() === trimmedName.toLowerCase()))
      return alert("Class already exists.");

    const dataToSend = { className: trimmedName.toUpperCase() };
    try {
      setIsLoadingClass(true);
      const res = await api.post("/academic/class", dataToSend);
      const classData = res?.data?.classData;
      setClasses(prev => [
        ...prev,
        { className: classData.className, timeTable: classData.timeTable, id: classData._id }
      ]);
      setSelectedClassData(classData);
      setNewClassName("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingClass(false);
    }
  };

  const handleGetClassTimeTable = async () => {
    try {
      const res = await api.get("/academic/class");
      const result = res?.data?.result || [];
      const grouped = result.map(cls => ({
        className: cls.className,
        timeTable: cls.timeTable,
        id: cls._id
      }));
      setClasses(grouped);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetClassTimeTable();
  }, []);

  const handleShowClassTimeTable = (i) => {
    setSelectedClassIndex(i);
    setSelectedClassTimeTable(classes[i]?.timeTable);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Admin Academics</h1>

      {/* Hero Section */}
      <div className="border p-4 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Hero Section</h2>
        <input type="file" accept="image/*" onChange={(e) => setHeroImage(e.target.files[0])} />
        <input
          type="text"
          value={heroText}
          onChange={(e) => setHeroText(e.target.value)}
          placeholder="Enter Text"
          className="border p-2 w-full"
        />
        <button onClick={handleAddHeroSection} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Hero Section
        </button>

        {isLoadingHero && <div className="text-blue-600 font-medium animate-pulse">Uploading image, please wait...</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {heroSections?.images.map((img, i) => (
            <div key={i} className="relative border rounded overflow-hidden">
              <img src={img} alt="Hero" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-lg font-bold">
                {heroSections?.texts?.[i] || ""}
              </div>
              <div className="absolute top-2 right-2 space-x-2">
                <button onClick={() => handleDeleteHero(i)} className="bg-red-500 px-2 py-1 rounded text-white">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Class Management */}
      <div className="border p-4 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Classes</h2>
        <input
          type="text"
          placeholder="Enter new class name (e.g. 7, 8, 9)"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
          className="border p-2 w-48"
        />
        <button
          onClick={handleCreateClass}
          className="bg-green-600 text-white px-4 py-2 rounded ml-2 disabled:opacity-50"
          disabled={isLoadingClass}
        >
          {isLoadingClass ? "Adding..." : "Add Class"}
        </button>

        <div className="flex flex-wrap gap-2 mt-4">
          {classes.map((cls, i) => (
            <div key={i} className="flex items-center space-x-1">
              <button
                className={`px-4 py-2 border rounded ${selectedClassIndex === i ? "bg-blue-600 text-white" : ""}`}
                onClick={() => handleShowClassTimeTable(i)}
              >
                {cls.className}
              </button>
              <button
                onClick={() => deleteClass(i)}
                className="text-red-500"
                disabled={deletingClassIndex === i}
              >
                {deletingClassIndex === i ? "Deleting..." : "✖"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Timetable Section */}
      {selectedClassIndex !== null && (
        <div className="border p-4 rounded shadow space-y-4">
          <h2 className="text-xl font-semibold mb-4">Timetable Entry</h2>
          <div className="flex gap-2 flex-wrap">
            <select value={newEntryDay} onChange={(e) => setNewEntryDay(e.target.value)} className="border p-2">
              {weekdays.map((day) => (
                <option key={day}>{day}</option>
              ))}
            </select>
            <input
              value={newEntrySubject}
              onChange={(e) => setNewEntrySubject(e.target.value)}
              placeholder="Subject"
              className="border p-2"
            />
            <input
              type="time"
              value={newEntryTime}
              onChange={(e) => setNewEntryTime(e.target.value)}
              className="border p-2"
            />
            <select value={newEntryPeriod} onChange={(e) => setNewEntryPeriod(e.target.value)} className="border p-2">
              <option>AM</option>
              <option>PM</option>
            </select>
            <button onClick={addTimetableEntry} className="bg-indigo-600 text-white px-4 py-2 rounded">
              Add
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Timetable for {newEntryDay}</h3>
            <table className="w-full table-auto border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Subject</th>
                  <th className="border p-2">Time</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedClassTimeTable[newEntryDay]?.length > 0 ? (
                  selectedClassTimeTable[newEntryDay].map((entry, idx) => (
                    <tr key={`${newEntryDay}-${idx}`}>
                      <td className="border p-2">{entry.subjectName}</td>
                      <td className="border p-2">{entry.timing}</td>
                      <td className="border p-2 space-x-2">
                        <button onClick={() => handleDeleteTimetableEntry(newEntryDay, idx)} className="text-red-600">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center p-4">
                      No entries
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
