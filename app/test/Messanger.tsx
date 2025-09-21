






// app/test/Messenger.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Send, Smile, Menu, X, Paperclip, Check } from "lucide-react";
import Image from "next/image";

type User = {
  id: number;
  name?: string;
  avatar?: string;
  online?: boolean;
};

type Message = {
  id: number;
  senderId: number;
  receiverId: number;
  content?: string;
  file?: string | null;
  seen?: boolean;
};

export default function Messenger() {
  const [me] = useState<User>({ id: 1, name: "Lija", avatar: "/me.png" });
  const [friends, setFriends] = useState<User[]>([]);
  const [activePeer, setActivePeer] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [typingUser, setTypingUser] = useState<User | null>(null);

  // socket ref (init only on client)
  const socketRef = useRef<Socket | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // initialize socket once on mount
  useEffect(() => {
    // ---- init socket inside effect to avoid SSR/build issues ----
    const s = io("http://localhost:5000", {
      transports: ["websocket"],
      autoConnect: true,
    });
    socketRef.current = s;

    // identify user (server should handle this)
    s.emit("identify", String(me.id));

    // receive any incoming message (append globally)
    const onReceive = (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    };
    s.on("receive_message", onReceive);

    // message seen update
    const onSeen = (msgId: number) => {
      setMessages((prev) => prev.map((m) => (m.id === msgId ? { ...m, seen: true } : m)));
    };
    s.on("message_seen", onSeen);

    // typing / stop_typing handlers
    const onTyping = (user: User) => setTypingUser(user);
    const onStopTyping = (userId: number) =>
      setTypingUser((prev) => (prev && prev.id === userId ? null : prev));

    s.on("typing", onTyping);
    s.on("stop_typing", onStopTyping);

    // cleanup on unmount
    return () => {
      s.off("receive_message", onReceive);
      s.off("message_seen", onSeen);
      s.off("typing", onTyping);
      s.off("stop_typing", onStopTyping);
      s.disconnect();
      socketRef.current = null;
    };
    // NOTE: empty deps — we want single socket instance for component lifetime
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // sample friends (could be fetched)
  useEffect(() => {
    setFriends([
      { id: 2, name: "Rahim", avatar: "/user1.png", online: true },
      { id: 3, name: "Karim", avatar: "/user2.png", online: false },
      { id: 4, name: "Jannat", avatar: "/user3.png", online: true },
    ]);
  }, []);

  // auto-scroll & mark seen for active conversation
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }

    if (!activePeer) return;

    // mark visible messages as seen
    const visible = messages.filter(
      (m) =>
        (m.senderId === activePeer.id && m.receiverId === me.id) ||
        (m.senderId === me.id && m.receiverId === activePeer.id)
    );

    visible.forEach((m) => {
      if (m.receiverId === me.id && !m.seen) {
        socketRef.current?.emit("mark_seen", m.id);
        // optimistically mark seen locally (optional)
        setMessages((prev) => prev.map((msg) => (msg.id === m.id ? { ...msg, seen: true } : msg)));
      }
    });
  }, [messages, activePeer, me.id]);

  const send = () => {
    if ((!text.trim() && !file) || !activePeer) return;

    const msg: Message = {
      id: Date.now(),
      senderId: me.id,
      receiverId: activePeer.id,
      content: text,
      file: file ? URL.createObjectURL(file) : null,
      seen: false,
    };

    // emit and locally append
    socketRef.current?.emit("send_message", msg);
    socketRef.current?.emit("stop_typing", me.id);

    setMessages((prev) => [...prev, msg]);
    setText("");
    setFile(null);
    setShowEmoji(false);
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);

    if (!socketRef.current) return;
    socketRef.current.emit("typing", me);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current?.emit("stop_typing", me.id);
    }, 2000);
  };

  // helper: messages for active peer
  const visibleMessages = activePeer
    ? messages.filter(
        (m) =>
          (m.senderId === activePeer.id && m.receiverId === me.id) ||
          (m.senderId === me.id && m.receiverId === activePeer.id)
      )
    : [];

  const getLastMessage = (fid: number) => {
    const last = messages
      .filter(
        (m) =>
          (m.senderId === fid && m.receiverId === me.id) ||
          (m.senderId === me.id && m.receiverId === fid)
      )
      .slice(-1)[0];
    return last ? (last.content ?? "Attachment") : "No messages yet";
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-72 bg-white dark:bg-gray-800 border-r transform transition-transform duration-300 ease-in-out 
        lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-bold text-lg">Chats</h3>
          <button className="lg:hidden p-2" onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>

        <div className="p-3">
          <input
            type="text"
            placeholder="Search Messenger..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 rounded-lg border bg-gray-100 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="p-2 space-y-2 overflow-y-auto h-[calc(100vh-150px)]">
          {friends
            .filter((f) => f.name?.toLowerCase().includes(search.toLowerCase()))
            .map((f) => (
              <div
                key={f.id}
                onClick={() => {
                  setActivePeer(f);
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
                  activePeer?.id === f.id ? "bg-gray-200 dark:bg-gray-700" : ""
                }`}
              >
                <div className="relative">
                  <Image src={f.avatar || "/user1.png"} alt={f.name || "user"} width={40} height={40} className="rounded-full border" />
                  {f.online && <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{f.name}</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{getLastMessage(f.id)}</span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <button className="lg:hidden p-2" onClick={() => setSidebarOpen(true)}>
              <Menu />
            </button>
            {activePeer && (
              <div className="flex items-center gap-2">
                <Image src={activePeer.avatar || "/user1.png"} alt={activePeer.name || "user"} width={40} height={40} className="rounded-full border" />
                <div>
                  <h2 className="text-lg font-semibold">{activePeer.name}</h2>
                  <p className="text-sm text-gray-500">{activePeer.online ? "Active now" : "Offline"}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2" ref={messagesRef}>
          {visibleMessages.map((m) => (
            <div key={m.id} className={`flex flex-col ${m.senderId === me.id ? "items-end" : "items-start"}`}>
              <div className={`px-4 py-2 rounded-2xl max-w-[70%] ${m.senderId === me.id ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-300 dark:bg-gray-700 dark:text-white rounded-bl-none"}`}>
                {m.content && <p>{m.content}</p>}
                {m.file && <img src={m.file} alt="attachment" width={200} height={200} className="mt-2 rounded-lg" />}
              </div>

              {m.senderId === me.id && (
                <span className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  {m.seen ? (
                    <>
                      Seen <Check className="w-3 h-3 text-blue-500" />
                    </>
                  ) : (
                    "Sent"
                  )}
                </span>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {typingUser && activePeer?.id === typingUser.id && (
            <div className="flex justify-start">
              <div className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-2xl text-gray-600 dark:text-gray-300">
                <span className="animate-pulse">... typing</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        {activePeer && (
          <div className="p-4 border-t bg-white dark:bg-gray-800 flex items-center gap-2 relative">
            <button onClick={() => setShowEmoji(!showEmoji)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              <Smile />
            </button>

            <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} className="hidden" id="fileUpload" />
            <label htmlFor="fileUpload" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
              <Paperclip />
            </label>

            <input
              value={text}
              onChange={handleTyping}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message..."
              className="flex-1 p-2 rounded-full border dark:border-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none"
            />

            <button onClick={send} className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
              <Send />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}











// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import { io, Socket } from "socket.io-client";
// import { Send, Smile, Menu, X, Paperclip, Check } from "lucide-react";
// import Image from "next/image";
// import { number } from "framer-motion";

// let socket: Socket | null = null;




// interface Product {
//   id: number;
//   name: string;
//   model: string;
//   pricee: number;
//   reprice?: number;
//   qty: number;
//   img?: string;       // <-- যোগ করতে হবে
//   imglink?: string;   // <-- যোগ করতে হবে
//   rating?: number;
// }


// export default function Messenger() {
//   const [me] = useState({ id: 1, name: "Lija", avatar: "/me.png" });
//   const [friends, setFriends] = useState<any[]>([]);
//   const [activePeer, setActivePeer] = useState<any | null>(null);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [text, setText] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const [showEmoji, setShowEmoji] = useState(false);
//   const [file, setFile] = useState<File | null>(null);
//   const [typingUser, setTypingUser] = useState<any | null>(null);

//   const messagesRef = useRef<HTMLDivElement | null>(null);
//   const typingTimeout = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     // socket init
//     socket = io("http://localhost:5000", { autoConnect: true });

//     socket.emit("identify", String(me.id));

//     socket.on("receive_message", (msg: any) => {
//       if (
//         (msg.senderId === activePeer?.id && msg.receiverId === me.id) ||
//         (msg.senderId === me.id && msg.receiverId === activePeer?.id)
//       ) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     });

//     socket.on("message_seen", (msgId: number) => {
//       setMessages((prev) =>
//         prev.map((m) => (m.id === msgId ? { ...m, seen: true } : m))
//       );
//     });

// socket.on("typing", (user: { id: number; name?: string }) => {
//   setTypingUser(user);
// });

// socket.on("stop_typing", (userId: number ) => {
//   setTypingUser((prev: number) => (prev && prev.id === userId ? null : prev));
// });


//     // ✅ cleanup
//     return () => {
//       if (socket) {
//         socket.disconnect();
//         socket = null;
//       }
//     };
//   }, [me.id, activePeer?.id]);

//   useEffect(() => {
//     setFriends([
//       { id: 2, name: "Rahim", avatar: "/user1.png", online: true },
//       { id: 3, name: "Karim", avatar: "/user2.png", online: false },
//       { id: 4, name: "Jannat", avatar: "/user3.png", online: true },
//     ]);
//   }, []);

//   useEffect(() => {
//     if (messagesRef.current) {
//       messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
//     }

//     // seen mark
//     if (activePeer && socket) {
//       messages.forEach((m) => {
//         if (m.receiverId === me.id && !m.seen) {
//           socket.emit("mark_seen", m.id);
//         }
//       });
//     }
//   }, [messages, activePeer, me.id]);

//   const send = () => {
//     if ((!text.trim() && !file) || !activePeer || !socket) return;

//     const msg: any = {
//       id: Date.now(),
//       senderId: me.id,
//       receiverId: activePeer.id,
//       content: text,
//       file: file ? URL.createObjectURL(file) : null,
//       seen: false,
//     };

//     socket.emit("send_message", msg);
//     socket.emit("stop_typing", me.id);
//     setMessages((prev) => [...prev, msg]);
//     setText("");
//     setFile(null);
//     setShowEmoji(false);
//   };

//   const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setText(e.target.value);
//     if (!socket) return;

//     socket.emit("typing", me);

//     if (typingTimeout.current) {
//       clearTimeout(typingTimeout.current);
//     }

//     typingTimeout.current = setTimeout(() => {
//       socket?.emit("stop_typing", me.id);
//     }, 2000);
//   };

//   const getLastMessage = (fid: number) => {
//     const last = messages
//       .filter((m) => m.senderId === fid || m.receiverId === fid)
//       .slice(-1)[0];
//     return last
//       ? last.content.slice(0, 20) +
//           (last.content.length > 20 ? "..." : "")
//       : "No messages yet";
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 z-30 w-72 bg-white dark:bg-gray-800 border-r transform transition-transform duration-300 ease-in-out 
//         lg:static lg:translate-x-0 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex justify-between items-center p-4 border-b">
//           <h3 className="font-bold text-lg">Chats</h3>
//           <button
//             className="lg:hidden p-2"
//             onClick={() => setSidebarOpen(false)}
//           >
//             <X />
//           </button>
//         </div>

//         <div className="p-3">
//           <input
//             type="text"
//             placeholder="Search Messenger..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full p-2 rounded-lg border bg-gray-100 dark:bg-gray-700 dark:text-white"
//           />
//         </div>

//         <div className="p-2 space-y-2 overflow-y-auto h-[calc(100vh-150px)]">
//           {friends
//             .filter((f) =>
//               f.name.toLowerCase().includes(search.toLowerCase())
//             )
//             .map((f) => (
//               <div
//                 key={f.id}
//                 onClick={() => {
//                   setActivePeer(f);
//                   setSidebarOpen(false);
//                 }}
//                 className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
//                   activePeer?.id === f.id
//                     ? "bg-gray-200 dark:bg-gray-700"
//                     : ""
//                 }`}
//               >
//                 <div className="relative">
//                   <Image
//                     src={f.avatar}
//                     alt={f.name}
//                     width={40}
//                     height={40}
//                     className="rounded-full border"
//                   />
//                   {f.online && (
//                     <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
//                   )}
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex justify-between">
//                     <span className="font-medium">{f.name}</span>
//                   </div>
//                   <span className="text-sm text-gray-500 dark:text-gray-400">
//                     {getLastMessage(f.id)}
//                   </span>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>

//       {/* Chat Section */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800">
//           <div className="flex items-center gap-2">
//             <button
//               className="lg:hidden p-2"
//               onClick={() => setSidebarOpen(true)}
//             >
//               <Menu />
//             </button>
//             {activePeer && (
//               <div className="flex items-center gap-2">
//                 <Image
//                   src={activePeer.avatar}
//                   alt={activePeer.name}
//                   width={40}
//                   height={40}
//                   className="rounded-full border"
//                 />
//                 <div>
//                   <h2 className="text-lg font-semibold">{activePeer.name}</h2>
//                   <p className="text-sm text-gray-500">
//                     {activePeer.online ? "Active now" : "Offline"}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Messages */}
//         <div
//           className="flex-1 overflow-y-auto p-4 space-y-2"
//           ref={messagesRef}
//         >
//           {messages.map((m) => (
//             <div
//               key={m.id}
//               className={`flex flex-col ${
//                 m.senderId === me.id ? "items-end" : "items-start"
//               }`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-2xl max-w-[70%] ${
//                   m.senderId === me.id
//                     ? "bg-blue-500 text-white rounded-br-none"
//                     : "bg-gray-300 dark:bg-gray-700 dark:text-white rounded-bl-none"
//                 }`}
//               >
//                 {m.content && <p>{m.content}</p>}
//                 {m.file && (
//                   <Image
//                     src={m.file}
//                     alt="attachment"
//                     width={200}
//                     height={200}
//                     className="mt-2 rounded-lg"
//                   />
//                 )}
//               </div>
//               {/* Seen indicator */}
//               {m.senderId === me.id && (
//                 <span className="text-xs text-gray-400 mt-1 flex items-center gap-1">
//                   {m.seen ? (
//                     <>
//                       Seen <Check className="w-3 h-3 text-blue-500" />
//                     </>
//                   ) : (
//                     "Sent"
//                   )}
//                 </span>
//               )}
//             </div>
//           ))}

//           {/* Typing Indicator */}
//           {typingUser && activePeer?.id === typingUser.id && (
//             <div className="flex justify-start">
//               <div className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-2xl text-gray-600 dark:text-gray-300">
//                 <span className="animate-pulse">... typing</span>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Input */}
//         {activePeer && (
//           <div className="p-4 border-t bg-white dark:bg-gray-800 flex items-center gap-2 relative">
//             <button
//               onClick={() => setShowEmoji(!showEmoji)}
//               className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
//             >
//               <Smile />
//             </button>

//             {/* {showEmoji && (
//               <div className="absolute bottom-16 left-4 z-50">
//                 <Picker
//                   data={data}
//                   onEmojiSelect={(e: any) =>
//                     setText((prev) => prev + e.native)
//                   }
//                   theme="dark"
//                 />
//               </div>
//             )} */}

//             <input
//               type="file"
//               onChange={(e) =>
//                 setFile(e.target.files ? e.target.files[0] : null)
//               }
//               className="hidden"
//               id="fileUpload"
//             />
//             <label
//               htmlFor="fileUpload"
//               className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
//             >
//               <Paperclip />
//             </label>

//             <input
//               value={text}
//               onChange={handleTyping}
//               onKeyDown={(e) => e.key === "Enter" && send()}
//               placeholder="Type a message..."
//               className="flex-1 p-2 rounded-full border dark:border-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none"
//             />

//             <button
//               onClick={send}
//               className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
//             >
//               <Send />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }









// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import io from "socket.io-client";
// import { Send, Smile, Menu, X, Paperclip, Check } from "lucide-react";
// import Image from "next/image";
// import data from "@emoji-mart/data";
// import Picker from "@emoji-mart/react";

// const socket = io("http://localhost:5000", { autoConnect: false });

// export default function Messenger() {
//   const [me] = useState({ id: 1, name: "Lija", avatar: "/me.png" });
//   const [friends, setFriends] = useState<any[]>([]);
//   const [activePeer, setActivePeer] = useState<any | null>(null);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [text, setText] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const [showEmoji, setShowEmoji] = useState(false);
//   const [file, setFile] = useState<File | null>(null);
//   const [typingUser, setTypingUser] = useState<any | null>(null);

//   const messagesRef = useRef<HTMLDivElement | null>(null);
//   let typingTimeout: NodeJS.Timeout;

//   useEffect(() => {
//     socket.connect();
//     socket.emit("identify", String(me.id));

//     socket.on("receive_message", (msg: any) => {
//       if (
//         (msg.senderId === activePeer?.id && msg.receiverId === me.id) ||
//         (msg.senderId === me.id && msg.receiverId === activePeer?.id)
//       ) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     });

//     socket.on("message_seen", (msgId: number) => {
//       setMessages((prev) =>
//         prev.map((m) => (m.id === msgId ? { ...m, seen: true } : m))
//       );
//     });

//     socket.on("typing", (user: any) => setTypingUser(user));
//     socket.on("stop_typing", (userId: number) => {
//       if (typingUser?.id === userId) setTypingUser(null);
//     });

//     return () => socket.disconnect();
//   }, [me, activePeer, typingUser]);

//   useEffect(() => {
//     setFriends([
//       { id: 2, name: "Rahim", avatar: "/user1.png", online: true },
//       { id: 3, name: "Karim", avatar: "/user2.png", online: false },
//       { id: 4, name: "Jannat", avatar: "/user3.png", online: true },
//     ]);
//   }, []);

//   useEffect(() => {
//     if (messagesRef.current) {
//       messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
//     }
//     // যখন আমি ওপেন করি তখন unread মেসেজগুলো seen করে দেই
//     if (activePeer) {
//       messages.forEach((m) => {
//         if (m.receiverId === me.id && !m.seen) {
//           socket.emit("mark_seen", m.id);
//         }
//       });
//     }
//   }, [messages, activePeer]);

//   const send = () => {
//     if ((!text.trim() && !file) || !activePeer) return;

//     const msg: any = {
//       id: Date.now(),
//       senderId: me.id,
//       receiverId: activePeer.id,
//       content: text,
//       file: file ? URL.createObjectURL(file) : null,
//       seen: false,
//     };

//     socket.emit("send_message", msg);
//     socket.emit("stop_typing", me.id);
//     setMessages((prev) => [...prev, msg]);
//     setText("");
//     setFile(null);
//     setShowEmoji(false);
//   };

//   const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setText(e.target.value);
//     socket.emit("typing", me);

//     clearTimeout(typingTimeout);
//     typingTimeout = setTimeout(() => {
//       socket.emit("stop_typing", me.id);
//     }, 2000);
//   };

//   const getLastMessage = (fid: number) => {
//     const last = messages
//       .filter((m) => m.senderId === fid || m.receiverId === fid)
//       .slice(-1)[0];
//     return last
//       ? last.content.slice(0, 20) +
//           (last.content.length > 20 ? "..." : "")
//       : "No messages yet";
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 z-30 w-72 bg-white dark:bg-gray-800 border-r transform transition-transform duration-300 ease-in-out 
//         lg:static lg:translate-x-0 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex justify-between items-center p-4 border-b">
//           <h3 className="font-bold text-lg">Chats</h3>
//           <button
//             className="lg:hidden p-2"
//             onClick={() => setSidebarOpen(false)}
//           >
//             <X />
//           </button>
//         </div>

//         <div className="p-3">
//           <input
//             type="text"
//             placeholder="Search Messenger..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full p-2 rounded-lg border bg-gray-100 dark:bg-gray-700 dark:text-white"
//           />
//         </div>

//         <div className="p-2 space-y-2 overflow-y-auto h-[calc(100vh-150px)]">
//           {friends
//             .filter((f) =>
//               f.name.toLowerCase().includes(search.toLowerCase())
//             )
//             .map((f) => (
//               <div
//                 key={f.id}
//                 onClick={() => {
//                   setActivePeer(f);
//                   setSidebarOpen(false);
//                 }}
//                 className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
//                   activePeer?.id === f.id
//                     ? "bg-gray-200 dark:bg-gray-700"
//                     : ""
//                 }`}
//               >
//                 <div className="relative">
//                   <Image
//                     src={f.avatar}
//                     alt={f.name}
//                     width={40}
//                     height={40}
//                     className="rounded-full border"
//                   />
//                   {f.online && (
//                     <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
//                   )}
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex justify-between">
//                     <span className="font-medium">{f.name}</span>
//                   </div>
//                   <span className="text-sm text-gray-500 dark:text-gray-400">
//                     {getLastMessage(f.id)}
//                   </span>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>

//       {/* Chat Section */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800">
//           <div className="flex items-center gap-2">
//             <button
//               className="lg:hidden p-2"
//               onClick={() => setSidebarOpen(true)}
//             >
//               <Menu />
//             </button>
//             {activePeer && (
//               <div className="flex items-center gap-2">
//                 <Image
//                   src={activePeer.avatar}
//                   alt={activePeer.name}
//                   width={40}
//                   height={40}
//                   className="rounded-full border"
//                 />
//                 <div>
//                   <h2 className="text-lg font-semibold">{activePeer.name}</h2>
//                   <p className="text-sm text-gray-500">
//                     {activePeer.online ? "Active now" : "Offline"}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Messages */}
//         <div
//           className="flex-1 overflow-y-auto p-4 space-y-2"
//           ref={messagesRef}
//         >
//           {messages.map((m) => (
//             <div
//               key={m.id}
//               className={`flex flex-col ${
//                 m.senderId === me.id ? "items-end" : "items-start"
//               }`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-2xl max-w-[70%] ${
//                   m.senderId === me.id
//                     ? "bg-blue-500 text-white rounded-br-none"
//                     : "bg-gray-300 dark:bg-gray-700 dark:text-white rounded-bl-none"
//                 }`}
//               >
//                 {m.content && <p>{m.content}</p>}
//                 {m.file && (
//                   <Image
//                     src={m.file}
//                     alt="attachment"
//                     width={200}
//                     height={200}
//                     className="mt-2 rounded-lg"
//                   />
//                 )}
//               </div>
//               {/* Seen indicator */}
//               {m.senderId === me.id && (
//                 <span className="text-xs text-gray-400 mt-1 flex items-center gap-1">
//                   {m.seen ? (
//                     <>
//                       Seen <Check className="w-3 h-3 text-blue-500" />
//                     </>
//                   ) : (
//                     "Sent"
//                   )}
//                 </span>
//               )}
//             </div>
//           ))}

//           {/* Typing Indicator */}
//           {typingUser && activePeer?.id === typingUser.id && (
//             <div className="flex justify-start">
//               <div className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-2xl text-gray-600 dark:text-gray-300">
//                 <span className="animate-pulse">... typing</span>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Input */}
//         {activePeer && (
//           <div className="p-4 border-t bg-white dark:bg-gray-800 flex items-center gap-2 relative">
//             <button
//               onClick={() => setShowEmoji(!showEmoji)}
//               className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
//             >
//               <Smile />
//             </button>

//             {showEmoji && (
//               <div className="absolute bottom-16 left-4 z-50">
//                 <Picker
//                   data={data}
//                   onEmojiSelect={(e: any) =>
//                     setText((prev) => prev + e.native)
//                   }
//                   theme="dark"
//                 />
//               </div>
//             )}

//             <input
//               type="file"
//               onChange={(e) =>
//                 setFile(e.target.files ? e.target.files[0] : null)
//               }
//               className="hidden"
//               id="fileUpload"
//             />
//             <label
//               htmlFor="fileUpload"
//               className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
//             >
//               <Paperclip />
//             </label>

//             <input
//               value={text}
//               onChange={handleTyping}
//               onKeyDown={(e) => e.key === "Enter" && send()}
//               placeholder="Type a message..."
//               className="flex-1 p-2 rounded-full border dark:border-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none"
//             />

//             <button
//               onClick={send}
//               className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
//             >
//               <Send />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import io from "socket.io-client";
// import { Send, Smile, Menu, X, Paperclip } from "lucide-react";
// import Image from "next/image";
// import data from "@emoji-mart/data";
// import Picker from "@emoji-mart/react";



// const socket = io("http://localhost:5000", { autoConnect: false });

// export default function Messenger() {
//   const [me] = useState({ id: 1, name: "Lija", avatar: "/me.png" });
//   const [friends, setFriends] = useState<any[]>([]);
//   const [activePeer, setActivePeer] = useState<any | null>(null);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [text, setText] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const [showEmoji, setShowEmoji] = useState(false);
//   const [file, setFile] = useState<File | null>(null);
//   const [typingUser, setTypingUser] = useState<any | null>(null);

//   const messagesRef = useRef<HTMLDivElement | null>(null);
//   let typingTimeout: NodeJS.Timeout;

//   useEffect(() => {
//     socket.connect();
//     socket.emit("identify", String(me.id));

//     socket.on("receive_message", (msg: any) => {
//       if (
//         (msg.senderId === activePeer?.id && msg.receiverId === me.id) ||
//         (msg.senderId === me.id && msg.receiverId === activePeer?.id)
//       ) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     });

//     socket.on("typing", (user: any) => {
//       setTypingUser(user);
//     });

//     socket.on("stop_typing", (userId: number) => {
//       if (typingUser?.id === userId) {
//         setTypingUser(null);
//       }
//     });

//     return () => socket.disconnect();
//   }, [me, activePeer, typingUser]);

//   useEffect(() => {
//     setFriends([
//       { id: 2, name: "Rahim", avatar: "/user1.png", online: true },
//       { id: 3, name: "Karim", avatar: "/user2.png", online: false },
//       { id: 4, name: "Jannat", avatar: "/user3.png", online: true },
//     ]);
//   }, []);

//   useEffect(() => {
//     if (messagesRef.current) {
//       messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const send = () => {
//     if ((!text.trim() && !file) || !activePeer) return;

//     const msg: any = {
//       id: Date.now(),
//       senderId: me.id,
//       receiverId: activePeer.id,
//       content: text,
//       file: file ? URL.createObjectURL(file) : null,
//     };

//     socket.emit("send_message", msg);
//     socket.emit("stop_typing", me.id);
//     setMessages((prev) => [...prev, msg]);
//     setText("");
//     setFile(null);
//     setShowEmoji(false);
//   };

//   const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setText(e.target.value);
//     socket.emit("typing", me);

//     clearTimeout(typingTimeout);
//     typingTimeout = setTimeout(() => {
//       socket.emit("stop_typing", me.id);
//     }, 2000);
//   };

//   const getLastMessage = (fid: number) => {
//     const last = messages
//       .filter((m) => m.senderId === fid || m.receiverId === fid)
//       .slice(-1)[0];
//     return last
//       ? last.content.slice(0, 20) +
//           (last.content.length > 20 ? "..." : "")
//       : "No messages yet";
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 z-30 w-72 bg-white dark:bg-gray-800 border-r transform transition-transform duration-300 ease-in-out 
//         lg:static lg:translate-x-0 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex justify-between items-center p-4 border-b">
//           <h3 className="font-bold text-lg">Chats</h3>
//           <button
//             className="lg:hidden p-2"
//             onClick={() => setSidebarOpen(false)}
//           >
//             <X />
//           </button>
//         </div>

//         <div className="p-3">
//           <input
//             type="text"
//             placeholder="Search Messenger..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full p-2 rounded-lg border bg-gray-100 dark:bg-gray-700 dark:text-white"
//           />
//         </div>

//         <div className="p-2 space-y-2 overflow-y-auto h-[calc(100vh-150px)]">
//           {friends
//             .filter((f) =>
//               f.name.toLowerCase().includes(search.toLowerCase())
//             )
//             .map((f) => (
//               <div
//                 key={f.id}
//                 onClick={() => {
//                   setActivePeer(f);
//                   setSidebarOpen(false);
//                 }}
//                 className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
//                   activePeer?.id === f.id
//                     ? "bg-gray-200 dark:bg-gray-700"
//                     : ""
//                 }`}
//               >
//                 <div className="relative">
//                   <Image
//                     src={f.avatar}
//                     alt={f.name}
//                     width={40}
//                     height={40}
//                     className="rounded-full border"
//                   />
//                   {f.online && (
//                     <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
//                   )}
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex justify-between">
//                     <span className="font-medium">{f.name}</span>
//                   </div>
//                   <span className="text-sm text-gray-500 dark:text-gray-400">
//                     {getLastMessage(f.id)}
//                   </span>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>

//       {/* Chat Section */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800">
//           <div className="flex items-center gap-2">
//             <button
//               className="lg:hidden p-2"
//               onClick={() => setSidebarOpen(true)}
//             >
//               <Menu />
//             </button>
//             {activePeer && (
//               <div className="flex items-center gap-2">
//                 <Image
//                   src={activePeer.avatar}
//                   alt={activePeer.name}
//                   width={40}
//                   height={40}
//                   className="rounded-full border"
//                 />
//                 <div>
//                   <h2 className="text-lg font-semibold">{activePeer.name}</h2>
//                   <p className="text-sm text-gray-500">
//                     {activePeer.online ? "Active now" : "Offline"}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Messages */}
//         <div
//           className="flex-1 overflow-y-auto p-4 space-y-2"
//           ref={messagesRef}
//         >
//           {messages.map((m) => (
//             <div
//               key={m.id}
//               className={`flex ${
//                 m.senderId === me.id ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-2xl max-w-[70%] ${
//                   m.senderId === me.id
//                     ? "bg-blue-500 text-white rounded-br-none"
//                     : "bg-gray-300 dark:bg-gray-700 dark:text-white rounded-bl-none"
//                 }`}
//               >
//                 {m.content && <p>{m.content}</p>}
//                 {m.file && (
//                   <Image
//                     src={m.file}
//                     alt="attachment"
//                     width={200}
//                     height={200}
//                     className="mt-2 rounded-lg"
//                   />
//                 )}
//               </div>
//             </div>
//           ))}

//           {/* Typing Indicator */}
//           {typingUser && activePeer?.id === typingUser.id && (
//             <div className="flex justify-start">
//               <div className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-2xl text-gray-600 dark:text-gray-300">
//                 <span className="animate-pulse">... typing</span>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Input */}
//         {activePeer && (
//           <div className="p-4 border-t bg-white dark:bg-gray-800 flex items-center gap-2 relative">
//             <button
//               onClick={() => setShowEmoji(!showEmoji)}
//               className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
//             >
//               <Smile />
//             </button>

//             {showEmoji && (
//               <div className="absolute bottom-16 left-4 z-50">
//                 <Picker
//                   data={data}
//                   onEmojiSelect={(e: any) =>
//                     setText((prev) => prev + e.native)
//                   }
//                   theme="dark"
//                 />
//               </div>
//             )}

//             <input
//               type="file"
//               onChange={(e) =>
//                 setFile(e.target.files ? e.target.files[0] : null)
//               }
//               className="hidden"
//               id="fileUpload"
//             />
//             <label
//               htmlFor="fileUpload"
//               className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
//             >
//               <Paperclip />
//             </label>

//             <input
//               value={text}
//               onChange={handleTyping}
//               onKeyDown={(e) => e.key === "Enter" && send()}
//               placeholder="Type a message..."
//               className="flex-1 p-2 rounded-full border dark:border-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none"
//             />

//             <button
//               onClick={send}
//               className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
//             >
//               <Send />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }








// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import io from "socket.io-client";
// import { Send, Smile, Menu, X, Circle } from "lucide-react";
// import Image from "next/image";

// const socket = io("http://localhost:5000", { autoConnect: false });

// export default function Messenger() {
//   const [me] = useState({ id: 1, name: "Lija", avatar: "/me.png" }); // demo user
//   const [friends, setFriends] = useState<any[]>([]);
//   const [activePeer, setActivePeer] = useState<any | null>(null);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [text, setText] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const messagesRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     socket.connect();
//     socket.emit("identify", String(me.id));

//     socket.on("receive_message", (msg: any) => {
//       if (
//         (msg.senderId === activePeer?.id && msg.receiverId === me.id) ||
//         (msg.senderId === me.id && msg.receiverId === activePeer?.id)
//       ) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     });

//     return () => socket.disconnect();
//   }, [me, activePeer]);

//   useEffect(() => {
//     // demo friends
//     setFriends([
//       { id: 2, name: "Rahim", avatar: "/user1.png", online: true },
//       { id: 3, name: "Karim", avatar: "/user2.png", online: false },
//       { id: 4, name: "Jannat", avatar: "/user3.png", online: true },
//     ]);
//   }, []);

//   useEffect(() => {
//     if (messagesRef.current) {
//       messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const send = () => {
//     if (!text.trim() || !activePeer) return;
//     const msg = {
//       id: Date.now(),
//       senderId: me.id,
//       receiverId: activePeer.id,
//       content: text,
//     };
//     socket.emit("send_message", msg);
//     setMessages((prev) => [...prev, msg]);
//     setText("");
//   };

//   // last message preview helper
//   const getLastMessage = (fid: number) => {
//     const last = messages
//       .filter(
//         (m) => m.senderId === fid || m.receiverId === fid
//       )
//       .slice(-1)[0];
//     return last ? last.content.slice(0, 20) + (last.content.length > 20 ? "..." : "") : "No messages yet";
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 z-30 w-72 bg-white dark:bg-gray-800 border-r transform transition-transform duration-300 ease-in-out 
//         lg:static lg:translate-x-0 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center p-4 border-b">
//           <h3 className="font-bold text-lg">Chats</h3>
//           <button
//             className="lg:hidden p-2"
//             onClick={() => setSidebarOpen(false)}
//           >
//             <X />
//           </button>
//         </div>

//         {/* Search */}
//         <div className="p-3">
//           <input
//             type="text"
//             placeholder="Search Messenger..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full p-2 rounded-lg border bg-gray-100 dark:bg-gray-700 dark:text-white"
//           />
//         </div>

//         {/* Friends List */}
//         <div className="p-2 space-y-2 overflow-y-auto h-[calc(100vh-150px)]">
//           {friends
//             .filter((f) =>
//               f.name.toLowerCase().includes(search.toLowerCase())
//             )
//             .map((f) => (
//               <div
//                 key={f.id}
//                 onClick={() => {
//                   setActivePeer(f);
//                   setSidebarOpen(false);
//                 }}
//                 className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
//                   activePeer?.id === f.id
//                     ? "bg-gray-200 dark:bg-gray-700"
//                     : ""
//                 }`}
//               >
//                 {/* Avatar */}
//                 <div className="relative">
//                   <Image
//                     src={f.avatar}
//                     alt={f.name}
//                     width={40}
//                     height={40}
//                     className="rounded-full border"
//                   />
//                   {f.online && (
//                     <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
//                   )}
//                 </div>

//                 {/* Info */}
//                 <div className="flex-1">
//                   <div className="flex justify-between">
//                     <span className="font-medium">{f.name}</span>
//                   </div>
//                   <span className="text-sm text-gray-500 dark:text-gray-400">
//                     {getLastMessage(f.id)}
//                   </span>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>

//       {/* Chat Section */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800">
//           <div className="flex items-center gap-2">
//             <button
//               className="lg:hidden p-2"
//               onClick={() => setSidebarOpen(true)}
//             >
//               <Menu />
//             </button>
//             {activePeer && (
//               <div className="flex items-center gap-2">
//                 <Image
//                   src={activePeer.avatar}
//                   alt={activePeer.name}
//                   width={40}
//                   height={40}
//                   className="rounded-full border"
//                 />
//                 <div>
//                   <h2 className="text-lg font-semibold">{activePeer.name}</h2>
//                   <p className="text-sm text-gray-500">
//                     {activePeer.online ? "Active now" : "Offline"}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Messages */}
//         <div
//           className="flex-1 overflow-y-auto p-4 space-y-2"
//           ref={messagesRef}
//         >
//           {messages.map((m) => (
//             <div
//               key={m.id}
//               className={`flex ${
//                 m.senderId === me.id ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-2xl max-w-[70%] ${
//                   m.senderId === me.id
//                     ? "bg-blue-500 text-white rounded-br-none"
//                     : "bg-gray-300 dark:bg-gray-700 dark:text-white rounded-bl-none"
//                 }`}
//               >
//                 {m.content}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Input */}
//         {activePeer && (
//           <div className="p-4 border-t bg-white dark:bg-gray-800 flex items-center gap-2">
//             <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
//               <Smile />
//             </button>
//             <input
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && send()}
//               placeholder="Type a message..."
//               className="flex-1 p-2 rounded-full border dark:border-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none"
//             />
//             <button
//               onClick={send}
//               className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
//             >
//               <Send />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }










// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import io from "socket.io-client";
// import { Send, Smile, Menu, X, Circle } from "lucide-react";

// const socket = io("http://localhost:5000", { autoConnect: false });

// export default function Messenger() {
//   const [me] = useState({ id: 1, name: "Lija" }); // demo user
//   const [friends, setFriends] = useState<any[]>([]);
//   const [activePeer, setActivePeer] = useState<any | null>(null);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [text, setText] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const messagesRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     socket.connect();
//     socket.emit("identify", String(me.id));

//     socket.on("receive_message", (msg: any) => {
//       if (
//         (msg.senderId === activePeer?.id && msg.receiverId === me.id) ||
//         (msg.senderId === me.id && msg.receiverId === activePeer?.id)
//       ) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     });

//     return () => socket.disconnect();
//   }, [me, activePeer]);

//   useEffect(() => {
//     // demo friends
//     setFriends([
//       { id: 2, name: "Rahim", online: true },
//       { id: 3, name: "Karim", online: false },
//       { id: 4, name: "Jannat", online: true },
//     ]);
//   }, []);

//   useEffect(() => {
//     // auto scroll bottom
//     if (messagesRef.current) {
//       messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const send = () => {
//     if (!text.trim() || !activePeer) return;
//     const msg = {
//       id: Date.now(),
//       senderId: me.id,
//       receiverId: activePeer.id,
//       content: text,
//     };
//     socket.emit("send_message", msg);
//     setMessages((prev) => [...prev, msg]);
//     setText("");
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 border-r transform transition-transform duration-300 ease-in-out 
//         lg:static lg:translate-x-0 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center p-4 border-b">
//           <h3 className="font-bold text-lg">Friends</h3>
//           <button
//             className="lg:hidden p-2"
//             onClick={() => setSidebarOpen(false)}
//           >
//             <X />
//           </button>
//         </div>

//         {/* Search */}
//         <div className="p-3">
//           <input
//             type="text"
//             placeholder="Search friends..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full p-2 rounded-lg border bg-gray-100 dark:bg-gray-700 dark:text-white"
//           />
//         </div>

//         {/* Friends List */}
//         <div className="p-2 space-y-2 overflow-y-auto h-[calc(100vh-150px)]">
//           {friends
//             .filter((f) =>
//               f.name.toLowerCase().includes(search.toLowerCase())
//             )
//             .map((f) => (
//               <div
//                 key={f.id}
//                 onClick={() => {
//                   setActivePeer(f);
//                   setSidebarOpen(false);
//                 }}
//                 className={`flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
//                   activePeer?.id === f.id
//                     ? "bg-gray-200 dark:bg-gray-700"
//                     : ""
//                 }`}
//               >
//                 <span>{f.name}</span>
//                 {f.online ? (
//                   <Circle size={10} className="text-green-500" />
//                 ) : (
//                   <Circle size={10} className="text-gray-400" />
//                 )}
//               </div>
//             ))}
//         </div>
//       </div>

//       {/* Chat Section */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800">
//           <div className="flex items-center gap-2">
//             <button
//               className="lg:hidden p-2"
//               onClick={() => setSidebarOpen(true)}
//             >
//               <Menu />
//             </button>
//             <h2 className="text-lg font-semibold">
//               {activePeer ? `Chat with ${activePeer.name}` : "Select a friend"}
//             </h2>
//           </div>
//         </div>

//         {/* Messages */}
//         <div
//           className="flex-1 overflow-y-auto p-4 space-y-2"
//           ref={messagesRef}
//         >
//           {messages.map((m) => (
//             <div
//               key={m.id}
//               className={`flex ${
//                 m.senderId === me.id ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-2xl max-w-[70%] ${
//                   m.senderId === me.id
//                     ? "bg-blue-500 text-white rounded-br-none"
//                     : "bg-gray-300 dark:bg-gray-700 dark:text-white rounded-bl-none"
//                 }`}
//               >
//                 {m.content}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Input */}
//         {activePeer && (
//           <div className="p-4 border-t bg-white dark:bg-gray-800 flex items-center gap-2">
//             <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
//               <Smile />
//             </button>
//             <input
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && send()}
//               placeholder="Type a message..."
//               className="flex-1 p-2 rounded-full border dark:border-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none"
//             />
//             <button
//               onClick={send}
//               className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
//             >
//               <Send />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }










// "use client";
// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";
// import axios from "axios";
// import { Send, Smile, Menu, X } from "lucide-react";

// const socket = io("http://localhost:5000", { autoConnect: false });
// const API_URL = "http://localhost:8000"; // তোমার PHP API base

// export default function Messenger() {
//   const [me] = useState({ id: 1, name: "Lija" }); // demo user
//   const [friends, setFriends] = useState<any[]>([]);
//   const [activePeer, setActivePeer] = useState<any | null>(null);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [text, setText] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     socket.connect();
//     socket.emit("identify", String(me.id));
//     socket.on("receive_message", (msg: any) => {
//       if (
//         (msg.senderId === activePeer?.id && msg.receiverId === me.id) ||
//         (msg.senderId === me.id && msg.receiverId === activePeer?.id)
//       ) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     });
//     return () => socket.disconnect();
//   }, [me, activePeer]);

//   useEffect(() => {
//     setFriends([
//       { id: 2, name: "Rahim" },
//       { id: 3, name: "Karim" },
//       { id: 4, name: "Jannat" },
//     ]);
//   }, []);

//   const send = () => {
//     if (!text.trim() || !activePeer) return;
//     const msg = {
//       id: Date.now(),
//       senderId: me.id,
//       receiverId: activePeer.id,
//       content: text,
//     };
//     socket.emit("send_message", msg);
//     setMessages((prev) => [...prev, msg]);
//     setText("");
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
//       {/* Sidebar (responsive) */}
//       <div
//         className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 border-r transform transition-transform duration-300 ease-in-out 
//         lg:static lg:translate-x-0 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex justify-between items-center p-4 border-b">
//           <h3 className="font-bold text-lg">Friends</h3>
//           <button
//             className="lg:hidden p-2"
//             onClick={() => setSidebarOpen(false)}
//           >
//             <X />
//           </button>
//         </div>
//         <div className="p-4 space-y-2">
//           {friends.map((f) => (
//             <div
//               key={f.id}
//               onClick={() => {
//                 setActivePeer(f);
//                 setSidebarOpen(false);
//               }}
//               className={`p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
//                 activePeer?.id === f.id ? "bg-gray-200 dark:bg-gray-700" : ""
//               }`}
//             >
//               {f.name}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat Section */}
//       <div className="flex-1 flex flex-col">
//         <div className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800">
//           <div className="flex items-center gap-2">
//             <button
//               className="lg:hidden p-2"
//               onClick={() => setSidebarOpen(true)}
//             >
//               <Menu />
//             </button>
//             <h2 className="text-lg font-semibold">
//               {activePeer ? `Chat with ${activePeer.name}` : "Select a friend"}
//             </h2>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 space-y-2">
//           {messages.map((m) => (
//             <div
//               key={m.id}
//               className={`flex ${
//                 m.senderId === me.id ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-2xl max-w-[70%] ${
//                   m.senderId === me.id
//                     ? "bg-blue-500 text-white rounded-br-none"
//                     : "bg-gray-300 dark:bg-gray-700 dark:text-white rounded-bl-none"
//                 }`}
//               >
//                 {m.content}
//               </div>
//             </div>
//           ))}
//         </div>

//         {activePeer && (
//           <div className="p-4 border-t bg-white dark:bg-gray-800 flex items-center gap-2">
//             <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
//               <Smile />
//             </button>
//             <input
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && send()}
//               placeholder="Type a message..."
//               className="flex-1 p-2 rounded-full border dark:border-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none"
//             />
//             <button
//               onClick={send}
//               className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
//             >
//               <Send />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }







// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import io from "socket.io-client";
// import axios from "axios";
// import Cookies from "js-cookie"; 
// import { Send, Smile, Check } from "lucide-react";

// const SOCKET_URL = "http://localhost:5000";
// const API_URL = "http://localhost:8000"; // PHP API base

// const socket = io(SOCKET_URL, { autoConnect: false });

// export default function Messenger({ me }: { me: any }) {
//   const [friends, setFriends] = useState<any[]>([]);
//   const [activePeer, setActivePeer] = useState<any | null>(null);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [text, setText] = useState("");
//   const messagesRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (!me) return;
//     socket.connect();
//     socket.emit("identify", String(me.id));
//     socket.on("receive_message", (msg: any) => {
//       // if current conversation matches, append
//       if ((msg.senderId === activePeer?.id && msg.receiverId === me.id) || (msg.senderId === me.id && msg.receiverId === activePeer?.id)) {
//         setMessages(prev => [...prev, msg]);
//       } else {
//         // optionally show notification badge
//       }
//     });
//     return () => { socket.disconnect(); };
//   }, [me, activePeer]);

//   useEffect(() => {
//     // load friends — for demo, static or call API
//     setFriends([{id:2,name:'Rahim'},{id:3,name:'Karim'}]);
//   }, []);

//   useEffect(() => {
//     // load messages with activePeer
//     if (!activePeer) return;
//     (async () => {
//       const token = Cookies.get("token");
//       const res = await axios.get(`${API_URL}/api/messages.php?peer_id=${activePeer.id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setMessages(res.data);
//       // join room? not necessary here
//     })();
//   }, [activePeer]);

//   const send = async () => {
//     if (!text.trim() || !activePeer) return;
//     const token = Cookies.get("token");
//     // Save to DB through PHP API
//     const res = await axios.post(`${API_URL}/api/messages.php`, {
//       receiver_id: activePeer.id,
//       content: text
//     }, { headers: { Authorization: `Bearer ${token}` }});
//     const saved = res.data;
//     // Emit via socket for real-time
//     socket.emit("send_message", { senderId: me.id, receiverId: activePeer.id, content: text, id: saved.id });
//     setMessages(prev => [...prev, { ...saved, sender_id: me.id }]);
//     setText("");
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
//       <div className="w-72 bg-white dark:bg-gray-800 p-4 border-r">
//         <h3 className="font-bold mb-3">Friends</h3>
//         <div className="space-y-2">
//           {friends.map(f => (
//             <div key={f.id} onClick={() => setActivePeer(f)} className={`p-2 rounded-lg cursor-pointer ${activePeer?.id===f.id ? 'bg-gray-200 dark:bg-gray-700':''}`}>
//               {f.name}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex-1 flex flex-col">
//         <div className="p-4 border-b bg-white dark:bg-gray-800">
//           <h2 className="text-lg">{activePeer ? `Chat with ${activePeer.name}` : "Select a friend"}</h2>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4" ref={messagesRef}>
//           {messages.map((m: any) => (
//             <div key={m.id} className={`flex ${m.sender_id === me.id ? 'justify-end' : 'justify-start'} mb-2`}>
//               <div className={`px-4 py-2 rounded-2xl max-w-[60%] ${m.sender_id === me.id ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-700 dark:text-white'}`}>
//                 {m.content}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="p-4 border-t bg-white dark:bg-gray-800 flex items-center gap-2">
//           <button className="p-2 rounded-full"><Smile /></button>
//           <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==='Enter' && send()} className="flex-1 p-2 rounded-full border bg-gray-100 dark:bg-gray-700" placeholder="Type a message..." />
//           <button onClick={send} className="p-2 rounded-full bg-blue-500 text-white"><Send /></button>
//         </div>
//       </div>
//     </div>
//   );
// }









// "use client";

// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { motion } from "framer-motion";
// import { Send, Smile, Check, CheckCheck } from "lucide-react";

// const socket = io("http://localhost:5000"); // তোমার backend socket সার্ভার

// export default function Messenger() {
//   const [messages, setMessages] = useState<{id:number, text:string, sender:string}[]>([]);
//   const [input, setInput] = useState("");
//   const [user, setUser] = useState("Lija"); // demo user name

//   useEffect(() => {
//     socket.on("receiveMessage", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });
//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, []);

//   const sendMessage = () => {
//     if (input.trim() === "") return;
//     const msg = { id: Date.now(), text: input, sender: user };
//     socket.emit("sendMessage", msg);
//     setMessages((prev) => [...prev, msg]);
//     setInput("");
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
//       {/* Sidebar */}
//       <div className="w-64 bg-white dark:bg-gray-800 p-4 border-r">
//         <h2 className="text-xl font-bold mb-4">Friends</h2>
//         <div className="space-y-2">
//           <div className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">Rahim</div>
//           <div className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">Karim</div>
//           <div className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">Jannat</div>
//         </div>
//       </div>

//       {/* Chat Section */}
//       <div className="flex-1 flex flex-col">
//         <div className="p-4 border-b bg-white dark:bg-gray-800">
//           <h2 className="text-lg font-semibold">Chat with Rahim</h2>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 space-y-3">
//           {messages.map((msg) => (
//             <motion.div
//               key={msg.id}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className={`flex ${msg.sender === user ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-2xl max-w-xs ${
//                   msg.sender === user
//                     ? "bg-blue-500 text-white rounded-br-none"
//                     : "bg-gray-300 dark:bg-gray-700 dark:text-white rounded-bl-none"
//                 }`}
//               >
//                 {msg.text}
//                 {msg.sender === user && (
//                   <span className="ml-2 text-xs opacity-70 inline-flex">
//                     <CheckCheck size={16} />
//                   </span>
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Input */}
//         <div className="p-4 border-t bg-white dark:bg-gray-800 flex items-center gap-2">
//           <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
//             <Smile />
//           </button>
//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             placeholder="Type a message..."
//             className="flex-1 p-2 rounded-full border dark:border-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none"
//           />
//           <button
//             onClick={sendMessage}
//             className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
//           >
//             <Send />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

