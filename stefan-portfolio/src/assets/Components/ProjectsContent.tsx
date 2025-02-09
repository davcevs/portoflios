import { motion } from "framer-motion";
import { Youtube, Music, Video } from "lucide-react";

const ProjectsContent = () => {
  const projects = [
    {
      title: "Luminal Records",
      icon: <Music className="h-6 w-6" />,
      description:
        "Own label under Sony Music, opened in 2024. Working with over 5000 artists worldwide.",
      achievements: [
        "Promoting artists to various music streaming services",
        "Finding and developing new upcoming signed Sony artists",
        "Managing music submissions for Sony Music and smaller labels",
      ],
    },
    {
      title: "YouTube Channel Management",
      icon: <Youtube className="h-6 w-6" />,
      description:
        "Built and managed a highly successful YouTube music channel",
      achievements: [
        "Grew channel from 0 to 700k subscribers in 2.5 years",
        "Generated over 370 million views",
        "Achieved 2 billion impressions",
        "Made $1.6 Million to Labels in 2 Years",
      ],
    },
    {
      title: "Content Creation",
      icon: <Video className="h-6 w-6" />,
      description: "TikTok Songs Management (Oct 2019 - 2023)",
      achievements: [
        "Created viral content reaching millions of views",
        "Managed community engagement with 10M+ daily impressions",
        "Collaborated with major industry names",
        "Optimized content using analytics and trending keywords",
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/10 rounded-lg p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/10 rounded-lg">{project.icon}</div>
            <h2 className="text-xl font-semibold">{project.title}</h2>
          </div>

          <p className="text-white/80 mb-4">{project.description}</p>

          <div className="space-y-2">
            {project.achievements.map((achievement, i) => (
              <div key={i} className="flex items-center gap-2 text-white/70">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                <span>{achievement}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectsContent;
