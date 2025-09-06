'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const canvasSize = 400;
const scale = 20;
const rows = canvasSize / scale;
const cols = canvasSize / scale;

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [dir, setDir] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const moveSnake = () => {
    const newHead = {
      x: (snake[0].x + dir.x + cols) % cols,
      y: (snake[0].y + dir.y + rows) % rows,
    };
    if (snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
      setGameOver(true);
      return;
    }
    const newSnake = [newHead, ...snake];
    if (newHead.x === food.x && newHead.y === food.y) {
      setScore(score + 1);
      setFood({ x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) });
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver && (dir.x !== 0 || dir.y !== 0)) moveSnake();
    }, 100);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasSize, canvasSize);
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * scale, food.y * scale, scale, scale);
    ctx.fillStyle = 'lime';
    snake.forEach(seg => ctx.fillRect(seg.x * scale, seg.y * scale, scale, scale));
  }, [snake, food]);

  const handleKey = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp': if (dir.y !== 1) setDir({ x: 0, y: -1 }); break;
      case 'ArrowDown': if (dir.y !== -1) setDir({ x: 0, y: 1 }); break;
      case 'ArrowLeft': if (dir.x !== 1) setDir({ x: -1, y: 0 }); break;
      case 'ArrowRight': if (dir.x !== -1) setDir({ x: 1, y: 0 }); break;
    }
  };
  useEffect(() => { window.addEventListener('keydown', handleKey); return () => window.removeEventListener('keydown', handleKey); }, [dir]);

  useEffect(() => {
    let startX = 0, startY = 0;
    const handleTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; };
    const handleTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0 && dir.x !== -1) setDir({ x: 1, y: 0 });
        else if (dx < 0 && dir.x !== 1) setDir({ x: -1, y: 0 });
      } else {
        if (dy > 0 && dir.y !== -1) setDir({ x: 0, y: 1 });
        else if (dy < 0 && dir.y !== 1) setDir({ x: 0, y: -1 });
      }
    };
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => { window.removeEventListener('touchstart', handleTouchStart); window.removeEventListener('touchend', handleTouchEnd); };
  }, [dir]);

  const restart = () => { setSnake([{ x: 10, y: 10 }]); setFood({ x: 5, y: 5 }); setDir({ x: 0, y: 0 }); setScore(0); setGameOver(false); };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <motion.h1 className="text-3xl font-bold mb-4" initial={{ y: -20 }} animate={{ y: 0 }}>🐍 Snake Game</motion.h1>
      <canvas ref={canvasRef} width={canvasSize} height={canvasSize} className="bg-black border-4 border-green-400 rounded-lg" />
      <div className="mt-4 text-xl">Score: {score}</div>
      {gameOver && <motion.div className="mt-4 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="text-red-400 text-2xl font-bold">Game Over</div>
        <button onClick={restart} className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-xl text-white">Restart</button>
      </motion.div>}
      {/* Mobile D-pad */}
      <div className="grid grid-cols-3 gap-2 mt-6 md:hidden">
        <button onClick={() => dir.y !== 1 && setDir({ x: 0, y: -1 })} className="col-span-3 py-2 bg-gray-700 rounded-lg">⬆️</button>
        <button onClick={() => dir.x !== 1 && setDir({ x: -1, y: 0 })} className="py-2 bg-gray-700 rounded-lg">⬅️</button>
        <div></div>
        <button onClick={() => dir.x !== -1 && setDir({ x: 1, y: 0 })} className="py-2 bg-gray-700 rounded-lg">➡️</button>
        <button onClick={() => dir.y !== -1 && setDir({ x: 0, y: 1 })} className="col-span-3 py-2 bg-gray-700 rounded-lg">⬇️</button>
      </div>
    </div>
  );
}


