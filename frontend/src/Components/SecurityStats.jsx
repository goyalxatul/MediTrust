import { FaShieldAlt, FaUsers, FaLock } from "react-icons/fa";

const SecurityStats = () => {
  const stats = [
    { number: "100%", text: "Encrypted Data Security", icon: <FaShieldAlt /> },
    { number: "25M+", text: "Global Trust & Users", icon: <FaUsers /> },
    { number: "99%", text: "Uptime & Reliability", icon: <FaLock /> },
  ];

  return (
    <div className="py-12 bg-black">
      <h2 className="text-3xl font-semibold text-center text-white mb-8">
        Why Trust Meditrust Encryption?
      </h2>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col items-center text-center border border-gray-600"
          >
            <div className="text-indigo-400 text-3xl mb-4">{stat.icon}</div>
            <div className="text-2xl font-bold text-white">{stat.number}</div>
            <p className="text-gray-300 mt-2">{stat.text}</p>
            <span className="text-gray-500 text-sm mt-4">{`00${index + 1}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityStats;

