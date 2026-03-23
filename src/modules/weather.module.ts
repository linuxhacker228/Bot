import { ConfigService } from "../services/config";
import { Weather } from "../services/weather";
import { WeatherCallback } from "../bot/callbacks/weather.callback";
import { WeatherQueryHandler } from "../bot/text-handlers/weather.handler";
import { Callback } from "../bot/callbacks/callback.class";
import { TextHandler } from "../bot/text-handlers/text-handler.class";
import { SessionManager } from "../bot/session/session-manager";

export class WeatherModule {
    readonly callbacks: Callback[];
    readonly textHandlers: TextHandler[];

    constructor(config: ConfigService, sessions: SessionManager) {
        const service = new Weather(config);
        const queryHandler = new WeatherQueryHandler(service, sessions);

        this.callbacks = [new WeatherCallback(sessions)];
        this.textHandlers = [queryHandler];
    }
}
