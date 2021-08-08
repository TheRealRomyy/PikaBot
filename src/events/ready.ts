import { Client, Event } from "../classes/Event"

class Ready extends Event {

    constructor(client : Client) {
        super(client);
    }

    async run() {
        console.log(`J'suis ready sur ${this.client.guilds.cache.size} serveurs !`)
    }
}

module.exports = Ready;