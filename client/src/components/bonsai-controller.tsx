"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Sparkles,
  Waves,
  Zap,
  Rainbow,
  Battery,
  Bluetooth,
  BluetoothOff,
  Mic,
  MicOff,
} from "lucide-react";

export function BonsaiController() {
  const [isOn, setIsOn] = useState(false);
  const [connected, setConnected] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(82);
  const [activePattern, setActivePattern] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(true);

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

  const users = [
    {
      name: "Alex",
      avatar: "https://api.dicebear.com/7.x/open-peeps/svg?seed=alex",
    },
    {
      name: "Jamie",
      avatar: "https://api.dicebear.com/7.x/open-peeps/svg?seed=jamie",
    },
    {
      name: "Iman",
      avatar: "https://api.dicebear.com/7.x/open-peeps/svg?seed=joe",
    },
  ];

  // Simulate clap detection
  useEffect(() => {
    if (isListening) {
      const simulateClap = () => {
        if (!isOn) {
          setIsOn(true);
          toast("✨ Lights turned on by sound!", {
            duration: 3000,
            className: "bg-indigo-50 text-indigo-700 border-indigo-200",
          });
        }
      };

      // For demo purposes, simulate a clap after 2 seconds
      const timer = setTimeout(() => {
        simulateClap();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isListening, isOn]);

  const handlePatternClick = (patternName: string) => {
    if (!isOn) return;
    setActivePattern(patternName);
  };

  const togglePower = () => {
    setIsOn(!isOn);
  };

  const toggleMic = () => {
    setIsListening(!isListening);
  };

  const getBatteryColor = () => {
    if (batteryLevel < 20) return "text-red-500";
    if (batteryLevel < 50) return "text-amber-500";
    return "text-green-500";
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      <Toaster position="top-center" />

      {/* Header */}
      <h1 className="text-4xl font-bold text-center my-24 bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:animate-pulse transition-all duration-300">
        Vulcan Tree Lights
      </h1>

      {/* Top-right Status Bar */}
      <Card className="absolute right-0 top-0 p-3 flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-lg">
        <div className="flex items-center gap-1">
          <Battery className={`w-5 h-5 ${getBatteryColor()}`} />
          <span className="text-sm font-medium">{batteryLevel}%</span>
        </div>
        <div className="flex items-center gap-1">
          {connected ? (
            <Bluetooth className="w-5 h-5 text-blue-500" />
          ) : (
            <BluetoothOff className="w-5 h-5 text-red-500" />
          )}
        </div>
        <div className="flex -space-x-2">
          {users.map((user) => (
            <Avatar key={user.name} className="border-2 border-white w-7 h-7">
              <AvatarImage
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
              />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </Card>

      {/* Top-left Mic Status */}
      <Card
        className={`absolute left-0 top-0 p-3 flex items-center gap-2 backdrop-blur-sm rounded-lg cursor-pointer
          ${
            isListening
              ? "bg-green-50/80 text-green-700"
              : "bg-slate-50/80 text-slate-700"
          }`}
        onClick={toggleMic}
      >
        {isListening ? (
          <>
            <Mic className="w-5 h-5" />
            <span className="text-sm font-medium">Listening...</span>
          </>
        ) : (
          <>
            <MicOff className="w-5 h-5" />
            <span className="text-sm font-medium">Mic Off</span>
          </>
        )}
      </Card>

      {/* Power Toggle Button */}
      <div className="flex justify-center mb-10">
        <Button
          onClick={togglePower}
          className={`
            w-40 h-40 rounded-full transition-all duration-300 text-white font-bold text-xl
            ${
              isOn
                ? "bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg shadow-green-200"
                : "bg-gradient-to-br from-slate-400 to-slate-600"
            }
            hover:scale-105 active:scale-95
          `}
        >
          {isOn ? "ON" : "OFF"}
        </Button>
      </div>

      {/* Pattern Buttons */}
      <div className="grid grid-cols-2 gap-4">
        {patterns.map((pattern) => (
          <Button
            key={pattern.name}
            onClick={() => handlePatternClick(pattern.name)}
            disabled={!isOn}
            className={`
              h-20 rounded-xl transition-all duration-300 
              ${pattern.color}
              ${
                activePattern === pattern.name
                  ? "ring-4 ring-offset-2 ring-offset-white ring-blue-300"
                  : ""
              }
              ${
                !isOn
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105 active:scale-95"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <pattern.icon className="w-6 h-6 text-white" />
              <span className="font-medium text-white">{pattern.name}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
