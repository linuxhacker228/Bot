import { Context } from "grammy";
import { Callback } from "./callback.class";
import { SpotifyControlFacade } from "../../services/facades/spotify.control";


export class PlayCallback extends Callback {
    callbackName: string = "action_play";
    constructor(private _spotifyControl: SpotifyControlFacade) {
        super();
    };
    async execute(ctx: Context): Promise<void> {
        await ctx.answerCallbackQuery({ text: 'Запускаю...'});
        await ctx.reply("Spotify запущен!");

        this._spotifyControl.activateMusicMode();
    }

}
