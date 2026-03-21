import dotenv from 'dotenv';
import { WatchdogApp } from './watchdog/client';
import { BotProcessService } from './watchdog/services/process';
import { WakeCommand } from './watchdog/commands/wake';
import { KillCommand } from './watchdog/commands/kill';
import { StatusCommand } from './watchdog/commands/status';

dotenv.config({ path: '/Users/vladislavkoval/TypeScript/Lesson_10/.env' });

const TOKEN = process.env.WATCHDOG_TOKEN;
if (!TOKEN) throw new Error('WATCHDOG_TOKEN not found in .env');

const ALLOWED_USER_ID = 6212071259;

const processService = new BotProcessService();

const commands = [
    new WakeCommand(processService),
    new KillCommand(processService),
    new StatusCommand(processService),
];

const watchdog = new WatchdogApp(TOKEN, ALLOWED_USER_ID, commands);
watchdog.start();
