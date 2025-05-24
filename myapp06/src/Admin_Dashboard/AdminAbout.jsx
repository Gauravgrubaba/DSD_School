import React, { useState } from "react";

const initialTeachers = [
  {
    name: "Mr. Anil Sharma",
    designation: "Principal",
    image: "https://via.placeholder.com/200x250",
  },
  {
    name: "Ms. Neha Verma",
    designation: "Vice Principal",
    image: "https://via.placeholder.com/200x250",
  },
  {
    name: "Mr. Rajesh Kumar",
    designation: "Mathematics Teacher",
    image: "https://via.placeholder.com/200x250",
  },
  {
    name: "Ms. Pooja Singh",
    designation: "Science Teacher",
    image: "https://via.placeholder.com/200x250",
  },
];

const AdminAbout = () => {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    designation: "",
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [schoolInfo, setSchoolInfo] = useState({
    name: "Greenwood International School",
    description:
      "At Greenwood International School, we nurture young minds, foster creativity, and build future leaders. With a team of dedicated educators, we provide a well-rounded learning experience that blends academics, sports, and values.",
    image: "https://via.placeholder.com/500x500",
  });

  const [tempSchoolInfo, setTempSchoolInfo] = useState({ ...schoolInfo });
  const [editSchool, setEditSchool] = useState(false);

  const [maxWords, setMaxWords] = useState(50);

  const handleWordLimitChange = (e) => {
    setMaxWords(Number(e.target.value));
  };

  const handleSchoolInfoChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "description") {
      const words = value.split(" ");
      if (words.length > maxWords) {
        updatedValue = words.slice(0, maxWords).join(" ") + " ...";
      }
    }

    setTempSchoolInfo({ ...tempSchoolInfo, [name]: updatedValue });
  };

  const handleSchoolImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempSchoolInfo({ ...tempSchoolInfo, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSchool = () => {
    setSchoolInfo({ ...tempSchoolInfo });
    setEditSchool(false);
  };

  const handleDeleteSchoolInfo = () => {
    setTempSchoolInfo({
      name: "",
      description: "",
      image: "",
    });
  };

  const handleTeacherImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTeacher({ ...newTeacher, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTeacher = () => {
    if (newTeacher.name && newTeacher.designation && newTeacher.image) {
      setTeachers([...teachers, newTeacher]);
      setNewTeacher({ name: "", designation: "", image: "" });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleEditTeacher = (index) => {
    setIsEditing(true);
    setEditingIndex(index);
    setNewTeacher(teachers[index]);
  };

  const handleSaveTeacher = () => {
    const updatedTeachers = [...teachers];
    updatedTeachers[editingIndex] = newTeacher;
    setTeachers(updatedTeachers);
    setNewTeacher({ name: "", designation: "", image: "" });
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleDeleteTeacher = (index) => {
    const updatedTeachers = teachers.filter((_, i) => i !== index);
    setTeachers(updatedTeachers);
  };

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
              src={tempSchoolInfo.image || "https://via.placeholder.com/500x500"}
              alt="School"
              className="rounded-lg shadow-xl w-full sm:w-[450px] sm:h-[400px] object-cover border-4 border-blue-500"
            />
            {editSchool && (
              <>
                <input
                  type="file"
                  onChange={handleSchoolImageChange}
                  className="mt-4"
                  key={Math.random()}
                />
                <button
                  onClick={() => document.querySelector('input[type="file"]').click()}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
                >
                  Browse Image
                </button>
              </>
            )}
          </div>

          <div className="sm:w-2/3 sm:pl-16">
            {editSchool ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={tempSchoolInfo.name}
                  onChange={handleSchoolInfoChange}
                  className="text-2xl sm:text-4xl font-bold text-blue-900 border-2 border-blue-400 rounded-lg px-4 py-2 bg-white shadow-md w-full mb-4"
                />
                <textarea
                  name="description"
                  value={tempSchoolInfo.description}
                  onChange={handleSchoolInfoChange}
                  rows={5}
                  className="text-gray-700 text-base sm:text-lg leading-relaxed border border-gray-300 rounded-lg p-4 w-full mb-4"
                />
                <div className="flex gap-4">
                  <button
                    onClick={handleSaveSchool}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-800"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleDeleteSchoolInfo}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-800"
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl sm:text-4xl font-bold text-blue-900 mb-4">
                  {schoolInfo.name}
                </h2>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
                  {schoolInfo.description}
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

        <div className="flex items-center justify-between mb-4">
          <label className="text-lg font-semibold text-gray-700">
            Set Description Word Limit:
          </label>
          <input
            type="number"
            value={maxWords}
            onChange={handleWordLimitChange}
            className="p-2 border border-gray-300 rounded-lg"
            min="1"
          />
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
                src={teacher.image}
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
                  Delete
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
              onChange={handleTeacherImageChange}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mt-4">
            <button
              onClick={isEditing ? handleSaveTeacher : handleAddTeacher}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition-all duration-300"
            >
              {isEditing ? "Save Changes" : "Add Teacher"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminAbout;
