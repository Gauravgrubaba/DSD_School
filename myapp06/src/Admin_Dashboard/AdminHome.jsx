import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const AdminHome = () => {
  //Hero Section
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubTitle, setHeroSubTitle] = useState("");
  const [heroBgImage, setHeroBgImage] = useState(null);

  const [aboutText, setAboutText] = useState(
    "We are committed to providing high-quality education with a focus on personal growth, critical thinking, and creativity..."
  );
  const [aboutText2, setAboutText2] = useState("");
  const [aboutVideo, setAboutVideo] = useState(null);

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

  const [quotations, setQuotations] = useState([
    "The only way to do great work is to love what you do. — Steve Jobs",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. — Winston Churchill",
  ]);
  const [management, setManagement] = useState([
    { name: "", designation: "", image: null },
  ]);

  const [heroSectionData, setHeroSectionData] = useState({});

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

  const handleAboutVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAboutVideo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleManagementImageUpload = (e, idx) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = [...management];
        updated[idx].image = reader.result;
        setManagement(updated);
      };
      reader.readAsDataURL(file);
    }
  };

  const addManagementMember = () =>
    setManagement([...management, { name: "", designation: "", image: null }]);

  const handleSave = () => {
    console.log({
      heroTitle,
      heroSubTitle,
      heroBgImage,
      aboutText,
      aboutText2,
      aboutVideo,
      notices,
      achievements,
      news,
      quotations,
      management,
    });
    alert("Changes saved (simulated)");
  };

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
  }, [])

  useEffect(() => {
    console.log("Notices updated");
  }, [notices])

  const handleAddNewAchievement = async (e) => {
    e.preventDefault();

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

    if(!newNews) {
      return alert("News field cannot be empty");
    }

    if(news.length >= 10) {
      return alert("Maximum 10 news are allowed.")
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
        <h2 className="text-xl font-semibold mb-4 text-blue-600">📘 About Us</h2>
        <textarea
          className="border p-2 w-full h-24 mb-4"
          value={aboutText}
          onChange={(e) => setAboutText(e.target.value)}
          placeholder="Write about the school's vision or mission..."
        />
        <textarea
          className="border p-2 w-full h-24 mb-4"
          value={aboutText2}
          onChange={(e) => setAboutText2(e.target.value)}
          placeholder="Write about the school's journey or achievements..."
        />
        <input
          type="file"
          accept="video/*"
          id="aboutVideoInput"
          onChange={(e) => handleAboutVideoUpload(e)}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => document.getElementById("aboutVideoInput").click()}
          className="mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Upload About Section Video
        </button>
        {aboutVideo && (
          <video controls className="w-full rounded-lg">
            <source src={aboutVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
        {quotations.map((q, idx) => (
          <textarea
            key={idx}
            className="border p-2 w-full mb-2"
            value={q}
            onChange={(e) => {
              const updated = [...quotations];
              updated[idx] = e.target.value;
              setQuotations(updated);
            }}
          />
        ))}
      </div>

      {/* Management */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2 text-yellow-600">👔 Management</h2>
        {management.map((member, idx) => (
          <div key={idx} className="mb-6 border p-4 rounded-md">
            <input
              type="text"
              placeholder="Name"
              className="border p-2 w-full mb-2"
              value={member.name}
              onChange={(e) => {
                const updated = [...management];
                updated[idx].name = e.target.value;
                setManagement(updated);
              }}
            />
            <input
              type="text"
              placeholder="Designation"
              className="border p-2 w-full mb-2"
              value={member.designation}
              onChange={(e) => {
                const updated = [...management];
                updated[idx].designation = e.target.value;
                setManagement(updated);
              }}
            />
            <input
              type="file"
              accept="image/*"
              id={`managementImageInput${idx}`}
              onChange={(e) => handleManagementImageUpload(e, idx)}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => document.getElementById(`managementImageInput${idx}`).click()}
              className="mb-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              {member.image ? "Change Image" : "Upload Image"}
            </button>
            {member.image && (
              <img
                src={member.image}
                alt={`${member.name} preview`}
                className="w-24 h-24 object-cover rounded-md border"
              />
            )}
          </div>
        ))}
        <button
          onClick={addManagementMember}
          className="mt-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
        >
          + Add Management Member
        </button>
      </div>

      {/* Save Button */}
      <div className="text-center">
        <button
          className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700"
          onClick={handleSave}
        >
          💾 Save All Changes
        </button>
      </div>
    </div>
  );
};

export default AdminHome;
