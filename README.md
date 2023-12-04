# Basic discord music bot using discord js and discord-player

After you have cloned the repo make sure to create a `.env` file with the `TOKEN` and `CLIENT_ID` specified for example

```
TOKEN=xxx
CLIENT_ID=xxx
```

# Running with docker

`docker run -e TOKEN=<your_token_here> -e CLIENT_ID=<your_client_id_here> -d pabolo02345/discord-js-music-bot`

# Commands

- play
  - song {url}       - plays the song from the youtube url
  - search {keyword} - searches for the keyword on youtube and plays the first result
- soundtracks
  - barde
  - dorf
  - doom
  - dramatik
  - entspannt
  - erkunden
  - freude
  - hinterhalt
  - höhle
  - krieg
  - küste
  - lagerfeuer
  - markt
  - monster
  - party
  - schlacht
  - schmiede
  - taverne
  - training
  - wald
  - warten
  - saufen
  - vietnam
- skip   - Skips the current song
- queue  - Displays the first 10 songs in the queue
- pause  - pauses the current song
- resume - resumes playing the current song
- exit   - kicks the bot from the voice channel
- summon - adds bot to specific voice channel


# Start Bot
Run CMD command "node ."


# Source 
- tutorial - https://www.youtube.com/watch?v=3Iegimr8Qc0
- ffmpeg - https://www.ffmpeg.org/download.html
- 7Zip - https://www.7-zip.org/download.html
- NodeJS - https://nodejs.org/en/download/
- VS Code - https://code.visualstudio.com/