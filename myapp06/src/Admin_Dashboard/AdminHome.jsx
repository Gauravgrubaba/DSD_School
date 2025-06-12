import React, { useState } from "react";
import axios from "axios";
import { useEffect, useRef } from "react";

const AdminHome = () => {
  //Hero Section
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubTitle, setHeroSubTitle] = useState("");
  const [heroBgImage, setHeroBgImage] = useState(null);
  const [heroSectionData, setHeroSectionData] = useState({});

  //About
  const [aboutUsVideo, setAboutUsVideo] = useState(null);
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutDetails, setAboutDetails] = useState("");
  const fileInputRef = useRef(null);
  const [aboutUsData, setAboutUsData] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  //Notices
  const [notices, setNotices] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newNotice, setNewNotice] = useState("");
  const [editNotice, seteditNotice] = useState("");

  //Achievements
  const [newAchievement, setNewAchievement] = useState("");
  const [achievements, setAchievements] = useState([]);
  const [achievementEditIndex, setAchievementEditIndex] = useState(null);
  const [editAchievement, setEditAchievement] = useState("");

  //News
  const [news, setNews] = useState([]);
  const [newNews, setNewNews] = useState("");
  const [newsEditIndex, setNewsEditIndex] = useState(null);
  const [editNews, setEditNews] = useState("");

  //Quotation
  const [quotations, setQuotations] = useState([]);
  const [newQuotation, setNewQuotation] = useState("");
  const [quoteEditIndex, setQuoteEditIndex] = useState(null);
  const [editQuote, setEditQuote] = useState("");

  //Management
  const [newManagementName, setNewManagementName] = useState("");
  const [newManagementDesignation, setNewManagementDesignation] = useState("");
  const [newManagementImage, setNewManagementImage] = useState(null);
  const [management, setManagement] = useState([]);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [isEditManagement, setIsEditManagement] = useState(false);
  const [managementEditIndex, setManagementEditIndex] = useState(null);

  const handleHeroSection = async (e) => {
    e.preventDefault();

    if (!heroBgImage && !heroSubTitle && !heroTitle) {
      return alert("Need atleast some data to update")
    }

    const data = new FormData();
    data.append("homeHeroImage", heroBgImage);
    data.append("subtitle", heroSubTitle);
    data.append("title", heroTitle);

    try {
      const res = await axios.post('/api/home/herosection', data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      setHeroSectionData(res?.data?.result);
    } catch (error) {
      console.log(error);
    } finally {
      setHeroBgImage(null);
      setHeroSubTitle("");
      setHeroTitle("");
    }
  };

  const handleGetHeroSection = async () => {
    try {
      const res = await axios.get('/api/home/herosection');
      setHeroSectionData(res?.data?.result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => { }, [heroSectionData]);

  const handleAddAboutUs = async (e) => {
    e.preventDefault();

    if (!(aboutDetails.trim()) && !(aboutTitle.trim()) && !aboutUsVideo) {
      return alert("Need atleast some data to update about us")
    }

    if (aboutUsVideo && (aboutUsVideo.size < 1048576 || aboutUsVideo.size >= 26214400)) {
      return alert("File size must be between 5MB and 15MB")
    }

    setIsUploading(true);

    const data = new FormData();
    data.append("title", aboutTitle);
    data.append("details", aboutDetails);
    data.append("aboutVideo", aboutUsVideo);

    try {
      const res = await axios.post("/api/home/about", data);
      setAboutUsData(res.data?.result);
    } catch (error) {
      console.log(error);
    } finally {
      setAboutTitle("");
      setAboutDetails("");
      setAboutUsVideo(null);
      setIsUploading(false);
    }
  };

  useEffect(() => { }, [aboutUsData])

  const handleGetAboutUsData = async () => {
    try {
      const res = await axios.get('/api/home/about');
      setAboutUsData(res.data?.result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddNotice = async (e) => {
    e.preventDefault();

    if (notices.length >= 5) {
      return alert("Maximum 5 notices are allowed");
    }

    if (!newNotice) {
      return alert("Empty box cannot be added as Notice.")
    }

    const data = {
      notice: newNotice
    }

    try {
      const res = await axios.post('/api/home/notice', data);
      setNotices(res?.data?.result);
    } catch (error) {
      console.log(error);
    } finally {
      setNewNotice("");
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

  const handleDeleteNotice = async (idx) => {
    try {
      const res = await axios.delete(`/api/home/notice/${idx}`);
      setNotices(res.data?.result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditNotice = async (idx) => {
    setEditingIndex(idx);
    seteditNotice(notices[idx]);
  }

  const handleSaveEditedNotice = async (e) => {
    e.preventDefault();

    if (!editNotice) {
      return alert("Notice field cannot be empty!")
    }

    const data = {
      notice: editNotice
    }

    const idx = editingIndex;

    try {
      const res = await axios.patch(`/api/home/notice/${idx}`, data);
      setNotices(res.data?.result);
    } catch (error) {
      console.log(error);
    } finally {
      setEditingIndex(null);
      seteditNotice("");
    }
  }

  useEffect(() => {
    handleGetHeroSection();
    handleGetAllNotices();
    handleGetAllAchievements();
    handleGetNews();
    handleGetQuotation();
    handleGetAllManagement();
    handleGetAboutUsData();
  }, [])

  useEffect(() => { }, [notices])

  const handleAddNewAchievement = async (e) => {
    e.preventDefault();

    if (achievements.length >= 5) {
      return alert("Maximum 5 achievements are allowed")
    }

    if (!newAchievement) {
      return alert("Empty field! Type something to add in achievement")
    }

    const data = {
      achievement: newAchievement
    }

    try {
      const res = await axios.post('/api/home/achievement', data);
      setAchievements(res.data?.result);
    } catch (error) {
      console.log(error);
    } finally {
      setNewAchievement("");
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

  const handleUpdateAchievement = async (idx) => {
    setAchievementEditIndex(idx);
    setEditAchievement(achievements[idx]);
  }

  const handleSaveEditedAchievement = async () => {
    const idx = achievementEditIndex;

    if (!editAchievement) {
      return alert("Achievement field cannot be empty!")
    }

    const data = {
      achievement: editAchievement
    }

    try {
      const res = await axios.patch(`/api/home/achievement/${idx}`, data);
      setAchievements(res.data?.result)
    } catch (error) {
      console.log(error);
    } finally {
      setAchievementEditIndex(null);
      setEditAchievement("");
    }
  }

  const handleDeleteAchievement = async (idx) => {
    try {
      const res = await axios.delete(`/api/home/achievement/${idx}`);
      setAchievements(res.data?.result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddNewNews = async (e) => {
    e.preventDefault();

    if (!newNews) {
      return alert("News field cannot be empty");
    }

    if (news.length >= 5) {
      return alert("Maximum 5 news are allowed.")
    }

    const data = {
      news: newNews
    }

    try {
      const res = await axios.post('/api/home/news', data);
      setNews(res.data?.result);
    } catch (error) {
      console.log(error);
    } finally {
      setNewNews("");
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

  const handleEditNews = (idx) => {
    setNewsEditIndex(idx);
    setEditNews(news[idx]);
  }

  const handleSaveEditedNews = async () => {
    const idx = newsEditIndex;

    if (!editNews) {
      return alert("News field cannot be empty!")
    }

    const data = {
      news: editNews
    }

    try {
      const res = await axios.patch(`/api/home/news/${idx}`, data);
      setNews(res.data?.result)
    } catch (error) {
      console.log(error);
    } finally {
      setNewsEditIndex(null);
      setEditNews("");
    }
  }

  const handleDeleteNews = async (idx) => {
    try {
      const res = await axios.delete(`/api/home/news/${idx}`);
      setNews(res.data?.result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => { }, [achievements])

  useEffect(() => { }, [news]);

  const handleAddNewQuote = async (e) => {
    e.preventDefault();

    if (!newQuotation) {
      return alert("Quotation field cannot be empty");
    }

    if (quotations.length >= 2) {
      return alert("Maximum 2 quotes are allowed.")
    }

    const data = {
      quote: newQuotation
    }

    try {
      const res = await axios.post('/api/home/quote', data);
      setQuotations(res.data?.result);
    } catch (error) {
      console.log(error);
    } finally {
      setNewQuotation("");
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

  const handleDeleteQuotation = async (idx) => {
    try {
      const res = await axios.delete(`/api/home/quote/${idx}`);
      setQuotations(res.data?.result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditQuote = (idx) => {
    setQuoteEditIndex(idx);
    setEditQuote(quotations[idx]);
  }

  const handleSaveEditedQuotation = async () => {
    const idx = quoteEditIndex;

    if (!editQuote) {
      return alert("Quotation field cannot be empty!")
    }

    const data = {
      quote: editQuote
    }

    try {
      const res = await axios.patch(`/api/home/quote/${idx}`, data);
      setQuotations(res.data?.result)
    } catch (error) {
      console.log(error);
    } finally {
      setEditQuote("");
      setQuoteEditIndex(null);
    }
  }

  useEffect(() => { }, [quotations])

  const handleAddNewManagement = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", newManagementName);
    data.append("designation", newManagementDesignation);
    data.append("managementImage", newManagementImage);

    try {
      const res = await axios.post('/api/home/management', data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      setManagement((prev) => [...prev, res.data?.result]);
    } catch (error) {
      console.log(error);
    } finally {
      setNewManagementName("");
      setNewManagementDesignation("");
      setNewManagementImage(null);
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

  const handleDeleteManagement = async (index) => {
    const id = management[index]._id;

    setDeletingIndex(index);

    try {
      const res = await axios.delete(`/api/home/management/${id}`);
      setManagement(res.data?.result);
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingIndex(null);
    }
  }

  const handleEditManagement = async () => {
    if(!newManagementName && !newManagementDesignation && !newManagementImage) {
      return alert("Empty fields are not allowed")
    }

    const id = management[managementEditIndex]._id;

    const data = new FormData();
    data.append("name", newManagementName);
    data.append("designation", newManagementDesignation);
    data.append("managementImage", newManagementImage);

    try {
      const res = await axios.patch(`/api/home/management/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setManagement(res.data?.result);
    } catch (error) {
      console.log(error);
    } finally {
      setNewManagementName("");
      setNewManagementDesignation("");
      setNewManagementImage(null);
      setManagementEditIndex(null);
      setIsEditManagement(false)
    }
  }

  useEffect(() => {}, [management])

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center text-indigo-700">🛠 Admin - Home Page Manager</h1>

      {/* Hero Section */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">🎯 Hero Section</h2>

        <input
          type="file"
          accept="image/*"
          id="homeHeroImage"
          name="homeHeroImage"
          onChange={(e) => setHeroBgImage(e.target.files[0])}
          className="mb-4"
        />

        <div
          className="relative w-full min-h-screen rounded-lg overflow-hidden shadow-lg mb-6"
          style={{
            backgroundImage: `url(${heroSectionData.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center px-6 text-center">
            <h3 className="text-white text-lg md:text-xl mb-2 tracking-wide font-light">{heroSectionData.subtitle}</h3>
            <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight max-w-3xl">{heroSectionData.title}</h1>
          </div>
        </div>

        <input
          type="text"
          className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={heroSubTitle}
          onChange={(e) => setHeroSubTitle(e.target.value)}
          placeholder="Sub Title"
        />
        <input
          type="text"
          className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={heroTitle}
          onChange={(e) => setHeroTitle(e.target.value)}
          placeholder="Main Title"
        />
        <div>
          <button
            type="submit"
            onClick={handleHeroSection}
            className="mt-4 mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 rounded-3xl shadow-xl mt-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-6 text-center border-b-4 border-indigo-300 pb-2">
          📘 About Our School
        </h2>

        <div className="space-y-4">
          <textarea
            className="w-full p-4 border border-indigo-200 rounded-lg shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={aboutTitle}
            onChange={(e) => setAboutTitle(e.target.value)}
            placeholder="Enter school vision or mission..."
          />
          <textarea
            className="w-full p-4 border border-indigo-200 rounded-lg shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={aboutDetails}
            onChange={(e) => setAboutDetails(e.target.value)}
            placeholder="Describe the school's journey, growth, or achievements..."
          />
          <input
            type="file"
            accept="video/*"
            id="aboutVideo"
            name="aboutVideo"
            onChange={(e) => setAboutUsVideo(e.target.files[0])}
            ref={fileInputRef}
            className="text-sm border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            onClick={handleAddAboutUs}
            disabled={isUploading}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center justify-center gap-2 transition-all duration-300 min-w-[130px]"
          >
            {!isUploading ? (
              <span className="font-medium">Submit</span>
            ) : (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                <span>Uploading...</span>
              </>
            )}
          </button>
        </div>

        {aboutUsData && (
          <div className="mt-10 bg-white border border-gray-200 rounded-2xl shadow-md p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-indigo-800 mb-3 text-center">
              📌 Submitted Information
            </h3>
            <p className="text-gray-800 font-medium text-center mb-2">{aboutUsData.title}</p>
            <p className="text-gray-600 text-sm sm:text-base text-justify mb-4">{aboutUsData.details}</p>

            {aboutUsData.video && (
              <video
                controls
                className="w-full max-h-[400px] rounded-md border"
              >
                <source src={aboutUsData.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
      </div>


      <div className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-xl mt-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6 text-center border-b-4 border-blue-300 pb-2">
          📌 School Notices
        </h2>

        {/* Input box to add new notice */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter a new notice..."
            className="border border-gray-300 rounded-lg p-3 w-full text-sm focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
            onChange={(e) => setNewNotice(e.target.value)}
            value={newNotice}
          />
          <button
            type="submit"
            onClick={handleAddNotice}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2 rounded-lg shadow-md transition-all"
          >
            Add
          </button>
        </div>

        {/* Render each notice */}
        <div className="space-y-4">
          {notices.map((notice, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gray-50 p-4 border border-gray-200 rounded-xl shadow-sm"
            >
              {editingIndex === idx ? (
                <input
                  type="text"
                  className="w-full border border-blue-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={editNotice}
                  onChange={(e) => seteditNotice(e.target.value)}
                />
              ) : (
                <span className="text-gray-800 text-sm">{notice}</span>
              )}

              <div className="flex gap-2 self-end sm:self-auto">
                {editingIndex === idx ? (
                  <button
                    type="submit"
                    onClick={handleSaveEditedNotice}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm shadow-md"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditNotice(idx)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-lg text-sm shadow-md"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteNotice(idx)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-sm shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-xl mt-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-6 text-center border-b-4 border-green-300 pb-2">
          🏅 School Achievements
        </h2>

        {/* Input box to add new achievement */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter a new achievement..."
            className="border border-gray-300 rounded-lg p-3 w-full text-sm focus:ring-2 focus:ring-green-400 outline-none shadow-sm"
            onChange={(e) => setNewAchievement(e.target.value)}
            value={newAchievement}
          />
          <button
            type="submit"
            onClick={handleAddNewAchievement}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2 rounded-lg shadow-md transition-all"
          >
            Add
          </button>
        </div>

        {/* Render each achievement */}
        <div className="space-y-4">
          {achievements.map((achievement, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gray-50 p-4 border border-gray-200 rounded-xl shadow-sm"
            >
              {achievementEditIndex === idx ? (
                <input
                  type="text"
                  className="w-full border border-blue-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={editAchievement}
                  onChange={(e) => setEditAchievement(e.target.value)}
                />
              ) : (
                <span className="text-gray-800 text-sm">{achievement}</span>
              )}

              <div className="flex gap-2 self-end sm:self-auto">
                {achievementEditIndex === idx ? (
                  <button
                    type="submit"
                    onClick={handleSaveEditedAchievement}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm shadow-md"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpdateAchievement(idx)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-lg text-sm shadow-md"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteAchievement(idx)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-sm shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-xl mt-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-6 text-center border-b-4 border-red-300 pb-2">
          📰 Latest News
        </h2>

        {/* Input for new news */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter a news headline..."
            className="border border-gray-300 rounded-lg p-3 w-full text-sm focus:ring-2 focus:ring-red-400 outline-none shadow-sm"
            onChange={(e) => setNewNews(e.target.value)}
            value={newNews}
          />
          <button
            type="submit"
            onClick={handleAddNewNews}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2 rounded-lg shadow-md transition-all"
          >
            Add
          </button>
        </div>

        {/* List of news items */}
        <div className="space-y-4">
          {news.map((n, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gray-50 p-4 border border-gray-200 rounded-xl shadow-sm"
            >
              {newsEditIndex === idx ? (
                <input
                  type="text"
                  className="w-full border border-blue-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={editNews}
                  onChange={(e) => setEditNews(e.target.value)}
                />
              ) : (
                <span className="text-gray-800 text-sm">{n}</span>
              )}

              <div className="flex gap-2 self-end sm:self-auto">
                {newsEditIndex === idx ? (
                  <button
                    type="submit"
                    onClick={handleSaveEditedNews}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm shadow-md"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditNews(idx)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-lg text-sm shadow-md"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteNews(idx)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-sm shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-xl mt-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-purple-600 mb-6 text-center border-b-4 border-purple-300 pb-2">
          🌟 Inspiring Quotations
        </h2>

        {/* Input field to add new quote */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter a new quote..."
            className="border border-gray-300 rounded-lg p-3 w-full text-sm focus:ring-2 focus:ring-purple-400 outline-none shadow-sm"
            onChange={(e) => setNewQuotation(e.target.value)}
            value={newQuotation}
          />
          <button
            type="submit"
            onClick={handleAddNewQuote}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2 rounded-lg shadow-md transition-all"
          >
            Add
          </button>
        </div>

        {/* Render list of quotations */}
        <div className="space-y-4">
          {quotations.map((quote, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gray-50 p-4 border border-gray-200 rounded-xl shadow-sm"
            >
              {quoteEditIndex === idx ? (
                <input
                  type="text"
                  className="w-full border border-blue-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={editQuote}
                  onChange={(e) => setEditQuote(e.target.value)}
                />
              ) : (
                <span className="text-gray-800 italic text-sm">“{quote}”</span>
              )}

              <div className="flex gap-2 self-end sm:self-auto">
                {quoteEditIndex === idx ? (
                  <button
                    type="submit"
                    onClick={handleSaveEditedQuotation}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm shadow-md"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditQuote(idx)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-lg text-sm shadow-md"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteQuotation(idx)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-sm shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="w-full max-w-6xl mx-auto bg-white p-6 sm:p-10 rounded-3xl shadow-xl mt-6">
        <h2 className="text-3xl font-bold text-yellow-600 mb-8 text-center border-b-4 border-yellow-300 pb-3">
          👔 Management Team
        </h2>

        {/* Form Section */}
        <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl mb-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="border border-gray-300 p-3 rounded-lg w-full text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
              value={newManagementName}
              onChange={(e) => setNewManagementName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Designation"
              className="border border-gray-300 p-3 rounded-lg w-full text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
              value={newManagementDesignation}
              onChange={(e) => setNewManagementDesignation(e.target.value)}
            />
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <input
              type="file"
              accept="image/*"
              id="managementImage"
              name="managementImage"
              className="text-sm"
              onChange={(e) => setNewManagementImage(e.target.files[0])}
            />
            {!isEditManagement ? (
              <button
                onClick={handleAddNewManagement}
                className="mt-4 mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Add Member
              </button>
            ) : (
              <button
                onClick={handleEditManagement}
                className="mt-4 mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {management.map((manage, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={manage.profileImage}
                alt={manage.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-5 text-center">
                <h4 className="text-xl font-semibold text-gray-900">{manage.name}</h4>
                <p className="text-gray-600 text-sm mt-1">{manage.designation}</p>

                <div className="mt-4 flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setNewManagementName(management[index].name);
                      setNewManagementDesignation(management[index].designation);
                      setIsEditManagement(true);
                      setManagementEditIndex(index);
                    }}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteManagement(index)}
                    className="text-red-600 hover:text-red-800 font-medium text-sm"
                  >
                    {deletingIndex === index ? (
                      <svg
                        className="animate-spin h-5 w-5 text-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AdminHome;