import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import morgan from 'morgan';
import { config } from './core/config.js';
import { sequelize } from './core/database.js';
import { DemandForecastModel } from './services/demand-forecasting/model.js';
import { validateFeatures } from './services/demand-forecasting/validation.js';
import logger from './utils/logger.js';

const app = express();

// Enhanced logging middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    logger.warn('Authentication failed: No token provided');
    return res.sendStatus(401);
  }

  jwt.verify(token, config.secretKey, (err, user) => {
    if (err) {
      logger.warn('Authentication failed: Invalid token');
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

// Sample data for demonstration
const sampleData = [
  { features: { sales: 100, season: 1, price: 50, stock: 200 }, demand: 120 },
  { features: { sales: 150, season: 2, price: 45, stock: 180 }, demand: 160 },
  { features: { sales: 80, season: 3, price: 55, stock: 220 }, demand: 90 }
];

// Initialize and train model
const model = new DemandForecastModel();
model.train(sampleData);

// Routes
app.get('/', (req, res) => {
  logger.info('Root endpoint accessed');
  res.json({
    message: 'Supply Chain Platform API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      demandForecast: '/demand-forecast'
    }
  });
});

app.get('/health', (req, res) => {
  logger.info('Health check performed');
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    dbStatus: sequelize.authenticate().then(() => 'connected').catch(() => 'disconnected')
  });
});

app.post('/demand-forecast', authenticateToken, async (req, res) => {
  try {
    const features = req.body.features;
    logger.info('Received demand forecast request', { features });
    
    validateFeatures(features);
    const prediction = model.predict(features);
    
    logger.info('Demand forecast generated', { prediction });
    res.json({ 
      prediction,
      timestamp: new Date().toISOString(),
      features
    });
  } catch (error) {
    logger.error('Error in demand forecast', { error: error.message });
    res.status(400).json({ 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Database initialization and server start
const PORT = process.env.PORT || 8080;

async function startServer() {
  try {
    await sequelize.authenticate();
    logger.info('Database connection established');
    
    await sequelize.sync();
    logger.info('Database synchronized');
    
    app.listen(PORT, '0.0.0.0', () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info('Available endpoints:');
      logger.info('  GET  /');
      logger.info('  GET  /health');
      logger.info('  POST /demand-forecast');
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  logger.error('Unhandled rejection:', error);
  process.exit(1);
});

startServer();