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
    return data;
  }

  async parse(username: string) {
    const data = await this.fetch(username);
    const subscribers = data.match(/"(\d+) subscribers"/)?.[1];
    const posts = data.match(/"(\d+) videos"/)?.[1];
    return {
      username: username,
      followers: subscribers,
      likes: null,
      posts: posts,
    };
  }
}
