const API_URL = "http://localhost:8000";

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

export async function getPatientHistory(message) {
  const res = await fetch(`${API_URL}/getPatientHistory/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  return res.json();
}

export async function getAidantHistory(message) {
  const res = await fetch(`${API_URL}/getPatientHistory/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  return res.json();
}

export async function getProHistory(message) {
  const res = await fetch(`${API_URL}/getPatientHistory/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  return res.json();
}