import React, { useState } from "react";
import ExtractFileData from "./ExtractFileData"; // Import ExtractFileData
import { FaCloudUploadAlt } from "react-icons/fa";

const SendFile = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [metadata, setMetadata] = useState(null); // Store extracted metadata
  const [loading, setLoading] = useState(false); // Loading state

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

  const encryptFile = async () => {
    if (!file) return;
    if (!password) {
      setError("Please enter a password before encrypting the file.");
      return;
    }

    setError("");
    setLoading(true); // Start loading

    const fileBuffer = await file.arrayBuffer();
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

      // Upload the encrypted file
      uploadToBackend(encryptedBlob, file.name);
    } catch (err) {
      setError("Encryption failed. Please try again.");
      setLoading(false); // Stop loading
    }
  };

  const uploadToBackend = async (blob, fileName) => {
    const formData = new FormData();
    formData.append("file", blob, `${fileName}.enc`);

    try {
      const response = await fetch("http://18.217.9.56:5001/upload", {
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
    setLoading(false); // Stop loading after upload
  };

  const handleMetadataExtracted = (selectedFile, extractedMetadata) => {
    setFile(selectedFile); // Set the selected file
    setMetadata(extractedMetadata); // Store metadata
  };

  return (
    <div className="flex flex-col items-center bg-black text-white min-h-screen py-10">
      <div className="bg-black text-white w-full text-center py-6 text-3xl font-semibold shadow-lg rounded-lg mb-6">
        Encrypt & Upload File
      </div>

      {/* Extract File Data Component */}
      <ExtractFileData onMetadataExtracted={handleMetadataExtracted} />

      {metadata && (
        <div className="mt-4 w-full max-w-xl bg-black p-4 rounded-lg shadow-md border border-white">
          <h3 className="text-lg font-semibold mb-2">Extracted Metadata:</h3>
          <pre className="text-white">{JSON.stringify(metadata, null, 2)}</pre>
        </div>
      )}

      <div className="w-full max-w-xl bg-black p-4 rounded-lg mt-6">
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-black text-white border border-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>

      <button
        onClick={encryptFile}
        className="mt-6 bg-white text-black hover:bg-gray-300 px-6 py-3 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-white"
        disabled={!file || !metadata || loading}
      >
        {loading ? "Encrypting..." : "Encrypt & Upload"}
      </button>

      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      {uploadStatus && <p className="text-green-400 text-sm mt-4">{uploadStatus}</p>}
    </div>
  );
};

export default SendFile;
