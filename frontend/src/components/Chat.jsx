import { useState, useRef, useEffect } from "react";
import { sendMessage } from "../services/api";

export default function Chat() {
  const initialMessages = [
    { role: "user", text: "Salut" },
    { role: "bot", text: "Salut Romane, comment te sens-tu aujourd’hui ?" },
    { role: "user", text: "Ça va moyen… je me sens fatigué et un peu stressé." },
    { role: "bot", text: "Je comprends. As-tu bien dormi cette nuit ? Et as-tu eu faim ou envie de grignoter plus que d’habitude ce matin ?" },
    { role: "user", text: "J’ai mal dormi, et oui, j’ai un peu grignoté dans la matinée." },
    { role: "bot", text: "Merci pour ces informations. As-tu ressenti des douleurs, un essoufflement ou un manque d’énergie au cours de la journée ?" },
    { role: "user", text: "Oui, un peu d’essoufflement en marchant, et je me sens lourd aujourd’hui." },
    { role: "bot", text: "Merci de partager tout cela. Pour mieux suivre ton état de santé, peux-tu me parler maintenant de tous les événements marquants de ta journée, positifs comme négatifs ?" },
  ];

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Affiche les messages pré-enregistrés progressivement
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < initialMessages.length) {
        const nextMessage = initialMessages[index];
        if (nextMessage && nextMessage.role && nextMessage.text) {
          setMessages(prev => [...prev, nextMessage]);
        }
        index++;
      } else {
        clearInterval(interval);
      }
    }, 750); // 0.5 seconde entre chaque message

    return () => clearInterval(interval);
  }, []);

  const handleSend = async () => {
    if (!input) return;

    const userMessage = { role: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    try {
      const res = await sendMessage(input);
      const botMessage = { role: "bot", text: res.response };
      if (botMessage && botMessage.text) {
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: "bot", text: "Merci beaucoup, passes une excellente journée !" }]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((m, i) => (
          m ? (
            <div key={i} className={`message ${m.role}`}>
              {m.text}
            </div>
          ) : null
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