import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './models';
import router from './routes/api';

dotenv.config();

const app: Application = express();

// Configuración de CORS
app.use(cors({
  origin: process.env.URL_FRONT,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/', router);

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }).then(() => {
  console.log('Database connected');
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to DB:', err);
});
