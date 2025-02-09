import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Wifi, Volume2, Battery } from "lucide-react";
import AppWindow from "./AppWindow";
import StartMenu from "./StartMenu";
import QuickSettings from "./QuickSettings";
import AboutContent from "./AboutContent";
import { App, WindowPosition } from "../types/types";
import SettingsContent from "./SettingsContent";
import ProjectsContent from "./ProjectsContent";
import ExperienceContent from "./ExperianceContent";
import SkillsContent from "./SkillsContent";
import ContactContent from "./Contact";
import Terminal from "./Terminal";
import DesktopWidgets from "./DesktopWidgets";
import NotificationSystem from "./NotificationSystem";
import { useNotifications } from "../hooks/useNotifications";

const MainComponent = () => {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState(false);
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [windowPositions, setWindowPositions] = useState<
    Record<string, WindowPosition>
  >({});
  const [iconPositions, setIconPositions] = useState<
    Record<string, { x: number; y: number }>
  >({});
  const [currentBackground, setCurrentBackground] = useState(0);
  const { notifications, dismissNotification } = useNotifications();

  const backgrounds = [
    "https://preview.redd.it/6ynzij07ny571.jpg?width=3840&format=pjpg&auto=webp&s=3fa29e245e8f26a08b2e84144c0542c4e774efc3",
    "https://images.unsplash.com/photo-1702731798348-2ef25e35ead3?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1702731798357-22bd8ca4a484?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1699491224496-fbee93dc0325?q=80&w=2032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const apps: App[] = [
    {
      id: "about",
      title: "About Me",
      icon: "👤",
      content: <AboutContent />,
    },
    {
      id: "experience",
      title: "Experience",
      icon: "💼",
      content: <ExperienceContent />,
    },
    {
      id: "skills",
      title: "Skills & Growth",
      icon: "📈",
      content: <SkillsContent />,
    },
    {
      id: "contact",
      title: "Contact",
      icon: "📧",
      content: <ContactContent />,
    },
    {
      id: "settings",
      title: "Settings",
      icon: "⚙️",
      content: (
        <SettingsContent
          currentBackground={currentBackground}
          onBackgroundChange={setCurrentBackground}
        />
      ),
    },
    {
      id: "projects",
      title: "Projects",
      icon: "💻",
      content: <ProjectsContent />,
    },
    {
      id: "terminal",
      title: "Terminal",
      icon: "🖥️",
      content: <Terminal />,
    },
  ];

  useEffect(() => {
    const initialPositions: Record<string, { x: number; y: number }> = {};
    apps.forEach((app, index) => {
      initialPositions[app.id] = { x: 50, y: 100 + index * 100 };
    });
    setIconPositions(initialPositions);
  }, []);

  const openWindow = (appId: string) => {
    if (!openWindows.includes(appId)) {
      setOpenWindows([...openWindows, appId]);
      setWindowPositions({
        ...windowPositions,
        [appId]: {
          x: Math.random() * 100,
          y: Math.random() * 100,
        },
      });
    }
  };

  const closeWindow = (appId: string) => {
    setOpenWindows(openWindows.filter((id) => id !== appId));
    setMinimizedWindows(minimizedWindows.filter((id) => id !== appId));
  };

  const minimizeWindow = (appId: string) => {
    if (!minimizedWindows.includes(appId)) {
      setMinimizedWindows([...minimizedWindows, appId]);
    }
  };

  const maximizeWindow = (appId: string) => {
    setMinimizedWindows(minimizedWindows.filter((id) => id !== appId));
  };

  const toggleWindow = (appId: string) => {
    if (minimizedWindows.includes(appId)) {
      maximizeWindow(appId);
    } else {
      minimizeWindow(appId);
    }
  };

  const getTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDate = () => {
    return new Date().toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleIconDrag = (
    appId: string,
    info: { point: { x: number; y: number } }
  ) => {
    const newX = info.point.x;
    const newY = info.point.y;

    // Prevent overlapping with other icons
    let isOverlapping = false;
    Object.entries(iconPositions).forEach(([id, pos]) => {
      if (id !== appId) {
        const distance = Math.sqrt((newX - pos.x) ** 2 + (newY - pos.y) ** 2);
        if (distance < 100) {
          isOverlapping = true;
        }
      }
    });

    if (!isOverlapping) {
      setIconPositions((prev) => ({
        ...prev,
        [appId]: { x: newX, y: newY },
      }));
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(${backgrounds[currentBackground]})` }}
    >
      {/* Desktop Icons */}
      <div className="grid grid-cols-1 gap-6 p-4">
        {apps.map((app) => (
          <motion.div
            key={app.id}
            drag
            dragConstraints={{
              left: 0,
              right: window.innerWidth,
              top: 0,
              bottom: window.innerHeight,
            }}
            onDragEnd={(e, info) => handleIconDrag(app.id, info)}
            style={{
              position: "absolute",
              left: iconPositions[app.id]?.x || 0,
              top: iconPositions[app.id]?.y || 0,
              cursor: "grab",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => openWindow(app.id)}
          >
            <div className="text-4xl bg-black/20 p-2 rounded-lg backdrop-blur-sm group-hover:bg-black/30">
              {app.icon}
            </div>
            <span className="text-white text-sm mt-1 px-2 py-1 rounded bg-black/20 backdrop-blur-sm">
              {app.title}
            </span>
          </motion.div>
        ))}
      </div>

      {/* App Windows */}
      <AnimatePresence>
        {openWindows.map((appId) => {
          const app = apps.find((a) => a.id === appId);
          if (!app) return null;

          return (
            <AppWindow
              key={appId}
              app={{
                title: app.title,
                icon: app.icon,
              }}
              onClose={() => closeWindow(appId)}
              isMinimized={minimizedWindows.includes(appId)}
              onMinimize={() => minimizeWindow(appId)}
              onMaximize={() => maximizeWindow(appId)}
              position={windowPositions[appId]}
              isMaximized={false}
            >
              {app.content}
            </AppWindow>
          );
        })}
      </AnimatePresence>
      <DesktopWidgets />
      <NotificationSystem
        notifications={notifications}
        onDismiss={dismissNotification}
      />

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/70 backdrop-blur-md flex items-center px-4 justify-between">
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-md hover:bg-white/10"
            onClick={() => {
              setIsStartOpen(!isStartOpen);
              setIsQuickSettingsOpen(false);
            }}
          >
            <Monitor className="h-6 w-6 text-white" />
          </motion.button>

          {/* Open Windows in Taskbar */}
          <div className="flex gap-2">
            {openWindows.map((appId) => {
              const app = apps.find((a) => a.id === appId);
              if (!app) return null;

              return (
                <motion.button
                  key={appId}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-md hover:bg-white/10 ${
                    !minimizedWindows.includes(appId) ? "bg-white/20" : ""
                  }`}
                  onClick={() => toggleWindow(appId)}
                >
                  <span className="text-white text-xl">{app.icon}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4 text-white text-sm">
          <div
            className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-white/10 cursor-pointer"
            onClick={() => {
              setIsQuickSettingsOpen(!isQuickSettingsOpen);
              setIsStartOpen(false);
            }}
          >
            <Wifi className="h-4 w-4" />
            <Battery className="h-4 w-4" />
            <Volume2 className="h-4 w-4" />
          </div>
          <div className="flex flex-col items-end">
            <span>{getTime()}</span>
            <span className="text-xs">{getDate()}</span>
          </div>
        </div>
      </div>

      {/* Start Menu */}
      <AnimatePresence>
        {isStartOpen && (
          <StartMenu
            isOpen={isStartOpen}
            onClose={() => setIsStartOpen(false)}
            apps={apps}
            onAppClick={openWindow}
          />
        )}
      </AnimatePresence>

      {/* Quick Settings */}
      <AnimatePresence>
        {isQuickSettingsOpen && (
          <QuickSettings
            isOpen={isQuickSettingsOpen}
            onClose={() => setIsQuickSettingsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainComponent;
