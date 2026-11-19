import { exec, spawn } from 'child_process';
import path from 'path';

export class BotProcessService {
    private readonly _cwd = process.env.BOT_CWD ?? path.resolve(__dirname, '../..');
    private readonly _entry = process.env.BOT_ENTRY ?? path.join(this._cwd, 'index.ts');
    private readonly _tsNode = process.env.TS_NODE_BIN ?? 'ts-node';
    private readonly _childPath = process.env.CHILD_PATH ?? '/usr/local/bin:/usr/bin:/bin';

    isRunning(): Promise<boolean> {
        return new Promise((resolve) => {
            exec('pgrep -f "ts-node.*index.ts"', (_, stdout) => {
                resolve(stdout.trim().length > 0);
            });
        });
    }

    start(): void {
        const child = spawn(this._tsNode, [this._entry], {
            detached: true,
            stdio: ['ignore', 'ignore', 'pipe'],
            cwd: this._cwd,
            env: { ...process.env, PATH: this._childPath }
        });
        child.stderr?.on('data', (data) => console.error('Bot error:', data.toString()));
        child.on('error', (err) => console.error('Spawn error:', err.message));
        child.unref();
    }

    stop(): Promise<void> {
        return new Promise((resolve) => {
            exec('pkill -f "ts-node.*index.ts"', () => resolve());
        });
    }
}
