// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Shield,
//   Book,
//   Brain,
//   Database,
//   Layout,
//   Paintbrush,
//   Lightbulb,
//   Code,
//   LucideProps,
// } from "lucide-react";

// // ==================== Interfaces and Types ====================
// interface Skill {
//   id: string;
//   title: string;
//   level: number;
//   children: string[];
//   description: string;
//   unlocked: boolean;
//   position: { x: number; y: number };
// }

// interface Character {
//   level: number;
//   xp: number;
//   skills: Record<string, Skill>;
// }

// interface GameState {
//   character: Character;
//   selectedSkill: Skill | null;
// }

// interface Quest {
//   id: string;
//   title: string;
//   description: string;
//   reward: number;
//   completed: boolean;
// }

// interface Item {
//   id: string;
//   name: string;
//   description: string;
//   effect: (skills: Record<string, Skill>) => Record<string, Skill>;
// }

// // ==================== Constants ====================
// const XP_PER_LEVEL = 100;

// const initialCharacter: Character = {
//   level: 1,
//   xp: 0,
//   skills: {
//     root: {
//       id: "root",
//       title: "Core Skills",
//       level: 1,
//       children: ["frontend", "backend", "design"],
//       description: "Foundation of all skills",
//       unlocked: true,
//       position: { x: 400, y: 100 },
//     },
//     frontend: {
//       id: "frontend",
//       title: "Frontend",
//       level: 0,
//       children: ["react", "typescript"],
//       description: "Web interface development",
//       unlocked: false,
//       position: { x: 200, y: 250 },
//     },
//     backend: {
//       id: "backend",
//       title: "Backend",
//       level: 0,
//       children: ["nodejs", "databases"],
//       description: "Server-side development",
//       unlocked: false,
//       position: { x: 400, y: 250 },
//     },
//     design: {
//       id: "design",
//       title: "Design",
//       level: 0,
//       children: ["ui", "ux"],
//       description: "Visual and interaction design",
//       unlocked: false,
//       position: { x: 600, y: 250 },
//     },
//     react: {
//       id: "react",
//       title: "React",
//       level: 0,
//       children: [],
//       description: "Modern React development",
//       unlocked: false,
//       position: { x: 150, y: 400 },
//     },
//     typescript: {
//       id: "typescript",
//       title: "TypeScript",
//       level: 0,
//       children: [],
//       description: "Type-safe JavaScript",
//       unlocked: false,
//       position: { x: 250, y: 400 },
//     },
//     nodejs: {
//       id: "nodejs",
//       title: "Node.js",
//       level: 0,
//       children: [],
//       description: "Server-side JavaScript",
//       unlocked: false,
//       position: { x: 350, y: 400 },
//     },
//     databases: {
//       id: "databases",
//       title: "Databases",
//       level: 0,
//       children: [],
//       description: "Data storage",
//       unlocked: false,
//       position: { x: 450, y: 400 },
//     },
//     ui: {
//       id: "ui",
//       title: "UI Design",
//       level: 0,
//       children: [],
//       description: "User interface design",
//       unlocked: false,
//       position: { x: 550, y: 400 },
//     },
//     ux: {
//       id: "ux",
//       title: "UX Design",
//       level: 0,
//       children: [],
//       description: "User experience design",
//       unlocked: false,
//       position: { x: 650, y: 400 },
//     },
//   },
// };

// const initialQuests: Quest[] = [
//   {
//     id: "learn-react",
//     title: "Learn React",
//     description: "Upgrade your React skill to level 3.",
//     reward: 50,
//     completed: false,
//   },
// ];

// const initialItems: Item[] = [
//   {
//     id: "xp-boost",
//     name: "XP Boost",
//     description: "Grants 50 XP when used.",
//     effect: (skills) => skills, // Placeholder effect
//   },
// ];

// // ==================== Utility Functions ====================
// const saveGame = (gameState: GameState) => {
//   localStorage.setItem("gameState", JSON.stringify(gameState));
// };

// const loadGame = (): GameState | null => {
//   const savedGameState = localStorage.getItem("gameState");
//   return savedGameState ? JSON.parse(savedGameState) : null;
// };

// // ==================== Components ====================
// const CharacterView = ({
//   totalLevel,
//   skills,
//   level,
//   xp,
// }: {
//   totalLevel: number;
//   skills: Record<string, Skill>;
//   level: number;
//   xp: number;
// }) => {
//   const combatPower =
//     skills.frontend.level + skills.react.level + skills.typescript.level;
//   const magicPower =
//     skills.backend.level + skills.nodejs.level + skills.databases.level;
//   const wisdomPower = skills.design.level + skills.ui.level + skills.ux.level;

//   return (
//     <div className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-gray-900/90 p-6 rounded-lg border border-amber-500/30 w-64">
//       <div className="text-center mb-4">
//         <motion.div
//           className="w-32 h-32 mx-auto bg-gradient-to-b from-purple-600 to-purple-800 rounded-full border-4 border-amber-500 mb-2"
//           animate={{
//             boxShadow: `0 0 ${
//               totalLevel * 2
//             }px ${totalLevel}px rgba(245, 158, 11, 0.3)`,
//           }}
//         >
//           <motion.div
//             className="w-full h-full bg-contain bg-center bg-no-repeat"
//             style={{ backgroundImage: "url('/api/placeholder/128/128')" }}
//           />
//         </motion.div>
//         <h3 className="text-xl font-bold text-amber-500">Level {level}</h3>
//         <p className="text-sm text-gray-400">
//           XP: {xp}/{XP_PER_LEVEL}
//         </p>
//       </div>

//       <div className="space-y-3">
//         <div className="flex items-center justify-between">
//           <span className="text-red-400">Combat Power</span>
//           <div className="h-2 w-32 bg-gray-700 rounded">
//             <motion.div
//               className="h-full bg-red-500 rounded"
//               initial={{ width: 0 }}
//               animate={{ width: `${(combatPower / 15) * 100}%` }}
//             />
//           </div>
//         </div>
//         <div className="flex items-center justify-between">
//           <span className="text-blue-400">Magic Power</span>
//           <div className="h-2 w-32 bg-gray-700 rounded">
//             <motion.div
//               className="h-full bg-blue-500 rounded"
//               initial={{ width: 0 }}
//               animate={{ width: `${(magicPower / 15) * 100}%` }}
//             />
//           </div>
//         </div>
//         <div className="flex items-center justify-between">
//           <span className="text-green-400">Wisdom</span>
//           <div className="h-2 w-32 bg-gray-700 rounded">
//             <motion.div
//               className="h-full bg-green-500 rounded"
//               initial={{ width: 0 }}
//               animate={{ width: `${(wisdomPower / 15) * 100}%` }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const SkillNode = ({
//   skill,
//   onClick,
//   connected,
// }: {
//   skill: Skill;
//   onClick: () => void;
//   connected: boolean;
// }) => {
//   const icons: Record<string, React.ComponentType<LucideProps>> = {
//     root: Shield,
//     frontend: Code,
//     backend: Database,
//     design: Paintbrush,
//     react: Layout,
//     typescript: Book,
//     nodejs: Brain,
//     databases: Database,
//     ui: Lightbulb,
//     ux: Paintbrush,
//   };

//   const Icon = icons[skill.id] || Shield;

//   return (
//     <motion.div
//       className={`relative ${connected ? "opacity-100" : "opacity-50"}`}
//       whileHover={connected ? { scale: 1.05 } : {}}
//       onClick={() => connected && onClick()}
//     >
//       <motion.div
//         className={`w-16 h-16 rounded-lg relative cursor-pointer
//           ${
//             connected
//               ? "bg-gradient-to-br from-amber-500/20 to-amber-700/20"
//               : "bg-gray-800/50"
//           }
//           border-2 ${skill.unlocked ? "border-amber-500" : "border-gray-700"}
//           ${skill.level > 0 ? "ring-2 ring-amber-500 ring-opacity-50" : ""}
//         `}
//         animate={{
//           boxShadow:
//             skill.level > 0
//               ? `0 0 ${skill.level * 5}px ${
//                   skill.level * 2
//                 }px rgba(245, 158, 11, 0.3)`
//               : "none",
//         }}
//       >
//         <div className="absolute inset-0 flex items-center justify-center">
//           <Icon
//             className={`w-8 h-8 ${
//               skill.unlocked ? "text-amber-500" : "text-gray-600"
//             }`}
//           />
//         </div>
//       </motion.div>

//       <motion.div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1">
//         {[...Array(5)].map((_, i) => (
//           <motion.div
//             key={i}
//             className={`w-2 h-2 rounded-full ${
//               i < skill.level ? "bg-amber-500" : "bg-gray-700"
//             }`}
//             animate={{ scale: i < skill.level ? [1, 1.2, 1] : 1 }}
//             transition={{
//               duration: 0.3,
//               repeat: i < skill.level ? Infinity : 0,
//               repeatDelay: 1,
//             }}
//           />
//         ))}
//       </motion.div>

//       <div className="absolute top-full mt-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
//         <h3
//           className={`text-sm font-bold ${
//             skill.unlocked ? "text-amber-500" : "text-gray-600"
//           }`}
//         >
//           {skill.title}
//         </h3>
//       </div>
//     </motion.div>
//   );
// };

// const QuestsPanel = ({ quests }: { quests: Quest[] }) => (
//   <div className="fixed right-4 top-4 bg-gray-900/90 p-4 rounded-lg border border-amber-500/30 w-64">
//     <h3 className="text-lg font-bold text-amber-500">Quests</h3>
//     <ul className="mt-2 space-y-2">
//       {quests.map((quest) => (
//         <li key={quest.id} className="text-sm text-gray-300">
//           {quest.title} - {quest.completed ? "✅" : "❌"}
//         </li>
//       ))}
//     </ul>
//   </div>
// );

// const InventoryPanel = ({
//   inventory,
//   useItem,
// }: {
//   inventory: Item[];
//   useItem: (itemId: string) => void;
// }) => (
//   <div className="fixed right-4 top-48 bg-gray-900/90 p-4 rounded-lg border border-amber-500/30 w-64">
//     <h3 className="text-lg font-bold text-amber-500">Inventory</h3>
//     <ul className="mt-2 space-y-2">
//       {inventory.map((item) => (
//         <li key={item.id} className="text-sm text-gray-300">
//           {item.name} - <button onClick={() => useItem(item.id)}>Use</button>
//         </li>
//       ))}
//     </ul>
//   </div>
// );

// const SkillTree = () => {
//   const [gameState, setGameState] = useState<GameState>(
//     loadGame() || { character: initialCharacter, selectedSkill: null }
//   );
//   const [quests, setQuests] = useState<Quest[]>(initialQuests);
//   const [inventory, setInventory] = useState<Item[]>(initialItems);

//   const { character, selectedSkill } = gameState;
//   const { skills, level, xp } = character;

//   const totalLevel = Object.values(skills).reduce(
//     (sum, skill) => sum + skill.level,
//     0
//   );

//   const addXP = (amount: number) => {
//     setGameState((prev) => {
//       let newXP = prev.character.xp + amount;
//       let newLevel = prev.character.level;

//       while (newXP >= XP_PER_LEVEL) {
//         newXP -= XP_PER_LEVEL;
//         newLevel += 1;
//       }

//       return {
//         ...prev,
//         character: {
//           ...prev.character,
//           xp: newXP,
//           level: newLevel,
//         },
//       };
//     });
//   };

//   const upgradeSkill = (skillId: string) => {
//     setGameState((prev) => {
//       const newSkills = { ...prev.character.skills };
//       const skill = newSkills[skillId];

//       if (skill.level < 5) {
//         skill.level += 1;
//         skill.children.forEach((childId) => {
//           if (newSkills[childId]) {
//             newSkills[childId].unlocked = true;
//           }
//         });
//         addXP(20); // Add XP for upgrading a skill
//       }

//       return {
//         ...prev,
//         character: {
//           ...prev.character,
//           skills: newSkills,
//         },
//       };
//     });
//   };

//   const checkQuests = () => {
//     setQuests((prevQuests) =>
//       prevQuests.map((quest) => {
//         if (!quest.completed) {
//           if (quest.id === "learn-react" && skills.react.level >= 3) {
//             addXP(quest.reward);
//             return { ...quest, completed: true };
//           }
//         }
//         return quest;
//       })
//     );
//   };

//   useEffect(() => {
//     checkQuests();
//   }, [skills]);

//   const useItem = (itemId: string) => {
//     setInventory((prevInventory) => {
//       const item = prevInventory.find((i) => i.id === itemId);
//       if (item) {
//         setGameState((prev) => ({
//           ...prev,
//           character: {
//             ...prev.character,
//             skills: item.effect(prev.character.skills),
//           },
//         }));
//         return prevInventory.filter((i) => i.id !== itemId);
//       }
//       return prevInventory;
//     });
//   };

//   useEffect(() => {
//     saveGame(gameState);
//   }, [gameState]);

//   const isConnected = (skillId: string) => {
//     const parentSkill = Object.values(skills).find((skill) =>
//       skill.children.includes(skillId)
//     );
//     return !parentSkill || parentSkill.level > 0;
//   };

//   return (
//     <div className="relative min-h-screen bg-gray-900 overflow-hidden p-8">
//       <CharacterView
//         totalLevel={totalLevel}
//         skills={skills}
//         level={level}
//         xp={xp}
//       />
//       <QuestsPanel quests={quests} />
//       <InventoryPanel inventory={inventory} useItem={useItem} />

//       <div className="absolute inset-0 flex items-center justify-center">
//         <svg
//           className="absolute w-full h-full"
//           style={{ pointerEvents: "none" }}
//         >
//           {Object.values(skills).map((skill) =>
//             skill.children.map((childId) => {
//               const childSkill = skills[childId];
//               return (
//                 <motion.line
//                   key={`${skill.id}-${childId}`}
//                   x1={skill.position.x + 32}
//                   y1={skill.position.y + 32}
//                   x2={childSkill.position.x + 32}
//                   y2={childSkill.position.y + 32}
//                   stroke={skill.level > 0 ? "#f59e0b" : "#374151"}
//                   strokeWidth="2"
//                   initial={{ pathLength: 0 }}
//                   animate={{ pathLength: 1 }}
//                   transition={{ duration: 1 }}
//                 />
//               );
//             })
//           )}
//         </svg>

//         {Object.values(skills).map((skill) => (
//           <motion.div
//             key={skill.id}
//             className="absolute"
//             style={{ left: skill.position.x, top: skill.position.y }}
//             initial={{ opacity: 0, scale: 0 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <SkillNode
//               skill={skill}
//               onClick={() => upgradeSkill(skill.id)}
//               connected={isConnected(skill.id)}
//             />
//           </motion.div>
//         ))}
//       </div>

//       <AnimatePresence>
//         {selectedSkill && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             className="fixed bottom-4 right-4 p-4 bg-gray-800 rounded-lg border border-amber-500"
//           >
//             <h3 className="text-lg font-bold text-amber-500">
//               {selectedSkill.title}
//             </h3>
//             <p className="text-gray-300">{selectedSkill.description}</p>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default SkillTree;
