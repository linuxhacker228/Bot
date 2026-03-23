import { Context } from "grammy";
import { Callback } from "./callback.class";
import { SessionManager } from "../session/session-manager";

export class WeatherCallback extends Callback {
    callbackName: string = "action_weather";
    constructor(private _sessions: SessionManager) {
        super();
    }
    async execute(ctx: Context): Promise<void> {
        await ctx.answerCallbackQuery();
        await ctx.reply("Введите название города:");
        const userId = ctx.from?.id;
        if (userId) {
            this._sessions.set(userId, "weather");
        }
    }
}
