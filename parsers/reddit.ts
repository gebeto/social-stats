import { parse } from "node-html-parser";

export class RedditParser {
  async fetch(username: string) {
    const url = `https://www.reddit.com/user/${username}/`;
    const response = await fetch(url, {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language":
          "en-US,en;q=0.9,en-GB;q=0.8,zh-CN;q=0.7,zh;q=0.6,uk;q=0.5",
        "cache-control": "no-cache",
        pragma: "no-cache",
        priority: "u=0, i",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        cookie:
          "loid=000000000pj74e1dey.2.1702053718242.Z0FBQUFBQmxjMGRXOHUxOThuUUFTdUpkMFEwTmZxMTNYQkJMZHFTYlowRDhtaXZNczBoX1pJWDE2X3F6NHVkdXZoUmc2eTVkdFhVUWM5V0Z6anZSQW9JdmIxN1hQUzZCZzVPRHFpRUhFMTVWWUlDY1lYN1VYc0U2R1F0STVacUx1MzVKemEzZGI4cnY; edgebucket=eZzB3Ejq7aQ0tlXORX; csv=2; csrf_token=f0fa24d78edd52d0e3d489a5b5f880ac; token_v2=eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJsb2lkIiwiZXhwIjoxNzUzMTY3OTI2LjgzNjk1NywiaWF0IjoxNzUzMDgxNTI2LjgzNjk1NywianRpIjoia0hRVldJRGU3QTgyeFltdHJkVkhGcHV1WGlSUDFnIiwiY2lkIjoiMFItV0FNaHVvby1NeVEiLCJsaWQiOiJ0Ml9wajc0ZTFkZXkiLCJsY2EiOjE3MDIwNTM3MTgyNDIsInNjcCI6ImVKeGtrZEdPdERBSWhkLUZhNV9nZjVVX20wMXRjWWFzTFFhb2szbjdEVm9jazcwN2NENHBIUDlES29xRkRDWlhncW5BQkZnVHJUREJSdVQ5bkxtM2cyaU5lOHRZc1puQ0JGbXdGRHJrbUxHc2lRUW1lSklheXhzbW9JTE55Rnl1dEdOTkxUMFFKcWhjTXJlRkhwYzJvYmtiaTU2ZEdGVzVyRHlvc1ZmbDB0akdGTFlueGpjYnF3MnB1QzZuTWtuTFF2a3NYdlRqTjlXMzl2bXpfU2EwSjhPS3F1bUIzaGxKQ0c0c2ZwaW0zZDlUazU2dEN4YTE5M3FRMnVkNjNLNTkxaXcwTzdlZjZfbHJJeG1YWTJoLUp2dDMxeS1oQTQ4OEx6UHFBRWFzNFVjWmRtUWRfbFVIVUxtZ0pHTUo0dE1JNU1ybDIzOEp0bXZUdjhidEV6OThNLUttTl96V0ROUnpDZUxRcF9IMUd3QUFfXzhRMWVUUiIsImZsbyI6MX0.dLJHU2vg0UVtcmd0HhlO_suiePBnK5_6-nzB59DpKAEM-ks_Ir4jvU2-ZbeqpIVY9iCb4yKatV5WmUxRxyDvOjSiKPbFkNa7fvTXNoG18CTMv2Fcxay7Re2athAhdj9ieM4k2xWWXn90ODtkhE58url_6Jj2TRUx9WATfJBKrlTEiFSqIUzH6jVbB4TxN3gK_8876MCiL5z76Vf5Y8_32T-gEmb5PyYbPUvFWqyxFC8kItINpzm2QREroiGrSMLVlNn7ZnRaq4Gnli_Qjam95QFe3GHkulxemPJblxlpuYS5zUCNR36xEV2Y0lR9zUrUvBBhhpwY68AKqO7J-sTp-g; session_tracker=kigdqrchfcgaonhmge.0.1753083055225.Z0FBQUFBQm9mZXl2VG54WkNabklNYzlFc1lfYVRtTVRva0pzSEZ3VGNUOXd1a0MtUkJBNktxbTktRHFQXzEzTHJqRWJJWVREUVR0NEI2enJwaUU1UU10WkVJMmxEVWdJZDU1Wmo2TkplRHVXWU9pX0llczVYNU1NVjJobElCb1hSM0FBbGlCVl9CNnY",
      },
      body: null,
      method: "GET",
    });
    // const response = await fetch(url, {
    //   headers: {
    //     "accept-language": "en-US,en;q=0.9",
    //     "User-Agent":
    //       "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    //   },
    // });
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    return response.text();
  }

  async parse(username: string) {
    const data = await this.fetch(username);
    const document = parse(data);
    const [postKarma, commentsKarma] = document.querySelectorAll(
      "span[data-testid='karma-number']"
    );
    const userInfoRaw = "";
    const userInfo = userInfoRaw?.replace(/\s+/g, " ").trim();
    return {
      username: username,
      postkarma: postKarma?.textContent.replace(/\D/g, "") || 0,
      commentKarma: commentsKarma?.textContent.replace(/\D/g, "") || 0,
    };
  }
}
