import { useState } from "react";
import { motion } from "framer-motion";
import { Folder, File, ArrowLeft } from "lucide-react";

interface FileExplorerProps {
  onClose: () => void;
}

interface FileItem {
  name: string;
  type: "file" | "folder";
  content?: string; // For file previews
}

const FileExplorer = ({ onClose }: FileExplorerProps) => {
  const [currentFolder, setCurrentFolder] = useState<FileItem[]>([]);
  const [history, setHistory] = useState<FileItem[][]>([]);

  // Sample file structure
  const rootFolder: FileItem[] = [
    { name: "Documents", type: "folder" },
    { name: "Pictures", type: "folder" },
    { name: "Report.pdf", type: "file", content: "This is a PDF file." },
    { name: "Image.png", type: "file", content: "This is an image file." },
  ];

  const folders: Record<string, FileItem[]> = {
    Documents: [
      { name: "Project 1", type: "folder" },
      { name: "Project 2", type: "folder" },
      { name: "Notes.txt", type: "file", content: "These are my notes." },
    ],
    Pictures: [
      { name: "Vacation", type: "folder" },
      { name: "Family", type: "folder" },
      { name: "Photo1.jpg", type: "file", content: "This is a photo." },
    ],
  };

  // Navigate into a folder
  const navigateToFolder = (folderName: string) => {
    setHistory((prev) => [...prev, currentFolder]);
    setCurrentFolder(folders[folderName] || []);
  };

  // Go back to the previous folder
  const goBack = () => {
    if (history.length > 0) {
      const previousFolder = history[history.length - 1];
      setCurrentFolder(previousFolder);
      setHistory((prev) => prev.slice(0, -1));
    } else {
      setCurrentFolder(rootFolder);
    }
  };

  // Handle file click (show preview)
  const handleFileClick = (file: FileItem) => {
    if (file.type === "file") {
      alert(`Preview: ${file.content}`);
    }
  };

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-md rounded-lg shadow-lg w-96 h-96 flex flex-col"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            onClick={goBack}
            disabled={history.length === 0}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h2 className="text-lg font-semibold">File Explorer</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          ✕
        </button>
      </div>

      {/* File List */}
      <div className="p-4 flex-1 overflow-y-auto">
        {(currentFolder.length > 0 ? currentFolder : rootFolder).map(
          (item, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 rounded-md cursor-pointer flex items-center gap-2"
              onClick={() =>
                item.type === "folder"
                  ? navigateToFolder(item.name)
                  : handleFileClick(item)
              }
            >
              {item.type === "folder" ? (
                <Folder className="h-5 w-5 text-blue-500" />
              ) : (
                <File className="h-5 w-5 text-gray-500" />
              )}
              <span>{item.name}</span>
            </div>
          )
        )}
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-gray-200 text-sm text-gray-600">
        {(currentFolder.length > 0 ? currentFolder : rootFolder).length} items
      </div>
    </motion.div>
  );
};

export default FileExplorer;
