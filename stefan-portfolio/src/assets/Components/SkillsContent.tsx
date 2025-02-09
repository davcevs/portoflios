import { useState } from "react";
import { motion } from "framer-motion";
import { Code, Video, Music, Brain, BarChart } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SkillsContent = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof skillCategories>("technical");

  const skillCategories = {
    technical: {
      icon: <Code />,
      title: "Technical Skills",
      skills: [
        { name: "JavaScript/HTML/CSS", level: 95 },
        { name: "React/Angular/Next.js", level: 95 },
        { name: "Node.js/PostgreSQL", level: 95 },
        { name: "Python/MongoDB", level: 75 },
        { name: "Microsoft Office Suite", level: 70 },
      ],
    },
    multimedia: {
      icon: <Video />,
      title: "Multimedia",
      skills: [
        { name: "Premiere Pro CC", level: 90 },
        { name: "After Effects", level: 85 },
        { name: "Audacity", level: 88 },
        { name: "Capcut", level: 92 },
        { name: "Video Production", level: 95 },
      ],
    },
    ai: {
      icon: <Brain />,
      title: "AI Tools",
      skills: [
        { name: "ChatGPT", level: 95 },
        { name: "Canva", level: 90 },
        { name: "Adobe Firefly", level: 85 },
        { name: "Leonardo AI", level: 88 },
        { name: "Text-to-Speech AI", level: 92 },
      ],
    },
    music: {
      icon: <Music />,
      title: "Music Industry",
      skills: [
        { name: "Artist Management", level: 95 },
        { name: "Music Promotion", level: 98 },
        { name: "Content Strategy", level: 92 },
        { name: "Label Management", level: 90 },
        { name: "Industry Relations", level: 95 },
      ],
    },
    analytics: {
      icon: <BarChart />,
      title: "Analytics",
      skills: [
        { name: "YouTube Analytics", level: 95 },
        { name: "Google Trends", level: 90 },
        { name: "Content Optimization", level: 92 },
        { name: "Performance Tracking", level: 88 },
        { name: "Data Analysis", level: 85 },
      ],
    },
  };

  const growthData = [
    { month: "Jan", subscribers: 100000 },
    { month: "Mar", subscribers: 250000 },
    { month: "May", subscribers: 400000 },
    { month: "Jul", subscribers: 500000 },
    { month: "Sep", subscribers: 600000 },
    { month: "Dec", subscribers: 715000 },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Category Selection */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(skillCategories).map(([key, category]) => {
          // Explicitly type `key` as a valid key of `skillCategories`
          const categoryKey = key as keyof typeof skillCategories;

          return (
            <motion.button
              key={categoryKey}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-lg flex flex-col items-center gap-2 
                  ${
                    selectedCategory === categoryKey
                      ? "bg-blue-500/50"
                      : "bg-white/10"
                  }`}
              onClick={() => setSelectedCategory(categoryKey)}
            >
              <div className="h-6 w-6">{category.icon}</div>
              <span className="text-sm text-center">{category.title}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Skills Display */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white/10 rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          {skillCategories[selectedCategory].icon}
          <span>{skillCategories[selectedCategory].title}</span>
        </h2>

        <div className="space-y-4">
          {/* Add explicit type for skill parameter */}
          {skillCategories[selectedCategory].skills.map(
            (skill: { name: string; level: number }, index: number) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between mb-1">
                  <span className="text-white/80">{skill.name}</span>
                  <span className="text-white/60">{skill.level}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="bg-blue-500 h-2.5 rounded-full"
                  />
                </div>
              </motion.div>
            )
          )}
        </div>
      </motion.div>

      {/* Channel Growth Chart */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/10 rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-6">Channel Growth</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData}>
              <XAxis dataKey="month" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="subscribers"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsContent;
