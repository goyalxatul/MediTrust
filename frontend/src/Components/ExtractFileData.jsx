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
        setMetadata(result.extracted_data);
        onMetadataExtracted(selectedFile, result.extracted_data); // Pass metadata to parent
        setUploadStatus("Metadata extracted successfully.");
      } else {
        setUploadStatus(`Metadata extraction failed: ${result.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Fetch error:", error); // Log error for debugging
      setUploadStatus("Error connecting to the server. Please try again.");
    }
  };

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-2xl">
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

      {metadata && (
        <div className="bg-gray-700 text-white p-4 mt-4 rounded">
          <h3 className="text-lg font-bold">Extracted Metadata:</h3>
          <p><strong>Name:</strong> {metadata.Name || "Not Found"}</p>
          <p><strong>Age:</strong> {metadata.Age || "Not Found"}</p>
          <p><strong>Gender:</strong> {metadata.Gender || "Not Found"}</p>
          <p><strong>Illness:</strong> {metadata.Illness || "Not Found"}</p>
          <p><strong>Doctor Name:</strong> {metadata["Doctor Name"] || "Not Found"}</p>
          <p><strong>Prescription:</strong> {metadata.Prescription || "Not Found"}</p>
        </div>
      )}
    </div>
  );
};

export default ExtractFileData;
