import React, { useEffect, useState } from "react";
import api from "../../api/axios.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const About = () => {
  const [aboutUs, setAboutUs] = useState({});
  const [teachers, setTeachers] = useState([]);

  const retrieveAboutUsData = async () => {
    try {
      const response = await api.get("/user/about");
      setAboutUs(response.data.aboutUs);
    } catch (error) {
      console.error("Error fetching about us data:", error);
    }
  };

  const getAllTeachers = async () => {
    try {
      const response = await api.get("/user/teachers");
      setTeachers(response.data.allTeachers);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  useEffect(() => {
    retrieveAboutUsData();
    getAllTeachers();
  }, []);

  return (
    <section className="bg-gradient-to-b from-blue-50 to-gray-100 pt-36 pb-20 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto space-y-24">

        {/* About Us Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-12 flex flex-col lg:flex-row gap-10 items-center">
          
          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={aboutUs?.image}
              alt="School"
              className="rounded-xl w-full max-w-md sm:max-w-full h-auto object-cover border-4 border-blue-500 shadow-md"
            />
          </div>

          {/* Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-4">
              {aboutUs?.title || "Loading..."}
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              {aboutUs?.description || "Loading..."}
            </p>
          </div>
        </div>

        {/* Meet Our Faculty Section */}
        <div className="bg-white rounded-3xl shadow-2xl px-6 py-14 sm:px-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-700 text-center uppercase tracking-wide mb-12">
            Meet Our Faculty
          </h2>

          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={24}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-4"
          >
            {teachers.map((teacher, index) => (
              <SwiperSlide key={index} className="!flex justify-center">
                <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-[260px] transition-transform transform hover:scale-105">
                  <div className="w-full h-[260px] overflow-hidden">
                    <img
                      src={teacher.profileImage}
                      alt={teacher.name}
                      width={289}
  height={361}
  className="w-[289px] h-[361px] object-cover object-center rounded-t-xl"
                    />
                  </div>
                  <div className="py-4 px-4 text-center">
                    <h3 className="text-lg sm:text-xl font-semibold text-blue-900 capitalize">
                      {teacher.name}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base mt-1">
                      {teacher.designation}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default About;
