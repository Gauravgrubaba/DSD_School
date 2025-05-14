import React from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaBook,
  FaPhone,
  FaUserPlus,
  FaCalendarAlt,
} from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // optional based on your app
    navigate("/"); // Redirect to the Home page
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-48 bg-gradient-to-r from-purple-600 to-indigo-700 shadow-md p-4 fixed top-0 bottom-0">
        <div className="text-center mb-6 mt-4 flex justify-center items-center">
          <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-yellow-400 to-red-500 rounded-full p-4 text-center w-32 h-32 flex items-center justify-center">
            DSD SCHOOL
          </h2>
        </div>
        <nav className="space-y-2 mt-4">
          <NavLink
            to="/dashboard/AdminHome"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-100 transition ${isActive ? "bg-indigo-300 font-semibold" : "text-white"}`
            }
          >
            <FaHome /> Home
          </NavLink>

          <NavLink
            to="/dashboard/AdminAbout"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-100 transition ${isActive ? "bg-indigo-300 font-semibold" : "text-white"}`
            }
          >
            <FaInfoCircle /> About
          </NavLink>

          <NavLink
            to="/dashboard/AdminAcademics"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-100 transition ${isActive ? "bg-indigo-300 font-semibold" : "text-white"}`
            }
          >
            <FaBook /> Academics
          </NavLink>

          <NavLink
            to="/dashboard/AdminEvents"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-100 transition ${isActive ? "bg-indigo-300 font-semibold" : "text-white"}`
            }
          >
            <FaCalendarAlt /> Events
          </NavLink>

          <NavLink
            to="/dashboard/AdminAdmission"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-100 transition ${isActive ? "bg-indigo-300 font-semibold" : "text-white"}`
            }
          >
            <FaUserPlus /> Admission
          </NavLink>

          <NavLink
            to="/dashboard/AdminContacts"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-100 transition ${isActive ? "bg-indigo-300 font-semibold" : "text-white"}`
            }
          >
            <FaPhone /> Contacts
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 ml-48">
        {/* Top Header */}
        <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed top-0 left-48 right-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </header>

        {/* Dynamic Page Content */}
        <main className="mt-20 px-6 py-4 bg-gray-50 min-h-screen">
          <Outlet /> {/* Renders nested routes here */}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
