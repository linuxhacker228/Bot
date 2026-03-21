import { Context } from "grammy";
import { Callback } from "./callback.class";
import { YoutubeQueryHandler } from "./youtube.query";


export class YoutubeCallback extends Callback {
    callbackName: string = "action_youtube";

    constructor(private _youtubeQueryHandler: YoutubeQueryHandler) {
        super();
    };

    async execute(ctx: Context): Promise<void> {
        await ctx.answerCallbackQuery();
        await ctx.reply("Введи название видео для поиска:");

        const userId = ctx.from?.id;
        if(userId) {
            this._youtubeQueryHandler.addUser(userId)
        }
    }
}
