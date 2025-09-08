# Boleto Service

Serviço responsável por gerar boletos automaticamente para as unidades e integrá-los ao Banco Inter.

Requer Node.js 18 ou superior.

## Executando

```bash
npm install
npm run build
npm start
```

O serviço expõe `GET /boletos` com os boletos gerados.

## Variáveis de ambiente

- `BANCO_INTER_TOKEN`: token para autenticação com o Banco Inter
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`: credenciais para envio de e-mails (opcional)
- `PORT`: porta HTTP (padrão 4000)
