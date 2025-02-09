import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cloud, Sun, Music, Clock, Activity } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const DesktopWidgets = () => {
  const [time, setTime] = useState(new Date());
  const [cpuUsage, setCpuUsage] = useState<{ value: number; time: string }[]>(
    []
  );
  const weatherData = {
    temp: 22,
    condition: "Sunny",
    icon: <Sun className="h-6 w-6" />,
  };

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate CPU usage
  useEffect(() => {
    const updateCPU = () => {
      setCpuUsage((prev) => {
        const newData = [
          ...prev,
          {
            value: Math.random() * 100,
            time: new Date().toLocaleTimeString(),
          },
        ].slice(-20);
        return newData;
      });
    };

    const timer = setInterval(updateCPU, 1000);
    return () => clearInterval(timer);
  }, []);

  const MusicWidget = () => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-black/50 backdrop-blur-md rounded-lg p-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <Music className="h-4 w-4" />
        <span className="text-sm">Now Playing</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white/10 rounded-md flex items-center justify-center">
          <Music className="h-6 w-6" />
        </div>
        <div>
          <h4 className="text-sm font-medium">Current Track</h4>
          <p className="text-xs text-white/60">Artist Name</p>
        </div>
      </div>
      <div className="mt-2 h-1 bg-white/10 rounded-full">
        <motion.div
          className="h-full bg-blue-500 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "60%" }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );

  const WeatherWidget = () => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-black/50 backdrop-blur-md rounded-lg p-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <Cloud className="h-4 w-4" />
        <span className="text-sm">Weather</span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold">{weatherData.temp}°C</div>
          <div className="text-sm text-white/60">{weatherData.condition}</div>
        </div>
        {weatherData.icon}
      </div>
    </motion.div>
  );

  const ClockWidget = () => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-black/50 backdrop-blur-md rounded-lg p-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <Clock className="h-4 w-4" />
        <span className="text-sm">Time</span>
      </div>
      <div className="text-2xl font-bold">{time.toLocaleTimeString()}</div>
      <div className="text-sm text-white/60">{time.toLocaleDateString()}</div>
    </motion.div>
  );

  const SystemMonitorWidget = () => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-black/50 backdrop-blur-md rounded-lg p-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <Activity className="h-4 w-4" />
        <span className="text-sm">System Monitor</span>
      </div>
      <div className="h-20">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={cpuUsage}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 text-sm text-white/60">
        CPU Usage: {cpuUsage[cpuUsage.length - 1]?.value.toFixed(1)}%
      </div>
    </motion.div>
  );

  return (
    <div className="fixed top-4 right-4 space-y-4 w-64">
      <ClockWidget />
      <WeatherWidget />
      <MusicWidget />
      <SystemMonitorWidget />
    </div>
  );
};

export default DesktopWidgets;
