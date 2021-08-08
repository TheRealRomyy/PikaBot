import { Message } from "discord.js";
import { Client } from "./classes/Command";

interface configInterface {
    token: string,
    prefix: string,
    owners: string[],
    emojis: emojiInterface
}

interface settingsInterface {
    enabled: boolean,
    userPerms: string[],
    cooldown: number,
    restriction: string[]
}

interface helpInterface {
    name: string,
    category: string,
    aliases: string[]
}

interface commandInterface {
    name: string,
    aliases: string[],
    category: string,
    enabled: boolean,
    userPerms: string[],
    cooldown: number,
    restriction: string[],
}

interface emojiInterface {
    succes: string,
    info: string,
    error: string,
    close: string,
    label: string,
    description: string,
    time: string
}

interface cmdFile {
    cmd: commandInterface,
    client: Client,
    settings: settingsInterface,
    help: helpInterface,
    run: (message : Message, args : string[], prefix : string) => Record<string, unknown>
}

export { configInterface, settingsInterface, helpInterface, commandInterface, emojiInterface, cmdFile }