import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Youtube,
  Music,
  Code,
  Github,
  Play,
  Mail,
  Instagram,
  Twitter,
  Twitch,
} from "lucide-react";
import { GitHubProject } from "../types/types";

const ProjectsContent = () => {
  const [activeTab, setActiveTab] = useState("web");
  const [githubProjects, setGithubProjects] = useState<GitHubProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/davcevs/repos"
        );
        if (response.ok) {
          const data = await response.json();
          setGithubProjects(data as GitHubProject[]);
        }
      } catch (error) {
        console.error("Error fetching GitHub projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const professionalProjects = [
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
        "Built and managed multiple successful YouTube music channels",
      achievements: [
        "Grew channels to over 1M combined subscribers",
        "Generated over 500 million total views",
        "Achieved 3 billion+ impressions across all channels",
        "Successfully monetized content through various revenue streams",
      ],
    },
  ];

  const youtubeChannels = [
    {
      name: "Nocturne Music Records",
      url: "https://www.youtube.com/@NocturneMusicRecords",
      description:
        "Feel the rhythm of the Modern R&B, Nocturne is a curator channel dedicated to finding and promoting artists in the modern era of the R&B.",
      featuredVideo: "https://www.youtube.com/embed/f3SplgwD65U",
      subscribers: "5.7K",
      views: "6,697,219",
      videos: "203",
      joined: "Nov 27, 2024",
      location: "United States",
      email: "nocturne.musicrecords@gmail.com",
      socials: [],
    },
    {
      name: "Luminal Records",
      url: "https://www.youtube.com/@LuminalRecords",
      description:
        "Luminal is a curator channel dedicated to showcasing and promoting emerging artists. Our platform specializes in discovering and sharing exceptional talent across various genres. Additionally, we feature TikTok's trending songs, providing a dynamic musical experience.",
      featuredVideo: "https://www.youtube.com/embed/aKi7HbOH5oA",
      subscribers: "20.4K",
      views: "23,985,590",
      videos: "1,035",
      joined: "Dec 8, 2023",
      location: "United States",
      email: "luminalrecord@gmail.com",
      socials: [],
    },
    {
      name: "Davcev",
      url: "https://www.youtube.com/@Davcev",
      description: "Personal channel featuring various content and music.",
      featuredVideo: "https://www.youtube.com/embed/AQNjM-F3YYw",
      subscribers: "54.5K",
      views: "18,995,040",
      videos: "245",
      joined: "Nov 6, 2010",
      location: "North Macedonia",
      email: "davcevs@gmail.com",
      socials: [
        {
          platform: "Instagram",
          url: "https://www.instagram.com/davcev/",
          icon: <Instagram className="h-4 w-4" />,
        },
        {
          platform: "Twitter",
          url: "https://www.twitter.com/davcev",
          icon: <Twitter className="h-4 w-4" />,
        },
        {
          platform: "Twitch",
          url: "https://www.twitch.tv/davcev",
          icon: <Twitch className="h-4 w-4" />,
        },
      ],
    },
    {
      name: "Vibration Station FM",
      url: "https://www.youtube.com/@VibrationStationfm",
      description:
        "Serving a community that loves good music and likes to discover talent. Check out our playlists and catch a vibe. Join our community as we strive to highlight the best music, artists, and DJ's to raise vibrations anytime someone hands you the aux.",
      featuredVideo: "https://www.youtube.com/embed/1NTXtQIVbUE",
      subscribers: "694K",
      views: "153,173",
      videos: "148",
      joined: "Oct 18, 2019",
      location: "United States",
      email: "davcevs@gmail.com",
      socials: [
        {
          platform: "Instagram",
          url: "https://instagram.com/vibrationstation.fm",
          icon: <Instagram className="h-4 w-4" />,
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex mb-8 bg-white/10 rounded-lg p-1">
        {["web", "professional", "youtube"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${
              activeTab === tab
                ? "bg-white/20 text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            {tab === "web"
              ? "Web Development"
              : tab === "youtube"
              ? "YouTube Channels"
              : "Professional Work"}
          </button>
        ))}
      </div>

      {activeTab === "youtube" && (
        <div className="space-y-8">
          {youtubeChannels.map((channel, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <Youtube className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{channel.name}</h3>
                    <div className="flex gap-4 text-sm text-white/60 mt-1">
                      <span>{channel.subscribers} subscribers</span>
                      <span>{channel.views} views</span>
                      <span>{channel.videos} videos</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {channel.email && (
                    <a
                      href={`mailto:${channel.email}`}
                      className="p-2 hover:bg-white/10 rounded-full transition-all"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  )}
                  <a
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg flex items-center gap-2 transition-all"
                  >
                    <Play className="h-4 w-4" />
                    <span>Visit Channel</span>
                  </a>
                </div>
              </div>

              <p className="text-white/80 mb-4">{channel.description}</p>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-4">
                  <span>📍 {channel.location}</span>
                  <span>🎂 Joined {channel.joined}</span>
                </div>

                {channel.socials.length > 0 && (
                  <div className="flex gap-3 mb-4">
                    {channel.socials.map((social, i) => (
                      <a
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-white/10 rounded-full transition-all"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                )}

                <div
                  className="relative h-0 rounded-lg overflow-hidden"
                  style={{
                    paddingBottom:
                      channel.name === "Davcev" ? "100%" : "56.25%",
                  }}
                >
                  <iframe
                    src={channel.featuredVideo}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "web" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {loading ? (
            <div className="flex items-center justify-center py-12 col-span-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : (
            githubProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/10 rounded-lg">
                      <Code className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                  </div>
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-white/10 rounded-full transition-all"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
                <p className="text-white/80 text-sm mb-4">
                  {project.description || "No description available"}
                </p>
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <span className="flex items-center gap-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          project.language === "TypeScript"
                            ? "#3178c6"
                            : project.language === "JavaScript"
                            ? "#f1e05a"
                            : project.language === "HTML"
                            ? "#e34c26"
                            : "#6cc644",
                      }}
                    />
                    {project.language || "Unknown"}
                  </span>
                  <span>⭐ {project.stargazers_count}</span>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      )}

      {activeTab === "professional" && (
        <div className="space-y-6">
          {professionalProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/10 rounded-lg">{project.icon}</div>
                <h2 className="text-xl font-semibold">{project.title}</h2>
              </div>
              <p className="text-white/80 mb-4">{project.description}</p>
              <div className="space-y-2">
                {project.achievements.map((achievement, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-white/70"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsContent;
