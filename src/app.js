import * as handlers from "./twitch/handlers";
import * as constants from "./constants";
import twitchClient from "./twitch/client";
import youtubeClient from "./youtube/client";

twitchClient.connect();
youtubeClient.connect();

twitchClient.on("disconnected", (reason) => {
    handlers.onDisconnectedHandler(reason);
});

twitchClient.on("connected", (address, port) => {
    handlers.onConnectedHandler(address, port);
});

twitchClient.on("hosted", (channel, username, viewers, autohost) => {
    handlers.onHostedHandler(channel, username, viewers, autohost);
});

twitchClient.on("subscription", (channel, username, method, message, userstate) => {
    handlers.onSubscriptionHandler(channel, username, method, message, userstate);
});

twitchClient.on("raided", (channel, username, viewers) => {
    handlers.onRaidedHandler(channel, username, viewers);
});

twitchClient.on("cheer", (channel, userstate, message) => {
    handlers.onCheerHandler(channel, userstate, message);
});

twitchClient.on("giftpaidupgrade", (channel, username, sender, userstate) => {
    handlers.onGiftPaidUpgradeHandler(channel, username, sender, userstate);
});

twitchClient.on("hosting", (channel, target, viewers) => {
    handlers.onHostingHandler(channel, target, viewers);
});

twitchClient.on("reconnect", () => {
    handlers.reconnectHandler();
});

twitchClient.on("resub", (channel, username, months, message, userstate, methods) => {
    handlers.resubHandler(channel, username, months, message, userstate, methods);
});

twitchClient.on(
    "subgift",
    (channel, username, streakMonths, recipient, methods, userstate) => {
        handlers.subGiftHandler(
            channel,
            username,
            streakMonths,
            recipient,
            methods,
            userstate
        );
    }
);

twitchClient.on("message", (channel, tags, message, self) => {
    handlers.onMessageHandler(channel, tags, message, self);
    checkTwitchChat(tags, message, channel);

    switch (message.toLowerCase()) {
        case "!commands":
            twitchClient.say(
                channel,
                `@${tags.username}, available commands are:
            !commands !help !website

            For more help just type "Help"
            `
            );
            break;
        case "!website":
            twitchClient.say(
                channel,
                `@${tags.username}, my website is ${constants.WEBSITE}`
            );
            break;
        case "!name":
            twitchClient.say(
                channel,
                `Hello @${tags.username}, my name is ChatBot! Type "help" to continue...`
            );
            break;
        case "!help":
            twitchClient.say(
                channel,
                `${tags.username}, You can use the following command to get help:
            !commands: Get Commands ||
            !help: Get Help ||
            !website: Get my website ||

            For more help just ping me up!
            `
            );
            break;
        default:
            break;
    }
});

function checkTwitchChat(userstate, message, channel) {
    console.log(message);
    message = message;
    let shouldSendMessage = false;
    shouldSendMessage = constants.BLOCKED_WORDS.some((blockedWord) =>
        message.includes(blockedWord)
    );
    if (shouldSendMessage) {
        twitchClient.say(
            channel,
            `@${userstate.username}, sorry!  Your message was deleted. Reason: Usage of bad words.`
        );
        twitchClient.deletemessage(channel, userstate.id);
    }
}