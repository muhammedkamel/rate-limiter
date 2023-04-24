import { client } from "./redis";

export const getCurrentWindow = async (key: string, slidingWindow: number): Promise<number> => {
    const now = Date.now();

    // tslint:disable-next-line:no-console
    console.log(slidingWindow);

    const [, currentWindow] = await client.multi()
        .zRemRangeByScore(key, 0, now - slidingWindow * 1000)
        .zCard(key)
        .zAdd(key, { score: now, value: now.toString() })
        .expire(key, slidingWindow)
        .exec();

    return currentWindow as number;
};