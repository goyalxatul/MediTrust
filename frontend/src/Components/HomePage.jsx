import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="min-h-screen flex flex-col">
      <SignedIn>
        <div className="container text-center mt-10 px-4">
          <h1 className="text-4xl font-bold">
            The Only Tool You Need To <br /> Send Your Files Securely
          </h1>
          <p className="text-lg text-gray-700 mt-4">
            Send your files and photos{" "}
            <span className="font-semibold text-blue-600">SECURELY</span> with EncryptShare 
            <br />
            <span className="font-semibold text-blue-600">ANYTIME</span> and{" "}
            <span className="font-semibold text-blue-600">ANYWHERE</span> in the world.
          </p>

          {/* Button Navigates to /sendfiles */}
          <button
            onClick={() => navigate("/sendfiles")}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            Go To The App
          </button>

          {/* Feature Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            <div className="text-center">
              <img src="/a.png" alt="Security" className="mx-auto w-12 h-12"/>
              <h3 className="text-xl font-semibold mt-2">High Security</h3>
              <p className="text-gray-600">Your files are encrypted end-to-end for maximum security.</p>
            </div>
            <div className="text-center">
              <img src="/b.png" alt="Speed" className="mx-auto w-12 h-12"/>
              <h3 className="text-xl font-semibold mt-2">Speed Transfer</h3>
              <p className="text-gray-600">Share files instantly with optimized transfer speeds.</p>
            </div>
            <div className="text-center">
              <img src="/c.png" alt="Share" className="mx-auto w-12 h-12"/>
              <h3 className="text-xl font-semibold mt-2">Easy Share</h3>
              <p className="text-gray-600">Simple and intuitive interface for hassle-free file sharing.</p>
            </div>
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">Please Sign In</h1>
          <SignInButton redirectUrl="/">
            <button className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition">
              Let's Go
            </button>
          </SignInButton>
        </div>
      </SignedOut>
    </div>
  );
}

