import React, { useEffect, useState } from "react";
import axios from "axios";

const Contact = () => {

  const [address, setAddress] = useState({});
  const [mapAddress, setMapAddress] = useState("");

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneno: '',
    message: ''
  })

  const [formErrors, setFormErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  const handleGetAddress = async () => {
    try {
      const res = await axios.get('/api/user/address');
      setAddress(res.data.address);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetMapAddress = async () => {
    try {
      const res = await axios.get('/api/user/mapaddress');
      setMapAddress(res?.data?.mapAddress);
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  const handleContact = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const errors = {};

    if (!formData.fullName) {
      errors.fullName = "Full Name is required";
    }

    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = "Valid Email is required";
    }

    if (!formData.phoneno || !phoneRegex.test(formData.phoneno)) {
      errors.phoneno = "Valid Phone Number is required";
    }

    if (!formData.message) {
      errors.message = "Message is required";
    }

    if(Object.keys(errors).length) {
      setFormErrors(errors);
      setIsLoading(false);
      return
    } else {
      setFormErrors({});
    }

    try {
      const res = await axios.post('/api/user/message', formData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetAddress();
    handleGetMapAddress();
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

            <form className="space-y-4" onSubmit={handleContact}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={(e) => setFormData((prev => ({
                  ...prev,
                  fullName: e.target.value
                })))}
                className="w-full py-3 px-4 rounded-lg border border-black text-gray-800 focus:border-blue-500 focus:outline-none"
              />
              {formErrors.fullName && <span className="text-red-500">Full Name is required</span>}

              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setFormData((prev => ({
                  ...prev,
                  email: e.target.value
                })))}
                className="w-full py-3 px-4 rounded-lg border border-black text-gray-800 focus:border-blue-500 focus:outline-none"
              />
              {formErrors.email && <span className="text-red-500">Valid Email is required</span>}

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                onChange={(e) => setFormData((prev => ({
                  ...prev,
                  phoneno: e.target.value
                })))}
                className="w-full py-3 px-4 rounded-lg border border-black text-gray-800 focus:border-blue-500 focus:outline-none"
              />
              {formErrors.phoneno && <span className="text-red-500">Valid Phone Number is required</span>}

              <textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                onChange={(e) => setFormData((prev) => ({
                  ...prev,
                  message: e.target.value
                }))}
                className="w-full py-3 px-4 rounded-lg border border-black text-gray-800 focus:border-blue-500 focus:outline-none"
              ></textarea>
              {formErrors.message && <span className="text-red-500">Message is required</span>}

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
              src={mapAddress}
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
