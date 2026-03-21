import { IOperatingSystem } from "../../typings";
import { exec } from "node:child_process";

export class WindowsAdapter implements IOperatingSystem {
    public openSpotify(): void {
        console.log('[Windows] Открываю Spotify...');
        exec('Spotify.exe');
    }

    public closeSpotify(): void {
        console.log('[Windows] Закрываю Spotify...');
        exec('taskkill /IM Spotify.exe /F');
    }

    public setVolume(level: number): void {
        exec(`nircmd setvolume 0 ${level * 655} 0`);
    }
}