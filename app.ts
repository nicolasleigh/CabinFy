import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import { Client } from 'pg';
import mountRoutes from './src/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

mountRoutes(app);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
