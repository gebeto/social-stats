import type { VercelRequest, VercelResponse } from "@vercel/node";
import { TikTokParser } from "../parsers/tiktok";
import { YoutubeParser } from "../parsers/youtube";
import { InstagramParser } from "../parsers/instagram";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { name = "World" } = req.query;
  const tiktokParser = new TikTokParser();
  const youtubeParser = new YoutubeParser();
  const instagramParser = new InstagramParser();
  const [tiktok, youtube, instagram] = await Promise.all([
    await tiktokParser.parse("slavik.nychkalo"),
    await youtubeParser.parse("slavik.nychkalo"),
    await instagramParser.parse("slavik.nychkalo"),
  ]);
  return res.json({
    message: `Hello ${name}!`,
    tiktok: tiktok,
    youtube: youtube,
    instagram: instagram,
  });
}
