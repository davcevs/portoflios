import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RotateCw, Pause, Play, Info } from "lucide-react";

// Direction types
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

// Position interface
interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150; // Milliseconds per move
const SPEED_INCREASE = 5;
const SPEED_INCREASE_INTERVAL = 5;
const SPEED_BOOST_MULTIPLIER = 2; // 2x speed boost
const SPEED_BOOST_DURATION = 500; // 500ms speed boost duration

const SnakeGame = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [isSpeedBoostActive, setIsSpeedBoostActive] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // For smooth interpolation
  const [renderSnake, setRenderSnake] = useState<Position[]>(snake);
  const animationFrameRef = useRef<number>(0);
  const lastUpdateTimeRef = useRef<number>(0);
  const lastDirectionRef = useRef<Direction | null>(null);
  const speedBoostTimeoutRef = useRef<number>(0);

  // Generate random food position
  const generateFood = useCallback((): Position => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    return snake.some(
      (segment) => segment.x === newFood.x && segment.y === newFood.y
    )
      ? generateFood()
      : newFood;
  }, [snake]);

  // Reset game state
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setRenderSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection("RIGHT");
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

      const newDirection = (() => {
        switch (e.key.toLowerCase()) {
          case "w":
          case "arrowup":
            return "UP";
          case "s":
          case "arrowdown":
            return "DOWN";
          case "a":
          case "arrowleft":
            return "LEFT";
          case "d":
          case "arrowright":
            return "RIGHT";
          default:
            return null;
        }
      })();

      if (newDirection && newDirection !== direction) {
        if (newDirection === lastDirectionRef.current) {
          setIsSpeedBoostActive(true);
          setSpeed((prevSpeed) => prevSpeed / SPEED_BOOST_MULTIPLIER);

          clearTimeout(speedBoostTimeoutRef.current);
          speedBoostTimeoutRef.current = window.setTimeout(() => {
            setIsSpeedBoostActive(false);
            setSpeed((prevSpeed) => prevSpeed * SPEED_BOOST_MULTIPLIER);
          }, SPEED_BOOST_DURATION);
        }

        setDirection(newDirection);
        lastDirectionRef.current = newDirection;
      }

      if (e.key === " ") {
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameOver]);

  // Game logic update
  useEffect(() => {
    if (gameOver || isPaused) return;

    const updateGame = () => {
      const now = Date.now();
      if (now - lastUpdateTimeRef.current >= speed) {
        setSnake((prevSnake) => {
          const newSnake = [...prevSnake];
          const head = { ...newSnake[0] };

          // Move head
          switch (direction) {
            case "UP":
              head.y -= 1;
              break;
            case "DOWN":
              head.y += 1;
              break;
            case "LEFT":
              head.x -= 1;
              break;
            case "RIGHT":
              head.x += 1;
              break;
          }

          // Check wall collision
          if (
            head.x < 0 ||
            head.x >= GRID_SIZE ||
            head.y < 0 ||
            head.y >= GRID_SIZE
          ) {
            setGameOver(true);
            return prevSnake;
          }

          // Check self collision
          if (
            newSnake.some(
              (segment) => segment.x === head.x && segment.y === head.y
            )
          ) {
            setGameOver(true);
            return prevSnake;
          }

          // Add new head
          newSnake.unshift(head);

          // Check food collision
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

        lastUpdateTimeRef.current = now;
      }

      // Smooth interpolation for rendering
      setRenderSnake((prevRenderSnake) => {
        const interpolatedSnake = snake.map((segment, index) => {
          const prevSegment = prevRenderSnake[index] || segment;
          return {
            x: prevSegment.x + (segment.x - prevSegment.x) * 0.2,
            y: prevSegment.y + (segment.y - prevSegment.y) * 0.2,
          };
        });
        return interpolatedSnake;
      });

      animationFrameRef.current = requestAnimationFrame(updateGame);
    };

    animationFrameRef.current = requestAnimationFrame(updateGame);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    direction,
    food,
    gameOver,
    generateFood,
    highScore,
    isPaused,
    speed,
    snake,
  ]);

  return (
    <div
      className={`flex flex-col items-center p-4 ${
        theme === "dark"
          ? "bg-gradient-to-br from-purple-900/20 to-blue-900/20"
          : "bg-gradient-to-br from-gray-100 to-gray-300"
      } rounded-lg`}
    >
      <div className="flex justify-between w-full mb-4">
        <div className="flex items-center gap-4">
          <motion.div
            className={`p-2 rounded-lg flex items-center ${
              theme === "dark" ? "bg-white/10" : "bg-black/10"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            <Trophy className="h-6 w-6 text-yellow-400" />
            <span
              className={`ml-2 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              {score}
            </span>
          </motion.div>
          <motion.div
            className={`p-2 rounded-lg ${
              theme === "dark" ? "bg-white/10" : "bg-black/10"
            }`}
            whileHover={{ scale: 1.05 }}
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
                ? "bg-white/10 text-white"
                : "bg-black/10 text-black"
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
                ? "bg-white/10 text-white"
                : "bg-black/10 text-black"
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
                ? "bg-white/10 text-white"
                : "bg-black/10 text-black"
            }`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </motion.button>
        </div>
      </div>

      {/* Feature Display */}
      <div className="mb-4 w-full flex justify-center">
        <motion.div
          className={`p-2 rounded-lg flex items-center gap-2 ${
            theme === "dark" ? "bg-white/10" : "bg-black/10"
          }`}
          whileHover={{ scale: 1.05 }}
        >
          <Info className="h-6 w-6 text-blue-400" />
          <span className={theme === "dark" ? "text-white" : "text-black"}>
            Features: 2x Speed Boost (double tap direction), Pause/Resume
            (Space), Themes
          </span>
        </motion.div>
      </div>

      {/* Game Grid */}
      <div
        className={`relative ${
          theme === "dark" ? "bg-black/20" : "bg-gray-200"
        } backdrop-blur-sm rounded-lg`}
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {/* Food */}
        <motion.div
          className="absolute bg-red-500 rounded-full"
          style={{
            width: CELL_SIZE - 2,
            height: CELL_SIZE - 2,
            left: food.x * CELL_SIZE + 1,
            top: food.y * CELL_SIZE + 1,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
        />

        {/* Snake */}
        {renderSnake.map((segment, index) => (
          <motion.div
            key={`${segment.x}-${segment.y}`}
            className="absolute bg-green-500 rounded-sm"
            style={{
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
              left: segment.x * CELL_SIZE + 1,
              top: segment.y * CELL_SIZE + 1,
              backgroundColor: index === 0 ? "#22c55e" : "#4ade80",
              transition: "left 0.1s linear, top 0.1s linear",
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
            className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <div
              className={`${
                theme === "dark" ? "bg-white/10" : "bg-black/10"
              } backdrop-blur-md p-8 rounded-xl text-center ${
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
                    ? "bg-white/10 text-white"
                    : "bg-black/10 text-black"
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
          theme === "dark" ? "text-white/70" : "text-black/70"
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
