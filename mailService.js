const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

module.exports = {
  async sendLoginEmail(to, vendor) {
    console.log(`[LOG] Enviando e-mail para ${to}...`);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Seus dados de login',
      text: `Olá! Seu login é ${vendor.email} e senha provisória é ${vendor.password}. Acesse sua área de vendedor e altere suas credenciais.`
    };

    await transporter.sendMail(mailOptions);
    console.log('[LOG] E-mail enviado com sucesso.');
  }
};
