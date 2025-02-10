import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RotateCw, Pause, Play } from "lucide-react";

// Direction types
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

// Position interface
interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREASE = 5;
const SPEED_INCREASE_INTERVAL = 5;

const SnakeGame = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  // Generate random food position
  const generateFood = useCallback((): Position => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    // Ensure food doesn't spawn on snake
    return snake.some(
      (segment) => segment.x === newFood.x && segment.y === newFood.y
    )
      ? generateFood()
      : newFood;
  }, [snake]);

  // Reset game state
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection("RIGHT");
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsPaused(false);
  };

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

      switch (e.key.toLowerCase()) {
        case "w":
        case "arrowup":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "s":
        case "arrowdown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "a":
        case "arrowleft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "d":
        case "arrowright":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
        case " ":
          setIsPaused((prev) => !prev);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameOver]);

  // Game loop
  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = () => {
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
            // Increase speed every SPEED_INCREASE_INTERVAL points
            if (newScore % SPEED_INCREASE_INTERVAL === 0) {
              setSpeed((prevSpeed) => Math.max(prevSpeed - SPEED_INCREASE, 50));
            }
            return newScore;
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [direction, food, gameOver, generateFood, highScore, isPaused, speed]);

  return (
    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg">
      <div className="flex justify-between w-full mb-4">
        <div className="flex items-center gap-4">
          <motion.div
            className="bg-white/10 p-2 rounded-lg flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Trophy className="h-6 w-6 text-yellow-400" />
            <span className="text-white ml-2">{score}</span>
          </motion.div>
          <motion.div
            className="bg-white/10 p-2 rounded-lg"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-white">High Score: {highScore}</span>
          </motion.div>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/10 p-2 rounded-lg text-white"
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
            className="bg-white/10 p-2 rounded-lg text-white"
            onClick={resetGame}
          >
            <RotateCw className="h-6 w-6" />
          </motion.button>
        </div>
      </div>

      <div
        className="relative bg-black/20 backdrop-blur-sm rounded-lg"
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
        {snake.map((segment, index) => (
          <motion.div
            key={`${segment.x}-${segment.y}`}
            className="absolute bg-green-500 rounded-sm"
            style={{
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
              left: segment.x * CELL_SIZE + 1,
              top: segment.y * CELL_SIZE + 1,
              backgroundColor: index === 0 ? "#22c55e" : "#4ade80",
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.2 }}
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
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl text-center text-white">
              <h2 className="text-3xl mb-4">Game Over!</h2>
              <p className="mb-4">Score: {score}</p>
              {score === highScore && score > 0 && (
                <p className="mb-4 text-yellow-400">New High Score! 🎉</p>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/10 px-4 py-2 rounded-lg"
                onClick={resetGame}
              >
                Play Again
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls Instructions */}
      <div className="mt-4 text-white/70 text-sm">
        <p>Use arrow keys or WASD to move • Space to pause</p>
      </div>
    </div>
  );
};

export default SnakeGame;
