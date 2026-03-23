import { IOperatingSystem } from "../typings";
import { YoutubeService } from "../services/youtube";
import { YoutubeCallback } from "../bot/callbacks/youtube.callback";
import { YoutubeQueryHandler } from "../bot/text-handlers/youtube.handler";
import { Callback } from "../bot/callbacks/callback.class";
import { TextHandler } from "../bot/text-handlers/text-handler.class";
import { SessionManager } from "../bot/session/session-manager";

export class YoutubeModule {
    readonly callbacks: Callback[];
    readonly textHandlers: TextHandler[];

    constructor(os: IOperatingSystem, sessions: SessionManager) {
        const service = new YoutubeService(os);
        const queryHandler = new YoutubeQueryHandler(service, sessions);

        this.callbacks = [new YoutubeCallback(sessions)];
        this.textHandlers = [queryHandler];
    }
}
