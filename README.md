
# Twitch Livechat Bot

Chatbot for Twitch


## Installation

In order to install the chatbot simply follow the steps below:

```bash
  git clone https://github.com/fwartner/live-chat-bot.git
  cd live-chat-bot
  npm install
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
