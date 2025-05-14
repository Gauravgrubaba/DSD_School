import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from 'react-router-dom';

// Layout and Pages
import Layout from './Layout.jsx';
import Home from './components/Home/Home.jsx';
import About from './components/About/About.jsx';
import Contact from './components/Contact/Contact.jsx';
import Events from './components/Events/Events.jsx';
import Academics from './components/Academics/Academics.jsx';
import Admission from './components/Admission/Admission.jsx';

// Admin Pages
import Admin from './Admin_Dashboard/Admin.jsx';
import Adminlogin from './Auth/Adminlogin.jsx';
import AdminDashboard from './Admin_Dashboard/AdminDashboard.jsx';


import AdminHome from './Admin_Dashboard/AdminHome.jsx';
import AdminAbout from './Admin_Dashboard/AdminAbout.jsx';
import AdminAcademics from './Admin_Dashboard/AdminAcademics.jsx';
import AdminEvents from './Admin_Dashboard/AdminEvents.jsx';
import AdminAdmission from './Admin_Dashboard/AdminAdmission.jsx';
import AdminContact from './Admin_Dashboard/AdminContact.jsx';

// ✅ Protected Route Logic Inline
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('user');
  return isAuthenticated ? children : <Navigate to="/" />;
}

// ✅ Optional: Redirect /login if already logged in
function PublicRoute({ children }) {
  const isAuthenticated = localStorage.getItem('user');
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* 🌐 Public Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="admission" element={<Admission />} />
        <Route path="contact" element={<Contact />} />
        <Route path="events" element={<Events />} />
        <Route path="academics" element={<Academics />} />
      </Route>

      {/* 🔐 Admin Area */}
      <Route path="/login" element={
        <PublicRoute>
          <Adminlogin />
        </PublicRoute>
      } />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>

      } >
      <Route path="AdminHome" element={<AdminHome />} />
        <Route path="AdminAbout" element={<AdminAbout />} />
        <Route path="AdminAcademics" element={<AdminAcademics />} />
        <Route path="AdminEvents" element={<AdminEvents />} />
        <Route path="AdminAdmission" element={<AdminAdmission />} />
        <Route path="AdminContacts" element={<AdminContact />} />
</Route>
      <Route path="/admin" element={
        <ProtectedRoute>
          <Admin />
        </ProtectedRoute>
      } />
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
