import { Context } from "grammy";
import { Weather } from "../../services/weather";
import { TextHandler } from "./text-handler.class";
import { SessionManager } from "../session/session-manager";

export class WeatherQueryHandler extends TextHandler {
    constructor(
        private _weather: Weather,
        private _sessions: SessionManager,
    ) {
        super();
    }

    async execute(ctx: Context): Promise<void> {
        const userId = ctx.from?.id;
        const text = ctx.message?.text;

        if (userId && text && this._sessions.consume(userId, "weather")) {
            try {
                const data = await this._weather.search(text);
                console.log('Weather API response:', JSON.stringify(data));
                const temp = data.main.temp;
                const description = data.weather[0].description;
                await ctx.reply(`Погода в ${text}: ${temp}°C, ${description}`);
            } catch (e) {
                console.log('Weather error:', e);
                await ctx.reply(`Город "${text}" не найден`);
            }
        }
    }
}
