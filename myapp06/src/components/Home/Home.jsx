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

      {/* 🔹 Hero Section */}
      <header
        className="relative w-full h-full min-h-[300px] md:min-h-[600px] lg:h-screen bg-no-repeat bg-center bg-cover flex items-center justify-center px-4 md:px-20 text-white mt-16"
        style={{ backgroundImage: `url(${heroSectionData.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center">
          <h2 className="text-2xl md:text-4xl text-yellow-400 mb-4">
            {heroSectionData.subtitle}
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-yellow-300 mb-6">
            {heroSectionData.title}
          </h1>
          <div className="mt-6 flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-4">
            <Link
              to="/admission"
              className="bg-yellow-500 text-white px-6 md:px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-white hover:text-yellow-500 transition"
            >
              Admission
            </Link>
            <Link
              to="/contact"
              className="border-2 border-yellow-500 text-yellow-500 px-6 md:px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-500 hover:text-white transition"
            >
              Contact
            </Link>
          </div>
        </div>
      </header>

      {/* 🔹 About Us Section */}
      <div className="text-center py-10 bg-gray-100 px-4">
        <h1 className="mb-2 text-3xl md:text-4xl font-extrabold text-indigo-700">ABOUT US</h1>
        <div className="about-container flex flex-col md:flex-row items-center justify-center px-4 md:px-6 bg-gray-50 py-10 md:py-20 max-w-6xl mx-auto">

          {/* ======== CORRECTED VIDEO SECTION START ======== */}
          <div className="relative w-full md:w-1/2 text-center mb-6 md:mb-0">
            <video
              ref={videoRef} // 👈 5. Attach the ref to the video element
              src={aboutUsData?.video}
              className="w-full rounded-lg shadow-lg"
              poster={aboutUsData?.poster} // Assumes your API provides a poster image URL
              controls={isPlaying} // 👈 6. Show native controls only after play is clicked
              onEnded={() => setIsPlaying(false)} // Optional: show play button again when video ends
              preload="metadata"
            ></video>
            
            {/* 7. Only show the custom play button if the video is NOT playing */}
            {!isPlaying && (
              <div
                className="play-btn absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-pink-500 text-white w-12 md:w-16 h-12 md:h-16 flex items-center justify-center rounded-full text-lg md:text-2xl cursor-pointer"
                onClick={handlePlay} // 👈 8. Call the new handler function
              >
                <FaPlay />
              </div>
            )}
          </div>
          {/* ======== CORRECTED VIDEO SECTION END ======== */}


          {/* Text Content */}
          <div className="about-text w-full md:w-1/2 px-4 md:px-8 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-bold text-indigo-900">
              {aboutUsData.title}
            </h1>
            <p className="text-gray-600 mt-4 text-base md:text-lg leading-relaxed">
              {aboutUsData.details}
            </p>
          </div>
        </div>
      </div>

      {/* 🔹 Notices, Achievements, News Section (with key props added to prevent warnings) */}
      <div className="bg-gray-100 py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white p-8 rounded-xl shadow-md border w-full">
            <h2 className="text-2xl font-semibold flex items-center text-blue-600">📝 Notices</h2>
            <ul className="mt-4 text-gray-700 text-lg space-y-2">
              {notices.map((notice, idx) => (
                <li key={idx} className="flex items-center">📌 {notice}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md border w-full">
            <h2 className="text-2xl font-semibold flex items-center text-green-600">🏅 Achievements</h2>
            <ul className="mt-4 text-gray-700 text-lg space-y-2">
              {achievements.map((achievement, idx) => (
                <li key={idx}>🏆 {achievement}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md border w-full">
            <h2 className="text-2xl font-semibold flex items-center text-red-600">📰 News</h2>
            {news.map((n, idx) => (
              <p key={idx} className="mt-4 text-gray-700 text-lg">{n}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md border mx-4 mt-6 mb-6 text-center">
        <h2 className="text-2xl font-semibold text-purple-600">🌟 Greetings & Quotations</h2>
        <div className="mt-4">
          {quotations.map((quote, idx) => (
            <p key={idx} className="italic text-gray-600 text-lg">{quote}</p>
          ))}
        </div>
      </div>

      {/* 🔹 Events Carousel */}
      <section className="text-center py-10 bg-gray-100">
  <div className="max-w-7xl mx-auto px-4 md:px-12">
    <h2 className="text-3xl font-extrabold text-blue-700 uppercase tracking-wide">
      MANAGEMENTS
    </h2>

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
          <div className="bg-white mb-12 rounded-2xl shadow-lg overflow-hidden w-72 md:w-[300px] mx-auto flex flex-col items-center">
            {/* Full-length image */}
            <img
              src={manage.profileImage}
              alt={manage.name}
              className="w-full h-[320px] object-cover"
            />
            
            {/* Name and Designation */}
            <div className="py-4">
              <h3 className="text-lg font-semibold text-gray-800 capitalize">
                {manage.name}
              </h3>
              <p className="text-gray-600 text-sm">{manage.designation}</p>
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