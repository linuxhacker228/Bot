import { Bot } from 'grammy';
import { ConfigService } from '../services/config';
import { Command } from './commands/command.class';
import { AuthMiddleware } from './middlewares/auth';
import { Callback } from './callbacks/callback.class';
import { TextHandler } from './callbacks/text-handler.class';


export class BotApp {
    private _bot: Bot;

    constructor(
        private _config: ConfigService,
        private _authMiddleware: AuthMiddleware,
        private _commands: Command[],
        private _callbacks: Callback[],
        private _textHandlers: TextHandler[] = [],
    ) {
        const token = this._config.get("TOKEN");
        this._bot = new Bot(token);
        this._bot.use(_authMiddleware.middleware);
        this.registerCommand();
        this.registerCallback();
        this.registerTextHandlers();
    };

    private registerCommand() {
        console.log('Регистрирую команды бота');

        for (const command of this._commands) {
            this._bot.command(command.commandName, ctx => { command.execute(ctx) });
            console.log(`Команда /${command.commandName} зарегистрирована`);
        }
    }

    private registerCallback() {
        console.log('Регистрирую колбеки бота');

        for (const callback of this._callbacks) {
            this._bot.callbackQuery(callback.callbackName, ctx => { callback.execute(ctx) });
            console.log(`Колбек /${callback.callbackName} зарегистрирован`);
        }
    }

    private registerTextHandlers() {
        console.log(`Регистрирую text handlers: ${this._textHandlers.length}`);
        for (const handler of this._textHandlers) {
            this._bot.on('message:text', async (ctx, next) => { await handler.execute(ctx); await next() });
            console.log(`Text handler зарегистрирован: ${handler.constructor.name}`);
        }
    }

    public start() {
        console.log('Бот запущен и готов к работе');
        this._bot.start();
    }
}
