# PC Assistant Bot

A Telegram bot for controlling your computer remotely: open Spotify and YouTube, change the volume, get the current track name, check the weather. A second bot, the watchdog, can start and stop the first one and tell you whether it is running.

The bots are written in TypeScript and use [grammY](https://grammy.dev).

## Features

### Main bot (`src/index.ts`)

| Command / button | What it does |
| --- | --- |
| `/start` | Greeting |
| `/menu` | Control panel with buttons |
| `/play` | Opens Spotify |
| Запустить YouTube | Searches YouTube and opens the results in the browser |
| Погода | Shows the weather for a city (OpenWeatherMap) |
| Установить громкость | Sets the system volume from 0 to 100 |
| Название трека в Spotify | Sends the name of the current track (macOS only) |

The bot's messages and button labels are in Russian. While it is running, the computer does not go to sleep. It only answers the user whose ID is in `ADMIN_ID` and replies "Нету доступа" ("No access") to everyone else.

### Watchdog (`src/watchdog.ts`)

| Command | What it does |
| --- | --- |
| `/wake` | Starts the main bot |
| `/kill` | Stops the main bot |
| `/status` | Reports whether the main bot is running |

## OS support

| | macOS | Linux | Windows |
| --- | --- | --- | --- |
| Spotify (open/close) | ✅ | ✅ | ✅ |
| Volume | ✅ `osascript` | ✅ `pactl` | ✅ needs [NirCmd](https://www.nirsoft.net/utils/nircmd.html) |
| Open URL | ✅ | ✅ `xdg-open` | ✅ |
| Track name | ✅ | ❌ | ❌ |

## Requirements

- Node.js 18+
- `ts-node` and `typescript`
- Two Telegram bots from [@BotFather](https://t.me/BotFather): the main bot and the watchdog
- An [OpenWeatherMap](https://openweathermap.org/api) API key

## Installation

```bash
git clone <repo-url>
cd Lesson_10
npm install
cp .env.example .env
```

Fill in `.env`:

| Variable | Required | Description |
| --- | --- | --- |
| `TOKEN` | yes | Main bot token |
| `ADMIN_ID` | yes | Your Telegram ID (you can get it from [@userinfobot](https://t.me/userinfobot)) |
| `WATCHDOG_TOKEN` | yes, for the watchdog | Watchdog bot token |
| `ALLOWED_USER_ID` | yes, for the watchdog | Telegram ID of the user allowed to control the watchdog |
| `API_KEY` | yes | OpenWeatherMap key |
| `TS_NODE_BIN` | no | Path to `ts-node`, defaults to `ts-node` from `PATH` |
| `CHILD_PATH` | no | `PATH` for the bot process, defaults to `/usr/local/bin:/usr/bin:/bin` |
| `BOT_CWD` | no | Bot working directory, defaults to `src/` |
| `BOT_ENTRY` | no | Bot entry point, defaults to `src/index.ts` |

## Running

Main bot only:

```bash
cd src
ts-node index.ts
```

Through the watchdog, so you can control the bot from Telegram:

```bash
ts-node src/watchdog.ts
```

Then send `/wake` to the watchdog bot.

## Project structure

```
src/
├── index.ts              # main bot entry point
├── watchdog.ts           # watchdog entry point
├── bot/
│   ├── client.ts         # BotApp: registers commands, callbacks, handlers
│   ├── commands/         # /start, /menu, /play, /youtube
│   ├── callbacks/        # inline button handlers
│   ├── text-handlers/    # text input handling (city, volume, search query)
│   ├── middlewares/      # auth by ADMIN_ID
│   └── session/          # dialog state
├── modules/              # features: spotify, youtube, weather
├── services/
│   ├── config.ts         # loads .env
│   ├── os/               # macOS / Linux / Windows adapters + factory
│   ├── facades/          # Spotify control facade
│   └── ...               # spotify, youtube, weather, system
├── watchdog/             # watchdog commands and bot process management
└── typings/              # shared interfaces
```

Commands and callbacks extend the abstract `Command` and `Callback` classes. Each feature (Spotify, YouTube, weather) has its own module in `modules/`. OS-specific code lives in the adapters in `services/os/`, and `OsFactory` picks the right one at startup.
