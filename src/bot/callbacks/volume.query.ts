import { Context } from "grammy";
import { TextHandler } from "./text-handler.class";
import { SpotifyControlFacade } from "../../services/facades/spotify.control";

export class VolumeQueryHandler extends TextHandler {
    private _waiting = new Set<number>();
    constructor(private _spotifyControl: SpotifyControlFacade) { super(); }

    public addUser(userId: number): void { this._waiting.add(userId); }

    async execute(ctx: Context): Promise<void> {
        const userId = ctx.from?.id;
        const text = ctx.message?.text;
        if (!userId || !text || !this._waiting.has(userId)) return;
        this._waiting.delete(userId);
        const level = parseInt(text, 10);
        if (isNaN(level) || level < 0 || level > 100) {
            await ctx.reply("Введите число от 0 до 100");
            return;
        }
        this._spotifyControl.setVolume(level);
        await ctx.reply(`Громкость установлена: ${level}`);
    }
}
