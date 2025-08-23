import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import provisionRoutes from './routes/provision.routes';
import marketRoutes from './routes/market.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Zero-Crypto API is running!');
});

// API Routes
app.use('/api', provisionRoutes);
app.use('/api/markets', marketRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
