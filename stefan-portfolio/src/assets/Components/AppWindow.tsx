import { motion } from "framer-motion";
import { Minus, Square, X } from "lucide-react";
import { ReactNode } from "react";

interface AppWindowProps {
  app: {
    icon: ReactNode;
    title: string;
  };
  onClose: () => void;
  children: ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  onMinimize: () => void;
  onMaximize: () => void;
  position?: { x: number; y: number };
}

const AppWindow: React.FC<AppWindowProps> = ({
  app,
  onClose,
  children,
  isMinimized,
  isMaximized,
  onMinimize,
  onMaximize,
  position = { x: 0, y: 0 },
}) => {
  return (
    <motion.div
      drag
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        x: position.x,
        y: position.y,
        width: isMaximized ? "100%" : "auto",
        height: isMaximized ? "100%" : "auto",
      }}
      exit={{ scale: 0.95, opacity: 0 }}
      className={`absolute bg-black/70 backdrop-blur-md rounded-lg overflow-hidden
                ${
                  isMaximized
                    ? "top-0 left-0 right-0 bottom-0"
                    : "min-w-[600px] min-h-[400px]"
                }
                ${isMinimized ? "hidden" : ""}`}
    >
      <div className="flex items-center justify-between p-2 bg-black/30 cursor-move">
        <div className="flex items-center gap-2">
          <span className="text-xl">{app.icon}</span>
          <span className="text-white">{app.title}</span>
        </div>
        <div className="flex gap-2">
          <button
            className="text-white hover:bg-white/10 p-2 rounded-md"
            onClick={onMinimize}
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            className="text-white hover:bg-white/10 p-2 rounded-md"
            onClick={onMaximize}
          >
            <Square className="h-4 w-4" />
          </button>
          <button
            className="text-white hover:bg-white/10 p-2 rounded-md"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-4 text-white h-full overflow-auto">{children}</div>
    </motion.div>
  );
};

export default AppWindow;
