require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// simple in-memory storage
const userApiKeys = {};

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const userId = interaction.user.id;

  if (interaction.commandName === 'register') {
    const apiKey = interaction.options.getString('api_key');

    userApiKeys[userId] = apiKey;

    await interaction.reply('✅ API key registered successfully!');
  }

  if (interaction.commandName === 'showapikey') {
    const key = userApiKeys[userId];

    if (!key) {
      await interaction.reply('❌ No API key found. Use /register first.');
      return;
    }

    await interaction.reply(`🔑 Your API key: ${key}`);
  }
});

client.login(process.env.TOKEN);