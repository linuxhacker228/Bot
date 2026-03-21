import { Context } from 'grammy';
import { Command } from '../../bot/commands/command.class';
import { BotProcessService } from '../services/process';

export class StatusCommand extends Command {
    readonly commandName = 'status';

    constructor(private _process: BotProcessService) {
        super();
    }

    async execute(ctx: Context): Promise<void> {
        const running = await this._process.isRunning();
        await ctx.reply(running ? 'Бот работает' : 'Бот не работает');
    }
}
