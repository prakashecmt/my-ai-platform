import { useState, useRef, useEffect } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userText }
    ]);

    setInput("");

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userText })
      });

      const data = await res.json();

      const botReply =
        data?.reply?.trim() ? data.reply : "⚠️ No response from AI";

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: botReply }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "❌ Server error" }
      ]);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          AI Chat Assistant 🤖
        </div>

        {/* CHAT AREA */}
        <div style={styles.chatBox}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent:
                  msg.role === "user"
                    ? "flex-end"
                    : "flex-start"
              }}
            >
              <div
                style={{
                  ...styles.msg,
                  backgroundColor:
                    msg.role === "user"
                      ? "#DCF8C6"
                      : "#FFFFFF",
                  border:
                    msg.role === "bot"
                      ? "1px solid #e6e6e6"
                      : "none",
                  boxShadow:
                    msg.role === "bot"
                      ? "0 2px 6px rgba(0,0,0,0.05)"
                      : "none"
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* anchor for auto scroll */}
          <div ref={chatEndRef} />
        </div>

        {/* INPUT AREA */}
        <div style={styles.inputBar}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            style={styles.input}
            onKeyDown={(e) =>
              e.key === "Enter" && sendMessage()
            }
          />

          <button onClick={sendMessage} style={styles.button}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🎨 CLEAN PROFESSIONAL UI */
const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#e9eef3"
  },

  container: {
    width: "420px",
    height: "85vh",
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
    overflow: "hidden"
  },

  header: {
    padding: "15px",
    textAlign: "center",
    background: "#4CAF50",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px"
  },

  chatBox: {
    flex: 1,
    padding: "15px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    background: "#f7f9fb"
  },

  msg: {
    padding: "12px 14px",
    borderRadius: "16px",
    maxWidth: "75%",
    fontSize: "14px",
    lineHeight: "1.5",
    wordBreak: "break-word",
    whiteSpace: "pre-wrap"
  },

  inputBar: {
    display: "flex",
    padding: "12px",
    borderTop: "1px solid #eee",
    background: "#ffffff"
  },

  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    outline: "none",
    fontSize: "14px"
  },

  button: {
    marginLeft: "10px",
    padding: "10px 18px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};