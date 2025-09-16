// app/games/Snake/page.tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasSize, setCanvasSize] = useState(400);
  const scale = 20;
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [dir, setDir] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(250);
  const [playsLeft, setPlaysLeft] = useState(6);

  const rows = Math.floor(canvasSize / scale);
  const cols = Math.floor(canvasSize / scale);

  // --- Responsive Canvas ---
  useEffect(() => {
    const updateSize = () => {
      const width = Math.min(window.innerWidth * 0.9, 400);
      setCanvasSize(width);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // --- Daily Limit Logic ---
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const lastPlayDay = localStorage.getItem('snake_last_play_day');
    let dailyPlays = parseInt(localStorage.getItem('snake_daily_plays') || '0');

    if (lastPlayDay !== today) {
      dailyPlays = 0;
      localStorage.setItem('snake_last_play_day', today);
      localStorage.setItem('snake_daily_plays', '0');
    }
    setPlaysLeft(6 - dailyPlays);
  }, []);

  const incrementDailyPlays = () => {
    const today = new Date().toISOString().slice(0, 10);
    let dailyPlays = parseInt(localStorage.getItem('snake_daily_plays') || '0');
    dailyPlays += 1;
    localStorage.setItem('snake_last_play_day', today);
    localStorage.setItem('snake_daily_plays', dailyPlays.toString());
    setPlaysLeft(6 - dailyPlays);
  };

  // --- Snake Movement ---
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
      const newCoins = coins + 1;
      setCoins(newCoins);
      localStorage.setItem('snake_coins', newCoins.toString());
      setFood({ x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) });
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver && (dir.x !== 0 || dir.y !== 0)) moveSnake();
    }, speed);
    return () => clearInterval(interval);
  }, [dir, snake, gameOver, speed]);

  // --- Draw Canvas ---
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
  }, [snake, food, canvasSize]);

  // --- Keyboard Control ---
  const handleKey = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp': if (dir.y !== 1) setDir({ x: 0, y: -1 }); break;
      case 'ArrowDown': if (dir.y !== -1) setDir({ x: 0, y: 1 }); break;
      case 'ArrowLeft': if (dir.x !== 1) setDir({ x: -1, y: 0 }); break;
      case 'ArrowRight': if (dir.x !== -1) setDir({ x: 1, y: 0 }); break;
    }
  };
  useEffect(() => { window.addEventListener('keydown', handleKey); return () => window.removeEventListener('keydown', handleKey); }, [dir]);

  // --- Touch Control ---
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

  // --- Restart ---
  const restart = () => {
    if (playsLeft <= 0) return alert('⚠️ আজকের খেলার সীমা শেষ!');
    incrementDailyPlays();
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDir({ x: 0, y: 0 });
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    const savedCoins = parseInt(localStorage.getItem('snake_coins') || '0');
    setCoins(savedCoins);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <motion.h1 className="text-3xl font-bold mb-4 text-green-400 drop-shadow-lg" initial={{ y: -20 }} animate={{ y: 0 }}>
        🐍 Snake Game
      </motion.h1>

      <div className="flex gap-3 mb-4 flex-wrap justify-center">
        <div className="px-4 py-2 bg-yellow-500 rounded-xl shadow-lg">Coins: {coins}</div>
        <div className="px-4 py-2 bg-blue-600 rounded-xl shadow-lg">Plays left: {playsLeft}</div>
      </div>

      <canvas ref={canvasRef} width={canvasSize} height={canvasSize} className="bg-black border-4 border-green-400 rounded-lg shadow-xl shadow-green-500/30" />

      <div className="mt-4 text-xl">Score: {score}</div>

      {gameOver && (
        <motion.div className="mt-4 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="text-red-400 text-2xl font-bold">Game Over</div>
          <button
            onClick={restart}
            className="mt-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold 
                       shadow-lg shadow-green-700/40 transform active:translate-y-1 active:shadow-inner transition-all">
            🔄 Restart
          </button>
        </motion.div>
      )}

      {/* Mobile Gradient Neon D-pad */}
      <div className="grid grid-cols-3 gap-3 mt-6 md:hidden w-full max-w-xs mx-auto">
        <button onClick={() => dir.y !== 1 && setDir({ x: 0, y: -1 })} className="col-span-3 py-4 rounded-full text-white text-2xl font-bold bg-gray-900 shadow-[0_0_20px_#0ff,0_0_40px_#0ff] animate-gradientNeon transition-all active:translate-y-1">⬆️</button>
        <button onClick={() => dir.x !== 1 && setDir({ x: -1, y: 0 })} className="py-4 rounded-full text-white text-2xl font-bold bg-gray-900 shadow-[0_0_20px_#f0f,0_0_40px_#f0f] animate-gradientNeon transition-all active:translate-y-1">⬅️</button>
        <div></div>
        <button onClick={() => dir.x !== -1 && setDir({ x: 1, y: 0 })} className="py-4 rounded-full text-white text-2xl font-bold bg-gray-900 shadow-[0_0_20px_#ff0,0_0_40px_#ff0] animate-gradientNeon transition-all active:translate-y-1">➡️</button>
        <button onClick={() => dir.y !== -1 && setDir({ x: 0, y: 1 })} className="col-span-3 py-4 rounded-full text-white text-2xl font-bold bg-gray-900 shadow-[0_0_20px_#0f0,0_0_40px_#0f0] animate-gradientNeon transition-all active:translate-y-1">⬇️</button>
      </div>


    </div>
  );
}



      <style jsx global>{`
        @keyframes gradientNeon {
          0%,100% { box-shadow: 0 0 15px #0ff,0 0 30px #0ff; }
          25% { box-shadow: 0 0 20px #f0f,0 0 40px #f0f; }
          50% { box-shadow: 0 0 25px #ff0,0 0 50px #ff0; }
          75% { box-shadow: 0 0 20px #0f0,0 0 40px #0f0; }
        }
        .animate-gradientNeon { animation: gradientNeon 2s ease-in-out infinite; }
      `}</style>

// 'use client';
// import { useEffect, useRef, useState } from 'react';
// import { motion } from 'framer-motion';

// const canvasSize = 400;
// const scale = 20;
// const rows = canvasSize / scale;
// const cols = canvasSize / scale;

// export default function SnakeGame() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
//   const [food, setFood] = useState({ x: 5, y: 5 });
//   const [dir, setDir] = useState({ x: 0, y: 0 });
//   const [score, setScore] = useState(0);
//   const [gameOver, setGameOver] = useState(false);
//   const [speed, setSpeed] = useState(200); // default easy

//   const moveSnake = () => {
//     const newHead = {
//       x: (snake[0].x + dir.x + cols) % cols,
//       y: (snake[0].y + dir.y + rows) % rows,
//     };
//     if (snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
//       setGameOver(true);
//       return;
//     }
//     const newSnake = [newHead, ...snake];
//     if (newHead.x === food.x && newHead.y === food.y) {
//       setScore(score + 1);
//       setFood({ x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) });
//     } else {
//       newSnake.pop();
//     }
//     setSnake(newSnake);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!gameOver && (dir.x !== 0 || dir.y !== 0)) moveSnake();
//     }, speed);
//     return () => clearInterval(interval);
//   }, [dir, snake, gameOver, speed]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     ctx.clearRect(0, 0, canvasSize, canvasSize);
//     ctx.fillStyle = 'red';
//     ctx.fillRect(food.x * scale, food.y * scale, scale, scale);
//     ctx.fillStyle = 'lime';
//     snake.forEach(seg => ctx.fillRect(seg.x * scale, seg.y * scale, scale, scale));
//   }, [snake, food]);

//   const handleKey = (e: KeyboardEvent) => {
//     switch (e.key) {
//       case 'ArrowUp': if (dir.y !== 1) setDir({ x: 0, y: -1 }); break;
//       case 'ArrowDown': if (dir.y !== -1) setDir({ x: 0, y: 1 }); break;
//       case 'ArrowLeft': if (dir.x !== 1) setDir({ x: -1, y: 0 }); break;
//       case 'ArrowRight': if (dir.x !== -1) setDir({ x: 1, y: 0 }); break;
//     }
//   };
//   useEffect(() => { window.addEventListener('keydown', handleKey); return () => window.removeEventListener('keydown', handleKey); }, [dir]);

//   useEffect(() => {
//     let startX = 0, startY = 0;
//     const handleTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; };
//     const handleTouchEnd = (e: TouchEvent) => {
//       const dx = e.changedTouches[0].clientX - startX;
//       const dy = e.changedTouches[0].clientY - startY;
//       if (Math.abs(dx) > Math.abs(dy)) {
//         if (dx > 0 && dir.x !== -1) setDir({ x: 1, y: 0 });
//         else if (dx < 0 && dir.x !== 1) setDir({ x: -1, y: 0 });
//       } else {
//         if (dy > 0 && dir.y !== -1) setDir({ x: 0, y: 1 });
//         else if (dy < 0 && dir.y !== 1) setDir({ x: 0, y: -1 });
//       }
//     };
//     window.addEventListener('touchstart', handleTouchStart);
//     window.addEventListener('touchend', handleTouchEnd);
//     return () => { window.removeEventListener('touchstart', handleTouchStart); window.removeEventListener('touchend', handleTouchEnd); };
//   }, [dir]);

//   const restart = () => { setSnake([{ x: 10, y: 10 }]); setFood({ x: 5, y: 5 }); setDir({ x: 0, y: 0 }); setScore(0); setGameOver(false); };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
//       <motion.h1 className="text-3xl font-bold mb-4 text-green-400 drop-shadow-lg" initial={{ y: -20 }} animate={{ y: 0 }}>
//         🐍 Snake Game
//       </motion.h1>

//       <div className="flex gap-3 mb-4">
//         <button onClick={() => setSpeed(200)} className="px-4 py-2 bg-blue-600 rounded-xl shadow-lg transform active:translate-y-1 active:shadow-inner transition-all">
//           Easy
//         </button>
//         <button onClick={() => setSpeed(120)} className="px-4 py-2 bg-yellow-500 rounded-xl shadow-lg transform active:translate-y-1 active:shadow-inner transition-all">
//           Medium
//         </button>
//         <button onClick={() => setSpeed(80)} className="px-4 py-2 bg-red-600 rounded-xl shadow-lg transform active:translate-y-1 active:shadow-inner transition-all">
//           Hard
//         </button>
//       </div>

//       <canvas ref={canvasRef} width={canvasSize} height={canvasSize} className="bg-black border-4 border-green-400 rounded-lg shadow-xl shadow-green-500/30" />

//       <div className="mt-4 text-xl">Score: {score}</div>

//       {gameOver && (
//         <motion.div className="mt-4 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//           <div className="text-red-400 text-2xl font-bold">Game Over</div>
//           <button
//             onClick={restart}
//             className="mt-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold 
//                        shadow-lg shadow-green-700/40 transform active:translate-y-1 active:shadow-inner transition-all">
//             🔄 Restart
//           </button>
//         </motion.div>
//       )}

//       {/* Mobile D-pad with 3D effect */}
//       <div className="grid grid-cols-3 gap-3 mt-6 md:hidden">
//         <button
//           onClick={() => dir.y !== 1 && setDir({ x: 0, y: -1 })}
//           className="col-span-3 py-3 bg-gray-800 rounded-xl shadow-md shadow-gray-700 active:translate-y-1 active:shadow-inner transition-all">
//           ⬆️
//         </button>
//         <button
//           onClick={() => dir.x !== 1 && setDir({ x: -1, y: 0 })}
//           className="py-3 bg-gray-800 rounded-xl shadow-md shadow-gray-700 active:translate-y-1 active:shadow-inner transition-all">
//           ⬅️
//         </button>
//         <div></div>
//         <button
//           onClick={() => dir.x !== -1 && setDir({ x: 1, y: 0 })}
//           className="py-3 bg-gray-800 rounded-xl shadow-md shadow-gray-700 active:translate-y-1 active:shadow-inner transition-all">
//           ➡️
//         </button>
//         <button
//           onClick={() => dir.y !== -1 && setDir({ x: 0, y: 1 })}
//           className="col-span-3 py-3 bg-gray-800 rounded-xl shadow-md shadow-gray-700 active:translate-y-1 active:shadow-inner transition-all">
//           ⬇️
//         </button>
//       </div>
//     </div>
//   );
// }





