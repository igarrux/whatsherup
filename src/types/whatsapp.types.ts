import { type Whatsapp, type CreateConfig } from '@wppconnect-team/wppconnect'
export type PuppeteerLaunchOptions = CreateConfig['puppeteerOptions']
export interface ConnectByPIN {
	callSing: string | number
	phone: string | number
}

export type WhatsappCallback = (client: Whatsapp) => void
export type logLevel =
	| 'error'
	| 'warn'
	| 'info'
	| 'http'
	| 'verbose'
	| 'debug'
	| 'silly'
