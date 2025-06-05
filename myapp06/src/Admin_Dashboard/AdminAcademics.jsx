import React, { useEffect, useState } from "react";
import axios from "axios";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function AdminAcademics() {
  const [heroImage, setHeroImage] = useState(null);
  const [heroText, setHeroText] = useState("");
  const [heroSections, setHeroSections] = useState({
    images: [],
    texts: []
  });

  const [classes, setClasses] = useState([]);
  const [selectedClassIndex, setSelectedClassIndex] = useState(null);

  // For new class, allow free text
  const [newClassName, setNewClassName] = useState("");

  // Timetable entry states
  const [newEntryDay, setNewEntryDay] = useState(weekdays[0]);
  const [newEntrySubject, setNewEntrySubject] = useState("");
  const [newEntryTime, setNewEntryTime] = useState("");
  const [newEntryPeriod, setNewEntryPeriod] = useState("AM");

  const [selectedClassData, setSelectedClassData] = useState({});
  const [selectedClassTimeTable, setSelectedClassTimeTable] = useState({});

  const handleAddHeroSection = async () => {
    if (!heroImage || !heroText.trim()) return alert("Please provide image and text.");

    if(heroSections.images.length >= 3) {
      return alert("Maximum 3 images are allowed");
    }

    const data = new FormData();
    data.append("text", heroText);
    data.append("heroSectionImage", heroImage);

    try {
      const res = await axios.post('/api/academic/herosection', data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      console.log(res?.data?.result);
      setHeroSections(res?.data?.result);
    } catch (error) {
      console.log(error);
    } finally {
      setHeroText("");
      setHeroImage(null);
    }
  };

  const handleGetHeroSection = async () => {
    try {
      const res = await axios.get('/api/academic/herosection');
      console.log(res);
      setHeroSections(res?.data?.result);
    } catch (error) {
      console.log("Error getting hero section images", error);
    }
  }

  useEffect(() => {
    handleGetHeroSection();
  }, [])

  useEffect(() => {
    console.log("Hero section updated.")
  }, [heroSections])

  const handleDeleteHero = async (index) => {
    try {
      const res = await axios.delete(`/api/academic/herosection/${index}`);
      console.log(res);
      setHeroSections(res?.data?.result);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteClass = async (index) => {
    const id = classes[index]?.id
    console.log(id);

    try {
      const res = await axios.delete(`/api/academic/class/${id}`);
      const result = res?.data?.result;

      const grouped = [];

      result.forEach(cls => {
        const clsName = cls.className;
        const timeTable = cls.timeTable;
        const id = cls._id

        grouped.push({
          className: clsName,
          timeTable: timeTable,
          id: id
        })
      });

      setClasses(grouped);
      setSelectedClassIndex(null);
    } catch (error) {
      console.log(error);
    }
  };

  const addTimetableEntry = async () => {
    const id = classes[selectedClassIndex]?.id;

    if(!newEntrySubject) {
      return alert("Subject name is required.")
    }
    if(!newEntryTime) {
      return alert("Time is required")
    }

    const data = {
      subject: newEntrySubject,
      time: `${newEntryTime} ${newEntryPeriod}`,
      day: newEntryDay
    }

    try {
      const res = await axios.patch(`/api/academic/class/${id}`, data);
      const updatedTimeTable = res?.data?.result?.timeTable;
      setClasses(prev =>
        prev.map((cls, idx) =>
          idx === selectedClassIndex
            ? { ...cls, timeTable: updatedTimeTable }
            : cls
        )
      );
      setSelectedClassTimeTable(res?.data?.result?.timeTable);
    } catch (error) {
      console.log(error);
    } finally {
      setNewEntrySubject("");
      setNewEntryTime("");
    }
  };

  useEffect(() => {
    console.log("time table updated")
  }, [selectedClassTimeTable])

  const handleDeleteTimetableEntry = async (day, index) => {
    const id = classes[selectedClassIndex]?.id;

    const data = {
      day: day,
      idx: index
    }

    try {
      const res = await axios.delete(`/api/academic/class/${id}/${data.day}/${data.idx}`);
      console.log(res);

      const grouped = {
        className: res?.data?.result?.className,
        timeTable: res?.data?.result?.timeTable,
        id: res?.data?.result?._id
      }

      setClasses(prev => prev.map(classItem => {
        if(classItem.id === grouped.id) {
          return grouped
        } else {
          return classItem
        }
      }));
      setSelectedClassTimeTable(grouped.timeTable);
    } catch (error) {
      console.log(error)
    }
  };

  const handleCreateClass = async () => {
    const trimmedName = newClassName.trim();
    if (!trimmedName) return alert("Enter a class name.");
    if (classes.some((c) => c.className.toLowerCase() === trimmedName.toLowerCase()))
      return alert("Class already exists.");

    const temp = newClassName.toUpperCase();
    const data = `${temp}`

    const dataToSend = {
      className: data
    }

    console.log(data);

    try {
      const res = await axios.post('/api/academic/class', dataToSend);

      const grouped = {
        className: res?.data?.classData?.className,
        timeTable: res?.data?.classData?.timeTable,
        id: res?.data?.classData?._id
      }

      setClasses(prev => [...prev, grouped]);
      setSelectedClassData(res?.data?.classData);
      setNewClassName("");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(classes);
    console.log("Classes updated")
  }, [classes])

  const handleGetClassTimeTable = async () => {
    try {
      const res = await axios.get('/api/academic/class');
      const result = res?.data?.result || [];

      const grouped = [];

      result.forEach(cls => {
        const clsName = cls.className;
        const timeTable = cls.timeTable;
        const id = cls._id

        grouped.push({
          className: clsName,
          timeTable: timeTable,
          id: id
        })
      });

      setClasses(grouped);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetClassTimeTable();
  }, [])

  const handleShowClassTimeTable = (i) => {
    setSelectedClassIndex(i);
    setSelectedClassTimeTable(classes[i]?.timeTable);
    console.log(classes[i]?.timeTable);
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Admin Academics</h1>

      {/* Hero Section */}
      <div className="border p-4 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Hero Section</h2>
        <input 
          id="heroSectionImage"
          type="file" 
          name="heroSectionImage"
          accept="image/*"
          onChange={(e) => setHeroImage(e.target.files[0])} 
        />
        <input
          type="text"
          value={heroText}
          onChange={(e) => setHeroText(e.target.value)}
          placeholder="Enter Text"
          className="border p-2 w-full"
        />
        <button onClick={handleAddHeroSection} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Hero Section
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {heroSections?.images.map((img, i) => (
            <div key={i} className="relative border rounded overflow-hidden">
              <img src={img} alt="Hero" className="w-full h-48 object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-lg font-bold">
                {heroSections?.texts?.[i] || ""}
              </div>
              <div className="absolute top-2 right-2 space-x-2">
                <button onClick={() => handleDeleteHero(i)} className="bg-red-500 px-2 py-1 rounded text-white">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Class Management */}
      <div className="border p-4 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Classes</h2>
        <input
          type="text"
          placeholder="Enter new class name (e.g. 7, 8, 9)"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
          className="border p-2 w-48"
        />

        <button onClick={handleCreateClass} className="bg-green-600 text-white px-4 py-2 rounded ml-2">
          Add Class
        </button>

        <div className="flex flex-wrap gap-2 mt-4">
          {classes.map((cls, i) => (
            <div key={i} className="flex items-center space-x-1">
              <button
                className={`px-4 py-2 border rounded ${selectedClassIndex === i ? "bg-blue-600 text-white" : ""}`}
                onClick={() => handleShowClassTimeTable(i)}
              >
                Class {cls.className}
              </button>
              <button onClick={() => deleteClass(i)} className="text-red-500">✖</button>
            </div>
          ))}
        </div>
      </div>

      {/* Timetable */}
      {selectedClassIndex !== null && (
        <div className="border p-4 rounded shadow space-y-4">
          <h2 className="text-xl font-semibold mb-4">Timetable Entry</h2>
          <div className="flex gap-2 flex-wrap">
            <select value={newEntryDay} onChange={(e) => setNewEntryDay(e.target.value)} className="border p-2">
              {weekdays.map((day) => (
                <option key={day}>{day}</option>
              ))}
            </select>
            <input
              value={newEntrySubject}
              onChange={(e) => setNewEntrySubject(e.target.value)}
              placeholder="Subject"
              className="border p-2"
            />
            <input
              type="time"
              value={newEntryTime}
              onChange={(e) => setNewEntryTime(e.target.value)}
              className="border p-2"
            />
            <select value={newEntryPeriod} onChange={(e) => setNewEntryPeriod(e.target.value)} className="border p-2">
              <option>AM</option>
              <option>PM</option>
            </select>
            <button onClick={addTimetableEntry} className="bg-indigo-600 text-white px-4 py-2 rounded">
              Add
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Timetable for {newEntryDay}</h3>
            <table className="w-full table-auto border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Subject</th>
                  <th className="border p-2">Time</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedClassTimeTable[newEntryDay]?.length > 0 ? (
                  selectedClassTimeTable[newEntryDay].map((entry, idx) => (
                    <tr key={`${newEntryDay}-${idx}`}>
                      <td className="border p-2">{entry.subjectName}</td>
                      <td className="border p-2">{entry.timing}</td>
                      <td className="border p-2 space-x-2">
                          <button onClick={() => handleDeleteTimetableEntry(newEntryDay, idx)} className="text-red-600 text-center">
                            Delete
                          </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center p-4">No entries</td>
                  </tr>
                )}
                {selectedClassData.timeTable?.[newEntryDay].length === 0 && (
                  <tr><td colSpan={3} className="text-center p-4">No entries</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}