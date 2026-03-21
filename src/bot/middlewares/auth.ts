import { Context, NextFunction } from "grammy";
import { ConfigService } from "../../services/config";


export class AuthMiddleware {
    constructor(private _config: ConfigService) {};

    public get middleware() {
        return async (ctx: Context, next: NextFunction) => {
            const adminID = this._config.getNumber('ADMIN_ID');
            const userId = ctx.from?.id;

            if(adminID === userId) {
                next();
            } else {
                console.log(`Попытка доступа от чужака! ID: ${userId}`);
                ctx.reply("Нету доступа");
            }
        }
    }
}