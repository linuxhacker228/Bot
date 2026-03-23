import { Context } from "grammy";
import { Callback } from "./callback.class";
import { SessionManager } from "../session/session-manager";


export class YoutubeCallback extends Callback {
    callbackName: string = "action_youtube";

    constructor(private _sessions: SessionManager) {
        super();
    };

    async execute(ctx: Context): Promise<void> {
        await ctx.answerCallbackQuery();
        await ctx.reply("Введи название видео для поиска:");

        const userId = ctx.from?.id;
        if (userId) {
            this._sessions.set(userId, "youtube");
        }
    }
}
