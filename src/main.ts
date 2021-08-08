import { Client, Collection, Intents } from "discord.js"
import { configInterface } from "./interfaces"
import { readdirSync } from "fs"
import * as config from "../config.json"

class PikaBot extends Client {

    public readonly config: configInterface;
    public readonly emotes: object;

    public readonly aliases = new Collection<string, string>();
    public readonly commands = new Collection<string, any>();

    constructor() {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
                Intents.FLAGS.GUILD_INVITES,
                Intents.FLAGS.DIRECT_MESSAGES,
                Intents.FLAGS.GUILD_PRESENCES
            ],
            partials: [ "REACTION", "MESSAGE", "CHANNEL", "GUILD_MEMBER", "USER" ],
            allowedMentions: {
                parse: ["users", "roles"],
                repliedUser: true
            }
        });

        this.config = config;
        this.emotes = config.emojis;

        this.aliases = new Collection();
        this.commands = new Collection();
    };

    async init() {

        // Load events
        const events = readdirSync("build/src/events").filter(file => file.endsWith(".js"));
        events.forEach(file => {
            const eventName = file.split(".")[0];
            const event = new (require(`./events/${file}`))(this);
            console.log(`Event: '${eventName}' was successfully loaded !`);
            this.on(eventName, (...args) => event.run(...args));
        });

        // Load commands
        const commandFile = readdirSync("build/src/commands").filter(file => file.endsWith(".js"));
        commandFile.forEach(file => {
            const commandName = file.split(".")[0];
            try {
                const command = new(require(`./commands/${commandName}`))(this);
                console.log(`Command: '${commandName}' (${command.help.category}) was successfully loaded !`);
                this.commands.set(command.help.name, command);
                for(const alias of command.help.aliases) {
                    this.aliases.set(alias, command.help.name);
                };
            } catch (e) {
                return console.log(`Command: '${commandName}' can't be load: ${e}`);
            };
        });

        // Login to discord
        this.login(this.config.token)
    };
};

const client = new PikaBot();
client.init();