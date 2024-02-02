import * as env from 'env-var'

export const BOT_TOKEN: string = env.get('BOT_TOKEN').required().asString()

export const BOT_ID: string = env.get('BOT_ID').required().asString()

export const GUILD_TOKEN: string = env.get('GUILD_TOKEN').required().asString()

export const DANIELS_API_URL: string = env.get('DANIELS_API_URL').required().asString()

export const TRATTORIA_API_URL: string = env.get('TRATTORIA_API_URL').required().asString()