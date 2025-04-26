"use client";

import React, { useState } from "react";

interface ConnectButtonProps {
  isConnected: boolean;
  onClick: () => void;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({
  isConnected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative w-48 h-48 rounded-full 
        text-white text-2xl font-bold uppercase tracking-wider
        shadow-lg hover:shadow-xl focus:outline-none focus:ring-4
        transition-all duration-300 ease-in-out transform hover:scale-105
        flex items-center justify-center
        ${
          isConnected
            ? "bg-gradient-to-br from-green-400 to-green-600 focus:ring-green-300"
            : "bg-gradient-to-br from-red-400 to-red-600 focus:ring-red-300"
        }
      `}
    >
      {/* Subtle inner shadow/glow for depth */}
      <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10"></span>
      {isConnected ? "Connected" : "Connect"}
    </button>
  );
};

export default ConnectButton;
