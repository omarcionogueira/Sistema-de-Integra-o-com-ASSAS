# Gadaiada – Integração com Shopify e Asaas via Node.js

Este projeto foi desenvolvido para facilitar a comunicação entre plataformas de e-commerce e serviços financeiros, utilizando APIs REST e lógica backend em JavaScript. É voltado para desenvolvedores que desejam implementar ou estudar integrações entre sistemas como Shopify e Asaas.

## Funcionalidades

- Integração com Shopify  
  O módulo `shopifyService.js` permite manipular dados de produtos, pedidos e clientes via API.

- Integração com Asaas  
  O módulo `assasService.js` gerencia operações financeiras como cobranças, clientes e notificações.

- Geração de dados de vendedores  
  O script `generateVendorData.js` automatiza a criação de dados simulados para testes e desenvolvimento.

- Serviço de envio de e-mails  
  O `mailService.js` cuida da comunicação por e-mail, útil para notificações automáticas.

- Servidor Express  
  O `server.js` configura o servidor HTTP e define rotas para os serviços disponíveis.

## Dependências

As principais bibliotecas utilizadas estão listadas no `package.json`, incluindo:

- axios – para requisições HTTP
- nodemailer – para envio de e-mails
- express – para criação do servidor e rota
