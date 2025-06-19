import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [tagline, setTagline] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/events/event");
        setEvents(res.data?.result || []);
        const taglineRes = await axios.get("/api/events/tagline");
        setTagline(taglineRes.data?.result || "");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="relative text-center py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-blue-800 uppercase tracking-wide pt-16 pb-4 drop-shadow-md">
          Events
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 font-medium italic mb-8">
          {tagline}
        </p>

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
              <div className="group bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 max-w-[360px] mx-auto transform hover:-translate-y-1">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-56 sm:h-64 object-cover rounded-xl mb-4 cursor-pointer group-hover:scale-105 transition-transform duration-300"
                  onClick={() => {
                    setSelectedEvent(event);
                    setIsModalOpen(true);
                  }}
                />
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
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
