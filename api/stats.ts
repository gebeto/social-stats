import type { VercelRequest, VercelResponse } from "@vercel/node";
import { TikTokParser } from "../parsers/tiktok";
import { YoutubeParser } from "../parsers/youtube";
import { InstagramParser } from "../parsers/instagram";
import { RedditParser } from "../parsers/reddit";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { name = "World" } = req.query;
  const tiktokParser = new TikTokParser();
  const youtubeParser = new YoutubeParser();
  const instagramParser = new InstagramParser();
  const redditParser = new RedditParser();
  const [tiktok, youtube, instagram, reddit] = await Promise.all([
    await tiktokParser.parse("slavik.nychkalo"),
    await youtubeParser.parse("slavik.nychkalo"),
    await instagramParser.parse("slavik.nychkalo"),
    await redditParser.parse("gebet0"),
  ]);
  return res.json({
    message: `Hello ${name}!`,
    tiktok: tiktok,
    youtube: youtube,
    instagram: instagram,
    reddit: reddit,
  });
}
