import React, { useState, useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const SendFile = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const fileInputRef = useRef(null);

  const generateKey = async (password) => {
    const encoder = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );

    return window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: encoder.encode("unique_salt"),
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt"]
    );
  };

  const encryptFile = async (selectedFile) => {
    if (!selectedFile) return;
    if (!password) {
      setError("Please enter a password before encrypting the file.");
      return;
    }

    setFile(selectedFile);
    setError("");

    const fileBuffer = await selectedFile.arrayBuffer();
    const key = await generateKey(password);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    try {
      const encryptedData = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        fileBuffer
      );

      const encryptedBlob = new Blob([iv, new Uint8Array(encryptedData)], {
        type: "application/octet-stream",
      });

      // Send the encrypted file to the backend
      uploadToBackend(encryptedBlob, selectedFile.name);
    } catch (err) {
      setError("Encryption failed. Please try again.");
    }
  };

  const uploadToBackend = async (blob, fileName) => {
    const formData = new FormData();
    formData.append("file", blob, `${fileName}.enc`);

    try {
      const response = await fetch("http://localhost:5001/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setUploadStatus(`File uploaded successfully: ${result.url}`);
      } else {
        setUploadStatus(`Upload failed: ${result.error}`);
      }
    } catch (error) {
      setUploadStatus("Error uploading file. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center bg-black text-white min-h-screen py-10">
      <div className="bg-gray-900 text-white w-full text-center py-6 text-3xl font-bold shadow-lg">
        Encrypt & Upload File
      </div>

      <div className="bg-gray-800 shadow-lg rounded-lg p-6 mt-6 w-full max-w-2xl">
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
          onChange={(e) => encryptFile(e.target.files[0])}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-700 text-white border rounded-lg px-3 py-2 mt-4 focus:outline-none focus:ring-2 focus:ring-white"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {uploadStatus && <p className="text-green-400 text-sm mt-2">{uploadStatus}</p>}
      </div>
    </div>
  );
};

export default SendFile;

