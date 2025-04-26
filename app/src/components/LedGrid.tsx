"use client";

import React from "react";
import LedBlock from "./LedBlock";

interface LedData {
  id: number;
  color: string; // e.g., 'rgb(0,0,0)' or '#000000'
}

interface LedGridProps {
  leds: LedData[];
  onLedClick: (ledId: number) => void;
  // Define grid dimensions (adjust as needed)
  columns?: number;
}

const LedGrid: React.FC<LedGridProps> = ({
  leds,
  onLedClick,
  columns = 20,
}) => {
  // Calculate rows needed based on total LEDs and columns
  const rows = Math.ceil(leds.length / columns);

  // Create a 2D array representation for grid layout
  const grid: (LedData | null)[][] = Array.from({ length: rows }, () =>
    Array(columns).fill(null)
  );

  leds.forEach((led, index) => {
    const rowIndex = Math.floor(index / columns);
    const colIndex = index % columns;
    if (rowIndex < rows) {
      grid[rowIndex][colIndex] = led;
    }
  });

  return (
    <div
      className="p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-inner inline-block mx-auto"
      style={{ width: "max-content" }} // Ensure container fits content
    >
      <div className="flex flex-col items-center">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((led, colIndex) => {
              const key = `led-${rowIndex}-${colIndex}`;
              if (led) {
                return (
                  <LedBlock
                    key={led.id} // Use unique LED ID for key
                    ledNumber={led.id}
                    color={led.color}
                    onClick={() => onLedClick(led.id)}
                  />
                );
              } else {
                // Render an empty placeholder if no LED for this cell
                return (
                  <div
                    key={key}
                    className="w-6 h-6 m-0.5 opacity-0" // Placeholder keeps grid structure
                    aria-hidden="true"
                  />
                );
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LedGrid;
