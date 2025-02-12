import React, { useState, useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AiOutlineFile } from "react-icons/ai";
import CryptoJS from "crypto-js";
import axios from "axios";

const SendFile = () => {
  const [file, setFile] = useState(null);
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef(null);

  // Handle Drag and Drop
  const handleDragOver = (event) => event.preventDefault();
  const handleDrop = (event) => {
    event.preventDefault();
    handleFileChange(event.dataTransfer.files[0]);
  };

  const handleFileSelect = () => fileInputRef.current.click();

  const handleFileChange = (selectedFile) => {
    if (!selectedFile) return;

    if (!password) {
      setError("Please enter a password before encrypting the file.");
      return;
    }

    setFile(selectedFile);
    setError("");

    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);

    reader.onload = (e) => {
      const fileData = new Uint8Array(e.target.result);
      const wordArray = CryptoJS.lib.WordArray.create(fileData);

      // Encrypt the file
      const encrypted = CryptoJS.AES.encrypt(wordArray, password).toString();
      const metadata = JSON.stringify({ name: selectedFile.name, type: selectedFile.type });

      const finalData = btoa(unescape(encodeURIComponent(metadata))) + "::" + encrypted;
      const encryptedBlob = new Blob([finalData], { type: "text/plain" });

      const encryptedUrl = URL.createObjectURL(encryptedBlob);
      setEncryptedFile(encryptedUrl);
    };
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("password", password);

    try {
      const response = await axios.post("http://localhost:5001/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percent);
        },
      });

      setSuccess(response.data.message);
      setFile(null);
      setPassword("");
    } catch (err) {
      setError("File upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10">
      <div className="bg-blue-600 text-white w-full text-center py-6 text-3xl font-bold">
        Encrypt & Upload File Securely
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-full max-w-2xl">
        <div
          className="border-2 border-dashed border-gray-300 p-10 text-center cursor-pointer hover:border-blue-600 transition"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleFileSelect}
        >
          <FaCloudUploadAlt className="text-gray-400 text-5xl mx-auto" />
          <p className="text-gray-500 mt-2">Drag & drop your file here, or click to browse</p>
        </div>

        <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => handleFileChange(e.target.files[0])} />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-4"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {uploading && (
          <div className="w-full bg-gray-200 rounded mt-4">
            <div
              className="bg-blue-600 text-xs font-medium text-center p-1 leading-none rounded"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        )}

        <button
          onClick={handleUpload}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <FaCloudUploadAlt className="mr-2" /> Upload to S3
        </button>

        {encryptedFile && (
          <a href={encryptedFile} download={`${file?.name}.enc`} className="block mt-4 text-blue-600 font-medium">
            Download Encrypted File
          </a>
        )}

        {success && <p className="text-green-600 mt-2">{success}</p>}
      </div>
    </div>
  );
};

export default SendFile;








