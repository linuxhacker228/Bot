import { BotApp } from "./bot/client";
import { StartCommand } from "./bot/commands/start";
import { MenuCommand } from "./bot/commands/menu";
import { ConfigService } from "./services/config";
import { SystemService } from "./services/system";
import { AuthMiddleware } from "./bot/middlewares/auth";
import { OsFactory } from "./services/os/os.factory";
import { SessionManager } from "./bot/session/session-manager";
import { SpotifyModule } from "./modules/spotify.module";
import { YoutubeModule } from "./modules/youtube.module";
import { WeatherModule } from "./modules/weather.module";

const startBot = () => {
    const configService = new ConfigService();
    const systemService = new SystemService();
    systemService.preventSleep();

    const osAdapter = OsFactory.create();
    const sessionManager = new SessionManager();

    const spotifyModule = new SpotifyModule(osAdapter, sessionManager);
    const youtubeModule = new YoutubeModule(osAdapter, sessionManager);
    const weatherModule = new WeatherModule(configService, sessionManager);

    const botApp = new BotApp(
        configService,
        new AuthMiddleware(configService),
        [new StartCommand(), new MenuCommand(), ...spotifyModule.commands],
        [...spotifyModule.callbacks, ...youtubeModule.callbacks, ...weatherModule.callbacks],
        [...spotifyModule.textHandlers, ...youtubeModule.textHandlers, ...weatherModule.textHandlers],
    );

    botApp.start();
};

startBot();
