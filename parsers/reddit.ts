import { parse } from "node-html-parser";

export class RedditParser {
  async fetch(username: string) {
    const url = `https://www.reddit.com/user/${username}/about.json`;
    const response = await fetch(url, {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language":
          "en-US,en;q=0.9,en-GB;q=0.8,zh-CN;q=0.7,zh;q=0.6,uk;q=0.5",
        "cache-control": "max-age=0",
        priority: "u=0, i",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
      body: null,
      method: "GET",
    });
    console.log(response);
    return response.json();
  }

  async parse(username: string) {
    const data = await this.fetch(username);
    return {
      username: username,
      postKarma: data.data.link_karma.toString() || "0",
      commentKarma: data.data.comment_karma.toString() || "0",
    };
  }
}
