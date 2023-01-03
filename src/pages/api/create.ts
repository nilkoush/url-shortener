import random from '@utils/random';
import redis from '@utils/redis';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	shortUrl?: string;
	error?: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	let shortUrl = await random(5);
	let newLongUrl = new RegExp('^(http|https)://', 'i').test(req.body.longUrl)
		? req.body.longUrl
		: `https://${req.body.longUrl}`;

	if (await redis.hexists('links', shortUrl)) {
		return res.status(500).json({ error: 'This short URL does exist!' });
	}

	await redis.hset('links', shortUrl, newLongUrl);

	return res.status(200).json({ shortUrl: shortUrl });
}
