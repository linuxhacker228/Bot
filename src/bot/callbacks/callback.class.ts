import { Context } from "grammy";


export abstract class Callback {
    abstract readonly callbackName: string;

    abstract execute(ctx: Context): void | Promise<void>; 
}