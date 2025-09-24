"use client";

import { Bell, Search, User, Coins, MoreVertical, ThumbsUp, MessageCircle, Share2,  } from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

// পোস্ট লিস্ট
const posts = [
  {
    id: 1,
    user: "Rashidul Neon",
    time: "2 ঘন্টা আগে",
    text: "✨ খাঁটি 3D Neon Glow Facebook Post ডিজাইন! 🇧🇩",
    image: "https://picsum.photos/600/400?random=1",
  },
  {
    id: 2,
    user: "Cyber Glow",
    time: "5 ঘন্টা আগে",
    text: "🔥 Tailwind + Next.js দিয়ে বানানো 3D neon feed!",
    image: "https://picsum.photos/600/400?random=2",
  },
  {
    id: 3,
    user: "Bangla Tech",
    time: "গতকাল",
    text: "💡 বাংলাদেশি flavor + Neon Glow effect একসাথে! কেমন লাগছে?",
    image: "https://picsum.photos/600/400?random=3",
  },
];

export default function FbFeedNeon() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0f] to-[#000020] text-white flex flex-col">
      {/* Top Bar */}
      <div className="w-full bg-black/80 backdrop-blur-md text-white shadow-lg px-4 py-2 flex items-center justify-between border-b-2 border-blue-500 rounded-b-2xl 
      [box-shadow:0_0_15px_#00f,0_0_25px_#00f,inset_0_0_10px_#00f]">
        
        {/* Left - Logo */}
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="text-2xl font-bold text-blue-400 cursor-pointer
            [text-shadow:0_0_10px_#00f,0_0_20px_#0ff,0_0_40px_#0ff]"
          >
            f
          </motion.div>
          <span className="hidden sm:block font-semibold">MyFacebook</span>
        </div>

        {/* Middle - Search */}
        <div className="hidden sm:flex items-center rounded-full px-3 py-1 w-72 
        border border-pink-500 [box-shadow:0_0_10px_#ff00ff,0_0_20px_#ff00ff,inset_0_0_10px_#ff00ff]">
          <Search className="w-4 h-4 text-pink-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none px-2 text-sm w-full text-pink-200 placeholder-pink-400"
          />
        </div>

        {/* Right - Coin + Icons */}
        <div className="flex items-center gap-4">
          {/* Coin Balance */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-1 px-3 py-1 rounded-full cursor-pointer
            border border-yellow-400 bg-black 
            [box-shadow:0_0_15px_#ff0,0_0_30px_#ff0,inset_0_0_10px_#ff0]"
          >




            <Coins className="w-4 h-4 text-yellow-300" />
            <span className="font-semibold text-yellow-200">
              <CountUp end={2500} duration={2} separator="," /> R
            </span>
          </motion.div>













          <Bell className="w-6 h-6 cursor-pointer text-cyan-300 hover:text-cyan-400 
          [text-shadow:0_0_10px_#0ff,0_0_20px_#0ff]" />


     <MessageCircle className="w-6 h-6 cursor-pointer text-cyan-300 hover:text-cyan-400 
          [text-shadow:0_0_10px_#0ff,0_0_20px_#0ff]" 

onClick={() => window.location.href ='test/messanger' }

/>


          <User className="w-6 h-6 cursor-pointer text-green-300 hover:text-green-400 
          [text-shadow:0_0_10px_#0f0,0_0_20px_#0f0]" />
        </div>
      </div>

      {/* Feed Section */}
      <div className="flex-1 flex flex-col items-center mt-6 gap-6 px-2 sm:px-0">
        {posts.map((post) => (
          <div
            key={post.id}
            className="w-full sm:w-[500px] bg-black/60 border border-purple-500 rounded-2xl p-4 
            [box-shadow:0_0_20px_#a0f,0_0_40px_#a0f,inset_0_0_15px_#a0f]"
          >
            {/* Profile Row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {/* Profile Img with 3D border */}
                <div className="w-12 h-12 rounded-full border-2 border-cyan-400 
                [box-shadow:0_0_15px_#0ff,0_0_30px_#0ff,inset_0_0_10px_#0ff] overflow-hidden">
                  <img
                    src={`https://i.pravatar.cc/150?u=${post.user}`}
                    alt={post.user}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{post.user}</h4>
                  <p className="text-xs text-gray-300">{post.time}</p>
                </div>
              </div>

              {/* Dot Icon */}
              <MoreVertical className="w-6 h-6 text-gray-300 cursor-pointer hover:text-white" />
            </div>

            {/* Post Content */}
            <p className="mb-3 text-gray-200">{post.text}</p>
            <div className="rounded-xl overflow-hidden border border-pink-400 
            [box-shadow:0_0_15px_#ff00ff,0_0_30px_#ff00ff,inset_0_0_10px_#ff00ff]">
              <img
                src={post.image}
                alt="post"
                className="w-full object-cover"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-4 text-sm">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-1 px-3 py-1 rounded-full border border-blue-400 
                [box-shadow:0_0_10px_#00f,inset_0_0_5px_#00f] hover:bg-blue-500/20"
              >
                <ThumbsUp className="w-4 h-4" /> Like
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-1 px-3 py-1 rounded-full border border-green-400 
                [box-shadow:0_0_10px_#0f0,inset_0_0_5px_#0f0] hover:bg-green-500/20"
              >
                <MessageCircle className="w-4 h-4" /> Comment
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-1 px-3 py-1 rounded-full border border-yellow-400 
                [box-shadow:0_0_10px_#ff0,inset_0_0_5px_#ff0] hover:bg-yellow-500/20"
              >
                <Share2 className="w-4 h-4" /> Share
              </motion.button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}




// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
// import { useRef, useState } from "react";

// const posts = [
//   {
//     id: 1,
//     user: "Rashidul Neon",
//     time: "2 ঘন্টা আগে",
//     text: "✨ খাঁটি 3D Neon Glow Facebook Post ডিজাইন! 🇧🇩",
//     image: "https://picsum.photos/600/400?random=1",
//   },
//   {
//     id: 2,
//     user: "Cyber Glow",
//     time: "5 ঘন্টা আগে",
//     text: "🔥 Tailwind + Next.js দিয়ে বানানো 3D neon feed!",
//     image: "https://picsum.photos/600/400?random=2",
//   },
//   {
//     id: 3,
//     user: "Bangla Tech",
//     time: "গতকাল",
//     text: "💡 বাংলাদেশি flavor + Neon Glow effect একসাথে! কেমন লাগছে?",
//     image: "https://picsum.photos/600/400?random=3",
//   },
// ];

// function PostCard({ post, index }) {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({ target: ref, offset: ["0 1", "1.2 1"] });

//   // Parallax + Glow Intensity
//   const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
//   const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
//   const shadow = useTransform(
//     scrollYProgress,
//     [0, 1],
//     [
//       "0 0 0px rgba(0,255,255,0)",
//       "0 0 35px rgba(0,255,255,0.8)",
//     ]
//   );

//   // State for actions
//   const [likes, setLikes] = useState(0);
//   const [liked, setLiked] = useState(false);
//   const [comments, setComments] = useState<string[]>([]);
//   const [showCommentBox, setShowCommentBox] = useState(false);
//   const [commentText, setCommentText] = useState("");

//   const handleLike = () => {
//     if (liked) {
//       setLikes(likes - 1);
//     } else {
//       setLikes(likes + 1);
//     }
//     setLiked(!liked);
//   };

//   const handleAddComment = () => {
//     if (commentText.trim() !== "") {
//       setComments([...comments, commentText]);
//       setCommentText("");
//     }
//   };

//   const handleShare = () => {
//     alert(`"${post.text}" শেয়ার করা হয়েছে!`);
//   };

//   return (
//     <motion.div
//       ref={ref}
//       style={{ y, scale, boxShadow: shadow }}
//       whileHover={{ scale: 1.03 }}
//       transition={{ type: "spring", stiffness: 120, damping: 15 }}
//       className="rounded-2xl bg-black/60 backdrop-blur-xl border border-cyan-400/40 overflow-hidden transform-gpu mb-12"
//     >
//       {/* Profile Header */}
//       <div className="flex items-center gap-3 p-4">
//         <motion.img
//           whileHover={{ scale: 1.1 }}
//           src={`https://i.pravatar.cc/150?img=${index + 5}`}
//           alt="profile"
//           className="w-12 h-12 rounded-full border-2 border-cyan-400 shadow-[0_0_15px_cyan]"
//         />
//         <div>
//           <h2 className="text-white font-semibold">{post.user}</h2>
//           <p className="text-gray-400 text-sm">{post.time} • 🌍 পাবলিক</p>
//         </div>
//       </div>

//       {/* Post Text */}
//       <div className="px-4 pb-3 text-gray-200 text-lg">{post.text}</div>

//       {/* Post Image */}
//       <motion.div whileHover={{ scale: 1.05, y: -4 }} className="relative">
//         <img
//           src={post.image}
//           alt="post"
//           className="w-full max-h-[400px] object-cover border-y border-cyan-400/30 shadow-[0_0_25px_cyan]"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60"></div>
//       </motion.div>

//       {/* Reactions Count */}
//       <div className="flex justify-between px-4 py-3 text-gray-300 text-sm">
//         <span>👍 {likes} লাইক</span>
//         <span>{comments.length} মন্তব্য</span>
//       </div>

//       {/* Action Buttons */}
//       <div className="grid grid-cols-3 border-t border-cyan-400/20 text-gray-300">
//         {/* Like */}
//         <motion.button
//           whileHover={{ scale: 1.1, y: -3 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleLike}
//           className={`flex items-center justify-center gap-2 py-3 transition ${
//             liked ? "text-cyan-400" : "hover:text-cyan-400"
//           }`}
//         >
//           <ThumbsUp size={18} /> লাইক
//         </motion.button>

//         {/* Comment */}
//         <motion.button
//           whileHover={{ scale: 1.1, y: -3 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => setShowCommentBox(!showCommentBox)}
//           className="flex items-center justify-center gap-2 py-3 hover:text-cyan-400 transition"
//         >
//           <MessageCircle size={18} /> মন্তব্য
//         </motion.button>

//         {/* Share */}
//         <motion.button
//           whileHover={{ scale: 1.1, y: -3 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleShare}
//           className="flex items-center justify-center gap-2 py-3 hover:text-cyan-400 transition"
//         >
//           <Share2 size={18} /> শেয়ার
//         </motion.button>
//       </div>

//       {/* Comment Box */}
//       {showCommentBox && (
//         <div className="px-4 py-3 border-t border-cyan-400/20">
//           <input
//             type="text"
//             value={commentText}
//             onChange={(e) => setCommentText(e.target.value)}
//             placeholder="আপনার মন্তব্য লিখুন..."
//             className="w-full px-3 py-2 rounded-lg bg-black/50 text-white border border-cyan-400/30 outline-none"
//           />
//           <button
//             onClick={handleAddComment}
//             className="mt-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 rounded-lg text-black font-semibold"
//           >
//             Add Comment
//           </button>

//           {/* Show Comments */}
//           <div className="mt-3 space-y-2">
//             {comments.map((c, i) => (
//               <p key={i} className="text-gray-200 bg-black/40 px-3 py-1 rounded-md">
//                 💬 {c}
//               </p>
//             ))}
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// }

// export default function NeonFeedParallax() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
//       <div className="max-w-xl mx-auto">
//         {posts.map((post, index) => (
//           <PostCard key={post.id} post={post} index={index} />
//         ))}
//       </div>
//     </div>
//   );
// }



// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
// import { useRef } from "react";

// const posts = [
//   {
//     id: 1,
//     user: "Rashidul Neon",
//     time: "2 ঘন্টা আগে",
//     text: "✨ খাঁটি 3D Neon Glow Facebook Post ডিজাইন! 🇧🇩",
//     image: "https://picsum.photos/600/400?random=1",
//     reactions: "👍 120 • ❤️ 80 • 🔥 60",
//     comments: "20 মন্তব্য • 10 শেয়ার",
//   },
//   {
//     id: 2,
//     user: "Cyber Glow",
//     time: "5 ঘন্টা আগে",
//     text: "🔥 Tailwind + Next.js দিয়ে বানানো 3D neon feed!",
//     image: "https://picsum.photos/600/400?random=2",
//     reactions: "👍 95 • ❤️ 50 • 😂 20",
//     comments: "12 মন্তব্য • 5 শেয়ার",
//   },
//   {
//     id: 3,
//     user: "Bangla Tech",
//     time: "গতকাল",
//     text: "💡 বাংলাদেশি flavor + Neon Glow effect একসাথে! কেমন লাগছে?",
//     image: "https://picsum.photos/600/400?random=3",
//     reactions: "👍 200 • ❤️ 150 • 🔥 100",
//     comments: "50 মন্তব্য • 25 শেয়ার",
//   },
// ];

// function PostCard({ post, index }) {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({ target: ref, offset: ["0 1", "1.2 1"] });

//   // Parallax + Glow Intensity
//   const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
//   const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
//   const shadow = useTransform(
//     scrollYProgress,
//     [0, 1],
//     [
//       "0 0 0px rgba(0,255,255,0)",
//       "0 0 35px rgba(0,255,255,0.8)",
//     ]
//   );

//   return (
//     <motion.div
//       ref={ref}
//       style={{ y, scale, boxShadow: shadow }}
//       whileHover={{ scale: 1.03 }}
//       transition={{ type: "spring", stiffness: 120, damping: 15 }}
//       className="rounded-2xl bg-black/60 backdrop-blur-xl border border-cyan-400/40 overflow-hidden transform-gpu mb-12"
//     >
//       {/* Profile Header */}
//       <div className="flex items-center gap-3 p-4">
//         <motion.img
//           whileHover={{ scale: 1.1 }}
//           src={`https://i.pravatar.cc/150?img=${index + 5}`}
//           alt="profile"
//           className="w-12 h-12 rounded-full border-2 border-cyan-400 shadow-[0_0_15px_cyan]"
//         />
//         <div>
//           <h2 className="text-white font-semibold">{post.user}</h2>
//           <p className="text-gray-400 text-sm">{post.time} • 🌍 পাবলিক</p>
//         </div>
//       </div>

//       {/* Post Text */}
//       <div className="px-4 pb-3 text-gray-200 text-lg">{post.text}</div>

//       {/* Post Image */}
//       <motion.div whileHover={{ scale: 1.05, y: -4 }} className="relative">
//         <img
//           src={post.image}
//           alt="post"
//           className="w-full max-h-[400px] object-cover border-y border-cyan-400/30 shadow-[0_0_25px_cyan]"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60"></div>
//       </motion.div>

//       {/* Reactions */}
//       <div className="flex justify-between px-4 py-3 text-gray-300 text-sm">
//         <span>{post.reactions}</span>
//         <span>{post.comments}</span>
//       </div>

//       {/* Action Buttons */}
//       <div className="grid grid-cols-3 border-t border-cyan-400/20 text-gray-300">
//         {[
//           { icon: <ThumbsUp size={18} />, text: "লাইক" },
//           { icon: <MessageCircle size={18} />, text: "মন্তব্য" },
//           { icon: <Share2 size={18} />, text: "শেয়ার" },
//         ].map((btn, i) => (
//           <motion.button
//             key={i}
//             whileHover={{ scale: 1.1, y: -3 }}
//             whileTap={{ scale: 0.95 }}
//             className="flex items-center justify-center gap-2 py-3 text-gray-200 hover:text-cyan-400 transition shadow-[0_0_12px_rgba(0,255,255,0.7)]"
//           >
//             {btn.icon} {btn.text}
//           </motion.button>
//         ))}
//       </div>
//     </motion.div>
//   );
// }

// export default function NeonFeedParallax() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
//       <div className="max-w-xl mx-auto">
//         {posts.map((post, index) => (
//           <PostCard key={post.id} post={post} index={index} />
//         ))}
//       </div>
//     </div>
//   );
// }





// "use client";

// import { motion } from "framer-motion";
// import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";

// const posts = [
//   {
//     id: 1,
//     user: "Rashidul Neon",
//     time: "2 ঘন্টা আগে",
//     text: "✨ এটা একটা 3D Neon Glow Facebook Post ডিজাইন, বাংলাদেশি স্টাইলে! 🇧🇩",
//     image: "https://picsum.photos/600/400?random=1",
//     reactions: "👍 120 • ❤️ 80 • 🔥 60",
//     comments: "20 মন্তব্য • 10 শেয়ার",
//   },
//   {
//     id: 2,
//     user: "Cyber Glow",
//     time: "5 ঘন্টা আগে",
//     text: "🔥 Tailwind + Next.js দিয়ে বানানো neon feed layout!",
//     image: "https://picsum.photos/600/400?random=2",
//     reactions: "👍 95 • ❤️ 50 • 😂 20",
//     comments: "12 মন্তব্য • 5 শেয়ার",
//   },
//   {
//     id: 3,
//     user: "Bangla Tech",
//     time: "গতকাল",
//     text: "💡 বাংলাদেশি flavor + Neon Glow effect একসাথে! কেমন লাগছে?",
//     image: "https://picsum.photos/600/400?random=3",
//     reactions: "👍 200 • ❤️ 150 • 🔥 100",
//     comments: "50 মন্তব্য • 25 শেয়ার",
//   },
// ];

// export default function NeonFeed3D() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
//       <div className="max-w-xl mx-auto space-y-8">
//         {posts.map((post, index) => (
//           <motion.div
//             key={post.id}
//             initial={{ opacity: 0, y: 50, scale: 0.9 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{ delay: index * 0.2 }}
//             whileHover={{ scale: 1.03, y: -5 }}
//             className="rounded-2xl bg-black/50 backdrop-blur-xl shadow-[0_0_25px_5px_rgba(0,255,255,0.6)] border border-cyan-400/40 overflow-hidden transform-gpu"
//           >
//             {/* Profile Header */}
//             <div className="flex items-center gap-3 p-4">
//               <motion.img
//                 whileHover={{ scale: 1.1, rotate: 2 }}
//                 src={`https://i.pravatar.cc/150?img=${index + 5}`}
//                 alt="profile"
//                 className="w-12 h-12 rounded-full border-2 border-cyan-400 shadow-[0_0_15px_cyan]"
//               />
//               <div>
//                 <h2 className="text-white font-semibold">{post.user}</h2>
//                 <p className="text-gray-400 text-sm">{post.time} • 🌍 পাবলিক</p>
//               </div>
//             </div>

//             {/* Post Text */}
//             <div className="px-4 pb-3 text-gray-200 text-lg">{post.text}</div>

//             {/* Post Image */}
//             <motion.div
//               whileHover={{ scale: 1.05, y: -4 }}
//               className="relative"
//             >
//               <img
//                 src={post.image}
//                 alt="post"
//                 className="w-full max-h-[400px] object-cover border-y border-cyan-400/30 shadow-[0_0_25px_cyan]"
//               />
//               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60 rounded-lg"></div>
//             </motion.div>

//             {/* Reactions */}
//             <div className="flex justify-between px-4 py-3 text-gray-300 text-sm">
//               <span>{post.reactions}</span>
//               <span>{post.comments}</span>
//             </div>

//             {/* Action Buttons */}
//             <div className="grid grid-cols-3 border-t border-cyan-400/20 text-gray-300">
//               {[
//                 { icon: <ThumbsUp size={18} />, text: "লাইক" },
//                 { icon: <MessageCircle size={18} />, text: "মন্তব্য" },
//                 { icon: <Share2 size={18} />, text: "শেয়ার" },
//               ].map((btn, i) => (
//                 <motion.button
//                   key={i}
//                   whileHover={{ scale: 1.1, y: -3 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="flex items-center justify-center gap-2 py-3 text-gray-200 hover:text-cyan-400 transition shadow-[0_0_10px_rgba(0,255,255,0.5)]"
//                 >
//                   {btn.icon} {btn.text}
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }








// "use client";

// import { motion } from "framer-motion";
// import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
// import { useState } from "react";
// import CountUp from "react-countup";

// const posts = [
//   {
//     id: 1,
//     user: "Rashidul Neon",
//     time: "2 ঘন্টা আগে",
//     text: "✨ এটা একটা 3D Neon Glow Facebook Post ডিজাইন, বাংলাদেশি স্টাইলে! 🇧🇩",
//     image: "https://picsum.photos/600/400?random=1",
//     likes: 120,
//     comments: [
//       { id: 1, name: "Hasan", text: "ওয়াও দারুণ লাগলো 🔥" },
//       { id: 2, name: "Mitu", text: "বাংলাদেশি টাচ অসাধারণ ✨" },
//     ],
//     shares: 10,
//   },
//   {
//     id: 2,
//     user: "Cyber Glow",
//     time: "5 ঘন্টা আগে",
//     text: "🔥 Tailwind + Next.js দিয়ে বানানো neon feed layout! ",
//     image: "https://picsum.photos/600/400?random=2",
//     likes: 95,
//     comments: [{ id: 1, name: "Arif", text: "কোডটা দারুণ clean 💡" }],
//     shares: 5,
//   },
// ];

// export default function NeonFeed() {
//   const [expanded, setExpanded] = useState({});
//   const [likeCount, setLikeCount] = useState(
//     Object.fromEntries(posts.map((p) => [p.id, p.likes]))
//   );

//   const toggleComments = (id) => {
//     setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const handleLike = (id) => {
//     setLikeCount((prev) => ({ ...prev, [id]: prev[id] + 1 }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
//       <div className="max-w-xl mx-auto space-y-10">
//         {posts.map((post, index) => (
//           <motion.div
//             key={post.id}
//             initial={{ opacity: 0, y: 50, scale: 0.9 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{ delay: index * 0.2, type: "spring", stiffness: 120 }}
//             whileHover={{ y: -10, scale: 1.02 }}
//             className="rounded-2xl bg-black/50 backdrop-blur-xl 
//               shadow-[0_0_35px_10px_rgba(0,255,255,0.4)] 
//               border border-cyan-400/40 overflow-hidden 
//               transition-all duration-300"
//           >
//             {/* Profile Header */}
//             <div className="flex items-center gap-3 p-4">
//               <motion.img
//                 whileHover={{ scale: 1.1, rotate: 3 }}
//                 src={`https://i.pravatar.cc/150?img=${index + 10}`}
//                 alt="profile"
//                 className="w-12 h-12 rounded-full border-2 border-cyan-400 shadow-[0_0_20px_cyan]"
//               />
//               <div>
//                 <h2 className="text-white font-semibold">{post.user}</h2>
//                 <p className="text-gray-400 text-sm">{post.time} • 🌍 পাবলিক</p>
//               </div>
//             </div>

//             {/* Post Text */}
//             <div className="px-4 pb-3 text-gray-200 text-lg">{post.text}</div>

//             {/* Post Image */}
//             <motion.div
//               whileHover={{ scale: 1.03, y: -5 }}
//               transition={{ type: "spring", stiffness: 200 }}
//               className="relative"
//             >
//               <img
//                 src={post.image}
//                 alt="post"
//                 className="w-full max-h-[400px] object-cover border-y border-cyan-400/30 rounded-lg"
//               />
//               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60 rounded-lg"></div>
//             </motion.div>

//             {/* Reactions */}
//             <div className="flex justify-between px-4 py-3 text-gray-300 text-sm">
//               <span>
//                 👍{" "}
//                 <CountUp
//                   end={likeCount[post.id]}
//                   duration={0.8}
//                   preserveValue={true}
//                 />{" "}
//                 • 💬 {post.comments.length} • 🔄 {post.shares}
//               </span>
//             </div>

//             {/* Floating Neon Buttons */}
//             <div className="grid grid-cols-3 gap-3 px-3 pb-4">
//               <motion.button
//                 whileHover={{ scale: 1.05, y: -4 }}
//                 onClick={() => handleLike(post.id)}
//                 className="flex items-center justify-center gap-2 py-3 rounded-xl text-cyan-300 font-semibold 
//                   border border-cyan-400 bg-black/40 
//                   shadow-[0_0_20px_rgba(0,255,255,0.9),0_0_30px_rgba(0,255,255,0.6)]
//                   hover:bg-cyan-500/20 hover:text-cyan-200 transition-all duration-200"
//               >
//                 <ThumbsUp size={18} /> লাইক
//               </motion.button>

//               <motion.button
//                 whileHover={{ scale: 1.05, y: -4 }}
//                 onClick={() => toggleComments(post.id)}
//                 className="flex items-center justify-center gap-2 py-3 rounded-xl text-cyan-300 font-semibold 
//                   border border-cyan-400 bg-black/40 
//                   shadow-[0_0_20px_rgba(0,255,255,0.9),0_0_30px_rgba(0,255,255,0.6)]
//                   hover:bg-cyan-500/20 hover:text-cyan-200 transition-all duration-200"
//               >
//                 <MessageCircle size={18} /> মন্তব্য
//               </motion.button>

//               <motion.button
//                 whileHover={{ scale: 1.05, y: -4 }}
//                 className="flex items-center justify-center gap-2 py-3 rounded-xl text-cyan-300 font-semibold 
//                   border border-cyan-400 bg-black/40 
//                   shadow-[0_0_20px_rgba(0,255,255,0.9),0_0_30px_rgba(0,255,255,0.6)]
//                   hover:bg-cyan-500/20 hover:text-cyan-200 transition-all duration-200"
//               >
//                 <Share2 size={18} /> শেয়ার
//               </motion.button>
//             </div>

//             {/* Comments */}
//             {expanded[post.id] && (
//               <motion.div
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: "auto", opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="p-4 space-y-3 border-t border-cyan-400/20 bg-black/30"
//               >
//                 {post.comments.map((c) => (
//                   <motion.div
//                     key={c.id}
//                     whileHover={{ scale: 1.02, y: -2 }}
//                     className="flex gap-3 items-start"
//                   >
//                     <img
//                       src={`https://i.pravatar.cc/40?u=${c.id}`}
//                       alt="c"
//                       className="w-8 h-8 rounded-full border border-cyan-400 shadow-[0_0_10px_cyan]"
//                     />
//                     <div className="bg-gray-800/50 text-gray-200 px-3 py-2 rounded-lg shadow-[0_0_15px_rgba(0,255,255,0.4)]">
//                       <span className="font-semibold text-cyan-400">
//                         {c.name}
//                       </span>
//                       <p>{c.text}</p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             )}
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }





// "use client";

// import { motion } from "framer-motion";
// import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
// import { useState } from "react";
// import CountUp from "react-countup";

// const posts = [
//   {
//     id: 1,
//     user: "Rashidul Neon",
//     time: "2 ঘন্টা আগে",
//     text: "✨ এটা একটা 3D Neon Glow Facebook Post ডিজাইন, বাংলাদেশি স্টাইলে! 🇧🇩",
//     image: "https://picsum.photos/600/400?random=1",
//     likes: 120,
//     comments: [
//       { id: 1, name: "Hasan", text: "ওয়াও দারুণ লাগলো 🔥" },
//       { id: 2, name: "Mitu", text: "বাংলাদেশি টাচ অসাধারণ ✨" },
//     ],
//     shares: 10,
//   },
//   {
//     id: 2,
//     user: "Cyber Glow",
//     time: "5 ঘন্টা আগে",
//     text: "🔥 Tailwind + Next.js দিয়ে বানানো neon feed layout! ",
//     image: "https://picsum.photos/600/400?random=2",
//     likes: 95,
//     comments: [{ id: 1, name: "Arif", text: "কোডটা দারুণ clean 💡" }],
//     shares: 5,
//   },
// ];

// export default function NeonFeed() {
//   const [expanded, setExpanded] = useState({});
//   const [likeCount, setLikeCount] = useState(
//     Object.fromEntries(posts.map((p) => [p.id, p.likes]))
//   );

//   const toggleComments = (id) => {
//     setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const handleLike = (id) => {
//     setLikeCount((prev) => ({ ...prev, [id]: prev[id] + 1 }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
//       <div className="max-w-xl mx-auto space-y-8">
//         {posts.map((post, index) => (
//           <motion.div
//             key={post.id}
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.2 }}
//             className="rounded-2xl bg-black/50 backdrop-blur-xl shadow-[0_0_25px_5px_rgba(0,255,255,0.5)] border border-cyan-400/40 overflow-hidden"
//           >
//             {/* Profile Header */}
//             <div className="flex items-center gap-3 p-4">
//               <img
//                 src={`https://i.pravatar.cc/150?img=${index + 10}`}
//                 alt="profile"
//                 className="w-12 h-12 rounded-full border-2 border-cyan-400 shadow-[0_0_10px_cyan]"
//               />
//               <div>
//                 <h2 className="text-white font-semibold">{post.user}</h2>
//                 <p className="text-gray-400 text-sm">{post.time} • 🌍 পাবলিক</p>
//               </div>
//             </div>

//             {/* Post Text */}
//             <div className="px-4 pb-3 text-gray-200 text-lg">{post.text}</div>

//             {/* Post Image */}
//             <div className="relative">
//               <img
//                 src={post.image}
//                 alt="post"
//                 className="w-full max-h-[400px] object-cover border-y border-cyan-400/30"
//               />
//               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60"></div>
//             </div>

//             {/* Reactions */}
//             <div className="flex justify-between px-4 py-3 text-gray-300 text-sm">
//               <span>
//                 👍{" "}
//                 <CountUp
//                   end={likeCount[post.id]}
//                   duration={0.8}
//                   preserveValue={true}
//                 />{" "}
//                 • 💬 {post.comments.length} • 🔄 {post.shares}
//               </span>
//             </div>

//             {/* Action Buttons with Neon Glow */}
//             <div className="grid grid-cols-3 gap-3 px-3 pb-4">
//               <button
//                 onClick={() => handleLike(post.id)}
//                 className="flex items-center justify-center gap-2 py-3 rounded-xl text-cyan-300 font-semibold 
//                   border border-cyan-400 bg-black/40 
//                   shadow-[0_0_15px_rgba(0,255,255,0.8),inset_0_0_10px_rgba(0,255,255,0.5)]
//                   hover:scale-95 hover:bg-cyan-500/20 hover:text-cyan-200 transition-all duration-200"
//               >
//                 <ThumbsUp size={18} /> লাইক
//               </button>

//               <button
//                 onClick={() => toggleComments(post.id)}
//                 className="flex items-center justify-center gap-2 py-3 rounded-xl text-cyan-300 font-semibold 
//                   border border-cyan-400 bg-black/40 
//                   shadow-[0_0_15px_rgba(0,255,255,0.8),inset_0_0_10px_rgba(0,255,255,0.5)]
//                   hover:scale-95 hover:bg-cyan-500/20 hover:text-cyan-200 transition-all duration-200"
//               >
//                 <MessageCircle size={18} /> মন্তব্য
//               </button>

//               <button
//                 className="flex items-center justify-center gap-2 py-3 rounded-xl text-cyan-300 font-semibold 
//                   border border-cyan-400 bg-black/40 
//                   shadow-[0_0_15px_rgba(0,255,255,0.8),inset_0_0_10px_rgba(0,255,255,0.5)]
//                   hover:scale-95 hover:bg-cyan-500/20 hover:text-cyan-200 transition-all duration-200"
//               >
//                 <Share2 size={18} /> শেয়ার
//               </button>
//             </div>

//             {/* Comments */}
//             {expanded[post.id] && (
//               <motion.div
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: "auto", opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="p-4 space-y-3 border-t border-cyan-400/20 bg-black/30"
//               >
//                 {post.comments.map((c) => (
//                   <div key={c.id} className="flex gap-3 items-start">
//                     <img
//                       src={`https://i.pravatar.cc/40?u=${c.id}`}
//                       alt="c"
//                       className="w-8 h-8 rounded-full border border-cyan-400"
//                     />
//                     <div className="bg-gray-800/50 text-gray-200 px-3 py-2 rounded-lg shadow-[0_0_10px_rgba(0,255,255,0.3)]">
//                       <span className="font-semibold text-cyan-400">
//                         {c.name}
//                       </span>
//                       <p>{c.text}</p>
//                     </div>
//                   </div>
//                 ))}
//               </motion.div>
//             )}
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }













// "use client";

// import { motion } from "framer-motion";
// import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
// import { useState } from "react";
// import CountUp from "react-countup";

// const posts = [
//   {
//     id: 1,
//     user: "Rashidul Neon",
//     time: "2 ঘন্টা আগে",
//     text: "✨ এটা একটা 3D Neon Glow Facebook Post ডিজাইন, বাংলাদেশি স্টাইলে! 🇧🇩",
//     image: "https://picsum.photos/600/400?random=1",
//     likes: 120,
//     comments: [
//       { id: 1, name: "Hasan", text: "ওয়াও দারুণ লাগলো 🔥" },
//       { id: 2, name: "Mitu", text: "বাংলাদেশি টাচ অসাধারণ ✨" },
//     ],
//     shares: 10,
//   },
//   {
//     id: 2,
//     user: "Cyber Glow",
//     time: "5 ঘন্টা আগে",
//     text: "🔥 Tailwind + Next.js দিয়ে বানানো neon feed layout! ",
//     image: "https://picsum.photos/600/400?random=2",
//     likes: 95,
//     comments: [{ id: 1, name: "Arif", text: "কোডটা দারুণ clean 💡" }],
//     shares: 5,
//   },
// ];

// export default function NeonFeed() {
//   const [expanded, setExpanded] = useState({});
//   const [likeCount, setLikeCount] = useState(
//     Object.fromEntries(posts.map((p) => [p.id, p.likes]))
//   );

//   const toggleComments = (id) => {
//     setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const handleLike = (id) => {
//     setLikeCount((prev) => ({ ...prev, [id]: prev[id] + 1 }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
//       <div className="max-w-xl mx-auto space-y-8">
//         {posts.map((post, index) => (
//           <motion.div
//             key={post.id}
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.2 }}
//             className="rounded-2xl bg-black/50 backdrop-blur-xl shadow-[0_0_25px_5px_rgba(0,255,255,0.5)] border border-cyan-400/40 overflow-hidden"
//           >
//             {/* Profile Header */}
//             <div className="flex items-center gap-3 p-4">
//               <img
//                 src={`https://i.pravatar.cc/150?img=${index + 10}`}
//                 alt="profile"
//                 className="w-12 h-12 rounded-full border-2 border-cyan-400 shadow-[0_0_10px_cyan]"
//               />
//               <div>
//                 <h2 className="text-white font-semibold">{post.user}</h2>
//                 <p className="text-gray-400 text-sm">{post.time} • 🌍 পাবলিক</p>
//               </div>
//             </div>

//             {/* Post Text */}
//             <div className="px-4 pb-3 text-gray-200 text-lg">{post.text}</div>

//             {/* Post Image */}
//             <div className="relative">
//               <img
//                 src={post.image}
//                 alt="post"
//                 className="w-full max-h-[400px] object-cover border-y border-cyan-400/30"
//               />
//               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60"></div>
//             </div>

//             {/* Reactions */}
//             <div className="flex justify-between px-4 py-3 text-gray-300 text-sm">
//               <span>
//                 👍{" "}
//                 <CountUp
//                   end={likeCount[post.id]}
//                   duration={0.8}
//                   preserveValue={true}
//                 />{" "}
//                 • 💬 {post.comments.length} • 🔄 {post.shares}
//               </span>
//             </div>

//             {/* Action Buttons */}
//             <div className="grid grid-cols-3 border-t border-cyan-400/20 text-gray-300">
//               <button
//                 onClick={() => handleLike(post.id)}
//                 className="flex items-center justify-center gap-2 py-3 hover:text-cyan-400 transition"
//               >
//                 <ThumbsUp size={18} /> লাইক
//               </button>
//               <button
//                 onClick={() => toggleComments(post.id)}
//                 className="flex items-center justify-center gap-2 py-3 hover:text-cyan-400 transition"
//               >
//                 <MessageCircle size={18} /> মন্তব্য
//               </button>
//               <button className="flex items-center justify-center gap-2 py-3 hover:text-cyan-400 transition">
//                 <Share2 size={18} /> শেয়ার
//               </button>
//             </div>

//             {/* Comments */}
//             {expanded[post.id] && (
//               <motion.div
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: "auto", opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="p-4 space-y-3 border-t border-cyan-400/20 bg-black/30"
//               >
//                 {post.comments.map((c) => (
//                   <div key={c.id} className="flex gap-3 items-start">
//                     <img
//                       src={`https://i.pravatar.cc/40?u=${c.id}`}
//                       alt="c"
//                       className="w-8 h-8 rounded-full border border-cyan-400"
//                     />
//                     <div className="bg-gray-800/50 text-gray-200 px-3 py-2 rounded-lg shadow-[0_0_10px_rgba(0,255,255,0.3)]">
//                       <span className="font-semibold text-cyan-400">
//                         {c.name}
//                       </span>
//                       <p>{c.text}</p>
//                     </div>
//                   </div>
//                 ))}
//               </motion.div>
//             )}
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }







// "use client";

// import { motion } from "framer-motion";
// import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";

// const posts = [
//   {
//     id: 1,
//     user: "Rashidul Neon",
//     time: "2 ঘন্টা আগে",
//     text: "✨ এটা একটা 3D Neon Glow Facebook Post ডিজাইন, বাংলাদেশি স্টাইলে! 🇧🇩",
//     image: "https://picsum.photos/600/400?random=1",
//     reactions: "👍 120 • ❤️ 80 • 🔥 60",
//     comments: "20 মন্তব্য • 10 শেয়ার",
//   },
//   {
//     id: 2,
//     user: "Cyber Glow",
//     time: "5 ঘন্টা আগে",
//     text: "🔥 Tailwind + Next.js দিয়ে বানানো neon feed layout! ",
//     image: "https://picsum.photos/600/400?random=2",
//     reactions: "👍 95 • ❤️ 50 • 😂 20",
//     comments: "12 মন্তব্য • 5 শেয়ার",
//   },
//   {
//     id: 3,
//     user: "Bangla Tech",
//     time: "গতকাল",
//     text: "💡 বাংলাদেশি flavor + Neon Glow effect একসাথে! কেমন লাগছে?",
//     image: "https://picsum.photos/600/400?random=3",
//     reactions: "👍 200 • ❤️ 150 • 🔥 100",
//     comments: "50 মন্তব্য • 25 শেয়ার",
//   },
// ];

// export default function NeonFeed() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
//       <div className="max-w-xl mx-auto space-y-8">
//         {posts.map((post, index) => (
//           <motion.div
//             key={post.id}
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.2 }}
//             className="rounded-2xl bg-black/50 backdrop-blur-xl shadow-[0_0_25px_5px_rgba(0,255,255,0.5)] border border-cyan-400/40 overflow-hidden"
//           >
//             {/* Profile Header */}
//             <div className="flex items-center gap-3 p-4">
//               <img
//                 src={`https://i.pravatar.cc/150?img=${index + 5}`}
//                 alt="profile"
//                 className="w-12 h-12 rounded-full border-2 border-cyan-400 shadow-[0_0_10px_cyan]"
//               />
//               <div>
//                 <h2 className="text-white font-semibold">{post.user}</h2>
//                 <p className="text-gray-400 text-sm">{post.time} • 🌍 পাবলিক</p>
//               </div>
//             </div>

//             {/* Post Text */}
//             <div className="px-4 pb-3 text-gray-200 text-lg">{post.text}</div>

//             {/* Post Image */}
//             <div className="relative">
//               <img
//                 src={post.image}
//                 alt="post"
//                 className="w-full max-h-[400px] object-cover border-y border-cyan-400/30"
//               />
//               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60"></div>
//             </div>

//             {/* Reactions */}
//             <div className="flex justify-between px-4 py-3 text-gray-300 text-sm">
//               <span>{post.reactions}</span>
//               <span>{post.comments}</span>
//             </div>

//             {/* Action Buttons */}
//             <div className="grid grid-cols-3 border-t border-cyan-400/20 text-gray-300">
//               <button className="flex items-center justify-center gap-2 py-3 hover:text-cyan-400 transition">
//                 <ThumbsUp size={18} /> লাইক
//               </button>
//               <button className="flex items-center justify-center gap-2 py-3 hover:text-cyan-400 transition">
//                 <MessageCircle size={18} /> মন্তব্য
//               </button>
//               <button className="flex items-center justify-center gap-2 py-3 hover:text-cyan-400 transition">
//                 <Share2 size={18} /> শেয়ার
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }









// "use client";

// import { motion } from "framer-motion";
// import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";

// export default function NeonPostCard() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-6">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-lg rounded-2xl bg-black/50 backdrop-blur-xl shadow-[0_0_25px_5px_rgba(0,255,255,0.5)] border border-cyan-400/40 overflow-hidden"
//       >
//         {/* Profile Header */}
//         <div className="flex items-center gap-3 p-4">
//           <img
//             src="https://i.pravatar.cc/50"
//             alt="profile"
//             className="w-12 h-12 rounded-full border-2 border-cyan-400 shadow-[0_0_10px_cyan]"
//           />
//           <div>
//             <h2 className="text-white font-semibold">Rashidul Neon</h2>
//             <p className="text-gray-400 text-sm">2 ঘন্টা আগে • 🌍 পাবলিক</p>
//           </div>
//         </div>

//         {/* Post Text */}
//         <div className="px-4 pb-3 text-gray-200 text-lg">
//           ✨ এটা একটা <span className="text-cyan-400 font-bold">3D Neon Glow Facebook Post</span> ডিজাইন,  
//           যা বাংলাদেশি স্টাইলে বানানো! 🇧🇩
//         </div>

//         {/* Post Image */}
//         <div className="relative">
//           <img
//             src="https://picsum.photos/600/400?random=1"
//             alt="post"
//             className="w-full max-h-[400px] object-cover border-y border-cyan-400/30"
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60"></div>
//         </div>

//         {/* Reactions */}
//         <div className="flex justify-between px-4 py-3 text-gray-300 text-sm">
//           <span>👍 120 • ❤️ 80 • 🔥 60</span>
//           <span>20 মন্তব্য • 10 শেয়ার</span>
//         </div>

//         {/* Action Buttons */}
//         <div className="grid grid-cols-3 border-t border-cyan-400/20 text-gray-300">
//           <button className="flex items-center justify-center gap-2 py-3 hover:text-cyan-400 transition">
//             <ThumbsUp size={18} /> লাইক
//           </button>
//           <button className="flex items-center justify-center gap-2 py-3 hover:text-cyan-400 transition">
//             <MessageCircle size={18} /> মন্তব্য
//           </button>
//           <button className="flex items-center justify-center gap-2 py-3 hover:text-cyan-400 transition">
//             <Share2 size={18} /> শেয়ার
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }
