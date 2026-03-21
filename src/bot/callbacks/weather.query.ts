import { Context } from "grammy";
import { Weather } from "../../services/weather";
import { TextHandler } from "./text-handler.class";

export class WeatherQueryHandler extends TextHandler {
    private _waiting = new Set<number>();

    constructor(private _weather: Weather) {
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
