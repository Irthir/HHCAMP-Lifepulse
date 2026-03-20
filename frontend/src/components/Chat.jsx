import { useState } from "react";
import { sendMessage } from "../services/api";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input) return;

    const userMessage = { role: "user", text: input };

    const res = await sendMessage(input);

    const botMessage = { role: "bot", text: res.response };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div>
      <div>
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.role}:</b> {m.text}
          </p>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Écris un message..."
      />
      <button onClick={handleSend}>Envoyer</button>
    </div>
  );
}