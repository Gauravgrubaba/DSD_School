import React, {useState, useEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [tagline, setTagline] = useState("");

  const handleGetAllEvents = async () => {
    try {
      const res = await axios.get('/api/events/event');
      console.log(res);
      setEvents(res.data?.result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetTagline = async () => {
    try {
      const res = await axios.get('/api/events/tagline');
      setTagline(res.data?.result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetAllEvents();
    handleGetTagline();
  }, [])

  return (
    <section className="relative text-center py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Centered Title with Extra Padding */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-700 text-center uppercase tracking-wide pt-16 pb-4">
          Events
        </h2>
        <p className="text-lg sm:text-xl text-gray-700 text-center mb-6">
          {tagline}
        </p>

        {/* Swiper Slider */}
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
          {events.map((event, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-[360px] mx-auto">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-56 sm:h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">{event.title}</h3>
                <p className="text-base sm:text-lg text-gray-600 mt-2">{event.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Events;
