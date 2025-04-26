"use client";

import React, { useState, useEffect, useCallback } from "react";

interface LedControlModalContentProps {
  ledId: number;
  initialColor: string; // Expecting 'rgb(r, g, b)'
  isOn: boolean; // Assuming we track on/off state separately
  onUpdate: (ledId: number, color: string, isOn: boolean) => void;
  onClose: () => void;
}

// Helper to parse 'rgb(r, g, b)' string
const parseRgb = (rgbString: string): { r: number; g: number; b: number } => {
  const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (match) {
    return {
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3]),
    };
  }
  return { r: 0, g: 0, b: 0 }; // Default black
};

// Helper to format RGB object to 'rgb(r, g, b)' string
const formatRgb = (rgb: { r: number; g: number; b: number }): string => {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
};

const LedControlModalContent: React.FC<LedControlModalContentProps> = ({
  ledId,
  initialColor,
  isOn: initialIsOn,
  onUpdate,
  onClose,
}) => {
  const [isOn, setIsOn] = useState(initialIsOn);
  const [rgb, setRgb] = useState(parseRgb(initialColor));
  const [colorPreview, setColorPreview] = useState(initialColor);

  // Update preview color whenever RGB state changes
  useEffect(() => {
    setColorPreview(formatRgb(rgb));
  }, [rgb]);

  const handleSliderChange = (channel: "r" | "g" | "b", value: string) => {
    setRgb((prev) => ({ ...prev, [channel]: parseInt(value) }));
  };

  const handleInputChange = (channel: "r" | "g" | "b", value: string) => {
    let numValue = parseInt(value);
    if (isNaN(numValue)) numValue = 0;
    numValue = Math.max(0, Math.min(255, numValue)); // Clamp between 0-255
    setRgb((prev) => ({ ...prev, [channel]: numValue }));
  };

  const handleToggleOn = () => {
    setIsOn(!isOn);
  };

  const handleSaveChanges = useCallback(() => {
    onUpdate(ledId, formatRgb(rgb), isOn);
    // onClose(); // Optionally close modal on save
  }, [onUpdate, ledId, rgb, isOn]);

  // Update parent component immediately when state changes (live update)
  useEffect(() => {
    handleSaveChanges();
  }, [rgb, isOn, handleSaveChanges]);

  return (
    <div className="space-y-4">
      {/* On/Off Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-gray-700 dark:text-gray-300">LED Status:</span>
        <button
          onClick={handleToggleOn}
          className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
            isOn
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-300"
          }`}
        >
          {isOn ? "ON" : "OFF"}
        </button>
      </div>

      {/* Color Preview */}
      <div className="flex items-center space-x-3">
        <span className="text-gray-700 dark:text-gray-300">Color:</span>
        <div
          className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 shadow-inner"
          style={{ backgroundColor: colorPreview }}
        ></div>
        <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
          {colorPreview}
        </span>
      </div>

      {/* RGB Sliders */}
      <div className="space-y-2">
        {["r", "g", "b"].map((channel) => (
          <div key={channel} className="flex items-center space-x-2">
            <label
              htmlFor={`${channel}-slider`}
              className="w-4 font-medium text-gray-700 dark:text-gray-300 uppercase"
            >
              {channel}
            </label>
            <input
              type="range"
              id={`${channel}-slider`}
              min="0"
              max="255"
              value={rgb[channel as keyof typeof rgb]}
              onChange={(e) =>
                handleSliderChange(channel as "r" | "g" | "b", e.target.value)
              }
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-${
                channel === "r" ? "red" : channel === "g" ? "green" : "blue"
              }-500`}
            />
            <input
              type="number"
              min="0"
              max="255"
              value={rgb[channel as keyof typeof rgb]}
              onChange={(e) =>
                handleInputChange(channel as "r" | "g" | "b", e.target.value)
              }
              className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              aria-label={`${channel.toUpperCase()} value`}
            />
          </div>
        ))}
      </div>

      {/* Close Button */}
      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onClose} // Only close, changes are saved live
          className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LedControlModalContent;
