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
      followers: subscribers ?? 0,
      likes: null,
      posts: posts ?? 0,
    };
  }

  async parseUI(title: string, username: string) {
    const data = await this.parse(username);

    return {
      title: title,
      username: username,
      fields: [
        { name: "Followers", value: data.followers.toString() },
        { name: "Videos", value: data.posts.toString() },
      ],
    };
  }
}
