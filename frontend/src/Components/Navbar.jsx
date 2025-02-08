import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <SignedIn>
      <nav className="bg-white py-4 px-6 flex items-center justify-between">
        {/* Left - Logo */}
        <div className="text-2xl font-bold text-gray-900">Cryptify</div>

        {/* Middle - Navigation Links (Centered) */}
        <div className="flex-grow flex justify-center space-x-6">
          <Link to="/" className="text-lg font-medium text-gray-700 hover:text-blue-500">
            Home
          </Link>
          <Link to="/sendfiles" className="text-lg font-medium text-gray-700 hover:text-blue-500">
            Send File
          </Link>
          <Link to="/download" className="text-lg font-medium text-gray-700 hover:text-blue-500">
            Download
          </Link>
        </div>

        {/* Right - User Profile */}
        <div className="flex items-center">
          <UserButton />
        </div>
      </nav>
    </SignedIn>
  );
}

