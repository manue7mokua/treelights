"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Sparkles, Waves, Zap, Rainbow, Power } from "lucide-react";

export function LightController() {
  const [isOn, setIsOn] = useState(false);
  const [connected, setConnected] = useState(true);
  const [activePattern, setActivePattern] = useState<string | null>(null);

  const patterns = [
    {
      name: "Rainbow",
      icon: Rainbow,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      name: "Twinkle",
      icon: Sparkles,
      color: "bg-gradient-to-r from-yellow-400 to-amber-500",
    },
    {
      name: "Pulse",
      icon: Zap,
      color: "bg-gradient-to-r from-blue-500 to-cyan-400",
    },
    {
      name: "Wave",
      icon: Waves,
      color: "bg-gradient-to-r from-green-400 to-emerald-500",
    },
  ];

  const handlePatternClick = (patternName: string) => {
    if (!isOn) return;
    setActivePattern(patternName);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Status Indicator */}
      <div className="flex justify-end mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">
            {connected ? "Connected" : "Disconnected"}
          </span>
          <div
            className={`h-3 w-3 rounded-full ${
              connected
                ? "bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                : "bg-red-500"
            }`}
          />
        </div>
      </div>

      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-red-500 to-blue-500 animate-gradient-x">
        Vulcan Tree Lights
      </h1>

      {/* Power Toggle */}
      <div className="flex items-center justify-center gap-4 mb-10 p-6 bg-white rounded-xl shadow-sm">
        <Power
          className={`w-8 h-8 ${isOn ? "text-green-500" : "text-slate-400"}`}
        />
        <Switch
          checked={isOn}
          onCheckedChange={setIsOn}
          className="data-[state=checked]:bg-green-500 scale-125"
        />
        <span className="text-lg font-medium">{isOn ? "ON" : "OFF"}</span>
      </div>

      {/* Pattern Buttons */}
      <div className="grid grid-cols-2 gap-4">
        {patterns.map((pattern) => (
          <Button
            key={pattern.name}
            onClick={() => handlePatternClick(pattern.name)}
            disabled={!isOn}
            className={`
              h-24 rounded-xl transition-all duration-300 
              ${pattern.color}
              ${
                activePattern === pattern.name
                  ? "ring-4 ring-offset-2 ring-offset-white ring-blue-300"
                  : ""
              }
              ${!isOn ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
            `}
          >
            <div className="flex flex-col items-center gap-2">
              <pattern.icon className="w-8 h-8 text-white" />
              <span className="font-medium text-white">{pattern.name}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
