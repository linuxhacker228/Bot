import { IOperatingSystem } from "../typings";
import { YoutubeService } from "../services/youtube";
import { YoutubeCallback } from "../bot/callbacks/action.youtube";
import { YoutubeQueryHandler } from "../bot/callbacks/youtube.query";
import { Callback } from "../bot/callbacks/callback.class";
import { TextHandler } from "../bot/callbacks/text-handler.class";

export class YoutubeModule {
    readonly callbacks: Callback[];
    readonly textHandlers: TextHandler[];

    constructor(os: IOperatingSystem) {
        const service = new YoutubeService(os);
        const queryHandler = new YoutubeQueryHandler(service);

        this.callbacks = [new YoutubeCallback(queryHandler)];
        this.textHandlers = [queryHandler];
    }
}
