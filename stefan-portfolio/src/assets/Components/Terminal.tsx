import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Welcome to Portfolio Terminal v1.0.0",
    'Type "help" for available commands',
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => `Available commands:
      - about: Display information about me
      - skills: List my technical skills
      - projects: Show my projects
      - contact: Display contact information
      - clear: Clear terminal
      - ascii: Show some cool ASCII art`,
    about: () => `Stefan Davchev
      A&R, Music Promoter, Label Owner at Sony Music/FYEO/The District
      Currently working with over 5000 artists worldwide`,
    skills: () => `Technical Skills:
      • JavaScript, React, TypeScript, Node.js
      • Python, MongoDB, PostgreSQL
      • Video Production & Editing
      • Music Production & Management`,
    projects: () => `Notable Projects:
      1. Luminal Records (Sony Music Label)
      2. YouTube Channel (715k+ subscribers)
      3. TikTok Management (10M+ daily impressions)`,
    contact: () => `Contact Information:
      Email: davcevs@gmail.com
      GitHub: github.com/davcevs`,
    clear: () => {
      setHistory([]);
      return "";
    },
    ascii: () => `
     ____  _        __              
    / ___|| |_ ___ / _| __ _ _ __  
    \\___ \\| __/ _ \\ |_ / _\` | '_ \\ 
     ___) | ||  __/  _| (_| | | | |
    |____/ \\__\\___|_|  \\__,_|_| |_|
    `,
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const command = commands[trimmedCmd as keyof typeof commands];

    if (command) {
      return command();
    } else if (trimmedCmd === "") {
      return "";
    } else {
      return `Command not found: ${trimmedCmd}. Type "help" for available commands.`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = handleCommand(input);
    setHistory([...history, `> ${input}`, result]);
    setCommandHistory([...commandHistory, input]);
    setInput("");
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/90 rounded-lg overflow-hidden backdrop-blur-md"
    >
      <div className="bg-gray-800 p-2 flex items-center gap-2">
        <TerminalIcon className="h-4 w-4" />
        <span className="text-sm">Portfolio Terminal</span>
      </div>

      <div
        ref={terminalRef}
        className="p-4 h-96 overflow-y-auto font-mono text-sm"
      >
        {history.map((line, i) => (
          <div key={i} className="mb-1 whitespace-pre-wrap">
            {line}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="mr-2">{">"}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none"
            autoFocus
          />
        </form>
      </div>
    </motion.div>
  );
};

export default Terminal;
