import client from './client'

export function onMessageHandler(channel, userstate, message, self) {
    if (self) return
        // TODO: Add message handling
}

export function onDisconnectedHandler(reason) {
    console.log(`Disconnected: ${reason}`)
}

export function onConnectedHandler(address, port) {
    console.log(`Connected: ${address}:${port}`)
}

export function onHostedHandler(channel, username, viewers, autohost) {
    client.say(channel,
        `Thank you @${username} for the host of ${viewers}!`
    )
}

export function onRaidedHandler(channel, username, viewers) {
    client.say(channel,
        `Thank you @${username} for the raid of ${viewers}!`
    )
}

export function onSubscriptionHandler(channel, username, method, message, userstate) {
    client.say(channel,
        `Thank you @${username} for subscribing!`
    )
}

export function onCheerHandler(channel, userstate, message) {
    client.say(channel,
        `Thank you @${userstate.username} for the ${userstate.bits} bits!`
    )
}

export function onGiftPaidUpgradeHandler(channel, username, sender, userstate) {
    client.say(channel,
        `Thank you @${username} for continuing your gifted sub!`
    )
}

export function onHostingHandler(channel, target, viewers) {
    client.say(channel,
        `We are now hosting ${target} with ${viewers} viewers!`
    )
}

export function reconnectHandler() {
    console.log('Reconnecting...')
}

export function resubHandler(channel, username, months, message, userstate, methods) {
    const cumulativeMonths = userstate['msg-param-cumulative-months']
    client.say(channel,
        `Thank you @${username} for the ${cumulativeMonths} sub!`
    )
}

export function subGiftHandler(channel, username, streakMonths, recipient, methods, userstate) {
    client.say(channel,
        `Thank you @${username} for gifting a sub to ${recipient}}.`
    )
}

export function hello(channel, userstate) {
    client.say(channel, `@${userstate.username}, heya!`)
}