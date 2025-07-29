// server.js
const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Webhook endpoint
app.post("/webhook", async (req, res) => {
  try {
    const { event, customer, subscription } = req.body;

    console.log("📩 Webhook recebido!");
    console.log("Evento:", event);
    console.log("Cliente:", customer?.name, "-", customer?.email);
    console.log("Assinatura ID:", subscription?.id, "Status:", subscription?.status);

    // ✅ URL correta (use seu domínio real aqui se for outro)
    const url = "https://gadaiada-m74r.onrender.com/apps/webkul/api/vendor";

    // Simula envio de dados para a API externa
    const response = await axios.post(url, {
      nome: customer?.name,
      email: customer?.email,
      plano: subscription?.id
    }, {
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "sua-chave-secreta-aqui"
      }
    });

    console.log("📤 Requisição enviada com sucesso:", response.status);

    res.status(200).send("Tudo certo! Vendedor criado e e-mail enviado.");
  } catch (error) {
    console.error("❌ Erro interno:", error.message);
    res.status(500).send("Erro interno no servidor.");
  }
});

// Rota de teste
app.get("/", (req, res) => {
  res.send("🚀 Servidor rodando!");
});

app.listen(PORT, () => {
  console.log(`🌐 Servidor rodando na porta ${PORT}`);
});
