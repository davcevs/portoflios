import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RotateCw, Heart } from "lucide-react";

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [lives, setLives] = useState(5);
  const [showGameOver, setShowGameOver] = useState(false);

  const emojis = ["🚀", "🎮", "🎨", "🎵", "📱", "💻", "🎯", "🎪"];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const duplicatedEmojis = [...emojis, ...emojis];
    const shuffledEmojis = duplicatedEmojis
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledEmojis);
    setFlippedCards([]);
    setMoves(0);
    setScore(0);
    setGameWon(false);
    setLives(5);
    setShowGameOver(false);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (cards[firstCard].emoji === cards[secondCard].emoji) {
        setCards(
          cards.map((card, index) =>
            index === firstCard || index === secondCard
              ? { ...card, isMatched: true }
              : card
          )
        );
        setScore(score + 100);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(
            cards.map((card, index) =>
              index === firstCard || index === secondCard
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setLives(lives - 1);
        }, 1000);
      }
      setMoves(moves + 1);
    }
  }, [flippedCards]);

  useEffect(() => {
    if (cards.every((card) => card.isMatched)) {
      setGameWon(true);
    }
  }, [cards]);

  useEffect(() => {
    if (lives === 0) {
      setShowGameOver(true);
    }
  }, [lives]);

  const handleCardClick = (index: number) => {
    if (
      flippedCards.length === 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched ||
      lives === 0
    )
      return;

    setCards(
      cards.map((card, i) =>
        i === index ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedCards([...flippedCards, index]);
  };

  return (
    <div className="flex flex-col items-center p-4 h-full bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg">
      <div className="flex justify-between w-full mb-4">
        <div className="flex items-center gap-4">
          <motion.div
            className="bg-white/10 p-2 rounded-lg"
            whileHover={{ scale: 1.05 }}
          >
            <Trophy className="h-6 w-6 text-yellow-400" />
            <span className="text-white ml-2">{score}</span>
          </motion.div>
          <div className="flex items-center">
            {Array.from({ length: lives }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-red-500"
              >
                <Heart className="h-6 w-6 fill-current" />
              </motion.div>
            ))}
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white/10 p-2 rounded-lg text-white"
          onClick={initializeGame}
        >
          <RotateCw className="h-6 w-6" />
        </motion.button>
      </div>

      <div className="grid grid-cols-4 gap-4 p-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className={`relative w-24 h-24 cursor-pointer`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCardClick(index)}
          >
            <motion.div
              className="absolute w-full h-full"
              initial={false}
              animate={{
                rotateY: card.isFlipped || card.isMatched ? 180 : 0,
              }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-4xl">
                <div className="text-transparent">?</div>
              </div>
              <div
                className="absolute w-full h-full backface-hidden bg-white rounded-xl flex items-center justify-center text-4xl"
                style={{ transform: "rotateY(180deg)" }}
              >
                {card.emoji}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {(gameWon || showGameOver) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl text-center text-white">
              <h2 className="text-3xl mb-4">
                {gameWon ? "🎉 Congratulations!" : "😢 Game Over"}
              </h2>
              <p className="mb-4">
                {gameWon
                  ? `You won with ${moves} moves and scored ${score} points!`
                  : "Better luck next time!"}
              </p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/10 px-4 py-2 rounded-lg"
                onClick={initializeGame}
              >
                Play Again
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryGame;
