import { Context } from "grammy";
import { Command } from "./command.class";
import { SpotifyService } from "../../services/spotify";
import { SpotifyControlFacade } from "../../services/facades/spotify.control";

export class PlayCommand extends Command {
    commandName: string = "play";
    constructor(private _spotifyControl: SpotifyControlFacade) {
        super();
    }
    execute(ctx: Context): void | Promise<void> {
        ctx.reply("Запуск приложения...");
        this._spotifyControl.activateMusicMode();
    }
}