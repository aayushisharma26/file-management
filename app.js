import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import spaceRoutes from './routes/spaceRoutes.js';
import folderRoutes from './routes/folderRoutes.js';
import fileRoutes from './routes/fileRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use('/', userRoutes);
app.use('/api/spaces', spaceRoutes);
app.use('/api/folders', folderRoutes);
app.use('/api/files', fileRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Database connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
