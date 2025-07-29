// server.js
const express = require("express");
const axios = require("axios");
const crypto = require("crypto"); // para gerar senha segura
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/webhook", async (req, res) => {
  try {
    const { event, customer, subscription } = req.body;

    console.log("📩 Webhook recebido!");

    // Aceita evento em português ou inglês
    const evento = event?.toUpperCase()?.trim();
    const eventosAceitos = ["SUBSCRIPTION_PAYMENT_SUCCESS", "SUCESSO_PAGAMENTO_DA_ASSINATURA"];

    if (!eventosAceitos.includes(evento)) {
      console.log("📌 Evento não tratado:", evento);
      return res.status(200).send("Evento ignorado.");
    }

    // Dados do vendedor
    const senhaGerada = crypto.randomBytes(8).toString("hex");
    const vendedorPayload = {
      name: customer.name,
      email: customer.email,
      password: senhaGerada,
      phone: "55" + Math.floor(Math.random() * 1000000000).toString(), // simulado
      plano: subscription.id
    };

    // Envio para Webkul
    const response = await axios.post("https://SEU-DOMINIO.com/apps/webkul/api/vendor", vendedorPayload, {
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "SUA_API_KEY_DO_WEBKUL"
      }
    });

    console.log("✅ Vendedor criado no Webkul!", response.data);

    res.status(200).send("Vendedor criado com sucesso no Webkul.");
  } catch (error) {
    console.error("❌ Falha ao criar vendedor:", error.message);
    res.status(500).send("Erro ao criar vendedor.");
  }
});

app.listen(PORT, () => {
  console.log(`🌐 Servidor rodando na porta ${PORT}`);
});
