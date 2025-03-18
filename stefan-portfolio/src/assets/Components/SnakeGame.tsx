import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RotateCw, Pause, Play } from "lucide-react";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 200; // Base movement speed
const SPEED_INCREASE = 10;
const SPEED_INCREASE_INTERVAL = 5;
const SPEED_BOOST_MULTIPLIER = 2;
const SPEED_BOOST_DURATION = 500; // 500ms boost duration

const SnakeGame = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [renderSnake, setRenderSnake] = useState<Position[]>([
    { x: 10, y: 10 },
  ]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [nextDirection, setNextDirection] = useState<Direction>("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isSpeedBoostActive, setIsSpeedBoostActive] = useState(false);

  const lastDirectionTimeRef = useRef<number>(0);
  const lastDirectionRef = useRef<Direction | null>(null);
  const speedBoostTimeoutRef = useRef<number>(0);
  const lastUpdateTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);

  const generateFood = (): Position => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    return snake.some(
      (segment) => segment.x === newFood.x && segment.y === newFood.y
    )
      ? generateFood()
      : newFood;
  };

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setRenderSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection("RIGHT");
    setNextDirection("RIGHT");
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsPaused(false);
    setIsSpeedBoostActive(false);
    lastDirectionRef.current = null;
    clearTimeout(speedBoostTimeoutRef.current);
  };

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

      const getNewDirection = (key: string): Direction | null => {
        switch (key.toLowerCase()) {
          case "w":
          case "arrowup":
            return direction !== "DOWN" ? "UP" : null;
          case "s":
          case "arrowdown":
            return direction !== "UP" ? "DOWN" : null;
          case "a":
          case "arrowleft":
            return direction !== "RIGHT" ? "LEFT" : null;
          case "d":
          case "arrowright":
            return direction !== "LEFT" ? "RIGHT" : null;
          default:
            return null;
        }
      };

      const newDirection = getNewDirection(e.key);
      if (newDirection) {
        const now = Date.now();
        // Check for double tap (same direction within 300ms)
        if (
          newDirection === lastDirectionRef.current &&
          now - lastDirectionTimeRef.current < 300
        ) {
          setIsSpeedBoostActive(true);
          clearTimeout(speedBoostTimeoutRef.current);
          speedBoostTimeoutRef.current = window.setTimeout(() => {
            setIsSpeedBoostActive(false);
          }, SPEED_BOOST_DURATION);
        }
        lastDirectionRef.current = newDirection;
        lastDirectionTimeRef.current = now;
        setNextDirection(newDirection);
      }

      if (e.key === " ") {
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameOver]);

  // Smooth movement and game logic
  useEffect(() => {
    if (gameOver || isPaused) return;

    const updateGame = (timestamp: number) => {
      const currentSpeed = isSpeedBoostActive
        ? speed / SPEED_BOOST_MULTIPLIER
        : speed;

      // Update logical position at game speed
      if (timestamp - lastUpdateTimeRef.current >= currentSpeed) {
        setSnake((prevSnake) => {
          const newSnake = [...prevSnake];
          const head = { ...newSnake[0] };

          setDirection(nextDirection);

          switch (nextDirection) {
            case "UP":
              head.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE;
              break;
            case "DOWN":
              head.y = (head.y + 1) % GRID_SIZE;
              break;
            case "LEFT":
              head.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE;
              break;
            case "RIGHT":
              head.x = (head.x + 1) % GRID_SIZE;
              break;
          }

          if (
            newSnake.some(
              (segment) => segment.x === head.x && segment.y === head.y
            )
          ) {
            setGameOver(true);
            return prevSnake;
          }

          newSnake.unshift(head);

          if (head.x === food.x && head.y === food.y) {
            setFood(generateFood());
            setScore((prev) => {
              const newScore = prev + 1;
              if (newScore > highScore) setHighScore(newScore);
              if (newScore % SPEED_INCREASE_INTERVAL === 0) {
                setSpeed((prevSpeed) =>
                  Math.max(prevSpeed - SPEED_INCREASE, 50)
                );
              }
              return newScore;
            });
          } else {
            newSnake.pop();
          }

          return newSnake;
        });

        lastUpdateTimeRef.current = timestamp;
      }

      // Update visual position at 60 FPS
      setRenderSnake((prevRenderSnake) => {
        return snake.map((segment, index) => {
          const prevSegment = prevRenderSnake[index] || segment;
          return {
            x: prevSegment.x + (segment.x - prevSegment.x) * 0.5,
            y: prevSegment.y + (segment.y - prevSegment.y) * 0.5,
          };
        });
      });

      animationFrameRef.current = requestAnimationFrame(updateGame);
    };

    animationFrameRef.current = requestAnimationFrame(updateGame);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [
    food,
    gameOver,
    isPaused,
    nextDirection,
    speed,
    snake,
    highScore,
    isSpeedBoostActive,
  ]);

  return (
    <div
      className={`flex flex-col items-center p-4 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      } rounded-lg`}
    >
      <div className="flex justify-between w-full mb-4">
        <div className="flex items-center gap-4">
          <motion.div
            className={`p-2 rounded-lg flex items-center ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-200"
            }`}
          >
            <Trophy className="h-6 w-6 text-yellow-400" />
            <span className={theme === "dark" ? "text-white" : "text-black"}>
              {score}
            </span>
          </motion.div>
          <motion.div
            className={`p-2 rounded-lg ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-200"
            }`}
          >
            <span className={theme === "dark" ? "text-white" : "text-black"}>
              High Score: {highScore}
            </span>
          </motion.div>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-lg ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? (
              <Play className="h-6 w-6" />
            ) : (
              <Pause className="h-6 w-6" />
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-lg ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={resetGame}
          >
            <RotateCw className="h-6 w-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-lg ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </motion.button>
        </div>
      </div>

      {/* Game Grid */}
      <div
        className={`relative ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-200"
        } rounded-lg grid`}
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {/* Food */}
        <div
          className="absolute bg-red-500"
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
          }}
        />

        {/* Snake */}
        {renderSnake.map((segment, index) => (
          <div
            key={`${segment.x}-${segment.y}-${index}`}
            className="absolute bg-green-500 transition-transform duration-[16ms]"
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              transform: `translate(${segment.x * CELL_SIZE}px, ${
                segment.y * CELL_SIZE
              }px)`,
              backgroundColor: index === 0 ? "#22c55e" : "#4ade80",
            }}
          />
        ))}
      </div>

      {/* Game Over Modal */}
      <AnimatePresence>
        {gameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50"
          >
            <div
              className={`${
                theme === "dark" ? "bg-gray-800" : "bg-gray-200"
              } p-8 rounded-xl text-center ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              <h2 className="text-3xl mb-4">Game Over!</h2>
              <p className="mb-4">Score: {score}</p>
              {score === highScore && score > 0 && (
                <p className="mb-4 text-yellow-400">New High Score! 🎉</p>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`px-4 py-2 rounded-lg ${
                  theme === "dark"
                    ? "bg-gray-700 text-white"
                    : "bg-gray-300 text-black"
                }`}
                onClick={resetGame}
              >
                Play Again
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls Instructions */}
      <div
        className={`mt-4 text-sm ${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}
      >
        <p>Use arrow keys or WASD to move • Space to pause</p>
        {isSpeedBoostActive && (
          <p className="text-green-400">Speed Boost Active!</p>
        )}
      </div>
    </div>
  );
};

export default SnakeGame;
