import { Client, Collection } from "discord.js";
import { configInterface, emojiInterface, cmdFile } from "../interfaces";

interface clientInterface extends Client {
	config: configInterface,
	emotes: emojiInterface,
	aliases: Collection<string, string>,
	commands: Collection<string, cmdFile>,
}

class Event {

    public readonly client: clientInterface;

	constructor(client : clientInterface) {
		this.client = client;
	}
}

export { Event, clientInterface as Client}