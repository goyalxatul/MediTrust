import React from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Navbar from "./Components/Navbar";
import SendFilePage from "./Components/SendFilePage";
import FileDownload from "./Components/FileDownload"; // Import File Download Page
import Footer from "./Components/Footer"; // Import Footer Component
import SignOutPage from "./Components/SignOutPage";

const App = () => {
  return (
    <Router>
      <div>
      <SignedOut>
          <Routes>
            <Route path="/" element={<SignOutPage />} /> {/* SignOut Page route */}
          </Routes>
        </SignedOut>
        <SignedIn>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sendfiles" element={<SendFilePage />} />
            <Route path="/download" element={<FileDownload />} /> {/* New Route for File Download */}
          </Routes>
          <Footer /> {/* Add Footer Here */}
        </SignedIn>
      </div>
    </Router>
  );
};

export default App;






