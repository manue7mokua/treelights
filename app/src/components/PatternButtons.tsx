"use client";

import React from "react";

const patternNames = ["Rainbow", "Twinkly", "Techno", "Wave"] as const;
type PatternName = (typeof patternNames)[number];

interface PatternButtonsProps {
  onPatternSelect: (pattern: PatternName) => void;
}

const PatternButtons: React.FC<PatternButtonsProps> = ({ onPatternSelect }) => {
  const gradients = [
    "from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600",
    "from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500",
    "from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600",
    "from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600",
  ];

  return (
    <div className="flex justify-center space-x-4 my-8">
      {patternNames.map((name, index) => (
        <button
          key={name}
          onClick={() => onPatternSelect(name)}
          className={`
            px-6 py-3 rounded-lg text-white font-semibold 
            bg-gradient-to-r ${gradients[index % gradients.length]}
            shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105
          `}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default PatternButtons;
