



import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}





// // app/game/page.tsx   (or pages/game.tsx for pages router)
// // Put your background image in: public/Play-to-Earn-Bitcoin-7-Games-You-Must-Try-min.jpg

// "use client";

// import React, { useEffect, useRef, useState } from "react";

// type Vec = { x: number; y: number };

// export default function PixelCollectorGame() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [running, setRunning] = useState(true);

//   useEffect(() => {
//     const canvas = canvasRef.current!;
//     const ctx = canvas.getContext("2d")!;
//     const DPR = window.devicePixelRatio || 1;
//     const W = 900;
//     const H = 240;

//     canvas.width = W * DPR;
//     canvas.height = H * DPR;
//     canvas.style.width = `${W}px`;
//     canvas.style.height = `${H}px`;
//     ctx.scale(DPR, DPR);
//     ctx.imageSmoothingEnabled = false; // pixel style

//     // Load background image (your uploaded image in public/)
//     const bg = new Image();
//     bg.src = "/Play-to-Earn-Bitcoin-7-Games-You-Must-Try-min.jpg";

//     // Game objects
//     const gravity = 0.9;
//     const groundY = H - 30;

//     // Player
//     const player = {
//       pos: { x: 60, y: groundY - 32 } as Vec,
//       vel: { x: 0, y: 0 } as Vec,
//       w: 28,
//       h: 32,
//       speed: 2.6,
//       onGround: true,
//       color: "#9FB7FF",
//     };

//     // Enemy (skeleton left)
//     const enemy = {
//       pos: { x: 820, y: groundY - 36 } as Vec,
//       w: 28,
//       h: 36,
//       dir: -1,
//       speed: 1.1,
//       color: "#E6D8C3",
//     };

//     // Coins
//     let coins: { pos: Vec; r: number; collected: boolean }[] = [];
//     const spawnCoins = () => {
//       coins = [];
//       const xs = [180, 260, 340, 420, 500];
//       for (let i = 0; i < xs.length; i++) {
//         coins.push({ pos: { x: xs[i], y: groundY - 60 }, r: 8, collected: false });
//       }
//     };
//     spawnCoins();

//     // Key & chest
//     let key = { pos: { x: 560, y: groundY - 28 }, w: 14, h: 12, taken: false };
//     const chest = { pos: { x: 700, y: groundY - 28 }, w: 34, h: 26, opened: false };

//     // Controls
//     const keys: Record<string, boolean> = {};
//     const keyDown = (e: KeyboardEvent) => {
//       keys[e.key.toLowerCase()] = true;
//       if (["arrowup", "w", " "].includes(e.key.toLowerCase())) e.preventDefault();
//     };
//     const keyUp = (e: KeyboardEvent) => {
//       keys[e.key.toLowerCase()] = false;
//     };
//     window.addEventListener("keydown", keyDown);
//     window.addEventListener("keyup", keyUp);

//     // Utility collision
//     const rectRect = (a: any, b: any) => {
//       return !(
//         a.pos.x + a.w < b.pos.x ||
//         a.pos.x > b.pos.x + b.w ||
//         a.pos.y + a.h < b.pos.y ||
//         a.pos.y > b.pos.y + b.h
//       );
//     };

//     // Simple particle for coin pickup
//     const particles: { x: number; y: number; vy: number; life: number }[] = [];

//     // Main loop
//     let last = performance.now();
//     let acc = 0;
//     let rafId: number;
//     function update(dt: number) {
//       // input
//       player.vel.x = 0;
//       if (keys["arrowleft"] || keys["a"]) player.vel.x = -player.speed;
//       if (keys["arrowright"] || keys["d"]) player.vel.x = player.speed;
//       if ((keys["arrowup"] || keys["w"] || keys[" "]) && player.onGround) {
//         player.vel.y = -14.5;
//         player.onGround = false;
//       }

//       // physics
//       player.vel.y += gravity;
//       player.pos.x += player.vel.x;
//       player.pos.y += player.vel.y;

//       // ground collision
//       if (player.pos.y + player.h > groundY) {
//         player.pos.y = groundY - player.h;
//         player.vel.y = 0;
//         player.onGround = true;
//       }

//       // world bounds
//       if (player.pos.x < 8) player.pos.x = 8;
//       if (player.pos.x + player.w > W - 8) player.pos.x = W - 8 - player.w;

//       // enemy patrol
//       enemy.pos.x += enemy.dir * enemy.speed;
//       if (enemy.pos.x < 600) enemy.dir = 1;
//       if (enemy.pos.x > 840) enemy.dir = -1;

//       // coins collision
//       for (const c of coins) {
//         if (c.collected) continue;
//         const dx = player.pos.x + player.w / 2 - c.pos.x;
//         const dy = player.pos.y + player.h / 2 - c.pos.y;
//         const dist2 = dx * dx + dy * dy;
//         if (dist2 < (c.r + 10) ** 2) {
//           c.collected = true;
//           // spawn particles
//           for (let i = 0; i < 8; i++) {
//             particles.push({ x: c.pos.x, y: c.pos.y, vy: -(3 + Math.random() * 2), life: 40 + Math.random() * 30 });
//           }
//         }
//       }

//       // key pickup
//       if (!key.taken && !chest.opened) {
//         const rectA = { pos: { x: player.pos.x, y: player.pos.y }, w: player.w, h: player.h };
//         const rectB = { pos: { x: key.pos.x, y: key.pos.y - key.h }, w: key.w, h: key.h };
//         if (rectRect(rectA, rectB)) key.taken = true;
//       }

//       // chest open: needs key and all coins collected
//       const allCollected = coins.every((c) => c.collected);
//       if (key.taken && allCollected && !chest.opened) {
//         // if player near chest, open automatically
//         const rectA = { pos: { x: player.pos.x, y: player.pos.y }, w: player.w, h: player.h };
//         const rectB = { pos: { x: chest.pos.x, y: chest.pos.y - chest.h }, w: chest.w, h: chest.h };
//         if (rectRect(rectA, rectB)) {
//           chest.opened = true;
//         }
//       }

//       // particles update
//       for (let i = particles.length - 1; i >= 0; i--) {
//         const p = particles[i];
//         p.y += p.vy;
//         p.vy += 0.18;
//         p.life -= 1;
//         if (p.life <= 0) particles.splice(i, 1);
//       }
//     }

//     function draw() {
//       // clear
//       ctx.clearRect(0, 0, W, H);

//       // draw background image scaled and cropped to fit
//       if (bg.complete) {
//         // draw the image with some repeating left/right parallax
//         const scale = Math.max(W / bg.width, H / bg.height);
//         const sw = W / scale;
//         const sh = H / scale;
//         ctx.drawImage(bg, 0, 0, bg.width, bg.height, 0, 0, W, H);
//       } else {
//         // fallback background
//         ctx.fillStyle = "#0b1020";
//         ctx.fillRect(0, 0, W, H);
//       }

//       // ground strip
//       ctx.fillStyle = "#0f8b37";
//       ctx.fillRect(0, groundY, W, 40);
//       ctx.fillStyle = "#00681f";
//       for (let i = 0; i < 40; i++) {
//         ctx.fillRect(i * 20, groundY, 6, 8);
//       }

//       // coins
//       for (const c of coins) {
//         if (c.collected) continue;
//         ctx.beginPath();
//         ctx.fillStyle = "#FFD54A";
//         ctx.ellipse(c.pos.x, c.pos.y, c.r, c.r - 2, 0, 0, Math.PI * 2);
//         ctx.fill();
//         ctx.strokeStyle = "#B8860B";
//         ctx.stroke();
//       }

//       // key
//       if (!key.taken && !chest.opened) {
//         ctx.fillStyle = "#FFD700";
//         ctx.fillRect(key.pos.x - key.w / 2, key.pos.y - key.h, key.w, key.h);
//         ctx.fillStyle = "#CC9B00";
//         ctx.fillRect(key.pos.x, key.pos.y - key.h + 4, key.w / 2, 4);
//       }

//       // chest
//       ctx.fillStyle = chest.opened ? "#DAA520" : "#8B4513";
//       ctx.fillRect(chest.pos.x - chest.w / 2, chest.pos.y - chest.h, chest.w, chest.h);
//       ctx.strokeStyle = "#222";
//       ctx.strokeRect(chest.pos.x - chest.w / 2, chest.pos.y - chest.h, chest.w, chest.h);
//       if (!chest.opened) {
//         ctx.fillStyle = "#444";
//         ctx.fillRect(chest.pos.x - 6, chest.pos.y - 8, 12, 6);
//       } else {
//         // sparkle when opened
//         ctx.fillStyle = "#FFF59D";
//         ctx.fillText("✨", chest.pos.x - 6, chest.pos.y - chest.h - 4);
//       }

//       // enemy
//       ctx.fillStyle = enemy.color;
//       ctx.fillRect(enemy.pos.x - enemy.w / 2, enemy.pos.y - enemy.h, enemy.w, enemy.h);
//       // enemy sword
//       ctx.fillStyle = "#C4C4C4";
//       ctx.fillRect(enemy.pos.x - enemy.w / 2 - 8, enemy.pos.y - 10, 10, 3);

//       // player
//       ctx.fillStyle = player.color;
//       ctx.fillRect(player.pos.x, player.pos.y, player.w, player.h);
//       // player helmet stripe
//       ctx.fillStyle = "#D14A78";
//       ctx.fillRect(player.pos.x + 6, player.pos.y + 2, 12, 4);

//       // particles
//       for (const p of particles) {
//         ctx.fillStyle = "#FFD54A";
//         ctx.fillRect(p.x, p.y, 3, 3);
//       }

//       // UI
//       ctx.fillStyle = "rgba(0,0,0,0.45)";
//       ctx.fillRect(12, 12, 220, 34);
//       ctx.fillStyle = "#fff";
//       ctx.font = "14px monospace";
//       const collectedCount = coins.filter((c) => c.collected).length;
//       ctx.fillText(`Coins: ${collectedCount} / ${coins.length}`, 20, 34);
//       ctx.fillText(`Key: ${key.taken ? "Yes" : "No"}`, 130, 34);

//       // instructions
//       ctx.font = "12px monospace";
//       ctx.fillStyle = "rgba(255,255,255,0.75)";
//       ctx.fillText("← → to move, ↑ / W / Space to jump. Collect all coins + key → open chest", 260, 20);
//     }

//     function frame(t: number) {
//       const dt = Math.min(32, t - last);
//       last = t;

//       update(dt);
//       draw();

//       if (running) rafId = requestAnimationFrame(frame);
//     }

//     rafId = requestAnimationFrame(frame);

//     // cleanup
//     return () => {
//       setRunning(false);
//       cancelAnimationFrame(rafId);
//       window.removeEventListener("keydown", keyDown);
//       window.removeEventListener("keyup", keyUp);
//     };
//   }, [running]);

//   return (
//     <div className="w-full flex flex-col items-center gap-4 p-6">
//       <h2 style={{ color: "#fff", fontFamily: "monospace" }}>Pixel Collector (demo)</h2>
//       <canvas ref={canvasRef} style={{ borderRadius: 12, imageRendering: "pixelated", boxShadow: "0 6px 30px rgba(0,0,0,0.6)" }} />
//       <div style={{ color: "#ddd", fontSize: 13, fontFamily: "monospace" }}>
//         <button
//           onClick={() => location.reload()}
//           style={{ marginRight: 12, padding: "6px 10px", borderRadius: 8, border: "none", cursor: "pointer" }}
//         >
//           Restart
//         </button>
//         <span>Put your background image in /public and refresh to see it behind the scene.</span>
//       </div>
//     </div>
//   );
// }

