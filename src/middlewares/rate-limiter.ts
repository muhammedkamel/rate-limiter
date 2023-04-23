import { NextFunction, Request, Response } from "express";
import { getCurrentWindow } from "../utils/rate-limiter";

export const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
    let ip = req.header('x-forwarded-for') || req.socket.remoteAddress;

    if (ip.includes('::ffff:')) {
        ip = ip.replace('::ffff:', 'ipv4:');
    }

    const key = `rate-limiter:${ip}`;

    const current = await getCurrentWindow(key, Number(process.env.RATE_LIMITER_TIME_WINDOW));

    // tslint:disable-next-line:no-console
    console.log(current);

    if (current + 1 > Number(process.env.RATE_LIMITER_MAX_REQUESTS)) {
        return res.status(429).json({
            message: 'too many requests'
        });
    }

    next();
};
