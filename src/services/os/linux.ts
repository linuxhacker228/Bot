import { exec } from "child_process";
import { IOperatingSystem } from "../../typings";

export class LinuxAdapter implements IOperatingSystem {
    openSpotify(): void {
        console.log('[Linux] Открываю Spotify...');
        exec('spotify');
    }

    closeSpotify(): void {
        console.log('[Linux] Закрываю Spotify...');
        exec('killall -9 spotify');
    }
}