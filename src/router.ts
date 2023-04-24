import express from 'express';
import { rateLimiter } from './middlewares/rate-limiter';

const app = express();

app.use(rateLimiter);

app.get('/', (req, res) => res.json({ message: 'Hello World!' }));

export { app };