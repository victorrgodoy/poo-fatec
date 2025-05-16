import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import clientRouter from './routes/client.router'

const config = {
  port: Number(process.env.PORT),
  cors: process.env.CORS_URL,
}

const corsOptions = {
  origin: config.cors,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200,
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json())

app.use('/api/clients', clientRouter);

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});