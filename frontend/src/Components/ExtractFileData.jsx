import React, { useState, useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const ExtractFileData = ({ onMetadataExtracted }) => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [metadata, setMetadata] = useState(null);
  const fileInputRef = useRef(null);

  const uploadToFastAPI = async (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setUploadStatus("Uploading file to FastAPI for metadata extraction...");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:8000/extract", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        const extracted = result.extracted_data;
        setMetadata(extracted);
        onMetadataExtracted(selectedFile, extracted);
        setUploadStatus("Metadata extracted successfully.");

        // Send metadata to Node.js backend
        await fetch("http://18.217.9.56:5001/save-metadata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Name: extracted.Name || "Not Found",
            Age: extracted.Age || "Not Found",
            Gender: extracted.Gender || "Not Found",
            Illness: extracted.Illness || "Not Found",
            DoctorName: extracted["Doctor Name"] || "Not Found",
            Prescription: extracted.Prescription || "Not Found"
          }),
        });
      } else {
        setUploadStatus(`Metadata extraction failed: ${result.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setUploadStatus("Error connecting to the server. Please try again.");
    }
  };

  return (
    <div className="bg-blackshadow-lg rounded-lg p-6 w-full max-w-2xl">
      <div
        className="border-2 border-dashed border-gray-500 p-10 text-center cursor-pointer hover:border-white transition"
        onClick={() => fileInputRef.current.click()}
      >
        <FaCloudUploadAlt className="text-gray-400 text-5xl mx-auto" />
        <p className="text-gray-300 mt-2">Click to select a file</p>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => uploadToFastAPI(e.target.files[0])}
      />

      {uploadStatus && <p className="text-green-400 text-sm mt-4">{uploadStatus}</p>}

      
    </div>
  );
};

export default ExtractFileData;

