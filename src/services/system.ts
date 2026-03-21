import { spawn, ChildProcess } from "node:child_process";


export class SystemService {
    private _caffeinate: ChildProcess | null = null;

    public preventSleep(): void {
        if (this._caffeinate) return;
        this._caffeinate = spawn("caffeinate", ["-i"]);
        console.log("Mac не спит");
    }

    public allowSleep(): void {
        if (!this._caffeinate) return;
        this._caffeinate.kill();
        this._caffeinate = null;
        console.log("caffeinate остановлен, Mac может спать");
    }
}
