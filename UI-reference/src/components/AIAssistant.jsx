import { useState, useRef, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { sendChatMessage } from "../services/aiService";

function formatMessage(text) {
  if (!text) return "";
  let f = text.replace(/```([\s\S]*?)```/g, (_, p1) =>
    `<pre style="background:rgba(0,0,0,0.18);border:1px solid rgba(255,255,255,0.1);padding:8px;border-radius:6px;font-size:11px;font-family:monospace;overflow-x:auto;margin:6px 0">${p1.trim()}</pre>`
  );
  f = f.replace(/`([^`\n]+)`/g, '<code style="background:rgba(249,115,22,0.15);color:rgb(249,115,22);padding:1px 5px;border-radius:4px;font-family:monospace;font-size:11px">$1</code>');
  f = f.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  f = f.replace(/^\s*[-*]\s+(.+)$/gm, '<li style="margin-left:1rem;list-style:disc">$1</li>');
  f = f.split("\n").map(line =>
    (line.includes("<li") || line.includes("<pre") || line.includes("</pre>")) ? line : line + "<br />"
  ).join("\n");
  return f;
}

export default function AIAssistant() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{
    id: "greeting",
    sender: "ai",
    text: `Hi ${user?.name?.split(" ")[0] || "there"}! 👋 I'm **OnboardAI**, your agentic onboarding assistant. Ask me about company policies, your training checklist, available courses, or who your mentor is!`,
    createdAt: new Date(),
    toolsUsed: [],
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messageEndRef = useRef(null);
  const chatRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (chatRef.current && !chatRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    // small delay so the open-click itself doesn't immediately close
    const t = setTimeout(() => document.addEventListener("mousedown", handler), 100);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", handler);
    };
  }, [isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsgText = input.trim();
    setInput("");
    const userMessage = { id: Math.random().toString(36).substr(2, 9), sender: "user", text: userMsgText, createdAt: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    try {
      const chatHistory = messages.slice(-6).map(m => ({ sender: m.sender, text: m.text }));
      const res = await sendChatMessage(userMsgText, chatHistory);
      setMessages(prev => [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        sender: "ai",
        text: res.reply || "I didn't receive a response. Please try again.",
        createdAt: new Date(),
        toolsUsed: res.toolsUsed || [],
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        sender: "ai",
        text: `❌ **Error:** ${err.message || "Failed to communicate with AI server."}`,
        createdAt: new Date(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([{
      id: "greeting",
      sender: "ai",
      text: "Welcome back! Ask me anything — policies, training checklist, or available courses.",
      createdAt: new Date(),
      toolsUsed: [],
    }]);
  };

  return (
    <div ref={chatRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* ── Chat Window ──────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="w-[340px] md:w-[390px] h-[500px] rounded-2xl shadow-2xl flex flex-col mb-4 overflow-hidden"
          style={{
            background: "rgb(var(--surface))",
            border: "1px solid rgba(var(--border))",
            boxShadow: "0 24px 64px rgba(0,0,0,0.35), 0 4px 16px rgba(249,115,22,0.1)",
          }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 flex justify-between items-center shrink-0 select-none"
            style={{ background: "linear-gradient(135deg, rgb(249,115,22) 0%, rgb(234,88,12) 100%)" }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg">🤖</div>
              <div>
                <h3 className="font-bold text-sm text-white leading-tight">OnboardAI Assistant</h3>
                <span className="text-[10px] text-orange-100 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse inline-block" />
                  Agent Mode · Active
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleClear}
                title="Clear Chat"
                className="px-2 py-1 hover:bg-white/20 rounded text-[11px] text-white/80 hover:text-white transition"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 hover:bg-white/20 rounded-lg transition text-white font-bold flex items-center justify-center"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3" style={{ background: "rgb(var(--bg))" }}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                {/* Avatar */}
                {msg.sender === "ai" && (
                  <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: "linear-gradient(135deg, rgb(249,115,22), rgb(234,88,12))" }}>
                    AI
                  </div>
                )}
                <div className="flex flex-col gap-1 max-w-[82%]">
                  {/* Bubble */}
                  <div
                    className="rounded-xl px-3 py-2 text-sm leading-relaxed"
                    style={msg.sender === "user"
                      ? { background: "rgb(249,115,22)", color: "#fff", borderTopRightRadius: 4 }
                      : { background: "rgb(var(--surface))", color: "rgb(var(--text-primary))", border: "1px solid rgba(var(--border))", borderTopLeftRadius: 4 }
                    }
                    dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                  />
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex gap-2 items-center">
                <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: "linear-gradient(135deg, rgb(249,115,22), rgb(234,88,12))" }}>
                  AI
                </div>
                <div className="rounded-xl px-3 py-2.5 flex items-center gap-1.5"
                  style={{ background: "rgb(var(--surface))", border: "1px solid rgba(var(--border))" }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: "rgb(249,115,22)", animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 flex gap-2 shrink-0"
            style={{ borderTop: "1px solid rgba(var(--border))", background: "rgb(var(--surface))" }}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask about policies, training, mentor..."
              className="flex-1 px-3 py-2 text-sm rounded-lg outline-none transition-all"
              style={{
                background: "rgb(var(--bg))",
                border: "1px solid rgba(var(--border))",
                color: "rgb(var(--text-primary))",
              }}
              onFocus={e => e.target.style.borderColor = "rgb(249,115,22)"}
              onBlur={e => e.target.style.borderColor = "rgba(var(--border))"}
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-4 py-2 rounded-lg text-white text-xs font-bold transition-all disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, rgb(249,115,22), rgb(234,88,12))" }}
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* ── Floating Toggle Button ────────────────────────────────── */}
      <button
        onClick={() => setIsOpen(o => !o)}
        className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer text-white"
        style={{
          background: "linear-gradient(135deg, rgb(249,115,22) 0%, rgb(234,88,12) 100%)",
          boxShadow: "0 8px 32px rgba(249,115,22,0.45), 0 2px 0 rgba(255,255,255,0.1) inset",
        }}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
}
