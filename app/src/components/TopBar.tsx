"use client";

import React, { useState, useEffect } from "react";
import { Bluetooth, Mic, MicOff } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const TopBar = () => {
  const [isConnected, setIsConnected] = useState(false); // Mock state
  const [isListening, setIsListening] = useState(false);
  const [avatarDelays, setAvatarDelays] = useState<number[]>([]);

  const avatars = [
    {
      name: "Jeff",
      url: "https://api.dicebear.com/8.x/open-peeps/svg?seed=Joe",
    },
    {
      name: "Iman",
      url: "https://api.dicebear.com/8.x/open-peeps/svg?seed=Manu",
    },
    {
      name: "Spock",
      url: "https://api.dicebear.com/8.x/open-peeps/svg?seed=Spock",
    },
  ];

  // Generate delays only on the client after mount
  useEffect(() => {
    setAvatarDelays(avatars.map(() => Math.random() * 0.5));
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-900 shadow-md mt-4">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <Bluetooth
          className={`cursor-pointer transition-colors duration-300 ${
            isConnected ? "text-green-500" : "text-red-500"
          }`}
          size={24}
          onClick={() => setIsConnected(!isConnected)} // Mock toggle
        />
        <button
          onClick={() => setIsListening(!isListening)}
          className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {isListening ? (
            <>
              <Mic className="text-blue-500" size={24} />
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-30 animate-pulse"></span>
            </>
          ) : (
            <MicOff className="text-gray-500" size={24} />
          )}
        </button>
      </div>

      {/* Center Section */}
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        TreeLights
      </h1>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        {avatars.map((avatar, index) => (
          <div key={avatar.name} className="relative group">
            <img
              src={avatar.url}
              alt={`${avatar.name}'s avatar`}
              className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform duration-200 animate-bounce-slow"
              style={{
                animationDelay:
                  avatarDelays[index] !== undefined
                    ? `${avatarDelays[index]}s`
                    : "0s",
              }}
            />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {avatar.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBar;

// Add custom bounce animation to tailwind.config.ts if needed
// keyframes: {
//   'bounce-slow': {
//     '0%, 100%': { transform: 'translateY(-10%)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
//     '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
//   }
// },
// animation: {
//   'bounce-slow': 'bounce-slow 1.5s infinite',
// }
