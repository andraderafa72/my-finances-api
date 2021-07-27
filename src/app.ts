/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();

import 'reflect-metadata';
import RateLimit from 'express-rate-limit';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { router } from './routes';
import createClient from './database';

createClient().then(() => {
  console.log('Conexão com o banco de dados estabelecida!');
}).catch((e) => console.log('Erro ao conectar com o banco de dados!', e));

export const app = express();

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
});

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'Content-Type',
    'Accept',
    'authorization',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false,
};

app.use(helmet());
app.use(cors(options));
app.options('*', cors(options));
app.use(limiter);

app.use(express.json());
app.use(router);
