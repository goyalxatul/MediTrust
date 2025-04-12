import React, { useState, useRef } from "react";
import { FaLockOpen } from "react-icons/fa";

const FileDecryption = () => {
  const [file, setFile] = useState(null);
  const [decryptedFile, setDecryptedFile] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
      ["decrypt"]
    );
  };

  const decryptFile = async (selectedFile) => {
    if (!selectedFile) return;
    if (!password) {
      setError("Please enter a password to decrypt the file.");
      return;
    }

    setFile(selectedFile);
    setError("");

    try {
      const fileBuffer = await selectedFile.arrayBuffer();

      if (fileBuffer.byteLength < 12) {
        throw new Error("Invalid encrypted file. The file is too small.");
      }

      const iv = new Uint8Array(fileBuffer.slice(0, 12));
      const encryptedData = fileBuffer.slice(12);

      if (iv.length !== 12) {
        throw new Error("Invalid IV length. Expected 12 bytes.");
      }

      const key = await generateKey(password);

      const decryptedData = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        encryptedData
      );

      const decryptedBlob = new Blob([decryptedData], {
        type: "application/octet-stream",
      });

      const cleanFileName = selectedFile.name
        .replace(/\(\d+\)\.enc$/, "")
        .replace(/\.enc$/, "")
        .trim();

      const decryptedUrl = URL.createObjectURL(decryptedBlob);

      setDecryptedFile({ url: decryptedUrl, name: cleanFileName });
    } catch (err) {
      console.error("Decryption error:", err);
      setError(
        "Decryption failed. Incorrect password, corrupted file, or mismatched encryption method."
      );
    }
  };

  return (
    <div className="flex flex-col items-center bg-black text-white min-h-screen py-10">
      <div className="bg-black text-white w-full text-center py-6 text-3xl font-bold">
        Decrypt & Download File
      </div>

      <div className="bg-black shadow-lg rounded-lg p-6 mt-6 w-full max-w-2xl">
        <div
          className="border-2 border-dashed border-gray-600 p-10 text-center cursor-pointer hover:border-white transition"
          onClick={() => fileInputRef.current.click()}
        >
          <FaLockOpen className="text-gray-400 text-5xl mx-auto" />
          <p className="text-gray-300 mt-2">Click to select an encrypted file</p>
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
          className="w-full border border-gray-600 bg-black text-white rounded-lg px-3 py-2 mt-4"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {decryptedFile && (
          <a
            href={decryptedFile.url}
            download={decryptedFile.name}
            className="block mt-4 text-green-400 font-medium hover:text-green-300"
          >
            Download Decrypted File
          </a>
        )}
      </div>
    </div>
  );
};

export default FileDecryption;



































