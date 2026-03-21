import { exec } from "child_process";
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
}
