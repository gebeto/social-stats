import { parse } from "node-html-parser";

export class InstagramParser {
  async fetch(username: string) {
    const url = `https://www.instagram.com/${username}`;
    const response = await fetch(url, {
      headers: {
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
    console.log(" >>> DATA", data);
    const document = parse(data);
    const userInfoRaw =
      document
        .querySelector("meta[property='og:description']")
        ?.getAttribute("content") ?? "";
    const userInfo = userInfoRaw?.replace(/\s+/g, " ").trim();
    const followerCount = userInfo?.match(/(\d+) Followers/)?.[1];
    const postsCount = userInfo?.match(/(\d+) Posts/)?.[1];
    return {
      raw: userInfo,
      followers: followerCount,
      likes: "0",
      posts: postsCount,
    };
  }
}
