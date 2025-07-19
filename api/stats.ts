import type { VercelRequest, VercelResponse } from "@vercel/node";
import { TikTokParser } from "../parsers/tiktok";
import { YoutubeParser } from "../parsers/youtube";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { name = "World" } = req.query;
  const tiktokParser = new TikTokParser();
  const youtubeParser = new YoutubeParser();
  return res.json({
    message: `Hello ${name}!`,
    tiktok: await tiktokParser.parse("slavik.nychkalo"),
    youtube: await youtubeParser.parse("slavik.nychkalo"),
  });
}
