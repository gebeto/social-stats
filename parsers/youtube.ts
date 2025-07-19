import { parse } from "node-html-parser";

export class YoutubeParser {
  async fetch(username: string) {
    const url = `https://www.youtube.com/@${username}?`;
    const response = await fetch(url, {
      headers: {
        "accept-language": "en-US,en;q=0.9,en-GB;q=0.8",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    const data = await response.text();
    const document = parse(data);
    const channelId = document
      .querySelector('meta[itemprop="identifier"]')
      ?.getAttribute("content");
    return data;
  }

  async parse(username: string) {
    const data = await this.fetch(username);
    const subscribers = data.match(/"(\d+) subscribers"/);
    return {
      followers: subscribers?.[1],
      likes: "",
    };
  }
}
