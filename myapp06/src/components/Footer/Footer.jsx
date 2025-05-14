import React from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Footer Grid Layout */}
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* 🔹 Contact Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-3">Contact Us</h3>
            <p className="flex items-center justify-center md:justify-start gap-2 text-gray-300">
              <MapPin size={18} /> Noida, India
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2 text-gray-300">
              <Mail size={18} /> <a href="mailto:info@example.com" className="hover:text-yellow-400">info@example.com</a>
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2 text-gray-300">
              <Phone size={18} /> <a href="tel:+919876543210" className="hover:text-yellow-400">+91 98765 43210</a>
            </p>
          </div>

          {/* 🔹 Quick Links */}
          <div>
            <h3 className="text-2xl font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-yellow-400">Home</a></li>
              <li><a href="#" className="hover:text-yellow-400">About Us</a></li>
              <li><a href="#" className="hover:text-yellow-400">Courses</a></li>
              <li><a href="#" className="hover:text-yellow-400">Contact</a></li>
            </ul>
          </div>

          {/* 🔹 Social Media */}
          <div>
            <h3 className="text-2xl font-semibold mb-3">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="text-gray-300 hover:text-blue-500"><Facebook size={24} /></a>
              <a href="#" className="text-gray-300 hover:text-sky-400"><Twitter size={24} /></a>
              <a href="#" className="text-gray-300 hover:text-pink-500"><Instagram size={24} /></a>
              <a href="#" className="text-gray-300 hover:text-blue-600"><Linkedin size={24} /></a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <p className="text-gray-400 text-sm text-center mt-8">
          © {new Date().getFullYear()} Your School Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
