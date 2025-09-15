import type { VercelRequest, VercelResponse } from "@vercel/node";
import { TikTokParser } from "../parsers/tiktok";
import { YoutubeParser } from "../parsers/youtube";
import { InstagramParser } from "../parsers/instagram";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const parsers = {
    tiktok: {
      defaultTitle: "TikTok",
      parser: new TikTokParser(),
    },
    youtube: {
      defaultTitle: "YouTube",
      parser: new YoutubeParser(),
    },
    instagram: {
      defaultTitle: "Instagram",
      parser: new InstagramParser(),
    },
  };
  const { services } = req.body as {
    services: {
      service: keyof typeof parsers;
      username: string;
      title: string;
    }[];
  };

  const response = await Promise.all(
    services.map((s) =>
      parsers[s.service].parser.parseUI(
        s.title || parsers[s.service].defaultTitle,
        s.username
      )
    )
  );
  return res.json({
    services: response,
  });
}
