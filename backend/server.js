import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import reportRoutes from './routes/report.js';
import path from 'path';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from uploads folder
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/report', reportRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
