require("dotenv").config() // starts process from .env file
const {Client, Intents} = require("discord.js")
const client = new Client({ 
  intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES] 
})
client.once("ready", () => {
  console.log("GOODBAD BOT IS ONLINE")
})
client.login(process.env.TOKEN)

