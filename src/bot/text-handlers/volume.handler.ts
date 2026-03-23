import { Context } from "grammy";
import { TextHandler } from "./text-handler.class";
import { SpotifyControlFacade } from "../../services/facades/spotify.control";
import { SessionManager } from "../session/session-manager";

export class VolumeQueryHandler extends TextHandler {
    constructor(
        private _spotifyControl: SpotifyControlFacade,
        private _sessions: SessionManager,
    ) {
        super();
    }

    async execute(ctx: Context): Promise<void> {
        const userId = ctx.from?.id;
        const text = ctx.message?.text;
        if (!userId || !text || !this._sessions.consume(userId, "volume")) return;
        const level = parseInt(text, 10);
        if (isNaN(level) || level < 0 || level > 100) {
            await ctx.reply("Введите число от 0 до 100");
            return;
        }
        this._spotifyControl.setVolume(level);
        await ctx.reply(`Громкость установлена: ${level}`);
    }
}
