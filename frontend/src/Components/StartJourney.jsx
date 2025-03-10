import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StartJourney = () => {
  const [city, setCity] = useState("");
  const [hospital, setHospital] = useState("");
  const navigate = useNavigate();

  const handleCityChange = (e) => setCity(e.target.value);
  const handleHospitalChange = (e) => setHospital(e.target.value);

  const handleProceed = () => {
    // You can store city/hospital in a context or pass them via route state if needed
    navigate("/sendfiles");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Select Your City</h1>
      <select
        value={city}
        onChange={handleCityChange}
        className="mb-4 px-4 py-2 rounded bg-gray-800 text-white"
      >
        <option value="">-- Choose City --</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Delhi">Delhi</option>
        <option value="Bengaluru">Bengaluru</option>
        <option value="Kolkata">Kolkata</option>
        <option value="Chennai">Chennai</option>
      </select>

      {city && (
        <>
          <h2 className="text-xl font-semibold mb-4">
            Select Hospital in {city}
          </h2>
          <select
            value={hospital}
            onChange={handleHospitalChange}
            className="mb-4 px-4 py-2 rounded bg-gray-800 text-white"
          >
            <option value="">-- Choose Hospital --</option>
            {/* Hard-code or dynamically fetch hospital list based on city */}
            <option value={`${city} Hospital A`}>{city} Hospital A</option>
            <option value={`${city} Hospital B`}>{city} Hospital B</option>
            <option value={`${city} Hospital C`}>{city} Hospital C</option>
          </select>
        </>
      )}

      <button
        onClick={handleProceed}
        disabled={!hospital}
        className={`mt-6 px-6 py-3 text-lg font-semibold rounded-full shadow-lg transition ${
          hospital
            ? "bg-blue-600 hover:bg-blue-500"
            : "bg-gray-600 cursor-not-allowed"
        }`}
      >
        Proceed
      </button>
    </div>
  );
};

export default StartJourney;
