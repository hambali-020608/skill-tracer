import React from 'react';
import { FiTrendingUp, FiTarget, FiBarChart2 } from 'react-icons/fi';

const Features = () => {
  const features = [
    {
      icon: <FiTrendingUp className="text-3xl text-indigo-400" />,
      title: "Skill Tracking",
      description: "Monitor your progress with intuitive analytics and achieve your learning goals efficiently",
      borderColor: "border-indigo-400"
    },
    {
      icon: <FiTarget className="text-3xl text-emerald-400" />,
      title: "Goal Setting",
      description: "Define, manage, and track your personal skill objectives with smart reminders",
      borderColor: "border-emerald-400"
    },
    {
      icon: <FiBarChart2 className="text-3xl text-purple-400" />,
      title: "Progress Reports",
      description: "Get detailed insights and visual analytics of your skill development journey",
      borderColor: "border-purple-400"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-100 mb-12">
          Powerful Features to <span className="text-green-400">Boost Your Skills</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`bg-gray-800 p-8 rounded-xl border-t-4 ${feature.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-gray-700 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;