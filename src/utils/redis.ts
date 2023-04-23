import * as redis from 'redis';

export const client = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD
} as redis.RedisClientOptions);

client.connect();

client.on('connect', () => {
    // tslint:disable-next-line:no-console
    console.log('Redis client connected');
});

client.on('error', (err) => {
    // tslint:disable-next-line:no-console
    console.log('Redis client connection error',err);
});
