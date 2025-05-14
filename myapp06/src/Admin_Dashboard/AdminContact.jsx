import React, { useState } from 'react';

const AdminContact = () => {
  const [mapLocation, setMapLocation] = useState('');
  const [address, setAddress] = useState({
    main: '',
    sub: ['', '', '', '', ''],
  });
  const [messages, setMessages] = useState([
    { id: 1, name: 'John Doe', message: 'Looking for more information on admissions.' },
    { id: 2, name: 'Jane Smith', message: 'How can I join extracurricular activities?' },
  ]);
  const [updatedMessage, setUpdatedMessage] = useState('');

  // Handle Google Map Location Change
  const handleMapLocationChange = (e) => {
    setMapLocation(e.target.value);
  };

  const handleDeleteMapLocation = () => {
    setMapLocation('');
  };

  const handleUpdateMapLocation = () => {
    // Simulate update (you can add an API call here)
    alert('Google Map Location Updated!');
  };

  // Handle Address Changes (Main and Sub)
  const handleMainAddressChange = (e) => {
    setAddress({ ...address, main: e.target.value });
  };

  const handleSubAddressChange = (index, e) => {
    const updatedSub = [...address.sub];
    updatedSub[index] = e.target.value;
    setAddress({ ...address, sub: updatedSub });
  };

  const handleDeleteSubAddress = (index) => {
    const updatedSub = address.sub.filter((_, idx) => idx !== index);
    setAddress({ ...address, sub: updatedSub });
  };

  const handleAddSubAddress = () => {
    setAddress({
      ...address,
      sub: [...address.sub, ''],
    });
  };

  const handleUpdateAddress = () => {
    // Simulate update (you can add an API call here)
    alert('Address Updated!');
  };

  // Handle Message Deletion and Update
  const handleDeleteMessage = (id) => {
    const updatedMessages = messages.filter((msg) => msg.id !== id);
    setMessages(updatedMessages);
  };

  const handleUpdateMessage = (id) => {
    const updatedMessages = messages.map((msg) => {
      if (msg.id === id) {
        return { ...msg, message: updatedMessage };
      }
      return msg;
    });
    setMessages(updatedMessages);
    setUpdatedMessage('');
    alert('Message Updated!');
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
              onChange={handleMapLocationChange}
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

          {/* Main Address */}
          <div className="mb-4">
            <label className="block text-lg font-semibold">Main Address</label>
            <input
              type="text"
              value={address.main}
              onChange={handleMainAddressChange}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Main Address"
            />
          </div>

          {/* Sub Addresses */}
          <div className="mb-4">
            <label className="block text-lg font-semibold">Sub Addresses</label>
            {address.sub.map((sub, index) => (
              <div key={index} className="flex gap-4 items-center mb-3">
                <input
                  type="text"
                  value={sub}
                  onChange={(e) => handleSubAddressChange(index, e)}
                  className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Sub Address ${index + 1}`}
                />
                <button
                  onClick={() => handleDeleteSubAddress(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              className="text-blue-600 mt-4 hover:text-blue-800"
              onClick={handleAddSubAddress}
            >
              Add Sub Address
            </button>
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
          <h3 className="text-xl font-semibold mb-4 text-blue-600">Messages from Users</h3>
          {messages.length === 0 ? (
            <p>No messages to show</p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="bg-white p-4 mb-4 rounded-md shadow-sm border-2 border-gray-200">
                <h4 className="font-semibold">{msg.name}</h4>
                <p>{msg.message}</p>
                <textarea
                  value={updatedMessage}
                  onChange={(e) => setUpdatedMessage(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-md mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Update Message"
                ></textarea>
                <div className="flex gap-4 mt-3">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleUpdateMessage(msg.id)}
                  >
                    Update Message
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteMessage(msg.id)}
                  >
                    Delete Message
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminContact;
