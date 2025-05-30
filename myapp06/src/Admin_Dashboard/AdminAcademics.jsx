import React, { useState } from "react";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function AdminAcademics() {
  const [heroImage, setHeroImage] = useState(null);
  const [heroText, setHeroText] = useState("");
  const [heroSections, setHeroSections] = useState([]);

  const [classes, setClasses] = useState([]);
  const [selectedClassIndex, setSelectedClassIndex] = useState(null);

  const [selectedSectionIndex, setSelectedSectionIndex] = useState(null);

  // For new class, allow free text
  const [newClassName, setNewClassName] = useState("");

  // For new section, allow free text
  const [newSectionName, setNewSectionName] = useState("");

  // Timetable entry states
  const [newEntryDay, setNewEntryDay] = useState(weekdays[0]);
  const [newEntrySubject, setNewEntrySubject] = useState("");
  const [newEntryTime, setNewEntryTime] = useState("");
  const [newEntryPeriod, setNewEntryPeriod] = useState("AM");

  const [editingEntryIndex, setEditingEntryIndex] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setHeroImage(imageUrl);
    }
  };

  const handleAddHeroSection = () => {
    if (!heroImage || !heroText.trim()) return alert("Please provide image and text.");
    setHeroSections((prev) => [...prev, { image: heroImage, text: heroText }]);
    setHeroImage(null);
    setHeroText("");
  };

  const handleDeleteHero = (index) => {
    const updated = [...heroSections];
    updated.splice(index, 1);
    setHeroSections(updated);
  };

  const handleEditHero = (index) => {
    const selected = heroSections[index];
    setHeroImage(selected.image);
    setHeroText(selected.text);
    const updated = [...heroSections];
    updated.splice(index, 1);
    setHeroSections(updated);
  };

  const addClass = () => {
    const trimmedName = newClassName.trim();
    if (!trimmedName) return alert("Enter a class name.");
    if (classes.some((c) => c.className.toLowerCase() === trimmedName.toLowerCase()))
      return alert("Class already exists.");
    setClasses([...classes, { className: trimmedName, sections: [] }]);
    setNewClassName("");
  };

  const deleteClass = (index) => {
    const updated = [...classes];
    updated.splice(index, 1);
    setClasses(updated);
    setSelectedClassIndex(null);
    setSelectedSectionIndex(null);
  };

  const addSection = () => {
    if (selectedClassIndex === null) return alert("Select class first.");
    const trimmedName = newSectionName.trim();
    if (!trimmedName) return alert("Enter a section name.");
    const selectedClass = classes[selectedClassIndex];
    if (
      selectedClass.sections.some(
        (s) => s.sectionName.toLowerCase() === trimmedName.toLowerCase()
      )
    )
      return alert("Section exists.");
    const updated = [...classes];
    updated[selectedClassIndex].sections.push({
      sectionName: trimmedName,
      timetable: weekdays.reduce((acc, day) => {
        acc[day] = [];
        return acc;
      }, {}),
    });
    setClasses(updated);
    setNewSectionName("");
  };

  const deleteSection = (index) => {
    const updated = [...classes];
    updated[selectedClassIndex].sections.splice(index, 1);
    setClasses(updated);
    setSelectedSectionIndex(null);
  };

  const addTimetableEntry = () => {
    if (!newEntrySubject || !newEntryTime) return alert("Enter subject and time");
    const timeWithPeriod = `${newEntryTime} ${newEntryPeriod}`;
    const updated = [...classes];
    const dayEntries = updated[selectedClassIndex].sections[selectedSectionIndex].timetable[newEntryDay];

    if (editingEntryIndex !== null) {
      dayEntries[editingEntryIndex] = { subject: newEntrySubject, time: timeWithPeriod };
      setEditingEntryIndex(null);
    } else {
      if (dayEntries.some((e) => e.subject === newEntrySubject && e.time === timeWithPeriod)) {
        return alert("Duplicate entry.");
      }
      dayEntries.push({ subject: newEntrySubject, time: timeWithPeriod });
    }

    setClasses(updated);
    setNewEntrySubject("");
    setNewEntryTime("");
    setNewEntryPeriod("AM");
  };

  const handleEditTimetableEntry = (idx) => {
    const entry = classes[selectedClassIndex].sections[selectedSectionIndex].timetable[newEntryDay][idx];
    const [time, period] = entry.time.split(" ");
    setNewEntrySubject(entry.subject);
    setNewEntryTime(time);
    setNewEntryPeriod(period);
    setEditingEntryIndex(idx);
  };

  const handleDeleteTimetableEntry = (idx) => {
    const updated = [...classes];
    updated[selectedClassIndex].sections[selectedSectionIndex].timetable[newEntryDay].splice(idx, 1);
    setClasses(updated);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Admin Academics</h1>

      {/* Hero Section */}
      <div className="border p-4 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Hero Section</h2>
        <input type="file" accept="image/*" onChange={handleImageChange} />
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {heroSections.map((sec, i) => (
            <div key={i} className="relative border rounded overflow-hidden">
              <img src={sec.image} alt="Hero" className="w-full h-48 object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-lg font-bold">
                {sec.text}
              </div>
              <div className="absolute top-2 right-2 space-x-2">
                <button onClick={() => handleEditHero(i)} className="bg-yellow-400 px-2 py-1 rounded">Edit</button>
                <button onClick={() => handleDeleteHero(i)} className="bg-red-500 px-2 py-1 rounded text-white">Delete</button>
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
        <button onClick={addClass} className="bg-green-600 text-white px-4 py-2 rounded ml-2">
          Add Class
        </button>

        <div className="flex flex-wrap gap-2 mt-4">
          {classes.map((cls, i) => (
            <div key={i} className="flex items-center space-x-1">
              <button
                className={`px-4 py-2 border rounded ${selectedClassIndex === i ? "bg-blue-600 text-white" : ""}`}
                onClick={() => {
                  setSelectedClassIndex(i);
                  setSelectedSectionIndex(null);
                }}
              >
                Class {cls.className}
              </button>
              <button onClick={() => deleteClass(i)} className="text-red-500">✖</button>
            </div>
          ))}
        </div>
      </div>

      {/* Section Management */}
      {selectedClassIndex !== null && (
        <div className="border p-4 rounded shadow space-y-4">
          <h2 className="text-xl font-semibold">Sections of Class {classes[selectedClassIndex].className}</h2>
          <input
            type="text"
            placeholder="Enter new section name (e.g. A, B, C, D)"
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
            className="border p-2 w-48"
          />
          <button onClick={addSection} className="bg-purple-600 text-white px-4 py-2 rounded ml-2">
            Add Section
          </button>

          <div className="flex flex-wrap gap-2 mt-4">
            {classes[selectedClassIndex].sections.map((sec, i) => (
              <div key={i} className="flex items-center space-x-1">
                <button
                  className={`px-4 py-2 border rounded ${selectedSectionIndex === i ? "bg-green-600 text-white" : ""}`}
                  onClick={() => setSelectedSectionIndex(i)}
                >
                  Section {sec.sectionName}
                </button>
                <button onClick={() => deleteSection(i)} className="text-red-500">✖</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timetable */}
      {selectedClassIndex !== null && selectedSectionIndex !== null && (
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
              {editingEntryIndex !== null ? "Update" : "Add"}
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Timetable for {newEntryDay}</h3>
            <table className="w-full table-auto border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Subject</th>
                  <th className="border p-2">Time</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {classes[selectedClassIndex].sections[selectedSectionIndex].timetable[newEntryDay].map((entry, idx) => (
                  <tr key={idx}>
                    <td className="border p-2">{entry.subject}</td>
                    <td className="border p-2">{entry.time}</td>
                    <td className="border p-2 space-x-2">
                      <button onClick={() => handleEditTimetableEntry(idx)} className="text-yellow-600">
                        Edit
                      </button>
                      <button onClick={() => handleDeleteTimetableEntry(idx)} className="text-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {classes[selectedClassIndex].sections[selectedSectionIndex].timetable[newEntryDay].length === 0 && (
                  <tr><td colSpan={3} className="text-center p-4">No entries</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
