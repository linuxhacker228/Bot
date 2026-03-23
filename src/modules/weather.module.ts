import { ConfigService } from "../services/config";
import { Weather } from "../services/weather";
import { WeatherCallback } from "../bot/callbacks/action.weather";
import { WeatherQueryHandler } from "../bot/callbacks/weather.query";
import { Callback } from "../bot/callbacks/callback.class";
import { TextHandler } from "../bot/callbacks/text-handler.class";

export class WeatherModule {
    readonly callbacks: Callback[];
    readonly textHandlers: TextHandler[];

    constructor(config: ConfigService) {
        const service = new Weather(config);
        const queryHandler = new WeatherQueryHandler(service);

        this.callbacks = [new WeatherCallback(queryHandler)];
        this.textHandlers = [queryHandler];
    }
}
