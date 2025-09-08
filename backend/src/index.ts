import express from 'express';
import cron from 'node-cron';
import { gerarBoletosParaCondominio, listarBoletos, adicionarBoleto } from './services/boletoService';
import { enviarComunicado, listarComunicados } from './services/comunicadoService';

const app = express();
app.use(express.json());

app.get('/boletos', (_req, res) => {
  res.json(listarBoletos());
});

app.post('/boletos', (req, res) => {
  try {
    const boleto = adicionarBoleto(req.body);
    res.status(201).json(boleto);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/comunicados', (_req, res) => {
  res.json(listarComunicados());
});

app.post('/comunicados', (req, res) => {
  try {
    const { autorId, ...dados } = req.body;
    const comunicado = enviarComunicado(autorId, dados);
    res.status(201).json(comunicado);
  } catch (err: any) {
    res.status(403).json({ error: err.message });
  }
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
