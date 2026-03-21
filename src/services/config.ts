import dotenv from "dotenv";

export class ConfigService {

    private _config: dotenv.DotenvParseOutput;
    public constructor() {
        const cgf = dotenv.config({path:"../.env"});
        if(cgf.error) {
            throw new Error("Not find .env file")
        }
        if(!cgf.parsed) {
            throw new Error(".env empty")
        }
        this._config = cgf.parsed;
    }

    public get(key: string) {
        const value = this._config[key];
        if(!value) {
            throw new Error("Not have this key");
        }
        return value;
    }

    public getNumber(key: string): number {
        const value = this._config[key];
        const responce = Number(value);
        if(Number.isNaN(responce)) {
            throw new Error("Это не число")
        }

        return responce;
    }
}