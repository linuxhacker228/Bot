import { Context } from "grammy";
import { Callback } from "./callback.class";
import { VolumeQueryHandler } from "./volume.query";

export class VolumeCallback extends Callback {
    callbackName: string = "action_volume";
    constructor(private _volumeQueryHandler: VolumeQueryHandler) { super(); }
    async execute(ctx: Context): Promise<void> {
        await ctx.answerCallbackQuery();
        await ctx.reply("Введите уровень громкости (0-100):");
        const userId = ctx.from?.id;
        if (userId) this._volumeQueryHandler.addUser(userId);
    }
}
