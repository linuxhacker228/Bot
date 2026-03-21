import { Context } from 'grammy';
import { Command } from '../../bot/commands/command.class';
import { BotProcessService } from '../services/process';

export class WakeCommand extends Command {
    readonly commandName = 'wake';

    constructor(private _process: BotProcessService) {
        super();
    }

    async execute(ctx: Context): Promise<void> {
        if (await this._process.isRunning()) {
            await ctx.reply('Бот уже запущен');
            return;
        }
        this._process.start();
        await ctx.reply('Запускаю бота...');
    }
}
