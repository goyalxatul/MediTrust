import React from "react";

const MainGoals = () => {
  return (
    <div className="bg-gray-900 p-8 rounded-3xl flex flex-col md:flex-row items-center md:items-start shadow-lg max-w-6xl mx-auto">
      {/* Left Content */}
      <div className="md:w-1/2 p-6">
        <h2 className="text-3xl font-bold text-white leading-tight">
          Let’s know about our <br /> <span className="text-blue-400">main goal</span>
        </h2>
        <p className="text-gray-300 mt-4 text-sm">
          We aim to offer clear and comprehensive information about our
          services, conditions treated, and treatment options. This ensures that
          patients can make informed decisions about their healthcare.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
          <p className="flex items-center gap-2">
            ✅ <span className="text-green-400">Accessible Information</span>
          </p>
          <p className="flex items-center gap-2">
            ✅ <span className="text-green-400">Building Trust</span>
          </p>
          <p className="flex items-center gap-2">
            ✅ <span className="text-green-400">Patient Engagement</span>
          </p>
          <p className="flex items-center gap-2">
            ✅ <span className="text-green-400">Community Involvement</span>
          </p>
          <p className="flex items-center gap-2">
            ✅ <span className="text-green-400">Health Education</span>
          </p>
          <p className="flex items-center gap-2">
            ✅ <span className="text-green-400">Security and Privacy</span>
          </p>
        </div>
      </div>
      
      {/* Right Image */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src="/docter3.svg"
          alt="Doctor"
          className="w-full max-w-sm rounded-lg shadow-lg border border-gray-700"
        />
      </div>
    </div>
  );
};

export default MainGoals;

