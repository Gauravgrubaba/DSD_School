import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminAbout = () => {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    designation: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [profileImage, setProfileImage] = useState(null);
  const [aboutUsImage, setAboutUsImage] = useState(null);

  const [updatedAboutUs, setUpdatedAboutUs] = useState({});
  const [aboutUsData, setAboutUsData] = useState({
    title: "",
    description: "",
  });

  const [editSchool, setEditSchool] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);

  const [aboutUsSaving, setAboutUsSaving] = useState(false);

  const handleSchoolInfoChange = async (e) => {
    e.preventDefault();

    setAboutUsSaving(true);

    const data = new FormData();

    if (aboutUsImage !== null) {
      data.append("aboutUsImage", aboutUsImage);
    }
    if (aboutUsData.title !== null) {
      data.append("title", aboutUsData.title);
    }
    if (aboutUsData.description !== null) {
      data.append("description", aboutUsData.description);
    }

    try {
      const res = await axios.patch("/api/user/about", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      // Refresh about us after successful update
      handleGetAboutUs();
    } catch (error) {
      console.log(`Error is: ${error}`);
    } finally {
      setAboutUsData({ title: "", description: "" });
      setAboutUsImage(null);
      setEditSchool(false);
      setAboutUsSaving(false);
    }
  };

  const handleGetAboutUs = async () => {
    try {
      const receivedData = await axios.get("/api/user/about");
      setUpdatedAboutUs(receivedData.data.aboutUs);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  useEffect(() => {
    handleGetAboutUs();
  }, [editSchool]);

  useEffect(() => {
    handleGetAllTeachers();
  }, [isLoading]);

  const handleAddTeacher = async () => {
    if (!newTeacher.name || !newTeacher.designation || !profileImage) {
      alert("Please fill all teacher details and upload profile image.");
      return;
    }
    const data = new FormData();
    data.append("name", newTeacher.name);
    data.append("designation", newTeacher.designation);
    data.append("profileImage", profileImage);

    setIsLoading(true);

    try {
      const teacher = await axios.post("/api/user/teachers", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(teacher);
      setNewTeacher({
        name: "",
        designation: "",
      });
      setProfileImage(null);
      handleGetAllTeachers();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleGetAllTeachers = async () => {
    try {
      const allTeacher = await axios.get("/api/user/teachers");
      setTeachers(allTeacher.data.allTeachers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTeacher = (index) => {
    setIsEditing(true);
    setEditingIndex(index);
    setNewTeacher({
      name: teachers[index].name,
      designation: teachers[index].designation,
    });
    setProfileImage(null); // reset image when editing
  };

  const handleSaveTeacher = async () => {
    const id = teachers[editingIndex]._id;

    const data = new FormData();
    if (newTeacher.name !== "") {
      data.append("updatedName", newTeacher.name);
    }
    if (newTeacher.designation !== "") {
      data.append("updatedDesignation", newTeacher.designation);
    }
    if (profileImage !== null) {
      data.append("profileImage", profileImage);
    }
    data.append("id", id);

    setIsLoading(true);

    try {
      const res = await axios.patch(`/api/user/teachers/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      setNewTeacher({
        name: "",
        designation: "",
      });
      setIsEditing(false);
      setProfileImage(null);
      setEditingIndex(null);
      handleGetAllTeachers();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleDeleteTeacher = async (index) => {
    const id = teachers[index]._id;

    setDeletingIndex(index);

    setIsLoading(true);
    try {
      const res = await axios.delete(`/api/user/teachers/${id}`);
      console.log(res);
      setTeachers(res.data.allTeachers);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setDeletingIndex(null);
    }
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();

    setAboutUsData({ title: "", description: "" });
    setAboutUsImage(null);
    setEditSchool(false);
  };

  return (
    <section className="bg-gray-100 pt-8 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-blue-700 text-center uppercase tracking-wide pt-4 sm:pt-6 pb-10">
          About Us
        </h2>

        {/* School Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-20 bg-white p-6 rounded-xl shadow-2xl">
          <div className="sm:w-1/3 flex flex-col items-center sm:items-start mb-8 sm:mb-0 w-full max-w-md mx-auto">
            <img
              alt="School"
              src={updatedAboutUs?.image || ""}
              className="rounded-lg shadow-xl w-full h-64 sm:h-[400px] object-cover border-4 border-blue-500"
            />
            {editSchool && (
              <input
                type="file"
                name="aboutUsImage"
                onChange={(e) => setAboutUsImage(e.target.files[0])}
                className="p-2 border border-gray-300 rounded-lg mt-4 w-full"
              />
            )}
          </div>

          <div className="sm:w-2/3 sm:pl-12 w-full max-w-xl mx-auto">
            {editSchool ? (
              <form onSubmit={handleSchoolInfoChange}>
                <input
                  type="text"
                  name="name"
                  value={aboutUsData?.title}
                  onChange={(e) =>
                    setAboutUsData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="text-xl sm:text-3xl font-bold text-blue-900 border-2 border-blue-400 rounded-lg px-4 py-2 bg-white shadow-md w-full mb-4"
                  placeholder="Title"
                  required
                />
                <textarea
                  name="description"
                  value={aboutUsData?.description}
                  onChange={(e) =>
                    setAboutUsData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  rows={5}
                  className="text-gray-700 text-base sm:text-lg leading-relaxed border border-gray-300 rounded-lg p-4 w-full mb-4"
                  placeholder="Description"
                  required
                />
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    disabled={aboutUsSaving}
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-800 flex justify-center items-center gap-2"
                  >
                    Update
                    {aboutUsSaving && (
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
                    )}
                  </button>
                  <button
                    onClick={handleDeleteClick}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-800"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="text-2xl sm:text-4xl font-bold text-blue-900 mb-4 text-center sm:text-left">
                  {updatedAboutUs?.title || "Loading..."}
                </h2>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4 text-justify">
                  {updatedAboutUs?.description || "Loading..."}
                </p>
                <div className="flex justify-center sm:justify-start">
                  <button
                    onClick={() => setEditSchool(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Faculty Section */}
        <h3 className="text-2xl sm:text-4xl font-semibold text-blue-800 text-center mb-12">
          Meet Our Faculty
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teachers.map((teacher, index) => (
            <div
              key={index}
              className="bg-white shadow-2xl rounded-lg p-6 text-center transform transition-transform hover:scale-105"
            >
              <img
                src={teacher.profileImage}
                alt={teacher.name}
                className="mx-auto w-full h-48 sm:h-56 md:h-64 object-cover rounded-md shadow-2xl"
              />
              <h4 className="text-lg sm:text-xl font-semibold mt-5 text-gray-900">
                {teacher.name}
              </h4>
              <p className="text-gray-600 text-base sm:text-lg">{teacher.designation}</p>
              <div className="mt-4 flex justify-center gap-6">
                <button
                  onClick={() => handleEditTeacher(index)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTeacher(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  {deletingIndex === index ? (
                    <svg
                      className="animate-spin h-5 w-5 text-red-600 mx-auto"
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
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add / Edit Teacher Form */}
        <div className="mt-16 max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-2xl">
          <h3 className="text-2xl font-bold text-blue-700 mb-8 text-center">
            {isEditing ? "Edit Teacher" : "Add Teacher"}
          </h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              isEditing ? handleSaveTeacher() : handleAddTeacher();
            }}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block mb-2 font-semibold text-blue-900 text-lg"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={newTeacher.name}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Teacher's full name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="designation"
                className="block mb-2 font-semibold text-blue-900 text-lg"
              >
                Designation
              </label>
              <input
                id="designation"
                type="text"
                name="designation"
                value={newTeacher.designation}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, designation: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Teacher's designation"
                required
              />
            </div>

            <div>
              <label
                htmlFor="profileImage"
                className="block mb-2 font-semibold text-blue-900 text-lg"
              >
                Profile Image
              </label>
              <input
                id="profileImage"
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={(e) => setProfileImage(e.target.files[0])}
                className="w-full text-gray-700"
                required={!isEditing}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-700 text-white py-3 rounded-lg text-lg hover:bg-blue-900 transition-colors flex justify-center items-center gap-3"
            >
              {isLoading && (
                <svg
                  className="animate-spin h-6 w-6 text-white"
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
              )}
              {isEditing ? "Save Changes" : "Add Teacher"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setNewTeacher({ name: "", designation: "" });
                  setProfileImage(null);
                  setEditingIndex(null);
                }}
                className="w-full mt-2 bg-gray-500 text-white py-3 rounded-lg text-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminAbout;