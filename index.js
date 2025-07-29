require('dotenv').config();
const express = require('express');
const assasService = require('./assasService');
const shopifyService = require('./shopifyService');
const mailService = require('./mailService');
const generateVendorData = require('./generateVendorData');

const app = express();
app.use(express.json());

app.post('/webhook', async (req, res) => {
  console.log('[LOG] Webhook recebido:', req.body);

  if (req.body.event !== 'ASSINATURA_PAGA') return res.status(200).send('Evento ignorado.');

  try {
    const token = req.headers['x-hook-secret'];
    if (process.env.ASSAS_WEBHOOK_SECRET && token !== process.env.ASSAS_WEBHOOK_SECRET) {
      console.warn('[WARN] Token inválido.');
      return res.status(403).send('Token inválido.');
    }

    const vendor = generateVendorData();
    const result = await shopifyService.createVendor(vendor);

    console.log('[LOG] Vendedor criado com sucesso:', result);

    await mailService.sendLoginEmail(req.body.customer.email, vendor);

    res.status(200).send('Tudo certo! Vendedor criado e e-mail enviado.');
  } catch (error) {
    console.error('[ERROR] Ocorreu um erro:', error);
    res.status(500).send('Erro interno.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`[LOG] Servidor rodando na porta ${PORT}`));
