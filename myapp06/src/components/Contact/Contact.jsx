import React, { useEffect, useState } from "react";
import axios from "axios";

const Contact = () => {

  const [address, setAddress] = useState({});

  const handleGetAddress = async () => {
    try {
      const res = await axios.get('/api/user/address');
      // console.log(res.data.address);
      setAddress(res.data.address);
      console.log(res.data.address);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetAddress();
  }, []);

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 py-16">
      <div className="max-w-6xl w-full bg-white shadow-2xl border-2 border-black rounded-lg p-10">
        {/* Contact Us Heading */}
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-10 mt-6">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Information Box */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg border-2 border-black">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Address
            </h2>

            <div className="space-y-4">
              <div className="flex items-center text-gray-700">
                <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="none">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="ml-4 font-semibold">{address.addressLine1}, {address.addressLine2}</span>
              </div>

              <div className="flex items-center text-gray-700">
                <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="none">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="ml-4 font-semibold">City: {address.city}</span>
              </div>

              <div className="flex items-center text-gray-700">
                <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="none">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="ml-4 font-semibold">Pincode: {address.pin}</span>
              </div>

              <div className="flex items-center text-gray-700">
                <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="none">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="ml-4 font-semibold">State: {address.state}</span>
              </div>
            </div>
          </div>

          {/* Contact Form Box */}
          <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-black">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Send Us a Message
            </h2>

            <form className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full py-3 px-4 rounded-lg border border-black text-gray-800 focus:border-blue-500 focus:outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full py-3 px-4 rounded-lg border border-black text-gray-800 focus:border-blue-500 focus:outline-none"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full py-3 px-4 rounded-lg border border-black text-gray-800 focus:border-blue-500 focus:outline-none"
              />

              <textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                className="w-full py-3 px-4 rounded-lg border border-black text-gray-800 focus:border-blue-500 focus:outline-none"
              ></textarea>

              {/* Submit Button with Blue Color & Shadow */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-xl hover:bg-blue-500 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Google Maps Box */}
        <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-lg border-2 border-black">
          <h3 className="text-3xl font-semibold text-gray-800 text-center mb-4">
            Visit Us
          </h3>
          <div className="w-full h-[400px] rounded-lg overflow-hidden border-2 border-black">
            <iframe
              title="Google Maps"
              className="w-full h-full border-0 rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.836769404547!2d-122.0842496846924!3d37.421999979822824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fbb5c1b6a7e6f%3A0x57cd1b654634da52!2sGoogleplex!5e0!3m2!1sen!2sus!4v1649783041112!5m2!1sen!2sus"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
