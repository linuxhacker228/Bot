import { Context } from "grammy";
import { Command } from "./command.class";

export class StartCommand extends Command {
    commandName: string = "start";
    
    execute(ctx: Context): void | Promise<void> {
        ctx.reply('Привет! Я твой ПК-ассистент. Нажми /play, чтобы запустить приложение.');
    }
}