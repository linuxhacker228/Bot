export interface IOperatingSystem  {
    openSpotify(): void;
    closeSpotify(): void;
    setVolume(level: number): void;
    openUrl(url: string): void;
}
