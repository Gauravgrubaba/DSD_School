import React, { useState } from "react";

const Academics = () => {
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [textOverlay, setTextOverlay] = useState("");
  const [classes, setClasses] = useState({
    1: [
      { subject: "Math", time: "9:00 AM - 10:00 AM" },
      { subject: "English", time: "10:15 AM - 11:15 AM" },
      { subject: "Science", time: "11:30 AM - 12:30 PM" },
    ],
    2: [
      { subject: "English", time: "9:00 AM - 10:00 AM" },
      { subject: "Math", time: "10:15 AM - 11:15 AM" },
      { subject: "Physical Education", time: "11:30 AM - 12:30 PM" },
    ],
    // Add other classes here...
  });
  const [selectedClass, setSelectedClass] = useState(null);
  const [newSession, setNewSession] = useState({
    subject: "",
    time: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Handle background image change (upload image from device)
  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      const newImages = [...backgroundImages];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push({ url: reader.result, text: "" });
          setBackgroundImages(newImages);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Handle text input change for overlay text
  const handleTextChange = (e) => {
    setTextOverlay(e.target.value);
  };

  // Handle saving the overlay text to the selected image
  const handleSaveTextOverlay = (index) => {
    const updatedImages = [...backgroundImages];
    updatedImages[index].text = textOverlay;
    setBackgroundImages(updatedImages);
    setTextOverlay(""); // Clear text input after saving
  };

  // Handle deleting a background image
  const handleDeleteImage = (index) => {
    const updatedImages = backgroundImages.filter((_, i) => i !== index);
    setBackgroundImages(updatedImages);
  };

  const handleAddSession = () => {
    if (newSession.subject && newSession.time && selectedClass) {
      const updatedTimetable = [...classes[selectedClass], newSession];
      setClasses({
        ...classes,
        [selectedClass]: updatedTimetable,
      });
      setNewSession({ subject: "", time: "" });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleEditSession = (index) => {
    setIsEditing(true);
    setEditingIndex(index);
    const session = classes[selectedClass][index];
    setNewSession({ subject: session.subject, time: session.time });
  };

  const handleSaveEditedSession = () => {
    const updatedTimetable = [...classes[selectedClass]];
    updatedTimetable[editingIndex] = newSession;
    setClasses({ ...classes, [selectedClass]: updatedTimetable });
    setNewSession({ subject: "", time: "" });
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleDeleteSession = (index) => {
    const updatedTimetable = classes[selectedClass].filter(
      (_, i) => i !== index
    );
    setClasses({ ...classes, [selectedClass]: updatedTimetable });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
      {/* 🔹 Background Image Section */}
      <div className="mb-8">
        <h3 className="text-4xl font-semibold text-blue-700 mb-6">Manage Background Images</h3>

        {/* Image Upload Section */}
        <div className="mb-6">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Upload Background Image</h4>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-600 bg-gray-50 border border-gray-300 rounded-lg shadow-sm p-3"
          />
        </div>

        {/* Display the Uploaded Images */}
        {backgroundImages.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">Uploaded Images</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {backgroundImages.map((image, index) => (
                <div
                  key={index}
                  className="relative w-full h-72 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                >
                  <img
                    src={image.url}
                    alt="Background"
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                  />
                  {/* Display overlay text if set */}
                  {image.text && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <p className="text-white text-xl">{image.text}</p>
                    </div>
                  )}
                  {/* Delete button for image */}
                  <button
                    onClick={() => handleDeleteImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition-all duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Text Overlay Section */}
        {backgroundImages.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">Add Text Overlay</h4>
            <input
              type="text"
              value={textOverlay}
              onChange={handleTextChange}
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="Enter text to overlay on the image"
            />
            <div className="mt-4">
              <button
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition-all duration-300"
                onClick={() => handleSaveTextOverlay(0)} // Save text for the first image
              >
                Save Text Overlay
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 📚 Class Selector */}
      <div className="mb-8 mt-12">
        <h3 className="text-4xl font-semibold text-blue-700 mb-6">Select Class</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Object.keys(classes).map((grade) => (
            <button
              key={grade}
              onClick={() => setSelectedClass(grade)}
              className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 shadow-lg transform hover:scale-105 ${
                selectedClass === grade
                  ? "bg-blue-600 text-white shadow-xl"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              Class {grade}
            </button>
          ))}
        </div>
      </div>

      {/* 📖 Timetable Management for Selected Class */}
      {selectedClass && (
        <div>
          <h3 className="text-4xl font-semibold text-blue-700 mb-6">
            Class {selectedClass} Timetable
          </h3>
          <div className="space-y-6">
            {/* Existing Sessions */}
            {classes[selectedClass].map((session, index) => (
              <div key={index} className="p-6 bg-indigo-50 rounded-xl shadow-lg hover:shadow-xl border border-indigo-100 transition-all duration-300">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-gray-800 text-xl">{session.subject}</h5>
                    <p className="text-sm text-gray-600">{session.time}</p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleEditSession(index)}
                      className="text-blue-600 hover:text-blue-800 transition-all duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSession(index)}
                      className="text-red-600 hover:text-red-800 transition-all duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add/Edit Session Form */}
          <div className="mt-12">
            <h4 className="text-2xl font-semibold text-gray-800 mb-4">
              {isEditing ? "Edit" : "Add"} Session
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                value={newSession.subject}
                onChange={(e) => setNewSession({ ...newSession, subject: e.target.value })}
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Subject"
              />
              <input
                type="text"
                value={newSession.time}
                onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Time"
              />
            </div>
            <div className="mt-4">
              <button
                onClick={isEditing ? handleSaveEditedSession : handleAddSession}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition-all duration-300"
              >
                {isEditing ? "Save Edited Session" : "Add Session"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Academics;
