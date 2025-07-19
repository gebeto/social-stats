import { parse } from "node-html-parser";

export class TikTokParser {
  constructor() {
    // Initialization code if needed
  }

  async fetch(username: string) {
    const url = `https://www.tiktok.com/@${username}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    return response.text();
  }

  async parse(username: string) {
    const data = await this.fetch(username);
    const document = parse(data);
    const json = JSON.parse(
      document.querySelector("script#__UNIVERSAL_DATA_FOR_REHYDRATION__")
        ?.textContent ?? "{}"
    );
    const userInfo =
      json["__DEFAULT_SCOPE__"]["webapp.user-detail"]["userInfo"];
    const stats = userInfo["statsV2"];
    return {
      followers: stats.followerCount,
      likes: stats.heartCount,
    };
  }
}
