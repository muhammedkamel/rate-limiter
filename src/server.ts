import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { client } from "./utils/redis";
import { rateLimiter } from "./middlewares/rate-limiter";

const app = express();

if (process.env.RATE_LIMITER_ENABLED === 'true') {
    app.use(rateLimiter.bind(this));
}

app.get('/', (req, res) => res.send(client.get('test')));

// tslint:disable-next-line:no-console
app.listen(process.env.PORT, () => console.log(`Application started listening http://localhost:${process.env.PORT}`));