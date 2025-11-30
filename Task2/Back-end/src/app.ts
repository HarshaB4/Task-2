import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.routes';
import folderRoutes from './routes/floder.routes';
import fileRoutes from './routes/file.routes';
import shareRoutes from "./routes/share.route";
import { connectDB } from "./config/db";

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/folders', folderRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/share', shareRoutes);

app.get('/', (req, res) => res.send('Storage Platform API'));

connectDB().catch(err => {
  console.error('DB connect failed', err);
  process.exit(1);
});

export default app;