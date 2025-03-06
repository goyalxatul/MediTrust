import { FaSignInAlt, FaNotesMedical, FaRobot } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSignInAlt size={40} className="text-white" />,
      title: "Login",
      description: "Log in to start using MediTrust.",
    },
    {
      icon: <FaNotesMedical size={40} className="text-white" />,
      title: "Describe Symptoms",
      description: "Tell us about your health concerns.",
    },
    {
      icon: <FaRobot size={40} className="text-white" />,
      title: "Get AI Assistance",
      description: "Receive AI-powered medical guidance.",
    },
  ];
  

  return (
    <div className="bg-gray-900 text-white py-12 text-center">
      <h2 className="text-yellow-400 text-lg font-semibold">How it works?</h2>
      <h1 className="text-3xl font-bold mt-2">Get Medical Assistance Swiftly</h1>
      <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex items-center justify-center w-20 h-20">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold mt-4">{step.title}</h3>
            <p className="text-gray-400 text-sm mt-2">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
