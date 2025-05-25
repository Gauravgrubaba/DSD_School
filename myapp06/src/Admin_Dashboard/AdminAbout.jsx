import React, { useEffect, useState } from "react";
import axios from "axios";


const AdminAbout = () => {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    designation: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [profileImage, setProfileImage] = useState(null);
  const [aboutUsImage, setAboutUsImage] = useState(null);

  const [updatedAboutUs, setUpdatedAboutUs] = useState({});
  const [aboutUsData, setAboutUsData] = useState({
    title: "",
    description: ""
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
    };
    if (aboutUsData.title !== null) {
      data.append("title", aboutUsData.title);
    };
    if (aboutUsData.description !== null) {
      data.append("description", aboutUsData.description);
    }

    try {
      const res = await axios.patch("/api/user/about", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(res);
    } catch (error) {
      console.log(`Error is: ${error}`)
    } finally {
      setAboutUsData({ title: "", description: "" });
      setAboutUsImage(null);
      setEditSchool(false);
      setAboutUsSaving(false);
    }
  };

  const handleGetAboutUs = async (req, res) => {
    try {
      const receivedData = await axios.get('/api/user/about')
      setUpdatedAboutUs(receivedData.data.aboutUs);
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  }

  useEffect(() => {
    handleGetAboutUs();
  }, [editSchool]);

  useEffect(() => {
    handleGetAllTeachers();
  }, [isLoading])

  const handleAddTeacher = async () => {
    console.log(newTeacher);
    console.log(profileImage);

    const data = new FormData();
    data.append("name", newTeacher.name);
    data.append("designation", newTeacher.designation);
    data.append("profileImage", profileImage);

    setIsLoading(true);

    try {
      const teacher = await axios.post('/api/user/teachers', data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(teacher);
      setNewTeacher({
        name: "",
        designation: ""
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
      const allTeacher = await axios.get('/api/user/teachers');
      setTeachers(allTeacher.data.allTeachers);
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditTeacher = (index) => {
    setIsEditing(true);
    setEditingIndex(index);
    setNewTeacher(teachers[index]);
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
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(res);
      setNewTeacher({
        name: "",
        designation: ""
      })
      setIsEditing(false);
      setProfileImage(null);
      setEditingIndex(null);
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
      const res = await axios.delete(`/api/user/teachers/${id}`)
      console.log(res);
      setTeachers(res.data.allTeachers);
      console.log(teachers);
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
  }

  return (
    <section className="bg-gray-100 pt-8 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-700 text-center uppercase tracking-wide pt-4 sm:pt-6 pb-10">
          About Us
        </h2>

        {/* School Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-20 bg-white p-6 rounded-xl shadow-2xl">
          <div className="sm:w-1/3 flex flex-col items-center sm:items-start mb-10 sm:mb-0">
            <img
              alt="School"
              src={updatedAboutUs?.image || "Loading..."}
              className="rounded-lg shadow-xl w-full sm:w-[450px] sm:h-[400px] object-cover border-4 border-blue-500"
            />
            {editSchool && (
              <>
                <input
                  type="file"
                  name="aboutUsImage"
                  onChange={(e) => setAboutUsImage(e.target.files[0])}
                  className="p-2 border border-gray-300 rounded-lg"
                />
              </>
            )}
          </div>

          <div className="sm:w-2/3 sm:pl-16">
            {editSchool ? (
              <>
                <form onSubmit={handleSchoolInfoChange}>
                  <input
                    type="text"
                    name="name"
                    value={aboutUsData?.title}
                    onChange={(e) => setAboutUsData((prev) => ({ ...prev, title: e.target.value }))}
                    className="text-2xl sm:text-4xl font-bold text-blue-900 border-2 border-blue-400 rounded-lg px-4 py-2 bg-white shadow-md w-full mb-4"
                  />
                  <textarea
                    name="description"
                    value={aboutUsData?.description}
                    onChange={(e) => setAboutUsData((prev) => ({ ...prev, description: e.target.value }))}
                    rows={5}
                    className="text-gray-700 text-base sm:text-lg leading-relaxed border border-gray-300 rounded-lg p-4 w-full mb-4"
                  />
                  <div className="flex gap-4">
                    <button
                      disabled={aboutUsSaving}
                      type="submit"
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-800"
                    >
                      Update
                      {aboutUsSaving && (
                        <svg
                          className="animate-spin ml-2 h-5 w-5 text-white"
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
                      Delete
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-2xl sm:text-4xl font-bold text-blue-900 mb-4">
                  {updatedAboutUs?.title || "Loading..."}
                </h2>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
                  {updatedAboutUs?.description || "Loading..."}
                </p>
                <button
                  onClick={() => setEditSchool(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </div>

        <h3 className="text-3xl sm:text-4xl font-semibold text-blue-800 text-center mb-12">
          Meet Our Faculty
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {teachers.map((teacher, index) => (
            <div
              key={index}
              className="bg-white shadow-2xl rounded-lg p-6 text-center transform transition-transform hover:scale-105"
            >
              <img
                src={teacher.profileImage}
                alt={teacher.name}
                className="mx-auto w-full h-64 object-cover rounded-md shadow-2xl"
              />
              <h4 className="text-xl font-semibold mt-5 text-gray-900">
                {teacher.name}
              </h4>
              <p className="text-gray-600 text-lg">{teacher.designation}</p>
              <div className="mt-4 flex justify-center gap-4">
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
                      className="animate-spin h-5 w-5 text-red-600"
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
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  ) : (
                    <span>Delete</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h4 className="text-2xl font-semibold text-gray-800 mb-4">
            {isEditing ? "Edit Teacher" : "Add Teacher"}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              value={newTeacher.name}
              onChange={(e) =>
                setNewTeacher({ ...newTeacher, name: e.target.value })
              }
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
            />
            <input
              type="text"
              value={newTeacher.designation}
              onChange={(e) =>
                setNewTeacher({ ...newTeacher, designation: e.target.value })
              }
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Designation"
            />
            <input
              type="file"
              name="profileImage"
              onChange={(e) => setProfileImage(e.target.files[0])}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mt-4">
            <button
              disabled={isLoading}
              onClick={isEditing ? handleSaveTeacher : handleAddTeacher}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isEditing ? "Save Changes" : "Add Teacher"}
              {isLoading && (
                <svg
                  className="animate-spin ml-2 h-5 w-5 text-white"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminAbout;
