import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import api from "../../api/axios.jsx";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [tagline, setTagline] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGetAllEvents = async () => {
    try {
      const res = await api.get("/events/event");
      setEvents(res.data?.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetTagline = async () => {
    try {
      const res = await api.get("/events/tagline");
      setTagline(res.data?.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllEvents();
    handleGetTagline();
  }, []);

  return (
    <section className="relative text-center py-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {/* Decorative Blobs or Confetti SVGs */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-pink-200 opacity-30 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-yellow-100 opacity-30 rounded-full blur-2xl -z-10 animate-ping"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-100 opacity-20 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-bold text-blue-800 uppercase tracking-wide pt-16 pb-4 drop-shadow-md">
          Events
        </h2>

        {/* Tagline */}
        <p className="text-lg sm:text-xl text-gray-700 font-medium italic mb-12">
          {tagline}
        </p>

        {/* Swiper Section */}
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          loop
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {events.map((event, index) => (
            <SwiperSlide key={index}>
              <div className="group bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 max-w-[360px] mx-auto transform hover:-translate-y-1 flex flex-col items-center justify-center h-full text-center">
                <img
                  src={event.image}
                  alt={event.title}
                  width={289}
                  height={361}
                  className="w-[289px] h-[361px] object-cover object-center rounded-t-xl cursor-pointer transition-transform duration-300 group-hover:scale-105"
                  onClick={() => {
                    setSelectedEvent(event);
                    setIsModalOpen(true);
                  }}
                />
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-4">
                  {event.title}
                </h3>
                <p className="text-base sm:text-lg text-gray-600 mt-2">
                  {event.description.slice(0, 100)}...
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-xl w-full relative animate-fade-in transition-all duration-500">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-2xl"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedEvent.title}
            </h3>
            <p className="text-gray-700">{selectedEvent.description}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Events;
