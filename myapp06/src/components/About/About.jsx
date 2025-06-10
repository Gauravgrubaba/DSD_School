import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // ✅ Correct Swiper Modules
import "swiper/css";
import "swiper/css/pagination";

const About = () => {
  const [aboutUs, setAboutUs] = useState({});
  const [teachers, setTeachers] = useState([]);

  const retrieveAboutUsData = async () => {
    try {
      const response = await axios.get("/api/user/about");
      setAboutUs(response.data.aboutUs);
    } catch (error) {
      console.error("Error fetching about us data:", error);
    }
  };

  const getAllTeachers = async () => {
    try {
      const response = await axios.get("/api/user/teachers");
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
    <section className="bg-gray-100 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* About Us Heading */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-700 text-center uppercase tracking-wide pt-16 sm:pt-24 pb-16">
          About Us
        </h2>

        {/* School Info Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-20">
          {/* School Image */}
          <div className="sm:w-1/3 flex justify-center sm:justify-start mb-10 sm:mb-0">
            <img
              src={aboutUs?.image}
              alt="School"
              className="rounded-lg shadow-2xl w-full sm:w-[450px] sm:h-[400px] object-cover border-4 border-blue-500"
            />
          </div>

          {/* School Description */}
          <div className="sm:w-2/3 sm:pl-16 text-center sm:text-left">
            <h2 className="text-2xl sm:text-4xl font-bold text-blue-900 mb-6 sm:mb-8">
              {aboutUs?.title || "Loading..."}
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              {aboutUs?.description || "Loading..."}
            </p>
          </div>
        </div>

        {/* Faculty Section */}
<section className="text-center py-10 bg-gray-100">

  <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-800 text-center mb-8 sm:mb-12">
    Meet Our Faculty
  </h3>

  <Swiper
    modules={[Pagination, Autoplay]}
    slidesPerView={1}
    spaceBetween={16}
    loop={true}
    autoplay={{ delay: 2500, disableOnInteraction: false }}
    pagination={{ clickable: true }}
    breakpoints={{
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }}
    className="mt-4 sm:mt-10"
  >
    {teachers.map((teacher, index) => (
      <SwiperSlide key={index}>
        <div className="mb-12 bg-white shadow-lg rounded-lg p-4 sm:p-6 text-center transform transition-transform hover:scale-[1.03]">
          <img
            src={teacher.profileImage}
            alt={teacher.name}
            className="mx-auto w-full h-48 sm:h-64 object-cover rounded-md shadow-md"
          />
          <h4 className="text-lg sm:text-xl font-semibold mt-4 text-gray-900">
            {teacher.name}
          </h4>
          <p className="text-sm sm:text-base text-gray-600">{teacher.designation}</p>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</section>

      </div>
    </section>
  );
};

export default About;