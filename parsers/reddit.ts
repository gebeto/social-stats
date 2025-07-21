import { parse } from "node-html-parser";

export class RedditParser {
  async fetch(username: string) {
    const url = `https://www.reddit.com/user/${username}/about.json`;
    const response = await fetch(url);
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
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
