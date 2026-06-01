# Music Bot

![Project Icon](Icons/Lauchboy.ico)

A compact Discord music bot built with `discord.js` and `discord-player`. This repository includes ready-to-use command handlers for music playback, ambience presets, mood playlists, and basic queue control.

## 🚀 Overview
This project is designed for developers who want a small, easy-to-customize Discord music bot.

- Plays YouTube audio by URL or search query
- Includes ambient and mood-based playlist commands
- Supports playback controls like pause, resume, skip, queue, disconnect, and summon
- Organized command modules under `commands/` for quick editing

## 📁 Repository Contents
- `index.js` — main bot entry point
- `commands/` — command handler modules
- `Icons/` — project icon and assets
- `package.json` / `package-lock.json` — Node dependency metadata
- `.env` — environment configuration file (not committed)
- `Lauchboy.exe` — Windows launcher executable
- `Musik Bot starten.bat` — Windows batch script to launch the bot
- `LICENSE` — project license
- `1722158080321-base.js` — additional project file included in the repository

## ✅ Features
- `play` command for YouTube links and search terms
- `ambience`, `classic`, and `mood` commands for themed playlists
- `command` set for player control: `skip`, `queue`, `pause`, `resume`, `exit`, `summon`
- `help` command to list available bot commands
- Easy command structure for customization and extension

## ⚙️ Setup
1. Clone the repository.
2. Create a `.env` file in the project root with these values:

```env
TOKEN=your_discord_bot_token
CLIENT_ID=your_application_client_id
```

3. Install dependencies:

```bash
npm install
```

4. Run the bot:

```bash
node .
```

### Windows launch options
- Double-click `Musik Bot starten.bat`
- Run `Lauchboy.exe` if you prefer a Windows launcher

## 📌 Requirements
- Node.js 16 or newer
- `ffmpeg` installed on your system or available via `ffmpeg-static`
- A Discord bot token and application client ID

## 📖 Commands
- `ambience` — ambient YouTube playlists (`commands/ambience.js`)
- `classic` — classic ambience presets (`commands/classic.js`)
- `mood` — mood-based playlists (`commands/mood.js`)
- `play` — play a song by URL or search term (`commands/play.js`)
- `command` — playback utilities like `skip`, `queue`, `pause`, `resume`, `exit`, `summon` (`commands/command.js`)
- `help` — displays top-level commands (`commands/help.js`)

## 🧩 Useful Files
- [index.js](index.js) — main application startup
- [commands/play.js](commands/play.js)
- [commands/ambience.js](commands/ambience.js)
- [commands/classic.js](commands/classic.js)
- [commands/mood.js](commands/mood.js)
- [commands/command.js](commands/command.js)
- [commands/help.js](commands/help.js)
- [Icons/Lauchboy.ico](Icons/Lauchboy.ico)

## 💡 Notes
- This bot uses `discord-player`, `discord.js`, and YouTube extraction packages.
- If `ffmpeg` is missing, audio playback will not work correctly.
- The repository currently includes `package-lock.json`, so installed dependency versions are locked.

## 🤝 Contributing
Contributions are welcome. Please open an issue or submit a pull request with details of your change.

## 📜 License
See [LICENSE](LICENSE) for license details.
