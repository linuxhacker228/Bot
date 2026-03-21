import { IOperatingSystem } from "../typings";

export class SpotifyService  {
    constructor(private _os: IOperatingSystem) {}
    
    public openSpotify(): void {
        this._os.openSpotify();
    }

    public closeSpotify(): void {
        this._os.closeSpotify();
    }
}
