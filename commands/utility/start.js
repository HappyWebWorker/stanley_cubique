const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { Instance } = require('@scaleway/sdk')
const { client } = require('../../scaleway-client')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('Start the server')
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.UseApplicationCommands),
	async execute(interaction) {
		const api = new Instance.v1.API(client)
		const servers = await api.listServers().then((res) => res.servers);
		const server = servers.find(serv => serv.name === process.env.SERVER_NAME)
        
        await interaction.reply(`**${process.env.SERVER_NAME}** is starting :alarm_clock:`);

        if (server.state !== 'running') {
            await api.serverActionAndWait({
                serverId: server.id,
                action: 'poweron'
            })
        }

        await interaction.followUp(`**${process.env.SERVER_NAME}** has started :rocket:`)
	},
};