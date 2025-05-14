import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const AdminEvents = () => {
  // Sample events data for demonstration
  const [events, setEvents] = useState([
    { id: 1, title: "Music Festival", description: "Enjoy live performances by top artists.", image: "/music-festival.jpg" },
    { id: 2, title: "Startup Meetup", description: "Connect with investors and entrepreneurs.", image: "/startup-meetup.jpg" },
    { id: 3, title: "National Sports Day", description: "Watch thrilling sports competitions.", image: "/sports-day.jpg" },
    { id: 4, title: "AI Hackathon", description: "Show your coding skills and win prizes.", image: "/coding-hackathon.jpg" },
    { id: 5, title: "Tech Conference", description: "Explore AI, ML, and cloud computing.", image: "/tech-conference.jpg" },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [editEvent, setEditEvent] = useState(null);

  // State for the editable text in the Main and Sub sections
  const [mainText, setMainText] = useState("This is the main section where you can provide some key information.");
  const [subText, setSubText] = useState("This is the sub-section where additional information can be placed to provide further details.");

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.description && newEvent.image) {
      setEvents([ ...events, { id: events.length + 1, ...newEvent } ]);
      setNewEvent({ title: "", description: "", image: "" });
    } else {
      alert("Please fill all fields!");
    }
  };

  const handleEditEvent = (event) => {
    setEditEvent(event);
  };

  const handleSaveEditEvent = () => {
    if (editEvent) {
      setEvents(events.map(event => event.id === editEvent.id ? editEvent : event));
      setEditEvent(null);
    }
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  // Handle changes for editable main and sub section text
  const handleMainTextChange = (e) => setMainText(e.target.value);
  const handleSubTextChange = (e) => setSubText(e.target.value);

  const handleUpdateMainSection = () => console.log("Main section updated:", mainText);
  const handleDeleteMainSection = () => setMainText("");
  const handleUpdateSubSection = () => console.log("Sub section updated:", subText);
  const handleDeleteSubSection = () => setSubText("");

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Page Heading and Sub-heading Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Admin Event Management</h1>
        <p className="text-lg text-gray-600">
          Use this panel to manage the events for your school. You can add, edit, or delete events to keep the students and staff informed about upcoming activities.
        </p>
      </div>

      {/* Main and Sub Sections */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Main Section</h3>
        <textarea
          value={mainText}
          onChange={handleMainTextChange}
          className="w-full p-3 border-2 border-gray-300 rounded-md mb-4"
          placeholder="Write the main section content here"
          rows="4"
        />
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={handleUpdateMainSection}
            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-800 transition"
          >
            Update Main Section
          </button>
          <button
            onClick={handleDeleteMainSection}
            className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-800 transition"
          >
            Delete Main Section
          </button>
        </div>
        
        {/* Sub Section */}
        <div className="bg-gray-100 p-4 rounded-md mt-6">
          <h4 className="text-xl font-semibold text-blue-500 mb-2">Sub Section</h4>
          <textarea
            value={subText}
            onChange={handleSubTextChange}
            className="w-full p-3 border-2 border-gray-300 rounded-md"
            placeholder="Write the sub-section content here"
            rows="4"
          />
          <div className="flex gap-4 mt-4 flex-wrap">
            <button
              onClick={handleUpdateSubSection}
              className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-800 transition"
            >
              Update Sub Section
            </button>
            <button
              onClick={handleDeleteSubSection}
              className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-800 transition"
            >
              Delete Sub Section
            </button>
          </div>
        </div>
      </div>

      {/* Add Event Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
        <h3 className="text-2xl font-semibold mb-2 text-blue-600">Add New Event</h3>
        <p className="text-lg text-gray-600 mb-4">Fill in the details below to add a new event to the list:</p>

        <div className="mb-4">
          <label className="block text-lg font-semibold">Event Title</label>
          <input
            type="text"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            className="w-full p-3 border-2 border-gray-300 rounded-md"
            placeholder="Enter event title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold">Event Description</label>
          <textarea
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            className="w-full p-3 border-2 border-gray-300 rounded-md"
            placeholder="Enter event description"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold">Event Image URL</label>
          <input
            type="text"
            value={newEvent.image}
            onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
            className="w-full p-3 border-2 border-gray-300 rounded-md"
            placeholder="Enter event image URL"
          />
        </div>
        <button
          onClick={handleAddEvent}
          className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-800 transition"
        >
          Add Event
        </button>
      </div>

      {/* Event List Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
        <h3 className="text-2xl font-semibold mb-2 text-blue-600">Event List</h3>
        <p className="text-lg text-gray-600 mb-4">Here is the list of all upcoming events. You can edit or delete events from this list:</p>

        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mt-10"
        >
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-[360px] mx-auto">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-56 sm:h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">{event.title}</h3>
                <p className="text-base sm:text-lg text-gray-600 mt-2">{event.description}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEditEvent(event)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Edit Event Section */}
      {editEvent && (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
          <h3 className="text-2xl font-semibold mb-2 text-blue-600">Edit Event</h3>
          <p className="text-lg text-gray-600 mb-4">Make changes to the selected event below:</p>

          <div className="mb-4">
            <label className="block text-lg font-semibold">Event Title</label>
            <input
              type="text"
              value={editEvent.title}
              onChange={(e) => setEditEvent({ ...editEvent, title: e.target.value })}
              className="w-full p-3 border-2 border-gray-300 rounded-md"
              placeholder="Enter event title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold">Event Description</label>
            <textarea
              value={editEvent.description}
              onChange={(e) => setEditEvent({ ...editEvent, description: e.target.value })}
              className="w-full p-3 border-2 border-gray-300 rounded-md"
              placeholder="Enter event description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold">Event Image URL</label>
            <input
              type="text"
              value={editEvent.image}
              onChange={(e) => setEditEvent({ ...editEvent, image: e.target.value })}
              className="w-full p-3 border-2 border-gray-300 rounded-md"
              placeholder="Enter event image URL"
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleSaveEditEvent}
              className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-800 transition"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditEvent(null)}
              className="bg-gray-600 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
