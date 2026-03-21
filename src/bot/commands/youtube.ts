import { Context } from "grammy";
import { Command } from "./command.class";
import { YoutubeService } from "../../services/youtube";

export class YoutubeCommand extends Command {
    commandName: string = "youtube";

    constructor(private _service: YoutubeService) {
        super();
    }

    execute(ctx: Context): void | Promise<void> {
        const query = ctx.match as string;

        if (!query) {
            ctx.reply("Input text for search. Example: /youtube lofi music");
            return;
        }

        ctx.reply(`Searching on YouTube: ${query}`);
        this._service.play(query);
    }
}
