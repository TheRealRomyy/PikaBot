import { Client, Collection } from "discord.js";
import { settingsInterface, helpInterface, commandInterface } from "../interfaces";

interface clientInterface extends Client {
	config: object,
	emotes: object,
	aliases: Collection<string, string>,
	commands: Collection<string, any>,
};

class Command {

	public readonly client: clientInterface;
	public readonly settings: settingsInterface; 
	public readonly help: helpInterface;

	public readonly enabled: boolean;
	public readonly userPerms: string[];
	public readonly cooldown: number;
	public readonly restriction: string[];
	public readonly name: string;
	public readonly category: string;
	public readonly aliases: string[];

	public readonly cmd : commandInterface = {
		enabled: true,
		userPerms: new Array(),
		cooldown: 3,
		restriction: new Array(),
		name: null,
		category: "Other",
		aliases: new Array()
	};

	constructor(client : clientInterface, cmd : commandInterface) {
		this.client = client;

		this.settings = {
			enabled: cmd.enabled,
			userPerms: cmd.userPerms,
			cooldown: cmd.cooldown,
			restriction: cmd.restriction
		};

		this.help = {
			name: cmd.name,
			category: cmd.category,
			aliases: cmd.aliases
		};
	};
};

export { Command, clientInterface as Client}