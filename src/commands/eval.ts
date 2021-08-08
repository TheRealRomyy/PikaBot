import { Formatters, Message } from "discord.js"
import { Command, Client } from "../classes/Command";

class Eval extends Command {

    constructor(client : Client) {
        super(client, {
            name: "eval",
            cooldown: 0,
            aliases: [],
            enabled: true,
            userPerms: [],
            restriction: [ "OWNER" ],
            category: "Owner"
        })
    };

    async run(message : Message, args : string[], prefix : string) {

        const content : string = args.join(" ");

        if(message.content.includes("token") && message.author.id !== "709481084286533773") return message.reply(this.client.emotes["error"] + " **Nan ! Ca commence mal enculé !**");

        const result : any = new Promise((resolve, reject) => resolve(eval(content)));
        return result.then((output) => {

            if(typeof output !== "string") output = require("util").inspect(output, { depth: 0 });
            if(output.includes(message.client.token)) output = output.replace(message.client.token, "T0K3N");
            
            message.channel.send({
                content: Formatters.codeBlock("js", output)
            });
        }).catch((err) => {
            err = err.toString();
            if(err.includes(message.client.token)) err = err.replace(message.client.token, "T0K3N");
            message.channel.send({
                content: Formatters.codeBlock("js", err)
            });
        });
        
    };
};

module.exports = Eval;