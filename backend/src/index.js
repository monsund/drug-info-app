import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db/mongo.js';
import drugRoutes from './routes/drugRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: ["https://drug-info-app-two.vercel.app", "http://localhost:5000"],
}));
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'drug-info backend server is running' });
});

// Routes
app.use('/api', drugRoutes);

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  // Connect DB first
  await connectDB();

  // Start server
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();
