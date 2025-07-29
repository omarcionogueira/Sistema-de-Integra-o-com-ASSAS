// server.js
const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/webhook", async (req, res) => {
  try {
    const { event, customer, subscription } = req.body;

    console.log("📩 Webhook recebido!");

    if (event === "SUBSCRIPTION_PAYMENT_SUCCESS") {
      // Dados para criar o vendedor
      const vendedorPayload = {
        name: customer.name,
        email: customer.email,
        password: "senha123", // ⚠️ Pode gerar senha aleatória ou pedir depois
        phone: "55" + Math.floor(Math.random() * 1000000000), // Simulado
        subscriptionId: subscription.id
      };

      // Envia para Webkul
      const response = await axios.post("https://YOUR-DOMAIN.com/apps/webkul/api/vendor", vendedorPayload, {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "SUA_CHAVE_API_WEBKUL"
        }
      });

      console.log("✅ Vendedor criado com sucesso!", response.data);

      res.status(200).send("Vendedor criado no Webkul com sucesso!");
    } else {
      console.log("📌 Evento ignorado:", event);
      res.status(200).send("Evento recebido, mas ignorado.");
    }

  } catch (error) {
    console.error("❌ Erro ao criar vendedor:", error.message);
    res.status(500).send("Erro interno ao criar vendedor.");
  }
});

app.listen(PORT, () => {
  console.log(`🌐 Servidor rodando na porta ${PORT}`);
});
