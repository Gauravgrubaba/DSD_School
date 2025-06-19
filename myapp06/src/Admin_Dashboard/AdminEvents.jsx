import React, { useState, useEffect } from "react";
import api from "../api/axios.jsx";

const EventSection = () => {
  const [tagline, setTagline] = useState("");
  const [editedTagline, setEditedTagline] = useState("");

  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImage, setEventImage] = useState(null);

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deletingIdx, setDeletingIdx] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleUpdateTagline = async (e) => {
    e.preventDefault();

    if(!editedTagline) {
      return alert("Tagline field cannot be empty");
    }

    const data = {
      tagline: editedTagline
    }

    try {
      const res = await api.post('/events/tagline', data);
      setTagline(res.data?.result);
    } catch (error) {
      console.log(error);
    } finally {
      setEditedTagline("");
      setIsEditing(false);
    }
  };

  const handleGetTagline = async () => {
    try {
      const res = await api.get('/events/tagline');
      setTagline(res.data?.result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddEvent = async () => {
    if (events.length >= 10) {
      return alert("Maximum 10 events are allowed");
    }

    if (!eventTitle.trim() || !eventDescription.trim()) {
      return alert("Event title and description cannot be empty");
    }

    if (!eventImage) {
      return alert("Event image is required");
    }

    const data = new FormData();
    data.append("title", eventTitle);
    data.append("description", eventDescription);
    data.append("event-image", eventImage);

    try {
      setIsAdding(true);
      const res = await api.post("/events/event", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setEvents(res.data?.result);
    } catch (error) {
      console.error(error);
    } finally {
      setEventTitle("");
      setEventDescription("");
      setEventImage(null);
      setIsAdding(false);
    }
  };

  const handleGetAllEvents = async () => {
    try {
      const res = await api.get("/events/event");
      setEvents(res.data?.result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEvent = async (idx) => {
    try {
      setDeletingIdx(idx);
      const res = await api.delete(`/events/event/${idx}`);
      setEvents(res.data?.result);
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingIdx(null);
    }
  };

  const handleImageChange = (e) => {
    setIsUploadingImage(true);
    setTimeout(() => {
      setEventImage(e.target.files[0]);
      setIsUploadingImage(false);
    }, 600); // simulate short delay for UX
  };

  useEffect(() => {
    handleGetAllEvents();
    handleGetTagline();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-10 max-w-7xl mx-auto">
      <h1 className="text-5xl font-extrabold text-indigo-700 text-center mb-12">
        Admin Events
      </h1>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Tagline Section */}
        <section className="bg-white rounded-lg shadow-lg p-8 w-full md:w-1/2 flex flex-col items-center">
          <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 border-b-4 border-indigo-300 pb-2 w-full text-center">
            Tagline
          </h2>

          {!tagline && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Add
            </button>
          )}

          {/* If tagline exists and not updating */}
          {tagline && !isEditing && (
            <div className="bg-indigo-50 rounded-lg p-8 max-w-xl shadow-md w-full flex flex-col items-center">
              <p className="text-xl italic text-indigo-900 mb-6 text-center">
                “{tagline}”
              </p>
              <button
                onClick={() => {
                  setEditedTagline(tagline);
                  setIsEditing(true);
                }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Update
              </button>
            </div>
          )}

          {/* Edit tagline input form */}
          {isEditing && (
            <div className="bg-indigo-50 rounded-lg p-8 max-w-xl shadow-md w-full flex flex-col items-center">
              <input
                type="text"
                value={editedTagline}
                onChange={(e) => setEditedTagline(e.target.value)}
                className="w-full p-2 border border-indigo-300 rounded-md mb-4"
              />
              <div className="flex space-x-4">
                <button
                  type="submit"
                  onClick={(e) => handleUpdateTagline(e)}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditedTagline("");
                    setIsEditing(false);
                  }}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Cancel
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
              id="event-image"
              name="event-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-indigo-700"
            />
            {isUploadingImage && (
              <p className="text-sm text-indigo-600">Uploading image...</p>
            )}
            <button
              type="submit"
              disabled={isAdding}
              className={`${isAdding ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                } text-white font-semibold py-3 rounded-lg transition`}
            >
              {isAdding ? "Adding..." : "Add Event"}
            </button>
          </form>

          <div className="flex-grow overflow-y-auto max-h-[420px] space-y-6 pr-2">
            {events.length === 0 ? (
              <p className="text-gray-400 text-center italic">No events added yet.</p>
            ) : (
              events.map(({ title, description, image }, idx) => (
                <div
                  key={idx}
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
                    onClick={() => handleDeleteEvent(idx)}
                    disabled={deletingIdx === idx}
                    className={`ml-6 font-semibold transition-colors ${deletingIdx === idx
                      ? "text-red-300 cursor-not-allowed"
                      : "text-red-500 hover:text-red-700"
                      }`}
                    aria-label="Delete event"
                  >
                    {deletingIdx === idx ? "Deleting..." : "Delete"}
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
