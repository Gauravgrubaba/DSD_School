import React, { useEffect, useState } from 'react';
import api from "../api/axios.jsx";

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
      await api.patch('/user/mapaddress', { mapLocation });
    } catch (error) {
      console.log(error);
    } finally {
      setMapLocation('');
    }
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    if (!addressLine1) return alert("Address line 1 is required");
    if (!city) return alert('City is required');
    if (!pin || !/^\d{6}$/.test(pin)) return alert("Pin must be 6 digits");
    if (!state) return alert("State is required");

    try {
      const res = await api.patch('/user/address', { addressLine1, addressLine2, city, pin, state });
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
      const receivedMessages = await api.get('/user/message');
      setMessages(receivedMessages?.data?.messages || []);
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
      const res = await api.patch(`/user/message/${id}`);
      setMessages(res?.data?.allMessage);
    } catch (error) {
      console.log(error);
    } finally {
      setChangingStatusIndex(null);
    }
  };

  // New: Delete message handler
  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await api.delete(`/user/message/${id}`);
      // Assuming API returns updated message list or you can refetch
      setMessages(res?.data?.allMessage || messages.filter(m => m._id !== id));
    } catch (error) {
      console.log(error);
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
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 justify-center">
            <button className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition disabled:opacity-60" onClick={handleDeleteMapLocation}>Delete</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition disabled:opacity-60" onClick={handleUpdateMapLocation}>Update</button>
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
          <div className="flex justify-center mt-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition disabled:opacity-60l" onClick={handleUpdateAddress}>Update Address</button>
          </div>
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
              <div key={msg._id} className="bg-white p-4 mb-4 rounded-md border shadow-sm relative">
                <h4><b>Name:</b> {msg.fullName}</h4>
                <h4><b>Email:</b> {msg.email}</h4>
                <h4><b>Phone:</b> {msg.phoneno}</h4>
                <p><b>Message:</b> {msg.message}</p>
                <p><b>Time:</b> {new Date(msg.dateAndTime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
                <p><b>Status:</b> <span className={msg.status === "Pending" ? "text-red-500" : "text-green-600"}>{msg.status}</span></p>

                <div className="flex gap-3 mt-2">
                  {msg.status === "Pending" && (
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => handleChangeStatus(msg._id)}
                      disabled={changingStatusIndex === msg._id}
                    >
                      {changingStatusIndex === msg._id ? 'Updating...' : 'Mark as Contacted'}
                    </button>
                  )}

                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDeleteMessage(msg._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}

          

          {/* Dropdown for direct page selection */}
          <div className="flex justify-center items-center mt-4 gap-2">
            <label htmlFor="page-select" className="mr-2">Go to page:</label>
            <select
              id="page-select"
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1"
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <option key={page} value={page}>{page}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContact;