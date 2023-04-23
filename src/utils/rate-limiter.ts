import { client } from "./redis";

export const getCurrentWindow = async (key: string, slidingWindow: number): Promise<number> => {
    const now = Date.now();

    const [, currentWindow] = await client.multi()
        .zRemRangeByScore(key, 0, now - slidingWindow)
        .zCard(key)
        .zAdd(key, { score: now, value: now.toString() })
        .expire(key, slidingWindow)
        .exec();

    return currentWindow as number;
};