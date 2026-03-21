 import { IOperatingSystem } from "../typings";

 export class YoutubeService {
     constructor(private _os: IOperatingSystem) {}

     public play(query: string): void {
         const url =
 `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
         console.log(`Открываю YouTube: ${url}`);
         this._os.openUrl(url);
     }
 }