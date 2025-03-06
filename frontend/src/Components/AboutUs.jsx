import { motion } from "framer-motion";
import { FaShieldAlt } from "react-icons/fa";

const AboutPage = () => {
  const services = [
    { title: "End-to-End Encryption", desc: "Your data is protected with top-tier encryption standards." },
    { title: "Secure Cloud Storage", desc: "Multi-layer protection ensures your files remain safe." },
    { title: "Blockchain Security", desc: "Tamper-proof data verification with blockchain technology." },
    { title: "Substitution-Permutation Network (SPN) architecture", desc: "Ensuring only verified access to sensitive information." },
    { title: "Privacy-Focused Solutions", desc: "Your data remains private—no third-party access." },
   
  ];

  return (
    <div className="w-full bg-black text-white min-h-screen flex flex-col items-center py-16 px-6">
      {/* Title */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="text-4xl md:text-5xl font-bold text-center mb-6"
      >
        MediTrust: Your Security, Our Priority
      </motion.h1>

      {/* Description Box */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }} 
        className="bg-gray-800 p-6 md:p-8 rounded-lg max-w-2xl text-center"
      >
        <p className="text-gray-300 mb-4">
          MediTrust is built to provide **military-grade encryption** and **cutting-edge security** solutions for 
          protecting your sensitive data. With real-time threat detection and zero-trust security, 
          we ensure **complete confidentiality and privacy** for individuals and businesses alike.
        </p>
        <p className="text-gray-300">
          From **secure cloud storage** to **AI-driven threat detection**, MediTrust is your **ultimate security shield** 
          against cyber threats.
        </p>
      </motion.div>

      {/* Key Security Features */}
      <div className="mt-10 max-w-3xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Security Features:</h2>
        <div className="space-y-4">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.4, delay: index * 0.1 }} 
              className="flex items-center gap-3 bg-gray-900 p-4 rounded-lg"
            >
              <FaShieldAlt className="text-blue-500 text-xl" />
              <div>
                <h3 className="font-semibold text-lg">{service.title}</h3>
                <p className="text-gray-400 text-sm">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;


