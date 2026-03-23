import { Context } from "grammy";


export abstract class TextHandler {
    abstract execute(ctx: Context): void | Promise<void>;
}
