import * as helpers from "./helpers";

if (helpers.containsUrl(message)) {
  if (helpers.isTwitchUrl(message)) {
    client.say(channel, `Twitch URL`);
  }
  if (helpers.isGithubUrl(message)) {
    client.say(channel, `Github URL`);
  }
  if (helpers.isTwitterUrl(message)) {
    client.say(channel, `Twitter URL`);
  }
  if (helpers.isYoutubeUrl(message)) {
    client.say(channel, `Youtube URL`);
  }
}
