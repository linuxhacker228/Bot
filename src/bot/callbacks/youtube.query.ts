import { Context } from "grammy";
import { YoutubeService } from "../../services/youtube";
import { TextHandler } from "./text-handler.class";


export class YoutubeQueryHandler extends TextHandler {
    private _waiting = new Set<number>();

    constructor(private _youtubeService: YoutubeService) {
        super();
    }

    public addUser(userId: number): void {
        this._waiting.add(userId);
    }

    async execute(ctx: Context): Promise<void> {
        const userId = ctx.from?.id;
        const text = ctx.message?.text;

        if (userId && text && this._waiting.has(userId)) {
            this._waiting.delete(userId);
            this._youtubeService.play(text);
            await ctx.reply(`Ищу "${text}" на YouTube...`);
        }
    }
}
