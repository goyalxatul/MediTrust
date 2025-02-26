"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Share2, BrainCircuit, ChevronLeft, ChevronRight } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: <Lock className="w-12 h-12 text-blue-500" />, 
    title: "Upload Medical Documents Securely",
    description: "Easily upload and encrypt your medical records, ensuring complete privacy and security.",
  },
  {
    id: 2,
    icon: <Share2 className="w-12 h-12 text-blue-500" />, 
    title: "Share Securely with Doctors",
    description: "Grant access to your trusted healthcare professionals with encrypted, read-only permissions.",
  },
  {
    id: 3,
    icon: <BrainCircuit className="w-12 h-12 text-blue-500" />, 
    title: "AI-Powered Health Insights",
    description: "AI scans your medical history, providing predictive insights for better diagnosis and treatment.",
  },
];

const MediTrustFeatureDemo = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => (prev + 1) % steps.length);
  const prevStep = () => setStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));

  return (
    <section className="bg-gradient-to-br bg-black text-white min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-4xl text-center relative">
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How <span className="text-blue-500">MediTrust</span> Works
        </motion.h2>
        <p className="text-gray-400 mb-8">Secure, share, and gain insights from your medical data with ease.</p>

        {/* Step Content with Arrows on Both Sides */}
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            className="absolute left-[-3rem] w-12 h-12 flex items-center justify-center rounded-full bg-white text-black shadow-md hover:bg-gray-100 transition duration-300"
            onClick={prevStep}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 rounded-xl p-8 shadow-lg w-3/4"
            >
              <motion.div
                className="mb-6 flex justify-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {steps[step].icon}
              </motion.div>
              <h3 className="text-2xl font-semibold mb-4">{steps[step].title}</h3>
              <p className="text-gray-400">{steps[step].description}</p>
            </motion.div>
          </AnimatePresence>

          {/* Right Arrow */}
          <button
            className="absolute right-[-3rem] w-12 h-12 flex items-center justify-center rounded-full bg-white text-black shadow-md hover:bg-gray-100 transition duration-300"
            onClick={nextStep}
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2 mt-6">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-8 rounded-full ${index === step ? "bg-blue-500" : "bg-gray-700"}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediTrustFeatureDemo;





