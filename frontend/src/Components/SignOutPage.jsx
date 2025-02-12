import { FaSignOutAlt } from "react-icons/fa";
import { SignedOut, SignInButton } from "@clerk/clerk-react";

const Signout = () => {
  return (
    <div 
      className="flex justify-start items-center h-screen w-full bg-cover bg-center px-16"
      style={{ backgroundImage: "url('/e.avif')" }}
    >
      
      <div className="bg-white-100 shadow-xl rounded-2xl p-8 text-left text-gray-600 max-w-md w-full">
        <FaSignOutAlt className="text-6xl text-blue-400" />
        <h2 className="text-3xl font-semibold mt-4">Welcome to Cryptify</h2>
        <p className="text-gray-600">Dive into the World of Safe Share.</p>
        <SignedOut>
          <div className="p-6 rounded-lg mt-4">
            <SignInButton className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
              Login / Sign Up  
            </SignInButton>
          </div>
        </SignedOut>
      </div>
    </div>
  );
};

export default Signout;

