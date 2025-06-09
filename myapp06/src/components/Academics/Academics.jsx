import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import axios from "axios";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Academics = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [allClassTimeTable, setAllClassTimeTable] = useState([]);
  const [heroSections, setHeroSections] = useState({
    images: [],
    texts: []
  });

  const handleGetHeroSection = async () => {
    try {
      const res = await axios.get('/api/academic/herosection');
      setHeroSections(res?.data?.result);
    } catch (error) {
      console.log("Error getting hero section images", error);
    }
  };

  const handleGetTimeTable = async () => {
    try {
      const res = await axios.get('/api/academic/class');
      setAllClassTimeTable(res?.data?.result || []);
    } catch (error) {
      console.log(error);
    }
  };

  const classNames = allClassTimeTable.map(cls => cls.className).sort();

  const currentDaySchedule = selectedClass && selectedDay
    ? allClassTimeTable.find(cls => cls.className === selectedClass)?.timeTable[selectedDay] || []
    : [];

  useEffect(() => {
    handleGetHeroSection();
    handleGetTimeTable();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[450px] rounded-xl overflow-hidden shadow-md mb-10">
        {heroSections.images.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            className="h-full"
          >
            {heroSections.images.map((img, i) => (
              <SwiperSlide key={i}>
                <div className="relative w-full h-full">
                  <img
                    src={img}
                    alt={`Slide ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-center px-4">
                    <h2 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">
                      {heroSections.texts?.[i] || ""}
                    </h2>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="flex items-center justify-center h-full bg-slate-100 text-slate-500 text-xl">
            No images available.
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        {/* Class & Day Selector */}
        <div className="md:w-1/3 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Select Class</h3>
          <ul className="space-y-2 mb-6">
            {classNames.map((cls) => (
              <li key={cls}>
                <button
                  onClick={() => {
                    setSelectedClass(cls);
                    setSelectedDay(null);
                  }}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition duration-300 ${
                    selectedClass === cls
                      ? "bg-slate-800 text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  Class {cls}
                </button>
              </li>
            ))}
          </ul>

          {selectedClass && (
            <>
              <h4 className="text-base font-medium text-slate-700 mb-2">Select Weekday</h4>
              <ul className="grid grid-cols-2 gap-3">
                {weekdays.map((day) => (
                  <li key={day}>
                    <button
                      onClick={() => setSelectedDay(day)}
                      className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition duration-300 ${
                        selectedDay === day
                          ? "bg-teal-600 text-white"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
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
        <div className="md:w-2/3 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          {selectedClass && selectedDay && (
            <div>
              <h4 className="text-xl font-semibold text-slate-800 mb-4">
                Class {selectedClass} - {selectedDay} Timetable
              </h4>
              {currentDaySchedule.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentDaySchedule.map((session, index) => (
                    <div
                      key={index}
                      className="p-4 bg-slate-50 rounded-lg shadow-sm border border-slate-200"
                    >
                      <h5 className="font-medium text-slate-900">{session.subjectName}</h5>
                      <p className="text-sm text-slate-600 mt-1">{session.timing}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">No classes scheduled for {selectedDay}.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Academics;
