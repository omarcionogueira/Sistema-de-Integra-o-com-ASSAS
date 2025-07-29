const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// 🔒 Token do Webkul
const WEBKUL_TOKEN = 'MjQwN2UyODg3MDEwNmVlMjI5Nzc1NmNkYjdjZTM1N2FkNjk4YzdmMWJmMmRkOWFiNGIyNjA2YmI5ZTA4ZjgzNg';

// 📡 Endpoint do Webkul
const WEBKUL_URL = 'https://mvmapi.webkul.com/api/v2/sellers.json';

app.post('/webhook', async (req, res) => {
  console.log('[LOG] Webhook recebido:', req.body);

  // 🔁 Adapta o payload para o formato aceito pela Webkul
  try {
    const webhookPayload = req.body;

    // 🔎 Verifica se o campo "vendedor" existe
    if (!webhookPayload.vendedor) {
      console.log('[LOG] Evento ignorado: campo "vendedor" ausente');
      return res.status(200).send('Evento ignorado');
    }

    // ✅ Adapta os campos
    const sellerPayload = {
      seller: {
        email: webhookPayload.vendedor['e-mail'],
        name: webhookPayload.vendedor.nome,
        shop: {
          title: webhookPayload.vendedor.loja.title
        }
      }
    };

    console.log('[LOG] Payload adaptado para Webkul:', sellerPayload);

    // 🚀 Envia para a API do Webkul
    const response = await axios.post(WEBKUL_URL, sellerPayload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${WEBKUL_TOKEN}`
      }
    });

    console.log('[LOG] Resposta da API Webkul:', response.data);
    res.status(200).send('Vendedor criado com sucesso');
  } catch (error) {
    console.error('[ERRO] Falha ao enviar para Webkul:', error.response?.data || error.message);
    res.status(500).send('Erro ao criar vendedor');
  }
});

// 🚀 Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`[LOG] Servidor rodando na porta ${PORT}`);
});
