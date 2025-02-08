import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";

const SendFile = () => {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!file || !email) {
      alert("Please upload a file and enter the receiver's email.");
      return;
    }
    console.log("File:", file);
    console.log("Receiver Email:", email);
    console.log("File Password:", password);
    alert("File uploaded securely!");
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10">
      {/* Page Header */}
      <div className="bg-blue-600 text-white w-full text-center py-6 text-3xl font-bold">
        Send File Securely
      </div>

      {/* Upload Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 mt-6 w-full max-w-2xl"
      >
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-6 cursor-pointer hover:bg-gray-50 transition"
        >
          <FaCloudUploadAlt size={50} className="text-blue-500" />
          <p className="text-gray-600">Click to upload or drag and drop</p>
          <p className="text-gray-500 text-sm">(Max Size: 10MB)</p>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.doc,.png,.jpg"
          />
        </label>
        {file && <p className="mt-2 text-green-600">File: {file.name}</p>}

        {/* Receiver's Email */}
        <div className="mt-4">
          <label className="text-gray-700 font-medium">Receiver's Email</label>
          <input
            type="email"
            placeholder="Enter Receiver's Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Set File Password */}
        <div className="mt-4 flex items-center gap-2">
          <div className="w-full">
            <label className="text-gray-700 font-medium">Set File Password</label>
            <input
              type="password"
              placeholder="Set File Password (Optional)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Copy Password Button */}
          {password && (
            <button
              type="button"
              onClick={handleCopyPassword}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mt-6 flex items-center"
            >
              <FiCopy className="mr-2" />
              {copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>

        {/* Security Notice */}
        <p className="text-xs text-gray-500 mt-4">
          🔒 Remember to copy your password and send it to the receiver. Due to
          security policies, we do not store or send passwords.
        </p>

        {/* Submit & Send Now Button Centered */}
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => alert("Sending File...")}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg"
          >
            Send Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendFile;

