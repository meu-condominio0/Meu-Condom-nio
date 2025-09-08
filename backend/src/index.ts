import express from 'express';
import cron from 'node-cron';
import { gerarBoletosParaCondominio, listarBoletos } from './services/boletoService';

const app = express();
app.use(express.json());

app.get('/boletos', (_req, res) => {
  res.json(listarBoletos());
});

// Geração automática todo dia 1 às 08:00
cron.schedule('0 8 1 * *', () => {
  gerarBoletosParaCondominio().catch(err =>
    console.error('Erro na geração automática de boletos', err)
  );
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Boleto service running on port ${port}`);
});
