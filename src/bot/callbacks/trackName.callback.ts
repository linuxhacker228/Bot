import { Context } from "grammy";
import { Callback } from "./callback.class";
import { SpotifyService } from "../../services/spotify";

export class NameTrackCallback extends Callback {
    callbackName: string = "action_get_name";
    constructor(private _service: SpotifyService) {
        super(); 
    }
    async execute(ctx: Context): Promise<void> {
        await ctx.answerCallbackQuery();
        const name = this._service.getNameTrack();
        ctx.reply(`Сейчас играет трек: ${name}`)
    }
}