'use client';

import React from 'react';

interface LedBlockProps {
  ledNumber: number;
  color: string; // Expecting format like 'rgb(r, g, b)' or hex
  onClick: () => void;
}

const LedBlock: React.FC<LedBlockProps> = ({ ledNumber, color, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-6 h-6 m-0.5 rounded shadow-inner text-xs font-mono flex items-center justify-center 
                 border border-gray-300 dark:border-gray-700 
                 hover:scale-110 hover:shadow-md focus:outline-none focus:ring-1 focus:ring-blue-400 
                 transition-all duration-150 ease-in-out"
      style={{
        backgroundColor: color,
        // Adjust text color for contrast based on background lightness
        color: isLight(color) ? '#111' : '#eee',
      }}
      aria-label={`LED ${ledNumber}`}
    >
      {ledNumber}
    </button>
  );
};

// Helper function to determine if a color is light or dark (simple version)
// You might want a more sophisticated version for better accuracy
function isLight(color: string): boolean {
  try {
    let r: number, g: number, b: number;
    if (color.startsWith('rgb')) {
      [r, g, b] = color.match(/\d+/g)?.map(Number) ?? [0, 0, 0];
    } else if (color.startsWith('#')) {
      const hex = color.replace('#', '');
      if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
      } else if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
      } else {
        return true; // Default to light if format is unknown
      }
    } else {
      return true; // Default to light if format is unknown
    }

    // Basic luminance calculation
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 128; // Threshold can be adjusted
  } catch (e) {
    console.error("Error parsing color:", color, e);
    return true; // Default to light on error
  }
}

export default LedBlock; 