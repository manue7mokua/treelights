"use client";

import React, { useState, useCallback } from "react";
import TopBar from "@/components/TopBar";
import ConnectButton from "@/components/ConnectButton";
import PatternButtons from "@/components/PatternButtons";
import LedGrid from "@/components/LedGrid";
import Modal from "@/components/Modal";
import IpAddressModalContent from "@/components/IpAddressModalContent";
import LedControlModalContent from "@/components/LedControlModalContent";

// Define LED data structure
interface LedData {
  id: number;
  color: string; // 'rgb(r, g, b)'
  isOn: boolean;
}

const TOTAL_LEDS = 120;
const LED_GRID_COLUMNS = 20; // Adjust as needed for layout

// Initialize LEDs (all off and black initially)
const initialLeds: LedData[] = Array.from({ length: TOTAL_LEDS }, (_, i) => ({
  id: i + 1, // 1-indexed LEDs
  color: "rgb(50, 50, 50)", // Dark gray for off state visual
  isOn: false,
}));

export default function Home() {
  // --- State ---
  const [isConnected, setIsConnected] = useState(false); // Mock Bluetooth connection
  const [leds, setLeds] = useState<LedData[]>(initialLeds);
  const [isIpModalOpen, setIsIpModalOpen] = useState(false);
  const [isLedControlModalOpen, setIsLedControlModalOpen] = useState(false);
  const [selectedLed, setSelectedLed] = useState<LedData | null>(null);

  // --- Handlers ---

  // Mock connection attempt
  const handleConnectAttempt = (ipAddress: string) => {
    console.log("Attempting to connect to:", ipAddress);
    // TODO: Implement actual Web Bluetooth connection logic
    setIsConnected(true); // Mock success
    setIsIpModalOpen(false);
    // On successful connection, maybe request initial LED state from device?
  };

  // Handle pattern button clicks
  const handlePatternSelect = (pattern: string) => {
    console.log("Selected pattern:", pattern);
    if (!isConnected) {
      console.warn("Connect device first!");
      // Optionally show a notification/toast
      return;
    }
    // TODO: Send pattern command via Bluetooth

    // Mock visual update for patterns (replace with actual logic)
    if (pattern === "Rainbow") {
      setLeds(
        leds.map((led) => ({
          ...led,
          color: `hsl(${((led.id * 360) / TOTAL_LEDS) % 360}, 100%, 50%)`, // Simple rainbow
          isOn: true,
        }))
      );
    } else if (pattern === "Twinkly") {
      setLeds(
        leds.map((led) => ({
          ...led,
          color: Math.random() > 0.5 ? "rgb(255, 255, 200)" : "rgb(50, 50, 50)",
          isOn: Math.random() > 0.5,
        }))
      );
    } else {
      // Reset to off for other patterns for now
      setLeds(
        leds.map((led) => ({ ...led, color: "rgb(50, 50, 50)", isOn: false }))
      );
    }
  };

  // Open LED control modal
  const handleLedClick = useCallback(
    (ledId: number) => {
      const ledToEdit = leds.find((led) => led.id === ledId);
      if (ledToEdit) {
        setSelectedLed(ledToEdit);
        setIsLedControlModalOpen(true);
      }
    },
    [leds]
  );

  // Update individual LED state from modal
  const handleLedUpdate = useCallback(
    (ledId: number, color: string, isOn: boolean) => {
      setLeds((prevLeds) =>
        prevLeds.map((led) =>
          led.id === ledId
            ? { ...led, color: isOn ? color : "rgb(50, 50, 50)", isOn: isOn }
            : led
        )
      );
      // TODO: Send individual LED update command via Bluetooth
      console.log(`Update LED ${ledId}: Color=${color}, IsOn=${isOn}`);

      // Update the selectedLed state as well so the modal reflects changes instantly
      setSelectedLed((prevSelected) =>
        prevSelected && prevSelected.id === ledId
          ? { ...prevSelected, color, isOn }
          : prevSelected
      );
    },
    []
  );

  // --- Render ---
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col">
      <TopBar />

      <main className="flex flex-col items-center justify-center flex-grow p-8 space-y-8">
        {/* Connection Button */}
        <ConnectButton
          isConnected={isConnected}
          onClick={() => {
            if (isConnected) {
              // TODO: Implement disconnect logic
              console.log("Disconnecting...");
              setIsConnected(false);
              setLeds(initialLeds); // Reset LEDs on disconnect
            } else {
              setIsIpModalOpen(true);
            }
          }}
        />

        {/* Pattern Buttons */}
        <PatternButtons onPatternSelect={handlePatternSelect} />

        {/* LED Grid */}
        <LedGrid
          leds={leds}
          onLedClick={handleLedClick}
          columns={LED_GRID_COLUMNS}
        />
      </main>

      {/* Modals */}
      <Modal
        isOpen={isIpModalOpen}
        onClose={() => setIsIpModalOpen(false)}
        title="Connect to Arduino"
      >
        <IpAddressModalContent
          onConnect={handleConnectAttempt}
          onClose={() => setIsIpModalOpen(false)}
        />
      </Modal>

      {selectedLed && (
        <Modal
          isOpen={isLedControlModalOpen}
          onClose={() => setIsLedControlModalOpen(false)}
          title={`Control LED ${selectedLed.id}`}
        >
          <LedControlModalContent
            ledId={selectedLed.id}
            initialColor={selectedLed.color}
            isOn={selectedLed.isOn}
            onUpdate={handleLedUpdate}
            onClose={() => setIsLedControlModalOpen(false)}
          />
        </Modal>
      )}

      {/* Footer or other elements can go here */}
    </div>
  );
}
