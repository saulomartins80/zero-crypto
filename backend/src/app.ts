import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import provisionRoutes from './routes/provision.routes';
import rebanhoRoutes from './routes/rebanho.routes';
import manejoRoutes from './routes/manejo.routes';
import producaoRoutes from './routes/producao.routes';
import vendasRoutes from './routes/vendas.routes';
import mercadoRoutes from './routes/mercado.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🐂 BOVINEXT API is running!');
});

// API Routes
app.use('/api', provisionRoutes);
app.use('/api/rebanho', rebanhoRoutes);
app.use('/api/manejo', manejoRoutes);
app.use('/api/producao', producaoRoutes);
app.use('/api/vendas', vendasRoutes);
app.use('/api/mercado', mercadoRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
