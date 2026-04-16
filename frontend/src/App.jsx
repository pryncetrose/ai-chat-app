import { useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const res = await fetch("http://localhost:5185/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>🤖 AI Chat</h1>
      <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16, minHeight: 300, marginBottom: 16 }}>
        {messages.length === 0 && (
          <p style={{ color: "#aaa" }}>Send a message to start chatting!</p>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.role === "user" ? "right" : "left", margin: "8px 0" }}>
            <span style={{
              background: m.role === "user" ? "#0070f3" : "#eee",
              color: m.role === "user" ? "white" : "black",
              padding: "8px 12px", borderRadius: 16, display: "inline-block", maxWidth: "80%"
            }}>
              {m.text}
            </span>
          </div>
        ))}
        {loading && (
          <div style={{ textAlign: "left", margin: "8px 0", color: "#aaa" }}>
            AI is thinking...
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ccc", fontSize: 16 }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message and press Enter..."
        />
        <button
          onClick={sendMessage}
          style={{ padding: "10px 20px", borderRadius: 8, background: "#0070f3", color: "white", border: "none", fontSize: 16, cursor: "pointer" }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
