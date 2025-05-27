import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const academicsData = {
  overview:
    "Our academic program is designed to nurture curiosity, creativity, and excellence. We offer a structured curriculum that blends modern teaching methodologies with traditional values to ensure a holistic learning experience.",
  timetables: {
    1: {
      Monday: [
        { subject: "Math", time: "9:00 AM - 10:00 AM" },
        { subject: "English", time: "10:15 AM - 11:15 AM" },
      ],
      Tuesday: [
        { subject: "Science", time: "9:00 AM - 10:00 AM" },
        { subject: "Art", time: "10:15 AM - 11:15 AM" },
      ],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
    },
    2: {
      Monday: [
        { subject: "English", time: "9:00 AM - 10:00 AM" },
        { subject: "Math", time: "10:15 AM - 11:15 AM" },
      ],
      Tuesday: [
        { subject: "Science", time: "9:00 AM - 10:00 AM" },
        { subject: "PE", time: "10:15 AM - 11:15 AM" },
      ],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
    },
    3: {
      Monday: [
        { subject: "Science", time: "9:00 AM - 10:00 AM" },
        { subject: "English", time: "10:15 AM - 11:15 AM" },
      ],
      Tuesday: [
        { subject: "Math", time: "9:00 AM - 10:00 AM" },
        { subject: "Music", time: "10:15 AM - 11:15 AM" },
      ],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
    },
    4: {
      Monday: [
        { subject: "History", time: "9:00 AM - 10:00 AM" },
        { subject: "English", time: "10:15 AM - 11:15 AM" },
      ],
      Tuesday: [
        { subject: "Math", time: "9:00 AM - 10:00 AM" },
        { subject: "Science", time: "10:15 AM - 11:15 AM" },
      ],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
    },
    5: {
      Monday: [
        { subject: "Geography", time: "9:00 AM - 10:00 AM" },
        { subject: "Science", time: "10:15 AM - 11:15 AM" },
      ],
      Tuesday: [
        { subject: "English", time: "9:00 AM - 10:00 AM" },
        { subject: "Math", time: "10:15 AM - 11:15 AM" },
      ],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
    },
  },
};

const Academics = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[450px] rounded-xl overflow-hidden shadow-lg mb-8">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          className="h-full"
        >
          <SwiperSlide>
            <div className="relative w-full h-full">
              <img
                src="https://via.placeholder.com/1200x400/1e3a8a/ffffff?text=Slide+1"
                alt="Slide 1"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-center px-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg leading-tight">
                  Academics
                </h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-full">
              <img
                src="https://via.placeholder.com/1200x400/047857/ffffff?text=Slide+2"
                alt="Slide 2"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-center px-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg leading-tight">
                  Nurturing Bright Minds
                </h2>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Class & Day Selector */}
        <div className="md:w-1/3 bg-white p-6 rounded-2xl shadow-md border">
          <h3 className="text-2xl font-bold text-blue-700 mb-4">Select Class</h3>
          <ul className="space-y-3 mb-6">
            {Object.keys(academicsData.timetables).map((grade) => (
              <li key={grade}>
                <button
                  onClick={() => {
                    setSelectedClass(grade);
                    setSelectedDay(null);
                  }}
                  className={`w-full py-2 px-4 rounded-xl font-medium transition-all duration-300 ${
                    selectedClass === grade
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  Class {grade}
                </button>
              </li>
            ))}
          </ul>

          {selectedClass && (
            <>
              <h4 className="text-lg font-semibold text-indigo-700 mb-2">
                Select Weekday
              </h4>
              <ul className="grid grid-cols-2 gap-3">
                {weekdays.map((day) => (
                  <li key={day}>
                    <button
                      onClick={() => setSelectedDay(day)}
                      className={`w-full py-2 px-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        selectedDay === day
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {day}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Timetable Display */}
        <div className="md:w-2/3 bg-white p-6 rounded-2xl shadow-md border">
          <p className="text-base text-gray-700 leading-relaxed mb-6 text-justify">
            {academicsData.overview}
          </p>

          {selectedClass && selectedDay && (
            <div>
              <h4 className="text-2xl font-semibold text-indigo-600 mb-4">
                Class {selectedClass} - {selectedDay} Timetable
              </h4>
              {academicsData.timetables[selectedClass][selectedDay] &&
              academicsData.timetables[selectedClass][selectedDay].length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {academicsData.timetables[selectedClass][selectedDay].map((session, index) => (
                    <div
                      key={index}
                      className="p-4 bg-indigo-50 rounded-xl shadow-sm border border-indigo-100"
                    >
                      <h5 className="font-bold text-gray-800">{session.subject}</h5>
                      <p className="text-sm text-gray-600">{session.time}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No classes scheduled for {selectedDay}.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Academics;
