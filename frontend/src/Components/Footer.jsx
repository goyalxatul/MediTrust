import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] text-gray-400 py-12">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Left Section */}
          <div>
            <h2 className="text-white text-2xl font-bold">MediTrust</h2>
            <p className="mt-2 text-sm">
            MediTrust is a secure and innovative encryption & sharing platform designed to streamline medical data management, ensuring privacy, accessibility, and trust between patients, healthcare providers, and institutions. It focuses on encrypted file storage, seamless data sharing, and AI-powered insights to enhance medical decision-making.
            </p>
          </div>
          {/* Middle Section - Links */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-white font-semibold">Home</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-white text-sm">Product</a></li>
              <li><a href="#" className="hover:text-white text-sm">Pricing</a></li>
              <li><a href="#" className="hover:text-white text-sm">Features</a></li>
              <li><a href="#" className="hover:text-white text-sm">Enterprise</a></li>
            </ul>
          </div>

          {/* Right Section - About Us & Resources */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-white font-semibold">About Us</h3>
              <ul className="space-y-1">
                <li><a href="#" className="hover:text-white text-sm">Company</a></li>
                <li><a href="#" className="hover:text-white text-sm">Leadership</a></li>
                <li><a href="#" className="hover:text-white text-sm">Careers</a></li>
                <li><a href="#" className="hover:text-white text-sm">Diversity</a></li>
                <li><a href="#" className="hover:text-white text-sm">Courses</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold">Resources</h3>
              <ul className="space-y-1">
                <li><a href="#" className="hover:text-white text-sm">Forum</a></li>
                <li><a href="#" className="hover:text-white text-sm">Support</a></li>
                <li><a href="#" className="hover:text-white text-sm">App Directory</a></li>
                <li><a href="#" className="hover:text-white text-sm">Partners</a></li>
                <li><a href="#" className="hover:text-white text-sm">Events</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 text-center text-sm border-t border-gray-700 pt-4">
          <p>© 2025 MediTrust. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
 