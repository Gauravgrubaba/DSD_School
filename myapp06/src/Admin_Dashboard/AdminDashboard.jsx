import React, { useState } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaBook,
  FaPhone,
  FaUserPlus,
  FaCalendarAlt,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const navItems = [
    { to: "/dashboard/AdminHome", label: "Home", icon: <FaHome /> },
    { to: "/dashboard/AdminAbout", label: "About", icon: <FaInfoCircle /> },
    { to: "/dashboard/AdminAcademics", label: "Academics", icon: <FaBook /> },
    { to: "/dashboard/AdminEvents", label: "Events", icon: <FaCalendarAlt /> },
    { to: "/dashboard/AdminAdmission", label: "Admission", icon: <FaUserPlus /> },
    { to: "/dashboard/AdminContacts", label: "Contacts", icon: <FaPhone /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex w-52 bg-gradient-to-r from-purple-600 to-indigo-700 flex-col items-center shadow-md fixed top-0 bottom-0 z-10">
        <div className="mt-6 mb-4 text-white font-bold text-xl text-center bg-gradient-to-r from-yellow-400 to-red-500 rounded-full w-32 h-32 flex items-center justify-center">
          DSD SCHOOL
        </div>
        <nav className="flex flex-col space-y-3 w-full px-4">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-indigo-100 transition ${
                  isActive ? "bg-indigo-300 font-semibold text-black" : "text-white"
                }`
              }
            >
              {icon} {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-52 w-full">
        {/* Header */}
        <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-20">
          <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>

          {/* Desktop Logout Button */}
          <button
            onClick={handleLogout}
            className="hidden md:block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>

          {/* Mobile Manager Button */}
          <div className="md:hidden relative">
            <button
              className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              Manager
            </button>

            {mobileMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-52 z-30">
                {navItems.map(({ to, label, icon }) => (
                  <NavLink
                    key={label}
                    to={to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 hover:bg-indigo-100 transition ${
                        isActive ? "bg-indigo-200 font-semibold text-indigo-900" : "text-gray-800"
                      }`
                    }
                  >
                    {icon} {label}
                  </NavLink>
                ))}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 rounded-b-lg"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="mt-4 px-6 py-4 bg-gray-50 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
