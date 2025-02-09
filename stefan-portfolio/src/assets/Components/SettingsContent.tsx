import { motion } from "framer-motion";
import { Palette, Monitor, Sun, Moon } from "lucide-react";

interface SettingsContentProps {
  currentBackground: number;
  onBackgroundChange: (index: number) => void;
}

const SettingsContent = ({
  currentBackground,
  onBackgroundChange,
}: SettingsContentProps) => {
  const backgrounds = [
    {
      id: 0,
      name: "Light Windows",
      preview:
        "https://preview.redd.it/6ynzij07ny571.jpg?width=3840&format=pjpg&auto=webp&s=3fa29e245e8f26a08b2e84144c0542c4e774efc3",
      theme: "light",
    },
    {
      id: 1,
      name: "Dark Windows",
      preview:
        "https://images.unsplash.com/photo-1702731798348-2ef25e35ead3?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      theme: "dark",
    },
    {
      id: 2,
      name: "Dark Windows 2",
      preview:
        "https://images.unsplash.com/photo-1702731798357-22bd8ca4a484?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      theme: "dark",
    },
    {
      id: 3,
      name: "Dark Windows 3",
      preview:
        "https://images.unsplash.com/photo-1699491224496-fbee93dc0325?q=80&w=2032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      theme: "dark",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Palette className="h-6 w-6" />
          Personalization
        </h2>

        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Background
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {backgrounds.map((bg) => (
              <motion.div
                key={bg.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative rounded-lg overflow-hidden cursor-pointer
                          ${
                            currentBackground === bg.id
                              ? "ring-2 ring-blue-500"
                              : ""
                          }`}
                onClick={() => onBackgroundChange(bg.id)}
              >
                <img
                  src={bg.preview}
                  alt={bg.name}
                  className="w-full h-32 object-cover"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-2 bg-black/50
                              backdrop-blur-sm"
                >
                  <p className="text-sm text-white">{bg.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white/10 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Sun className="h-5 w-5" />
          Theme
        </h3>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 p-4 rounded-lg bg-white/10 hover:bg-white/20"
          >
            <Sun className="h-6 w-6 mx-auto mb-2" />
            <span className="block text-sm">Light</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 p-4 rounded-lg bg-white/10 hover:bg-white/20"
          >
            <Moon className="h-6 w-6 mx-auto mb-2" />
            <span className="block text-sm">Dark</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SettingsContent;
