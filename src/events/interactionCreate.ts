import { Client, Event } from "../classes/Event";
import { Interaction, TextChannel } from "discord.js";

class InteractionCreate extends Event {

    constructor(client : Client) {
        super(client);
    };

    async run (button : Interaction) {

        const client = this.client;

        if (!button.isButton()) return;

        await button.deferUpdate();

        if(button.customId.includes("CLOSE")) {

            let userID = (button.channel as TextChannel).name.split("-")[1];
            let user = client.users.cache.get(userID);

            (button.channel as TextChannel).send(`${client.emotes["close"]} **Le ticket va être fermé dans 5 secondes !**`);

            setTimeout(async function() {

                user.send({
                    content: `${client.emotes["close"]} **Votre ticket sur \`${button.guild.name}\` a été fermé !**`
                });

                await button.channel.delete();
            }, 5000);
        };
    };
};

module.exports = InteractionCreate;