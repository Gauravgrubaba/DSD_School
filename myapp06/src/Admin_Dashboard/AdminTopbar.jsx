

import React from "react";
import { FaUserCircle, FaSignOutAlt, FaCog } from "react-icons/fa";

const AdminTopbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white flex justify-between items-center px-6 py-3 shadow-md">
      {/* 🔹 Admin Branding */}
      <div className="text-xl font-bold tracking-wide">
        <span className="text-yellow-400">Admin</span> <span className="text-white">Panel</span>
      </div>

      {/* 🔹 Admin Controls */}
      <div className="flex items-center gap-4 text-lg">
        {/* Admin name or icon */}
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-2xl" />
          <span className="hidden md:inline">Admin</span>
        </div>

        {/* Settings */}
        <button className="hover:text-yellow-400 transition">
          <FaCog />
        </button>

        {/* Logout */}
        <button className="hover:text-red-400 transition">
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );
};

export default AdminTopbar;
