import React, { useState } from "react";
import CryptoJS from "crypto-js";

const DecryptFile = () => {
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [password, setPassword] = useState("");
  const [decryptedFile, setDecryptedFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    setEncryptedFile(selectedFile);
    setError("");
  };

  const handleDecrypt = () => {
    if (!encryptedFile || !password) {
      setError("Please select a file and enter the password.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const fileContent = e.target.result;
        const [metadataBase64, encryptedText] = fileContent.split("::");

        // Decode metadata
        const metadata = JSON.parse(decodeURIComponent(escape(atob(metadataBase64))));
        const { name, type } = metadata;

        // Decrypt file data
        const decrypted = CryptoJS.AES.decrypt(encryptedText, password);
        const decryptedBytes = decrypted.sigBytes ? decrypted.toString(CryptoJS.enc.Latin1) : null;

        if (!decryptedBytes) {
          throw new Error("Incorrect password or corrupted file.");
        }

        // Convert back to original binary format
        const byteArray = new Uint8Array(decryptedBytes.split("").map((char) => char.charCodeAt(0)));
        const blob = new Blob([byteArray], { type });

        // Generate download link
        const url = URL.createObjectURL(blob);
        setDecryptedFile({ url, name });
        setError("");
      } catch (error) {
        setError("Decryption failed. Ensure the password is correct.");
      }
    };

    reader.readAsText(encryptedFile);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10">
      <div className="bg-red-600 text-white w-full text-center py-6 text-3xl font-bold">
        Decrypt File Securely
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-full max-w-2xl">
        <input type="file" onChange={handleFileChange} className="mb-4" />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button onClick={handleDecrypt} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
          Decrypt File
        </button>

        {decryptedFile && (
          <a href={decryptedFile.url} download={decryptedFile.name} className="block mt-4 text-blue-600 font-medium">
            Download Decrypted File
          </a>
        )}
      </div>
    </div>
  );
};

export default DecryptFile;







