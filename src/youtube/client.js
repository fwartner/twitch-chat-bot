require("dotenv").config();
import { LiveChat } from "youtube-chat";

const liveChat = new LiveChat({ channelId: process.env.YOUTUBE_CHANNEL_ID });

liveChat.on("start", (liveId) => {});

liveChat.on("end", (reason) => {});

liveChat.on("comment", (comment) => {});

liveChat.on("error", (err) => {});

export function connect() {
    liveChat.start();
}

export default liveChat;