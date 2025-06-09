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
      console.log(res?.data?.result);
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

  useEffect(() => {
    console.log("Hero section data updated")
  }, [heroSectionData]);

  const handleAddAboutUs = async (e) => {
    e.preventDefault();

    if (!(aboutDetails.trim()) && !(aboutTitle.trim()) && !aboutUsVideo) {
      return alert("Need atleast some data to update about us")
    }

    if (aboutUsVideo && (aboutUsVideo.size < 5242880 || aboutUsVideo.size >= 26214400)) {
      return alert("File size must be between 5MB and 15MB")
    }

    setIsUploading(true);

    const data = new FormData();
    data.append("title", aboutTitle);
    data.append("details", aboutDetails);
    data.append("aboutVideo", aboutUsVideo);

    try {
      const res = await axios.post("/api/home/about", data);
      console.log(res);
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

  useEffect(() => {
    console.log("About us updated")
  }, [aboutUsData])

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
      console.log(res);
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
      console.log(res);
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

  useEffect(() => {
    console.log("Notices updated");
  }, [notices])

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
      console.log(res);
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
      console.log(res);
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
      console.log(res);
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
      console.log(res);
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
      console.log(res);
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
      console.log(res);
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
      console.log(res);
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
      console.log(res);
      setNews(res.data?.result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("Achievements updated")
  }, [achievements])

  useEffect(() => {
    console.log("News updated")
  }, [news]);

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
      console.log(res);
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
      console.log(res);
      setQuotations(res.data?.result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteQuotation = async (idx) => {
    try {
      const res = await axios.delete(`/api/home/quote/${idx}`);
      console.log(res);
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
      console.log(res);
      setQuotations(res.data?.result)
    } catch (error) {
      console.log(error);
    } finally {
      setEditQuote("");
      setQuoteEditIndex(null);
    }
  }

  useEffect(() => {
    console.log("Quotation updated")
  }, [quotations])

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
      console.log(res);
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

  const handleEditManagement = async (index) => {
    console.log(index);
  }

  useEffect(() => {
    console.log("Management updated")
  }, [management])

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
      <div className="bg-white p-6 rounded-xl shadow">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-blue-600">📘 About Us</h2>
          <textarea
            className="border p-2 w-full h-24 mb-4"
            value={aboutTitle}
            onChange={(e) => setAboutTitle(e.target.value)}
            placeholder="Write about the school's vision or mission..."
          />
          <textarea
            className="border p-2 w-full h-24 mb-4"
            value={aboutDetails}
            onChange={(e) => setAboutDetails(e.target.value)}
            placeholder="Write about the school's journey or achievements..."
          />
          <input
            type="file"
            accept="video/*"
            id="aboutVideo"
            name="aboutVideo"
            onChange={(e) => setAboutUsVideo(e.target.files[0])}
            ref={fileInputRef}
          />
        </div>
        <div>
          <button
            type="submit"
            onClick={handleAddAboutUs}
            disabled={isUploading}
            className="mb-4 mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center justify-center min-w-[110px]"
          >
            <span className={`${isUploading ? "hidden" : "block"}`}>Submit</span>
            {isUploading && (
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
            )}
          </button>
        </div>
        {aboutUsData && (
          <div className="bg-white p-6 rounded-xl shadow-md mt-6">

            <p className="text-lg font-medium text-gray-800 mb-2">{aboutUsData.title}</p>
            <p className="text-gray-600 leading-relaxed mb-4">{aboutUsData.details}</p>

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

      {/* Notices */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">📌 Notices</h2>

        {/* Input box to add new notice */}
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            placeholder="Enter a new notice..."
            className="border border-gray-300 p-2 rounded w-full"
            onChange={(e) => setNewNotice(e.target.value)}
            value={newNotice}
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            onClick={handleAddNotice}
          >
            Add
          </button>
        </div>

        {/* Render each notice */}
        {notices.map((notice, idx) => (
          <div key={idx} className="flex items-center justify-between mb-3 p-3 border rounded">
            {editingIndex === idx ? (
              <input
                type="text"
                className="border border-blue-500 p-2 rounded w-full mr-2"
                value={editNotice}
                onChange={(e) => seteditNotice(e.target.value)}
              />
            ) : (
              <span className="text-gray-800">{notice}</span>
            )}

            <div className="flex items-center space-x-2 ml-2">
              {editingIndex === idx ? (
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  onClick={handleSaveEditedNotice}
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  onClick={() => handleEditNotice(idx)}
                >
                  Edit
                </button>
              )}
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                onClick={() => handleDeleteNotice(idx)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2 text-green-600">🏅 Achievements</h2>

        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            placeholder="Enter a new achievement..."
            className="border border-gray-300 p-2 rounded w-full"
            onChange={(e) => setNewAchievement(e.target.value)}
            value={newAchievement}
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            onClick={handleAddNewAchievement}
          >
            Add
          </button>
        </div>

        {achievements.map((achievement, idx) => (
          <div key={idx} className="flex items-center justify-between mb-3 p-3 border rounded">
            {achievementEditIndex === idx ? (
              <input
                type="text"
                className="border border-blue-500 p-2 rounded w-full mr-2"
                value={editAchievement}
                onChange={(e) => setEditAchievement(e.target.value)}
              />
            ) : (
              <span className="text-gray-800">{achievement}</span>
            )}

            <div className="flex items-center space-x-2 ml-2">
              {achievementEditIndex === idx ? (
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  onClick={handleSaveEditedAchievement}
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  onClick={() => handleUpdateAchievement(idx)}
                >
                  Edit
                </button>
              )}
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                onClick={() => handleDeleteAchievement(idx)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* News */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2 text-red-600">📰 News</h2>

        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            placeholder="Enter a new news..."
            className="border border-gray-300 p-2 rounded w-full"
            onChange={(e) => setNewNews(e.target.value)}
            value={newNews}
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            onClick={handleAddNewNews}
          >
            Add
          </button>
        </div>

        {news.map((n, idx) => (
          <div key={idx} className="flex items-center justify-between mb-3 p-3 border rounded">
            {newsEditIndex === idx ? (
              <input
                type="text"
                className="border border-blue-500 p-2 rounded w-full mr-2"
                value={editNews}
                onChange={(e) => setEditNews(e.target.value)}
              />
            ) : (
              <span className="text-gray-800">{n}</span>
            )}

            <div className="flex items-center space-x-2 ml-2">
              {newsEditIndex === idx ? (
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  onClick={handleSaveEditedNews}
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  onClick={() => handleEditNews(idx)}
                >
                  Edit
                </button>
              )}
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                onClick={() => handleDeleteNews(idx)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quotations */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2 text-purple-600">🌟 Quotations</h2>

        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            placeholder="Enter a new quote..."
            className="border border-gray-300 p-2 rounded w-full"
            onChange={(e) => setNewQuotation(e.target.value)}
            value={newQuotation}
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            onClick={handleAddNewQuote}
          >
            Add
          </button>
        </div>

        {quotations.map((quote, idx) => (
          <div key={idx} className="flex items-center justify-between mb-3 p-3 border rounded">
            {quoteEditIndex === idx ? (
              <input
                type="text"
                className="border border-blue-500 p-2 rounded w-full mr-2"
                value={editQuote}
                onChange={(e) => setEditQuote(e.target.value)}
              />
            ) : (
              <span className="text-gray-800">{quote}</span>
            )}

            <div className="flex items-center space-x-2 ml-2">
              {quoteEditIndex === idx ? (
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  onClick={handleSaveEditedQuotation}
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  onClick={() => handleEditQuote(idx)}
                >
                  Edit
                </button>
              )}
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                onClick={() => handleDeleteQuotation(idx)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Management */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2 text-yellow-600">👔 Management</h2>
        <div className="mb-6 border p-4 rounded-md">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 w-full mb-2"
            value={newManagementName}
            onChange={(e) => setNewManagementName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Designation"
            className="border p-2 w-full mb-2"
            value={newManagementDesignation}
            onChange={(e) => setNewManagementDesignation(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            id="managementImage"
            name="managementImage"
            onChange={(e) => setNewManagementImage(e.target.files[0])}
          />
          <div>
            <button
              onClick={handleAddNewManagement}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {management.map((manage, index) => (
            <div
              key={index}
              className="bg-white shadow-2xl rounded-lg p-6 text-center transform transition-transform hover:scale-105"
            >
              <img
                src={manage.profileImage}
                alt={manage.name}
                className="mx-auto w-full h-48 sm:h-56 md:h-64 object-cover rounded-md shadow-2xl"
              />
              <h4 className="text-lg sm:text-xl font-semibold mt-5 text-gray-900">
                {manage.name}
              </h4>
              <p className="text-gray-600 text-base sm:text-lg">{manage.designation}</p>
              <div className="mt-4 flex justify-center gap-6">
                <button
                  onClick={() => handleEditManagement(index)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteManagement(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  {deletingIndex === index ? (
                    <svg
                      className="animate-spin h-5 w-5 text-red-600 mx-auto"
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
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminHome;