const fs = require('node:fs')
const path = require('node:path')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
require("dotenv").config()

const commands = []
commandsPath = path.join(__dirname, 'commands')
commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN)

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)
  commands.push(command.data.toJson())
}

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
  .then(() => console.log('Successfully registered application commands'))
  .catch(console.error)