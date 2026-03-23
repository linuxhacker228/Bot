type SessionEntry = {
    handler: string;
    createdAt: number;
};

export class SessionManager {
    private _sessions = new Map<number, SessionEntry>();
    private _ttl: number;

    constructor(ttlMs: number = 60_000) {
        this._ttl = ttlMs;
    }

    set(userId: number, handler: string): void {
        this._sessions.set(userId, {
            handler,
            createdAt: Date.now(),
        });
    }

    consume(userId: number, handler: string): boolean {
        const entry = this._sessions.get(userId);
        if (!entry) return false;
        if (entry.handler !== handler) return false;
        if (Date.now() - entry.createdAt > this._ttl) {
            this._sessions.delete(userId);
            return false;
        }
        this._sessions.delete(userId);
        return true;
    }
}
