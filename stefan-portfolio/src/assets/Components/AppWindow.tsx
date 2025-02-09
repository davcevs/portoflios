import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import {
  Minus,
  X,
  Maximize2,
  Minimize2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface WindowPosition {
  x: number;
  y: number;
  width?: number;
  height?: number;
}

interface AppWindowProps {
  app: {
    icon: React.ReactNode;
    title: string;
  };
  onClose: () => void;
  children: React.ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  onMinimize: () => void;
  onMaximize: () => void;
  position?: WindowPosition;
  zIndex?: number;
  onFocus?: () => void;
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
  zIndex = 0,
  onFocus,
}) => {
  const [windowSize, setWindowSize] = useState({ width: 800, height: 600 });
  const [prevSize, setPrevSize] = useState<WindowPosition | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (isMaximized) {
      if (!prevSize) {
        setPrevSize({
          x: position.x,
          y: position.y,
          width: windowSize.width,
          height: windowSize.height,
        });
      }
    } else if (prevSize) {
      setWindowSize({
        width: prevSize.width || 800,
        height: prevSize.height || 600,
      });
      setPrevSize(null);
    }
  }, [isMaximized]);

  const handleResize = (e: React.MouseEvent, direction: string) => {
    if (isMaximized) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = windowSize.width;
    const startHeight = windowSize.height;

    const handleMouseMove = (e: MouseEvent) => {
      setIsResizing(true);
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      switch (direction) {
        case "e":
          setWindowSize({
            ...windowSize,
            width: Math.max(400, startWidth + deltaX),
          });
          break;
        case "s":
          setWindowSize({
            ...windowSize,
            height: Math.max(300, startHeight + deltaY),
          });
          break;
        case "se":
          setWindowSize({
            width: Math.max(400, startWidth + deltaX),
            height: Math.max(300, startHeight + deltaY),
          });
          break;
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const variants = {
    open: {
      scale: 1,
      opacity: 1,
      x: isMaximized ? 0 : position.x,
      y: isMaximized ? 0 : position.y,
      width: isMaximized ? "100%" : windowSize.width,
      height: isMaximized ? "100%" : windowSize.height,
      transition: { type: "spring", damping: 20, stiffness: 300 },
    },
    closed: {
      scale: 0.95,
      opacity: 0,
      transition: { duration: 0.2 },
    },
    minimized: {
      scale: 0.5,
      opacity: 0,
      y: window.innerHeight,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      ref={windowRef}
      drag={!isMaximized && !isResizing}
      dragControls={dragControls}
      dragMomentum={false}
      dragConstraints={{
        left: 0,
        right: window.innerWidth - windowSize.width,
        top: 0,
        bottom: window.innerHeight - windowSize.height,
      }}
      initial="closed"
      animate={isMinimized ? "minimized" : "open"}
      exit="closed"
      variants={variants}
      className={`fixed bg-black/70 backdrop-blur-md rounded-lg overflow-hidden shadow-2xl`}
      style={{
        zIndex,
        width: isMaximized ? "100%" : windowSize.width,
        height: isMaximized ? "100%" : windowSize.height,
      }}
      onMouseDown={onFocus}
    >
      {/* Window Header */}
      <div
        className="flex items-center justify-between p-2 bg-black/30 cursor-move"
        onPointerDown={(e) => {
          e.preventDefault();
          dragControls.start(e);
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{app.icon}</span>
          <span className="text-white font-medium">{app.title}</span>
        </div>
        <div className="flex gap-1">
          <button
            className="text-white hover:bg-white/10 p-2 rounded-md transition-colors"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          <button
            className="text-white hover:bg-white/10 p-2 rounded-md transition-colors"
            onClick={onMinimize}
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            className="text-white hover:bg-white/10 p-2 rounded-md transition-colors"
            onClick={onMaximize}
          >
            {isMaximized ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
          <button
            className="text-white hover:bg-red-400/20 p-2 rounded-md transition-colors"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="relative"
          >
            <div
              className="p-4 text-white overflow-auto"
              style={{
                height: isMaximized
                  ? "calc(100vh - 48px)"
                  : windowSize.height - 48,
              }}
            >
              {children}
            </div>

            {/* Resize Handles */}
            {!isMaximized && (
              <>
                <div
                  className="absolute right-0 top-0 bottom-0 w-2 cursor-e-resize hover:bg-blue-500/20"
                  onMouseDown={(e) => handleResize(e, "e")}
                />
                <div
                  className="absolute left-0 right-0 bottom-0 h-2 cursor-s-resize hover:bg-blue-500/20"
                  onMouseDown={(e) => handleResize(e, "s")}
                />
                <div
                  className="absolute right-0 bottom-0 w-4 h-4 cursor-se-resize hover:bg-blue-500/20"
                  onMouseDown={(e) => handleResize(e, "se")}
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AppWindow;
