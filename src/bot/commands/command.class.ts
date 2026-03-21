import { Context } from "grammy";


export abstract class Command {
    abstract readonly commandName: string;

    abstract execute(ctx: Context): void | Promise<void>; 
}