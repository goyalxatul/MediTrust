import React, { useState } from "react";
import ExtractFileData from "./ExtractFileData"; // Import ExtractFileData
import { FaCloudUploadAlt } from "react-icons/fa";

const SendFile = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [metadata, setMetadata] = useState(null); // Store extracted metadata

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

  // ✅ Callback to handle metadata extraction
  const handleMetadataExtracted = (selectedFile, extractedMetadata) => {
    setFile(selectedFile); // Set the selected file
    setMetadata(extractedMetadata); // Store metadata
  };

  return (
    <div className="flex flex-col items-center bg-black text-white min-h-screen py-10">
      <div className="bg-gray-900 text-white w-full text-center py-6 text-3xl font-bold shadow-lg">
        Encrypt & Upload File
      </div>

      {/* Extract File Data Component */}
      <ExtractFileData onMetadataExtracted={handleMetadataExtracted} />

      {metadata && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Extracted Metadata:</h3>
          <pre className="text-gray-300">{JSON.stringify(metadata, null, 2)}</pre>
        </div>
      )}

<input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-700 text-white border rounded-lg px-3 py-2 mt-4 focus:outline-none focus:ring-2 focus:ring-white"
        />
      <button
        onClick={encryptFile}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        disabled={!file || !metadata}
      >
        Encrypt & Upload
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {uploadStatus && <p className="text-green-400 text-sm mt-2">{uploadStatus}</p>}
    </div>
  );
};

export default SendFile;
