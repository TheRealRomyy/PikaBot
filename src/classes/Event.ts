import { Client, Collection } from "discord.js";
import { configInterface } from "../interfaces";

interface clientInterface extends Client {
	config: configInterface,
	emotes: object,
	aliases: Collection<string, string>,
	commands: Collection<string, any>,
};

class Event {

    public readonly client: clientInterface;

	constructor(client : clientInterface) {
		this.client = client;
	};
};

export { Event, clientInterface as Client}