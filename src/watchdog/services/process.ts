import { exec, spawn } from 'child_process';

export class BotProcessService {
    private readonly _entry = '/Users/vladislavkoval/TypeScript/Lesson_10/src/index.ts';
    private readonly _cwd = '/Users/vladislavkoval/TypeScript/Lesson_10/src';

    isRunning(): Promise<boolean> {
        return new Promise((resolve) => {
            exec('pgrep -f "ts-node.*index.ts"', (_, stdout) => {
                resolve(stdout.trim().length > 0);
            });
        });
    }

    start(): void {
        const child = spawn('/usr/local/bin/ts-node', [this._entry], {
            detached: true,
            stdio: ['ignore', 'ignore', 'pipe'],
            cwd: this._cwd,
            env: { ...process.env, PATH: '/usr/local/bin:/usr/bin:/bin' }
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
