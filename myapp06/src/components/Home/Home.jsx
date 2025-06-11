import React, { useEffect, useState, useRef } from "react"; // 👈 1. Import useRef
import { FaPlay, FaCheckCircle } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from 'react-router-dom';
import axios from "axios";

const Home = () => {
  // This unused code is from your original file. It is not being used.
  const [index, setIndex] = useState(0);

  const [heroSectionData, setHeroSectionData] = useState({});
  const [notices, setNotices] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [news, setNews] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [management, setManagement] = useState([]);
  const [aboutUsData, setAboutUsData] = useState({});

  // --- Video Section State and Ref ---
  const videoRef = useRef(null); // 👈 2. Create a ref to hold the video element
  const [isPlaying, setIsPlaying] = useState(false); // 👈 3. Create state to track if video is playing

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
      setAchievements(res.data?.result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetNews = async () => {
    try {
      const res = await axios.get('/api/home/news');
      setNews(res.data?.result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetQuotation = async () => {
    try {
      const res = await axios.get('/api/home/quote');
      setQuotations(res.data?.result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetAllManagement = async () => {
    try {
      const res = await axios.get('/api/home/management');
      setManagement(res.data?.result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetAboutUsData = async () => {
      try {
        const res = await axios.get('/api/home/about');
        setAboutUsData(res.data?.result);
        console.log(res.data?.result?.video);
      } catch (error) {
        console.log(error);
      }
    }
  
  // --- Video Play Handler ---
  const handlePlay = () => { // 👈 4. Create a function to handle playing the video
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };


  useEffect(() => {
    handleGetHeroSection();
    handleGetAllNotices();
    handleGetAllAchievements();
    handleGetNews();
    handleGetQuotation();
    handleGetAllManagement();
    handleGetAboutUsData();
  }, [])



  return (
    <div className="mx-auto w-full max-w-6xl pt-12">

      <header
  className="relative w-full h-screen min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-screen bg-no-repeat bg-center bg-cover flex items-center justify-center px-4 md:px-20 text-white mt-0"
  style={{
    backgroundImage: `url(${heroSectionData.image})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }}
>
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>

  <div className="relative text-center px-4 max-w-4xl mx-auto pt-12 sm:pt-16 md:pt-20">
    <h2 className="text-base sm:text-xl md:text-3xl text-yellow-400 mb-2 sm:mb-3">
      {heroSectionData.subtitle}
    </h2>
    <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold leading-tight text-yellow-300 mb-4 sm:mb-6">
      {heroSectionData.title}
    </h1>

    <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6">
      <Link
        to="/admission"
        className="bg-yellow-500 text-white px-6 py-3 rounded-full text-base sm:text-lg font-semibold shadow hover:bg-white hover:text-yellow-500 transition duration-300"
      >
        Admission
      </Link>
      <Link
        to="/contact"
        className="border-2 border-yellow-500 text-yellow-500 px-6 py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-yellow-500 hover:text-white transition duration-300"
      >
        Contact
      </Link>
    </div>
  </div>
</header>


      {/* 🔹 About Us Section */}
     <div className="bg-gray-100 px-4 py-10">
  {/* Section Title */}
 <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 text-center max-w-6xl mx-auto mb-10">
  ABOUT US
</h1>


  {/* Content Wrapper */}
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 bg-gray-50 p-6 md:p-10 rounded-lg shadow">
    
    {/* ======== VIDEO SECTION ======== */}
    <div className="relative w-full md:w-1/2">
      <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          src={aboutUsData?.video}
          className="w-full h-full object-cover"
          poster={aboutUsData?.poster}
          controls={isPlaying}
          onEnded={() => setIsPlaying(false)}
          preload="metadata"
        />
      </div>

      {/* Custom Play Button */}
      {!isPlaying && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-pink-500 text-white w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full text-xl sm:text-2xl cursor-pointer shadow-lg z-10"
          onClick={handlePlay}
        >
          <FaPlay />
        </div>
      )}
    </div>

    {/* ======== TEXT SECTION ======== */}
    <div className="w-full md:w-1/2 px-4 sm:px-6 flex flex-col justify-center text-center md:text-left">
 <h2 className="text-2xl sm:text-3xl font-bold text-indigo-900 mb-4 leading-snug">
  {aboutUsData.title}
</h2>

  <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
    {aboutUsData.details}
  </p>
</div>

  </div>
</div>


      {/* 🔹 Notices, Achievements, News Section */}
<div className="bg-gray-100 py-10 px-4">
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

    {/* 📝 Notices */}
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border w-full">
      <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4 flex items-center">
        📝 Notices
      </h2>
      <ul className="text-gray-700 text-base sm:text-lg space-y-2">
        {notices.map((notice, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span>📌</span>
            <span className="leading-snug">{notice}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* 🏅 Achievements */}
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border w-full">
      <h2 className="text-xl sm:text-2xl font-semibold text-green-600 mb-4 flex items-center">
        🏅 Achievements
      </h2>
      <ul className="text-gray-700 text-base sm:text-lg space-y-2">
        {achievements.map((achievement, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span>🏆</span>
            <span className="leading-snug">{achievement}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* 📰 News */}
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border w-full">
      <h2 className="text-xl sm:text-2xl font-semibold text-red-600 mb-4 flex items-center">
        📰 News
      </h2>
      <ul className="text-gray-700 text-base sm:text-lg space-y-2">
        {news.map((n, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span>🗞️</span>
            <span className="leading-snug">{n}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>

{/* 🔹 Greetings & Quotations */}
<div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border max-w-6xl mx-auto my-6 text-center">
  <h2 className="text-xl sm:text-2xl font-semibold text-purple-600 mb-4">
    🌟 Greetings & Quotations
  </h2>
  <div className="space-y-3 text-gray-600 text-base sm:text-lg italic leading-relaxed">
    {quotations.map((quote, idx) => (
      <p key={idx}>“{quote}”</p>
    ))}
  </div>
</div>

      {/* 🔹 Events Carousel */}
     <section className="bg-gray-100 py-10">
  <div className="max-w-7xl mx-auto px-4 md:px-10">
    {/* Heading */}
    <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-700 text-center uppercase tracking-wide mb-10">
      Managements
    </h2>

    {/* Swiper Carousel */}
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
      className="pb-10"
    >
      {management.map((manage, index) => (
        <SwiperSlide key={index}>
          <div className="bg-white mb-10 rounded-2xl shadow-md overflow-hidden w-[90%] sm:w-72 md:w-80 mx-auto transition-transform transform hover:scale-105">
            
            {/* Image */}
            <img
              src={manage.profileImage}
              alt={manage.name}
              className="w-full h-72 object-cover"
            />

            {/* Text */}
            <div className="py-4 px-4 text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 capitalize">
                {manage.name}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mt-1">
                {manage.designation}
              </p>
            </div>
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