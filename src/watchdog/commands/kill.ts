import { Context } from 'grammy';
import { Command } from '../../bot/commands/command.class';
import { BotProcessService } from '../services/process';

export class KillCommand extends Command {
    readonly commandName = 'kill';

    constructor(private _process: BotProcessService) {
        super();
    }

    async execute(ctx: Context): Promise<void> {
        if (!await this._process.isRunning()) {
            await ctx.reply('Бот уже не запущен');
            return;
        }
        await this._process.stop();
        await ctx.reply('Бот остановлен');
    }
}
