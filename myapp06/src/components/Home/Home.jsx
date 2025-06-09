import React, { useEffect, useState } from "react";
import { FaPlay, FaCheckCircle } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from 'react-router-dom';
import axios from "axios";

const Home = () => {
  const [index, setIndex] = useState(0);

  const [heroSectionData, setHeroSectionData] = useState({});
  const [notices, setNotices] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [news, setNews] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [management, setManagement] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      moveEvents();
    }, 3000);
    return () => clearInterval(interval);
  }, [index]);

  const moveEvents = () => {
    setIndex((prevIndex) => (prevIndex + 1) % 5);
  };

  const handleGetHeroSection = async () => {
    try {
      const res = await axios.get('/api/home/herosection');
      setHeroSectionData(res?.data?.result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetAllNotices = async () => {
    try {
      const res = await axios.get('/api/home/notice');
      setNotices(res.data?.result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetAllAchievements = async () => {
    try {
      const res = await axios.get('/api/home/achievement');
      console.log(res);
      setAchievements(res.data?.result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetNews = async () => {
    try {
      const res = await axios.get('/api/home/news');
      console.log(res);
      setNews(res.data?.result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetQuotation = async () => {
    try {
      const res = await axios.get('/api/home/quote');
      console.log(res);
      setQuotations(res.data?.result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetAllManagement = async () => {
    try {
      const res = await axios.get('/api/home/management');
      console.log(res);
      setManagement(res.data?.result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetHeroSection();
    handleGetAllNotices();
    handleGetAllAchievements();
    handleGetNews();
    handleGetQuotation();
    handleGetAllManagement();
  }, [])



  return (
    <div className="mx-auto w-full max-w-6xl pt-12">

      {/* 🔹 Hero Section */}
      <header
        className="relative w-full h-[100vh] bg-cover bg-center flex items-center justify-center px-6 md:px-20 text-white mt-16" // Reduced height and added top margin
        style={{ backgroundImage: `url(${heroSectionData.image})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Centered Content */}
        <div className="relative text-center">
          <h2 className="text-2xl md:text-4xl text-yellow-400 mb-4">
            {heroSectionData.subtitle}
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-yellow-300 mb-6">
            {heroSectionData.title}
          </h1>

          {/* Buttons */}
          <div className="mt-6 flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-4">
            <Link
              to="/admission"  // Navigate to /admission
              className="bg-yellow-500 text-white px-6 md:px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-white hover:text-yellow-500 transition"
            >
              Admission
            </Link>
            <Link
              to="/contact" // This links to the contacts section directly
              className="border-2 border-yellow-500 text-yellow-500 px-6 md:px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-500 hover:text-white transition"
            >
              Contact
            </Link>
          </div>
        </div>
      </header>

      {/* 🔹 About Us Section */}
      <div className="text-center py-10 bg-gray-100 px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700">ABOUT US</h1>
        <p className="text-lg md:text-xl font-semibold text-gray-700 max-w-3xl mx-auto mt-4">
          We Learn the Smart Way to Build a Bright Future
        </p>

        {/* 🔹 About Us Container */}
        <div className="about-container flex flex-col md:flex-row items-center justify-center px-4 md:px-6 bg-gray-50 py-10 md:py-20 max-w-6xl mx-auto">

          {/* Video Section */}
          <div className="relative w-full md:w-1/2 text-center mb-6 md:mb-0">
            <video
              id="video"
              src="videos.mp4"
              className="w-full rounded-lg shadow-lg"
              poster="your-thumbnail.jpg"
            ></video>
            <div
              className="play-btn absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-pink-500 text-white w-12 md:w-16 h-12 md:h-16 flex items-center justify-center rounded-full text-lg md:text-2xl cursor-pointer"
              onClick={() => document.getElementById("video").play()}
            >
              <FaPlay />
            </div>
          </div>

          {/* Text Content */}
          <div className="about-text w-full md:w-1/2 px-4 md:px-8 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-bold text-indigo-900">
              We Learn the Smart Way to Build a Bright Future
            </h1>
            <p className="text-gray-600 mt-4 text-base md:text-lg leading-relaxed">
              We are committed to providing high-quality education with a focus on personal growth,
              critical thinking, and creativity. Our goal is to create a safe, engaging, and inspiring
              learning environment where students can develop skills for a successful future.
            </p>
            <div className="about-list grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-sm md:text-base">
              <div className="flex items-center">
                <FaCheckCircle className="text-indigo-600 mr-2" /> Sport Activities
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="text-indigo-600 mr-2" /> Highly Secured
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="text-indigo-600 mr-2" /> Outdoor Games
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="text-indigo-600 mr-2" /> Friendly Environment
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="text-indigo-600 mr-2" /> Nutritious Foods
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="text-indigo-600 mr-2" /> Qualified Teachers
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 🔹 Notices, Achievements, News Section */}
      <div className="bg-gray-100 py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* 📝 Notices */}
          <div className="bg-white p-8 rounded-xl shadow-md border w-full">
            <h2 className="text-2xl font-semibold flex items-center text-blue-600">📝 Notices</h2>
            {notices.map((notice, idx) => (
              <ul className="mt-4 text-gray-700 text-lg">
                <li className="flex items-center">📌 {notice}</li>
              </ul>
            ))}
          </div>

          {/* 🏅 Achievements */}
          <div className="bg-white p-8 rounded-xl shadow-md border w-full">
            <h2 className="text-2xl font-semibold flex items-center text-green-600">🏅 Achievements</h2>
            {achievements.map((achievement, idx) => (
              <ul className="mt-4 text-gray-700 text-lg">
                <li>🏆 {achievement}</li>
              </ul>
            ))}
          </div>

          {/* 📰 News */}
          <div className="bg-white p-8 rounded-xl shadow-md border w-full">
            <h2 className="text-2xl font-semibold flex items-center text-red-600">📰 News</h2>
            {news.map((n, idx) => (
              <p className="mt-4 text-gray-700 text-lg">
                {n}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* 🔹 Greetings & Quotations */}
      <div className="bg-white p-8 rounded-xl shadow-md border mx-4 mt-6 mb-6 text-center">
        <h2 className="text-2xl font-semibold text-purple-600">🌟 Greetings & Quotations</h2>
        <div className="mt-4">
          {quotations.map((quote, idx) => (
            <p className="italic text-gray-600 text-lg">
              {quote}
            </p>
          ))}
        </div>
      </div>

      {/* 🔹 Events Carousel */}
      <section className="text-center py-10 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-blue-700 uppercase tracking-wide">
            MANAGEMENTS
          </h2>
          

          {/* Swiper Slider */}
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="mt-10"
          >
            {management.map((manage, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-6 rounded-2xl shadow-lg w-80 md:w-[350px] h-[400px] mx-auto">
                  <img src={manage.profileImage} alt={manage.name} className="w-full h-48 object-cover rounded-lg" />
                  <h3 className="text-xl font-semibold text-gray-800 mt-4">{manage.name}</h3>
                  <p className="text-lg text-gray-600 mt-2">{manage.designation}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default Home;
