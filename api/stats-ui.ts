import type { VercelRequest, VercelResponse } from "@vercel/node";
import { TikTokParser } from "../parsers/tiktok";
import { YoutubeParser } from "../parsers/youtube";
import { InstagramParser } from "../parsers/instagram";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { name = "World" } = req.query;
  const tiktokParser = new TikTokParser();
  const youtubeParser = new YoutubeParser();
  const instagramParser = new InstagramParser();
  const services = await Promise.all([
    tiktokParser.parseUI("TikTok FPV", "slavik.nychkalo"),
    tiktokParser.parseUI("TikTok Personal", "slaviknychkalo"),
    youtubeParser.parseUI("YouTube", "slavik.nychkalo"),
    instagramParser.parseUI("Instagram", "slavik.nychkalo"),
  ]);
  return res.json({
    message: `Hello ${name}!`,
    services: services,
  });
}
