import client from './client';

export function getMessages() {
    client.on('message', (channel, tags, message, self) => {
        return message;
    })
}