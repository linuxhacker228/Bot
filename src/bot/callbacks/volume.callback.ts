import { Context } from "grammy";
import { Callback } from "./callback.class";
import { SessionManager } from "../session/session-manager";

export class VolumeCallback extends Callback {
    callbackName: string = "action_volume";
    constructor(private _sessions: SessionManager) { super(); }
    async execute(ctx: Context): Promise<void> {
        await ctx.answerCallbackQuery();
        await ctx.reply("Введите уровень громкости (0-100):");
        const userId = ctx.from?.id;
        if (userId) this._sessions.set(userId, "volume");
    }
}
