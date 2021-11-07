
# Twitch Live-Chat Bot

Chatbot for Twitch


## Installation

Clone the project

```bash
  git clone https://github.com/fwartner/twitch-chat-bot.git
```

Go to the project directory

```bash
  cd live-chat-bot
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```



## Configuration

To get the chatbot working you'll need to obtain an oauth token for the user which is impersonated by the chatbot.
I suggest using https://twitchapps.com/tmi.

**NOTE**: Only the part behind `oauth:` is needed for the configuration.

Create your local `.env` file by copying the `.env.example`:

```bash
cp .env.example .env
```

Fill out the required field:

- TWITCH_USERNAME: The username for the chatbot
- TWITCH_OAUTH: The key you just obtained from twitchapps.com
- TWITCH_CHANNEL: The channel on Twitch you want to interact with
- WEBSITE: Your website

### Bad Word Filtering

The chatbot can also filter and automatically delete words or messages.

To add words that will be filtered by the bot simply edit the `src/constants.js` file:

```javascript
...
export const BLOCKED_WORDS = [
    'hiphop', // Add more words here..
]
...
```

## Deploy to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/fwartner/twitch-chat-bot)
