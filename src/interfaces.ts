interface configInterface {
    token: string,
    prefix: string,
    owners: string[],
    emojis: object
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

export { configInterface, settingsInterface, helpInterface, commandInterface }