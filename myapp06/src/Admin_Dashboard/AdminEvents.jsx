import React, { useState } from "react";

const EventSection = () => {
  // Tagline state (only one tagline)
  const [tagline, setTagline] = useState({
    id: 1,
    text: "Empowering your vision every day.",
  });

  // Events state
  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImage, setEventImage] = useState(null);

  const handleDeleteTagline = (id) => {
    if (tagline && tagline.id === id) {
      setTagline(null);
    }
  };

  const handleUpdateTagline = (id, oldText) => {
    const updatedText = prompt("Update tagline:", oldText);
    if (updatedText !== null && updatedText.trim() !== "") {
      setTagline({ id, text: updatedText.trim() });
    }
  };

  // Event handlers
  const handleAddEvent = () => {
    if (!eventTitle.trim() || !eventDescription.trim()) return;

    const newEvent = {
      id: Date.now(),
      title: eventTitle.trim(),
      description: eventDescription.trim(),
      image: eventImage ? URL.createObjectURL(eventImage) : null,
    };

    setEvents([...events, newEvent]);
    setEventTitle("");
    setEventDescription("");
    setEventImage(null);
    document.getElementById("event-image-input").value = "";
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const handleEventImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEventImage(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-10 max-w-7xl mx-auto">
      {/* Main Heading */}
      <h1 className="text-5xl font-extrabold text-indigo-700 text-center mb-12">
        Admin Events
      </h1>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Tagline Section */}
        <section className="bg-white rounded-lg shadow-lg p-8 w-full md:w-1/2 flex flex-col items-center">
          <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 border-b-4 border-indigo-300 pb-2 w-full text-center">
            Tagline
          </h2>

          {!tagline ? (
            <p className="text-gray-400 italic text-center">No tagline available.</p>
          ) : (
            <div className="bg-indigo-50 rounded-lg p-8 max-w-xl shadow-md w-full flex flex-col items-center">
              <p className="text-xl italic text-indigo-900 mb-6 text-center">
                “{tagline.text}”
              </p>

              <div className="flex space-x-6">
                <button
                  onClick={() => handleUpdateTagline(tagline.id, tagline.text)}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteTagline(tagline.id)}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Events Section */}
        <section className="bg-white rounded-lg shadow-lg p-8 w-full md:w-1/2 flex flex-col">
          <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 border-b-4 border-indigo-300 pb-2">
            Events
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddEvent();
            }}
            className="flex flex-col space-y-4 mb-8"
          >
            <input
              type="text"
              placeholder="Event Title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="border border-indigo-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
            <textarea
              placeholder="Event Description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              rows={3}
              className="border border-indigo-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
            <input
              id="event-image-input"
              type="file"
              accept="image/*"
              onChange={handleEventImageChange}
              className="text-indigo-700"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Add Event
            </button>
          </form>

          <div className="flex-grow overflow-y-auto max-h-[420px] space-y-6 pr-2">
            {events.length === 0 ? (
              <p className="text-gray-400 text-center italic">No events added yet.</p>
            ) : (
              events.map(({ id, title, description, image }) => (
                <div
                  key={id}
                  className="flex items-center bg-indigo-50 rounded-lg p-4 shadow-md hover:shadow-indigo-300 transition-shadow"
                >
                  {image && (
                    <img
                      src={image}
                      alt={title}
                      className="w-24 h-24 rounded-lg object-cover mr-6 border border-indigo-300"
                    />
                  )}
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-indigo-900 mb-1">{title}</h3>
                    <p className="text-indigo-800">{description}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(id)}
                    className="ml-6 text-red-500 font-semibold hover:text-red-700 transition-colors"
                    aria-label="Delete event"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default EventSection;
