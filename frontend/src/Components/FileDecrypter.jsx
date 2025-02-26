import React, { useState, useRef } from "react";
import { FaLockOpen } from "react-icons/fa";

const FileDecryption = () => {
  const [file, setFile] = useState(null);
  const [decryptedFile, setDecryptedFile] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  // Generate cryptographic key
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
      ["decrypt"]
    );
  };

  // Decrypt the file
  const decryptFile = async (selectedFile) => {
    if (!selectedFile) return;
    if (!password) {
      setError("Please enter a password to decrypt the file.");
      return;
    }

    setFile(selectedFile);
    setError("");

    const fileBuffer = await selectedFile.arrayBuffer();

    try {
      // Extract IV (first 12 bytes) and encrypted content
      const iv = new Uint8Array(fileBuffer.slice(0, 12)); // First 12 bytes = IV
      const encryptedData = fileBuffer.slice(12); // Remaining bytes = Encrypted Data

      // Generate the key using the password
      const key = await generateKey(password);

      // Decrypt the data
      const decryptedData = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        encryptedData
      );

      // Convert decrypted data into a Blob
      const decryptedBlob = new Blob([decryptedData], { type: "application/octet-stream" });
      const decryptedUrl = URL.createObjectURL(decryptedBlob);

      setDecryptedFile(decryptedUrl);
    } catch (err) {
      setError("Decryption failed. Incorrect password or corrupted file.");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10">
      <div className="bg-green-600 text-white w-full text-center py-6 text-3xl font-bold">
        Decrypt & Download File
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-full max-w-2xl">
        <div
          className="border-2 border-dashed border-gray-300 p-10 text-center cursor-pointer hover:border-green-600 transition"
          onClick={() => fileInputRef.current.click()}
        >
          <FaLockOpen className="text-gray-400 text-5xl mx-auto" />
          <p className="text-gray-500 mt-2">Click to select an encrypted file</p>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => decryptFile(e.target.files[0])}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-4"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {decryptedFile && (
          <a
            href={decryptedFile}
            download={file?.name.replace(".enc", "")}
            className="block mt-4 text-green-600 font-medium"
          >
            Download Decrypted File
          </a>
        )}
      </div>
    </div>
  );
};

export default FileDecryption;






































