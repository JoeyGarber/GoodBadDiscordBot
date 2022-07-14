const fs = require('node:fs')
const path = require('node:path')
require("dotenv").config() // to retrieve token from .env file
const  { Client, Intents, Collection, ClientUser } = require("discord.js") // require necessary discord.js classes

// Create a new client instance
const client = new Client({ 
  intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES] 
})

// When the client is ready, run this code
client.once("ready", () => {
  console.log("GOODBAD BOT IS ONLINE")
})

//
client.commands = new Collection();
// this gets the path to the directory called 'commands'
const commandsPath = path.join(__dirname, 'commands')
// this gets all of the .js files from the commands folder
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
// this dynamically sets all the new commands into client.commands
// The key is set as the command name and the value is the exported module
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)

  client.commands.set(command.data.name, command)
}


// Login to Discord with the client's token
client.login(process.env.TOKEN)