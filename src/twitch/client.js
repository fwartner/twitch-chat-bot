require("dotenv").config();
const tmi = require("tmi.js");

const options = {
  options: { debug: true },
  connection: {
    reconnect: true,
    secure: true,
    timeout: 180000,
    reconnectDecay: 1.4,
    reconnectInterval: 1000,
  },
  identity: {
    username: process.env.TWITCH_USERNAME,
    password: "oauth:" + process.env.TWITCH_OAUTH,
  },
  channels: [`${process.env.TWITCH_CHANNEL}`],
};

const client = new tmi.Client(options);

export default client;
