const API_URL = "https://hhcamp-lifepulse.onrender.com";

export async function sendMessage(message) {
  const res = await fetch(`${API_URL}/chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  return res.json();
}

export async function getHistory() {
  const res = await fetch(`${API_URL}/getHistory/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  return res.json();
}


export async function setPartage(nId, partage) {
  const res = await fetch(`${API_URL}/setPartage/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nId, partage }),
  });

  return res.json();
}