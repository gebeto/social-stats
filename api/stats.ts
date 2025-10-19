import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  TikTokParser,
  YoutubeParser,
  InstagramParser,
  RedditParser,
} from "social-stats-parser";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { name = "World" } = req.query;
  const tiktokParser = new TikTokParser();
  const youtubeParser = new YoutubeParser();
  const instagramParser = new InstagramParser();
  const redditParser = new RedditParser();
  const [tiktokFPV, youtube, instagram, reddit] = await Promise.all([
    tiktokParser.parse("slavik.nychkalo"),
    youtubeParser.parse("slavik.nychkalo"),
    instagramParser.parse("slavik.nychkalo"),
    redditParser.parse("gebet0"),
  ]);
  return res.json({
    message: `Hello ${name}!`,
    tiktok: tiktokFPV,
    youtube: youtube,
    instagram: instagram,
    reddit: reddit,
  });
}
