import React, { useState } from "react";

const AdminHome = () => {
  const [heroTitle, setHeroTitle] = useState("Empowering Young Minds");
  const [heroSubTitle, setHeroSubTitle] = useState("Your Child’s Bright Future Begins Here");
  const [heroBgImage, setHeroBgImage] = useState(null);
  const [aboutText, setAboutText] = useState(
    "We are committed to providing high-quality education with a focus on personal growth, critical thinking, and creativity..."
  );
  const [aboutText2, setAboutText2] = useState("");
  const [aboutVideo, setAboutVideo] = useState(null);
  const [notices, setNotices] = useState([
    "Orientation Session for STD VIII & IX",
    "Bus Facility Registration 2025-26",
  ]);
  const [achievements, setAchievements] = useState([
    "1st Place in National Anuvrat Nyas",
    "The Kalam Project",
  ]);
  const [news, setNews] = useState(["18 Dec: News for October 2024"]);
  const [quotations, setQuotations] = useState([
    "The only way to do great work is to love what you do. — Steve Jobs",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. — Winston Churchill",
  ]);
  const [management, setManagement] = useState([
    { name: "", designation: "", image: null },
  ]);

  const handleHeroImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroBgImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const addNotice = () => setNotices([...notices, ""]);
  const addAchievement = () => setAchievements([...achievements, ""]);
  const addNews = () => setNews([...news, ""]);
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

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center text-indigo-700">🛠 Admin - Home Page Manager</h1>

      {/* Hero Section */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">🎯 Hero Section</h2>

        <input
          type="file"
          accept="image/*"
          id="heroImageInput"
          onChange={handleHeroImageUpload}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => document.getElementById("heroImageInput").click()}
          className="mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Choose Background Image
        </button>

        <div
          className="relative w-full min-h-screen rounded-lg overflow-hidden shadow-lg mb-6"
          style={{
            backgroundImage: `url(${heroBgImage || "/default-hero.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center px-6 text-center">
            <h3 className="text-white text-lg md:text-xl mb-2 tracking-wide font-light">{heroSubTitle}</h3>
            <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight max-w-3xl">{heroTitle}</h1>
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
        <h2 className="text-xl font-semibold mb-2 text-blue-600">📌 Notices</h2>
        {notices.map((notice, idx) => (
          <input
            key={idx}
            type="text"
            className="border p-2 w-full mb-2"
            value={notice}
            onChange={(e) => {
              const updated = [...notices];
              updated[idx] = e.target.value;
              setNotices(updated);
            }}
          />
        ))}
        <button
          onClick={addNotice}
          className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          + Add Notice
        </button>
      </div>

      {/* Achievements */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2 text-green-600">🏅 Achievements</h2>
        {achievements.map((item, idx) => (
          <input
            key={idx}
            type="text"
            className="border p-2 w-full mb-2"
            value={item}
            onChange={(e) => {
              const updated = [...achievements];
              updated[idx] = e.target.value;
              setAchievements(updated);
            }}
          />
        ))}
        <button
          onClick={addAchievement}
          className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          + Add Achievement
        </button>
      </div>

      {/* News */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2 text-red-600">📰 News</h2>
        {news.map((item, idx) => (
          <textarea
            key={idx}
            className="border p-2 w-full mb-2"
            value={item}
            onChange={(e) => {
              const updated = [...news];
              updated[idx] = e.target.value;
              setNews(updated);
            }}
          />
        ))}
        <button
          onClick={addNews}
          className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          + Add News
        </button>
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
