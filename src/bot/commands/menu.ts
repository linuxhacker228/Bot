import { Context, InlineKeyboard } from "grammy";
import { Command } from "./command.class";

export class MenuCommand extends Command {
    commandName: string = "menu";
    
    execute(ctx: Context): void | Promise<void> {
        const keyboard = new InlineKeyboard()
            .text('Запустить Spotify', 'action_play')
            .row()
            .text('Запустить YouTube', 'action_youtube')
            .row()
            .text('Погода', 'action_weather')
            .row()
            .text('Установить громкость', 'action_volume')
            .row();

        ctx.reply('Пульт управления ПК:', { reply_markup: keyboard });
    }
}