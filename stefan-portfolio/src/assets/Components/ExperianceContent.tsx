import { motion } from "framer-motion";
import { Calendar, Award, Target, Users, Trophy } from "lucide-react";

const ExperienceContent = () => {
  const experiences = [
    {
      title: "Sony Music/FYEO/The District",
      period: "2023 - Present",
      role: "A&R, Music Promoter, Label Owner",
      icon: <Trophy />,
      achievements: [
        "Working with over 5000 artists worldwide",
        "Promoting artists across various music streaming services",
        "Finding and developing new upcoming signed Sony artists",
        "Managing music submissions for Sony Music and smaller labels",
        "Opened Luminal Records under Sony Music in 2024",
      ],
      color: "blue",
    },
    {
      title: "TikTok Songs Management",
      period: "2019 - 2023",
      role: "Content Creator & Manager",
      icon: <Target />,
      achievements: [
        "Created and managed viral content",
        "Generated 10M+ daily impressions on community posts",
        "Implemented analytics and trending keywords for growth",
        "Built strong relationships with major industry players",
        "Made $1.6M for Labels in 2 Years",
      ],
      color: "purple",
    },
    {
      title: "YouTube Channel Management",
      period: "2021 - 2023",
      role: "Channel Owner & Content Creator",
      icon: <Users />,
      achievements: [
        "Grew channel to 715k+ subscribers",
        "Generated 370M+ views and 2B impressions",
        "Collaborated with major record labels",
        "Managed partnerships with top artists",
        "Developed innovative content strategies",
      ],
      color: "red",
    },
  ];

  const highlights = [
    { icon: <Trophy />, value: "715K+", label: "Subscribers" },
    { icon: <Users />, value: "370M+", label: "Views" },
    { icon: <Target />, value: "2B+", label: "Impressions" },
    { icon: <Award />, value: "$1.6M+", label: "Revenue Generated" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {highlights.map((item, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 rounded-lg p-4 text-center"
          >
            <div className="text-blue-500 flex justify-center mb-2">
              {item.icon}
            </div>
            <div className="text-2xl font-bold mb-1">{item.value}</div>
            <div className="text-sm text-white/60">{item.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Experience Timeline */}
      <div className="relative space-y-8">
        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            className="relative pl-8 pb-8"
          >
            {/* Timeline line */}
            {index !== experiences.length - 1 && (
              <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-white/20" />
            )}

            {/* Timeline dot */}
            <div
              className={`absolute left-0 top-0 w-8 h-8 rounded-full bg-${experience.color}-500/50 flex items-center justify-center`}
            >
              {experience.icon}
            </div>

            {/* Content */}
            <div className="bg-white/10 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{experience.title}</h3>
                <div className="flex items-center text-white/60">
                  <Calendar className="h-4 w-4 mr-2" />
                  {experience.period}
                </div>
              </div>

              <p className="text-white/80 mb-4">{experience.role}</p>

              <ul className="space-y-2">
                {experience.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-center gap-2 text-white/70">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceContent;
