// require('dotenv').config()
import { containsUrl, isTwitchUrl, isGithubUrl, isTwitterUrl, isYoutubeUrl } from './helpers'
import * as handlers from './handlers'
const tmi = require('tmi.js')
import { BLOCKED_WORDS } from './constants'

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
        password: 'oauth:' + process.env.TWITCH_OAUTH
    },
    channels: [`${process.env.TWITCH_CHANNEL}`]
}

const client = new tmi.Client(options)

client.connect()

client.on('disconnected', (reason) => {
    handlers.onDisconnectedHandler(reason)
})

client.on('connected', (address, port) => {
    handlers.onConnectedHandler(address, port)
})

client.on('hosted', (channel, username, viewers, autohost) => {
    handlers.onHostedHandler(channel, username, viewers, autohost)
})

client.on('subscription', (channel, username, method, message, userstate) => {
    handlers.onSubscriptionHandler(channel, username, method, message, userstate)
})

client.on('raided', (channel, username, viewers) => {
    handlers.onRaidedHandler(channel, username, viewers)
})

client.on('cheer', (channel, userstate, message) => {
    handlers.onCheerHandler(channel, userstate, message)
})

client.on('giftpaidupgrade', (channel, username, sender, userstate) => {
    handlers.onGiftPaidUpgradeHandler(channel, username, sender, userstate)
})

client.on('hosting', (channel, target, viewers) => {
    handlers.onHostingHandler(channel, target, viewers)
})

client.on('reconnect', () => {
    handlers.reconnectHandler()
})

client.on('resub', (channel, username, months, message, userstate, methods) => {
    handlers.resubHandler(channel, username, months, message, userstate, methods)
})

client.on('subgift', (channel, username, streakMonths, recipient, methods, userstate) => {
    handlers.subGiftHandler(channel, username, streakMonths, recipient, methods, userstate)
})


client.on('message', (channel, tags, message, self) => {
    if (self) return;

    checkTwitchChat(tags, message, channel)

    if (containsUrl(message)) {
        if (isTwitchUrl(message)) {
            client.say(channel, `Twitch URL`);
        }
        if (isGithubUrl(message)) {
            client.say(channel, `Github URL`);
        }
        if (isTwitterUrl(message)) {
            client.say(channel, `Twitter URL`);
        }
        if (isYoutubeUrl(message)) {
            client.say(channel, `Youtube URL`);
        }
    }

    switch (message.toLowerCase()) {
        case '!commands':
            client.say(channel, `@${tags.username}, available commands are:
            C!ommands !Help !Website !Name

            For more help just type "Help"
            `);
            break;
        case '!website':
            client.say(channel, `@${tags.username}, my website is wartner.io!`);
            break;
        case '!name':
            client.say(channel, `Hello @${tags.username}, my name is ChatBot! Type "help" to continue...`);
            break;
        case '!help':
            client.say(channel, `${tags.username}, Use the following commands to get quick help:
            -> Commands: Get Commands ||
            Help: Get Help ||
            !Website: Get my website ||

            For more help just ping me up!
            `);
            break;
        default:
            // let mymessage = message.toString();
            // if ((mymessage.split(' ')[0]).toLowerCase() === '!upvote' || 'upvote') {
            //     client.say(channel, `TwitchLit @${(mymessage.split(' ')[1] + '_' + mymessage.split(' ')[2])} TwitchLit  you have been UPVOTED by ${ tags.username }`);

            // } else if ((mymessage.split(' ')[0]).toLowerCase() === '!cheer' || 'cheers') {
            //     console.log(`HSCheers @${(mymessage.split(' ')[1] + '_' + mymessage.split(' ')[2])} HSCheers you have been UPVOTED by ${ tags.username }`);
            // }
            break;
    }
});

function checkTwitchChat(userstate, message, channel) {
    console.log(message)
    message = message
    let shouldSendMessage = false
    shouldSendMessage = BLOCKED_WORDS.some(blockedWord => message.includes(blockedWord))
    if (shouldSendMessage) {
        // tell user
        client.say(channel, `@${userstate.username}, sorry!  You message was deleted... Du SCHWUCHTEL`)
            // delete message
        client.deletemessage(channel, userstate.id)
    }
}