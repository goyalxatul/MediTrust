"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const options = [
  { label: "Collaborate", content: "~ Replace this with a demo of your product 🚀" },
  { label: "Encrypt", content: "~ Replace this with a demo of your product 🚀" },
  { label: "Share", content: "~ Replace this with a demo of your product 🚀" },
]

export default function TerminalUI() {
  const [active, setActive] = useState(options[2])

  return (
    <div className="flex flex-col md:flex-row h-screen items-center justify-center bg-[#1B1E2B] p-4">
      {/* Terminal Window */}
      <div className="md:w-2/3 bg-[#1B1E2B] rounded-lg shadow-xl w-full h-[500px] relative overflow-hidden border border-gray-800">
        {/* Window Controls */}
        <div className="h-8 w-full bg-[#1B1E2B] border-b border-gray-800 flex items-center px-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-[#4ADE80] text-lg"
          >
            {active.content}
          </motion.p>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="md:w-1/3 w-full flex justify-center mt-6 md:mt-0 md:ml-6">
        <div className="bg-gray-100/5 rounded-lg p-4 w-full max-w-[200px]">
          <div className="space-y-6">
            {options.map((item, index) => (
              <motion.p
                key={index}
                className={`text-xl cursor-pointer transition-all ${
                  active.label === item.label ? "text-[#9D5CFF] font-medium" : "text-gray-400 hover:text-gray-300"
                }`}
                whileHover={{ scale: 1.05, x: 6 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActive(item)}
              >
                {item.label}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

