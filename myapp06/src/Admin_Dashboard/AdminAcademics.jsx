import React, { useState } from 'react';

const initialWeekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const AdminAcademics = () => {
  // Hero Section States
  const [heroImage, setHeroImage] = useState(null);
  const [heroText, setHeroText] = useState('');
  const [heroSections, setHeroSections] = useState([]); // array of {image, text}

  // Time Table States
  const [selectedClass, setSelectedClass] = useState(1);
  const [timeTables, setTimeTables] = useState({});

  // For managing "Add new entry" inputs per day
  const [addingDay, setAddingDay] = useState(null);
  const [newEntry, setNewEntry] = useState({ subject: '', time: '' });

  // For editing entries, store {day, index} being edited and edit values
  const [editingEntry, setEditingEntry] = useState({ day: null, index: null });
  const [editEntryValues, setEditEntryValues] = useState({ subject: '', time: '' });

  // Image Handler for current image input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setHeroImage(imageUrl);
    }
  };

  // Add current hero image + text to heroSections array
  const handleAddHeroSection = () => {
    if (!heroImage) {
      alert('Please select an image first!');
      return;
    }
    if (!heroText.trim()) {
      alert('Please enter hero text!');
      return;
    }
    setHeroSections((prev) => [...prev, { image: heroImage, text: heroText }]);
    setHeroImage(null);
    setHeroText('');
  };

  // Start adding entry for a day
  const handleStartAddEntry = (day) => {
    setAddingDay(day);
    setNewEntry({ subject: '', time: '' });
  };

  // Cancel adding new entry
  const handleCancelAddEntry = () => {
    setAddingDay(null);
    setNewEntry({ subject: '', time: '' });
  };

  // Save new entry
  const handleSaveNewEntry = () => {
    const { subject, time } = newEntry;
    if (!subject.trim() || !time.trim()) {
      alert('Please fill both subject and time');
      return;
    }
    setTimeTables((prev) => {
      const classData = prev[selectedClass] || {};
      const dayData = classData[addingDay] || [];
      return {
        ...prev,
        [selectedClass]: {
          ...classData,
          [addingDay]: [...dayData, { subject: subject.trim(), time: time.trim() }],
        },
      };
    });
    setAddingDay(null);
    setNewEntry({ subject: '', time: '' });
  };

  // Delete Entry
  const handleDeleteEntry = (day, index) => {
    setTimeTables((prev) => {
      const updated = { ...prev };
      updated[selectedClass][day].splice(index, 1);
      return { ...updated };
    });
  };

  // Start editing an entry
  const handleStartEditEntry = (day, index) => {
    const entry = timeTables[selectedClass][day][index];
    setEditingEntry({ day, index });
    setEditEntryValues({ subject: entry.subject, time: entry.time });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingEntry({ day: null, index: null });
    setEditEntryValues({ subject: '', time: '' });
  };

  // Save edited entry
  const handleSaveEdit = () => {
    const { subject, time } = editEntryValues;
    if (!subject.trim() || !time.trim()) {
      alert('Please fill both subject and time');
      return;
    }
    setTimeTables((prev) => {
      const updated = { ...prev };
      updated[selectedClass][editingEntry.day][editingEntry.index] = {
        subject: subject.trim(),
        time: time.trim(),
      };
      return { ...updated };
    });
    setEditingEntry({ day: null, index: null });
    setEditEntryValues({ subject: '', time: '' });
  };

  return (
    <div className="p-6 space-y-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="border rounded-xl p-6 shadow-md space-y-6">
        <h2 className="text-2xl font-semibold mb-4">📸 Hero Section (Multiple Images)</h2>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border rounded px-3 py-2 w-full md:w-auto"
          />
          <input
            type="text"
            placeholder="Enter hero text"
            className="border rounded px-3 py-2 flex-grow"
            value={heroText}
            onChange={(e) => setHeroText(e.target.value)}
          />
          <button
            onClick={handleAddHeroSection}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition whitespace-nowrap"
          >
            Add Hero Section
          </button>
        </div>

        {/* Display all added hero sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {heroSections.length === 0 && (
            <p className="text-gray-500 italic col-span-full text-center">No hero sections added yet.</p>
          )}
          {heroSections.map((section, idx) => (
            <div key={idx} className="relative h-52 rounded-lg overflow-hidden shadow-lg border">
              <img
                src={section.image}
                alt={`Hero ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-lg font-semibold px-4 text-center">
                {section.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time Table Section */}
      <div className="border rounded-xl p-6 shadow-md space-y-6">
        <h2 className="text-2xl font-semibold mb-4">📅 Timetable Manager (Class 1–5)</h2>

        {/* Class Selector */}
        <div className="flex space-x-3 mb-6 justify-center md:justify-start">
          {[1, 2, 3, 4, 5].map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-4 py-2 rounded-lg font-medium shadow-sm ${
                selectedClass === cls
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              } transition`}
            >
              Class {cls}
            </button>
          ))}
        </div>

        {/* Timetable Display */}
        <div className="space-y-6 max-h-[500px] overflow-auto">
          {initialWeekDays.map((day) => (
            <div key={day} className="border p-4 rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">{day}</h3>
                {addingDay === day ? (
                  <div className="flex space-x-2 items-center">
                    <input
                      type="text"
                      placeholder="Subject"
                      value={newEntry.subject}
                      onChange={(e) =>
                        setNewEntry((prev) => ({ ...prev, subject: e.target.value }))
                      }
                      className="border rounded px-2 py-1 w-36"
                    />
                    <input
                      type="text"
                      placeholder="Timing"
                      value={newEntry.time}
                      onChange={(e) =>
                        setNewEntry((prev) => ({ ...prev, time: e.target.value }))
                      }
                      className="border rounded px-2 py-1 w-28"
                    />
                    <button
                      onClick={handleSaveNewEntry}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelAddEntry}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleStartAddEntry(day)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  >
                    Add
                  </button>
                )}
              </div>
              <ul className="space-y-2">
                {(timeTables[selectedClass]?.[day] || []).map((entry, index) => {
                  const isEditing =
                    editingEntry.day === day && editingEntry.index === index;
                  return (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-white p-3 rounded shadow"
                    >
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            value={editEntryValues.subject}
                            onChange={(e) =>
                              setEditEntryValues((prev) => ({
                                ...prev,
                                subject: e.target.value,
                              }))
                            }
                            className="border rounded px-2 py-1 w-36"
                          />
                          <input
                            type="text"
                            value={editEntryValues.time}
                            onChange={(e) =>
                              setEditEntryValues((prev) => ({
                                ...prev,
                                time: e.target.value,
                              }))
                            }
                            className="border rounded px-2 py-1 w-28 mx-2"
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={handleSaveEdit}
                              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <span>
                            <strong>{entry.time}</strong> – {entry.subject}
                          </span>
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleStartEditEntry(day, index)}
                              className="text-blue-600 hover:text-blue-800 font-semibold"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteEntry(day, index)}
                              className="text-red-600 hover:text-red-800 font-semibold"
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </li>
                  );
                })}
                {/* Show message if no entries */}
                {(timeTables[selectedClass]?.[day]?.length || 0) === 0 && addingDay !== day && (
                  <p className="text-gray-400 italic">No entries added yet.</p>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAcademics;
