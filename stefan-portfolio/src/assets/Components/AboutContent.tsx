import { motion } from "framer-motion";
import { Github, Mail, BookOpen, Briefcase, Code } from "lucide-react";

const AboutContent = () => {
  const skills = [
    "JavaScript, HTML, CSS, React, Angular, Next.js",
    "Node.js, PostgreSQL, Python, MongoDB",
    "Microsoft Office, Premiere Pro CC, After Effects",
    "Audacity, Capcut",
    "ChatGPT, Canva, Adobe Firefly, Leonardo AI, Text-to-Speech AI",
  ];

  const education = [
    {
      school: "Semos Education | AI Specialist",
      year: "2025",
    },
    {
      school: "Qinshift Academy",
      year: "2024",
    },
    {
      school: "Bachelor of Marketing Management - Integrated Business Faculty",
      year: "2020",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      {/* Header Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center"
      >
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
          <img
            src="https://media.licdn.com/dms/image/v2/D4D03AQHcaHLtP0OH1A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1714396450438?e=1744848000&v=beta&t=TZAwAM_GIGI6bOtg-4ueJApMvVh-t4Y3QudFYPKqJzk"
            alt="Stefan Davchev"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-3xl font-bold mb-2">Stefan Davchev</h1>
        <p className="text-xl text-white/80 mb-4">
          A&R, Music Promoter, Label Owner
        </p>
        <p className="text-white/60">Sony Music/FYEO/The District</p>
      </motion.div>

      {/* Career Overview */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white/10 rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Career Overview
        </h2>
        <ul className="space-y-2 text-white/80">
          <li>
            • Currently working at Sony Music/FYEO/The District as provider and
            music promoter
          </li>
          <li>
            • Previously owned a successful YouTube music channel with 715k+
            subscribers
          </li>
          <li>• Achieved over 370 million views and 2 billion impressions</li>
          <li>
            • Collaborated with major labels including Atlantic Records, Sony
            Music, Universal Music
          </li>
        </ul>
      </motion.div>

      {/* Skills Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Code className="h-5 w-5" />
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <div key={index} className="bg-white/5 p-3 rounded-lg">
              {skill}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Education Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white/10 rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Education
        </h2>
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-white/80">{edu.school}</span>
              <span className="text-white/60">{edu.year}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center space-x-4"
      >
        <a
          href="https://github.com/davcevs"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        >
          <Github className="h-6 w-6" />
        </a>
        <a
          href="mailto:davcevs@gmail.com"
          className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        >
          <Mail className="h-6 w-6" />
        </a>
      </motion.div>
    </div>
  );
};

export default AboutContent;
