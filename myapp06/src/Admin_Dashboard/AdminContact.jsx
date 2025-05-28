import React, { useEffect, useState } from 'react';
import axios from "axios";

const AdminContact = () => {
  const [mapLocation, setMapLocation] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [pin, setPin] = useState('');
  const [state, setState] = useState('');
  const [messages, setMessages] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState("All");

  const [changingStatusIndex, setChangingStatusIndex] = useState(null);

  const filteredMessage = selectedStatus === 'All' ? messages : messages.filter((msg) => msg.status === selectedStatus);

  const handleDeleteMapLocation = () => {
    setMapLocation('');
  };

  const handleUpdateMapLocation = async (e) => {
    e.preventDefault();

    console.log(mapLocation);

    if (!mapLocation) {
      return alert("Map location cannot be empty")
    }

    try {
      const res = await axios.patch('/api/user/mapaddress', { mapLocation });
      console.log(res);
    } catch (error) {
      console.log(error)
    }
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();

    if (!addressLine1) {
      return alert("Address line 1 is required")
    }
    if (!city) {
      return alert('City is required')
    }
    if (!pin) {
      return alert('Pincode is required')
    }
    if (!(pin && /^\d{6}$/.test(pin))) {
      return alert("Pin can only contain numbers and should be of length 6")
    }
    if (!state) {
      return alert("State is required")
    }

    const data = {
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      city: city,
      pin: pin,
      state: state
    }

    try {
      const res = await axios.patch('/api/user/address', data);
      console.log(res);
    } catch (error) {
      console.log(error)
    } finally {
      setAddressLine1('');
      setAddressLine2('');
      setCity('');
      setPin('');
      setState('')
    }
  };

  const handleGetMessages = async () => {
    try {
      const receivedMessages = await axios.get('/api/user/message');
      setMessages(receivedMessages?.data?.messages);
      console.log(receivedMessages?.data?.messages);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetMessages();
  }, [])

  const handleChangeStatus = async (id) => {
    setChangingStatusIndex(id);
    try {
      const res = await axios.patch(`/api/user/message/${id}`);
      console.log(res);
      setMessages(res?.data?.allMessage);
    } catch (error) {
      console.log(error)
    } finally {
      setChangingStatusIndex(null);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Admin Contact Panel</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Google Map Location Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-300">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">Google Map Location</h3>
          <div className="mb-4">
            <label className="block text-lg font-semibold">Google Map Embed Link</label>
            <input
              type="text"
              value={mapLocation}
              onChange={(e) => setMapLocation(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Google Map Embed URL"
            />
          </div>
          <div className="flex gap-4">
            <button
              className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-800 transition"
              onClick={handleDeleteMapLocation}
            >
              Delete Map Location
            </button>
            <button
              className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-800 transition"
              onClick={handleUpdateMapLocation}
            >
              Update Map Location
            </button>
          </div>
          {mapLocation && (
            <div className="mt-4">
              <iframe
                title="Google Map"
                src={mapLocation}
                width="100%"
                height="250"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
              ></iframe>
            </div>
          )}
        </div>

        {/* Address Management Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-300">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">Address Management</h3>

          <div className="mb-4">
            <label className="block text-lg font-semibold">Address Line 1<em className='text-red-500'>*</em></label>
            <input
              type="text"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Address Line 1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold">Address Line 2</label>
            <input
              type="text"
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Address Line 2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold">City<em className='text-red-500'>*</em></label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter City"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold">Pin Code<em className='text-red-500'>*</em></label>
            <input
              type="text"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Pin Code"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold">State<em className='text-red-500'>*</em></label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select State</option>
              <option>Uttar Pradesh</option>
              <option>Maharashtra</option>
              <option>Bihar</option>
              <option>Delhi</option>
              <option>Madhya Pradesh</option>
              <option>Tamil Nadu</option>
              <option>Punjab</option>
              <option>West Bengal</option>
              <option>Rajasthan</option>
              <option>Haryana</option>
              <option>Gujarat</option>
              <option>Karnataka</option>
              <option>Assam</option>
              <option>Jharkhand</option>
              <option>Odisha</option>
              <option>Chhattisgarh</option>
              <option>Kerala</option>
              <option>Andhra Pradesh</option>
              <option>Uttarakhand</option>
              <option>Other</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-800 transition"
              onClick={handleUpdateAddress}
            >
              Update Address
            </button>
          </div>
        </div>

        {/* Message Management Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-300">
          <div className="mb-4">
            <label htmlFor="statusFilter" className="mr-2 font-medium">Filter by Status:</label>
            <select
              id="statusFilter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Contacted">Contacted</option>
            </select>
          </div>
          <h3 className="text-xl font-semibold mb-4 text-blue-600">Messages from Users</h3>
          {filteredMessage.length === 0 ? (
            <p>No messages to show</p>
          ) : (
            filteredMessage.map((msg) => (
              <div key={msg._id} className="bg-white p-4 mb-4 rounded-md shadow-sm border-2 border-gray-200">
                <h4 className="font-semibold">Full Name: {msg.fullName}</h4>
                <h4 className="font-semibold">Email: {msg.email}</h4>
                <h4 className="font-semibold">Phone No.: {msg.phoneno}</h4>
                <p className="font-semibold">Message: {msg.message}</p>
                <h4 className="font-semibold">
                  Date And Time: {new Date(msg.dateAndTime).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata"
                  })}
                </h4>
                <h4 className="font-semibold">Status: <em className={msg.status === "Pending" ? "text-red-500" : "text-green-500"}>{msg.status}</em></h4>
                {msg.status === "Pending" && <div className="flex gap-4 mt-3">
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleChangeStatus(msg._id)}
                  >
                    {changingStatusIndex === msg._id ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                    ) : (
                      <span>Change Status to Contacted</span>
                    )}
                  </button>
                </div>}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminContact;
