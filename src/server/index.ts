import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';
import config from './config';
import authRoutes from './routes/auth';
import cmsRoutes from './routes/cms';
import './db/seed';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-url.netlify.app']  // Update this with your frontend URL
    : 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Ensure uploads directory exists
const uploadsPath = path.join(process.cwd(), config.uploadDir);
try {
  mkdirSync(uploadsPath, { recursive: true });
} catch (err) {
  console.error('Error creating uploads directory:', err);
}

// Serve uploaded files
app.use(`/${config.uploadDir}`, express.static(uploadsPath));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cms', cmsRoutes);

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});