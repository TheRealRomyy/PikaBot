import { Client, Event } from "../classes/Event"
import { MessageEmbed, Message, TextChannel, MessageActionRow, MessageButton } from "discord.js"

class MessageEvent extends Event {

    constructor(client : Client) {
        super(client);
    }

    async run(message : Message) {

        const client : Client = this.client;
        const prefix : string = client.config.prefix;

        if(message.author.bot) return;

        if(message.channel.type === "DM") {

            const pikaplouf = this.client.guilds.cache.get("843933749434646568");

            if(pikaplouf.members.cache.get(message.author.id) === null) return;
            if(!message.content) return;
            
            const hasAlreadyATicket = Boolean(pikaplouf.channels.cache.find(channel => channel.name === `ticket-${message.author.id}`));
            const ticket : any = hasAlreadyATicket ? pikaplouf.channels.cache.find(channel => channel.name === `ticket-${message.author.id}`) : await pikaplouf.channels.create(`ticket-${message.author.id}`);
            
            if(!hasAlreadyATicket) {
                await ticket.setParent("848136168461303808");
    
                message.reply(`${this.client.emotes["succes"]} **Un ticket a bien été crée sur** \`${pikaplouf.name}\`.`)   
            } else {
                message.reply(`${this.client.emotes["succes"]} **Vous avez bien envoyé un message sur votre ticket !**`)
            }

            const embed = new MessageEmbed()
                .setFooter(pikaplouf.name)
                .setTimestamp()
                .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
                .setDescription(message.content)
                .setColor(hasAlreadyATicket ? "BLUE" : "GREEN");

            const closeButton = new MessageButton()
                .setLabel("🔒 Close")
                .setStyle("DANGER")
                .setCustomId("CLOSE-" + message.author.id)
                .setDisabled(false);

            const group = new MessageActionRow().addComponents([ closeButton ]);

            if(hasAlreadyATicket) {
                (ticket as TextChannel).send({
                    embeds: [embed]
                });
            } else {
                const msg = await (ticket as TextChannel).send({
                    embeds: [embed],
                    content: `\`${message.author.username}\` a ouvert un ticket !`,
                    components: [group]
                });

                msg.pin();
            }
        }

        if(message.channel.type === "DM") return;

        if(message.channel.name.includes("ticket-")) {

            const userID = message.channel.name.split("-")[1];
            const user = this.client.users.cache.get(userID);

            const embed = new MessageEmbed()
            .setFooter(message.guild.name)
            .setTimestamp()
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
            .setDescription(message.content)
            .setColor("BLUE");

            user.send({
                embeds: [embed]
            }).catch(error => {
                if(error) message.reply(`${this.client.emotes["error"]} **Je ne peux pas répondre à cette personne car elle a fermée ses messages privés !**`)
            });
        }

        if(message.content === `<@!${client.user.id}>`) return message.channel.send(`${client.emotes["info"]} Bonjour ${message.author}, mon prefix est \`${prefix}\` !`)
        if(!message.content.startsWith(prefix)) return;
    
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
        if(!command) return;

        if(!command.settings.enabled) return message.channel.send(`${client.emotes["error"]} **Cette commande est actuellement désactivée !**`);

        if(command.settings.restriction.includes("OWNER") && !client.config.owners.includes(message.author.id)) return message.channel.send(`${client.emotes["error"]} **Vous avez besoin de la permission \`Créateur du bot\` pour cela !**`);

        command.run(message, args, prefix);
    }
}

module.exports = MessageEvent;