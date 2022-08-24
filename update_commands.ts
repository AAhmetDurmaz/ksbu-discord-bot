require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'ping',
    description: 'Bot eğer uykuda değil ise \'Pong!\' olarak cevap verir.',
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();