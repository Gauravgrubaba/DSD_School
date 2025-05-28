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
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 5;

  const filteredMessage = selectedStatus === 'All' ? messages : messages.filter((msg) => msg.status === selectedStatus);
  const totalPages = Math.ceil(filteredMessage.length / messagesPerPage);
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessage.slice(indexOfFirstMessage, indexOfLastMessage);

  const handleDeleteMapLocation = () => {
    setMapLocation('');
  };

  const handleUpdateMapLocation = async (e) => {
    e.preventDefault();
    if (!mapLocation) return alert("Map location cannot be empty");
    try {
      const res = await axios.patch('/api/user/mapaddress', { mapLocation });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    if (!addressLine1) return alert("Address line 1 is required");
    if (!city) return alert('City is required');
    if (!pin || !/^\d{6}$/.test(pin)) return alert("Pin must be 6 digits");
    if (!state) return alert("State is required");

    try {
      const res = await axios.patch('/api/user/address', { addressLine1, addressLine2, city, pin, state });
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setAddressLine1('');
      setAddressLine2('');
      setCity('');
      setPin('');
      setState('');
    }
  };

  const handleGetMessages = async () => {
    try {
      const receivedMessages = await axios.get('/api/user/message');
      setMessages(receivedMessages?.data?.messages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetMessages();
  }, []);

  const handleChangeStatus = async (id) => {
    setChangingStatusIndex(id);
    try {
      const res = await axios.patch(`/api/user/message/${id}`);
      setMessages(res?.data?.allMessage);
    } catch (error) {
      console.log(error);
    } finally {
      setChangingStatusIndex(null);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Admin Contact Panel</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Google Map Location Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-300">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">Google Map Location</h3>
          <input
            type="text"
            value={mapLocation}
            onChange={(e) => setMapLocation(e.target.value)}
            placeholder="Enter Google Map Embed URL"
            className="w-full p-3 mb-4 border-2 rounded-md"
          />
          <div className="flex gap-4">
            <button className="bg-red-600 text-white px-6 py-3 rounded-full" onClick={handleDeleteMapLocation}>Delete</button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-full" onClick={handleUpdateMapLocation}>Update</button>
          </div>
          {mapLocation && (
            <div className="mt-4">
              <iframe src={mapLocation} width="100%" height="250" frameBorder="0" allowFullScreen title="Map"></iframe>
            </div>
          )}
        </div>

        {/* Address Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-300">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">Address Management</h3>
          <input
            type="text"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            placeholder="Address Line 1"
            className="w-full p-3 mb-4 border-2 rounded-md"
          />
          <input
            type="text"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            placeholder="Address Line 2"
            className="w-full p-3 mb-4 border-2 rounded-md"
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="w-full p-3 mb-4 border-2 rounded-md"
          />
          <input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Pin Code"
            className="w-full p-3 mb-4 border-2 rounded-md"
          />
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full p-3 mb-4 border-2 rounded-md"
          >
            <option value="">Select State</option>
            {["Uttar Pradesh", "Maharashtra", "Bihar", "Delhi", "Madhya Pradesh", "Tamil Nadu", "Punjab", "West Bengal", "Rajasthan", "Haryana", "Gujarat", "Karnataka", "Assam", "Jharkhand", "Odisha", "Chhattisgarh", "Kerala", "Andhra Pradesh", "Uttarakhand", "Other"].map(state => (
              <option key={state}>{state}</option>
            ))}
          </select>
          <button className="bg-green-600 text-white px-6 py-3 rounded-full" onClick={handleUpdateAddress}>Update Address</button>
        </div>

        {/* Messages Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-300">
          <div className="mb-4">
            <label className="mr-2 font-medium">Filter by Status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Contacted">Contacted</option>
            </select>
          </div>
          <h3 className="text-xl font-semibold mb-4 text-blue-600">Messages</h3>
          {currentMessages.length === 0 ? (
            <p>No messages to show</p>
          ) : (
            currentMessages.map((msg) => (
              <div key={msg._id} className="bg-white p-4 mb-4 rounded-md border shadow-sm">
                <h4><b>Name:</b> {msg.fullName}</h4>
                <h4><b>Email:</b> {msg.email}</h4>
                <h4><b>Phone:</b> {msg.phoneno}</h4>
                <p><b>Message:</b> {msg.message}</p>
                <p><b>Time:</b> {new Date(msg.dateAndTime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
                <p><b>Status:</b> <span className={msg.status === "Pending" ? "text-red-500" : "text-green-600"}>{msg.status}</span></p>
                {msg.status === "Pending" && (
                  <button
                    className="mt-2 text-blue-500 hover:text-blue-800"
                    onClick={() => handleChangeStatus(msg._id)}
                  >
                    {changingStatusIndex === msg._id ? 'Updating...' : 'Mark as Contacted'}
                  </button>
                )}
              </div>
            ))
          )}

          {/* Pagination Controls */}
          <div className="flex flex-wrap justify-center mt-4 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-full border ${page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContact;
