import request from "supertest";
import { client } from "../../src/utils/redis";
import { app } from "../../src/router";

let req: request.SuperTest<request.Test>;

describe('rate-limiter middleware', () => {
    beforeEach(async () => {
        await client.flushAll();

        req = request(app);
    });

    it('should return 429 if the rate limit is reached', async () => {
        let now = Date.now();
        await client.zAdd('rate-limiter:172.20.0.1', [
            { score: now, value: now.toString() },
            { score: ++now, value: now.toString() },
            { score: ++now, value: now.toString() },
            { score: ++now, value: now.toString() },
            { score: ++now, value: now.toString() },
        ]);

        const res = await req.get('/').set('x-forwarded-for', '172.20.0.1');

        expect(res.status).toEqual(429);
    });

    it('should return 200 if the rate limit is not reached', async () => {
        const res = await req.get('/');

        expect(res.status).toEqual(200);
    });

    afterAll(async () => {
        await client.flushAll();
        await client.disconnect();
    });
});
