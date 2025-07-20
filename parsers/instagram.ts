import { parse } from "node-html-parser";

export class InstagramParser {
  async fetch(username: string) {
    const url = `https://www.instagram.com/${username}`;
    const response = await fetch(url, {
      headers: {
        "accept-language": "en-US,en;q=0.9",
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    return response.text();
  }

  async parse(username: string) {
    const data = await this.fetch(username);
    const document = parse(data);
    const userInfoRaw =
      document
        .querySelector("meta[property='og:description']")
        ?.getAttribute("content") ?? "";
    const userInfo = userInfoRaw?.replace(/\s+/g, " ").trim();
    const followerCount = userInfo?.match(/(\d+) Followers/)?.[1];
    const postsCount = userInfo?.match(/(\d+) Posts/)?.[1];
    return {
      username: username,
      followers: followerCount ?? 0,
      likes: null,
      posts: postsCount ?? 0,
    };
  }
}
