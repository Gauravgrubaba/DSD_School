import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Events = () => {
  const events = [
    { title: "Music Festival", description: "Enjoy live performances by top artists.", image: "/music-festival.jpg" },
    { title: "Startup Meetup", description: "Connect with investors and entrepreneurs.", image: "/startup-meetup.jpg" },
    { title: "National Sports Day", description: "Watch thrilling sports competitions.", image: "/sports-day.jpg" },
    { title: "AI Hackathon", description: "Show your coding skills and win prizes.", image: "/coding-hackathon.jpg" },
    { title: "Tech Conference", description: "Explore AI, ML, and cloud computing.", image: "/tech-conference.jpg" },
  ];

  return (
    <section className="relative text-center py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Centered Title with Extra Padding */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-700 text-center uppercase tracking-wide pt-16 pb-4">
        Events
        </h2>
        <p className="text-lg sm:text-xl text-gray-700 text-center mb-6">
          We Manage Events in a Smart Way to Ensure a Bright Future
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
