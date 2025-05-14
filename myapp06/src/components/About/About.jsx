import React from "react";

const teachers = [
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

const About = () => {
  return (
    <section className="bg-gray-100 py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* About Us Heading with Extra Space */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-700 text-center uppercase tracking-wide pt-16 sm:pt-24 pb-16">
          About Us
        </h2>

        {/* School Info Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-20">
          {/* Left: School Image with Larger Size & Shadow */}
          <div className="sm:w-1/3 flex justify-center sm:justify-start mb-10 sm:mb-0">
            <img
              src="https://via.placeholder.com/500x500" // Replace with actual school image
              alt="School"
              className="rounded-lg shadow-2xl w-full sm:w-[450px] sm:h-[400px] object-cover border-4 border-blue-500"
            />
          </div>

          {/* Right: School Description */}
          <div className="sm:w-2/3 sm:pl-16 text-center sm:text-left">
            <h2 className="text-2xl sm:text-4xl font-bold text-blue-900 mb-6 sm:mb-8">
              Welcome to Greenwood International School
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              At <strong>Greenwood International School</strong>, we nurture young
              minds, foster creativity, and build future leaders. With a team
              of dedicated educators, we provide a well-rounded learning
              experience that blends academics, sports, and values.
            </p>
          </div>
        </div>

        {/* Faculty Section */}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
