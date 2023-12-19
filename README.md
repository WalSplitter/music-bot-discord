# Basic discord music bot using discord js and discord-player

After you have cloned the repo make sure to create a `.env` file with the `TOKEN` and `CLIENT_ID` specified for example

```
TOKEN=xxx
CLIENT_ID=xxx
```

<br />
<br />
<br />
<br />

# Running with docker

`docker run -e TOKEN=<your_token_here> -e CLIENT_ID=<your_client_id_here> -d pabolo02345/discord-js-music-bot`

<br />
<br />
<br />
<br />

# Commands

- ambience      -> hardcoded youtube songs to create a fitting ambience
  - barde
  - dorf
  - erdrückend
  - wandern
  - abenteuer
  - freude
  - hinterhalt
  - höhle
  - krieg
  - krieg-2
  - küste
  - lagerfeuer
  - markt
  - monster
  - party
  - schmiede
  - stadt
  - taverne
  - wald
- classic       -> hardcoded youtube songs to create a fitting classic ambience
  - lacrimosa
  - dies-irae
- command
  - skip        -> Skips the current song
  - queue       -> Displays the first 10 songs in the queue
  - pause       -> pauses the current song
  - resume      -> resumes playing the current song
  - exit        -> kicks the bot from the voice channel
  - summon      -> adds bot to specific voice channel
- help          -> shows all current top commands
- mood          -> hardcoded youtube songs to set a fitting mood
  - building
  - doom
  - martial-arts
  - training
  - warten
  - saufen
  - vietnam
  - haselnüsse
- play
  - song {url}       -> plays the song from the youtube url
  - search {keyword} -> searches for the keyword on youtube and plays the first result

<br />
<br />
<br />
<br />

# Start Bot
Run CMD command "node ."

<br />
<br />
<br />
<br />

# Free Server to host this bot
- SillyDev - https://panel.sillydev.co.uk

<br />
<br />
<br />
<br />

# Source 
- tutorial - https://www.youtube.com/watch?v=3Iegimr8Qc0
- ffmpeg - https://www.ffmpeg.org/download.html
- 7Zip - https://www.7-zip.org/download.html
- NodeJS - https://nodejs.org/en/download/
- VS Code - https://code.visualstudio.com/