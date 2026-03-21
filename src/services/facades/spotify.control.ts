import { SpotifyService } from "../spotify";

export class SpotifyControlFacade {
    private _isRunning: boolean = false;

    constructor(private _spotifyService: SpotifyService) {}

    public activateMusicMode(): void {
        if (this._isRunning) {
            console.log("Spotify уже запущен");
            return;
        }
        console.log("Активация музыкального режима");
        this._spotifyService.openSpotify();
        this._isRunning = true;
        console.log("Музыкальный режим запущен");
    }

    public stopMusicMode(): void {
        if (!this._isRunning) {
            console.log("Spotify не запущен");
            return;
        }
        this._spotifyService.closeSpotify();
        this._isRunning = false;
        console.log("Музыкальный режим выключен");
    }

    public setVolume(level: number): void {
        if (!this._isRunning) {
            console.log("Spotify не запущен");
            return;
        }
        if (level < 0 || level > 100) {
            console.log("Громкость должна быть от 0 до 100");
            return;
        }
        this._spotifyService.setVolume(level);
        console.log(`Громкость установлена: ${level}`);
    }
}