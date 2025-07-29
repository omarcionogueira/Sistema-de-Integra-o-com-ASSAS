const axios = require('axios');

module.exports = {
  async createVendor(data) {
    console.log('[LOG] Enviando dados para Webkul...');
    const response = await axios.post(
      `https://${process.env.SHOPIFY_STORE}/apps/webkul/api/vendor`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': process.env.WEBKUL_API_KEY
        }
      }
    );
    return response.data;
  }
};
