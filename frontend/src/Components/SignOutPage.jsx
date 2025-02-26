import { SignedOut, SignInButton } from "@clerk/clerk-react";
import EncryptData from "./EncryptData"; // Importing EncryptData button

const GetStarted = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white text-center px-6">
      {/* Welcome Message */}
      <h1 className="text-4xl font-bold mb-4">Welcome to <span className="text-blue-500">MediTrust</span></h1>
      <p className="text-gray-400 text-lg mb-8">Upload. Encrypt. Share Securely.</p>

      {/* Sign-In & Encrypt Button */}
      <SignedOut>
        <SignInButton>
          <div>
            <EncryptData /> {/* Styled button for secure action */}
          </div>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default GetStarted;






