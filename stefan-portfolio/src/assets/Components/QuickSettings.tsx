import React from "react";
import { motion } from "framer-motion";
import { Wifi, Battery, Volume2, Sun, Moon, Bluetooth } from "lucide-react";

const QuickSettings = ({ isOpen, onClose }) => {
  const [isDark, setIsDark] = React.useState(false);
  const [volume, setVolume] = React.useState(75);
  const [brightness, setBrightness] = React.useState(100);

  const toggles = [
    { id: "wifi", icon: <Wifi />, label: "Wi-Fi", active: true },
    { id: "bluetooth", icon: <Bluetooth />, label: "Bluetooth", active: false },
    {
      id: "theme",
      icon: isDark ? <Moon /> : <Sun />,
      label: isDark ? "Dark" : "Light",
      active: true,
      onClick: () => setIsDark(!isDark),
    },
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      className="absolute bottom-14 right-4 w-80 bg-black/70 backdrop-blur-md 
                 rounded-lg p-4 text-white"
    >
      <div className="grid grid-cols-3 gap-2 mb-4">
        {toggles.map((toggle) => (
          <motion.button
            key={toggle.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center justify-center p-3 rounded-lg 
                       ${toggle.active ? "bg-blue-500/50" : "bg-white/10"} 
                       hover:bg-white/20`}
            onClick={toggle.onClick}
          >
            {toggle.icon}
            <span className="text-xs mt-1">{toggle.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm flex items-center gap-2">
              <Volume2 className="h-4 w-4" /> Volume
            </span>
            <span className="text-sm">{volume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm flex items-center gap-2">
              <Sun className="h-4 w-4" /> Brightness
            </span>
            <span className="text-sm">{brightness}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Battery className="h-4 w-4" />
            <span className="text-sm">Battery</span>
          </div>
          <span className="text-sm">85%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickSettings;
