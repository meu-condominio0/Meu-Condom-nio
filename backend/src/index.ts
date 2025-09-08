import express from 'express';
import cron from 'node-cron';
import { gerarBoletosParaCondominio, listarBoletos, adicionarBoleto } from './services/boletoService';
import { enviarComunicado, listarComunicados } from './services/comunicadoService';
import {
  criarEnquete,
  listarEnquetes,
  responderEnquete,
  gerarRelatorio
} from './services/enqueteService';
import {
  listarManutencoes,
  adicionarManutencao,
  atualizarStatus,
  adicionarComentario,
  adicionarFoto,
  verificarManutencoesProximas
} from './services/manutencaoService';
import {
  registrarChegada,
  confirmarRetiradaPorQRCode,
  confirmarRetiradaPorUnidade,
  listarHistorico,
  listarPendentes,
  listarHistoricoPorMorador
} from './services/encomendaService';

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

app.get('/enquetes', (_req, res) => {
  res.json(listarEnquetes());
});

app.post('/enquetes', (req, res) => {
  try {
    const { autorId, ...dados } = req.body;
    const enquete = criarEnquete(autorId, dados);
    res.status(201).json(enquete);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/enquetes/:id/respostas', (req, res) => {
  try {
    const resposta = responderEnquete(req.params.id, req.body.usuarioId, req.body);
    res.status(201).json(resposta);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/enquetes/:id/relatorio', (req, res) => {
  try {
    res.json(gerarRelatorio(req.params.id));
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
});

app.get('/manutencoes', (_req, res) => {
  res.json(listarManutencoes());
});

app.post('/manutencoes', (req, res) => {
  try {
    const manutencao = adicionarManutencao(req.body);
    res.status(201).json(manutencao);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/manutencoes/:id/status', (req, res) => {
  try {
    const manutencao = atualizarStatus(req.params.id, req.body.status);
    res.json(manutencao);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/manutencoes/:id/comentarios', (req, res) => {
  try {
    const comentario = adicionarComentario(
      req.params.id,
      req.body.autor,
      req.body.texto
    );
    res.status(201).json(comentario);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/manutencoes/:id/fotos', (req, res) => {
  try {
    const url = adicionarFoto(req.params.id, req.body.url);
    res.status(201).json({ url });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/encomendas', (_req, res) => {
  res.json(listarPendentes());
});

app.post('/encomendas', (req, res) => {
  try {
    const encomenda = registrarChegada(req.body);
    res.status(201).json(encomenda);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/encomendas/qrcode/:codigo', (req, res) => {
  try {
    const encomenda = confirmarRetiradaPorQRCode(req.params.codigo, req.body);
    res.json(encomenda);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/encomendas/:id/unidade', (req, res) => {
  try {
    const encomenda = confirmarRetiradaPorUnidade(
      req.params.id,
      req.body.unidade,
      req.body
    );
    res.json(encomenda);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/encomendas/historico', (_req, res) => {
  res.json(listarHistorico());
});

app.get('/encomendas/historico/morador/:moradorId', (req, res) => {
  res.json(listarHistoricoPorMorador(req.params.moradorId));
});

// Geração automática todo dia 1 às 08:00
cron.schedule('0 8 1 * *', () => {
  gerarBoletosParaCondominio().catch(err =>
    console.error('Erro na geração automática de boletos', err)
  );
});

cron.schedule('0 8 * * *', () => {
  verificarManutencoesProximas().catch(err =>
    console.error('Erro ao verificar manutenções', err)
  );
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Boleto service running on port ${port}`);
});
