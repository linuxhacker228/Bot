import { Context } from "grammy";
import { Callback } from "./callback.class";
import { WeatherQueryHandler } from "./weather.query";

export class WeatherCallback extends Callback {
    callbackName: string = "action_weather";
    constructor(private _weatherQueryHandler: WeatherQueryHandler) {
        super();
    }
    async execute(ctx: Context): Promise<void> {
        await ctx.answerCallbackQuery();
        await ctx.reply("Введите название города:");
        const userId = ctx.from?.id;
        console.log('WeatherCallback: userId =', userId);
        if (userId) {
            this._weatherQueryHandler.addUser(userId);
        }
    }
}