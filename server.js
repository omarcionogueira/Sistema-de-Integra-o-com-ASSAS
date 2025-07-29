// server.js
const express = require("express");
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

    // Simula criação de "vendedor"
    const vendedorId = Math.floor(Math.random() * 100000);
    console.log(`✅ Vendedor criado: #${vendedorId} para ${customer?.name}`);

    // Simula envio de e-mail
    console.log(`📧 Email enviado para ${customer?.email}`);

    res.status(200).send("Tudo certo! Vendedor criado e e-mail enviado.");
  } catch (error) {
    console.error("❌ Erro interno:", error);
    res.status(500).send("Erro interno no servidor.");
  }
});

// Test route (opcional)
app.get("/", (req, res) => {
  res.send("🚀 Servidor rodando!");
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🌐 Servidor rodando na porta ${PORT}`);
});
