import os from "os";
import { BotApp } from "./bot/client";
import { PlayCommand } from "./bot/commands/play";
import { StartCommand } from "./bot/commands/start";
import { ConfigService } from "./services/config";
import { SystemService } from "./services/system";
import { SpotifyService } from "./services/spotify";
import { YoutubeService } from "./services/youtube";
import { AuthMiddleware } from "./bot/middlewares/auth";
import { MenuCommand } from "./bot/commands/menu";
import { PlayCallback } from "./bot/callbacks/action.play";
import { YoutubeCallback } from "./bot/callbacks/action.youtube";
import { YoutubeQueryHandler } from "./bot/callbacks/youtube.query";
import { WeatherCallback } from "./bot/callbacks/action.weather";
import { WeatherQueryHandler } from "./bot/callbacks/weather.query";
import { VolumeCallback } from "./bot/callbacks/action.volume";
import { VolumeQueryHandler } from "./bot/callbacks/volume.query";
import { Weather } from "./services/weather";
import { IOperatingSystem } from "./typings";
import { MacAdapter } from "./services/os/mac";
import { LinuxAdapter } from "./services/os/linux";
import { WindowsAdapter } from "./services/os/windows";
import { SpotifyControlFacade } from "./services/facades/spotify.control";

const startBot = () => {
    console.log('Инициализация бота');

    const configService = new ConfigService();
    const systemService = new SystemService();
    systemService.preventSleep();

    let currentOS: IOperatingSystem;
    const platform = os.platform();

    switch (platform) {
        case 'darwin':
            currentOS = new MacAdapter();
            break
        case 'linux':
            currentOS = new LinuxAdapter();
            break
        case 'win32':
            currentOS = new WindowsAdapter();
            break
        default:
            throw new Error(`OS ${platform} not support`);
    }

    const spotifyService = new SpotifyService(currentOS);
    const youtubeService = new YoutubeService();
    const weatherService = new Weather(configService);

    const spotifyControl = new SpotifyControlFacade(spotifyService);

    const startCmd = new StartCommand();
    const playCmd = new PlayCommand(spotifyControl);
    const menuCmd = new MenuCommand();

    const authMiddleware = new AuthMiddleware(configService);

    const youtubeQueryHandler = new YoutubeQueryHandler(youtubeService);
    const weatherQueryHandler = new WeatherQueryHandler(weatherService);
    const volumeQueryHandler = new VolumeQueryHandler(spotifyControl);

    const playCallback = new PlayCallback(spotifyControl);
    const youtubeCallback = new YoutubeCallback(youtubeQueryHandler);
    const weatherCallback = new WeatherCallback(weatherQueryHandler);
    const volumeCallback = new VolumeCallback(volumeQueryHandler);

    const allCommands = [startCmd, playCmd, menuCmd];
    const allCallbacks = [playCallback, youtubeCallback, weatherCallback, volumeCallback];
    const allTextHandlers = [weatherQueryHandler, youtubeQueryHandler, volumeQueryHandler];

    const botApp = new BotApp(configService, authMiddleware, allCommands, allCallbacks, allTextHandlers);

    botApp.start();
}

startBot();
