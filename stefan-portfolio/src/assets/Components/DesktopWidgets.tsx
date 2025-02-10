import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { Clock, Activity } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import {
  ClockWidgetProps,
  CpuUsageData,
  SystemMonitorWidgetProps,
} from "../types/types";
import WeatherWidget from "./WeatherWidget";
import MusicWidget from "./MusicWidget";

const ClockWidget = memo(({ time }: ClockWidgetProps) => (
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
));

const SystemMonitorWidget = memo(({ cpuUsage }: SystemMonitorWidgetProps) => (
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
));

const DesktopWidgets = () => {
  const [time, setTime] = useState(new Date());
  const [cpuUsage, setCpuUsage] = useState<CpuUsageData[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

  return (
    <div className="fixed top-4 right-4 space-y-4 w-64">
      <ClockWidget time={time} />
      <WeatherWidget />
      <MusicWidget />
      <SystemMonitorWidget cpuUsage={cpuUsage} />
    </div>
  );
};

export default DesktopWidgets;
