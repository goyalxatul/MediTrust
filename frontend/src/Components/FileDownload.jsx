import { useState } from "react";

const FileDownload = () => {
  const [fileId, setFileId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleDownload = () => {
    // Implement file download & decryption logic here
    alert(`Downloading file: ${fileId} with decryption password.`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-blue-600">
          File Download & Decrypt
        </h2>
        <p className="text-center text-gray-500 text-sm">Secure File Sharing</p>

        <div className="mt-4">
          <label className="block text-gray-600 mb-1">Enter File ID</label>
          <input
            type="text"
            value={fileId}
            onChange={(e) => setFileId(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter File ID"
          />
        </div>

        <div className="mt-4 relative">
          <label className="block text-gray-600 mb-1">Set File Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter File Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-9 text-gray-600"
          >
            👁️
          </button>
        </div>

        <button
          onClick={handleDownload}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          DOWNLOAD AND DECRYPT
        </button>
      </div>
    </div>
  );
};

export default FileDownload;
