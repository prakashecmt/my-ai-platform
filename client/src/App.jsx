import { useState } from "react";
import axios from "axios";
import { FaRobot, FaUserCircle } from "react-icons/fa";

function App() {

  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([]);

  const [loading, setLoading] = useState(false);


  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message
    };

    setChat((prev) => [...prev, userMessage]);

    const currentMessage = message;

    setMessage("");

    setLoading(true);

    try {

      const response = await axios.post(
        "http://localhost:5000/api/chat",
        {
          message: currentMessage
        }
      );

      const aiMessage = {
        sender: "ai",
        text: response.data.reply
      };

      setChat((prev) => [...prev, aiMessage]);

    } catch (error) {

      console.log(error);

    }

    setLoading(false);
  };


  return (

    <div style={styles.app}>


      {/* Sidebar */}

      <div style={styles.sidebar}>

        <h2 style={styles.logo}>
          MyAI
        </h2>

        <button style={styles.newChat}>
          + New Chat
        </button>

      </div>


      {/* Main Chat */}

      <div style={styles.main}>


        {/* Header */}

        <div style={styles.header}>
          AI Assistant
        </div>


        {/* Messages */}

        <div style={styles.chatContainer}>

          {chat.length === 0 && (

            <div style={styles.welcome}>
              <h1>Welcome to MyAI 👋</h1>

              <p>
                Ask anything to start conversation
              </p>
            </div>

          )}


          {chat.map((msg, index) => (

            <div
              key={index}
              style={{
                ...styles.messageRow,

                justifyContent:
                  msg.sender === "user"
                    ? "flex-end"
                    : "flex-start"
              }}
            >

              {msg.sender === "ai" && (
                <FaRobot style={styles.icon} />
              )}

              <div
                style={{
                  ...styles.message,

                  background:
                    msg.sender === "user"
                      ? "#2563eb"
                      : "#1e293b"
                }}
              >
                {msg.text}
              </div>

              {msg.sender === "user" && (
                <FaUserCircle style={styles.icon} />
              )}

            </div>

          ))}


          {loading && (

            <div style={styles.typing}>
              AI is typing...
            </div>

          )}

        </div>


        {/* Input Area */}

        <div style={styles.inputArea}>

          <input
            type="text"
            placeholder="Ask anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}

            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}

            style={styles.input}
          />

          <button
            onClick={sendMessage}
            style={styles.sendButton}
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
}


const styles = {

  app: {
    display: "flex",
    height: "100vh",
    background: "#0f172a",
    color: "white",
    fontFamily: "Arial"
  },

  sidebar: {
    width: "250px",
    background: "#020617",
    padding: "20px",
    borderRight: "1px solid #1e293b"
  },

  logo: {
    marginBottom: "30px",
    color: "#3b82f6"
  },

  newChat: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontSize: "16px"
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },

  header: {
    padding: "20px",
    borderBottom: "1px solid #1e293b",
    fontSize: "20px",
    fontWeight: "bold"
  },

  chatContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },

  welcome: {
    margin: "auto",
    textAlign: "center",
    opacity: 0.8
  },

  messageRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: "10px"
  },

  message: {
    padding: "14px",
    borderRadius: "16px",
    maxWidth: "70%",
    lineHeight: "1.5"
  },

  icon: {
    fontSize: "32px"
  },

  typing: {
    opacity: 0.7,
    fontStyle: "italic"
  },

  inputArea: {
    display: "flex",
    padding: "20px",
    borderTop: "1px solid #1e293b",
    gap: "10px"
  },

  input: {
    flex: 1,
    padding: "15px",
    borderRadius: "14px",
    border: "none",
    outline: "none",
    background: "#1e293b",
    color: "white",
    fontSize: "16px"
  },

  sendButton: {
    padding: "15px 25px",
    borderRadius: "14px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontSize: "16px"
  }
};

export default App;