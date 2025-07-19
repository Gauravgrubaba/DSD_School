import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
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
                <a
                  href="#about"
                  className="text-gray-300 hover:text-blue-400"
                >
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
                <a
                  href="#events"
                  className="text-gray-300 hover:text-blue-400"
                >
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
                href="#"
                aria-label="Facebook"
                className="text-gray-300 hover:text-blue-500 transition"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-300 hover:text-sky-400 transition"
              >
                <Twitter size={24} />
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
          © {new Date().getFullYear()} DSD School. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
