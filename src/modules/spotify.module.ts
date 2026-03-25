import { IOperatingSystem } from "../typings";
import { SpotifyService } from "../services/spotify";
import { SpotifyControlFacade } from "../services/facades/spotify.control";
import { PlayCommand } from "../bot/commands/play";
import { PlayCallback } from "../bot/callbacks/play.callback";
import { VolumeCallback } from "../bot/callbacks/volume.callback";
import { VolumeQueryHandler } from "../bot/text-handlers/volume.handler";
import { Command } from "../bot/commands/command.class";
import { Callback } from "../bot/callbacks/callback.class";
import { TextHandler } from "../bot/text-handlers/text-handler.class";
import { SessionManager } from "../bot/session/session-manager";
import { NameTrackCallback } from "../bot/callbacks/trackName.callback";

export class SpotifyModule {
    readonly commands: Command[];
    readonly callbacks: Callback[];
    readonly textHandlers: TextHandler[];

    constructor(os: IOperatingSystem, sessions: SessionManager) {
        const service = new SpotifyService(os);
        const facade = new SpotifyControlFacade(service);
        const volumeQueryHandler = new VolumeQueryHandler(facade, sessions);

        this.commands = [new PlayCommand(facade)];
        this.callbacks = [
            new PlayCallback(facade),
            new VolumeCallback(sessions),
            new NameTrackCallback(service),
        ];
        this.textHandlers = [volumeQueryHandler];
    }
}
