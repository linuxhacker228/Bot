import { Context } from "grammy";
import { YoutubeService } from "../../services/youtube";
import { TextHandler } from "./text-handler.class";
import { SessionManager } from "../session/session-manager";


export class YoutubeQueryHandler extends TextHandler {
    constructor(
        private _youtubeService: YoutubeService,
        private _sessions: SessionManager,
    ) {
        super();
    }

    async execute(ctx: Context): Promise<void> {
        const userId = ctx.from?.id;
        const text = ctx.message?.text;

        if (userId && text && this._sessions.consume(userId, "youtube")) {
            this._youtubeService.play(text);
            await ctx.reply(`Ищу "${text}" на YouTube...`);
        }
    }
}
