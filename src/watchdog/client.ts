import { Bot, Context } from 'grammy';
import { Command } from '../bot/commands/command.class';

export class WatchdogApp {
    private _bot: Bot;

    constructor(
        private readonly _token: string,
        private readonly _allowedUserId: number,
        private readonly _commands: Command[],
    ) {
        this._bot = new Bot(this._token);
        this.registerMiddleware();
        this.registerCommands();
    }

    private registerMiddleware(): void {
        this._bot.use(async (ctx: Context, next) => {
            if (ctx.from?.id !== this._allowedUserId) {
                await ctx.reply('Нету доступа');
                return;
            }
            await next();
        });
    }

    private registerCommands(): void {
        for (const command of this._commands) {
            this._bot.command(command.commandName, ctx => command.execute(ctx));
            console.log(`Команда /${command.commandName}`);
        }
    }

    public start(): void {
        console.log('Watchdog запущен');
        this._bot.start();
    }
}
