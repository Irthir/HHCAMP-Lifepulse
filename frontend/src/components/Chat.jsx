import { useState, useRef, useEffect } from "react";
import { sendMessage } from "../services/api";

export default function Chat() {
  // Historique initial avec la discussion déjà présente
  const initialMessages = [
    { role: "user", text: "Salut" },
    { role: "bot", text: "Salut Roman, comment te sens-tu aujourd’hui ?" },
    { role: "user", text: "Ça va moyen… je me sens fatigué et un peu stressé." },
    { role: "bot", text: "Je comprends. As-tu bien dormi cette nuit ? Et as-tu eu faim ou envie de grignoter plus que d’habitude ce matin ?" },
    { role: "user", text: "J’ai mal dormi, et oui, j’ai un peu grignoté dans la matinée." },
    { role: "bot", text: "Merci pour ces informations. As-tu ressenti des douleurs, un essoufflement ou un manque d’énergie au cours de la journée ?" },
    { role: "user", text: "Oui, un peu d’essoufflement en marchant, et je me sens lourd aujourd’hui." },
    { role: "bot", text: "Merci de partager tout cela. Pour mieux suivre ton état de santé, peux-tu me parler maintenant de tous les événements marquants de ta journée, positifs comme négatifs ?" },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (!input) return;

    const userMessage = { role: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    try {
      const res = await sendMessage(input);
      const botMessage = { role: "bot", text: res.response };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      const errorMsg = { role: "bot", text: "Désolé, je n'ai pas pu répondre pour le moment." };
      setMessages(prev => [...prev, errorMsg]);
    }
  };

  // Scroll vers le bas à chaque nouveau message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.role}`}>
            {m.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          placeholder="Écris un message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Envoyer</button>
      </div>
    </div>
  );
}