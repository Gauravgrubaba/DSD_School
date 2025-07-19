import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* 🔹 Footer Grid Layout */}
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* 🔹 Contact Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-3">Contact Us</h3>
            <div className="flex items-start justify-center md:justify-start gap-2 text-gray-300">
              <MapPin size={18} />
              <div className="text-sm text-white">
                <p>Behind Birla College,</p>
                <p>Near Dattatray Colony,</p>
                <p>Kalyan (W), Thane</p>
              </div>
            </div>
            <p className="flex items-center justify-center md:justify-start gap-2 text-gray-300 mt-2">
              <Mail size={18} />
              <a
                href="mailto:dsdschool@sspmmumbai.in"
                className="hover:text-yellow-400 text-sm"
              >
                dsdschool@sspmmumbai.in
              </a>
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2 text-gray-300 mt-1">
              <Phone size={18} />
              <a
                href="tel:+919136753346"
                className="hover:text-yellow-400 text-sm"
              >
                +91 9136753346
              </a>
            </p>
          </div>

          {/* 🔹 Quick Links Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-gray-300 hover:text-blue-400">
                  About
                </a>
              </li>
              <li>
                <a
                  href="#academics"
                  className="text-gray-300 hover:text-blue-400"
                >
                  Academics
                </a>
              </li>
              <li>
                <a href="#events" className="text-gray-300 hover:text-blue-400">
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#admission"
                  className="text-gray-300 hover:text-blue-400"
                >
                  Admission
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-blue-400"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* 🔹 Social Media Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-3">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-4 mt-2">
              <a
                href="https://www.facebook.com/people/DSD-School/100057499567428/"
                aria-label="Facebook"
                className="text-gray-300 hover:text-blue-500 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://www.youtube.com/@dsdschool2019" // replace with actual channel link
                aria-label="YouTube"
                className="text-gray-300 hover:text-red-600 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* Inline YouTube SVG icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M23.498 6.186a2.994 2.994 0 0 0-2.108-2.114C19.444 3.5 12 3.5 12 3.5s-7.444 0-9.39.572A2.994 2.994 0 0 0 .502 6.186C0 8.147 0 12 0 12s0 3.853.502 5.814a2.994 2.994 0 0 0 2.108 2.114C4.556 20.5 12 20.5 12 20.5s7.444 0 9.39-.572a2.994 2.994 0 0 0 2.108-2.114C24 15.853 24 12 24 12s0-3.853-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-300 hover:text-pink-500 transition"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-300 hover:text-blue-600 transition"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* 🔹 Copyright */}
     <p className="text-gray-500 text-sm text-center mt-8">
  © {new Date().toLocaleString('en-IN', {
    weekday: 'long',     // e.g., Saturday
    day: '2-digit',      // e.g., 19
    month: 'long',       // e.g., July
    year: 'numeric',     // e.g., 2025
    hour: '2-digit',     // e.g., 02
    minute: '2-digit',   // e.g., 40
    hour12: true         // AM/PM format
  })} DSD School. All rights reserved.
</p>

      </div>
    </footer>
  );
};

export default Footer;
