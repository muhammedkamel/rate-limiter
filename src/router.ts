import express from 'express';
import { rateLimiter } from './middlewares/rate-limiter';

const app = express();

if (process.env.RATE_LIMITER_ENABLED === 'true') {
    app.use(rateLimiter.bind(this));
}

app.get('/', (req, res) => res.json({ message: 'Hello World!' }));

export { app };