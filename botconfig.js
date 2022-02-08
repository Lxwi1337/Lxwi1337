module.exports = {
  Admins: ["699029898026811454", "258712464823156738"], //Admins of the bot
  ExpressServer: true, //If you wanted to make the website run or not
  DefaultPrefix: process.env.Prefix || "+", //Default prefix, Server Admins can change the prefix
  Port: 3000, //Which port website gonna be hosted
  SupportServer: "https://discord.gg/XJ2r8w8n3m", //Support Server Link
  Token: process.env.Token || "ODY4OTA5MjY0NTM2NzM1NzU0.YP2g0A.ntMaA5P2sMy7IrJG87ApHR8QBsA", //Discord Bot Token
  ClientID: process.env.Discord_ClientID || "868909264536735754", //Discord Client ID
  ClientSecret: process.env.Discord_ClientSecret || "BOyiXF4smo5ENhVFIQZB_HtJWcSGGXYo", //Discord Client Secret
  Scopes: ["identify", "guilds", "applications.commands"], //Discord OAuth2 Scopes
  ServerDeafen: true, //If you want bot to stay deafened
  DefaultVolume: 100, //Sets the default volume of the bot, You can change this number anywhere from 1 to 100
  CallbackURL: "/api/callback", //Discord API Callback url. Do not touch it if you don't know what you are doing. All you need to change for website to work is on line 20.
  "24/7": false, //If you want the bot to be stay in the vc 24/7
  CookieSecret: "Pikachu is cute", //A Secret like a password
  IconURL:
    "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif", //URL of all embed author icons | Dont edit unless you dont need that Music CD Spining
  EmbedColor: "RANDOM", //Color of most embeds | Dont edit unless you want a specific color instead of a random one each time
  Permissions: 2205281600, //Bot Inviting Permissions
  Website: process.env.Website || "http://changeme", //Website where it is hosted at includes http or https || Use "0.0.0.0" if you using Heroku || Do not include /api/callback. Just the website url. I.e. "https://foo.bar"
  
  Presence: {
    status: "online", // You can show online, idle, and dnd
    name: "Music", // The message shown
    type: "LISTENING", // PLAYING, WATCHING, LISTENING, STREAMING
  },

  //Lavalink
  Lavalink: {
    id: "Main",
    host: "host name or IP",
    port: 80, // The port that lavalink is listening to. This must be a number!
    pass: "your password",
    secure: false, // Set this to true if the lavalink uses SSL or you're hosting lavalink on repl.it
  },

  //Please go to https://developer.spotify.com/dashboard/
  Spotify: {
    ClientID: process.env.Spotify_ClientID || "3cfcdcc0e3944ec2863b38d1688f309e", //Spotify Client ID
    ClientSecret: process.env.Spotify_ClientSecret || "90e502bf6be54a44b5a66b981cebf58", //Spotify Client Secret
  },
};
