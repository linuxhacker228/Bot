import { exec, execSync } from "child_process";
import { IOperatingSystem } from "../../typings";

export class MacAdapter implements IOperatingSystem {
    openSpotify(): void {
        console.log('[Mac] Открываю Spotify...');
        exec('open -a Spotify');
    }

    closeSpotify(): void {
        console.log('[Mac] Закрываю Spotify...');
        exec('killall Spotify');
    }

    setVolume(level: number): void {
        exec(`osascript -e "set volume output volume ${level}"`);
    }
    openUrl(url: string): void {
        exec(`open "${url}"`);
    }
    getNameTrack(): string {
        return execSync(`osascript -e 'tell application "Spotify" to get name of current track'`).toString().trim();
    }
}
