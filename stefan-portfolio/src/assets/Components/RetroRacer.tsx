// import React, { useState, useEffect, useCallback, useRef } from "react";

// const OutrunRacer = () => {
//   const SETTINGS = {
//     FOV: 100,
//     CAMERA_HEIGHT: 1000,
//     CAMERA_DEPTH: 0.84,
//     DRAW_DISTANCE: 300,
//     SEGMENT_LENGTH: 200,
//     ROAD_WIDTH: 2000,
//     LANES: 3,
//     COLORS: {
//       SKY: { top: "#72D7EE", bottom: "#FED154" },
//       TREE: { trunk: "#764A28", leaves: "#1D6B1D" },
//       ROAD: { light: "#7C7C7C", dark: "#686868" },
//       RUMBLE: { light: "#E0E0E0", dark: "#B8B8B8" },
//       LANE: { light: "#FFFFFF", dark: "#FFFFFF" },
//     },
//     SPRITES: {
//       PALM_TREE: { x: 2.5, y: 0, offset: -0.7 },
//     },
//   };

//   const [gameState, setGameState] = useState({
//     position: 0,
//     playerX: 0,
//     speed: 0,
//     rotation: 0,
//     drift: 0,
//     gear: 1,
//     rpm: 0,
//     distance: 0,
//     segments: [],
//     cars: [],
//     trackLength: 0,
//   });

//   const [controls, setControls] = useState({
//     accelerate: false,
//     brake: false,
//     left: false,
//     right: false,
//     handbrake: false,
//   });

//   // Car physics settings
//   const PHYSICS = {
//     MAX_SPEED: 400,
//     ACCELERATION: 1.5,
//     DECELERATION: -0.8,
//     BRAKE_POWER: -2,
//     DRAG: 0.99,
//     HANDLING: 0.08,
//     DRIFT_FACTOR: 0.85,
//     DRIFT_RECOVERY: 0.98,
//     GRIP_LIMIT: 0.35,
//     GEAR_RATIOS: [3.4, 2.5, 1.8, 1.3, 1, 0.8],
//     RPM_MAX: 7500,
//     RPM_MIN: 1000,
//   };

//   useEffect(() => {
//     // Generate track segments
//     const segments = [];
//     let trackLength = 0;
//     const TRACK_SIZE = 1600;

//     for (let i = 0; i < TRACK_SIZE; i++) {
//       const curve = i > 400 && i < 600 ? 2 : i > 800 && i < 1000 ? -2 : 0;

//       const y =
//         i > 300 && i < 400
//           ? Math.sin(((i - 300) * Math.PI) / 100) * 1500
//           : i > 700 && i < 800
//           ? Math.sin(((i - 700) * Math.PI) / 100) * 1500
//           : 0;

//       segments.push({
//         index: i,
//         curve,
//         y,
//         z: i * SETTINGS.SEGMENT_LENGTH,
//         sprite: i % 20 === 0 ? "PALM_TREE" : null,
//         spriteX: i % 20 === 0 ? (i % 40 === 0 ? -1 : 1) : 0,
//       });

//       trackLength = i * SETTINGS.SEGMENT_LENGTH;
//     }

//     setGameState((prev) => ({ ...prev, segments, trackLength }));
//   }, []);

//   // Handle keyboard input
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       switch (e.key.toLowerCase()) {
//         case "w":
//           setControls((prev) => ({ ...prev, accelerate: true }));
//           break;
//         case "s":
//           setControls((prev) => ({ ...prev, brake: true }));
//           break;
//         case "a":
//           setControls((prev) => ({ ...prev, left: true }));
//           break;
//         case "d":
//           setControls((prev) => ({ ...prev, right: true }));
//           break;
//         case " ":
//           setControls((prev) => ({ ...prev, handbrake: true }));
//           break;
//       }
//     };

//     const handleKeyUp = (e) => {
//       switch (e.key.toLowerCase()) {
//         case "w":
//           setControls((prev) => ({ ...prev, accelerate: false }));
//           break;
//         case "s":
//           setControls((prev) => ({ ...prev, brake: false }));
//           break;
//         case "a":
//           setControls((prev) => ({ ...prev, left: false }));
//           break;
//         case "d":
//           setControls((prev) => ({ ...prev, right: false }));
//           break;
//         case " ":
//           setControls((prev) => ({ ...prev, handbrake: false }));
//           break;
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     window.addEventListener("keyup", handleKeyUp);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       window.removeEventListener("keyup", handleKeyUp);
//     };
//   }, []);

//   // Game loop
//   useEffect(() => {
//     let lastTime = 0;
//     const gameLoop = (timestamp) => {
//       const deltaTime = (timestamp - lastTime) / 1000;
//       lastTime = timestamp;

//       setGameState((prev) => {
//         let { position, playerX, speed, rotation, drift, gear, rpm } = prev;

//         // Apply acceleration
//         const accelerationForce = controls.accelerate
//           ? PHYSICS.ACCELERATION
//           : controls.brake
//           ? PHYSICS.BRAKE_POWER
//           : PHYSICS.DECELERATION;

//         // Update speed with physics
//         speed += accelerationForce * PHYSICS.GEAR_RATIOS[gear - 1] * deltaTime;
//         speed *= PHYSICS.DRAG;
//         speed = Math.max(0, Math.min(speed, PHYSICS.MAX_SPEED));

//         // Update RPM
//         rpm += (controls.accelerate ? 200 : -100) * deltaTime;
//         rpm = Math.max(PHYSICS.RPM_MIN, Math.min(rpm, PHYSICS.RPM_MAX));

//         // Automatic gear changes
//         if (rpm > PHYSICS.RPM_MAX * 0.95 && gear < PHYSICS.GEAR_RATIOS.length) {
//           gear++;
//           rpm *= 0.7;
//         } else if (rpm < PHYSICS.RPM_MIN * 1.2 && gear > 1) {
//           gear--;
//           rpm *= 1.3;
//         }

//         // Steering and drift mechanics
//         const steerInput = (controls.left ? -1 : 0) + (controls.right ? 1 : 0);
//         const steerForce =
//           steerInput * PHYSICS.HANDLING * (1 + speed / PHYSICS.MAX_SPEED);

//         if (controls.handbrake && speed > 10) {
//           drift += steerForce * PHYSICS.DRIFT_FACTOR;
//         } else {
//           drift *= PHYSICS.DRIFT_RECOVERY;
//         }

//         rotation += (steerForce + drift) * deltaTime;
//         rotation *= 0.95; // Natural rotation recovery

//         playerX += rotation * deltaTime * speed * 0.007;
//         playerX = Math.max(-2, Math.min(2, playerX));

//         // Update position on track
//         position += speed * deltaTime;
//         if (position >= prev.trackLength) position -= prev.trackLength;

//         return {
//           ...prev,
//           position,
//           playerX,
//           speed,
//           rotation,
//           drift,
//           gear,
//           rpm,
//           distance: prev.distance + speed * deltaTime,
//         };
//       });

//       requestAnimationFrame(gameLoop);
//     };

//     const animationId = requestAnimationFrame(gameLoop);
//     return () => cancelAnimationFrame(animationId);
//   }, [controls]);

//   // Render road segments with perspective
//   const renderSegment = (segment, index) => {
//     const { position, playerX } = gameState;
//     const camera = {
//       x: playerX * SETTINGS.ROAD_WIDTH * 0.5,
//       y: SETTINGS.CAMERA_HEIGHT,
//       z: position,
//     };
//     const scale = SETTINGS.CAMERA_DEPTH / (segment.z - camera.z);
//     const projectX = (x) => {
//       const projectedX = ((1 + scale * (x - camera.x)) * window.innerWidth) / 2;
//       return projectedX;
//     };
//     const projectY = (y) => {
//       const projectedY =
//         ((1 - scale * (y - camera.y)) * window.innerHeight) / 2;
//       return projectedY;
//     };

//     // Calculate segment properties
//     const x1 = projectX(-SETTINGS.ROAD_WIDTH);
//     const x2 = projectX(SETTINGS.ROAD_WIDTH);
//     const y = projectY(segment.y);
//     const width = x2 - x1;
//     const isEvenSegment = segment.index % 2 === 0;

//     return (
//       <div
//         key={segment.index}
//         className="absolute"
//         style={{
//           left: x1,
//           bottom: y,
//           width: width,
//           height: "4px",
//           background: isEvenSegment
//             ? SETTINGS.COLORS.ROAD.light
//             : SETTINGS.COLORS.ROAD.dark,
//           borderLeft: `8px solid ${
//             isEvenSegment
//               ? SETTINGS.COLORS.RUMBLE.light
//               : SETTINGS.COLORS.RUMBLE.dark
//           }`,
//           borderRight: `8px solid ${
//             isEvenSegment
//               ? SETTINGS.COLORS.RUMBLE.light
//               : SETTINGS.COLORS.RUMBLE.dark
//           }`,
//           transform: `rotateX(${60 + segment.curve * (playerX * 0.5)}deg)`,
//         }}
//       />
//     );
//   };

//   return (
//     <div className="w-full h-screen relative overflow-hidden">
//       {/* Sky gradient */}
//       <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-yellow-200" />

//       {/* Road container */}
//       <div className="absolute inset-0" style={{ perspective: "1000px" }}>
//         <div className="relative w-full h-full">
//           {gameState.segments
//             .slice(
//               Math.floor(gameState.position / SETTINGS.SEGMENT_LENGTH),
//               Math.floor(gameState.position / SETTINGS.SEGMENT_LENGTH) +
//                 SETTINGS.DRAW_DISTANCE
//             )
//             .map((segment, index) => renderSegment(segment, index))}
//         </div>
//       </div>

//       {/* Player car */}
//       <div
//         className="absolute bottom-1/4 left-1/2 w-24 h-40 transition-transform"
//         style={{
//           transform: `
//             translateX(calc(-50% + ${gameState.playerX * 50}px))
//             rotateY(${gameState.rotation * 15}deg)
//             rotateZ(${gameState.drift * 10}deg)
//           `,
//         }}
//       >
//         <div className="w-full h-full relative">
//           <div className="absolute inset-0 bg-red-600 rounded-lg shadow-xl" />
//           <div className="absolute top-1/4 w-full h-1/2 bg-red-700" />
//           <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-400" />
//           <div className="absolute bottom-0 w-full h-1/4 bg-black" />
//           {/* Wheels */}
//           <div className="absolute -left-2 top-1/4 w-4 h-8 bg-black rounded" />
//           <div className="absolute -right-2 top-1/4 w-4 h-8 bg-black rounded" />
//           <div className="absolute -left-2 bottom-1/4 w-4 h-8 bg-black rounded" />
//           <div className="absolute -right-2 bottom-1/4 w-4 h-8 bg-black rounded" />
//         </div>
//       </div>

//       {/* HUD */}
//       <div className="absolute top-4 left-4 bg-black bg-opacity-50 p-4 rounded-lg text-white">
//         <div className="text-2xl font-bold">
//           Speed: {Math.floor(gameState.speed)} km/h
//         </div>
//         <div className="text-xl">
//           Gear: {gameState.gear} | RPM: {Math.floor(gameState.rpm)}
//         </div>
//         <div className="text-xl">
//           Distance: {Math.floor(gameState.distance / 1000)}km
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OutrunRacer;
