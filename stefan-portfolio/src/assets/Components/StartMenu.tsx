import { motion } from "framer-motion";
import { Power, Settings, User } from "lucide-react";
import { ReactNode } from "react";

interface App {
  id: string;
  title: string;
  icon: ReactNode;
}

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  apps: App[];
  onAppClick: (appId: string) => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onClose, apps, onAppClick }) => {
  const pinnedApps: App[] = [
    {
      id: "settings",
      title: "Settings",
      icon: <Settings className="h-6 w-6" />,
    },
    ...apps,
    { id: "profile", title: "Profile", icon: <User className="h-6 w-6" /> },
    ...apps,
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      className="absolute bottom-14 left-4 w-96 bg-black/70 backdrop-blur-md 
                 rounded-lg p-4 text-white"
    >
      <div className="mb-4">
        <input
          type="text"
          placeholder="Type to search..."
          className="w-full bg-white/10 rounded-md px-4 py-2 text-white 
                     placeholder-white/50 outline-none focus:ring-2 
                     focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-sm text-white/70 mb-2">Pinned</h3>
        <div className="grid grid-cols-3 gap-4">
          {pinnedApps.map((app) => (
            <motion.div
              key={app.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center p-4 rounded-lg 
                       hover:bg-white/10 cursor-pointer"
              onClick={() => {
                onAppClick(app.id);
                onClose();
              }}
            >
              <div className="text-2xl">{app.icon}</div>
              <span className="mt-2 text-sm text-center">{app.title}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <User className="h-5 w-5" />
          </div>
          <span className="text-sm">User Name</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full hover:bg-white/10"
        >
          <Power className="h-5 w-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default StartMenu;
