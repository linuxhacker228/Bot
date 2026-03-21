import { exec } from "node:child_process";


export class YoutubeService {
    public play(query: string): void {
        const encoded = encodeURIComponent(query);
        const url = `https://www.youtube.com/results?search_query=${encoded}`;
        console.log(`Открываю YouTube: ${url}`);

        exec(`open "${url}"`, (error) => {
            if (error) {
                console.error("Error: ", error);
            }
        });
    }
}
