"use client";

import React, { useState } from "react";

interface IpAddressModalContentProps {
  onConnect: (ipAddress: string) => void;
  onClose: () => void;
}

const IpAddressModalContent: React.FC<IpAddressModalContentProps> = ({
  onConnect,
  onClose,
}) => {
  const [ipAddress, setIpAddress] = useState("");

  const handleConnect = () => {
    // Basic validation (optional)
    if (ipAddress.trim()) {
      onConnect(ipAddress.trim());
    } else {
      // Handle invalid input (e.g., show error message)
      console.warn("IP Address cannot be empty");
    }
  };

  return (
    <div>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Enter the IP address of your Arduino WiFi module to connect via Web
        Bluetooth.
      </p>
      <input
        type="text"
        value={ipAddress}
        onChange={(e) => setIpAddress(e.target.value)}
        placeholder="e.g., 192.168.1.100"
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white mb-4"
      />
      <div className="flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleConnect}
          className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default IpAddressModalContent;
