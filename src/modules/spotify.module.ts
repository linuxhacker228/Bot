import { IOperatingSystem } from "../typings";
import { SpotifyService } from "../services/spotify";
import { SpotifyControlFacade } from "../services/facades/spotify.control";
import { PlayCommand } from "../bot/commands/play";
import { PlayCallback } from "../bot/callbacks/action.play";
import { VolumeCallback } from "../bot/callbacks/action.volume";
import { VolumeQueryHandler } from "../bot/callbacks/volume.query";
import { Command } from "../bot/commands/command.class";
import { Callback } from "../bot/callbacks/callback.class";
import { TextHandler } from "../bot/callbacks/text-handler.class";

export class SpotifyModule {
    readonly commands: Command[];
    readonly callbacks: Callback[];
    readonly textHandlers: TextHandler[];

    constructor(os: IOperatingSystem) {
        const service = new SpotifyService(os);
        const facade = new SpotifyControlFacade(service);
        const volumeQueryHandler = new VolumeQueryHandler(facade);

        this.commands = [new PlayCommand(facade)];
        this.callbacks = [
            new PlayCallback(facade),
            new VolumeCallback(volumeQueryHandler),
        ];
        this.textHandlers = [volumeQueryHandler];
    }
}
